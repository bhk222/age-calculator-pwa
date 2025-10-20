const fs = require('fs');
const path = require('path');

// Lire le fichier
const filePath = path.join(__dirname, '..', 'data', 'disabilityRates.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Réparation des accolades manquantes...');

// Pattern pour trouver les lignes avec description/rateCriteria qui ne se terminent pas par } ou },
// mais qui sont suivies directement d'une nouvelle entrée { name:
const pattern = /(\},\s*(?:\/\/[^\n]*)?\n\s+\{ name:)/g;

// Remplacer les patterns problématiques
// Chercher les lignes qui se terminent par }, // comment sans la fermeture finale
content = content.replace(/(\{ low: "[^"]*", high: "[^"]*" \}),\s*(\/\/[^\n]*\n)/g, '$1 }, $2');

// Chercher les lignes avec medium qui se terminent sans }, 
content = content.replace(/(\{ low: "[^"]*", medium: "[^"]*", high: "[^"]*" \}),\s*(\/\/[^\n]*\n)/g, '$1 }, $2');

// Chercher les rateCriteria qui ne sont pas fermés correctement avant un commentaire
content = content.replace(/(rateCriteria: \{[^}]*\}),\s+(\/\/)/g, '$1 }, $2');

// Sauvegarder
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Accolades réparées avec succès!');
