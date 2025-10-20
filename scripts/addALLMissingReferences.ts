import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Appareillage } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 AJOUT DE TOUTES LES RÉFÉRENCES MANQUANTES - VERSION COMPLÈTE\n');

// Charger la base de données actuelle
const dbPath = path.join(__dirname, '../data/appareillage.ts');
let content = fs.readFileSync(dbPath, 'utf-8');

// Extraire le tableau JSON
const exportMatch = content.match(/export const appareillageDatabase.*=\s*/);
const beforeExport = exportMatch ? content.substring(0, exportMatch.index! + exportMatch[0].length) : '';
const jsonStart = content.indexOf('[', beforeExport.length);
const jsonEnd = content.lastIndexOf(']') + 1;
const jsonContent = content.substring(jsonStart, jsonEnd);
const database: Appareillage[] = JSON.parse(jsonContent);

console.log(`📦 Base actuelle: ${database.length} produits`);

// Compter les références actuelles
const currentRefs = database.reduce((sum, p) => sum + (p.references_composees?.length || 0), 0);
console.log(`🔗 Références composées actuelles: ${currentRefs}\n`);

// TOUTES LES RÉFÉRENCES MANQUANTES - VERSION EXHAUSTIVE
const additionalReferences: Record<string, string[]> = {
  // ========== ORTHÈSES MEMBRES SUPÉRIEURS - NOUVELLES RÉFÉRENCES ==========
  "OS 79 G01": [
    "OS 59 G01", // Variante trouvée dans PDF ligne 2322
    "OS 57 N01", // Ligne 2356
    "Attelle poignet-main"
  ],
  
  "OS 13 N01": [
    "OS 58 C01", // Ligne 2359
    "OS 58 C02", // Ligne 2362
    "OS 58 N01", // Ligne 2365
    "OS 58 N02"  // Ligne 2368
  ],
  
  // ========== ORTHÈSES MEMBRES INFÉRIEURS - NOUVELLES RÉFÉRENCES ==========
  "OI 59 C91": [
    "OI 59 N 50", "OI59N50",     // Ligne 2509 - Attelle jambo-pédieuse
    "OI 39 N 52", "OI39N52",     // Ligne 2833 - GAM variante
    "OI 39 N 53", "OI39N53"      // Ligne 2533 - Attelle cruro-pédieuse
  ],
  
  "OI 36 N11": [
    "OI 36 N10", "OI36N10",      // Ligne 2549 - Attelle cruro-jambière
    "OI 36 N 10", "OI36N 10"     // Variantes avec espaces
  ],
  
  // ========== PROTHÈSES MEMBRES SUPÉRIEURS - TOUTES LES RÉFÉRENCES PS ==========
  "PSM": [
    // Prothèses épaule
    "PS 1R01", "PS1R01",         // Ligne 2935 - Prothèse scapulo-humérale
    
    // Prothèses bras
    "PS 2R01", "PS2R01",         // Ligne 2915
    "PS 3R01", "PS3R01",         // Ligne 2916
    "PS 3S10", "PS3S10",         // Ligne 2917
    
    // Prothèses coude
    "PS 5R01", "PS5R01",         // Ligne 2940
    "PS 5S10", "PS5S10",         // Ligne 2941
    
    // Prothèses avant-bras
    "PS 6R01", "PS6R01",         // Ligne 2972 ⭐
    "PS 6S01", "PS6S01",         // Ligne 2973
    
    // Prothèses main
    "PS 7R01", "PS7R01",         // Ligne 2965
    
    // Prothèses doigts
    "PS 9S02", "PS9S02",         // Ligne 2987
    
    "Prothèse membre supérieur",
    "Prothèse bras",
    "Prothèse avant-bras",
    "Prothèse main"
  ],
  
  // ========== PROTHÈSES MEMBRES INFÉRIEURS - TOUTES LES RÉFÉRENCES PI ==========
  "SO 01": [
    "PI 01", "PI01",             // Référence générique enfant
    "PI 01 ZS 63 G", "PI01ZS63G", // Ligne 3238 ⭐
    "PI 01 ZS 64 G", "PI01ZS64G"  // Ligne 3239 ⭐
  ],
  
  "SO 02": [
    "PI 03", "PI03",             // Ligne 3256 - Référence générique ⭐
    "PI 03 ZP 63D", "PI03ZP63D", // Déjà ajouté
    "PI 03 ZP 64D", "PI03ZP64D", // Déjà ajouté
    
    "PI 04", "PI04",             // Référence générique
    "PI 04 ZS 63 N", "PI04ZS63N", // Ligne 3298 ⭐
    "PI 04 ZS 64 N", "PI04ZS64N", // Ligne 3298 ⭐
    "PI 04 ZS 63N", "PI04ZS63N",  // Sans espace
    "PI 04 ZS 64N", "PI04ZS64N",  // Sans espace
    
    "PI 05", "PI05",             // Référence générique
    "PI 05 ZS 63 N", "PI05ZS63N", // Ligne 3299
    "PI 05 ZS 64 N", "PI05ZS64N", // Ligne 3299
    "PI 05 ZS 63N", "PI05ZS63N",  // Sans espace
    "PI 05 ZS 64N", "PI05ZS64N",  // Sans espace
    
    "PI 06", "PI06",             // Ligne 3315 - Référence générique ⭐
    "PI 06 ZP 63 A", "PI06ZP63A", // Ligne 3213 ⭐
    "PI 06 ZP 64 A", "PI06ZP64A", // Ligne 3213 ⭐
    "PI 06 ZP 63A", "PI06ZP63A",  // Sans espace
    "PI 06 ZP 64A", "PI06ZP64A",  // Sans espace
    
    "PI 07", "PI07",             // Référence générique
    "PI 07 SS 22 A", "PI07SS22A", // Ligne 3361
    "PI 07 SS 43 A", "PI07SS43A", // Ligne 3361
    "PI 07 SS 44 A", "PI07SS44A", // Ligne 3362
    "PI 07 SS 43 C", "PI07SS43C", // Ligne 3362
    "PI 07 SS 22A", "PI07SS22A",  // Sans espace
    "PI 07 SS 43A", "PI07SS43A",  // Sans espace
    "PI 07 SS 44A", "PI07SS44A",  // Sans espace
    "PI 07 SS 43C", "PI07SS43C",  // Sans espace
    
    "Prothèse fémorale",
    "Prothèse tibiale",
    "Prothèse Gritti",
    "Prothèse Symes",
    "Désarticulation hanche",
    "Désarticulation genou",
    "Désarticulation cheville"
  ]
};

