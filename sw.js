var APP_PREFIX = 'secure-wallet'
var VERSION = '0.0.0.1'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  '/secure-wallet/',
  '/secure-wallet/index.html',
  '/secure-wallet/main.css',
  '/secure-wallet/main.js',
  '/secure-wallet/manifest.json',
  '/secure-wallet/images/favicon-16x16.png',
]
self.addEventListener('install', e => e.waitUntil(swInstall()))
self.addEventListener('activate', e => e.waitUntil(swActivate()))
self.addEventListener('fetch', e => e.respondWith(swFetch(e)))


async function swFetch(e) {
  console.log('sw[fetch]')
  let request = await caches.match(e.request);
  return request || fetch(e.request)
}


async function swInstall() {
  console.log('sw[install]')
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS);
  await self.skipWaiting();
}


async function swActivate() {
  console.log('sw[activate]')
  let keyList = await caches.keys();
  let cacheWhitelist = keyList.filter(key => key.indexOf(APP_PREFIX));
  cacheWhitelist.push(CACHE_NAME)
  return Promise.all(keyList.map(function (key, i) {
    if (cacheWhitelist.indexOf(key) === -1) {
      console.log('deleting cache : ' + keyList[i] )
      return caches.delete(keyList[i])
    }
  }))
}
