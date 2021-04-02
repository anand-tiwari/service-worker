const cacheName = 'v2'
self.addEventListener('install', e => {
  console.log('serviceWorker installed !!');
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
  e.respondWith(
    fetch(e.request)
      .then(res => {
          const resClone = res.clone()
          caches.open(cacheName)
            .then(cache => {
              console.log('serviceWorker caching files !');
              // add response to cache
              cache.put(e.request, resClone)
          });
          return res;
      })
      .catch(err => caches
                    .match(e.request)
                    .then(res => res))
    );
})
