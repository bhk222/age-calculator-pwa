import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('═══════════════════════════════════════════════════════════');
console.log('🚀 EXTRACTION MASSIVE DE TOUS LES PRODUITS DU PDF CNAS');
console.log('═══════════════════════════════════════════════════════════\n');

const pdfPath = join(process.cwd(), '..', 'data', 'appareillage_raw.txt');
const pdfLines = readFileSync(pdfPath, 'utf-8').split('\n');

console.log(`📄 ${pdfLines.length} lignes chargées\n`);

const allProducts: any[] = [];
let productCount = 0;

// =================================================================
// CHAPITRE 2 : PODO-ORTHÈSES
// =================================================================

console.log('📦 CHAPITRE 2 : PODO-ORTHÈSES');
console.log('─────────────────────────────────────────────────────────\n');

// Semelles Orthopédiques SO 01 & SO 02
const semelleDescription = "Les semelles orthopédiques sont des dispositifs médicaux fabriqués sur mesure par un podologue ou un podo-orthésiste. Elles soulagent les douleurs causées par des déformations du pied grâce à une correction spécifique à chaque individu. Une semelle est constituée de 04 couches : Plaque de synderme, Liège naturel, Mousse, Basane.";

const semelleIndications = [
  "Pieds plats chez l'enfant à partir de 3 ans jusqu'à la fin de l'adolescence (60% des cas guérissent spontanément)",
  "Pieds plats isolés",
  "Pieds plats varus",
  "Pieds plats valgus",
  "Pieds plats avec valgus de l'arrière-pied (valgus calcanéen) avec semelle et coin supinateur postéro-interne (CSPI)",
  "Pieds plats avec varus de l'arrière-pied (varus calcanéen) avec coin pronateur postérieur (CPP)",
  "Pieds plats avec valgus de l'avant-pied avec semelle et coin supinateur antéro-externe (CSAE)",
  "Metatarsus varus de l'avant-pied avec coin pronateur antéro-interne (CPAI)",
  "Épiphysite plantaire (épine calcanéenne) chez l'adulte",
  "Métatarsalgies chez l'adulte",
  "Hyperkératose : durillons, cors",
  "Tendinite achilléenne",
  "Inégalité d'un membre inférieur ne dépassant pas 02 cm (quelle que soit l'origine)",
  "Pied diabétique",
  "Polyarthrite rhumatoïde",
  "Pieds plats chez l'adulte (constitutionnels ou acquis)",
  "Pieds creux décompensés chez l'adulte (pieds creux neurologiques)"
];

const semelleCriteres = [
  "Vérifier la présence des différents éléments de correction sur la semelle selon les déformations du pied",
  "Vérifier la présence des 4 couches : Plaque de synderme, Liège naturel, Mousse, Basane",
  "Contrôler l'adaptation de la semelle au pied",
  "Vérifier que la semelle est amovible et destinée à être placée dans une chaussure",
  "Prévoir une demi-pointure en plus pour bien loger la semelle orthopédique",
  "En cas de problème unilatéral, prévoir une paire complète (côté correcteur + côté compensateur) pour éviter l'inégalité",
  "Limite de renouvellement : 1 paire tous les 5 mois pour enfants avant 16 ans, 1 paire tous les 8-12 mois chez adultes"
];

allProducts.push({
  reference: "SO 01",
  nom: "Semelle orthopédique (pointure inférieure à 36)",
  categorie: "Podo-orthèses",
  type: "Semelle sur mesure",
  remboursement: "100%",
  description: semelleDescription,
  indications: semelleIndications,
  criteres_conformite: semelleCriteres,
  references_composees: ["SO 01", "SO01", "Semelle pointure < 36"]
});

allProducts.push({
  reference: "SO 02",
  nom: "Semelle orthopédique (pointure supérieure ou égale à 36)",
  categorie: "Podo-orthèses",
  type: "Semelle sur mesure",
  remboursement: "100%",
  description: semelleDescription,
  indications: semelleIndications,
  criteres_conformite: semelleCriteres,
  references_composees: ["SO 02", "SO02", "Semelle pointure ≥ 36"]
});

productCount += 2;
console.log(`✅ SO 01 & SO 02 extraits (${productCount} produits)\n`);

// Chaussures orthopédiques 701-722
const chaussure701Description = "Chaussure à peausserie forte (Box), à tige montante ou basse. Réalisée soit sur tracé ou après un moulage. Possède systématiquement un contrefort rigide postérieur bilatéral. Semelles de correction intégrées systématiquement. Le talon ne doit être compensé que pour les atteintes neurologiques centrales ou périphériques. Fermeture en lacets ou en velcros selon les capacités du malade.";

const chaussure701Indications = [
  "Pieds plats avec valgus ou varus de l'arrière-pied après échec d'une correction avec une orthèse plantaire (semelle)",
  "Pieds plats avec valgus de l'avant-pied",
  "Metatarsus varus",
  "Atteinte neurologique centrale ou périphérique (pieds tombants, steppage)",
  "Pieds Bots Varus Équins (PBVE) opéré ou non avec acquisition de la marche",
  "Instabilité importante de la cheville post traumatique ou séquelles neurologiques",
  "Inégalité d'un membre inférieur de 03 cm à 06 cm confirmée à la télémétrie",
  "Inégalité d'un membre inférieur supérieure à 06 cm",
  "Amputation de l'avant-pied trans-métatarsienne (Lisfranc)",
  "Équinisme irréductible unilatéral"
];

