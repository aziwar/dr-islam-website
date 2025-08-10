// CSS OPTIMIZER - Bundle splitting and critical path optimization
// Component-based CSS loading with performance optimization

export class CSSOptimizer {
  
  constructor(options = {}) {
    this.config = {
      criticalThreshold: 50000, // 50KB critical CSS limit
      componentChunkSize: 20000, // 20KB per component chunk
      enableMinification: true,
      enablePurging: true,
      mediaQueries: {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 1023px)',
        desktop: '(min-width: 1024px)'
      },
      ...options
    };
    
    this.criticalCSS = '';
    this.deferredCSS = new Map();
    this.loadedChunks = new Set();
  }

  /**
   * Generate critical CSS for above-the-fold content
   * @returns {string} Critical CSS styles
   */
  generateCriticalCSS() {
    return `
      /* CRITICAL CSS - Above the fold content */
      
      /* CSS Reset & Base */
      *,*::before,*::after{box-sizing:border-box}
      *{margin:0;padding:0}
      html{font-size:16px;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
      body{font-family:'Poppins',sans-serif;color:#2d3748;line-height:1.6;direction:rtl}
      
      /* Design Tokens - Critical subset */
      :root{
        --primary:#BEB093;--secondary:#777669;--white:#FFFFFF;--text:#2d3748;
        --success:#28a745;--warning:#ffc107;--emergency:#dc3545;
        --space-xs:0.25rem;--space-sm:0.5rem;--space-md:1rem;--space-lg:1.5rem;--space-xl:2rem;
        --text-sm:0.875rem;--text-base:1rem;--text-lg:1.125rem;--text-xl:1.25rem;
        --radius-sm:0.25rem;--radius-md:0.5rem;--radius-lg:0.75rem;
        --breakpoint-sm:640px;--breakpoint-md:768px;--breakpoint-lg:1024px;
        --z-fixed:1000;--z-modal:2000;
      }
      
      /* Emergency Banner - Critical */
      .emergency-banner{
        background:var(--emergency);color:var(--white);text-align:center;
        padding:10px;font-weight:500;position:sticky;top:0;z-index:101;
      }
      
      /* Header - Critical */
      header{
        background:rgba(255,255,255,0.9);backdrop-filter:blur(20px);
        position:sticky;top:40px;z-index:100;border-radius:12px;margin:0 20px;
      }
      
      nav{display:flex;justify-content:space-between;align-items:center;
          padding:1rem 5%;max-width:1200px;margin:0 auto}
      
      .logo{display:flex;align-items:center;min-height:48px}
      .logo-img{height:80px;width:80px;object-fit:contain}
      
      /* Navigation - Critical */
      .main-nav{position:fixed;top:0;right:-100%;width:min(80vw,400px);height:100vh;
                background:rgba(255,255,255,0.95);backdrop-filter:blur(25px);
                display:flex;flex-direction:column;justify-content:center;
                transition:right 0.3s ease;z-index:2000}
      
      .main-nav.is-open{right:0}
      .nav-toggle{display:flex;background:none;border:none;cursor:pointer;
                  padding:8px;min-height:48px;min-width:48px}
      
      /* Hero Section - Critical */
      .hero{
        background:linear-gradient(-45deg,#BEB093,#777669,#8B7F6B,#9A8E77);
        color:var(--white);padding:3rem 1rem;text-align:center;min-height:80vh;
        display:flex;align-items:center;justify-content:center;
      }
      
      .hero h1{font-size:clamp(2rem,5vw,3.5rem);margin-bottom:1rem;font-weight:600}
      .hero p{font-size:1.125rem;margin-bottom:2rem;max-width:600px}
      
      /* CTA Button - Critical */
      .cta-button{
        display:inline-block;background:linear-gradient(135deg,var(--primary) 0%,#a89680 100%);
        color:var(--white);padding:18px 40px;border-radius:50px;text-decoration:none;
        font-weight:bold;transition:transform 0.3s ease;
        box-shadow:0 5px 25px rgba(190,176,147,0.3);
      }
      
      .cta-button:hover{transform:translateY(-3px) scale(1.05)}
      
      /* Mobile Menu Toggle - Critical */
      .nav-toggle span{display:block;width:25px;height:3px;background:var(--secondary);
                       margin:5px 0;transition:0.3s;border-radius:2px}
      
      /* Skeleton Loading - Critical */
      .skeleton{
        background:linear-gradient(90deg,rgba(190,176,147,0.1) 25%,rgba(190,176,147,0.2) 50%,rgba(190,176,147,0.1) 75%);
        background-size:200% 100%;animation:skeleton-loading 1.5s infinite;border-radius:4px;
      }
      
      @keyframes skeleton-loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
      
      /* Mobile First - Critical Responsive */
      @media (max-width:767px){
        .hero{padding:2rem 1rem;min-height:60vh}
        .hero h1{font-size:2rem}
        header{margin:0 10px;top:20px}
        .cta-button{padding:16px 32px;width:100%;max-width:300px}
      }
      
      /* Desktop Navigation - Critical */
      @media (min-width:768px){
        .main-nav{position:static;width:auto;height:auto;background:transparent;
                  backdrop-filter:none;flex-direction:row;gap:1.5rem;right:0}
        .nav-toggle{display:none}
      }
      
      /* Focus States - Critical Accessibility */
      *:focus{outline:3px solid var(--primary);outline-offset:2px}
      
      /* Reduced Motion - Critical Accessibility */
      @media (prefers-reduced-motion:reduce){
        *,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important}
        html{scroll-behavior:auto}
      }
      
      /* High Contrast - Critical Accessibility */
      @media (prefers-contrast:high){
        .cta-button{border:2px solid currentColor}
      }
    `;
  }

  /**
   * Generate component-based CSS chunks
   * @returns {Object} CSS chunks organized by component
   */
  generateCSSChunks() {
    return {
      
      // Button Component Chunk
      'button-component': `
        /* Button Component - Full Implementation */
        .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;
             min-width:48px;padding:12px 24px;border:none;border-radius:8px;
             font-family:inherit;font-size:1rem;font-weight:500;text-decoration:none;
             cursor:pointer;transition:all 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
             position:relative;overflow:hidden;user-select:none;outline:none;
             will-change:transform,box-shadow,opacity;transform:translateZ(0);
             backface-visibility:hidden}
        
        .btn:focus{outline:3px solid var(--primary);outline-offset:2px;
                   box-shadow:0 0 0 3px rgba(190,176,147,0.2)}
        .btn:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}
        
        .btn--primary{background:linear-gradient(135deg,var(--primary) 0%,#a89680 100%);
                      color:var(--white);padding:18px 40px;border-radius:50px;font-weight:bold;
                      box-shadow:0 5px 25px rgba(190,176,147,0.3)}
        
        .btn--secondary{background:transparent;color:var(--primary);border:2px solid var(--primary)}
        .btn--ghost{background:transparent;color:var(--secondary);border:1px solid transparent;padding:8px 16px}
        .btn--emergency{background:var(--emergency);color:var(--white);animation:pulse 2s infinite}
        
        .btn--small{padding:8px 16px;min-height:36px;font-size:0.875rem}
        .btn--large{padding:20px 48px;min-height:56px;font-size:1.125rem}
        
        @keyframes pulse{0%{box-shadow:0 5px 20px rgba(220,53,69,0.3)}
                        50%{box-shadow:0 5px 30px rgba(220,53,69,0.5)}
                        100%{box-shadow:0 5px 20px rgba(220,53,69,0.3)}}
      `,

      // Form Components Chunk  
      'form-components': `
        /* Input & Form Components */
        .input{display:block;width:100%;min-height:48px;padding:12px 16px;
               font-family:inherit;font-size:1rem;line-height:1.5;color:var(--text);
               background-color:var(--white);border:2px solid #e5e5e5;border-radius:8px;
               transition:all 0.3s ease;appearance:none}
        
        .input:focus{outline:none;border-color:var(--primary);
                     box-shadow:0 0 0 3px rgba(190,176,147,0.1)}
        
        .input--error{border-color:var(--emergency);background-color:rgba(220,53,69,0.02)}
        .input--success{border-color:var(--success);background-color:rgba(40,167,69,0.02)}
        
        .form-group{display:flex;flex-direction:column;margin-bottom:1.5rem;position:relative}
        .form-group__label{margin-bottom:0.25rem;font-weight:500;color:var(--text)}
        .form-group__message{margin-top:0.25rem;font-size:0.875rem;display:flex;align-items:center;gap:0.25rem}
        .form-group__message--error{color:var(--emergency)}
        .form-group__message--success{color:var(--success)}
      `,

      // Service Cards Chunk
      'service-cards': `
        /* Service Card Components */
        .service-card{background:var(--white);border-radius:12px;padding:2rem;text-align:center;
                      transition:all 0.3s cubic-bezier(0.4,0,0.2,1);border:1px solid #f0f0f0;
                      position:relative;overflow:hidden;will-change:transform,box-shadow;
                      transform:translateZ(0);backface-visibility:hidden}
        
        .service-card:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(0,0,0,0.1);
                           border-color:var(--primary)}
        
        .service-card__icon{margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;
                           width:80px;height:80px;background:linear-gradient(135deg,var(--primary),#a89680);
                           border-radius:50%;color:var(--white);transition:all 0.3s ease}
        
        .service-card:hover .service-card__icon{transform:scale(1.1);
                                               box-shadow:0 8px 25px rgba(190,176,147,0.3)}
        
        .service-card__title{margin-bottom:0.5rem;color:var(--secondary);transition:color 0.3s ease}
        .service-card:hover .service-card__title{color:var(--primary)}
        
        .service-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
                      gap:2rem;margin:2rem 0}
        
        @media (max-width:767px){
          .service-cards{grid-template-columns:1fr;gap:1rem}
          .service-card{padding:1.5rem}
          .service-card:hover{transform:none}
        }
      `,

      // Gallery Components Chunk
      'gallery-components': `
        /* Gallery Components */
        .gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
                     gap:1.5rem;margin:1.5rem 0}
        
        .gallery-item{background:white;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 6px rgba(0,0,0,0.1);transition:transform 0.3s ease;
                      will-change:transform,opacity;transform:translateZ(0);backface-visibility:hidden}
        
        .gallery-item:hover{transform:translateY(-5px);box-shadow:0 8px 25px rgba(0,0,0,0.15)}
        
        .case-images{position:relative;height:250px;overflow:hidden}
        .before-image,.after-image{position:absolute;top:0;left:0;width:100%;height:100%;
                                  object-fit:cover;transition:opacity 0.3s ease}
        .after-image{opacity:0}
        .gallery-item:hover .after-image{opacity:1}
        
        .gallery-filters{display:flex;justify-content:center;margin-bottom:2rem;
                        border-bottom:1px solid #eee;overflow-x:auto}
        .filter-btn{background:none;border:none;padding:12px 24px;cursor:pointer;
                   font-size:14px;font-weight:500;color:#666;border-bottom:3px solid transparent;
                   transition:all 0.3s ease;white-space:nowrap}
        .filter-btn:hover,.filter-btn.active{color:var(--primary);border-bottom-color:var(--primary)}
        
        @media (max-width:767px){
          .gallery-grid{grid-template-columns:1fr}
          .case-images{height:200px}
        }
      `,

      // Typography & Content Chunk
      'typography': `
        /* Typography System */
        .typography{margin:0;padding:0;font-family:inherit;color:inherit;line-height:inherit}
        
        .typography--h1{font-size:2.5rem;font-weight:600;line-height:1.2;margin-bottom:1rem}
        .typography--h2{font-size:2rem;font-weight:600;line-height:1.3;margin-bottom:1rem}
        .typography--h3{font-size:1.5rem;font-weight:600;line-height:1.4;margin-bottom:1rem}
        .typography--h4{font-size:1.25rem;font-weight:600;line-height:1.4;margin-bottom:0.75rem}
        
        .typography--p{font-size:1rem;font-weight:400;line-height:1.6;margin-bottom:1rem}
        .typography--subtitle{font-size:1.125rem;font-weight:500;line-height:1.4;
                             margin-bottom:1rem;color:var(--secondary)}
        .typography--lead{font-size:1.125rem;font-weight:400;line-height:1.6;margin-bottom:1.5rem}
        
        .typography--primary{color:var(--primary)}
        .typography--secondary{color:var(--secondary)}
        .typography--success{color:var(--success)}
        .typography--muted{color:#666}
        
        /* Arabic Typography */
        .typography--arabic,[lang="ar"] .typography{
          font-family:'Cairo','Tajawal','Noto Kufi Arabic',sans-serif;
          font-weight:400;letter-spacing:0;word-spacing:0.1em;line-height:1.8;text-align:right}
        
        @media (max-width:767px){
          .typography--h1{font-size:2rem}
          .typography--h2{font-size:1.5rem}
          .typography--h3{font-size:1.25rem}
        }
      `,

      // Layout & Utilities Chunk
      'layout-utilities': `
        /* Layout & Utility Classes */
        .container{max-width:1200px;margin:0 auto;padding:0 1rem}
        
        .section{padding:4rem 0}
        .section--small{padding:2rem 0}
        .section--large{padding:6rem 0}
        
        .text-center{text-align:center}
        .text-left{text-align:left}
        .text-right{text-align:right}
        
        .mb-0{margin-bottom:0}
        .mb-1{margin-bottom:0.5rem}
        .mb-2{margin-bottom:1rem}
        .mb-3{margin-bottom:1.5rem}
        .mb-4{margin-bottom:2rem}
        
        .mt-0{margin-top:0}
        .mt-1{margin-top:0.5rem}
        .mt-2{margin-top:1rem}
        .mt-3{margin-top:1.5rem}
        .mt-4{margin-top:2rem}
        
        .d-none{display:none}
        .d-block{display:block}
        .d-inline{display:inline}
        .d-inline-block{display:inline-block}
        .d-flex{display:flex}
        .d-grid{display:grid}
        
        .flex-column{flex-direction:column}
        .flex-row{flex-direction:row}
        .justify-center{justify-content:center}
        .justify-between{justify-content:space-between}
        .align-center{align-items:center}
        
        .w-100{width:100%}
        .h-100{height:100%}
        
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;
                overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        
        @media (max-width:767px){
          .d-sm-none{display:none}
          .d-sm-block{display:block}
          .text-sm-center{text-align:center}
        }
        
        @media (min-width:768px){
          .d-md-none{display:none}
          .d-md-block{display:block}
          .d-md-flex{display:flex}
        }
        
        @media (min-width:1024px){
          .d-lg-none{display:none}
          .d-lg-block{display:block}
          .d-lg-flex{display:flex}
        }
      `
    };
  }

  /**
   * Generate CSS loader JavaScript
   * @returns {string} Dynamic CSS loading system
   */
  generateCSSLoader() {
    return `
      class CSSLoader {
        constructor() {
          this.loadedChunks = new Set();
          this.pendingLoads = new Map();
          this.criticalLoaded = false;
          this.init();
        }
        
        init() {
          // Load critical CSS immediately
          this.loadCriticalCSS();
          
          // Set up intersection observer for component-based loading
          this.setupComponentObserver();
          
          // Load essential chunks after critical content
          requestIdleCallback(() => {
            this.loadEssentialChunks();
          });
        }
        
        loadCriticalCSS() {
          if (this.criticalLoaded) return;
          
          const criticalCSS = document.getElementById('critical-css');
          if (criticalCSS) {
            this.criticalLoaded = true;
            console.log('✅ Critical CSS loaded');
          }
        }
        
        async loadChunk(chunkName, priority = 'low') {
          if (this.loadedChunks.has(chunkName)) {
            return Promise.resolve();
          }
          
          // Check if already loading
          if (this.pendingLoads.has(chunkName)) {
            return this.pendingLoads.get(chunkName);
          }
          
          const loadPromise = this.loadCSSFile(\`/css/\${chunkName}.css\`, priority);
          this.pendingLoads.set(chunkName, loadPromise);
          
          try {
            await loadPromise;
            this.loadedChunks.add(chunkName);
            this.pendingLoads.delete(chunkName);
            console.log(\`✅ CSS chunk loaded: \${chunkName}\`);
          } catch (error) {
            this.pendingLoads.delete(chunkName);
            console.error(\`❌ Failed to load CSS chunk: \${chunkName}\`, error);
            throw error;
          }
        }
        
        loadCSSFile(href, priority = 'low') {
          return new Promise((resolve, reject) => {
            const existing = document.querySelector(\`link[href="\${href}"]\`);
            if (existing) {
              resolve();
              return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print'; // Load without blocking render
            link.fetchPriority = priority;
            
            link.onload = () => {
              link.media = 'all'; // Apply styles after load
              resolve();
            };
            
            link.onerror = () => reject(new Error(\`Failed to load \${href}\`));
            
            document.head.appendChild(link);
          });
        }
        
        loadEssentialChunks() {
          const essentialChunks = [
            'button-component',
            'form-components', 
            'typography',
            'layout-utilities'
          ];
          
          essentialChunks.forEach(chunk => {
            this.loadChunk(chunk, 'low').catch(console.error);
          });
        }
        
        setupComponentObserver() {
          if (!('IntersectionObserver' in window)) {
            // Fallback: load all chunks
            this.loadAllChunks();
            return;
          }
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.handleComponentInView(entry.target);
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.1
          });
          
          // Observe components that need specific CSS
          this.observeComponents(observer);
        }
        
        observeComponents(observer) {
          // Service cards section
          const serviceCards = document.querySelector('.services');
          if (serviceCards) {
            observer.observe(serviceCards);
            serviceCards.dataset.cssChunk = 'service-cards';
          }
          
          // Gallery section  
          const gallery = document.querySelector('.gallery');
          if (gallery) {
            observer.observe(gallery);
            gallery.dataset.cssChunk = 'gallery-components';
          }
          
          // Forms
          const forms = document.querySelectorAll('form');
          forms.forEach(form => {
            observer.observe(form);
            form.dataset.cssChunk = 'form-components';
          });
        }
        
        handleComponentInView(element) {
          const chunkName = element.dataset.cssChunk;
          if (chunkName && !this.loadedChunks.has(chunkName)) {
            this.loadChunk(chunkName, 'high').then(() => {
              element.classList.add('css-loaded');
            });
          }
        }
        
        loadAllChunks() {
          const allChunks = [
            'button-component',
            'form-components',
            'service-cards', 
            'gallery-components',
            'typography',
            'layout-utilities'
          ];
          
          allChunks.forEach(chunk => {
            this.loadChunk(chunk).catch(console.error);
          });
        }
        
        preloadChunk(chunkName) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = \`/css/\${chunkName}.css\`;
          document.head.appendChild(link);
        }
        
        getLoadedChunks() {
          return [...this.loadedChunks];
        }
        
        getLoadingStats() {
          return {
            loaded: this.loadedChunks.size,
            pending: this.pendingLoads.size,
            criticalLoaded: this.criticalLoaded
          };
        }
      }
      
      // Initialize CSS loader
      const cssLoader = new CSSLoader();
      
      // Expose for debugging
      if (typeof window !== 'undefined') {
        window.cssLoader = cssLoader;
      }
      
      export default cssLoader;
    `;
  }

  /**
   * Generate build configuration for CSS optimization
   * @returns {string} Build script configuration
   */
  generateBuildConfig() {
    return `
      // css-build.js - CSS optimization build configuration
      const postcss = require('postcss');
      const cssnano = require('cssnano');
      const purgecss = require('@fullhuman/postcss-purgecss');
      const autoprefixer = require('autoprefixer');
      const fs = require('fs').promises;
      const path = require('path');
      
      class CSSBuilder {
        constructor() {
          this.inputDir = './src/content/css';
          this.outputDir = './dist/css';
          this.criticalThreshold = 50000; // 50KB
          this.componentThreshold = 20000; // 20KB
        }
        
        async buildAll() {
          console.log('🎨 Starting CSS optimization...');
          
          // Ensure output directory
          await fs.mkdir(this.outputDir, { recursive: true });
          
          // Build critical CSS
          await this.buildCriticalCSS();
          
          // Build component chunks
          await this.buildComponentChunks();
          
          // Generate manifest
          await this.generateManifest();
          
          console.log('✅ CSS optimization complete');
        }
        
        async buildCriticalCSS() {
          const criticalCSS = \`
            /* Critical CSS - Generated */
            \${this.getCriticalStyles()}
          \`;
          
          const processed = await postcss([
            autoprefixer(),
            cssnano({
              preset: ['default', {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                minifySelectors: true
              }]
            })
          ]).process(criticalCSS, { from: undefined });
          
          await fs.writeFile(
            path.join(this.outputDir, 'critical.css'),
            processed.css
          );
          
          console.log(\`📦 Critical CSS: \${(processed.css.length / 1024).toFixed(1)}KB\`);
        }
        
        async buildComponentChunks() {
          const chunks = this.getComponentChunks();
          
          for (const [chunkName, css] of Object.entries(chunks)) {
            const processed = await postcss([
              purgecss({
                content: ['./src/**/*.html', './src/**/*.js'],
                defaultExtractor: content => content.match(/[\\w-/:]+(?<!:)/g) || []
              }),
              autoprefixer(),
              cssnano({
                preset: ['default', {
                  discardComments: { removeAll: true }
                }]
              })
            ]).process(css, { from: undefined });
            
            await fs.writeFile(
              path.join(this.outputDir, \`\${chunkName}.css\`),
              processed.css
            );
            
            console.log(\`📦 \${chunkName}: \${(processed.css.length / 1024).toFixed(1)}KB\`);
          }
        }
        
        getCriticalStyles() {
          // Return critical CSS content
          return require('./CSSOptimizer.js').generateCriticalCSS();
        }
        
        getComponentChunks() {
          // Return component chunks
          return require('./CSSOptimizer.js').generateCSSChunks();
        }
        
        async generateManifest() {
          const manifest = {
            critical: 'critical.css',
            chunks: {
              'button-component': 'button-component.css',
              'form-components': 'form-components.css',
              'service-cards': 'service-cards.css',
              'gallery-components': 'gallery-components.css',
              'typography': 'typography.css',
              'layout-utilities': 'layout-utilities.css'
            },
            version: Date.now()
          };
          
          await fs.writeFile(
            path.join(this.outputDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2)
          );
        }
      }
      
      // Run if called directly
      if (require.main === module) {
        const builder = new CSSBuilder();
        builder.buildAll().catch(console.error);
      }
      
      module.exports = CSSBuilder;
    `;
  }

  /**
   * Generate inline critical CSS for HTML head
   * @returns {string} Inline critical styles
   */
  generateInlineCritical() {
    const criticalCSS = this.generateCriticalCSS();
    
    return `
      <style id="critical-css">
        ${criticalCSS}
      </style>
      
      <script>
        // Preload essential CSS chunks
        const essentialChunks = ['button-component', 'form-components', 'typography'];
        essentialChunks.forEach(chunk => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = \`/css/\${chunk}.css\`;
          document.head.appendChild(link);
        });
        
        // Load CSS loader script
        const script = document.createElement('script');
        script.src = '/js/css-loader.js';
        script.async = true;
        document.head.appendChild(script);
      </script>
    `;
  }
}

export default CSSOptimizer;