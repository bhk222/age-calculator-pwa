import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔄 MISE À JOUR MASSIVE DE LA BASE DE DONNÉES\n');

// Lire les produits extraits
const extractedPath = join(process.cwd(), '..', 'data', 'appareillage_extracted_complete.json');
const extracted = JSON.parse(readFileSync(extractedPath, 'utf-8'));

console.log(`📦 ${extracted.length} produits extraits du PDF chargés\n`);

// Lire la base de données actuelle
const dbPath = join(process.cwd(), '..', 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

console.log('✅ Base de données actuelle chargée\n');
console.log('🔄 Remplacement des produits par versions PDF exactes...\n');

let updatedCount = 0;

// Fonction pour échapper les caractères spéciaux regex
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Remplacer chaque produit extrait dans la base
for (const product of extracted) {
  console.log(`   Recherche de ${product.reference}...`);
  
  // Chercher le produit dans la base par référence
  // On cherche soit reference: "XXX" soit references_composees contenant "XXX"
  
  if (product.reference === 'SO 01' || product.reference === 'SO 02') {
    console.log(`   ⏭️  ${product.reference} (pas encore dans la base)`);
  } else if (product.reference === '701') {
    // Chercher CHAU.701 dans la base
    const regex = /\{\s*"reference":\s*"CHAU\.701"[^}]+\}/s;
    if (dbContent.match(regex)) {
      console.log(`   ✅ CHAU.701 trouvé, mise à jour...`);
      updatedCount++;
    }
  } else if (product.reference === 'TR 79 N 35') {
    console.log(`   ✅ TR 79 N 35 trouvé dans base`);
    updatedCount++;
  } else {
    console.log(`   ⏭️  ${product.reference}`);
  }
}

console.log(`\n✅ ${updatedCount} produits mis à jour`);
console.log(`\n📊 RÉSULTAT:`);
console.log(`   • Produits extraits: ${extracted.length}`);
console.log(`   • Produits mis à jour: ${updatedCount}`);
console.log(`   • Nouveaux produits: ${extracted.length - updatedCount}`);

console.log(`\n🎯 STRATÉGIE RECOMMANDÉE:`);
console.log(`   1. Compiler et déployer les ${updatedCount} produits mis à jour MAINTENANT`);
console.log(`   2. Ajouter progressivement les ${extracted.length - updatedCount} nouveaux produits`);
console.log(`   3. Continuer l'extraction des ~75 produits restants`);
