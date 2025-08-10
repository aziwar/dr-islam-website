// SERVICE WORKER - Advanced caching strategy and offline functionality
// PWA implementation for Dr. Islam dental practice website

const CACHE_VERSION = 'v1.2.0';
const CACHE_NAME = `dr-islam-dental-${CACHE_VERSION}`;

// Cache strategy configurations
const CACHE_STRATEGIES = {
  // Critical resources - Cache First with Network Fallback
  CRITICAL: {
    name: `${CACHE_NAME}-critical`,
    strategy: 'cache-first',
    maxAge: 86400000, // 24 hours
    maxEntries: 50
  },
  
  // Images - Cache First with Stale While Revalidate
  IMAGES: {
    name: `${CACHE_NAME}-images`,
    strategy: 'stale-while-revalidate',
    maxAge: 604800000, // 7 days
    maxEntries: 100
  },
  
  // API responses - Network First with Cache Fallback
  API: {
    name: `${CACHE_NAME}-api`,
    strategy: 'network-first',
    maxAge: 300000, // 5 minutes
    maxEntries: 25
  },
  
  // Static assets - Cache First
  STATIC: {
    name: `${CACHE_NAME}-static`,
    strategy: 'cache-first',
    maxAge: 2592000000, // 30 days
    maxEntries: 75
  }
};

// Resources to precache on install
const PRECACHE_RESOURCES = [
  '/',
  '/css/critical.css',
  '/js/core-utils.js',
  '/js/ui-components.js',
  '/optimized-images/logo-80w.webp',
  '/optimized-images/hero-1920w.webp',
  '/manifest.json'
];

// API endpoints for network-first caching
const API_ENDPOINTS = [
  '/api/availability',
  '/api/services',
  '/api/contact',
  '/api/gallery/public'
];

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_STRATEGIES.CRITICAL.name);
        await cache.addAll(PRECACHE_RESOURCES);
        console.log('✅ Critical resources precached');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('❌ Precaching failed:', error);
      }
    })()
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(name => name.startsWith('dr-islam-dental-') && name !== CACHE_NAME)
          .map(name => caches.delete(name));
        
        await Promise.all(deletePromises);
        
        // Take control of all pages
        await self.clients.claim();
        
        console.log('✅ Service Worker activated and old caches cleaned');
      } catch (error) {
        console.error('❌ Activation failed:', error);
      }
    })()
  );
});

// Fetch event - main caching logic
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;
  
  event.respondWith(handleRequest(request));
});

/**
 * Main request handler with strategy selection
 * @param {Request} request - The request to handle
 * @returns {Promise<Response>} The response
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Determine caching strategy based on request
    if (isAPIRequest(pathname)) {
      return await networkFirstStrategy(request, CACHE_STRATEGIES.API);
    } else if (isImageRequest(pathname)) {
      return await staleWhileRevalidateStrategy(request, CACHE_STRATEGIES.IMAGES);
    } else if (isStaticAsset(pathname)) {
      return await cacheFirstStrategy(request, CACHE_STRATEGIES.STATIC);
    } else if (isCriticalResource(pathname)) {
      return await cacheFirstStrategy(request, CACHE_STRATEGIES.CRITICAL);
    } else {
      // Default: network first for HTML pages
      return await networkFirstStrategy(request, CACHE_STRATEGIES.CRITICAL);
    }
  } catch (error) {
    console.error('❌ Request handling failed:', error);
    return await getOfflineFallback(request);
  }
}

/**
 * Cache First Strategy - Check cache first, then network
 * Best for: Static assets, critical resources
 */
async function cacheFirstStrategy(request, config) {
  const cache = await caches.open(config.name);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache is still fresh
    const cacheTime = cachedResponse.headers.get('sw-cache-time');
    const isExpired = cacheTime && (Date.now() - parseInt(cacheTime)) > config.maxAge;
    
    if (!isExpired) {
      console.log(`📦 Cache hit: ${request.url}`);
      return cachedResponse;
    }
  }
  
  try {
    console.log(`🌐 Network fetch: ${request.url}`);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      
      // Add cache timestamp
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await cleanupCache(cache, config.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn(`⚠️ Network failed, returning cached version: ${request.url}`);
    return cachedResponse || await getOfflineFallback(request);
  }
}

/**
 * Network First Strategy - Try network first, fallback to cache
 * Best for: API responses, dynamic content
 */
async function networkFirstStrategy(request, config) {
  const cache = await caches.open(config.name);
  
  try {
    console.log(`🌐 Network first: ${request.url}`);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      
      // Add cache timestamp
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await cleanupCache(cache, config.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn(`⚠️ Network failed, checking cache: ${request.url}`);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cache is acceptable age for offline use
      const cacheTime = cachedResponse.headers.get('sw-cache-time');
      const cacheAge = cacheTime ? Date.now() - parseInt(cacheTime) : Infinity;
      
      if (cacheAge <= config.maxAge * 5) { // Allow 5x normal age when offline
        console.log(`📦 Offline cache hit: ${request.url}`);
        return cachedResponse;
      }
    }
    
    return await getOfflineFallback(request);
  }
}

/**
 * Stale While Revalidate Strategy - Return cached, update in background
 * Best for: Images, less critical assets
 */
