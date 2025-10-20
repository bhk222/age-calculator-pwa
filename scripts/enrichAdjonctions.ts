import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ENRICHISSEMENT DES ADJONCTIONS (26 produits)\n');

const adjonctions: Appareillage[] = [];

// ================================
// ADJONCTIONS - EXTRAITES DU PDF CNAS PAGE 1320-1350
// ================================

adjonctions.push({
  reference: "01",
  nom: "Ortho-prothèse pour amputation méta-tarso-phalangienne",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Ortho-prothèse pour amputation méta-tarso-phalangienne trans-métatarsienne ou pour désarticulation tarso-métatarsienne. Prothèse partielle du pied remplaçant l'avant-pied amputé.",
  indications: [
    "Amputation trans-métatarsienne (Lisfranc)",
    "Désarticulation tarso-métatarsienne",
    "Perte de l'avant-pied nécessitant compensation prothétique",
    "Rééquilibrage de la marche après amputation partielle",
    "Prévention des déformations du pied restant"
  ],
  criteres_conformite: [
    "Moulage précis du moignon et du pied restant",
    "Matériau léger et résistant (résine, carbone ou silicone)",
    "Forme anatomique reproduisant l'avant-pied",
    "Surface de contact douce et non irritante",
    "Intégration dans chaussure orthopédique 701 ou 703",
    "Ajustement permettant répartition correcte des appuis",
    "Essais et ajustements multiples inclus",
    "Révision possible selon évolution du moignon"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "02",
  nom: "Ortho-prothèse pour amputation tarsienne (Chopart)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Ortho-prothèse pour amputation tarsienne (Chopart et dérivés) avec faux bout et contre-appui tibial capitonné. Prothèse partielle compensant amputation médio-tarsienne.",
  indications: [
    "Amputation de Chopart (médio-tarsienne)",
    "Amputation tarsienne (perte arrière-pied)",
    "Nécessité de contre-appui tibial pour décharge",
    "Rééquilibrage de la marche après amputation importante",
    "Prévention de l'équinisme du moignon"
  ],
  criteres_conformite: [
    "Moulage complet du moignon avec prise tibiale",
    "Faux bout prothétique anatomique",
    "Contre-appui tibial capitonné (mousse viscoélastique)",
    "Matériau composite léger (résine/carbone)",
    "Suspension par manchon ou système de fixation sécurisé",
    "Intégration dans chaussure orthopédique haute (701 ou 702)",
    "Réglages multiples pour confort optimal",
    "Contrôle régulier de l'état cutané du moignon"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD11",
  nom: "Orthèse pour déformations irréductibles des orteils",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse pour déformations irréductibles des orteils : hallux valgus > 35°, orteils en griffe, orteils en marteau. Protection et adaptation de volume.",
  indications: [
    "Hallux valgus sévère (angle > 35°)",
    "Orteils en griffe multiples",
    "Orteils en marteau (déformation DIP)",
    "Quintus varus (déviation 5ème orteil)",
    "Chevauchements d'orteils",
    "Déformations post-rhumatismales",
    "Prévention des conflits et des cors"
  ],
  criteres_conformite: [
    "Volume de chaussure augmenté en hauteur et largeur",
    "Capitonnages protecteurs aux zones de conflit",
    "Matériaux souples et non compressifs",
    "Semelle intérieure avec décharges métatarsiennes",
    "Absence de coutures sur zones sensibles",
    "Respect de la forme déformée sans compression",
    "Chaussure à ouverture large facilitant l'enfilage"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD12",
  nom: "Orthèse pour trouble complexe après amputation d'orteil",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse spéciale pour troubles complexes suite à amputation d'un ou plusieurs orteils. Rééquilibrage des appuis et compensation volumétrique.",
  indications: [
    "Amputation d'un ou plusieurs orteils",
    "Déséquilibre de l'avant-pied post-amputation",
    "Surcharge métatarsienne compensatoire",
    "Risque d'ulcération zones d'hyperpression",
    "Instabilité de l'avant-pied à la marche"
  ],
  criteres_conformite: [
    "Comblement prothétique de l'espace manquant",
    "Répartition des pressions sur avant-pied",
    "Semelle de décharge avec barre rétro-capitale",
    "Matériaux hypoallergéniques",
    "Adaptation au chaussant avec volume modifié",
    "Contrôle régulier des zones d'appui"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD13",
  nom: "Orthèse pour cas complexe avec déformations graves",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse pour cas complexes compensant et enveloppant des déformations graves irréductibles ou partiellement réductibles du pied.",
  indications: [
    "Déformations graves multiples du pied",
    "Pied rhumatoïde sévère (polyarthrite)",
    "Pied de Charcot (diabète neuropathique)",
    "Séquelles de traumatismes graves",
    "Malformations congénitales complexes",
    "Pied neurologique avec déformations associées"
  ],
  criteres_conformite: [
    "Moulage intégral du pied (MO91 ou MO92)",
    "Chaussure sur mesure totale obligatoire",
    "Matériaux permettant enveloppement sans compression",
    "Zones de décharge multiples selon déformations",
    "Volume très augmenté (largeur + hauteur)",
    "Capitonnages protecteurs extensifs",
    "Ouverture facilitant l'enfilage (velcros, lacets larges)",
    "Révisions fréquentes selon évolution"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD14",
  nom: "Orthèse de correction pied équin (8-14 cm)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse de correction dans chaussure à tige montante. Mesure prise à l'arrière du talon de 8 à 14 cm, pour déformations complexes d'un pied en équinisme.",
  indications: [
    "Pied équin modéré (flexion plantaire fixée)",
    "Séquelles d'IMC avec équinisme",
    "Rétraction du tendon d'Achille",
    "Paralysie spastique avec équinisme",
    "Pied bot résiduel avec équin"
  ],
  criteres_conformite: [
    "Tige montante hauteur 8-14 cm mesurée à l'arrière du talon",
    "Maintien de la cheville en position corrigée",
    "Tuteurs latéraux rigides si nécessaire",
    "Contrefort postérieur renforcé",
    "Compensation de talon selon degré d'équinisme",
    "Articulation de cheville bloquée ou semi-libre selon cas"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD15",
  nom: "Orthèse de correction pied équin (14-18 cm)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse de correction dans chaussure à tige montante mesure prise à l'arrière du talon de 14 à 18 cm pour déformations complexes d'un pied en équinisme important.",
  indications: [
    "Pied équin important (flexion plantaire > 30°)",
    "Équinisme sévère post-IMC",
    "Rétraction majeure du triceps sural",
    "Pied bot varus équin non opéré ou résiduel",
    "Nécessité de maintien haut pour contrôle cheville"
  ],
  criteres_conformite: [
    "Tige montante hauteur 14-18 cm à l'arrière du talon",
    "Tuteurs métalliques latéraux obligatoires",
    "Articulation de cheville avec butée réglable",
    "Compensation importante du talon",
    "Sangles de maintien multiples",
    "Chaussure renforcée structurellement"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AD16",
  nom: "Orthèse de correction pied équin (> 18 cm)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse de correction dans chaussure à tige montante mesure prise à l'arrière du talon au-dessus de 18 cm. Pour équinisme majeur nécessitant maintien jambier.",
  indications: [
    "Pied équin majeur (flexion > 45°)",
    "Équinisme très sévère avec instabilité majeure",
    "Nécessité de prise jambière haute",
    "Cas complexes nécessitant immobilisation quasi-complète",
    "Alternative à l'attelle cruro-pédieuse amovible"
  ],
  criteres_conformite: [
    "Tige montante > 18 cm englobant mollet",
    "Tuteurs métalliques articulés obligatoires",
    "Articulation de cheville à angle réglable",
    "Sangles de serrage multiples (cheville + mollet)",
    "Compensation majeure du talon",
    "Moulage du pied et de la jambe (MO92)",
    "Structure très renforcée"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AP21",
  nom: "Orthèse plantaire pour chaussure de paralysie",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure de paralysie : orthèse plantaire interne compensant déficits musculaires du pied.",
  indications: [
    "Paralysies périphériques du pied",
    "Déficit musculaire intrinsèque du pied",
    "Pied plat paralytique",
    "Séquelles de poliomyélite",
    "Atteinte du nerf sciatique poplité"
  ],
  criteres_conformite: [
    "Orthèse plantaire moulée sur mesure",
    "Soutien de voûte plantaire renforcé",
    "Matériaux semi-rigides (résine, carbone)",
    "Correction des troubles statiques du pied",
    "Intégration dans chaussure montante",
    "Maintien des arches longitudinale et transversale"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AP22",
  nom: "Baleinage bilatéral avec tracteurs releveurs",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure de paralysie : baleinage bilatéral et tracteurs releveurs en sangles élastiques fixés sur la claque de la chaussure.",
  indications: [
    "Pied tombant (steppage) unilatéral ou bilatéral",
    "Paralysie du nerf sciatique poplité externe",
    "Déficit des releveurs du pied",
    "Séquelles de poliomyélite avec steppage",
    "Paralysie péronière post-traumatique"
  ],
  criteres_conformite: [
    "Baleinage métallique bilatéral rigide intégré dans tige",
    "Tracteurs releveurs élastiques fixés sur empeigne",
    "Élastiques résistants et remplaçables",
    "Système de fixation sécurisé et réglable",
    "Maintien de la cheville en position neutre",
    "Chaussure montante obligatoire (701 ou 702)",
    "Ajustement de la tension des élastiques selon force nécessaire"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AP24",
  nom: "Ressort postérieur en acier pour paralysie",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure de paralysie : ressort postérieur en acier inclus dans la tige montante. Système de relevé dynamique du pied.",
  indications: [
    "Pied tombant nécessitant relevé dynamique",
    "Paralysie péronière avec marche conservée",
    "Alternative aux sangles élastiques",
    "Patient actif nécessitant système résistant",
    "Pied tombant unilatéral"
  ],
  criteres_conformite: [
    "Ressort en acier inoxydable haute résistance",
    "Intégration dans tige montante arrière",
    "Action de relevé progressive et contrôlée",
    "Résistance à la fatigue mécanique",
    "Réglage de la tension possible",
    "Chaussure renforcée pour supporter contraintes",
    "Durabilité minimum 12 mois"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AP25",
  nom: "Tuteurs métalliques latéraux (dispositif externe)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure de paralysie : dispositif externe à tuteurs métalliques latéraux articulés ou non. Attelle cruro-pédieuse intégrée à la chaussure.",
  indications: [
    "Instabilité majeure de la cheville",
    "Paralysie flasque des muscles de jambe",
    "Séquelles de poliomyélite avec faiblesse majeure",
    "Paralysie post-traumatique sévère",
    "Nécessité de maintien rigide cheville + pied"
  ],
  criteres_conformite: [
    "Tuteurs métalliques bilatéraux en acier ou aluminium",
    "Articulation de cheville avec butées réglables",
    "Emboîture jambière moulée ou semi-moulée",
    "Sangles de fixation multiples (pied + cheville + jambe)",
    "Connexion solide avec chaussure orthopédique",
    "Poids optimisé (< 1 kg par tuteur)",
    "Réglages angulaires dorsiflexion/plantarflexion"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AR31",
  nom: "Orthèse intérieure avec compensation (2-6 cm)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Orthèse intérieure avec ou sans faux-bout pour compensation de raccourcissement de 2 à 6 cm du membre inférieur.",
  indications: [
    "Inégalité de longueur des membres inférieurs de 2 à 6 cm",
    "Raccourcissement post-traumatique",
    "Inégalité congénitale modérée",
    "Nécessité de compensation pour équilibre du bassin",
    "Prévention des troubles rachidiens"
  ],
  criteres_conformite: [
    "Hauteur de compensation exacte selon télémétrie",
    "Matériaux légers (liège, mousse haute densité)",
    "Faux-bout prothétique si amputation associée",
    "Intégration dans chaussure orthopédique",
    "Compensation progressive si > 4 cm",
    "Vérification clinique de l'équilibre du bassin",
    "Chaussure de complément controlatérale (709)"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AR32",
  nom: "Compensation externe pour raccourcissement > 6 cm",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Compensation externe de raccourcissement supérieur à 6 cm. Épaisseur minimale 2 cm, garnie cuir, sur toute longueur du talon.",
  indications: [
    "Inégalité de longueur > 6 cm",
    "Raccourcissement majeur post-fracture",
    "Inégalité congénitale importante",
    "Nécessité de compensation externe importante",
    "Association avec AR31 pour compensation totale"
  ],
  criteres_conformite: [
    "Compensation externe sur semelle > 6 cm",
    "Répartition progressive de la hauteur (avant-pied + talon)",
    "Revêtement cuir résistant à l'usure",
    "Semelle antidérapante renforcée",
    "Légèreté maximale malgré l'épaisseur",
    "Combinaison avec AR31 pour hauteur totale",
    "Chaussure 709 controlatérale obligatoire"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AR33",
  nom: "Compensation externe minimale (2 cm minimum)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure de compensation externe de 2 cm minimum d'épaisseur garnie peau sur la longueur du talon.",
  indications: [
    "Inégalité légère < 2 cm",
    "Compensation partielle en complément d'orthèse interne",
    "Ajustement fin de l'équilibre",
    "Pathologie ne permettant pas compensation interne seule"
  ],
  criteres_conformite: [
    "Épaisseur minimum 2 cm au talon",
    "Revêtement cuir de qualité",
    "Forme anatomique du talon respectée",
    "Léger et résistant",
    "Antidérapant"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS45",
  nom: "Fermeture à glissière ou bandes adhésives",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Système de fermeture facilitée : fermeture à glissière (zip) ou bandes adhésives type velcro pour faciliter l'enfilage.",
  indications: [
    "Difficultés à lacer (arthrose des mains, tremblements)",
    "Œdèmes fluctuants nécessitant ajustement rapide",
    "Personnes âgées avec limitations manuelles",
    "Enfants en apprentissage",
    "Nécessité d'enfilage/déshabillage rapide"
  ],
  criteres_conformite: [
    "Fermeture éclair robuste avec curseur large",
    "Ou bandes velcro larges (3-5 cm) résistantes",
    "Facilité d'utilisation d'une seule main si possible",
    "Résistance aux cycles répétés d'ouverture/fermeture",
    "Renfort des zones de tension"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS46",
  nom: "Gousset élastique sur tige",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Insertion d'un gousset élastique sur la tige de la chaussure permettant adaptation aux variations de volume du pied.",
  indications: [
    "Œdèmes fluctuants du pied/cheville",
    "Insuffisance veineuse avec gonflement variable",
    "Lymphœdème du membre inférieur",
    "Variations de volume au cours de la journée",
    "Nécessité de confort et d'adaptation volumétrique"
  ],
  criteres_conformite: [
    "Tissu élastique haute qualité et résistant",
    "Largeur suffisante (5-8 cm minimum)",
    "Élasticité conservée dans le temps",
    "Coutures renforcées aux jonctions",
    "Position optimale sur tige (latérale ou médiale)"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS47",
  nom: "Bride en T anti-varus/valgus ou releveurs élastiques",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Bride en T pour correction varus/valgus ou releveurs élastiques sans baleinage. Système léger de relevé du pied.",
  indications: [
    "Pied tombant léger à modéré",
    "Varus ou valgus de cheville nécessitant correction",
    "Déficit léger des releveurs",
    "Alternative légère au baleinage complet",
    "Pied neurologique débutant"
  ],
  criteres_conformite: [
    "Bride en T en cuir ou matériau synthétique résistant",
    "Ou sangles élastiques réglables",
    "Fixation solide sur chaussure",
    "Réglage de la tension possible",
    "Confort sans compression excessive",
    "Action de relevé ou correction efficace"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS49",
  nom: "Baleinage unilatéral avec capitonnage",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Baleinage unilatéral (interne ou externe) avec capitonnage de protection contre les pressions et frottements.",
  indications: [
    "Instabilité unilatérale de cheville",
    "Varus ou valgus unilatéral modéré",
    "Protection contre entorse récidivante",
    "Faiblesse ligamentaire latérale",
    "Séquelle de traumatisme cheville"
  ],
  criteres_conformite: [
    "Baleine métallique rigide ou semi-rigide",
    "Capitonnage mousse protection (1-2 cm épaisseur)",
    "Intégration dans tige sans saillie interne",
    "Hauteur adaptée à la pathologie",
    "Confort et absence de point de pression"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS50",
  nom: "Baleinage bilatéral avec capitonnage",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Baleinage bilatéral (interne ET externe) avec capitonnage de protection. Maintien renforcé de la cheville.",
  indications: [
    "Instabilité bilatérale majeure de cheville",
    "Laxité ligamentaire sévère",
    "Séquelles neurologiques avec hypotonie",
    "Prévention des entorses répétées",
    "Arthrose de cheville avec instabilité"
  ],
  criteres_conformite: [
    "Deux baleines métalliques (latérale interne + externe)",
    "Capitonnages bilatéraux protecteurs",
    "Symétrie et équilibre des renforts",
    "Tige montante obligatoire",
    "Maintien rigide sans limitation excessive de la marche"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS51",
  nom: "Contrefort unilatéral en cuir ou synthétique",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Contrefort unilatéral rigide en cuir ou matériaux de synthèse pour maintien de l'arrière-pied.",
  indications: [
    "Valgus ou varus de l'arrière-pied unilatéral",
    "Déformation modérée nécessitant correction",
    "Pied plat valgus unilatéral",
    "Instabilité sous-talienne unilatérale"
  ],
  criteres_conformite: [
    "Contrefort rigide en cuir dur ou plastique thermoformé",
    "Hauteur suffisante (couvrant calcanéum)",
    "Forme anatomique épousant talon",
    "Rigidité suffisante pour maintien",
    "Confort sans compression excessive"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS52",
  nom: "Contrefort bilatéral en cuir ou synthétique",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Contrefort bilatéral rigide en cuir ou matériaux de synthèse. Maintien postérieur renforcé bilatéral de l'arrière-pied.",
  indications: [
    "Valgus ou varus bilatéral de l'arrière-pied",
    "Pieds plats valgus bilatéraux",
    "Instabilité sous-talienne bilatérale",
    "Déformations rhumatismales",
    "Hyperlaxité ligamentaire généralisée"
  ],
  criteres_conformite: [
    "Contreforts bilatéraux rigides symétriques",
    "Matériau résistant (cuir dur ou composite)",
    "Hauteur englobant calcanéum et malléoles",
    "Forme anatomique respectant morphologie",
    "Maintien efficace sans douleur"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "AS54",
  nom: "Contrefort bilatéral + tuteurs métalliques",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Contrefort bilatéral en cuir ou matériaux de synthèse AVEC tuteurs métalliques ou plastique bilatéraux. Maintien maximal de cheville.",
  indications: [
    "Instabilité majeure de cheville bilatérale",
    "Déformations sévères nécessitant contrôle rigide",
    "Séquelles neurologiques avec hypotonie majeure",
    "Paralysie flasque bilatérale",
    "Arthrose sévère de cheville avec instabilité"
  ],
  criteres_conformite: [
    "Contreforts bilatéraux rigides",
    "PLUS tuteurs métalliques ou plastique bilatéraux",
    "Articulation de cheville possible ou bloquée selon cas",
    "Hauteur englobant malléoles",
    "Structure renforcée pour supporter contraintes",
    "Poids optimisé malgré renfort"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "MO91",
  nom: "Moulage du pied enveloppant malléoles et pilon tibial",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Moulage du pied enveloppant les malléoles et le pilon tibial. Prise d'empreinte complète du pied pour déformations majeures.",
  indications: [
    "Déformations complexes et invétérées du pied",
    "Pied de Charcot (diabète neuropathique)",
    "Pied rhumatoïde sévère",
    "Séquelles de brûlures",
    "Malformations congénitales graves",
    "Nécessité de chaussure totalement sur mesure"
  ],
  criteres_conformite: [
    "Moulage en plâtre ou résine du pied complet",
    "Prise jusqu'aux malléoles incluses",
    "Englobe pilon tibial distal",
    "Positionnement correct du pied pendant moulage",
    "Fabrication de forme positive pour chaussure",
    "Conservation du moulage pour référence future",
    "Obligatoire pour chaussure 701 avec déformations majeures"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "MO92",
  nom: "Moulage du pied et de la jambe jusqu'aux plateaux tibiaux",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Moulage complet du pied et de la jambe jusqu'aux plateaux tibiaux. Pour déformations très sévères nécessitant prise jambière haute.",
  indications: [
    "Déformations extrêmes pied + cheville + jambe",
    "Instabilité majeure nécessitant maintien jambier",
    "Séquelles d'IMC avec déformations multiples",
    "Paralysie flasque complète du membre inférieur",
    "Nécessité d'orthèse cruro-pédieuse intégrée"
  ],
  criteres_conformite: [
    "Moulage complet pied + jambe jusqu'en sous-genou",
    "Atteint les plateaux tibiaux (juste sous genou)",
    "Positionnement anatomique optimal pendant moulage",
    "Permet fabrication chaussure + attelle intégrée",
    "Obligatoire pour AD16 (tige > 18 cm)",
    "Conservation du moulage pour ajustements futurs"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

adjonctions.push({
  reference: "172",
  nom: "Talonnette orthopédique (RC35)",
  categorie: "Podo-orthèses - Adjonctions",
  description: "Adjonction pour chaussure orthopédique : talonnette de correction RC35. Élévation de talon pour compensation légère ou correction posturale.",
  indications: [
    "Inégalité légère des membres inférieurs (< 2 cm)",
    "Tendinopathie d'Achille nécessitant décharge",
    "Talalgie (douleur de talon) avec nécessité de surélévation",
    "Épine calcanéenne avec conflit",
    "Correction posturale légère"
  ],
  criteres_conformite: [
    "Hauteur de 1 à 2 cm au talon",
    "Matériau absorbeur de chocs (mousse viscoélastique ou gel)",
    "Forme anatomique du talon",
    "Amovible ou intégrée selon prescription",
    "Léger et confortable",
    "Antidérapant"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

console.log(`\n✅ ${adjonctions.length} adjonctions enrichies avec descriptions détaillées + indications + critères !`);

// Charger la base actuelle
const currentDbPath = path.join(__dirname, '../data/appareillage.ts');
const currentContent = fs.readFileSync(currentDbPath, 'utf-8');

// Extraire les produits existants (sauf adjonctions)
const match = currentContent.match(/export const appareillageDatabase: Appareillage\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('❌ Impossible de parser la base actuelle');
  process.exit(1);
}

const currentProducts: Appareillage[] = JSON.parse(match[1]);
const nonAdjonctions = currentProducts.filter(p => p.categorie !== "Podo-orthèses - Adjonctions");

console.log(`📦 Produits existants (hors adjonctions) : ${nonAdjonctions.length}`);

// Fusionner
const allProducts = [...nonAdjonctions, ...adjonctions];

// Sauvegarder
const newContent = `import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS
// Extraite du Guide CNAS 2022 (164 pages)
// Enrichissement progressif: Semelles (2) + Chaussures (11) + Adjonctions (26) = 39 produits enrichis
// TOTAL: ${allProducts.length} produits

export const appareillageDatabase: Appareillage[] = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(currentDbPath, newContent, 'utf-8');

console.log(`\n📁 Base de données mise à jour : ${allProducts.length} produits au total`);
console.log(`   - Semelles : 2`);
console.log(`   - Chaussures : 11`);
console.log(`   - Adjonctions : ${adjonctions.length} ✅ ENRICHIES`);
console.log(`   - Autres catégories : ${nonAdjonctions.length - 13}`);

console.log('\n🎉 ADJONCTIONS ENRICHIES - Prochaine étape: Orthèses (23 produits)\n');
