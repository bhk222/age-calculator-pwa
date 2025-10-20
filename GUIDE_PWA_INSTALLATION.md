# 📱 Guide d'Installation et Utilisation Offline

## 🎯 Application Progressive Web (PWA)

Le **Calculateur IPP CNAS** est une **Progressive Web App** qui peut être installée sur n'importe quel appareil et **fonctionne sans connexion internet**.

---

## ✨ Avantages de l'Installation

### 🚀 Performance
- Démarrage instantané (icône sur l'écran d'accueil)
- Chargement ultra-rapide des données
- Aucune attente réseau

### 📴 Mode Hors Ligne
- **Toutes les 962 lésions** disponibles offline
- Calculateur IPP fonctionnel sans internet
- Base de données en cache local
- Outils médicaux accessibles partout

### 💾 Légèreté
- **Pas d'app store** nécessaire
- Installation en 1 clic
- **< 10 MB** d'espace disque
- Mises à jour automatiques

### 🔒 Sécurité & Confidentialité
- Données stockées localement
- Aucune synchronisation cloud
- Calculs IPP 100% offline
- Conforme RGPD

---

## 📥 Installation sur Différents Appareils

### 🖥️ Windows (Chrome/Edge)

1. **Ouvrir l'application** dans Chrome ou Edge
2. **Cliquer sur le bouton** "Installer l'application" en haut de la page
3. **Alternative :** Cliquer sur l'icône ⊕ dans la barre d'adresse
4. **Confirmer** l'installation
5. **Résultat :** Icône ajoutée au bureau et menu démarrer

**Raccourci clavier :** `Ctrl + Maj + A` (Chrome)

### 🍎 macOS (Safari/Chrome)

#### Safari
1. Ouvrir l'application dans Safari
2. Menu **Fichier** → **Ajouter au Dock**
3. L'application apparaît dans le Dock

#### Chrome
1. Cliquer sur le bouton "Installer"
2. Ou menu **⋮** → **Installer Calculateur IPP**
3. Icône ajoutée au Launchpad

### 📱 Android (Chrome)

1. Ouvrir l'application dans Chrome
2. **Bannière d'installation** apparaît automatiquement
   - Ou cliquer sur "Installer l'application"
3. **Alternative :** Menu **⋮** → **Ajouter à l'écran d'accueil**
4. **Confirmer**
5. **Résultat :** Icône sur l'écran d'accueil

### 📱 iOS/iPadOS (Safari)

1. Ouvrir l'application dans Safari
2. Cliquer sur le bouton **Partager** (carré avec flèche vers le haut)
3. Faire défiler et sélectionner **"Sur l'écran d'accueil"**
4. Personnaliser le nom si souhaité
5. Cliquer sur **Ajouter**
6. **Résultat :** Icône sur l'écran d'accueil

---

## 🔧 Fonctionnement Offline

### 📊 Données Mises en Cache

L'application stocke automatiquement :

- ✅ **962 lésions du barème IPP** (662 KB)
- ✅ **Critères d'évaluation** (low/medium/high)
- ✅ **Maladies professionnelles** (base complète)
- ✅ **Code civil algérien** (articles législatifs)
- ✅ **Outils médicaux** (calculateurs, dictionnaires)
- ✅ **Interface complète** (HTML, CSS, JavaScript)

### 🔄 Stratégie de Cache

**Cache-First (Priorité Cache)**
- Fichiers de données (`/data/`)
- Composants React (`.tsx`, `.ts`)
- Feuilles de style (`.css`)
- **Avantage :** Accès instantané, même hors ligne

**Network-First (Priorité Réseau)**
- CDN externes (Tailwind, React)
- **Fallback :** Version en cache si hors ligne

### 📴 Indicateur de Statut

L'application affiche automatiquement :
- 🟢 **En ligne** : Données à jour
- 🟠 **Hors ligne** : Données en cache utilisées
- Notification lors du changement de statut

---

## 🧪 Test du Mode Offline

### Méthode 1 : DevTools (Développeurs)

1. Ouvrir **DevTools** (`F12`)
2. Onglet **Network**
3. Cocher **Offline** (en haut)
4. Recharger la page (`Ctrl+R`)
5. ✅ L'application fonctionne !

### Méthode 2 : Mode Avion

1. Activer le **mode avion** sur l'appareil
2. Ouvrir l'application installée
3. ✅ Calculateur IPP fonctionnel
4. ✅ Toutes les lésions accessibles
5. ✅ Calculs disponibles

### Méthode 3 : Déconnexion WiFi

1. Désactiver le WiFi
2. Utiliser l'application normalement
3. ✅ Aucune différence de fonctionnement