// Ajouter les nouvelles références aux produits existants
let updatedCount = 0;
let totalNewReferences = 0;

database.forEach(product => {
  if (additionalReferences[product.reference]) {
    const existingRefs = product.references_composees || [];
    const newRefs = additionalReferences[product.reference];
    
    // Fusionner sans doublons
    const uniqueRefs = [...new Set([...existingRefs, ...newRefs])];
    
    if (uniqueRefs.length > existingRefs.length) {
      product.references_composees = uniqueRefs;
      const added = uniqueRefs.length - existingRefs.length;
      totalNewReferences += added;
      updatedCount++;
      
      console.log(`✅ ${product.reference} (${product.nom}): +${added} références`);
      console.log(`   Nouvelles: ${newRefs.slice(0, 5).join(', ')}${newRefs.length > 5 ? '...' : ''}\n`);
    }
  }
});

// Sauvegarder la base de données mise à jour
const updatedContent = beforeExport + JSON.stringify(database, null, 2) + ';\n';
fs.writeFileSync(dbPath, updatedContent, 'utf-8');

console.log('\n🎉 AJOUT TERMINÉ !');
console.log(`📊 Produits mis à jour: ${updatedCount}`);
console.log(`🔗 Nouvelles références ajoutées: ${totalNewReferences}`);
console.log(`📁 Total produits: ${database.length}`);

// Calculer le total de références composées
const totalRefs = database.reduce((sum, p) => sum + (p.references_composees?.length || 0), 0);
console.log(`🎯 Total références composées: ${totalRefs}`);

console.log('\n✅ TOUTES LES RÉFÉRENCES MANQUANTES AJOUTÉES :');
console.log('   • PI 01 ZS 63 G / PI 01 ZS 64 G (Désarticulation hanche)');
console.log('   • PI 03 (Prothèse fémorale - générique)');
console.log('   • PI 04 ZS 63 N / PI 04 ZS 64 N (Gritti)');
console.log('   • PI 05 ZS 63 N / PI 05 ZS 64 N (Gritti)');
console.log('   • PI 06 ZP 63 A / PI 06 ZP 64 A (Prothèse tibiale) ⭐');
console.log('   • PI 07 SS 22 A / PI 07 SS 43 A / PI 07 SS 44 A / PI 07 SS 43 C (Symes)');
console.log('   • PS 1R01 à PS 9S02 (Toutes prothèses membres supérieurs) ⭐');
console.log('   • OI 39 N 52 / OI 39 N 53 / OI 59 N 50 (Orthèses inf)');
console.log('   • OI 36 N10 (Attelle cruro-jambière)');
console.log('   • OS 57 N01, OS 58 C01/C02/N01/N02, OS 59 G01 (Orthèses sup)');
console.log('\n🔍 RECHERCHES MAINTENANT POSSIBLES:');
console.log('   PI 06, PI 04 ZS 63, PI 03, PI 01 ZS 63 G, PS 6R01, OI 39 N 52, etc.');
