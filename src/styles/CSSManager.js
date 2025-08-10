// CSS Architecture Manager - Consolidated 4-file system with performance optimization
import { CORE_CSS } from '../content/css/core.css.js';
import { COMPONENTS_CSS } from '../content/css/components.css.js';
import { ENHANCEMENTS_CSS } from '../content/css/enhancements.css.js';
import { A11Y_CSS } from '../content/css/a11y.css.js';

/**
 * CSS Architecture Manager
 * Consolidates 4-file CSS pattern: core → components → enhancements → accessibility
 * Provides performance optimizations and critical path extraction
 */
export class CSSManager {
  constructor() {
    this.criticalPatterns = [
      // Essential reset and variables
      ':root', 'html', 'body', '*', '::before', '::after',
      
      // Above-the-fold layout
      'header', 'nav', '.logo', '.dental-logo', '.emergency-banner',
      '.hero', '.hero-main', '.cta-button', '.desktop-booking-widget',
      
      // Navigation and mobile
      '.main-nav', '.nav-toggle', '.breadcrumb-nav',
      
      // Typography and basics
      'h1', 'h2', 'h3', 'p', 'a', 'button', 'input', 'select',
      
      // Performance-critical
      '.loading', '.skeleton', '@media (max-width: 768px)'
    ];
  }

  /**
   * Get critical CSS for inline inclusion (above-the-fold)
   */
  getCriticalCSS() {
    const fullCSS = this.getFullCSS();
    return this.extractCriticalFromCSS(fullCSS);
  }

  /**
   * Get deferred CSS for progressive loading
   */
  getDeferredCSS() {
    return COMPONENTS_CSS + ENHANCEMENTS_CSS + A11Y_CSS;
  }

  /**
   * Get full CSS for legacy support
   */
  getFullCSS() {
    return CORE_CSS + COMPONENTS_CSS + ENHANCEMENTS_CSS + A11Y_CSS;
  }

  /**
   * Get CSS for specific language/RTL support
   */
  getCSSForLanguage(lang = 'en') {
    const baseCSS = this.getFullCSS();
    
    if (lang === 'ar') {
      return baseCSS + this.getRTLEnhancements();
    }
    
    return baseCSS;
  }

  /**
   * Extract critical CSS from full stylesheet using pattern matching
   */
  extractCriticalFromCSS(fullCSS) {
    const lines = fullCSS.split('\n');
    const criticalLines = [];
    let inCriticalBlock = false;
    let braceDepth = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if this line starts a critical selector
      const isCriticalSelector = this.criticalPatterns.some(pattern => {
        // Handle exact matches and pattern-based matches
        if (pattern.startsWith('.') || pattern.startsWith('#')) {
          return trimmedLine.includes(pattern);
        }
        return trimmedLine.startsWith(pattern);
      });

      if (isCriticalSelector) {
        inCriticalBlock = true;
      }

      if (inCriticalBlock) {
        criticalLines.push(line);
        
        // Track CSS block depth
        braceDepth += (line.match(/{/g) || []).length;
        braceDepth -= (line.match(/}/g) || []).length;
        
        // End of critical block
        if (braceDepth === 0 && trimmedLine.endsWith('}')) {
          inCriticalBlock = false;
        }
      }
    }

    return criticalLines.join('\n');
  }

  /**
   * Generate RTL-specific enhancements
   */
  getRTLEnhancements() {
    return `
    /* RTL Language Enhancements */
    [dir="rtl"] {
      text-align: right;
    }
    
    [dir="rtl"] .hero-main {
      text-align: center;
    }
    
    [dir="rtl"] .desktop-booking-widget {
      left: 2rem;
      right: auto;
    }
    
    [dir="rtl"] .nav-toggle {
      left: 1rem;
      right: auto;
    }
    
    [dir="rtl"] .breadcrumb-list::before {
      transform: scaleX(-1);
    }
    
    /* Arabic font optimizations */
    [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
      font-family: 'Amiri', 'IBM Plex Sans Arabic', 'Noto Kufi Arabic', serif;
      line-height: 1.6;
      letter-spacing: normal;
    }
    
    [dir="rtl"] body, [dir="rtl"] p, [dir="rtl"] li {
      font-family: 'IBM Plex Sans Arabic', 'Noto Kufi Arabic', sans-serif;
      line-height: 1.7;
    }`;
  }

  /**
   * Performance optimizations
   */
  generateSkeletonCSS() {
    return `
    /* Skeleton loading states */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Reduce motion for performance */
    @media (prefers-reduced-motion: reduce) {
      .skeleton { animation: none; }
    }`;
  }

  /**
   * Get CSS with compression and minification
   */
  getMinifiedCSS() {
    return this.minifyCSS(this.getFullCSS());
  }

  /**
   * Basic CSS minification
   */
  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
      .replace(/{\s*}/g, '{}') // Clean empty blocks
      .trim();
  }

  /**
   * Generate CSS with performance headers
   */
  getCSSResponse(options = {}) {
    const { minify = false, lang = 'en', critical = false } = options;
    
    let css;
    if (critical) {
      css = this.getCriticalCSS();
    } else {
      css = this.getCSSForLanguage(lang);
    }
    
    if (minify) {
      css = this.minifyCSS(css);
    }
    
    return {
      content: css,
      headers: {
        'Content-Type': 'text/css',
        'Cache-Control': critical ? 'public, max-age=86400' : 'public, max-age=31536000',
        'Content-Length': Buffer.byteLength(css, 'utf8').toString()
      }
    };
  }
}

// Export singleton instance
export const cssManager = new CSSManager();