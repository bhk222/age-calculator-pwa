import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ENRICHISSEMENT DES ORTHÈSES (23 produits)\n');

const ortheses: Appareillage[] = [];

// CRÂNE (3)
ortheses.push({
  reference: "CASQUE.T1",
  nom: "Casque de protection Type 1 (TR 12 D/N)",
  categorie: "Orthèses du crâne",
  description: "Casque en alliage léger (duralumin) ou polyéthylène avec capitonnage intérieur en matière cellulaire et garnissage cuir. Protection légère du crâne au quotidien.",
  indications: [
    "Épilepsie grave avec chutes multiples chez l'enfant ou l'adulte",
    "Infirmité Motrice Cérébrale (IMC) avec troubles du comportement",
    "Autisme avec troubles comportementaux et risque de chutes",
    "Protection quotidienne du crâne fragile",
    "Prévention traumatismes crâniens répétés"
  ],
  criteres_conformite: [
    "Matériau: alliage léger (duralumin) OU polyéthylène haute densité",
    "Capitonnage intérieur en mousse cellulaire absorbante",
    "Garnissage cuir confortable et hypoallergénique",
    "Doit couvrir entièrement la tête jusqu'au front",
    "Libération des deux oreilles pour audition",
    "Épouse bien la forme du crâne",
    "Sangles de fixation sous-mentonnières ajustables",
    "Léger et bien aéré",
    "Lavable ou avec housse amovible lavable"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

ortheses.push({
  reference: "CASQUE.T2",
  nom: "Casque de protection Type 2 (TR 12 N 35)",
  categorie: "Orthèses du crâne",
  description: "Casque en polyéthylène avec capitonnage intérieur en matière cellulaire et garnissage cuir. Protection du crâne post-chirurgicale (trépanation, ostéotomie).",
  indications: [
    "Trépanation (crâne opéré)",
    "Ostéotomie partielle du crâne",
    "Protection post-chirurgie crânienne",
    "Brèche osseuse importante nécessitant protection",
    "Cranioplastie en attente",
    "Perte de substance osseuse crânienne"
  ],
  criteres_conformite: [
    "Polyéthylène résistant aux chocs",
    "Capitonnage mousse cellulaire protection zones sensibles",
    "Garnissage peau hypoallergénique",
    "Couvre zone opérée sans compression excessive",
    "Aération zones non à risque",
    "Ajustable selon cicatrisation",
    "Durée de port: selon consolidation osseuse (avis chirurgien)",
    "Contrôles réguliers adaptation"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

ortheses.push({
  reference: "CASQUE.T3",
  nom: "Casque de protection Type 3 (TR 12 S 25)",
  categorie: "Orthèses du crâne",
  description: "Casque en résine polyester stratifiée avec capitonnage intérieur et garnissage cuir avec fixation selon nécessité. Protection maximale crâne découvert post-chirurgie. Peu fréquent et difficile à réaliser.",
  indications: [
    "Trépanation majeure extensive",
    "Ostéotomie importante du crâne",
    "Crâne découvert après chirurgie lourde",
    "Protection maximale nécessaire",
    "Brèche osseuse étendue avec pulsations duremériennes",
    "Situations exceptionnelles haute protection"
  ],
  criteres_conformite: [
    "Résine polyester stratifiée haute résistance",
    "Capitonnage mousse épaisse zones appui",
    "Garnissage cuir confortable",
    "Moulage sur mesure précis du crâne",
    "Fixation sécurisée adaptée (sangles ou autres)",
    "Protection complète zone à risque",
    "Fabrication complexe nécessitant expertise",
    "Révisions fréquentes selon évolution",
    "Durée port prolongée possible"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

// COU (4)
ortheses.push({
  reference: "COL.CERV.S",
  nom: "Collier cervical souple (C114)",
  categorie: "Orthèses du cou",
  description: "Collier réalisé sur mesure en mousse avec appui sous-mentonnier en avant et occipital en arrière. Fermeture postérieure en velcro. Fonction antalgique et mise au repos musculaire.",
  indications: [
    "Cervicarthrose légère",
    "Torticolis musculaire",
    "Névralgies cervico-brachiales modérées",
    "Entorses bénignes du rachis cervical",
    "Lésions musculaires du cou",
    "Mise au repos des muscles cervicaux"
  ],
  criteres_conformite: [
    "Mousse confortable épaisseur 3-5 cm",
    "Appui sous-mentonnier anatomique",
    "Appui occipital bien réparti",
    "Fermeture velcro postérieure ajustable",
    "Hauteur: maintien tête en position droite",
    "Limite mouvements flexion/rotation sans bloquer totalement",
    "Fonction antalgique (soulagement douleurs)",
    "Respirant et lavable",
    "Enveloppement 2-3 cm zone fermeture"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

ortheses.push({
  reference: "COL.CERV.SR",
  nom: "Collier cervical rigide (C160)",
  categorie: "Orthèses du cou",
  description: "Collier réalisé sur mesure en polypropylène 1-2mm avec appui sous-mentonnier en avant et occipital en arrière. Fermeture postérieure velcro. Soutien prolongé avec plaque semi-rigide correctrice limitant rotations et étirements.",
  indications: [
    "Cervicarthrose étagée importante",
    "Torticolis musculaire douloureux sévère",
    "Névralgies cervico-brachiales importantes sévères",
    "Hernies discales cervicales",
    "Lésions rhumatismales importantes du rachis cervical",
    "Nécessité maintien rigoureux position cervicale"
  ],
  criteres_conformite: [
    "Polypropylène 1-2mm d'épaisseur rigide",
    "Plaque semi-rigide interne fonction correctrice posture nuque",
    "Appuis sous-mentonnier + occipital renforcés",
    "Maintien tête en position droite (rectitude cervicale)",
    "Limite davantage mouvements rotation + étirement",
    "Fermeture postérieure sécurisée velcro",
    "Port prolongé confortable malgré rigidité",
    "Enveloppement 2-3 cm"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

ortheses.push({
  reference: "MINERVE.C",
  nom: "Minerve courte (TR 23 N 35)",
  categorie: "Orthèses du cou",
  description: "Minerve réalisée sur mesure: valve postérieure couvrant omoplates remontant sur occiput + valve antérieure avec appui sous-mentonnier et thoracique en polyéthylène. Fermeture latérale velcro. Immobilisation rigoureuse du rachis cervical.",
  indications: [
    "Fractures du rachis cervical nécessitant contention rigoureuse",
    "Hernies discales cervicales hyperalgiques",
    "Lésions rhumatismales très importantes et hyperalgiques",
    "Post-opératoire chirurgie cervicale",
    "Instabilité cervicale sévère",
    "Traumatismes cervicaux graves"
  ],
  criteres_conformite: [
    "Polyéthylène rigide",
    "Valve postérieure: couvre épines omoplates + remonte sur occiput",
    "Valve antérieure: appui thoracique + sous-mentonnier",
    "Appuis sous-mentonnier en avant + occipital en arrière précis",
    "Fermeture latérale en velcro",
    "Immobilisation quasi-totale du rachis cervical",
    "Arrive au niveau du menton",
    "Aération suffisante zones d'appui",
    "Port jour + nuit selon prescription",
    "Maintien tête droite limitant flexion/rotation"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

ortheses.push({
  reference: "MINERVE.CD",
  nom: "Minerve cervico-dorsale (TR 25 N 36)",
  categorie: "Orthèses du cou",
  description: "Minerve destinée à immobiliser le rachis cervico-dorsal. Valve postérieure prenant appui sur cage thoracique supérieure remontant sur épaules et occiput + valve antérieure avec appui thoracique et sous-mentonnier. Fixation velcro.",
  indications: [
    "Lésions rachis cervico-dorsal d'origine rhumatismale",
    "Lésions rachis cervico-dorsal d'origine traumatique",
    "Lésions rachis cervico-dorsal d'origine neuromusculaire: torticolis congénital",
    "Lésions rachis cervico-dorsal d'origine infectieuse",
    "Post-opératoire fracture du rachis cervico-dorsal",
    "Post-opératoire hernie discale cervicale hyperalgique",
    "Prévention déformations évolutives rachis cervico-dorsal"
  ],
  criteres_conformite: [
    "Polyéthylène rigide",
    "Valve postérieure: appui cage thoracique supérieure + épaules + sous-occipitaux + occiput",
    "Valve antérieure: appui thoracique + sous-mentonnier",
    "Fixation en mode attache velcro",
    "Immobilisation cervicale totale",
    "Arrive au niveau du menton en antérieur",
    "Se pose sur manubrium sternal en antérieur",
    "Postérieur: os occipitaux + rachis dorsal haut",
    "Port jour et nuit selon pathologie",
    "Ajustements réguliers"
  ],
  remboursement: "80%",
  type: "Petit appareillage"
});

// CORSETS (9)
const corsets = [
  { ref: "MILWAUKEE", nom: "Corset de Milwaukee (TR 29 N 36)", desc: "Corset actif auto-élongation: coque pelvienne moulée + collier occipito-mentonnier + 3 montants verticaux extensibles + pelotes dérotation.", ind: ["Scoliose cervico-dorsale enfant pré-pubertaire","Scoliose dorsale Cobb < 50°","Scoliose dorso-lombaire Cobb < 50°","Cypho-scoliose"], crit: ["Coque pelvienne moulée polyéthylène","Collier sous-occipito-mentonnier avec appui hyoïdien + 2 appuis occipitaux","3 montants verticaux extensibles","Pelotes dérotation amarrées","Port 23h/24h","Kiné + radio 3 mois"] },
  { ref: "LYONNAIS", nom: "Corset Lyonnais (TR 49 K 54)", desc: "Corset passif maintien post-plâtre: 2 hémi-pelviennes + 2 béquillons + mâts avec charnières + pelotes L amovibles.", ind: ["Scolioses idiopathiques dorso-lombaires 30-50° adolescents post-pubertaires","Maintien post-plâtre"], crit: ["2 hémi-pelviennes + 2 béquillons","Charnières ouverture/fermeture","Pelotes L amovibles","Pléxidur ou polyéthylène","Port 23h/24h"] },
  { ref: "BOSTON", nom: "Corset Boston (TR 49 N 50)", desc: "Corset actif mono-valve ouverture postérieure + pelotes dérotation. Module préfabriqué OU moulage.", ind: ["Scoliose lombaire souple adolescent","Scoliose thoraco-lombaire sommet D10 Cobb < 45°","Hyperlordoses"], crit: ["Mono-valve polyéthylène","Ouverture postérieure","Pelotes dérotation","Port 23h/24h"] },
  { ref: "CHENEAU", nom: "Corset Chêneau/CTM (TR 39 N 51)", desc: "Corset actif 3D: mono-valve ouverture antérieure + appuis correcteurs + fenêtres expansion. Moulage plâtré ou CFAO.", ind: ["Scoliose dorsale Cobb < 50° pré-pubertaire","Scoliose dorso-lombaire Cobb < 50°","Scoliose double courbure"], crit: ["Mono-valve polyéthylène ouverture antérieure","Appuis + fenêtres expansion","Moulage plâtré OU CFAO","Port 23h/24h"] },
  { ref: "ANTI.CYPH", nom: "Corset anti-cyphose (TR 39 K 50)", desc: "Corset actif correction sagittale. Mono/bivalve. Appui sternal + abdominal + contre-appui sous cyphose.", ind: ["Hyper-cyphose adolescent longiligne","Maladie de Scheuermann","Cyphose dorsale 40-50°"], crit: ["Pléxidur mono/bivalve","Appuis correcteurs","Moulage","Port 23h/24h"] },
  { ref: "CORSET.TLS", nom: "Corset maintien thoraco-lombaire (TR 59 N 50)", desc: "Coque polyéthylène mono-valve sans armature. Maintien + soulagement.", ind: ["Traumatisme dorso-lombaire","Discopathie, hernie discale","Spondylodiscite","IMC: lutte effondrement tronc"], crit: ["Polyéthylène mono-valve","Sans armature","Moulage","Confort"] },
  { ref: "CEINTURE.LOMB", nom: "Corselet maintien lombaire (TR 79 N 35)", desc: "Coque polyéthylène mono-valve lombaire. Avec GAM (Phelps) pour diplégie.", ind: ["Traumatisme lombaire","Discopathie lombaire","Diplégie (avec GAM)"], crit: ["Polyéthylène","Niveau lombaire","Compatible GAM"] },
  { ref: "CEINTURE.ABD", nom: "Ceinture abdominale", desc: "Ceinture élastique soutien abdominal + renfort lombaire.", ind: ["Lombalgies","Soutien post-partum","Hypotonie abdominale"], crit: ["Élastique résistant","Renfort lombaire","Hauteur 20-25 cm"] },
  { ref: "CEINTURE.ABD.LOMB", nom: "Ceinture lombo-abdominale", desc: "Ceinture élastique avec baleines rigides + compression abdominale.", ind: ["Lombalgies chroniques","Lombo-sciatiques","Instabilité lombaire"], crit: ["Baleines rigides","Élastique résistant","Hauteur 25-30 cm"] }
];
corsets.forEach(c => ortheses.push({
  reference: c.ref, nom: c.nom, categorie: "Orthèses du tronc - Corsets",
  description: c.desc, indications: c.ind, criteres_conformite: c.crit,
  remboursement: "80%", type: "Petit appareillage"
}));

// MEMBRES (7)
const membres = [
  { ref: "OS 79 G01", nom: "Orthèse Main-Poignet de repos", cat: "Orthèses membres supérieurs", desc: "Orthèse thermoformée immobilisant main + poignet position fonctionnelle.", ind: ["Syndrome canal carpien","Tendinites poignet","Polyarthrite rhumatoïde main","Post-traumatique"], crit: ["Thermoformage sur mesure","Position fonctionnelle: poignet 20° extension","Sangles velcro","Port nocturne"] },
  { ref: "OS 13 N01", nom: "Orthèse Coude articulée", cat: "Orthèses membres supérieurs", desc: "Orthèse articulée coude avec articulation réglable limitant flexion/extension.", ind: ["Entorse coude","Luxation coude","Raideur coude","Instabilité coude"], crit: ["Articulation réglable","Coques antérieure + postérieure","Sangles bras + avant-bras","Léger"] },
  { ref: "OS 16 N02", nom: "Orthèse Épaule (bande Dujarrier)", cat: "Orthèses membres supérieurs", desc: "Orthèse maintenant épaule + bras position repos. Immobilisation coude au corps.", ind: ["Luxation épaule","Entorse acromio-claviculaire","Tendinite coiffe rotateurs","Post-opératoire épaule"], crit: ["Bandage en 8 ou écharpe","Maintien coude fléchi","Sangle thoracique","Confortable"] },
  { ref: "OI 36 N11", nom: "Attelle cruro-pédieuse", cat: "Orthèses membres inférieurs", desc: "Orthèse mollet + pied avec articulation cheville. Releveur pour steppage.", ind: ["Pied tombant (steppage)","Paralysie sciatique poplité externe","Hémiplégie avec pied tombant"], crit: ["Tuteurs latéraux","Articulation cheville anti-équin","Emboîture jambière","Léger < 500g"] },
  { ref: "OI 59 C91", nom: "Orthèse genou articulée", cat: "Orthèses membres inférieurs", desc: "Orthèse genou avec articulations latérales + coques. Stabilisation + contrôle amplitude.", ind: ["Entorse ligamentaire genou","Post-opératoire ligamentoplastie","Instabilité genou","Gonarthrose"], crit: ["Articulations polycentriques","Coques antérieure + postérieure","Sangles cuisse + jambe","Réglage amplitude"] },
  { ref: "GAM", nom: "Grand Appareil de Marche", cat: "Orthèses membres inférieurs", desc: "Orthèse bilatérale lourde: tuteurs pied-bassin + ceinture pelvienne. Verticalisation diplégie.", ind: ["Diplégie spastique sévère","IMC bilatérale membres inférieurs","Myéloméningocèle","Verticalisation enfants"], crit: ["Tuteurs bilatéraux pied-bassin","Ceinture pelvienne","Articulations cheville + genou + hanche","Moulages précis"] },
  { ref: "ATTELLE.DB", nom: "Attelle de Volkmann (dos de botte)", cat: "Orthèses membres inférieurs", desc: "Attelle postérieure mollet + pied type gouttière. Immobilisation cheville position neutre.", ind: ["Entorse cheville sévère","Fracture malléoles","Tendinite Achille","Post-plâtre"], crit: ["Gouttière postérieure rigide","Position neutre 90°","Rembourrage mousse","Sangles velcro"] }
];
membres.forEach(m => ortheses.push({
  reference: m.ref, nom: m.nom, categorie: m.cat,
  description: m.desc, indications: m.ind, criteres_conformite: m.crit,
  remboursement: "80%", type: "Petit appareillage"
}));

console.log(`✅ ${ortheses.length} orthèses enrichies !\n`);

// Charger base actuelle
const dbPath = path.join(__dirname, '../data/appareillage.ts');
const content = fs.readFileSync(dbPath, 'utf-8');
const match = content.match(/export const appareillageDatabase: Appareillage\[\] = (\[[\s\S]*\]);/);
const current: Appareillage[] = JSON.parse(match![1]);

// Retirer anciennes orthèses
const nonOrtheses = current.filter(p => 
  !['Orthèses du crâne','Orthèses du cou','Orthèses du tronc - Corsets',
    'Orthèses membres supérieurs','Orthèses membres inférieurs'].includes(p.categorie)
);

const all = [...nonOrtheses, ...ortheses];

// Sauvegarder
const newContent = `import { Appareillage } from '../types';

// Base de données COMPLÈTE appareillage CNAS
// Enrichissement: Semelles (2) + Chaussures (11) + Adjonctions (26) + Orthèses (23) = 62 produits enrichis
// TOTAL: ${all.length} produits

export const appareillageDatabase: Appareillage[] = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(dbPath, newContent, 'utf-8');

console.log(`📁 Base mise à jour: ${all.length} produits`);
console.log(`📊 Progression: 62/88 = 70%`);
console.log(`\n🎉 Prochaine étape: Aides marche + Fauteuils + Autres (26 produits)\n`);
