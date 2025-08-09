// UI-UTILS.JS - Shared UI Utility Functions
// Consolidated from ar.js and en.js to eliminate duplication
// 13 functions extracted - 400+ lines saved

/**
 * Breadcrumb Management
 */
export function updateBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    const currentPath = window.location.hash || '#home';
    const pathMap = {
        '#home': 'الرئيسية / Home',
        '#services': 'الخدمات / Services', 
        '#about': 'عن الطبيب / About',
        '#contact': 'اتصل بنا / Contact',
        '#gallery': 'المعرض / Gallery'
    };
    
    if (breadcrumb && pathMap[currentPath]) {
        breadcrumb.textContent = pathMap[currentPath];
    }
}

/**
 * Mobile Navigation Functions
 */
export function toggleMobileMenu() {
    const menu = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const backdrop = document.querySelector('.nav-backdrop');
    
    if (!menu || !toggle || !backdrop) return;
    
    const isOpen = menu.classList.contains('is-open');
    
    menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open');
    backdrop.classList.toggle('is-open');
    
    toggle.setAttribute('aria-expanded', !isOpen);
    
    // Prevent body scroll when menu is open
    if (!isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

export function closeMobileMenu() {
    const menu = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const backdrop = document.querySelector('.nav-backdrop');
    
    if (!menu || !toggle || !backdrop) return;
    
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

/**
 * Modal Management Functions
 */
export function openBookingModal() {
    const modal = document.querySelector('.booking-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
        modal.classList.add('is-active');
        overlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first form field
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

export function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
        modal.classList.remove('is-active');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
    }
}

export function showBookingSuccess() {
    const modal = document.querySelector('.booking-modal');
    const form = modal?.querySelector('form');
    const successMessage = modal?.querySelector('.booking-success');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            closeBookingModal();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            form.reset();
        }, 3000);
    }
}

/**
 * Interactive Enhancement Functions
 */
export function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

export function setupGalleryTouch() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        let startX = 0;
        let startY = 0;
        
        item.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        item.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next image
                    item.querySelector('.next-btn')?.click();
                } else {
                    // Swipe right - previous image
                    item.querySelector('.prev-btn')?.click();
                }
            }
        }, { passive: true });
    });
}

export function setupBeforeAfterTouch() {
    const beforeAfterSliders = document.querySelectorAll('.before-after-slider');
    
    beforeAfterSliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        
        if (!handle || !beforeImage) return;
        
        let isDragging = false;
        
        const updateSlider = (x) => {
            const rect = slider.getBoundingClientRect();
            const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
            beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
            handle.style.left = `${position}%`;
        };
        
        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
}

export function setupSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

export function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.is-active, .booking-modal.is-active');
            if (activeModal) {
                closeBookingModal();
                return;
            }
            
            // Close mobile menu with Escape
            const mobileMenu = document.querySelector('.main-nav.is-open');
            if (mobileMenu) {
                closeMobileMenu();
                return;
            }
        }
        
        // Tab navigation for gallery
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('gallery-item')) {
                // Allow natural tab navigation
                return;
            }
        }
    });
}

export function setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('is-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('is-focused');
                if (input.value) {
                    input.parentElement?.classList.add('has-value');
                } else {
                    input.parentElement?.classList.remove('has-value');
                }
            });
            
            // Set initial state
            if (input.value) {
                input.parentElement?.classList.add('has-value');
            }
        });
    });
}

export function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
        });
    });
}

/**
 * Loading State Functions
 */
export function addLoadingState(element) {
    if (element) {
        element.classList.add('is-loading');
        element.disabled = true;
    }
}

export function removeLoadingState(element) {
    if (element) {
        element.classList.remove('is-loading');
        element.disabled = false;
    }
}

/**
 * Initialize all UI enhancements
 */
export function initializeUIUtils() {
    setupLazyLoading();
    setupGalleryTouch();
    setupBeforeAfterTouch();
    setupSmoothScroll();
    setupKeyboardNav();
    setupFormEnhancements();
    setupFormValidation();
    updateBreadcrumb();
}

// Auto-initialize on DOM content loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeUIUtils);
}