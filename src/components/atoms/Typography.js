// TYPOGRAPHY ATOM COMPONENT - Headings and text with Arabic support
// Extracted from core.css.js typography patterns with design system integration

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

/**
 * Typography Component CSS Styles
 * Provides consistent typography with Arabic/RTL support
 */
export const TYPOGRAPHY_CSS = `
${DESIGN_TOKENS}

/* ===== BASE TYPOGRAPHY RESET ===== */
.typography {
  margin: 0;
  padding: 0;
  font-family: inherit;
  color: inherit;
  line-height: inherit;
}

/* ===== HEADING STYLES ===== */
.typography--h1 {
  font-size: var(--text-4xl);
  font-weight: 600;
  line-height: var(--leading-tight);
  margin-bottom: 1rem;
}

.typography--h2 {
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-tight);
  margin-bottom: 1rem;
}

.typography--h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  margin-bottom: 1rem;
}

.typography--h4 {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  margin-bottom: 0.75rem;
}

.typography--h5 {
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: var(--leading-snug);
  margin-bottom: 0.75rem;
}

.typography--h6 {
  font-size: var(--text-base);
  font-weight: 600;
  line-height: var(--leading-normal);
  margin-bottom: 0.5rem;
}

/* ===== TEXT STYLES ===== */
.typography--p {
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  margin-bottom: 1rem;
}

.typography--subtitle {
  font-size: var(--text-lg);
  font-weight: 500;
  line-height: var(--leading-normal);
  margin-bottom: 1rem;
  color: var(--secondary);
}

.typography--lead {
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  margin-bottom: 1.5rem;
}

.typography--caption {
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: var(--leading-normal);
  margin-bottom: 0.5rem;
}

.typography--small {
  font-size: var(--text-xs);
  font-weight: 400;
  line-height: var(--leading-normal);
  margin-bottom: 0.25rem;
}

/* ===== SIZE VARIANTS ===== */
.typography--xs { font-size: var(--text-xs); }
.typography--sm { font-size: var(--text-sm); }
.typography--base { font-size: var(--text-base); }
.typography--lg { font-size: var(--text-lg); }
.typography--xl { font-size: var(--text-xl); }
.typography--2xl { font-size: var(--text-2xl); }
.typography--3xl { font-size: var(--text-3xl); }
.typography--4xl { font-size: var(--text-4xl); }

/* ===== WEIGHT VARIANTS ===== */
.typography--light { font-weight: 300; }
.typography--normal { font-weight: 400; }
.typography--medium { font-weight: 500; }
.typography--semibold { font-weight: 600; }
.typography--bold { font-weight: 700; }

/* ===== COLOR VARIANTS ===== */
.typography--primary { color: var(--primary); }
.typography--secondary { color: var(--secondary); }
.typography--success { color: var(--success); }
.typography--warning { color: var(--warning); }
.typography--error { color: var(--emergency); }
.typography--white { color: var(--white); }
.typography--muted { color: #666; }
.typography--inherit { color: inherit; }

/* ===== ALIGNMENT VARIANTS ===== */
.typography--left { text-align: left; }
.typography--center { text-align: center; }
.typography--right { text-align: right; }
.typography--justify { text-align: justify; }

/* ===== SPACING VARIANTS ===== */
.typography--no-margin { margin: 0; }
.typography--tight { margin-bottom: 0.5rem; }
.typography--loose { margin-bottom: 2rem; }

/* ===== ARABIC TYPOGRAPHY SUPPORT ===== */
.typography--arabic,
.typography[lang="ar"],
[dir="rtl"] .typography {
  font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', -apple-system, sans-serif;
  font-weight: 400;
  letter-spacing: 0;
  word-spacing: 0.1em;
  line-height: 1.8;
  text-align: right;
}

.typography--arabic.typography--h1,
.typography--arabic.typography--h2,
.typography--arabic.typography--h3,
.typography--arabic.typography--h4,
.typography--arabic.typography--h5,
.typography--arabic.typography--h6,
.typography[lang="ar"].typography--h1,
.typography[lang="ar"].typography--h2,
.typography[lang="ar"].typography--h3,
.typography[lang="ar"].typography--h4,
.typography[lang="ar"].typography--h5,
.typography[lang="ar"].typography--h6 {
  font-family: 'Cairo', 'Tajawal', sans-serif;
  font-weight: 700;
  letter-spacing: 0;
}

/* ===== RESPONSIVE TYPOGRAPHY ===== */
@media (max-width: var(--breakpoint-sm-max)) {
  .typography--h1 {
    font-size: var(--text-3xl);
    line-height: var(--leading-tight);
  }
  
  .typography--h2 {
    font-size: var(--text-2xl);
  }
  
  .typography--h3 {
    font-size: var(--text-xl);
  }
  
  .typography--subtitle,
  .typography--lead {
    font-size: var(--text-base);
  }
  
  /* Arabic mobile adjustments */
  .typography--arabic,
  .typography[lang="ar"] {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
  }
  
  .typography--arabic .typography--p,
  .typography[lang="ar"] .typography--p {
    margin-bottom: var(--space-sm);
  }
}

@media (min-width: var(--breakpoint-lg)) {
  .typography--h1 {
    font-size: 3.5rem;
    line-height: 1.2;
  }
  
  .typography--h2 {
    font-size: 2.5rem;
  }
  
  .typography--subtitle {
    font-size: 1.25rem;
  }
}

/* ===== UTILITY CLASSES ===== */
.typography--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.typography--wrap {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

.typography--nowrap {
  white-space: nowrap;
}

.typography--uppercase {
  text-transform: uppercase;
}

.typography--lowercase {
  text-transform: lowercase;
}

.typography--capitalize {
  text-transform: capitalize;
}

.typography--underline {
  text-decoration: underline;
}

.typography--italic {
  font-style: italic;
}

/* ===== ACCESSIBILITY ===== */
.typography--sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ===== LINK STYLES ===== */
.typography--link {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.typography--link:hover {
  color: var(--secondary);
  text-decoration: underline;
}

.typography--link:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
  .typography--muted {
    color: var(--text);
  }
  
  .typography--link:focus {
    outline-width: 3px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .typography--link {
    transition: none !important;
  }
}
`;

