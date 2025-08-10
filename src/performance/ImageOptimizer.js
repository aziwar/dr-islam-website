// IMAGE OPTIMIZER - WebP/AVIF conversion and responsive image pipeline
// Comprehensive image optimization system for dental practice website

export class ImageOptimizer {
  
  constructor(options = {}) {
    this.config = {
      formats: ['webp', 'avif', 'jpeg'],
      sizes: [320, 480, 768, 1024, 1200, 1920],
      quality: {
        jpeg: 85,
        webp: 80,
        avif: 75
      },
      outputDir: '/optimized-images',
      lazyLoading: true,
      ...options
    };
    
    this.cache = new Map();
    this.processingQueue = new Set();
  }

  /**
   * Generate responsive image HTML with modern formats
   * @param {Object} props - Image properties
   * @param {string} props.src - Source image path
   * @param {string} props.alt - Alt text
   * @param {Array} props.sizes - Responsive sizes
   * @param {boolean} props.lazy - Lazy loading
   * @param {string} props.className - CSS classes
   * @returns {string} Responsive image HTML
   */
  generateResponsiveImage(props) {
    const {
      src,
      alt = '',
      sizes = this.config.sizes,
      lazy = this.config.lazyLoading,
      className = '',
      aspectRatio = null,
      priority = false
    } = props;

    const baseName = this.getBaseName(src);
    const extension = this.getExtension(src);
    
    // Generate source sets for each format
    const sources = this.config.formats.map(format => {
      const srcset = sizes.map(size => 
        `${this.config.outputDir}/${baseName}-${size}w.${format} ${size}w`
      ).join(', ');
      
      return `<source srcset="${srcset}" type="image/${format}" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">`;
    }).join('');
    
    // Fallback image
    const fallbackSrc = `${this.config.outputDir}/${baseName}-768w.${extension}`;
    
    // Build picture element
    return `
      <picture class="responsive-image ${className}" ${aspectRatio ? `style="aspect-ratio: ${aspectRatio}"` : ''}>
        ${sources}
        <img 
          src="${priority ? fallbackSrc : this.getPlaceholder()}"
          ${!priority && lazy ? `data-src="${fallbackSrc}"` : ''}
          alt="${alt}"
          ${lazy && !priority ? 'loading="lazy"' : ''}
          ${priority ? 'fetchpriority="high"' : ''}
          class="responsive-image__img ${lazy ? 'lazy' : ''}"
          onload="this.classList.add('loaded')"
          onerror="this.classList.add('error')"
        >
      </picture>
    `;
  }

  /**
   * Generate optimized gallery image with before/after support
   * @param {Object} props - Gallery image properties
   */
  generateGalleryImage(props) {
    const {
      beforeImage,
      afterImage,
      title,
      category,
      index
    } = props;

    return `
      <div class="gallery-item optimized" data-index="${index}">
        <div class="gallery-images">
          ${this.generateResponsiveImage({
            src: beforeImage,
            alt: `${title} - Before treatment`,
            className: 'gallery-image gallery-image--before',
            aspectRatio: '4/3',
            lazy: true
          })}
          
          ${this.generateResponsiveImage({
            src: afterImage,
            alt: `${title} - After treatment`, 
            className: 'gallery-image gallery-image--after',
            aspectRatio: '4/3',
            lazy: true
          })}
          
          <div class="gallery-overlay">
            <div class="gallery-labels">
              <span class="label label--before">Before</span>
              <span class="label label--after">After</span>
            </div>
          </div>
        </div>
        
        <div class="gallery-info">
          <h3 class="gallery-title">${title}</h3>
          <span class="gallery-category">${category}</span>
        </div>
      </div>
    `;
  }

