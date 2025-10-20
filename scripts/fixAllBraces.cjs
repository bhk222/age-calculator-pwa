const fs = require('fs');
const path = require('path');

// Lire le fichier
const filePath = path.join(__dirname, '..', 'data', 'disabilityRates.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Correction automatique des accolades manquantes...');

let fixCount = 0;

// Pattern pour trouver: rateCriteria: {...} }, suivi d'un commentaire OU d'une nouvelle ligne puis ]
// On doit ajouter } avant le commentaire ou ]

// Pattern 1: rateCriteria: { ... } }, // comment (avant une nouvelle entrée)
// Devrait être: rateCriteria: { ... } } }, // comment
content = content.replace(/(rateCriteria: \{[^}]+\}),(\s*\/\/[^\n]*\n\s+\{)/g, (match, p1, p2) => {
  fixCount++;
  return p1 + ' },' + p2;
});

// Pattern 2: rateCriteria: { ... } },\n          ]
// Avec virgule finale mais sans }
content = content.replace(/(rateCriteria: \{[^}]+\}),(\s*\n\s+\])/g, (match, p1, p2) => {
  fixCount++;
  return p1 + ' },' + p2;
});

// Pattern 3: rateCriteria: { ... } }, // comment suivi d'un retour à la ligne et nouvelle entrée
content = content.replace(/(rateCriteria: \{[^}]*\}),(\s*\/\/[^\n]*)\n(\s+\{)/g, (match, p1, p2, p3) => {
  fixCount++;
  return p1 + ' },' + p2 + '\n' + p3;
});

// Sauvegarder
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ ${fixCount} corrections effectuées!`);
console.log(`📄 Fichier: ${filePath}`);
