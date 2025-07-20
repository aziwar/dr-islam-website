# DR-ISLAM-WEBSITE DEV RULES
**Based on Context7 Cloudflare Workers Best Practices**  
**Created:** July 19, 2025 9:24 AM Kuwait Time

## 🚀 CORE RULES (MANDATORY)

### 1. PERFORMANCE
```javascript
// ✅ DO: Time I/O operations only
const start = performance.now();
const response = await fetch(request);
const timing = performance.now() - start;

// ❌ DON'T: Time CPU-bound work (always returns 0)
```

### 2. CACHING
```javascript
// ✅ DO: Cache-first pattern
response.headers.append("Cache-Control", "s-maxage=86400");
ctx.waitUntil(cache.put(cacheKey, response.clone()));

// ✅ DO: Static assets
"Cache-Control": "public, max-age=31556952, immutable"
```

### 3. SECURITY HEADERS
```javascript
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-site",
  "Cross-Origin-Resource-Policy": "same-site"
};
```

### 4. CSS MODULARIZATION
```javascript
// ✅ DO: Split CSS
export const CRITICAL_CSS = `/* Above-fold only */`;
export const COMPONENT_CSS = `/* Feature-specific */`;

// ❌ DON'T: 1,556 lines in one file
```

### 5. STREAM RESPONSES
```javascript
// ✅ DO: Stream large content
new ReadableStream({
  start(controller) {
    controller.enqueue(encoder.encode(htmlHead));
    controller.enqueue(encoder.encode(content));
    controller.close();
  }
})
```

### 6. R2 OPTIMIZATION
```javascript
// ✅ DO: Conditional requests
if (request.headers.get("If-None-Match") === metadata.etag) {
  return new Response(null, { status: 304 });
}
```

### 7. RATE LIMITING
```javascript
// ✅ DO: User-based keys
const userId = url.searchParams.get("userId");
await env.RATE_LIMITER.limit({ key: userId });

// ❌ DON'T: IP-based (shared networks)
```

### 8. SECRETS
```bash
# ✅ DO: Store secrets properly
npx wrangler secret put API_KEY

# ❌ DON'T: Hardcode in source
```

## 📁 PROJECT STRUCTURE

```
src/
├── index.js          # Main worker (keep < 300 lines)
├── content/
│   ├── critical.css  # Above-fold styles only
│   ├── components.css # Feature-specific styles
│   └── responsive.css # Media queries
```

## ⚡ QUICK FIXES

1. **CSS:** Extract styles.js → 3 modular files
2. **Cache:** Add `s-maxage=31536000` to all responses
3. **Security:** Apply all headers from rule #3
4. **Performance:** Add timing to all fetch/R2 calls

## 🎯 DEPLOYMENT CHECKLIST

- [ ] CSS modularized (< 500 lines per file)
- [ ] Security headers applied
- [ ] Cache headers optimized
- [ ] Secrets in wrangler, not code
- [ ] Stream responses > 10KB
- [ ] Rate limiting on forms

## 🚫 NEVER DO

1. Time CPU operations (always 0)
2. Use IP for rate limiting
3. Embed large CSS/HTML strings
4. Skip security headers
5. Hardcode secrets
6. Use `server.accept()` for WebSockets

## 📊 SUCCESS METRICS

- Worker execution: < 50ms
- Cache hit rate: > 90%
- Lighthouse: 95+
- TTFB: < 200ms globally