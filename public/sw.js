self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          const url = new URL(event.request.url);

          if (url.pathname.endsWith(".svg")) {
            return caches.match(url.pathname);
          }

          return caches.match("/offline.html");
        })
      );
    })
  );
});
// Install event - Cache các file cần thiết
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([
        "/offline.html",
        "/svg/500.svg",
        "/svg/logo.svg",
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ]);
    })
  );
});