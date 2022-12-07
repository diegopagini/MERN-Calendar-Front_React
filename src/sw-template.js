/** @format */

// eslint-disable-next-line no-undef
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
// eslint-disable-next-line no-undef
workbox.loadModule('workbox-background-sync');
// eslint-disable-next-line no-restricted-globals, no-undef
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
// eslint-disable-next-line no-undef
const { registerRoute } = workbox.routing;
// eslint-disable-next-line no-undef
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
// eslint-disable-next-line no-undef
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
	new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
	new CacheFirst()
);

registerRoute(
	new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'),
	new CacheFirst()
);

registerRoute(
	new RegExp('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'),
	new CacheFirst()
);

registerRoute(new RegExp('http://localhost:4000/api/auth/renew'), new NetworkFirst());

registerRoute(new RegExp('http://localhost:4000/api/events'), new NetworkFirst());

// POST Offline
const bgSyncPlugin = new BackgroundSyncPlugin('offline-posts', {
	maxRetentionTime: 24 * 60,
});

registerRoute(
	new RegExp('http://localhost:4000/api/event'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);
