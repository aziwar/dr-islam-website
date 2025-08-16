// ENHANCEMENTS.CSS.JS - PWA, Accessibility & Advanced Features
// Consolidates: pwa.css.js + deferred.css.js + accessibility-fixes.css.js + ui-enhancements.css.js + mobile-ux.css.js
// ~800 lines → Advanced functionality layer

export const ENHANCEMENTS_CSS = `
/* ===== ADVANCED CONTAINER QUERIES ===== */

/* Service Cards Container Queries */
.services-grid {
    container-type: inline-size;
    container-name: services-container;
}

.service-card {
    container-type: inline-size;
    container-name: service-card;
}

/* Service card adapts to its container size */
@container service-card (min-width: 250px) {
    .service-card {
        padding: var(--space-lg);
    }
    
    .service-card h3 {
        font-size: var(--text-lg);
    }
}

@container service-card (min-width: 350px) {
    .service-card {
        padding: var(--space-xl);
    }
    
    .service-card h3 {
        font-size: var(--text-xl);
    }
    
    .service-card p {
        font-size: var(--text-base);
    }
}

/* Testimonial Cards Container Queries */
.testimonial-grid {
    container-type: inline-size;
    container-name: testimonial-container;
}

.testimonial-card {
    container-type: inline-size;
    container-name: testimonial-card;
}

@container testimonial-card (min-width: 280px) {
    .testimonial-card {
        padding: var(--space-lg);
    }
    
    .testimonial-card h4 {
        font-size: var(--text-lg);
    }
}

@container testimonial-card (min-width: 400px) {
    .testimonial-card {
        padding: var(--space-xl);
    }
    
    .testimonial-card::before {
        font-size: var(--text-3xl);
    }
}

/* Gallery Items Container Queries */
.gallery-grid {
    container-type: inline-size;
    container-name: gallery-container;
}

.gallery-item {
    container-type: inline-size;
    container-name: gallery-item;
}

@container gallery-item (min-width: 200px) {
    .gallery-item img {
        aspect-ratio: 4/3;
        object-fit: cover;
    }
}

@container gallery-item (min-width: 300px) {
    .gallery-item {
        border-radius: var(--radius-lg);
    }
    
    .gallery-item::before {
        font-size: 1.5rem;
    }
}

/* Contact Cards Container Queries */
.contact-cards {
    container-type: inline-size;
    container-name: contact-container;
}

.contact-card {
    container-type: inline-size;
    container-name: contact-card;
}

@container contact-card (min-width: 280px) {
    .contact-card {
        padding: var(--space-lg);
    }
    
    .contact-card h3 {
        font-size: var(--text-lg);
    }
}

@container contact-card (min-width: 350px) {
    .contact-card {
        padding: var(--space-xl);
        text-align: center;
    }
    
    .contact-card .icon {
        font-size: 3rem;
        margin-bottom: var(--space-md);
    }
}

/* ===== ACCESSIBILITY FIXES (WCAG 2.1 AA) ===== */

/* Enhanced focus indicators */
:focus {
    outline: 3px solid var(--primary) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2) !important;
}

a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus,
[role="button"]:focus,
[tabindex]:focus {
    outline: 3px solid var(--primary) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 5px rgba(190, 176, 147, 0.3) !important;
}

/* Color contrast fixes */
body {
    color: #333333 !important;
    background-color: #FFFFFF !important;
}

a {
    color: #1a73e8 !important;
}

a:visited {
    color: #6b3aa0 !important;
}

a:hover,
a:focus {
    color: #174ea6 !important;
}

/* Improved text contrast */
.service-card h3,
.testimonial-card .author-info h4,
.contact-card h3 {
    color: #2c2c2c !important;
}

.case-category,
.author-info span,
.hours-time {
    color: #1565c0 !important;
}

/* Screen reader improvements */
.sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

/* Skip navigation removed per user request */

/* High contrast mode support */
@media (prefers-contrast: high) {
    :focus {
        outline-width: 4px !important;
    }
    
    .btn,
    .cta-button,
    .filter-btn {
        border: 2px solid currentColor !important;
    }
    
    .service-card,
    .gallery-item,
    .testimonial-card {
        border: 2px solid #333 !important;
    }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .hero {
        animation: none !important;
    }
    
    .service-card::before,
    .stat-card::before {
        animation: none !important;
    }
    
    .swipe-indicator {
        animation: none !important;
        opacity: 0.7;
    }
}

/* ===== PWA FEATURES ===== */

/* Install Prompt */
.install-prompt {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    /* Mobile first: full width with margin, centered */
    width: calc(100% - 40px);
    max-width: 400px;
    text-align: center;
    display: none;
    animation: slideUp 0.3s ease-out;
    border: 1px solid var(--primary);
}

.install-prompt.show {
    display: block;
}

.install-prompt h3 {
    margin: 0 0 10px 0;
    color: var(--primary);
    font-size: 1.2rem;
    font-weight: 600;
}

.install-prompt p {
    margin: 0 0 20px 0;
    color: var(--text);
    font-size: 0.95rem;
    line-height: 1.5;
}

.install-prompt button {
    padding: 10px 20px;
    /* Mobile first: full width, vertical stacking */
    margin: 5px 0;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    min-height: 44px;
    font-size: 0.9rem;
}

.install-prompt button:first-of-type {
    background: var(--primary);
    color: white;
}

.install-prompt button:first-of-type:hover {
    background: var(--secondary);
    transform: translateY(-1px);
}

.install-prompt button:last-of-type {
    background: transparent;
    color: var(--text);
    border: 1px solid #ddd;
}

.install-prompt button:last-of-type:hover {
    background: #f5f5f5;
}

@keyframes slideUp {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

/* Desktop PWA enhancements */
@media (min-width: var(--breakpoint-md)) {
    .install-prompt {
        /* Desktop: more compact, left-aligned */
        width: 90%;
        text-align: left;
    }
    
    .install-prompt button {
        /* Desktop: inline buttons */
        width: auto;
        margin: 0 10px 0 0;
    }
}

/* PWA Splash Screen Styles */
.pwa-splash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #BEB093, #777669);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.5s ease;
}

.pwa-splash.hide {
    opacity: 0;
    pointer-events: none;
}

.pwa-splash-content {
    text-align: center;
    color: white;
}

.pwa-splash-logo {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    background: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: var(--primary);
    font-weight: bold;
}

.pwa-splash h2 {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
}

.pwa-splash p {
    margin: 0;
    opacity: 0.9;
    font-size: 1rem;
}

/* ===== DEFERRED LOADING ENHANCEMENTS ===== */

/* Enhanced navigation hover effects */
nav a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

nav a:hover::after {
    width: 80%;
}

/* Enhanced CTA button effects */
.cta-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.cta-button:hover::after {
    width: 350px;
    height: 350px;
}

/* Advanced mobile menu animations */
.mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}

.mobile-menu-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* Lazy loading placeholders */
.lazy-placeholder {
    background: linear-gradient(90deg, 
        rgba(190, 176, 147, 0.1) 0%, 
        rgba(190, 176, 147, 0.2) 50%, 
        rgba(190, 176, 147, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: shimmerPlaceholder 1.5s infinite;
}

@keyframes shimmerPlaceholder {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.lazy-placeholder.loaded {
    animation: none;
    background: none;
}

/* Image fade-in when loaded */
img[data-lazy] {
    opacity: 0;
    transition: opacity 0.3s ease;
}

img[data-lazy].loaded {
    opacity: 1;
}

/* ===== MOBILE UX ENHANCEMENTS ===== */

/* Touch gestures */
.touch-area {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

/* Swipe indicators */
.swipe-indicator {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    opacity: 0;
    animation: swipeHint 3s ease-in-out infinite;
    pointer-events: none;
}

@keyframes swipeHint {
    0%, 90%, 100% { opacity: 0; }
    45% { opacity: 1; }
}

/* Pull-to-refresh */
.pull-refresh {
    position: relative;
    overflow: hidden;
}

.pull-refresh-indicator {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    border-radius: 50%;
    color: white;
}

.pull-refresh.pulling .pull-refresh-indicator {
    top: 20px;
}

.pull-refresh-indicator::before {
    content: '↓';
    font-size: 1.2rem;
    font-weight: bold;
}

/* ===== MOBILE-FIRST TOUCH TARGETS ===== */
/* Enhanced touch targets - 48px minimum for better accessibility (default for all devices) */
.nav-link,
.btn,
button,
a[role="button"],
input[type="submit"],
input[type="button"],
.cta-button,
.filter-btn,
.view-more-btn,
.submit-btn,
.carousel-btn,
.gallery-item,
.lightbox-nav,
.lightbox-close {
    min-height: 48px;
    min-width: 48px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}

/* Improved navigation touch area */
.nav-toggle {
    min-height: 48px;
    min-width: 48px;
    padding: 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.nav-toggle:active {
    background-color: rgba(190, 176, 147, 0.1);
}

/* Touch feedback (all devices benefit from this) */
.btn:active,
button:active,
.cta-button:active,
.filter-btn:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
}

/* Improved form controls (mobile-first, prevents iOS zoom) */
input,
textarea,
select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 12px;
    min-height: 44px;
}

/* Mobile-optimized interactions (show on smaller screens) */
@media (max-width: var(--breakpoint-sm-max)) {
    .mobile-scroll-hint {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.5;
        font-size: 0.8rem;
        pointer-events: none;
    }
    
    .mobile-scroll-hint::after {
        content: '→';
        margin-left: 5px;
    }
    
    .gallery-grid .gallery-item {
        scroll-snap-align: start;
    }
    
    .gallery-grid {
        scroll-snap-type: x mandatory;
        overflow-x: auto;
        display: flex;
        gap: 1rem;
        padding: 0 20px;
    }
}

/* Desktop optimizations (if needed) */
@media (min-width: var(--breakpoint-lg)) {
    /* Desktop can have slightly smaller touch targets if desired */
    /* Currently keeping mobile-first approach for accessibility */
}

/* ===== UI ENHANCEMENTS ===== */

/* Advanced loading states */
.loading-skeleton {
    background: linear-gradient(90deg, 
        rgba(190, 176, 147, 0.1) 25%, 
        rgba(190, 176, 147, 0.2) 50%, 
        rgba(190, 176, 147, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Toast notifications */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--white);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 16px 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
}

.toast.show {
    transform: translateX(0);
}

.toast.success {
    border-color: var(--success);
    background: rgba(40, 167, 69, 0.05);
}

.toast.error {
    border-color: var(--emergency);
    background: rgba(220, 53, 69, 0.05);
}

.toast-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toast-close:hover {
    color: #666;
}

/* RTL Support for Toast */
[dir="rtl"] .toast {
    left: 20px;
    right: auto;
    transform: translateX(-400px);
}

[dir="rtl"] .toast.show {
    transform: translateX(0);
}

/* Advanced tooltips */
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 1000;
}

.tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.tooltip:hover::after,
.tooltip:hover::before {
    opacity: 1;
    visibility: visible;
}

/* Progress indicators */
.progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(190, 176, 147, 0.2);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
}

.progress-bar-fill {
    height: 100%;
    background: var(--primary);
    border-radius: 2px;
    transition: width 0.3s ease;
    position: relative;
}

.progress-bar-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, .2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .2) 50%,
        rgba(255, 255, 255, .2) 75%,
        transparent 75%,
        transparent
    );
    background-size: 50px 50px;
    animation: move 2s linear infinite;
}

@keyframes move {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
}

/* Modal/Dialog enhancements - Mobile First */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    /* Mobile-first: proper padding for safe area */
    padding: var(--space-md);
    z-index: var(--z-modal);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal {
    background: white;
    /* Mobile-first: fluid design */
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    /* Safe area support */
    padding-top: max(var(--space-lg), env(safe-area-inset-top));
    padding-bottom: max(var(--space-lg), env(safe-area-inset-bottom));
    -webkit-overflow-scrolling: touch;
}

/* Desktop modal enhancements */
@media (min-width: var(--breakpoint-md)) {
    .modal {
        padding: 2rem;
        max-height: 80vh;
        border-radius: var(--radius-xl);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
}

.modal-overlay.active .modal {
    transform: scale(1);
}

/* ===== SAFE AREA SUPPORT ===== */
.safe-top {
    padding-top: env(safe-area-inset-top);
}

.safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}

.safe-left {
    padding-left: env(safe-area-inset-left);
}

.safe-right {
    padding-right: env(safe-area-inset-right);
}

/* ===== DARK MODE SUPPORT ===== */
@media (prefers-color-scheme: dark) {
    :root {
        --primary: #D4C4A8;
        --secondary: #8B8471;
        --white: #1a1a1a;
        --light: #2d2d2d;
        --text: #e5e5e5;
    }
    
    body {
        background-color: #1a1a1a !important;
        color: #e5e5e5 !important;
    }
    
    .service-card,
    .gallery-item,
    .testimonial-card,
    .contact-form {
        background: #2d2d2d;
        border: 1px solid #404040;
    }
    
    .install-prompt {
        background: #2d2d2d;
        border-color: var(--primary);
        color: #e5e5e5;
    }
    
    .toast {
        background: #2d2d2d;
        color: #e5e5e5;
    }
    
    .modal {
        background: #2d2d2d;
        color: #e5e5e5;
    }
}

/* ===== PRINT OPTIMIZATIONS ===== */
@media print {
    .install-prompt,
    .toast,
    .modal-overlay,
    .swipe-indicator,
    .pull-refresh-indicator,
    .mobile-scroll-hint {
        display: none !important;
    }
    
    .service-card,
    .gallery-item,
    .testimonial-card {
        break-inside: avoid;
        page-break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ccc;
    }
    
    a {
        color: #000 !important;
        text-decoration: underline !important;
    }
    
    .tooltip::after,
    .tooltip::before {
        display: none;
    }
}

/* ===== UTILITY CLASSES ===== */
.no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-select {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

.full-width {
    width: 100%;
}

.center {
    text-align: center;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fade-in {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

.slide-in-left {
    transform: translateX(-50px);
    opacity: 0;
    animation: slideInLeft 0.5s ease forwards;
}

@keyframes slideInLeft {
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in-right {
    transform: translateX(50px);
    opacity: 0;
    animation: slideInRight 0.5s ease forwards;
}

@keyframes slideInRight {
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* ===== MODERN MICRO-INTERACTIONS ===== */

/* Enhanced Button Animations */
.btn,
.cta-button,
.nav-cta-button,
.filter-btn,
button[type="submit"] {
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, box-shadow;
}

/* Ripple effect for buttons */
.btn::before,
.cta-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: 1;
}

.btn:hover::before,
.cta-button:hover::before {
    width: 300px;
    height: 300px;
}

/* Enhanced button hover states */
.btn:hover,
.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.3);
}

.btn:active,
.cta-button:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
}

/* Modern Form Input Enhancements */
.form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(190, 176, 147, 0.2);
    border-radius: 8px;
    padding: 1rem;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 1);
}

/* Floating label effect */
.form-group.floating-label {
    position: relative;
}

.form-group.floating-label label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: #999;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(255, 255, 255, 0.9);
    padding: 0 0.5rem;
    border-radius: 4px;
    font-size: 16px;
}

.form-group.floating-label input:focus + label,
.form-group.floating-label input:not(:placeholder-shown) + label {
    top: -0.5rem;
    left: 0.75rem;
    font-size: 12px;
    color: var(--primary);
    font-weight: 500;
}

/* Enhanced Card Interactions */
.service-card,
.testimonial-card,
.gallery-item,
.contact-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateZ(0);
    will-change: transform, box-shadow;
    cursor: pointer;
}

.service-card:hover,
.testimonial-card:hover,
.gallery-item:hover,
.contact-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

/* Tilt effect for cards */
.service-card:hover {
    transform: translateY(-8px) perspective(1000px) rotateX(2deg);
}

.testimonial-card:hover {
    transform: translateY(-8px) perspective(1000px) rotateY(1deg);
}

/* Enhanced Loading States */
.loading-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
}

.loading-dots::after,
.loading-dots::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    animation: loadingDots 1.4s infinite ease-in-out;
}

.loading-dots::after {
    animation-delay: 0.16s;
}

.loading-dots .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    animation: loadingDots 1.4s infinite ease-in-out;
    animation-delay: 0.32s;
}

@keyframes loadingDots {
    0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Pulse Loading Animation */
.pulse-loader {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
}

.pulse-loader::before,
.pulse-loader::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--primary);
    animation: pulseWave 2s infinite ease-out;
}

.pulse-loader::after {
    animation-delay: 1s;
}

@keyframes pulseWave {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}

/* Enhanced Navigation Link Animations */
.nav-link {
    position: relative;
    overflow: hidden;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
}

.nav-link:hover::after {
    width: 100%;
}

/* Smooth Reveal Animations */
.reveal-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-on-scroll.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Staggered reveal for multiple items */
.reveal-on-scroll:nth-child(1) { transition-delay: 0.1s; }
.reveal-on-scroll:nth-child(2) { transition-delay: 0.2s; }
.reveal-on-scroll:nth-child(3) { transition-delay: 0.3s; }
.reveal-on-scroll:nth-child(4) { transition-delay: 0.4s; }
.reveal-on-scroll:nth-child(5) { transition-delay: 0.5s; }
.reveal-on-scroll:nth-child(6) { transition-delay: 0.6s; }

/* Modern Toggle Switches */
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background: white;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .toggle-slider {
    background: var(--primary);
}

input:checked + .toggle-slider:before {
    transform: translateX(26px);
}

/* Enhanced Badge Animations */
.badge,
.case-category {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge::before,
.case-category::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
}

.badge:hover::before,
.case-category:hover::before {
    left: 100%;
}

/* Floating Action Button */
.fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 20px rgba(190, 176, 147, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    transform: translateZ(0);
    will-change: transform, box-shadow;
}

.fab:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 30px rgba(190, 176, 147, 0.6);
}

.fab:active {
    transform: scale(0.95);
}

/* Progress Ring */
.progress-ring {
    position: relative;
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
}

.progress-ring circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    r: 35;
    cx: 40;
    cy: 40;
}

.progress-ring .progress-bg {
    stroke: rgba(190, 176, 147, 0.2);
}

.progress-ring .progress-fill {
    stroke: var(--primary);
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Notification Toast Enhanced */
.toast {
    transform: translateX(400px) scale(0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.toast.show {
    transform: translateX(0) scale(1);
}

.toast::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--primary);
    border-radius: 2px 0 0 2px;
}

.toast.success::before {
    background: var(--success);
}

.toast.error::before {
    background: var(--emergency);
}

/* Modern Skeleton Loader */
.skeleton-modern {
    background: linear-gradient(
        90deg,
        rgba(190, 176, 147, 0.1) 0%,
        rgba(190, 176, 147, 0.2) 50%,
        rgba(190, 176, 147, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: skeletonShimmer 1.5s infinite;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.skeleton-modern::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
    );
    animation: skeletonSweep 2s infinite;
}

@keyframes skeletonShimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

@keyframes skeletonSweep {
    0% { left: -100%; }
    100% { left: 100%; }
}

/* Interactive Element States */
.interactive {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    user-select: none;
}

.interactive:hover {
    transform: translateY(-2px);
}

.interactive:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
}

/* Glassmorphism Effects */
.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
    .btn,
    .cta-button,
    .service-card,
    .testimonial-card,
    .gallery-item,
    .contact-card,
    .nav-link,
    .reveal-on-scroll,
    .toggle-slider,
    .fab,
    .toast,
    .interactive,
    .glass {
        transition: none !important;
        animation: none !important;
        transform: none !important;
    }
    
    .btn::before,
    .cta-button::before,
    .nav-link::after,
    .skeleton-modern::after {
        animation: none !important;
    }
}

/* ===== ENHANCED LIGHTBOX - MOBILE FIRST ===== */
.image-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    /* Mobile-first: proper padding for safe areas */
    padding: var(--space-md);
    opacity: 0;
    visibility: hidden;
    transform: translateZ(0);
    will-change: opacity, visibility;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    contain: layout style paint;
    /* Safe area support for mobile devices */
    padding-top: max(var(--space-md), env(safe-area-inset-top));
    padding-bottom: max(var(--space-md), env(safe-area-inset-bottom));
}

.image-lightbox.show {
    opacity: 1;
    visibility: visible;
}

.image-lightbox.hide {
    opacity: 0;
    visibility: hidden;
}

.lightbox-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    cursor: pointer;
}

.lightbox-content {
    position: relative;
    width: 90vw;
    height: 90vh;
    max-width: 1200px;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    contain: layout style paint;
    will-change: transform;
}

.image-lightbox.show .lightbox-content {
    transform: scale(1);
}

.lightbox-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.lightbox-close {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #333;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.lightbox-close:hover,
.lightbox-close:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
    outline: none;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.3);
}

.lightbox-body {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.lightbox-image-container {
    position: relative;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    transition: opacity 0.3s ease;
    will-change: opacity;
}

.lightbox-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    display: none;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #333;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 10;
}

.lightbox-nav:hover,
.lightbox-nav:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
    outline: none;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.3);
}

.lightbox-nav:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
}

.lightbox-prev {
    left: 20px;
}

.lightbox-next {
    right: 20px;
}

.lightbox-footer {
    padding: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0 0 12px 12px;
}

.lightbox-caption {
    flex: 1;
    color: #333;
    font-size: 1rem;
    margin-right: 1rem;
}

.lightbox-counter {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

/* Screen reader only content */
.sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

/* Enhanced Mobile lightbox adjustments */
@media (max-width: var(--breakpoint-sm-max)) {
    .lightbox-content {
        width: 98vw;
        height: 98vh;
        margin: 0;
        border-radius: 0;
    }
    
    .lightbox-nav {
        width: 56px;
        height: 56px;
        font-size: 1.8rem;
        /* Enhanced touch targets for mobile */
        min-width: 48px;
        min-height: 48px;
        -webkit-tap-highlight-color: transparent;
    }
    
    .lightbox-prev {
        left: 8px;
    }
    
    .lightbox-next {
        right: 8px;
    }
    
    .lightbox-close {
        top: 8px;
        right: 8px;
        width: 56px;
        height: 56px;
        font-size: 2rem;
        z-index: 1001;
    }
    
    .lightbox-footer {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
        padding: 1.5rem 1rem;
    }
    
    .lightbox-caption {
        margin-right: 0;
        font-size: 1rem;
        line-height: 1.5;
    }
    
    /* Mobile swipe indicators */
    .lightbox-body::after {
        content: 'Swipe to navigate';
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        opacity: 0;
        animation: swipeHint 4s ease-in-out 2s;
        pointer-events: none;
    }
}

/* RTL Support for Lightbox */
[dir="rtl"] .lightbox-prev {
    right: 20px;
    left: auto;
}

[dir="rtl"] .lightbox-next {
    left: 20px;
    right: auto;
}

[dir="rtl"] .lightbox-footer {
    direction: rtl;
}

[dir="rtl"] .lightbox-caption {
    margin-left: 1rem;
    margin-right: 0;
}

/* Mobile-first RTL adjustments */
@media (max-width: var(--breakpoint-sm-max)) {
    [dir="rtl"] .lightbox-prev {
        right: 8px;
        left: auto;
    }
    
    [dir="rtl"] .lightbox-next {
        left: 8px;
        right: auto;
    }
    
    [dir="rtl"] .lightbox-caption {
        margin-left: 0;
    }
    
    [dir="rtl"] .lightbox-close {
        left: 8px;
        right: auto;
    }
    
    /* RTL swipe indicators */
    [dir="rtl"] .lightbox-body::after {
        content: 'اسحب للتنقل';
    }
}

/* Dark mode lightbox */
@media (prefers-color-scheme: dark) {
    .lightbox-content {
        background: rgba(45, 45, 45, 0.95);
    }
    
    .lightbox-close,
    .lightbox-nav {
        color: #e5e5e5;
        background: rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.2);
    }
    
    .lightbox-footer {
        background: rgba(45, 45, 45, 0.95);
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .lightbox-caption {
        color: #e5e5e5;
    }
    
    .lightbox-counter {
        color: #bbb;
        background: rgba(255, 255, 255, 0.1);
    }
}

/* Performance optimizations */
.image-lightbox * {
    box-sizing: border-box;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .image-lightbox,
    .lightbox-content,
    .lightbox-image,
    .lightbox-nav,
    .lightbox-close {
        transition: none;
        animation: none;
    }
    
    .image-lightbox.show .lightbox-content {
        transform: scale(1);
    }
}

/* ===== GALLERY LIGHTBOX STYLES ===== */

/* Gallery Tabs */
.gallery-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    overflow-x: auto;
}

.gallery-tab {
    background: none;
    border: none;
    padding: 14px 24px;
    min-height: 48px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.gallery-tab:hover,
.gallery-tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
}

/* Dynamic Gallery Grid */
.dynamic-gallery {
    display: grid;
    /* Mobile-first: Single column */
    grid-template-columns: 1fr;
    gap: 15px;
    margin: 15px 0;
}

/* Small mobile: Single column for safety */
@media (min-width: var(--breakpoint-xs)) {
    .dynamic-gallery {
        grid-template-columns: 1fr;
    }
}

/* Medium mobile and up: Responsive grid */
@media (min-width: var(--breakpoint-sm)) {
    .dynamic-gallery {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
}

/* Tablet: Standard layout */
@media (min-width: var(--breakpoint-md)) {
    .dynamic-gallery {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }
}

.gallery-loading {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.gallery-case {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-case:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.case-images {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.before-after-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.before-image, .after-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.before-image img, .after-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
}

.after-image {
    opacity: 0;
}

.gallery-case:hover .after-image {
    opacity: 1;
}

.before-after-labels {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.label {
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
}

.case-info {
    padding: 15px;
}

.case-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.case-category {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.case-description {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
}

.gallery-error {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px 20px;
    color: #d32f2f;
    background: #ffebee;
    border-radius: 8px;
}

.gallery-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

/* Gallery Lightbox */
.gallery-lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    animation: fadeIn 0.3s ease;
}

.gallery-lightbox.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.3);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.3);
}

.lightbox-prev {
    left: -70px;
}

.lightbox-next {
    right: -70px;
}

.lightbox-info {
    position: absolute;
    bottom: -60px;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
}

.lightbox-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
}

.lightbox-category {
    font-size: 14px;
    opacity: 0.8;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Mobile Gallery Styles */
@media (max-width: var(--breakpoint-sm-max)) {
    .gallery-tabs {
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    
    .gallery-tab {
        padding: 14px 16px;
        min-height: 48px;
        font-size: 13px;
    }
    
    .dynamic-gallery {
        grid-template-columns: 1fr;
        gap: 15px;
        margin: 15px 0;
    }
    
    .case-images {
        height: 200px;
    }
    
    .lightbox-content {
        max-width: 95%;
        max-height: 80%;
    }

    .lightbox-close {
        top: -40px;
        right: -10px;
        width: 35px;
        height: 35px;
    }

    .lightbox-nav {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .lightbox-prev {
        left: -50px;
    }

    .lightbox-next {
        right: -50px;
    }

    .lightbox-info {
        bottom: -40px;
    }

    .lightbox-title {
        font-size: 16px;
    }

    .lightbox-category {
        font-size: 12px;
    }
}

/* ===== ADVANCED TOUCH INTERACTIONS ===== */

/* Swipe Gesture Support */
.swipe-container {
    touch-action: pan-x;
    overscroll-behavior-x: contain;
    position: relative;
    overflow: hidden;
}

.swipe-item {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
}

.swipe-item.dragging {
    transition: none;
}

/* Gallery swipe navigation */
.gallery-grid.swipe-enabled {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: var(--space-md);
    padding-bottom: var(--space-sm);
}

.gallery-grid.swipe-enabled .gallery-item {
    flex: 0 0 280px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
}

@media (max-width: var(--breakpoint-sm-max)) {
    .gallery-grid.swipe-enabled .gallery-item {
        flex: 0 0 240px;
    }
}

/* Testimonial swipe support */
.testimonial-grid.swipe-enabled {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: var(--space-lg);
    padding-bottom: var(--space-sm);
}

.testimonial-grid.swipe-enabled .testimonial-card {
    flex: 0 0 320px;
    scroll-snap-align: start;
}

/* Pull-to-refresh support */
.pull-to-refresh {
    position: relative;
    overflow: hidden;
}

.pull-to-refresh-indicator {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    z-index: 1000;
}

.pull-to-refresh.pulling .pull-to-refresh-indicator {
    opacity: 1;
    transform: translateX(-50%) translateY(80px);
}

.pull-to-refresh.refreshing .pull-to-refresh-indicator {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: translateX(-50%) translateY(80px) rotate(0deg); }
    to { transform: translateX(-50%) translateY(80px) rotate(360deg); }
}

/* Enhanced touch feedback */
.touch-feedback {
    position: relative;
    overflow: hidden;
}

.touch-feedback::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(190, 176, 147, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    pointer-events: none;
    z-index: 1;
}

.touch-feedback:active::before {
    width: 300px;
    height: 300px;
}

/* Haptic feedback simulation */
@media (hover: none) and (pointer: coarse) {
    .haptic-light:active {
        animation: haptic-light 0.1s ease-out;
    }
    
    .haptic-medium:active {
        animation: haptic-medium 0.15s ease-out;
    }
    
    .haptic-strong:active {
        animation: haptic-strong 0.2s ease-out;
    }
}

@keyframes haptic-light {
    0% { transform: scale(1); }
    50% { transform: scale(0.98); }
    100% { transform: scale(1); }
}

@keyframes haptic-medium {
    0% { transform: scale(1); }
    25% { transform: scale(0.96); }
    75% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

@keyframes haptic-strong {
    0% { transform: scale(1); }
    20% { transform: scale(0.94); }
    40% { transform: scale(1.04); }
    60% { transform: scale(0.98); }
    80% { transform: scale(1.01); }
    100% { transform: scale(1); }
}

/* Swipe indicators */
.swipe-indicators {
    display: flex;
    justify-content: center;
    gap: var(--space-xs);
    margin-top: var(--space-md);
}

.swipe-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(190, 176, 147, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
}

.swipe-indicator.active {
    background: var(--primary);
    transform: scale(1.2);
}

/* Long press support */
.long-press {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}

.long-press.pressing {
    transform: scale(0.95);
    transition: transform 0.1s ease;
}

.long-press.long-pressed {
    animation: long-press-success 0.3s ease;
}

@keyframes long-press-success {
    0% { transform: scale(0.95); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Scroll momentum enhancement */
.enhanced-scroll {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
}

/* Mobile-only touch enhancements */
@media (hover: none) and (pointer: coarse) {
    /* Larger touch targets on mobile */
    .touch-enhanced {
        min-height: 48px;
        min-width: 48px;
        padding: var(--space-sm);
    }
    
    /* Enhanced button feedback */
    button:active,
    .btn:active,
    [role="button"]:active {
        transform: scale(0.97);
        transition: transform 0.1s ease;
    }
    
    /* Scroll snap for better navigation */
    .scroll-snap-x {
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
    }
    
    .scroll-snap-y {
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
    }
    
    .scroll-snap-item {
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
}

/* ===== ADVANCED FORM ENHANCEMENTS PACKAGE ===== */
/* Real-time validation, smart input features, and enhanced UX */

/* Enhanced Form Container */
.contact-form,
.booking-form,
.appointment-form {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-form:hover,
.booking-form:hover,
.appointment-form:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

/* Advanced Form Groups with Floating Labels */
.form-group {
    position: relative;
    margin-bottom: 2rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 1rem 1rem 1rem 1rem;
    border: 2px solid #E5E7EB;
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1),
                0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
}

/* Floating Label System */
.form-group label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    font-size: 1rem;
    color: #6B7280;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(to right, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 1) 20%, 
        rgba(255, 255, 255, 1) 80%, 
        rgba(255, 255, 255, 0) 100%);
    padding: 0 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 2;
}

.form-group input:focus + label,
.form-group textarea:focus + label,
.form-group select:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label,
.form-group select:not([value=""]) + label,
.form-group.has-value label {
    top: -0.75rem;
    left: 0.75rem;
    font-size: 0.875rem;
    color: var(--primary);
    font-weight: 500;
    background: rgba(255, 255, 255, 1);
    padding: 0 0.5rem;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Real-time Validation States */
.form-group.validating {
    position: relative;
}

.form-group.validating::after {
    content: '';
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary);
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: formSpin 1s linear infinite;
    z-index: 3;
}

.form-group.valid input,
.form-group.valid textarea,
.form-group.valid select {
    border-color: #10B981;
    background: rgba(236, 253, 245, 0.8);
}

.form-group.valid::after {
    content: '✓';
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 20px;
    height: 20px;
    background: #10B981;
    color: white;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    animation: successPulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 3;
}

.form-group.invalid input,
.form-group.invalid textarea,
.form-group.invalid select {
    border-color: #EF4444;
    background: rgba(254, 242, 242, 0.8);
    animation: formShake 0.5s ease-in-out;
}

.form-group.invalid::after {
    content: '!';
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 20px;
    height: 20px;
    background: #EF4444;
    color: white;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    animation: errorPulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 3;
}

/* Error Messages */
.form-group .error-message {
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    right: 0;
    font-size: 0.875rem;
    color: #EF4444;
    padding: 0.25rem 0.75rem;
    background: rgba(254, 242, 242, 0.9);
    border-radius: 6px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(239, 68, 68, 0.2);
    animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 4;
}

.form-group .success-message {
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    right: 0;
    font-size: 0.875rem;
    color: #10B981;
    padding: 0.25rem 0.75rem;
    background: rgba(236, 253, 245, 0.9);
    border-radius: 6px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(16, 185, 129, 0.2);
    animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 4;
}

/* Smart Input Features */
.form-group.phone-input input {
    letter-spacing: 0.5px;
}

.form-group.email-input input {
    text-transform: lowercase;
}

.form-group.name-input input {
    text-transform: capitalize;
}

/* Character Counter */
.form-group .char-counter {
    position: absolute;
    bottom: -1.5rem;
    right: 0;
    font-size: 0.75rem;
    color: #6B7280;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.form-group .char-counter.warning {
    color: #F59E0B;
    background: rgba(255, 251, 235, 0.9);
    border-color: rgba(245, 158, 11, 0.2);
}

.form-group .char-counter.danger {
    color: #EF4444;
    background: rgba(254, 242, 242, 0.9);
    border-color: rgba(239, 68, 68, 0.2);
}

/* Textarea Auto-resize */
.form-group textarea {
    resize: none;
    min-height: 120px;
    transition: height 0.3s ease;
}

/* Enhanced Select Styling */
.form-group select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 3rem;
}

.form-group select:focus {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BEB093' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}

/* Submit Button Enhanced */
.submit-btn,
.form-submit-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--primary) 0%, #D4C5A3 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
}

.submit-btn::before,
.form-submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.2) 50%, 
        transparent 100%);
    transition: left 0.6s ease;
}

.submit-btn:hover::before,
.form-submit-btn:hover::before {
    left: 100%;
}

.submit-btn:hover,
.form-submit-btn:hover {
    background: linear-gradient(135deg, #D4C5A3 0%, var(--primary) 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(190, 176, 147, 0.4);
}

.submit-btn:active,
.form-submit-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(190, 176, 147, 0.3);
}

/* Loading State */
.submit-btn.loading,
.form-submit-btn.loading {
    pointer-events: none;
    opacity: 0.8;
}

.submit-btn.loading::after,
.form-submit-btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: formSpin 1s linear infinite;
}

.submit-btn.loading .btn-text,
.form-submit-btn.loading .btn-text {
    opacity: 0;
}

/* Success State */
.submit-btn.success,
.form-submit-btn.success {
    background: #10B981;
    color: white;
}

.submit-btn.success::after,
.form-submit-btn.success::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    font-weight: bold;
    animation: successBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Form Row Layout */
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

@media (max-width: 640px) {
    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }
    
    .form-row .form-group {
        margin-bottom: 2rem;
    }
}

/* Form Progress Indicator */
.form-progress {
    position: relative;
    height: 4px;
    background: #E5E7EB;
    border-radius: 2px;
    margin-bottom: 2rem;
    overflow: hidden;
}

.form-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary) 0%, #D4C5A3 100%);
    border-radius: 2px;
    width: 0%;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.form-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        transparent 100%);
    animation: progressShine 2s infinite ease-in-out;
}

/* Smart Suggestions */
.form-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 0.25rem;
}

.form-suggestion-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #F3F4F6;
}

.form-suggestion-item:last-child {
    border-bottom: none;
}

.form-suggestion-item:hover,
.form-suggestion-item.highlighted {
    background: rgba(190, 176, 147, 0.1);
}

/* Form Enhancement Animations */
@keyframes formSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes formShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes successPulse {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

@keyframes errorPulse {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes successBounce {
    0% { transform: translate(-50%, -50%) scale(0); }
    50% { transform: translate(-50%, -50%) scale(1.3); }
    100% { transform: translate(-50%, -50%) scale(1); }
}

@keyframes progressShine {
    0% { left: -100%; }
    100% { left: 100%; }
}

/* RTL Support for Forms */
[dir="rtl"] .form-group label {
    left: auto;
    right: 1rem;
}

[dir="rtl"] .form-group input:focus + label,
[dir="rtl"] .form-group textarea:focus + label,
[dir="rtl"] .form-group select:focus + label,
[dir="rtl"] .form-group input:not(:placeholder-shown) + label,
[dir="rtl"] .form-group textarea:not(:placeholder-shown) + label,
[dir="rtl"] .form-group select:not([value=""]) + label,
[dir="rtl"] .form-group.has-value label {
    left: auto;
    right: 0.75rem;
}

[dir="rtl"] .form-group.validating::after,
[dir="rtl"] .form-group.valid::after,
[dir="rtl"] .form-group.invalid::after {
    right: auto;
    left: 1rem;
}

[dir="rtl"] .form-group select {
    background-position: left 1rem center;
    padding-right: 1rem;
    padding-left: 3rem;
}

[dir="rtl"] .form-group .char-counter {
    right: auto;
    left: 0;
}
`;