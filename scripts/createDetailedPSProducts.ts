import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Produits PS détaillés avec descriptions spécifiques
const psProducts = [
  {
    reference: "PS 1R01",
    nom: "Prothèse scapulo-humérale",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique",
    remboursement: "100%",
    description: "Prothèse pour désarticulation de l'épaule (scapulo-humérale). Elle est composée d'une emboîture qui vient s'adapter sur le moignon de l'épaule (point d'ancrage de la prothèse), d'un prolongement du bras, d'une articulation du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique.",
    indications: [
      "Désarticulation de l'épaule (scapulo-humérale) congénitale ou traumatique",
      "Amputation au niveau de l'articulation scapulo-humérale",
      "Agénésie congénitale du membre supérieur au niveau de l'épaule"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à l'amputation",
      "La prothèse doit être bien maintenue sur le moignon",
      "Absence de douleur lors du port de la prothèse",
      "Vérifier la mobilité de l'articulation du coude",
      "Vérifier l'aspect esthétique du gant en silicone ou PVC"
    ],
    composants: [
      "Emboîture adaptée sur le moignon de l'épaule",
      "Prolongement du bras",
      "Articulation du coude à verrouillage actif",
      "Prolongement de l'avant-bras",
      "Main prothétique non fonctionnelle",
      "Gant esthétique en silicone ou PVC"
    ],
    references_composees: ["PS 1R01", "PS1R01", "PS 1 R01", "PS1 R01"]
  },
  {
    reference: "PS 2R01",
    nom: "Prothèse de bras (résine)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Résine",
    remboursement: "100%",
    description: "Prothèse pour amputation du bras. Elle est composée d'une emboîture qui vient s'adapter sur le moignon du bras (point d'ancrage de la prothèse), d'un prolongement du bras, d'une articulation du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique. Fabrication en résine.",
    indications: [
      "Amputation traumatique ou médicale du bras",
      "Agénésie du bras",
      "Amputation 1/3 supérieur huméral",
      "Amputation au niveau du bras nécessitant une prothèse esthétique"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à l'amputation",
      "Emboîture de contact bien ajustée sur le moignon",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier le fonctionnement du coude à verrouillage actif",
      "Vérifier l'aspect esthétique du gant",
      "Contrôler la qualité de fabrication en résine"
    ],
    composants: [
      "Emboîture de contact en résine adaptée sur le moignon du bras",
      "Prolongement du bras",
      "Coude à verrouillage actif",
      "Prolongement de l'avant-bras",
      "Main non fonctionnelle",
      "Gant esthétique en silicone ou PVC"
    ],
    references_composees: ["PS 2R01", "PS2R01", "PS 2 R01", "PS2 R01"]
  },
  {
    reference: "PS 3R01",
    nom: "Prothèse de bras courte (résine)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Résine",
    remboursement: "100%",
    description: "Prothèse pour amputation du bras (moignon court). Elle est composée d'une emboîture qui vient s'adapter sur le moignon court du bras, d'un prolongement du bras, d'une articulation du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique. Adaptée aux moignons courts.",
    indications: [
      "Amputation du bras avec moignon court",
      "Amputation traumatique ou médicale du bras (1/3 supérieur huméral)",
      "Agénésie du bras avec moignon court",
      "Nécessité d'une prothèse adaptée à un moignon de longueur réduite"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à l'amputation et à la longueur du moignon",
      "Emboîture bien ajustée sur le moignon court",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la stabilité de la prothèse malgré le moignon court",
      "Contrôler le fonctionnement du coude",
      "Vérifier l'aspect esthétique"
    ],
    composants: [
      "Emboîture de contact adaptée au moignon court",
      "Prolongement du bras",
      "Articulation du coude",
      "Prolongement de l'avant-bras",
      "Main prothétique",
      "Gant esthétique"
    ],
    references_composees: ["PS 3R01", "PS3R01", "PS 3 R01", "PS3 R01"]
  },
  {
    reference: "PS 3S10",
    nom: "Prothèse de bras courte (silicone)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Silicone",
    remboursement: "100%",
    description: "Prothèse pour amputation du bras (moignon court) en silicone. Version améliorée avec fabrication en silicone offrant un meilleur confort et un aspect esthétique supérieur. Composée d'une emboîture, d'un prolongement du bras, d'une articulation du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique.",
    indications: [
      "Amputation du bras avec moignon court nécessitant un confort supérieur",
      "Amputation traumatique ou médicale du bras",
      "Agénésie du bras avec moignon court",
      "Patients nécessitant une prothèse plus esthétique et confortable"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse en silicone à l'amputation",
      "Emboîture en silicone bien ajustée sans irritation cutanée",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la qualité du silicone (souplesse, aspect naturel)",
      "Contrôler le fonctionnement du coude",
      "Vérifier l'aspect esthétique supérieur du silicone"
    ],
    composants: [
      "Emboîture de contact en silicone adaptée au moignon court",
      "Prolongement du bras en silicone",
      "Articulation du coude",
      "Prolongement de l'avant-bras",
      "Main prothétique",
      "Gant esthétique en silicone haute qualité"
    ],
    references_composees: ["PS 3S10", "PS3S10", "PS 3 S10", "PS3 S10"]
  },
  {
    reference: "PS 5R01",
    nom: "Prothèse du coude (résine)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Résine",
    remboursement: "100%",
    description: "Prothèse pour désarticulation du coude. Elle est composée d'une emboîture qui vient s'adapter sur le moignon du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique. Fabrication en résine.",
    indications: [
      "Désarticulation du coude congénitale ou traumatique",
      "Amputation au niveau de l'articulation du coude",
      "Agénésie congénitale au niveau du coude"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à la désarticulation du coude",
      "Emboîture bien ajustée sur le moignon du coude",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la stabilité de la prothèse",
      "Contrôler l'aspect esthétique",
      "Vérifier la qualité de fabrication en résine"
    ],
    composants: [
      "Emboîture adaptée sur le moignon du coude",
      "Prolongement de l'avant-bras",
      "Main prothétique non fonctionnelle",
      "Gant esthétique en silicone ou PVC"
    ],
    references_composees: ["PS 5R01", "PS5R01", "PS 5 R01", "PS5 R01"]
  },
  {
    reference: "PS 5S10",
    nom: "Prothèse du coude (silicone)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Silicone",
    remboursement: "100%",
    description: "Prothèse pour désarticulation du coude en silicone. Version améliorée offrant un meilleur confort et un aspect esthétique supérieur. Composée d'une emboîture qui vient s'adapter sur le moignon du coude, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique en silicone.",
    indications: [
      "Désarticulation du coude nécessitant un confort supérieur",
      "Amputation au niveau du coude",
      "Patients nécessitant une prothèse plus esthétique",
      "Agénésie congénitale au niveau du coude"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse en silicone",
      "Emboîture en silicone bien ajustée sans irritation",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la qualité du silicone (souplesse, aspect naturel)",
      "Contrôler l'aspect esthétique supérieur",
      "Vérifier le confort du patient"
    ],
    composants: [
      "Emboîture en silicone adaptée sur le moignon du coude",
      "Prolongement de l'avant-bras en silicone",
      "Main prothétique",
      "Gant esthétique en silicone haute qualité"
    ],
    references_composees: ["PS 5S10", "PS5S10", "PS 5 S10", "PS5 S10"]
  },
  {
    reference: "PS 6R01",
    nom: "Prothèse de l'avant-bras (résine)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse de vie sociale - Résine",
    remboursement: "100%",
    description: "Prothèse de vie sociale pour amputation de l'avant-bras. Elle est composée d'une emboîture qui vient s'adapter sur le moignon de l'avant-bras, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique. Fabrication en résine.",
    indications: [
      "Amputation de l'avant-bras traumatique ou médicale",
      "Agénésie de l'avant-bras",
      "Amputation 1/3 supérieur de l'avant-bras",
      "Nécessité d'une prothèse de vie sociale pour activités quotidiennes"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à l'amputation de l'avant-bras",
      "Emboîture bien ajustée sur le moignon",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la stabilité lors des mouvements du poignet",
      "Contrôler l'aspect esthétique",
      "Vérifier la qualité de fabrication en résine"
    ],
    composants: [
      "Emboîture adaptée sur le moignon de l'avant-bras",
      "Prolongement de l'avant-bras",
      "Main prothétique non fonctionnelle",
      "Gant esthétique en silicone ou PVC"
    ],
    references_composees: ["PS 6R01", "PS6R01", "PS 6 R01", "PS6 R01"]
  },
  {
    reference: "PS 6S01",
    nom: "Prothèse de l'avant-bras (silicone)",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse de vie sociale - Silicone",
    remboursement: "100%",
    description: "Prothèse de vie sociale pour amputation de l'avant-bras en silicone. Version améliorée offrant un meilleur confort et aspect esthétique supérieur. Composée d'une emboîture, d'un prolongement de l'avant-bras, d'une main prothétique et d'un gant esthétique en silicone.",
    indications: [
      "Amputation de l'avant-bras nécessitant un confort supérieur",
      "Agénésie de l'avant-bras",
      "Patients nécessitant une prothèse plus esthétique",
      "Activités sociales et professionnelles nécessitant un aspect naturel"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse en silicone",
      "Emboîture en silicone bien ajustée sans irritation cutanée",
      "La prothèse doit être maintenue et non douloureuse",
      "Vérifier la qualité du silicone (souplesse, aspect naturel)",
      "Contrôler l'aspect esthétique supérieur",
      "Vérifier le confort lors des activités quotidiennes"
    ],
    composants: [
      "Emboîture en silicone adaptée sur le moignon de l'avant-bras",
      "Prolongement de l'avant-bras en silicone",
      "Main prothétique",
      "Gant esthétique en silicone haute qualité"
    ],
    references_composees: ["PS 6S01", "PS6S01", "PS 6 S01", "PS6 S01"]
  },
  {
    reference: "PS 7R01",
    nom: "Prothèse de main",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique",
    remboursement: "100%",
    description: "Prothèse pour désarticulation carpienne (au niveau du poignet). Elle est composée d'une main prothétique et d'un gant esthétique. Prothèse esthétique destinée à remplacer la main manquante.",
    indications: [
      "Désarticulation carpienne (poignet)",
      "Amputation au niveau du poignet",
      "Agénésie de la main",
      "Désarticulation du poignet traumatique ou congénitale"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à la désarticulation carpienne",
      "La prothèse doit être bien maintenue sur le moignon",
      "Absence de douleur lors du port",
      "Vérifier l'aspect esthétique de la main prothétique",
      "Contrôler la qualité du gant esthétique",
      "Vérifier la correspondance de la taille et de la couleur avec la main controlatérale"
    ],
    composants: [
      "Main prothétique non fonctionnelle",
      "Gant esthétique en silicone ou PVC",
      "Système de fixation sur le moignon du poignet"
    ],
    references_composees: ["PS 7R01", "PS7R01", "PS 7 R01", "PS7 R01"]
  },
  {
    reference: "PS 9S02",
    nom: "Prothèse des doigts",
    categorie: "Prothèses membres supérieurs",
    type: "Prothèse esthétique - Silicone",
    remboursement: "100%",
    description: "Prothèse esthétique pour amputation ou agénésie d'un ou plusieurs doigts. Elle est composée d'un ou de plusieurs doigts prothétiques en silicone. Permet de restaurer l'aspect esthétique de la main et une fonction partielle.",
    indications: [
      "Amputation d'un ou plusieurs doigts",
      "Agénésie congénitale d'un ou plusieurs doigts",
      "Amputation traumatique ou médicale des doigts",
      "Désarticulation métacarpo-phalangienne",
      "Amputation inter-phalangienne"
    ],
    criteres_conformite: [
      "Vérifier l'adaptation de la prothèse à l'amputation des doigts",
      "La prothèse doit être bien maintenue",
      "Absence de douleur lors du port",
      "Vérifier l'aspect esthétique des doigts prothétiques",
      "Contrôler la qualité du silicone",
      "Vérifier la correspondance de la taille et de la couleur",
      "Vérifier le nombre de doigts prothétiques correspondant à la prescription"
    ],
    composants: [
      "Un ou plusieurs doigts prothétiques en silicone",
      "Système de fixation adapté",
      "Finition esthétique (ongles, plis, couleur de peau)"
    ],
    references_composees: ["PS 9S02", "PS9S02", "PS 9 S02", "PS9 S02"]
  }
];

