// OBIE Foto-Hoefbalans Meettool — Service Worker
// Bump CACHE_VERSION whenever the app files change so clients pick up the new version.
const CACHE_VERSION = 'obie-hoefbalans-v1-11';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-192-maskable.png',
  'icon-512-maskable.png',
  'apple-touch-icon.png',
  'favicon-64.png'
];

async function cleanResponse(response) {
  if (!response || !response.redirected) return response;
  const body = await response.blob();
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((cached) => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then(async (response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const cleaned = await cleanResponse(response.clone());
            const store = cleaned.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, store));
            return cleaned;
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
