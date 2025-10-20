
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Drug } from '../../types';
import { localDrugDatabase } from '../../data/drugList';

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const commonAbbreviations = [
    { abbr: "cp", full: "comprimé" }, { abbr: "gél", full: "gélule" },
    { abbr: "inj", full: "injectable" }, { abbr: "sirop", full: "sirop" },
    { abbr: "gtt", full: "gouttes" }, { abbr: "matin", full: "matin" },
    { abbr: "midi", full: "midi" }, { abbr: "soir", full: "soir" },
    { abbr: "pdt", full: "pendant" }, { abbr: "jrs", full: "jours" },
    { abbr: "1/j", full: "1 fois par jour" }, { abbr: "2/j", full: "2 fois par jour" },
    { abbr: "3/j", full: "3 fois par jour" }, { abbr: "si besoin", full: "si besoin" },
];

export const HandwritingDecipher: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [transcription, setTranscription] = useState('');
    const [suggestions, setSuggestions] = useState<Drug[]>([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleTranscriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTranscription(text);

        const cursorPos = e.target.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPos);
        const lastWord = textBeforeCursor.split(/[\s\n]+/).pop();

        if (lastWord && lastWord.length > 2) {
            const lowerLastWord = lastWord.toLowerCase();
            const foundSuggestions = localDrugDatabase.filter(drug =>
                (drug.name?.toLowerCase().startsWith(lowerLastWord) || drug.dci.toLowerCase().startsWith(lowerLastWord))
            ).slice(0, 5);
            setSuggestions(foundSuggestions);
            setActiveSuggestion(0);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion(prev => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeSuggestion]);
        } else if (e.key === 'Escape') {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (drug: Drug) => {
        if (!textareaRef.current) return;
        const drugName = drug.name || drug.dci;
        const cursorPos = textareaRef.current.selectionStart;
        const textBeforeCursor = transcription.substring(0, cursorPos);
        const lastWordIndex = textBeforeCursor.search(/\S+$/);
        const newText = textBeforeCursor.substring(0, lastWordIndex) + drugName + " " + transcription.substring(cursorPos);

        setTranscription(newText);
        setSuggestions([]);

        setTimeout(() => {
            const newCursorPos = lastWordIndex + drugName.length + 1;
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const insertAbbreviation = (text: string) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const currentText = textareaRef.current.value;
        const newText = currentText.substring(0, start) + text + " " + currentText.substring(end);
        setTranscription(newText);
        
        setTimeout(() => {
            textareaRef.current?.focus();
            const newCursorPos = start + text.length + 1;
            textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">Prenez une photo d'une ordonnance, puis utilisez la zone de texte intelligente ci-dessous. Commencez à taper un nom de médicament pour obtenir des suggestions.</p>
            
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            
            {!imagePreview ? (
                 <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-primary-500 transition-colors">
                    <UploadIcon />
                    <span className="mt-2 text-sm font-medium text-slate-600">Cliquez pour prendre ou choisir une photo</span>
                </button>
            ) : (
                <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-2 bg-gray-100">
                        <img src={imagePreview} alt="Aperçu de l'ordonnance" className="max-h-60 w-auto mx-auto rounded-md shadow-md" />
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()} variant="secondary">Changer l'image</Button>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Zone de Transcription Assistée</h3>
                <div className="mb-2">
                    <p className="text-xs text-slate-500 mb-2">Aides rapides :</p>
                    <div className="flex flex-wrap gap-1.5">
                        {commonAbbreviations.map(item => (
                            <button key={item.abbr} onClick={() => insertAbbreviation(item.full)} title={item.full} className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full hover:bg-slate-300 transition">
                                {item.abbr}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={transcription}
                        onChange={handleTranscriptionChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Commencez à transcrire ici... L'assistant vous aidera."
                        className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50"
                        aria-label="Zone de transcription"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={`${suggestion.dci}-${index}`}
                                    className={`px-3 py-2 cursor-pointer text-sm ${index === activeSuggestion ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <span className="font-bold">{suggestion.name || suggestion.dci}</span>
                                    <span className="text-xs ml-2">({suggestion.dci})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
