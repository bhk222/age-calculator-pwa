import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 AJOUT DES 3 CASQUES TR 12 AVEC TOUS LES DÉTAILS DU PDF\n');

// LES 3 CASQUES DE PROTECTION avec descriptions COMPLÈTES du PDF
const casquesTR12 = [
  {
    reference: "TR 12 D 01",
    nom: "Casque de Protection Type 1 - TR 12 D 01 (Duralumin)",
    categorie: "Orthèses - Crâne",
    description: `Casque en alliage léger.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: [
      "Épilepsie grave avec multiples chutes chez l'enfant ou l'adulte",
      "Enfants ou adultes atteints d'Infirmité Motrice Cérébrale (IMC) accompagné de trouble du comportement",
      "Autisme avec troubles du comportement"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 D 01"]
  },
  {
    reference: "TR 12 N 35",
    nom: "Casque de Protection Type 2 - TR 12 N 35 (Polyéthylène)",
    categorie: "Orthèses - Crâne",
    description: `Casque en polyéthylène.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: [
      "Trépanation",
      "Ostéotomie partielle du crâne",
      "Protection d'un crâne après chirurgie"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 N 35"]
  },
  {
    reference: "TR 12 S 25",
    nom: "Casque de Protection Type 3 - TR 12 S 25 (Résine polyester stratifié)",
    categorie: "Orthèses - Crâne",
    description: `Casque en résine polyester stratifié.
• Comportant un capitonnage intérieur en matière cellulaire avec garnissage en peau avec fixation selon la nécessité.
• Il est peu fréquent et difficile à réaliser.
• Doit couvrir entièrement la tête jusqu'au front en épousant bien sa forme et en libérant les deux oreilles.`,
    indications: [
      "Trépanation",
      "Ostéotomie partielle du crâne",
      "Protection d'un crâne découvert après chirurgie"
    ],
    remarque: "Le casque pour les déformations crâniennes (brachycéphalie, plagiocéphalie, scaphocéphalie) du bébé peut être prescrit mais il n'est pas pris en charge.",
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["TR 12 S 25"]
  }
];

console.log(`✅ ${casquesTR12.length} casques TR 12 avec TOUS les détails du PDF\n`);

// Lire le fichier actuel
const dbPath = join(process.cwd(), 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

// Trouver la fin du tableau
const arrayEndMatch = dbContent.lastIndexOf('];');
if (arrayEndMatch === -1) {
  console.error('❌ Impossible de trouver la fin du tableau');
  process.exit(1);
}

// Insérer les casques avant la fin du tableau
const beforeEnd = dbContent.substring(0, arrayEndMatch);
const afterEnd = dbContent.substring(arrayEndMatch);

const casquesCode = casquesTR12.map(casque => {
  const base = `  {
    reference: "${casque.reference}",
    nom: "${casque.nom}",
    categorie: "${casque.categorie}",
    description: \`${casque.description}\`,
    indications: [${casque.indications.map(i => `"${i}"`).join(', ')}],`;
  
  const remarqueStr = casque.remarque ? `\n    remarque: "${casque.remarque}",` : '';
  
  return base + remarqueStr + `
    type: "${casque.type}",
    remboursement: "${casque.remboursement}",
    references_composees: [${casque.references_composees.map(r => `"${r}"`).join(', ')}]
  }`;
}).join(',\n');

const newContent = beforeEnd + ',\n  // ========== CASQUES TR 12 AVEC TOUS LES DÉTAILS DU PDF ==========\n' + casquesCode + '\n' + afterEnd;

// Sauvegarder
writeFileSync(dbPath, newContent, 'utf-8');

console.log(`✅ ${casquesTR12.length} casques TR 12 ajoutés avec détails complets`);
console.log(`📦 TR 12 D 01, TR 12 N 35, TR 12 S 25 maintenant disponibles\n`);
console.log(`🎉 TERMINÉ !`);
