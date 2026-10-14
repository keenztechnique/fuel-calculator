const CACHE_NAME = 'fuel-calc-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов и выдача файлов из кэша, если нет сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем файл из кэша, если он там есть, иначе загружаем из сети
        return response || fetch(event.request);
      })
  );
});
