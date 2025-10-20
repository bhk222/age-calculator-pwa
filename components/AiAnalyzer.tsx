import React, { useState, useEffect, useRef } from 'react';
import { SelectedInjury, Message, Injury, InjuryCategory, InjurySubcategory } from '../types';
import { disabilityData } from '../data/disabilityRates';
import { Button } from './ui/Button';

interface AiAnalyzerProps {
    onAnalysisComplete: (result: { injuries: SelectedInjury[], flags?: { hasPreexisting: boolean }, notes?: string[] }) => void;
}

type ConversationState = 'IDLE' | 'AWAITING_CHOICE' | 'AWAITING_RATE_CHOICE';

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-3">
        <span className="text-slate-500 text-sm">L'expert analyse</span>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.3s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.15s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
    </div>
);

const MessageBubble: React.FC<{ message: Message; onChoiceSelect?: (choice: Injury & { context?: 'clarification' | 'rate_choice', originalInjury?: Injury }) => void }> = ({ message, onChoiceSelect }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex flex-col animate-fade-in ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-sm ${isUser ? 'bg-primary-700 text-white rounded-br-lg' : 'bg-white border border-gray-200/80 text-slate-800 rounded-bl-lg'}`}>
                <div className="text-sm prose max-w-none prose-p:text-inherit" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }}></div>
            </div>
            {message.choices && onChoiceSelect && (
                 <div className="max-w-xs lg:max-w-md mt-2 space-y-2 w-full">
                    {message.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => onChoiceSelect(choice)}
                            className="w-full text-left p-3 bg-white border border-primary-300/50 rounded-lg hover:bg-primary-50 hover:border-primary-500 transition-all text-sm font-medium text-primary-800 shadow-sm"
                        >
                           {choice.name} 
                           {choice.context !== 'rate_choice' && (
                               <span className="text-xs text-slate-500 ml-2">
                                    ({typeof choice.rate === 'number' ? `${choice.rate}%` : `${choice.rate[0]}-${choice.rate[1]}%`})
                               </span>
                           )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Dictionaries for the local "Expert Brain" ---
const injuryTypeKeywords: { [key: string]: { keywords: string[], weight: number } } = {
    amputation: { keywords: ['amputation', 'perte', 'désarticulation', 'ablation', 'émasculation', 'castration'], weight: 20 },
    ankylose: { keywords: ['ankylose'], weight: 18 },
    fracture: { keywords: ['fracture', 'cassé', 'embarrure', 'tassement vertébral'], weight: 15 },
    pseudarthrose: { keywords: ['pseudarthrose'], weight: 15 },
    paralysie: { keywords: ['paralysie', 'plégie', 'parésie', 'hémiplégie', 'monoplégie', 'impotence'], weight: 14 },
    instabilite: { keywords: ['luxation', 'subluxation', 'laxité', 'ballant', 'dérobement', 'instabilité'], weight: 12 },
    blocage: { keywords: ['raideur', 'blocage', 'limitation', 'réduction mobilité', 'flexion permanente', 'extension permanente'], weight: 10 },
    rupture: { keywords: ['rupture', 'déchirure', 'rompu', 'arrachement'], weight: 10 },
    deformation: { keywords: ['déformation', 'cal vicieux', 'raccourcissement', 'angulation', 'enfoncement'], weight: 8 },
    troublesFonctionnels: { keywords: ['troubles', 'syndrome', 'épilepsie', 'vertiges', 'acouphènes', 'incontinence'], weight: 5 },
    douleur: { keywords: ['douleur', 'algie', 'névralgie', 'syndrome douloureux', 'coccygodynie', 'algodystrophie', 'gêne'], weight: 3 },
};

const severityKeywords: { [key: string]: { words: string[], score: number } } = {
    high: { words: ['sévère', 'important', 'grave', 'total', 'complet', 'majeur', 'très', 'fort', 'intense', 'absolue', 'complète', 'étendu', 'incontrôlée', 'fréquentes', 'prononcé', 'serrée', 'totale', 'très important', 'quasi-complète', 'majeure', 'ankylose', 'impotence fonctionnelle', 'paralysie', 'impossibilité'], score: 2 },
    medium: { words: ['modéré', 'notable', 'marqué', 'gênant'], score: 1 },
    low: { words: ['léger', 'discret', 'simple', 'mineur', 'partiel', 'incomplet', 'petite', 'bénin', 'légère', 'limité', 'occasionnel', 'intermittent', 'sans complication'], score: -1 }
};

const tiercePersonneKeywords = ['tierce personne', 'aide permanente', 'actes de la vie', 'dépendant', 'ne peut plus s\'habiller', 'assistance constante'];
const infirmiteAnterieureKeywords = ['antécédent', 'deja connu pour', 'souffrait deja de', 'infirmité antérieure', 'état antérieur'];


const normalizeText = (text: string): string => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, ' ');

type AnalysisResultData = { 
    injuries: SelectedInjury[], 
    flags: { hasPreexisting: boolean },
    notes: string[] 
};

type AnalysisResult = 
    | { type: 'RESULTS', data: AnalysisResultData, summary: string }
    | { type: 'NO_MATCH', summary: string };

const expertLocalAnalyzer = (userDescription: string): AnalysisResult => {
    // 1. Analyse globale pour les flags et notes
    const normalizedFullText = normalizeText(userDescription);
    const flags = { hasPreexisting: false };
    const notes: string[] = [];

    if (infirmiteAnterieureKeywords.some(kw => normalizedFullText.includes(kw))) {
        flags.hasPreexisting = true;
        notes.push("Un état antérieur a été détecté. La case correspondante sera cochée pour appliquer le calcul selon la formule de l'incapacité antérieure (Art. 14).");
    }

    if (tiercePersonneKeywords.some(kw => normalizedFullText.includes(kw))) {
        notes.push("Le besoin d'une <strong>assistance par une tierce personne</strong> a été détecté. Si le taux global d'incapacité atteint 100%, une majoration de 40% de la rente peut s'appliquer (Art. 30).");
    }

    // 2. Segmentation du cas clinique pour les lésions
    const segments = userDescription
        .split(/\. | et | ainsi que | avec également |, /)
        .map(s => s.trim())
        .filter(s => s.length > 15 && s.split(' ').length > 2);

    if (segments.length === 0) {
        segments.push(userDescription);
    }

    const identifiedInjuries: SelectedInjury[] = [];
    const usedInjuryNames = new Set<string>();

    for (const segment of segments) {
        const normalizedSegment = normalizeText(segment);
        let bestMatch: { injury: Injury; category: string; subcategory: string; score: number; matchedKeywords: string[] } | null = null;
        let highestScore = 0;

        disabilityData.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.injuries.forEach(injury => {
                    if (usedInjuryNames.has(injury.name)) return;

                    const normInjuryName = normalizeText(injury.name);
                    let score = 0;
                    const matchedKeywords = new Set<string>();

                    Object.values(injuryTypeKeywords).forEach(type => {
                        type.keywords.forEach(kw => {
                            if (normalizedSegment.includes(kw) && normInjuryName.includes(kw)) {
                                score += type.weight;
                                matchedKeywords.add(kw);
                            }
                        });
                    });

                    const injuryNameWords = new Set(normInjuryName.split(' ').filter(w => w.length > 3));
                    const segmentWords = new Set(normalizedSegment.split(' ').filter(w => w.length > 3));

                    injuryNameWords.forEach(word => {
                        if (segmentWords.has(word)) {
                            score += 5;
                        }
                    });

                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = { injury, category: category.name, subcategory: subcategory.name, score, matchedKeywords: [...matchedKeywords] };
                    }
                });
            });
        });

        if (bestMatch && bestMatch.score > 10) { 
            const { injury, category, subcategory, matchedKeywords } = bestMatch;
            
            let chosenRate: number;
            let severityJustification = "";
            if (Array.isArray(injury.rate)) {
                const [min, max] = injury.rate;
                let severityScore = 0;
                
                Object.values(severityKeywords).forEach(level => {
                    level.words.forEach(word => {
                        if (normalizedSegment.includes(word)) {
                            severityScore += level.score;
                            severityJustification = `Le terme "<strong>${word}</strong>" a influencé le choix du taux.`;
                        }
                    });
                });

                if (severityScore >= 2) {
                    chosenRate = max;
                } else if (severityScore <= -1) {
                    chosenRate = min;
                } else {
                    chosenRate = Math.round((min + max) / 2);
                }
            } else {
                chosenRate = injury.rate;
            }

            const justification = `L'IA a identifié la lésion "<strong>${injury.name}</strong>" dans le segment "<em>${segment}</em>" sur la base des mots-clés : <em>${matchedKeywords.join(', ')}</em>. Le taux de <strong>${chosenRate}%</strong> a été retenu. ${severityJustification}`;

            identifiedInjuries.push({
                ...injury,
                id: crypto.randomUUID(),
                chosenRate: chosenRate,
                category: `${category} > ${subcategory}`,
                justification: justification
            });
            usedInjuryNames.add(injury.name);
        }
    }

    if (identifiedInjuries.length > 0) {
        let summary = `J'ai analysé le cas clinique et identifié ${identifiedInjuries.length} lésion(s) pertinente(s) :\n`;
        identifiedInjuries.forEach(inj => {
            summary += `\n- <strong>${inj.name}</strong>, avec un taux estimé à <strong>${inj.chosenRate}%</strong>.`;
        });
        if (notes.length > 0) {
            summary += `\n\nJ'ai également noté des éléments importants pour le calcul. L'ensemble des conclusions sera ajouté à l'analyse.`
        } else {
            summary += `\n\nJe vais ajouter ces lésions à l'analyse. Vous pouvez consulter les détails de mon raisonnement pour chaque lésion.`;
        }
        
        return {
            type: 'RESULTS',
            data: { injuries: identifiedInjuries, flags, notes },
            summary: summary
        };
    }

    return { type: 'NO_MATCH', summary: "Mon analyse n'a pas permis d'identifier de lésions spécifiques dans le barème à partir de votre description. Pourriez-vous reformuler en utilisant des termes médicaux plus précis (ex: 'fracture', 'raideur', 'paralysie') et en décrivant une lésion à la fois ?" };
};


