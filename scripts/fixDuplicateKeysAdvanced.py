#!/usr/bin/env python3
"""
Script avancé pour nettoyer les clés dupliquées dans disabilityRates.ts
"""

import re
import sys

def fix_duplicate_keys(content):
    """
    Corrige les clés dupliquées en gardant la dernière occurrence
    """
    
    # Trouver tous les objets qui ont des propriétés dupliquées
    object_pattern = r'\{\s*([^{}]*(?:\{[^{}]*\}[^{}]*)*)\s*\}'
    
    def fix_object(match):
        obj_content = match.group(1)
        
        # Chercher les propriétés
        properties = []
        prop_pattern = r'(\w+):\s*([^,{}]*(?:\{[^{}]*\}[^,{}]*)*?)(?=,\s*\w+:|$)'
        
        seen_keys = {}
        
        for prop_match in re.finditer(prop_pattern, obj_content):
            key = prop_match.group(1).strip()
            value = prop_match.group(2).strip()
            
            # Si on a déjà vu cette clé, on la remplace
            seen_keys[key] = value
        
        # Reconstruire l'objet
        new_props = []
        for key, value in seen_keys.items():
            if value.endswith(','):
                value = value[:-1]
            new_props.append(f"{key}: {value}")
        
        return "{ " + ", ".join(new_props) + " }"
    
    # Appliquer la correction sur chaque objet
    content = re.sub(object_pattern, fix_object, content, flags=re.MULTILINE | re.DOTALL)
    
    return content

def main():
    file_path = "f:/disk1/calculateur-guide.1/data/disabilityRates.ts"
    
    try:
        # Lire le fichier
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"Fichier original: {len(content)} caractères")
        
        # Première approche : corrections simples et directes
        
        # Corriger les patterns de clés dupliquées les plus fréquents
        patterns_to_fix = [
            # description dupliquée
            (r'(description:\s*"[^"]*"),([^,}]*,\s*)(description:\s*"[^"]*")', r'\3,\2'),
            # rateCriteria dupliqué 
            (r'(rateCriteria:\s*\{[^}]*\}),([^,}]*,\s*)(rateCriteria:\s*\{[^}]*\})', r'\1,\2'),
        ]
        
        for pattern, replacement in patterns_to_fix:
            content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)
        
        print(f"Fichier après nettoyage: {len(content)} caractères")
        
        # Écrire le fichier corrigé
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ Correction terminée!")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()