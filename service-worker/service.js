https://wwwuata.gdn-app.com/serviceworker.js

/* eslint-disable no-undef */
/* PWA CACHE STRATEGI FOR BLIBLI.COM */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js',
  'https://cdn.moengage.com/webpush/releases/serviceworker_cdn.min.latest.js'
)

const CACHE_NAME = 'blibli-pwa'

const _staticDomain = '{{_STATIC_PUBLIC_PATH}}'
const _envPrefix = '{{_ENV_PREFIX}}'

const _staticPublicDomain = _staticDomain.replace('frontend/', '')
const BASE_PATH = _staticDomain + 'static/'

const precachedFiles = {"vendor":["nr/v3/index.js"],"css":[_envPrefix + "app.6c0a9261d3c8976b67f5541523fb41fa.css"],"js":["0.a561ac58cab95134267e.js","1.ddbd16a350ae2998fe8f.js","10.1f8c3e5bdb6cf2ab9e34.js","11.2bf31ef314879803fd2e.js","12.997b71e57189e2002e3f.js","13.32ef3773f071106ef82a.js","14.482e78c5be193bdde041.js","15.0aaf143727035c88078f.js","16.85c52203d70fcb74dcb4.js","17.6cf5b643e8b5181c5d87.js","18.731390c4fc4d82f43d9f.js","19.5267972fefb27e70888e.js","2.99f0bd7e35813081082d.js","20.c9218fe9979b5abfe7f6.js","21.39d379fda56d43996172.js","22.7c22117327ff423a942f.js","25.48d4a5bb38332431f8b8.js","26.0fbbcac6cdd13bf5bf96.js","27.53618bc2ece1f28ab6cb.js","28.30797500be6438b2eecd.js","29.859e6ba9f0586290aecc.js","3.a3a3d89e098a952cae42.js","30.1a3bb8d165984d28c325.js","31.02b3ea6ecaa8320ceda2.js","32.08c3bee99a4c2bf18296.js","33.016b44b5d473c80c1f96.js","34.fd687761d63fe33d8864.js","35.885cece8ffae32e1fa85.js","36.0d8e0609a88bfce4c2c0.js","4.4b92fc5796d6b03201dc.js","5.bb65da9df88d08d1a6d2.js","6.2460595599540130c814.js","7.14d0acd4ba30fdb561fa.js","8.bd184c0f452528591539.js","9.e8056eaf59e3a05f9517.js","app.d9e16e6abaec35ed2a43.js","manifest.ac8886025a697fd6b13c.js","vendor.3b3d8fcb05bc29f7cd52.js"],"fonts":["blicon.458d0a4.eot","blicon.9b6d6f2.ttf","blicon.c8f0a58.woff2","blihome.0027320.eot","blihome.7021d49.woff2","blihome.d0e1b32.ttf","v1"],"icons":["blibli-16.png"],"img":["404.7917f55.svg","500.f05684f.svg","apps-sprite.6689898.png","assets-registrasi-pattern.4453e61.png","assets_bg_footer.ad8bf5e.png","bpjs.3fb88e5.svg","brand-bg.4da29a2.png","data-package.17d0987.svg","default-image.acabbd8.png","e-voucher.6244575.svg","e-wallet.23fcba9.svg","electricity-credit.befdeca.svg","empty-shopping-bag.0163af8.png","extra-discount.9b906c2.png","flight.f1da955.svg","game-voucher.53d01dc.svg","game.eab98f4.svg","header-footer-sprite.a011bc9.png","hotel.07859b2.svg","hotel.ca6dd0f.svg","multi-finance.d1f6158.svg","multifinance.feeaa74.svg","phone-credit.bb772a6.svg","phone-postpaid.77b0719.svg","registrasi-banner.ac7a591.jpg","train.f7ace88.svg","tv-kabel.05314a5.svg","usp-badge.fa19e2d.svg","usp-call.c0c0663.svg","usp-free-shipping.16dca2c.svg","usp-number-one.5ceacbe.png","usp-return.d639c5c.svg","usp-truck.887f6ed.svg","water-bill.6a9f08a.svg","zakat.0590851.svg"]}

