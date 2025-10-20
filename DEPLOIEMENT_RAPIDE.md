# 🚀 Déploiement Rapide

## ✅ Build Prêt

Le build de production a été généré avec succès dans `dist/` (888 KB → 213 KB gzippé).

---

## 🎯 Déploiement en 3 Commandes

### Option 1 : Vercel (Recommandé - 2 min)

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Résultat :** `https://calculateur-ipp-cnas.vercel.app`

---

### Option 2 : Netlify (Alternative - 2 min)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Résultat :** `https://calculateur-ipp-cnas.netlify.app`

---

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

---

## 🏠 Test Local du Build

```bash
# Option 1 : avec script
.\deploy.ps1 local

# Option 2 : avec npx
npx serve dist -p 3000
```

Ouvrir : http://localhost:3000

---

## 📱 Test PWA Post-Déploiement

1. **Installation**
   - Ouvrir l'URL de production
   - Cliquer sur le bouton bleu "Installer maintenant"
   - Confirmer l'installation

2. **Mode Offline**
   - DevTools (`F12`) → Network → Cocher "Offline"
   - Rafraîchir → ✅ L'application fonctionne !

3. **Lighthouse Audit**
   ```bash
   npx lighthouse https://votre-url.com --view
   ```
   
   **Objectif :** PWA Score ≥ 90

---

## 🔧 Configuration Spécifique

### GitHub Pages

1. Activer dans Settings → Pages
2. Push déclenche déploiement automatique (`.github/workflows/deploy.yml`)
3. URL : `https://username.github.io/calculateur-guide/`

### Serveur CNAS (Nginx)

```bash
# Copier les fichiers
scp -r dist/* user@serveur:/var/www/calculateur-ipp/

# Configuration déjà prête dans GUIDE_DEPLOIEMENT.md
```

---

## ✅ Checklist Post-Déploiement

- [ ] URL accessible (HTTPS obligatoire pour PWA)
- [ ] Bouton "Installer" visible
- [ ] Installation fonctionne sur mobile
- [ ] Mode offline opérationnel
- [ ] 962 lésions accessibles sans internet
- [ ] Indicateur réseau (orange/vert) fonctionne
- [ ] Service Worker actif (DevTools → Application)
- [ ] Score Lighthouse PWA ≥ 90

---

## 📞 Support

**Documentation complète :** `GUIDE_DEPLOIEMENT.md`

**Configuration :**
- Vercel : `vercel.json` ✅
- Netlify : `netlify.toml` ✅
- GitHub : `.github/workflows/deploy.yml` ✅

---

**🎉 Votre PWA est prête pour la production !**
