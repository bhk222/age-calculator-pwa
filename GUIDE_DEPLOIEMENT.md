# 🚀 Guide de Déploiement - Calculateur IPP CNAS

## ✅ Build Production Réussi

Le build de production a été généré avec succès dans le dossier `dist/` :

```
dist/
├── index.html                      (2.78 KB)
├── assets/
│   ├── index-bKHoNjqB.js          (888.53 KB - 213.13 KB gzippé)
│   ├── index-C_WHojjf.css         (0.31 KB)
│   └── manifest-iiKn4z-H.json     (1.59 KB)
├── manifest.json
├── sw.js
└── icons/
```

---

## 🌐 Options de Déploiement

### Option 1 : Vercel (Recommandé - Gratuit)

#### ✨ Avantages
- Déploiement automatique depuis Git
- HTTPS gratuit
- CDN mondial
- Zero-config pour PWA
- Domaine gratuit (.vercel.app)

#### 📋 Étapes

1. **Créer compte Vercel**
   ```bash
   npm install -g vercel
   ```

2. **Initialiser le projet**
   ```bash
   vercel login
   vercel
   ```

3. **Configuration automatique**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Déployer**
   ```bash
   vercel --prod
   ```

5. **URL de production**
   ```
   https://calculateur-ipp-cnas.vercel.app
   ```

#### 🔄 Déploiements automatiques
- Push sur `main` = déploiement automatique
- Pull requests = preview deployments

---

### Option 2 : Netlify (Alternative gratuite)

#### ✨ Avantages
- Interface web intuitive
- Drag & drop du dossier `dist/`
- HTTPS automatique
- Support PWA natif

#### 📋 Étapes

1. **Via l'interface web**
   - Aller sur https://netlify.com
   - Créer un compte
   - "Add new site" → "Deploy manually"
   - Glisser-déposer le dossier `dist/`

2. **Via CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Configuration dans `netlify.toml`** (optionnel)
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

---

### Option 3 : GitHub Pages (Gratuit avec GitHub)

#### ✨ Avantages
- Gratuit avec repo GitHub
- Intégration native
- HTTPS automatique

#### 📋 Étapes

1. **Créer fichier `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Configuration dans `vite.config.ts`**
   ```typescript
   export default defineConfig({
     base: '/calculateur-guide/', // Nom du repo
     // ... reste de la config
   });
   ```

3. **Activer GitHub Pages**
   - Repo Settings → Pages
   - Source: `gh-pages` branch
   - URL : `https://username.github.io/calculateur-guide/`

---

### Option 4 : Serveur Propre (VPS/Dédié)

#### ✨ Avantages
- Contrôle total
- Données hébergées localement (CNAS)
- Personnalisation complète

#### 📋 Étapes

1. **Serveur avec Nginx**

   ```bash
   # Copier les fichiers
   scp -r dist/* user@serveur:/var/www/calculateur-ipp/

   # Configuration Nginx
   sudo nano /etc/nginx/sites-available/calculateur-ipp
   ```

   ```nginx
   server {
       listen 80;
       server_name calculateur-ipp.cnas.dz;

       root /var/www/calculateur-ipp;
       index index.html;

       # Support SPA routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache des assets
       location /assets/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }

       # Service Worker (pas de cache)
       location /sw.js {
           add_header Cache-Control "no-cache";
       }

       # Compression
       gzip on;
       gzip_types text/css application/javascript application/json;
   }
   ```

   ```bash
   # Activer le site
   sudo ln -s /etc/nginx/sites-available/calculateur-ipp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

2. **HTTPS avec Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d calculateur-ipp.cnas.dz
   ```

---

### Option 5 : Docker (Pour conteneurisation)

#### 📋 Dockerfile

```dockerfile
FROM nginx:alpine

# Copier les fichiers build
COPY dist/ /usr/share/nginx/html/

# Configuration Nginx pour SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 📋 nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /sw.js {
        add_header Cache-Control "no-cache";
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

#### 📋 Build et Run

```bash
# Build l'image
docker build -t calculateur-ipp:latest .

# Run le conteneur
docker run -d -p 80:80 calculateur-ipp:latest

# Docker Compose (docker-compose.yml)
version: '3'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: always
```

---

## 🔧 Configuration Pre-Déploiement

### 1. Variables d'environnement

Créer `.env.production` :
```env
VITE_APP_TITLE=Calculateur IPP CNAS
VITE_OLLAMA_URL=https://ollama.cnas.dz:11434
```

### 2. Optimisations Build

Dans `vite.config.ts` :
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'data': ['./data/disabilityRates.ts']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer console.log en prod
      }
    }
  }
});
```

### 3. Vérifier PWA avant déploiement

```bash
# Installer Lighthouse
npm install -g @lhci/cli

# Audit PWA
lhci autorun --collect.url=http://localhost:3000
```

**Checklist PWA :**
- ✅ Manifest.json valide
- ✅ Service Worker enregistré
- ✅ Icons 192x192 et 512x512
- ✅ HTTPS (obligatoire en production)
- ✅ Responsive design
- ✅ Cache-First strategy

---

