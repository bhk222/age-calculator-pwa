import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 AJOUT DU PRODUIT PROTHÈSES MEMBRES SUPÉRIEURS AVEC TOUTES LES RÉFÉRENCES PS\n');

// Charger la base de données
const dbPath = path.join(__dirname, '../data/appareillage.ts');
let content = fs.readFileSync(dbPath, 'utf-8');

const exportMatch = content.match(/export const appareillageDatabase.*=\s*/);
const beforeExport = exportMatch ? content.substring(0, exportMatch.index! + exportMatch[0].length) : '';
const jsonStart = content.indexOf('[', beforeExport.length);
const jsonEnd = content.lastIndexOf(']') + 1;
const jsonContent = content.substring(jsonStart, jsonEnd);
const database: Appareillage[] = JSON.parse(jsonContent);

console.log(`📦 Base actuelle: ${database.length} produits\n`);

// Nouveau produit Prothèses Membres Supérieurs
const nouveauProduit: Appareillage = {
  reference: "PROTH.MS",
  nom: "Prothèse membre supérieur",
  categorie: "Prothèses membres supérieurs",
  description: "Prothèses esthétiques pour membres supérieurs : épaule, bras, coude, avant-bras, main et doigts. Comprend emboîture de contact, segments prothétiques et main prothétique avec gant esthétique. Références CNAS PS 1R01 à PS 9S02 selon niveau d'amputation et matériau.",
  indications: [
    "Amputation traumatique ou médicale membre supérieur",
    "Désarticulation scapulo-humérale (épaule)",
    "Amputation du bras",
    "Désarticulation du coude",
    "Amputation de l'avant-bras",
    "Désarticulation carpienne (poignet)",
    "Amputation ou agénésie doigts",
    "Agénésie congénitale membre supérieur"
  ],
  criteres_conformite: [
    "Emboîture parfaitement adaptée au moignon sans conflit cutané",
    "Longueur prothétique égale au membre controlatéral",
    "Alignement correct des segments prothétiques",
    "Main prothétique anatomiquement positionnée",
    "Gant esthétique correspondant à carnation du patient",
    "Système de fixation confortable et stable",
    "Poids prothétique proportionné et supportable",
    "Finition esthétique satisfaisante pour patient"
  ],
  references_composees: [
    // Prothèse épaule (PS 1)
    "PS 1R01", "PS1R01", "PS 1 R01", "PS1 R01",
    
    // Prothèses bras (PS 2-3)
    "PS 2R01", "PS2R01", "PS 2 R01", "PS2 R01",
    "PS 3R01", "PS3R01", "PS 3 R01", "PS3 R01",
    "PS 3S10", "PS3S10", "PS 3 S10", "PS3 S10",
    
    // Prothèses coude (PS 5)
    "PS 5R01", "PS5R01", "PS 5 R01", "PS5 R01",
    "PS 5S10", "PS5S10", "PS 5 S10", "PS5 S10",
    
    // Prothèses avant-bras (PS 6) ⭐ CELLES-CI MANQUAIENT
    "PS 6R01", "PS6R01", "PS 6 R01", "PS6 R01",
    "PS 6S01", "PS6S01", "PS 6 S01", "PS6 S01",
    
    // Prothèses main (PS 7)
    "PS 7R01", "PS7R01", "PS 7 R01", "PS7 R01",
    
    // Prothèses doigts (PS 9)
    "PS 9S02", "PS9S02", "PS 9 S02", "PS9 S02",
    
    // Noms descriptifs
    "Prothèse membre supérieur",
    "Prothèse scapulo-humérale",
    "Prothèse épaule",
    "Prothèse bras",
    "Prothèse coude",
    "Prothèse avant-bras",
    "Prothèse main",
    "Prothèse doigts",
    "Prothèse esthétique membre supérieur"
  ],
  remboursement: "100%",
  type: "Grand appareillage"
};

// Ajouter le nouveau produit
database.push(nouveauProduit);

// Sauvegarder
const updatedContent = beforeExport + JSON.stringify(database, null, 2) + ';\n';
fs.writeFileSync(dbPath, updatedContent, 'utf-8');

console.log('✅ NOUVEAU PRODUIT AJOUTÉ !\n');
console.log(`📦 Référence: ${nouveauProduit.reference}`);
console.log(`📛 Nom: ${nouveauProduit.nom}`);
console.log(`🔗 Références composées: ${nouveauProduit.references_composees.length}`);
console.log(`\n📋 RÉFÉRENCES PS AJOUTÉES (TOUTES):`);
console.log(`   • PS 1R01 (Prothèse scapulo-humérale)`);
console.log(`   • PS 2R01, PS 3R01, PS 3S10 (Prothèses bras)`);
console.log(`   • PS 5R01, PS 5S10 (Prothèses coude)`);
console.log(`   • PS 6R01, PS 6S01 (Prothèses avant-bras) ⭐`);
console.log(`   • PS 7R01 (Prothèse main)`);
console.log(`   • PS 9S02 (Prothèse doigts)`);
console.log(`\n🎉 Total produits: ${database.length}`);
console.log(`\n🔍 RECHERCHE "PS 6R01" MAINTENANT POSSIBLE !`);
