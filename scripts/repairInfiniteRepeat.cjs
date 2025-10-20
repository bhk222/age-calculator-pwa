const fs = require('fs');
const path = require('path');

// Lire le fichier corrompu
const filePath = path.join(__dirname, '..', 'data', 'disabilityRates.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Réparation des répétitions excessives...');

// Réparer les rateCriteria répétés à l'infini
// Pattern: , rateCriteria: { low: "...", high: "..." } (répété)
content = content.replace(/(, rateCriteria: \{ low: "[^"]*", high: "[^"]*" \})(\1)+/g, '$1');

// Réparer les rateCriteria avec medium répétés
content = content.replace(/(, rateCriteria: \{ low: "[^"]*", medium: "[^"]*", high: "[^"]*" \})(\1)+/g, '$1');

// Ajouter les fermetures manquantes avant { name:
// Si une ligne contient rateCriteria mais ne se termine pas par },
// et est suivie de { name:, ajouter }
content = content.replace(/(rateCriteria: \{[^}]*\}),(\s*\n\s*\{ name:)/g, '$1 },$2');

// Sauvegarder
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Réparation terminée!');
console.log(`📄 Fichier: ${filePath}`);
