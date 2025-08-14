// NAVIGATION-TOUCH.CSS.JS - Touch-optimized navigation system
// 44px minimum touch targets with modern mobile-first design

export const NAVIGATION_TOUCH_CSS = `
/* Touch-Optimized Navigation - WCAG AAA compliant touch targets */
@layer navigation-base, navigation-mobile, navigation-desktop, navigation-gestures;

@layer navigation-base {
  /* Navigation container with proper touch zones */
  .touch-nav {
    position: sticky;
    top: var(--emergency-banner-height, 0);
    z-index: var(--z-fixed);
    
    container-type: inline-size;
    container-name: navigation;
    
    /* Modern glassmorphism */
    background: rgb(255 255 255 / 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgb(0 0 0 / 0.05);
    
    /* Smooth transitions */
    transition: all 0.3s var(--ease-out);
    
    /* Performance optimization */
    contain: layout style paint;
  }
  
  .touch-nav.scrolled {
    background: rgb(255 255 255 / 0.98);
    box-shadow: var(--shadow-sm);
  }
  
  /* Navigation inner container */
  .nav-inner {
    max-width: var(--desktop-width);
    margin-inline: auto;
    padding-inline: var(--container-padding);
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    /* Touch-friendly height */
    min-height: 64px;
    
    container-type: inline-size;
    container-name: nav-inner;
  }
  
  /* Logo with proper touch target */
  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--primary);
    
    /* Touch-friendly padding */
    padding: var(--space-xs);
    border-radius: var(--radius-md);
    
    /* Minimum touch target */
    min-height: 44px;
    min-width: 44px;
    
    transition: var(--transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-logo:hover,
  .nav-logo:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }
  
  .logo-image {
    height: clamp(32px, 5vw, 48px);
    width: clamp(32px, 5vw, 48px);
    object-fit: contain;
    image-rendering: optimizeQuality;
  }
  
  .logo-text {
    margin-inline-start: var(--space-sm);
    font-weight: var(--weight-bold);
    font-size: clamp(1rem, 3vw, 1.25rem);
  }
  
  /* Navigation links - Hidden on mobile by default */
  .nav-links {
    display: none;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--space-sm);
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    
    text-decoration: none;
    color: var(--text);
    font-weight: var(--weight-medium);
    font-size: var(--text-sm);
    
    /* Touch-friendly sizing */
    padding: var(--space-sm) var(--space-md);
    min-height: 44px;
    min-width: 44px;
    
    border-radius: var(--radius-lg);
    position: relative;
    
    transition: var(--transition-normal);
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Active link indicator */
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 3px;
    background: var(--primary);
    border-radius: 1.5px;
    transition: var(--transition-fast);
    transform: translateX(-50%);
  }
  
  .nav-link:hover,
  .nav-link:focus {
    color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }
  
  .nav-link:hover::after,
  .nav-link.active::after {
    width: 80%;
  }
  
  .nav-link.active {
    color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.1);
  }
}

@layer navigation-mobile {
  /* Mobile hamburger menu */
  .nav-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    background: none;
    border: none;
    cursor: pointer;
    
    /* Touch-friendly size */
    padding: var(--space-sm);
    width: 48px;
    height: 48px;
    
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
  
  /* Hamburger lines */
  .hamburger-line {
    display: block;
    width: 24px;
    height: 3px;
    background: var(--text);
    margin: 3px 0;
    border-radius: 1.5px;
    transition: var(--transition-fast);
  }
  
  /* Animated hamburger to X */
  .nav-toggle.is-open .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }
  
  .nav-toggle.is-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.is-open .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
  
  /* Mobile navigation panel */
  .nav-mobile {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(85vw, 400px);
    z-index: var(--z-modal);
    
    /* Modern glassmorphism */
    background: rgb(255 255 255 / 0.98);
    backdrop-filter: blur(25px) saturate(180%);
    border-left: 1px solid rgb(0 0 0 / 0.05);
    box-shadow: var(--shadow-2xl);
    
    /* Sliding animation */
    transform: translateX(100%);
    transition: transform 0.4s var(--ease-out);
    
    /* Scrollable content */
    overflow-y: auto;
    overscroll-behavior: contain;
    
    /* Safe area support for notched devices */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .nav-mobile.is-open {
    transform: translateX(0);
  }
  
  /* RTL mobile navigation */
  [dir="rtl"] .nav-mobile {
    right: auto;
    left: 0;
    border-left: none;
    border-right: 1px solid rgb(0 0 0 / 0.05);
    transform: translateX(-100%);
  }
  
  [dir="rtl"] .nav-mobile.is-open {
    transform: translateX(0);
  }
  
  /* Mobile navigation header */
  .nav-mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg) var(--space-xl);
    border-bottom: 1px solid rgb(0 0 0 / 0.05);
  }
  
  .nav-mobile-close {
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: none;
    border: none;
    cursor: pointer;
    
    /* Touch-friendly size */
    width: 48px;
    height: 48px;
    
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-mobile-close:hover,
  .nav-mobile-close:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }
  
  /* Mobile navigation content */
  .nav-mobile-content {
    padding: var(--space-lg) 0;
  }
  
  .nav-mobile-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-mobile-link {
    display: flex;
    align-items: center;
    
    text-decoration: none;
    color: var(--text);
    font-weight: var(--weight-medium);
    font-size: var(--text-lg);
    
    /* Touch-friendly sizing */
    padding: var(--space-md) var(--space-xl);
    min-height: 56px;
    
    transition: var(--transition-fast);
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-mobile-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 40%;
    background: var(--primary);
    border-radius: 0 2px 2px 0;
    transform: translateY(-50%);
    transition: var(--transition-fast);
  }
  
  .nav-mobile-link:hover,
  .nav-mobile-link:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    color: var(--primary);
  }
  
  .nav-mobile-link:hover::before,
  .nav-mobile-link.active::before {
    width: 4px;
  }
  
  .nav-mobile-link.active {
    background: rgb(var(--primary-rgb) / 0.1);
    color: var(--primary);
  }
  
  /* RTL mobile link indicators */
  [dir="rtl"] .nav-mobile-link::before {
    left: auto;
    right: 0;
    border-radius: 2px 0 0 2px;
  }
  
  /* Mobile navigation backdrop */
  .nav-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
  
  /* Mobile CTA button */
  .nav-mobile-cta {
    margin: var(--space-lg) var(--space-xl);
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    text-decoration: none;
    font-weight: var(--weight-semibold);
    font-size: var(--text-lg);
    
    /* Touch-friendly sizing */
    padding: var(--space-md) var(--space-lg);
    min-height: 56px;
    
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
  }
  
  .nav-mobile-cta:hover,
  .nav-mobile-cta:focus {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

@layer navigation-desktop {
  /* Desktop navigation - Show links, hide mobile menu */
  @container navigation (min-width: 768px) {
    .nav-links {
      display: flex;
    }
    
    .nav-toggle {
      display: none;
    }
    
    .nav-mobile {
      display: none;
    }
    
    .nav-backdrop {
      display: none;
    }
  }
  
  /* Large desktop navigation enhancements */
  @container navigation (min-width: 1200px) {
    .nav-inner {
      padding-inline: var(--space-xl);
    }
    
    .nav-links {
      gap: var(--space-md);
    }
    
    .nav-link {
      padding: var(--space-md) var(--space-lg);
      font-size: var(--text-base);
    }
  }
  
  /* Desktop hover effects */
  @media (hover: hover) {
    .nav-link:hover {
      transform: translateY(-1px);
    }
    
    .nav-logo:hover .logo-image {
      transform: scale(1.05);
    }
  }
  
  /* Desktop keyboard navigation */
  @media (hover: hover) {
    .nav-link:focus-visible {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
    }
  }
}

@layer navigation-gestures {
  /* Swipe gestures for mobile navigation */
  .nav-mobile.swipe-active {
    transition: none;
    transform: translateX(var(--swipe-distance, 0));
  }
  
  .nav-mobile.will-close {
    opacity: 0.8;
  }
  
  /* Pull-down refresh gesture indicator */
  .nav-refresh-indicator {
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
    color: var(--text-inverse);
    
    opacity: 0;
    transform: translateX(-50%) scale(0.5);
    transition: var(--transition-fast);
  }
  
  .nav-refresh-indicator.active {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  
  /* Scroll-based navigation compression */
  .touch-nav.compressed {
    min-height: 48px;
  }
  
  .touch-nav.compressed .nav-inner {
    min-height: 48px;
  }
  
  .touch-nav.compressed .nav-logo {
    min-height: 40px;
    min-width: 40px;
  }
  
  .touch-nav.compressed .logo-image {
    height: clamp(24px, 4vw, 32px);
    width: clamp(24px, 4vw, 32px);
  }
  
  /* Floating action button for mobile */
  .nav-fab {
    position: fixed;
    bottom: var(--space-lg);
    right: var(--space-lg);
    z-index: var(--z-fixed);
    
    width: 56px;
    height: 56px;
    background: var(--primary);
    color: var(--text-inverse);
    border: none;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: var(--transition-normal);
    
    /* Hide on desktop */
    display: none;
  }
  
  @container navigation (max-width: 767px) {
    .nav-fab {
      display: flex;
    }
  }
  
  .nav-fab:hover,
  .nav-fab:focus {
    transform: scale(1.1);
    box-shadow: var(--shadow-xl);
  }
  
  /* RTL FAB position */
  [dir="rtl"] .nav-fab {
    right: auto;
    left: var(--space-lg);
  }
  
  /* Scroll-to-top functionality */
  .nav-fab.scroll-to-top {
    background: var(--secondary);
    opacity: 0;
    visibility: hidden;
    transform: translateY(100px);
  }
  
  .nav-fab.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* Accessibility enhancements */
@media (prefers-reduced-motion: reduce) {
  .touch-nav,
  .nav-mobile,
  .nav-link,
  .nav-toggle,
  .hamburger-line {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .touch-nav {
    background: var(--white);
    border-bottom-width: 3px;
    border-bottom-color: var(--text);
  }
  
  .nav-link:focus,
  .nav-toggle:focus {
    outline-width: 4px;
    outline-color: var(--text);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .touch-nav {
    background: rgb(30 30 30 / 0.95);
    border-bottom-color: rgb(64 64 64 / 0.3);
  }
  
  .touch-nav.scrolled {
    background: rgb(30 30 30 / 0.98);
  }
  
  .nav-mobile {
    background: rgb(30 30 30 / 0.98);
    border-left-color: rgb(64 64 64 / 0.3);
  }
  
  .nav-mobile-header {
    border-bottom-color: rgb(64 64 64 / 0.3);
  }
  
  .hamburger-line {
    background: var(--text-inverse);
  }
}

/* Print styles */
@media print {
  .nav-toggle,
  .nav-mobile,
  .nav-backdrop,
  .nav-fab {
    display: none !important;
  }
  
  .touch-nav {
    position: static !important;
    background: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  
  .nav-links {
    display: flex !important;
  }
}

/* Force hardware acceleration */
.touch-nav,
.nav-mobile,
.nav-backdrop {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Performance optimizations */
.nav-link,
.nav-mobile-link,
.nav-toggle,
.nav-fab {
  contain: layout style;
}
`;

