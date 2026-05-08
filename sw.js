// Bible Quiz - Service Worker for Push Notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '📖',
    badge: '📖',
    tag: data.tag || 'bible-quiz',
    requireInteraction: false
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
