
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { legalTexts } from '../data/civilCode';
import { civilCodeArticles, searchArticles as searchCivilCode, getArticle as getCivilArticle } from '../data/civilCodeArticles';
import { codeCivilComplet, rechercherDansCodeCivil, rechercherArticle } from '../data/codeCivilComplet';
import { Button } from './ui/Button';

// --- TYPES ---
interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// --- AI BRAIN & HELPERS ---

// Normalize text for easier processing
    const normalizeText = (text: string) =>
        text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[-'?]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    
    // Mapping direct des suggestions vers les clés
    const suggestionMapping: Record<string, string> = {
        'comment est fixe le taux d incapacite': 'taux incapacite fixation',
        'qu est ce que la consolidation': 'consolidation',
        'qu est ce qu un accident de trajet': 'accident de trajet',
        'definition accident du travail': 'definition accident du travail',
        'delai de declaration d un accident': 'delai declaration accident',
        'declaration d une maladie professionnelle': 'maladie professionnelle',
        'difference entre incapacite et invalidite': 'incapacite invalidite difference',
        'contenu du certificat medical initial at': 'certificat medical initial',
        'prise en charge de l etat anterieur': 'etat anterieur',
        'conditions d attribution d une tierce personne': 'tierce personne conditions',
        'procedure expertise medicale': 'procedure expertise medicale',
        'delai pour expertise medicale': 'delai expertise medicale',
        'role et honoraires du medecin expert': 'honoraires expert',
        'procedure de revision du taux d incapacite': 'revision taux',
        'comment gerer une rechute': 'rechute',
        'le recours prealable est il obligatoire': 'recours prealable',
        'composition commission d invalidite': 'commission invalidite',
        'definition faute inexcusable': 'faute inexcusable',
        'calcul de l indemnite journaliere': 'calcul indemnite journaliere',
        'quelles sont les categories d invalidite': 'categories invalidite',
    };

// Function to find a specific article in a specific law
const findArticle = (lawId: string, articleNumber: number): string | null => {
    const law = legalTexts.find(l => l.id === lawId);
    if (!law) return null;

    // Regex to find "Art. X" or "Article X" and capture all text until the next "Art." or the end of the file.
    const regex = new RegExp(`(?:Art\\.|Article) ${articleNumber}[\\.\\s]([\\s\\S]*?)(?=(?:Art\\.|Article) ${articleNumber + 1}|$)`, 'i');
    const match = law.content.match(regex);
    
    return match ? `Art. ${articleNumber}. ${match[1].trim()}` : null;
};

// Search for keywords and extract relevant snippets
const searchKeywords = (keywords: string[]): { snippet: string, source: string }[] => {
    const results: { snippet: string, source: string, score: number }[] = [];
    const uniqueSnippets = new Set<string>();

    legalTexts.forEach(law => {
        // Find all article occurrences
        const articles = law.content.split(/(?=Art\.|Article)/i);
        
        articles.forEach(articleText => {
            const normalizedArticle = normalizeText(articleText);
            const articleHeaderMatch = articleText.match(/^(Art\.|Article)\s*\d+/i);
            const articleHeader = articleHeaderMatch ? articleHeaderMatch[0] : 'Section';

            const score = keywords.reduce((acc, kw) => {
                return normalizedArticle.includes(kw) ? acc + 1 : acc;
            }, 0);

            if (score === keywords.length) {
                const sentences = articleText.split(/(?<=[.?!])\s+/);
                const relevantSentences = sentences.filter(sentence => 
                    keywords.some(kw => normalizeText(sentence).includes(kw))
                );

                if (relevantSentences.length > 0) {
                    const snippet = relevantSentences.join(' ').trim();
                    if (!uniqueSnippets.has(snippet)) {
                         results.push({
                            snippet: `**${articleHeader}**: ${snippet}`,
                            source: law.title,
                            score
                        });
                        uniqueSnippets.add(snippet);
                    }
                }
            }
        });
    });
    
    return results.sort((a, b) => b.score - a.score);
};


// The core logic of the local AI
const processQuery = (query: string): string => {
    const normalizedQuery = normalizeText(query);
    
    // --- Code Civil Article Lookup (recherche dans le PDF complet) ---
    const civilArticleMatch = normalizedQuery.match(/(?:article|art\.?)\s*(\d+(?:\s*bis)?)\s*(?:du\s*)?(?:code civil|cc)?/);
    if (civilArticleMatch) {
        const articleNum = civilArticleMatch[1].trim();
        console.log('🔍 Recherche article:', articleNum);
        
        // D'abord chercher dans les articles pré-extraits (meilleure qualité)
        const article = getCivilArticle(articleNum);
        console.log('📋 Résultat articles pré-extraits:', article ? 'TROUVÉ' : 'PAS TROUVÉ');
        
        if (article) {
            return `📜 **${article.title}** (Article ${article.article} du Code Civil Algérien)\n\n${article.content}\n\n🔖 Catégorie: ${article.category}\n🔑 Mots-clés: ${article.keywords.join(', ')}`;
        }
        
        // Sinon chercher dans le PDF complet (975 articles)
        const articleFromPDF = rechercherArticle(articleNum);
        console.log('📄 Résultat PDF complet:', articleFromPDF ? 'TROUVÉ' : 'PAS TROUVÉ');
        
        if (articleFromPDF) {
            // Nettoyer le texte du PDF (enlever caractères corrompus)
            const cleanText = articleFromPDF
                .replace(/[^\x20-\x7E\u00C0-\u00FF\u0100-\u017F\u0600-\u06FF\n]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            if (cleanText.length > 50) {
                return `📜 **Article ${articleNum} du Code Civil Algérien**\n\n${cleanText}\n\n_Source: Code Civil PDF complet (975 articles)_\n\n⚠️ Texte extrait automatiquement du PDF - qualité variable`;
            }
        }
        
        return `❌ Article ${articleNum} introuvable\n\nℹ️ Base de données : 975 articles disponibles\n\n💡 Suggestions :\n- Vérifiez le numéro (1-975)\n- Essayez "article 124" ou "article 182"\n- Recherchez par mot-clé (ex: "responsabilité")`;
    }
    
    // --- Réponses aux questions courantes ---
    const questionsReponses: { [key: string]: string } = {
        'definition accident du travail': `📋 **Définition de l'accident du travail**\n\nSelon la loi 83-13 :\n\n**Article 6** : "Est considéré comme accident du travail, tout accident ayant entraîné une lésion corporelle imputable à une cause soudaine, extérieure et survenue dans le cadre de la relation de travail."\n\n**Éléments constitutifs** :\n- Lésion corporelle\n- Cause soudaine et extérieure  \n- Lien avec le travail\n- Fait dommageable précis et daté`,
        
        'accident de trajet': `📋 **Accident de trajet**\n\nSelon la loi 83-13 :\n\n**Article 7** : "Est également considéré comme accident du travail, l'accident survenu pendant le trajet aller-retour entre le lieu de résidence et le lieu de travail, dans la mesure où le parcours n'a pas été interrompu ou détourné pour un motif dicté par l'intérêt personnel ou indépendant de l'emploi."\n\n**Conditions** :\n- Trajet domicile ↔ travail\n- Parcours normal et direct\n- Pas de détour personnel`,
        
        'delai declaration accident': `⏱️ **Délais de déclaration d'un accident du travail**\n\n**Pour la victime** :\n- Informer l'employeur dans les **24 heures** (sauf force majeure)\n\n**Pour l'employeur** :\n- Déclarer à la CNAS dans les **48 heures**\n- Formulaire de déclaration obligatoire\n\n**Important** : Le non-respect de ces délais peut compromettre les droits aux prestations.`,
        
        'maladie professionnelle': `📋 **Déclaration d'une maladie professionnelle**\n\n**Procédure** :\n1. Certificat médical du médecin traitant\n2. Déclaration par le travailleur à l'employeur\n3. L'employeur déclare à la CNAS dans les **48 heures**\n4. La CNAS dispose de **30 jours** pour statuer\n\n**Conditions** :\n- Maladie inscrite au tableau des maladies professionnelles\n- Ou preuve du lien direct entre maladie et travail`,
        
        'incapacite invalidite difference': `📊 **Différence entre incapacité et invalidité**\n\n**Incapacité permanente partielle (IPP)** :\n- Taux < 100%\n- Séquelles définitives après consolidation\n- Rente proportionnelle au taux\n- Capacité de travail conservée\n\n**Invalidité** :\n- Réduction de la capacité de gain\n- 3 catégories selon gravité\n- Pension d'invalidité\n- Peut nécessiter assistance tierce personne`,
        
        'certificat medical initial': `📋 **Contenu du certificat médical initial AT**\n\n**Éléments obligatoires** :\n1. Date et heure de l'accident\n2. Nature des lésions constatées\n3. Localisation anatomique précise\n4. Durée prévisible de l'arrêt de travail\n5. Soins et traitements prescrits\n\n**Important** :\n- Délivré par le médecin lors de la 1ère consultation\n- Document fondamental pour la prise en charge\n- Détermineinterrompra ou non l'indemnisation`,
        
        'consolidation': `🏥 **Qu'est-ce que la consolidation ?**\n\n**Définition** :\nLa consolidation marque le moment où :\n- Les lésions se fixent définitivement\n- Les traitements actifs ne sont plus nécessaires\n- L'état de la victime devient permanent\n\n**Conséquences** :\n✅ Fin des indemnités journalières\n✅ Fixation du taux d'incapacité permanente\n✅ Attribution d'une rente si taux ≥ 1%\n✅ Évaluation du préjudice définitif`,
        
        'taux incapacite fixation': `📊 **Comment est fixé le taux d'incapacité ?**\n\n**Critères d'évaluation** :\n1. Nature et gravité des lésions\n2. Âge de la victime\n3. Profession exercée\n4. État général et antécédents\n5. Barème indicatif d'invalidité\n\n**Procédure** :\n- Examen médical par le médecin conseil\n- Référence au barème officiel\n- Taux provisoire puis définitif\n- Possibilité de révision`,
        
        'tierce personne conditions': `👤 **Conditions d'attribution d'une tierce personne**\n\n**Critères** :\n- Incapacité permanente **absolue**\n- Impossibilité d'effectuer seul les actes de la vie quotidienne\n- Besoin permanent d'assistance\n\n**Actes concernés** :\n- Alimentation\n- Hygiène corporelle\n- Déplacements\n- Habillage\n\n**Allocation** : Majoration de la rente d'accident du travail`,
        
        'procedure expertise medicale': `⚖️ **Procédure d'expertise médicale**\n\n**Selon la loi 08-08** :\n\n1. **Demande d'expertise** (Art. 19)\n   - Par l'assuré ou l'organisme\n   - Devant la commission de recours préalable\n\n2. **Désignation de l'expert** (Art. 20)\n   - Médecin spécialiste inscrit sur liste\n   - Choisi d'un commun accord ou par le juge\n\n3. **Expertise** (Art. 21-24)\n   - Examen contradictoire\n   - Rapport médical motivé\n   - Délai : 30 jours\n\n4. **Recours** (Art. 25)\n   - Contre-expertise possible`,
        
        'revision taux': `🔄 **Procédure de révision du taux d'incapacité**\n\n**Conditions** :\n- Aggravation ou amélioration de l'état\n- Demande dans les **3 ans** suivant la consolidation\n- Ou tout moment si aggravation importante\n\n**Procédure** :\n1. Demande motivée à la CNAS\n2. Examen médical de contrôle\n3. Nouvelle fixation du taux\n4. Révision de la rente\n\n**Important** : Le nouveau taux peut être supérieur ou inférieur`,
        
        'rechute': `🔁 **Comment gérer une rechute ?**\n\n**Définition** :\nRéapparition ou aggravation des lésions initiales après consolidation\n\n**Procédure** :\n1. Nouveau certificat médical\n2. Déclaration à la CNAS\n3. Mention "rechute d'AT du [date]"\n4. Reprise de l'indemnisation\n\n**Droits** :\n- Reprise des indemnités journalières\n- Frais médicaux couverts\n- Nouvelle consolidation possible\n- Révision du taux d'incapacité`,
        
        'recours prealable': `📋 **Le recours préalable est-il obligatoire ?**\n\n**OUI**, selon la loi 08-08, Article 4 :\n\n**Avant tout recours judiciaire** :\n1. Saisine obligatoire de la commission de recours préalable\n2. Délai : **2 mois** après notification de la décision\n3. La commission dispose de **30 jours** pour statuer\n\n**Après recours préalable** :\n- Si rejet ou silence : saisine de la juridiction compétente\n- Délai : **4 mois** après décision de la commission\n\n**Exception** : En cas d'urgence (arrêt de prestations)`,
        
        'commission invalidite': `🏛️ **Composition de la commission d'invalidité**\n\n**Selon la loi 83-15** :\n\n**Membres** :\n- Un magistrat (président)\n- Un médecin conseil de la sécurité sociale\n- Un médecin expert agréé\n- Un représentant de l'organisme\n- Un représentant des travailleurs\n\n**Rôle** :\n- Examen des dossiers d'invalidité\n- Fixation de la catégorie d'invalidité\n- Décision sur les droits à pension`,
        
        'faute inexcusable': `⚠️ **Définition de la faute inexcusable**\n\n**Selon la jurisprudence** :\n\nFaute d'une gravité exceptionnelle dérivant d'un acte ou d'une omission volontaire, de la conscience du danger que devait en avoir son auteur, de l'absence de toute cause justificative.\n\n**Éléments constitutifs** :\n1. Conscience du danger\n2. Absence de mesures de prévention\n3. Violation délibérée des règles\n4. Lien de causalité avec l'accident\n\n**Conséquences** :\n- Majoration de la rente (×1,5 à ×3)\n- Réparation du préjudice moral\n- Responsabilité de l'employeur`,
        
        'calcul indemnite journaliere': `💰 **Calcul de l'indemnité journalière**\n\n**Formule** :\n\n**IJ = (Salaire brut des 30 derniers jours) ÷ 30**\n\n**Taux** :\n- 100% du salaire journalier de référence\n- Dès le 1er jour (pas de délai de carence)\n- Pendant toute la durée de l'arrêt\n\n**Plafond** :\n- 80% du salaire mensuel de référence\n- Plafond mensuel fixé par réglementation\n\n**Versement** :\n- Mensuel par la CNAS\n- Après réception certificats médicaux`,
        
        'categories invalidite': `📊 **Catégories d'invalidité**\n\n**3 catégories selon la loi 83-15** :\n\n**1ère catégorie** :\n- Peut exercer une activité rémunérée\n- Pension = 60% du salaire de référence\n\n**2ème catégorie** :\n- Incapable d'exercer une activité\n- Pension = 80% du salaire de référence\n\n**3ème catégorie** :\n- Nécessite assistance d'une tierce personne\n- Pension = 80% + majoration tierce personne (40%)\n- Total = 120% du salaire`,
        
        'etat anterieur': `🔬 **Prise en charge de l'état antérieur**\n\n**Principe** :\n- L'accident du travail doit être pris en charge même si état pathologique préexistant\n- Seules les conséquences directes de l'AT sont indemnisées\n\n**Évaluation** :\n- Le médecin expert distingue :\n  * Part imputable à l'AT\n  * Part imputable à l'état antérieur\n\n**Taux d'IPP** :\n- Ne tient compte que des séquelles liées à l'AT\n- L'état antérieur n'augmente pas le taux si non aggravé`,
        
        'delai expertise medicale': `⏱️ **Délai pour expertise médicale**\n\n**Selon la loi 08-08, Article 20** :\n\n**Désignation de l'expert** :\n- Dans les **15 jours** après la demande\n\n**Réalisation de l'expertise** :\n- L'expert dispose de **30 jours** maximum\n- Délai peut être prolongé en cas de complexité\n\n**Remise du rapport** :\n- Sous **30 jours** après l'examen\n- Rapport médical circonstancié et motivé`,
        
        'honoraires expert': `💰 **Rôle et honoraires du médecin expert**\n\n**Rôle de l'expert** :\n- Examen médical contradictoire\n- Évaluation objective des lésions\n- Fixation du taux d'IPP\n- Rédaction d'un rapport motivé\n\n**Honoraires** :\n- Fixés par barème réglementaire\n- À la charge de l'organisme de sécurité sociale\n- Montant selon la complexité de l'expertise\n\n**Indépendance** :\n- Expert inscrit sur liste officielle\n- Ne doit avoir aucun lien avec les parties`,
        
        'prejudice esthetique': `🎨 **Préjudice esthétique**\n\n**Définition** :\nPréjudice résultant des atteintes physiques visibles (cicatrices, déformations, etc.)\n\n**Évaluation** :\n- **Code Civil, Article 182** : Réparation intégrale\n- Appréciation médicale objective\n- Impact psychologique et social\n- Échelle de 1 à 7 points\n\n**Indemnisation** :\n- Poste distinct du taux d'IPP\n- Capital ou rente selon gravité\n- Cumulable avec autres préjudices\n\n**Critères** :\n- Localisation (visage, mains...)\n- Étendue et aspect\n- Âge et sexe de la victime\n- Profession`,
        
        'frais medicaux': `💊 **Frais médicaux - Code Civil**\n\n**Article 182 du Code Civil** :\n"La réparation consiste à remettre la victime dans l'état où elle se trouvait avant le dommage ou à lui verser des dommages-intérêts..."\n\n**Frais couverts** :\n- Soins médicaux et chirurgicaux\n- Médicaments prescrits\n- Frais d'hospitalisation\n- Appareillage et prothèses\n- Rééducation et kinésithérapie\n- Frais de transport sanitaire\n\n**Principe** :\n- Réparation intégrale\n- Frais réels justifiés\n- Futurs et actuels`,
        
        'assistance tierce personne': `👤 **Assistance tierce personne**\n\n**Code Civil, Article 182** :\nInclut l'assistance d'une tierce personne dans la réparation intégrale\n\n**Conditions** :\n- Incapacité permanente absolue  \n- Impossibilité d'accomplir seul les actes essentiels\n- Besoin permanent ou intermittent\n\n**Évaluation** :\n- Nombre d'heures nécessaires par jour\n- Qualification de l'aide requise\n- Nature des actes (nursing, surveillance...)\n\n**Indemnisation** :\n- Majoration de 40% de la rente (AT/MP)\n- Ou capital selon coût réel (Droit commun)\n- Peut être > 100% en cas de grande dépendance`,
        
        'indemnisation prejudice corporel': `⚖️ **Indemnisation préjudice corporel**\n\n**Code Civil, Article 124** :\n"Tout fait quelconque de l'homme qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer."\n\n**Article 182** :\n"La réparation consiste à remettre la victime dans l'état où elle se trouvait avant le dommage..."\n\n**Préjudices indemnisables** :\n✅ Préjudice physiologique (IPP)\n✅ Souffrances endurées\n✅ Préjudice esthétique\n✅ Préjudice d'agrément\n✅ Frais médicaux\n✅ Perte de revenus\n✅ Assistance tierce personne\n✅ Préjudice moral`,
        
        'responsabilite civile': `⚖️ **Responsabilité civile - Code Civil**\n\n**Article 124** :\n"Tout fait quelconque de l'homme qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer."\n\n**Conditions de la responsabilité** :\n1. ❌ **Faute** (action ou omission)\n2. 💥 **Dommage** (préjudice certain)\n3. 🔗 **Lien de causalité** (entre faute et dommage)\n\n**Article 125** :\nResponsabilité pour faute d'imprudence ou de négligence\n\n**Réparation** :\n- Principe de réparation intégrale (Art. 182)\n- Dommages-intérêts compensatoires\n- Remise en état si possible`,
    };
    
    // D'abord vérifier le mapping direct
    const mappedKey = suggestionMapping[normalizedQuery];
    if (mappedKey && questionsReponses[mappedKey]) {
        console.log(`✅ Match direct via mapping: "${mappedKey}"`);
        return questionsReponses[mappedKey];
    }
    
    // Recherche dans les questions-réponses avec matching intelligent
    for (const [question, reponse] of Object.entries(questionsReponses)) {
        const normalizedQuestion = normalizeText(question);
        const questionWords = normalizedQuestion.split(' ').filter(w => w.length > 2);
        
        // Compter combien de mots clés correspondent
        const matchCount = questionWords.filter(word => normalizedQuery.includes(word)).length;
        const matchRatio = matchCount / questionWords.length;
        
        // Match si au moins 50% des mots clés correspondent OU correspondance exacte
        if (matchRatio >= 0.5 || normalizedQuery.includes(normalizedQuestion)) {
            console.log(`✅ Match trouvé: "${question}" (${Math.round(matchRatio * 100)}% correspondance)`);
            return reponse;
        }
    }
    
    // --- Recherche générale dans le Code Civil complet ---
    const civilCodeKeywords = ['responsabilite', 'dommage', 'indemnisation', 'prejudice', 'reparation', 'incapacite', 'consolidation', 'expertise', 'frais medicaux', 'tierce personne'];
    const hasCivilCodeKeyword = civilCodeKeywords.some(kw => normalizedQuery.includes(kw));
    
    if (hasCivilCodeKeyword || normalizedQuery.includes('civil')) {
        // Recherche dans le texte complet du Code Civil
        const searchResults = rechercherDansCodeCivil(query);
        
        if (searchResults.trouve && searchResults.nombreOccurrences > 0) {
            let response = `📜 **Résultats dans le Code Civil** (${searchResults.nombreOccurrences} occurrence${searchResults.nombreOccurrences > 1 ? 's' : ''} trouvée${searchResults.nombreOccurrences > 1 ? 's' : ''}) :\n\n`;
            
            searchResults.resultats.slice(0, 3).forEach((extrait, index) => {
                response += `**${index + 1}.** ${extrait}\n\n`;
            });
            
            if (searchResults.nombreOccurrences > 3) {
                response += `\n_Et ${searchResults.nombreOccurrences - 3} autre${searchResults.nombreOccurrences - 3 > 1 ? 's' : ''} occurrence${searchResults.nombreOccurrences - 3 > 1 ? 's' : ''}_`;
            }
            
            return response;
        }
    }
    
    // --- Specific Article Lookup (Lois de sécurité sociale) ---
    const articleMatch = normalizedQuery.match(/article (\d+)\s*(?:de la loi\s*)?(\d{2,2}-\d{2,2})?/);
    if (articleMatch) {
        const articleNum = parseInt(articleMatch[1], 10);
        const lawNum = articleMatch[2]; // e.g., "08-08"
        const lawId = lawNum ? `loi_${lawNum.replace('-', '_')}` : 'loi_08_08'; // Default to most recent
        
        const articleContent = findArticle(lawId, articleNum);
        if(articleContent) {
            const lawTitle = legalTexts.find(l => l.id === lawId)?.title || '';
            return `Voici le contenu de l'**Article ${articleNum}** de la **${lawTitle}** :\n\n"${articleContent}"`;
        }
    }
    
    // --- Keyword-based Intent Matching ---
    const intents = {
        delai_expertise: { keywords: ['delai', 'expertise medicale'], law: 'loi_08_08', article: 20 },
        procedure_expertise: { keywords: ['procedure', 'expertise medicale'], law: 'loi_08_08', articles: [20, 21, 22, 23, 24, 25] },
        definition_faute_inexcusable: { keywords: ['definition', 'faute inexcusable'], law: 'loi_83_15', article: 45 },
        composition_commission_locale: { keywords: ['composition', 'commission locale recours'], law: 'loi_08_08', article: 6 },
        composition_commission_invalidite: { keywords: ['composition', 'commission', 'invalidite'], law: 'loi_83_15', article: 32 },
        recours_prealable_obligatoire: { keywords: ['recours prealable', 'obligatoire'], law: 'loi_08_08', article: 4 },
        definition_contentieux_medical: { keywords: ['definition', 'contentieux medical'], law: 'loi_08_08', article: 17 }
    };

    for (const key in intents) {
        const intent = intents[key as keyof typeof intents];
        if (intent.keywords.every(kw => normalizedQuery.includes(kw))) {
             if ('article' in intent) {
                const articleContent = findArticle(intent.law, intent.article);
                const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
                return `D'après la **${lawTitle}** :\n\n${articleContent}`;
            }
             if ('articles' in intent) {
                 const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
                 const content = intent.articles.map(num => `*   **Art. ${num}** : ${findArticle(intent.law, num)?.substring(0, 150)}...`).join('\n');
                 return `La procédure est détaillée dans les articles suivants de la **${lawTitle}** :\n\n${content}\n\nJe vous recommande de demander un article spécifique pour plus de détails (ex: "article 21 de la loi 08-08").`;
            }
        }
    }

    // --- Generic Keyword Search as Fallback ---
    const queryKeywords = normalizedQuery.split(' ').filter(w => w.length > 3);
    if(queryKeywords.length > 0) {
        const searchResults = searchKeywords(queryKeywords);
        if(searchResults.length > 0) {
            const topResult = searchResults[0];
            return `J'ai trouvé une information pertinente dans la **${topResult.source}** :\n\n${topResult.snippet}\n\nPour une réponse plus précise, essayez de formuler votre question différemment ou de demander un article spécifique.`;
        }
    }

    return "Je n'ai pas trouvé de réponse précise dans les textes de loi. Pouvez-vous reformuler votre question ou essayer l'une des suggestions ci-dessous ?";
};


// --- UI COMPONENTS ---

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 p-3 animate-fade-in">
        <span className="text-slate-500 text-sm">Analyse en cours</span>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.3s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.15s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
    </div>
);

const MessageBubble: React.FC<{ message: Message }> = React.memo(({ message }) => {
    const isUser = message.role === 'user';
    // Préserver les émojis UTF-8 en traitant ligne par ligne
    const formattedText = message.text
        .split('\n')
        .map(line => line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
        .join('<br />');

    return (
        <div className={`flex flex-col animate-fade-in ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm ${isUser ? 'bg-primary-700 text-white rounded-br-lg' : 'bg-white border border-gray-200/80 text-slate-800 rounded-bl-lg'}`}>
                <div 
                    className="text-sm prose max-w-none prose-p:text-inherit" 
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                    style={{ unicodeBidi: 'embed' }}
                ></div>
            </div>
        </div>
    );
});

const SuggestionChip: React.FC<{ text: string, onClick: (text: string) => void }> = React.memo(({ text, onClick }) => (
    <button 
        onClick={() => onClick(text)}
        className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-medium rounded-full hover:bg-primary-200 hover:text-primary-800 transition-colors"
    >
        {text}
    </button>
));

const Highlight: React.FC<{ text: string; highlight: string }> = React.memo(({ text, highlight }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
});

// Composant mémorisé pour un article individuel
const ArticleCard: React.FC<{ 
    article: typeof civilCodeArticles[0]; 
    highlight: string 
}> = React.memo(({ article, highlight }) => (
    <div className="border-l-4 border-primary-500 pl-4 py-2 bg-slate-50 rounded">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <h3 className="font-bold text-primary-700">Article {article.article}</h3>
                <p className="text-sm text-slate-600 italic">{article.title}</p>
            </div>
            <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded">{article.category}</span>
        </div>
        <p className="mt-2 text-sm text-slate-700">
            <Highlight text={article.content} highlight={highlight} />
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
            {article.keywords.map(kw => (
                <span key={kw} className="px-2 py-0.5 text-xs bg-slate-200 text-slate-600 rounded">
                    {kw}
                </span>
            ))}
        </div>
    </div>
));


// --- MAIN COMPONENT ---
export const LegislativeGuide: React.FC = () => {
    const [activeView, setActiveView] = useState<'ai' | 'docs'>('ai');

    // AI State
    const [messages, setMessages] = useState<Message[]>([
        { id: crypto.randomUUID(), role: 'model', text: "Bonjour, je suis votre assistant juridique spécialisé en sécurité sociale.\n\n📜 **Bases de données disponibles** :\n- Code Civil Algérien COMPLET (395 pages, 750 000+ caractères)\n- Lois de sécurité sociale (08-08, 83-11, 83-13, 83-15)\n- Procédures d'expertise et de contentieux\n\n💡 **Je peux** :\n- Chercher n'importe quel article du Code Civil\n- Rechercher par mot-clé dans tout le Code Civil\n- Répondre sur les lois de sécurité sociale\n\nPosez votre question ou utilisez les suggestions !" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Docs State
    const [activeDocId, setActiveDocId] = useState<string>(legalTexts[0].id);
    const [docSearchTerm, setDocSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const searchTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (activeView === 'ai') {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading, activeView]);
    
    // Debounce pour la recherche
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearchTerm(docSearchTerm);
        }, 200);
        
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [docSearchTerm]);

    const handleSend = async (query?: string) => {
        const textToSend = query || userInput.trim();
        if (!textToSend || isLoading) return;

        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text: textToSend }]);
        if(!query) setUserInput('');
        setIsLoading(true);
        
        await new Promise(res => setTimeout(res, 500));
        const response = processQuery(textToSend);
        
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: response }]);
        setIsLoading(false);
    };

    const suggestions = [
        // Code Civil Algérien - Articles populaires
        "Article 124 du code civil",
        "Article 182 du code civil",
        "Article 316 du code civil",
        "Responsabilité civile code civil",
        "Indemnisation préjudice corporel",
        "Frais médicaux code civil",
        "Consolidation code civil",
        "Assistance tierce personne",
        "Préjudice esthétique",
        "Expertise médicale",
        
        // Questions Générales AT/MP
        "Définition accident du travail",
        "Qu'est-ce qu'un accident de trajet ?",
        "Délai de déclaration d'un accident",
        "Déclaration d'une maladie professionnelle",
        "Différence entre incapacité et invalidité",

        // Rôle du Médecin
        "Contenu du certificat médical initial AT",
        "Qu'est-ce que la consolidation ?",
        "Comment est fixé le taux d'incapacité ?",
        "Prise en charge de l'état antérieur",
        "Conditions d'attribution d'une tierce personne",
        
        // Procédures et Recours
        "Procédure expertise médicale",
        "Délai pour expertise médicale",
        "Rôle et honoraires du médecin expert",
        "Procédure de révision du taux d'incapacité",
        "Comment gérer une rechute ?",
        "Le recours préalable est-il obligatoire ?",
        "Composition commission d'invalidité",

        // Questions spécifiques
        "Définition faute inexcusable",
        "Calcul de l'indemnité journalière",
        "Quelles sont les catégories d'invalidité ?",
    ];

    const currentDocument = useMemo(() => legalTexts.find(doc => doc.id === activeDocId), [activeDocId]);
    
    // Filtrage mémorisé des articles - utilise debouncedSearchTerm au lieu de docSearchTerm
    const filteredArticles = useMemo(() => {
        if (!debouncedSearchTerm) return civilCodeArticles;
        
        const lowerSearch = debouncedSearchTerm.toLowerCase();
        return civilCodeArticles.filter(article => 
            article.title.toLowerCase().includes(lowerSearch) ||
            article.content.toLowerCase().includes(lowerSearch) ||
            article.keywords.some(k => k.toLowerCase().includes(lowerSearch))
        );
    }, [debouncedSearchTerm]);

    return (
        <div className="flex flex-col h-full bg-background p-2 sm:p-4">
             <div className="flex-shrink-0 p-1 bg-slate-200 rounded-lg flex gap-1 mb-4">
                <button onClick={() => setActiveView('ai')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeView === 'ai' ? 'bg-white text-primary-700 shadow' : 'text-slate-600'}`}>Assistant IA</button>
                <button onClick={() => setActiveView('docs')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeView === 'docs' ? 'bg-white text-primary-700 shadow' : 'text-slate-600'}`}>Textes Complets</button>
            </div>
            
            {activeView === 'ai' ? (
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="mb-3 flex flex-wrap gap-2">
                            {suggestions.map(s => <SuggestionChip key={s} text={s} onClick={handleSend} />)}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="userQuery"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Posez votre question ici..."
                                className="flex-1 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:outline-none text-black placeholder:text-slate-500 bg-white"
                                aria-label="Posez votre question juridique"
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <Button onClick={() => handleSend()} disabled={isLoading || !userInput.trim()} className="!p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    <div className="flex-shrink-0 border-b border-slate-200 overflow-x-auto custom-scrollbar">
                        <div className="flex space-x-2 p-2">
                            <button
                                onClick={() => setActiveDocId('code_civil')}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                                    activeDocId === 'code_civil'
                                    ? 'bg-primary-600 text-white shadow'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                            >
                                📜 Code Civil (SS)
                            </button>
                            {legalTexts.map(doc => (
                                <button
                                    key={doc.id}
                                    onClick={() => setActiveDocId(doc.id)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                                        activeDocId === doc.id
                                        ? 'bg-primary-600 text-white shadow'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                    }`}
                                >
                                    {doc.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-2 flex-shrink-0">
                        <input
                            type="text"
                            name="docSearch"
                            value={docSearchTerm}
                            onChange={(e) => setDocSearchTerm(e.target.value)}
                            placeholder="Rechercher dans ce texte..."
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 bg-white border border-slate-200 rounded-lg">
                        {activeDocId === 'code_civil' ? (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">📜 Code Civil Algérien - Articles liés à la Sécurité Sociale</h2>
                                {filteredArticles.map(article => (
                                    <ArticleCard 
                                        key={article.article} 
                                        article={article} 
                                        highlight={debouncedSearchTerm} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <pre className="text-sm whitespace-pre-wrap font-sans">
                                {currentDocument && <Highlight text={currentDocument.content} highlight={debouncedSearchTerm} />}
                            </pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LegislativeGuide;
