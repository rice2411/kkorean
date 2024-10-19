// src/service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open("static-v1").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./favicon.svg",
        "./pwa-192x192.png",
        "./pwa-512x512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker fetching.", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