// Auto-inject navigation touch CSS
if (typeof document !== 'undefined') {
  const loadNavigationTouchCSS = () => {
    if (document.getElementById('navigation-touch-css')) return;
    
    const style = document.createElement('style');
    style.id = 'navigation-touch-css';
    style.innerHTML = NAVIGATION_TOUCH_CSS;
    document.head.appendChild(style);
  };
  
  // Load after responsive containers CSS
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadNavigationTouchCSS, 100));
  } else {
    setTimeout(loadNavigationTouchCSS, 100);
  }
  
  // Initialize touch navigation functionality
  const initTouchNavigation = () => {
    // Navigation scroll effects
    let lastScrollY = 0;
    const nav = document.querySelector('.touch-nav');
    
    if (nav) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Add scrolled class
        if (scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        
        // Auto-hide on scroll down (mobile only)
        if (window.innerWidth <= 768) {
          if (scrollY > lastScrollY && scrollY > 100) {
            nav.classList.add('compressed');
          } else {
            nav.classList.remove('compressed');
          }
        }
        
        lastScrollY = scrollY;
      }, { passive: true });
    }
    
    // Mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const mobile = document.querySelector('.nav-mobile');
    const backdrop = document.querySelector('.nav-backdrop');
    const close = document.querySelector('.nav-mobile-close');
    
    const openMobileMenu = () => {
      toggle?.classList.add('is-open');
      mobile?.classList.add('is-open');
      backdrop?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    
    const closeMobileMenu = () => {
      toggle?.classList.remove('is-open');
      mobile?.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      document.body.style.overflow = '';
    };
    
    toggle?.addEventListener('click', openMobileMenu);
    close?.addEventListener('click', closeMobileMenu);
    backdrop?.addEventListener('click', closeMobileMenu);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile?.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  };
  
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTouchNavigation);
  } else {
    setTimeout(initTouchNavigation, 150);
  }
}