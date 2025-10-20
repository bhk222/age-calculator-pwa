import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 EXTRACTION MASSIVE - TOUS LES PRODUITS\n');

const allProducts: any[] = [];

// Descriptions réutilisables
const semelleDesc = "Les semelles orthopédiques sont des dispositifs médicaux fabriqués sur mesure par un podologue ou un podo-orthésiste. Elles soulagent les douleurs causées par des déformations du pied grâce à une correction spécifique à chaque individu. Une semelle est constituée de 04 couches : Plaque de synderme, Liège naturel, Mousse, Basane.";

const semelleIndic = ["Pieds plats enfant 3+ ans", "Pieds plats isolés/varus/valgus", "Épiphysite plantaire", "Métatarsalgies", "Hyperkératose", "Inégalité membre <2cm", "Pied diabétique", "Polyarthrite", "Pieds creux décompensés"];

// SEMELLES
allProducts.push(
  { reference: "SO 01", nom: "Semelle orthopédique (pointure < 36)", categorie: "Podo-orthèses", description: semelleDesc, indications: semelleIndic, type: "Semelle", remboursement: "100%", references_composees: ["SO 01"] },
  { reference: "SO 02", nom: "Semelle orthopédique (pointure ≥ 36)", categorie: "Podo-orthèses", description: semelleDesc, indications: semelleIndic, type: "Semelle", remboursement: "100%", references_composees: ["SO 02"] }
);

// CHAUSSURES 701-722
const chaussures = [
  ["701", "Chaussure tige montante/basse Box", "Peausserie forte, contrefort rigide", ["Pieds plats", "PBVE", "Steppage"]],
  ["702", "Chaussure tige montante/basse Chevreau", "Peausserie fine", ["Pied diabétique", "Polyarthrite", "Lymphœdème"]],
  ["703", "Chaussure compensation Box", "Compensation équinisme", ["Équinisme controlatéral"]],
  ["704", "Chaussure compensation Chevreau", "Compensation pied fragilisé", ["Compensation fragilisé"]],
  ["705", "Chaussure étrier Box", "Avec fixation étrier", ["Nécessite étrier"]],
  ["706", "Chaussure étrier Chevreau", "Étrier pied fragilisé", ["Étrier fragilisé"]],
  ["709", "Chaussure complément", "Membre controlatéral", ["Égalisation membres"]],
  ["721", "Chaussure Chopart <16cm", "Amputation Chopart", ["Amputation Chopart"]],
  ["722", "Chaussure Chopart ≤16cm", "Amputation Chopart", ["Amputation Chopart"]],
  ["CHAU.B.OUV", "Chaussure bout ouvert", "Pour déformations orteils", ["Déformations orteils", "Pansements"]]
];

chaussures.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Podo-orthèses - Chaussures", description: desc, indications: indic, type: "Chaussure", remboursement: "100%", references_composees: [ref] });
});

// ADJONCTIONS (27 adjonctions)
const adjonctions = ["01", "02", "AD11", "AD12", "AD13", "AD14", "AD15", "AD16", "AP21", "AP22", "AP24", "AP25", "AR31", "AR32", "AR33", "AS45", "AS46", "AS47", "AS49", "AS50", "AS51", "AS52", "AS54", "MO91", "MO92", "172"];
adjonctions.forEach(ref => {
  allProducts.push({ reference: ref, nom: `Adjonction ${ref}`, categorie: "Podo-orthèses - Adjonctions", description: `Adjonction pour chaussure orthopédique`, indications: ["Selon prescription"], type: "Adjonction", remboursement: "100%", references_composees: [ref] });
});

// ORTHÈSES CRÂNE/COU
const craneCou = [
  ["TR 12 S 25", "Casque protection type 3", "Casque résine polyester stratifié", ["Trépanation", "Ostéotomie crâne"]],
  ["C114", "Collier cervical souple", "Mousse appui mentonnier/occipital", ["Cervicarthrose", "Torticolis"]],
  ["C160", "Collier cervical rigide", "Polypropylène rigide", ["Cervicarthrose étagée", "Hernies discales"]],
  ["TR 23 N 35", "Minerve courte", "Polyéthylène mentonnier/thoracique", ["Fractures cervicales", "Hernies hyperalgiques"]],
  ["TR 25 N 36", "Minerve cervico-dorsale", "Immobilisation cervico-dorsale", ["Lésions cervico-dorsales", "Torticolis congénital"]]
];

craneCou.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Orthèses crâne et cou", description: desc, indications: indic, type: "Orthèse", remboursement: "100%", references_composees: [ref] });
});

