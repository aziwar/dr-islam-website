// LOADING STATES - Progressive Image Loading & Skeleton UI
// Enhances user experience with smooth loading transitions

/**
 * Gallery Skeleton Generator
 * Creates skeleton loading placeholders for gallery items
 */
export function createGallerySkeleton(count = 6) {
    return `
        <div class="gallery-skeleton" aria-label="Loading gallery...">
            ${Array.from({ length: count }, (_, i) => `
                <div class="gallery-item-skeleton" role="img" aria-label="Loading image ${i + 1}">
                    <div class="skeleton skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-category"></div>
                        <div class="skeleton skeleton-description"></div>
                        <div class="skeleton skeleton-description"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Progressive Image Loader
 * Implements blur-up technique for smooth image loading
 */
export class ProgressiveImageLoader {
    constructor() {
        this.loadedImages = new Set();
        this.observers = new Map();
        this.setupIntersectionObserver();
    }

    /**
     * Setup Intersection Observer for lazy loading
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.loadAllImages();
            return;
        }

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
    }

    /**
     * Create progressive image element with blur-up effect
     */
    createProgressiveImage({ src, lowResSrc, alt, className = '', width, height }) {
        const imageId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        return `
            <div class="image-container ${className}" data-image-id="${imageId}">
                ${lowResSrc ? `
                    <img 
                        class="image-blur-placeholder" 
                        src="${lowResSrc}" 
                        alt=""
                        aria-hidden="true"
                        ${width ? `width="${width}"` : ''}
                        ${height ? `height="${height}"` : ''}
                    />
                ` : `
                    <div class="skeleton" style="width: 100%; height: 100%; position: absolute;"></div>
                `}
                <img 
                    class="image-loading progressive-image" 
                    data-src="${src}"
                    data-image-id="${imageId}"
                    alt="${alt}"
                    ${width ? `width="${width}"` : ''}
                    ${height ? `height="${height}"` : ''}
                    loading="lazy"
                />
            </div>
        `;
    }

    /**
     * Initialize progressive loading for gallery
     */
    initializeGallery(galleryContainer) {
        if (!galleryContainer) return;

        const progressiveImages = galleryContainer.querySelectorAll('.progressive-image');
        
        progressiveImages.forEach(img => {
            if (this.intersectionObserver) {
                this.intersectionObserver.observe(img);
            } else {
                this.loadImage(img);
            }
        });
    }

    /**
     * Load individual image with smooth transition
     */
    async loadImage(imgElement) {
        const imageId = imgElement.dataset.imageId;
        const src = imgElement.dataset.src;
        
        if (!src || this.loadedImages.has(src)) return;

        try {
            // Preload the image
            const image = new Image();
            
            const loadPromise = new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = reject;
                image.src = src;
            });

            await loadPromise;

            // Update the actual image element
            imgElement.src = src;
            imgElement.classList.remove('image-loading');
            imgElement.classList.add('image-loaded');

            // Hide blur placeholder
            const container = imgElement.closest('.image-container');
            if (container) {
                const placeholder = container.querySelector('.image-blur-placeholder, .skeleton');
                if (placeholder) {
                    placeholder.classList.add('hidden');
                    
                    // Remove placeholder after transition
                    setTimeout(() => {
                        if (placeholder.parentNode) {
                            placeholder.remove();
                        }
                    }, 300);
                }
            }

            this.loadedImages.add(src);
            
            // Dispatch custom event
            imgElement.dispatchEvent(new CustomEvent('imageLoaded', {
                detail: { src, imageId }
            }));

        } catch (error) {
            console.warn('Failed to load image:', src, error);
            this.handleImageError(imgElement);
        }
    }

    /**
     * Handle image loading errors
     */
    handleImageError(imgElement) {
        const container = imgElement.closest('.image-container');
        if (container) {
            container.innerHTML = `
                <div class="image-error" style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-section);
                    color: var(--text-light);
                    height: 100%;
                    font-size: var(--text-sm);
                ">
                    <span>📷 Image unavailable</span>
                </div>
            `;
        }
    }

    /**
     * Fallback for browsers without Intersection Observer
     */
    loadAllImages() {
        const progressiveImages = document.querySelectorAll('.progressive-image');
        progressiveImages.forEach(img => this.loadImage(img));
    }

    /**
     * Clean up observers
     */
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.observers.clear();
        this.loadedImages.clear();
    }
}

