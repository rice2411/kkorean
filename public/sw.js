self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([
        "/offline.html",
        "/svg/500.svg",
        "/svg/logo.svg",
        // Không cần chỉ định cụ thể file CSS ở đây
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/assets/") && url.pathname.endsWith(".css")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            const responseClone = response.clone();
            caches.open("offline-cache").then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
        );
      })
    );
  } else {
    // Xử lý cho các file khác
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => {
            // Xử lý fallback cho các file SVG hoặc offline.html
            if (url.pathname.endsWith(".svg")) {
              return caches.match(url.pathname);
            }
            return caches.match("/offline.html");
          })
        );
      })
    );
  }
});
