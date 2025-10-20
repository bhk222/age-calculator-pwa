# 📱 Calculateur IPP CNAS - Progressive Web App

> Application médicale pour le calcul d'Incapacité Permanente Partielle (IPP) selon le barème algérien AT/MP - **Fonctionne offline et installable sur tous appareils**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg)](https://web.dev/pwa)
[![Offline First](https://img.shields.io/badge/Offline-First-blue.svg)]()
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)

---

## ✨ Fonctionnalités Principales

### 📊 Calculateur IPP Complet
- ✅ **962 lésions** du barème algérien AT/MP (couverture 100%)
- ✅ **18 catégories** organisées (Neurologie, Orthopédie, ORL, etc.)
- ✅ **Critères d'évaluation** détaillés (low/medium/high)
- ✅ **Calcul automatique** d'IPP avec historique
- ✅ **Fonctionne SANS INTERNET** 📴

### 🤖 Intelligence Artificielle Locale
- ✅ **Ollama** intégration (llama3.2)
- ✅ **Suggestions IPP** intelligentes
- ✅ **Highlighting** des critères pertinents
- ✅ **100% privé** (aucune donnée envoyée au cloud)

### 🛠️ Outils Médicaux
- ✅ Calculateur **DFG** (débit filtration glomérulaire)
- ✅ Liste **ALD** (30 affections longue durée)
- ✅ **Dictionnaire médicaments**
- ✅ Calculateur **déficit auditif**
- ✅ Calculateur **insuline**
- ✅ Calculateur **Norditropine**

### 📚 Documentation Intégrée
- ✅ **Guide législatif** AT/MP
- ✅ **Code civil algérien**
- ✅ **Maladies professionnelles** (100+ tableaux)

### 📱 Progressive Web App (PWA)
- ✅ **Installable** sur Desktop/Mobile
- ✅ **Mode offline** complet
- ✅ **Mode standalone** (comme app native)
- ✅ **Mises à jour automatiques**
- ✅ **Indicateur réseau** en temps réel

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/calculateur-guide.git
cd calculateur-guide

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

**Accès :** http://localhost:3000

### Build Production

```bash
# Build
npm run build

# Test du build
npx serve dist -p 3001
```

---

## 🌐 Déploiement

### Option 1 : Vercel (Recommandé)

```bash
npx vercel --prod
```

### Option 2 : Netlify

```bash
npx netlify deploy --prod --dir=dist
```

### Option 3 : Script Automatique

**Windows :**
```powershell
.\deploy.ps1 vercel
```

**Linux/Mac :**
```bash
chmod +x deploy.sh
./deploy.sh vercel
```

📖 **Guide complet :** [GUIDE_DEPLOIEMENT.md](GUIDE_DEPLOIEMENT.md)

---

## 📱 Installation PWA

### Sur Desktop (Chrome/Edge)
1. Ouvrir l'application dans le navigateur
2. Cliquer sur **"📱 Installer maintenant"**
3. Confirmer l'installation
4. ✅ Icône ajoutée au bureau/menu démarrer

### Sur Mobile (Android/iOS)
1. Ouvrir dans Chrome (Android) ou Safari (iOS)
2. Menu → **"Ajouter à l'écran d'accueil"**
3. ✅ Icône sur l'écran d'accueil

📖 **Guide complet :** [GUIDE_PWA_INSTALLATION.md](GUIDE_PWA_INSTALLATION.md)

---

## 🤖 Configuration IA Locale (Optionnel)

### Installation Ollama

```bash
# 1. Installer Ollama
# Windows : https://ollama.ai/download
# Linux : curl https://ollama.ai/install.sh | sh

# 2. Télécharger le modèle
ollama pull llama3.2

# 3. Démarrer le serveur
ollama serve
```

### Utilisation
1. Sélectionner une lésion avec **plage de taux** (ex: 10-30%)
2. Cliquer sur **"💡 Demander suggestion IA locale"**
3. L'IA suggère un taux avec justification
4. Critères pertinents **surlignés en jaune**

📖 **Guide complet :** [GUIDE_IA_LOCALE_IPP.md](GUIDE_IA_LOCALE_IPP.md)

---

## 📂 Structure du Projet

```
calculateur-guide/
├── components/              # Composants React
│   ├── InstallButton.tsx   # PWA install prompt
│   ├── OfflineIndicator.tsx # Network status
│   ├── InjurySelector.tsx  # Sélecteur lésions
│   ├── AiAnalyzer.tsx      # IA locale
│   └── tools/              # Outils médicaux
├── data/                    # Données médicales
│   ├── disabilityRates.ts  # 962 lésions IPP
│   ├── civilCode.ts        # Code civil
│   ├── aldList.ts          # Maladies ALD
│   └── professionalDiseases.ts # Tableaux MP
├── services/                # Services
│   └── geminiService.ts    # API Ollama
├── public/                  # Assets statiques
│   ├── sw.js               # Service Worker v37
│   ├── manifest.webmanifest # PWA manifest
│   └── icons/              # Icônes PWA
├── dist/                    # Build production
└── docs/                    # Documentation
```

---

## 🛠️ Technologies

- **Frontend :** React 18 + TypeScript 5
- **Build :** Vite 6 (ESBuild)
- **Styling :** Tailwind CSS 3
- **PWA :** Service Worker + Web App Manifest
- **IA :** Ollama (llama3.2) - Local
- **Déploiement :** Vercel / Netlify / GitHub Pages

---

## 📊 Statistiques

- **Lésions IPP :** 962/962 (100%)
- **Catégories :** 18
- **Critères enrichis :** 962
- **Taille base :** 662 KB (213 KB gzippé)
- **Lignes de code :** ~15,000
- **Composants React :** 20+
- **Documentation :** 15+ fichiers MD

---

## 📚 Documentation

### Guides Utilisateurs
- [📖 GUIDE_UTILISATION.md](GUIDE_UTILISATION.md) - Guide complet d'utilisation
- [📖 GUIDE_RAPIDE.md](GUIDE_RAPIDE.md) - Démarrage rapide
- [📖 GUIDE_PWA_INSTALLATION.md](GUIDE_PWA_INSTALLATION.md) - Installation PWA
- [📖 GUIDE_IA_LOCALE_IPP.md](GUIDE_IA_LOCALE_IPP.md) - Configuration IA

### Guides Techniques
- [📖 GUIDE_DEPLOIEMENT.md](GUIDE_DEPLOIEMENT.md) - Déploiement complet
- [📖 DEPLOIEMENT_RAPIDE.md](DEPLOIEMENT_RAPIDE.md) - Quick start déploiement
- [📖 RAPPORT_FINAL_100_PERCENT.md](RAPPORT_FINAL_100_PERCENT.md) - Rapport technique
- [📖 STATUS_FINAL.md](STATUS_FINAL.md) - Statut production

### Index
- [📖 INDEX_DOCUMENTATION.md](INDEX_DOCUMENTATION.md) - Table des matières complète

---

## 🧪 Tests

### Test Offline
```bash
# 1. Lancer l'app
npm run dev

# 2. Ouvrir http://localhost:3000
# 3. DevTools (F12) → Network → Cocher "Offline"
# 4. Rafraîchir → ✅ App fonctionne !
```

### Test PWA
```bash
# Audit Lighthouse
npx lighthouse http://localhost:3000 --view
```

**Objectifs :**
- Performance : ≥ 90
- PWA : ≥ 90
- Accessibility : ≥ 90

---

## 🔧 Scripts Disponibles

```bash
npm run dev          # Serveur développement (port 3000)
npm run build        # Build production
npm run preview      # Preview du build
npm run analyze      # Analyse base de données
./deploy.ps1 vercel  # Déploiement automatique (Windows)
./deploy.sh vercel   # Déploiement automatique (Linux/Mac)
```

---

## 🔒 Sécurité & Confidentialité

- ✅ **Données locales** : Tout stocké en cache navigateur
- ✅ **IA privée** : Ollama local (aucune donnée cloud)
- ✅ **HTTPS** : Obligatoire en production (PWA requirement)
- ✅ **Headers sécurité** : CSP, X-Frame-Options, etc.
- ✅ **Pas de tracking** : Aucun analytics tiers
- ✅ **RGPD compliant** : Aucune collecte de données

---

## 🎯 Cas d'Usage

### 👨‍⚕️ Médecin Conseil au Cabinet
- Consultation avec patient
- Calcul IPP immédiat
- Suggestion IA pour cas complexes
- Consultation historique

### 🚑 Médecin en Déplacement
- Zone sans réseau
- **Mode offline** activé automatiquement
- Accès aux 962 lésions
- Calculs disponibles

### 🏥 Service Médical CNAS
- Installation sur postes fixes
- **Réseau intranet seulement**
- Pas de dépendance internet
- Mises à jour contrôlées

---

## 🤝 Contribution

Les contributions sont bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est destiné à un usage médical professionnel pour la CNAS (Caisse Nationale des Assurances Sociales - Algérie).

---

## 📞 Support

- **Issues :** [GitHub Issues](https://github.com/votre-username/calculateur-guide/issues)
- **Documentation :** Voir fichiers `.md` dans le projet
- **Contact CNAS :** [Contact technique]

---

## 🎉 Statut du Projet

```
✅ Base de données : 962/962 lésions (100%)
✅ IA locale : Ollama intégré
✅ PWA : Complète (offline + installable)
✅ Build production : Réussi
✅ Documentation : 15+ guides
✅ Prêt pour déploiement : OUI
```

---

## 🏆 Fonctionnalités à Venir

- [ ] Mode sombre
- [ ] Export PDF des calculs
- [ ] Statistiques d'utilisation
- [ ] Multi-langues (FR/AR)
- [ ] Synchronisation cloud (optionnel)
- [ ] Application mobile native (Flutter)

---

**Développé avec ❤️ pour les Médecins Conseils CNAS**

*Dernière mise à jour : 17 Octobre 2025*

  
  
 