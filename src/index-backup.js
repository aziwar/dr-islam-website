// src/index.js - Simple bilingual static site worker
import { HTML_EN } from './content/en.js';
import { HTML_AR } from './content/ar.js';
import { CSS } from './content/styles.js';
import { LOGO_SVG } from './content/logo.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve static assets
    if (path === '/styles.css' || path === '/css/style.css') {
      return new Response(CSS, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    // Serve images from R2
    if (path.startsWith('/assets/images/') || path.startsWith('/assets/before-after/')) {
      const key = path.substring(1); // Remove leading slash
      
      // Try to get from R2
      if (env.IMAGES) {
        const object = await env.IMAGES.get(key);
        if (object) {
          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('cache-control', 'public, max-age=31536000, immutable');
          return new Response(object.body, { headers });
        }
      }
      
      // Fallback to GitHub raw URLs
      const githubUrl = `https://raw.githubusercontent.com/aziwar/dr-islam-website/master${path}`;
      const response = await fetch(githubUrl);
      
      if (response.ok) {
        return new Response(response.body, {
          headers: {
            'Content-Type': response.headers.get('Content-Type') || 'image/png',
            'Cache-Control': 'public, max-age=31536000'
          }
        });
      }
      
      return new Response('Image not found', { status: 404 });
    }

    if (path === '/logo.svg') {
      return new Response(LOGO_SVG, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    // Language detection
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    const preferredLang = acceptLanguage.includes('ar') ? 'ar' : 'en';
    
    // Route handling
    let html = HTML_EN;
    let lang = 'en';

    if (path === '/ar' || path === '/ar/') {
      html = HTML_AR;
      lang = 'ar';
    } else if (path === '/en' || path === '/en/') {
      html = HTML_EN;
      lang = 'en';
    } else if (path === '/' && preferredLang === 'ar') {
      // Auto-redirect Arabic speakers to Arabic version
      return Response.redirect(url.origin + '/ar/', 302);
    }

    // Security headers
    const securityHeaders = {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    return new Response(html, { headers: securityHeaders });
  }
};