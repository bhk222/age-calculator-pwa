/**
 * Script pour analyser et comparer les données du PDF avec la base de données existante
 * et générer un rapport des éléments manquants ou à améliorer
 */

import { disabilityData } from '../data/disabilityRates';

interface MissingDataReport {
  totalCategories: number;
  totalSubcategories: number;
  totalInjuries: number;
  injuriesWithoutCriteria: number;
  injuriesWithoutDescription: number;
  suggestedImprovements: string[];
}

function analyzeData(): MissingDataReport {
  let totalCategories = 0;
  let totalSubcategories = 0;
  let totalInjuries = 0;
  let injuriesWithoutCriteria = 0;
  let injuriesWithoutDescription = 0;
  const suggestedImprovements: string[] = [];

  disabilityData.forEach((category) => {
    totalCategories++;
    
    category.subcategories.forEach((subcategory) => {
      totalSubcategories++;
      
      subcategory.injuries.forEach((injury) => {
        totalInjuries++;
        
        // Vérifier si l'injury a des critères d'évaluation
        if (!injury.rateCriteria && Array.isArray(injury.rate) && injury.rate.length === 2) {
          injuriesWithoutCriteria++;
          if (injuriesWithoutCriteria <= 10) {
            suggestedImprovements.push(
              `❌ "${injury.name}" (${subcategory.name}) - Manque de critères pour range [${injury.rate[0]}-${injury.rate[1]}]`
            );
          }
        }
        
        // Vérifier si l'injury a une description
        if (!injury.description && Array.isArray(injury.rate) && injury.rate.length === 2 && injury.rate[1] - injury.rate[0] > 20) {
          injuriesWithoutDescription++;
          if (injuriesWithoutDescription <= 5) {
            suggestedImprovements.push(
              `⚠️  "${injury.name}" - Large range [${injury.rate[0]}-${injury.rate[1]}] sans description`
            );
          }
        }
      });
    });
  });

  return {
    totalCategories,
    totalSubcategories,
    totalInjuries,
    injuriesWithoutCriteria,
    injuriesWithoutDescription,
    suggestedImprovements,
  };
}

// Fonction pour extraire les données à partir d'un fichier PDF (à implémenter)
function extractPdfData(pdfPath: string) {
  // Cette fonction devra utiliser une bibliothèque comme pdf-parse
  // pour extraire le texte du PDF et identifier les données manquantes
  console.log(`Analyse du PDF: ${pdfPath}`);
  // TODO: Implémenter l'extraction PDF
}

// Générer le rapport
const report = analyzeData();

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 RAPPORT D\'ANALYSE DE LA BASE DE DONNÉES IPP');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📈 STATISTIQUES GÉNÉRALES:');
console.log(`   • Catégories principales: ${report.totalCategories}`);
console.log(`   • Sous-catégories: ${report.totalSubcategories}`);
console.log(`   • Total de lésions: ${report.totalInjuries}`);
console.log('');

console.log('⚠️  ÉLÉMENTS À AMÉLIORER:');
console.log(`   • Lésions sans critères d'évaluation: ${report.injuriesWithoutCriteria}`);
console.log(`   • Lésions sans description: ${report.injuriesWithoutDescription}`);
console.log('');

if (report.suggestedImprovements.length > 0) {
  console.log('💡 SUGGESTIONS D\'AMÉLIORATION (échantillon):');
  report.suggestedImprovements.forEach((suggestion) => {
    console.log(`   ${suggestion}`);
  });
  
  if (report.injuriesWithoutCriteria > 10) {
    console.log(`   ... et ${report.injuriesWithoutCriteria - 10} autres lésions sans critères`);
  }
}

console.log('\n═══════════════════════════════════════════════════════════');

export { analyzeData, extractPdfData };
