import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 INTÉGRATION MASSIVE - Mise à jour appareillage.ts\n');

// Charger les produits extraits
const extractedPath = join(process.cwd(), 'data', 'all_products_complete.json');
const extracted = JSON.parse(readFileSync(extractedPath, 'utf-8'));

// Charger la base actuelle
const dbPath = join(process.cwd(), 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

console.log(`📥 ${extracted.length} produits à intégrer`);

// Créer un map des produits extraits par référence
const extractedMap = new Map();
extracted.forEach((prod: any) => {
  extractedMap.set(prod.reference, prod);
});

// Parser le fichier actuel pour trouver les produits à remplacer
const productRegex = /\{[^}]*reference:\s*["']([^"']+)["'][^}]*\}/gs;
let match;
const existingRefs = new Set();

while ((match = productRegex.exec(dbContent)) !== null) {
  const ref = match[1];
  if (extractedMap.has(ref)) {
    existingRefs.add(ref);
  }
}

console.log(`✅ ${existingRefs.size} produits existants à mettre à jour`);
console.log(`➕ ${extracted.length - existingRefs.size} nouveaux produits à ajouter\n`);

// Stratégie: On va reconstruire le tableau des produits
// 1. Extraire la partie avant export const appareillageData
// 2. Reconstruire le tableau avec produits mis à jour
// 3. Garder les produits non touchés (comme les 3 déjà mis à jour: SO 01, TR 59 N 50, TR 79 N 35)

// Trouver le début du tableau
const arrayStartMatch = dbContent.match(/export const appareillageDatabase:\s*Appareillage\[\]\s*=\s*\[/);
if (!arrayStartMatch) {
  console.error('❌ Impossible de trouver export const appareillageDatabase');
  process.exit(1);
}

const startIndex = arrayStartMatch.index! + arrayStartMatch[0].length;

// Trouver la fin du tableau
const endMatch = dbContent.indexOf('];', startIndex);
if (endMatch === -1) {
  console.error('❌ Impossible de trouver la fin du tableau');
  process.exit(1);
}

// Extraire le contenu actuel du tableau
const currentArrayContent = dbContent.substring(startIndex, endMatch);

// Parser les produits actuels (méthode simplifiée)
const currentProducts: any[] = [];
const productMatches = currentArrayContent.matchAll(/\{[^}]*reference:\s*["']([^"']+)["'][^}]*\}/gs);

for (const m of productMatches) {
  const ref = m[1];
  // Garder les produits déjà mis à jour manuellement (SO 01, TR 59 N 50, TR 79 N 35)
  if (['SO 01', 'CORSET.TLS', 'CEINTURE.LOMB'].includes(ref)) {
    const prodText = m[0];
    currentProducts.push({ reference: ref, text: prodText, keep: true });
  } else if (!extractedMap.has(ref)) {
    // Garder les produits non touchés par l'extraction
    const prodText = m[0];
    currentProducts.push({ reference: ref, text: prodText, keep: true });
  }
}

console.log(`🔒 ${currentProducts.filter(p => p.keep).length} produits préservés (déjà mis à jour ou non concernés)`);

// Construire le nouveau tableau
const newProducts: string[] = [];

// Ajouter les produits préservés
currentProducts.filter(p => p.keep).forEach(p => {
  newProducts.push(p.text);
});

// Ajouter les produits extraits
extracted.forEach((prod: any) => {
  const { reference, nom, categorie, description, indications, type, remboursement, references_composees } = prod;
  
  const indicString = indications.map((i: string) => `"${i}"`).join(', ');
  const refsString = references_composees.map((r: string) => `"${r}"`).join(', ');
  
  const prodText = `{
    reference: "${reference}",
    nom: "${nom}",
    categorie: "${categorie}",
    description: "${description}",
    indications: [${indicString}],
    type: "${type}",
    remboursement: "${remboursement}",
    references_composees: [${refsString}]
  }`;
  
  newProducts.push(prodText);
});

console.log(`\n📦 NOUVEAU TOTAL: ${newProducts.length} produits dans la base`);

// Reconstruire le fichier
const beforeArray = dbContent.substring(0, startIndex);
const afterArray = dbContent.substring(endMatch);

const newContent = beforeArray + '\n  ' + newProducts.join(',\n  ') + '\n' + afterArray;

// Sauvegarder
writeFileSync(dbPath, newContent, 'utf-8');

console.log(`✅ Base de données mise à jour: ${dbPath}`);
console.log(`🚀 Prêt pour build v53`);
