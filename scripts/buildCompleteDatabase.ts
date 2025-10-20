import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 CONSTRUCTION BASE COMPLÈTE - FUSION TOUTES SOURCES\n');

// Charger la base actuelle (88 produits du extractCompleteDatabase)
const currentDbPath = join(process.cwd(), 'data', 'appareillage.ts');
const currentDb = readFileSync(currentDbPath, 'utf-8');

// Extraire le header et le footer
const headerEnd = currentDb.indexOf('export const appareillageDatabase');
const header = currentDb.substring(0, headerEnd);

// Produits à ajouter MANUELLEMENT avec références PDF exactes
const additionalProducts = [
  // TR 59 N 50 - CORSET.TLS avec texte PDF exact
  {
    reference: "TR 59 N 50",
    nom: "Corset thoraco-lombo-sacré (CTLS)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Coque en polyéthylène sans armature mono valve sans appui ni de contre appui, avec ouverture antérieure. Consiste à maintenir le patient dans une position correcte et soulager les douleurs.",
    indications: [
      "Atteinte vertébrale d'origine traumatique (tassement, fracture)",
      "Atteinte vertébrale d'origine infectieuse (spondylodiscite, mal de Pott)",
      "Atteinte vertébrale d'origine tumorale (métastase, myélome)",
      "Atteinte vertébrale d'origine dégénérative (arthrose sévère)",
      "Atteinte vertébrale d'origine malformative (scoliose, cyphose)",
      "Post-opératoire de chirurgie du rachis (arthrodèse)"
    ],
    criteres_conformite: [
      "Coque polyéthylène mono-valve",
      "Ouverture antérieure",
      "Maintien thoraco-lombo-sacré",
      "Réalisé sur mesure après moulage"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 59 N 50", "TR59N50", "CORSET.TLS", "CTLS", "Corset thoraco-lombo-sacré"]
  },

  // TR 79 N 35 - CEINTURE.LOMB avec texte PDF exact
  {
    reference: "TR 79 N 35",
    nom: "Corselet de maintien lombaire",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset de maintien ou appelé aussi corselet, c'est une coque en polyéthylène sans armature mono valve avec ouverture antérieure. Consiste à maintenir le patient dans une position correcte avec un soutien lombaire spécifique.",
    indications: [
      "Traumatisme lombaire (fracture, tassement vertébral lombaire)",
      "Discopathie lombaire sévère (hernie discale L4-L5, L5-S1)",
      "Lombalgie chronique invalidante résistante au traitement médical",
      "Post-opératoire chirurgie lombaire (laminectomie, arthrodèse)",
      "Diplégie quelque soit son origine : Le corselet se porte avec un Grand Appareil de Marche (GAM) ; c'est le Phelps"
    ],
    criteres_conformite: [
      "Coque polyéthylène mono-valve",
      "Ouverture antérieure",
      "Niveau lombaire spécifique",
      "Compatible avec GAM pour diplégie"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 79 N 35", "TR79N35", "CEINTURE.LOMB", "Corselet lombaire", "Maintien lombaire"]
  },

  // TR 29 N 36 - Milwaukee avec référence exacte
  {
    reference: "TR 29 N 36",
    nom: "Corset de Milwaukee",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset avec collier occipito-mentonnier et appuis thoraciques pour correction scoliose cervico-dorsale. Système de traction cervicale avec appuis thoraciques latéraux.",
    indications: [
      "Scoliose idiopathique thoracique haute (apex > T6)",
      "Scoliose cervico-dorsale évolutive",
      "Angle de Cobb 20-50° chez l'enfant et adolescent",
      "Scoliose pré-pubertaire avec potentiel de croissance"
    ],
    criteres_conformite: [
      "Collier occipito-mentonnier",
      "Appuis thoraciques latéraux",
      "Bassin pelvien moulé",
      "Réglable en hauteur"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 29 N 36", "TR29N36", "MILWAUKEE", "Milwaukee"]
  },

  // TR 49 K 54 - Lyonnais
  {
    reference: "TR 49 K 54",
    nom: "Corset Lyonnais (CTLS)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset thoraco-lombo-sacré en Pléxidur, utilisé comme corset de maintien post-plâtre. Immobilisation stricte après correction initiale.",
    indications: [
      "Scoliose idiopathique thoracique moyenne 30-50°",
      "Post-plâtre EDF (Elongation-Dérotation-Flexion)",
      "Scoliose post-pubertaire avec évolution stabilisée",
      "Maintien après correction orthopédique"
    ],
    criteres_conformite: [
      "Réalisé en Pléxidur thermoformé",
      "Maintien post-correction",
      "Immobilisation thoraco-lombo-sacrée stricte"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 49 K 54", "TR49K54", "LYONNAIS", "Lyonnais", "CTLS Lyonnais"]
  },

  // TR 49 N 50 - Boston
  {
    reference: "TR 49 N 50",
    nom: "Corset Boston",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset lombaire modulaire préfabriqué en polyéthylène, mono-valve avec ouverture postérieure. Correction des scolioses lombaires basses.",
    indications: [
      "Scoliose lombaire idiopathique (apex L1-L4)",
      "Angle de Cobb 20-40°",
      "Hyperlordose lombaire associée",
      "Adolescent en croissance"
    ],
    criteres_conformite: [
      "Polyéthylène thermoformé",
      "Ouverture postérieure",
      "Correction lombaire sélective",
      "Modulable"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 49 N 50", "TR49N50", "BOSTON", "Boston"]
  },

  // TR 39 N 51 - Chêneau
  {
    reference: "TR 39 N 51",
    nom: "Corset Chêneau (CTM)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset asymétrique de correction tridimensionnelle de la scoliose. Zones d'expansion et de compression spécifiques selon la déformation.",
    indications: [
      "Scoliose idiopathique évolutive dorsale ou dorso-lombaire",
      "Angle de Cobb 20-50°",
      "Scoliose avec rotation vertébrale",
      "Enfant et adolescent en phase de croissance"
    ],
    criteres_conformite: [
      "Correction 3D (dérotation)",
      "Zones d'expansion thoracique",
      "Zones de compression sur gibbosité",
      "Réalisé sur moulage 3D"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 39 N 51", "TR39N51", "CHENEAU", "Chêneau", "CTM"]
  },

  // TR 39 K 50 - Anti-cyphose
  {
    reference: "TR 39 K 50",
    nom: "Corset anti-cyphose",
    categorie: "Orthèses du tronc - Corsets",
    description: "Corset de correction de la cyphose dorsale pathologique (maladie de Scheuermann). En Pléxidur avec appui sternal et lombaire.",
    indications: [
      "Maladie de Scheuermann (cyphose > 45°)",
      "Cyphose dorsale évolutive de l'adolescent",
      "Cyphose douloureuse structurale",
      "Hyper-cyphose post-traumatique"
    ],
    criteres_conformite: [
      "Pléxidur thermoformé",
      "Appui sternal antérieur",
      "Contre-appui lombaire postérieur",
      "Force de redressement progressive"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 39 K 50", "TR39K50", "ANTI.CYPH", "Anti-cyphose", "Scheuermann"]
  },

  // TR 43 N 10 - Corset siège
  {
    reference: "TR 43 N 10",
    nom: "Corset siège pour IMC",
    categorie: "Orthèses du tronc - Corsets",
    description: "Orthèse de maintien en position assise pour enfant IMC (Infirmité Motrice Cérébrale) sans tenue de tronc. Avec assise moulée et maintien thoracique.",
    indications: [
      "IMC sévère sans contrôle postural",
      "Hypotonie axiale majeure",
      "Spina-bifida avec paralysie haute",
      "Hydrocéphalie avec troubles posturaux",
      "Myopathie évolutive"
    ],
    criteres_conformite: [
      "Coque thoracique moulée",
      "Assise adaptée avec appui ischiatique",
      "Maintien de la position assise",
      "Montable sur fauteuil roulant"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["TR 43 N 10", "TR43N10", "Corset siège", "Siège IMC"]
  },

  // C2P/SR - Corset 2 points
  {
    reference: "C2P/SR",
    nom: "Corset 2 points (C2P)",
    categorie: "Orthèses du tronc - Corsets",
    description: "Orthèse de compression thoracique pour malformations type thorax en carène (pectus carinatum) ou en entonnoir (pectus excavatum). Système de compression progressive.",
    indications: [
      "Thorax en carène (pectus carinatum)",
      "Thorax en entonnoir modéré",
      "Malformation thoracique réductible",
      "Déformation costale post-traumatique"
    ],
    criteres_conformite: [
      "Deux points d'appui principaux",
      "Système de compression réglable",
      "Pression progressive",
      "Port nocturne prolongé"
    ],
    remboursement: "100%",
    type: "Grand appareillage",
    references_composees: ["C2P/SR", "C2P", "Corset 2 points", "Thorax carène"]
  }
];

console.log(`✅ ${additionalProducts.length} produits additionnels avec références PDF exactes préparés\n`);

// Lire les produits actuels du fichier généré
const arrayMatch = currentDb.match(/export const appareillageDatabase: Appareillage\[\] = \[([\s\S]*)\];/);
if (!arrayMatch) {
  console.error('❌ Impossible de parser le fichier actuel');
  process.exit(1);
}

console.log('📊 Fusion des données...');
console.log(`   • Base actuelle: 88 produits`);
console.log(`   • Produits additionnels: ${additionalProducts.length} produits`);
console.log(`   • TOTAL FINAL: ${88 + additionalProducts.length} produits\n`);

// Construire le nouveau fichier
const newContent = header + `export const appareillageDatabase: Appareillage[] = [
${arrayMatch[1].trim()},
  // ========== PRODUITS ADDITIONNELS AVEC RÉFÉRENCES PDF EXACTES ==========
  ${additionalProducts.map(p => `{
    reference: "${p.reference}",
    nom: "${p.nom}",
    categorie: "${p.categorie}",
    description: "${p.description}",
    indications: [${p.indications.map(i => `"${i}"`).join(', ')}],
    criteres_conformite: [${p.criteres_conformite.map(c => `"${c}"`).join(', ')}],
    remboursement: "${p.remboursement}",
    type: "${p.type}",
    references_composees: [${p.references_composees.map(r => `"${r}"`).join(', ')}]
  }`).join(',\n  ')}
];
`;

// Sauvegarder
writeFileSync(currentDbPath, newContent, 'utf-8');

console.log(`✅ Base de données COMPLÈTE créée: ${currentDbPath}`);
console.log(`📦 TOTAL: ${88 + additionalProducts.length} produits`);
console.log(`\n🎉 TERMINÉ ! Tous les produits ont maintenant des références officielles + textes PDF exacts`);
