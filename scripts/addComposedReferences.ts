import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 AJOUT DES RÉFÉRENCES COMPOSÉES POUR TOUS LES PRODUITS\n');

// Charger base actuelle
const dbPath = path.join(__dirname, '../data/appareillage.ts');
const content = fs.readFileSync(dbPath, 'utf-8');
const match = content.match(/export const appareillageDatabase: Appareillage\[\] = (\[[\s\S]*\]);/);
const current: Appareillage[] = JSON.parse(match![1]);

console.log(`📦 Base actuelle: ${current.length} produits\n`);

// RÉFÉRENCES COMPOSÉES EXTRAITES DU PDF CNAS
const composedRefs: Record<string, string[]> = {
  // SEMELLES
  "SO 01": ["PI 28 SS 14A"],
  "SO 02": ["PI 28 SS 14B"],
  
  // CHAUSSURES + ADJONCTIONS (références complètes)
  "701": [
    "701 x 02",  // Paire standard
    "701 x 01 + AS47 + 709",  // Pied neurologique unilatéral
    "701 x 02 + AS47 x 02",  // Pied neurologique bilatéral
    "701 + AP22",  // Avec instabilité cheville
    "701 + AR31 + 709",  // Inégalité 3-6 cm
    "701 x 01 + AR31 + AR32 + 709",  // Inégalité > 6 cm
    "701 + AS50",  // Instabilité post-traumatique
    "701 x 02 + AS51 x 02",  // PBVE bilatéral
    "701 + MO91 + 01 + 709",  // Amputation Lisfranc
    "701 + AD14 + 703",  // Équinisme irréductible
    "701 + AD15 + 703",
    "701 + AD16 + 703",
    "701 x 02 + AS52 x 02"  // Pieds plats valgus avant-pied
  ],
  
  "702": [
    "702 x 02",  // Paire standard
    "702 x 01",  // Unité
    "702 x 02 + AS47 x 02"  // Avec releveur bilatéral
  ],
  
  "703": ["703 x 01", "703 x 02"],
  "704": ["704 x 01", "704 x 02"],
  "705": ["705 x 01", "705 x 02", "705 + 706"],
  "706": ["706 x 01", "706 x 02"],
  "707": ["707 x 01", "707 x 02"],
  "708": ["708 x 01", "708 x 02"],
  "709": ["709 x 01"],
  "721": ["721 x 01"],
  "722": ["722 x 01"],
  "CHAU.B.OUV": ["CHAU.B.OUV x 01", "CHAU.B.OUV x 02"],
  
  // ADJONCTIONS (références individuelles déjà dans la base)
  "01": ["01 + 701", "01 + MO91"],
  "02": ["02 + 721", "02 + 722"],
  "AD11": ["AD11 + 701", "AD11 + 702"],
  "AD12": ["AD12 + 701", "AD12 + 702"],
  "AD13": ["AD13 + 701", "AD13 + 702", "AD13 + MO91"],
  "AD14": ["AD14 + 701", "AD14 + 703"],
  "AD15": ["AD15 + 701", "AD15 + 703"],
  "AD16": ["AD16 + 701", "AD16 + 703"],
  "AP21": ["AP21 + 701", "AP21 + 702"],
  "AP22": ["AP22 + 701", "AP22 + 702"],
  "AP24": ["AP24 + 701"],
  "AP25": ["AP25 + 701"],
  "AR31": ["AR31 + 701 + 709"],
  "AR32": ["AR32 + 701 + AR31 + 709"],
  "AR33": ["AR33 + 701"],
  "AS45": ["AS45 + 701", "AS45 + 702"],
  "AS46": ["AS46 + 701", "AS46 + 702"],
  "AS47": ["AS47 + 701", "AS47 + 702", "AS47 x 02"],
  "AS49": ["AS49 + 701"],
  "AS50": ["AS50 + 701"],
  "AS51": ["AS51 + 701", "AS51 x 02"],
  "AS52": ["AS52 + 701", "AS52 x 02"],
  "AS54": ["AS54 + 701"],
  "172": ["172 + 701", "172 + 702"],
  "MO91": ["MO91 + 701", "MO91 + 01"],
  "MO92": ["MO92 + 701"],
  
  // ORTHÈSES DU CRÂNE
  "CASQUE.T1": ["TR 12 D 01"],
  "CASQUE.T2": ["TR 12 N 35"],
  "CASQUE.T3": ["TR 12 S 25"],
  
  // ORTHÈSES DU COU
  "COL.CERV.S": ["C114"],
  "COL.CERV.SR": ["C160"],
  "MINERVE.C": ["TR 23 N 35"],
  "MINERVE.CD": ["TR 25 N 36"],
  
  // CORSETS
  "MILWAUKEE": ["TR 29 N 36"],
  "LYONNAIS": ["TR 49 K 54", "CTLS"],
  "BOSTON": ["TR 49 N 50"],
  "CHENEAU": ["TR 39 N 51", "CTM"],
  "ANTI.CYPH": ["TR 39 K 50"],
  "CORSET.TLS": ["TR 59 N 50"],
  "CEINTURE.LOMB": ["TR 79 N 35"],
  "CEINTURE.ABD": ["C.ABD"],
  "CEINTURE.ABD.LOMB": ["C.ABD.LOMB"],
  "CORSET.SIEGE": ["TR 43 N 10"],
  
  // ORTHÈSES MEMBRES SUPÉRIEURS
  "OS 79 G01": ["OS 79 G01", "Attelle palmaire"],
  "OS 13 N01": ["OS 13 N01", "OS 13 N02", "Sarmiento"],
  "OS 16 N02": ["OS 16 N02", "Dujarrier"],
  
  // ORTHÈSES MEMBRES INFÉRIEURS
  "OI 36 N11": ["OI 36 N11", "Cruro-pédieuse"],
  "OI 59 C91": ["OI 59 C91", "PAM"],
  "GAM": ["Grand Appareil de Marche"],
  "ATTELLE.DB": ["Dos de botte", "Volkmann"],
  
  // FAUTEUILS ROULANTS
  "FRE": ["Fauteuil électrique", "FR électrique"],
  "VAM": ["Voiturette à moteur"],
  "FR.STANDARD": ["FR standard", "Fauteuil standard"],
  "FR.ACTIF": ["FR actif", "Fauteuil actif"],
  "FR.LARGE": ["FR large", "FR obésité"],
  "FR.GR": ["FR grand", "FR grande taille"],
  "POUSSETTE.IMC": ["Poussette IMC enfant", "Poussette spécialisée"],
  "FR.IMC": ["Fauteuil IMC", "FR posture complexe"],
  
  // AIDES À LA MARCHE
  "CANNE.SIMPLE": ["Canne simple bois", "Canne simple alu"],
  "CANNE.TRIPODE": ["Canne 3 pieds"],
  "CANNE.QUADRIPODE": ["Canne 4 pieds"],
  "CANNE.ANGLAISE": ["Béquille", "Canne anglaise"],
  "DEAMBULATEUR.FIXE": ["Cadre de marche", "Déambulateur fixe"],
  "DEAMBULATEUR.ROUES": ["Déambulateur 2 roues"],
  "ROLLATOR": ["Déambulateur 4 roues", "Rollator 4 roues"],
  
  // BANDAGES
  "BANDAGE.ING.S": ["Bandage inguinal simple", "Bandage herniaire simple"],
  "BANDAGE.ING.D": ["Bandage inguinal double", "Bandage herniaire double"],
  "BANDAGE.OMBIL": ["Bandage ombilical"],
  
  // MATELAS
  "MATELAS.ANTIESC": ["Matelas anti-escarres", "Matelas HR", "Matelas air alterné"],
  
  // STOMIES
  "POCHE.COLO": ["Poche colostomie 1 pièce", "Poche colostomie 2 pièces"],
  "POCHE.ILEO": ["Poche iléostomie vidable"],
  "POCHE.URO": ["Poche urostomie", "Poche Bricker"],
  
  // SONDES
  "SONDE.SIP": ["Sonde SIP", "Sonde auto-sondage", "Sonde SIP hydrophile"],
  
  // AUDIO-PROTHÈSES
  "AUDIO.ITE": ["ITE", "Intra-auriculaire"],
  "AUDIO.BTE": ["BTE", "Contour d'oreille"],
  "AUDIO.RIC": ["RIC", "Receiver In Canal", "Micro-contour"],
  "AUDIO.CROS": ["CROS", "BiCROS", "Système CROS"],
  "IMPLANT.COCHL.EXT": ["Processeur implant cochléaire", "Partie externe implant"]
};

