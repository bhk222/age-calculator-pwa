import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 AJOUT DE TOUS LES EXEMPLES DE COMBINAISONS DU PDF\n');

// Exemples extraits du PDF (pages 24-32)
const combinationExamples = [
  // CHAUSSURE 701 - Exemples
  {
    reference: "701.EX.01",
    nom: "701 x 02 - Pieds plats avec valgus arrière-pied",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire pour pieds plats avec valgus ou varus de l'arrière-pied après échec d'une correction avec semelle orthopédique",
    combinaison: "701 x 02",
    indications: ["Pieds plats avec valgus de l'arrière-pied après échec semelle", "Pieds plats avec varus de l'arrière-pied après échec semelle"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.02",
    nom: "701 x 02 + AS52 x 02 - Pieds plats valgus avant-pied",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort bilatéral (AS52) pour pieds plats avec valgus de l'avant-pied",
    combinaison: "701 x 02 + AS52 x 02",
    indications: ["Pieds plats avec valgus de l'avant-pied"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.03",
    nom: "701 x 02 + AS51 x 02 - Metatarsus varus",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort unilatéral (AS51) pour metatarsus varus",
    combinaison: "701 x 02 + AS51 x 02",
    indications: ["Metatarsus varus de l'avant-pied"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.04",
    nom: "701 + AS47 + 709 - Hémiplégie unilatérale",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec bride en T anti-varus/valgus (AS47) côté atteint et chaussure de complément (709) côté sain pour atteinte neurologique unilatérale",
    combinaison: "701 + AS47 + 709",
    indications: ["Hémiplégie gauche ou droite", "Atteinte neurologique centrale ou périphérique unilatérale", "Pieds tombants unilatéral", "Steppage unilatéral"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.05",
    nom: "701 x 02 + AS47 x 02 - Diplégie/Steppage bilatéral",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec bride en T (AS47) bilatérale pour atteinte neurologique bilatérale",
    combinaison: "701 x 02 + AS47 x 02",
    indications: ["Diplégie", "Pieds tombants bilatéraux", "Steppage bilatéral", "Atteinte neurologique périphérique bilatérale"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.06",
    nom: "701 + AP22 - Steppage avec instabilité cheville",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec baleinage bilatéral et tracteurs releveurs élastiques (AP22) pour steppage avec instabilité de cheville",
    combinaison: "701 + AP22",
    indications: ["Atteinte neurologique avec instabilité de cheville", "Pieds tombants avec instabilité cheville", "Steppage avec instabilité articulaire"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.07",
    nom: "701 + AS51 + 709 - PBVE unilatéral opéré",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec contrefort unilatéral (AS51) pour PBVE opéré côté atteint et chaussure complément (709) côté sain",
    combinaison: "701 + AS51 + 709",
    indications: ["Pied Bot Varus Équin (PBVE) unilatéral opéré", "PBVE unilatéral non opéré avec acquisition marche"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.08",
    nom: "701 x 02 + AS51 x 02 - PBVE bilatéral opéré",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 en paire avec contrefort unilatéral bilatéral (AS51) pour PBVE bilatéral opéré (chaussure forme retournée)",
    combinaison: "701 x 02 + AS51 x 02",
    indications: ["Pied Bot Varus Équin (PBVE) bilatéral opéré", "PBVE bilatéral avec acquisition de la marche"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.09",
    nom: "701 + AS50 - Instabilité cheville post-traumatique",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec baleinage bilatéral et capitonnage (AS50) pour instabilité importante de cheville",
    combinaison: "701 + AS50",
    indications: ["Instabilité importante de cheville post-traumatique", "Séquelles neurologiques avec instabilité cheville"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.10",
    nom: "701 + AR31 + 709 - Inégalité MI 3-6cm",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse intérieure 2-6cm (AR31) côté court et chaussure complément (709) côté normal pour inégalité membre inférieur de 3 à 6 cm",
    combinaison: "701 + AR31 + 709",
    indications: ["Inégalité d'un membre inférieur de 3 à 6 cm confirmée à la télémétrie"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.11",
    nom: "701 + AR31 + AR32 + 709 - Inégalité MI >6cm",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse intérieure 2-6cm (AR31) + raccourcissement >6cm (AR32) côté court et chaussure complément (709) côté normal pour inégalité membre inférieur supérieure à 6 cm",
    combinaison: "701 + AR31 + AR32 + 709",
    indications: ["Inégalité d'un membre inférieur supérieure à 6 cm confirmée à la télémétrie"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.12",
    nom: "701 + MO91 + 01 + 709 - Amputation trans-métatarsienne",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec moulage pied/malléoles (MO91) + ortho-prothèse métatarsienne (01) côté amputé et chaussure complément (709) côté sain",
    combinaison: "701 + MO91 + 01 + 709",
    indications: ["Amputation de l'avant-pied trans-métatarsienne (Lisfranc)"],
    type: "Grand appareillage"
  },
  {
    reference: "701.EX.13",
    nom: "701 + AD14/15/16 + 703 - Équinisme irréductible",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 701 avec orthèse correction tige montante 8-14cm (AD14) ou 14-18cm (AD15) ou >18cm (AD16) côté équin et chaussure compensation (703) côté sain pour équinisme irréductible unilatéral",
    combinaison: "701 + AD14 ou AD15 ou AD16 + 703",
    indications: ["Équinisme irréductible unilatéral selon hauteur (8-14cm, 14-18cm, >18cm)"],
    type: "Grand appareillage"
  },

  // CHAUSSURE 702 - Exemples
  {
    reference: "702.EX.01",
    nom: "702 + AD14/15/16 + 704 - Équinisme pied fragilisé",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure 702 (peausserie fine) avec orthèse correction tige montante (AD14/15/16) côté équin et chaussure compensation (704) côté sain pour équinisme irréductible unilatéral sur pied fragilisé",
    combinaison: "702 + AD14 ou AD15 ou AD16 + 704",
    indications: ["Équinisme irréductible unilatéral sur pied fragilisé (diabétique, polyarthrite, brûlure)"],
    type: "Grand appareillage"
  },

  // CHAUSSURE 705 - Exemples
  {
    reference: "705.EX.01",
    nom: "705 x 02 + AS47 x 02 - Diplégie avec GAM",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure à tourillon 705 en paire avec bride en T (AS47) bilatérale pour recevoir un Grand Appareil de Marche (GAM) en cas de diplégie",
    combinaison: "705 x 02 + AS47 x 02",
    indications: ["Diplégie polio nécessitant GAM", "Spina-bifida nécessitant GAM", "Déformations axiales complexes du pied nécessitant GAM"],
    type: "Grand appareillage"
  },
  {
    reference: "705.EX.02",
    nom: "705 + AR31 + 709 - GAM avec inégalité MI",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussure à tourillon 705 avec compensation 2-6cm (AR31) côté court pour GAM et chaussure complément (709) côté sain",
    combinaison: "705 + AR31 + 709",
    indications: ["GAM ou PAM avec inégalité membre inférieur 3-6cm"],
    type: "Grand appareillage"
  },

  // CHAUSSURE 721/722 - Exemples
  {
    reference: "721.EX.01",
    nom: "721 + 709 + MO91 + 02 - Amputation Chopart",
    categorie: "Podo-orthèses - Exemples combinaisons",
    description: "Chaussette montante 721 avec moulage (MO91) + ortho-prothèse Chopart (02) côté amputé et chaussure complément (709) côté sain pour amputation tarsienne",
    combinaison: "721 + 709 + MO91 + 02",
    indications: ["Amputation tarsométatarsienne type CHOPART", "Amputation métatarsienne type LISFRANC"],
    type: "Grand appareillage"
  },

  // Exemples ADJONCTIONS spécifiques
  {
    reference: "AD.EX.01",
    nom: "AD11 - Déformations orteils",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse pour déformations irréductibles des orteils : hallux valgus de 35° ou orteils en griffe",
    combinaison: "AD11",
    indications: ["Hallux valgus ≥ 35°", "Orteils en griffe irréductibles"],
    type: "Grand appareillage"
  },
  {
    reference: "AD.EX.02",
    nom: "AD12 - Amputation orteil",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse pour trouble complexe suite à amputation d'un orteil",
    combinaison: "AD12",
    indications: ["Amputation d'un ou plusieurs orteils"],
    type: "Grand appareillage"
  },
  {
    reference: "AD.EX.03",
    nom: "AD13 - Cas complexe déformations graves",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse compensant et enveloppant des déformations graves irréductibles ou partiellement réductibles",
    combinaison: "AD13",
    indications: ["Déformations graves irréductibles du pied", "Déformations partiellement réductibles complexes"],
    type: "Grand appareillage"
  },
  {
    reference: "MO.EX.01",
    nom: "MO91 - Moulage pied/malléoles",
    categorie: "Podo-orthèses - Moulages",
    description: "Moulage du pied enveloppant les malléoles et le pilon tibial pour cas complexes nécessitant un moulage précis",
    combinaison: "MO91",
    indications: ["Déformations complexes invétérées nécessitant moulage", "Amputations nécessitant moulage", "Pieds fragilisés nécessitant moulage"],
    type: "Grand appareillage"
  },
  {
    reference: "MO.EX.02",
    nom: "MO92 - Moulage pied/jambe",
    categorie: "Podo-orthèses - Moulages",
    description: "Moulage du pied et de la jambe jusqu'aux plateaux tibiaux pour cas très complexes",
    combinaison: "MO92",
    indications: ["Déformations très complexes nécessitant moulage étendu", "Atteintes neurologiques sévères"],
    type: "Grand appareillage"
  },
  {
    reference: "AS.EX.01",
    nom: "AS47 - Bride en T releveur",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Bride en T anti-varus ou anti-valgus ou releveurs élastiques sans baleinage pour correction déviation axiale",
    combinaison: "AS47",
    indications: ["Déviation en varus du pied", "Déviation en valgus du pied", "Pied tombant léger sans instabilité cheville"],
    type: "Grand appareillage"
  },
  {
    reference: "AS.EX.02",
    nom: "AP22 - Baleinage + tracteurs releveurs",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Adjonction pour chaussure de paralysie : baleinage bilatéral et tracteurs releveurs en sangles élastiques fixés sur la claque",
    combinaison: "AP22",
    indications: ["Pied tombant avec instabilité de cheville", "Paralysie avec steppage et instabilité"],
    type: "Grand appareillage"
  },
  {
    reference: "AR.EX.01",
    nom: "AR31 - Compensation 2-6cm",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Orthèse intérieure avec ou sans faux-bout de 2 à 6 cm de raccourcissement pour compenser inégalité membre inférieur",
    combinaison: "AR31",
    indications: ["Inégalité membre inférieur de 2 à 6 cm"],
    type: "Grand appareillage"
  },
  {
    reference: "AR.EX.02",
    nom: "AR32 - Compensation >6cm",
    categorie: "Podo-orthèses - Adjonctions",
    description: "Raccourcissement au-dessus de 6 cm pour compenser inégalité importante membre inférieur (utilisé avec AR31)",
    combinaison: "AR32",
    indications: ["Inégalité membre inférieur supérieure à 6 cm (avec AR31)"],
    type: "Grand appareillage"
  },
  {
    reference: "709.EX.01",
    nom: "709 - Chaussure complément côté sain",
    categorie: "Podo-orthèses - Compléments",
    description: "Chaussure de complément du côté sain à visée esthétique pour équilibrer avec le côté atteint portant chaussure orthopédique",
    combinaison: "709",
    indications: ["Complément esthétique côté sain en cas d'appareillage unilatéral", "Hémiplégie", "Inégalité membre inférieur", "Amputation unilatérale"],
    type: "Grand appareillage"
  }
];

console.log(`✅ ${combinationExamples.length} exemples de combinaisons extraits du PDF\n`);

// Lire le fichier actuel
const dbPath = join(process.cwd(), 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

// Trouver la fin du tableau
const arrayEndMatch = dbContent.lastIndexOf('];');
if (arrayEndMatch === -1) {
  console.error('❌ Impossible de trouver la fin du tableau');
  process.exit(1);
}

// Insérer les exemples avant la fin du tableau
const beforeEnd = dbContent.substring(0, arrayEndMatch);
const afterEnd = dbContent.substring(arrayEndMatch);

const examplesCode = combinationExamples.map(ex => `  {
    reference: "${ex.reference}",
    nom: "${ex.nom}",
    categorie: "${ex.categorie}",
    description: "${ex.description}",
    ${ex.combinaison ? `combinaison: "${ex.combinaison}",` : ''}
    indications: [${ex.indications.map(i => `"${i}"`).join(', ')}],
    type: "${ex.type}",
    remboursement: "100%",
    references_composees: ["${ex.reference}"]
  }`).join(',\n');

const newContent = beforeEnd + ',\n  // ========== EXEMPLES DE COMBINAISONS DU PDF (CHAPITRE 2) ==========\n' + examplesCode + '\n' + afterEnd;

// Sauvegarder
writeFileSync(dbPath, newContent, 'utf-8');

console.log(`✅ ${combinationExamples.length} exemples de combinaisons ajoutés à appareillage.ts`);
console.log(`📦 TOTAL: ${97 + combinationExamples.length} produits + exemples\n`);
console.log(`🎉 TERMINÉ ! Tous les exemples de combinaisons du PDF sont maintenant dans la base !`);