// Lire le fichier appareillage.ts existant
const filePath = join(process.cwd(), 'data', 'appareillage.ts');
let content = readFileSync(filePath, 'utf-8');

// Trouver et supprimer l'ancien produit PROTH.MS
const prothMSStart = content.indexOf('"reference": "PROTH.MS"');
if (prothMSStart !== -1) {
  // Trouver le début de l'objet (chercher le { avant)
  let objectStart = content.lastIndexOf('{', prothMSStart);
  // Trouver la fin de l'objet (chercher le },\n ou }\n)
  let objectEnd = content.indexOf('\n  },', prothMSStart);
  if (objectEnd === -1) {
    objectEnd = content.indexOf('\n  }', prothMSStart);
  }
  
  if (objectStart !== -1 && objectEnd !== -1) {
    // Supprimer l'ancien produit PROTH.MS
    content = content.substring(0, objectStart) + content.substring(objectEnd + 5);
    console.log('✅ Ancien produit PROTH.MS supprimé');
  }
}

// Ajouter les nouveaux produits PS
const insertPosition = content.lastIndexOf(']');
const psProductsJson = psProducts.map(p => {
  const product: any = {
    reference: p.reference,
    nom: p.nom,
    categorie: p.categorie,
    type: p.type,
    remboursement: p.remboursement,
    description: p.description,
    indications: p.indications,
    criteres_conformite: p.criteres_conformite,
    references_composees: p.references_composees
  };
  
  if (p.composants) {
    product.composants = p.composants;
  }
  
  return '  ' + JSON.stringify(product, null, 2).split('\n').join('\n  ');
}).join(',\n');

content = content.substring(0, insertPosition) + 
  ',\n' + psProductsJson + '\n' + 
  content.substring(insertPosition);

// Écrire le fichier
writeFileSync(filePath, content, 'utf-8');

console.log(`\n✅ ${psProducts.length} produits PS créés avec succès !`);
console.log('\nProduits ajoutés :');
psProducts.forEach(p => {
  console.log(`  - ${p.reference}: ${p.nom}`);
});
