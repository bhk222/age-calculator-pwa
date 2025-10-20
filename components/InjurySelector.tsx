import React, { useState, useMemo } from 'react';
import { Injury, InjuryCategory, SelectedInjury } from '../types';
import { disabilityData } from '../data/disabilityRates';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

// Helper component for highlighting
const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

interface InjurySelectorProps {
  onAddInjury: (injury: SelectedInjury) => void;
  selectedInjuries: SelectedInjury[];
}

const RateCriteriaSelector: React.FC<{ injury: Injury; onConfirm: (rate: number) => void; onCancel: () => void }> = ({ injury, onConfirm, onCancel }) => {
    if (!Array.isArray(injury.rate)) return null;

    const [min, max] = injury.rate;
    const medium = Math.round((min + max) / 2);
    const [aiSuggestion, setAiSuggestion] = useState<{ rate: number; reasoning: string } | null>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    
    // Use specific criteria if available, otherwise use generic ones
    const lowCriterion = injury.rateCriteria?.low || "Séquelles légères, gêne fonctionnelle minime.";
    const mediumCriterion = injury.rateCriteria?.medium || "Séquelles modérées, limitation notable dans les activités.";
    const highCriterion = injury.rateCriteria?.high || "Séquelles importantes, handicap fonctionnel majeur.";

    const getAiSuggestion = async () => {
        setIsLoadingAi(true);
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3.2',
                    prompt: `Tu es un expert médical français spécialisé en évaluation d'incapacité permanente partielle (IPP).

Lésion: "${injury.name}"
Fourchette IPP réglementaire: ${min}% à ${max}%

Critères d'évaluation:
- FAIBLE (${min}%): ${lowCriterion}
- MOYEN (${medium}%): ${mediumCriterion}
- ÉLEVÉ (${max}%): ${highCriterion}

${injury.description ? `Description: ${injury.description}` : ''}

Tâche: Suggère le taux IPP le plus approprié (${min}, ${medium} ou ${max}%) et explique brièvement pourquoi en 2-3 phrases maximum. Sois concis et médical.

Format de réponse attendu:
TAUX: [nombre]
JUSTIFICATION: [2-3 phrases courtes]`,
                    stream: false,
                    options: { temperature: 0.3, num_predict: 200 }
                })
            });

            if (!response.ok) throw new Error('Erreur IA');

            const data = await response.json();
            const text = data.response;
            
            // Parse response
            const tauxMatch = text.match(/TAUX:\s*(\d+)/i);
            const justifMatch = text.match(/JUSTIFICATION:\s*(.+)/is);
            
            if (tauxMatch && justifMatch) {
                const suggestedRate = parseInt(tauxMatch[1]);
                // Validate and adjust to closest valid rate
                let finalRate = min;
                if (suggestedRate >= medium && medium !== min && medium !== max) {
                    finalRate = medium;
                } else if (suggestedRate >= max) {
                    finalRate = max;
                }
                
                setAiSuggestion({
                    rate: finalRate,
                    reasoning: justifMatch[1].trim().substring(0, 300)
                });
            } else {
                // Fallback to medium
                setAiSuggestion({
                    rate: medium,
                    reasoning: "L'IA suggère une évaluation intermédiaire basée sur les critères standards."
                });
            }
        } catch (error) {
            console.error('Erreur suggestion IA:', error);
            setAiSuggestion(null);
            alert('⚠️ L\'IA locale (Ollama) n\'est pas disponible. Assurez-vous qu\'Ollama est démarré avec le modèle llama3.2.');
        } finally {
            setIsLoadingAi(false);
        }
    };

    return (
        <div className="mt-2 p-3 bg-slate-100 rounded-md border border-primary-200 w-full animate-fade-in">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-semibold text-slate-700">
                    Le taux pour <span className="font-bold">"{injury.name}"</span> varie. Veuillez choisir le niveau de gravité qui correspond le mieux aux séquelles observées :
                </p>
                <button
                    onClick={getAiSuggestion}
                    disabled={isLoadingAi}
                    className="ml-2 flex items-center gap-1 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    title="Demander une suggestion à l'IA locale"
                >
                    {isLoadingAi ? (
                        <>
                            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            IA...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                            Aide IA
                        </>
                    )}
                </button>
            </div>

            {aiSuggestion && (
                <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded-md animate-fade-in">
                    <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-purple-800">
                                Suggestion IA: {aiSuggestion.rate}%
                            </p>
                            <p className="text-xs text-purple-700 mt-1">
                                {aiSuggestion.reasoning}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="space-y-2">
                 <div 
                    onClick={() => onConfirm(min)} 
                    className={`w-full text-left p-3 bg-white border-2 rounded-md transition-all cursor-pointer shadow-sm ${
                        aiSuggestion?.rate === min 
                            ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                            : 'border-transparent hover:border-green-500 hover:bg-green-50'
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-green-700 flex items-center gap-1">
                            Faible
                            {aiSuggestion?.rate === min && (
                                <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">Suggéré IA</span>
                            )}
                        </span>
                        <span className="font-extrabold text-lg text-green-700">{min}%</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{lowCriterion}</p>
                </div>
                {min !== medium && medium !== max && (
                    <div 
                        onClick={() => onConfirm(medium)} 
                        className={`w-full text-left p-3 bg-white border-2 rounded-md transition-all cursor-pointer shadow-sm ${
                            aiSuggestion?.rate === medium 
                                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                                : 'border-transparent hover:border-yellow-500 hover:bg-yellow-50'
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-yellow-700 flex items-center gap-1">
                                Moyen
                                {aiSuggestion?.rate === medium && (
                                    <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">Suggéré IA</span>
                                )}
                            </span>
                            <span className="font-extrabold text-lg text-yellow-700">{medium}%</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{mediumCriterion}</p>
                    </div>
                )}
                <div 
                    onClick={() => onConfirm(max)} 
                    className={`w-full text-left p-3 bg-white border-2 rounded-md transition-all cursor-pointer shadow-sm ${
                        aiSuggestion?.rate === max 
                            ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                            : 'border-transparent hover:border-red-500 hover:bg-red-50'
                    }`}
                >
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-red-700 flex items-center gap-1">
                            Élevé
                            {aiSuggestion?.rate === max && (
                                <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded-full">Suggéré IA</span>
                            )}
                        </span>
                        <span className="font-extrabold text-lg text-red-700">{max}%</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{highCriterion}</p>
                </div>
            </div>
            <div className="text-right mt-3">
                 <Button onClick={onCancel} variant="secondary" className="!py-1 !px-2 !text-xs">Annuler</Button>
            </div>
        </div>
    );
}


export const InjurySelector: React.FC<InjurySelectorProps> = ({ onAddInjury, selectedInjuries }) => {
  const [selectingRateFor, setSelectingRateFor] = useState<Injury | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = (injury: Injury) => {
    if (typeof injury.rate === 'number') {
      onAddInjury({ ...injury, chosenRate: injury.rate, id: crypto.randomUUID() });
    } else { // It's a range [min, max]
      setSelectingRateFor(injury); // Always open the selector for a range
    }
  };

  const handleConfirmRate = (rate: number) => {
    if (selectingRateFor) {
        onAddInjury({ ...selectingRateFor, chosenRate: rate, id: crypto.randomUUID() });
        setSelectingRateFor(null);
    }
  };

  const filteredData = useMemo(() => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearch) {
      return disabilityData;
    }

    return disabilityData
      .map(category => {
        const filteredSubcategories = category.subcategories
          .map(subcategory => {
            const filteredInjuries = subcategory.injuries.filter(injury =>
              injury.name.toLowerCase().includes(lowerCaseSearch) ||
              (injury.description && injury.description.toLowerCase().includes(lowerCaseSearch)) ||
              subcategory.name.toLowerCase().includes(lowerCaseSearch) ||
              category.name.toLowerCase().includes(lowerCaseSearch)
            );
            return { ...subcategory, injuries: filteredInjuries };
          })
          .filter(subcategory => subcategory.injuries.length > 0);

        return { ...category, subcategories: filteredSubcategories };
      })
      .filter(category => category.subcategories.length > 0);
  }, [searchTerm]);

  return (
    <Card className="w-full">
      <h3 className="text-lg font-bold mb-3 text-slate-800">Barème Manuel</h3>
      <p className="text-slate-500 mb-4 text-xs">Parcourez le barème complet ou utilisez la recherche pour trouver et ajouter des lésions.</p>
      
      <div className="relative mb-4">
        <input
            type="text"
            placeholder="Rechercher (ex: fracture, raideur, sciatique...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50 text-black placeholder:text-slate-400 bg-white"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {filteredData.map((category: InjuryCategory) => (
          <details key={category.name} className="group" open={!!searchTerm.trim()}>
            <summary className="cursor-pointer p-3 bg-slate-100 rounded-md font-semibold text-slate-700 group-open:bg-primary-200 group-open:text-primary-800 transition-colors flex justify-between items-center">
              {category.name}
              <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </summary>
            <div className="p-3">
              {category.subcategories.map(subcategory => (
                <div key={subcategory.name} className="mb-4">
                    <h4 className="font-semibold text-md text-slate-600 border-b border-slate-200 pb-1 mb-2">{subcategory.name}</h4>
                    <ul className="space-y-2">
                        {subcategory.injuries.map((injury: Injury) => {
                          const isAdded = selectedInjuries.some(sel => sel.name === injury.name);
                          const isSelecting = selectingRateFor?.name === injury.name;
                          
                          return (
                            <li key={injury.name} className={`flex flex-col p-2 rounded-md transition-all ${isSelecting ? 'bg-slate-600 text-white shadow-lg' : 'hover:bg-slate-50'}`}>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex-1 mr-2">
                                        <p className={`font-medium text-sm ${isSelecting ? 'text-white' : 'text-slate-800'}`}>
                                            <Highlight text={injury.name} highlight={searchTerm} />
                                        </p>
                                        {injury.description && (
                                            <p className={`text-xs mt-1 italic pl-2 border-l-2 ${isSelecting ? 'text-white/90 border-white/30' : 'text-slate-500 border-slate-200'}`}>
                                                <Highlight text={injury.description} highlight={searchTerm} />
                                            </p>
                                        )}
                                        <p className={`text-xs font-semibold mt-1 ${isSelecting ? 'text-white/95' : 'text-slate-600'}`}>
                                            Taux indicatif : {typeof injury.rate === 'number' ? `${injury.rate}%` : `${injury.rate[0]}-${injury.rate[1]}%`}
                                        </p>
                                    </div>
                                    
                                    {selectingRateFor?.name !== injury.name && (
                                        <Button 
                                          onClick={() => handleAddClick(injury)} 
                                          disabled={isAdded}
                                          className={`py-1 px-3 text-xs mt-1 ${isAdded ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed text-white' : 'bg-slate-600 hover:bg-slate-700 text-white shadow-md'}`}
                                        >
                                          {isAdded ? 'Ajouté' : 'Ajouter'}
                                        </Button>
                                    )}
                                </div>

                                {selectingRateFor?.name === injury.name && (
                                    <RateCriteriaSelector
                                        injury={injury}
                                        onConfirm={handleConfirmRate}
                                        onCancel={() => setSelectingRateFor(null)}
                                    />
                                )}
                            </li>
                          );
                        })}
                    </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
         {filteredData.length === 0 && searchTerm.trim() && (
            <p className="text-slate-500 text-center py-4">Aucune lésion trouvée pour "{searchTerm}".</p>
        )}
      </div>
    </Card>
  );
};
