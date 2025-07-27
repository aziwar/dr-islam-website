// Responsive CSS - Media queries and utilities (~500 lines)
export const RESPONSIVE_CSS = `
/* Responsive - Enhanced Mobile Support */
@media (max-width: 768px) {
    /* Logo adjustments */
    .logo-img {
        height: 40px;
        max-width: 150px;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    /* Hide desktop nav on mobile (will be overridden by desktop media query) */
    nav > ul {
        display: none !important;
    }
    
    /* Mobile Navigation */
    .mobile-menu-toggle {
        display: block;
    }
    
    nav {
        position: relative;
    }
    
    /* Mobile Navigation - Hidden by default */
    #mobileMenu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transition: right 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex !important;
    }
    
    /* Mobile Menu Backdrop */
    .mobile-menu-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .mobile-menu-backdrop.active {
        opacity: 1;
        visibility: visible;
    }
    
    #mobileMenu.active {
        right: 0;
    }
    
    nav a {
        font-size: 1.2rem;
        padding: 15px 30px;
        min-height: 48px;
        display: flex;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Hero Mobile */
    .hero {
        padding: 60px 5%;
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
    
    h1 {
        font-size: 2rem;
        line-height: 1.3;
    }
    
    .subtitle {
        font-size: 1rem;
    }
    
    /* Touch-friendly CTA */
    .cta-button {
        padding: 20px 45px;
        font-size: 1.1rem;
        min-height: 56px;
    }
    
    /* Service Cards Mobile */
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .service-card {
        padding: 2rem;
    }
    
    /* Remove hover effects on mobile */
    .service-card:hover {
        transform: none;
    }
    
    /* About Section */
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .doctor-image {
        max-width: 250px;
        margin: 0 auto;
    }
    
    /* Stats Mobile */
    .stats {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .stat-card {
        min-height: auto;
        padding: 1.5rem;
    }
    
    /* Testimonials Mobile */
    .testimonial-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    /* Gallery Mobile */
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-item {
        height: 300px;
    }
    
    .before-after-slider {
        width: 6px;
    }
    
    /* FAQ Mobile */
    .faq-item h3 {
        font-size: 1rem;
        padding: 15px 0;
        min-height: 48px;
    }
    
    /* Contact Cards Mobile */
    .contact-cards {
        grid-template-columns: 1fr;
    }
    
    /* Trust Badges */
    .trust-badges {
        flex-direction: column;
        gap: 1rem;
    }
    
    .badge {
        font-size: 0.9rem;
        padding: 10px 20px;
        width: 100%;
        max-width: 250px;
    }
    
    /* Mobile WhatsApp Button - Maximum Specificity */
    body .sticky-book,
    body a.sticky-book,
    html body .sticky-book,
    html body a.sticky-book {
        bottom: 80px !important;
        right: 20px !important;
        font-size: 1rem !important;
        padding: 15px 25px !important;
        min-width: auto !important;
        z-index: 997 !important;
        position: fixed !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Mobile Emergency Banner - Maximum Specificity */
    body .emergency-banner,
    body p.emergency-banner,
    html body .emergency-banner,
    html body p.emergency-banner {
        font-size: 18px !important;
        padding: 8px 10px !important;
        min-height: 35px !important;
        line-height: 1.4 !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Header adjustments */
    header {
        top: 35px;
        padding: 0.5rem 5%;
    }
    
    /* Working Hours Mobile */
    .hours-grid {
        gap: 0.5rem;
    }
    
    /* Better Arabic readability on mobile */
    .ar body {
        font-size: 17px;
        line-height: 1.9;
    }
    
    .ar p {
        margin-bottom: 1.2rem;
    }
    
    /* PWA Install Prompt Mobile */
    .install-prompt {
        width: calc(100% - 40px);
        flex-direction: column;
        text-align: center;
    }
    
    .install-prompt button {
        width: 100%;
    }
}

/* RTL Mobile Support */
@media (max-width: 768px) {
    [dir="rtl"] #mobileMenu {
        left: auto;
        right: -100%;
    }
    
    [dir="rtl"] #mobileMenu.active {
        right: 0;
        left: auto;
    }
    
    [dir="rtl"] .sticky-book {
        right: 20px;
        left: auto;
    }
    
    [dir="rtl"] .mobile-menu-toggle {
        margin-right: auto;
        margin-left: 0;
    }
}

/* Small Mobile Screens */
@media (max-width: 480px) {
    h1 {
        font-size: 1.75rem;
    }
    
    .cta-button {
        width: 100%;
        max-width: 300px;
    }
    
    .service-card {
        padding: 1.5rem;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .emergency-banner {
        font-size: 0.75rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .gallery-item {
        position: relative;
        touch-action: pan-y;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :focus {
        outline-width: 4px;
    }
    
    .btn {
        border: 2px solid currentColor;
    }
}

/* Error States */
.error {
    border-color: var(--emergency) !important;
    background-color: rgba(220, 53, 69, 0.05);
}

.error-message {
    color: var(--emergency);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.error-message::before {
    content: '⚠️';
}

/* Success states */
.success {
    border-color: var(--success) !important;
    background-color: rgba(40, 167, 69, 0.05);
}

.success-message {
    color: var(--success);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.success-message::before {
    content: '✓';
}

/* Responsive Utilities */
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

/* Prevent layout shift from scrollbar */
html {
    overflow-y: scroll;
}

/* Safe area insets for modern phones */
.safe-top {
    padding-top: env(safe-area-inset-top);
}

.safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}

/* PWA Install Prompt Styles */
.install-prompt {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 15px;
    animation: slideUp 0.3s ease-out;
}

.install-prompt p {
    margin: 0;
    font-weight: 600;
    color: var(--text);
}

.install-prompt button {
    padding: 12px 24px;
    min-height: 44px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.install-prompt button:first-of-type {
    background: var(--primary);
    color: white;
}

.install-prompt button:first-of-type:hover {
    background: var(--secondary);
}

.install-prompt button:last-of-type {
    background: transparent;
    color: var(--text);
    border: 1px solid #ddd;
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

/* Image fade-in when loaded */
img[loading="lazy"] {
    background: var(--light);
}

/* Tablet specific styles */
@media (min-width: 769px) and (max-width: 1024px) {
    /* Show mobile menu toggle on tablets */
    .mobile-menu-toggle {
        display: flex !important;
    }
    
    /* Hide desktop navigation on tablets */
    nav > ul {
        display: none !important;
    }
    
    #mobileMenu {
        display: flex !important;
    }
    
    /* Adjust tablet menu styling */
    #mobileMenu {
        width: 60%;
    }
    
    nav a {
        font-size: 1.1rem;
        padding: 12px 20px;
    }
}

/* Desktop specific styles - Override mobile rules with ultra-high specificity */
@media (min-width: 1025px) {
    /* Force desktop navigation visible - Ultra high specificity */
    html body header nav > ul[class],
    html body header nav > ul,
    html body nav > ul[class],
    html body nav > ul,
    body header nav > ul,
    header nav > ul,
    nav > ul {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    /* Hide mobile menu on desktop */
    .mobile-menu-toggle {
        display: none !important;
    }
    
    #mobileMenu {
        display: none !important;
    }
    
    .mobile-menu-backdrop {
        display: none !important;
    }
}

/* Large screens */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .services-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .testimonial-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .contact-info {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* Print styles */
@media print {
    .emergency-banner,
    .sticky-book,
    .mobile-menu-toggle,
    .install-prompt {
        display: none !important;
    }
    
    header {
        position: static;
        background: white;
    }
    
    .gallery-item {
        page-break-inside: avoid;
    }
    
    a {
        text-decoration: underline;
    }
    
    body {
        font-size: 12pt;
        line-height: 1.5;
    }
}`;