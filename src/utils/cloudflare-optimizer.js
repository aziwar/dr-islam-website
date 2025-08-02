// Cloudflare Performance Optimizer
// Implements best practices from Cloudflare documentation

export class CloudflareOptimizer {
  constructor(env) {
    this.env = env;
  }

  // Configure optimal cache headers based on resource type
  getCacheHeaders(resourceType, etag = null) {
    const profiles = {
      static: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'max-age=31536000'
      },
      css: {
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'max-age=2592000'
      },
      html: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'max-age=86400'
      },
      api: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'CDN-Cache-Control': 'no-store'
      }
    };

    const headers = profiles[resourceType] || profiles.html;
    
    if (etag) {
      headers['ETag'] = etag;
      headers['Cache-Control'] += ', must-revalidate';
    }

    return headers;
  }
  // Implement Tiered Cache for improved hit ratios
  configureTieredCache(request) {
    const cacheKey = new Request(request.url, {
      method: 'GET',
      headers: {
        'CF-Cache-Level': 'aggressive',
        'CF-Cache-Dedup-Enable': 'true'
      }
    });

    return {
      cacheKey,
      cacheTtl: 7200,
      cacheEverything: true
    };
  }

  // Smart Placement optimization for reduced latency
  getSmartPlacementConfig() {
    return {
      mode: 'smart',
      hint: 'performance'
    };
  }

  // Cache API implementation for local caching
  async getCachedResponse(request, ctx) {
    const cache = caches.default;
    const cacheKey = this.configureTieredCache(request).cacheKey;
    
    let response = await cache.match(cacheKey);
    
    if (!response) {
      return null;
    }
    // Check if cached response is still fresh
    const age = response.headers.get('Age');
    const maxAge = response.headers.get('Cache-Control')?.match(/max-age=(\d+)/)?.[1];
    
    if (age && maxAge && parseInt(age) > parseInt(maxAge)) {
      return null; // Stale, fetch fresh
    }

    return response;
  }

  // Store response in cache with optimization
  async cacheResponse(request, response, ctx) {
    const cache = caches.default;
    const { cacheKey, cacheTtl } = this.configureTieredCache(request);
    
    // Clone response to avoid consuming the body
    const responseToCache = response.clone();
    
    // Add cache headers
    const headers = new Headers(responseToCache.headers);
    headers.set('CF-Cache-Status', 'HIT');
    headers.set('Age', '0');
    
    const cachedResponse = new Response(responseToCache.body, {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers
    });

    ctx.waitUntil(cache.put(cacheKey, cachedResponse));
    
    return response;
  }
}

export default CloudflareOptimizer;