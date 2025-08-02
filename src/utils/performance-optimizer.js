/**
 * Performance Optimization Utilities for Dr. Islam Dental Website
 * Addresses First Contentful Paint and Largest Contentful Paint issues
 */

export const PerformanceOptimizer = {
    
    // Critical CSS extraction and inlining
    inlineCriticalCSS: () => {
        return `
        /* Critical Above-the-fold CSS */
        :root {
            --primary: #BEB093;
            --secondary: #8B4513;
            --white: #FFFFFF;
            --text: #333333;
            --bg: #F8F7F5;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
        }
        
        header {
            background: var(--white);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .logo { display: flex; align-items: center; }
        .dental-logo svg { width: 120px; height: 40px; }
        
        .hero {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
            text-align: center;
            padding: 4rem 2rem;
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .hero h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: 1rem;
            font-weight: 700;
        }
        
        .cta-button {
            background: var(--white);
            color: var(--primary);
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1.5rem;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            nav { padding: 1rem; }
            .dental-logo svg { width: 100px; height: 33px; }
            .hero { padding: 3rem 1rem; min-height: 50vh; }
            .hero h1 { font-size: 2rem; }
        }
        `;
    },

    // Preload critical resources
    generatePreloadTags: () => {
        return `
        <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        `;
    },

    // Lazy loading script for images
    generateLazyLoadScript: () => {
        return `
        <script>
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Fast loading for critical elements
        document.addEventListener('DOMContentLoaded', () => {
            // Prioritize logo rendering
            const logo = document.querySelector('.dental-logo svg');
            if (logo) {
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
            }
            
            // Fast CTA button rendering
            const ctaButtons = document.querySelectorAll('.cta-button');
            ctaButtons.forEach(btn => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            });
        });
        </script>
        `;
    },

    // Service Worker registration for caching
    generateServiceWorkerScript: () => {
        return `
        <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        // Service worker registered successfully
                    })
                    .catch(registrationError => {
                        // Service worker registration failed - handled silently in production
                    });
            });
        }
        </script>
        `;
    },

    // Resource hints for better loading
    generateResourceHints: () => {
        return `
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="/styles.css"></noscript>
        `;
    },

    // Optimize font loading
    generateFontOptimization: () => {
        return `
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
        </noscript>
        `;
    },

    // Generate optimized meta tags for performance
    generatePerformanceMeta: () => {
        return `
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="#BEB093">
        <meta name="color-scheme" content="light">
        <link rel="canonical" href="https://dr-elsagher.com/">
        `;
    }
};

// Usage in HTML templates
export const generateOptimizedHead = (lang = 'en') => {
    return `
    ${PerformanceOptimizer.generatePerformanceMeta()}
    ${PerformanceOptimizer.generateResourceHints()}
    ${PerformanceOptimizer.generateFontOptimization()}
    <style>
        ${PerformanceOptimizer.inlineCriticalCSS()}
    </style>
    `;
};

export const generateOptimizedScripts = () => {
    return `
    ${PerformanceOptimizer.generateLazyLoadScript()}
    ${PerformanceOptimizer.generateServiceWorkerScript()}
    `;
};