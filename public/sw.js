/*
 * Self-destroying service worker.
 *
 * The Gatsby site registered a Workbox service worker at this path that
 * precached the app shell. Returning visitors still have it installed, and if
 * this path simply disappeared they could keep being served the old cached
 * site. Browsers re-fetch the worker script on navigation, so shipping this
 * in its place makes the old registration replace itself with one that clears
 * every cache, unregisters, and reloads open tabs onto the live site.
 *
 * Safe to delete once enough time has passed that no visitor is still
 * carrying the Gatsby worker.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();

      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) client.navigate(client.url);
    })(),
  );
});
