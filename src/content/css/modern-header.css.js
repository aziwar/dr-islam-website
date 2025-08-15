// Modern Header CSS - 2024/2025 Standards
// Advanced responsive navigation with glassmorphism, accessibility, and RTL support

export const MODERN_HEADER_CSS = `
/* ===== MODERN HEADER 2024/2025 STANDARDS ===== */
/* Features: Container queries, logical properties, advanced accessibility, glassmorphism */

/* Modern CSS Custom Properties for Theming */
:root {
  /* Header Spacing System */
  --header-height-mobile: 70px;
  --header-height-tablet: 80px;
  --header-height-desktop: 90px;
  --header-padding-mobile: max(env(safe-area-inset-top), 8px);
  --header-padding-tablet: max(env(safe-area-inset-top), 12px);
  --header-padding-desktop: max(env(safe-area-inset-top), 16px);

  /* Emergency Banner */
  --emergency-height: 45px;
  --emergency-bg: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
  --emergency-text: #FFFFFF;

  /* Navigation Colors */
  --nav-bg: rgba(255, 255, 255, 0.95);
  --nav-bg-blur: blur(20px) saturate(180%) brightness(1.05);
  --nav-border: rgba(255, 255, 255, 0.2);
  --nav-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  --nav-text: var(--secondary, #4A5568);
  --nav-text-hover: var(--primary, #BEB093);
  --nav-accent: var(--primary, #BEB093);

  /* Mobile Menu */
  --mobile-menu-bg: rgba(255, 255, 255, 0.98);
  --mobile-menu-blur: blur(25px) saturate(180%) brightness(1.1);
  --mobile-menu-width: min(85vw, 400px);
  --mobile-backdrop: rgba(0, 0, 0, 0.6);

  /* Dropdown System */
  --dropdown-bg: rgba(255, 255, 255, 0.98);
  --dropdown-blur: blur(20px) saturate(180%);
  --dropdown-border: rgba(190, 176, 147, 0.15);
  --dropdown-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);

  /* Animation System */
  --timing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --timing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;

  /* Container Queries Breakpoints */
  --container-xs: 20rem;  /* 320px */
  --container-sm: 30rem;  /* 480px */
  --container-md: 48rem;  /* 768px */
  --container-lg: 64rem;  /* 1024px */
  --container-xl: 80rem;  /* 1280px */
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --nav-bg: rgba(26, 32, 44, 0.95);
    --nav-text: #E2E8F0;
    --nav-text-hover: #F8F7F5;
    --mobile-menu-bg: rgba(26, 32, 44, 0.98);
    --dropdown-bg: rgba(26, 32, 44, 0.98);
    --nav-border: rgba(255, 255, 255, 0.1);
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --nav-bg: #FFFFFF;
    --nav-text: #000000;
    --nav-border: #000000;
    --dropdown-border: #000000;
  }

  .modern-header {
    border: 3px solid currentColor;
  }
}

/* ===== EMERGENCY BANNER ===== */
.modern-emergency-banner {
  /* Layout */
  position: sticky;
  top: 0;
  z-index: 1001;
  block-size: var(--emergency-height);
  
  /* Visual */
  background: var(--emergency-bg);
  color: var(--emergency-text);
  
  /* Effects */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 12px rgba(220, 38, 38, 0.3);
  
  /* Typography */
  font-weight: 500;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: 1.4;
  
  /* Animation */
  transition: transform var(--duration-normal) var(--timing-smooth);
}

.emergency-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-inline: max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-right));
  block-size: 100%;
  max-inline-size: 1400px;
  margin-inline: auto;
}

.emergency-cta {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  
  /* Visual */
  color: inherit;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  
  /* Interactive */
  min-block-size: 44px; /* Touch target */
  cursor: pointer;
  
  /* Animation */
  transition: all var(--duration-fast) var(--timing-smooth);
  position: relative;
  overflow: hidden;
}

.emergency-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform var(--duration-normal) var(--timing-smooth);
}

.emergency-cta:hover::before,
.emergency-cta:focus-visible::before {
  transform: translateX(0);
}

.emergency-cta:hover,
.emergency-cta:focus-visible {
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.02);
}

.emergency-icon {
  flex-shrink: 0;
  transition: transform var(--duration-fast) var(--timing-smooth);
}

.emergency-cta:hover .emergency-icon {
  transform: rotate(5deg) scale(1.1);
}

/* ===== MODERN HEADER ===== */
.modern-header {
  /* Container Queries Setup */
  container-type: inline-size;
  container-name: header;
  
  /* Layout */
  position: sticky;
  top: var(--emergency-height);
  z-index: 1000;
  
  /* Visual */
  background: var(--nav-bg);
  backdrop-filter: var(--nav-bg-blur);
  -webkit-backdrop-filter: var(--nav-bg-blur);
  border-block-end: 1px solid var(--nav-border);
  box-shadow: var(--nav-shadow);
  
  /* Typography */
  font-family: inherit;
  
  /* Animation */
  transition: all var(--duration-normal) var(--timing-smooth);
}

.header-container {
  display: flex;
  align-items: center;
  padding-block: 1rem;
  padding-inline: max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-right));
  max-inline-size: 1400px;
  margin-inline: auto;
  min-block-size: var(--header-height-mobile);
}

/* ===== NAVIGATION BRAND ===== */
.nav-brand {
  margin-inline-end: auto;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
  border-radius: 8px;
  transition: transform var(--duration-fast) var(--timing-smooth);
}

.brand-link:hover,
.brand-link:focus-visible {
  transform: scale(1.05);
}

.brand-logo {
  block-size: clamp(40px, 8vw, 60px);
  inline-size: auto;
  color: var(--nav-accent);
  transition: color var(--duration-normal) var(--timing-smooth);
}

/* ===== MOBILE MENU TOGGLE ===== */
.mobile-menu-toggle {
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  /* Size */
  inline-size: 48px;
  block-size: 48px;
  
  /* Visual */
  background: transparent;
  border: none;
  color: var(--nav-text);
  cursor: pointer;
  border-radius: 8px;
  
  /* Animation */
  transition: all var(--duration-fast) var(--timing-smooth);
}

.mobile-menu-toggle:hover,
.mobile-menu-toggle:focus-visible {
  background: rgba(190, 176, 147, 0.1);
  color: var(--nav-text-hover);
}

.toggle-icon {
  position: relative;
  inline-size: 24px;
  block-size: 18px;
}

.toggle-line {
  /* Layout */
  display: block;
  position: absolute;
  
  /* Size */
  inline-size: 100%;
  block-size: 2px;
  
  /* Visual */
  background: currentColor;
  border-radius: 1px;
  
  /* Animation */
  transition: all var(--duration-normal) var(--timing-smooth);
}

.toggle-line:nth-child(1) {
  inset-block-start: 0;
}

.toggle-line:nth-child(2) {
  inset-block-start: 8px;
}

.toggle-line:nth-child(3) {
  inset-block-start: 16px;
}

/* Active state animations */
.mobile-menu-toggle[aria-expanded="true"] .toggle-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-menu-toggle[aria-expanded="true"] .toggle-line:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.mobile-menu-toggle[aria-expanded="true"] .toggle-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* ===== DESKTOP NAVIGATION ===== */
.navigation-menu {
  display: none;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  position: relative;
}

.nav-link {
  /* Layout */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  
  /* Visual */
  color: var(--nav-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 8px;
  
  /* Interactive */
  min-block-size: 44px;
  cursor: pointer;
  border: none;
  background: transparent;
  
  /* Animation */
  transition: all var(--duration-fast) var(--timing-smooth);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 50%;
  inline-size: 0;
  block-size: 2px;
  background: var(--nav-accent);
  transform: translateX(-50%);
  transition: inline-size var(--duration-normal) var(--timing-smooth);
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--nav-text-hover);
  background: rgba(190, 176, 147, 0.08);
}

.nav-link:hover::before,
.nav-link:focus-visible::before {
  inline-size: 80%;
}

/* ===== CTA BUTTON ===== */
.nav-cta-button {
  /* Visual */
  background: linear-gradient(135deg, var(--nav-accent) 0%, #D4C5A3 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(190, 176, 147, 0.3);
}

.nav-cta-button::before {
  background: rgba(255, 255, 255, 0.2);
}

.nav-cta-button:hover,
.nav-cta-button:focus-visible {
  background: linear-gradient(135deg, #D4C5A3 0%, var(--nav-accent) 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(190, 176, 147, 0.4);
}

.cta-icon {
  transition: transform var(--duration-fast) var(--timing-smooth);
}

.nav-cta-button:hover .cta-icon {
  transform: scale(1.1) rotate(5deg);
}

/* ===== DROPDOWN SYSTEM ===== */
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  position: relative;
}

.dropdown-arrow {
  transition: transform var(--duration-fast) var(--timing-smooth);
  opacity: 0.7;
}

.dropdown-trigger[aria-expanded="true"] .dropdown-arrow {
  transform: rotate(180deg);
  opacity: 1;
}

.dropdown-menu {
  /* Layout */
  position: absolute;
  inset-block-start: calc(100% + 8px);
  inset-inline-start: 0;
  min-inline-size: 220px;
  
  /* Visual */
  background: var(--dropdown-bg);
  backdrop-filter: var(--dropdown-blur);
  -webkit-backdrop-filter: var(--dropdown-blur);
  border: 1px solid var(--dropdown-border);
  border-radius: 12px;
  box-shadow: var(--dropdown-shadow);
  
  /* Layout */
  padding: 0.5rem;
  
  /* Animation */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all var(--duration-normal) var(--timing-smooth);
  
  /* Layer */
  z-index: 1100;
}

.dropdown-trigger[aria-expanded="true"] + .dropdown-menu,
.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  /* Layout */
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  
  /* Visual */
  color: var(--nav-text);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  
  /* Animation */
  transition: all var(--duration-fast) var(--timing-smooth);
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 50%;
  inline-size: 3px;
  block-size: 0;
  background: var(--nav-accent);
  transform: translateY(-50%);
  transition: block-size var(--duration-fast) var(--timing-smooth);
}

.dropdown-item:hover,
.dropdown-item:focus-visible {
  color: var(--nav-text-hover);
  background: rgba(190, 176, 147, 0.08);
  transform: translateX(4px);
}

.dropdown-item:hover::before,
.dropdown-item:focus-visible::before {
  block-size: 20px;
}

/* ===== MOBILE NAVIGATION ===== */
.mobile-navigation {
  /* Layout */
  position: fixed;
  inset-block-start: 0;
  inset-inline-end: calc(-1 * var(--mobile-menu-width));
  inline-size: var(--mobile-menu-width);
  block-size: 100vh;
  
  /* Visual */
  background: var(--mobile-menu-bg);
  backdrop-filter: var(--mobile-menu-blur);
  -webkit-backdrop-filter: var(--mobile-menu-blur);
  border-inline-start: 1px solid var(--nav-border);
  
  /* Layer */
  z-index: 1200;
  
  /* Animation */
  transition: transform var(--duration-slow) var(--timing-smooth);
  transform: translateX(0);
}

.mobile-navigation[aria-hidden="false"] {
  transform: translateX(calc(-1 * var(--mobile-menu-width)));
}

.mobile-menu-content {
  /* Layout */
  display: flex;
  flex-direction: column;
  block-size: 100%;
  padding: calc(var(--emergency-height) + var(--header-height-mobile) + 1rem) 1.5rem 2rem;
  
  /* Scroll */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav-item .nav-link {
  /* Layout */
  inline-size: 100%;
  padding: 1rem 1.5rem;
  justify-content: flex-start;
  
  /* Typography */
  font-size: 1.1rem;
  font-weight: 600;
  
  /* Visual */
  border-radius: 12px;
}

.mobile-cta-section .nav-cta-button {
  margin-block-start: 1rem;
  inline-size: 100%;
  justify-content: center;
}

.mobile-language-section {
  margin-block-start: auto;
  padding-block-start: 2rem;
  border-block-start: 1px solid var(--nav-border);
}

/* ===== NAVIGATION BACKDROP ===== */
.nav-backdrop {
  /* Layout */
  position: fixed;
  inset: 0;
  
  /* Visual */
  background: var(--mobile-backdrop);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  /* State */
  opacity: 0;
  visibility: hidden;
  
  /* Layer */
  z-index: 1100;
  
  /* Animation */
  transition: all var(--duration-normal) var(--timing-smooth);
}

.nav-backdrop[aria-hidden="false"] {
  opacity: 1;
  visibility: visible;
}

/* ===== BREADCRUMB NAVIGATION ===== */
.breadcrumb-navigation {
  /* Layout */
  position: sticky;
  top: calc(var(--emergency-height) + var(--header-height-mobile));
  
  /* Visual */
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-block-end: 1px solid rgba(0, 0, 0, 0.05);
  
  /* Typography */
  font-size: 0.875rem;
  
  /* Layer */
  z-index: 900;
  
  /* Animation */
  transition: all var(--duration-normal) var(--timing-smooth);
}

.breadcrumb-container {
  padding: 0.75rem max(1rem, env(safe-area-inset-left)) 0.75rem max(1rem, env(safe-area-inset-right));
  max-inline-size: 1400px;
  margin-inline: auto;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  color: #6B7280;
  font-weight: 400;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin-inline: 0.5rem;
  color: #D1D5DB;
  font-weight: 300;
}

.breadcrumb-link {
  /* Layout */
  padding: 0.5rem 0.75rem;
  
  /* Visual */
  color: var(--nav-accent);
  text-decoration: none;
  border-radius: 6px;
  
  /* Interactive */
  min-block-size: 44px;
  display: inline-flex;
  align-items: center;
  
  /* Animation */
  transition: all var(--duration-fast) var(--timing-smooth);
}

.breadcrumb-link:hover,
.breadcrumb-link:focus-visible {
  color: var(--nav-text-hover);
  background: rgba(190, 176, 147, 0.08);
  text-decoration: underline;
}

.breadcrumb-current {
  color: #374151;
  font-weight: 500;
}

/* ===== RTL SUPPORT ===== */
[dir="rtl"] .mobile-navigation {
  inset-inline-end: auto;
  inset-inline-start: calc(-1 * var(--mobile-menu-width));
  border-inline-start: none;
  border-inline-end: 1px solid var(--nav-border);
}

[dir="rtl"] .mobile-navigation[aria-hidden="false"] {
  transform: translateX(var(--mobile-menu-width));
}

[dir="rtl"] .dropdown-menu {
  inset-inline-start: auto;
  inset-inline-end: 0;
}

[dir="rtl"] .dropdown-item {
  text-align: right;
}

[dir="rtl"] .dropdown-item::before {
  inset-inline-start: auto;
  inset-inline-end: 0;
}

[dir="rtl"] .dropdown-item:hover,
[dir="rtl"] .dropdown-item:focus-visible {
  transform: translateX(-4px);
}

/* ===== CONTAINER QUERIES ===== */
@container header (inline-size > 30rem) {
  .header-container {
    padding-inline: 2rem;
  }
}

@container header (inline-size > 48rem) {
  .mobile-menu-toggle {
    display: none;
  }
  
  .navigation-menu {
    display: block;
  }
  
  .header-container {
    min-block-size: var(--header-height-tablet);
  }
}

@container header (inline-size > 64rem) {
  .header-container {
    min-block-size: var(--header-height-desktop);
    padding-inline: 3rem;
  }
  
  .nav-list {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
  
  .brand-logo {
    block-size: clamp(50px, 6vw, 70px);
  }
}

@container header (inline-size > 80rem) {
  .header-container {
    padding-inline: 4rem;
  }
  
  .nav-list {
    gap: 1.5rem;
  }
  
  .dropdown-menu {
    min-inline-size: 280px;
  }
}

/* ===== RESPONSIVE BREAKPOINTS ===== */
@media (width >= 768px) {
  .breadcrumb-navigation {
    top: calc(var(--emergency-height) + var(--header-height-tablet));
  }
}

@media (width >= 1024px) {
  .breadcrumb-navigation {
    top: calc(var(--emergency-height) + var(--header-height-desktop));
  }
}

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .emergency-cta::before,
  .nav-link::before,
  .dropdown-item::before {
    transition: none;
  }
}

/* Focus management */
.modern-header :focus-visible {
  outline: 3px solid var(--nav-accent);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ===== LANGUAGE-SPECIFIC STYLES ===== */
.modern-header[data-language="ar"] {
  font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', sans-serif;
}

.modern-header[data-language="ar"] .nav-link,
.modern-header[data-language="ar"] .dropdown-item {
  font-weight: 500;
  letter-spacing: 0;
}

.modern-header[data-language="ar"] .nav-text {
  line-height: 1.6;
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */
.modern-header {
  contain: layout style paint;
  will-change: transform;
}

.nav-link,
.dropdown-item,
.emergency-cta {
  will-change: transform, background-color;
}

.mobile-navigation {
  contain: layout style paint;
}

/* ===== PRINT STYLES ===== */
@media print {
  .modern-emergency-banner,
  .mobile-menu-toggle,
  .nav-backdrop {
    display: none !important;
  }
  
  .modern-header {
    position: static;
    background: white;
    box-shadow: none;
  }
  
  .navigation-menu {
    display: block;
  }
  
  .nav-link {
    color: black;
    text-decoration: underline;
  }
}

/* ===== SCROLL BEHAVIOR ENHANCEMENTS ===== */
@supports (animation-timeline: scroll()) {
  .modern-header {
    animation: header-scroll-blur linear;
    animation-timeline: scroll();
    animation-range: 0 200px;
  }
  
  @keyframes header-scroll-blur {
    to {
      backdrop-filter: blur(25px) saturate(180%) brightness(1.02);
      -webkit-backdrop-filter: blur(25px) saturate(180%) brightness(1.02);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }
  }
}
`;