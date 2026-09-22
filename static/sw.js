/*
 * Self-destroying service worker.
 *
 * The site used to ship a Workbox service worker here, installed by
 * gatsby-plugin-offline. That worker precached the app shell and served it
 * cache-first, which meant a returning visitor saw the *previous* deploy on
 * their first page load after a release.
 *
 * The plugin is gone, but the worker it installed is still resident in the
 * browser of everyone who has visited, and it would keep serving its precache
 * indefinitely. Browsers re-fetch the worker script on navigation, so shipping
 * this in its place makes the old registration replace itself with one that
 * clears every cache, unregisters, and reloads open tabs onto the live site.
 *
 * Serving nothing here instead is not reliable enough: whether a 404 on the
 * worker script unregisters an existing registration has varied between
 * browsers and versions, so the retirement is done explicitly.
 *
 * Safe to delete once enough time has passed that no visitor is still carrying
 * the Workbox worker. Until then it must keep being served from this exact
 * path, because that is where the old registration looks.
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
