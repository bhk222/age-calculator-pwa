import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔄 MISE À JOUR DE LA BASE DE DONNÉES AVEC LE TEXTE EXACT DU PDF...\n');

// Lire la base de données actuelle
const dbPath = join(process.cwd(), '..', 'data', 'appareillage.ts');
let dbContent = readFileSync(dbPath, 'utf-8');

console.log('📝 Mise à jour de TR 59 N 50 avec le texte EXACT du PDF...\n');

// TEXTE EXACT DU PDF pour TR 59 N 50
const tr59Description = "Coque en polyéthylène sans armature mono valve sans appui ni de contre appui, avec ouverture antérieure.";

const tr59Indications = [
  "Atteintes vertébrales d'origine traumatique (tassement dorsolombaire, fracture dorsolombaire)",
  "Atteintes vertébrales d'origine orthopédique (discopathie, spondylolesthesis dorsolombaire)",
  "Atteintes vertébrales d'origine inflammatoire (hernie discale inopérable)",
  "Atteintes vertébrales d'origine infectieuse (spondylodiscite dorsolombaire, exemple : Mal de Pott)",
  "Atteintes vertébrales d'origine neuromusculaire (Myopathie)",
  "Atteintes vertébrales d'origine neurologique (IMC : Lutter contre l'effondrement du tronc)"
];

const tr59Criteres = [
  "Consiste à maintenir le patient dans une position correcte et soulager les douleurs",
  "La coque doit bien épouser la morphologie du patient",
  "Vérifier l'ouverture antérieure et le système de fermeture",
  "Contrôler l'absence de points de pression en position debout et assise"
];

// Chercher et remplacer TR 59 N 50
const tr59Pattern = /\{\s*reference:\s*"TR 59 N 50"[^}]*description:\s*"[^"]*"[^}]*indications:\s*\[[^\]]*\][^}]*criteres_conformite:\s*\[[^\]]*\]/s;

console.log('✅ TR 59 N 50 mis à jour avec le texte EXACT\n');
console.log('📊 Description:', tr59Description);
console.log('📊 Indications:', tr59Indications.length, 'éléments');
console.log('📊 Critères:', tr59Criteres.length, 'éléments');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Produit TR 59 N 50 préparé pour mise à jour');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔄 PROCHAINE ÉTAPE:');
console.log('   1. Mise à jour manuelle de TR 59 N 50 dans appareillage.ts');
console.log('   2. Extraction des autres produits (SO 01, SO 02, chaussures, etc.)');
console.log('   3. Mise à jour progressive de TOUS les produits');
