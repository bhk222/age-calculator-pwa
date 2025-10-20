# 🤖 GUIDE - ASSISTANCE IA LOCALE POUR TAUX IPP

**Date** : 17 Octobre 2025  
**Fonctionnalité** : Suggestion automatique de taux IPP par IA locale  
**Modèle** : Ollama (llama3.2)

---

## 🎯 PRÉSENTATION

### Qu'est-ce que c'est ?

L'**Assistance IA Locale** est une nouvelle fonctionnalité qui aide les médecins conseil à choisir le taux IPP le plus approprié parmi la fourchette réglementaire. 

Lorsqu'une lésion a une fourchette de taux (ex: 10-15%), l'IA analyse :
- ✅ Le nom de la lésion
- ✅ La description médicale
- ✅ Les critères d'évaluation (faible/moyen/élevé)
- ✅ Les standards médicaux français

Et propose **une suggestion justifiée** pour guider la décision finale du médecin.

---

## 💡 COMMENT ÇA FONCTIONNE ?

### Interface Utilisateur

1. **Sélection d'une lésion** : Cliquez sur "Ajouter" pour une lésion avec fourchette (ex: 5-10%)
2. **Panneau de choix** : S'ouvre avec 3 options (Faible, Moyen, Élevé)
3. **Bouton "Aide IA"** : En haut à droite du panneau (icône éclair ⚡)
4. **Suggestion IA** : Apparaît avec :
   - Taux recommandé (ex: 7%)
   - Justification médicale courte (2-3 phrases)
5. **Option mise en évidence** : Le bouton suggéré est surligné en violet
6. **Décision finale** : Le médecin choisit (peut suivre ou non la suggestion)

### Exemple Visuel

```
┌─────────────────────────────────────────────────────────┐
│ Choisir le taux pour "Fracture tibia consolidée"       │
│                                         [⚡ Aide IA]    │
├─────────────────────────────────────────────────────────┤
│ 🤖 Suggestion IA: 7%                                    │
│ Consolidation simple sans complication. Cal non        │
│ gênant. Limitation fonctionnelle minime. Taux faible   │
│ approprié selon critères standards.                     │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐            │
│ │ Faible                              5%  │  [Suggéré] │
│ │ Consolidation sans complication...     │            │
│ └─────────────────────────────────────────┘            │
│                                                         │
│ ┌─────────────────────────────────────────┐            │
│ │ Moyen                               7%  │            │
│ │ Consolidation avec gêne modérée...      │            │
│ └─────────────────────────────────────────┘            │
│                                                         │
│ ┌─────────────────────────────────────────┐            │
│ │ Élevé                              10%  │            │
│ │ Cal vicieux gênant, douleurs...         │            │
│ └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 INSTALLATION ET CONFIGURATION

### Prérequis

1. **Ollama installé** : https://ollama.ai/download
2. **Modèle llama3.2 téléchargé**
3. **Ollama en cours d'exécution** sur port 11434 (par défaut)

### Installation Rapide

#### Windows

```powershell
# 1. Télécharger et installer Ollama
# Depuis https://ollama.ai/download

# 2. Télécharger le modèle llama3.2
ollama pull llama3.2

# 3. Vérifier que c'est actif
ollama list

# 4. Démarrer Ollama (si pas déjà actif)
# Il démarre automatiquement au boot Windows

# 5. Tester
curl http://localhost:11434/api/generate -d "{\"model\":\"llama3.2\",\"prompt\":\"Test\"}"
```

#### Linux/Mac

```bash
# 1. Installer Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Télécharger le modèle
ollama pull llama3.2

# 3. Démarrer Ollama
ollama serve  # Dans un terminal séparé

# 4. Tester
curl http://localhost:11434/api/generate \
  -d '{"model":"llama3.2","prompt":"Test"}'
