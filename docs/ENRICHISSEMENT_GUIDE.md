# Guide d'enrichissement de la base de données IPP

## 📊 Statistiques actuelles
- **962 lésions** dans la base de données
- **765 lésions** sans critères d'évaluation détaillés
- **117 lésions** avec de larges plages sans description

## 🎯 Objectif
Enrichir la base de données avec toutes les informations du PDF "BAREME DES TAUX MEDICAUX DES ACCIDENTS DU TRAVAIL"

## 📝 Méthode d'enrichissement

### Option 1: Automatique (Recommandé si le PDF est numérique)
```bash
# Installer la dépendance
npm install pdf-parse

# Extraire le texte du PDF
npm run extract-pdf

# Le texte sera sauvegardé dans data/pdf-extracted.txt
```

### Option 2: Manuelle
1. Ouvrez le PDF dans Adobe Reader
2. Parcourez chaque page et identifiez les informations manquantes
3. Ajoutez-les dans `scripts/enhanceDatabase.ts` selon le format ci-dessous

## 📋 Format d'ajout des données

```typescript
"Nom exact de la lésion": {
  rateCriteria: {
    low: "Description pour le taux minimum",
    medium: "Description pour le taux moyen (optionnel)",
    high: "Description pour le taux maximum"
  },
  description: "Description générale de la lésion (optionnel)",
  notes: "Notes supplémentaires du barème (optionnel)"
}
```

## 🔍 Exemples basés sur le barème standard

### Membres Supérieurs

#### Doigts - Ankyloses
```typescript
"Ankylose Index - Articulation P2-P3 (Main Non Dominante)": {
  rateCriteria: {
    low: "Ankylose en légère flexion, position fonctionnelle.",
    high: "Ankylose en hyperextension ou flexion marquée."
  },
  description: "Blocage complet de l'articulation distale de l'index"
}
```

#### Poignet
```typescript
"Luxation (fracture du semi-lunaire) (Main Dominante)": {
  rateCriteria: {
    low: "Séquelles douloureuses modérées, mobilité conservée, pas de nécrose.",
    medium: "Douleurs et raideur du poignet, début d'arthrose.",
    high: "Nécrose avasculaire du semi-lunaire (maladie de Kienböck), arthrose sévère, perte de force majeure."
  },
  description: "Complications post-traumatiques du semi-lunaire carpien"
}
```

### Membres Inférieurs

#### Fractures du Tibia
```typescript
"Fracture du tibia seul - Extrémité supérieure": {
  rateCriteria: {
    low: "Fracture sans déplacement important, consolidation sans séquelles arthrosiques.",
    medium: "Enfoncement d'un plateau tibial, arthrose modérée du genou, limitation de la flexion de 20-30%.",
    high: "Fracture complexe des deux plateaux, désaxation importante (varus/valgus), arthrose sévère avec douleurs permanentes et boiterie."
  },
  description: "Fracture de la partie haute du tibia impliquant l'articulation du genou"
}
```

## 🚀 Processus d'enrichissement

### Étape 1: Préparation
- [ ] Copier le PDF dans `data/`
- [ ] Installer les dépendances: `npm install`

### Étape 2: Analyse
- [ ] Exécuter `npm run analyze` pour voir les statistiques
- [ ] Identifier les priorités (lésions fréquentes sans critères)

### Étape 3: Extraction
- [ ] Utiliser `npm run extract-pdf` OU extraire manuellement
- [ ] Sauvegarder dans `data/pdf-manual.txt` si extraction manuelle

### Étape 4: Enrichissement
- [ ] Ouvrir `scripts/enhanceDatabase.ts`
- [ ] Ajouter les données selon le format ci-dessus
- [ ] Exécuter `npm run enhance` pour appliquer les changements

### Étape 5: Vérification
- [ ] Vérifier le fichier `data/disabilityRates.ts` modifié
- [ ] Tester le calculateur avec les nouvelles données
- [ ] Relancer `npm run analyze` pour voir l'amélioration

## 📊 Priorités d'enrichissement

### Haute priorité (lésions fréquentes)
1. Membres supérieurs - Doigts (765 lésions)
2. Rachis et moelle épinière
3. Membres inférieurs - Jambe et genou

### Moyenne priorité
1. Nerfs périphériques
2. Tête et face
3. ORL et ophtalmologie

### Basse priorité
1. Cas rares ou spécifiques
2. Complications multiples

## 💡 Conseils

### Pour les critères d'évaluation
- **Low**: Situation la plus favorable, limitations minimes
- **Medium**: Situation intermédiaire avec gêne fonctionnelle modérée
- **High**: Situation la plus défavorable, handicap important

### Pour les descriptions
- Être concis mais précis
- Utiliser des termes médicaux standards
- Indiquer les critères objectifs (angles, distances, etc.)

## 🔗 Ressources

- Barème officiel: `data/BAREME DES TAUX MEDICAUX DES ACCIDENTS DU TRAVAIL.pdf`
- Code civil algérien: `data/civilCode.ts`
- Base actuelle: `data/disabilityRates.ts`

## ❓ Questions fréquentes

**Q: Comment gérer les taux fixes (pas de plage)?**
R: Si le PDF indique un taux fixe, utilisez `rate: 25` au lieu de `rate: [20, 30]`

**Q: Que faire si une lésion n'est pas dans la base?**
R: Ajoutez-la dans la catégorie appropriée dans `disabilityRates.ts`

**Q: Comment gérer les majOrations (troubles associés)?**
R: Indiquez-le dans la description avec le mot "Majoration" et référez-vous aux autres taux

## 📞 Support

Pour toute question sur l'enrichissement de la base de données, consultez:
- La documentation du projet
- Les exemples dans `scripts/enhanceDatabase.ts`
- L'analyse des données: `npm run analyze`
