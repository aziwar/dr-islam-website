// Mobile Navigation functionality
class MobileNavigation {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.overlay = document.querySelector('.nav-overlay');
        this.menuLinks = document.querySelectorAll('.nav-menu a');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            this.overlay?.addEventListener('click', () => this.closeMenu());
            
            // Close menu when clicking navigation links
            this.menuLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.isOpen = true;
        this.toggle.setAttribute('aria-expanded', 'true');
        this.toggle.setAttribute('aria-label', 'إغلاق القائمة الرئيسية');
        this.menu.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstLink = this.menu.querySelector('a');
        firstLink?.focus();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-label', 'فتح القائمة الرئيسية');
        this.menu.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavigation();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100; // Account for sticky header
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Add cursor pointer to questions
        question.style.cursor = 'pointer';
        
        // Initially hide answers
        answer.style.maxHeight = '200px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', function() {
            // Toggle active state
            item.classList.toggle('active');
            
            // Animate answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '200px';
            }
        });
    });
});

// Enhanced Lazy loading for images with loading states
class ImageLoader {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Start loading 50px before visible
                threshold: 0.1
            });
            
            this.observeImages();
        }
    }
    
    loadImage(img) {
        const parentItem = img.closest('.gallery-item');
        
        // Show loading state
        if (parentItem) {
            parentItem.classList.add('loading');
        }
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Image loaded successfully
            img.src = imageLoader.src;
            img.classList.add('loaded');
            
            if (parentItem) {
                parentItem.classList.remove('loading');
                parentItem.classList.add('loaded');
            }
        };
        
        imageLoader.onerror = () => {
            // Handle image load error
            img.alt = 'فشل في تحميل الصورة';
            if (parentItem) {
                parentItem.classList.remove('loading');
                parentItem.classList.add('error');
            }
        };
        
        // Start loading
        imageLoader.src = img.dataset.src || img.src;
    }
    
    observeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            this.observer.observe(img);
        });
    }
}

// Initialize image loader
document.addEventListener('DOMContentLoaded', () => {
    new ImageLoader();
});

// Performance: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(function() {
        // Update header shadow on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
});

// Enhanced Booking Flow with Analytics and UX
class BookingFlow {
    constructor() {
        this.bookingButtons = document.querySelectorAll('a[href^="https://wa.me"], .cta-button, .sticky-book');
        this.init();
    }
    
    init() {
        this.bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleBookingClick(e, button));
        });
    }
    
    handleBookingClick(e, button) {
        // Add loading state
        button.classList.add('loading');
        
        // Show user feedback
        this.showBookingFeedback(button);
        
        // Track analytics
        this.trackBookingIntent(button);
        
        // Remove loading state after short delay for UX
        setTimeout(() => {
            button.classList.remove('loading');
        }, 800);
    }
    
    showBookingFeedback(button) {
        // Create success message
        const message = document.createElement('div');
        message.className = 'booking-feedback';
        message.innerHTML = `
            <div class="feedback-content">
                <span class="feedback-icon">✓</span>
                <span class="feedback-text">سيتم توجيهك لـ WhatsApp...</span>
            </div>
        `;
        
        // Position near button
        message.style.cssText = `
            position: fixed;
            bottom: 180px;
            right: 30px;
            background: var(--success);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            font-size: 0.9rem;
            direction: rtl;
        `;
        
        document.body.appendChild(message);
        
        // Animate in
        requestAnimationFrame(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        });
        
        // Remove after delay
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            setTimeout(() => message.remove(), 300);
        }, 2500);
    }
    
    trackBookingIntent(button) {
        // Enhanced analytics tracking
        const buttonType = button.classList.contains('sticky-book') ? 'sticky_button' :
                          button.classList.contains('cta-button') ? 'hero_cta' : 'whatsapp_link';
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'book_appointment_click', {
                'event_category': 'booking',
                'event_label': buttonType,
                'value': 1
            });
        }
        
        // Custom analytics (if needed)
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'booking_intent',
                'booking_type': buttonType,
                'timestamp': new Date().toISOString()
            });
        }
    }
}

// Initialize booking flow
document.addEventListener('DOMContentLoaded', () => {
    new BookingFlow();
});

