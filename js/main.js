// Constants
const ANIMATION_DURATION = {
    FADE: 300,
    SLIDE: 600,
    LOADING: 800,
    FEEDBACK: 2500
};

const SELECTORS = {
    MOBILE_TOGGLE: '.mobile-menu-toggle',
    NAV_MENU: '.nav-menu',
    NAV_OVERLAY: '.nav-overlay',
    EMERGENCY_BANNER: '.emergency-banner',
    GALLERY_ITEM: '.gallery-item',
    FAQ_ITEM: '.faq-item'
};

const CSS_CLASSES = {
    ACTIVE: 'active',
    LOADING: 'loading',
    LOADED: 'loaded',
    VISIBLE: 'visible',
    ERROR: 'error'
};

// Enhanced Mobile Navigation functionality with touch support
class MobileNavigation {
    constructor() {
        this.toggle = document.querySelector(SELECTORS.MOBILE_TOGGLE);
        this.menu = document.querySelector(SELECTORS.NAV_MENU);
        this.overlay = document.querySelector(SELECTORS.NAV_OVERLAY);
        this.menuLinks = document.querySelectorAll('.nav-menu a');
        this.isOpen = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }
    
    init() {
        if (this.toggle && this.menu) {
            // Enhanced event listeners with touch support
            this.toggle.addEventListener('click', (e) => this.handleToggleClick(e));
            this.toggle.addEventListener('touchend', (e) => this.handleToggleTouch(e));
            this.overlay?.addEventListener('click', () => this.closeMenu());
            this.overlay?.addEventListener('touchend', () => this.closeMenu());
            
            // Enhanced menu link handling with touch support
            this.menuLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleLinkClick(e));
                link.addEventListener('touchend', (e) => this.handleLinkTouch(e));
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });
            
            // Enhanced outside click detection
            document.addEventListener('click', (e) => {
                if (this.isOpen && 
                    !this.menu.contains(e.target) && 
                    !this.toggle.contains(e.target) &&
                    !this.overlay?.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Touch gesture support for closing menu
            this.menu.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            });
            
            this.menu.addEventListener('touchend', (e) => {
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleSwipeGesture();
            });
            
            // Ensure contact form interactions always work
            document.addEventListener('click', (e) => {
                if (e.target.closest('.contact-form')) {
                    // Force close menu if user interacts with contact form
                    if (this.isOpen) {
                        this.closeMenu();
                    }
                }
            });
            
            // Additional safety: close menu when scrolling page content
            window.addEventListener('scroll', () => {
                if (this.isOpen) {
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
        this.menu.classList.add(CSS_CLASSES.ACTIVE);
        this.overlay?.classList.add(CSS_CLASSES.ACTIVE);
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstLink = this.menu.querySelector('a');
        firstLink?.focus();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-label', 'فتح القائمة الرئيسية');
        this.menu.classList.remove(CSS_CLASSES.ACTIVE);
        this.overlay?.classList.remove(CSS_CLASSES.ACTIVE);
        document.body.style.overflow = '';
        
        // Ensure overlay doesn't interfere with pointer events
        if (this.overlay) {
            this.overlay.style.pointerEvents = 'none';
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.opacity = '0';
        }
        
        // Reset touch values
        this.touchStartY = 0;
        this.touchEndY = 0;
    }
    
    handleToggleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu();
    }
    
    handleToggleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        // Small delay to prevent double-tap issues
        setTimeout(() => {
            if (!this.isOpen) {
                this.toggleMenu();
            }
        }, 10);
    }
    
    handleLinkClick(e) {
        // Let the link work normally, then close menu
        setTimeout(() => this.closeMenu(), 100);
    }
    
    handleLinkTouch(e) {
        // Prevent double events
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.href) {
            // Navigate manually after touch
            setTimeout(() => {
                window.location.href = link.href;
                this.closeMenu();
            }, 100);
        }
    }
    
    handleSwipeGesture() {
        const swipeDistance = this.touchStartY - this.touchEndY;
        const threshold = 50;
        
        // Swipe up to close menu (common mobile gesture)
        if (swipeDistance > threshold) {
            this.closeMenu();
        }
    }
}