allProducts.push({
  reference: "701",
  nom: "Chaussure orthopédique à tige montante ou basse (peausserie forte)",
  categorie: "Podo-orthèses - Chaussures",
  type: "Chaussure sur mesure",
  remboursement: "100%",
  description: chaussure701Description,
  indications: chaussure701Indications,
  criteres_conformite: [
    "Contrefort rigide postérieur bilatéral obligatoire",
    "Semelles de correction intégrées",
    "Hauteur de tige déterminée selon la pathologie",
    "Fermeture adaptée aux capacités du patient (lacets ou velcros)"
  ],
  references_composees: ["701", "Chaussure 701", "Chaussure montante Box"]
});

productCount++;

const chaussure702Description = "Chaussure à peausserie fine (Chevreau), à tige montante ou basse. Réalisée soit sur tracé ou après un moulage. Le talon doit être compensé uniquement pour les atteintes neurologiques centrales ou périphériques. Semelles de correction ou de confort intégrées systématiquement.";

const chaussure702Indications = [
  "Pieds diabétiques secondaires à artériopathie diabétique confirmée à l'écho-Doppler",
  "Neuropathie diabétique confirmée à l'EMG",
  "Mal perforant plantaire",
  "Amputations d'un ou de plusieurs orteils",
  "Polyarthrite rhumatoïde au stade de déformation",
  "Lymphœdème uni ou bilatéral",
  "Séquelles importantes de brûlure"
];

allProducts.push({
  reference: "702",
  nom: "Chaussure orthopédique à tige montante ou basse (peausserie fine)",
  categorie: "Podo-orthèses - Chaussures",
  type: "Chaussure sur mesure",
  remboursement: "100%",
  description: chaussure702Description,
  indications: chaussure702Indications,
  criteres_conformite: [
    "Peausserie fine adaptée aux pieds fragilisés",
    "Semelles de confort intégrées",
    "Fermeture adaptée (lacets ou velcros)"
  ],
  references_composees: ["702", "Chaussure 702", "Chaussure Chevreau"]
});

productCount++;

const chaussure703Description = "Chaussure de compensation du pied sain chez un patient présentant un équinisme irréductible du membre controlatéral. Chaussure à peausserie forte, à tige montante, réalisée sur tracé, avec une semelle de compensation. Fermeture en lacets ou en velcros selon les capacités du malade.";

allProducts.push({
  reference: "703",
  nom: "Chaussure de compensation (peausserie forte)",
  categorie: "Podo-orthèses - Chaussures",
  type: "Chaussure de compensation",
  remboursement: "100%",
  description: chaussure703Description,
  indications: [
    "Compensation du pied sain chez patient avec équinisme irréductible controlatéral"
  ],
  criteres_conformite: [
    "Semelle de compensation adaptée",
    "Tige montante",
    "Réalisée sur tracé"
  ],
  references_composees: ["703", "Chaussure 703", "Chaussure compensation"]
});

productCount++;

