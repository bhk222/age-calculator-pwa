import fs from 'fs';

const content = fs.readFileSync('./data/disabilityRates.ts', 'utf8');

// Extraire seulement la partie du tableau disabilityRates
const arrayStart = content.indexOf('export const disabilityRates');
const arrayContent = content.slice(arrayStart);

// Compter par une méthode plus précise : chercher les objets avec name:
const objectPattern = /\{\s*category:/g;
const objects = arrayContent.match(objectPattern);
const totalCount = objects ? objects.length : 0;

// Compter les rateCriteria
const criteriaPattern = /rateCriteria:\s*\{[\s\S]*?\},\s*description:/g;
const criteriaMatches = arrayContent.match(criteriaPattern);
const enrichedCount = criteriaMatches ? criteriaMatches.length : 0;

const missingCount = totalCount - enrichedCount;
const coveragePercent = totalCount > 0 ? ((enrichedCount / totalCount) * 100).toFixed(1) : 0;

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║   📊 ANALYSE FINALE - BASE DONNÉES IPP                   ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log(`  📈 Total de lésions:        ${totalCount}`);
console.log(`  ✅ Lésions enrichies:       ${enrichedCount}`);
console.log(`  ❌ Lésions manquantes:      ${missingCount}`);
console.log(`  📊 Coverage actuel:         ${coveragePercent}%\n`);

if (missingCount > 0) {
  // Trouver les premières lésions sans rateCriteria
  console.log('🔍 Échantillon de lésions sans critères d\'évaluation:\n');
  
  const blocks = arrayContent.split(/(?=\s*\{\s*category:)/);
  let foundCount = 0;
  
  for (let i = 0; i < blocks.length && foundCount < 25; i++) {
    const block = blocks[i];
    if (block.includes('category:') && !block.includes('rateCriteria:')) {
      const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
      const rangeMatch = block.match(/range:\s*["']([^"']+)["']/);
      const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);
      
      if (nameMatch) {
        foundCount++;
        const name = nameMatch[1];
        const range = rangeMatch ? rangeMatch[1] : 'N/A';
        const category = categoryMatch ? categoryMatch[1] : 'N/A';
        console.log(`   ${foundCount}. "${name}"`);
        console.log(`      Range: [${range}] | Catégorie: ${category}`);
      }
    }
  }
  
  if (missingCount > 25) {
    console.log(`\n   ... et ${missingCount - 25} autres lésions manquantes\n`);
  }
}

console.log('═══════════════════════════════════════════════════════════\n');