// Accessibility and Keyboard Navigation Enhancement
class AccessibilityManager {
    constructor() {
        this.focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '.service-card',
            '.testimonial-card',
            '.gallery-item',
            '.contact-card',
            '.timeline-item'
        ].join(',');
        
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupArrowKeyNavigation();
        this.announcePageLoad();
    }
    
    setupKeyboardNavigation() {
        // Global keyboard navigation handler
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
                case 'Escape':
                    this.handleEscape(e);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.handleArrowNavigation(e);
                    break;
                case 'Enter':
                case ' ':
                    this.handleActivation(e);
                    break;
            }
        });
    }
    
    setupFocusManagement() {
        // Improve focus management for cards
        const focusableCards = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .contact-card, .timeline-item');
        
        focusableCards.forEach(card => {
            // Add proper focus and blur handling
            card.addEventListener('focus', () => {
                card.setAttribute('aria-describedby', this.generateCardDescription(card));
            });
            
            card.addEventListener('blur', () => {
                card.removeAttribute('aria-describedby');
            });
        });
    }
    
    setupArrowKeyNavigation() {
        // Arrow key navigation for card grids
        const grids = [
            { container: '.services-grid', items: '.service-card' },
            { container: '.testimonial-grid', items: '.testimonial-card' },
            { container: '.gallery-grid', items: '.gallery-item' },
            { container: '.contact-info', items: '.contact-card' }
        ];
        
        grids.forEach(grid => {
            const container = document.querySelector(grid.container);
            if (container) {
                this.setupGridNavigation(container, grid.items);
            }
        });
    }
    
    setupGridNavigation(container, itemSelector) {
        const items = container.querySelectorAll(itemSelector);
        
        items.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                    this.navigateGrid(items, index, e.key);
                }
            });
        });
    }
    
    navigateGrid(items, currentIndex, key) {
        let newIndex = currentIndex;
        const itemsPerRow = this.calculateItemsPerRow(items[0]);
        
        switch(key) {
            case 'ArrowRight':
                newIndex = (currentIndex + 1) % items.length;
                break;
            case 'ArrowLeft':
                newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
                break;
            case 'ArrowDown':
                newIndex = Math.min(currentIndex + itemsPerRow, items.length - 1);
                break;
            case 'ArrowUp':
                newIndex = Math.max(currentIndex - itemsPerRow, 0);
                break;
        }
        
        if (items[newIndex]) {
            items[newIndex].focus();
        }
    }
    
    calculateItemsPerRow(item) {
        const container = item.parentElement;
        const containerWidth = container.offsetWidth;
        const itemWidth = item.offsetWidth;
        const gap = parseInt(getComputedStyle(container).gap) || 20;
        
        return Math.floor((containerWidth + gap) / (itemWidth + gap));
    }
    
    handleTabNavigation(e) {
        // Enhanced tab navigation with focus trapping
        const activeElement = document.activeElement;
        const modal = activeElement.closest('.nav-menu.active');
        
        if (modal) {
            this.trapFocusInModal(e, modal);
        }
    }
    
    trapFocusInModal(e, modal) {
        const focusableElements = modal.querySelectorAll(this.focusableSelectors);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    handleEscape(e) {
        // Close any open modals or dropdowns
        const activeModal = document.querySelector('.nav-menu.active');
        if (activeModal) {
            const mobileNav = window.mobileNavigation;
            if (mobileNav) {
                mobileNav.closeMenu();
            }
        }
    }
    
    handleArrowNavigation(e) {
        // Handle arrow navigation for specific components
        const activeElement = document.activeElement;
        
        // Gallery filter navigation
        if (activeElement.classList.contains('filter-btn')) {
            this.navigateTablist(e, '.gallery-filters .filter-btn');
        }
    }
    
    navigateTablist(e, selector) {
        const tabs = document.querySelectorAll(selector);
        const currentIndex = Array.from(tabs).indexOf(document.activeElement);
        let newIndex;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        }
        
        if (newIndex !== undefined && tabs[newIndex]) {
            e.preventDefault();
            tabs[newIndex].focus();
            tabs[newIndex].click();
        }
    }
    
    handleActivation(e) {
        // Handle Enter and Space key activation
        const activeElement = document.activeElement;
        
        if (activeElement.classList.contains('service-card') ||
            activeElement.classList.contains('testimonial-card') ||
            activeElement.classList.contains('gallery-item') ||
            activeElement.classList.contains('contact-card')) {
            
            e.preventDefault();
            this.activateCard(activeElement);
        }
    }
    
    activateCard(card) {
        // Simulate click behavior for cards
        const link = card.querySelector('a');
        if (link) {
            link.click();
        } else {
            // Announce card content
            this.announceCardContent(card);
        }
    }
    
    announceCardContent(card) {
        const title = card.querySelector('h3, h4')?.textContent;
        const content = card.querySelector('p')?.textContent;
        
        if (title && content) {
            this.announceToScreenReader(`${title}. ${content}`);
        }
    }
    
    generateCardDescription(card) {
        // Generate helpful descriptions for screen readers
        if (card.classList.contains('service-card')) {
            return 'اضغط Enter للحصول على مزيد من المعلومات حول هذه الخدمة';
        } else if (card.classList.contains('testimonial-card')) {
            return 'تجربة مريض - اضغط Enter لقراءة التفاصيل';
        } else if (card.classList.contains('gallery-item')) {
            return 'حالة علاج - اضغط Enter لعرض التفاصيل';
        } else if (card.classList.contains('contact-card')) {
            return 'معلومات التواصل - اضغط Enter للاتصال';
        }
        return 'عنصر تفاعلي - اضغط Enter للتفاعل';
    }
    
    announceToScreenReader(message) {
        // Create a live region announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    announcePageLoad() {
        // Announce page load completion
        setTimeout(() => {
            this.announceToScreenReader('تم تحميل الصفحة بالكامل. يمكنك التنقل باستخدام Tab أو الأسهم');
        }, 1000);
    }
}

