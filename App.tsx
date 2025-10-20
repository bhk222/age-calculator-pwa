import React, { useState, useEffect } from 'react';
import { AiAnalyzer } from './components/AiAnalyzer';
import { InjurySelector } from './components/InjurySelector';
import { CalculationResult } from './components/CalculationResult';
import { LegislativeGuide } from './components/LegislativeGuide';
import { ProfessionalDiseasesGuide } from './components/ProfessionalDiseasesGuide';
import { ToolsPage } from './components/ToolsPage';
import { AppareillageSearch } from './components/AppareillageSearch';
import { BottomNav } from './components/BottomNav';
import { TopAppBar } from './components/TopAppBar';
import { InstallButton } from './components/InstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SelectedInjury } from './types';
import { Card } from './components/ui/Card';
import { Login } from './components/Login';

const tabTitles: { [key: string]: string } = {
    calculator: 'Calculateur IPP',
    legislative: 'Assistant Juridique',
    diseases: 'Maladies professionnelles',
    appareillage: 'Appareillage CNAS',
    tools: 'Outils'
};

export const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Premier design avec authentification
    const [activeTab, setActiveTab] = useState('calculator');
    const [selectedInjuries, setSelectedInjuries] = useState<SelectedInjury[]>([]);
    const [totalRate, setTotalRate] = useState(0);
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [hasPreexisting, setHasPreexisting] = useState(false);
    const [preexistingRate, setPreexistingRate] = useState<number>(0);
    const [aiNotes, setAiNotes] = useState<string[]>([]);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        const calculateTotalRate = (injuries: SelectedInjury[]) => {
             if (injuries.length === 0 && (!hasPreexisting || preexistingRate === 0)) {
                setTotalRate(0);
                return;
            }

            // Apply social rate to each injury before calculation
            const combinedInjuryRates = injuries.map(i => i.chosenRate + (i.socialRate || 0));

            // Balthazard formula for the *current* accident's injuries
            const sortedRates = [...combinedInjuryRates].sort((a, b) => b - a);
            
            if (hasPreexisting && preexistingRate > 0 && preexistingRate < 100) {
                const C1_anteriorCapacity = 100 - preexistingRate;
                
                // Combine pre-existing rate with current injuries' rates using Balthazard to get the global disability
                const allRates = [preexistingRate, ...sortedRates].sort((a, b) => b - a);
                
                let remainingCapacityGlobal = 100;
                let totalIppGlobal = 0;
                
                allRates.forEach(rate => {
                    const ippFromRate = remainingCapacityGlobal * (rate / 100);
                    totalIppGlobal += ippFromRate;
                    remainingCapacityGlobal -= ippFromRate;
                });
                
                const C2_remainingCapacity = 100 - totalIppGlobal;
                
                if (C1_anteriorCapacity <= 0) {
                    setTotalRate(100); // Should not happen if preexistingRate < 100, but as a safeguard.
                    return;
                }
                
                const R_finalRate = ((C1_anteriorCapacity - C2_remainingCapacity) / C1_anteriorCapacity) * 100;
                
                setTotalRate(Math.round(R_finalRate));

            } else {
                 // Standard Balthazard for multiple injuries without pre-existing conditions
                let remainingCapacityForCurrent = 100;
                let totalIppForCurrent = 0;

                sortedRates.forEach(rate => {
                    const ippFromRate = remainingCapacityForCurrent * (rate / 100);
                    totalIppForCurrent += ippFromRate;
                    remainingCapacityForCurrent -= ippFromRate;
                });
                setTotalRate(Math.round(totalIppForCurrent));
            }
        };

        calculateTotalRate(selectedInjuries);
    }, [selectedInjuries, hasPreexisting, preexistingRate]);


    const handleInstallClick = async () => {
        if (!installPrompt) {
            return;
        }
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
    };

    const handleAnalysisComplete = (result: { injuries: SelectedInjury[], flags?: { hasPreexisting: boolean }, notes?: string[] }) => {
      const { injuries, flags, notes } = result;
      if (injuries && injuries.length > 0) {
          setSelectedInjuries(prevInjuries => {
            const existingNames = new Set(prevInjuries.map(i => i.name));
            const trulyNew = injuries.filter(i => !existingNames.has(i.name));
            return [...prevInjuries, ...trulyNew];
          });
      }

      if (flags?.hasPreexisting) {
        setHasPreexisting(true);
      }

      if (notes && notes.length > 0) {
        setAiNotes(prevNotes => [...new Set([...prevNotes, ...notes])]);
      }
    };

    const handleAddInjury = (injury: SelectedInjury) => {
        setSelectedInjuries(prev => [...prev, injury]);
    };

    const handleRemoveInjury = (id: string) => {
        const newInjuries = selectedInjuries.filter(injury => injury.id !== id);
        setSelectedInjuries(newInjuries);
        if (newInjuries.length === 0) {
            setAiNotes([]); // Clear notes when all injuries are removed
        }
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'calculator':
                return (
                    <div className="p-2 sm:p-4 space-y-4">
                        {/* Bouton d'installation PWA */}
                        <InstallButton />
                        
                        <Card className="!p-3 !bg-amber-500/10 border-amber-500/20 text-amber-900">
                            <p className="text-xs font-medium">
                                Cet outil fournit une estimation à titre informatif et ne remplace pas une expertise médicale légale. Le calcul final peut varier.
                            </p>
                        </Card>
                        
                        <Card className="animate-fade-in">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="preexisting"
                                checked={hasPreexisting}
                                onChange={(e) => {
                                    setHasPreexisting(e.target.checked);
                                    if (!e.target.checked) {
                                        setPreexistingRate(0);
                                    }
                                }}
                                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                              />
                              <label htmlFor="preexisting" className="ml-3 block text-sm font-medium text-slate-700">
                                La victime présentait une incapacité antérieure (Art. 12)
                              </label>
                            </div>
                            {hasPreexisting && (
                              <div className="mt-4 animate-fade-in">
                                <label htmlFor="preexistingRate" className="block text-sm font-medium text-slate-700">Taux d'incapacité antérieure globale (%)</label>
                                <input
                                  type="number"
                                  id="preexistingRate"
                                  value={preexistingRate || ''}
                                  onChange={(e) => setPreexistingRate(Number(e.target.value))}
                                  className="mt-1 block w-full max-w-xs p-2 border border-slate-300 rounded-md shadow-sm bg-white text-black placeholder:text-slate-400 focus:ring-primary-500/50"
                                  placeholder="ex: 30"
                                  min="0"
                                  max="99"
                                />
                              </div>
                            )}
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <AiAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                                <InjurySelector onAddInjury={handleAddInjury} selectedInjuries={selectedInjuries} />
                            </div>
                            <CalculationResult 
                                selectedInjuries={selectedInjuries} 
                                totalRate={totalRate} 
                                onRemoveInjury={handleRemoveInjury}
                                hasPreexisting={hasPreexisting && preexistingRate > 0}
                                aiNotes={aiNotes}
                             />
                        </div>
                    </div>
                );
            case 'legislative':
                return <LegislativeGuide />;
            case 'diseases':
                return <ProfessionalDiseasesGuide />;
            case 'appareillage':
                return (
                    <div className="p-2 sm:p-4">
                        <AppareillageSearch />
                    </div>
                );
            case 'tools':
                return <ToolsPage />;
            default:
                return null;
        }
    };

    if (!isAuthenticated) {
        return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="relative min-h-screen bg-background text-slate-800 flex flex-col font-sans">
            <TopAppBar 
                title={tabTitles[activeTab]} 
                onInstallClick={handleInstallClick} 
                isInstallable={!!installPrompt}
            />

            <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar z-10">
                 <div key={activeTab} className="animate-fade-in">
                    {renderContent()}
                </div>
            </main>
            
            {/* Indicateur offline/online */}
            <OfflineIndicator />
            
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};