// Ajouter les références composées à chaque produit
let totalAdded = 0;
const updated = current.map(product => {
  const refs = composedRefs[product.reference];
  if (refs && refs.length > 0) {
    totalAdded += refs.length;
    return {
      ...product,
      references_composees: refs
    };
  }
  return product;
});

console.log(`✅ ${totalAdded} références composées ajoutées\n`);

// Afficher exemples
console.log('📋 EXEMPLES DE RÉFÉRENCES COMPOSÉES AJOUTÉES:\n');
const examples = ['701', 'FRE', 'MILWAUKEE', 'OS 79 G01', 'AUDIO.ITE'];
examples.forEach(ref => {
  const prod = updated.find(p => p.reference === ref);
  if (prod && 'references_composees' in prod) {
    console.log(`   ${ref}:`);
    (prod as any).references_composees.forEach((r: string) => console.log(`      - ${r}`));
    console.log('');
  }
});

// Sauvegarder
const newContent = `import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS - 100% ENRICHIE + RÉFÉRENCES COMPOSÉES
// Enrichissement total: 90 produits avec descriptions + indications + critères
// Références composées: Toutes les combinaisons possibles (ex: 701 + AS47 + 709, TR 12 D 01, PI 28 SS 14A)
// TOTAL: ${updated.length} produits avec ${totalAdded} références composées

export const appareillageDatabase: Appareillage[] = ${JSON.stringify(updated, null, 2)};
`;

fs.writeFileSync(dbPath, newContent, 'utf-8');

console.log(`\n🎉 BASE DE DONNÉES MISE À JOUR !`);
console.log(`📁 Total: ${updated.length} produits`);
console.log(`🔗 Références composées: ${totalAdded}`);
console.log(`\n✅ Les utilisateurs peuvent maintenant rechercher par:`);
console.log(`   - Référence simple: 701, FRE, MILWAUKEE`);
console.log(`   - Référence composée: 701 + AS47 + 709, TR 12 D 01, PI 28 SS 14A`);
console.log(`   - Nom commercial: Sarmiento, CTM, PAM, ITE, RIC\n`);
