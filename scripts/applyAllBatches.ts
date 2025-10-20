/**
 * SCRIPT D'APPLICATION AUTOMATIQUE DE TOUS LES BATCHS
 * 
 * Ce script applique automatiquement tous les enrichissements disponibles
 */

import fs from 'fs';
import path from 'path';

// Import des batchs (vous pouvez en ajouter d'autres)
import { enrichmentsBatch2 } from './enrichments-batch2.js';

// Batch 1 déjà dans enhanceDatabase.ts
const batch1 = {
  "Raideur Pouce - Articulation métacarpo-phalangienne (Main Dominante)": {
    rateCriteria: {
      low: "Légère limitation en fin de course (>80% mobilité), fonction de pince conservée.",
      high: "Raideur marquée gênant l'enroulement du pouce dans la paume (<50% mobilité)."
    }
  },
  // ... (tous les autres déjà ajoutés)
};

interface Enhancement {
  rateCriteria?: {
    low: string;
    medium?: string;
    high: string;
  };
  description?: string;
  notes?: string;
}

interface Enhancements {
  [injuryName: string]: Enhancement;
}

/**
 * Applique les enrichissements à la base de données
 */
function applyAllEnhancements() {
  const dataPath = path.resolve(process.cwd(), 'data/disabilityRates.ts');
  let fileContent = fs.readFileSync(dataPath, 'utf-8');
  
  let totalEnhanced = 0;
  let totalNotFound = 0;
  const notFound: string[] = [];

  // Appliquer batch2
  console.log('\n🚀 Application du Batch 2...\n');
  Object.entries(enrichmentsBatch2).forEach(([injuryName, enhancement]) => {
    const escapedName = injuryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Rechercher l'injury avec son rate existant
    const injuryRegex = new RegExp(
      `(\\s*{[^}]*name:\\s*["'\`]${escapedName}["'\`][^}]*rate:\\s*\\[[^\\]]+\\])([,\\s}])`,
      'g'
    );

    if (fileContent.match(injuryRegex)) {
      let injuryBlock = fileContent.match(injuryRegex)?.[0] || '';
      
      // Ajouter rateCriteria si présent
      if (enhancement.rateCriteria && !injuryBlock.includes('rateCriteria')) {
        const criteriaStr = `rateCriteria: {
        low: "${enhancement.rateCriteria.low}"${enhancement.rateCriteria.medium ? `,
        medium: "${enhancement.rateCriteria.medium}"` : ''},
        high: "${enhancement.rateCriteria.high}"
      }`;
        
        injuryBlock = injuryBlock.replace(
          /(\s*rate:\s*\[[^\]]+\])([,\s}])/,
          `$1,
      ${criteriaStr}$2`
        );
      }

      // Ajouter description si présente
      if (enhancement.description && !injuryBlock.includes('description:')) {
        injuryBlock = injuryBlock.replace(
          /(\s*rate:\s*\[[^\]]+\])([,\s}])/,
          `$1,
      description: "${enhancement.description}"$2`
        );
      }

      // Ajouter notes si présentes
      if (enhancement.notes && !injuryBlock.includes('notes:')) {
        injuryBlock = injuryBlock.replace(
          /(\s*rate:\s*\[[^\]]+\])([,\s}])/,
          `$1,
      notes: "${enhancement.notes}"$2`
        );
      }

      fileContent = fileContent.replace(injuryRegex, injuryBlock);
      totalEnhanced++;
      console.log(`✅ ${injuryName}`);
    } else {
      totalNotFound++;
      notFound.push(injuryName);
      console.log(`❌ Non trouvé: ${injuryName}`);
    }
  });

  // Sauvegarder le fichier
  fs.writeFileSync(dataPath, fileContent, 'utf-8');

  // Rapport final
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('✅ APPLICATION DE TOUS LES BATCHS TERMINÉE');
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(`📊 Statistiques totales:`);
  console.log(`   • Enrichissements appliqués: ${totalEnhanced}`);
  console.log(`   • Lésions non trouvées: ${totalNotFound}\n`);

  if (notFound.length > 0) {
    console.log(`⚠️  Lésions non trouvées (${notFound.length}):`);
    notFound.forEach(name => console.log(`   - ${name}`));
  }

  console.log('\n💡 Prochaines étapes:');
  console.log('   1. npm run analyze - Vérifier les progrès');
  console.log('   2. Créer batch3.ts avec plus d\'enrichissements');
  console.log('   3. Relancer ce script\n');
  console.log('═══════════════════════════════════════════════════════════\n');
}

// Exécution
applyAllEnhancements();
