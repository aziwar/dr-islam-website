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
    },

    // Advanced skeleton screens for loading states
    generateSkeletonCSS: () => {
        return `
        /* Sophisticated Skeleton Loading States */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 4px;
        }
        
        @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Component-specific skeletons */
        .skeleton-card {
            padding: 1.5rem;
            margin-bottom: 1rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .skeleton-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .skeleton-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
        }
        
        .skeleton-line {
            height: 16px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 4px;
            margin-bottom: 8px;
        }
        
        .skeleton-title {
            height: 20px;
            width: 70%;
            margin-bottom: 12px;
        }
        
        .skeleton-subtitle {
            height: 14px;
            width: 50%;
            margin-bottom: 16px;
        }
        
        .skeleton-text {
            height: 14px;
            margin-bottom: 8px;
        }
        
        .skeleton-text.short {
            width: 60%;
        }
        
        .skeleton-text.medium {
            width: 80%;
        }
        
        .skeleton-button {
            height: 44px;
            width: 120px;
            border-radius: 8px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            margin-right: 12px;
            display: inline-block;
        }
        
        .skeleton-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 8px;
            margin-bottom: 16px;
        }
        
        /* Gallery skeleton */
        .skeleton-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .skeleton-gallery-item {
            aspect-ratio: 4/3;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 12px;
        }
        
        /* Services skeleton */
        .skeleton-services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .skeleton-service-card {
            padding: 2rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        
        /* Testimonial skeleton */
        .skeleton-testimonials {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .skeleton-testimonial-card {
            padding: 2rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            position: relative;
        }
        
        .skeleton-quote-mark {
            width: 40px;
            height: 40px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 50%;
            margin-bottom: 1rem;
        }
        
        /* Loading states for specific components */
        .component-loading {
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f0f0f0;
            border-top: 3px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-text {
            margin-top: 1rem;
            color: #666;
            font-size: 14px;
            text-align: center;
        }
        
        /* Progressive loading animation */
        .progressive-load {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .progressive-load.loaded {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation for multiple items */
        .progressive-load:nth-child(1) { transition-delay: 0.1s; }
        .progressive-load:nth-child(2) { transition-delay: 0.2s; }
        .progressive-load:nth-child(3) { transition-delay: 0.3s; }
        .progressive-load:nth-child(4) { transition-delay: 0.4s; }
        .progressive-load:nth-child(5) { transition-delay: 0.5s; }
        .progressive-load:nth-child(6) { transition-delay: 0.6s; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .skeleton-services {
                grid-template-columns: 1fr;
            }
            
            .skeleton-testimonials {
                grid-template-columns: 1fr;
            }
            
            .skeleton-gallery {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
        }
        `;
    },

    // Generate skeleton HTML templates
    generateSkeletonTemplates: () => {
        return {
            serviceCard: `
                <div class="skeleton-service-card">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text medium"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-button"></div>
                </div>
            `,
            
            testimonialCard: `
                <div class="skeleton-testimonial-card">
                    <div class="skeleton-quote-mark"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text medium"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-header">
                        <div class="skeleton-avatar"></div>
                        <div>
                            <div class="skeleton-line" style="width: 120px; height: 16px;"></div>
                            <div class="skeleton-line" style="width: 80px; height: 14px;"></div>
                        </div>
                    </div>
                </div>
            `,
            
            galleryItem: `
                <div class="skeleton-gallery-item"></div>
            `,
            
            genericCard: `
                <div class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text medium"></div>
                    <div class="skeleton-button"></div>
                </div>
            `
        };
    },

    // Advanced component loading with skeleton states
    generateAdvancedLoadingScript: () => {
        return `
        <script>
        // Enhanced lazy loading with skeleton states
        class AdvancedLoader {
            constructor() {
                this.skeletonTemplates = ${JSON.stringify(PerformanceOptimizer.generateSkeletonTemplates())};
                this.init();
            }
            
            init() {
                this.setupIntersectionObserver();
                this.setupProgressiveLoading();
                this.setupComponentLoading();
            }
            
            setupIntersectionObserver() {
                if ('IntersectionObserver' in window) {
                    const options = {
                        rootMargin: '50px 0px',
                        threshold: 0.1
                    };
                    
                    this.imageObserver = new IntersectionObserver(this.handleImageIntersection.bind(this), options);
                    this.componentObserver = new IntersectionObserver(this.handleComponentIntersection.bind(this), options);
                    
                    // Observe images
                    document.querySelectorAll('img[data-src]').forEach(img => {
                        this.imageObserver.observe(img);
                    });
                    
                    // Observe components
                    document.querySelectorAll('[data-component-load]').forEach(component => {
                        this.componentObserver.observe(component);
                    });
                }
            }
            
            handleImageIntersection(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        this.imageObserver.unobserve(img);
                    }
                });
            }
            
            handleComponentIntersection(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const component = entry.target;
                        this.loadComponent(component);
                        this.componentObserver.unobserve(component);
                    }
                });
            }
            
            loadImage(img) {
                // Show skeleton while loading
                img.classList.add('skeleton');
                
                const loadImg = new Image();
                loadImg.onload = () => {
                    img.src = loadImg.src;
                    img.classList.remove('skeleton');
                    img.classList.add('progressive-load', 'loaded');
                };
                loadImg.onerror = () => {
                    img.classList.remove('skeleton');
                    img.classList.add('error');
                };
                loadImg.src = img.dataset.src;
            }
            
            loadComponent(component) {
                const componentType = component.dataset.componentLoad;
                const skeletonHTML = this.generateSkeletonForComponent(componentType);
                
                // Show skeleton
                component.innerHTML = skeletonHTML;
                component.classList.add('component-loading');
                
                // Simulate component loading (replace with actual loading logic)
                setTimeout(() => {
                    this.renderComponent(component, componentType);
                }, Math.random() * 1000 + 500); // Random delay for demo
            }
            
            generateSkeletonForComponent(type) {
                switch(type) {
                    case 'services':
                        return '<div class="skeleton-services">' + 
                               Array(3).fill(this.skeletonTemplates.serviceCard).join('') + 
                               '</div>';
                    case 'testimonials':
                        return '<div class="skeleton-testimonials">' + 
                               Array(3).fill(this.skeletonTemplates.testimonialCard).join('') + 
                               '</div>';
                    case 'gallery':
                        return '<div class="skeleton-gallery">' + 
                               Array(6).fill(this.skeletonTemplates.galleryItem).join('') + 
                               '</div>';
                    default:
                        return '<div class="component-loading"><div class="loading-spinner"></div><div class="loading-text">Loading...</div></div>';
                }
            }
            
            renderComponent(component, type) {
                // Remove skeleton and loading states
                component.classList.remove('component-loading');
                
                // Add progressive loading animation
                component.classList.add('progressive-load');
                
                // Trigger the loaded animation
                setTimeout(() => {
                    component.classList.add('loaded');
                }, 100);
            }
            
            setupProgressiveLoading() {
                // Progressive loading for content that's already visible
                document.addEventListener('DOMContentLoaded', () => {
                    const elements = document.querySelectorAll('.progressive-load');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('loaded');
                        }, index * 100);
                    });
                });
            }
            
            setupComponentLoading() {
                // Handle dynamic component loading
                document.addEventListener('componentLoad', (e) => {
                    const { element, type, data } = e.detail;
                    this.loadComponent(element);
                });
            }
        }
        
        // Initialize advanced loader
        new AdvancedLoader();
        </script>
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
        ${PerformanceOptimizer.generateSkeletonCSS()}
    </style>
    `;
};

export const generateOptimizedScripts = () => {
    return `
    ${PerformanceOptimizer.generateLazyLoadScript()}
    ${PerformanceOptimizer.generateAdvancedLoadingScript()}
    ${PerformanceOptimizer.generateServiceWorkerScript()}
    `;
};