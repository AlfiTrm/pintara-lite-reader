const CACHE_NAME = 'pintara-cache-v3';

const PRECACHE_ASSETS = [
    '/',
    '/home',
    '/books.json',
    '/manifest.json',
    '/_offline',
    '/icons/i1.webp',
    '/icons/i2.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching assets');
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        (async () => {
            try {
                const networkResponse = await fetch(event.request);

                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;

            } catch (error) {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                if (event.request.mode === 'navigate') {
                    return await caches.match('/_offline');
                }

                return new Response(null, { status: 404 });
            }
        })()
    );
});