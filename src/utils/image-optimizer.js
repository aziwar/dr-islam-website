// Image optimization utilities for performance
export class ImageOptimizer {
  static getSupportedFormat(userAgent) {
    if (userAgent.includes('Chrome')) {
      return 'webp';
    } else if (userAgent.includes('Firefox')) {
      return 'webp'; // Firefox supports WebP since v65
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      return 'webp'; // Safari supports WebP since v14
    }
    return 'jpg'; // Fallback
  }

  static generateResponsiveImageHTML(src, alt, sizes = '100vw', loading = 'lazy') {
    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();
    
    return `
      <picture>
        <source 
          srcset="${baseName}-320.webp 320w, ${baseName}-640.webp 640w, ${baseName}-1024.webp 1024w" 
          sizes="${sizes}" 
          type="image/webp">
        <source 
          srcset="${baseName}-320.${extension} 320w, ${baseName}-640.${extension} 640w, ${baseName}-1024.${extension} 1024w" 
          sizes="${sizes}">
        <img 
          src="${baseName}-640.${extension}" 
          alt="${alt}" 
          loading="${loading}"
          decoding="async"
          width="640"
          height="480">
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

  static createLazyLoadingScript() {
    return `
      // Lazy loading implementation
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

  static generateOptimizedGalleryHTML(images) {
    return images.map((image, index) => `
      <div class="gallery-item" data-category="${image.category || 'general'}">
        <picture>
          <source 
            data-srcset="/assets/images/gallery/${image.slug}-320.webp 320w, /assets/images/gallery/${image.slug}-640.webp 640w" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            type="image/webp">
          <img 
            src="${this.createBlurPlaceholder()}"
            data-src="/assets/images/gallery/${image.slug}-640.jpg"
            data-srcset="/assets/images/gallery/${image.slug}-320.jpg 320w, /assets/images/gallery/${image.slug}-640.jpg 640w"
            alt="${image.alt}"
            class="lazy"
            loading="lazy"
            decoding="async"
            width="640"
            height="480">
        </picture>
        <div class="gallery-overlay">
          <h3>${image.title}</h3>
          <p>${image.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Before/After slider with optimized images
  static generateBeforeAfterHTML(beforeImage, afterImage, alt) {
    return `
      <div class="before-after-container">
        <picture class="after-img">
          <source srcset="${afterImage.replace('.jpg', '.webp')}" type="image/webp">
          <img src="${afterImage}" alt="${alt} - After" loading="lazy" decoding="async">
        </picture>
        <div class="before-img">
          <picture>
            <source srcset="${beforeImage.replace('.jpg', '.webp')}" type="image/webp">
            <img src="${beforeImage}" alt="${alt} - Before" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="before-after-slider"></div>
      </div>
    `;
  }

  // Critical images that should load immediately
  static generateCriticalImageHTML(src, alt, sizes = '100vw') {
    const baseName = src.replace(/\.[^/.]+$/, '');
    
    return `
      <picture>
        <source 
          srcset="${baseName}-640.webp 640w, ${baseName}-1024.webp 1024w" 
          sizes="${sizes}" 
          type="image/webp">
        <img 
          src="${baseName}-640.jpg" 
          alt="${alt}" 
          loading="eager"
          decoding="sync"
          width="640"
          height="480"
          fetchpriority="high">
      </picture>
    `;
  }
}