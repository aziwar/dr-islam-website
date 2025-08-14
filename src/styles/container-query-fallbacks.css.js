// CONTAINER-QUERY-FALLBACKS.CSS.JS - Comprehensive browser compatibility
// Progressive enhancement with graceful degradation for older browsers

export const CONTAINER_QUERY_FALLBACKS_CSS = `
/* Container Query Fallbacks - Progressive enhancement with graceful degradation */
@layer fallback-detection, fallback-utilities, fallback-components, fallback-layouts;

@layer fallback-detection {
  /* Feature detection utility classes */
  .supports-container-queries {
    /* Modern browsers with container query support */
    container-type: inline-size;
  }
  
  .no-container-queries {
    /* Fallback indicator - will be removed by JS if container queries work */
    --has-container-queries: false;
  }
  
  /* Container query support test element (invisible) */
  .cq-test {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    container-type: inline-size;
    visibility: hidden;
    pointer-events: none;
  }
  
  /* Root variable to track container query support */
  :root {
    --container-query-support: true;
  }
  
  /* Fallback root variables when container queries not supported */
  .no-container-queries {
    --container-query-support: false;
  }
}

@layer fallback-utilities {
  /* Responsive utilities with media query fallbacks */
  
  /* Grid fallbacks */
  .grid-responsive {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }
  
  /* Container query version (preferred) */
  @supports (container-type: inline-size) {
    .grid-responsive {
      container-type: inline-size;
    }
    
    @container (min-width: 500px) {
      .grid-responsive { grid-template-columns: repeat(2, 1fr); }
    }
    
    @container (min-width: 900px) {
      .grid-responsive { grid-template-columns: repeat(3, 1fr); }
    }
    
    @container (min-width: 1200px) {
      .grid-responsive { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  /* Fallback with media queries */
  @supports not (container-type: inline-size) {
    @media (min-width: 640px) {
      .grid-responsive { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 900px) {
      .grid-responsive { grid-template-columns: repeat(3, 1fr); }
    }
    
    @media (min-width: 1200px) {
      .grid-responsive { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  /* Services grid fallbacks */
  .services-grid-fallback {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: 1fr;
  }
  
  @supports (container-type: inline-size) {
    .services-grid-fallback {
      container-type: inline-size;
      container-name: services;
    }
    
    @container services (min-width: 500px) {
      .services-grid-fallback { grid-template-columns: repeat(2, 1fr); }
    }
    
    @container services (min-width: 900px) {
      .services-grid-fallback { grid-template-columns: repeat(3, 1fr); }
    }
    
    @container services (min-width: 1200px) {
      .services-grid-fallback { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 500px) {
      .services-grid-fallback { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 900px) {
      .services-grid-fallback { grid-template-columns: repeat(3, 1fr); }
    }
    
    @media (min-width: 1200px) {
      .services-grid-fallback { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  /* Gallery grid fallbacks */
  .gallery-grid-fallback {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }
  
  @supports (container-type: inline-size) {
    .gallery-grid-fallback {
      container-type: inline-size;
      container-name: gallery;
    }
    
    @container gallery (min-width: 400px) {
      .gallery-grid-fallback { grid-template-columns: repeat(2, 1fr); }
    }
    
    @container gallery (min-width: 768px) {
      .gallery-grid-fallback { grid-template-columns: repeat(3, 1fr); }
    }
    
    @container gallery (min-width: 1200px) {
      .gallery-grid-fallback { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 400px) {
      .gallery-grid-fallback { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 768px) {
      .gallery-grid-fallback { grid-template-columns: repeat(3, 1fr); }
    }
    
    @media (min-width: 1200px) {
      .gallery-grid-fallback { grid-template-columns: repeat(4, 1fr); }
    }
  }
  
  /* Visibility utilities with fallbacks */
  .show-on-container-sm {
    display: none;
  }
  
  .show-on-container-md {
    display: none;
  }
  
  .show-on-container-lg {
    display: none;
  }
  
  @supports (container-type: inline-size) {
    @container (min-width: 640px) {
      .show-on-container-sm { display: block; }
      .hide-on-container-sm { display: none; }
    }
    
    @container (min-width: 768px) {
      .show-on-container-md { display: block; }
      .hide-on-container-md { display: none; }
    }
    
    @container (min-width: 1024px) {
      .show-on-container-lg { display: block; }
      .hide-on-container-lg { display: none; }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 640px) {
      .show-on-container-sm { display: block !important; }
      .hide-on-container-sm { display: none !important; }
    }
    
    @media (min-width: 768px) {
      .show-on-container-md { display: block !important; }
      .hide-on-container-md { display: none !important; }
    }
    
    @media (min-width: 1024px) {
      .show-on-container-lg { display: block !important; }
      .hide-on-container-lg { display: none !important; }
    }
  }
  
  /* Typography scaling fallbacks */
  .text-container-responsive {
    font-size: var(--text-base);
  }
  
  @supports (container-type: inline-size) {
    .text-container-responsive {
      container-type: inline-size;
    }
    
    @container (min-width: 400px) {
      .text-container-responsive { font-size: var(--text-lg); }
    }
    
    @container (min-width: 600px) {
      .text-container-responsive { font-size: var(--text-xl); }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 400px) {
      .text-container-responsive { font-size: var(--text-lg); }
    }
    
    @media (min-width: 600px) {
      .text-container-responsive { font-size: var(--text-xl); }
    }
  }
}

@layer fallback-components {
  /* Card component with fallbacks */
  .card-responsive-fallback {
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid #f3f4f6;
  }
  
  @supports (container-type: inline-size) {
    .card-responsive-fallback {
      container-type: inline-size;
      container-name: card;
    }
    
    @container card (min-width: 300px) {
      .card-responsive-fallback {
        padding: var(--space-xl);
      }
    }
    
    @container card (min-width: 400px) {
      .card-responsive-fallback .card-content {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-md);
        align-items: center;
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 300px) {
      .card-responsive-fallback {
        padding: var(--space-xl);
      }
    }
    
    @media (min-width: 400px) {
      .card-responsive-fallback .card-content {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-md);
        align-items: center;
      }
    }
  }
  
  /* Form component with fallbacks */
  .form-responsive-fallback {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }
  
  @supports (container-type: inline-size) {
    .form-responsive-fallback {
      container-type: inline-size;
      container-name: form;
    }
    
    @container form (min-width: 500px) {
      .form-responsive-fallback .form-row {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @container form (min-width: 700px) {
      .form-responsive-fallback {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-lg);
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 500px) {
      .form-responsive-fallback .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-md);
      }
    }
    
    @media (min-width: 700px) {
      .form-responsive-fallback {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-lg);
      }
    }
  }
  
  /* Navigation component fallbacks */
  .nav-responsive-fallback {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
  }
  
  .nav-links-fallback {
    display: none;
    list-style: none;
    gap: var(--space-md);
    margin: 0;
    padding: 0;
  }
  
  @supports (container-type: inline-size) {
    .nav-responsive-fallback {
      container-type: inline-size;
      container-name: nav;
    }
    
    @container nav (min-width: 768px) {
      .nav-links-fallback { display: flex; }
      .nav-toggle-fallback { display: none; }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 768px) {
      .nav-links-fallback { display: flex !important; }
      .nav-toggle-fallback { display: none !important; }
    }
  }
}

@layer fallback-layouts {
  /* Hero section with fallbacks */
  .hero-responsive-fallback {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-2xl) var(--space-md);
  }
  
  @supports (container-type: inline-size) {
    .hero-responsive-fallback {
      container-type: inline-size;
      container-name: hero;
    }
    
    @container hero (min-width: 1200px) {
      .hero-responsive-fallback .hero-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: var(--space-3xl);
        align-items: center;
        text-align: left;
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 1200px) {
      .hero-responsive-fallback .hero-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: var(--space-3xl);
        align-items: center;
        text-align: left;
      }
    }
  }
  
  /* About section with fallbacks */
  .about-responsive-fallback {
    padding: var(--space-2xl) 0;
  }
  
  .about-content-fallback {
    display: grid;
    gap: var(--space-xl);
    grid-template-columns: 1fr;
    align-items: center;
  }
  
  @supports (container-type: inline-size) {
    .about-content-fallback {
      container-type: inline-size;
      container-name: about;
    }
    
    @container about (min-width: 800px) {
      .about-content-fallback {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 800px) {
      .about-content-fallback {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  
  /* Contact section with fallbacks */
  .contact-responsive-fallback {
    padding: var(--space-2xl) 0;
  }
  
  .contact-content-fallback {
    display: grid;
    gap: var(--space-2xl);
    grid-template-columns: 1fr;
  }
  
  @supports (container-type: inline-size) {
    .contact-content-fallback {
      container-type: inline-size;
      container-name: contact;
    }
    
    @container contact (min-width: 900px) {
      .contact-content-fallback {
        grid-template-columns: 2fr 1fr;
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 900px) {
      .contact-content-fallback {
        grid-template-columns: 2fr 1fr;
      }
    }
  }
  
  /* Footer with fallbacks */
  .footer-responsive-fallback {
    background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
    color: var(--text-inverse);
    padding: var(--space-3xl) 0 var(--space-lg);
  }
  
  .footer-content-fallback {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }
  
  .footer-main-fallback {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  @supports (container-type: inline-size) {
    .footer-main-fallback {
      container-type: inline-size;
      container-name: footer;
    }
    
    @container footer (min-width: 768px) {
      .footer-main-fallback {
        grid-template-columns: 1fr 300px;
        gap: var(--space-2xl);
      }
    }
    
    @container footer (min-width: 1024px) {
      .footer-main-fallback {
        grid-template-columns: 2fr 1fr 1fr;
        gap: var(--space-3xl);
      }
    }
  }
  
  @supports not (container-type: inline-size) {
    @media (min-width: 768px) {
      .footer-main-fallback {
        grid-template-columns: 1fr 300px;
        gap: var(--space-2xl);
      }
    }
    
    @media (min-width: 1024px) {
      .footer-main-fallback {
        grid-template-columns: 2fr 1fr 1fr;
        gap: var(--space-3xl);
      }
    }
  }
}

/* JavaScript-based fallback system */
.js-container-query-fallback {
  /* Class added by JavaScript when container queries are not supported */
}

.js-container-query-fallback .cq-responsive {
  /* Use JavaScript-calculated responsive behavior */
}

/* ResizeObserver fallback for pseudo container queries */
.resize-observer-fallback {
  /* Elements that will use ResizeObserver for pseudo container query behavior */
}

/* Element query polyfill support */
.eq-sm { /* Pseudo container query: small */ }
.eq-md { /* Pseudo container query: medium */ }
.eq-lg { /* Pseudo container query: large */ }
.eq-xl { /* Pseudo container query: extra large */ }

/* Container query units fallback */
@supports not (width: 1cqw) {
  /* Fallback for container query units */
  .cq-width-25 { width: 25%; }
  .cq-width-50 { width: 50%; }
  .cq-width-75 { width: 75%; }
  .cq-width-100 { width: 100%; }
  
  .cq-height-25 { height: 25%; }
  .cq-height-50 { height: 50%; }
  .cq-height-75 { height: 75%; }
  .cq-height-100 { height: 100%; }
}

/* Contain property fallback */
@supports not (contain: layout) {
  .container-contained {
    /* Fallback styles for browsers without contain support */
    overflow: hidden;
    position: relative;
  }
}

/* Feature query helpers */
.supports-cq {
  display: none;
}

.no-cq {
  display: block;
}

@supports (container-type: inline-size) {
  .supports-cq { display: block; }
  .no-cq { display: none; }
}

/* Performance optimizations for fallback styles */
.fallback-grid,
.fallback-flex,
.fallback-layout {
  contain: layout style;
  will-change: auto; /* Prevent unnecessary compositing layers */
}

/* Debug utilities for fallback testing */
.debug-fallback {
  position: relative;
}

.debug-fallback::after {
  content: 'Fallback Mode';
  position: absolute;
  top: 0;
  right: 0;
  background: orange;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  font-family: monospace;
  z-index: 1000;
  display: none;
}

@supports not (container-type: inline-size) {
  .debug-fallback::after {
    display: block;
  }
}

/* Print media fallbacks */
@media print {
  .grid-responsive,
  .services-grid-fallback,
  .gallery-grid-fallback {
    display: block !important;
  }
  
  .card-responsive-fallback {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* Reduced data mode fallbacks */
@media (prefers-reduced-data: reduce) {
  .hero-responsive-fallback {
    background: var(--primary) !important;
    background-image: none !important;
  }
}
`;

