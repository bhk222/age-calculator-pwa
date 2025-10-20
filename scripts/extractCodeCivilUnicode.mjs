/**
 * Extraction du Code Civil Algérien avec support Unicode complet
 * Utilise pdf2json pour meilleure gestion de l'arabe
 */

import PDFParser from 'pdf2json';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, '..', 'data', 'Code_Civil.pdf');
const outputPath = path.join(__dirname, '..', 'data', 'codeCivilComplet.ts');

console.log('📜 Extraction du Code Civil avec support Unicode/Arabe...');
console.log('📁 Source:', pdfPath);

const pdfParser = new PDFParser(null, 1);

// Stocker tout le texte
let fullText = '';
let articleCount = 0;
const articles = {};

pdfParser.on('pdfParser_dataError', (errData) => {
  console.error('❌ Erreur:', errData.parserError);
});

pdfParser.on('pdfParser_dataReady', (pdfData) => {
  console.log(`📄 Total de pages: ${pdfData.Pages.length}`);
  console.log('⏳ Extraction en cours...\n');

  // Extraire le texte de chaque page
  pdfData.Pages.forEach((page, pageIndex) => {
    let pageText = '';
    
    // Extraire les textes de la page
    if (page.Texts) {
      page.Texts.forEach((textItem) => {
        textItem.R.forEach((run) => {
          try {
            // Décoder l'URI et préserver l'Unicode
            const decodedText = decodeURIComponent(run.T);
            pageText += decodedText + ' ';
          } catch (e) {
            // Si le décodage échoue, essayer sans décoder
            pageText += run.T + ' ';
          }
        });
      });
    }
    
    fullText += pageText + '\n';
    
    if ((pageIndex + 1) % 20 === 0) {
      console.log(`✓ Pages 1-${pageIndex + 1} traitées`);
    }
  });

  console.log(`✓ Pages 1-${pdfData.Pages.length} traitées\n`);

  // Nettoyer le texte
  let cleanedText = fullText
    .replace(/\n{3,}/g, '\n\n')  // Réduire sauts de ligne
    .replace(/ {2,}/g, ' ')       // Réduire espaces
    .replace(/([.!?])\s*([A-Z])/g, '$1\n$2')  // Séparer phrases
    .trim();

  console.log('🔍 Extraction des articles...');

  // Extraire les articles (pattern amélioré pour français/arabe)
  const articlePattern = /(?:Art\.|Article|المادة)\s*(\d+(?:\s*(?:bis|ter|مكرر))?)[:\s\-–—]/gi;
  const matches = [...cleanedText.matchAll(articlePattern)];

  matches.forEach((match, index) => {
    const articleNum = match[1].trim();
    const startPos = match.index;
    
    // Trouver la fin (prochain article ou fin du texte)
    const nextMatch = matches[index + 1];
    const endPos = nextMatch ? nextMatch.index : cleanedText.length;
    
    // Extraire le contenu
    let articleContent = cleanedText.substring(startPos, Math.min(endPos, startPos + 3000)).trim();
    
    // Nettoyer
    articleContent = articleContent
      .replace(/\n{3,}/g, '\n\n')
      .replace(/ {2,}/g, ' ')
      .trim();
    
    // Garder le plus long si doublon
    if (!articles[articleNum] || articleContent.length > articles[articleNum].length) {
      articles[articleNum] = articleContent;
      articleCount++;
    }
  });

  console.log(`✅ ${Object.keys(articles).length} articles extraits\n`);

  // Statistiques
  const totalChars = fullText.length;
  const cleanedChars = cleanedText.length;

  console.log('✅ Extraction terminée');
  console.log(`📊 Texte total: ${totalChars.toLocaleString()} caractères`);
  console.log(`📊 Texte nettoyé: ${cleanedChars.toLocaleString()} caractères`);
  console.log(`📊 Articles identifiés: ${Object.keys(articles).length}`);

  // Générer le fichier TypeScript avec Unicode préservé
  const tsContent = `/**
 * Code Civil Algérien - Version complète avec support Unicode/Arabe
 * Extraction automatique du PDF officiel
 * Date: ${new Date().toISOString()}
 * Pages: ${pdfData.Pages.length}
 * Caractères: ${cleanedChars.toLocaleString()}
 * Articles: ${Object.keys(articles).length}
 * 
 * ⚠️ Encodage UTF-8 avec support complet de l'arabe
 */

export const codeCivilMetadata = {
  dateExtraction: "${new Date().toISOString()}",
  nombrePages: ${pdfData.Pages.length},
  tailleCaracteres: ${cleanedChars},
  nombreArticles: ${Object.keys(articles).length},
  source: "Code_Civil.pdf",
  encodage: "UTF-8"
};

// Articles individuels extraits
export const codeCivilArticles: Record<string, string> = ${JSON.stringify(articles, null, 2)};

// Texte complet du Code Civil
export const codeCivilComplet = \`${cleanedText.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

/**
 * Recherche un article spécifique par son numéro
 */
export function rechercherArticle(numero: string): string | null {
  const numNormalized = numero.trim().toLowerCase();
  
  // Recherche directe dans les articles extraits
  for (const [key, value] of Object.entries(codeCivilArticles)) {
    if (key.toLowerCase() === numNormalized) {
      return value;
    }
  }
  
  // Recherche dans le texte complet avec plusieurs patterns
  const patterns = [
    new RegExp(\`Art\\\\.\\\\s*\${numero}[:\\\\s\\\\-–—]([\\\\s\\\\S]{0,2000}?)(?=Art\\\\.|المادة|$)\`, 'i'),
    new RegExp(\`Article\\\\s*\${numero}[:\\\\s\\\\-–—]([\\\\s\\\\S]{0,2000}?)(?=Art\\\\.|المادة|$)\`, 'i'),
    new RegExp(\`المادة\\\\s*\${numero}[:\\\\s\\\\-–—]([\\\\s\\\\S]{0,2000}?)(?=Art\\\\.|المادة|$)\`, 'i')
  ];
  
  for (const pattern of patterns) {
    const match = codeCivilComplet.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  
  return null;
}

/**
 * Recherche par mot-clé dans le Code Civil
 */
export function rechercherDansCodeCivil(motCle: string): {
  trouve: boolean;
  resultats: Array<{ extrait: string; position: number }>;
  nombreOccurrences: number;
} {
  const motCleNormalized = motCle.toLowerCase();
  const resultats: Array<{ extrait: string; position: number }> = [];
  
  let position = 0;
  const texte = codeCivilComplet.toLowerCase();
  
  while (position < texte.length) {
    const index = texte.indexOf(motCleNormalized, position);
    if (index === -1) break;
    
    // Extraire contexte
    const debut = Math.max(0, index - 150);
    const fin = Math.min(codeCivilComplet.length, index + motCle.length + 150);
    const extrait = codeCivilComplet.substring(debut, fin);
    
    resultats.push({ extrait, position: index });
    position = index + motCle.length;
  }
  
  return {
    trouve: resultats.length > 0,
    resultats: resultats.slice(0, 5),
    nombreOccurrences: resultats.length
  };
}
`;

  // Écrire avec encodage UTF-8
  fs.writeFileSync(outputPath, tsContent, { encoding: 'utf-8' });

  console.log(`\n✅ Fichier créé: ${outputPath}`);
  console.log('\n📚 Code Civil avec support Unicode/Arabe disponible !');
  console.log('\n💡 Fonctionnalités:');
  console.log(`   - ${Object.keys(articles).length} articles extraits`);
  console.log('   - rechercherArticle(numero)');
  console.log('   - rechercherDansCodeCivil(motCle)');
  console.log('   - Texte complet avec arabe préservé');
});

pdfParser.loadPDF(pdfPath);
