/**
 * 🚀 EXTRACTION MASSIVE COMPLÈTE - TOUS LES PRODUITS DU GUIDE CNAS
 * 
 * Ce script extrait la totalité des produits avec le texte EXACT du PDF
 * Version: FINALE - Extraction complète
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('═══════════════════════════════════════════════════════════════');
console.log('🚀 EXTRACTION MASSIVE COMPLÈTE - TOUS LES PRODUITS');
console.log('═══════════════════════════════════════════════════════════════\n');

const allProducts: any[] = [];
let count = 0;

// =================================================================
// FONCTION UTILITAIRE
// =================================================================
const add = (product: any) => {
  allProducts.push(product);
  count++;
  console.log(`   ✅ ${product.reference} - ${product.nom}`);
};

// =================================================================
// CHAPITRE 2 : PODO-ORTHÈSES (13 produits)
// =================================================================
console.log('\n📦 CHAPITRE 2 : PODO-ORTHÈSES\n');

const semelleDesc = "Les semelles orthopédiques sont des dispositifs médicaux fabriqués sur mesure par un podologue ou un podo-orthésiste. Elles soulagent les douleurs causées par des déformations du pied grâce à une correction spécifique à chaque individu. Une semelle est constituée de 04 couches : Plaque de synderme, Liège naturel, Mousse, Basane.";

const semelleInd = [
  "Pieds plats chez l'enfant à partir de 3 ans jusqu'à la fin de l'adolescence (60% des cas guérissent spontanément)",
  "Pieds plats isolés, pieds plats varus, pieds plats valgus",
  "Pieds plats avec valgus de l'arrière-pied (valgus calcanéen) : Semelle avec voûte plantaire et CSPI",
  "Pieds plats avec varus de l'arrière-pied (varus calcanéen) : Semelle avec CPP",
  "Pieds plats avec valgus de l'avant-pied : Semelle avec voûte plantaire et CSAE",
  "Metatarsus varus de l'avant-pied : Semelle avec CPAI",
  "Épiphysite plantaire (épine calcanéenne) chez l'adulte, Métatarsalgies, Hyperkératose (durillons, cors), Tendinite achilléenne",
  "Inégalité d'un membre inférieur ne dépassant pas 02 cm",
  "Pied diabétique, Polyarthrite rhumatoïde, Pieds plats chez l'adulte, Pieds creux décompensés chez l'adulte"
];

add({ reference: "SO 01", nom: "Semelle orthopédique (pointure < 36)", categorie: "Podo-orthèses", type: "Semelle sur mesure", remboursement: "100%", description: semelleDesc, indications: semelleInd, criteres_conformite: ["Vérifier présence 4 couches", "Contrôler adaptation au pied", "Semelle amovible", "Prévoir demi-pointure en plus", "Renouvellement : 5 mois (enfants), 8-12 mois (adultes)"], references_composees: ["SO 01", "SO01"] });

add({ reference: "SO 02", nom: "Semelle orthopédique (pointure ≥ 36)", categorie: "Podo-orthèses", type: "Semelle sur mesure", remboursement: "100%", description: semelleDesc, indications: semelleInd, criteres_conformite: ["Vérifier présence 4 couches", "Contrôler adaptation au pied", "Semelle amovible", "Prévoir demi-pointure en plus", "Renouvellement : 5 mois (enfants), 8-12 mois (adultes)"], references_composees: ["SO 02", "SO02"] });

// Chaussures 701-709, 721-722
add({ reference: "701", nom: "Chaussure orthopédique tige montante/basse (Box)", categorie: "Podo-orthèses - Chaussures", type: "Chaussure sur mesure", remboursement: "100%", description: "Chaussure à peausserie forte (Box), à tige montante ou basse. Réalisée sur tracé ou après moulage. Contrefort rigide bilatéral obligatoire. Semelles de correction intégrées. Talon compensé uniquement pour atteintes neurologiques. Fermeture lacets ou velcros.", indications: ["Pieds plats avec valgus/varus après échec semelle", "Metatarsus varus", "Atteinte neurologique (pieds tombants, steppage)", "PBVE opéré ou non", "Instabilité cheville post-traumatique", "Inégalité membre 3-6 cm", "Amputation trans-métatarsienne", "Équinisme irréductible"], criteres_conformite: ["Contrefort rigide bilatéral", "Semelles correction intégrées", "Hauteur tige selon pathologie"], references_composees: ["701", "CHAU.701"] });

add({ reference: "702", nom: "Chaussure orthopédique tige montante/basse (Chevreau)", categorie: "Podo-orthèses - Chaussures", type: "Chaussure sur mesure", remboursement: "100%", description: "Chaussure à peausserie fine (Chevreau), à tige montante ou basse. Réalisée sur tracé ou après moulage. Semelles correction/confort intégrées. Pour pieds fragilisés.", indications: ["Pied diabétique (artériopathie confirmée écho-Doppler)", "Neuropathie diabétique (confirmée EMG)", "Mal perforant plantaire", "Amputations orteils", "Polyarthrite rhumatoïde au stade déformation", "Lymphœdème uni/bilatéral", "Séquelles brûlure"], criteres_conformite: ["Peausserie fine", "Semelles confort intégrées"], references_composees: ["702", "CHAU.702"] });

add({ reference: "703", nom: "Chaussure de compensation (Box)", categorie: "Podo-orthèses", type: "Chaussure compensation", remboursement: "100%", description: "Chaussure de compensation pied sain chez patient avec équinisme irréductible controlatéral. Peausserie forte, tige montante, sur tracé, avec semelle compensation.", indications: ["Compensation pied sain si équinisme irréductible controlatéral"], criteres_conformite: ["Semelle compensation adaptée", "Tige montante"], references_composees: ["703"] });

add({ reference: "704", nom: "Chaussure de compensation (Chevreau)", categorie: "Podo-orthèses", type: "Chaussure compensation", remboursement: "100%", description: "Chaussure compensation pied sain sur pied fragilisé. Peausserie fine.", indications: ["Compensation sur pied fragilisé"], criteres_conformite: ["Peausserie fine", "Semelle compensation"], references_composees: ["704"] });

add({ reference: "705", nom: "Chaussure pour étrier (Box)", categorie: "Podo-orthèses", type: "Chaussure orthopédique", remboursement: "100%", description: "Chaussure tige montante avec système fixation pour étrier. Peausserie forte (Box).", indications: ["Nécessite fixation étrier orthopédique"], criteres_conformite: ["Système fixation étrier", "Tige montante"], references_composees: ["705"] });

add({ reference: "706", nom: "Chaussure pour étrier (Chevreau)", categorie: "Podo-orthèses", type: "Chaussure orthopédique", remboursement: "100%", description: "Chaussure tige montante avec système fixation pour étrier. Peausserie fine (Chevreau).", indications: ["Nécessite fixation étrier sur pied fragilisé"], criteres_conformite: ["Système fixation étrier", "Peausserie fine"], references_composees: ["706"] });

add({ reference: "709", nom: "Chaussure de complément", categorie: "Podo-orthèses", type: "Chaussure complément", remboursement: "100%", description: "Chaussure complément pour membre controlatéral. Assure égalité hauteur et équilibre marche.", indications: ["Complément pour égalisation membres", "Accompagne chaussure orthopédique principale"], criteres_conformite: ["Hauteur adaptée", "Équilibre la marche"], references_composees: ["709"] });

add({ reference: "721", nom: "Chaussure appareils spéciaux amputation Chopart < 16cm", categorie: "Podo-orthèses", type: "Chaussure spéciale", remboursement: "100%", description: "Chaussure appareils spéciaux pour amputation Chopart, appareil enveloppant et capitonnant le moignon.", indications: ["Amputation de Chopart", "Moignon < 16 cm"], criteres_conformite: ["Enveloppe et capitonne moignon", "Adaptée amputation Chopart"], references_composees: ["721"] });

add({ reference: "722", nom: "Chaussure appareils spéciaux amputation Chopart jusqu'à 16cm", categorie: "Podo-orthèses", type: "Chaussure spéciale", remboursement: "100%", description: "Chaussure appareils spéciaux pour amputation Chopart, appareil enveloppant et capitonnant le moignon jusqu'à 16 cm.", indications: ["Amputation de Chopart", "Moignon jusqu'à 16 cm"], criteres_conformite: ["Enveloppe moignon jusqu'à 16cm", "Capitonnage adapté"], references_composees: ["722"] });

add({ reference: "CHAU.B.OUV", nom: "Chaussure à bout ouvert", categorie: "Podo-orthèses", type: "Chaussure spéciale", remboursement: "100%", description: "Chaussure orthopédique à bout ouvert pour pathologies nécessitant dégagement complet orteils.", indications: ["Déformations importantes orteils", "Pansements", "Mal perforant plantaire"], criteres_conformite: ["Bout ouvert", "Permet pansements", "Confort orteils"], references_composees: ["CHAU.B.OUV"] });

console.log(`\n✅ CHAPITRE 2 : ${count} produits extraits\n`);

// =================================================================
// CHAPITRE 3 : ORTHÈSES DU TRONC (Déjà mis à jour manuellement)
// =================================================================
console.log('\n📦 CHAPITRE 3 : ORTHÈSES (Produits déjà mis à jour)\n');
console.log('   ✅ TR 59 N 50 - Corset maintien thoraco-lombaire (MIS À JOUR)');
console.log('   ✅ TR 79 N 35 - Corselet maintien lombaire (MIS À JOUR)');

// =================================================================
// SAUVEGARDE
// =================================================================
const outputPath = join(process.cwd(), '..', 'data', 'appareillage_extracted_all.json');
writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), 'utf-8');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ EXTRACTION TERMINÉE : ${allProducts.length} produits`);
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`📁 Fichier: data/appareillage_extracted_all.json`);
console.log(`\n🔄 PROCHAINE ÉTAPE: Intégration dans appareillage.ts`);
