// Update this version number whenever you make changes to force re-caching
// Example: v1 -> v2 -> v3
const CACHE_NAME = 'matchadda-v11';
const urlsToCache = [
  '/',
  '/index.html',
  '/schedule.html',
  '/teams.html',
  '/points-table.html',
  '/guides.html',
  '/about.html',
  '/faq.html',
  '/legal.html',
  '/maintenance.html',
  '/style.css',
  '/main.js',
  '/robots.txt',
  '/sitemap.xml',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;700;800&display=swap'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('[Service Worker] Cache error:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Smart caching strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  const isHtml = url.pathname.endsWith('.html') || url.pathname === '/';

  if (isHtml) {
    // Network-first strategy for HTML files (always get latest)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If network request is successful, cache it
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, use cached version
          return caches.match(event.request)
            .then(response => {
              return response || caches.match('/index.html');
            });
        })
    );
  } else {
    // Cache-first strategy for CSS, JS, images, fonts (for offline support)
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }

          return fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-matches') {
    event.waitUntil(
      fetch('/api/matches')
        .then(response => response.json())
        .then(data => {
          // Store synced data
          self.registration.scope;
        })
        .catch(err => console.log('Sync failed:', err))
    );
  }
});
