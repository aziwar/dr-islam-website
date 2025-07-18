// src/index.js - Optimized with Context7 best practices
import { HTML_EN } from './content/en.js';
import { HTML_AR } from './content/ar.js';
import { CSS } from './content/styles.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Dynamic versioning for cache busting
    const BUILD_DATE = new Date().toISOString().split('T')[0];
    const CSS_VERSION = `mobile-fix-${BUILD_DATE}-v2`;

    // CSS serving
    if (path === '/styles.css' || path === '/css/style.css') {
      return new Response(CSS, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, must-revalidate',
          'ETag': `"${CSS_VERSION}"`
        }
      });
    }

    // Optimized image serving with R2
    if (path.startsWith('/assets/images/') || path.startsWith('/assets/before-after/')) {
      return handleImageRequest(request, env, ctx, path);
    }

    // Route handling
    return handleHTMLRequest(request, url);
  }
};

// Image handler with WebP support and proper error handling
async function handleImageRequest(request, env, ctx, path) {
  try {
    const key = path.substring(1); // Remove leading slash
    
    // Check Accept header for WebP support
    const acceptsWebP = request.headers.get('Accept')?.includes('image/webp');
    const webpKey = key.replace(/\.(jpg|png)$/i, '.webp');
    
    // Try WebP first if supported
    if (acceptsWebP && env.IMAGES) {
      const webpObject = await env.IMAGES.get(webpKey);
      if (webpObject) {
        return serveR2Object(webpObject, 'image/webp');
      }
    }
    
    // Fallback to original format
    if (env.IMAGES) {
      const object = await env.IMAGES.get(key);
      if (object) {
        const contentType = getContentType(key);
        return serveR2Object(object, contentType);
      }
    }
    
    // GitHub fallback
    const githubUrl = `https://raw.githubusercontent.com/aziwar/dr-islam-website/master${path}`;
    const response = await fetch(githubUrl);
    
    if (response.ok) {
      const headers = {
        'Content-Type': response.headers.get('Content-Type') || getContentType(key),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"github-${key}"`
      };
      return new Response(response.body, { headers });
    }
    
    return new Response('Image not found', { status: 404 });
  } catch (error) {
    console.error('Image serving error:', error);
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
// Content type detection
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

// HTML request handler
function handleHTMLRequest(request, url) {
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const preferredLang = acceptLanguage.includes('ar') ? 'ar' : 'en';
  const path = url.pathname;
  
  let html = HTML_EN;
  
  if (path === '/ar' || path === '/ar/') {
    html = HTML_AR;
  } else if (path === '/' && preferredLang === 'ar') {
    return Response.redirect(url.origin + '/ar/', 302);
  }
  
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
  };
  
  return new Response(html, { headers });
}