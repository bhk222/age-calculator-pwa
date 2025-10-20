# 🔍 Diagnostic de Déploiement

## ❓ Problème Rencontré

"ça ne marche pas" - Diagnostic en cours...

---

## ✅ Statut Vercel

**Déploiement :** ● Ready (Prêt)  
**URL :** https://calculateur-guide-cp30zkqdt-bhk222s-projects.vercel.app  
**Durée build :** 13 secondes  
**Environnement :** Production  

---

## 🔍 Tests à Effectuer

### Test 1 : Accessibilité de Base

1. **Ouvrir l'URL dans le navigateur :**
   ```
   https://calculateur-guide-cp30zkqdt-bhk222s-projects.vercel.app
   ```

2. **Symptômes possibles :**
   - ❌ Page blanche → Erreur de build
   - ❌ 404 Not Found → Problème de routing
   - ❌ Erreur JavaScript → Problème de dépendances
   - ✅ Application se charge → Tout fonctionne !

### Test 2 : Console Développeur

1. Ouvrir DevTools (`F12`)
2. Onglet **Console**
3. Chercher des erreurs (en rouge)

**Erreurs courantes :**
- `Failed to load resource` → Fichiers manquants
- `Uncaught TypeError` → Erreur JavaScript
- `Service Worker registration failed` → Problème SW

### Test 3 : Network

1. DevTools (`F12`) → Onglet **Network**
2. Rafraîchir la page
3. Vérifier :
   - ✅ `index.html` → Status 200
   - ✅ `assets/index-*.js` → Status 200
   - ✅ `sw.js` → Status 200
   - ✅ `manifest.webmanifest` → Status 200

---

## 🛠️ Solutions selon le Problème

### Problème 1 : Page Blanche

**Cause :** Erreur dans le build ou mauvaise configuration

**Solution :**
```bash
# Rebuild et redéployer
npm run build
vercel --prod --yes
```

### Problème 2 : Erreur 404

**Cause :** Routing SPA non configuré

**Solution :** Le fichier `vercel.json` devrait avoir :
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**Vérifier :**
```bash
cat vercel.json
```

### Problème 3 : Service Worker Échoue

**Cause :** Chemin incorrect ou cache CORS

**Solution :**
1. Vérifier que `sw.js` est dans `public/`
2. S'assurer qu'il est copié dans `dist/`
3. Headers corrects dans `vercel.json`

### Problème 4 : Assets Non Chargés

**Cause :** Chemins relatifs incorrects

**Solution :**
Dans `vite.config.ts`, vérifier :
```typescript
export default defineConfig({
  base: '/', // Pas de sous-dossier
  // ...
})
```

---

## 🔧 Test Manuel Complet

### Étape 1 : Test Local du Build

```bash
# Vérifier le build local
npm run build
npx serve dist -p 3001
```

Ouvrir : http://localhost:3001

**Si ça marche en local mais pas sur Vercel :**
→ Problème de configuration Vercel

**Si ça ne marche pas en local non plus :**
→ Problème dans le build

### Étape 2 : Inspecter le Dist

```bash
# Lister le contenu de dist/
Get-ChildItem dist -Recurse
```

**Vérifier la présence de :**
- ✅ `index.html`
- ✅ `sw.js`
- ✅ `manifest.webmanifest`
- ✅ `assets/index-*.js`
- ✅ `assets/index-*.css`
- ✅ `icons/` (optionnel)

### Étape 3 : Vercel Inspect

```bash
# Obtenir l'URL d'inspection
vercel inspect
```

Ça ouvre le dashboard avec :
- Logs de build
- Logs runtime
- Variables d'environnement
- Configuration détectée

---

## 📋 Checklist de Dépannage

- [ ] URL accessible dans le navigateur
- [ ] Console sans erreurs (F12)
- [ ] Network tab : tous les fichiers chargent (200)
- [ ] `dist/index.html` existe
- [ ] `dist/sw.js` existe
- [ ] `vercel.json` configuré correctement
- [ ] Build local fonctionne (`npx serve dist`)
- [ ] Service Worker s'enregistre

---

## 🚀 Redéploiement Propre

Si rien ne fonctionne, recommencer from scratch :

```bash
# 1. Nettoyer
rm -rf dist
rm -rf .vercel
rm -rf node_modules

# 2. Réinstaller
npm install

# 3. Rebuild
npm run build

# 4. Vérifier le build local
npx serve dist -p 3001
# Tester → Si OK, continuer

# 5. Redéployer
vercel --prod --yes
```

---

## 📞 Informations pour le Support

**Compte Vercel :** bhk222s-projects  
**Projet :** calculateur-guide  
**Framework :** Vite  
**Node Version :** 18+  
**Build Command :** `npm run build`  
**Output Directory :** `dist`  

**Dernière URL de déploiement :**
```
https://calculateur-guide-cp30zkqdt-bhk222s-projects.vercel.app
```

**Dashboard :**
```
https://vercel.com/bhk222s-projects/calculateur-guide
```

---

## 🔍 Prochaine Étape

**S'il vous plaît, dites-moi exactement ce qui ne fonctionne pas :**

1. ❌ La page ne se charge pas du tout (erreur 404/500) ?
2. ❌ La page se charge mais est blanche ?
3. ❌ La page se charge mais le calculateur ne marche pas ?
4. ❌ Le bouton "Installer" n'apparaît pas ?
5. ❌ Le mode offline ne fonctionne pas ?
6. ❌ Les 962 lésions ne s'affichent pas ?
7. ❌ L'IA Ollama ne marche pas ?
8. ❌ Autre problème (précisez) ?

**Avec cette information, je pourrai vous aider précisément ! 🎯**