## 📊 Tests Post-Déploiement

### 1. Test PWA

1. **Chrome DevTools**
   ```
   F12 → Application → Manifest
   F12 → Application → Service Workers
   F12 → Lighthouse → Run PWA audit
   ```

2. **Test Installation**
   - Ouvrir l'URL en production
   - Vérifier bouton "Installer"
   - Installer l'application
   - Tester en standalone mode

3. **Test Offline**
   - DevTools → Network → Offline
   - Rafraîchir la page
   - ✅ Application fonctionne
   - ✅ Indicateur orange visible

### 2. Performance

```bash
# Test Lighthouse
npm install -g lighthouse

lighthouse https://votre-url.com \
  --only-categories=performance,pwa,accessibility \
  --view
```

**Objectifs :**
- Performance : ≥ 90
- PWA : ≥ 90
- Accessibility : ≥ 90

### 3. Test Multi-Navigateurs

- ✅ Chrome (Desktop + Android)
- ✅ Edge (Desktop)
- ✅ Safari (iOS + macOS)
- ✅ Firefox

### 4. Test Multi-Appareils

- 📱 Smartphone (Android/iOS)
- 💻 Desktop (Windows/Mac/Linux)
- 📱 Tablette

---

## 🔒 Sécurité

### 1. Headers HTTP

Ajouter dans la configuration serveur :

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://localhost:11434;" always;
```

### 2. CORS pour Ollama

Si Ollama sur serveur distant :

```javascript
// services/geminiService.ts
const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';
```

Configuration serveur Ollama :
```bash
# Autoriser CORS
OLLAMA_ORIGINS=https://calculateur-ipp.cnas.dz ollama serve
```

---

## 📈 Monitoring

### 1. Analytics (Optionnel)

```typescript
// Ajouter Google Analytics ou Matomo
// index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Error Tracking

```bash
npm install @sentry/react
```

```typescript
// index.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

---

## 🔄 Mise à Jour

### 1. Versioning

Dans `package.json` :
```json
{
  "version": "1.0.0"
}
```

### 2. Service Worker Update

Le Service Worker se met à jour automatiquement :
- Nouveau build = nouveau hash des fichiers
- SW détecte les changements
- Mise à jour au prochain chargement

### 3. Notification utilisateurs

Ajouter un composant `UpdateNotification.tsx` :

```typescript
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nouvelle version disponible
            if (confirm('Nouvelle version disponible. Recharger ?')) {
              window.location.reload();
            }
          }
        });
      });
    });
  }
}, []);
```

---

## 🎯 Recommandation pour CNAS

### Déploiement Recommandé

**Solution hybride :**

1. **Production : Serveur CNAS (Intranet)**
   - Hébergement interne pour sécurité
   - Accessible uniquement réseau CNAS
   - Nginx + HTTPS avec certificat interne
   - URL : `https://ipp.cnas.dz` ou `https://calculateur.cnas.dz`

2. **Preview/Demo : Vercel (Internet)**
   - Version démo publique
   - Tests et démonstrations
   - URL : `https://calculateur-ipp-demo.vercel.app`

### Architecture Recommandée

```
┌─────────────────────────────────────┐
│   Médecins CNAS (Intranet)         │
│                                     │
│   https://ipp.cnas.dz              │
│   - PWA installable                 │
│   - Offline complet                 │
│   - Ollama local (serveur CNAS)    │
│   - Données sensibles protégées    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Démo Publique (Internet)          │
│                                     │
│   https://demo-ipp.vercel.app      │
│   - Version demonstration           │
│   - Pas de données sensibles       │
│   - Tests et validations           │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Déploiement Final

- [ ] Build production réussi (`npm run build`)
- [ ] Test local du build (`npx serve dist`)
- [ ] Audit Lighthouse PWA ≥ 90
- [ ] Icons 192x192 et 512x512 présents
- [ ] Manifest.json configuré correctement
- [ ] Service Worker fonctionne (cache + offline)
- [ ] Test installation sur mobile
- [ ] Test mode offline complet
- [ ] HTTPS configuré (obligatoire PWA)
- [ ] Headers sécurité configurés
- [ ] Test multi-navigateurs OK
- [ ] Test multi-appareils OK
- [ ] Documentation à jour
- [ ] Variables d'environnement configurées
- [ ] Monitoring configuré (optionnel)
- [ ] Plan de mise à jour défini

---

## 🚀 Commande Rapide

```bash
# Build
npm run build

# Test local
npx serve dist -p 3000

# Déploiement Vercel (le plus simple)
npx vercel --prod

# Ou Netlify
npx netlify deploy --prod --dir=dist
```

---

## 📞 Support Déploiement

### Ressources
- **Vercel Docs :** https://vercel.com/docs
- **Netlify Docs :** https://docs.netlify.com
- **PWA Checklist :** https://web.dev/pwa-checklist/
- **Lighthouse :** https://developers.google.com/web/tools/lighthouse

### Contact
- GitHub Issues : [Lien vers le repo]
- Support CNAS : [Contact technique]

---

**🎉 Votre application PWA est prête pour la production ! 🚀**
