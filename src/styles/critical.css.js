// CRITICAL.CSS.JS - Above-the-fold critical styles (≤15KB inline)
// Modern CSS Layers approach for 2024-2025 standards

import { DESIGN_TOKENS } from '../shared/design-tokens.js';

export const CRITICAL_CSS = `
/* CSS Layers for modern cascade control */
@layer reset, tokens, critical-layout, critical-components;

/* Design Tokens - Injected inline for immediate availability */
@layer tokens {
  ${DESIGN_TOKENS}
}

/* Reset Layer - Modern CSS reset */
@layer reset {
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow-y: scroll;
    /* CSS Logical Properties */
    scroll-padding-block-start: var(--nav-height);
  }

  body {
    font-family: 'IBM Plex Sans Arabic', 'Noto Kufi Arabic', 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    color: var(--text);
    line-height: var(--leading-responsive-body);
    direction: ltr; /* Default to LTR, override with [dir="rtl"] */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'kern' 1, 'liga' 1;
  }

  /* RTL Support */
  [dir="rtl"] body {
    direction: rtl;
    font-family: 'IBM Plex Sans Arabic', 'Amiri', 'Cairo', 'Tajawal', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
    loading: lazy;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
  }

  img.loaded {
    opacity: 1;
  }
}

/* Critical Layout - Above-the-fold layout systems */
@layer critical-layout {
  /* Modern Container System with Device-Specific Max-Widths */
  .container {
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--container-padding);
    
    /* Device-specific fixed max-widths */
    container-type: inline-size;
    
    /* Progressive sizing */
    max-width: 100%;
  }

  @media (width >= 375px) {
    .container { max-width: 375px; }
  }
  
  @media (width >= 768px) {
    .container { max-width: 768px; }
  }
  
  @media (width >= 1200px) {
    .container { max-width: 1200px; }
  }

  @media (width >= 1440px) {
    .container { max-width: 1400px; }
  }

  /* Typography System - Fluid & Responsive */
  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--weight-semibold);
    margin-block-end: var(--space-sm);
    line-height: var(--leading-responsive-heading);
    text-wrap: balance;
  }

  h1 { 
    font-size: var(--text-4xl); 
    font-weight: var(--weight-bold);
  }
  
  h2 { 
    font-size: var(--text-3xl); 
    font-weight: var(--weight-semibold);
  }
  
  h3 { 
    font-size: var(--text-2xl); 
  }

  p {
    margin-block-end: var(--space-sm);
    text-wrap: pretty;
  }

  /* RTL Typography */
  [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
    font-family: 'Amiri', 'Cairo', 'Tajawal', serif;
    font-weight: var(--weight-bold);
    letter-spacing: 0;
    text-align: right;
  }
}

/* Critical Components - Above-the-fold components */
@layer critical-components {
  /* Emergency Banner - Sticky notification */
  .emergency-banner {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    
    background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%);
    color: var(--text-inverse);
    text-align: center;
    
    /* Responsive padding with clamp */
    padding-block: clamp(12px, 2.5vw, 16px);
    padding-inline: clamp(16px, 4vw, 24px);
    
    font-weight: var(--weight-medium);
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    line-height: 1.4;
    
    /* Modern blur effects */
    backdrop-filter: blur(8px);
    border-block-end: 1px solid rgb(255 255 255 / 0.2);
    box-shadow: var(--shadow-sm);
    
    /* Performance optimizations */
    contain: layout style paint;
    will-change: transform;
  }

  .emergency-banner a {
    color: inherit;
    font-weight: var(--weight-semibold);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 2px;
    
    /* Touch-friendly targets */
    padding: max(12px, (44px - 1em) / 2) var(--space-md);
    min-block-size: 44px;
    min-inline-size: 44px;
    
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
    
    /* Remove tap highlight */
    -webkit-tap-highlight-color: transparent;
  }

  .emergency-banner a:hover,
  .emergency-banner a:focus {
    background: rgb(255 255 255 / 0.1);
    outline: 2px solid rgb(255 255 255 / 0.5);
    outline-offset: 2px;
  }

  /* Header - Modern glassmorphism navigation */
  header {
    position: sticky;
    top: var(--emergency-banner-height, 40px);
    z-index: var(--z-fixed);
    
    /* Enhanced glassmorphism */
    background: rgb(255 255 255 / 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    
    border: 1px solid rgb(255 255 255 / 0.3);
    border-radius: var(--radius-xl);
    margin-inline: var(--space-md);
    
    box-shadow: 
      var(--shadow-lg),
      0 1px 0 rgb(255 255 255 / 0.8) inset,
      0 -1px 0 rgb(0 0 0 / 0.02) inset;
    
    transition: all 0.4s var(--ease-out);
    overflow: hidden;
    
    container-type: inline-size;
    container-name: header;
  }

  /* Navigation */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: var(--space-sm);
    padding-inline: 5%;
    max-width: 1200px;
    margin-inline: auto;
    min-block-size: var(--nav-height);
  }

  /* Logo */
  .logo {
    display: flex;
    align-items: center;
    min-block-size: 48px;
    padding: var(--space-3xs);
  }

  .logo-img {
    block-size: clamp(60px, 8vw, 80px);
    inline-size: clamp(60px, 8vw, 80px);
    object-fit: contain;
    image-rendering: optimizeQuality;
  }

  /* Navigation Links */
  nav ul {
    display: none; /* Hidden on mobile by default */
    list-style: none;
    gap: var(--space-md);
    margin: 0;
    padding: 0;
  }

  nav a {
    text-decoration: none;
    color: var(--secondary);
    font-weight: var(--weight-medium);
    font-size: var(--text-sm);
    
    /* Touch-friendly */
    padding: var(--space-xs) var(--space-sm);
    min-block-size: 44px;
    min-inline-size: 44px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    
    transition: var(--transition-normal);
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }

  nav a::after {
    content: '';
    position: absolute;
    inset-block-end: -2px;
    inset-inline-start: 50%;
    inline-size: 0;
    block-size: 2px;
    background: var(--primary);
    border-radius: 1px;
    transition: var(--transition-fast);
    transform: translateX(-50%);
  }

  nav a:hover,
  nav a:focus {
    color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }

  nav a:hover::after {
    inline-size: 80%;
  }

  /* Desktop Navigation - Show on larger screens */
  @container header (min-width: 768px) {
    nav ul {
      display: flex;
    }
    
    .nav-toggle {
      display: none;
    }
  }

  /* Mobile Navigation Toggle */
  .nav-toggle {
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
    min-block-size: 48px;
    min-inline-size: 48px;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .nav-toggle:hover,
  .nav-toggle:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }

  .nav-toggle span {
    display: block;
    inline-size: 24px;
    block-size: 3px;
    background: var(--secondary);
    margin-block: 4px;
    border-radius: 1.5px;
    transition: var(--transition-fast);
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

  /* Mobile Navigation Menu */
  .main-nav {
    position: fixed;
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: min(80vw, 400px);
    z-index: var(--z-modal);
    
    /* Modern glassmorphism */
    background: rgb(255 255 255 / 0.95);
    backdrop-filter: blur(25px) saturate(180%);
    border-inline-start: 1px solid rgb(255 255 255 / 0.3);
    box-shadow: var(--shadow-2xl);
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) var(--space-md);
    
    /* Hidden by default */
    transform: translateX(100%);
    transition: transform 0.4s var(--ease-out);
    
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .main-nav.is-open {
    transform: translateX(0);
  }

  .main-nav a {
    font-size: var(--text-lg);
    padding: var(--space-sm) var(--space-lg);
    inline-size: 100%;
    justify-content: center;
    text-align: center;
  }

  /* Navigation Backdrop */
  .nav-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.5);
    backdrop-filter: blur(8px);
    z-index: calc(var(--z-modal) - 1);
    
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s var(--ease-out), visibility 0.3s var(--ease-out);
  }

  .nav-backdrop.is-open {
    opacity: 1;
    visibility: visible;
  }

  /* RTL Navigation */
  [dir="rtl"] .main-nav {
    inset-inline-end: auto;
    inset-inline-start: 0;
    border-inline-start: none;
    border-inline-end: 1px solid rgb(255 255 255 / 0.3);
    transform: translateX(-100%);
  }

  [dir="rtl"] .main-nav.is-open {
    transform: translateX(0);
  }
}

/* Accessibility & Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  @layer reset {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  @layer critical-components {
    header {
      background: var(--white);
      border: 3px solid var(--text);
    }
    
    nav a:focus {
      outline-width: 4px;
      outline-color: var(--text);
    }
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  @layer critical-components {
    header {
      background: rgb(26 26 26 / 0.9);
      border-color: rgb(64 64 64 / 0.3);
    }
    
    .main-nav {
      background: rgb(26 26 26 / 0.95);
      border-color: rgb(64 64 64 / 0.3);
    }
    
    .emergency-banner {
      background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%);
    }
  }
}

/* Performance Optimizations */
.nav-toggle,
.emergency-banner a,
nav a,
.main-nav {
  contain: layout style;
}

/* Container Query Fallbacks */
@supports not (container-type: inline-size) {
  /* Fallback media queries for browsers without container query support */
  @media (width >= 768px) {
    nav ul { display: flex; }
    .nav-toggle { display: none; }
  }
}
`;

// Auto-inject critical CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.id = 'critical-css';
  style.innerHTML = CRITICAL_CSS;
  
  // Insert before any other styles for proper layer ordering
  const firstStyle = document.head.querySelector('style, link[rel="stylesheet"]');
  if (firstStyle) {
    document.head.insertBefore(style, firstStyle);
  } else {
    document.head.appendChild(style);
  }
}