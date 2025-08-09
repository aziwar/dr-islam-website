// A11Y.CSS.JS - WCAG 2.1 AA Accessibility Enhancements
// Comprehensive accessibility improvements for better user experience

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

export const A11Y_CSS = `
/* ===== WCAG 2.1 AA ACCESSIBILITY STYLES ===== */

/* Skip Links - High contrast and visible when focused */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--text);
    color: var(--white);
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 4px 4px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10000;
    transition: top 0.3s ease;
    border: 2px solid var(--primary);
}

.skip-link:focus {
    top: 0;
    outline: 3px solid var(--primary);
    outline-offset: 2px;
}

/* Focus Indicators - WCAG 2.4.7 Focus Visible */
*:focus {
    outline: 2px solid var(--primary-dark);
    outline-offset: 2px;
    border-radius: 2px;
}

*:focus:not(:focus-visible) {
    outline: none;
}

*:focus-visible {
    outline: 3px solid var(--primary-dark);
    outline-offset: 2px;
    box-shadow: 0 0 0 1px var(--white), 0 0 0 4px var(--primary-dark);
}

/* Enhanced Focus for Interactive Elements */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 3px solid var(--primary-dark);
    outline-offset: 2px;
    box-shadow: 0 0 0 1px var(--white), 0 0 0 4px var(--primary-dark);
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

/* High Contrast Focus for CTA Buttons */
.cta-button:focus-visible,
.contact-button:focus-visible {
    outline: 3px solid var(--text);
    outline-offset: 3px;
    box-shadow: 0 0 0 1px var(--white), 0 0 0 6px var(--text);
    transform: translateY(-2px);
}

/* Navigation Focus Indicators */
.main-nav a:focus-visible {
    background: rgba(255, 255, 255, 0.1);
    outline: 2px solid var(--white);
    outline-offset: 4px;
    border-radius: 4px;
}

/* Touch Target Sizing - WCAG 2.5.5 Target Size */
button,
a,
input,
select,
textarea,
.clickable {
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: min(12px, max(8px, 2vw));
}

/* Ensure text links have adequate spacing */
a:not(.cta-button):not(.nav-link) {
    padding: 4px 2px;
    margin: 2px;
}

/* Form Field Enhancements */
input,
select,
textarea {
    border: 2px solid var(--text-light);
    border-radius: 4px;
    padding: 12px 16px;
    font-size: var(--text-base);
    background: var(--white);
    color: var(--text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 2px rgba(139, 122, 80, 0.2);
}

/* Error States for Forms */
input:invalid,
input.error {
    border-color: var(--emergency);
    background-color: #fff5f5;
}

input:invalid:focus,
input.error:focus {
    outline-color: var(--emergency);
    box-shadow: 0 0 0 2px rgba(198, 40, 40, 0.2);
}

/* Success States */
input:valid {
    border-color: var(--success);
}

/* Label Improvements */
label {
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
    display: block;
}

label.required::after {
    content: " *";
    color: var(--emergency);
    font-weight: bold;
}

/* Fieldset and Legend Styling */
fieldset {
    border: 2px solid var(--text-light);
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0;
}

legend {
    font-weight: 700;
    color: var(--text);
    padding: 0 8px;
    background: var(--white);
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
    :root {
        --primary: #000000;
        --secondary: #000000;
        --text: #000000;
        --bg-light: #ffffff;
        --primary-dark: #000000;
    }
    
    button,
    .cta-button {
        border: 2px solid var(--text);
    }
}

/* Reduced Motion Support - WCAG 2.3.3 */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    /* Keep essential loading animations but make them faster */
    .loading-spinner {
        animation-duration: 0.5s !important;
    }
}

/* Enhanced Text Spacing - WCAG 1.4.12 */
* {
    line-height: max(1.5, var(--leading-normal)) !important;
    letter-spacing: max(0.12em, normal) !important;
    word-spacing: max(0.16em, normal) !important;
}

p {
    margin-bottom: max(2em, var(--space-md)) !important;
}

/* Color Contrast Indicators */
.contrast-aa {
    /* Indicator class for AA compliant colors */
    position: relative;
}

.contrast-aa::after {
    content: "AA";
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--success);
    color: var(--white);
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 2px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.contrast-aa:focus::after,
.contrast-aa:hover::after {
    opacity: 1;
}

/* Screen Reader Only Content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 4px 8px;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
    background: var(--text);
    color: var(--white);
    text-decoration: none;
    border-radius: 4px;
}

/* Keyboard Navigation Helpers */
.keyboard-nav {
    /* Applied to body when keyboard navigation is detected */
}

.keyboard-nav button:focus,
.keyboard-nav a:focus,
.keyboard-nav input:focus,
.keyboard-nav select:focus,
.keyboard-nav textarea:focus {
    outline: 3px solid var(--primary-dark);
    outline-offset: 2px;
}

/* Status Messages - WCAG 4.1.3 */
.status-message {
    padding: 12px 16px;
    border-radius: 4px;
    font-weight: 500;
    margin: 16px 0;
}

.status-message[role="status"] {
    background: #e3f2fd;
    border: 1px solid #2196f3;
    color: #0d47a1;
}

.status-message[role="alert"] {
    background: #ffebee;
    border: 1px solid #f44336;
    color: #b71c1c;
}

.status-message.success {
    background: #e8f5e8;
    border: 1px solid var(--success);
    color: var(--success);
}

/* Loading States with Accessibility */
.loading {
    position: relative;
}

.loading::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid var(--text-light);
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading::after {
    content: "Loading...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 30px));
    font-size: 14px;
    color: var(--text-light);
}

/* Error Handling */
.error-boundary {
    padding: 20px;
    background: #ffebee;
    border: 2px solid var(--emergency);
    border-radius: 8px;
    text-align: center;
    margin: 20px 0;
}

.error-boundary h3 {
    color: var(--emergency);
    margin-bottom: 8px;
}

.error-boundary p {
    color: var(--text);
    margin-bottom: 16px;
}

/* Print Styles for Accessibility */
@media print {
    .skip-link,
    .nav-toggle,
    .cta-button,
    .social-links {
        display: none !important;
    }
    
    a::after {
        content: " (" attr(href) ")";
        font-size: 12px;
        color: var(--text-light);
    }
    
    .testimonial-card,
    .service-card {
        break-inside: avoid;
    }
}

/* RTL Support Enhancements */
[dir="rtl"] .skip-link {
    right: 6px;
    left: auto;
}

[dir="rtl"] .contrast-aa::after {
    right: auto;
    left: -8px;
}

/* Mobile Accessibility Enhancements */
@media (max-width: 768px) {
    /* Larger touch targets on mobile */
    button,
    a,
    input,
    select,
    textarea {
        min-height: 48px;
        min-width: 48px;
    }
    
    /* Improved spacing for mobile keyboards */
    input:focus,
    textarea:focus {
        transform: translateY(-8px);
        z-index: 100;
    }
    
    /* Mobile navigation accessibility */
    .nav-toggle {
        min-height: 48px;
        min-width: 48px;
        padding: 12px;
    }
    
    .main-nav a {
        min-height: 48px;
        padding: 12px 16px;
    }
}

/* Animation and Motion Enhancements */
@keyframes focusGlow {
    0% { box-shadow: 0 0 0 0 rgba(139, 122, 80, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(139, 122, 80, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 122, 80, 0); }
}

.focus-glow:focus {
    animation: focusGlow 0.6s ease-out;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-light: #1a1a1a;
        --white: #1a1a1a;
        --text: #ffffff;
        --text-light: #cccccc;
        --primary: #C4B896;
        --primary-dark: #A08F65;
    }
    
    .skip-link {
        background: var(--white);
        color: var(--text);
        border-color: var(--primary);
    }
}
`;