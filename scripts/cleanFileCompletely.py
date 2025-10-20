#!/usr/bin/env python3
"""
Script de nettoyage complet du fichier disabilityRates.ts
Supprime toutes les clés dupliquées de manière systématique
"""

import re
import json

def clean_line(line):
    """Nettoie une ligne des clés dupliquées"""
    
    # Si la ligne ne contient pas d'objet, la retourner telle quelle
    if '{' not in line or '}' not in line:
        return line
    
    # Extraire la partie avant l'objet
    before_obj = line[:line.find('{')]
    
    # Extraire l'objet
    obj_start = line.find('{')
    obj_end = line.rfind('}')
    obj_content = line[obj_start+1:obj_end]
    
    # Extraire la partie après l'objet
    after_obj = line[obj_end+1:]
    
    # Analyser les propriétés de l'objet
    properties = {}
    prop_matches = re.finditer(r'(\w+):\s*([^,}]+(?:\{[^}]*\}[^,}]*)*)', obj_content)
    
    for match in prop_matches:
        key = match.group(1).strip()
        value = match.group(2).strip()
        
        # Nettoyer la valeur
        if value.endswith(','):
            value = value[:-1].strip()
        
        # Garder seulement la dernière occurrence de chaque clé
        properties[key] = value
    
    # Reconstruire l'objet
    if properties:
        prop_strings = []
        for key, value in properties.items():
            prop_strings.append(f"{key}: {value}")
        
        new_obj = "{ " + ", ".join(prop_strings) + " }"
        return before_obj + new_obj + after_obj
    
    return line

def main():
    file_path = "f:/disk1/calculateur-guide.1/data/disabilityRates.ts"
    
    try:
        print("🔄 Lecture du fichier...")
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        print(f"📄 Fichier original: {len(lines)} lignes")
        
        # Nettoyer ligne par ligne
        cleaned_lines = []
        for i, line in enumerate(lines):
            try:
                # Correction spécifique pour les lignes avec beaucoup de répétitions
                if 'description: "Ankylose de la phalangette, peu invalidante"' in line:
                    # Reconstruire complètement cette ligne
                    if 'Ankylose Auriculaire - Articulation P2-P3 (Main Non Dominante)' in line:
                        cleaned_line = '          { name: "Ankylose Auriculaire - Articulation P2-P3 (Main Non Dominante)", rate: [0, 1], description: "Ankylose de la dernière articulation de l\'auriculaire, main non dominante", rateCriteria: { low: "Ankylose distale auriculaire en position fonctionnelle (0%).", high: "Ankylose P2-P3 auriculaire en extension complète, préhension difficile (1%)." } },\n'
                        cleaned_lines.append(cleaned_line)
                        continue
                elif 'description: "Impact fonctionnel minime"' in line and line.count('description:') > 3:
                    # Ligne corrompue, la reconstruire 
                    if 'Ankylose Auriculaire - Articulation métacarpo-phalangienne (Main Non Dominante)' in line:
                        cleaned_line = '          { name: "Ankylose Auriculaire - Articulation métacarpo-phalangienne (Main Non Dominante)", rate: [0, 1], description: "Ankylose de la base de l\'auriculaire, main non dominante", rateCriteria: { low: "Ankylose MCP auriculaire en extension, gêne minime (0%).", high: "Ankylose MCP auriculaire en flexion ou écart, préhension perturbée (1%)." } },\n'
                        cleaned_lines.append(cleaned_line)
                        continue
                
                # Nettoyage standard
                cleaned_line = clean_line(line)
                cleaned_lines.append(cleaned_line)
                
            except Exception as e:
                print(f"⚠️  Erreur ligne {i+1}: {e}")
                cleaned_lines.append(line)  # Garder la ligne originale en cas d'erreur
        
        print(f"✅ Nettoyage terminé: {len(cleaned_lines)} lignes")
        
        # Écrire le fichier nettoyé
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(cleaned_lines)
        
        print("💾 Fichier sauvegardé!")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    main()