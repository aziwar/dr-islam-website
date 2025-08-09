// DESIGN-TOKENS.JS - Unified Design System
// Consolidates all CSS variables from core.css.js, components.css.js, a11y.css.js
// Single source of truth for all design tokens - eliminates 45+ variable duplications

/**
 * Design Token System
 * WCAG AA compliant colors, fluid spacing/typography, consistent design language
 */
export const DESIGN_TOKENS = `
:root {
    /* ===== BRAND COLORS (WCAG AA Compliant) ===== */
    --primary: #A08F65;        /* Darker for better contrast */
    --primary-dark: #6D5D3A;   /* WCAG AA compliance */
    --primary-light: #C4B896;  /* Light variant for accents */
    --primary-alpha: rgba(160, 143, 101, 0.1);
    
    --secondary: #3D3B32;      /* Much darker for WCAG AA compliance */
    --secondary-light: #777669; /* Medium tone for subtle elements */
    --secondary-alpha: rgba(61, 59, 50, 0.1);
    
    /* Text Colors */
    --text: #1A1A1A;           /* Darker for better contrast */
    --text-light: #666666;     /* Subtle text, still WCAG AA */
    --text-muted: #999999;     /* Meta text, minimum contrast */
    --text-inverse: #FFFFFF;   /* White text on dark backgrounds */
    
    /* Background Colors */
    --white: #FFFFFF;
    --light: #F8F7F5;          /* Warm off-white */
    --bg-light: #FEFEFE;       /* Subtle background variation */
    --bg-section: #F5F5F5;     /* Section backgrounds */
    
    /* State Colors */
    --success: #2D5A27;        /* Dark green for WCAG AA */
    --error: #C41E3A;          /* Dark red for WCAG AA */
    --warning: #B8860B;        /* Dark gold for WCAG AA */
    --info: #1F4E79;           /* Dark blue for WCAG AA */
    --emergency: #CC2936;      /* Critical error state */

    /* ===== FLUID SPACING SYSTEM ===== */
    /* Responsive spacing that scales with viewport */
    --space-3xs: clamp(0.25rem, 1vw, 0.5rem);       /* 4px → 8px */
    --space-2xs: clamp(0.5rem, 1.5vw, 0.75rem);     /* 8px → 12px */
    --space-xs: clamp(0.75rem, 2vw, 1rem);          /* 12px → 16px */
    --space-sm: clamp(1rem, 3vw, 1.5rem);           /* 16px → 24px */
    --space-md: clamp(1.5rem, 4vw, 2.5rem);         /* 24px → 40px */
    --space-lg: clamp(2rem, 6vw, 4rem);             /* 32px → 64px */
    --space-xl: clamp(3rem, 8vw, 6rem);             /* 48px → 96px */
    --space-2xl: clamp(4rem, 10vw, 8rem);           /* 64px → 128px */
    --space-3xl: clamp(6rem, 12vw, 12rem);          /* 96px → 192px */
    
    /* Container Spacing */
    --container-padding: var(--space-md);
    --container-max-width: 1200px;
    --content-max-width: 800px;
    
    /* Component Spacing */
    --component-padding: var(--space-sm);
    --component-gap: var(--space-md);
    --section-gap: var(--space-xl);

    /* ===== FLUID TYPOGRAPHY SCALE ===== */
    /* Perfect Fourth (1.333) scale with responsive sizing */
    --text-xs: clamp(0.75rem, 1vw + 0.5rem, 0.875rem);     /* 12px → 14px | Captions, labels */
    --text-sm: clamp(0.875rem, 1.5vw + 0.5rem, 1rem);      /* 14px → 16px | Small text, meta */
    --text-base: clamp(1rem, 2vw + 0.75rem, 1.125rem);     /* 16px → 18px | Body text (optimal) */
    --text-lg: clamp(1.125rem, 2.5vw + 0.75rem, 1.333rem); /* 18px → 21px | Subtitles */
    --text-xl: clamp(1.333rem, 3vw + 1rem, 1.777rem);      /* 21px → 28px | Section titles */
    --text-2xl: clamp(1.777rem, 4vw + 1.25rem, 2.369rem);  /* 28px → 38px | Page headings */
    --text-3xl: clamp(2.369rem, 5vw + 1.5rem, 3.157rem);   /* 38px → 51px | Hero headings */
    --text-4xl: clamp(3.157rem, 6vw + 2rem, 4.209rem);     /* 51px → 67px | Display headings */
    --text-5xl: clamp(4.209rem, 8vw + 2.5rem, 5.61rem);    /* 67px → 90px | Hero display */

    /* ===== LINE HEIGHTS (Context-aware) ===== */
    --leading-tight: 1.2;        /* Display headings (large text) */
    --leading-snug: 1.3;         /* Section headings */
    --leading-normal: 1.5;       /* Body text (optimal for reading) */
    --leading-relaxed: 1.6;      /* Long-form content */
    --leading-loose: 1.8;        /* Accessible reading (dyslexia-friendly) */
    
    /* Responsive Line Heights */
    --leading-responsive-heading: clamp(1.1, 0.5vw + 1rem, 1.3);
    --leading-responsive-body: clamp(1.4, 0.2vw + 1.3rem, 1.6);

    /* ===== FONT WEIGHTS ===== */
    --weight-light: 300;
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-semibold: 600;
    --weight-bold: 700;
    --weight-black: 900;

    /* ===== FLUID BORDER RADIUS ===== */
    --radius-none: 0;
    --radius-sm: clamp(0.25rem, 1vw, 0.375rem);    /* 4px → 6px */
    --radius-md: clamp(0.375rem, 2vw, 0.5rem);     /* 6px → 8px */
    --radius-lg: clamp(0.5rem, 3vw, 0.75rem);      /* 8px → 12px */
    --radius-xl: clamp(0.75rem, 4vw, 1rem);        /* 12px → 16px */
    --radius-2xl: clamp(1rem, 5vw, 1.5rem);        /* 16px → 24px */
    --radius-full: 9999px;

    /* ===== CONSISTENT BREAKPOINT SYSTEM ===== */
    --breakpoint-xs: 20rem;       /* 320px - Small mobile */
    --breakpoint-sm: 36rem;       /* 576px - Mobile */
    --breakpoint-md: 48rem;       /* 768px - Tablet */
    --breakpoint-lg: 64rem;       /* 1024px - Desktop */
    --breakpoint-xl: 75rem;       /* 1200px - Large desktop */
    --breakpoint-2xl: 90rem;      /* 1440px - Extra large */
    
    /* Max-width breakpoints for max-width media queries */
    --breakpoint-xs-max: 35.99rem;
    --breakpoint-sm-max: 47.99rem;
    --breakpoint-md-max: 63.99rem;
    --breakpoint-lg-max: 74.99rem;
    --breakpoint-xl-max: 89.99rem;

    /* ===== SHADOWS & ELEVATION ===== */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
    --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
    
    /* Component-specific shadows */
    --shadow-card: var(--shadow-md);
    --shadow-modal: var(--shadow-2xl);
    --shadow-dropdown: var(--shadow-lg);

    /* ===== Z-INDEX SCALE ===== */
    --z-behind: -1;
    --z-normal: 1;
    --z-tooltip: 10;
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-toast: 1070;

    /* ===== ANIMATION & TRANSITIONS ===== */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    --duration-slower: 750ms;
    
    --ease-linear: linear;
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    /* Common transitions */
    --transition-fast: all var(--duration-fast) var(--ease-out);
    --transition-normal: all var(--duration-normal) var(--ease-out);
    --transition-slow: all var(--duration-slow) var(--ease-in-out);

    /* ===== ACCESSIBILITY ===== */
    --focus-ring: 0 0 0 2px var(--primary-alpha), 0 0 0 4px var(--primary);
    --focus-ring-dark: 0 0 0 2px var(--primary-light);
    --min-touch-target: 44px;
    --scroll-margin: var(--space-lg);

    /* ===== COMPONENT TOKENS ===== */
    /* Form Elements */
    --form-border: 2px solid var(--text-light);
    --form-border-focus: 2px solid var(--primary-dark);
    --form-border-error: 2px solid var(--error);
    --form-bg: var(--white);
    --form-padding: var(--space-sm);
    --form-radius: var(--radius-md);
    
    /* Buttons */
    --button-padding: var(--space-sm) var(--space-md);
    --button-radius: var(--radius-lg);
    --button-transition: var(--transition-normal);
    --button-shadow: var(--shadow-sm);
    --button-shadow-hover: var(--shadow-md);
    
    /* Cards */
    --card-padding: var(--space-md);
    --card-radius: var(--radius-xl);
    --card-bg: var(--white);
    --card-border: 1px solid var(--bg-section);
    --card-shadow: var(--shadow-card);
    --card-shadow-hover: var(--shadow-lg);
    
    /* Navigation */
    --nav-height: 80px;
    --nav-padding: var(--space-sm) var(--space-md);
    --nav-shadow: var(--shadow-sm);
    
    /* Content Containers */
    --content-width: min(var(--container-max-width), 100vw - 2 * var(--container-padding));
    --content-narrow: min(var(--content-max-width), 100vw - 2 * var(--container-padding));
}

/* ===== DARK MODE SUPPORT ===== */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-light: #1a1a1a;
        --white: #1a1a1a;
        --light: #2a2a2a;
        --bg-section: #333333;
        --text: #ffffff;
        --text-light: #cccccc;
        --text-muted: #999999;
        --primary: #C4B896;
        --primary-dark: #D4C4A8;
        --secondary: #777669;
        --card-bg: #2a2a2a;
        --card-border: 1px solid #404040;
        --form-bg: #2a2a2a;
        --form-border: 2px solid #555555;
        --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3);
        --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.3);
    }
}

/* ===== REDUCED MOTION SUPPORT ===== */
@media (prefers-reduced-motion: reduce) {
    :root {
        --duration-fast: 0ms;
        --duration-normal: 0ms;
        --duration-slow: 0ms;
        --duration-slower: 0ms;
        --transition-fast: none;
        --transition-normal: none;
        --transition-slow: none;
    }
    
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* ===== HIGH CONTRAST SUPPORT ===== */
@media (prefers-contrast: high) {
    :root {
        --primary: #000000;
        --secondary: #000000;
        --text: #000000;
        --text-light: #000000;
        --card-border: 2px solid #000000;
        --form-border: 3px solid #000000;
        --shadow-card: none;
        --shadow-md: none;
        --shadow-lg: none;
    }
}
`;