---

## 🔄 Mises à Jour Automatiques

### Fonctionnement

- **Vérification automatique** au démarrage
- **Téléchargement en arrière-plan**
- **Application immédiate** au prochain lancement
- **Aucune action requise**

### Version du Cache

- Version actuelle : `v37`
- Mise à jour incrémentale automatique
- Nettoyage des anciens caches

---

## ⚙️ Configuration Technique

### Service Worker

```javascript
// Fichier : sw.js
CACHE_NAME = 'at-mp-guide-cache-v37'
RUNTIME_CACHE = 'at-mp-runtime-v37'
```

**Stratégies :**
- Cache-First pour assets locaux
- Network-First pour CDN externes
- Runtime caching pour ressources dynamiques

### Manifest PWA

```json
{
  "name": "Calculateur IPP CNAS",
  "short_name": "Calculateur IPP",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#0f172a",
  "background_color": "#f1f5f9"
}
```

---

## 🛠️ Dépannage

### Problème : Application ne s'installe pas

**Solutions :**
1. Vérifier que le navigateur supporte les PWA :
   - Chrome ✅, Edge ✅, Safari ✅, Firefox ⚠️ (limité)
2. Vider le cache du navigateur
3. Utiliser HTTPS (obligatoire pour PWA)
4. Rafraîchir la page (`Ctrl+F5`)

### Problème : Données non disponibles offline

**Solutions :**
1. Se connecter à internet une première fois
2. Naviguer dans toutes les sections (pour mise en cache)
3. Vérifier le Service Worker dans DevTools :
   - `Application` → `Service Workers`
   - Statut : **Activated**

### Problème : Ancienne version affichée

**Solutions :**
1. **Fermer complètement** l'application
2. **Rouvrir** (nouvelle version chargée)
3. Alternative : Vider le cache
   - DevTools → `Application` → `Clear storage`
   - Cocher **Unregister service workers**
   - Cliquer **Clear site data**

---

## 📊 Statistiques de Performance

### Temps de Chargement

| Scénario | Temps | Performance |
|----------|-------|-------------|
| **Premier chargement** (online) | ~2-3s | Téléchargement initial |
| **Rechargement** (online) | ~0.5s | Cache actif |
| **Chargement offline** | **~0.2s** | ⚡ Instantané |

### Taille de Cache

- **Assets critiques :** ~5 MB
- **Données médicales :** 662 KB (disabilityRates.ts)
- **Total :** ~8-10 MB

---

## 🎓 Cas d'Usage

### 👨‍⚕️ Médecin en Consultation

**Scénario :** Consultation au cabinet, connexion internet instable

1. Application installée sur tablette
2. **Aucune connexion requise**
3. Calcul IPP immédiat
4. Consultation des critères détaillés
5. Suggestions IA locale (Ollama)

### 🚑 Médecin en Déplacement

**Scénario :** Visite à domicile, zone sans réseau

1. Application ouverte sur smartphone
2. **Mode offline automatique**
3. Accès à toute la base de données
4. Calculs IPP disponibles
5. Outils médicaux fonctionnels

### 🏥 Hôpital / Clinique

**Scénario :** Réseau hospitalier restreint

1. Installation sur postes fixes
2. **Fonctionnement autonome**
3. Pas de dépendance internet
4. Performances optimales
5. Sécurité des données

---

## 📞 Support

### Documentation Complète

- `README.md` : Guide d'utilisation général
- `GUIDE_IA_LOCALE_IPP.md` : Assistance IA avec Ollama
- `RAPPORT_FINAL_100_PERCENT.md` : Documentation technique

### Ressources

- **GitHub :** [Lien vers le dépôt]
- **Issues :** Pour signaler des bugs
- **Contact CNAS :** Support technique

---

## ✅ Checklist Installation Réussie

- [ ] Bouton "Installer" visible en haut de la page
- [ ] Icône de l'application sur l'écran d'accueil/bureau
- [ ] Ouverture en mode standalone (sans barre de navigateur)
- [ ] Indicateur offline fonctionnel
- [ ] Test en mode avion réussi
- [ ] Accès aux 962 lésions offline
- [ ] Calculateur IPP opérationnel sans internet
- [ ] Outils médicaux disponibles

---

## 🚀 Prochaines Étapes

Après installation :

1. **Explorer** toutes les sections (pour cache complet)
2. **Tester** le mode offline (mode avion)
3. **Configurer** l'IA locale Ollama (optionnel)
4. **Utiliser** quotidiennement pour évaluations IPP

---

**🎉 Votre Calculateur IPP est maintenant installé et fonctionne SANS INTERNET ! 📴**