let precachedPaths = []
for (const i in precachedFiles) {
  const f = precachedFiles[i]
  f.map(function (item) {
    precachedPaths.push(`${BASE_PATH}${i}/${item}`)
  })
}

workbox.precaching.precacheAndRoute(precachedPaths)

function generateCacheableConfig (name, maxEntry, maxDay) {
  return {
    cacheName: CACHE_NAME + name,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: maxEntry,
        maxAgeSeconds: maxDay * 24 * 60 * 60
      })
    ]
  }
}

const staticRoutes = [
  {
    regexes: [
      './bwa/.',
      '^https://fonts.(?:googleapis|gstatic).com/(.*)',
      '^https://storage.(?:googleapis|gstatic).com/(.*)',
      '^https://livechat.blibli.com/(.*)',
      '^https://blibli.api.sociaplus.com/(.*)',
      '^https://ssp.adskom.com/(.*)',
      '^https://static.criteo.net/(.*)',
      '^https://dev.visualwebsiteoptimizer.com/(.*)',
      '^https://js-agent.newrelic.com/(.*)'
    ],
    cache: generateCacheableConfig('__thirdparty', 20, 7)
  },
  {
    regexes: [`^${_staticDomain}+.(.*).(js|css|html|png|gif|jpg|jpeg|svg)`],
    cache: generateCacheableConfig('__static-src--frontend', 100, 365)
  },
  {
    regexes: [`^${_staticDomain}.*(index).(js|css|html)`],
    cache: generateCacheableConfig('__static-src--index', 20, 365)
  },
  {
    regexes: [`^${_staticPublicDomain}+.(.*).(js|css|html|png|gif|jpg|jpeg|svg)`],
    cache: generateCacheableConfig('__static-src--root', 100, 7)
  },
  {
    regexes: [
      '/backend/content/pages/home2018',
      '/backend/search/homepage-recommendation',
      '/?utm_source=pwa-launcher'
    ],
    cache: generateCacheableConfig('__5min_cache-first', 100, 0.003472)
  },
  {
    regexes: [
      '/backend/common/payments/_active/web',
      '/getCategoryStructures'
    ],
    cache: generateCacheableConfig('__1d_cache-first', 300, 1)
  },
  {
    regexes: [
      '/backend/content/seo'
    ],
    cache: generateCacheableConfig('__7d_cache-first', 100, 7)
  }
]

const staleWhileRevalidateRoutes = [
  {
    regexes: [
      '/backend/common/configs',
      '/backend/search/curatedKeywords',
      '/backend/common/banners',
      '/backend/member/rewards'
    ],
    cache: generateCacheableConfig('__SWR__backend', 100, 0)
  }
]

function containsAny(arr, substring) {
  for (var i = 0; i != arr.length; i++) {
     if (arr[i].indexOf(substring) != - 1) {
       return i
     }
  }
  return -1
}

const idxOfDefaultImage = this.containsAny(precachedFiles.img, 'default-image')

// STATIC RESOURCES ASSETS
staticRoutes.map(function (item) {
  console.log('***CACHE FIRST***')
  item.regexes.map(function (regStr) {
    console.log('register route: ', regStr)
    workbox.routing.registerRoute(
      new RegExp(regStr),
      new workbox.strategies.CacheFirst(item.cache)
    )
  })
})

//Stale While Revalidate
staleWhileRevalidateRoutes.map(function (item) {
  console.log('***STALE WHILE REVALIDATE***')
  item.regexes.map(function (regStr) {
    console.log('register route: ', regStr)
    workbox.routing.registerRoute(
      new RegExp(regStr),
      new workbox.strategies.StaleWhileRevalidate(item.cache)
    )
  })
})

 workbox.routing.setCatchHandler(({event}) => {
   console.log('default handler', _staticPublicDomain)
  // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
  // or precaching.
  // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
  // to get the correct cache key to pass in to caches.match().
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'image':
      return caches.match((BASE_PATH+'img/'+precachedFiles.img[idxOfDefaultImage]));
    break;

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});
