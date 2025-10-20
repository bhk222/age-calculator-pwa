# 🛠️ Scripts d'Enrichissement IPP

Ce dossier contient tous les scripts nécessaires pour enrichir la base de données IPP avec les informations du PDF du barème officiel.

## 📁 Structure

```
scripts/
├── analyzePdfData.ts        # Analyse la base de données
├── enhanceDatabase.ts        # Applique les enrichissements
├── extractPdfText.ts         # Extrait le texte du PDF
├── interactiveEnhancer.ts    # Outil interactif CLI
└── README.md                 # Ce fichier
```

## 🚀 Scripts disponibles

### 1. `analyzePdfData.ts` - Analyseur de base de données

**Commande:** `npm run analyze`

**Fonction:** Analyse la base de données actuelle et génère un rapport détaillé.

**Résultat:**
- Nombre total de catégories, sous-catégories et lésions
- Lésions sans critères d'évaluation
- Lésions sans description
- Suggestions d'amélioration prioritaires

**Exemple de sortie:**
```
📊 RAPPORT D'ANALYSE
• Total de lésions: 962
• Lésions sans critères: 765
• Lésions sans description: 117
```

### 2. `enhanceDatabase.ts` - Applicateur d'enrichissements

**Commande:** `npm run enhance`

**Fonction:** Applique les enrichissements définis dans l'objet `enhancements` à la base de données.

**Configuration:**
```typescript
const enhancements = {
  "Nom de la lésion": {
    rateCriteria: {
      low: "Description min",
      medium: "Description moyenne (optionnel)",
      high: "Description max"
    },
    description: "Description générale",
    notes: "Notes du barème"
  }
};
```

**Résultat:**
- Fichier `disabilityRates.ts` mis à jour
- Rapport des enrichissements appliqués
- Liste des lésions non trouvées (erreurs)

### 3. `extractPdfText.ts` - Extracteur de PDF

**Commande:** `npm run extract-pdf`

**Fonction:** Extrait le texte du PDF pour faciliter l'analyse.

**Prérequis:**
```bash
npm install pdf-parse
```

**Résultat:**
- Fichier `data/pdf-extracted.txt` avec le texte complet
- Nombre de pages extraites
- Statistiques d'extraction

### 4. `interactiveEnhancer.ts` - Outil interactif ⭐

**Commande:** `npm run interactive`

**Fonction:** Interface en ligne de commande pour ajouter facilement des enrichissements.

**Workflow:**
1. Entre le nom de la lésion
2. Ajoute les critères (low/medium/high)
3. Ajoute description et notes (optionnel)
4. Confirme et sauvegarde
5. Génère un fichier TypeScript avec les enrichissements

**Avantages:**
- ✅ Guidé étape par étape
- ✅ Validation en temps réel
- ✅ Pas de syntaxe à connaître
- ✅ Génération automatique du code

## 📝 Exemple d'utilisation complète

### Scénario: Enrichir 10 lésions du pouce

```bash
# Étape 1: Analyser l'état actuel
npm run analyze
# Résultat: 765 lésions sans critères

# Étape 2: Ouvrir le PDF à la page des ankyloses du pouce
# (Consulter le barème manuel)

# Étape 3: Utiliser l'outil interactif
npm run interactive

# Suivre les prompts pour 10 lésions:
# 1. Ankylose Pouce - Articulation carpo-métacarpienne (Main Dominante)
#    Low: Ankylose en position d'opposition favorable
#    High: Ankylose en adduction (pouce collé), perte de la grande pince
#
# 2. Ankylose Pouce - Articulation métacarpo-phalangienne (Main Dominante)
#    ...
# (Répéter pour les 8 autres)

# Étape 4: Copier le code généré dans enhanceDatabase.ts

# Étape 5: Appliquer les enrichissements
npm run enhance
# Résultat: ✅ 10 enrichissements appliqués

# Étape 6: Vérifier l'amélioration
npm run analyze
# Résultat: 755 lésions sans critères (-10) ✅
```

## 🔧 Personnalisation

### Modifier le format des critères

Dans `enhanceDatabase.ts`, vous pouvez modifier le format:

```typescript
// Format actuel
rateCriteria: {
  low: "Description",
  medium: "Description",
  high: "Description"
}

// Format court (sans medium)
rateCriteria: {
  low: "Description",
  high: "Description"
}
```

### Ajouter des champs personnalisés

