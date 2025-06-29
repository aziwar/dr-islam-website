// src/index.js - Simple bilingual static site worker
import { HTML_EN } from './content/en.js';
import { HTML_AR } from './content/ar.js';
import { CSS } from './content/styles.js';
import { LOGO_SVG } from './content/logo.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve static assets
    if (path === '/styles.css') {
      return new Response(CSS, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
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
    } else if (path === '/' && preferredLang === 'ar') {
      // Auto-redirect Arabic speakers to Arabic version
      return Response.redirect(url.origin + '/ar/', 302);
    }

    // Security headers
    const securityHeaders = {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
      'Cache-Control': 'public, max-age=3600' // 1 hour cache
    };

    return new Response(html, { headers: securityHeaders });
  }
};