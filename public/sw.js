

const CACHE_NAME = 'at-mp-guide-cache-v86';
const RUNTIME_CACHE = 'at-mp-runtime-v86';
const DATA_CACHE = 'at-mp-data-v86';

// Assets critiques à mettre en cache immédiatement
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest'
];

// Icons PWA
const ICON_ASSETS = [
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-384x384.png'
];

// Note: Après le build Vite, les fichiers .ts deviennent des .js bundlés
// On ne met PAS en cache les fichiers sources .ts/.tsx
// On laisse Vite gérer le bundle et on cache les résultats compilés

self.addEventListener('install', event => {
  console.log('[SW v86] 🚀 Installation - Mode OFFLINE COMPLET activé');
  event.waitUntil(
    Promise.all([
      // Cache les assets critiques
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW v86] 📦 Cache assets critiques');
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.error('[SW v86] ❌ Erreur cache critiques:', err);
        });
      }),
      // Cache les icônes PWA
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW v86] 🎨 Cache icônes PWA');
        return Promise.allSettled(
          ICON_ASSETS.map(url => 
            cache.add(url).catch(err => {
              console.warn(`[SW v86] ⚠️ Icône manquante: ${url}`);
              return null;
            })
          )
        );
      })
    ]).then(() => {
      console.log('[SW v86] ✅ Installation terminée - Prêt pour mode OFFLINE');
      // Activation immédiate pour prendre le contrôle
      return self.skipWaiting();
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const { url } = event.request;
  const requestURL = new URL(url);
  
  // Ignorer les requêtes vers des APIs externes (Gemini, etc.)
  if (requestURL.origin !== location.origin && 
      (url.includes('googleapis.com') || url.includes('generativelanguage'))) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ 
          error: 'Mode offline - API IA non disponible' 
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }
  
  // Stratégie CACHE-FIRST pour les fichiers compilés du build
  if (requestURL.origin === location.origin && 
      (url.includes('/assets/') || url.endsWith('.js') || url.endsWith('.css'))) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('[SW v86] � Build asset depuis cache:', requestURL.pathname);
          return cachedResponse;
        }
        // Si pas en cache, récupérer et mettre en cache
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          console.error('[SW v86] ❌ Offline - Asset build non disponible:', requestURL.pathname);
          return new Response('Offline', { status: 503 });
        });
      })
    );
    return;
  }
  
  // Stratégie CACHE-FIRST pour les données critiques (ne plus chercher .ts)
  if (url.includes('/data/')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('[SW v86] 📊 Données depuis cache:', requestURL.pathname);
          return cachedResponse;
        }
        // Si pas en cache, récupérer du réseau et mettre en cache
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DATA_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          console.warn('[SW v86] ⚠️ Données offline non disponibles:', requestURL.pathname);
          return new Response('{"error":"Offline"}', { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        });
      })
    );
    return;
  }

  // Stratégie CACHE-FIRST pour tous les autres assets locaux
  if (requestURL.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('[SW v86] 📦 Asset depuis cache:', requestURL.pathname);
          return cachedResponse;
        }
        
        // Si pas en cache, récupérer du réseau
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(error => {
          console.log('[SW v86] ⚠️ Offline - Ressource non disponible:', requestURL.pathname);
          // Retourner index.html pour les navigations HTML
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html').then(response => {
              if (response) return response;
              return new Response('Offline - Application non disponible', { 
                status: 503,
                headers: { 'Content-Type': 'text/html' }
              });
            });
          }
          return new Response('Offline', { status: 503 });
        });
      })
    );
    return;
  }

  // Stratégie NETWORK-FIRST pour les CDN externes (avec fallback cache)
  if (url.includes('cdn.') || url.includes('esm.sh') || url.includes('fonts.') || url.includes('unpkg')) {
    event.respondWith(
      fetch(event.request, { mode: 'cors' })
        .then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('[SW v86] 🔄 Fallback cache pour CDN:', url);
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            return new Response('CDN Offline', { status: 503 });
          });
        })
    );
    return;
  }

  // Par défaut: essayer le réseau, sinon le cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Activate - Nettoyer les anciens caches
self.addEventListener('activate', event => {
  console.log('[SW v86] 🔄 Activation - Mode OFFLINE COMPLET');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Garder seulement les caches de la version v86
          if (cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== DATA_CACHE) {
            console.log('[SW v86] 🗑️ Suppression cache obsolète:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW v86] ✅ Service Worker v86 actif - OFFLINE MODE READY');
      console.log('[SW v86] 📦 Caches:', CACHE_NAME, RUNTIME_CACHE, DATA_CACHE);
      // Prendre le contrôle immédiatement
      return self.clients.claim().then(() => {
        return self.clients.matchAll().then(clients => {
          console.log('[SW v86] 🎯 Contrôle de', clients.length, 'client(s)');
          clients.forEach(client => {
            client.postMessage({ 
              type: 'SW_ACTIVATED', 
              version: 'v86',
              offlineReady: true,
              caches: [CACHE_NAME, RUNTIME_CACHE, DATA_CACHE]
            });
          });
        });
      });
    })
  );
});

// Gestion des messages du client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
