const fs = require('fs');
const path = require('path');

// Lire le fichier
const filePath = path.join(__dirname, '..', 'data', 'disabilityRates.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fonction pour nettoyer une entrée avec des clés dupliquées
function cleanDuplicateKeys(objString) {
  // Pattern pour trouver les clés dupliquées
  // On cherche: }, description: "...", rateCriteria: { ... }
  const duplicatePattern = /,\s*description:\s*"[^"]*",\s*rateCriteria:\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/g;
  
  // Compter les occurrences
  const matches = objString.match(duplicatePattern);
  
  if (matches && matches.length > 1) {
    // Garder seulement la première occurrence
    const firstMatch = matches[0];
    let cleaned = objString;
    
    // Supprimer toutes les occurrences sauf la première
    for (let i = 1; i < matches.length; i++) {
      cleaned = cleaned.replace(matches[i], '');
    }
    
    return cleaned;
  }
  
  return objString;
}

// Nettoyer le contenu
console.log('🔧 Nettoyage des duplications...');

// Split par objets (délimité par { name: )
const parts = content.split(/(?=\{ name: ")/);
let cleaned = parts[0]; // Garde l'en-tête

for (let i = 1; i < parts.length; i++) {
  const cleanedPart = cleanDuplicateKeys(parts[i]);
  cleaned += cleanedPart;
}

// Écrire le fichier nettoyé
fs.writeFileSync(filePath, cleaned, 'utf8');

console.log('✅ Duplications supprimées avec succès!');
console.log(`📄 Fichier nettoyé: ${filePath}`);
