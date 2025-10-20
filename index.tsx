
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// ACTIVATION DU SERVICE WORKER POUR FONCTIONNEMENT OFFLINE
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('✅ Service Worker enregistré avec succès:', registration.scope);
        
        // Vérifier les mises à jour toutes les heures
        setInterval(() => {
          registration.update();
        }, 3600000); // 1 heure
        
        // Gérer les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🆕 Nouvelle version disponible ! Rechargement...');
                // Informer l'utilisateur qu'une mise à jour est disponible
                if (confirm('Une nouvelle version est disponible. Recharger maintenant ?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
      });
    
    // Gérer le rechargement forcé
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Nouveau Service Worker actif - Rechargement...');
      window.location.reload();
    });
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);