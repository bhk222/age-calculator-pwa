/**
 * Script d'extraction simple du Code Civil depuis PDF
 * Utilise pdfjs-dist pour extraire le texte
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '..', 'data', 'Code_Civil.pdf');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'allCivilCodeArticlesExtracted.ts');

console.log('🔍 Extraction du Code Civil Algérien...');
console.log('📁 PDF:', PDF_PATH);

async function extractText() {
  // Charger le PDF
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  console.log(`📄 Pages: ${pdf.numPages}`);
  
  let fullText = '';
  
  // Extraire le texte de toutes les pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
    
    if (i % 10 === 0) {
      console.log(`   Traité: ${i}/${pdf.numPages} pages`);
    }
  }
  
  console.log(`\n✅ Texte extrait: ${fullText.length} caractères`);
  
  // Extraire les articles
  const articles = [];
  
  // Pattern pour détecter les articles
  // Format: "Article 316" ou "Art. 316" suivi du contenu
  const regex = /(?:Article|Art\.)\s+(\d+(?:\s+bis)?)\s*[:\.\-]?\s*([^\n]+(?:\n(?!(?:Article|Art\.))[^\n]+)*)/gi;
  
  let match;
  while ((match = regex.exec(fullText)) !== null) {
    const number = match[1].trim();
    let content = match[2].trim();
    
    // Nettoyer le contenu
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
    
    if (content.length > 15) {
      articles.push({
        number,
        content: content.substring(0, 2000) // Limiter la longueur
      });
    }
  }
  
  console.log(`📊 Articles extraits: ${articles.length}`);
  
  // Afficher les 5 premiers
  console.log('\n📝 Exemples d\'articles extraits:');
  articles.slice(0, 5).forEach(a => {
    console.log(`\nArticle ${a.number}:`);
    console.log(`  ${a.content.substring(0, 100)}...`);
  });
  
  // Sauvegarder
  const tsContent = `/**
 * Code Civil Algérien - Extraction complète
 * Date: ${new Date().toISOString()}
 * Total: ${articles.length} articles
 */

export interface CivilCodeArticle {
  number: string;
  content: string;
}

export const civilCodeArticlesFromPDF: CivilCodeArticle[] = ${JSON.stringify(articles, null, 2)};

export function getArticle(number: string): CivilCodeArticle | undefined {
  return civilCodeArticlesFromPDF.find(a => a.number === number);
}

export function searchArticles(keyword: string): CivilCodeArticle[] {
  const lower = keyword.toLowerCase();
  return civilCodeArticlesFromPDF.filter(a => 
    a.content.toLowerCase().includes(lower)
  );
}
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
  console.log(`\n✅ Sauvegardé: ${OUTPUT_PATH}`);
  console.log(`✨ Terminé !`);
}

extractText().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