// Initialize mobile navigation and enhanced UX components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const mobileNav = new MobileNavigation();
    window.mobileNavigation = mobileNav; // Make globally accessible
    new EmergencyBanner();
    new FAQAccordion();
    new BookingFlow(); // Move here to ensure proper initialization
    new AccessibilityManager(); // Initialize accessibility features
    
    // Setup cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Cleanup any pending timeouts or intervals
        // This helps prevent memory leaks
    });
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

// Enhanced FAQ Accordion functionality
class FAQAccordion {
    constructor() {
        this.items = document.querySelectorAll(SELECTORS.FAQ_ITEM);
        this.init();
    }
    
    init() {
        this.items.forEach((item, index) => {
            this.setupFAQItem(item, index);
        });
    }
    
    setupFAQItem(item, index) {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (!question || !answer) return;
        
        // Add proper ARIA attributes
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        
        question.setAttribute('id', questionId);
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        question.setAttribute('tabindex', '0');
        
        answer.setAttribute('id', answerId);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
        
        // Set initial styles
        question.style.cursor = 'pointer';
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = `max-height ${ANIMATION_DURATION.FADE}ms ease`;
        
        // Add click and keyboard event listeners
        question.addEventListener('click', () => this.toggleFAQ(item, question, answer));
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleFAQ(item, question, answer);
            }
        });
    }
    
    toggleFAQ(item, question, answer) {
        const isExpanded = item.classList.contains(CSS_CLASSES.ACTIVE);
        
        // Close all other items for accordion behavior
        this.items.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains(CSS_CLASSES.ACTIVE)) {
                this.closeFAQ(otherItem);
            }
        });
        
        if (isExpanded) {
            this.closeFAQ(item);
        } else {
            this.openFAQ(item, question, answer);
        }
    }
    
    openFAQ(item, question, answer) {
        item.classList.add(CSS_CLASSES.ACTIVE);
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        
        // Track analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_opened', {
                'event_category': 'engagement',
                'event_label': question.textContent.substring(0, 50)
            });
        }
    }
    
    closeFAQ(item) {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        item.classList.remove(CSS_CLASSES.ACTIVE);
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
    }
}

