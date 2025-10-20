import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

async function extractAppareillageData() {
  const pdfPath = path.join(__dirname, '../data/Manuel_Guide_Appareillage_Interactif.pdf');
  
  console.log('📄 Lecture du PDF d\'appareillage...\n');
  
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(dataBuffer);
  
  console.log(`📊 Nombre de pages: ${pdfData.numpages}`);
  console.log(`📝 Nombre de caractères: ${pdfData.text.length}\n`);
  
  // Afficher les 5000 premiers caractères pour analyse
  console.log('=== DÉBUT DU CONTENU ===\n');
  console.log(pdfData.text.substring(0, 5000));
  console.log('\n=== ... ===\n');
  
  // Sauvegarder le texte complet pour analyse
  const outputPath = path.join(__dirname, '../data/appareillage_raw.txt');
  fs.writeFileSync(outputPath, pdfData.text, 'utf-8');
  
  console.log(`✅ Texte complet sauvegardé dans: ${outputPath}`);
  console.log('\n📋 Analysez le fichier pour identifier la structure des données.');
}

extractAppareillageData().catch(console.error);