```

### Vérification Installation

Dans l'application :
1. Sélectionnez une lésion avec fourchette
2. Cliquez sur **"Aide IA"**
3. Si Ollama n'est pas disponible, vous verrez :
   ```
   ⚠️ L'IA locale (Ollama) n'est pas disponible. 
   Assurez-vous qu'Ollama est démarré avec le modèle llama3.2.
   ```

---

## 📋 UTILISATION PRATIQUE

### Cas d'Usage 1 : Fracture Simple

**Lésion** : Fracture tibia - Consolidation avec cal non gênant [5-10%]

**Étapes** :
1. Sélectionner la lésion
2. Cliquer "Aide IA"
3. IA suggère : **5%** (Faible)
   - *"Consolidation simple. Pas de complication. Cal non gênant. Limitation fonctionnelle minime."*
4. Médecin valide le taux suggéré ✅

### Cas d'Usage 2 : Pathologie Complexe

**Lésion** : Sténose urétrale post-traumatique [20-40%]

**Étapes** :
1. Sélectionner la lésion
2. Cliquer "Aide IA"
3. IA suggère : **30%** (Moyen)
   - *"Sténose nécessitant dilatations régulières. Infections récurrentes probables. Impact qualité de vie notable."*
4. Médecin ajuste à **35%** basé sur cas spécifique ✅

### Cas d'Usage 3 : Décision Difficile

**Lésion** : Tuberculose épididymo-testiculaire bilatérale [15-30%]

**Étapes** :
1. Sélectionner la lésion
2. Cliquer "Aide IA"
3. IA suggère : **22%** (Moyen)
   - *"Atteinte bilatérale. Azoospermie probable. Impact fertilité majeur mais testostérone préservée."*
4. Médecin considère âge patient et décide **25%** ✅

---

## 🎓 AVANTAGES

### Pour les Médecins Conseil

✅ **Gain de temps** : Suggestion immédiate sans recherche manuelle  
✅ **Cohérence** : Base sur critères standards pour tous  
✅ **Formation** : Explications pédagogiques pour nouveaux médecins  
✅ **Sécurité** : Suggestion, pas décision (médecin garde contrôle)  
✅ **Offline** : IA locale, pas de connexion internet requise  
✅ **Confidentialité** : Données restent sur la machine locale  

### Pour l'Institution CNAS

✅ **Standardisation** : Évaluations plus homogènes  
✅ **Qualité** : Réduction des erreurs d'évaluation  
✅ **Traçabilité** : Suggestions IA documentées  
✅ **Efficience** : Traitement plus rapide des dossiers  

---

## ⚠️ LIMITATIONS ET PRÉCAUTIONS

### Limitations Techniques

❌ **Nécessite Ollama** : Si pas installé, fonctionnalité désactivée  
❌ **Performance** : Suggestion prend 2-5 secondes selon matériel  
❌ **Hors ligne uniquement** : Pas de mise à jour automatique modèle  

### Limitations Médicales

⚠️ **L'IA est un ASSISTANT, pas un décideur**  
⚠️ **Le médecin conseil reste RESPONSABLE de la décision finale**  
⚠️ **Suggestion basée sur cas génériques, pas le patient spécifique**  
⚠️ **Ne remplace pas l'examen clinique et le jugement médical**  

### Bonnes Pratiques

✅ **Toujours vérifier** la suggestion par rapport au cas réel  
✅ **Utiliser comme point de départ** pour la réflexion  
✅ **Documenter** si décision différente de suggestion IA  
✅ **Former** les médecins à l'utilisation appropriée  
✅ **Auditer** périodiquement concordance IA/décisions finales  

---

## 🔍 DÉTAILS TECHNIQUES

### Architecture

```
┌─────────────────┐
│ Interface Web   │
│ (React)         │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│ Ollama API      │
│ localhost:11434 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Modèle llama3.2 │
│ (Local)         │
└─────────────────┘
```

### Prompt Engineering

Le prompt envoyé à l'IA contient :

```typescript
Tu es un expert médical français spécialisé en évaluation IPP.

Lésion: "${injury.name}"
Fourchette IPP réglementaire: ${min}% à ${max}%

Critères d'évaluation:
- FAIBLE (${min}%): ${lowCriterion}
- MOYEN (${medium}%): ${mediumCriterion}
- ÉLEVÉ (${max}%): ${highCriterion}

${injury.description ? `Description: ${injury.description}` : ''}

Tâche: Suggère le taux IPP le plus approprié et explique brièvement.

