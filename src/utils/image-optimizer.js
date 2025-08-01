// Advanced Image Optimization System with AVIF Support
export class ImageOptimizationSystem {
  constructor(options = {}) {
    // Configuration with intelligent defaults
    this.config = {
      rootMargin: options.rootMargin || '50px 0px',
      threshold: options.threshold || 0.01,
      retryAttempts: options.retryAttempts || 3,
      retryDelay: options.retryDelay || 1000,
      maxConcurrentLoads: options.maxConcurrentLoads || 6,
      enableDebugMode: options.enableDebugMode || false,
      fallbackTimeout: options.fallbackTimeout || 5000,
      ...options
    };

    // Enhanced performance metrics with detailed tracking
    this.performanceMetrics = {
      totalImages: 0,
      loadedCount: 0,
      errorCount: 0,
      retryCount: 0,
      totalLoadTime: 0,
      averageLoadTime: 0,
      formatSupport: null,
      intersectionObserver: null,
      loadingQueue: new Map(),
      formatStats: { avif: 0, webp: 0, jpeg: 0 },
      loadTimeByFormat: { avif: [], webp: [], jpeg: [] }
    };

    // Error tracking and recovery
    this.errorTracker = {
      failedImages: new Set(),
      retryQueue: new Map(),
      errorReasons: new Map()
    };

    // Initialize system with error handling
    this._safeInitialize();
  }