/**
 * Form Loading States
 * Provides loading indicators for form submissions
 */
export class FormLoadingManager {
    constructor() {
        this.activeSubmissions = new Set();
    }

    /**
     * Show loading state for form submission
     */
    showLoading(formElement, options = {}) {
        if (!formElement) return;

        const formId = formElement.id || `form-${Date.now()}`;
        this.activeSubmissions.add(formId);

        const submitButton = formElement.querySelector('button[type="submit"], input[type="submit"]');
        const originalText = submitButton?.textContent || submitButton?.value || 'Submit';

        // Store original state
        if (submitButton) {
            submitButton.dataset.originalText = originalText;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="loading-spinner" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" values="0 12 12;360 12 12"/>
                        </path>
                    </svg>
                </span>
                <span>${options.loadingText || 'Submitting...'}</span>
            `;
        }

        // Add loading class to form
        formElement.classList.add('form-loading');
        
        // Disable all form inputs
        const inputs = formElement.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            if (input !== submitButton) {
                input.disabled = true;
                input.dataset.wasDisabled = input.hasAttribute('disabled') ? 'true' : 'false';
            }
        });
    }

    /**
     * Hide loading state and restore form
     */
    hideLoading(formElement, success = true) {
        if (!formElement) return;

        const formId = formElement.id || `form-${Date.now()}`;
        this.activeSubmissions.delete(formId);

        const submitButton = formElement.querySelector('button[type="submit"], input[type="submit"]');
        
        if (submitButton && submitButton.dataset.originalText) {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButton.dataset.originalText;
            delete submitButton.dataset.originalText;
        }

        // Remove loading class
        formElement.classList.remove('form-loading');
        
        // Re-enable form inputs
        const inputs = formElement.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            if (input.dataset.wasDisabled === 'false') {
                input.disabled = false;
            }
            delete input.dataset.wasDisabled;
        });

        // Show success/error feedback
        if (success) {
            this.showSuccessFeedback(formElement);
        }
    }

    /**
     * Show success feedback
     */
    showSuccessFeedback(formElement) {
        const submitButton = formElement.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.innerHTML = `
                <span style="color: var(--success);">✓ Submitted!</span>
            `;
            
            setTimeout(() => {
                if (submitButton.textContent.includes('Submitted!')) {
                    submitButton.textContent = originalText;
                }
            }, 2000);
        }
    }

    /**
     * Check if any forms are currently loading
     */
    hasActiveSubmissions() {
        return this.activeSubmissions.size > 0;
    }
}

// Global instances
export const progressiveImageLoader = new ProgressiveImageLoader();
export const formLoadingManager = new FormLoadingManager();

// Auto-initialize on DOM content loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize progressive loading for existing galleries
        const galleries = document.querySelectorAll('.gallery-grid');
        galleries.forEach(gallery => {
            progressiveImageLoader.initializeGallery(gallery);
        });
    });
}

/**
 * Utility function to replace gallery content with skeleton during loading
 */
export function showGalleryLoading(galleryContainer, itemCount = 6) {
    if (!galleryContainer) return;

    galleryContainer.innerHTML = createGallerySkeleton(itemCount);
    galleryContainer.setAttribute('aria-busy', 'true');
}

/**
 * Utility function to hide gallery loading and show actual content
 */
export function hideGalleryLoading(galleryContainer, actualContent) {
    if (!galleryContainer) return;

    galleryContainer.innerHTML = actualContent;
    galleryContainer.removeAttribute('aria-busy');
    
    // Initialize progressive loading for new content
    progressiveImageLoader.initializeGallery(galleryContainer);
}