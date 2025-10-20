import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 AJOUT DE TOUTES LES RÉFÉRENCES COMPOSÉES MANQUANTES\n');

// Charger base actuelle
const dbPath = path.join(__dirname, '../data/appareillage.ts');
const content = fs.readFileSync(dbPath, 'utf-8');
const match = content.match(/export const appareillageDatabase: Appareillage\[\] = (\[[\s\S]*\]);/);
const current: Appareillage[] = JSON.parse(match![1]);

console.log(`📦 Base actuelle: ${current.length} produits\n`);

// TOUTES LES RÉFÉRENCES COMPOSÉES DU PDF CNAS (COMPLÈTES)
const allComposedRefs: Record<string, string[]> = {
  // SEMELLES (COMPLÈTES)
  "SO 01": ["PI 28 SS 14A", "PI 28", "SS 14A"],
  "SO 02": ["PI 28 SS 14B", "PI 28", "SS 14B"],
  
  // CHAUSSURES (TOUTES LES COMBINAISONS)
  "701": [
    "701 x 01", "701 x 02",
    "701 + AS47", "701 x 01 + AS47 + 709", "701 x 02 + AS47 x 02",
    "701 + AP22", "701 + AS50", "701 + AS51", "701 x 02 + AS51 x 02",
    "701 + AS52", "701 x 02 + AS52 x 02",
    "701 + AR31 + 709", "701 x 01 + AR31 + AR32 + 709",
    "701 + AR51 + 709", "701 x 02 + AR51 x 02",
    "701 + MO91 + 01 + 709", "701 + MO91",
    "701 + AD14 + 703", "701 + AD15 + 703", "701 + AD16 + 703"
  ],
  "702": ["702 x 01", "702 x 02", "702 + AS47", "702 x 02 + AS47 x 02", "702 + AD14", "702 + AD15", "702 + AD16"],
  "703": ["703 x 01", "703 x 02"],
  "704": ["704 x 01", "704 x 02"],
  "705": ["705 x 01", "705 x 02", "705 + 706", "705 x 02 + AS47 x 02", "705 x 01 + AR31 + 709"],
  "706": ["706 x 01", "706 x 02"],
  "707": ["707 x 01", "707 x 02"],
  "708": ["708 x 01", "708 x 02"],
  "709": ["709 x 01", "Chaussure complément"],
  "721": ["721 x 01", "Chaussette amputation Chopart"],
  "722": ["722 x 01", "Chaussette amputation Chopart tige 16cm"],
  "CHAU.B.OUV": ["CHAU.B.OUV x 01", "CHAU.B.OUV x 02", "Chaussure à bout ouvert"],
  
  // ADJONCTIONS (TOUTES LES COMBINAISONS)
  "01": ["01", "01 + 701", "01 + MO91", "Ortho-prothèse métatarsienne"],
  "02": ["02", "02 + 721", "02 + 722", "Ortho-prothèse Chopart"],
  "AD11": ["AD11", "AD11 + 701", "AD11 + 702", "Hallux valgus 35°"],
  "AD12": ["AD12", "AD12 + 701", "AD12 + 702", "Amputation orteil"],
  "AD13": ["AD13", "AD13 + 701", "AD13 + 702", "AD13 + MO91", "Déformation complexe"],
  "AD14": ["AD14", "AD14 + 701", "AD14 + 703", "Équinisme 8-14cm"],
  "AD15": ["AD15", "AD15 + 701", "AD15 + 703", "Équinisme 14-18cm"],
  "AD16": ["AD16", "AD16 + 701", "AD16 + 703", "Équinisme > 18cm"],
  "AP21": ["AP21", "AP21 + 701", "Orthèse plantaire"],
  "AP22": ["AP22", "AP22 + 701", "AP22 + 702", "Baleinage + releveurs"],
  "AP24": ["AP24", "AP24 + 701", "AP 24", "Ressort postérieur acier"],
  "AP25": ["AP25", "AP25 + 701", "Tuteurs métalliques latéraux"],
  "AR31": ["AR31", "AR31 + 701 + 709", "Raccourcissement 2-6cm"],
  "AR32": ["AR32", "AR32 + 701 + AR31 + 709", "Raccourcissement > 6cm"],
  "AR33": ["AR33", "AR33 + 701", "Compensation externe 2cm"],
  "AS45": ["AS45", "AS45 + 701", "AS45 + 702", "Fermeture glissière"],
  "AS46": ["AS46", "AS46 + 701", "AS46 + 702", "Gousset élastique"],
  "AS47": ["AS47", "AS47 + 701", "AS47 + 702", "AS47 x 02", "Bride T anti-varus/valgus"],
  "AS49": ["AS49", "AS49 + 701", "Baleinage unilatéral"],
  "AS50": ["AS50", "AS50 + 701", "Baleinage bilatéral"],
  "AS51": ["AS51", "AS51 + 701", "AS51 x 02", "Contrefort unilatéral"],
  "AS52": ["AS52", "AS52 + 701", "AS52 x 02", "Contrefort bilatéral"],
  "AS54": ["AS54", "AS54 + 701", "Contrefort + tuteur bilatéral"],
  "172": ["172", "172 + 701", "172 + 702", "Talonnette RC35"],
  "MO91": ["MO91", "MO91 + 701", "MO91 + 01", "Moulage pied + malléoles"],
  "MO92": ["MO92", "MO92 + 701", "Moulage pied + jambe"],
  
  // ORTHÈSES DU CRÂNE
  "CASQUE.T1": ["TR 12 D 01", "TR12D01", "Casque Duralumin"],
  "CASQUE.T2": ["TR 12 N 35", "TR12N35", "Casque Polyéthylène"],
  "CASQUE.T3": ["TR 12 S 25", "TR12S25", "Casque Résine"],
  
  // ORTHÈSES DU COU
  "COL.CERV.S": ["C114", "C 114", "Collier cervical souple"],
  "COL.CERV.SR": ["C160", "C 160", "Collier cervical rigide"],
  "MINERVE.C": ["TR 23 N 35", "TR23N35", "Minerve courte"],
  "MINERVE.CD": ["TR 25 N 36", "TR25N36", "Minerve cervico-dorsale"],
  
  // CORSETS (TOUTES LES RÉFÉRENCES)
  "MILWAUKEE": ["TR 29 N 36", "TR29N36", "Corset Milwaukee"],
  "LYONNAIS": ["TR 49 K 54", "TR49K54", "CTLS", "Corset Lyonnais"],
  "BOSTON": ["TR 49 N 50", "TR49N50", "Corset Boston"],
  "CHENEAU": ["TR 39 N 51", "TR39N51", "CTM", "Corset Chêneau"],
  "ANTI.CYPH": ["TR 39 K 50", "TR39K50", "Corset anti-cyphose"],
  "CORSET.TLS": ["TR 59 N 50", "TR59N50", "Maintien thoraco-lombaire"],
  "CEINTURE.LOMB": ["TR 79 N 35", "TR79N35", "Maintien lombaire"],
  "CORSET.SIEGE": ["TR 43 N 10", "TR43N10", "Corset siège"],
  "CEINTURE.ABD": ["Ceinture abdominale"],
  "CEINTURE.ABD.LOMB": ["Ceinture lombo-abdominale"],
  
  // ORTHÈSES MEMBRES SUPÉRIEURS (COMPLÈTES)
  "OS 79 G01": ["OS 79 G01", "OS79G01", "Attelle palmaire", "Orthèse main-poignet"],
  "OS 59 G01": ["OS 59 G01", "OS59G01", "Attelle poignet"],
  "OS 57 N01": ["OS 57 N01", "OS57N01"],
  "OS 58 C01": ["OS 58 C01", "OS58C01"],
  "OS 58 C02": ["OS 58 C02", "OS58C02"],
  "OS 58 N01": ["OS 58 N01", "OS58N01"],
  "OS 58 N02": ["OS 58 N02", "OS58N02"],
  "OS 13 N01": ["OS 13 N01", "OS13N01", "Sarmiento", "Orthèse coude"],
  "OS 13 N02": ["OS 13 N02", "OS13N02", "Attelle épaule-bras"],
  "OS 16 N02": ["OS 16 N02", "OS16N02", "Dujarrier", "Écharpe épaule"],
  "OS 36 N02": ["OS 36 N02", "OS36N02", "Orthèse pouce"],
  "OS 36 N11": ["OS 36 N11", "OS36N11", "Orthèse main"],
  
  // ORTHÈSES MEMBRES INFÉRIEURS (COMPLÈTES - TOUTES LES VARIANTES)
  "OI 59 N50": ["OI 59 N 50", "OI59N50", "Orthèse genou simple"],
  "OI 59 N66": ["OI 59 N66", "OI59N66", "Orthèse genou articulée"],
  "OI 59 M50": ["OI 59 M50", "OI59M50", "Orthèse genou modulaire"],
  "OI 59 C91": ["OI 59 C91", "OI59C91", "PAM", "Petit Appareil Marche"],
  "OI 59 C90": ["OI 59 C90", "OI59C90", "PAM standard"],
  "OI 39 N53": ["OI 39 N 53", "OI39N53", "Orthèse genou-cheville"],
  "OI 39 N50": ["OI 39 N50", "OI39N50", "Orthèse jambe"],
  "OI 39 N52": ["OI 39 N 52", "OI39N52"],
  "OI 39 FC01": ["OI 39 FC01", "OI39FC01", "Orthèse fibre carbone + chaussure"],
  "OI 39 FC07": ["OI 39 FC07", "OI39FC07", "Orthèse fibre carbone + botte"],
  "OI 36 N10": ["OI 36 N10", "OI36N10", "Attelle jambe simple"],
  "OI 36 N11": ["OI 36 N11", "OI36N11", "Cruro-pédieuse", "Attelle cruro"],
  
  // GAM - TOUTES LES VARIANTES (01-08)
  "GAM": [
    "Grand Appareil Marche",
    "OI 39 D01", "OI 39 C01", "OI39D01", "OI39C01",
    "OI 39 D02", "OI 39 C02", "OI39D02", "OI39C02",
    "OI 39 D03", "OI 39 C03", "OI39D03", "OI39C03",
    "OI 39 D04", "OI 39 C04", "OI39D04", "OI39C04",
    "OI 39 D05", "OI 39 C05", "OI39D05", "OI39C05",
    "OI 39 D06", "OI 39 C06", "OI39D06", "OI39C06",
    "OI 39 D07", "OI 39 C07", "OI39D07", "OI39C07",
    "OI 39 D08", "OI 39 C08", "OI39D08", "OI39C08"
  ],
  "ATTELLE.DB": ["Dos de botte", "Volkmann", "Attelle postérieure"],
  
  // PROTHÈSES MEMBRES INFÉRIEURS (NOUVELLES)
  "PROTMI": [
    "PI 48 SS 23A", "PI48SS23A", "Ortho-prothèse adulte",
    "PI 48 SS 24A", "PI48SS24A",
    "PI 03 ZP 63D", "PI03ZP63D",
    "PI 03 ZP 64D", "PI03ZP64D",
    "PSM 03", "PSM03",
    "PSM 05", "PSM05",
    "PSM 06", "PSM06"
  ],
  
  // FAUTEUILS ROULANTS
  "FRE": ["Fauteuil électrique", "FR électrique", "Fauteuil roulant électrique"],
  "VAM": ["Voiturette à moteur", "Voiturette motorisée"],
  "FR.STANDARD": ["FR standard", "Fauteuil standard", "Fauteuil roulant standard"],
  "FR.ACTIF": ["FR actif", "Fauteuil actif", "Fauteuil roulant actif"],
  "FR.LARGE": ["FR large", "FR obésité", "Fauteuil large"],
  "FR.GR": ["FR grand", "FR grande taille", "Fauteuil grand"],
  "POUSSETTE.IMC": ["Poussette IMC enfant", "Poussette spécialisée", "Poussette handicap"],
  "FR.IMC": ["Fauteuil IMC", "FR posture complexe", "Fauteuil IMC ado/adulte"],
  
  // AIDES À LA MARCHE
  "CANNE.SIMPLE": ["Canne simple bois", "Canne simple alu", "Canne simple"],
  "CANNE.TRIPODE": ["Canne tripode", "Canne 3 pieds"],
  "CANNE.QUADRIPODE": ["Canne quadripode", "Canne 4 pieds"],
  "CANNE.ANGLAISE": ["Béquille", "Canne anglaise", "Béquille avant-bras"],
  "DEAMBULATEUR.FIXE": ["Cadre de marche", "Déambulateur fixe", "Cadre fixe"],
  "DEAMBULATEUR.ROUES": ["Déambulateur 2 roues", "Cadre 2 roues"],
  "ROLLATOR": ["Déambulateur 4 roues", "Rollator 4 roues", "Cadre 4 roues"],
  
  // BANDAGES
  "BANDAGE.ING.S": ["Bandage inguinal simple", "Bandage herniaire simple"],
  "BANDAGE.ING.D": ["Bandage inguinal double", "Bandage herniaire double"],
  "BANDAGE.OMBIL": ["Bandage ombilical", "Bandage hernie ombilicale"],
  
  // MATELAS
  "MATELAS.ANTIESC": ["Matelas anti-escarres", "Matelas HR", "Matelas air alterné", "Matelas pneumatique"],
  
  // STOMIES
  "POCHE.COLO": ["Poche colostomie 1 pièce", "Poche colostomie 2 pièces", "Poche colostomie bi-bloc"],
  "POCHE.ILEO": ["Poche iléostomie vidable", "Poche iléostomie bi-bloc"],
  "POCHE.URO": ["Poche urostomie", "Poche Bricker", "Poche urostomie bi-bloc"],
  
  // SONDES
  "SONDE.SIP": ["Sonde SIP", "Sonde auto-sondage", "Sonde SIP hydrophile", "SIP"],
  
  // AUDIO-PROTHÈSES
  "AUDIO.ITE": ["ITE", "Intra-auriculaire", "Prothèse intra-auriculaire"],
  "AUDIO.BTE": ["BTE", "Contour d'oreille", "Behind The Ear"],
  "AUDIO.RIC": ["RIC", "Receiver In Canal", "Micro-contour", "Écouteur déporté"],
  "AUDIO.CROS": ["CROS", "BiCROS", "Système CROS", "Cophose unilatérale"],
  "IMPLANT.COCHL.EXT": ["Processeur implant cochléaire", "Partie externe implant", "Implant externe"]
};