  // Enhanced format support detection with caching
  async _detectFormatSupport() {
    // Check cache first
    const cached = sessionStorage.getItem('imageFormatSupport');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        this._log('warn', 'Failed to parse cached format support', e);
      }
    }

    const support = {
      avif: false,
      webp: false,
      jpeg: true,
      heic: false,
      jxl: false
    };

    // Test format support using multiple methods
    const testMethods = [
      () => this._testCanvasSupport(support),
      () => this._testImageSupport(support),
      () => this._testUserAgentSupport(support)
    ];

    for (const testMethod of testMethods) {
      try {
        await testMethod();
      } catch (e) {
        this._log('warn', 'Format detection method failed', e);
      }
    }

    // Cache the results
    try {
      sessionStorage.setItem('imageFormatSupport', JSON.stringify(support));
    } catch (e) {
      this._log('warn', 'Failed to cache format support', e);
    }

    return support;
  }

  // Canvas-based format testing
  _testCanvasSupport(support) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      // Test AVIF
      try {
        support.avif = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
      } catch (e) {
        support.avif = false;
      }

      // Test WebP
      try {
        support.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } catch (e) {
        support.webp = false;
      }
    } catch (e) {
      this._log('warn', 'Canvas format testing failed', e);
    }
  }

  // Image element based testing (more reliable)
  async _testImageSupport(support) {
    const testFormats = [
      { format: 'avif', data: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAAABwYWFzcA==' },
      { format: 'webp', data: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA' }
    ];

    const promises = testFormats.map(async ({ format, data }) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          support[format] = img.width === 2 && img.height === 2;
          resolve();
        };
        img.onerror = () => {
          support[format] = false;
          resolve();
        };
        img.src = data;
        
        // Timeout fallback
        setTimeout(() => {
          support[format] = false;
          resolve();
        }, 1000);
      });
    });

    await Promise.all(promises);
  }

  // User agent based fallback testing
  _testUserAgentSupport(support) {
    const userAgent = navigator.userAgent;
    const acceptHeader = 'image/avif,image/webp,*/*';
    
    // Enhanced browser detection
    const browsers = {
      chrome: userAgent.includes('Chrome') && !userAgent.includes('Edg'),
      firefox: userAgent.includes('Firefox'),
      safari: userAgent.includes('Safari') && !userAgent.includes('Chrome'),
      edge: userAgent.includes('Edg')
    };

    // Version extraction with better patterns
    const versions = {
      chrome: this._extractVersion(userAgent, /Chrome\/(\d+)/),
      firefox: this._extractVersion(userAgent, /Firefox\/(\d+)/),
      safari: this._extractVersion(userAgent, /Version\/(\d+)/),
      edge: this._extractVersion(userAgent, /Edg\/(\d+)/)
    };

    // AVIF support matrix (updated browser versions)
    if ((browsers.chrome && versions.chrome >= 85) ||
        (browsers.firefox && versions.firefox >= 93) ||
        (browsers.safari && versions.safari >= 16) ||
        (browsers.edge && versions.edge >= 85)) {
      support.avif = true;
    }

    // WebP support matrix
    if ((browsers.chrome && versions.chrome >= 23) ||
        (browsers.firefox && versions.firefox >= 65) ||
        (browsers.safari && versions.safari >= 14) ||
        (browsers.edge && versions.edge >= 18)) {
      support.webp = true;
    }
  }

  // Improved version extraction
  _extractVersion(userAgent, pattern) {
    const match = userAgent.match(pattern);
    return match ? parseInt(match[1], 10) : 0;
  }

  // Safe initialization with comprehensive error handling
  async _safeInitialize() {
    try {
      this._log('info', '🚀 Initializing Image Optimization System...');
      
      // Detect format support first
      this.performanceMetrics.formatSupport = await this._detectFormatSupport();
      
      // Initialize core systems with error boundaries
      await this._initializeWithErrorBoundary('lazy loading', () => this._initializeLazyLoading());
      await this._initializeWithErrorBoundary('performance monitoring', () => this._setupPerformanceMonitoring());
      await this._initializeWithErrorBoundary('critical image preloading', () => this._preloadCriticalImages());
      
      // Mark system as ready
      document.documentElement.classList.add('image-optimization-ready');
      
      // Dispatch ready event
      document.dispatchEvent(new CustomEvent('imageSystemReady', {
        detail: {
          formatSupport: this.performanceMetrics.formatSupport,
          config: this.config,
          timestamp: Date.now()
        }
      }));
      
      this._log('success', '✅ Image Optimization System initialized', {
        avifSupported: this.performanceMetrics.formatSupport.avif,
        webpSupported: this.performanceMetrics.formatSupport.webp,
        lazyLoadingSupported: 'IntersectionObserver' in window,
        debugMode: this.config.enableDebugMode
      });
      
    } catch (error) {
      this._log('error', '❌ Failed to initialize Image Optimization System', error);
      this._fallbackInitialization();
    }
  }

  // Error boundary for initialization steps
  async _initializeWithErrorBoundary(stepName, initFunction) {
    try {
      await initFunction();
      this._log('info', `✅ ${stepName} initialized successfully`);
    } catch (error) {
      this._log('error', `❌ Failed to initialize ${stepName}`, error);
      // Continue with other initializations
    }
  }

  // Fallback initialization for critical failures
  _fallbackInitialization() {
    this._log('warn', '⚠️ Using fallback initialization mode');
    
    // Basic format support fallback
    this.performanceMetrics.formatSupport = {
      avif: false,
      webp: true, // Conservative assumption
      jpeg: true
    };
    
    // Load all images immediately as fallback
    setTimeout(() => {
      this._loadAllImages();
    }, 100);
    
    document.documentElement.classList.add('image-optimization-fallback');
  }

  // Enhanced logging system
  _log(level, message, data = null) {
    if (!this.config.enableDebugMode && level === 'info') return;
    
    const timestamp = new Date().toISOString();
    const prefix = `[ImageOptimizer:${timestamp}]`;
    
    switch (level) {
      case 'error':
        // Store error for analytics
        this.errorTracker.errorReasons.set(Date.now(), { message, data });
        break;
      case 'warn':
        break;
      case 'success':
        break;
      case 'info':
      default:
        break;
    }
  }

  static getSupportedFormat(userAgent = navigator.userAgent, acceptHeader = '') {
    // Check Accept header first (most reliable)
    if (acceptHeader.includes('image/avif')) {
      return 'avif';
    } else if (acceptHeader.includes('image/webp')) {
      return 'webp';
    }
    
    // Fallback to user agent detection
    const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg');
    const isFirefox = userAgent.includes('Firefox');
    const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome');
    const isEdge = userAgent.includes('Edg');

    // AVIF support detection
    if (isChrome && this._getChromeVersion(userAgent) >= 85) return 'avif';
    if (isFirefox && this._getFirefoxVersion(userAgent) >= 93) return 'avif';
    if (isSafari && this._getSafariVersion(userAgent) >= 16) return 'avif';
    if (isEdge && this._getEdgeVersion(userAgent) >= 85) return 'avif';

    // WebP support detection
    if (isChrome && this._getChromeVersion(userAgent) >= 23) return 'webp';
    if (isFirefox && this._getFirefoxVersion(userAgent) >= 65) return 'webp';
    if (isSafari && this._getSafariVersion(userAgent) >= 14) return 'webp';
    if (isEdge && this._getEdgeVersion(userAgent) >= 18) return 'webp';

    return 'jpeg'; // Ultimate fallback
  }

  static _getChromeVersion(userAgent) {
    const match = userAgent.match(/Chrome\/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  static _getFirefoxVersion(userAgent) {
    const match = userAgent.match(/Firefox\/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  static _getSafariVersion(userAgent) {
    const match = userAgent.match(/Version\/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  static _getEdgeVersion(userAgent) {
    const match = userAgent.match(/Edg\/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Generate optimized responsive image with AVIF support
  static generateResponsiveImageHTML(src, alt, sizes = '100vw', loading = 'lazy', priority = 'normal') {
    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();
    
    // Determine fetchpriority attribute
    const fetchPriority = priority === 'high' ? 'fetchpriority="high"' : '';
    const loadingAttr = priority === 'high' ? 'loading="eager"' : `loading="${loading}"`;
    const decodingAttr = priority === 'high' ? 'decoding="sync"' : 'decoding="async"';
    
    return `
      <picture class="optimized-image">
        <!-- AVIF sources (best compression) -->
        <source 
          srcset="assets/avif-optimized/${baseName.split('/').pop()}-320w.avif 320w,
                 assets/avif-optimized/${baseName.split('/').pop()}-768w.avif 768w,
                 assets/avif-optimized/${baseName.split('/').pop()}.avif 1024w" 
          sizes="${sizes}" 
          type="image/avif">
        
        <!-- WebP fallback -->
        <source 
          srcset="assets/webp-optimized/${baseName.split('/').pop()}-320w.webp 320w,
                 assets/webp-optimized/${baseName.split('/').pop()}-768w.webp 768w,
                 assets/webp-optimized/${baseName.split('/').pop()}.webp 1024w" 
          sizes="${sizes}" 
          type="image/webp">
        
        <!-- Final fallback -->
        <img 
          src="assets/webp-optimized/${baseName.split('/').pop()}.webp" 
          alt="${alt}" 
          ${loadingAttr}
          ${decodingAttr}
          ${fetchPriority}
          class="responsive-image"
          onload="this.parentElement.parentElement.classList.add('loaded')"
          onerror="this.parentElement.parentElement.classList.add('error')">
      </picture>
    `;
  }

  // Generate critical above-the-fold images with preloading
  static generateCriticalImageHTML(src, alt, sizes = '100vw') {
    const baseName = src.replace(/\.[^/.]+$/, '');
    
    return `
      <picture class="optimized-image critical-image">
        <!-- AVIF sources -->
        <source 
          srcset="assets/avif-optimized/${baseName.split('/').pop()}-768w.avif 768w,
                 assets/avif-optimized/${baseName.split('/').pop()}.avif 1024w" 
          sizes="${sizes}" 
          type="image/avif">
        
        <!-- WebP fallback -->
        <source 
          srcset="assets/webp-optimized/${baseName.split('/').pop()}-768w.webp 768w,
                 assets/webp-optimized/${baseName.split('/').pop()}.webp 1024w" 
          sizes="${sizes}" 
          type="image/webp">
        
        <!-- Optimized fallback -->
        <img 
          src="assets/webp-optimized/${baseName.split('/').pop()}.webp" 
          alt="${alt}" 
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          class="responsive-image critical"
          onload="this.parentElement.parentElement.classList.add('loaded')">
      </picture>
    `;
  }

  static generateImageSrcSet(basePath, sizes = [320, 640, 1024, 1920]) {
    const webpSources = sizes.map(size => `${basePath}-${size}.webp ${size}w`).join(', ');
    const jpgSources = sizes.map(size => `${basePath}-${size}.jpg ${size}w`).join(', ');
    
    return {
      webp: webpSources,
      jpg: jpgSources
    };
  }

  // Enhanced lazy loading with adaptive behavior
  _initializeLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      this._log('warn', '⚠️ IntersectionObserver not supported, using fallback');
      this._loadAllImages();
      return;
    }

    // Adaptive root margin based on connection speed
    const connectionSpeed = this._getConnectionSpeed();
    const adaptiveRootMargin = connectionSpeed === 'slow' ? '25px 0px' : this.config.rootMargin;

    this.performanceMetrics.intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._loadImageWithPerformanceTracking(entry.target, observer);
          }
        });
      }, 
      {
        root: null,
        rootMargin: adaptiveRootMargin,
        threshold: this.config.threshold
      }
    );

    // Observe all optimized images
    this._observeImages();
    
    // Set up mutation observer for dynamically added images
    this._setupMutationObserver();
  }

  // Get connection speed estimation
  _getConnectionSpeed() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
        return 'slow';
      }
      if (conn.saveData) {
        return 'slow';
      }
    }
    return 'fast';
  }

  // Setup mutation observer for dynamic content
  _setupMutationObserver() {
    if (!('MutationObserver' in window)) return;
    
    const mutationObserver = new MutationObserver((mutations) => {
      let newImages = [];
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Find new optimized images
              const images = node.querySelectorAll ? 
                node.querySelectorAll('.optimized-image img:not(.critical)') : 
                [];
              newImages.push(...images);
              
              // Also check if the node itself is an image
              if (node.matches && node.matches('.optimized-image img:not(.critical)')) {
                newImages.push(node);
              }
            }
          });
        }
      });
      
      // Observe new images
      if (newImages.length > 0) {
        this._log('info', `📸 Found ${newImages.length} new images to observe`);
        newImages.forEach(img => {
          if (this.performanceMetrics.intersectionObserver) {
            this.performanceMetrics.intersectionObserver.observe(img);
          }
        });
        this.performanceMetrics.totalImages += newImages.length;
      }
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Enhanced image observation with error handling
  _observeImages() {
    try {
      const images = document.querySelectorAll('.optimized-image img:not(.critical)');
      const criticalImages = document.querySelectorAll('.critical-image img');
      
      this.performanceMetrics.totalImages = images.length + criticalImages.length;
      
      // Observe lazy-loaded images
      images.forEach(img => {
        if (this.performanceMetrics.intersectionObserver) {
          this.performanceMetrics.intersectionObserver.observe(img);
        }
      });
      
      // Handle critical images separately (immediate loading)
      criticalImages.forEach(img => {
        if (img.complete) {
          // Already loaded
          const container = img.closest('.optimized-image');
          if (container) container.classList.add('loaded');
        } else {
          // Add error handling for critical images
          img.addEventListener('error', () => {
            this._handleCriticalImageError(img);
          }, { once: true });
        }
      });

      this._log('info', `📸 Observing ${images.length} lazy images + ${criticalImages.length} critical images`);
      
    } catch (error) {
      this._log('error', 'Failed to observe images', error);
    }
  }

  // Handle critical image errors
  _handleCriticalImageError(img) {
    const fallbackSrc = this._getFallbackImageSrc(img.src);
    if (fallbackSrc && fallbackSrc !== img.src) {
      this._log('warn', '🔄 Using fallback for critical image', img.src);
      img.src = fallbackSrc;
    } else {
      this._log('error', '❌ Critical image failed to load', img.src);
      const container = img.closest('.optimized-image');
      if (container) container.classList.add('error');
    }
  }

  // Enhanced image loading with retry logic and error recovery
  _loadImageWithPerformanceTracking(img, observer) {
    const startTime = performance.now();
    const container = img.closest('.optimized-image');
    const imgSrc = img.src;
    
    // Check if image is already in loading queue
    if (this.performanceMetrics.loadingQueue.has(imgSrc)) {
      return;
    }
    
    // Add to loading queue with concurrent load limiting
    if (this.performanceMetrics.loadingQueue.size >= this.config.maxConcurrentLoads) {
      // Queue for later loading
      setTimeout(() => this._loadImageWithPerformanceTracking(img, observer), 100);
      return;
    }
    
    this.performanceMetrics.loadingQueue.set(imgSrc, { startTime, retries: 0 });
    container.classList.add('loading');
    
    const cleanup = () => {
      this.performanceMetrics.loadingQueue.delete(imgSrc);
      img.style.willChange = 'auto';
    };
    
    const onLoad = () => {
      const loadTime = performance.now() - startTime;
      this.performanceMetrics.loadedCount++;
      this.performanceMetrics.totalLoadTime += loadTime;
      this.performanceMetrics.averageLoadTime = 
        this.performanceMetrics.totalLoadTime / this.performanceMetrics.loadedCount;
      
      // Track format statistics
      const format = this._detectImageFormat(imgSrc);
      this.performanceMetrics.formatStats[format] = (this.performanceMetrics.formatStats[format] || 0) + 1;
      this.performanceMetrics.loadTimeByFormat[format] = this.performanceMetrics.loadTimeByFormat[format] || [];
      this.performanceMetrics.loadTimeByFormat[format].push(loadTime);
      
      container.classList.remove('loading');
      container.classList.add('loaded');
      
      // Remove will-change after animation completes
      setTimeout(cleanup, 600);
      
      // Dispatch enhanced event with more details
      document.dispatchEvent(new CustomEvent('imageOptimized', {
        detail: { 
          loadTime: Math.round(loadTime),
          src: imgSrc,
          format,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          fileSize: this._estimateFileSize(img),
          retries: this.performanceMetrics.loadingQueue.get(imgSrc)?.retries || 0
        }
      }));
      
      // Remove from error tracking if it was there
      this.errorTracker.failedImages.delete(imgSrc);
      this.errorTracker.retryQueue.delete(imgSrc);
      
      observer.unobserve(img);
    };

    const onError = () => {
      const loadingInfo = this.performanceMetrics.loadingQueue.get(imgSrc);
      const retries = loadingInfo ? loadingInfo.retries : 0;
      
      if (retries < this.config.retryAttempts) {
        // Retry with exponential backoff
        this.performanceMetrics.retryCount++;
        this.performanceMetrics.loadingQueue.set(imgSrc, { ...loadingInfo, retries: retries + 1 });
        
        const retryDelay = this.config.retryDelay * Math.pow(2, retries);
        this._log('warn', `🔄 Retrying image load (${retries + 1}/${this.config.retryAttempts})`, imgSrc);
        
        setTimeout(() => {
          // Try fallback formats
          const fallbackSrc = this._getFallbackImageSrc(imgSrc);
          if (fallbackSrc && fallbackSrc !== imgSrc) {
            img.src = fallbackSrc;
          } else {
            // Force reload
            img.src = imgSrc + '?retry=' + (retries + 1);
          }
        }, retryDelay);
        
        return;
      }
      
      // Final failure after all retries
      this.performanceMetrics.errorCount++;
      this.errorTracker.failedImages.add(imgSrc);
      
      container.classList.remove('loading');
      container.classList.add('error');
      
      // Enhanced error logging
      this._log('error', '❌ Image failed to load after all retries', {
        src: imgSrc,
        retries,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });
      
      // Dispatch error event
      document.dispatchEvent(new CustomEvent('imageLoadError', {
        detail: {
          src: imgSrc,
          retries,
          error: 'Load failed after retries'
        }
      }));
      
      cleanup();
      observer.unobserve(img);
    };

    img.addEventListener('load', onLoad, { once: true });
    img.addEventListener('error', onError, { once: true });
    
    // Set loading timeout
    setTimeout(() => {
      if (this.performanceMetrics.loadingQueue.has(imgSrc)) {
        this._log('warn', '⏱️ Image loading timeout', imgSrc);
        onError();
      }
    }, this.config.fallbackTimeout);
    
    // Enable hardware acceleration during loading
    img.style.willChange = 'transform, opacity';
  }

  // Detect image format from URL
  _detectImageFormat(src) {
    if (src.includes('.avif')) return 'avif';
    if (src.includes('.webp')) return 'webp';
    if (src.includes('.jpg') || src.includes('.jpeg')) return 'jpeg';
    if (src.includes('.png')) return 'png';
    return 'unknown';
  }

  // Get fallback image source
  _getFallbackImageSrc(src) {
    if (src.includes('/avif-optimized/')) {
      return src.replace('/avif-optimized/', '/webp-optimized/').replace('.avif', '.webp');
    } else if (src.includes('/webp-optimized/')) {
      return src.replace('/webp-optimized/', '/images/').replace('.webp', '.jpg');
    }
    return null;
  }

  // Estimate file size for analytics
  _estimateFileSize(img) {
    // Rough estimation based on dimensions and format
    const pixels = img.naturalWidth * img.naturalHeight;
    const format = this._detectImageFormat(img.src);
    
    const compressionRatios = {
      avif: 0.3,
      webp: 0.5,
      jpeg: 0.7,
      png: 1.2
    };
    
    return Math.round(pixels * (compressionRatios[format] || 0.7) * 3); // 3 bytes per pixel base
  }

  // Enhanced fallback for browsers without IntersectionObserver
  _loadAllImages() {
    try {
      const images = document.querySelectorAll('.optimized-image img');
      this.performanceMetrics.totalImages = images.length;
      
      this._log('info', `🔄 Loading ${images.length} images immediately (fallback mode)`);
      
      images.forEach((img, index) => {
        const container = img.closest('.optimized-image');
        
        // Add error handling even in fallback mode
        img.addEventListener('error', () => {
          this.performanceMetrics.errorCount++;
          const fallbackSrc = this._getFallbackImageSrc(img.src);
          if (fallbackSrc && fallbackSrc !== img.src) {
            img.src = fallbackSrc;
          } else {
            container.classList.add('error');
          }
        }, { once: true });
        
        img.addEventListener('load', () => {
          this.performanceMetrics.loadedCount++;
          container.classList.add('loaded');
        }, { once: true });
        
        // Stagger loading to prevent overwhelming the browser
        setTimeout(() => {
          if (img.complete) {
            container.classList.add('loaded');
            this.performanceMetrics.loadedCount++;
          }
        }, index * 50); // 50ms delay between images
      });
      
    } catch (error) {
      this._log('error', 'Error in fallback image loading', error);
    }
  }

  // Enhanced critical image preloading with caching and priority management
  async _preloadCriticalImages() {
    try {
      const criticalImages = document.querySelectorAll('.critical-image source, .critical-image img');
      let preloadCount = 0;
      const preloadPromises = [];
      
      // Create preload cache if not exists
      if (!window.imagePreloadCache) {
        window.imagePreloadCache = new Map();
      }
      
      const preloadWithCache = (href, type, priority = 'high') => {
        // Check cache first
        if (window.imagePreloadCache.has(href)) {
          this._log('info', `📦 Using cached preload for ${href}`);
          return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = href;
          link.fetchPriority = priority;
          
          if (type) {
            link.type = type;
          }
          
          link.onload = () => {
            // Cache the successful preload
            window.imagePreloadCache.set(href, {
              timestamp: Date.now(),
              type,
              priority
            });
            preloadCount++;
            this._log('info', `⚡ Preloaded: ${href}`);
            resolve();
          };
          
          link.onerror = () => {
            this._log('warn', `❌ Failed to preload: ${href}`);
            reject(new Error(`Failed to preload ${href}`));
          };
          
          document.head.appendChild(link);
          
          // Cleanup timeout
          setTimeout(() => {
            if (link.parentNode) {
              reject(new Error(`Preload timeout for ${href}`));
            }
          }, 5000);
        });
      };
      
      // Process critical images with intelligent prioritization
      for (const element of criticalImages) {
        if (element.tagName === 'SOURCE' && element.srcset) {
          const srcset = element.srcset.split(',');
          // Preload optimal size for current viewport
          const optimalSrc = this._selectOptimalSource(srcset);
          preloadPromises.push(preloadWithCache(optimalSrc, element.type, 'high'));
          
        } else if (element.tagName === 'IMG' && element.src) {
          preloadPromises.push(preloadWithCache(element.src, null, 'high'));
        }
      }
      
      // Wait for all preloads with timeout
      try {
        await Promise.allSettled(preloadPromises);
        this._log('success', `⚡ Successfully preloaded ${preloadCount} critical images`);
      } catch (error) {
        this._log('warn', 'Some critical images failed to preload', error);
      }
      
      // Clean up old cache entries (older than 1 hour)
      this._cleanupPreloadCache();
      
    } catch (error) {
      this._log('error', 'Critical image preloading failed', error);
    }
  }
  
  // Select optimal source from srcset based on viewport
  _selectOptimalSource(srcset) {
    const viewport = window.innerWidth;
    const sources = srcset.map(src => {
      const [url, width] = src.trim().split(' ');
      return {
        url,
        width: parseInt(width) || 0
      };
    }).sort((a, b) => a.width - b.width);
    
    // Find best match for current viewport
    for (let i = 0; i < sources.length; i++) {
      if (sources[i].width >= viewport || i === sources.length - 1) {
        return sources[i].url;
      }
    }
    
    return sources[0]?.url || srcset.split(' ')[0];
  }
  
  // Clean up old preload cache entries
  _cleanupPreloadCache() {
    if (!window.imagePreloadCache) return;
    
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    let cleanedCount = 0;
    
    for (const [key, value] of window.imagePreloadCache.entries()) {
      if (value.timestamp < oneHourAgo) {
        window.imagePreloadCache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      this._log('info', `🧹 Cleaned ${cleanedCount} old preload cache entries`);
    }
  }

  // Enhanced performance monitoring with memory management
  _setupPerformanceMonitoring() {
    // Monitor when all images are loaded
    const checkAllImagesLoaded = () => {
      if (this.performanceMetrics.loadedCount + this.performanceMetrics.errorCount >= 
          this.performanceMetrics.totalImages) {
        
        const metrics = this.getPerformanceMetrics();
        const health = this.getSystemHealth();
        
        this._log('success', '🎯 All images optimization complete', {
          ...metrics,
          health: health.status
        });

        // Dispatch comprehensive completion event
        document.dispatchEvent(new CustomEvent('allImagesLoaded', {
          detail: { 
            metrics,
            health,
            timestamp: Date.now()
          }
        }));
        
        // Trigger memory cleanup after all images loaded
        this._scheduleMemoryCleanup();
      }
    };

    // Monitor image optimization events
    document.addEventListener('imageOptimized', checkAllImagesLoaded);
    
    // Monitor memory usage if available
    if ('memory' in performance) {
      this._startMemoryMonitoring();
    }
    
    // Monitor page visibility for performance optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this._pauseNonCriticalOperations();
      } else {
        this._resumeOperations();
      }
    });
    
    // Monitor connection changes
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', () => {
        this._adaptToConnectionChange();
      });
    }
  }
  
  // Memory monitoring for performance optimization
  _startMemoryMonitoring() {
    const monitorMemory = () => {
      if (performance.memory) {
        const memInfo = {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        };
        
        // Trigger cleanup if memory usage is high
        if (memInfo.used / memInfo.limit > 0.8) {
          this._log('warn', '⚠️ High memory usage detected, triggering cleanup', memInfo);
          this._performMemoryCleanup();
        }
        
        this._log('info', '💾 Memory usage', memInfo);
      }
    };
    
    // Monitor memory every 30 seconds
    setInterval(monitorMemory, 30000);
  }
  
  // Schedule memory cleanup after image loading
  _scheduleMemoryCleanup() {
    setTimeout(() => {
      this._performMemoryCleanup();
    }, 5000); // Wait 5 seconds after completion
  }
  
  // Perform memory cleanup
  _performMemoryCleanup() {
    try {
      // Clear completed loading queue entries
      this.performanceMetrics.loadingQueue.clear();
      
      // Limit error history to last 50 entries
      if (this.errorTracker.errorReasons.size > 50) {
        const entries = Array.from(this.errorTracker.errorReasons.entries())
          .sort((a, b) => b[0] - a[0])
          .slice(0, 50);
        this.errorTracker.errorReasons.clear();
        entries.forEach(([key, value]) => {
          this.errorTracker.errorReasons.set(key, value);
        });
      }
      
      // Clean up old load time data (keep last 100 entries per format)
      Object.keys(this.performanceMetrics.loadTimeByFormat).forEach(format => {
        const times = this.performanceMetrics.loadTimeByFormat[format];
        if (times.length > 100) {
          this.performanceMetrics.loadTimeByFormat[format] = times.slice(-100);
        }
      });
      
      // Clean up preload cache
      this._cleanupPreloadCache();
      
      // Force garbage collection if available (dev tools)
      if (window.gc && typeof window.gc === 'function') {
        window.gc();
      }
      
      this._log('info', '🧹 Memory cleanup completed');
      
    } catch (error) {
      this._log('error', 'Memory cleanup failed', error);
    }
  }
  
  // Pause non-critical operations when page is hidden
  _pauseNonCriticalOperations() {
    // Disconnect observer to save resources when page is hidden
    if (this.performanceMetrics.intersectionObserver) {
      this.performanceMetrics.intersectionObserver.disconnect();
      this._log('info', '⏸️ Paused image loading (page hidden)');
    }
  }
  
  // Resume operations when page becomes visible
  _resumeOperations() {
    // Reconnect observer when page becomes visible
    if (!this.performanceMetrics.intersectionObserver) {
      this._initializeLazyLoading();
      this._log('info', '▶️ Resumed image loading (page visible)');
    }
  }
  
  // Adapt behavior based on connection changes
  _adaptToConnectionChange() {
    const connection = navigator.connection;
    const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                            connection.effectiveType === '2g' || 
                            connection.saveData;
    
    if (isSlowConnection) {
      // Reduce concurrent loads for slow connections
      this.config.maxConcurrentLoads = Math.min(3, this.config.maxConcurrentLoads);
      this.config.rootMargin = '25px 0px'; // Load images closer to viewport
      this._log('info', '🐌 Adapted to slow connection');
    } else {
      // Restore normal behavior for fast connections
      this.config.maxConcurrentLoads = 6;
      this.config.rootMargin = '50px 0px';
      this._log('info', '🚀 Adapted to fast connection');
    }
  }

  // Enhanced performance metrics with detailed analytics
  getPerformanceMetrics() {
    const metrics = {
      ...this.performanceMetrics,
      totalLoadTime: Math.round(this.performanceMetrics.totalLoadTime),
      averageLoadTime: Math.round(this.performanceMetrics.averageLoadTime),
      successRate: this.performanceMetrics.totalImages > 0 ? 
        ((this.performanceMetrics.loadedCount / this.performanceMetrics.totalImages) * 100).toFixed(2) : 0,
      currentlyLoading: this.performanceMetrics.loadingQueue.size,
      formatDistribution: this._calculateFormatDistribution(),
      averageLoadTimeByFormat: this._calculateAverageLoadTimesByFormat(),
      errors: {
        total: this.performanceMetrics.errorCount,
        unique: this.errorTracker.failedImages.size,
        retries: this.performanceMetrics.retryCount
      },
      performance: {
        fastestLoad: this._getFastestLoadTime(),
        slowestLoad: this._getSlowestLoadTime(),
        medianLoadTime: this._getMedianLoadTime()
      }
    };

    // Remove internal objects from public metrics
    delete metrics.intersectionObserver;
    delete metrics.loadingQueue;
    delete metrics.loadTimeByFormat;
    
    return metrics;
  }

  // Calculate format distribution
  _calculateFormatDistribution() {
    const total = Object.values(this.performanceMetrics.formatStats).reduce((a, b) => a + b, 0);
    if (total === 0) return {};
    
    const distribution = {};
    Object.entries(this.performanceMetrics.formatStats).forEach(([format, count]) => {
      distribution[format] = {
        count,
        percentage: ((count / total) * 100).toFixed(1)
      };
    });
    return distribution;
  }

  // Calculate average load times by format
  _calculateAverageLoadTimesByFormat() {
    const averages = {};
    Object.entries(this.performanceMetrics.loadTimeByFormat).forEach(([format, times]) => {
      if (times.length > 0) {
        averages[format] = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
      }
    });
    return averages;
  }

  // Get fastest load time
  _getFastestLoadTime() {
    const allTimes = Object.values(this.performanceMetrics.loadTimeByFormat).flat();
    return allTimes.length > 0 ? Math.round(Math.min(...allTimes)) : 0;
  }

  // Get slowest load time
  _getSlowestLoadTime() {
    const allTimes = Object.values(this.performanceMetrics.loadTimeByFormat).flat();
    return allTimes.length > 0 ? Math.round(Math.max(...allTimes)) : 0;
  }

  // Get median load time
  _getMedianLoadTime() {
    const allTimes = Object.values(this.performanceMetrics.loadTimeByFormat).flat().sort((a, b) => a - b);
    if (allTimes.length === 0) return 0;
    
    const mid = Math.floor(allTimes.length / 2);
    return allTimes.length % 2 === 0 ? 
      Math.round((allTimes[mid - 1] + allTimes[mid]) / 2) : 
      Math.round(allTimes[mid]);
  }

  // System health check
  getSystemHealth() {
    const metrics = this.getPerformanceMetrics();
    const health = {
      status: 'healthy',
      issues: [],
      recommendations: []
    };

    // Check error rate
    if (metrics.successRate < 90) {
      health.status = 'degraded';
      health.issues.push(`Low success rate: ${metrics.successRate}%`);
      health.recommendations.push('Check network connectivity and image server health');
    }

    // Check average load time
    if (metrics.averageLoadTime > 2000) {
      health.status = 'degraded';
      health.issues.push(`Slow average load time: ${metrics.averageLoadTime}ms`);
      health.recommendations.push('Consider optimizing image sizes or using a CDN');
    }

    // Check retry rate
    const retryRate = metrics.totalImages > 0 ? (metrics.errors.retries / metrics.totalImages) * 100 : 0;
    if (retryRate > 10) {
      health.status = 'degraded';
      health.issues.push(`High retry rate: ${retryRate.toFixed(1)}%`);
      health.recommendations.push('Investigate image server reliability');
    }

    return health;
  }

  // Clean up system resources
  destroy() {
    try {
      if (this.performanceMetrics.intersectionObserver) {
        this.performanceMetrics.intersectionObserver.disconnect();
        this.performanceMetrics.intersectionObserver = null;
      }

      // Clear loading queue
      this.performanceMetrics.loadingQueue.clear();
      
      // Clear error tracking
      this.errorTracker.failedImages.clear();
      this.errorTracker.retryQueue.clear();
      this.errorTracker.errorReasons.clear();
      
      // Remove event listeners if any
      document.documentElement.classList.remove('image-optimization-ready', 'image-optimization-fallback');
      
      this._log('info', '🧹 Image Optimization System destroyed');
      
    } catch (error) {
      this._log('error', 'Error during system cleanup', error);
    }
  }

  // Legacy lazy loading script for compatibility
  static createLazyLoadingScript() {
    return `
      // Legacy lazy loading implementation
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.srcset = img.dataset.srcset;
              img.classList.remove('lazy');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
          img.srcset = img.dataset.srcset;
        });
      }
    `;
  }

  static optimizeImageForCloudflare(request, imagePath) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const acceptHeader = request.headers.get('Accept') || '';
    
    // Determine optimal format
    let format = 'jpeg';
    if (acceptHeader.includes('image/webp')) {
      format = 'webp';
    } else if (acceptHeader.includes('image/avif')) {
      format = 'avif';
    }
    
    // Determine optimal quality based on connection
    const connection = request.headers.get('Save-Data') ? 'slow' : 'fast';
    const quality = connection === 'slow' ? 60 : 80;
    
    // Determine optimal width based on viewport
    const viewportWidth = url.searchParams.get('w') || '800';
    const width = Math.min(parseInt(viewportWidth), 1920);
    
    return {
      format,
      quality,
      width,
      fit: 'scale-down'
    };
  }

  static createBlurPlaceholder(width = 40, height = 30) {
    // Create a simple blur placeholder SVG
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  // Generate optimized gallery with AVIF support
  static generateOptimizedGalleryHTML(images) {
    return images.map((image, index) => `
      <div class="gallery-item" data-category="${image.category || 'general'}">
        <picture class="optimized-image">
          <!-- AVIF sources (best compression) -->
          <source 
            srcset="assets/avif-optimized/${image.slug}-320w.avif 320w,
                   assets/avif-optimized/${image.slug}-768w.avif 768w,
                   assets/avif-optimized/${image.slug}.avif 1024w" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            type="image/avif">
          
          <!-- WebP fallback -->
          <source 
            srcset="assets/webp-optimized/${image.slug}-320w.webp 320w,
                   assets/webp-optimized/${image.slug}-768w.webp 768w,
                   assets/webp-optimized/${image.slug}.webp 1024w" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            type="image/webp">
          
          <!-- Final fallback -->
          <img 
            src="${this.createBlurPlaceholder()}"
            alt="${image.alt}"
            class="gallery-image"
            loading="lazy"
            decoding="async"
            onload="this.parentElement.parentElement.classList.add('loaded')"
            onerror="this.parentElement.parentElement.classList.add('error')">
        </picture>
        
        <div class="gallery-overlay glass-effect-light">
          <h3>${image.title}</h3>
          <p>${image.description}</p>
          <div class="gallery-meta">
            <span class="category">${image.category || 'عام'}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Before/After slider with AVIF optimization
  static generateBeforeAfterHTML(beforeImage, afterImage, alt) {
    const beforeBaseName = beforeImage.replace(/\.[^/.]+$/, '').split('/').pop();
    const afterBaseName = afterImage.replace(/\.[^/.]+$/, '').split('/').pop();
    
    return `
      <div class="before-after-container">
        <!-- After Image -->
        <picture class="optimized-image after-img">
          <source 
            srcset="assets/avif-optimized/${afterBaseName}-320w.avif 320w,
                   assets/avif-optimized/${afterBaseName}-768w.avif 768w,
                   assets/avif-optimized/${afterBaseName}.avif 1024w" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            type="image/avif">
          <source 
            srcset="assets/webp-optimized/${afterBaseName}-320w.webp 320w,
                   assets/webp-optimized/${afterBaseName}-768w.webp 768w,
                   assets/webp-optimized/${afterBaseName}.webp 1024w" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            type="image/webp">
          <img 
            src="assets/webp-optimized/${afterBaseName}.webp" 
            alt="${alt} - بعد العلاج" 
            loading="lazy" 
            decoding="async"
            class="after-image">
        </picture>
        
        <!-- Before Image -->
        <div class="before-img">
          <picture class="optimized-image">
            <source 
              srcset="assets/avif-optimized/${beforeBaseName}-320w.avif 320w,
                     assets/avif-optimized/${beforeBaseName}-768w.avif 768w,
                     assets/avif-optimized/${beforeBaseName}.avif 1024w" 
              sizes="(max-width: 768px) 100vw, 50vw" 
              type="image/avif">
            <source 
              srcset="assets/webp-optimized/${beforeBaseName}-320w.webp 320w,
                     assets/webp-optimized/${beforeBaseName}-768w.webp 768w,
                     assets/webp-optimized/${beforeBaseName}.webp 1024w" 
              sizes="(max-width: 768px) 100vw, 50vw" 
              type="image/webp">
            <img 
              src="assets/webp-optimized/${beforeBaseName}.webp" 
              alt="${alt} - قبل العلاج" 
              loading="lazy" 
              decoding="async"
              class="before-image">
          </picture>
        </div>
        
        <div class="before-after-slider glass-effect-medium" role="slider" aria-label="مقارنة قبل وبعد العلاج">
          <div class="slider-handle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  // Generate AVIF-enhanced showcase image
  static generateShowcaseImageHTML(src, alt, priority = 'high') {
    const baseName = src.replace(/\.[^/.]+$/, '').split('/').pop();
    
    return `
      <picture class="optimized-image critical-image showcase-image">
        <!-- AVIF sources (best quality) -->
        <source 
          srcset="assets/avif-optimized/${baseName}-768w.avif 768w,
                 assets/avif-optimized/${baseName}.avif 1024w" 
          sizes="(max-width: 768px) 90vw, 60vw" 
          type="image/avif">
        
        <!-- WebP fallback -->
        <source 
          srcset="assets/webp-optimized/${baseName}-768w.webp 768w,
                 assets/webp-optimized/${baseName}.webp 1024w" 
          sizes="(max-width: 768px) 90vw, 60vw" 
          type="image/webp">
        
        <!-- High-priority image -->
        <img 
          src="assets/webp-optimized/${baseName}.webp" 
          alt="${alt}" 
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          class="responsive-image showcase"
          onload="this.parentElement.parentElement.classList.add('loaded')">
      </picture>
    `;
  }

  // Add method to handle image error states gracefully
  static handleImageError(img) {
    const container = img.closest('.optimized-image');
    const sources = container.querySelectorAll('source');
    
    // Try fallback formats
    if (img.src.includes('.avif')) {
      // Fallback to WebP
      img.src = img.src.replace('/avif-optimized/', '/webp-optimized/').replace('.avif', '.webp');
    } else if (img.src.includes('.webp')) {
      // Fallback to original
      img.src = img.src.replace('/webp-optimized/', '/images/').replace('.webp', '.jpg');
    } else {
      // Show error placeholder
      container.classList.add('error');
      img.alt = 'عذراً، لا يمكن تحميل الصورة';
    }
  }
}