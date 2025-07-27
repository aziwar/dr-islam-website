// Accessibility fixes based on PowerMapper report
export const ACCESSIBILITY_CSS = `
/* ===========================
   Level A Fixes (Critical)
   =========================== */

/* Fix: Ensure focus indicators are clearly visible */
:focus {
    outline: 3px solid var(--primary) !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2) !important;
}

/* Enhanced focus for links and buttons */
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

/* ===========================
   Level AA Fixes
   =========================== */

/* Fix: Explicit color declarations for body and links */
body {
    color: #333333 !important;
    background-color: #FFFFFF !important;
}

a {
    color: #1a73e8 !important; /* Blue with proper contrast */
}

a:visited {
    color: #6b3aa0 !important; /* Purple with proper contrast */
}

a:hover,
a:focus {
    color: #174ea6 !important; /* Darker blue for better contrast */
}

/* Fix: Improve text contrast ratios */
.emergency-banner {
    background-color: #c41e3a !important; /* Darker red for better contrast */
    color: #FFFFFF !important;
}

.emergency-banner a {
    color: #FFFFFF !important;
    text-decoration: underline !important;
    text-underline-offset: 2px !important;
}

/* Navigation contrast improvements */
nav a {
    color: #595954 !important; /* Darker gray for 4.5:1 contrast */
}

nav a:hover,
nav a:focus {
    color: #9b8d70 !important; /* Darker primary for better contrast */
}

/* Button contrast improvements */
.cta-button {
    background: linear-gradient(135deg, #9b8d70 0%, #8a7966 100%) !important;
    color: #FFFFFF !important;
    font-weight: 600 !important;
}

/* Service card text contrast */
.service-card h3 {
    color: #2c2c2c !important; /* Darker text */
}

.service-card p {
    color: #4a4a4a !important; /* Darker gray for better contrast */
}

/* ===========================
   Level AAA Fixes
   =========================== */

/* External link indicators */
a[target="_blank"]::after,
a[href^="http"]:not([href*="drislamelsagher.com"])::after {
    content: " ↗" !important;
    font-size: 0.8em !important;
    vertical-align: super !important;
    margin-left: 2px !important;
}

/* Screen reader only text for external links */
a[target="_blank"]::before,
a[href^="http"]:not([href*="drislamelsagher.com"])::before {
    content: "Opens in new window: " !important;
    position: absolute !important;
    left: -10000px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
}

/* ===========================
   Additional Accessibility Enhancements
   =========================== */

/* Skip links visibility */
.skip-link {
    position: absolute !important;
    top: -40px !important;
    left: 0 !important;
    background: #2c2c2c !important;
    color: #FFFFFF !important;
    padding: 8px 16px !important;
    text-decoration: none !important;
    border-radius: 0 0 4px 0 !important;
    z-index: 10000 !important;
    font-weight: 600 !important;
}

.skip-link:focus {
    top: 0 !important;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    * {
        border-color: WindowText !important;
    }
    
    a {
        color: LinkText !important;
    }
    
    a:visited {
        color: VisitedText !important;
    }
    
    button,
    .cta-button {
        border: 2px solid ButtonText !important;
    }
    
    :focus {
        outline: 4px solid Highlight !important;
        outline-offset: 2px !important;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
    }
    
    header {
        background: rgba(30, 30, 30, 0.95) !important;
    }
    
    a {
        color: #6db3f2 !important;
    }
    
    .service-card {
        background: #2a2a2a !important;
        color: #e0e0e0 !important;
    }
}

/* Print styles for better accessibility */
@media print {
    /* Show URLs for links */
    a[href]::after {
        content: " (" attr(href) ")" !important;
    }
    
    /* Remove decorative elements */
    .stars,
    .badge,
    .gallery-overlay {
        display: none !important;
    }
    
    /* Ensure good contrast */
    * {
        color: #000 !important;
        background: #FFF !important;
    }
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Form field error states */
input[aria-invalid="true"],
textarea[aria-invalid="true"],
select[aria-invalid="true"] {
    border: 2px solid #c41e3a !important;
    background-color: #fee !important;
}

/* Success states */
input[aria-invalid="false"],
textarea[aria-invalid="false"],
select[aria-invalid="false"] {
    border: 2px solid #28a745 !important;
    background-color: #efe !important;
}

/* Loading states */
[aria-busy="true"] {
    opacity: 0.6 !important;
    cursor: wait !important;
}

/* Ensure interactive elements are large enough */
a,
button,
input,
textarea,
select,
[role="button"],
[tabindex="0"] {
    min-height: 44px !important;
    min-width: 44px !important;
}

/* Text spacing for readability */
p,
li {
    line-height: 1.8 !important;
    letter-spacing: 0.02em !important;
    word-spacing: 0.1em !important;
}

/* Heading hierarchy visual distinction */
h1 { font-size: 2.5rem !important; }
h2 { font-size: 2rem !important; }
h3 { font-size: 1.5rem !important; }
h4 { font-size: 1.25rem !important; }
h5 { font-size: 1.1rem !important; }
h6 { font-size: 1rem !important; }
`;