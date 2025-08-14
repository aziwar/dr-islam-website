// LAYOUT.CSS.JS - Layout systems and responsive grids (≤12KB)
// Modern layout patterns with container queries and grid systems

export const LAYOUT_CSS = `
/* Continue CSS Layers from critical.css.js */
@layer layout-systems, responsive-grids, component-containers;

/* Layout Systems - Modern layout patterns */
@layer layout-systems {
  /* Hero Section - Full viewport responsive */
  .hero {
    /* Modern gradient with better performance */
    background: linear-gradient(-45deg, 
      var(--primary) 0%, 
      var(--primary-dark) 25%,
      var(--secondary-light) 50%, 
      var(--primary-light) 75%,
      var(--primary) 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    
    color: var(--text-inverse);
    min-block-size: clamp(60vh, 80vh, 100vh);
    
    /* Container query support */
    container-type: inline-size;
    container-name: hero;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    padding-block: var(--space-3xl);
    padding-inline: var(--space-md);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* Hero content container with responsive scaling */
  .hero .container {
    position: relative;
    z-index: 2;
  }

  /* Hero typography - responsive scaling */
  .hero h1 {
    font-family: 'Playfair Display', 'Source Serif Pro', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: var(--weight-bold);
    line-height: var(--leading-tight);
    margin-block-end: var(--space-md);
    text-shadow: 0 2px 4px rgb(0 0 0 / 0.3);
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  .hero .subtitle {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    line-height: var(--leading-relaxed);
    margin-block-end: var(--space-lg);
    opacity: 0.95;
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
    max-inline-size: 60ch;
    margin-inline: auto;
  }

  /* RTL Hero Typography */
  [dir="rtl"] .hero h1 {
    font-family: 'Amiri', 'Cairo', 'Tajawal', serif;
    letter-spacing: 0;
  }

  [dir="rtl"] .hero .subtitle {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', sans-serif;
    letter-spacing: 0;
  }

  /* Hero CTA Button */
  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    text-decoration: none;
    font-weight: var(--weight-bold);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    
    /* Responsive padding */
    padding-block: clamp(16px, 4vw, 20px);
    padding-inline: clamp(32px, 8vw, 45px);
    
    border-radius: 50px;
    border: 2px solid rgb(255 255 255 / 0.15);
    
    box-shadow: 
      var(--shadow-lg),
      inset 0 1px 0 rgb(255 255 255 / 0.1);
    
    /* Touch-friendly minimum size */
    min-block-size: 48px;
    min-inline-size: 160px;
    
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
    text-align: center;
    
    /* Performance optimizations */
    will-change: transform, box-shadow;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: 0;
    block-size: 0;
    background: rgb(255 255 255 / 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: inline-size 0.6s var(--ease-out), block-size 0.6s var(--ease-out);
    z-index: -1;
  }

  .cta-button:hover,
  .cta-button:focus {
    transform: translateY(-4px) scale(1.02);
    background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
    box-shadow: 
      var(--shadow-xl),
      inset 0 1px 0 rgb(255 255 255 / 0.2);
    border-color: rgb(255 255 255 / 0.25);
  }

  .cta-button:hover::before {
    inline-size: 300px;
    block-size: 300px;
  }

  .cta-button:active {
    transform: translateY(-2px) scale(1.01);
  }

  /* Desktop Hero Layout */
  @container hero (min-width: 1200px) {
    .hero .container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-3xl);
      align-items: center;
      text-align: start;
    }

    .hero-content {
      justify-self: start;
    }

    .hero-widget {
      justify-self: end;
    }
  }

  /* Trust Badges */
  .trust-badges {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    margin-block: var(--space-lg);
    flex-wrap: wrap;
  }

  .badge {
    background: rgb(255 255 255 / 0.2);
    padding: var(--space-xs) var(--space-md);
    border-radius: 25px;
    font-size: var(--text-sm);
    border: 1px solid rgb(255 255 255 / 0.3);
    backdrop-filter: blur(4px);
    white-space: nowrap;
  }

  /* Footer Layout */
  .site-footer {
    background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
    color: var(--text-inverse);
    padding-block: var(--space-3xl) var(--space-lg);
    position: relative;
    overflow: hidden;
    
    container-type: inline-size;
    container-name: footer;
  }

  .site-footer::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline: 0;
    block-size: 2px;
    background: linear-gradient(90deg, 
      var(--primary) 0%, 
      var(--primary-light) 50%, 
      var(--primary) 100%);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .footer-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  /* Footer responsive layout */
  @container footer (min-width: 768px) {
    .footer-main {
      grid-template-columns: 1fr 300px;
      gap: var(--space-2xl);
    }
  }

  @container footer (min-width: 1024px) {
    .footer-main {
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--space-3xl);
    }
  }

  /* Footer bottom */
  .footer-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-block-start: var(--space-xl);
    border-block-start: 1px solid rgb(var(--primary-rgb) / 0.2);
    align-items: center;
    text-align: center;
  }

  @container footer (min-width: 768px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      text-align: start;
    }
  }
}

/* Responsive Grids - Modern grid systems */
@layer responsive-grids {
  /* Services Grid - Responsive with container queries */
  .services-grid {
    container-type: inline-size;
    container-name: services;
    
    display: grid;
    gap: var(--space-lg);
    
    /* Mobile-first: single column */
    grid-template-columns: 1fr;
  }

  /* Container query breakpoints for services grid */
  @container services (min-width: 500px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container services (min-width: 900px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @container services (min-width: 1200px) {
    .services-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Gallery Grid - Responsive masonry-style */
  .gallery-grid {
    container-type: inline-size;
    container-name: gallery;
    
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }

  @container gallery (min-width: 400px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container gallery (min-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @container gallery (min-width: 1200px) {
    .gallery-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Stats Grid */
  .stats-grid {
    container-type: inline-size;
    container-name: stats;
    
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }

  @container stats (min-width: 600px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container stats (min-width: 1000px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Testimonials Grid */
  .testimonials-grid {
    container-type: inline-size;
    container-name: testimonials;
    
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }

  @container testimonials (min-width: 700px) {
    .testimonials-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container testimonials (min-width: 1100px) {
    .testimonials-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Contact Cards Grid */
  .contact-cards {
    container-type: inline-size;
    container-name: contact;
    
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }

  @container contact (min-width: 600px) {
    .contact-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container contact (min-width: 1000px) {
    .contact-cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Generic responsive grid utility */
  .responsive-grid {
    container-type: inline-size;
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }

  @container (min-width: 500px) {
    .responsive-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @container (min-width: 800px) {
    .responsive-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @container (min-width: 1200px) {
    .responsive-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

/* Component Containers - Container-based component sizing */
@layer component-containers {
  /* Section containers */
  section {
    container-type: inline-size;
    padding-block: var(--space-2xl);
    padding-inline: var(--container-padding);
  }

  .section-header {
    text-align: center;
    margin-block-end: var(--space-2xl);
    max-inline-size: 60ch;
    margin-inline: auto;
  }

  .section-title {
    font-size: var(--text-3xl);
    font-weight: var(--weight-bold);
    margin-block-end: var(--space-sm);
    color: var(--primary-dark);
  }

  .section-subtitle {
    font-size: var(--text-lg);
    color: var(--text-light);
    margin-block-end: var(--space-md);
  }

  /* About section layout */
  .about-content {
    container-type: inline-size;
    container-name: about;
    
    display: grid;
    gap: var(--space-xl);
    grid-template-columns: 1fr;
    align-items: center;
  }

  @container about (min-width: 800px) {
    .about-content {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Contact section layout */
  .contact-section {
    container-type: inline-size;
    container-name: contact-section;
    
    display: grid;
    gap: var(--space-2xl);
    grid-template-columns: 1fr;
  }

  @container contact-section (min-width: 900px) {
    .contact-section {
      grid-template-columns: 2fr 1fr;
    }
  }

  /* FAQ layout */
  .faq-container {
    container-type: inline-size;
    container-name: faq;
    
    display: grid;
    gap: var(--space-xl);
    grid-template-columns: 1fr;
  }

  @container faq (min-width: 900px) {
    .faq-container {
      grid-template-columns: 1fr 300px;
    }
  }

  /* Breadcrumb navigation */
  .breadcrumb-nav {
    background: rgb(255 255 255 / 0.95);
    backdrop-filter: blur(10px);
    border-block-end: 1px solid #e5e5e5;
    padding-block: var(--space-sm);
    position: sticky;
    top: calc(var(--nav-height) + var(--emergency-banner-height, 40px));
    z-index: var(--z-sticky);
    
    container-type: inline-size;
  }

  .breadcrumb-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2xs);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--text-sm);
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
  }

  .breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin-inline: var(--space-xs);
    color: var(--text-muted);
  }

  .breadcrumb-item a {
    color: var(--primary);
    text-decoration: none;
    padding: var(--space-2xs) var(--space-xs);
    min-block-size: 32px;
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
  }

  .breadcrumb-item a:hover,
  .breadcrumb-item a:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }

  .breadcrumb-item.active {
    color: var(--text);
    font-weight: var(--weight-medium);
  }

  /* RTL breadcrumb support */
  [dir="rtl"] .breadcrumb-item:not(:last-child)::after {
    content: '\\';
  }
}

/* Sticky Elements */
.sticky-book {
  position: fixed;
  inset-block-end: var(--space-xl);
  inset-inline-end: var(--space-md);
  z-index: var(--z-fixed);
  
  background: var(--success);
  color: var(--text-inverse);
  text-decoration: none;
  font-weight: var(--weight-semibold);
  font-size: var(--text-base);
  
  padding: var(--space-sm) var(--space-lg);
  border-radius: 50px;
  box-shadow: var(--shadow-lg);
  
  /* Touch-friendly */
  min-block-size: 48px;
  min-inline-size: 48px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  
  transition: var(--transition-normal);
  animation: pulse 2s infinite;
  
  -webkit-tap-highlight-color: transparent;
}

@keyframes pulse {
  0%, 100% { box-shadow: var(--shadow-lg); }
  50% { box-shadow: 0 8px 30px rgb(var(--success-rgb) / 0.5); }
}

.sticky-book:hover,
.sticky-book:focus {
  transform: scale(1.05);
  background: color-mix(in srgb, var(--success) 90%, black 10%);
}

/* RTL sticky button */
[dir="rtl"] .sticky-book {
  inset-inline-end: auto;
  inset-inline-start: var(--space-md);
}

/* Fallback for browsers without container queries */
@supports not (container-type: inline-size) {
  @media (width >= 500px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .responsive-grid { grid-template-columns: repeat(2, 1fr); }
  }
  
  @media (width >= 768px) {
    .services-grid { grid-template-columns: repeat(3, 1fr); }
    .gallery-grid { grid-template-columns: repeat(3, 1fr); }
    .responsive-grid { grid-template-columns: repeat(3, 1fr); }
    
    .about-content { grid-template-columns: 1fr 1fr; }
    .footer-main { grid-template-columns: 1fr 300px; }
    .footer-bottom { flex-direction: row; justify-content: space-between; }
  }
  
  @media (width >= 1000px) {
    .services-grid { grid-template-columns: repeat(4, 1fr); }
    .stats-grid { grid-template-columns: repeat(4, 1fr); }
  }
  
  @media (width >= 1200px) {
    .gallery-grid { grid-template-columns: repeat(4, 1fr); }
    .hero .container { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-3xl); }
  }
}
`;

// Auto-inject layout CSS (loaded after critical CSS)
if (typeof document !== 'undefined') {
  const loadLayoutCSS = () => {
    if (document.getElementById('layout-css')) return;
    
    const style = document.createElement('style');
    style.id = 'layout-css';
    style.innerHTML = LAYOUT_CSS;
    document.head.appendChild(style);
  };
  
  // Load after critical CSS or immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLayoutCSS);
  } else {
    // Small delay to ensure critical CSS loads first
    setTimeout(loadLayoutCSS, 50);
  }
}