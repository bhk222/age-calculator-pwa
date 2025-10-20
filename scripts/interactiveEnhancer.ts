/**
 * Outil interactif pour enrichir la base de données
 * Lance une interface en ligne de commande pour ajouter facilement des critères
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface Enhancement {
  name: string;
  rateCriteria?: {
    low: string;
    medium?: string;
    high: string;
  };
  description?: string;
  notes?: string;
}

const enhancements: Enhancement[] = [];

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addEnhancement() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('➕ AJOUTER UN ENRICHISSEMENT');
  console.log('═══════════════════════════════════════════════════════════\n');

  const enhancement: Enhancement = {
    name: ''
  };

  // Nom de la lésion
  enhancement.name = await question('📝 Nom exact de la lésion (copiez depuis disabilityRates.ts):\n> ');

  if (!enhancement.name.trim()) {
    console.log('❌ Le nom ne peut pas être vide.');
    return false;
  }

  // Demander s'il faut ajouter des critères
  const addCriteria = await question('\n❓ Ajouter des critères d\'évaluation? (o/n): ');
  
  if (addCriteria.toLowerCase() === 'o') {
    enhancement.rateCriteria = {
      low: '',
      high: ''
    };

    console.log('\n📊 Critères d\'évaluation:');
    enhancement.rateCriteria.low = await question('  Low (taux minimum): ');
    
    const addMedium = await question('  Ajouter un critère medium? (o/n): ');
    if (addMedium.toLowerCase() === 'o') {
      enhancement.rateCriteria.medium = await question('  Medium (taux moyen): ');
    }
    
    enhancement.rateCriteria.high = await question('  High (taux maximum): ');
  }

  // Demander s'il faut ajouter une description
  const addDesc = await question('\n❓ Ajouter une description? (o/n): ');
  if (addDesc.toLowerCase() === 'o') {
    enhancement.description = await question('📖 Description: ');
  }

  // Demander s'il faut ajouter des notes
  const addNotes = await question('\n❓ Ajouter des notes? (o/n): ');
  if (addNotes.toLowerCase() === 'o') {
    enhancement.notes = await question('📝 Notes: ');
  }

  // Confirmation
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ APERÇU DE L\'ENRICHISSEMENT');
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(JSON.stringify(enhancement, null, 2));

  const confirm = await question('\n❓ Confirmer l\'ajout? (o/n): ');
  
  if (confirm.toLowerCase() === 'o') {
    enhancements.push(enhancement);
    console.log('✅ Enrichissement ajouté!\n');
    return true;
  } else {
    console.log('❌ Enrichissement annulé.\n');
    return false;
  }
}

async function saveEnhancements() {
  if (enhancements.length === 0) {
    console.log('⚠️  Aucun enrichissement à sauvegarder.');
    return;
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('💾 SAUVEGARDE DES ENRICHISSEMENTS');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Créer un fichier TypeScript avec les enrichissements
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `enhancements-${timestamp}.ts`;
  const filepath = path.join(__dirname, filename);

  let content = `/**
 * Enrichissements générés le ${new Date().toLocaleString('fr-FR')}
 * ${enhancements.length} enrichissement(s)
 * 
 * Pour appliquer ces enrichissements:
 * 1. Copiez le contenu de l'objet 'enhancements' ci-dessous
 * 2. Collez-le dans scripts/enhanceDatabase.ts
 * 3. Exécutez: npm run enhance
 */

export const enhancements = {\n`;

  enhancements.forEach(enh => {
    content += `  "${enh.name}": {\n`;
    
    if (enh.rateCriteria) {
      content += `    rateCriteria: {\n`;
      content += `      low: "${enh.rateCriteria.low}",\n`;
      if (enh.rateCriteria.medium) {
        content += `      medium: "${enh.rateCriteria.medium}",\n`;
      }
      content += `      high: "${enh.rateCriteria.high}"\n`;
      content += `    }`;
      if (enh.description || enh.notes) content += ',';
      content += `\n`;
    }
    
    if (enh.description) {
      content += `    description: "${enh.description}"`;
      if (enh.notes) content += ',';
      content += `\n`;
    }
    
    if (enh.notes) {
      content += `    notes: "${enh.notes}"\n`;
    }
    
    content += `  },\n`;
  });

  content += `};\n`;

  fs.writeFileSync(filepath, content, 'utf-8');

  console.log(`✅ ${enhancements.length} enrichissement(s) sauvegardé(s) dans:`);
  console.log(`   ${filepath}\n`);
  console.log('📋 Prochaines étapes:');
  console.log('   1. Vérifiez le fichier généré');
  console.log('   2. Copiez le contenu dans scripts/enhanceDatabase.ts');
  console.log('   3. Exécutez: npm run enhance');
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

async function main() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   OUTIL INTERACTIF D\'ENRICHISSEMENT DE LA BASE IPP       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('\n');
  console.log('Cet outil vous aide à ajouter facilement des enrichissements');
  console.log('à la base de données à partir du PDF du barème.\n');

  let continueAdding = true;

  while (continueAdding) {
    const added = await addEnhancement();
    
    if (added) {
      const another = await question('❓ Ajouter un autre enrichissement? (o/n): ');
      continueAdding = another.toLowerCase() === 'o';
    } else {
      const retry = await question('❓ Réessayer? (o/n): ');
      continueAdding = retry.toLowerCase() === 'o';
    }
  }

  if (enhancements.length > 0) {
    await saveEnhancements();
  }

  rl.close();
  console.log('👋 Au revoir!\n');
}

// Exécuter l'outil
main().catch(console.error);
