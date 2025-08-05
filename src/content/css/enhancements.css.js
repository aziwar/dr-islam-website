// ENHANCEMENTS.CSS.JS - PWA, Accessibility & Advanced Features
// Consolidates: pwa.css.js + deferred.css.js + accessibility-fixes.css.js + ui-enhancements.css.js + mobile-ux.css.js
// ~800 lines → Advanced functionality layer

export const ENHANCEMENTS_CSS = `
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

/* Skip navigation */
.skip-nav {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 4px 0;
    z-index: 1000;
    transition: top 0.3s ease;
}

.skip-nav:focus {
    top: 0;
}

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
    max-width: 400px;
    width: 90%;
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
    margin: 0 10px 0 0;
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

/* Mobile PWA adjustments */
@media (max-width: 768px) {
    .install-prompt {
        width: calc(100% - 40px);
        flex-direction: column;
        text-align: center;
    }
    
    .install-prompt button {
        width: 100%;
        margin: 5px 0;
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

/* Enhanced touch targets and mobile optimization */
@media (max-width: 768px) {
    /* Enhanced touch targets - 48px minimum for better accessibility */
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
    
    /* Improved mobile menu touch area */
    .mobile-menu-toggle {
        min-height: 48px;
        min-width: 48px;
        padding: 12px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }
    
    .mobile-menu-toggle:active {
        background-color: rgba(190, 176, 147, 0.1);
    }
    
    /* Touch feedback */
    .btn:active,
    button:active,
    .cta-button:active,
    .filter-btn:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    /* Improved form controls */
    input,
    textarea,
    select {
        font-size: 16px; /* Prevents zoom on iOS */
        padding: 12px;
        min-height: 44px;
    }
    
    /* Mobile-specific interactions */
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

/* Modal/Dialog enhancements */
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
    z-index: 1000;
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
    border-radius: 10px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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

/* ===== ENHANCED LIGHTBOX ===== */
.image-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: translateZ(0);
    will-change: opacity, visibility;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    contain: layout style paint;
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
@media (max-width: 768px) {
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

@media (max-width: 768px) {
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
    padding: 12px 24px;
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
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
@media (max-width: 768px) {
    .gallery-tabs {
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    
    .gallery-tab {
        padding: 10px 16px;
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
`;