  /**
   * Get optimized hero image with critical loading
   * @param {Object} props - Hero image properties
   */
  generateHeroImage(props) {
    const {
      src,
      alt = 'Dr. Islam Dental Practice',
      mobileBreakpoint = 768
    } = props;

    const baseName = this.getBaseName(src);
    
    return `
      <div class="hero-image-container">
        <picture class="hero-image">
          <!-- Mobile optimized -->
          <source 
            srcset="${this.config.outputDir}/${baseName}-480w.webp 480w,
                    ${this.config.outputDir}/${baseName}-768w.webp 768w"
            type="image/webp"
            media="(max-width: ${mobileBreakpoint}px)">
            
          <!-- Desktop optimized -->  
          <source 
            srcset="${this.config.outputDir}/${baseName}-1024w.webp 1024w,
                    ${this.config.outputDir}/${baseName}-1920w.webp 1920w"
            type="image/webp"
            media="(min-width: ${mobileBreakpoint + 1}px)">
            
          <!-- Fallback -->
          <img 
            src="${this.config.outputDir}/${baseName}-1024w.jpeg"
            alt="${alt}"
            class="hero-image__img"
            fetchpriority="high"
            onload="this.classList.add('loaded')">
        </picture>
      </div>
    `;
  }

  /**
   * Generate CSS for optimized images
   * @returns {string} CSS styles
   */
  generateImageCSS() {
    return `
      /* Responsive Image System */
      .responsive-image {
        display: block;
        width: 100%;
        position: relative;
        overflow: hidden;
      }
      
      .responsive-image__img {
        width: 100%;
        height: auto;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
      
      .responsive-image__img.loaded {
        opacity: 1;
        animation: none;
      }
      
      .responsive-image__img.error {
        opacity: 1;
        background: #f8f9fa;
        color: #6c757d;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }
      
      .responsive-image__img.error::after {
        content: 'Image unavailable';
        font-size: 14px;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      /* Gallery Images */
      .gallery-item.optimized {
        will-change: transform, opacity;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      .gallery-images {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        aspect-ratio: 4/3;
      }
      
      .gallery-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.3s ease;
      }
      
      .gallery-image--after {
        opacity: 0;
      }
      
      .gallery-item:hover .gallery-image--after {
        opacity: 1;
      }
      
      .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        pointer-events: none;
      }
      
      .gallery-labels {
        display: flex;
        justify-content: space-between;
      }
      
      .label {
        background: rgba(255,255,255,0.9);
        color: #333;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
      }
      
      /* Hero Images */
      .hero-image-container {
        position: relative;
        width: 100%;
        height: 60vh;
        min-height: 400px;
        overflow: hidden;
      }
      
      .hero-image__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      
      /* Performance optimizations */
      @media (prefers-reduced-motion: reduce) {
        .responsive-image__img,
        .gallery-image {
          transition: none !important;
        }
        
        .responsive-image__img {
          animation: none !important;
        }
      }
      
      /* High contrast mode */
      @media (prefers-contrast: high) {
        .label {
          background: #fff;
          color: #000;
          border: 2px solid #000;
        }
      }
    `;
  }

