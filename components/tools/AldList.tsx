
import React, { useState, useMemo } from 'react';
import { aldData } from '../../data/aldList';
import type { AldItem } from '../../data/aldList';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const AldList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return aldData;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        
        return aldData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(lowercasedFilter);
            const subItemMatch = item.subItems?.some(sub => sub.toLowerCase().includes(lowercasedFilter));
            return nameMatch || subItemMatch;
        });

    }, [searchTerm]);

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">
                Consultez la liste des Affections de Longue Durée (ALD) qui ouvrent droit à une prise en charge à 100% par la sécurité sociale pour les soins liés à cette pathologie. Cette liste est à titre indicatif.
            </p>
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </span>
                <input
                    type="text"
                    placeholder="Rechercher une affection..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-2 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
            <div className="space-y-4">
                {filteredData.length > 0 ? (
                     <ul className="space-y-3">
                        {filteredData.map(item => (
                            <li key={item.name} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="font-semibold text-primary-700">{item.name}</p>
                                {item.subItems && (
                                    <ul className="list-disc list-inside text-sm text-slate-600 mt-2 pl-2 space-y-1">
                                        {item.subItems.map(subItem => (
                                            <li key={subItem}>{subItem}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                     <div className="text-center text-slate-500 mt-10">
                        <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};
