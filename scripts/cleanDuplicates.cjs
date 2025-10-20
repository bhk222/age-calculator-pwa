const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'disabilityRates.ts');

console.log('📖 Lecture du fichier:', filePath);
let content = fs.readFileSync(filePath, 'utf8');

const originalSize = content.length;
let iterations = 0;
const maxIterations = 100;

console.log('\n🔧 Nettoyage des duplications...\n');

// Pattern pour trouver les duplications de description et rateCriteria
while (iterations < maxIterations) {
  // Cherche: ", description: "...", rateCriteria: {...}" répété
  const pattern = /, description: "[^"]+", rateCriteria: \{[^}]+\}(, description: "[^"]+", rateCriteria: \{[^}]+\})+/g;
  
  const newContent = content.replace(pattern, (match) => {
    // Extraire seulement la première occurrence
    const firstMatch = match.match(/, description: "[^"]+", rateCriteria: \{[^}]+\}/);
    return firstMatch ? firstMatch[0] : match;
  });
  
  if (newContent === content) {
    // Plus de changements
    break;
  }
  
  content = newContent;
  iterations++;
  console.log(`  ✓ Itération ${iterations}: duplications supprimées`);
}

const newSize = content.length;
const reduction = originalSize - newSize;

console.log(`\n📊 Résultats:`);
console.log(`  - Taille originale: ${originalSize.toLocaleString()} caractères`);
console.log(`  - Nouvelle taille: ${newSize.toLocaleString()} caractères`);
console.log(`  - Réduction: ${reduction.toLocaleString()} caractères (${(reduction/originalSize*100).toFixed(1)}%)`);
console.log(`  - Itérations effectuées: ${iterations}`);

console.log(`\n💾 Écriture du fichier nettoyé...`);
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Fichier nettoyé avec succès!`);
