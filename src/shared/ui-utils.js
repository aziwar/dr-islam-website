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

/**
 * Create browser-compatible JavaScript for serving to client
 * Converts ES6 module to immediately-invoked function for browser
 */
export function createUIUtilsJS() {
    return `
// UI-UTILS.JS - Browser JavaScript for Dr. Islam Website
// Wave 1 Foundation Repair - Eliminates "function not defined" errors
(function() {
    'use strict';
    
    console.log('Dr. Islam UI Utils loading...');
    
    /**
     * Breadcrumb Management
     */
    function updateBreadcrumb() {
        const breadcrumb = document.querySelector('.breadcrumb');
        const currentPath = window.location.hash || '#home';
        const pathMap = {
            '#home': 'Home',
            '#services': 'Services', 
            '#about': 'About',
            '#contact': 'Contact',
            '#gallery': 'Gallery'
        };
        
        if (breadcrumb && pathMap[currentPath]) {
            breadcrumb.textContent = pathMap[currentPath];
        }
    }

    /**
     * Mobile Navigation Functions
     */
    function toggleMobileMenu() {
        console.log('toggleMobileMenu called');
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle, .mobile-menu-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (!menu) {
            console.error('Mobile menu not found');
            return;
        }
        
        const isOpen = menu.classList.contains('is-open');
        
        menu.classList.toggle('is-open');
        if (toggle) {
            toggle.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', !isOpen);
        }
        if (backdrop) {
            backdrop.classList.toggle('is-open');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isOpen ? 'hidden' : '';
        
        console.log('Mobile menu toggled:', !isOpen);
    }

    function closeMobileMenu() {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle, .mobile-menu-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (menu) menu.classList.remove('is-open');
        if (toggle) {
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
        if (backdrop) backdrop.classList.remove('is-open');
        
        document.body.style.overflow = '';
    }

    /**
     * Modal Management Functions - CRITICAL FOR BOOKING SYSTEM
     */
    function openBookingModal(service = '') {
        console.log('openBookingModal called with service:', service);
        
        // Try to find existing modal
        let modal = document.querySelector('.booking-modal');
        let overlay = document.querySelector('.modal-overlay');
        
        // Create modal if it doesn't exist
        if (!modal) {
            console.log('Creating booking modal...');
            const success = createBookingModal(service);
            if (!success) {
                console.error('Failed to create booking modal');
                return;
            }
            modal = document.querySelector('.booking-modal');
            overlay = document.querySelector('.modal-overlay');
        }
        
        if (modal && overlay) {
            modal.classList.add('is-active');
            overlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            
            // Pre-fill service if provided
            if (service) {
                const serviceSelect = modal.querySelector('select[name="service"]');
                if (serviceSelect) {
                    serviceSelect.value = service;
                }
            }
            
            // Focus on first form field
            setTimeout(() => {
                const firstInput = modal.querySelector('input:not([type="hidden"])');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
            
            console.log('Booking modal opened');
        } else {
            console.error('Could not open booking modal');
        }
    }
    
    function createBookingModal(service = '') {
        console.log('createBookingModal called with service:', service);
        
        // Check if modal already exists
        let existingModal = document.querySelector('.booking-modal');
        if (existingModal) {
            console.log('Modal already exists, removing old one');
            const existingOverlay = document.querySelector('.modal-overlay');
            if (existingOverlay) {
                existingOverlay.remove();
            }
        }
        
        const modalHTML = \`
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div class="booking-modal" role="dialog" aria-labelledby="booking-title" aria-modal="true" style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h2 id="booking-title" style="margin: 0; color: #BEB093;">Book Your Appointment</h2>
                    <button type="button" class="modal-close" aria-label="Close modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form" action="/api/contact" method="POST">
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="booking-name" style="display: block; margin-bottom: 5px; font-weight: bold;">Full Name *</label>
                            <input type="text" id="booking-name" name="name" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="booking-phone" style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                            <input type="tel" id="booking-phone" name="phone" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="booking-email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
                            <input type="email" id="booking-email" name="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="booking-service" style="display: block; margin-bottom: 5px; font-weight: bold;">Service Needed</label>
                            <select id="booking-service" name="service" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                                <option value="">Select Service</option>
                                <option value="dental-implants">Dental Implants</option>
                                <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                                <option value="root-canal">Root Canal Treatment</option>
                                <option value="general-checkup">General Checkup</option>
                                <option value="emergency">Emergency Treatment</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="booking-message" style="display: block; margin-bottom: 5px; font-weight: bold;">Additional Information</label>
                            <textarea id="booking-message" name="message" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"></textarea>
                        </div>
                        <div class="form-actions" style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button type="button" class="btn btn-secondary modal-close" style="padding: 10px 20px; border: 1px solid #ddd; background: #f5f5f5; color: #666; border-radius: 4px; cursor: pointer;">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" style="padding: 10px 20px; border: none; background: #BEB093; color: white; border-radius: 4px; cursor: pointer;">
                                Send Booking Request
                            </button>
                        </div>
                    </form>
                    <div class="booking-success" style="display: none; text-align: center; padding: 20px;">
                        <div class="success-icon" style="font-size: 48px; color: #4CAF50; margin-bottom: 10px;">[SUCCESS]</div>
                        <h3 style="color: #4CAF50; margin-bottom: 10px;">Booking Request Sent!</h3>
                        <p>Thank you! We will contact you within 2 hours to confirm your appointment.</p>
                    </div>
                </div>
            </div>
        </div>\`;
        
        console.log('Inserting modal HTML...');
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Verify insertion worked
        const insertedModal = document.querySelector('.booking-modal');
        const insertedOverlay = document.querySelector('.modal-overlay');
        
        if (!insertedModal || !insertedOverlay) {
            console.error('Modal insertion failed!');
            return false;
        }
        
        console.log('Modal HTML inserted successfully');
        
        // Bind event listeners
        const closeButtons = document.querySelectorAll('.modal-close');
        const form = document.querySelector('.booking-form');
        
        console.log('Binding', closeButtons.length, 'close buttons');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', closeBookingModal);
        });
        
        insertedOverlay.addEventListener('click', (e) => {
            if (e.target === insertedOverlay) {
                closeBookingModal();
            }
        });
        
        if (form) {
            form.addEventListener('submit', handleBookingSubmission);
            console.log('Form submission handler bound');
        }
        
        console.log('Modal creation completed successfully');
        return true;
    }

    function closeBookingModal() {
        const modal = document.querySelector('.booking-modal');
        const overlay = document.querySelector('.modal-overlay');
        
        if (modal && overlay) {
            modal.classList.remove('is-active');
            overlay.classList.remove('is-active');
            document.body.style.overflow = '';
            console.log('Booking modal closed');
        }
    }

    function showBookingSuccess() {
        const modal = document.querySelector('.booking-modal');
        const form = modal?.querySelector('.booking-form');
        const successMessage = modal?.querySelector('.booking-success');
        
        if (form && successMessage) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                closeBookingModal();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                form.reset();
            }, 5000);
        }
    }
    
    async function handleBookingSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Add loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showBookingSuccess();
                console.log('Booking submitted successfully');
            } else {
                alert('Error: ' + result.error);
                console.error('Booking submission error:', result.error);
            }
        } catch (error) {
            alert('Network error. Please try again.');
            console.error('Booking submission network error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    /**
     * Initialize all functionality on page load
     */
    function initializeUIUtils() {
        console.log('Initializing Dr. Islam UI Utils...');
        
        // Set up mobile menu
        const menuToggle = document.querySelector('.nav-toggle, .mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
            console.log('Mobile menu toggle bound');
        }
        
        // Set up all booking buttons
        const bookingButtons = document.querySelectorAll('[onclick*="openBookingModal"], .btn-book, .book-btn, .cta-button');
        bookingButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const service = btn.dataset.service || btn.getAttribute('data-service') || '';
                openBookingModal(service);
            });
            // Remove inline onclick handlers
            btn.removeAttribute('onclick');
            console.log('Booking button bound:', btn);
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.booking-modal.is-active');
                if (activeModal) {
                    closeBookingModal();
                    return;
                }
                
                const mobileMenu = document.querySelector('.main-nav.is-open');
                if (mobileMenu) {
                    closeMobileMenu();
                    return;
                }
            }
        });
        
        console.log('[SUCCESS] Dr. Islam UI Utils initialized successfully');
    }

    // Make functions globally available for onclick handlers
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.toggleMobileMenu = toggleMobileMenu;
    window.closeMobileMenu = closeMobileMenu;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUIUtils);
    } else {
        initializeUIUtils();
    }

})();

console.log('[SUCCESS] Dr. Islam UI Utils loaded successfully');
`;
}