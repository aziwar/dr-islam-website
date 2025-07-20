// Worker Pattern Example
// Shows Cloudflare Workers best practices from Context7

export default {
  async fetch(request, env, ctx) {
    // Performance timing for I/O operations
    const start = performance.now();
    
    try {
      // Route handling
      const url = new URL(request.url);
      
      // Cache-first pattern
      const cacheKey = new Request(url.toString(), request);
      const cache = caches.default;
      let response = await cache.match(cacheKey);
      
      if (!response) {
        response = await handleRequest(request, env);
        response = new Response(response.body, response);
        
        // Cache headers
        response.headers.append("Cache-Control", "s-maxage=86400");
        
        // Security headers
        const securityHeaders = {
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-site",
          "Cross-Origin-Resource-Policy": "same-site"
        };
        
        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
      }
      
      // Log performance
      const duration = performance.now() - start;
      console.log({ operation: "fetch", duration, url: url.pathname });
      
      return response;
    } catch (error) {
      return new Response("Internal Error", { status: 500 });
    }
  }
};

async function handleRequest(request, env) {
  // Your request handling logic
  return new Response("Hello from Worker", {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}