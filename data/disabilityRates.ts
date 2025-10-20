export interface SelectedInjury {
  name: string;
  chosenRate: number;
  maxRate: number;
  socialRate?: number;
  category: string;
  description?: string;
}

export interface InjuryCategory {
  name: string;
  injuries: Array<{
    name: string;
    rate: number | [number, number];
    description?: string;
    rateCriteria?: {
      low?: string;
      medium?: string;
      high?: string;
    };
  }>;
}

export interface CategoryGroup {
  name: string;
  categories: InjuryCategory[];
}

export const disabilityRates: CategoryGroup[] = [
  {
    name: "Membres Supérieurs",
    categories: [
      {
        name: "Doigts et Métacarpe - Raideurs Articulaires",
        injuries: [
          { 
            name: "Raideur Pouce - Articulation métacarpo-phalangienne (Main Dominante)", 
            rate: [1, 3], 
            description: "Limitation de mobilité de l'articulation de base du pouce",
            rateCriteria: { 
              low: "Légère limitation en fin de course (>80% mobilité), fonction de pince conservée (1%).", 
              high: "Raideur marquée gênant l'enroulement du pouce dans la paume (3%)." 
            }
          },
          { 
            name: "Raideur Pouce - Articulation métacarpo-phalangienne (Main Non Dominante)", 
            rate: [0, 2], 
            description: "Limitation de mobilité de l'articulation de base du pouce, main non dominante",
            rateCriteria: { 
              low: "Aucune gêne fonctionnelle notable (0%).", 
              high: "Légère gêne à la préhension de gros objets (2%)." 
            }
          },
          { 
            name: "Raideur Pouce - Articulation interphalangienne (Main Dominante)", 
            rate: [1, 2], 
            description: "Limitation de mobilité de l'articulation distale du pouce",
            rateCriteria: { 
              low: "Flexion/extension terminale limitée, pinces conservées (1%).", 
              medium: "Limitation notable de la flexion, gêne pour objets fins (1.5%).", 
              high: "Articulation quasi-rigide, pinces très perturbées (2%)." 
            }
          }
        ]
      }
    ]
  },
  {
    name: "Membres Inférieurs", 
    categories: [
      {
        name: "Cuisse et Hanche",
        injuries: [
          { 
            name: "Fracture simple du col du fémur", 
            rate: [10, 35], 
            description: "Fracture du col fémoral avec consolidation",
            rateCriteria: {
              low: "Consolidation parfaite, mobilité conservée (10%).",
              medium: "Consolidation avec cal vicieux, boiterie modérée (22%).",
              high: "Pseudarthrose ou nécrose de la tête fémorale (35%)."
            }
          }
        ]
      }
    ]
  },
  {
    name: "Système Nerveux",
    categories: [
      {
        name: "Crâne et Encéphale",
        injuries: [
          { 
            name: "Syndrome subjectif commun des blessures du crâne", 
            rate: [5, 50], 
            description: "Syndrome post-traumatique crânien avec céphalées, vertiges, troubles de l'humeur",
            rateCriteria: {
              low: "Syndrome post-commotionnel léger avec céphalées intermittentes (5%).",
              medium: "Syndrome modéré avec vertiges fréquents et troubles mémoire (27%).",
              high: "Syndrome sévère invalidant, céphalées chroniques, troubles cognitifs majeurs (50%)."
            }
          }
        ]
      }
    ]
  }
];

// Export pour compatibilité avec les composants existants
export const disabilityData = disabilityRates;

export default disabilityRates;