/**
 * Utility function to inject design tokens into the document
 */
export function injectDesignTokens() {
    // Check if tokens are already injected
    if (document.getElementById('design-tokens')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'design-tokens';
    style.innerHTML = DESIGN_TOKENS;
    document.head.insertBefore(style, document.head.firstChild);
}

/**
 * CSS Custom Media Queries (for future use)
 * These can be used in CSS-in-JS or PostCSS with custom-media plugin
 */
export const MEDIA_QUERIES = {
    mobile: '(max-width: 47.99rem)',
    tablet: '(min-width: 48rem) and (max-width: 63.99rem)',
    desktop: '(min-width: 64rem)',
    largeDesktop: '(min-width: 75rem)',
    
    // Convenience queries
    mobileOnly: '(max-width: 47.99rem)',
    tabletUp: '(min-width: 48rem)',
    desktopUp: '(min-width: 64rem)',
    
    // Feature queries
    touchDevice: '(hover: none) and (pointer: coarse)',
    hoverDevice: '(hover: hover) and (pointer: fine)',
    reducedMotion: '(prefers-reduced-motion: reduce)',
    darkMode: '(prefers-color-scheme: dark)',
    highContrast: '(prefers-contrast: high)'
};

/**
 * Get CSS custom property value
 */
export function getTokenValue(tokenName) {
    if (typeof window === 'undefined') return null;
    return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
}

/**
 * Set CSS custom property value
 */
export function setTokenValue(tokenName, value) {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty(tokenName, value);
}

/**
 * Component-specific token bundles for easy access
 */
export const TOKEN_BUNDLES = {
    button: {
        padding: 'var(--button-padding)',
        radius: 'var(--button-radius)',
        transition: 'var(--button-transition)',
        shadow: 'var(--button-shadow)',
        shadowHover: 'var(--button-shadow-hover)'
    },
    
    card: {
        padding: 'var(--card-padding)',
        radius: 'var(--card-radius)',
        bg: 'var(--card-bg)',
        border: 'var(--card-border)',
        shadow: 'var(--card-shadow)',
        shadowHover: 'var(--card-shadow-hover)'
    },
    
    form: {
        border: 'var(--form-border)',
        borderFocus: 'var(--form-border-focus)',
        borderError: 'var(--form-border-error)',
        bg: 'var(--form-bg)',
        padding: 'var(--form-padding)',
        radius: 'var(--form-radius)'
    }
};

// Auto-inject design tokens when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectDesignTokens);
    } else {
        injectDesignTokens();
    }
}