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

// Network First.
const cacheNetworkFirst = ['/api/auth/renew', '/api/events'];
registerRoute(({ url }) => {
	if (cacheNetworkFirst.includes(url.pathname)) return true;
	return false;
}, new NetworkFirst());

// Cache first.
const cacheFirstNetwork = [
	'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
];
registerRoute(({ url }) => {
	if (cacheFirstNetwork.includes(url.href)) return true;
}, new CacheFirst());

// POST Offline.
const bgSyncPlugin = new BackgroundSyncPlugin('offline-crud', {
	maxRetentionTime: 24 * 60,
});

registerRoute(
	new RegExp('http://localhost:4000/api/event'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'POST'
);

// DELETE Offline.
registerRoute(
	new RegExp('http://localhost:4000/api/event/'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'DELETE'
);

// PUT Offline.
registerRoute(
	new RegExp('http://localhost:4000/api/event/'),
	new NetworkOnly({
		plugins: [bgSyncPlugin],
	}),
	'PUT'
);
