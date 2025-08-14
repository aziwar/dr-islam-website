// RESPONSIVE-CONTAINERS.CSS.JS - Device-specific container system
// Modern responsive containers with fixed max-widths per device type

export const RESPONSIVE_CONTAINERS_CSS = `
/* Device-Specific Container System - Fixed breakpoints for consistent layouts */
@layer responsive-containers, device-containers, container-utilities;

@layer responsive-containers {
  /* Root container system - Progressive sizing */
  :root {
    /* Device breakpoint definitions */
    --mobile-width: 375px;        /* iPhone standard */
    --mobile-large: 414px;        /* iPhone Plus */
    --tablet-width: 768px;        /* iPad standard */
    --tablet-large: 1024px;       /* iPad Pro */
    --desktop-width: 1200px;      /* Standard desktop */
    --desktop-large: 1440px;      /* Large desktop */
    --desktop-xl: 1920px;         /* 4K displays */
    
    /* Container padding per device */
    --container-padding-mobile: 16px;
    --container-padding-tablet: 24px;
    --container-padding-desktop: 32px;
    
    /* Dynamic container padding */
    --container-padding: var(--container-padding-mobile);
  }
  
  /* Base container with progressive max-widths */
  .container {
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--container-padding);
    
    /* Enable container queries */
    container-type: inline-size;
    container-name: main-container;
    
    /* Progressive sizing - Mobile first */
    max-width: 100%;
  }
  
  /* Device-specific max-widths with exact breakpoints */
  @media (min-width: 375px) {
    :root { --container-padding: var(--container-padding-mobile); }
    .container { max-width: var(--mobile-width); }
  }
  
  @media (min-width: 414px) {
    .container { max-width: var(--mobile-large); }
  }
  
  @media (min-width: 768px) {
    :root { --container-padding: var(--container-padding-tablet); }
    .container { max-width: var(--tablet-width); }
  }
  
  @media (min-width: 1024px) {
    .container { max-width: var(--tablet-large); }
  }
  
  @media (min-width: 1200px) {
    :root { --container-padding: var(--container-padding-desktop); }
    .container { max-width: var(--desktop-width); }
  }
  
  @media (min-width: 1440px) {
    .container { max-width: var(--desktop-large); }
  }
  
  @media (min-width: 1920px) {
    .container { max-width: var(--desktop-xl); }
  }
  
  /* Fluid container - No max-width constraints */
  .container-fluid {
    width: 100%;
    padding-inline: var(--container-padding);
    container-type: inline-size;
  }
  
  /* Narrow container for text content */
  .container-narrow {
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--container-padding);
    container-type: inline-size;
    
    max-width: min(65ch, calc(100% - 2rem));
  }
  
  /* Wide container for media content */
  .container-wide {
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--container-padding);
    container-type: inline-size;
    
    max-width: calc(var(--desktop-large) + 200px);
  }
}

@layer device-containers {
  /* Device-specific container variants */
  .container-mobile {
    container-type: inline-size;
    max-width: var(--mobile-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-mobile);
  }
  
  .container-tablet {
    container-type: inline-size;
    max-width: var(--tablet-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-tablet);
  }
  
  .container-desktop {
    container-type: inline-size;
    max-width: var(--desktop-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-desktop);
  }
  
  /* Responsive section containers */
  .section-container {
    container-type: inline-size;
    container-name: section;
    
    padding-block: clamp(2rem, 5vw, 4rem);
    padding-inline: var(--container-padding);
  }
  
  /* Header container - Always full width with inner constraint */
  .header-container {
    width: 100%;
    background: var(--white);
    border-bottom: 1px solid #e5e5e5;
    
    container-type: inline-size;
    container-name: header;
  }
  
  .header-inner {
    max-width: var(--desktop-width);
    margin-inline: auto;
    padding-inline: var(--container-padding);
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: var(--nav-height, 64px);
  }
  
  /* Hero container - Full viewport with content constraint */
  .hero-container {
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    container-type: inline-size;
    container-name: hero;
  }
  
  .hero-inner {
    width: 100%;
    max-width: var(--desktop-width);
    margin-inline: auto;
    padding-inline: var(--container-padding);
    text-align: center;
  }
  
  /* Content containers with optimal reading widths */
  .content-container {
    container-type: inline-size;
    container-name: content;
    
    max-width: min(75ch, 100%);
    margin-inline: auto;
    padding-inline: var(--container-padding);
  }
  
  /* Grid container for card layouts */
  .grid-container {
    container-type: inline-size;
    container-name: grid;
    
    width: 100%;
    padding-inline: var(--container-padding);
    
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }
  
  /* Container query responsive grid */
  @container grid (min-width: 500px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @container grid (min-width: 900px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @container grid (min-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  /* Form container with optimal width */
  .form-container-responsive {
    container-type: inline-size;
    container-name: form-responsive;
    
    width: 100%;
    max-width: 600px;
    margin-inline: auto;
    padding: var(--space-xl);
    
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }
  
  @container form-responsive (min-width: 400px) {
    .form-container-responsive .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }
  }
}

@layer container-utilities {
  /* Container query utilities */
  .cq-container { container-type: inline-size; }
  .cq-size { container-type: size; }
  .cq-normal { container-type: normal; }
  
  /* Named containers */
  .cq-sidebar { container-name: sidebar; }
  .cq-main { container-name: main; }
  .cq-card { container-name: card; }
  .cq-widget { container-name: widget; }
  .cq-gallery { container-name: gallery; }
  .cq-navigation { container-name: navigation; }
  
  /* Container padding utilities */
  .container-p-none { padding-inline: 0; }
  .container-p-sm { padding-inline: var(--space-sm); }
  .container-p-md { padding-inline: var(--space-md); }
  .container-p-lg { padding-inline: var(--space-lg); }
  .container-p-xl { padding-inline: var(--space-xl); }
  
  /* Container width utilities */
  .w-container { max-width: var(--desktop-width); }
  .w-container-sm { max-width: var(--tablet-width); }
  .w-container-lg { max-width: var(--desktop-large); }
  .w-full { max-width: none; width: 100%; }
  
  /* Responsive spacing */
  .space-y-responsive > * + * {
    margin-block-start: clamp(1rem, 4vw, 2rem);
  }
  
  .space-x-responsive > * + * {
    margin-inline-start: clamp(1rem, 4vw, 2rem);
  }
  
  /* Device-specific visibility */
  .mobile-only { display: block; }
  .tablet-only { display: none; }
  .desktop-only { display: none; }
  
  @media (min-width: 768px) {
    .mobile-only { display: none; }
    .tablet-only { display: block; }
  }
  
  @media (min-width: 1200px) {
    .tablet-only { display: none; }
    .desktop-only { display: block; }
  }
  
  /* Container query based visibility */
  .cq-show-sm { display: none; }
  .cq-show-md { display: none; }
  .cq-show-lg { display: none; }
  
  @container (min-width: 640px) {
    .cq-show-sm { display: block; }
    .cq-hide-sm { display: none; }
  }
  
  @container (min-width: 768px) {
    .cq-show-md { display: block; }
    .cq-hide-md { display: none; }
  }
  
  @container (min-width: 1024px) {
    .cq-show-lg { display: block; }
    .cq-hide-lg { display: none; }
  }
}

/* Container scaling system */
.container-scale {
  --scale: clamp(0.8, calc(100vw / 1200), 1.2);
  transform: scale(var(--scale));
  transform-origin: center;
}

/* Aspect ratio containers */
.aspect-container {
  position: relative;
  container-type: inline-size;
}

.aspect-container::before {
  content: '';
  display: block;
  padding-block-start: var(--aspect-ratio, 56.25%); /* 16:9 default */
}

.aspect-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Aspect ratio variants */
.aspect-square { --aspect-ratio: 100%; }
.aspect-video { --aspect-ratio: 56.25%; }
.aspect-photo { --aspect-ratio: 75%; }
.aspect-golden { --aspect-ratio: 61.8%; }

/* Debug utilities for development */
.debug-container {
  outline: 2px dashed red;
  outline-offset: -2px;
  position: relative;
}

.debug-container::before {
  content: attr(data-container-name, 'container');
  position: absolute;
  top: 0;
  left: 0;
  background: red;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  font-family: monospace;
  z-index: 1000;
}

/* Performance optimizations */
.container,
.container-fluid,
.container-narrow,
.container-wide,
.section-container,
.grid-container {
  contain: layout style;
}

/* Container query fallbacks */
@supports not (container-type: inline-size) {
  /* Fallback to media queries for browsers without container query support */
  
  @media (min-width: 640px) {
    .cq-show-sm { display: block !important; }
    .cq-hide-sm { display: none !important; }
    .grid-container { grid-template-columns: repeat(2, 1fr); }
  }
  
  @media (min-width: 768px) {
    .cq-show-md { display: block !important; }
    .cq-hide-md { display: none !important; }
    .grid-container { grid-template-columns: repeat(3, 1fr); }
    .form-container-responsive .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }
  }
  
  @media (min-width: 1024px) {
    .cq-show-lg { display: block !important; }
    .cq-hide-lg { display: none !important; }
    .grid-container { grid-template-columns: repeat(4, 1fr); }
  }
}
`;

// Auto-inject responsive containers CSS
if (typeof document !== 'undefined') {
  const loadResponsiveContainersCSS = () => {
    if (document.getElementById('responsive-containers-css')) return;
    
    const style = document.createElement('style');
    style.id = 'responsive-containers-css';
    style.innerHTML = RESPONSIVE_CONTAINERS_CSS;
    document.head.appendChild(style);
  };
  
  // Load after critical CSS
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadResponsiveContainersCSS, 75));
  } else {
    setTimeout(loadResponsiveContainersCSS, 75);
  }
}