Format:
TAUX: [nombre]
JUSTIFICATION: [2-3 phrases]
```

### Paramètres Modèle

```json
{
  "temperature": 0.3,     // Faible pour cohérence
  "num_predict": 200,     // Max 200 tokens
  "stream": false         // Réponse complète d'un coup
}
```

---

## 📊 MÉTRIQUES ET SUIVI

### Métriques Recommandées

1. **Taux d'utilisation** : % médecins utilisant "Aide IA"
2. **Taux d'acceptation** : % suggestions suivies
3. **Écarts moyens** : Différence taux suggéré vs choisi
4. **Temps moyen** : Durée suggestion IA
5. **Satisfaction** : Feedback médecins utilisateurs

### Tableau de Bord Suggéré

| Période | Utilisations | Acceptations | Écart Moyen | Temps Moyen |
|---------|-------------|--------------|-------------|-------------|
| Semaine 1 | 145 | 87% | 1.2% | 3.5s |
| Semaine 2 | 189 | 91% | 0.8% | 3.2s |
| Semaine 3 | 234 | 93% | 0.6% | 3.1s |
| Mois 1 | 892 | 92% | 0.9% | 3.3s |

---

## 🚀 ÉVOLUTIONS FUTURES

### Court Terme (1-3 mois)

1. **Mémorisation contexte** : IA se souvient des lésions précédentes du même dossier
2. **Suggestions multiples** : Top 2-3 options avec probabilités
3. **Explications détaillées** : Mode "expert" avec références législatives

### Moyen Terme (3-6 mois)

1. **Apprentissage continu** : Fine-tuning sur décisions CNAS réelles
2. **Détection anomalies** : Alerte si taux inhabituel pour type lésion
3. **Analyse comparative** : "Cas similaires évalués à X% en moyenne"

### Long Terme (6-12 mois)

1. **IA multimodale** : Analyse images médicales (radios, IRM)
2. **Prédiction complications** : Risques évolution séquelles
3. **Recommandations thérapeutiques** : Suggestions réadaptation

---

## 📞 SUPPORT

### Problèmes Courants

#### ❌ "L'IA locale n'est pas disponible"

**Solutions** :
1. Vérifier Ollama est installé : `ollama --version`
2. Vérifier modèle téléchargé : `ollama list`
3. Redémarrer Ollama : `ollama serve`
4. Tester API : `curl http://localhost:11434/api/tags`

#### ⏱️ "Suggestion très lente (>10s)"

**Solutions** :
1. Vérifier ressources CPU/RAM disponibles
2. Fermer applications lourdes
3. Utiliser GPU si disponible (Ollama auto-détecte)
4. Réduire `num_predict` à 150 tokens

#### ❓ "Suggestion incohérente"

**Solutions** :
1. Vérifier critères `rateCriteria` bien renseignés dans base
2. Tester avec d'autres lésions similaires
3. Signaler pour amélioration prompt
4. Ne pas suivre suggestion, utiliser jugement médical

---

## ✅ CHECKLIST DÉPLOIEMENT

### Installation Postes Médecins

- [ ] Ollama installé sur chaque poste
- [ ] Modèle llama3.2 téléchargé
- [ ] Test connexion API réussi
- [ ] Application mise à jour avec fonctionnalité IA
- [ ] Guide utilisateur distribué
- [ ] Formation médecins planifiée

### Formation Utilisateurs

- [ ] Session présentation fonctionnalité (30min)
- [ ] Démonstration live avec cas réels
- [ ] Exercices pratiques (5-10 cas)
- [ ] Q&A et bonnes pratiques
- [ ] Documentation remise à chaque médecin

### Suivi Post-Déploiement

- [ ] Collecte feedback semaine 1
- [ ] Analyse métriques utilisation
- [ ] Ajustements basés retours
- [ ] Session follow-up mois 1
- [ ] Audit qualité suggestions trimestre 1

---

## 🏆 CONCLUSION

L'**Assistance IA Locale** pour taux IPP représente une **innovation majeure** dans l'évaluation médicale à la CNAS :

✅ **Améliore la qualité** : Suggestions basées standards médicaux  
✅ **Accélère le processus** : Gain temps significatif  
✅ **Forme les nouveaux** : Explications pédagogiques  
✅ **Respecte la confidentialité** : 100% local, pas de cloud  
✅ **Maintient le contrôle médical** : Suggestion, pas décision  

**Cette fonctionnalité transforme l'outil en véritable assistant intelligent pour les médecins conseil, tout en préservant leur expertise et responsabilité décisionnelle.**

---

**📅 Date** : 17 Octobre 2025  
**✅ Statut** : Fonctionnalité implémentée et documentée  
**🚀 Prêt pour** : Tests pilotes avec médecins volontaires  

**🤖 Bienvenue dans l'ère de l'IPP assistée par IA ! 🎓**
