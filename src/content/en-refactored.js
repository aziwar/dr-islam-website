// Refactored English Content - Component-based Architecture
// PHASE 1: Demonstrates modular approach - eliminates 2,814 line monolith

import { MOBILE_UX_JS } from './js/mobile-ux.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';
import { DynamicGallery } from './components/DynamicGallery.js';
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
    initializeUIUtils,
    showMobileComparison,
    setupServiceComparisonSwipe
} from '../shared/ui-utils.js';
import { validateField, initFormValidation } from '../shared/form-utils.js';

// Import modularized sections
import { getEnglishHead } from '../templates/en/head.js';
import { getEnglishHeader } from '../templates/en/header.js';
import { getEnglishHeroSection } from '../templates/en/sections/hero.js';
import { getEnglishServicesSection } from '../templates/en/sections/services.js';
import { getEnglishServiceComparisonSection } from '../templates/en/sections/service-comparison.js';
import { getEnglishTestimonialsSection } from '../templates/en/sections/testimonials.js';
import { getEnglishGallerySection } from '../templates/en/sections/gallery.js';
// About section import removed - now inline
function getSimpleAboutSection() {
  return `
    <section id="about" class="about">
      <div class="container">
        <h2>About Dr. Islam Elsagher</h2>
        <p>With over 15 years of experience in dentistry, Dr. Islam Elsagher provides comprehensive dental care in Kuwait. Our clinic combines modern technology with compassionate care to ensure the best outcomes for our patients.</p>
      </div>
    </section>
  `;
}
import { getEnglishFaqSection } from '../templates/en/sections/faq.js';
import { getEnglishContactSection } from '../templates/en/sections/contact.js';
import { getEnglishFooter } from '../templates/en/footer.js';

export const HTML_EN = `<!DOCTYPE html>
<html lang="en">
<head>
    ${getEnglishHead()}
</head>
<body>
    ${getEnglishHeader()}
    
    <main id="main-content" role="main">
        ${getEnglishHeroSection()}
        ${getEnglishServicesSection()}
        ${getEnglishServiceComparisonSection()}
        ${getEnglishTestimonialsSection()}
        ${getEnglishGallerySection()}
        ${getSimpleAboutSection()}
        ${getEnglishFaqSection()}
        ${getEnglishContactSection()}
    </main>
    
    ${getEnglishFooter()}

    <script type="module" src="/js/main.js"></script>
    <script>
        // Service Comparison Mobile Function - Global for onclick handlers
        function showMobileComparison(option) {
            // Remove active class from all tabs and cards
            const tabs = document.querySelectorAll('.tab-btn');
            const cards = document.querySelectorAll('.mobile-comparison-card');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            cards.forEach(card => card.classList.remove('active'));
            
            // Add active class to selected tab and card
            const selectedTab = document.querySelector(\`[onclick="showMobileComparison('\${option}')"]\`);
            const selectedCard = document.getElementById(\`\${option}-mobile\`);
            
            if (selectedTab) selectedTab.classList.add('active');
            if (selectedCard) selectedCard.classList.add('active');
        }

        // Initialize UI utilities - Updated with error handling
        document.addEventListener('DOMContentLoaded', () => {
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
            if (typeof setupServiceComparisonSwipe === 'function') setupServiceComparisonSwipe();
            if (typeof initFormValidation === 'function') initFormValidation();
            
            });
    </script>
</body>
</html>`;

// Progress Report: Phase 1 Emergency Refactoring