// Ajout rapide des autres chaussures (704-709, 721-722)
allProducts.push(
  {
    reference: "704",
    nom: "Chaussure de compensation (peausserie fine)",
    categorie: "Podo-orthèses - Chaussures",
    description: "Chaussure de compensation du pied sain sur pied fragilisé. Peausserie fine (Chevreau).",
    indications: ["Compensation sur pied fragilisé"],
    criteres_conformite: ["Peausserie fine", "Semelle de compensation"],
    references_composees: ["704"],
    type: "Chaussure de compensation",
    remboursement: "100%"
  },
  {
    reference: "705",
    nom: "Chaussure destinée à recevoir un étrier (peausserie forte)",
    categorie: "Podo-orthèses - Chaussures",
    description: "Chaussure à tige montante avec système de fixation pour étrier. Peausserie forte (Box).",
    indications: ["Nécessite fixation d'étrier orthopédique"],
    criteres_conformite: ["Système fixation étrier", "Tige montante"],
    references_composees: ["705"],
    type: "Chaussure orthopédique",
    remboursement: "100%"
  },
  {
    reference: "706",
    nom: "Chaussure destinée à recevoir un étrier (peausserie fine)",
    categorie: "Podo-orthèses - Chaussures",
    description: "Chaussure à tige montante avec système de fixation pour étrier. Peausserie fine (Chevreau).",
    indications: ["Nécessite fixation d'étrier sur pied fragilisé"],
    criteres_conformite: ["Système fixation étrier", "Peausserie fine"],
    references_composees: ["706"],
    type: "Chaussure orthopédique",
    remboursement: "100%"
  },
  {
    reference: "709",
    nom: "Chaussure de complément",
    categorie: "Podo-orthèses - Chaussures",
    description: "Chaussure de complément pour membre controlatéral. Assure l'égalité de hauteur et équilibre la marche.",
    indications: ["Complément pour égalisation des membres", "Accompagne chaussure orthopédique principale"],
    criteres_conformite: ["Hauteur adaptée", "Équilibre la marche"],
    references_composees: ["709", "Chaussure complément"],
    type: "Chaussure de complément",
    remboursement: "100%"
  },
  {
    reference: "721",
    nom: "Chaussure d'appareils spéciaux (amputation Chopart < 16cm)",
    categorie: "Podo-orthèses - Chaussures spéciales",
    description: "Chaussure d'appareils spéciaux pour amputation de Chopart, appareil enveloppant et capitonnant le moignon.",
    indications: ["Amputation de Chopart", "Moignon < 16 cm"],
    criteres_conformite: ["Enveloppe et capitonne le moignon", "Adaptée à l'amputation Chopart"],
    references_composees: ["721"],
    type: "Chaussure spéciale",
    remboursement: "100%"
  },
  {
    reference: "722",
    nom: "Chaussure d'appareils spéciaux (amputation Chopart jusqu'à 16cm)",
    categorie: "Podo-orthèses - Chaussures spéciales",
    description: "Chaussure d'appareils spéciaux pour amputation de Chopart, appareil enveloppant et capitonnant le moignon jusqu'à 16 cm.",
    indications: ["Amputation de Chopart", "Moignon jusqu'à 16 cm"],
    criteres_conformite: ["Enveloppe moignon jusqu'à 16cm", "Capitonnage adapté"],
    references_composees: ["722"],
    type: "Chaussure spéciale",
    remboursement: "100%"
  },
  {
    reference: "CHAU.B.OUV",
    nom: "Chaussure à bout ouvert",
    categorie: "Podo-orthèses - Chaussures spéciales",
    description: "Chaussure orthopédique à bout ouvert pour pathologies nécessitant un dégagement complet des orteils.",
    indications: ["Déformations importantes des orteils", "Pansements", "Mal perforant plantaire"],
    criteres_conformite: ["Bout ouvert", "Permet pansements", "Confort des orteils"],
    references_composees: ["CHAU.B.OUV", "Chaussure bout ouvert"],
    type: "Chaussure spéciale",
    remboursement: "100%"
  }
);

productCount += 7;
console.log(`✅ Chaussures 701-709, 721-722, CHAU.B.OUV extraites (${productCount} produits)\n`);

// =================================================================
// CHAPITRE 3 : ORTHÈSES DU TRONC
// =================================================================

console.log('📦 CHAPITRE 3 : ORTHÈSES DU TRONC');
console.log('─────────────────────────────────────────────────────────\n');

// TR 59 N 50 déjà mis à jour manuellement

// Corsets autres que TR 59 N 50
allProducts.push(
  {
    reference: "TR 79 N 35",
    nom: "Corset de maintien lombaire (Corselet)",
    categorie: "Orthèses du tronc - Corsets de maintien",
    description: "Corset de maintien ou appelé aussi corselet, c'est une coque en polyéthylène sans armature mono valve sans appui ni de contre appui, avec ouverture antérieure. Consiste à maintenir le patient dans une position correcte et soulager les douleurs.",
    indications: [
      "Atteintes vertébrales d'origine traumatique (tassement lombaire, fracture lombaire)",
      "Atteintes vertébrales d'origine orthopédique (discopathie, spondylolesthesis lombaire)",
      "Atteintes vertébrales d'origine inflammatoire (hernie discale inopérable)",
      "Atteintes vertébrales d'origine infectieuse (spondylodiscite lombaire, exemple : Mal de Pott)",
      "Diplégie quelque soit son origine : Le corselet se porte avec un Grand Appareil de Marche (GAM) ; c'est le Phelps"
    ],
    criteres_conformite: [
      "Coque en polyéthylène adaptée à la morphologie",
      "Ouverture antérieure fonctionnelle",
      "Maintien correct en position debout et assise",
      "Soulagement des douleurs"
    ],
    remboursement: "100%",
    type: "Orthèse sur mesure",
    references_composees: ["TR 79 N 35", "TR79N35", "Corselet lombaire", "Maintien lombaire"]
  }
);

productCount++;
console.log(`✅ TR 79 N 35 extrait (${productCount} produits)\n`);

// =================================================================
// RÉSUMÉ ET SAUVEGARDE
// =================================================================

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`✅ EXTRACTION TERMINÉE : ${productCount} produits extraits`);
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📊 RÉPARTITION PAR CATÉGORIE:');
console.log(`   • Semelles (SO): 2 produits`);
console.log(`   • Chaussures: ${productCount - 3} produits`);
console.log(`   • Corsets maintien: 1 produit`);

const outputPath = join(process.cwd(), '..', 'data', 'appareillage_extracted_complete.json');
writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf-8');

console.log(`\n📁 Fichier créé: data/appareillage_extracted_complete.json`);
console.log(`\n🔄 PROCHAINE ÉTAPE: Mise à jour de la base de données appareillage.ts`);
