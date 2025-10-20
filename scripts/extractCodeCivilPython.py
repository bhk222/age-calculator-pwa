# -*- coding: utf-8 -*-
"""
Script d'extraction du Code Civil Algérien avec support de l'arabe
Utilise PyMuPDF (fitz) qui gère mieux l'encodage arabe
"""

import fitz  # PyMuPDF
import re
import json
from pathlib import Path

def extract_code_civil_with_arabic():
    """Extrait le Code Civil avec support complet de l'arabe"""
    
    pdf_path = Path(__file__).parent.parent / 'data' / 'Code_Civil.pdf'
    output_path = Path(__file__).parent.parent / 'data' / 'codeCivilComplet.ts'
    
    print(f"📜 Extraction du Code Civil Algérien (avec support arabe)...")
    print(f"📁 Source: {pdf_path}")
    
    # Ouvrir le PDF avec PyMuPDF
    doc = fitz.open(str(pdf_path))
    total_pages = len(doc)
    print(f"📄 Total de pages: {total_pages}")
    
    # Extraire tout le texte
    full_text = ""
    articles = {}  # Dictionnaire pour stocker les articles
    
    print(f"⏳ Extraction en cours...\n")
    
    for page_num in range(total_pages):
        page = doc[page_num]
        
        # Extraire le texte avec préservation de l'encodage
        text = page.get_text("text", flags=fitz.TEXT_PRESERVE_WHITESPACE | fitz.TEXT_PRESERVE_LIGATURES)
        full_text += text + "\n"
        
        # Progression
        if (page_num + 1) % 20 == 0:
            print(f"✓ Pages 1-{page_num + 1} traitées")
    
    print(f"✓ Pages 1-{total_pages} traitées\n")
    
    # Nettoyer le texte (sans supprimer l'arabe)
    cleaned_text = re.sub(r'\n{3,}', '\n\n', full_text)  # Réduire les sauts de ligne excessifs
    cleaned_text = re.sub(r' {2,}', ' ', cleaned_text)   # Réduire les espaces multiples
    
    # Extraire les articles individuels
    print("🔍 Extraction des articles individuels...")
    
    # Pattern pour détecter les articles (français et arabe)
    # Format: "Art. XXX" ou "Article XXX" ou "المادة XXX"
    article_pattern = r'(?:Art\.|Article|المادة)\s*(\d+(?:\s*(?:bis|ter|mكرر))?)[:\s\-–—]'
    
    matches = list(re.finditer(article_pattern, cleaned_text, re.MULTILINE | re.IGNORECASE))
    
    for i, match in enumerate(matches):
        article_num = match.group(1).strip()
        start_pos = match.start()
        
        # Trouver la fin de l'article (début du suivant ou fin du texte)
        if i + 1 < len(matches):
            end_pos = matches[i + 1].start()
        else:
            end_pos = len(cleaned_text)
        
        # Extraire le contenu de l'article
        article_content = cleaned_text[start_pos:end_pos].strip()
        
        # Nettoyer le contenu
        article_content = re.sub(r'\n{3,}', '\n\n', article_content)
        
        # Stocker l'article
        if article_num not in articles or len(article_content) > len(articles.get(article_num, '')):
            articles[article_num] = article_content
    
    print(f"✅ {len(articles)} articles extraits")
    
    # Statistiques
    total_chars = len(full_text)
    cleaned_chars = len(cleaned_text)
    
    print(f"\n✅ Extraction terminée")
    print(f"📊 Texte total: {total_chars:,} caractères")
    print(f"📊 Texte nettoyé: {cleaned_chars:,} caractères")
    print(f"📊 Articles identifiés: {len(articles)}")
    
    # Générer le fichier TypeScript
    ts_content = f'''/**
 * Code Civil Algérien - Version complète
 * Extraction automatique du PDF officiel
 * Date: {Path(__file__).stat().st_mtime}
 * Pages: {total_pages}
 * Caractères: {cleaned_chars:,}
 * Articles: {len(articles)}
 * 
 * ⚠️ Ce fichier contient du texte en français et en arabe
 */

export const codeCivilMetadata = {{
  dateExtraction: new Date().toISOString(),
  nombrePages: {total_pages},
  tailleCaracteres: {cleaned_chars},
  nombreArticles: {len(articles)},
  source: "Code_Civil.pdf",
  encodage: "UTF-8 avec support arabe"
}};

// Texte complet du Code Civil
export const codeCivilComplet = `{cleaned_text.replace('`', '\\`').replace('${', '\\${')}`;

// Articles individuels extraits
export const codeCivilArticles: Record<string, string> = {json.dumps(articles, ensure_ascii=False, indent=2)};

/**
 * Recherche un article spécifique par son numéro
 */
export function rechercherArticle(numero: string): string | null {{
  const numNormalized = numero.trim().toLowerCase();
  
  // Recherche directe dans le dictionnaire
  for (const [key, value] of Object.entries(codeCivilArticles)) {{
    if (key.toLowerCase() === numNormalized) {{
      return value;
    }}
  }}
  
  // Recherche dans le texte complet
  const patterns = [
    new RegExp(`Art\\.\\s*${{numero}}[:\\s\\-–—]([\\s\\S]{{0,2000}}?)(?=Art\\.|المادة|$)`, 'i'),
    new RegExp(`Article\\s*${{numero}}[:\\s\\-–—]([\\s\\S]{{0,2000}}?)(?=Art\\.|المادة|$)`, 'i'),
    new RegExp(`المادة\\s*${{numero}}[:\\s\\-–—]([\\s\\S]{{0,2000}}?)(?=Art\\.|المادة|$)`, 'i')
  ];
  
  for (const pattern of patterns) {{
    const match = codeCivilComplet.match(pattern);
    if (match) {{
      return match[0].trim();
    }}
  }}
  
  return null;
}}

/**
 * Recherche par mot-clé dans le Code Civil complet
 */
export function rechercherDansCodeCivil(motCle: string): {{
  trouve: boolean;
  resultats: Array<{{ extrait: string; position: number }}>;
  nombreOccurrences: number;
}} {{
  const motCleNormalized = motCle.toLowerCase();
  const resultats: Array<{{ extrait: string; position: number }}> = [];
  
  let position = 0;
  let texte = codeCivilComplet.toLowerCase();
  
  while (position < texte.length) {{
    const index = texte.indexOf(motCleNormalized, position);
    if (index === -1) break;
    
    // Extraire un contexte autour du mot-clé
    const debut = Math.max(0, index - 150);
    const fin = Math.min(codeCivilComplet.length, index + motCle.length + 150);
    const extrait = codeCivilComplet.substring(debut, fin);
    
    resultats.push({{ extrait, position: index }});
    position = index + motCle.length;
  }}
  
  return {{
    trouve: resultats.length > 0,
    resultats: resultats.slice(0, 5), // Limiter à 5 résultats
    nombreOccurrences: resultats.length
  }};
}}
'''
    
    # Écrire le fichier
    output_path.write_text(ts_content, encoding='utf-8')
    
    print(f"\n✅ Fichier créé avec succès:")
    print(f"   {output_path}")
    print(f"\n📚 Le Code Civil complet avec support arabe est maintenant disponible !")
    print(f"\n💡 Fonctionnalités disponibles:")
    print(f"   - codeCivilArticles: {{}} articles extraits".format(len(articles)))
    print(f"   - rechercherArticle(numero)")
    print(f"   - rechercherDansCodeCivil(motCle)")
    
    doc.close()

if __name__ == "__main__":
    try:
        extract_code_civil_with_arabic()
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
