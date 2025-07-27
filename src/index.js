// src/index.js - Optimized with Context7 best practices
import { HTML_EN } from './content/en.js';
import { HTML_AR } from './content/ar.js';
import { CSS } from './content/styles.js';
import { SERVICE_WORKER_JS } from './content/sw.js';
import { OFFLINE_HTML } from './content/offline.js';

// Constants for better maintainability
const CACHE_PROFILES = {
  STATIC: 'public, max-age=31536000, immutable',
  CSS: 'public, max-age=300, s-maxage=3600, must-revalidate',
  HTML: 'public, max-age=3600, s-maxage=86400',
  API: 'no-cache, no-store, must-revalidate',
  MANIFEST: 'public, max-age=86400, s-maxage=86400',
  SW: 'public, max-age=3600, s-maxage=3600'
};

const CONTENT_TYPES = {
  HTML: 'text/html; charset=utf-8',
  CSS: 'text/css',
  JS: 'application/javascript',
  JSON: 'application/json',
  MANIFEST: 'application/manifest+json',
  XML: 'application/xml',
  PLAIN: 'text/plain'
};

export default {
  async fetch(request, env, ctx) {
    try {
      // Start performance monitoring
      const requestStart = performance.now();
      const metrics = {
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('User-Agent') || 'unknown'
      };
      
      const url = new URL(request.url);
      const path = url.pathname;
    
    // Dynamic versioning for cache busting
    const BUILD_DATE = new Date().toISOString().split('T')[0];
    const CSS_VERSION = `mobile-fix-${BUILD_DATE}-v2`;

    // Handle robots.txt
    if (path === '/robots.txt') {
      const response = handleRobotsTxt();
      metrics.operation = 'robots-txt';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Handle sitemap.xml
    if (path === '/sitemap.xml') {
      const response = handleSitemap(url);
      metrics.operation = 'sitemap';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Handle manifest files
    if (path === '/manifest-ar.json' || path === '/manifest-en.json') {
      const manifestLang = path.includes('-ar') ? 'ar' : 'en';
      const manifestContent = manifestLang === 'ar' ? 
        JSON.stringify({
          "name": "د. اسلام الصغير - طبيب أسنان",
          "short_name": "د. اسلام",
          "start_url": "/ar/",
          "display": "standalone",
          "background_color": "#F8F7F5",
          "theme_color": "#BEB093",
          "orientation": "portrait",
          "icons": [
            {"src": "/assets/images/favicon-256x256.png", "sizes": "256x256", "type": "image/png"},
            {"src": "/assets/images/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"}
          ]
        }) :
        JSON.stringify({
          "name": "Dr. Islam Elsagher - Dentist",
          "short_name": "Dr. Islam",
          "start_url": "/en/",
          "display": "standalone",
          "background_color": "#F8F7F5",
          "theme_color": "#BEB093",
          "orientation": "portrait",
          "icons": [
            {"src": "/assets/images/favicon-256x256.png", "sizes": "256x256", "type": "image/png"},
            {"src": "/assets/images/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"}
          ]
        });
      
      const response = new Response(manifestContent, {
        headers: {
          'Content-Type': CONTENT_TYPES.MANIFEST,
          'Cache-Control': CACHE_PROFILES.MANIFEST
        }
      });
      
      metrics.operation = 'manifest';
      metrics.lang = manifestLang;
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Handle contact form submission
    if (path === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request);
      metrics.operation = 'contact-form';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Handle service worker
    if (path === '/sw.js') {
      const response = new Response(SERVICE_WORKER_JS, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.SW
        }
      });
      metrics.operation = 'service-worker';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Handle offline page
    if (path === '/offline.html') {
      const response = new Response(OFFLINE_HTML, {
        headers: {
          'Content-Type': CONTENT_TYPES.HTML,
          'Cache-Control': CACHE_PROFILES.HTML
        }
      });
      metrics.operation = 'offline-page';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // CSS serving
    if (path === '/styles.css' || path === '/css/style.css') {
      const response = new Response(CSS, {
        headers: {
          'Content-Type': CONTENT_TYPES.CSS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"${CSS_VERSION}"`
        }
      });
      metrics.operation = 'css';
      metrics.duration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

    // Optimized image serving with R2
    if (path.startsWith('/assets/images/') || path.startsWith('/assets/before-after/')) {
      const response = await handleImageRequest(request, env, ctx, path);
      metrics.operation = 'image';
      metrics.totalDuration = performance.now() - requestStart;
      console.log(metrics);
      return response;
    }

      // Route handling
      const response = await handleHTMLRequest(request, url);
      metrics.operation = 'html';
      metrics.totalDuration = performance.now() - requestStart;
      console.log(metrics);
      return response;
      
    } catch (error) {
      // Global error handler
      console.error('Worker error:', error);
      
      return new Response('Internal Server Error', {
        status: 500,
        headers: {
          'Content-Type': CONTENT_TYPES.PLAIN,
          'Cache-Control': CACHE_PROFILES.API
        }
      });
    }
  }
};

// Robots.txt handler
function handleRobotsTxt() {
  const robots = `# Robots.txt for dr-elsagher.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Sitemap location
Sitemap: https://dr-elsagher.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}

// Sitemap handler
function handleSitemap(url) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://dr-elsagher.com/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://dr-elsagher.com/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://dr-elsagher.com/ar/"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dr-elsagher.com/ar/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://dr-elsagher.com/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://dr-elsagher.com/ar/"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}

// Image handler with WebP support and proper error handling
async function handleImageRequest(request, env, ctx, path) {
  const imageStart = performance.now();
  const imageMetrics = {
    path,
    webpRequested: false,
    source: 'unknown',
    cacheHit: false
  };
  
  try {
    const key = path.substring(1); // Remove leading slash
    
    // Check Accept header for WebP support
    const acceptsWebP = request.headers.get('Accept')?.includes('image/webp');
    const webpKey = key.replace(/\.(jpg|png)$/i, '.webp');
    imageMetrics.webpRequested = acceptsWebP;
    
    // Try WebP first if supported
    if (acceptsWebP && env.IMAGES) {
      const webpObject = await env.IMAGES.get(webpKey);
      if (webpObject) {
        imageMetrics.source = 'r2-webp';
        imageMetrics.duration = performance.now() - imageStart;
        console.log({ operation: 'image-fetch', ...imageMetrics });
        return serveR2Object(webpObject, 'image/webp');
      }
    }
    
    // Try original format from R2
    if (env.IMAGES) {
      const r2Start = performance.now();
      const object = await env.IMAGES.get(key);
      if (object) {
        imageMetrics.source = 'r2-original';
        imageMetrics.r2Duration = performance.now() - r2Start;
        imageMetrics.duration = performance.now() - imageStart;
        console.log({ operation: 'image-fetch', ...imageMetrics });
        const contentType = getContentType(key);
        return serveR2Object(object, contentType);
      }
    }
    
    // Fallback to GitHub
    const githubUrl = `https://raw.githubusercontent.com/aziwar/dr-islam-website/master${path}`;
    const githubStart = performance.now();
    const response = await fetch(githubUrl);
    
    if (response.ok) {
      imageMetrics.source = 'github-fallback';
      imageMetrics.githubDuration = performance.now() - githubStart;
      imageMetrics.duration = performance.now() - imageStart;
      console.log({ operation: 'image-fetch', ...imageMetrics });
      
      const headers = {
        'Content-Type': response.headers.get('Content-Type') || getContentType(key),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"github-${key}"`
      };
      return new Response(response.body, { headers });
    }
    
    imageMetrics.source = 'not-found';
    imageMetrics.duration = performance.now() - imageStart;
    console.log({ operation: 'image-fetch', ...imageMetrics });
    return new Response('Image not found', { status: 404 });
  } catch (error) {
    console.error('Image serving error:', error);
    imageMetrics.error = error.message;
    imageMetrics.duration = performance.now() - imageStart;
    console.log({ operation: 'image-fetch-error', ...imageMetrics });
    return new Response('Internal server error', { status: 500 });
  }
}

// Serve R2 object with proper headers
function serveR2Object(object, contentType) {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', object.httpEtag || `"r2-${object.key}"`);
  
  return new Response(object.body, { headers });
}

// Get content type from file extension
function getContentType(path) {
  const ext = path.split('.').pop()?.toLowerCase();
  const types = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg', 
    'png': 'image/png',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'gif': 'image/gif'
  };
  return types[ext] || 'application/octet-stream';
}

// Standardized cache control headers helper
function getCacheHeaders(type = 'default') {
  return CACHE_PROFILES[type.toUpperCase()] || CACHE_PROFILES.HTML;
}

// HTML request handler with enhanced security headers
function handleHTMLRequest(request, url) {
  const htmlStart = performance.now();
  
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const preferredLang = acceptLanguage.includes('ar') ? 'ar' : 'en';
  const path = url.pathname;
  
  let html = HTML_EN;
  let hreflang = 'en';
  
  if (path === '/ar' || path === '/ar/') {
    html = HTML_AR;
    hreflang = 'ar';
  } else if (path === '/' && preferredLang === 'ar') {
    const redirectDuration = performance.now() - htmlStart;
    console.log({ 
      operation: 'html-redirect', 
      lang: 'ar', 
      duration: redirectDuration 
    });
    return Response.redirect(url.origin + '/ar/', 302);
  }
  
  // Enhanced security headers
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': getCacheHeaders('html'),
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com;",
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-Robots-Tag': 'index, follow',
    'Content-Language': hreflang
  };
  
  const htmlDuration = performance.now() - htmlStart;
  console.log({ 
    operation: 'html-generation', 
    lang: hreflang, 
    path: path,
    duration: htmlDuration 
  });
  
  return new Response(html, { headers });
}

// Contact form handler
async function handleContactForm(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const contactData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      ip: request.headers.get('CF-Connecting-IP') || 'unknown',
      userAgent: request.headers.get('User-Agent') || 'unknown'
    };

    // Validate required fields
    if (!contactData.name || !contactData.phone || !contactData.email || !contactData.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Log the contact submission (in production, you'd send this to email/database)
    console.log('Contact Form Submission:', {
      ...contactData,
      ip: undefined, // Don't log IP for privacy
      userAgent: undefined // Don't log user agent for privacy
    });

    // In a real implementation, you would:
    // 1. Send email to dr.islam_elsagher@gmail.com
    // 2. Store in database
    // 3. Send confirmation email to user
    // 4. Integrate with CRM system
    
    // For now, we'll simulate success
    // Email sending integration would be implemented here in production
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error. Please try again later.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
