#!/usr/bin/env python3
"""
Script pour nettoyer les clés dupliquées dans disabilityRates.ts
"""

import re
import sys

def clean_duplicate_keys(content):
    """Nettoie les clés dupliquées dans les objets TypeScript"""
    
    # Pattern pour trouver les objets avec des propriétés dupliquées
    # Cherche description dupliquée
    content = re.sub(
        r'(description:\s*"[^"]*"),\s*([^,}]*),\s*(description:\s*"[^"]*")',
        r'\3, \2',
        content,
        flags=re.MULTILINE
    )
    
    # Cherche rateCriteria dupliqué
    content = re.sub(
        r'(rateCriteria:\s*\{[^}]*\}),\s*([^,}]*),\s*(rateCriteria:\s*\{[^}]*\})',
        r'\1, \2',
        content,
        flags=re.MULTILINE
    )
    
    return content

def main():
    file_path = "f:/disk1/calculateur-guide.1/data/disabilityRates.ts"
    
    try:
        # Lire le fichier
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"Fichier original: {len(content)} caractères")
        
        # Nettoyer les clés dupliquées
        cleaned_content = clean_duplicate_keys(content)
        
        print(f"Fichier nettoyé: {len(cleaned_content)} caractères")
        
        # Écrire le fichier nettoyé
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        
        print("✅ Nettoyage terminé avec succès!")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()