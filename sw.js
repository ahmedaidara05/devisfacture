// sw.js - Service Worker pour l'application de devis
const CACHE_NAME = 'devis-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://i.postimg.cc/85RsLkrb/LOGO.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker installé');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Mise en cache des ressources');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activé');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Renvoie la version en cache ou effectue la requête réseau
        return response || fetch(event.request);
      })
  );
});