// Ajouter les références composées à chaque produit
let totalAdded = 0;
let updatedCount = 0;

const updated = current.map(product => {
  const refs = allComposedRefs[product.reference];
  if (refs && refs.length > 0) {
    totalAdded += refs.length;
    updatedCount++;
    return {
      ...product,
      references_composees: refs
    };
  }
  return product;
});

console.log(`✅ ${totalAdded} références composées ajoutées sur ${updatedCount} produits\n`);

// Afficher exemples détaillés
console.log('📋 EXEMPLES DE RÉFÉRENCES COMPOSÉES AJOUTÉES:\n');
const examples = [
  { ref: 'SO 01', desc: 'Semelles' },
  { ref: '701', desc: 'Chaussure orthopédique' },
  { ref: 'MILWAUKEE', desc: 'Corset' },
  { ref: 'GAM', desc: 'Grand Appareil Marche' },
  { ref: 'AUDIO.RIC', desc: 'Audio-prothèse' }
];

examples.forEach(ex => {
  const prod = updated.find(p => p.reference === ex.ref);
  if (prod && 'references_composees' in prod) {
    console.log(`   ${ex.ref} (${ex.desc}):`);
    const refs = (prod as any).references_composees;
    refs.slice(0, 5).forEach((r: string) => console.log(`      - ${r}`));
    if (refs.length > 5) console.log(`      ... et ${refs.length - 5} autres`);
    console.log('');
  }
});

