/**
 * Script d'extraction de tous les articles du Code Civil Algérien depuis le PDF
 * Extrait le texte exact tel qu'il apparaît dans le PDF
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins
const PDF_PATH = path.join(__dirname, '..', 'data', 'Code_Civil.pdf');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'civilCodeComplete.ts');

// Mots-clés pour identifier les articles pertinents pour la sécurité sociale
const SS_KEYWORDS = [
  'responsabilité', 'dommage', 'préjudice', 'indemnisation', 'réparation',
  'incapacité', 'invalidité', 'accident', 'travail', 'maladie',
  'professionnel', 'employeur', 'salarié', 'victime', 'consolidation',
  'expertise', 'médical', 'frais', 'soins', 'traitement', 'tierce personne',
  'esthétique', 'moral', 'corporel', 'faute', 'négligence', 'imprudence',
  'assurance', 'cotisation', 'prestation', 'pension', 'rente'
];

/**
 * Extrait le texte du PDF
 */
async function extractTextFromPDF() {
  console.log('📖 Lecture du PDF:', PDF_PATH);
  
  const dataBuffer = fs.readFileSync(PDF_PATH);
  const data = await pdfParse(dataBuffer);
  
  console.log(`✅ PDF lu: ${data.numpages} pages, ${data.text.length} caractères`);
  return data.text;
}

/**
 * Extrait les articles du texte
 */
function extractArticles(text) {
  console.log('\n🔍 Extraction des articles...');
  
  const articles = [];
  
  // Pattern pour détecter les articles
  // Format: "Article XXX" ou "Art. XXX" suivi du texte jusqu'au prochain article
  const articleRegex = /(?:Article|Art\.?)\s+(\d+(?:\s*bis|\s*ter)?)\s*[:\.\-]?\s*([\s\S]*?)(?=(?:Article|Art\.?)\s+\d+|$)/gi;
  
  let match;
  while ((match = articleRegex.exec(text)) !== null) {
    const number = match[1].trim();
    let content = match[2].trim();
    
    // Nettoyer le contenu
    content = content.replace(/\s+/g, ' ');  // Espaces multiples
    content = content.substring(0, 3000);  // Limiter à 3000 caractères
    
    if (content.length > 10) {  // Ignorer les articles vides
      const { isRelevant, category, keywords } = categorizeArticle(number, content);
      
      articles.push({
        number,
        content,
        category,
        keywords,
        relevantForSS: isRelevant
      });
    }
  }
  
  console.log(`✅ ${articles.length} articles extraits`);
  return articles;
}

/**
 * Catégorise un article et détermine sa pertinence pour la SS
 */
function categorizeArticle(number, content) {
  const contentLower = content.toLowerCase();
  
  // Compter les mots-clés présents
  const presentKeywords = SS_KEYWORDS.filter(kw => contentLower.includes(kw));
  const relevanceScore = presentKeywords.length;
  
  // Seuil de pertinence: au moins 2 mots-clés
  if (relevanceScore >= 2) {
    let category = 'Général';
    
    if (['responsabilité', 'faute', 'négligence', 'imprudence'].some(w => contentLower.includes(w))) {
      category = 'Responsabilité';
    } else if (['indemnisation', 'réparation', 'dommage', 'préjudice'].some(w => contentLower.includes(w))) {
      category = 'Indemnisation';
    } else if (['expertise', 'consolidation', 'procédure'].some(w => contentLower.includes(w))) {
      category = 'Procédure';
    } else if (['assurance', 'cotisation', 'prestation'].some(w => contentLower.includes(w))) {
      category = 'Sécurité Sociale';
    }
    
    return {
      isRelevant: true,
      category,
      keywords: presentKeywords.slice(0, 10)  // Max 10 mots-clés
    };
  }
  
  return { isRelevant: false };
}

/**
 * Sauvegarde les articles dans un fichier TypeScript
 */
function saveToTypeScript(articles) {
  console.log('\n💾 Génération du fichier TypeScript...');
  
  const ssRelevantCount = articles.filter(a => a.relevantForSS).length;
  
  let tsContent = `/**
 * Code Civil Algérien - Tous les articles extraits du PDF
 * Extraction automatique - ${new Date().toLocaleDateString('fr-FR')}
 * 
 * Total: ${articles.length} articles
 * Pertinents pour SS: ${ssRelevantCount} articles
 */

export interface CivilCodeArticle {
  number: string;
  content: string;
  category?: string;
  keywords?: string[];
  relevantForSS: boolean;
}

export const allCivilCodeArticles: CivilCodeArticle[] = [
`;

  articles.forEach(article => {
    // Échapper les caractères spéciaux
    const content = article.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    tsContent += `  {
    number: "${article.number}",
    content: \`${content}\`,
`;
    
    if (article.category) {
      tsContent += `    category: "${article.category}",\n`;
    }
    
    if (article.keywords && article.keywords.length > 0) {
      tsContent += `    keywords: ${JSON.stringify(article.keywords)},\n`;
    }
    
    tsContent += `    relevantForSS: ${article.relevantForSS}
  },
`;
  });

  tsContent += `];

// Articles pertinents pour la sécurité sociale uniquement
export const ssRelevantArticles = allCivilCodeArticles.filter(a => a.relevantForSS);

// Recherche par numéro d'article
export function getArticle(number: string): CivilCodeArticle | undefined {
  return allCivilCodeArticles.find(a => a.number === number);
}

// Recherche par texte
export function searchArticles(query: string): CivilCodeArticle[] {
  const lowerQuery = query.toLowerCase();
  return allCivilCodeArticles.filter(a => 
    a.number.includes(query) ||
    a.content.toLowerCase().includes(lowerQuery) ||
    (a.keywords && a.keywords.some(k => k.toLowerCase().includes(lowerQuery)))
  );
}

// Recherche par catégorie
export function getArticlesByCategory(category: string): CivilCodeArticle[] {
  return allCivilCodeArticles.filter(a => a.category === category);
}

// Statistiques
export const stats = {
  total: ${articles.length},
  ssRelevant: ${ssRelevantCount},
  categories: allCivilCodeArticles.reduce((acc, a) => {
    if (a.category) {
      acc[a.category] = (acc[a.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>)
};
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
  console.log(`✅ Fichier créé: ${OUTPUT_PATH}`);
}

/**
 * Fonction principale
 */
async function main() {
  console.log('='.repeat(60));
  console.log('🚀 EXTRACTION DU CODE CIVIL ALGÉRIEN DEPUIS PDF');
  console.log('='.repeat(60));
  
  try {
    // Étape 1: Extraire le texte du PDF
    const text = await extractTextFromPDF();
    
    // Étape 2: Extraire les articles
    const articles = extractArticles(text);
    
    if (articles.length === 0) {
      console.log('❌ Aucun article trouvé dans le PDF');
      return;
    }
    
    // Étape 3: Sauvegarder
    saveToTypeScript(articles);
    
    // Résumé
    const ssRelevantCount = articles.filter(a => a.relevantForSS).length;
    const categories = articles
      .filter(a => a.category)
      .reduce((acc, a) => {
        acc[a.category] = (acc[a.category] || 0) + 1;
        return acc;
      }, {});
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RÉSUMÉ DE L\'EXTRACTION');
    console.log('='.repeat(60));
    console.log(`Total articles: ${articles.length}`);
    console.log(`Articles pertinents SS: ${ssRelevantCount}`);
    console.log('\nRépartition par catégorie:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count} articles`);
    });
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Exécution
main();