/**
 * Typography Component Generator
 * Creates semantic typography with accessibility and i18n support
 */
export const Typography = {
  
  /**
   * Generate typography element
   * @param {Object} props - Typography properties
   * @param {string} props.variant - Typography variant (h1|h2|h3|h4|h5|h6|p|subtitle|lead|caption|small)
   * @param {string} props.as - HTML element to render (overrides variant default)
   * @param {string} props.text - Text content
   * @param {string} props.size - Text size override (xs|sm|base|lg|xl|2xl|3xl|4xl)
   * @param {string} props.weight - Font weight (light|normal|medium|semibold|bold)
   * @param {string} props.color - Text color (primary|secondary|success|warning|error|white|muted|inherit)
   * @param {string} props.align - Text alignment (left|center|right|justify)
   * @param {string} props.spacing - Margin spacing (no-margin|tight|loose)
   * @param {boolean} props.arabic - Use Arabic typography
   * @param {string} props.lang - Language code for HTML lang attribute
   * @param {boolean} props.truncate - Truncate text with ellipsis
   * @param {boolean} props.wrap - Allow text wrapping with break-word
   * @param {boolean} props.nowrap - Prevent text wrapping
   * @param {string} props.transform - Text transform (uppercase|lowercase|capitalize)
   * @param {boolean} props.underline - Add underline decoration
   * @param {boolean} props.italic - Add italic style
   * @param {string} props.className - Additional CSS classes
   * @param {string} props.id - Element ID
   * @param {Object} props.attributes - Additional HTML attributes
   * @returns {string} Typography HTML
   */
  create(props = {}) {
    const {
      variant = 'p',
      as = null,
      text = '',
      size = null,
      weight = null,
      color = null,
      align = null,
      spacing = null,
      arabic = false,
      lang = null,
      truncate = false,
      wrap = false,
      nowrap = false,
      transform = null,
      underline = false,
      italic = false,
      className = '',
      id = '',
      attributes = {}
    } = props;
    
    // Determine HTML element
    const element = as || this.getDefaultElement(variant);
    
    // Build CSS classes
    const classes = [
      'typography',
      `typography--${variant}`,
      size ? `typography--${size}` : '',
      weight ? `typography--${weight}` : '',
      color ? `typography--${color}` : '',
      align ? `typography--${align}` : '',
      spacing ? `typography--${spacing}` : '',
      arabic ? 'typography--arabic' : '',
      truncate ? 'typography--truncate' : '',
      wrap ? 'typography--wrap' : '',
      nowrap ? 'typography--nowrap' : '',
      transform ? `typography--${transform}` : '',
      underline ? 'typography--underline' : '',
      italic ? 'typography--italic' : '',
      className
    ].filter(Boolean).join(' ');
    
    // Build HTML attributes
    const htmlAttributes = {
      class: classes,
      id: id || undefined,
      lang: lang || (arabic ? 'ar' : undefined),
      dir: arabic ? 'rtl' : undefined,
      ...attributes
    };
    
    // Build attribute string
    const attrString = Object.entries(htmlAttributes)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    return `<${element} ${attrString}>${text}</${element}>`;
  },

  /**
   * Get default HTML element for variant
   * @param {string} variant - Typography variant
   * @returns {string} HTML element tag
   */
  getDefaultElement(variant) {
    const elementMap = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      p: 'p',
      subtitle: 'p',
      lead: 'p',
      caption: 'p',
      small: 'small'
    };
    
    return elementMap[variant] || 'p';
  },

  /**
   * Create heading
   * @param {number} level - Heading level (1-6)
   * @param {string} text - Heading text
   * @param {Object} options - Additional options
   */
  heading(level, text, options = {}) {
    return this.create({
      variant: `h${level}`,
      text,
      ...options
    });
  },

  /**
   * Create paragraph
   * @param {string} text - Paragraph text
   * @param {Object} options - Additional options
   */
  paragraph(text, options = {}) {
    return this.create({
      variant: 'p',
      text,
      ...options
    });
  },

  /**
   * Create subtitle
   * @param {string} text - Subtitle text
   * @param {Object} options - Additional options
   */
  subtitle(text, options = {}) {
    return this.create({
      variant: 'subtitle',
      text,
      ...options
    });
  },

  /**
   * Create lead text
   * @param {string} text - Lead text
   * @param {Object} options - Additional options
   */
  lead(text, options = {}) {
    return this.create({
      variant: 'lead',
      text,
      ...options
    });
  },

  /**
   * Create caption text
   * @param {string} text - Caption text
   * @param {Object} options - Additional options
   */
  caption(text, options = {}) {
    return this.create({
      variant: 'caption',
      text,
      color: options.color || 'muted',
      ...options
    });
  },

  /**
   * Create link text
   * @param {string} text - Link text
   * @param {string} href - Link URL
   * @param {Object} options - Additional options
   */
  link(text, href, options = {}) {
    return this.create({
      variant: options.variant || 'p',
      as: 'a',
      text,
      className: 'typography--link',
      attributes: {
        href,
        ...options.attributes
      },
      ...options
    });
  },

  /**
   * Create Arabic text
   * @param {string} variant - Typography variant
   * @param {string} text - Arabic text
   * @param {Object} options - Additional options
   */
  arabic(variant, text, options = {}) {
    return this.create({
      variant,
      text,
      arabic: true,
      lang: 'ar',
      ...options
    });
  },

  /**
   * Create screen reader only text
   * @param {string} text - Screen reader text
   */
  srOnly(text) {
    return this.create({
      variant: 'p',
      text,
      className: 'typography--sr-only',
      as: 'span'
    });
  }
};

