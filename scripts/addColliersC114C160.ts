import fs from 'fs';
import path from 'path';

console.log('🔧 AJOUT DES COLLIERS CERVICAUX C114 ET C160 AVEC TOUS LES DÉTAILS DU PDF\n');

const colliersDetails = [
  {
    reference: "C114",
    nom: "Collier Cervical Souple - C114",
    description: `Collier cervical souple réalisé sur mesure.
• Collier réalisé sur mesure en polypropylène d'un ou de deux millimètres avec un appui sous mentonnier en avant et occipital en arrière.
• Fermeture en postérieur en velcro.`,
    indications: [
      "Lésions rhumatismales minimes : cervicarthrose",
      "Lésions musculaires : torticolis musculaire",
      "Névralgies cervico-brachiales",
      "Soulagement et mise au repos des muscles du cou"
    ],
    remarque: "À visée antalgique ; les mouvements du cou sont restreints, sans pour autant les empêcher complètement."
  },
  {
    reference: "C160",
    nom: "Collier Cervical Rigide - C160",
    description: `Collier cervical rigide avec plaque semi-rigide interne.
• Restreint davantage les mouvements en offrant un soutien prolongé de la nuque.
• Limite les mouvements de rotation de la tête et d'étirement du cou grâce à une plaque semi-rigide située à l'intérieur du collier.
• Cette plaque a également une fonction correctrice de la posture de la nuque.`,
    indications: [
      "Lésions rhumatismales importantes : cervicarthrose étagée",
      "Lésions musculaires : torticolis musculaire douloureuse",
      "Névralgies cervico-brachiales importantes",
      "Hernies discales"
    ]
  }
];

const dataFilePath = path.join(process.cwd(), 'data', 'appareillage.ts');
let content = fs.readFileSync(dataFilePath, 'utf-8');

// Construire le code TypeScript pour les nouveaux colliers
const newColliersCode = colliersDetails.map(collier => {
  const remarqueField = collier.remarque ? `,\n    remarque: "${collier.remarque}"` : '';
  return `  {
    reference: "${collier.reference}",
    nom: "${collier.nom}",
    description: \`${collier.description}\`,
    indications: ${JSON.stringify(collier.indications, null, 6).replace(/\n/g, '\n    ')}${remarqueField}
  }`;
}).join(',\n');

// Trouver la fin du tableau et ajouter les nouveaux colliers
const exportIndex = content.lastIndexOf('];');
if (exportIndex === -1) {
  console.error('❌ Impossible de trouver la fin du tableau appareillageData');
  process.exit(1);
}

// Ajouter les nouveaux colliers avant la fermeture du tableau
const beforeArray = content.substring(0, exportIndex);
const afterArray = content.substring(exportIndex);

const updatedContent = beforeArray + ',\n' + newColliersCode + '\n' + afterArray;

// Écrire le fichier mis à jour
fs.writeFileSync(dataFilePath, updatedContent, 'utf-8');

console.log('✅ 2 colliers cervicaux avec TOUS les détails du PDF');
console.log('✅ C114 (Souple) et C160 (Rigide) ajoutés avec détails complets');
console.log('📦 C114, C160 maintenant disponibles');
console.log('🎉 TERMINÉ !\n');
