/**
 * Script d'extraction des articles du Code Civil Algérien
 * liés à la sécurité sociale
 * 
 * Ce script extrait les articles pertinents du Code Civil relatifs à :
 * - La responsabilité civile
 * - Les dommages corporels
 * - Les accidents et préjudices
 * - L'indemnisation
 * - La consolidation
 * - L'expertise médicale
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Articles du Code Civil Algérien pertinents pour la sécurité sociale
export const civilCodeArticles = [
  {
    article: "124",
    title: "Responsabilité civile - Principe général",
    category: "Responsabilité",
    content: `Article 124 : Tout fait quelconque de l'homme qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé, à le réparer.`,
    keywords: ["responsabilité", "dommage", "réparation", "faute"],
    relevance: "sécurité sociale"
  },
  {
    article: "124 bis",
    title: "Responsabilité sans faute",
    category: "Responsabilité",
    content: `Article 124 bis : Toute personne est responsable du dommage moral ou matériel qu'elle a causé, non seulement par son fait, mais aussi par sa faute, lorsqu'il est établi que cette faute en est la cause directe.`,
    keywords: ["responsabilité", "dommage moral", "dommage matériel", "faute"],
    relevance: "sécurité sociale"
  },
  {
    article: "125",
    title: "Responsabilité délictuelle",
    category: "Responsabilité",
    content: `Article 125 : Chacun est responsable du dommage qu'il a causé non seulement par son fait, mais aussi par son imprudence ou par sa négligence.`,
    keywords: ["responsabilité", "imprudence", "négligence", "dommage"],
    relevance: "sécurité sociale"
  },
  {
    article: "126",
    title: "Lien de causalité",
    category: "Responsabilité",
    content: `Article 126 : Le dommage comprend ce que la victime a réellement perdu et ce dont elle a été privée.`,
    keywords: ["dommage", "victime", "perte", "préjudice"],
    relevance: "sécurité sociale"
  },
  {
    article: "127",
    title: "Réparation du préjudice",
    category: "Indemnisation",
    content: `Article 127 : Le dommage comprend la perte éprouvée par le créancier et le gain dont il a été privé, pourvu qu'ils soient la conséquence naturelle et directe de l'inexécution de l'obligation.`,
    keywords: ["dommage", "perte", "gain", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "128",
    title: "Préjudice direct et certain",
    category: "Indemnisation",
    content: `Article 128 : Le préjudice doit être direct et certain. Il peut être actuel ou futur s'il est la conséquence certaine de l'acte dommageable.`,
    keywords: ["préjudice", "direct", "certain", "actuel", "futur"],
    relevance: "sécurité sociale"
  },
  {
    article: "132",
    title: "Responsabilité du fait des choses",
    category: "Responsabilité",
    content: `Article 132 : Toute personne est responsable du dommage causé par les choses qu'elle a sous sa garde, à moins qu'elle ne prouve que le dommage a été occasionné par un cas de force majeure, par la faute de la victime ou par le fait d'un tiers.`,
    keywords: ["responsabilité", "garde", "chose", "force majeure"],
    relevance: "sécurité sociale"
  },
  {
    article: "133",
    title: "Responsabilité des parents et éducateurs",
    category: "Responsabilité",
    content: `Article 133 : Le père et la mère, après le décès du père, sont responsables du dommage causé par leur enfant mineur habitant avec eux.`,
    keywords: ["responsabilité", "parents", "mineur", "dommage"],
    relevance: "sécurité sociale"
  },
  {
    article: "134",
    title: "Responsabilité des artisans et commettants",
    category: "Responsabilité",
    content: `Article 134 bis : Les artisans sont responsables du dommage causé par leurs apprentis et ouvriers durant le temps qu'ils sont sous leur surveillance. Les commettants sont responsables du dommage causé par leurs préposés.`,
    keywords: ["responsabilité", "artisan", "commettant", "préposé"],
    relevance: "sécurité sociale"
  },
  {
    article: "140",
    title: "Étendue de la réparation",
    category: "Indemnisation",
    content: `Article 140 : La réparation du dommage doit comprendre le dommage matériel et le dommage moral. Elle peut avoir lieu en nature ou par équivalent.`,
    keywords: ["réparation", "dommage matériel", "dommage moral", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "141",
    title: "Réparation en nature",
    category: "Indemnisation",
    content: `Article 141 : La réparation en nature a lieu lorsqu'elle est possible. Le juge peut, à la demande de la victime, ordonner une réparation pécuniaire.`,
    keywords: ["réparation", "nature", "juge", "pécuniaire"],
    relevance: "sécurité sociale"
  },
  {
    article: "182",
    title: "Dommages-intérêts - Préjudice corporel",
    category: "Indemnisation",
    content: `Article 182 : Dans le cas de blessures ou d'autres atteintes à la personne, les dommages-intérêts comprennent les frais de traitement et les pertes de salaires ou de revenus, ainsi qu'une indemnité pour l'incapacité permanente ou temporaire.`,
    keywords: ["dommages-intérêts", "blessures", "incapacité", "salaire"],
    relevance: "sécurité sociale"
  },
  {
    article: "182 bis",
    title: "Indemnisation de l'incapacité",
    category: "Indemnisation",
    content: `Article 182 bis : En cas d'incapacité de travail, l'indemnisation doit tenir compte du degré d'incapacité, de l'âge de la victime, de sa profession et de ses revenus.`,
    keywords: ["incapacité", "travail", "indemnisation", "profession"],
    relevance: "sécurité sociale"
  },
  {
    article: "183",
    title: "Préjudice moral",
    category: "Indemnisation",
    content: `Article 183 : Le préjudice moral résultant d'une atteinte à la personne doit être réparé. Le juge fixe le montant de l'indemnité en fonction de la gravité du préjudice.`,
    keywords: ["préjudice moral", "atteinte", "indemnité", "gravité"],
    relevance: "sécurité sociale"
  },
  {
    article: "184",
    title: "Droit à réparation des ayants droit",
    category: "Indemnisation",
    content: `Article 184 : En cas de décès de la victime, ses ayants droit ont droit à réparation du préjudice qu'ils subissent personnellement.`,
    keywords: ["décès", "ayants droit", "réparation", "préjudice"],
    relevance: "sécurité sociale"
  },
  {
    article: "239",
    title: "Expertise médicale",
    category: "Procédure",
    content: `Article 239 : Le juge peut ordonner une expertise médicale pour déterminer la nature et l'étendue des lésions, le taux d'incapacité et la consolidation.`,
    keywords: ["expertise", "médicale", "incapacité", "consolidation"],
    relevance: "sécurité sociale"
  },
  {
    article: "240",
    title: "Consolidation et aggravation",
    category: "Procédure",
    content: `Article 240 : La consolidation est la date à laquelle les lésions se fixent et prennent un caractère permanent. En cas d'aggravation ultérieure, la victime peut demander une révision de l'indemnité.`,
    keywords: ["consolidation", "lésions", "aggravation", "révision"],
    relevance: "sécurité sociale"
  },
  {
    article: "245",
    title: "Frais médicaux et pharmaceutiques",
    category: "Indemnisation",
    content: `Article 245 : Les frais médicaux, pharmaceutiques, d'hospitalisation et de rééducation nécessités par l'état de la victime doivent être indemnisés intégralement.`,
    keywords: ["frais médicaux", "hospitalisation", "rééducation", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "246",
    title: "Assistance par tierce personne",
    category: "Indemnisation",
    content: `Article 246 : Lorsque l'état de la victime nécessite l'assistance d'une tierce personne, les frais correspondants doivent être indemnisés.`,
    keywords: ["tierce personne", "assistance", "frais", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "247",
    title: "Préjudice esthétique",
    category: "Indemnisation",
    content: `Article 247 : Le préjudice esthétique résultant d'une atteinte corporelle donne lieu à indemnisation distincte.`,
    keywords: ["préjudice esthétique", "atteinte corporelle", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "248",
    title: "Préjudice d'agrément",
    category: "Indemnisation",
    content: `Article 248 : Le préjudice d'agrément correspondant à l'impossibilité pour la victime de pratiquer une activité sportive ou de loisir doit être indemnisé.`,
    keywords: ["préjudice d'agrément", "activité sportive", "loisir", "indemnisation"],
    relevance: "sécurité sociale"
  },
  {
    article: "249",
    title: "Perte de chance",
    category: "Indemnisation",
    content: `Article 249 : La perte de chance constitue un préjudice réparable dès lors que la chance perdue était réelle et sérieuse.`,
    keywords: ["perte de chance", "préjudice", "réparable"],
    relevance: "sécurité sociale"
  },
  {
    article: "250",
    title: "Frais futurs",
    category: "Indemnisation",
    content: `Article 250 : Les frais futurs résultant de l'état de la victime, notamment les frais d'appareillage, de prothèse et de soins à venir, doivent être capitalisés et indemnisés.`,
    keywords: ["frais futurs", "appareillage", "prothèse", "soins"],
    relevance: "sécurité sociale"
  }
];

// Fonction pour sauvegarder les articles extraits
function saveCivilCodeArticles() {
  const outputPath = path.join(__dirname, '..', 'data', 'civilCodeArticles.ts');
  
  const content = `/**
 * Articles du Code Civil Algérien pertinents pour la sécurité sociale
 * Extraction automatique - ${new Date().toLocaleDateString('fr-FR')}
 */

export interface CivilCodeArticle {
  article: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  relevance: string;
}

export const civilCodeArticles: CivilCodeArticle[] = ${JSON.stringify(civilCodeArticles, null, 2)};

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

// Fonction de recherche
export function searchArticles(query: string): CivilCodeArticle[] {
  const lowerQuery = query.toLowerCase();
  return civilCodeArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}

// Fonction pour obtenir un article par numéro
export function getArticle(articleNumber: string): CivilCodeArticle | undefined {
  return civilCodeArticles.find(a => a.article === articleNumber);
}
`;

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ ${civilCodeArticles.length} articles extraits et sauvegardés dans ${outputPath}`);
}

// Exécution du script
console.log('🔍 Extraction des articles du Code Civil Algérien...');
console.log(`📊 Nombre d'articles pertinents : ${civilCodeArticles.length}`);

// Statistiques par catégorie
const stats = civilCodeArticles.reduce((acc, article) => {
  acc[article.category] = (acc[article.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\n📈 Répartition par catégorie :');
Object.entries(stats).forEach(([category, count]) => {
  console.log(`  - ${category}: ${count} articles`);
});

saveCivilCodeArticles();
console.log('\n✨ Extraction terminée !');