// Sauvegarder
const newContent = `import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS - 100% ENRICHIE + TOUTES LES RÉFÉRENCES
// Enrichissement total: 90 produits avec descriptions + indications + critères
// Références composées COMPLÈTES: ${totalAdded} références (PI 28 SS 14A, TR 12 D 01, 701 + AS47, OI 39 C01-08, etc.)
// TOTAL: ${updated.length} produits avec toutes les variantes de recherche possibles

export const appareillageDatabase: Appareillage[] = ${JSON.stringify(updated, null, 2)};
`;

fs.writeFileSync(dbPath, newContent, 'utf-8');

console.log(`\n🎉 BASE DE DONNÉES COMPLÉTÉE !`);
console.log(`📁 Total: ${updated.length} produits`);
console.log(`🔗 Références composées: ${totalAdded} (toutes les variantes du PDF)`);
console.log(`📊 Produits avec références: ${updatedCount}/${updated.length}`);
console.log(`\n✅ Les utilisateurs peuvent maintenant rechercher par:`);
console.log(`   - PI 28 SS 14A, PI 48 SS 23A, PI 03 ZP 63D`);
console.log(`   - TR 12 D 01, TR 29 N 36, TR 39 N 51`);
console.log(`   - C114, C160`);
console.log(`   - OS 79 G01, OS 13 N01, OS 16 N02`);
console.log(`   - OI 59 N50, OI 59 C91, OI 36 N11`);
console.log(`   - OI 39 D01-08, OI 39 C01-08 (GAM)`);
console.log(`   - PSM 03, PSM 05, PSM 06`);
console.log(`   - 701 + AS47 + 709, 705 x 02 + AS47 x 02`);
console.log(`   - Sarmiento, CTM, PAM, ITE, RIC, CROS\n`);