```typescript
"Nom de la lésion": {
  rateCriteria: { ... },
  description: "...",
  notes: "...",
  // Nouveaux champs personnalisés
  references: "Page 45 du PDF",
  lastUpdated: "2025-01-17",
  reviewedBy: "Dr. X"
}
```

### Créer des templates

Dans `enhanceDatabase.ts`:

```typescript
// Templates réutilisables
const ankyloseTemplate = (articulation: string) => ({
  rateCriteria: {
    low: `Ankylose ${articulation} en position fonctionnelle`,
    high: `Ankylose ${articulation} en position vicieuse`
  }
});

// Utilisation
const enhancements = {
  "Ankylose X": ankyloseTemplate("métacarpo-phalangienne"),
  "Ankylose Y": ankyloseTemplate("interphalangienne"),
};
```

## 🐛 Debugging

### Problème: "Lésion non trouvée"

**Cause:** Le nom ne correspond pas exactement à celui dans `disabilityRates.ts`

**Solution:**
```bash
# 1. Rechercher le nom exact
grep -r "partie du nom" data/disabilityRates.ts

# 2. Ou ouvrir le fichier et copier-coller le nom exact
```

### Problème: Script ne démarre pas

**Cause:** Dépendances manquantes

**Solution:**
```bash
# Réinstaller les dépendances
npm install

# Vérifier que tsx est installé
npm list tsx
```

### Problème: Modification non visible

**Cause:** Cache ou erreur silencieuse

**Solution:**
```bash
# 1. Vérifier le fichier modifié
cat data/disabilityRates.ts | grep "nom de la lésion"

# 2. Relancer l'analyse
npm run analyze

# 3. Redémarrer l'application
npm run dev
```

## 📊 Performance

### Temps moyen par lésion

| Méthode | Temps/lésion | Lésions/heure |
|---------|--------------|---------------|
| Interactive | 3-5 min | 12-20 |
| Manuelle | 2-3 min | 20-30 |
| Par lots | 1-2 min | 30-60 |

### Optimisations recommandées

1. **Traiter par groupes similaires**
   - Toutes les ankyloses ensemble
   - Toutes les fractures ensemble

2. **Utiliser des templates**
   - Créer des modèles réutilisables
   - Copier-coller et adapter

3. **Valider par lots**
   - Ajouter 10-20 enrichissements
   - Exécuter enhance une fois
   - Vérifier ensemble

## 🔒 Bonnes pratiques

### 1. Sauvegarde régulière

```bash
# Avant de commencer
cp data/disabilityRates.ts data/disabilityRates.backup.ts

# Après chaque session
git add .
git commit -m "enrich: ajout de X lésions [catégorie]"
git push
```

### 2. Validation des données

```bash
# Après chaque lot d'enrichissements
npm run analyze

# Vérifier que le nombre diminue
# Avant: 765 → Après: 745 (-20) ✅
```

### 3. Tests réguliers

```bash
# Tester l'application
npm run dev

# Vérifier qu'une lésion enrichie affiche bien:
# - Les critères dans le calculateur
# - La description dans l'aide
```

## 📚 Ressources

### Fichiers de référence
- `data/disabilityRates.ts` - Base de données principale
- `types.ts` - Définition des types TypeScript
- `docs/ENRICHISSEMENT_GUIDE.md` - Guide complet

### Commandes utiles

```bash
# Compter les lésions
grep -c "{ name:" data/disabilityRates.ts

# Chercher une lésion spécifique
grep "Ankylose Pouce" data/disabilityRates.ts

# Voir les dernières modifications
git log --oneline --grep="enrich"

# Annuler les dernières modifications
git checkout data/disabilityRates.ts
```

## 🆘 Support

### En cas de problème

1. **Lire la documentation**
   - `GUIDE_RAPIDE.md`
   - `docs/ENRICHISSEMENT_README.md`

2. **Vérifier les logs**
   ```bash
   npm run analyze 2>&1 | tee analyze.log
   ```

3. **Restaurer une version précédente**
   ```bash
   git log -- data/disabilityRates.ts
   git checkout <commit-hash> -- data/disabilityRates.ts
   ```

## 🎯 Prochaines étapes

1. **Analyser:** `npm run analyze`
2. **Enrichir:** `npm run interactive`
3. **Appliquer:** `npm run enhance`
4. **Vérifier:** `npm run analyze`
5. **Répéter!**

---

**Happy enriching! 🚀**
