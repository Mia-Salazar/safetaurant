const CACHE_NAME = 'foodiesaurus-cache-v3';
const urlsToCache = [
  '/assets/img/192.png',
  '/assets/img/512.png'
];

// Evento de instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('Error al añadir archivos al caché:', error);
    })
  );
});

// Intercepta solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }).catch(error => {
      console.error('Error en fetch:', error);
    })
  );
});

self.addEventListener('activate', event => {
  // Remove old caches
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();
        return keys.map(async (cache) => {
          if(cache !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache: '+cache);
            return await caches.delete(cache);
          }
        })
      })()
    )
  })

self.caches.delete('foodiesaurus-cache-v3')
