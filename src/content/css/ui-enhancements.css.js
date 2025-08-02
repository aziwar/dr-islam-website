/**
 * UI/UX Enhancement Module for Dr. Islam Dental Website
 * Fixes mobile touch targets, improves accessibility, and enhances visual design
 */

export const UI_ENHANCEMENTS_CSS = `
/* Mobile Touch Target Improvements */
@media (max-width: 768px) {
    /* Ensure all interactive elements meet 44x44px minimum */
    a, button, input[type="submit"], input[type="button"], 
    .btn, .cta-button, .filter-btn, .view-more-btn, .submit-btn,
    .mobile-menu-toggle, .theme-toggle, .lang-switch,
    nav ul li a, .nav-link {
        min-height: 44px;
        min-width: 44px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0,0,0,0.1);
    }
    
    /* Navigation links with adequate spacing */
    nav ul li {
        min-height: 44px;
        margin: 4px 0;
    }
    
    nav ul li a {
        width: 100%;
        min-height: 44px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }
    
    nav ul li a:hover,
    nav ul li a:focus {
        background-color: rgba(190, 176, 147, 0.1);
    }
    
    /* Mobile menu improvements */
    .mobile-menu-toggle {
        min-height: 48px;
        min-width: 48px;
        padding: 12px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }
    
    .mobile-menu-toggle:hover,
    .mobile-menu-toggle:focus {
        background-color: rgba(190, 176, 147, 0.1);
    }
    
    /* CTA Button enhancements */
    .cta-button {
        min-height: 48px;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    /* Form elements */
    input[type="text"], 
    input[type="email"], 
    input[type="tel"], 
    textarea, 
    select {
        min-height: 44px;
        padding: 12px 16px;
        border-radius: 8px;
        border: 2px solid #E5E5E5;
        font-size: 16px; /* Prevents zoom on iOS */
        transition: border-color 0.2s ease;
    }
    
    input:focus, textarea:focus, select:focus {
        border-color: var(--primary);
        outline: 2px solid rgba(190, 176, 147, 0.2);
        outline-offset: 2px;
    }
}

/* Enhanced Visual Design */
.logo.dental-logo {
    transition: transform 0.3s ease, filter 0.3s ease;
}

.logo.dental-logo:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

/* Improved Loading States */
.loading-placeholder {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

/* Enhanced Focus Indicators */
*:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
}

/* Skip to content link improvements */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    z-index: 9999;
    transition: top 0.3s ease;
}

.skip-link:focus {
    top: 6px;
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #1a1a1a;
        --text-primary: #f0f0f0;
        --text-secondary: #c0c0c0;
    }
    
    .dental-logo {
        filter: brightness(1.2);
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
        scroll-behavior: auto !important;
    }
    
    .logo.dental-logo:hover {
        transform: none;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .dental-logo {
        filter: contrast(2);
    }
    
    button, .btn, .cta-button {
        border: 2px solid currentColor;
    }
}

/* Print styles */
@media print {
    .mobile-menu-toggle,
    .cta-button,
    .skip-link,
    .loading-placeholder {
        display: none !important;
    }
    
    .dental-logo {
        filter: grayscale(100%);
    }
}

/* Error state styles */
.error-state {
    border-color: #ff4444 !important;
    background-color: rgba(255, 68, 68, 0.05);
}

.error-message {
    color: #ff4444;
    font-size: 14px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.error-message::before {
    content: "⚠";
    font-weight: bold;
}

/* Success state styles */
.success-state {
    border-color: #22c55e !important;
    background-color: rgba(34, 197, 94, 0.05);
}

.success-message {
    color: #22c55e;
    font-size: 14px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.success-message::before {
    content: "✓";
    font-weight: bold;
}

/* Progressive enhancement for modern browsers */
@supports (backdrop-filter: blur(10px)) {
    .mobile-menu-overlay {
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.3);
    }
}

@supports (color: color(display-p3 1 0 0)) {
    :root {
        --primary: color(display-p3 0.745 0.69 0.576);
        --secondary: color(display-p3 0.545 0.341 0.078);
    }
}

/* Container queries for responsive components */
@container (min-width: 320px) {
    .dental-logo svg {
        width: 100px;
        height: 33px;
    }
}

@container (min-width: 768px) {
    .dental-logo svg {
        width: 120px;
        height: 40px;
    }
}
`;