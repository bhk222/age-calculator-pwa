/**
 * Script d'extraction COMPLÈTE du Code Civil Algérien
 * Extrait TOUT le texte du PDF sans filtrage
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, '..', 'data', 'Code_Civil.pdf');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'codeCivilComplet.ts');

console.log('📜 Extraction COMPLÈTE du Code Civil Algérien...');
console.log('📁 Source:', PDF_PATH);

async function extractFullText() {
  try {
    // Charger le PDF
    const data = new Uint8Array(fs.readFileSync(PDF_PATH));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    console.log(`📄 Total de pages: ${pdf.numPages}`);
    console.log('⏳ Extraction en cours...\n');
    
    let fullText = '';
    
    // Extraire TOUT le texte page par page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Joindre tous les éléments de texte
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
      
      // Afficher la progression tous les 20 pages
      if (pageNum % 20 === 0) {
        console.log(`   ✓ Pages ${pageNum - 19}-${pageNum} traitées`);
      }
    }
    
    console.log(`\n✅ Extraction terminée`);
    console.log(`📊 Texte total: ${fullText.length.toLocaleString()} caractères`);
    console.log(`📊 Environ ${Math.round(fullText.length / 1000)} Ko de texte`);
    
    // Nettoyer un peu le texte (espaces multiples, etc.)
    const cleanedText = fullText
      .replace(/\s{3,}/g, ' ')  // Remplacer 3+ espaces par un seul
      .replace(/\n{4,}/g, '\n\n\n') // Limiter les sauts de ligne
      .trim();
    
    console.log(`📊 Texte nettoyé: ${cleanedText.length.toLocaleString()} caractères\n`);
    
    // Créer le fichier TypeScript
    const tsContent = `/**
 * Code Civil Algérien - Texte Complet
 * Extraction automatique depuis Code_Civil.pdf
 * Date: ${new Date().toLocaleString('fr-FR')}
 * Pages: ${pdf.numPages}
 * Taille: ${cleanedText.length.toLocaleString()} caractères
 */

export const codeCivilComplet = ${JSON.stringify(cleanedText)};

// Métadonnées
export const codeCivilMetadata = {
  dateExtraction: "${new Date().toISOString()}",
  nombrePages: ${pdf.numPages},
  tailleCaracteres: ${cleanedText.length},
  sourcePDF: "Code_Civil.pdf"
};

// Fonction de recherche dans le code civil complet
export function rechercherDansCodeCivil(motCle: string): {
  trouve: boolean;
  resultats: string[];
  nombreOccurrences: number;
} {
  const regex = new RegExp(motCle, 'gi');
  const matches = codeCivilComplet.match(regex);
  
  if (!matches) {
    return {
      trouve: false,
      resultats: [],
      nombreOccurrences: 0
    };
  }
  
  // Extraire des extraits autour de chaque occurrence
  const resultats: string[] = [];
  let lastIndex = 0;
  
  for (let i = 0; i < Math.min(matches.length, 10); i++) {
    const index = codeCivilComplet.indexOf(matches[i], lastIndex);
    if (index !== -1) {
      // Extraire 200 caractères avant et après
      const debut = Math.max(0, index - 200);
      const fin = Math.min(codeCivilComplet.length, index + matches[i].length + 200);
      const extrait = codeCivilComplet.substring(debut, fin);
      resultats.push('...' + extrait + '...');
      lastIndex = index + 1;
    }
  }
  
  return {
    trouve: true,
    resultats,
    nombreOccurrences: matches.length
  };
}

// Fonction pour rechercher un article spécifique
export function rechercherArticle(numero: string): string | null {
  // Pattern pour trouver l'article
  const patterns = [
    new RegExp(\`Article\\\\s+\${numero}\\\\s*[:\\\\.-]?([\\\\s\\\\S]{0,2000}?)(?=Article\\\\s+\\\\d+|$)\`, 'i'),
    new RegExp(\`Art\\\\.\\\\s+\${numero}\\\\s*[:\\\\.-]?([\\\\s\\\\S]{0,2000}?)(?=Art\\\\.\\\\s+\\\\d+|$)\`, 'i')
  ];
  
  for (const pattern of patterns) {
    const match = codeCivilComplet.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  
  return null;
}
`;

    // Sauvegarder le fichier
    fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
    
    console.log('✅ Fichier créé avec succès:');
    console.log(`   ${OUTPUT_PATH}`);
    console.log(`\n📚 Le Code Civil complet est maintenant disponible !`);
    console.log(`\n💡 Fonctionnalités disponibles:`);
    console.log(`   - Recherche par mot-clé: rechercherDansCodeCivil()`);
    console.log(`   - Recherche d'article: rechercherArticle()`);
    console.log(`   - Texte complet: codeCivilComplet`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

extractFullText();