/**
 * Typography JavaScript Behaviors
 * Handles responsive typography and accessibility
 */
export const TypographyBehaviors = {
  
  /**
   * Initialize typography behaviors
   */
  init() {
    this.initResponsiveTypography();
    this.initAccessibility();
    this.initTextWrapping();
  },

  /**
   * Initialize responsive typography adjustments
   */
  initResponsiveTypography() {
    // Adjust typography based on viewport size
    const adjustTypography = () => {
      const isSmall = window.innerWidth <= 768;
      const headings = document.querySelectorAll('.typography--h1, .typography--h2, .typography--h3');
      
      headings.forEach(heading => {
        if (isSmall) {
          heading.classList.add('typography--responsive-small');
        } else {
          heading.classList.remove('typography--responsive-small');
        }
      });
    };
    
    // Initial adjustment
    adjustTypography();
    
    // Listen for resize
    window.addEventListener('resize', adjustTypography);
  },

  /**
   * Initialize accessibility features
   */
  initAccessibility() {
    // Ensure proper heading hierarchy
    this.validateHeadingHierarchy();
    
    // Add focus indicators to interactive text elements
    document.addEventListener('focusin', (e) => {
      const textElement = e.target.closest('.typography--link');
      if (textElement) {
        textElement.setAttribute('data-focused', 'true');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      const textElement = e.target.closest('.typography--link');
      if (textElement) {
        textElement.removeAttribute('data-focused');
      }
    });
  },

  /**
   * Validate heading hierarchy for accessibility
   */
  validateHeadingHierarchy() {
    if (process.env.NODE_ENV !== 'development') return;
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .typography--h1, .typography--h2, .typography--h3, .typography--h4, .typography--h5, .typography--h6');
    let previousLevel = 0;
    
    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName?.charAt(1) || heading.className.match(/typography--h(\d)/)?.[1] || '1');
      
      if (currentLevel > previousLevel + 1) {
        console.warn(`Heading hierarchy issue: h${previousLevel} followed by h${currentLevel}`, heading);
      }
      
      previousLevel = currentLevel;
    });
  },

  /**
   * Initialize text wrapping optimizations
   */
  initTextWrapping() {
    // Add automatic text wrapping for long content
    const longTexts = document.querySelectorAll('.typography--p, .typography--lead');
    
    longTexts.forEach(text => {
      if (text.textContent.length > 100) {
        text.classList.add('typography--wrap');
      }
    });
  },

  /**
   * Truncate text to specified length
   * @param {Element|string} element - Text element or selector
   * @param {number} maxLength - Maximum character length
   * @param {string} suffix - Truncation suffix (default: '...')
   */
  truncateText(element, maxLength, suffix = '...') {
    const textElement = typeof element === 'string' ? document.querySelector(element) : element;
    if (!textElement) return;
    
    const originalText = textElement.getAttribute('data-original-text') || textElement.textContent;
    textElement.setAttribute('data-original-text', originalText);
    
    if (originalText.length > maxLength) {
      textElement.textContent = originalText.substring(0, maxLength - suffix.length) + suffix;
      textElement.setAttribute('title', originalText);
    }
  },

  /**
   * Set text color dynamically
   * @param {Element|string} element - Text element or selector
   * @param {string} color - Color variant
   */
  setTextColor(element, color) {
    const textElement = typeof element === 'string' ? document.querySelector(element) : element;
    if (!textElement) return;
    
    // Remove existing color classes
    const colorClasses = ['typography--primary', 'typography--secondary', 'typography--success', 'typography--warning', 'typography--error', 'typography--white', 'typography--muted'];
    textElement.classList.remove(...colorClasses);
    
    // Add new color class
    if (color !== 'inherit') {
      textElement.classList.add(`typography--${color}`);
    }
  }
};

// Export component for use in templates and dynamic imports
export default {
  Typography,
  TypographyBehaviors,
  TYPOGRAPHY_CSS
};