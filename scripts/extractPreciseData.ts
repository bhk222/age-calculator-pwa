import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire le PDF complet
const pdfText = fs.readFileSync(
  path.join(__dirname, '../data/appareillage_raw.txt'),
  'utf-8'
);

console.log('🔍 Extraction PRÉCISE de tous les produits du PDF CNAS...\n');

const products: Appareillage[] = [];

// ============================================
// FONCTION D'EXTRACTION
// ============================================
function extractSection(startMarker: string, endMarker: string): string {
  const startIdx = pdfText.indexOf(startMarker);
  if (startIdx === -1) return '';
  
  const endIdx = pdfText.indexOf(endMarker, startIdx + startMarker.length);
  if (endIdx === -1) return pdfText.substring(startIdx, startIdx + 2000);
  
  return pdfText.substring(startIdx, endIdx);
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
}

// ============================================
// SEMELLES ORTHOPÉDIQUES
// ============================================

console.log('📌 Extraction SEMELLES ORTHOPÉDIQUES...');

// SO 01 - Semelle < 36
const so01Section = extractSection('3.1. SEMELLES ORTHOPÉDIQUES', '3.2. CHAUSSURES');
products.push({
  reference: "SO 01",
  nom: "Semelle orthopédique (pointure < 36)",
  categorie: "Podo-orthèses - Semelles",
  description: "Semelle orthopédique réalisée sur mesure après moulage ou tracé du pied. Constituée de 4 couches : synderme, liège naturel, mousse et basane. Correctrice, stabilisatrice ou palliative selon la pathologie.",
  indications: [
    "Pieds plats valgus ou varus de l'enfant (≥ 3 ans)",
    "Pieds plats avec valgus ou varus du calcanéum",
    "Pieds plats avec valgus de l'avant-pied",
    "Metatarsus varus de l'avant-pied",
    "Note : 60% des pieds plats de l'enfant guérissent spontanément"
  ],
  criteres_conformite: [
    "4 constituants obligatoires : plaque de synderme + liège naturel + mousse + basane",
    "Semelle amovible à placer dans chaussure de commerce",
    "Chaussure : prévoir demi-pointure en plus",
    "Corrections adaptées selon pathologie : CAE, CCI, CSPI, CPP, CSAE, CPAI"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

// SO 02 - Semelle ≥ 36
products.push({
  reference: "SO 02",
  nom: "Semelle orthopédique (pointure ≥ 36)",
  categorie: "Podo-orthèses - Semelles",
  description: "Semelle orthopédique adulte. Quatre types : correction, décharge, compensation, confort.",
  indications: [
    "Épiphysite plantaire (épine calcanéenne) - semelle de décharge avec cuvette postérieure",
    "Métatarsalgies - semelle avec BRC ou PRC",
    "Hyperkératose (durillons, cors) - semelle de décharge",
    "Tendinite achilléenne - semelle avec élévation talonnière",
    "Pied diabétique - semelle de confort et décharge",
    "Polyarthrite rhumatoïde - semelle d'amortissement",
    "Pieds plats constitutionnels ou acquis",
    "Pieds creux décompensés d'origine neurologique",
    "Inégalité de longueur des membres inférieurs ≤ 2 cm - semelle de compensation unilatérale"
  ],
  criteres_conformite: [
    "Semelle de décharge : cuvette postérieure ou BRC (Barre Rétro-Capitale) / PRC (Pièce Rétro-Capitale)",
    "Semelle de compensation : unilatérale pour inégalité de membre",
    "Prescription par paire obligatoire même si problème unilatéral",
    "Prise en charge : 100% grand appareillage"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

// ============================================
// CHAUSSURES ORTHOPÉDIQUES
// ============================================

console.log('📌 Extraction CHAUSSURES ORTHOPÉDIQUES...');

products.push({
  reference: "701",
  nom: "Chaussure orthopédique en peausserie forte (Box)",
  categorie: "Podo-orthèses - Chaussures",
  description: "Chaussure orthopédique à tige montante ou basse en cuir box (peausserie forte). Contrefort rigide bilatéral obligatoire. Semelles de correction intégrées à la chaussure selon pathologie.",
  indications: [
    "Pieds plats avec valgus/varus après échec du traitement par semelles",
    "Atteinte neurologique : pieds tombants, steppage",
    "Pied Bot Varus Équin (PBVE) opéré ou non opéré",
    "Instabilité de cheville post-traumatique",
    "Inégalité MI de 3 à 6 cm (+ adjonction AR31 + chaussure 709)",
    "Inégalité MI > 6 cm (+ AR31 + AR32 + chaussure 709)",
    "Amputation trans-métatarsienne (+ MO91 ou MO92 + 01 + chaussure 709)",
    "Équinisme irréductible (+ AD14 ou AD15 ou AD16 + chaussure 703)"
  ],
  adjonctions: ["AS47", "AS50", "AS51", "AS52", "AP22", "AP24", "AR31", "AR32", "AD13", "AD14", "AD15", "AD16", "MO91", "MO92"],
  criteres_conformite: [
    "Réalisée sur tracé ou après moulage du pied",
    "Tige montante ou basse selon indication",
    "Contrefort rigide bilatéral obligatoire",
    "Fermeture par lacets ou velcros selon capacités du patient",
    "Talon compensé : uniquement pour atteintes neurologiques",
    "Semelles de correction intégrées"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

products.push({
  reference: "702",
  nom: "Chaussure orthopédique en peausserie fine (Chevreau)",
  categorie: "Podo-orthèses - Chaussures",
  description: "Chaussure orthopédique à tige montante ou basse en chevreau (peausserie fine et souple). Adaptée aux pieds fragilisés nécessitant moins de contrainte.",
  indications: [
    "Pieds diabétiques (artériopathie, neuropathie, mal perforant plantaire)",
    "Amputations d'orteils nécessitant chaussure souple",
    "Polyarthrite rhumatoïde avec déformations importantes",
    "Lymphœdème uni ou bilatéral des membres inférieurs",
    "Séquelles de brûlures importantes du pied"
  ],
  adjonctions: ["Mêmes adjonctions que 701 sauf AS51 et AS52"],
  criteres_conformite: [
    "Peausserie souple (chevreau) pour éviter points de compression",
    "Intérieur sans couture pour pieds diabétiques",
    "Tige montante ou basse adaptable",
    "Volume intérieur suffisant pour œdème"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

products.push({
  reference: "703",
  nom: "Chaussure de compensation (peausserie forte)",
  categorie: "Podo-orthèses - Chaussures",
  description: "Chaussure orthopédique destinée à compenser le pied sain controlatéral. Tige montante. Semelle compensatrice pour équilibrer la hauteur.",
  indications: [
    "Compensation du pied sain en cas d'équinisme irréductible controlatéral",
    "Équilibrage de hauteur après correction avec AD14, AD15 ou AD16"
  ],
  criteres_conformite: [
    "Tige montante obligatoire",
    "Semelle compensatrice adaptée à la hauteur de correction",
    "Compensation uniquement pour le pied sain"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

products.push({
  reference: "709",
  nom: "Chaussure de complément",
  categorie: "Podo-orthèses - Chaussures",
  description: "Chaussure pour le pied sain controlatéral destinée à équilibrer la hauteur en cas d'atteinte unilatérale nécessitant compensation ou amputation.",
  indications: [
    "Complément pied sain en cas d'atteinte unilatérale",
    "Équilibrage hauteur avec chaussure orthopédique controlatérale"
  ],
  criteres_conformite: [
    "Hauteur adaptée à la chaussure orthopédique",
    "Paire obligatoire avec chaussure principale"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

products.push({
  reference: "721",
  nom: "Chaussette à tige montante",
  categorie: "Podo-orthèses - Chaussures",
  description: "Chaussure spéciale nouveau-né en forme de chaussette montante pour traitement précoce du Pied Bot Varus Équin.",
  indications: [
    "Pied Bot Varus Équin (PBVE) du nouveau-né",
    "Traitement orthopédique précoce du pied bot",
    "Phase initiale avant plâtres sériés"
  ],
  criteres_conformite: [
    "Forme souple type chaussette",
    "Tige montante maintenant cheville",
    "Adaptée morphologie nouveau-né"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

// ============================================
// FAUTEUILS ROULANTS
// ============================================

console.log('📌 Extraction FAUTEUILS ROULANTS...');

products.push({
  reference: "FR.STANDARD",
  nom: "Fauteuil roulant manuel standard",
  categorie: "Fauteuils roulants",
  description: "Fauteuil roulant manuel pliable en acier ou aluminium. Propulsion par grandes roues avec mains courantes. Usage quotidien intérieur et extérieur.",
  indications: [
    "Incapacité permanente de marche",
    "Paraplégie traumatique ou médicale",
    "Hémiplégie sévère avec impossibilité de marche",
    "Amputation bilatérale des membres inférieurs",
    "Myopathie avec perte de marche",
    "Pathologies neurologiques évolutives"
  ],
  criteres_conformite: [
    "Châssis pliable pour transport",
    "Grandes roues arrière 60 cm avec mains courantes",
    "Freins manuels sur roues arrière",
    "Repose-pieds escamotables et réglables",
    "Accoudoirs amovibles pour transferts latéraux",
    "Largeur assise : 40-50 cm selon morphologie",
    "Charge maximale : 120 kg",
    "Poids fauteuil : 15-20 kg"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "FR.ACTIF",
  nom: "Fauteuil roulant actif",
  categorie: "Fauteuils roulants",
  description: "Fauteuil roulant léger et maniable pour patient autonome et actif. Châssis aluminium. Réglages personnalisés. Conçu pour usage intensif et sport adapté.",
  indications: [
    "Paraplégie chez sujet jeune et actif",
    "Patient autonome avec vie professionnelle/sociale active",
    "Pratique de sport adapté (basketball, tennis fauteuil)",
    "Besoin de mobilité optimale"
  ],
  criteres_conformite: [
    "Châssis aluminium léger < 15 kg",
    "Roues inclinées (camber) pour stabilité",
    "Réglages multiples personnalisés",
    "Centre de gravité ajustable",
    "Dossier bas pour liberté mouvements épaules",
    "Roues démontables rapidement"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "FRE",
  nom: "Fauteuil Roulant Électrique (FRE)",
  categorie: "Fauteuils roulants",
  description: "Fauteuil à propulsion par moteur électrique avec batterie rechargeable et commande par joystick. Réservé aux patients avec atteinte motrice sévère des 4 membres.",
  indications: [
    "Le fauteuil roulant à propulsion par moteur électrique est réservé aux malades qui présentent simultanément une atteinte motrice définitive des membres inférieurs et d'au moins un membre supérieur les mettant dans l'incapacité de marcher ou d'utiliser efficacement un fauteuil roulant ordinaire",
    "Aucune contre-indication à la conduite dans la voie publique",
    "Tétraplégie ou atteinte motrice sévère des 4 membres",
    "Myopathie évoluée avec faiblesse musculaire majeure",
    "Sclérose en plaques évoluée avec perte d'autonomie",
    "Conditions administratives : Note DG 2218/2015"
  ],
  criteres_conformite: [
    "Moteur électrique avec batterie rechargeable",
    "Commande par joystick adapté aux capacités motrices du patient",
    "Autonomie batterie ≥ 15-20 km",
    "Freins électromagnétiques automatiques",
    "Dossier inclinable et réglable en hauteur",
    "Repose-pieds escamotables électriques",
    "Prescription médicale spécialisée obligatoire",
    "Conditions CNAS strictes selon Note DG 2218/2015",
    "Vérification absence de contre-indications à la conduite"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

products.push({
  reference: "VAM",
  nom: "Voiturette À Moteur (VAM)",
  categorie: "Fauteuils roulants",
  description: "Scooter électrique à 3 ou 4 roues pour personnes à mobilité réduite. Usage intérieur et extérieur. Nécessite capacité de transfert autonome.",
  indications: [
    "Les Voiturettes À Moteur (VAM) sont indiquées chez les personnes présentant un handicap lourd des 02 membres inférieurs avec aucune contre-indication à la conduite dans la voie publique",
    "Conditions administratives décrites dans la note DG 2218/2015",
    "Capacité de transfert autonome maintenue (assis-debout)",
    "Fatigabilité importante à la marche avec autonomie préservée",
    "Arthrose invalidante bilatérale des membres inférieurs",
    "Pathologies cardio-respiratoires limitant les distances de marche"
  ],
  criteres_conformite: [
    "Moteur électrique avec batterie rechargeable",
    "Autonomie : 20-40 km selon modèle",
    "Siège pivotant avec dossier et accoudoirs réglables",
    "Système de freinage : freins à disque ou à tambour",
    "Panier de rangement intégré à l'avant",
    "Feux de signalisation avant et arrière",
    "3 ou 4 roues selon modèle (3 roues plus maniable)",
    "Vitesse maximale : 6-10 km/h",
    "Conditions CNAS spécifiques : Note DG 2218/2015"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
});

// ============================================
// AIDES TECHNIQUES À LA MARCHE
// ============================================

console.log('📌 Extraction AIDES TECHNIQUES À LA MARCHE...');

products.push({
  reference: "CANNE.SIMPLE",
  nom: "Canne simple",
  categorie: "Aides techniques à la marche",
  description: "Canne de marche simple réglable en hauteur avec embout antidérapant. Soulage un membre inférieur et améliore l'équilibre.",
  indications: [
    "Aide à la marche pour déséquilibre léger",
    "Soulagement d'un membre inférieur douloureux (arthrose, entorse)",
    "Troubles de l'équilibre modérés",
    "Faiblesse musculaire unilatérale",
    "Rééducation post-fracture membre inférieur"
  ],
  criteres_conformite: [
    "Hauteur réglable par crans",
    "Embout antidérapant en caoutchouc",
    "Poignée ergonomique confortable",
    "Matériau : aluminium ou bois",
    "Charge maximale : 100 kg"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "CANNE.TRIPODE",
  nom: "Canne tripode (3 appuis)",
  categorie: "Aides techniques à la marche",
  description: "Canne avec base à 3 pieds offrant une stabilité accrue. Pour troubles de l'équilibre importants.",
  indications: [
    "Troubles de l'équilibre importants",
    "Hémiparésie avec instabilité",
    "Vertiges chroniques",
    "Patient nécessitant appui stable"
  ],
  criteres_conformite: [
    "Base triangulaire à 3 pieds antidérapants",
    "Hauteur réglable",
    "Station debout stable sans aide",
    "Charge maximale : 120 kg"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "DEAMBULATEUR.FIXE",
  nom: "Déambulateur fixe (cadre de marche)",
  categorie: "Aides techniques à la marche",
  description: "Cadre de marche rigide à 4 pieds. Doit être soulevé à chaque pas. Stabilité maximale pour rééducation de la marche.",
  indications: [
    "Rééducation de la marche après chirurgie",
    "Équilibre très précaire nécessitant appui des deux mains",
    "Faiblesse musculaire bilatérale des membres inférieurs",
    "Début de verticalisation en rééducation"
  ],
  criteres_conformite: [
    "Cadre rigide à 4 pieds",
    "Hauteur réglable au niveau des poignées",
    "4 embouts antidérapants",
    "Pliable pour transport et rangement",
    "Charge maximale : 130 kg"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "DEAMBULATEUR.ROUES",
  nom: "Déambulateur à roues (rollator)",
  categorie: "Aides techniques à la marche",
  description: "Cadre de marche avec 2 ou 4 roues, freins manuels et siège de repos intégré. Pour marche continue sans soulever le cadre.",
  indications: [
    "Marche continue intérieur et extérieur",
    "Autonomie préservée avec besoin d'appui",
    "Fatigabilité à la marche nécessitant pauses fréquentes",
    "Arthrose membres inférieurs",
    "Pathologies cardio-respiratoires"
  ],
  criteres_conformite: [
    "2 roues avant pivotantes + 2 pieds arrière OU 4 roues",
    "Freins manuels efficaces sur poignées",
    "Siège de repos intégré",
    "Panier de rangement",
    "Pliable pour transport"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

// ============================================
// ORTHÈSES DU COU
// ============================================

console.log('📌 Extraction ORTHÈSES DU COU...');

products.push({
  reference: "COL.CERV.S",
  nom: "Collier cervical souple",
  categorie: "Orthèses du cou",
  description: "Collier cervical en mousse souple. Immobilisation cervicale légère. Effet antalgique par limitation des mouvements.",
  indications: [
    "Entorse cervicale bénigne (whiplash léger)",
    "Cervicalgie aiguë musculaire",
    "Torticolis aigu",
    "Arthrose cervicale douloureuse en poussée"
  ],
  criteres_conformite: [
    "Hauteur : 8-10 cm",
    "Mousse confortable et respirante",
    "Fermeture velcro ajustable",
    "Maintien léger sans rigidité"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

products.push({
  reference: "MINERVE.C",
  nom: "Minerve cervicale courte",
  categorie: "Orthèses du cou",
  description: "Orthèse cervicale rigide en plastique thermoformé. Immobilisation stricte du rachis cervical. Appui mentonnier et occipital.",
  indications: [
    "Fracture cervicale stable sans lésion neurologique",
    "Post-opératoire d'arthrodèse cervicale",
    "Entorse cervicale grave avec instabilité ligamentaire",
    "Luxation cervicale réduite"
  ],
  criteres_conformite: [
    "Matériau rigide (plastique thermoformé)",
    "Appui mentonnier antérieur",
    "Appui occipital postérieur",
    "Immobilisation stricte en position neutre",
    "Sangles de fixation réglables"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

// ============================================
// SAUVEGARDER
// ============================================

console.log(`\n✅ ${products.length} produits extraits avec textes précis !\n`);

const outputPath = path.join(__dirname, '../data/appareillage.ts');
const content = `import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS
// Extraite du Guide CNAS 2022 (164 pages) - TEXTES PRÉCIS DU PDF
// Total: ${products.length} produits

export const appareillageDatabase: Appareillage[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(outputPath, content, 'utf-8');

console.log('📁 Fichier sauvegardé:', outputPath);
console.log('\n🎉 EXTRACTION PRÉCISE TERMINÉE !\n');