// Emergency banner auto-hide after 10 seconds
setTimeout(() => {
    const emergencyBanner = document.querySelector('.emergency-banner');
    if (emergencyBanner) {
        emergencyBanner.style.transition = 'opacity 0.5s';
        emergencyBanner.style.opacity = '0.8';
    }
}, 10000);

// Scroll-triggered animations
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            this.observeElements();
        }
    }
    
    observeElements() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .testimonial-card, .gallery-item, .faq-item, .about-content, .contact-card'
        );
        
        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`; // Staggered animation
            this.observer.observe(el);
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// Enhanced Gallery Filter System
class GalleryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.viewMoreBtn = document.querySelector('.view-more-btn');
        this.maxVisible = 6;
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        if (this.filterButtons.length && this.galleryItems.length) {
            // Add click listeners to filter buttons
            this.filterButtons.forEach(button => {
                button.addEventListener('click', (e) => this.handleFilterClick(e));
            });
            
            // Add view more functionality
            if (this.viewMoreBtn) {
                this.viewMoreBtn.addEventListener('click', () => this.showMoreItems());
            }
            
            // Initialize view
            this.filterItems('all');
            this.updateViewMoreButton();
        }
    }
    
    handleFilterClick(e) {
        const filterValue = e.target.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter items
        this.filterItems(filterValue);
        this.currentFilter = filterValue;
        this.updateViewMoreButton();
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'gallery_filter', {
                'event_category': 'gallery',
                'event_label': filterValue,
                'value': 1
            });
        }
    }
    
    filterItems(filter) {
        let visibleCount = 0;
        
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow && visibleCount < this.maxVisible) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                // Staggered animation
                setTimeout(() => {
                    item.style.transition = 'all 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
                
                visibleCount++;
            } else if (shouldShow) {
                // Hidden but available for "view more"
                item.style.display = 'none';
            } else {
                // Fade out filtered items
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    showMoreItems() {
        let visibleCount = 0;
        let newlyShown = 0;
        
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = this.currentFilter === 'all' || category === this.currentFilter;
            
            if (shouldShow) {
                if (item.style.display !== 'none') {
                    visibleCount++;
                } else if (newlyShown < 3) {
                    // Show 3 more items
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, newlyShown * 150);
                    
                    newlyShown++;
                    visibleCount++;
                }
            }
        });
        
        this.maxVisible = visibleCount;
        this.updateViewMoreButton();
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'gallery_view_more', {
                'event_category': 'gallery',
                'event_label': this.currentFilter,
                'value': newlyShown
            });
        }
    }
    
    updateViewMoreButton() {
        if (!this.viewMoreBtn) return;
        
        const totalFilteredItems = Array.from(this.galleryItems).filter(item => {
            const category = item.dataset.category;
            return this.currentFilter === 'all' || category === this.currentFilter;
        }).length;
        
        if (this.maxVisible >= totalFilteredItems) {
            this.viewMoreBtn.style.display = 'none';
        } else {
            this.viewMoreBtn.style.display = 'inline-flex';
            const remaining = totalFilteredItems - this.maxVisible;
            this.viewMoreBtn.innerHTML = `عرض ${remaining} حالة إضافية <span class="arrow">←</span>`;
        }
    }
}

// Initialize enhanced gallery
document.addEventListener('DOMContentLoaded', () => {
    new GalleryFilter();
});

// Enhanced Case Study Modal (for future implementation)
class CaseStudyModal {
    constructor() {
        this.modal = null;
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create modal structure
        this.modal = document.createElement('div');
        this.modal.className = 'case-modal';
        this.modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <div class="modal-images">
                            <img class="modal-before" alt="قبل العلاج">
                            <img class="modal-after" alt="بعد العلاج">
                        </div>
                        <div class="modal-info">
                            <h3 class="modal-title"></h3>
                            <div class="modal-details"></div>
                            <div class="modal-timeline"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }
    
    bindEvents() {
        // Close modal events
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(caseData) {
        // Populate modal with case data
        this.modal.querySelector('.modal-title').textContent = caseData.title;
        this.modal.querySelector('.modal-before').src = caseData.beforeImage;
        this.modal.querySelector('.modal-after').src = caseData.afterImage;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

console.log('Dr. Islam Website - Enhanced Gallery System Loaded');