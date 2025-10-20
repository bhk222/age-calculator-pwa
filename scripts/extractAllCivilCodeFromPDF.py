#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'extraction de tous les articles du Code Civil Algérien depuis le PDF
Extrait le texte exact tel qu'il apparaît dans le PDF
"""

import PyPDF2
import re
import json
import os

def extract_text_from_pdf(pdf_path):
    """Extrait tout le texte du PDF"""
    print(f"📖 Lecture du PDF: {pdf_path}")
    text = ""
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            print(f"📄 Nombre de pages: {total_pages}")
            
            for page_num in range(total_pages):
                page = pdf_reader.pages[page_num]
                text += page.extract_text() + "\n"
                
                if (page_num + 1) % 10 == 0:
                    print(f"   Traité: {page_num + 1}/{total_pages} pages")
        
        print(f"✅ Extraction terminée: {len(text)} caractères")
        return text
    
    except Exception as e:
        print(f"❌ Erreur lors de l'extraction: {str(e)}")
        return None

def extract_articles(text):
    """Extrait tous les articles du texte"""
    print("\n🔍 Extraction des articles...")
    
    articles = []
    
    # Pattern pour détecter les articles
    # Format: "Article XXX" ou "Art. XXX" suivi du texte jusqu'au prochain article
    article_pattern = r'(?:Article|Art\.?)\s+(\d+(?:\s*bis|\s*ter)?)\s*[:\.\-]?\s*(.*?)(?=(?:Article|Art\.?)\s+\d+|$)'
    
    matches = re.finditer(article_pattern, text, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        article_num = match.group(1).strip()
        article_content = match.group(2).strip()
        
        # Nettoyer le contenu
        article_content = re.sub(r'\s+', ' ', article_content)  # Espaces multiples
        article_content = article_content[:2000]  # Limiter à 2000 caractères
        
        if len(article_content) > 10:  # Ignorer les articles vides
            articles.append({
                'number': article_num,
                'content': article_content
            })
    
    print(f"✅ {len(articles)} articles extraits")
    return articles

def categorize_article(article_num, content):
    """Détermine la catégorie et les mots-clés d'un article"""
    content_lower = content.lower()
    
    # Mots-clés pour la sécurité sociale
    ss_keywords = [
        'responsabilité', 'dommage', 'préjudice', 'indemnisation', 'réparation',
        'incapacité', 'invalidité', 'accident', 'travail', 'maladie',
        'professionnel', 'employeur', 'salarié', 'victime', 'consolidation',
        'expertise', 'médical', 'frais', 'soins', 'traitement', 'tierce personne',
        'esthétique', 'moral', 'corporel', 'faute', 'négligence', 'imprudence'
    ]
    
    # Vérifier si l'article est pertinent pour la sécurité sociale
    relevance_score = sum(1 for kw in ss_keywords if kw in content_lower)
    
    if relevance_score >= 2:
        # Catégoriser
        if any(word in content_lower for word in ['responsabilité', 'faute', 'négligence', 'imprudence']):
            category = 'Responsabilité'
        elif any(word in content_lower for word in ['indemnisation', 'réparation', 'dommage', 'préjudice']):
            category = 'Indemnisation'
        elif any(word in content_lower for word in ['expertise', 'consolidation', 'procédure']):
            category = 'Procédure'
        else:
            category = 'Général'
        
        # Extraire les mots-clés présents
        keywords = [kw for kw in ss_keywords if kw in content_lower]
        
        return True, category, keywords
    
    return False, None, []

def save_to_typescript(articles, output_path):
    """Sauvegarde les articles dans un fichier TypeScript"""
    print(f"\n💾 Sauvegarde dans: {output_path}")
    
    ts_content = """/**
 * Articles du Code Civil Algérien
 * Extraction automatique depuis Code_Civil.pdf
 * Date: """ + "19 octobre 2025" + """
 */

export interface CivilCodeArticle {
  number: string;
  content: string;
  category?: string;
  keywords?: string[];
  relevantForSS: boolean;
}

export const allCivilCodeArticles: CivilCodeArticle[] = [
"""
    
    for article in articles:
        # Échapper les guillemets et backslashes
        content = article['content'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        
        ts_content += f"""  {{
    number: "{article['number']}",
    content: "{content}",
"""
        
        if 'category' in article:
            ts_content += f"""    category: "{article['category']}",
"""
        
        if 'keywords' in article and article['keywords']:
            keywords_str = '", "'.join(article['keywords'])
            ts_content += f"""    keywords: ["{keywords_str}"],
"""
        
        ts_content += f"""    relevantForSS: {str(article.get('relevantForSS', False)).lower()}
  }},
"""
    
    ts_content += """];

// Articles pertinents pour la sécurité sociale
export const ssRelevantArticles = allCivilCodeArticles.filter(a => a.relevantForSS);

// Recherche par numéro
export function getArticle(number: string): CivilCodeArticle | undefined {
  return allCivilCodeArticles.find(a => a.number === number);
}

// Recherche par texte
export function searchArticles(query: string): CivilCodeArticle[] {
  const lowerQuery = query.toLowerCase();
  return allCivilCodeArticles.filter(a => 
    a.content.toLowerCase().includes(lowerQuery) ||
    (a.keywords && a.keywords.some(k => k.toLowerCase().includes(lowerQuery)))
  );
}

// Statistiques
export const stats = {
  total: allCivilCodeArticles.length,
  ssRelevant: ssRelevantArticles.length,
  categories: {} as Record<string, number>
};

allCivilCodeArticles.forEach(a => {
  if (a.category) {
    stats.categories[a.category] = (stats.categories[a.category] || 0) + 1;
  }
});
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"✅ Fichier TypeScript créé: {len(articles)} articles")

def main():
    print("=" * 60)
    print("🚀 EXTRACTION DU CODE CIVIL ALGÉRIEN")
    print("=" * 60)
    
    # Chemins
    pdf_path = os.path.join('data', 'Code_Civil.pdf')
    output_path = os.path.join('data', 'civilCodeComplete.ts')
    
    # Étape 1: Extraire le texte du PDF
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("❌ Impossible d'extraire le texte du PDF")
        return
    
    # Étape 2: Extraire les articles
    articles = extract_articles(text)
    if not articles:
        print("❌ Aucun article trouvé")
        return
    
    # Étape 3: Catégoriser les articles
    print("\n📊 Catégorisation des articles...")
    categorized_articles = []
    ss_relevant_count = 0
    
    for article in articles:
        is_relevant, category, keywords = categorize_article(
            article['number'], 
            article['content']
        )
        
        categorized_articles.append({
            'number': article['number'],
            'content': article['content'],
            'category': category,
            'keywords': keywords,
            'relevantForSS': is_relevant
        })
        
        if is_relevant:
            ss_relevant_count += 1
    
    print(f"✅ Articles pertinents pour SS: {ss_relevant_count}/{len(articles)}")
    
    # Étape 4: Sauvegarder
    save_to_typescript(categorized_articles, output_path)
    
    # Résumé
    print("\n" + "=" * 60)
    print("📊 RÉSUMÉ")
    print("=" * 60)
    print(f"Total articles extraits: {len(articles)}")
    print(f"Articles pertinents SS: {ss_relevant_count}")
    print(f"Fichier généré: {output_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()
