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
        <div class="modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
            <div class="booking-modal" role="dialog" aria-labelledby="booking-title" aria-modal="true" style="background: white; border-radius: 12px; padding: 25px; max-width: 520px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <h2 id="booking-title" style="margin: 0; color: #BEB093; font-size: 1.5rem;">Book Your Appointment</h2>
                    <button type="button" class="modal-close" aria-label="Close modal" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #666; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s;">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form" action="/api/contact" method="POST" novalidate>
                        <div class="form-group" style="margin-bottom: 20px; position: relative;">
                            <label for="booking-name" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Full Name *</label>
                            <input type="text" id="booking-name" name="name" required 
                                   style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; transition: border-color 0.3s; box-sizing: border-box;"
                                   aria-describedby="name-error">
                            <div class="error-message" id="name-error" role="alert" style="color: #e74c3c; font-size: 14px; margin-top: 5px; display: none;"></div>
                        </div>
                        <div class="form-group" style="margin-bottom: 20px; position: relative;">
                            <label for="booking-phone" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Phone Number *</label>
                            <input type="tel" id="booking-phone" name="phone" required 
                                   style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; transition: border-color 0.3s; box-sizing: border-box;"
                                   aria-describedby="phone-error" placeholder="01X-XXXX-XXXX">
                            <div class="error-message" id="phone-error" role="alert" style="color: #e74c3c; font-size: 14px; margin-top: 5px; display: none;"></div>
                        </div>
                        <div class="form-group" style="margin-bottom: 20px; position: relative;">
                            <label for="booking-email" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Email</label>
                            <input type="email" id="booking-email" name="email" 
                                   style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; transition: border-color 0.3s; box-sizing: border-box;"
                                   aria-describedby="email-error" placeholder="your@email.com">
                            <div class="error-message" id="email-error" role="alert" style="color: #e74c3c; font-size: 14px; margin-top: 5px; display: none;"></div>
                        </div>
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label for="booking-service" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Service Needed</label>
                            <select id="booking-service" name="service" style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;">
                                <option value="">Select Service</option>
                                <option value="dental-implants">Dental Implants</option>
                                <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                                <option value="root-canal">Root Canal Treatment</option>
                                <option value="general-checkup">General Checkup</option>
                                <option value="emergency">Emergency Treatment</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 25px;">
                            <label for="booking-message" style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">Additional Information</label>
                            <textarea id="booking-message" name="message" rows="4" 
                                     style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 16px; font-family: inherit; box-sizing: border-box;"
                                     placeholder="Any specific concerns or preferred appointment times..."></textarea>
                        </div>
                        <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end;">
                            <button type="button" class="btn btn-secondary modal-close" 
                                   style="padding: 12px 24px; border: 2px solid #ddd; background: #f8f9fa; color: #666; border-radius: 6px; cursor: pointer; font-size: 16px; transition: all 0.3s;">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" 
                                   style="padding: 12px 24px; border: none; background: #BEB093; color: white; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.3s; position: relative; min-width: 180px;">
                                <span class="btn-text">Send Booking Request</span>
                                <div class="loading-spinner" style="display: none; width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;">
                                </div>
                            </button>
                        </div>
                    </form>
                    <div class="booking-success" style="display: none; text-align: center; padding: 30px 20px;">
                        <div class="success-icon" style="width: 64px; height: 64px; background: #4CAF50; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold;">✓</div>
                        <h3 style="color: #4CAF50; margin-bottom: 15px; font-size: 1.4rem;">Booking Request Sent!</h3>
                        <p style="color: #666; line-height: 1.5;">Thank you! We will contact you within 2 hours to confirm your appointment.</p>
                    </div>
                    <div class="booking-error" style="display: none; text-align: center; padding: 20px; background: #fef2f2; border-radius: 6px; border-left: 4px solid #e74c3c;">
                        <h4 style="color: #e74c3c; margin: 0 0 10px 0;">Booking Failed</h4>
                        <p class="error-text" style="color: #666; margin: 0;"></p>
                        <button type="button" class="retry-btn" style="margin-top: 15px; padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .booking-form input:focus, .booking-form textarea:focus, .booking-form select:focus {
                outline: none;
                border-color: #BEB093 !important;
                box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1) !important;
            }
            .booking-form input.valid {
                border-color: #27ae60 !important;
            }
            .booking-form input.invalid {
                border-color: #e74c3c !important;
                background-color: #fef9f9 !important;
            }
            .modal-close:hover {
                background: #f5f5f5 !important;
            }
            .btn:hover {
                transform: translateY(-1px);
            }
            .btn-secondary:hover {
                background: #e9ecef !important;
            }
            .btn-primary:hover {
                background: #a89680 !important;
            }
            .btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none !important;
            }
        </style>\`;
        
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
            
            // Add real-time validation
            setupFormValidation(form);
            console.log('Form submission handler and validation bound');
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
    
    // Enhanced form validation functions
    function setupFormValidation(form) {
        const nameInput = form.querySelector('#booking-name');
        const phoneInput = form.querySelector('#booking-phone');
        const emailInput = form.querySelector('#booking-email');
        
        if (nameInput) {
            nameInput.addEventListener('blur', () => validateName(nameInput));
            nameInput.addEventListener('input', () => clearValidation(nameInput));
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => validatePhone(phoneInput));
            phoneInput.addEventListener('input', () => clearValidation(phoneInput));
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateEmail(emailInput));
            emailInput.addEventListener('input', () => clearValidation(emailInput));
        }
    }
    
    function validateName(input) {
        const value = input.value.trim();
        const errorDiv = document.getElementById('name-error');
        
        if (!value) {
            showFieldError(input, errorDiv, 'Full name is required');
            return false;
        } else if (value.length < 2) {
            showFieldError(input, errorDiv, 'Please enter your full name');
            return false;
        } else {
            showFieldSuccess(input, errorDiv);
            return true;
        }
    }
    
    function validatePhone(input) {
        const value = input.value.trim();
        const errorDiv = document.getElementById('phone-error');
        
        if (!value) {
            showFieldError(input, errorDiv, 'Phone number is required');
            return false;
        } else if (!/^[0-9+\-\s\(\)]{10,}$/.test(value)) {
            showFieldError(input, errorDiv, 'Please enter a valid phone number');
            return false;
        } else {
            showFieldSuccess(input, errorDiv);
            return true;
        }
    }
    
    function validateEmail(input) {
        const value = input.value.trim();
        const errorDiv = document.getElementById('email-error');
        
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showFieldError(input, errorDiv, 'Please enter a valid email address');
            return false;
        } else {
            showFieldSuccess(input, errorDiv);
            return true;
        }
    }
    
    function showFieldError(input, errorDiv, message) {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        input.setAttribute('aria-invalid', 'true');
    }
    
    function showFieldSuccess(input, errorDiv) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorDiv.style.display = 'none';
        input.setAttribute('aria-invalid', 'false');
    }
    
    function clearValidation(input) {
        input.classList.remove('invalid', 'valid');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
        }
        input.removeAttribute('aria-invalid');
    }
    
    function validateFormBeforeSubmit(form) {
        const nameInput = form.querySelector('#booking-name');
        const phoneInput = form.querySelector('#booking-phone');
        const emailInput = form.querySelector('#booking-email');
        
        const nameValid = validateName(nameInput);
        const phoneValid = validatePhone(phoneInput);
        const emailValid = validateEmail(emailInput);
        
        return nameValid && phoneValid && emailValid;
    }

    async function handleBookingSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        
        // Validate form before submission
        if (!validateFormBeforeSubmit(form)) {
            console.log('Form validation failed');
            return;
        }
        
        // Enhanced loading state
        btnText.style.display = 'none';
        spinner.style.display = 'block';
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
                
                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    clearAllValidation(form);
                }, 2000);
            } else {
                showBookingError(result.error || 'Submission failed. Please try again.');
                console.error('Booking submission error:', result.error);
            }
        } catch (error) {
            showBookingError('Network error. Please check your connection and try again.');
            console.error('Booking submission network error:', error);
        } finally {
            // Restore button state
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    
    function showBookingError(message) {
        const form = document.querySelector('.booking-form');
        const errorDiv = document.querySelector('.booking-error');
        const errorText = errorDiv.querySelector('.error-text');
        const retryBtn = errorDiv.querySelector('.retry-btn');
        
        if (form && errorDiv && errorText) {
            form.style.display = 'none';
            errorText.textContent = message;
            errorDiv.style.display = 'block';
            
            retryBtn.onclick = () => {
                errorDiv.style.display = 'none';
                form.style.display = 'block';
            };
        }
    }
    
    function clearAllValidation(form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => clearValidation(input));
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

    // Make functions globally available for onclick handlers - CRITICAL FIX
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.toggleMobileMenu = toggleMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
    window.createBookingModal = createBookingModal;
    
    // Debug: Verify global functions are assigned
    console.log('Global function assignments:');
    console.log('- openBookingModal:', typeof window.openBookingModal);
    console.log('- createBookingModal:', typeof window.createBookingModal);
    console.log('- toggleMobileMenu:', typeof window.toggleMobileMenu);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUIUtils);
    } else {
        initializeUIUtils();
    }

    // Image fallback system for missing images
    function setupImageFallbacks() {
        // Create placeholders for missing case study images
        const placeholders = {
            'real-case1.webp': generateCaseStudyPlaceholder(1, 'before'),
            'case1-after.webp': generateCaseStudyPlaceholder(1, 'after'),
            'real-case2.webp': generateCaseStudyPlaceholder(2, 'before'),
            'case2-after.webp': generateCaseStudyPlaceholder(2, 'after'),
            'real-case3.webp': generateCaseStudyPlaceholder(3, 'before'),
            'case1-before.webp': generateCaseStudyPlaceholder(1, 'before'),
            'case2-before.webp': generateCaseStudyPlaceholder(2, 'before'),
            'case3-after.webp': generateCaseStudyPlaceholder(3, 'after')
        };
        
        // Handle broken images
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                const filename = img.src.split('/').pop();
                if (placeholders[filename]) {
                    img.src = placeholders[filename];
                    img.classList.add('placeholder-image');
                }
            }
        }, true);
    }
    
    function generateCaseStudyPlaceholder(caseNumber, type) {
        const width = 300;
        const height = 200;
        const svg = \`
            <svg width="\${width}" height="\${height}" viewBox="0 0 \${width} \${height}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="caseGradient\${caseNumber}\${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:\${type === 'before' ? '#E8E8E8' : '#BEB093'};stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:\${type === 'before' ? '#D3D3D3' : '#D4C5A3'};stop-opacity:0.6" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#caseGradient\${caseNumber}\${type})"/>
                <rect x="20" y="20" width="\${width-40}" height="\${height-40}" fill="white" opacity="0.9" rx="10"/>
                
                <path d="M\${width/2-15} 40 C\${width/2-10} 35, \${width/2+10} 35, \${width/2+15} 40 
                         C\${width/2+17} 45, \${width/2+17} 60, \${width/2+15} 75 
                         C\${width/2+10} 85, \${width/2-10} 85, \${width/2-15} 75 
                         C\${width/2-17} 60, \${width/2-17} 45, \${width/2-15} 40 Z" 
                      fill="\${type === 'before' ? '#999' : '#BEB093'}" opacity="0.8"/>
                
                <text x="\${width/2}" y="\${height*0.65}" text-anchor="middle" fill="#333" 
                      font-family="Arial" font-size="14" font-weight="bold">
                    Case \${caseNumber} - \${type.charAt(0).toUpperCase() + type.slice(1)}
                </text>
                <text x="\${width/2}" y="\${height*0.8}" text-anchor="middle" fill="#666" 
                      font-family="Arial" font-size="12">
                    \${type === 'before' ? 'Initial Condition' : 'Treatment Result'}
                </text>
            </svg>
        \`;
        return \`data:image/svg+xml;charset=utf-8,\${encodeURIComponent(svg)}\`;
    }
    
    // Setup image fallbacks when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupImageFallbacks);
    } else {
        setupImageFallbacks();
    }

})();

console.log('[SUCCESS] Dr. Islam UI Utils loaded successfully');
`;
}