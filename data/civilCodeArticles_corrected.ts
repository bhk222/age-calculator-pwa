/**
 * Code Civil Algérien - Articles pertinents pour la sécurité sociale
 * Version corrigée et enrichie - Octobre 2025
 */

export interface CivilCodeArticle {
  article: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  relevance: string;
}

export const civilCodeArticles: CivilCodeArticle[] = [
  // RESPONSABILITÉ CIVILE
  {
    "article": "124",
    "title": "Responsabilité civile - Principe général",
    "category": "Responsabilité",
    "content": "Article 124 : Tout fait quelconque de l'homme qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer.",
    "keywords": [
      "responsabilité",
      "dommage", 
      "réparation",
      "faute"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "124 bis",
    "title": "Responsabilité sans faute",
    "category": "Responsabilité",
    "content": "Article 124 bis : Toute personne est responsable du dommage moral ou matériel qu'elle a causé, non seulement par son fait, mais aussi par sa faute, lorsqu'il est établi que cette faute en est la cause directe.",
    "keywords": [
      "responsabilité",
      "dommage moral",
      "dommage matériel", 
      "faute",
      "cause directe"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "125",
    "title": "Responsabilité délictuelle",
    "category": "Responsabilité",
    "content": "Article 125 : Chacun est responsable du dommage qu'il a causé non seulement par son fait, mais aussi par son imprudence ou par sa négligence.",
    "keywords": [
      "responsabilité",
      "imprudence",
      "négligence",
      "dommage"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "134",
    "title": "Responsabilité des commettants",
    "category": "Responsabilité",
    "content": "Article 134 : Les commettants sont responsables du dommage causé par leurs préposés dans l'exercice de leurs fonctions.",
    "keywords": [
      "responsabilité",
      "commettant",
      "préposé",
      "fonction",
      "employeur"
    ],
    "relevance": "sécurité sociale"
  },

  // INDEMNISATION ET RÉPARATION
  {
    "article": "140",
    "title": "Étendue de la réparation",
    "category": "Indemnisation",
    "content": "Article 140 : La réparation du dommage doit comprendre le dommage matériel et le dommage moral. Elle peut avoir lieu en nature ou par équivalent.",
    "keywords": [
      "réparation",
      "dommage matériel",
      "dommage moral",
      "indemnisation",
      "équivalent"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "141",
    "title": "Réparation en nature",
    "category": "Indemnisation",
    "content": "Article 141 : La réparation en nature a lieu lorsqu'elle est possible. Le juge peut, à la demande de la victime, ordonner une réparation pécuniaire.",
    "keywords": [
      "réparation",
      "nature",
      "juge",
      "pécuniaire",
      "victime"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "182",
    "title": "Dommages-intérêts - Préjudice corporel",
    "category": "Indemnisation",
    "content": "Article 182 : Dans le cas de blessures ou d'autres atteintes à la personne, les dommages-intérêts comprennent les frais de traitement et les pertes de salaires ou de revenus, ainsi qu'une indemnité pour l'incapacité permanente ou temporaire.",
    "keywords": [
      "dommages-intérêts",
      "blessures",
      "incapacité permanente",
      "incapacité temporaire",
      "salaire",
      "traitement",
      "revenus"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "182 bis",
    "title": "Indemnisation de l'incapacité",
    "category": "Indemnisation", 
    "content": "Article 182 bis : En cas d'incapacité de travail, l'indemnisation doit tenir compte du degré d'incapacité, de l'âge de la victime, de sa profession et de ses revenus antérieurs.",
    "keywords": [
      "incapacité",
      "travail",
      "indemnisation",
      "profession",
      "âge",
      "revenus",
      "degré"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "183",
    "title": "Préjudice moral",
    "category": "Indemnisation",
    "content": "Article 183 : Le préjudice moral résultant d'une atteinte à la personne doit être réparé. Le juge fixe le montant de l'indemnité en fonction de la gravité du préjudice.",
    "keywords": [
      "préjudice moral",
      "atteinte",
      "personne",
      "indemnité",
      "gravité",
      "juge"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "184",
    "title": "Droit à réparation des ayants droit",
    "category": "Indemnisation",
    "content": "Article 184 : En cas de décès de la victime, ses ayants droit ont droit à réparation du préjudice qu'ils subissent personnellement du fait de ce décès.",
    "keywords": [
      "décès",
      "ayants droit",
      "réparation",
      "préjudice personnel",
      "famille"
    ],
    "relevance": "sécurité sociale"
  },

  // EXPERTISE ET PROCÉDURE
  {
    "article": "239",
    "title": "Expertise médicale",
    "category": "Procédure",
    "content": "Article 239 : Le juge peut ordonner une expertise médicale pour déterminer la nature et l'étendue des lésions, le taux d'incapacité et la date de consolidation.",
    "keywords": [
      "expertise",
      "médicale",
      "lésions",
      "incapacité",
      "consolidation",
      "juge",
      "taux"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "240",
    "title": "Consolidation et aggravation",
    "category": "Procédure",
    "content": "Article 240 : La consolidation est la date à laquelle les lésions se fixent et prennent un caractère permanent. En cas d'aggravation ultérieure, la victime peut demander une révision de l'indemnité.",
    "keywords": [
      "consolidation",
      "lésions",
      "permanent",
      "aggravation",
      "révision",
      "indemnité"
    ],
    "relevance": "sécurité sociale"
  },

  // FRAIS ET PRESTATIONS
  {
    "article": "245",
    "title": "Frais médicaux et pharmaceutiques",
    "category": "Indemnisation",
    "content": "Article 245 : Les frais médicaux, pharmaceutiques, d'hospitalisation et de rééducation nécessités par l'état de la victime doivent être indemnisés intégralement.",
    "keywords": [
      "frais médicaux",
      "pharmaceutiques",
      "hospitalisation",
      "rééducation",
      "indemnisation intégrale"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "246",
    "title": "Assistance par tierce personne",
    "category": "Indemnisation",
    "content": "Article 246 : Lorsque l'état de la victime nécessite l'assistance d'une tierce personne pour les actes ordinaires de la vie, les frais correspondants doivent être indemnisés.",
    "keywords": [
      "tierce personne",
      "assistance",
      "actes ordinaires",
      "vie quotidienne",
      "frais",
      "indemnisation"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "247", 
    "title": "Préjudice esthétique",
    "category": "Indemnisation",
    "content": "Article 247 : Le préjudice esthétique résultant d'une atteinte corporelle donne lieu à indemnisation distincte du préjudice fonctionnel.",
    "keywords": [
      "préjudice esthétique",
      "atteinte corporelle",
      "indemnisation distincte",
      "préjudice fonctionnel"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "248",
    "title": "Préjudice d'agrément",
    "category": "Indemnisation",
    "content": "Article 248 : Le préjudice d'agrément correspondant à l'impossibilité pour la victime de pratiquer une activité sportive ou de loisir doit être indemnisé.",
    "keywords": [
      "préjudice d'agrément",
      "activité sportive",
      "loisir",
      "impossibilité",
      "indemnisation"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "249",
    "title": "Perte de chance",
    "category": "Indemnisation",
    "content": "Article 249 : La perte de chance constitue un préjudice réparable dès lors que la chance perdue était réelle et sérieuse.",
    "keywords": [
      "perte de chance",
      "préjudice réparable",
      "chance réelle",
      "chance sérieuse"
    ],
    "relevance": "sécurité sociale"
  },
  {
    "article": "250",
    "title": "Frais futurs",
    "category": "Indemnisation",
    "content": "Article 250 : Les frais futurs résultant de l'état de la victime, notamment les frais d'appareillage, de prothèse et de soins à venir, doivent être capitalisés et indemnisés.",
    "keywords": [
      "frais futurs",
      "appareillage",
      "prothèse",
      "soins futurs",
      "capitalisation",
      "indemnisation"
    ],
    "relevance": "sécurité sociale"
  },

  // PRESCRIPTION ET DÉLAIS
  {
    "article": "308",
    "title": "Prescription de l'action en responsabilité",
    "category": "Procédure",
    "content": "Article 308 : L'action en responsabilité civile se prescrit par trois ans à partir du jour où la partie lésée a eu connaissance du dommage et de la personne responsable.",
    "keywords": [
      "prescription",
      "responsabilité civile",
      "trois ans",
      "connaissance",
      "dommage",
      "responsable"
    ],
    "relevance": "sécurité sociale"
  },

  // ACCIDENTS DE TRAVAIL SPÉCIFIQUES
  {
    "article": "554",
    "title": "Responsabilité décennale",
    "category": "Responsabilité",
    "content": "Article 554 : Si l'édifice s'écroule en tout ou en partie, ou s'il présente des défauts qui le menacent ruine, l'architecte et l'entrepreneur sont responsables conjointement pendant dix ans.",
    "keywords": [
      "responsabilité décennale",
      "architecte",
      "entrepreneur",
      "édifice",
      "défauts",
      "dix ans"
    ],
    "relevance": "sécurité sociale"
  }
];

// Index par catégorie
export const articlesByCategory = {
  'Responsabilité': civilCodeArticles.filter(a => a.category === 'Responsabilité'),
  'Indemnisation': civilCodeArticles.filter(a => a.category === 'Indemnisation'),
  'Procédure': civilCodeArticles.filter(a => a.category === 'Procédure')
};

// Index par mot-clé
export const articlesByKeyword = civilCodeArticles.reduce((acc, article) => {
  article.keywords.forEach(keyword => {
    if (!acc[keyword]) acc[keyword] = [];
    acc[keyword].push(article);
  });
  return acc;
}, {} as Record<string, CivilCodeArticle[]>);

// Fonction de recherche améliorée
export function searchArticles(query: string): CivilCodeArticle[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);
  
  return civilCodeArticles.filter(article => {
    // Recherche dans le titre
    const titleMatch = article.title.toLowerCase().includes(lowerQuery);
    
    // Recherche dans le contenu
    const contentMatch = article.content.toLowerCase().includes(lowerQuery);
    
    // Recherche dans les mots-clés
    const keywordMatch = article.keywords.some(k => 
      k.toLowerCase().includes(lowerQuery) ||
      words.some(word => k.toLowerCase().includes(word))
    );
    
    // Recherche par numéro d'article
    const articleNumberMatch = article.article === query;
    
    return titleMatch || contentMatch || keywordMatch || articleNumberMatch;
  }).sort((a, b) => {
    // Prioriser les correspondances exactes d'article
    if (a.article === query) return -1;
    if (b.article === query) return 1;
    
    // Prioriser les correspondances dans le titre
    const aTitle = a.title.toLowerCase().includes(lowerQuery);
    const bTitle = b.title.toLowerCase().includes(lowerQuery);
    if (aTitle && !bTitle) return -1;
    if (bTitle && !aTitle) return 1;
    
    return 0;
  });
}

// Fonction pour obtenir un article par numéro
export function getArticle(articleNumber: string): CivilCodeArticle | undefined {
  return civilCodeArticles.find(a => a.article === articleNumber);
}

// Fonction pour obtenir des articles liés
export function getRelatedArticles(article: CivilCodeArticle, limit: number = 3): CivilCodeArticle[] {
  const related = civilCodeArticles.filter(a => 
    a.article !== article.article && 
    (a.category === article.category ||
     a.keywords.some(k => article.keywords.includes(k)))
  );
  
  return related.slice(0, limit);
}

export default civilCodeArticles;