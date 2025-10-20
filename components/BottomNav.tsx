

import React from 'react';

const CalculatorIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const GuideIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const DiseasesIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ToolsIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AppareillageIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);


interface NavButtonProps {
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

  const NavButton = ({ icon, label, isActive, onClick }: NavButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 min-w-[60px] ${
          isActive 
            ? 'bg-slate-600 text-white shadow-lg shadow-slate-600/40' 
            : 'text-gray-500 hover:bg-gray-100'
        }`}
      >
        {icon}
        <span className={`text-xs font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isActive ? 'max-w-[80px] ml-1' : 'max-w-0'
        }`}>
          {isActive ? label : ''}
        </span>
      </button>
    );
  };

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'calculator', label: 'Calcul', icon: (isActive: boolean) => <CalculatorIcon isActive={isActive} /> },
    { id: 'legislative', label: 'Juridique', icon: (isActive: boolean) => <GuideIcon isActive={isActive} /> },
    { id: 'diseases', label: 'Maladies', icon: (isActive: boolean) => <DiseasesIcon isActive={isActive} /> },
    { id: 'appareillage', label: 'Appareillage', icon: (isActive: boolean) => <AppareillageIcon isActive={isActive} /> },
    { id: 'tools', label: 'Outils', icon: (isActive: boolean) => <ToolsIcon isActive={isActive} /> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-2xl rounded-full shadow-2xl px-1.5 py-1.5 border border-white/30">
            {tabs.map((tab) => (
                <NavButton 
                    key={tab.id}
                    label={tab.label}
                    icon={tab.icon(activeTab === tab.id)}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                />
            ))}
        </div>
    </nav>
  );
};