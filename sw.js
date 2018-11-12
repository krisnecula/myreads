const VERSION = 'v1';
const urlsToCache = [
  '/',
  '/package-lock.json',
  '/package.json',
  '/SEARCH_TERMS.md',
  '/src/components/Book.js',
  '/src/components/Shelf.js',
  '/src/components/pages/MainPage.js',
  '/src/components/pages/SearchPage.js',
  '/src/icons/add.svg',
  '/src/icons/arrow-back.svg',
  '/src/icons/arrow-drop-down.svg',
  '/src/App.css',
  '/src/App.js',
  '/src/App.test.js',
  '/src/BooksAPI.js',
  '/src/index.css',
  '/src/index.js'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(e) {

  e.respondWith(
    caches.match(e.request).then(function(response) {

      if (response) {
        return response;
      }

      else {
        return fetch(e.request)
        .then(function(response) {
          const responseClone = response.clone();
          caches.open(VERSION).then(function(cache) {
            cache.put(e.request, responseClone);
          })
          return response;
        })
      }
    })
  );
});
