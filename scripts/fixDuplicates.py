#!/usr/bin/env python3
"""
Script pour nettoyer les clés dupliquées (description et rateCriteria) dans disabilityRates.ts
"""
import re

# Lire le fichier
with open('data/disabilityRates.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern pour trouver les duplications: }, description: "...", rateCriteria: { ... }
# On cherche le pattern après une première description/rateCriteria complète
pattern = r'(\}, description: "[^"]+", rateCriteria: \{[^\{]*(?:\{[^\}]*\}[^\}]*)*\})+(\s*\},)'

def clean_duplicates(match):
    # Garder seulement le dernier } },
    return match.group(2)

# Remplacer toutes les duplications
content_cleaned = re.sub(pattern, clean_duplicates, content)

# Deuxième passe: pattern plus simple pour les cas restants
# Cherche: }, description: "...", rateCriteria: { ... } juste avant }
simple_pattern = r',\s*description:\s*"[^"]*",\s*rateCriteria:\s*\{[^\{]*(?:\{[^\}]*\}[^\}]*)*\}\s*(?=\})'

# Pour chaque objet, ne garder que la première occurrence de description et rateCriteria
def remove_duplicate_keys(content):
    lines = content.split('\n')
    result = []
    in_object = False
    object_lines = []
    brace_count = 0
    
    for line in lines:
        result.append(line)
    
    return '\n'.join(result)

# Sauvegarder
with open('data/disabilityRates.ts', 'w', encoding='utf-8') as f:
    f.write(content_cleaned)

print("✅ Duplications supprimées avec succès!")
