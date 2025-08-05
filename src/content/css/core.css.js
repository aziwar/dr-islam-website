// CORE.CSS.JS - Foundation Styles (Critical + Responsive)
// Consolidates: critical.css.js + critical-inline.css.js + responsive.css.js
// ~2000 lines → Critical path foundation

export const CORE_CSS = `
/* ===== RESPONSIVE DESIGN SYSTEM ===== */
:root {
    /* Brand Colors - WCAG AA Compliant */
    --primary: #A08F65;        /* Darker for better contrast (was #BEB093) */
    --primary-dark: #6D5D3A;   /* Much darker for WCAG AA compliance */
    --secondary: #3D3B32;      /* Much darker for WCAG AA compliance */
    --white: #FFFFFF;
    --light: #F8F7F5;
    --text: #1A1A1A;           /* Darker for better contrast (was #333333) */
    --text-light: #4A4A4A;     /* Secondary text with good contrast */
    --emergency: #C62828;      /* Darker red for better contrast */
    --success: #1B5E20;        /* Darker green for better contrast */
    
    /* Accessible Color Combinations */
    --bg-primary: var(--primary-dark);
    --text-on-primary: var(--white);
    --bg-secondary: var(--secondary);
    --text-on-secondary: var(--white);
    --bg-light: var(--light);
    --text-on-light: var(--text);
    
    /* Fluid Spacing System (Mobile to Desktop) */
    --space-3xs: clamp(0.25rem, 1vw, 0.5rem);    /* 4px → 8px */
    --space-2xs: clamp(0.5rem, 1.5vw, 0.75rem);  /* 8px → 12px */
    --space-xs: clamp(0.75rem, 2vw, 1rem);       /* 12px → 16px */
    --space-sm: clamp(1rem, 3vw, 1.5rem);        /* 16px → 24px */
    --space-md: clamp(1.5rem, 4vw, 2.5rem);      /* 24px → 40px */
    --space-lg: clamp(2rem, 6vw, 4rem);          /* 32px → 64px */
    --space-xl: clamp(3rem, 8vw, 6rem);          /* 48px → 96px */
    --space-2xl: clamp(4rem, 10vw, 8rem);        /* 64px → 128px */
    --space-3xl: clamp(6rem, 12vw, 12rem);       /* 96px → 192px */
    
    /* Optimized Fluid Typography Scale - Perfect Fourth (1.333) */
    --text-xs: clamp(0.75rem, 1vw + 0.5rem, 0.875rem);     /* 12px → 14px | Captions, labels */
    --text-sm: clamp(0.875rem, 1.5vw + 0.5rem, 1rem);      /* 14px → 16px | Small text, meta */
    --text-base: clamp(1rem, 2vw + 0.75rem, 1.125rem);     /* 16px → 18px | Body text (optimal) */
    --text-lg: clamp(1.125rem, 2.5vw + 0.75rem, 1.333rem); /* 18px → 21px | Subtitles */
    --text-xl: clamp(1.333rem, 3vw + 1rem, 1.777rem);      /* 21px → 28px | Section titles */
    --text-2xl: clamp(1.777rem, 4vw + 1.25rem, 2.369rem);  /* 28px → 38px | Page headings */
    --text-3xl: clamp(2.369rem, 5vw + 1.5rem, 3.157rem);   /* 38px → 51px | Hero headings */
    --text-4xl: clamp(3.157rem, 6vw + 2rem, 4.209rem);     /* 51px → 67px | Display headings */
    --text-5xl: clamp(4.209rem, 8vw + 2.5rem, 5.61rem);    /* 67px → 90px | Hero display */
    
    /* Optimized Fluid Line Heights - Context-aware readability */
    --leading-tight: 1.2;        /* Display headings (large text) */
    --leading-snug: 1.3;         /* Section headings */
    --leading-normal: 1.5;       /* Body text (optimal for reading) */
    --leading-relaxed: 1.6;      /* Long-form content */
    --leading-loose: 1.8;        /* Accessible reading (dyslexia-friendly) */
    
    /* Responsive Line Height - Adapts to text size */
    --leading-fluid: clamp(1.4, 0.5vw + 1.2, 1.6);
    
    /* Container Sizes (Content-Based Breakpoints) */
    --container-xs: 20rem;      /* 320px - Small mobile */
    --container-sm: 24rem;      /* 384px - Mobile */
    --container-md: 32rem;      /* 512px - Large mobile/Small tablet */
    --container-lg: 48rem;      /* 768px - Tablet */
    --container-xl: 64rem;      /* 1024px - Desktop */
    --container-2xl: 80rem;     /* 1280px - Large desktop */
    --container-max: 90rem;     /* 1440px - Max content width */
    
    /* Breakpoint Design Tokens (Media Query Standards) */
    --breakpoint-xs: 20rem;     /* 320px - Small mobile */
    --breakpoint-sm: 36rem;     /* 576px - Large mobile */  
    --breakpoint-md: 48rem;     /* 768px - Tablet */
    --breakpoint-lg: 64rem;     /* 1024px - Desktop */
    --breakpoint-xl: 75rem;     /* 1200px - Large desktop */
    --breakpoint-2xl: 90rem;    /* 1440px - Extra large */
    
    /* Max-width breakpoints (for range queries) */
    --breakpoint-xs-max: 35.99rem;  /* 575.84px */
    --breakpoint-sm-max: 47.99rem;  /* 767.84px */
    --breakpoint-md-max: 63.99rem;  /* 1023.84px */
    --breakpoint-lg-max: 74.99rem;  /* 1199.84px */
    --breakpoint-xl-max: 89.99rem;  /* 1439.84px */
    
    /* Fluid Border Radius */
    --radius-sm: clamp(0.25rem, 1vw, 0.375rem);
    --radius-md: clamp(0.375rem, 2vw, 0.5rem);
    --radius-lg: clamp(0.5rem, 3vw, 0.75rem);
    --radius-xl: clamp(0.75rem, 4vw, 1rem);
    --radius-2xl: clamp(1rem, 5vw, 1.5rem);
    --radius-full: 9999px;
    
    /* Z-Index Scale */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    --z-toast: 1080;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow-y: scroll;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Kufi Arabic', 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    color: var(--text);
    line-height: 1.6;
    direction: rtl;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
}

/* ===== TYPOGRAPHY ===== */
h1, h2, h3 {
    font-weight: 600;
    margin-bottom: 1rem;
}

h1 { 
    font-size: var(--text-4xl); 
    line-height: var(--leading-tight);
}
h2 { 
    font-size: var(--text-3xl); 
    line-height: var(--leading-tight);
}
h3 { 
    font-size: var(--text-2xl); 
    line-height: var(--leading-snug);
}
h4 { 
    font-size: var(--text-xl); 
    font-weight: 600; 
    line-height: var(--leading-snug);
}

/* Arabic Typography */
body.ar,
.ar body {
    font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', -apple-system, sans-serif;
    font-weight: 400;
    letter-spacing: 0;
    word-spacing: 0.1em;
    line-height: 1.8;
}

.ar h1, .ar h2, .ar h3, .ar h4, .ar h5, .ar h6 {
    font-family: 'Cairo', 'Tajawal', sans-serif;
    font-weight: 700;
    letter-spacing: 0;
}

/* ===== EMERGENCY BANNER ===== */
.emergency-banner {
    background: var(--emergency);
    color: var(--white);
    text-align: center;
    padding: 10px;
    font-weight: 500;
    font-size: 1.125rem;
    position: sticky;
    top: 0;
    z-index: 101;
}

.emergency-banner a {
    color: var(--white);
    font-weight: bold;
    text-decoration: underline;
    padding: 8px 4px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
}

/* ===== HEADER & NAVIGATION ===== */
header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 40px;
    z-index: 100;
    transition: all 0.3s ease;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 4px;
}

.logo-img {
    height: 80px;
    width: 80px;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: block;
}

.logo-img::before {
    content: "Dr. Islam Elsagher";
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
}

.logo-img:not([src]), 
.logo-img[src=""] {
    width: 180px;
}

/* Dental Logo SVG */
.dental-logo {
    display: inline-block;
    color: var(--primary);
    transition: color 0.3s ease;
}

.dental-logo:hover {
    color: var(--secondary);
}

.dental-logo svg {
    height: auto;
    max-width: 100%;
}

[data-theme="dark"] .dental-logo {
    color: #F8F7F5;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
}

nav a {
    text-decoration: none;
    color: var(--secondary);
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    padding: 8px 12px;
    min-height: 44px;
    display: flex;
    align-items: center;
}

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

nav a:hover {
    color: var(--primary);
}

nav a:hover::after {
    width: 80%;
}

/* Enhanced scroll-triggered navigation state (from reference projects) */
header.nav-scrolled {
    transition: all 0.3s ease-in-out;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

header.nav-scrolled nav a {
    color: var(--secondary);
    font-weight: 600;
}

header.nav-scrolled .logo {
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

/* ===== HERO SECTION ===== */
.hero {
    background: linear-gradient(-45deg, #BEB093, #777669, #8B7F6B, #9A8E77);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    color: var(--white);
    padding: var(--space-3xl) var(--space-md);
    text-align: center;
    min-height: clamp(60vh, 80vh, 100vh);
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.subtitle {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.trust-badges {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
    color: var(--white);
    padding: 18px 40px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 5px 25px rgba(190, 176, 147, 0.3);
    position: relative;
    overflow: hidden;
}

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

.cta-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 35px rgba(190, 176, 147, 0.4);
}

.cta-button:hover::after {
    width: 350px;
    height: 350px;
}

/* ===== STICKY BOOKING BUTTON ===== */
.sticky-book {
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: var(--success);
    color: var(--white);
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 999;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
    50% { box-shadow: 0 5px 30px rgba(40, 167, 69, 0.5); }
    100% { box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
}

.sticky-book:hover {
    transform: scale(1.1);
    background: #218838;
}

/* ===== MOBILE MENU ===== */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 12px;
    min-height: 48px;
    min-width: 48px;
    z-index: 1001;
    align-items: center;
    justify-content: center;
}

.mobile-menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--secondary);
    margin: 5px 0;
    transition: 0.3s;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* ===== FOOTER ===== */
footer {
    background: var(--secondary);
    color: var(--white);
    text-align: center;
    padding: 20px;
}

/* ===== BREADCRUMB NAVIGATION ===== */
.breadcrumb-nav {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e5e5;
    padding: 0.75rem 0;
    position: sticky;
    top: 80px;
    z-index: 900;
    transition: all 0.3s ease;
}

.breadcrumb-nav.visible {
    opacity: 1;
    transform: translateY(0);
}

.breadcrumb-list {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.875rem;
    flex-wrap: wrap;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    color: #666;
    font-weight: 400;
}

.breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    color: #ccc;
    font-weight: 300;
}

.breadcrumb-item a {
    color: #007cba;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 0.75rem 1rem;
    min-height: 48px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
}

.breadcrumb-item a:hover {
    color: #005a8b;
    text-decoration: underline;
}

.breadcrumb-item.active {
    color: #333;
    font-weight: 500;
}

/* ===== TOUCH TARGET OPTIMIZATION ===== */
.nav-link,
.btn,
button,
a[role="button"],
input[type="submit"],
input[type="button"] {
    min-height: 48px;
    min-width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.nav-link::before,
.btn::before,
button::before {
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
}

/* ===== ACCESSIBILITY ===== */
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
}

.skip-nav:focus {
    top: 0;
}

:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
}

a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

/* ===== PERFORMANCE ===== */
.animated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

img {
    loading: lazy;
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

.skeleton {
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

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(190, 176, 147, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ===== ERROR & SUCCESS STATES ===== */
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

/* ===== UNIFIED RESPONSIVE NAVIGATION SYSTEM ===== */

/* Main Navigation - Mobile First Design */
.main-nav {
    /* Mobile: Hidden off-canvas by default */
    position: fixed;
    top: 0;
    right: -100%;
    width: min(80vw, 400px);
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) var(--space-md);
    transition: right 0.3s ease;
    z-index: var(--z-modal);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.main-nav.is-open {
    right: 0;
}

.main-nav a {
    font-size: var(--text-lg);
    padding: var(--space-sm) var(--space-lg);
    min-height: 48px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    border-radius: var(--radius-md);
    width: 100%;
    justify-content: center;
}

.main-nav a:hover,
.main-nav a:focus {
    color: var(--primary);
    background: rgba(190, 176, 147, 0.1);
}

/* Navigation Toggle Button */
.nav-toggle {
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
    min-height: 48px;
    min-width: 48px;
    align-items: center;
    justify-content: center;
    z-index: calc(var(--z-modal) + 10);
    position: relative;
}

.nav-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--secondary);
    margin: 5px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.nav-toggle.is-open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.is-open span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.is-open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Navigation Backdrop */
.nav-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--z-modal) - 10);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
}

.nav-backdrop.is-open {
    opacity: 1;
    visibility: visible;
}

/* Progressive Enhancement: Tablet and Desktop */
@media (min-width: var(--breakpoint-md)) {
    .main-nav {
        /* Reset mobile styles */
        position: static;
        width: auto;
        height: auto;
        background: transparent;
        backdrop-filter: none;
        flex-direction: row;
        justify-content: flex-end;
        gap: var(--space-md);
        padding: 0;
        right: 0;
        overflow: visible;
    }
    
    .main-nav a {
        font-size: var(--text-base);
        padding: var(--space-xs) var(--space-sm);
        width: auto;
        justify-content: flex-start;
    }
    
    .nav-toggle {
        display: none;
    }
    
    .nav-backdrop {
        display: none;
    }
}

/* Responsive Layout Adjustments */
@media (max-width: var(--breakpoint-sm-max)) {
    /* Small screens: Optimize layout */
    .logo-img {
        height: clamp(32px, 8vw, 48px);
        max-width: clamp(120px, 30vw, 180px);
    }
    
    .hero h1 {
        font-size: var(--text-3xl);
        line-height: var(--leading-tight);
    }
    
    .hero .subtitle {
        font-size: var(--text-base);
    }
    
    .cta-button {
        padding: var(--space-md) var(--space-lg);
        font-size: var(--text-lg);
        min-height: 56px;
    }
    
    /* Grid layouts become single column */
    .services-grid,
    .stats,
    .testimonial-grid,
    .contact-cards {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-item {
        height: clamp(250px, 60vw, 350px);
    }
    
    /* About section stack */
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-lg);
    }
    
    .doctor-image {
        max-width: min(250px, 80vw);
        margin: 0 auto;
    }
    
    /* Service cards optimization */
    .service-card {
        padding: var(--space-lg);
    }
    
    .service-card:hover {
        transform: none; /* Disable hover transforms on touch devices */
    }
    
    /* Trust badges stack */
    .trust-badges {
        flex-direction: column;
        gap: var(--space-sm);
    }
    
    .badge {
        font-size: var(--text-sm);
        padding: var(--space-xs) var(--space-md);
        width: 100%;
        max-width: 280px;
    }
    
    /* Header adjustments */
    header {
        top: clamp(20px, 5vh, 40px);
        padding: var(--space-sm) var(--space-md);
    }
    
    /* Breadcrumb adjustments */
    .breadcrumb-nav {
        top: clamp(60px, 12vh, 80px);
        padding: var(--space-xs) 0;
    }
    
    .breadcrumb-list {
        font-size: var(--text-xs);
    }
    
    /* FAQ optimizations */
    .faq-item h3 {
        font-size: var(--text-base);
        padding: var(--space-sm) 0;
        min-height: 48px;
    }
    
    /* Arabic typography adjustments */
    .ar body {
        font-size: var(--text-lg);
        line-height: var(--leading-relaxed);
    }
    
    .ar p {
        margin-bottom: var(--space-sm);
    }
}

/* Sticky Elements Responsive */
.sticky-book {
    bottom: var(--space-xl);
    right: var(--space-md);
    font-size: var(--text-base);
    padding: var(--space-sm) var(--space-md);
    z-index: var(--z-fixed);
}

.emergency-banner {
    font-size: var(--text-lg);
    padding: var(--space-xs) var(--space-sm);
    min-height: 40px;
    line-height: var(--leading-normal);
}

/* ===== RTL SUPPORT ===== */
[dir="rtl"] .main-nav {
    /* Fix: Use the actual navigation width instead of 100% viewport */
    left: calc(-1 * min(80vw, 400px));
    right: auto;
}

[dir="rtl"] .main-nav.is-open {
    left: 0;
    right: auto;
}

[dir="rtl"] .sticky-book {
    left: var(--space-md);
    right: auto;
}

[dir="rtl"] .breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin: 0 var(--space-xs);
}

/* ===== SMALL MOBILE ===== */
@media (max-width: var(--breakpoint-xs-max)) {
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

/* ===== TABLET RANGE ===== */
@media (min-width: var(--breakpoint-md)) and (max-width: var(--breakpoint-md-max)) {
    .breadcrumb-nav {
        top: 75px;
    }
    
    html body .mobile-menu-toggle,\n    body .mobile-menu-toggle {
        display: flex !important;
    }
    
    body header nav > ul:not(.mobile-nav) {
        display: none !important;
    }
    
    body #mobileMenu {
        display: flex !important;
        width: 60%;
    }
    
    body nav a {
        font-size: 1.1rem;
        padding: 12px 20px;
    }
}

/* ===== DESKTOP (min-width: 1025px) ===== */
@media (min-width: 1025px) {
    .breadcrumb-nav {
        top: 85px;
    }
    
    .breadcrumb-item a {
        padding: 0.75rem 1rem;
        min-height: 48px;
        border-radius: 6px;
    }
    
    .breadcrumb-item a:hover {
        background: rgba(0, 124, 186, 0.05);
        text-decoration: none;
    }
    
    /* Navigation is now handled by unified system above */
    
    .hero .container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        align-items: center;
        max-width: 1200px;
    }
    
    .hero-main {
        padding-right: 2rem;
    }
    
    .dental-logo svg {
        width: 120px;
        height: 40px;
    }
}

/* ===== LARGE DESKTOP (min-width: 1200px) ===== */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .hero {
        min-height: 90vh;
        display: flex;
        align-items: center;
        background-size: cover;
        background-position: center;
        position: relative;
    }
    
    .hero .container {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 3rem;
        align-items: center;
    }
    
    .hero-content {
        max-width: none;
    }
    
    .hero h1 {
        font-size: 3.5rem;
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }
    
    .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        max-width: 600px;
    }
    
    .cta-button {
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        border-radius: 50px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .cta-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .cta-button:hover::before {
        left: 100%;
    }
    
    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 102, 204, 0.3);
    }
}

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
    :focus {
        outline-width: 4px;
    }
    
    .btn {
        border: 2px solid currentColor;
    }
}

/* ===== UTILITIES ===== */
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

.safe-top {
    padding-top: env(safe-area-inset-top);
}

.safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}

/* ===== PRINT STYLES ===== */
@media print {
    .emergency-banner,
    .sticky-book,
    .mobile-menu-toggle {
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
}

img[loading="lazy"] {
    background: var(--light);
}
`;