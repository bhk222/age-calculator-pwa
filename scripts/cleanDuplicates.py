#!/usr/bin/env python3
"""
Script pour nettoyer les duplications de description et rateCriteria dans disabilityRates.ts
"""

import re
import sys

def clean_duplicates(file_path):
    """Nettoie les duplications dans le fichier TypeScript"""
    
    print(f"📖 Lecture du fichier: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    
    # Pattern pour détecter les objets avec description/rateCriteria répétés
    # On cherche: }, description: "...", rateCriteria: { ... } répété plusieurs fois
    pattern = r'(description: "[^"]+", rateCriteria: \{[^}]+\}(?:, description: "[^"]+", rateCriteria: \{[^}]+\})+)'
    
    def clean_match(match):
        """Nettoie une correspondance en ne gardant que le premier set"""
        text = match.group(1)
        # Extraire le premier description et rateCriteria
        first_desc = re.search(r'description: "[^"]+"', text)
        first_criteria = re.search(r'rateCriteria: \{[^}]+\}', text)
        
        if first_desc and first_criteria:
            return f'{first_desc.group()}, {first_criteria.group()}'
        return text
    
    # Méthode plus simple: remplacer les patterns répétitifs
    # Pattern: cherche ", description: "xxx", rateCriteria: {...}" répété après le premier
    iterations = 0
    max_iterations = 50
    
    while iterations < max_iterations:
        # Cherche une séquence de description+rateCriteria dupliquée
        pattern_dup = r'(, description: "[^"]+", rateCriteria: \{[^}]+\})(, description: "[^"]+", rateCriteria: \{[^}]+\})'
        
        new_content = re.sub(pattern_dup, r'\1', content)
        
        if new_content == content:
            # Plus de changements
            break
        
        content = new_content
        iterations += 1
        print(f"  ✓ Itération {iterations}: duplications supprimées")
    
    new_size = len(content)
    reduction = original_size - new_size
    
    print(f"\n📊 Résultats:")
    print(f"  - Taille originale: {original_size:,} caractères")
    print(f"  - Nouvelle taille: {new_size:,} caractères")
    print(f"  - Réduction: {reduction:,} caractères ({reduction/original_size*100:.1f}%)")
    print(f"  - Itérations effectuées: {iterations}")
    
    # Écriture du fichier nettoyé
    print(f"\n💾 Écriture du fichier nettoyé...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fichier nettoyé avec succès!")
    return reduction

if __name__ == "__main__":
    file_path = r"C:\Users\HICHAME\Desktop\calculateur-guide\data\disabilityRates.ts"
    
    try:
        reduction = clean_duplicates(file_path)
        sys.exit(0)
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1)
