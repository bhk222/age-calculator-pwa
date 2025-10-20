import fs from 'fs';
import { disabilityRates } from '../data/disabilityRates.ts';

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 ANALYSE FINALE DU COVERAGE IPP');
console.log('═══════════════════════════════════════════════════════════\n');

const total = disabilityRates.length;
const withCriteria = disabilityRates.filter(item => item.rateCriteria).length;
const missing = total - withCriteria;
const coverage = ((withCriteria / total) * 100).toFixed(1);

console.log(`📈 Total de lésions: ${total}`);
console.log(`✅ Lésions enrichies: ${withCriteria}`);
console.log(`❌ Lésions manquantes: ${missing}`);
console.log(`📊 Coverage: ${coverage}%\n`);

if (missing > 0) {
  console.log('🔍 Lésions sans critères (échantillon des 30 premières):\n');
  
  let count = 0;
  for (const item of disabilityRates) {
    if (!item.rateCriteria && count < 30) {
      console.log(`   ${count + 1}. "${item.name}" - [${item.range}]`);
      console.log(`      Catégorie: ${item.category} > ${item.subCategory}`);
      count++;
    }
  }
  
  if (missing > 30) {
    console.log(`\n   ... et ${missing - 30} autres lésions sans critères`);
  }
}

console.log('\n═══════════════════════════════════════════════════════════\n');
