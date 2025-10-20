# 🚀 Déploiement Vercel - Instructions

## ✅ Vercel CLI est installé

Le processus de déploiement a commencé. Vercel vous pose des questions interactives.

---

## 📋 Réponses à fournir dans le terminal :

### Question 1 : Set up and deploy?
```
? Set up and deploy "~\Desktop\calculateur-guide"? (Y/n)
```
**Réponse :** Appuyez sur `Y` ou `Entrée`

---

### Question 2 : Which scope?
```
? Which scope do you want to deploy to?
```
**Réponse :** Sélectionnez votre compte personnel

---

### Question 3 : Link to existing project?
```
? Link to existing project? (y/N)
```
**Réponse :** Appuyez sur `N` ou `Entrée` (nouveau projet)

---

### Question 4 : Project name
```
? What's your project's name?
```
**Réponse :** Tapez `calculateur-ipp-cnas` (ou laissez le nom par défaut)

---

### Question 5 : Directory
```
? In which directory is your code located?
```
**Réponse :** `./` (laissez par défaut et appuyez sur Entrée)

---

### Question 6 : Override settings?
```
? Want to override the settings? [y/N]
```
**Réponse :** Appuyez sur `N` ou `Entrée`

---

## 🎯 Après le déploiement

Vercel va :
1. ✅ Détecter automatiquement Vite
2. ✅ Installer les dépendances (`npm install`)
3. ✅ Build le projet (`npm run build`)
4. ✅ Déployer sur leur CDN
5. ✅ Fournir une URL de production

---

## 🌐 URL de Production

Après le déploiement, vous recevrez une URL comme :
```
https://calculateur-ipp-cnas.vercel.app
```

Ou :
```
https://calculateur-ipp-cnas-username.vercel.app
```

---

## 🔄 Alternative : Déploiement Automatique

Si vous préférez éviter les questions interactives, vous pouvez :

### 1. Se connecter d'abord
```powershell
vercel login
```

### 2. Puis déployer avec un fichier de config
Le fichier `vercel.json` est déjà configuré !

### 3. Relancer le déploiement
```powershell
vercel --prod --yes
```
(Le flag `--yes` répond automatiquement `yes` à toutes les questions)

---

## 📱 Après le Déploiement

### 1. Tester l'URL
Ouvrez l'URL fournie par Vercel dans votre navigateur

### 2. Vérifier PWA
- Chercher le bouton "📱 Installer maintenant"
- Installer l'application
- Tester le mode offline

### 3. Audit Lighthouse
```bash
npx lighthouse https://votre-url.vercel.app --view
```

---

## 🔧 Configuration Vercel Dashboard

Après le premier déploiement, vous pouvez :

1. **Aller sur** https://vercel.com/dashboard
2. **Sélectionner** votre projet
3. **Configurer** :
   - Domaine personnalisé
   - Variables d'environnement
   - Déploiements automatiques (Git)

---

## 🔄 Déploiements Futurs

### Avec Git (Recommandé)
```bash
# 1. Connecter à GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/calculateur-guide.git
git push -u origin main

# 2. Dans Vercel Dashboard
# → Import Git Repository
# → Déploiement automatique à chaque push !
```

### Sans Git
```bash
# Redéployer après des changements
vercel --prod
```

---

## ✅ Checklist Post-Déploiement

- [ ] URL accessible (HTTPS ✅)
- [ ] Application se charge correctement
- [ ] Bouton "Installer" visible
- [ ] Service Worker actif (DevTools)
- [ ] Mode offline fonctionne
- [ ] 962 lésions accessibles
- [ ] Calculateur IPP opérationnel
- [ ] Test sur mobile
- [ ] Score Lighthouse PWA ≥ 90

---

## 🎉 Félicitations !

Votre application est maintenant **LIVE** et accessible à tous !

Partagez l'URL avec l'équipe CNAS pour tests et validation.

---

**📞 Besoin d'aide ?**
Consultez : [GUIDE_DEPLOIEMENT.md](GUIDE_DEPLOIEMENT.md)
