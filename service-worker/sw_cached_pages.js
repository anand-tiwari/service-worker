const cacheName = 'v1'

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/styles.css',
  '/js/main.js'
]

self.addEventListener('install', e => {
  console.log('serviceWorker installed !!');

  e.waitUntil(
    caches.open(cacheName)
          .then(cache => {
            console.log('serviceWorker caching files !');
            cache.addAll(cacheAssets)
          })
          .then(() => self.skipWaiting())
  )
});


self.addEventListener('activate', e => {
  console.log('serviceWorker activated !!');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache != cacheName) {
            console.log('serviceWorker: clearing old cache!!');
            return caches.delete(cache)
          }
        })
      )
    })
  )
});


self.addEventListener('fetch', e => {
  console.log('serviceWorker: fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})