export const AiAnalyzer: React.FC<AiAnalyzerProps> = ({ onAnalysisComplete }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: crypto.randomUUID(), role: 'model', text: "Bonjour, je suis l'expert IA. Décrivez-moi l'ensemble du cas clinique de la victime (ex: 'Chute d'un échafaudage avec fracture ouverte du tibia droit et impotence fonctionnelle, ainsi qu'une fracture du poignet gauche avec raideur modérée.')." }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const addMessage = (role: 'user' | 'model', text: string) => {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role, text }]);
    };
    
    const handleSend = async () => {
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isLoading) return;

        addMessage('user', trimmedInput);
        setUserInput('');
        setIsLoading(true);
        
        await new Promise(res => setTimeout(res, 750));

        const analysis = expertLocalAnalyzer(trimmedInput);
        setIsLoading(false);

        switch(analysis.type) {
            case 'RESULTS':
                addMessage('model', analysis.summary);
                onAnalysisComplete(analysis.data);
                break;
            case 'NO_MATCH':
                addMessage('model', analysis.summary);
                break;
        }
    };


    return (
        <div className="bg-primary-50 rounded-xl p-4 shadow-md flex flex-col h-[600px] max-h-[70vh]">
            <h3 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11 17.25l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 12l.648 1.938a3.375 3.375 0 002.672 2.672L21.5 17.25l-1.938.648a3.375 3.375 0 00-2.672 2.672z" />
                </svg>
                Assistant Expert IA
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4 bg-slate-100/70 rounded-lg">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="mt-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={"Décrivez les lésions ici..."}
                        className="flex-1 w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50 text-black placeholder:text-slate-500 bg-white"
                        aria-label="Description des lésions"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading || !userInput.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};