// Enhanced Lazy loading for images with loading states
class ImageLoader {
    constructor() {
        this.observer = null;
        this.loadingImages = new Set();
        this.retryAttempts = new Map();
        this.maxRetries = 3;
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
        if (this.loadingImages.has(img)) {
            return; // Already loading
        }
        
        this.loadingImages.add(img);
        const parentItem = img.closest(SELECTORS.GALLERY_ITEM);
        const imageSrc = img.dataset.src || img.src;
        
        // Show loading state
        if (parentItem) {
            parentItem.classList.add(CSS_CLASSES.LOADING);
        }
        
        this.attemptImageLoad(img, imageSrc, parentItem);
    }
    
    attemptImageLoad(img, src, parentItem, retryCount = 0) {
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            this.onImageLoadSuccess(img, imageLoader.src, parentItem);
        };
        
        imageLoader.onerror = () => {
            this.onImageLoadError(img, src, parentItem, retryCount);
        };
        
        // Start loading
        imageLoader.src = src;
    }
    
    onImageLoadSuccess(img, src, parentItem) {
        img.src = src;
        img.classList.add(CSS_CLASSES.LOADED);
        
        if (parentItem) {
            parentItem.classList.remove(CSS_CLASSES.LOADING);
            parentItem.classList.add(CSS_CLASSES.LOADED);
        }
        
        this.loadingImages.delete(img);
        this.retryAttempts.delete(img);
    }
    
    onImageLoadError(img, src, parentItem, retryCount) {
        const maxRetries = this.maxRetries;
        
        if (retryCount < maxRetries) {
            // Retry with exponential backoff
            const delay = Math.pow(2, retryCount) * 1000;
            setTimeout(() => {
                this.attemptImageLoad(img, src, parentItem, retryCount + 1);
            }, delay);
            
            this.retryAttempts.set(img, retryCount + 1);
            console.warn(`Image load retry ${retryCount + 1}/${maxRetries} for: ${src}`);
        } else {
            // All retries failed
            img.alt = 'فشل في تحميل الصورة';
            
            if (parentItem) {
                parentItem.classList.remove(CSS_CLASSES.LOADING);
                parentItem.classList.add(CSS_CLASSES.ERROR);
            }
            
            this.loadingImages.delete(img);
            this.retryAttempts.delete(img);
            console.error(`Failed to load image after ${maxRetries} retries: ${src}`);
        }
    }
    
    observeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            this.observer.observe(img);
        });
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    new ImageLoader();
    new ScrollHandler();
});

// Performance utilities
class PerformanceUtils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Optimized scroll handler
class ScrollHandler {
    constructor() {
        this.header = document.querySelector('header');
        this.scrollY = 0;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        if (this.header) {
            window.addEventListener('scroll', () => this.requestTick());
        }
    }
    
    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateHeader());
            this.ticking = true;
        }
    }
    
    updateHeader() {
        this.scrollY = window.scrollY;
        
        if (this.scrollY > 50) {
            this.header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            this.header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        this.ticking = false;
    }
}

// Enhanced Booking Flow with Analytics and Smart Positioning
class BookingFlow {
    constructor() {
        this.bookingButtons = document.querySelectorAll('a[href^="https://wa.me"], .cta-button, .sticky-book');
        this.stickyButton = document.querySelector('.sticky-book');
        this.contactSection = document.querySelector('.contact');
        this.init();
    }
    
