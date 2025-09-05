const CACHE_NAME = 'pintara-lite-cache'

const urlToCache = [
    '/',
    '/home',
    '/icons/i1.jpg',
    '/icons/i2.png',
]

self.addEventListener('install', (event) => {
    console.log('Service Worker: I am installed!')

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching app shell..')
                return cache.addAll(urlToCache)
            })
    )
})


self.addEventListener('activate', (event) => {
    console.log('Service Worker: I am Activated!')
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('Service Worker: Serving from cache:', event.request.url)
                    return response
                }

                console.log('Service Worker: Fetching from network:', event.request.url)
                return fetch(event.request)
                    .then((networkResponse) => {
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, networkResponse.clone())
                                return networkResponse
                            })
                    })
            })
    )
})