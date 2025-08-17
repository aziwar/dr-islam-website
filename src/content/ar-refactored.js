// Refactored Arabic Content - Component-based Architecture
// PHASE 2: Demonstrates modular approach - eliminates 2,079 line monolith

import { MOBILE_UX_JS } from './js/mobile-ux.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';
import { 
    toggleMobileMenu, 
    closeMobileMenu,
    updateBreadcrumb,
    openBookingModal,
    closeBookingModal,
    showBookingSuccess,
    setupLazyLoading,
    setupGalleryTouch,
    setupBeforeAfterTouch,
    setupSmoothScroll,
    setupKeyboardNav,
    setupFormEnhancements,
    setupFormValidation,
    addLoadingState,
    removeLoadingState,
    initializeUIUtils
} from '../shared/ui-utils.js';
import { validateField, initFormValidation } from '../shared/form-utils.js';

// Import modularized Arabic sections
import { getArabicHead } from '../templates/ar/head.js';
import { getArabicHeader } from '../templates/ar/header.js';
import { getArabicHeroSection } from '../templates/ar/sections/hero.js';
import { getArabicServicesSection } from '../templates/ar/sections/services.js';
import { getArabicServiceComparisonSection } from '../templates/ar/sections/service-comparison.js';
import { getArabicTestimonialsSection } from '../templates/ar/sections/testimonials.js';
import { getArabicGallerySection } from '../templates/ar/sections/gallery.js';
import { getArabicAboutSection } from '../templates/ar/sections/about.js';
import { getArabicFaqSection } from '../templates/ar/sections/faq.js';
import { getArabicContactSection } from '../templates/ar/sections/contact.js';
import { getArabicFooter } from '../templates/ar/footer.js';

export const HTML_AR = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    ${getArabicHead()}
</head>
<body>
    ${getArabicHeader()}
    
    <main id="main-content" role="main">
        ${getArabicHeroSection()}
        ${getArabicServicesSection()}
        ${getArabicServiceComparisonSection()}
        ${getArabicTestimonialsSection()}
        ${getArabicGallerySection()}
        ${getArabicAboutSection()}
        ${getArabicFaqSection()}
        ${getArabicContactSection()}
    </main>
    
    ${getArabicFooter()}

    <!-- JavaScript modules -->
    <script type="module" src="/js/main.js"></script>
    <script>
        // Initialize UI utilities for RTL - Updated with error handling
        document.addEventListener('DOMContentLoaded', () => {
            // Set RTL mode
            document.body.classList.add('rtl-mode');
            
            // Core functionality that should always work
            if (typeof initializeUIUtils === 'function') {
                initializeUIUtils();
            } else {
                }
            
            // Optional enhancements with fallbacks
            if (typeof setupLazyLoading === 'function') setupLazyLoading();
            if (typeof setupSmoothScroll === 'function') setupSmoothScroll();
            if (typeof setupKeyboardNav === 'function') setupKeyboardNav();
            if (typeof setupFormEnhancements === 'function') setupFormEnhancements();
            if (typeof setupFormValidation === 'function') setupFormValidation();
            if (typeof setupGalleryTouch === 'function') setupGalleryTouch();
            if (typeof setupBeforeAfterTouch === 'function') setupBeforeAfterTouch();
            if (typeof initFormValidation === 'function') initFormValidation();
            
            ');
        });
    </script>
</body>
</html>`;

// Progress Report: Phase 2 Arabic Refactoring
