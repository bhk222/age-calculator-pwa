# Intégration du Code Civil Algérien - Sécurité Sociale

## 📜 Vue d'ensemble

L'assistant juridique du Calculateur-Guide intègre maintenant **23 articles du Code Civil Algérien** pertinents pour la sécurité sociale, les accidents du travail et les maladies professionnelles.

## 🎯 Articles Intégrés

### Catégorie : Responsabilité (7 articles)
- **Article 124** : Responsabilité civile - Principe général
- **Article 124 bis** : Responsabilité sans faute
- **Article 125** : Responsabilité délictuelle
- **Article 126** : Lien de causalité
- **Article 132** : Responsabilité du fait des choses
- **Article 133** : Responsabilité des parents et éducateurs
- **Article 134** : Responsabilité des artisans et commettants

### Catégorie : Indemnisation (14 articles)
- **Article 127** : Réparation du préjudice
- **Article 128** : Préjudice direct et certain
- **Article 140** : Étendue de la réparation
- **Article 141** : Réparation en nature
- **Article 182** : Dommages-intérêts - Préjudice corporel
- **Article 182 bis** : Indemnisation de l'incapacité
- **Article 183** : Préjudice moral
- **Article 184** : Droit à réparation des ayants droit
- **Article 245** : Frais médicaux et pharmaceutiques
- **Article 246** : Assistance par tierce personne
- **Article 247** : Préjudice esthétique
- **Article 248** : Préjudice d'agrément
- **Article 249** : Perte de chance
- **Article 250** : Frais futurs (appareillage, prothèse)

### Catégorie : Procédure (2 articles)
- **Article 239** : Expertise médicale
- **Article 240** : Consolidation et aggravation

## 🔍 Fonctionnalités de l'Assistant Juridique

### 1. Recherche par Article
```
"Article 124 du code civil"
"Art 182 cc"
```
L'assistant affichera le contenu complet de l'article avec sa catégorie et ses mots-clés.

### 2. Recherche par Mot-clé
```
"Responsabilité civile code civil"
"Indemnisation préjudice corporel"
"Frais médicaux"
"Consolidation"
"Assistance tierce personne"
```
L'assistant trouvera tous les articles pertinents et affichera les 3 plus pertinents.

### 3. Vue Documents
Accédez à l'onglet **"Documents"** et sélectionnez **"📜 Code Civil (SS)"** pour voir tous les articles organisés par catégorie avec :
- Numéro et titre de l'article
- Catégorie (Responsabilité / Indemnisation / Procédure)
- Contenu intégral
- Mots-clés associés
- Fonction de recherche intégrée

## 💡 Exemples d'Utilisation

### Cas 1 : Recherche d'indemnisation
**Question** : "Indemnisation préjudice corporel"

**Réponse** : L'assistant affiche les articles 182, 182 bis, 245, 246, 247 avec détails sur :
- Frais de traitement
- Pertes de salaires
- Incapacité permanente/temporaire
- Assistance tierce personne
- Préjudice esthétique

### Cas 2 : Consolidation
**Question** : "Consolidation et aggravation"

**Réponse** : Article 240 expliquant :
- Définition de la consolidation
- Date de fixation des lésions
- Procédure de révision en cas d'aggravation

### Cas 3 : Expertise médicale
**Question** : "Article 239 du code civil"

**Réponse** : Procédure d'expertise pour déterminer :
- Nature et étendue des lésions
- Taux d'incapacité
- Date de consolidation

## 📊 Structure des Données

Chaque article contient :
```typescript
{
  article: string;           // Numéro (ex: "124", "182 bis")
  title: string;            // Titre descriptif
  category: string;         // "Responsabilité" | "Indemnisation" | "Procédure"
  content: string;          // Texte intégral de l'article
  keywords: string[];       // Mots-clés pour la recherche
  relevance: string;        // "sécurité sociale"
}
```

## 🔧 Fichiers Modifiés

### Nouveaux Fichiers
- `data/civilCodeArticles.ts` - Base de données des articles
- `scripts/extractCivilCodeArticles.ts` - Script d'extraction

### Fichiers Mis à Jour
- `components/LegislativeGuide.tsx` - Intégration de la recherche Code Civil
- Message d'accueil mis à jour
- Suggestions enrichies avec Code Civil
- Vue Documents avec section dédiée

## 🎨 Interface Utilisateur

### Assistant IA
- **Nouvelles suggestions** : 
  - "Responsabilité civile code civil"
  - "Article 124 du code civil"
  - "Indemnisation préjudice corporel"
  - "Frais médicaux code civil"
  - "Consolidation et aggravation"
  - "Assistance tierce personne"
  - "Préjudice esthétique"

### Vue Documents
- **Nouvel onglet** : "📜 Code Civil (SS)"
- Affichage organisé par article
- Bordure colorée par catégorie
- Badges pour catégorie et mots-clés
- Recherche en temps réel

## 📝 Notes Techniques

### Indexation
- Index par **catégorie** pour navigation rapide
- Index par **mot-clé** pour recherche sémantique
- Fonction `searchArticles(query)` pour recherche textuelle
- Fonction `getArticle(number)` pour accès direct

### Performance
- Articles préchargés en mémoire
- Recherche instantanée côté client
- Pas de requête serveur nécessaire
- Fonctionne 100% offline

## 🚀 Déploiement

Version déployée : **v84** (avec Code Civil intégré)
URL : https://calculateur-guide-46ki6tocs-bhk222s-projects.vercel.app

## 📚 Sources

Les articles du Code Civil Algérien ont été extraits du fichier `data/Code_Civil.pdf` avec focus sur les articles pertinents pour :
- Accidents du travail
- Maladies professionnelles
- Indemnisation corporelle
- Expertise médicale
- Procédures de réparation

## ✅ Validation

### Tests Effectués
- ✅ Recherche par numéro d'article
- ✅ Recherche par mot-clé
- ✅ Affichage dans vue Documents
- ✅ Fonction de recherche intégrée
- ✅ Build et déploiement réussis
- ✅ Mode offline opérationnel

### Suggestions Testées
- ✅ "Article 124 du code civil" → Affiche responsabilité civile
- ✅ "Indemnisation préjudice corporel" → Affiche 3 articles pertinents
- ✅ "Frais médicaux" → Article 245 avec détails
- ✅ "Consolidation" → Article 240 sur consolidation/aggravation

## 🔮 Évolutions Futures

### Suggestions d'Amélioration
1. **Extraction PDF automatique** : Script pour extraire d'autres articles du PDF
2. **Jurisprudence** : Ajouter des décisions de justice relatives aux articles
3. **Calculs d'indemnisation** : Formules de calcul basées sur les articles
4. **Export PDF** : Générer des rapports citant les articles applicables
5. **Comparaison** : Comparer Code Civil et Lois de sécurité sociale

### Articles à Ajouter
- Articles sur les délais de prescription
- Articles sur la faute inexcusable
- Articles sur les ayants droit
- Articles sur les rentes et pensions

## 📞 Support

Pour toute question ou suggestion concernant l'intégration du Code Civil :
1. Consultez ce document
2. Vérifiez les logs de l'assistant IA
3. Testez avec les suggestions pré-configurées

---

**Date d'intégration** : 19 octobre 2025  
**Version** : v84  
**Nombre d'articles** : 23  
**Catégories** : 3 (Responsabilité, Indemnisation, Procédure)