  /**
   * Initialize lazy loading with Intersection Observer
   * @returns {string} JavaScript for lazy loading
   */
  generateLazyLoadingJS() {
    return `
      class LazyImageLoader {
        constructor() {
          this.imageObserver = null;
          this.init();
        }
        
        init() {
          if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  this.loadImage(entry.target);
                  observer.unobserve(entry.target);
                }
              });
            }, {
              rootMargin: '50px 0px',
              threshold: 0.1
            });
            
            this.observeImages();
          } else {
            // Fallback for older browsers
            this.loadAllImages();
          }
        }
        
        observeImages() {
          const lazyImages = document.querySelectorAll('img[data-src]');
          lazyImages.forEach(img => this.imageObserver.observe(img));
        }
        
        loadImage(img) {
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            
            // Handle srcset for responsive images
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            img.classList.remove('lazy');
            
            // Preload next images in viewport
            this.preloadNextImages(img);
          }
        }
        
        loadAllImages() {
          const lazyImages = document.querySelectorAll('img[data-src]');
          lazyImages.forEach(img => this.loadImage(img));
        }
        
        preloadNextImages(currentImg) {
          const nextImages = this.getNextImages(currentImg, 2);
          nextImages.forEach(img => {
            if (img.dataset.src) {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.as = 'image';
              preloadLink.href = img.dataset.src;
              document.head.appendChild(preloadLink);
            }
          });
        }
        
        getNextImages(currentImg, count) {
          const allLazyImages = [...document.querySelectorAll('img[data-src]')];
          const currentIndex = allLazyImages.indexOf(currentImg);
          return allLazyImages.slice(currentIndex + 1, currentIndex + 1 + count);
        }
      }
      
      // Initialize when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new LazyImageLoader());
      } else {
        new LazyImageLoader();
      }
      
      // Critical image preloading
      function preloadCriticalImages() {
        const criticalImages = [
          '/optimized-images/hero-1920w.webp',
          '/optimized-images/logo-80w.webp',
          '/optimized-images/about-doctor-768w.webp'
        ];
        
        criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });
      }
      
      // Preload critical images immediately
      preloadCriticalImages();
    `;
  }

  /**
   * Utility methods
   */
  getBaseName(filepath) {
    return filepath.split('/').pop().split('.')[0];
  }
  
  getExtension(filepath) {
    return filepath.split('.').pop().toLowerCase();
  }
  
  getPlaceholder() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==';
  }

  /**
   * Generate build script for image optimization
   * @returns {string} Node.js script for image processing
   */
  generateBuildScript() {
    return `
      // build-images.js - Image optimization build script
      const sharp = require('sharp');
      const fs = require('fs').promises;
      const path = require('path');
      const glob = require('glob');
      
      class ImageProcessor {
        constructor() {
          this.inputDir = './src/assets/images';
          this.outputDir = './dist/optimized-images';
          this.formats = ['webp', 'avif', 'jpeg'];
          this.sizes = [320, 480, 768, 1024, 1200, 1920];
          this.quality = { jpeg: 85, webp: 80, avif: 75 };
        }
        
        async processAllImages() {
          
          // Ensure output directory exists
          await fs.mkdir(this.outputDir, { recursive: true });
          
          // Find all images
          const imageFiles = glob.sync(\`\${this.inputDir}/**/*.{jpg,jpeg,png,webp}\`);
          
          let processed = 0;
          const startTime = Date.now();
          
          for (const imagePath of imageFiles) {
            await this.processImage(imagePath);
            processed++;
            
            if (processed % 5 === 0) {
              const elapsed = (Date.now() - startTime) / 1000;
            }
          }
          
          const totalTime = (Date.now() - startTime) / 1000;
          console.log(\`✅ Processed \${processed} images in \${totalTime.toFixed(1)}s\`);
        }
        
        async processImage(imagePath) {
          const baseName = path.basename(imagePath, path.extname(imagePath));
          const sharpImage = sharp(imagePath);
          const metadata = await sharpImage.metadata();
          
          // Process each size
          for (const size of this.sizes) {
            // Skip if original is smaller
            if (metadata.width < size) continue;
            
            // Process each format
            for (const format of this.formats) {
              const outputPath = path.join(this.outputDir, \`\${baseName}-\${size}w.\${format}\`);
              
              await sharpImage
                .resize(size, null, { 
                  withoutEnlargement: true,
                  fastShrinkOnLoad: false 
                })
                .toFormat(format, { 
                  quality: this.quality[format],
                  progressive: format === 'jpeg',
                  optimizeScans: format === 'jpeg'
                })
                .toFile(outputPath);
            }
          }
        }
      }
      
      // Run if called directly
      if (require.main === module) {
        const processor = new ImageProcessor();
        processor.processAllImages().catch(console.error);
      }
      
      module.exports = ImageProcessor;
    `;
  }
}

export default ImageOptimizer;