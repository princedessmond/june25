// Service Worker — offline support for the June 25 Protest Portal.
// Caches core same-origin assets so critical info (Know Your Rights, hotline
// numbers, assembly points, the page itself) stays available without a signal.
// Bump CACHE_VERSION whenever the cached assets change to force an update.
const CACHE_VERSION = 'june25-v1';

const CORE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/security.js',
    '/google-sheets-config.js',
    '/manifest.json',
    '/icons/icon.svg',
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg',
    '/images/banner4.jpg'
];

// Pre-cache core assets on install. Use individual puts so one missing asset
// does not abort the whole install.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(cache =>
            Promise.all(CORE_ASSETS.map(url =>
                cache.add(url).catch(err => console.warn('SW: skipped caching', url, err))
            ))
        ).then(() => self.skipWaiting())
    );
});

// Clean up old caches on activate.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Cache-first for our own GET assets; network for everything else. Never touch
// POST requests (form submissions) or cross-origin requests (Leaflet CDN,
// map tiles, Google Sheets) so live data always goes to the network.
self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                // Cache successful responses for next time.
                if (response && response.status === 200 && response.type === 'basic') {
                    const copy = response.clone();
                    caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
                }
                return response;
            }).catch(() =>
                // Offline fallback: serve the app shell for navigations.
                request.mode === 'navigate' ? caches.match('/index.html') : undefined
            );
        })
    );
});
