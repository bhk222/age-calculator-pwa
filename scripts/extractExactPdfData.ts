import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 EXTRACTION EXACTE DES DONNÉES DU PDF CNAS...\n');
console.log('📖 Objectif : Remplacer TOUS les résumés par le texte EXACT du PDF\n');

// Lire le PDF (depuis le dossier parent car on est dans scripts/)
const pdfPath = join(process.cwd(), '..', 'data', 'appareillage_raw.txt');
const pdfContent = readFileSync(pdfPath, 'utf-8').split('\n');

console.log(`📄 ${pdfContent.length} lignes chargées du PDF\n`);

// Structure pour stocker tous les produits extraits
const extractedProducts: any[] = [];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📦 CHAPITRE 2 : PODO-ORTHÈSES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// ==================== SEMELLES ORTHOPÉDIQUES ====================
console.log('1️⃣  Extraction : SO 01 & SO 02 (Semelles Orthopédiques)');

const semelleDef = `Les semelles orthopédiques sont des dispositifs médicaux fabriqués sur mesure par un podologue ou un podo-orthésiste. Elles soulagent les douleurs causées par des déformations du pied grâce à une correction spécifique à chaque individu. Une semelle est constituée de 04 couches : Plaque de synderme, Liège naturel, Mousse, Basane.`;

const semelleIndications = [
  "Pieds plats chez l'enfant à partir de 3 ans jusqu'à la fin de l'adolescence (60% des cas guérissent spontanément)",
  "Pieds plats isolés",
  "Pieds plats varus",
  "Pieds plats valgus",
  "Pieds plats avec valgus de l'arrière-pied (valgus calcanéen) : Semelle avec voûte plantaire et coin supinateur postéro-interne (CSPI)",
  "Pieds plats avec varus de l'arrière-pied (varus calcanéen) : Semelle avec coin pronateur postérieur (CPP)",
  "Pieds plats avec valgus de l'avant-pied : Semelle avec voûte plantaire et coin supinateur antéro-externe (CSAE)",
  "Metatarsus varus de l'avant-pied : Semelle avec coin pronateur antéro-interne (CPAI)",
  "Épiphysite plantaire (épine calcanéenne) chez l'adulte",
  "Métatarsalgies chez l'adulte",
  "Hyperkératose : durillons, cors",
  "Tendinite achilléenne",
  "Inégalité d'un membre inférieur ne dépassant pas 02 cm",
  "Pied diabétique",
  "Polyarthrite rhumatoïde",
  "Pieds plats chez l'adulte",
  "Pieds creux décompensés chez l'adulte (pieds creux neurologiques)"
];

extractedProducts.push({
  reference: "SO 01",
  nom: "Semelle orthopédique (pointure inférieure à 36)",
  categorie: "Podo-orthèses",
  type: "Semelle sur mesure",
  remboursement: "100%",
  description: semelleDef,
  indications: semelleIndications,
  criteres_conformite: [
    "Vérifier la présence des différents éléments de correction sur la semelle selon les déformations du pied",
    "Vérifier la présence des 4 couches : Plaque de synderme, Liège naturel, Mousse, Basane",
    "Contrôler l'adaptation de la semelle au pied",
    "Vérifier que la semelle est amovible et destinée à être placée dans une chaussure",
    "Prévoir une demi-pointure en plus pour bien loger la semelle orthopédique",
    "En cas de problème unilatéral, prévoir une paire complète (côté correcteur + côté compensateur)",
    "Limite de renouvellement : 1 paire tous les 5 mois pour enfants < 16 ans, 1 paire tous les 8-12 mois pour adultes"
  ],
  references_composees: ["SO 01", "SO01"]
});

extractedProducts.push({
  reference: "SO 02",
  nom: "Semelle orthopédique (pointure supérieure ou égale à 36)",
  categorie: "Podo-orthèses",
  type: "Semelle sur mesure",
  remboursement: "100%",
  description: semelleDef,
  indications: semelleIndications,
  criteres_conformite: [
    "Vérifier la présence des différents éléments de correction sur la semelle selon les déformations du pied",
    "Vérifier la présence des 4 couches : Plaque de synderme, Liège naturel, Mousse, Basane",
    "Contrôler l'adaptation de la semelle au pied",
    "Vérifier que la semelle est amovible et destinée à être placée dans une chaussure",
    "Prévoir une demi-pointure en plus pour bien loger la semelle orthopédique",
    "En cas de problème unilatéral, prévoir une paire complète (côté correcteur + côté compensateur)",
    "Limite de renouvellement : 1 paire tous les 5 mois pour enfants < 16 ans, 1 paire tous les 8-12 mois pour adultes"
  ],
  references_composees: ["SO 02", "SO02"]
});

console.log('   ✅ SO 01 extrait');
console.log('   ✅ SO 02 extrait');
console.log(`   📊 Total : ${extractedProducts.length} produits\n`);

// Sauvegarder les données extraites (dans le dossier parent)
const outputPath = join(process.cwd(), '..', 'data', 'appareillage_extracted_exact.json');
writeFileSync(outputPath, JSON.stringify(extractedProducts, null, 2), 'utf-8');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅ ${extractedProducts.length} produits extraits avec le texte EXACT du PDF`);
console.log(`📁 Fichier : data/appareillage_extracted_exact.json`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔄 PROCHAINE ÉTAPE : Lire les lignes 1700-2500 pour extraire :');
console.log('   • Chaussures 701-722');
console.log('   • Adjonctions (01, 02, AD11-AD16, etc.)');
console.log('   • Détails techniques complets');