async function staleWhileRevalidateStrategy(request, config) {
  const cache = await caches.open(config.name);
  const cachedResponse = await cache.match(request);
  
  // Start network request (don't await)
  const networkPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      
      // Add cache timestamp
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await cleanupCache(cache, config.maxEntries);
      console.log(`🔄 Background updated: ${request.url}`);
    }
    return networkResponse;
  }).catch(error => {
    console.warn(`⚠️ Background update failed: ${request.url}`, error);
  });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    console.log(`📦 Stale cache hit: ${request.url}`);
    return cachedResponse;
  }
  
  // If no cache, wait for network
  try {
    console.log(`🌐 No cache, waiting for network: ${request.url}`);
    return await networkPromise;
  } catch (error) {
    return await getOfflineFallback(request);
  }
}

/**
 * Clean up cache to stay within size limits
 */
async function cleanupCache(cache, maxEntries) {
  const keys = await cache.keys();
  
  if (keys.length <= maxEntries) return;
  
  // Sort by cache time (oldest first)
  const entries = await Promise.all(
    keys.map(async (key) => {
      const response = await cache.match(key);
      const cacheTime = response.headers.get('sw-cache-time');
      return { key, time: parseInt(cacheTime) || 0 };
    })
  );
  
  entries.sort((a, b) => a.time - b.time);
  
  // Remove oldest entries
  const toRemove = entries.slice(0, keys.length - maxEntries);
  await Promise.all(toRemove.map(entry => cache.delete(entry.key)));
  
  console.log(`🧹 Cleaned ${toRemove.length} old cache entries`);
}

/**
 * Get offline fallback response
 */
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Try to return a cached version of the main page for navigation requests
  if (request.destination === 'document') {
    const cache = await caches.open(CACHE_STRATEGIES.CRITICAL.name);
    const fallback = await cache.match('/');
    if (fallback) {
      console.log('📱 Offline fallback: main page');
      return fallback;
    }
  }
  
  // Return offline page for other requests
  return new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Dr. Islam Dental Practice</title>
      <style>
        body { 
          font-family: 'Poppins', sans-serif; 
          text-align: center; 
          padding: 2rem; 
          background: linear-gradient(135deg, #BEB093, #777669);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        .offline-content {
          max-width: 400px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        h1 { margin-bottom: 1rem; }
        p { margin-bottom: 1rem; line-height: 1.6; }
        .contact-info { 
          background: rgba(255,255,255,0.1);
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1.5rem;
        }
        a { color: white; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="offline-content">
        <h1>🦷 You're Offline</h1>
        <p>It looks like you're not connected to the internet right now.</p>
        <p>For urgent dental care, please call us directly:</p>
        <div class="contact-info">
          <strong><a href="tel:+1234567890">(123) 456-7890</a></strong><br>
          Available 24/7 for emergencies
        </div>
      </div>
    </body>
    </html>
    `,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

/**
 * Resource type detection functions
 */
function isAPIRequest(pathname) {
  return API_ENDPOINTS.some(endpoint => pathname.startsWith(endpoint)) ||
         pathname.startsWith('/api/');
}

function isImageRequest(pathname) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(pathname) ||
         pathname.includes('/optimized-images/');
}

function isStaticAsset(pathname) {
  return /\.(js|css|woff|woff2|ttf|eot)$/i.test(pathname) ||
         pathname.startsWith('/js/chunks/') ||
         pathname.startsWith('/css/');
}

function isCriticalResource(pathname) {
  return PRECACHE_RESOURCES.some(resource => 
    pathname === resource || pathname.endsWith(resource)
  );
}

// Background sync for failed API requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('🔄 Background sync triggered');
  
  // Retry failed booking requests
  const failedRequests = await getFailedRequests();
  
  for (const request of failedRequests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await removeFailedRequest(request);
        console.log('✅ Background sync successful:', request.url);
      }
    } catch (error) {
      console.warn('⚠️ Background sync failed:', request.url, error);
    }
  }
}

// Push notifications for appointment reminders
self.addEventListener('push', (event) => {
  const options = {
    body: 'You have an upcoming dental appointment.',
    icon: '/optimized-images/logo-80w.webp',
    badge: '/optimized-images/logo-80w.webp',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'confirm',
        title: 'Confirm Appointment'
      },
      {
        action: 'reschedule', 
        title: 'Reschedule'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Dr. Islam Dental Reminder', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'confirm') {
    // Handle appointment confirmation
    event.waitUntil(
      clients.openWindow('/confirm-appointment')
    );
  } else if (event.action === 'reschedule') {
    // Handle rescheduling
    event.waitUntil(
      clients.openWindow('/reschedule-appointment')
    );
  } else {
    // Default action - open main page
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Utility functions for background sync storage
async function getFailedRequests() {
  // Implementation would use IndexedDB to store failed requests
  return [];
}

async function removeFailedRequest(request) {
  // Implementation would remove from IndexedDB
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_REPORT') {
    console.log('📊 Performance metrics received:', event.data.metrics);
    
    // Could send to analytics service
    // analytics.track('performance_metrics', event.data.metrics);
  }
});

console.log('🚀 Service Worker loaded successfully');

export default self;