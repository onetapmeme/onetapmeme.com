// $1TAP Push Notification Service Worker

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event);
  
  if (!event.data) {
    console.log('[SW] Push event but no data');
    return;
  }

  try {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New notification from $1TAP',
      icon: data.icon || 'https://storage.googleapis.com/gpt-engineer-file-uploads/bzha1MKxKTbCseyWzTBWNn1IviE2/uploads/1760711243340-onetap_new_logo.png',
      badge: 'https://storage.googleapis.com/gpt-engineer-file-uploads/bzha1MKxKTbCseyWzTBWNn1IviE2/uploads/1760711243340-onetap_new_logo.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
        timestamp: Date.now(),
        ...data.data
      },
      actions: data.actions || [
        { action: 'open', title: 'Open' },
        { action: 'dismiss', title: 'Dismiss' }
      ],
      tag: data.tag || 'onetap-notification',
      renotify: true,
      requireInteraction: data.requireInteraction || false
    };

    event.waitUntil(
      self.registration.showNotification(data.title || '$1TAP Alert', options)
    );
  } catch (error) {
    console.error('[SW] Error processing push event:', error);
    
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('$1TAP', {
        body: event.data.text() || 'New notification',
        icon: 'https://storage.googleapis.com/gpt-engineer-file-uploads/bzha1MKxKTbCseyWzTBWNn1IviE2/uploads/1760711243340-onetap_new_logo.png',
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already an open window
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle background sync for offline notifications
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-notifications') {
    event.waitUntil(
      // Sync any pending notifications
      Promise.resolve()
    );
  }
});
