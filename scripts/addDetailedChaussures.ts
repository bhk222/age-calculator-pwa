import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 EXTRACTION COMPLÈTE AVEC TOUS LES DÉTAILS DU PDF\n');

// TOUTES LES CHAUSSURES avec descriptions COMPLÈTES du PDF
const chaussuresCompletes = [
  {
    reference: "701",
    nom: "Chaussure orthopédique 701 - Peausserie forte (Box)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à peausserie forte, à tige montante ou basse.
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Semelles de correction intégrées systématiquement.
• Le talon ne doit être compensé que pour les atteintes neurologiques centrales ou périphériques.
• Fermeture en lacets ou en velcros selon les capacités du malade.
• La hauteur de la tige est déterminée selon la pathologie et les besoins techniques (mise en place des adjonctions : releveur AS47, compensation AR31, AR32, ou autre).`,
    indications: [
      "Pieds plats avec valgus ou varus de l'arrière-pied après échec d'une correction avec une orthèse plantaire (semelle) = 701 x 02",
      "Pieds plats avec valgus de l'avant-pied = 701 x 02 + AS52 x 02",
      "Metatarsus varus = 701 x 02 + AS51 x 02",
      "Atteinte neurologique centrale ou périphérique unilatérale = 701 x 01 + AS47 + 709 ou bilatérale = 701 x 02 + AS47 x 02 (pieds tombants, steppage)",
      "Atteinte neurologique centrale ou périphérique uni ou bilatérale (pieds tombants, steppage) avec instabilité de la cheville = 701 + AP22",
      "Pieds Bots Varus Équins (PBVE) unilatérale 701 + AR51 + 709 ou bilatérale 701 x 02 + AR51 x 02 opéré ou non avec acquisition de la marche (chaussure forme retournée)",
      "Instabilité importante de la cheville post traumatique ou séquelles neurologiques = 701 + AS50",
      "Inégalité d'un membre inférieur de 03 cm à 06 cm confirmée à la télémétrie = 701 + AR31 + 709 (chaussure complément)",
      "Inégalité d'un membre inférieur supérieure à 06 cm confirmée à la télémétrie = 701 x 01 + AR31 + AR32 + 709",
      "Amputation de l'avant-pied trans-métatarsienne (Lisfranc) = 701 + MO91 + 01 + 709",
      "Équinisme irréductible unilatéral = 701 + AD14 ou AD15 ou AD16 + 703, en fonction de la hauteur de l'équinisme"
    ],
    remarque: "Les releveurs (AP22 et AS47) et le prolongement du contrefort (AS51 ou AS52) ne peuvent pas être adjoints sur une même chaussure. Chez l'enfant, il faut privilégier la correction, donc le contrefort, par contre chez l'adulte, c'est le releveur qui prédomine.",
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["701"]
  },
  {
    reference: "702",
    nom: "Chaussure orthopédique 702 - Peausserie fine (Chevreau)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à peausserie fine, à tige montante ou basse.
• Réalisée soit sur tracé ou après un moulage.
• Le talon doit être compensé uniquement pour les atteintes neurologiques centrales ou périphériques.
• Semelles de correction ou de confort intégrées systématiquement.
• Le 702 peut recevoir les mêmes adjonctions que le 701 sauf le contrefort AS51 et AS52.
• Fermeture en lacets ou en velcros selon les capacités du malade.
• La hauteur de la tige est déterminée selon la pathologie et les besoins techniques (mise en place des adjonctions : releveur AS47, compensation AR31, AR32, ou autre).`,
    indications: [
      "Pieds diabétiques secondaires à : Artériopathie diabétique confirmée à l'écho-Doppler",
      "Pieds diabétiques secondaires à : Neuropathie diabétique confirmée à l'EMG",
      "Mal perforant plantaire",
      "Amputations d'un ou de plusieurs orteils",
      "Polyarthrite rhumatoïde au stade de déformation",
      "Lymphœdème uni ou bilatéral",
      "Séquelles importantes de brûlure"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["702"]
  },
  {
    reference: "703",
    nom: "Chaussure orthopédique 703 - Compensation peausserie forte",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de compensation du pied sain chez un patient présentant un équinisme irréductible du membre controlatéral.
• Chaussure à peausserie forte, à tige montante.
• Réalisée sur tracé.
• Une semelle de compensation.
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: [
      "Équinisme irréductible unilatéral corrigé par 701 + AD14 ou AD15 ou AD16 et le côté sain 703"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["703"]
  },
  {
    reference: "704",
    nom: "Chaussure orthopédique 704 - Compensation peausserie fine",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de compensation du pied sain chez un patient présentant un équinisme irréductible sur pied fragilisé du membre controlatéral.
• Chaussure à peausserie fine, à tige montante.
• Réalisée sur tracé.
• Une semelle de compensation.
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: [
      "Équinisme irréductible unilatéral sur pieds fragilisé corrigé par 702 + AD14 ou AD15 ou AD16 et le côté sain 704"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["704"]
  },
  {
    reference: "705",
    nom: "Chaussure orthopédique 705 - À tourillon peausserie forte",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à tourillon à peausserie forte, à tige montante destinée à recevoir un Grand ou un Petit Appareil de Marche (GAM-PAM).
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Semelles de correction intégrées systématiquement.
• Le talon possède un tourillon.
• Une bride en T peut être intégrée en cas de déviation axiale (valgus et varus).
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: [
      "Mono ou diplégie polio",
      "Spina-bifida",
      "Atteinte neurologique centrale ou périphérique",
      "Toutes les déformations axiales et complexes du pied"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["705"]
  },
  {
    reference: "706",
    nom: "Chaussure orthopédique 706 - À tourillon peausserie fine",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure à tourillon à peausserie fine, à tige montante destinée à recevoir un Grand ou Petit Appareil de Marche (GAM-PAM) pour des pieds fragilisés.
• Réalisée soit sur tracé ou après un moulage.
• Semelles de correction intégrées systématiquement.
• Le talon possède un tourillon.
• Une bride en T peut être intégrée en cas de déviation axiale (valgus et varus).
• Fermeture en lacets ou en velcros selon les capacités du malade.`,
    indications: [
      "Les mêmes indications que 705 mais sur pieds fragilisés"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["706"]
  },
  {
    reference: "709",
    nom: "Chaussure orthopédique 709 - Chaussure de complément",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure de complément du côté sain à visée esthétique.
• Chaussure à tige montante ou basse.
• Chaussure à peausserie forte.
• Exemple : Hémiplégie gauche : 701 + AS47 à gauche et 709 à droite.`,
    indications: [
      "Complément esthétique du côté sain en cas d'appareillage unilatéral"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["709"]
  },
  {
    reference: "721",
    nom: "Chaussure orthopédique 721 - Chaussette montante (<16cm)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussette à tige montante faite sur mesure en enveloppant et en capitonnant le moignon.
• Faux bout en antérieur.
• Portée dans une chaussure de commerce.`,
    indications: [
      "Amputation tarsométatarsienne uni ou bilatérale type CHOPART",
      "Amputation métatarsienne uni ou bilatérale type LISFRANC",
      "D'origine artériopathie diabétique ou traumatique"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["721"]
  },
  {
    reference: "722",
    nom: "Chaussure orthopédique 722 - Chaussette montante (≤16cm)",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussette à tige montante faite sur mesure en enveloppant et en capitonnant le moignon jusqu'à 16 cm.
• Faux bout en antérieur.
• Portée dans une chaussure de commerce.`,
    indications: [
      "Amputation tarsométatarsienne type CHOPART",
      "Amputation métatarsienne type LISFRANC"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["722"]
  },
  {
    reference: "CHAU.B.OUV",
    nom: "Chaussure orthopédique à bout ouvert",
    categorie: "Podo-orthèses - Chaussures",
    description: `Chaussure non destinée à la marche.
• Chaussure à peausserie forte, à tige montante.
• Réalisée soit sur tracé ou après un moulage.
• Possède systématiquement un contrefort rigide postérieur bilatéral.
• Le bout est ouvert et la fermeture en lacets ou velcros.
• Peuvent être indiqués seules ou placés sur une attelle de correction appelée attelle de Denis-Browne.`,
    indications: [
      "Pieds Bot Varus Équin (PBVE) opéré ou non avant l'acquisition de la marche"
    ],
    type: "Grand appareillage",
    remboursement: "100%",
    references_composees: ["CHAU.B.OUV"]
  }
];

console.log(`✅ ${chaussuresCompletes.length} chaussures avec TOUS les détails du PDF\n`);

// Lire le fichier actuel
const dbPath = join(process.cwd(), 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

// Trouver la fin du tableau
const arrayEndMatch = dbContent.lastIndexOf('];');
if (arrayEndMatch === -1) {
  console.error('❌ Impossible de trouver la fin du tableau');
  process.exit(1);
}

// Insérer les chaussures avant la fin du tableau
const beforeEnd = dbContent.substring(0, arrayEndMatch);
const afterEnd = dbContent.substring(arrayEndMatch);

const chaussuresCode = chaussuresCompletes.map(ch => {
  const base = `  {
    reference: "${ch.reference}",
    nom: "${ch.nom}",
    categorie: "${ch.categorie}",
    description: \`${ch.description}\`,
    indications: [${ch.indications.map(i => `"${i}"`).join(', ')}],`;
  
  const remarqueStr = ch.remarque ? `\n    remarque: "${ch.remarque}",` : '';
  
  return base + remarqueStr + `
    type: "${ch.type}",
    remboursement: "${ch.remboursement}",
    references_composees: [${ch.references_composees.map(r => `"${r}"`).join(', ')}]
  }`;
}).join(',\n');

const newContent = beforeEnd + ',\n  // ========== CHAUSSURES COMPLÈTES AVEC TOUS LES DÉTAILS DU PDF ==========\n' + chaussuresCode + '\n' + afterEnd;

// Sauvegarder
writeFileSync(dbPath, newContent, 'utf-8');

console.log(`✅ ${chaussuresCompletes.length} chaussures avec détails complets ajoutées`);
console.log(`📦 Toutes les chaussures ont maintenant le même niveau de détail que dans le PDF\n`);
console.log(`🎉 TERMINÉ !`);
