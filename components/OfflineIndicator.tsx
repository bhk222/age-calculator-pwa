import React, { useState, useEffect } from 'react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      console.log('[Network] 🟢 Connexion rétablie');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
      console.log('[Network] 🔴 Mode hors ligne - Données en cache disponibles');
    };

    // Écouter les messages du Service Worker
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SW_ACTIVATED') {
        setSwReady(true);
        console.log('[SW] ✅ Service Worker actif -', event.data.version, '- Mode offline prêt');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSWMessage);
      
      // Vérifier si SW déjà actif
      navigator.serviceWorker.ready.then(() => {
        setSwReady(true);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSWMessage);
      }
    };
  }, []);

  // Notification temporaire quand le statut change
  if (showNotification) {
    return (
      <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-orange-500 text-white'
      }`}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Connexion rétablie</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
              </svg>
              <span className="font-medium">Mode hors ligne</span>
            </>
          )}
        </div>
      </div>
    );
  }

  // Indicateur permanent en mode offline
  if (!isOnline) {
    return (
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-300 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-orange-800">
            {swReady ? '📴 Mode hors ligne - Toutes les données disponibles' : '📴 Mode hors ligne'}
          </span>
        </div>
      </div>
    );
  }

  // Petit indicateur vert discret quand online avec SW prêt
  if (isOnline && swReady && !showNotification) {
    return (
      <div className="fixed bottom-20 right-4 z-40 px-2 py-1 rounded-full bg-green-50 border border-green-200 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-green-700">
            ⚡ Prêt offline
          </span>
        </div>
      </div>
    );
  }

  return null;
};