// Auto-inject container query fallbacks CSS
if (typeof document !== 'undefined') {
  const loadContainerQueryFallbacksCSS = () => {
    if (document.getElementById('container-query-fallbacks-css')) return;
    
    const style = document.createElement('style');
    style.id = 'container-query-fallbacks-css';
    style.innerHTML = CONTAINER_QUERY_FALLBACKS_CSS;
    document.head.appendChild(style);
  };
  
  // Load after other responsive CSS
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadContainerQueryFallbacksCSS, 175));
  } else {
    setTimeout(loadContainerQueryFallbacksCSS, 175);
  }
  
  // Initialize container query detection and fallbacks
  const initContainerQueryFallbacks = () => {
    // Test for container query support
    const testElement = document.createElement('div');
    testElement.style.containerType = 'inline-size';
    testElement.className = 'cq-test';
    document.body.appendChild(testElement);
    
    // Check if container queries are supported
    const supportsContainerQueries = 'container' in testElement.style || 
                                   'containerType' in testElement.style;
    
    // Clean up test element
    document.body.removeChild(testElement);
    
    if (!supportsContainerQueries) {
      // Add fallback class to root
      document.documentElement.classList.add('no-container-queries');
      document.documentElement.classList.add('js-container-query-fallback');
      
      console.log('Container queries not supported, using fallbacks');
      
      // Initialize ResizeObserver-based pseudo container queries
      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            const element = entry.target;
            const width = entry.contentRect.width;
            
            // Remove existing pseudo container query classes
            element.classList.remove('eq-sm', 'eq-md', 'eq-lg', 'eq-xl');
            
            // Add appropriate pseudo container query class
            if (width >= 1200) {
              element.classList.add('eq-xl');
            } else if (width >= 900) {
              element.classList.add('eq-lg');
            } else if (width >= 640) {
              element.classList.add('eq-md');
            } else if (width >= 400) {
              element.classList.add('eq-sm');
            }
          }
        });
        
        // Observe elements that need pseudo container query behavior
        document.querySelectorAll('.resize-observer-fallback, .grid-responsive, .services-grid-fallback, .gallery-grid-fallback').forEach(el => {
          resizeObserver.observe(el);
        });
      }
    } else {
      // Container queries are supported
      document.documentElement.classList.add('supports-container-queries');
      console.log('Container queries supported');
    }
  };
  
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContainerQueryFallbacks);
  } else {
    setTimeout(initContainerQueryFallbacks, 200);
  }
}