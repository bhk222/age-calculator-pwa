
export interface AldItem {
  name: string;
  subItems?: string[];
}

// Source: Liste des 26 affections donnant droit aux prestations en nature prise en charge à 100%
export const aldData: AldItem[] = [
  { name: "C1- La tuberculose sous toutes ses formes" },
  { name: "C2- Les psychonévroses graves" },
  { name: "C3- Les Maladies cancéreuses" },
  { name: "C4- Les hémopathies" },
  { name: "C5- La sarcoïdose" },
  { name: "C6- L’hypertension artérielle maligne" },
  {
    name: "C7- Les maladies cardiaques et vasculaires suivantes :",
    subItems: [
      "Angine de poitrine",
      "Infarctus du myocarde",
      "Pontage aorto-coronarien",
      "Remplacement valvulaire prothétique",
      "Valvulopathie décompensée",
      "Maladies athéromateuses évoluées",
      "Artérite des membres inférieurs",
      "Accident vasculaire cérébral, méningé ou cérébro-méningé",
      "Troubles du rythme avec stimulateur",
    ],
  },
  {
    name: "C8- Les maladies neurologiques suivantes:",
    subItems: [
      "Sclérose en plaques",
      "Syndromes extra pyramidaux",
      "Paraplégies Hémiplégies",
      "Epilepsies du lobe temporal, myocloniques progressives et post traumatiques",
    ],
  },
  {
    name: "C9- Maladies musculaires ou neuromusculaires suivantes :",
    subItems: [
      "Polynévrites",
      "Amyotrophies spinales progressives",
      "Myopathies",
      "Myasthénies",
    ],
  },
  { name: "C10- Les encéphalopathies" },
  { name: "C11- Les néphropathies" },
  {
    name: "C12- Les rhumatismes chroniques inflammatoires ou dégénératifs suivants :",
    subItems: [
      "Spondylarthrite ankylosante",
      "Polyarthrite rhumatoïde",
      "Arthroses graves",
    ],
  },
  { name: "C13- La périarthrite noueuse" },
  { name: "C14- Le lupus érythémateux disséminé" },
  { name: "C15- Les insuffisances respiratoires chroniques par obstruction ou restriction" },
  { name: "C16- La poliomyélite antérieure aiguë" },
  {
    name: "C17- Les maladies métaboliques suivantes :",
    subItems: ["Diabètes", "Dysprotéïnémies", "Dyslipoïdoses"],
  },
  { name: "C18- Les cardiopathies congénitales" },
  { name: "C19- Les affections endocriniennes complexes" },
  { name: "C20- Le rhumatisme articulaire aigu" },
  { name: "C21- L’ostéomyélite chronique" },
  { name: "C22- Les complications graves et durables des gastrectomies et de la maladie ulcéreuse" },
  { name: "C23- La cirrhose du foie" },
  { name: "C24- La rectocolite hémorragique" },
  { name: "C25- Le pemphigus malin et le psoriasis" },
  { name: "C26- L’hydatidose et ses complications" },
];
