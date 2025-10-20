import fs from 'fs';

// Lecture du fichier
const content = fs.readFileSync('./data/disabilityRates.ts', 'utf8');

// Compter les lésions totales
const totalMatches = content.match(/name:\s*["']/g);
const total = totalMatches ? totalMatches.length : 0;

// Compter les lésions avec rateCriteria
const criteriaMatches = content.match(/rateCriteria:\s*\{/g);
const withCriteria = criteriaMatches ? criteriaMatches.length : 0;

// Résultats
const missing = total - withCriteria;
const coverage = total > 0 ? ((withCriteria / total) * 100).toFixed(1) : 0;

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 ANALYSE RAPIDE DE LA BASE IPP');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`📈 Total de lésions: ${total}`);
console.log(`✅ Lésions enrichies: ${withCriteria}`);
console.log(`❌ Lésions manquantes: ${missing}`);
console.log(`📊 Coverage: ${coverage}%\n`);
console.log('═══════════════════════════════════════════════════════════\n');

// Trouver les lésions sans rateCriteria
if (missing > 0) {
  console.log('🔍 Échantillon de lésions sans critères:\n');
  
  const lesionBlocks = content.split(/(?=\s+\{[\s\n]*category:)/);
  let count = 0;
  
  for (const block of lesionBlocks) {
    if (!block.includes('rateCriteria:') && block.includes('name:')) {
      const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
      const rangeMatch = block.match(/range:\s*["']\[?([0-9\-\s,]+)\]?["']/);
      
      if (nameMatch && count < 20) {
        const name = nameMatch[1];
        const range = rangeMatch ? rangeMatch[1] : 'N/A';
        console.log(`   - "${name}" [${range}]`);
        count++;
      }
    }
  }
  
  if (missing > 20) {
    console.log(`   ... et ${missing - 20} autres lésions\n`);
  }
}