// CORSETS (tous les corsets déjà en base + nouveaux)
const corsets = [
  ["TR 29 N 36", "Corset Milwaukee", "Correction scolioses avec collier occipito-mentonnier", ["Scoliose cervico-dorsale", "Scoliose Cobb <50°"]],
  ["TR 49 K 54", "Corset Lyonnais", "Maintien post-plâtre Pléxidur", ["Scolioses 30-50° post-pubertaires"]],
  ["TR 49 N 50", "Corset Boston", "Correction lombaire mono-valve", ["Scoliose lombaire souple", "Hyperlordoses"]],
  ["TR 39 N 51", "Corset Chêneau/CTM", "Correction 3D scoliose", ["Scoliose dorsale/dorsolombaire Cobb <50°"]],
  ["TR 39 K 50", "Corset anti-cyphose", "Correction cyphose Pléxidur", ["Hyper cyphose", "Maladie Scheuermann"]],
  ["TR 43 N 10", "Corset siège", "Position assise IMC", ["IMC sans position assise", "Spina-bifida", "Hydrocéphalie"]],
  ["C2P/SR", "Corset 2 points", "Thorax carène/brechet", ["Malformations thorax"]]
];

corsets.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Orthèses du tronc - Corsets", description: desc, indications: indic, type: "Corset", remboursement: "100%", references_composees: [ref] });
});

// GAM ET ORTHÈSES DE MARCHE
const gam = [
  ["OI 39 D01", "GAM tourillon 2-6cm sans cuir", "Grand appareil marche", ["PAA", "Spina bifida", "Hémiplégie"]],
  ["OI 39 D02", "GAM tourillon 2-6cm cuir 1 segment", "GAM avec cuir moulé", ["PAA avec amyotrophie"]],
  ["OI 39 D03", "GAM tourillon 2-6cm cuir 2 segments", "GAM cuir 2 segments", ["PAA amyotrophie complète"]],
  ["OI 39 N50", "Attelle marche cruro-pédieuse", "Polyéthylène articulé genou", ["PAA", "Hémiplégie", "IMC"]],
  ["OI 59 N50", "Attelle jambo-pédieuse posture", "Polyéthylène pied/jambe", ["Équins réductibles", "IMC"]],
  ["OI 59 N66", "Attelle jambo-pédieuse articulée", "Thermoplastique articulé cheville", ["Maladie Little", "Équinisme"]],
  ["OI 59 C91", "PAM Petit appareil marche", "Montants acier chaussure tourillon", ["PBVE invétéré", "Pieds neurologiques"]],
  ["OI 59 M50", "Orthèse Heidelberg sur mesure", "Thermoplastique moulé", ["Paralysie releveurs", "Varus arrière-pied"]]
];

gam.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Orthèses membres - Marche", description: desc, indications: indic, type: "Orthèse marche", remboursement: "100%", references_composees: [ref] });
});

// PROTHÈSES MEMBRES INFÉRIEURS
const prothesesMI = [
  ["PI 01 ZS 63 G", "Prothèse désarticulation hanche", "Prothèse canadienne complète", ["Hémipelvectomie", "Désarticulation hanche"]],
  ["PI 03", "Prothèse fémorale définitive", "Emboîture résine + genou + pied", ["Amputation fémorale", "Agénésie fémorale"]],
  ["PI 06", "Prothèse tibiale définitive", "Manchon + emboîture + pied", ["Amputation tibiale", "Agénésie tibiale"]],
  ["PI 07 SS 22 A", "Prothèse Symes désarticulation cheville", "Emboîture + pied prothétique", ["Désarticulation tibio-tarsienne"]],
  ["PI 28 SS 14A", "Ortho-prothèse enfant patin", "Orthèse + prothèse acquisition marche", ["Agénésie congénitale", "Raccourcissement >10cm"]]
];

prothesesMI.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Prothèses membres inférieurs", description: desc, indications: indic, type: "Prothèse", remboursement: "100%", references_composees: [ref] });
});

// CEINTURES
const ceintures = [
  ["CMB", "Ceinture maintien lombaire Lombostat", "Tissu non extensible coutil baleiné", ["Lumbago", "Lombo-sciatalgies", "Arthrose lombaire"]],
  ["CMA", "Ceinture maintien abdominal", "Baleines souples abdominales", ["Hernie ligne blanche", "Éventration", "Ptose abdominale"]],
  ["CMAB D12", "Ceinture abdomino-lombaire D12", "CMB + CMA combinés", ["Douleurs lombaires + pathologie abdominale"]],
  ["CMAB D09", "Ceinture abdomino-lombaire D09", "CMB + CMA hauteur D09", ["Douleurs dorso-lombaires + abdomen"]]
];

ceintures.forEach(([ref, nom, desc, indic]) => {
  allProducts.push({ reference: ref, nom, categorie: "Ceintures de maintien", description: desc, indications: indic, type: "Ceinture", remboursement: "100%", references_composees: [ref] });
});

console.log(`\n✅ TOTAL: ${allProducts.length} produits extraits`);
console.log('\n📊 RÉPARTITION:');
console.log(`   • Semelles: 2`);
console.log(`   • Chaussures: 10`);
console.log(`   • Adjonctions: 26`);
console.log(`   • Orthèses crâne/cou: 5`);
console.log(`   • Corsets: 7`);
console.log(`   • GAM/Orthèses marche: 8`);
console.log(`   • Prothèses MI: 5`);
console.log(`   • Ceintures: 4`);

const outputPath = join(process.cwd(), 'data', 'all_products_complete.json');
writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf-8');

console.log(`\n📁 Fichier créé: ${outputPath}`);
console.log(`🚀 Prêt pour intégration dans appareillage.ts`);
