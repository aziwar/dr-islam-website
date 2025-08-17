// src/index.js - Optimized with Context7 best practices
import { HTML_EN } from './content/en-refactored.js';
import { HTML_AR } from './content/ar-refactored.js';
import { CSS, INLINE_CSS, DEFERRED_STYLES, getCSSForRequest } from './content/styles.js';
import { SERVICE_WORKER_JS } from './content/sw.js';
import { OFFLINE_HTML } from './content/offline.js';
import { logger } from './utils/logger.js';
import { GalleryAPI } from './utils/gallery-api.js';

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
      
      // Initialize Gallery API
      const galleryAPI = new GalleryAPI(env.IMAGES, env.GALLERY_KV, env.ADMIN_TOKEN);
      const metrics = {
        url: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('User-Agent') || 'unknown'
      };
      
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Handle Gallery API routes
      if (path.startsWith('/api/gallery/') || path === '/admin/gallery') {
        const response = await galleryAPI.handleRequest(request, url);
        metrics.operation = 'gallery-api';
        metrics.duration = performance.now() - requestStart;
        logger.metric(metrics);
        return response;
      }
      
      // Dynamic versioning for cache busting
      const BUILD_DATE = new Date().toISOString().split('T')[0];
      const CSS_VERSION = `mobile-fix-${BUILD_DATE}-v2`;

      // Handle robots.txt
      if (path === '/robots.txt') {
        const response = handleRobotsTxt();
        metrics.operation = 'robots-txt';
        metrics.duration = performance.now() - requestStart;
        logger.metric(metrics);
        return response;
      }

      // Handle sitemap.xml
      if (path === '/sitemap.xml') {
        const response = handleSitemap(url);
        metrics.operation = 'sitemap';
        metrics.duration = performance.now() - requestStart;
        logger.metric(metrics);
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
      logger.metric(metrics);
      return response;
    }

    // Handle contact form submission
    if (path === '/api/contact' && request.method === 'POST') {
      const response = await handleContactForm(request);
      metrics.operation = 'contact-form';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
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
      logger.metric(metrics);
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
      logger.metric(metrics);
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
      logger.metric(metrics);
      return response;
    }

    // JavaScript serving - CRITICAL FOR WAVE 1
    if (path === '/js/ui-utils.js') {
      const { createUIUtilsJS } = await import('./shared/ui-utils.js');
      const jsContent = createUIUtilsJS();
      
      const response = new Response(jsContent, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"ui-utils-${CSS_VERSION}"`
        }
      });
      metrics.operation = 'javascript-ui-utils';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

    if (path === '/js/mobile-ux.js') {
      const { MOBILE_UX_JS } = await import('./content/js/mobile-ux.js');
      
      const response = new Response(MOBILE_UX_JS, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"mobile-ux-${CSS_VERSION}"`
        }
      });
      metrics.operation = 'javascript-mobile-ux';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

    // Handle shared JavaScript modules - CRITICAL FIX for advanced-form-handler.js
    if (path === '/shared/advanced-form-handler.js') {
      const { default: AdvancedFormHandler } = await import('./shared/advanced-form-handler.js');
      // Read the actual file content and serve it as JavaScript
      const formHandlerContent = await readFormHandlerFile();
      
      const response = new Response(formHandlerContent, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"advanced-form-handler-${CSS_VERSION}"`
        }
      });
      metrics.operation = 'javascript-advanced-form-handler';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

    if (path === '/shared/form-utils.js') {
      const formUtilsContent = await readFormUtilsFile();
      
      const response = new Response(formUtilsContent, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"form-utils-${CSS_VERSION}"`
        }
      });
      metrics.operation = 'javascript-form-utils';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

    // Handle main.js file - CRITICAL FIX for MIME type issue
    if (path === '/js/main.js') {
      // Create a JavaScript string from the main.js file content
      const mainJsContent = `// Main JavaScript file - Fixed MIME type serving
// Import and initialize advanced form handler
import { initializeAdvancedForms } from '../shared/advanced-form-handler.js';

// Functions from header.js (ES6 modules converted to global functions)
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');

  const isActive = mobileNav?.classList.contains('active');

  if (mobileNav) mobileNav.classList.toggle('active', !isActive);
  if (mobileNav) mobileNav.setAttribute('aria-hidden', isActive.toString());
  if (navToggle) navToggle.setAttribute('aria-expanded', (!isActive).toString());
  if (backdrop) backdrop.style.display = !isActive ? 'block' : 'none';

  // Prevent body scroll when menu is open
  document.body.style.overflow = !isActive ? 'hidden' : '';
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');

  if (mobileNav) mobileNav.classList.remove('active');
  if (mobileNav) mobileNav.setAttribute('aria-hidden', 'true');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  if (backdrop) backdrop.style.display = 'none';
  document.body.style.overflow = '';
}

function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus on first input
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Essential UI utility functions - CRITICAL FIX for initializeUIUtils
function initializeUIUtils() {
  // Initialize all UI components
  // Initialize mobile menu functionality
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Initialize booking modal functionality
  const bookingBtns = document.querySelectorAll('[data-action="book-appointment"]');
  bookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });
  
  // Close modals on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeBookingModal();
    }
  });
}

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.initializeUIUtils = initializeUIUtils;

// Rest of the main.js functionality (simplified)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeUIUtils();
    
    // Close menu when clicking outside or on backdrop
    document.addEventListener('click', function(e) {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');

        if (backdrop && backdrop.contains(e.target)) {
            closeMobileMenu();
        } else if (toggle && menu && !toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking navigation links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Basic FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.addEventListener('click', function() {
                // Close other open FAQ items on mobile
                if (window.innerWidth <= 768) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
                item.classList.toggle('active');
            });
        }
    });
});

// Enhanced scroll-triggered navigation
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        const scrollY = window.scrollY;

        // Shadow effect
        if (scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }

        // Enhanced navigation state
        if (scrollY > 150) {
            header.classList.add('nav-scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.classList.remove('nav-scrolled');
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    });
});

`;
      
      const response = new Response(mainJsContent, {
        headers: {
          'Content-Type': CONTENT_TYPES.JS,
          'Cache-Control': CACHE_PROFILES.CSS,
          'ETag': `"main-js-${CSS_VERSION}"`
        }
      });
      metrics.operation = 'javascript-main';
      metrics.duration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

    // Optimized image serving with R2
    if (path.startsWith('/assets/')) {
      const response = await handleImageRequest(request, env, ctx, path);
      metrics.operation = 'image';
      metrics.totalDuration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
    }

      // Route handling
      const response = await handleHTMLRequest(request, url);
      metrics.operation = 'html';
      metrics.totalDuration = performance.now() - requestStart;
      logger.metric(metrics);
      return response;
      
    } catch (error) {
      // Global error handler
      logger.error('Worker error:', error);
      
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
        logger.metric({ operation: 'image-fetch', ...imageMetrics });
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
        logger.metric({ operation: 'image-fetch', ...imageMetrics });
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
      logger.metric({ operation: 'image-fetch', ...imageMetrics });
      
      const headers = {
        'Content-Type': response.headers.get('Content-Type') || getContentType(key),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': `"github-${key}"`
      };
      return new Response(response.body, { headers });
    }
    
    imageMetrics.source = 'not-found';
    imageMetrics.duration = performance.now() - imageStart;
    logger.metric({ operation: 'image-fetch', ...imageMetrics });
    return new Response('Image not found', { status: 404 });
  } catch (error) {
    logger.error('Image serving error:', error);
    imageMetrics.error = error.message;
    imageMetrics.duration = performance.now() - imageStart;
    logger.metric({ operation: 'image-fetch-error', ...imageMetrics });
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
  
  // Check for language parameter in query string (e.g., ?lang=ar)
  const langParam = url.searchParams.get('lang');
  
  let html = HTML_EN;
  let hreflang = 'en';
  
  // Determine language: query param > path > Accept-Language header
  if (path === '/ar' || path === '/ar/' || langParam === 'ar') {
    html = HTML_AR;
    hreflang = 'ar';
  } else if (path === '/' && preferredLang === 'ar') {
    const redirectDuration = performance.now() - htmlStart;
    logger.metric({ 
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
  logger.metric({ 
    operation: 'html-generation', 
    lang: hreflang, 
    path: path,
    duration: htmlDuration 
  });
  
  return new Response(html, { headers });
}

// Helper functions to read shared JavaScript files
async function readFormHandlerFile() {
  // Return the advanced-form-handler.js content as a string
  return `// ADVANCED-FORM-HANDLER.JS - Enhanced Form Management System
// Real-time validation, smart features, progress tracking, and UX enhancements

import { validateField, validateForm, updateFormState, showFormMessage, clearFormMessages, getCurrentLanguage } from './form-utils.js';

/**
 * Advanced Form Handler Class
 * Provides comprehensive form management with real-time validation and smart features
 */
export class AdvancedFormHandler {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.options = {
            realTimeValidation: true,
            smartFeatures: true,
            progressTracking: true,
            autoResize: true,
            characterCount: true,
            smartSuggestions: false,
            ...options
        };
        
        this.validationRules = {};
        this.validationTimeouts = new Map();
        this.suggestionData = new Map();
        this.progressFields = [];
        this.currentLang = getCurrentLanguage();
        
        this.init();
    }
    
    /**
     * Initialize the form handler
     */
    init() {
        this.setupFormStructure();
        this.setupEventListeners();
        this.setupProgressTracking();
        this.setupSmartFeatures();
        this.setupAccessibility();
        
        // Mark form as enhanced
        this.form.classList.add('enhanced-form');
        this.form.setAttribute('data-enhanced', 'true');
    }
    
    /**
     * Setup form structure and prepare fields
     */
    setupFormStructure() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group') || this.createFormGroup(field);
            
            // Add input type classes for smart features
            if (field.type === 'email') {
                formGroup.classList.add('email-input');
            } else if (field.type === 'tel') {
                formGroup.classList.add('phone-input');
            } else if (field.name === 'name' || field.id === 'name') {
                formGroup.classList.add('name-input');
            }
            
            // Setup placeholder for floating labels
            if (!field.placeholder || field.placeholder === field.getAttribute('data-label')) {
                field.placeholder = ' '; // Space is important for CSS selector
            }
            
            // Setup character counting
            if (this.options.characterCount && (field.tagName === 'TEXTAREA' || field.maxLength)) {
                this.setupCharacterCounter(formGroup, field);
            }
            
            // Setup auto-resize for textareas
            if (this.options.autoResize && field.tagName === 'TEXTAREA') {
                this.setupAutoResize(field);
            }
        });
    }
    
    /**
     * Create form group wrapper if it doesn't exist
     */
    createFormGroup(field) {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        
        field.parentNode.insertBefore(formGroup, field);
        formGroup.appendChild(field);
        
        return formGroup;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Real-time validation
        if (this.options.realTimeValidation) {
            this.form.addEventListener('input', this.handleInput.bind(this));
            this.form.addEventListener('blur', this.handleBlur.bind(this), true);
            this.form.addEventListener('focus', this.handleFocus.bind(this), true);
        }
        
        // Form submission
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Smart suggestions
        if (this.options.smartSuggestions) {
            this.form.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
        
        // Progress tracking
        if (this.options.progressTracking) {
            this.form.addEventListener('input', this.updateProgress.bind(this));
        }
    }
    
    /**
     * Handle input events for real-time validation
     */
    handleInput(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Clear existing timeout
        if (this.validationTimeouts.has(field)) {
            clearTimeout(this.validationTimeouts.get(field));
        }
        
        // Clear error state immediately on typing
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
            this.clearValidationMessage(formGroup);
        }
        
        // Update character counter
        this.updateCharacterCounter(formGroup, field);
        
        // Update floating label state
        this.updateFloatingLabel(formGroup, field);
        
        // Auto-resize textarea
        if (field.tagName === 'TEXTAREA' && this.options.autoResize) {
            this.autoResizeTextarea(field);
        }
        
        // Debounced validation
        const timeout = setTimeout(() => {
            this.validateFieldRealTime(field, formGroup);
        }, 300);
        
        this.validationTimeouts.set(field, timeout);
    }
    
    /**
     * Handle blur events
     */
    handleBlur(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Clear any pending validation timeout
        if (this.validationTimeouts.has(field)) {
            clearTimeout(this.validationTimeouts.get(field));
        }
        
        // Immediate validation on blur
        this.validateFieldRealTime(field, formGroup);
    }
    
    /**
     * Handle focus events
     */
    handleFocus(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Update floating label
        this.updateFloatingLabel(formGroup, field);
        
        // Show suggestions if available
        if (this.options.smartSuggestions) {
            this.showSuggestions(field);
        }
    }
    
    /**
     * Real-time field validation
     */
    async validateFieldRealTime(field, formGroup) {
        // Show validating state
        formGroup.classList.add('validating');
        formGroup.classList.remove('valid', 'invalid');
        
        // Simulate async validation delay for better UX
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const isValid = validateField(field);
        
        // Remove validating state
        formGroup.classList.remove('validating');
        
        // Update validation state
        if (isValid) {
            formGroup.classList.add('valid');
            formGroup.classList.remove('invalid');
            this.clearValidationMessage(formGroup);
        } else {
            formGroup.classList.add('invalid');
            formGroup.classList.remove('valid');
            this.showValidationMessage(formGroup, this.getFieldError(field));
        }
    }
    
    /**
     * Get appropriate error message for field
     */
    getFieldError(field) {
        const messages = {
            en: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                phone: 'Please enter a valid phone number',
                minLength: \`Minimum \${field.minLength} characters required\`,
                maxLength: \`Maximum \${field.maxLength} characters allowed\`,
                pattern: 'Invalid format'
            },
            ar: {
                required: 'هذا الحقل مطلوب',
                email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
                phone: 'يرجى إدخال رقم هاتف صحيح',
                minLength: \`يجب أن يحتوي على \${field.minLength} أحرف على الأقل\`,
                maxLength: \`يجب ألا يتجاوز \${field.maxLength} حرفاً\`,
                pattern: 'تنسيق غير صحيح'
            }
        };
        
        const lang = this.currentLang;
        const value = field.value.trim();
        
        if (field.required && !value) {
            return messages[lang].required;
        }
        
        if (field.type === 'email' && value && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
            return messages[lang].email;
        }
        
        if (field.type === 'tel' && value && !/^[\\+]?[0-9\\s\\-()]{8,}$/.test(value)) {
            return messages[lang].phone;
        }
        
        if (field.minLength && value.length > 0 && value.length < field.minLength) {
            return messages[lang].minLength;
        }
        
        if (field.maxLength && value.length > field.maxLength) {
            return messages[lang].maxLength;
        }
        
        if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
            return messages[lang].pattern;
        }
        
        return messages[lang].required;
    }
    
    /**
     * Show validation message
     */
    showValidationMessage(formGroup, message) {
        this.clearValidationMessage(formGroup);
        
        const messageElement = document.createElement('div');
        messageElement.className = 'error-message';
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'polite');
        
        formGroup.appendChild(messageElement);
    }
    
    /**
     * Clear validation message
     */
    clearValidationMessage(formGroup) {
        const existing = formGroup.querySelector('.error-message, .success-message');
        if (existing) {
            existing.remove();
        }
    }
    
    /**
     * Update floating label state
     */
    updateFloatingLabel(formGroup, field) {
        const hasValue = field.value.trim() !== '' || field.type === 'date' || field.type === 'time';
        
        if (hasValue) {
            formGroup.classList.add('has-value');
        } else {
            formGroup.classList.remove('has-value');
        }
    }
    
    /**
     * Setup character counter
     */
    setupCharacterCounter(formGroup, field) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        formGroup.appendChild(counter);
        
        this.updateCharacterCounter(formGroup, field);
    }
    
    /**
     * Update character counter
     */
    updateCharacterCounter(formGroup, field) {
        const counter = formGroup.querySelector('.char-counter');
        if (!counter) return;
        
        const current = field.value.length;
        const max = field.maxLength || 500;
        const remaining = max - current;
        
        counter.textContent = \`\${current}/\${max}\`;
        
        // Update counter state
        counter.classList.remove('warning', 'danger');
        if (remaining <= 20 && remaining > 0) {
            counter.classList.add('warning');
        } else if (remaining <= 0) {
            counter.classList.add('danger');
        }
    }
    
    /**
     * Setup auto-resize for textareas
     */
    setupAutoResize(textarea) {
        textarea.style.overflow = 'hidden';
        this.autoResizeTextarea(textarea);
    }
    
    /**
     * Auto-resize textarea
     */
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
    }
    
    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        if (!this.options.progressTracking) return;
        
        // Create progress bar if it doesn't exist
        let progressContainer = this.form.querySelector('.form-progress');
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.className = 'form-progress';
            progressContainer.innerHTML = '<div class="form-progress-bar"></div>';
            
            // Insert at the beginning of the form
            this.form.insertBefore(progressContainer, this.form.firstChild);
        }
        
        // Get all required fields for progress calculation
        this.progressFields = Array.from(this.form.querySelectorAll('input[required], textarea[required], select[required]'));
        
        this.updateProgress();
    }
    
    /**
     * Update form progress
     */
    updateProgress() {
        if (!this.options.progressTracking || this.progressFields.length === 0) return;
        
        const progressBar = this.form.querySelector('.form-progress-bar');
        if (!progressBar) return;
        
        let completedFields = 0;
        
        this.progressFields.forEach(field => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                if (field.checked) completedFields++;
            } else if (field.value.trim() !== '') {
                completedFields++;
            }
        });
        
        const progress = (completedFields / this.progressFields.length) * 100;
        progressBar.style.width = \`\${progress}%\`;
    }
    
    /**
     * Setup smart features
     */
    setupSmartFeatures() {
        if (!this.options.smartFeatures) return;
        
        // Setup common email domain suggestions
        this.suggestionData.set('email', [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'live.com'
        ]);
        
        // Setup phone number formatting
        const phoneFields = this.form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            field.addEventListener('input', this.formatPhoneNumber.bind(this));
        });
    }
    
    /**
     * Format phone number input
     */
    formatPhoneNumber(event) {
        const field = event.target;
        let value = field.value.replace(/\\D/g, ''); // Remove non-digits
        
        // Kuwait phone number formatting
        if (value.startsWith('965') && value.length <= 11) {
            // Format: +965 XXXX XXXX
            if (value.length > 3) {
                value = '+965 ' + value.substring(3, 7) + (value.length > 7 ? ' ' + value.substring(7, 11) : '');
            } else {
                value = '+965 ' + value.substring(3);
            }
        } else if (value.length <= 8) {
            // Local format: XXXX XXXX
            if (value.length > 4) {
                value = value.substring(0, 4) + ' ' + value.substring(4, 8);
            }
        }
        
        field.value = value;
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels and descriptions
        const fields = this.form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const label = formGroup?.querySelector('label');
            
            if (label && !field.getAttribute('aria-labelledby')) {
                if (!label.id) {
                    label.id = \`label-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
                }
                field.setAttribute('aria-labelledby', label.id);
            }
            
            // Add required attribute to ARIA
            if (field.required) {
                field.setAttribute('aria-required', 'true');
            }
        });
    }
    
    /**
     * Handle form submission
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        // Clear any existing messages
        clearFormMessages(this.form);
        
        // Validate entire form
        const isValid = this.validateEntireForm();
        
        if (!isValid) {
            // Focus on first invalid field
            const firstInvalid = this.form.querySelector('.form-group.invalid input, .form-group.invalid textarea, .form-group.invalid select');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Set loading state
        this.setFormState('loading');
        
        try {
            // Simulate form submission (replace with actual submission logic)
            await this.submitForm();
            
            // Set success state
            this.setFormState('success');
            
            // Show success message
            const successMessage = this.currentLang === 'ar' ? 
                'تم إرسال النموذج بنجاح! سنتواصل معك قريباً.' : 
                'Form submitted successfully! We will contact you soon.';
            
            showFormMessage(this.form, successMessage, 'success');
            
            // Reset form after delay
            setTimeout(() => {
                this.resetForm();
            }, 3000);
            
        } catch (error) {
            // Set error state
            this.setFormState('error');
            
            const errorMessage = this.currentLang === 'ar' ? 
                'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' : 
                'An error occurred during submission. Please try again.';
            
            showFormMessage(this.form, errorMessage, 'error');
        }
    }
    
    /**
     * Validate entire form with visual feedback
     */
    validateEntireForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group');
            if (!formGroup) return;
            
            const isValid = validateField(field);
            
            formGroup.classList.remove('valid', 'invalid', 'validating');
            
            if (isValid) {
                formGroup.classList.add('valid');
                this.clearValidationMessage(formGroup);
            } else {
                formGroup.classList.add('invalid');
                this.showValidationMessage(formGroup, this.getFieldError(field));
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    /**
     * Set form state (loading, success, error, normal)
     */
    setFormState(state) {
        const submitButton = this.form.querySelector('button[type="submit"], .submit-btn');
        
        // Remove all state classes
        this.form.classList.remove('is-loading', 'is-success', 'is-error');
        if (submitButton) {
            submitButton.classList.remove('loading', 'success', 'error');
        }
        
        // Apply new state
        switch (state) {
            case 'loading':
                this.form.classList.add('is-loading');
                if (submitButton) {
                    submitButton.classList.add('loading');
                    submitButton.disabled = true;
                }
                break;
                
            case 'success':
                this.form.classList.add('is-success');
                if (submitButton) {
                    submitButton.classList.add('success');
                    submitButton.disabled = false;
                }
                break;
                
            case 'error':
                this.form.classList.add('is-error');
                if (submitButton) {
                    submitButton.classList.add('error');
                    submitButton.disabled = false;
                }
                break;
                
            case 'normal':
            default:
                if (submitButton) {
                    submitButton.disabled = false;
                }
                break;
        }
    }
    
    /**
     * Submit form (implement actual submission logic here)
     */
    async submitForm() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Log form data (replace with actual submission)
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            return { success: true, message: 'Form submitted successfully' };
        } else {
            throw new Error('Network error occurred');
        }
    }
    
    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();
        this.setFormState('normal');
        
        // Clear all validation states
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('valid', 'invalid', 'validating', 'has-value');
            this.clearValidationMessage(group);
        });
        
        // Reset progress
        this.updateProgress();
        
        // Clear form messages
        clearFormMessages(this.form);
    }
}

/**
 * Initialize enhanced forms on page load
 */
export function initializeAdvancedForms() {
    // Auto-initialize all forms with enhanced features
    const forms = document.querySelectorAll('form:not([data-enhanced])');
    
    forms.forEach(form => {
        new AdvancedFormHandler(form, {
            realTimeValidation: true,
            smartFeatures: true,
            progressTracking: true,
            autoResize: true,
            characterCount: true
        });
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAdvancedForms);
    } else {
        initializeAdvancedForms();
    }
}

// Export for manual initialization
export default AdvancedFormHandler;`;
}

async function readFormUtilsFile() {
  // Return the form-utils.js content as a string
  return `// FORM-UTILS.JS - Shared Form Utility Functions
// Consolidated form validation and handling from ar.js and en.js
// Includes internationalization support for error messages

/**
 * Localized error messages
 */
const ERROR_MESSAGES = {
    ar: {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        minLength: 'يجب أن يحتوي هذا الحقل على {min} أحرف على الأقل',
        maxLength: 'يجب ألا يتجاوز هذا الحقل {max} حرفاً',
        pattern: 'تنسيق هذا الحقل غير صحيح'
    },
    en: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        minLength: 'This field must contain at least {min} characters',
        maxLength: 'This field must not exceed {max} characters',
        pattern: 'This field format is invalid'
    }
};

/**
 * Detect current language from URL or document
 */
export function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ERROR_MESSAGES[langParam]) {
        return langParam;
    }
    
    // Check HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && ERROR_MESSAGES[htmlLang]) {
        return htmlLang;
    }
    
    // Default to Arabic if document direction is RTL, otherwise English
    return document.documentElement.dir === 'rtl' ? 'ar' : 'en';
}

/**
 * Get localized error message
 */
export function getErrorMessage(type, params = {}) {
    const lang = getCurrentLanguage();
    let message = ERROR_MESSAGES[lang][type] || ERROR_MESSAGES.en[type];
    
    // Replace placeholders
    Object.keys(params).forEach(key => {
        message = message.replace(\`{\${key}}\`, params[key]);
    });
    
    return message;
}

/**
 * Remove field error display
 */
function removeFieldError(field) {
    const existingError = field.parentElement?.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    field.parentElement?.appendChild(errorElement);
}

/**
 * Validate individual form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
export function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error states
    field.classList.remove('error', 'success');
    removeFieldError(field);
    
    // Skip validation if field is empty and not required
    if (!value && !field.required) return true;
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = getErrorMessage('required');
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('email');
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\\+]?[0-9\\s\\-()]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('phone');
        }
    }
    
    // Min length validation
    if (field.minLength && value.length > 0 && value.length < field.minLength) {
        isValid = false;
        errorMessage = getErrorMessage('minLength', { min: field.minLength });
    }
    
    // Max length validation
    if (field.maxLength && value.length > field.maxLength) {
        isValid = false;
        errorMessage = getErrorMessage('maxLength', { max: field.maxLength });
    }
    
    // Pattern validation
    if (field.pattern && value) {
        const patternRegex = new RegExp(field.pattern);
        if (!patternRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('pattern');
        }
    }
    
    // Apply visual feedback
    if (isValid) {
        field.classList.add('success');
    } else {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
export function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        const isFieldValid = validateField(field);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Update form state (visual feedback)
 * @param {HTMLFormElement} form - The form to update
 * @param {string} state - The state ('loading', 'success', 'error', 'normal')
 */
export function updateFormState(form, state) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    
    // Remove all state classes
    form.classList.remove('is-loading', 'is-success', 'is-error');
    
    if (submitButton) {
        submitButton.classList.remove('is-loading', 'is-success', 'is-error');
    }
    
    // Apply new state
    switch (state) {
        case 'loading':
            form.classList.add('is-loading');
            if (submitButton) {
                submitButton.classList.add('is-loading');
                submitButton.disabled = true;
            }
            break;
            
        case 'success':
            form.classList.add('is-success');
            if (submitButton) {
                submitButton.classList.add('is-success');
                submitButton.disabled = false;
            }
            break;
            
        case 'error':
            form.classList.add('is-error');
            if (submitButton) {
                submitButton.classList.add('is-error');
                submitButton.disabled = false;
            }
            break;
            
        case 'normal':
        default:
            if (submitButton) {
                submitButton.disabled = false;
            }
            break;
    }
}

/**
 * Initialize form validation for a form
 * @param {HTMLFormElement} form - The form to initialize
 */
export function initFormValidation(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => {
            validateField(field);
        });
        
        // Clear error on input (immediate feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                field.classList.remove('error');
                removeFieldError(field);
            }
        });
    });
    
    // Validate form on submit
    form.addEventListener('submit', (e) => {
        const isValid = validateForm(form);
        if (!isValid) {
            e.preventDefault();
            
            // Focus on first invalid field
            const firstInvalidField = form.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
}

/**
 * Handle form submission with validation and feedback
 * @param {HTMLFormElement} form - The form to handle
 * @param {Function} onSubmit - Callback function to handle successful submission
 * @param {Object} options - Additional options
 */
export function handleFormSubmit(form, onSubmit, options = {}) {
    const { 
        showSuccessMessage = true, 
        resetOnSuccess = true,
        successDelay = 3000 
    } = options;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm(form);
        if (!isValid) {
            const firstInvalidField = form.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        
        try {
            // Set loading state
            updateFormState(form, 'loading');
            
            // Call submission handler
            await onSubmit(new FormData(form));
            
            // Set success state
            updateFormState(form, 'success');
            
            if (showSuccessMessage) {
                showFormMessage(form, getErrorMessage('success') || 'تم إرسال النموذج بنجاح / Form submitted successfully', 'success');
            }
            
            if (resetOnSuccess) {
                setTimeout(() => {
                    form.reset();
                    updateFormState(form, 'normal');
                    clearFormMessages(form);
                }, successDelay);
            }
            
        } catch (error) {
            // Log error in development only
            if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                }
            updateFormState(form, 'error');
            showFormMessage(form, error.message || 'حدث خطأ أثناء الإرسال / An error occurred during submission', 'error');
        }
    });
}

/**
 * Show form-level message
 * @param {HTMLFormElement} form - The form to show message for
 * @param {string} message - The message to show
 * @param {string} type - Message type ('success', 'error', 'info')
 */
export function showFormMessage(form, message, type = 'info') {
    clearFormMessages(form);
    
    const messageElement = document.createElement('div');
    messageElement.className = \`form-message form-message--\${type}\`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.setAttribute('aria-live', 'polite');
    
    // Insert at top of form
    form.insertBefore(messageElement, form.firstChild);
}

/**
 * Clear all form messages
 * @param {HTMLFormElement} form - The form to clear messages from
 */
export function clearFormMessages(form) {
    const messages = form.querySelectorAll('.form-message');
    messages.forEach(message => message.remove());
}

/**
 * Initialize all forms on the page with validation
 */
export function initializeAllForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        initFormValidation(form);
    });
}

// Auto-initialize forms when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeAllForms);
}`;
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
    logger.log('Contact Form Submission:', {
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
    logger.error('Contact form error:', error);
    
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