    init() {
        this.bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleBookingClick(e, button));
            // Enhanced touch support
            button.addEventListener('touchend', (e) => this.handleBookingTouch(e, button));
        });
        
        // Smart positioning for sticky button
        if (this.stickyButton && this.contactSection) {
            this.setupSmartPositioning();
        }
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
    
    handleBookingTouch(e, button) {
        // Prevent double events on touch devices
        e.preventDefault();
        
        // Add touch feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Handle the booking action
        this.handleBookingClick(e, button);
    }
    
    setupSmartPositioning() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === this.contactSection) {
                    if (entry.isIntersecting) {
                        // Contact section is visible - adjust button position
                        document.body.classList.add('contact-section-active');
                        this.adjustButtonForContactSection(true);
                    } else {
                        // Contact section not visible - normal position
                        document.body.classList.remove('contact-section-active');
                        this.adjustButtonForContactSection(false);
                    }
                }
            });
        }, observerOptions);
        
        observer.observe(this.contactSection);
    }
    
    adjustButtonForContactSection(isContactVisible) {
        if (!this.stickyButton) return;
        
        if (isContactVisible) {
            // Move button to avoid overlap with contact form
            this.stickyButton.style.bottom = '20px';
            this.stickyButton.style.right = '20px';
            this.stickyButton.style.zIndex = '90';
            this.stickyButton.style.transform = 'scale(0.9)';
            this.stickyButton.style.opacity = '0.8';
        } else {
            // Reset to normal position
            this.stickyButton.style.bottom = '';
            this.stickyButton.style.right = '';
            this.stickyButton.style.zIndex = '';
            this.stickyButton.style.transform = '';
            this.stickyButton.style.opacity = '';
        }
    }
}

// BookingFlow is now initialized in the main DOMContentLoaded event above

// Emergency banner auto-hide with proper cleanup
class EmergencyBanner {
    constructor() {
        this.banner = document.querySelector(SELECTORS.EMERGENCY_BANNER);
        this.timeoutId = null;
        this.init();
    }
    
    init() {
        if (this.banner) {
            this.timeoutId = setTimeout(() => this.fadeOut(), 10000);
        }
    }
    
    fadeOut() {
        if (this.banner) {
            this.banner.style.transition = 'opacity 0.5s';
            this.banner.style.opacity = '0.8';
        }
    }
    
    destroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

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
        const itemsToShow = [];
        const itemsToHide = [];
        
