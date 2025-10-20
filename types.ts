
export interface Injury {
  name: string;
  rate: number | [number, number];
  description?: string;
  rateCriteria?: {
    low: string;
    medium?: string;
    high: string;
  }
}

export interface InjurySubcategory {
  name:string;
  injuries: Injury[];
}

export interface InjuryCategory {
  name: string;
  subcategories: InjurySubcategory[];
}

export interface SelectedInjury extends Injury {
  id: string;
  chosenRate: number;
  category?: string;
  rateRange?: string;
  justification?: string;
  socialRate?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  choices?: (Injury & { context?: 'clarification' | 'rate_choice', originalInjury?: Injury })[];
}

export interface ProfessionalDisease {
  tableau: string;
  name: string;
  description: string;
  delay: string;
  workList: string;
}

export interface DiseaseCategory {
    name: string;
    diseases: ProfessionalDisease[];
}

export interface Drug {
  name?: string;
  dci: string;
  dosage?: string;
  classe_therapeutique?: string;
  indications?: string[];
  posologie?: string[];
  contre_indications?: string[];
  interactions?: string[];
  remboursement?: string;
  // FIX: Added optional 'conditionnement' property to match data in drugList.ts
  conditionnement?: string;
}

export interface Appareillage {
  reference: string; // Ex: "SO 01", "701", "OS 16 N02"
  nom: string; // Ex: "Semelle orthopédique", "Chaussure orthopédique 701"
  categorie: string; // Ex: "Podo-orthèses", "Orthèses membres supérieurs"
  description: string; // Description complète du produit
  indications: string[]; // Liste des indications médicales
  criteres_conformite?: string[]; // Critères de conformité technique
  adjonctions?: string[]; // Adjonctions possibles (pour chaussures)
  remboursement?: string; // Taux de remboursement (80% ou 100%)
  type?: string; // "Grand appareillage" ou "Petit appareillage"
  image?: string; // Référence à l'image si disponible
  references_composees?: string[]; // Références composées (ex: "701 + AS47 + 709", "TR 12 D 01", "PI 28 SS 14A")
}