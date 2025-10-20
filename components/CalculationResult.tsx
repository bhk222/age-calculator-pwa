import React from 'react';
import { SelectedInjury } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface CalculationResultProps {
  selectedInjuries: SelectedInjury[];
  totalRate: number;
  onRemoveInjury: (id: string) => void;
  hasPreexisting: boolean;
  aiNotes?: string[];
}

export const CalculationResult: React.FC<CalculationResultProps> = ({ selectedInjuries, totalRate, onRemoveInjury, hasPreexisting, aiNotes }) => {
  return (
    <Card className="w-full">
      <h3 className="text-lg font-bold mb-3 text-slate-800">Analyse des Lésions</h3>
      {selectedInjuries.length === 0 && !hasPreexisting ? (
        <p className="text-slate-500 text-sm">Aucune lésion sélectionnée. Décrivez un cas à l'expert IA ou utilisez le barème manuel pour commencer.</p>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
            {selectedInjuries.map((injury) => (
              <div key={injury.id} className="bg-slate-50/70 p-3 rounded-lg border border-slate-200/90 transition-all hover:shadow-sm animate-fade-in">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-3">
                    <p className="text-sm font-semibold text-slate-800">{injury.name}</p>
                    {injury.socialRate && injury.socialRate > 0 && (
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                            Taux social: +{injury.socialRate}%
                        </span>
                    )}
                    {injury.category && (
                      <p className="text-xs text-slate-500 mt-1">{injury.category}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary-600 text-lg w-12 text-center">{injury.chosenRate + (injury.socialRate || 0)}%</span>
                    <Button onClick={() => onRemoveInjury(injury.id)} variant="danger" className="!p-1.5 !text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
                {injury.justification && (
                    <div className="mt-2 pt-2 border-t border-slate-200/90">
                        <details className="group">
                            <summary className="text-xs font-semibold text-slate-600 cursor-pointer list-none flex items-center group-hover:text-primary-700">
                                Détails de l'analyse IA
                                <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </summary>
                            <div className="mt-2 text-xs text-slate-700 bg-slate-100 p-2 rounded-md"
                                dangerouslySetInnerHTML={{ __html: injury.justification }}>
                            </div>
                        </details>
                    </div>
                )}
              </div>
            ))}
          </div>

           {aiNotes && aiNotes.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg animate-fade-in">
                <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                   </svg>
                  Observations de l'Expert IA
                </h4>
                <ul className="mt-2 text-xs text-blue-700 list-disc list-inside space-y-1 pl-2">
                  {aiNotes.map((note, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
                  ))}
                </ul>
              </div>
            )}

          <div className="bg-accent-50 border border-accent-200 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-md text-accent-800">Taux global d'incapacité estimé :</h4>
            <p className="text-5xl font-extrabold text-accent-600 my-1">{totalRate}%</p>
            {hasPreexisting ? (
                 <p className="text-xs text-accent-700">
                    Calculé selon la formule pour infirmité antérieure (Art. 14).
                 </p>
            ) : selectedInjuries.length > 1 && (
                <p className="text-xs text-accent-700">
                    Calculé selon la méthode Balthazard (capacité restante).
                </p>
            )}
          </div>
        </>
      )}
    </Card>
  );
};