        // First pass: categorize items and batch DOM reads
        this.galleryItems.forEach(item => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow && visibleCount < this.maxVisible) {
                itemsToShow.push(item);
                visibleCount++;
            } else if (shouldShow) {
                // Hidden but available for "view more"
                item.style.display = 'none';
            } else {
                itemsToHide.push(item);
            }
        });
        
        // Batch DOM writes for better performance
        requestAnimationFrame(() => {
            // Hide filtered items first
            itemsToHide.forEach(item => {
                item.style.transition = `all ${ANIMATION_DURATION.FADE}ms ease`;
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
            });
            
            // Then show visible items with staggered animation
            itemsToShow.forEach((item, index) => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                // Use setTimeout for staggered effect
                setTimeout(() => {
                    item.style.transition = `all ${ANIMATION_DURATION.SLIDE}ms ease`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Hide filtered items after animation
            setTimeout(() => {
                itemsToHide.forEach(item => {
                    item.style.display = 'none';
                });
            }, ANIMATION_DURATION.FADE);
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

// Enhanced Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formMessage = document.getElementById('formMessage');
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // Form submission handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.setupRealTimeValidation();
        
        // Character counter for message field
        this.setupCharacterCounter();
        
        // Phone number formatting
        this.setupPhoneFormatting();
    }
    
    setupRealTimeValidation() {
        const fields = ['name', 'email', 'phone', 'service'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                // Real-time validation on blur
                field.addEventListener('blur', () => {
                    this.validateField(fieldId);
                });
                
                // Clear errors and provide immediate feedback on input
                field.addEventListener('input', () => {
                    this.clearFieldError(fieldId);
                    
                    // Provide immediate validation for some fields
                    if (fieldId === 'email' && field.value.includes('@')) {
                        setTimeout(() => this.validateField(fieldId), 500);
                    }
                    
                    if (fieldId === 'phone' && field.value.length >= 8) {
                        setTimeout(() => this.validateField(fieldId), 500);
                    }
                });
                
                // Add success state on valid input
                field.addEventListener('input', () => {
                    if (field.value.trim() && !field.classList.contains('error')) {
                        field.classList.add('success');
                    } else {
                        field.classList.remove('success');
                    }
                });
            }
        });
    }
    
    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        const counter = document.getElementById('message-count');
        
        if (messageField && counter) {
            messageField.addEventListener('input', () => {
                const length = messageField.value.length;
                counter.textContent = `${length}/1000`;
                
                // Update counter color based on usage
                if (length > 950) {
                    counter.style.color = 'var(--emergency)';
                    counter.style.fontWeight = '600';
                } else if (length > 800) {
                    counter.style.color = '#ed8936';
                    counter.style.fontWeight = '600';
                } else {
                    counter.style.color = 'var(--secondary)';
                    counter.style.fontWeight = '400';
                }
                
                // Add warning if close to limit
                if (length > 950) {
                    messageField.style.borderColor = 'var(--emergency)';
                    counter.textContent = `${length}/1000 - اقترب من الحد الأقصى`;
                } else {
                    messageField.style.borderColor = length > 0 ? 'var(--primary)' : '#e2e2e2';
                }
            });
        }
    }
    
    setupPhoneFormatting() {
        const phoneField = document.getElementById('phone');
        
        if (phoneField) {
            phoneField.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^\d+]/g, '');
                
                // Auto-add Kuwait country code if not present
                if (value.length === 8 && !value.startsWith('+') && !value.startsWith('965')) {
                    value = '+965' + value;
                }
                
                e.target.value = value;
            });
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        // Validate all fields
        if (!this.validateAllFields()) {
            this.showMessage('error', 'يرجى تصحيح الأخطاء أولاً', 'هناك أخطاء في البيانات المدخلة');
            return;
        }
        
        this.isSubmitting = true;
        this.showLoadingState();
        
        try {
            const formData = new FormData(this.form);
            
            // Submit to Cloudflare Worker
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                this.handleSuccess(result);
            } else {
                this.handleError(result);
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleError({
                message: 'فشل في الاتصال بالخادم. يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.',
                error: 'Network error'
            });
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }
    
    validateAllFields() {
        let isValid = true;
        const fields = ['name', 'email', 'phone', 'service'];
        
        // Validate all required fields
        fields.forEach(fieldId => {
            const fieldValid = this.validateField(fieldId);
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        // Validate message length if provided
        const messageField = document.getElementById('message');
        if (messageField && messageField.value.length > 1000) {
            this.showFieldError('message', 'الرسالة طويلة جداً (الحد الأقصى 1000 حرف)');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(fieldId) {
        this.clearFieldError(fieldId);
        
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        let isValid = true;
        
        switch (fieldId) {
            case 'name':
                if (value.length < 2) {
                    this.showFieldError(fieldId, 'الاسم يجب أن يكون على الأقل حرفين');
                    isValid = false;
                } else if (value.length > 50) {
                    this.showFieldError(fieldId, 'الاسم طويل جداً (الحد الأقصى 50 حرف)');
                    isValid = false;
                } else if (!/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFFa-zA-Z\s]+$/.test(value)) {
                    this.showFieldError(fieldId, 'الاسم يجب أن يحتوي على أحرف فقط');
                    isValid = false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    this.showFieldError(fieldId, 'البريد الإلكتروني مطلوب');
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    this.showFieldError(fieldId, 'البريد الإلكتروني غير صحيح (مثال: patient@example.com)');
                    isValid = false;
                } else if (value.length > 100) {
                    this.showFieldError(fieldId, 'البريد الإلكتروني طويل جداً');
                    isValid = false;
                }
                break;
                
            case 'phone':
                const phoneRegex = /^(\+965|965)?[2456789]\d{7}$/;
                const cleanPhone = value.replace(/[\s-]/g, '');
                if (!value) {
                    this.showFieldError(fieldId, 'رقم الهاتف مطلوب');
                    isValid = false;
                } else if (!phoneRegex.test(cleanPhone)) {
                    this.showFieldError(fieldId, 'رقم الهاتف غير صحيح (مثال: 98563711 أو +96598563711)');
                    isValid = false;
                }
                break;
                
            case 'service':
                if (!value) {
                    this.showFieldError(fieldId, 'يرجى اختيار نوع الخدمة');
                    isValid = false;
                }
                break;
        }
        
        // Add success state if valid
        if (isValid && value) {
            field.classList.add('success');
            field.classList.remove('error');
        }
        
        return isValid;
    }
    
    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'flex';
            errorElement.setAttribute('aria-live', 'polite');
        }
        
        if (field) {
            field.classList.add('error');
            field.classList.remove('success');
            field.setAttribute('aria-invalid', 'true');
            
            // Add shake animation for immediate feedback
            setTimeout(() => {
                field.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            }, 10);
        }
    }
    
    clearFieldError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const field = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
        
        if (field) {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        }
    }
    
    handleSuccess(result) {
        // Reset form
        this.form.reset();
        
        // Clear all field states
        const fields = ['name', 'email', 'phone', 'service'];
        fields.forEach(fieldId => {
            this.clearFieldError(fieldId);
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('success', 'error');
                field.setAttribute('aria-invalid', 'false');
            }
        });
        
        // Reset character counter
        const counter = document.getElementById('message-count');
        if (counter) {
            counter.textContent = '0/1000';
            counter.style.color = 'var(--secondary)';
            counter.style.fontWeight = '400';
        }
        
        // Reset message field border
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.style.borderColor = '#e2e2e2';
        }
        
        // Show success message
        this.showMessage(
            'success',
            '✅ تم إرسال طلبك بنجاح!',
            `شكراً لتواصلك معنا. سنرد عليك قريباً في أقرب وقت ممكن. ${result.reference ? 'رقم المرجع: ' + result.reference : ''}`
        );
        
        // Track success analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_success', {
                'event_category': 'contact',
                'event_label': 'contact_form',
                'value': 1
            });
        }
        
        // Auto-hide success message after 10 seconds
        setTimeout(() => {
            this.hideMessage();
        }, 10000);
        
        // Scroll to top of form to show success message
        this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    handleError(result) {
        let errorMessage = 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.';
        
        if (result.message) {
            errorMessage = result.message;
        } else if (result.details && Array.isArray(result.details)) {
            errorMessage = result.details.join('، ');
        }
        
        this.showMessage('error', '❌ فشل في إرسال الطلب', errorMessage);
        
        // Track error analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit_error', {
                'event_category': 'contact',
                'event_label': result.error || 'unknown_error',
                'value': 0
            });
        }
    }
    
    showMessage(type, title, description) {
        const messageElement = this.formMessage;
        const icon = messageElement.querySelector('.message-icon');
        const titleElement = messageElement.querySelector('.message-title');
        const descElement = messageElement.querySelector('.message-description');
        
        // Set content
        titleElement.textContent = title;
        descElement.textContent = description;
        
        // Set icon based on type
        icon.textContent = type === 'success' ? '✅' : '❌';
        
        // Set styling
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    hideMessage() {
        this.formMessage.style.display = 'none';
    }
    
    showLoadingState() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');
    }
    
    hideLoadingState() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
    }
}

// Initialize contact form handler
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

console.log('Dr. Islam Website - Enhanced Gallery System and Contact Form Loaded');