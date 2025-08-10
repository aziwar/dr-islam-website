// BUTTON ATOM COMPONENT - Interactive button with multiple variants
// Extracted from core.css.js CTA button and mobile toggle patterns

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

/**
 * Button Component CSS Styles
 * Supports multiple variants with accessibility and performance optimization
 */
export const BUTTON_CSS = `
${DESIGN_TOKENS}

/* ===== BASE BUTTON STYLES ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: var(--text-base);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  /* Performance optimizations */
  will-change: transform, box-shadow, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Accessibility */
  outline: none;
}

.btn:focus {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
.btn.loading {
  color: transparent;
  pointer-events: none;
}

.btn.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.8s linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

/* ===== PRIMARY VARIANT (CTA BUTTON) ===== */
.btn--primary {
  background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
  color: var(--white);
  padding: 18px 40px;
  border-radius: 50px;
  font-weight: bold;
  box-shadow: 0 5px 25px rgba(190, 176, 147, 0.3);
}

.btn--primary::after {
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

.btn--primary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 35px rgba(190, 176, 147, 0.4);
}

.btn--primary:hover::after {
  width: 350px;
  height: 350px;
}

.btn--primary:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 5px 20px rgba(190, 176, 147, 0.3);
}

/* ===== SECONDARY VARIANT ===== */
.btn--secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn--secondary:hover {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(190, 176, 147, 0.3);
}

/* ===== GHOST VARIANT ===== */
.btn--ghost {
  background: transparent;
  color: var(--secondary);
  border: 1px solid transparent;
  padding: 8px 16px;
}

.btn--ghost:hover {
  background: rgba(190, 176, 147, 0.1);
  color: var(--primary);
}

/* ===== EMERGENCY VARIANT ===== */
.btn--emergency {
  background: var(--emergency);
  color: var(--white);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 5px 20px rgba(220, 53, 69, 0.3); }
  50% { box-shadow: 0 5px 30px rgba(220, 53, 69, 0.5); }
  100% { box-shadow: 0 5px 20px rgba(220, 53, 69, 0.3); }
}

.btn--emergency:hover {
  background: #c82333;
  transform: scale(1.05);
}

/* ===== MOBILE TOGGLE VARIANT ===== */
.btn--mobile-toggle {
  background: none;
  border: none;
  padding: 12px;
  min-height: 48px;
  min-width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.btn--mobile-toggle .toggle-bar {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--secondary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.btn--mobile-toggle.active .toggle-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.btn--mobile-toggle.active .toggle-bar:nth-child(2) {
  opacity: 0;
}

.btn--mobile-toggle.active .toggle-bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* ===== SIZE VARIANTS ===== */
.btn--small {
  padding: 8px 16px;
  min-height: 36px;
  font-size: var(--text-sm);
}

.btn--large {
  padding: 20px 48px;
  min-height: 56px;
  font-size: var(--text-lg);
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: var(--breakpoint-sm-max)) {
  .btn--primary {
    padding: 16px 32px;
    font-size: var(--text-base);
  }
  
  .btn--large {
    padding: 18px 36px;
    min-height: 52px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .btn::after,
  .btn--mobile-toggle .toggle-bar {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
`;

/**
 * Button Component Generator
 * Creates accessible button HTML with proper ARIA attributes
 */
export const Button = {
  
  /**
   * Generate button HTML
   * @param {Object} props - Button properties
   * @param {string} props.variant - Button variant (primary|secondary|ghost|emergency|mobile-toggle)
   * @param {string} props.size - Button size (small|default|large)
   * @param {string} props.text - Button text content
   * @param {string} props.href - Link URL (creates anchor instead of button)
   * @param {string} props.onClick - JavaScript function name to call on click
   * @param {boolean} props.disabled - Disabled state
   * @param {boolean} props.loading - Loading state
   * @param {string} props.ariaLabel - ARIA label for accessibility
   * @param {string} props.ariaExpanded - ARIA expanded state (for toggles)
   * @param {string} props.ariaControls - ARIA controls attribute
   * @param {string} props.className - Additional CSS classes
   * @param {string} props.id - Element ID
   * @param {string} props.type - Button type (button|submit|reset)
   * @returns {string} Button HTML
   */
  create(props = {}) {
    const {
      variant = 'primary',
      size = 'default',
      text = 'Button',
      href = null,
      onClick = null,
      disabled = false,
      loading = false,
      ariaLabel = null,
      ariaExpanded = null,
      ariaControls = null,
      className = '',
      id = '',
      type = 'button'
    } = props;
    
    // Build CSS classes
    const classes = [
      'btn',
      `btn--${variant}`,
      size !== 'default' ? `btn--${size}` : '',
      loading ? 'loading' : '',
      className
    ].filter(Boolean).join(' ');
    
    // Build ARIA attributes
    const ariaAttributes = [
      ariaLabel ? `aria-label="${ariaLabel}"` : '',
      ariaExpanded !== null ? `aria-expanded="${ariaExpanded}"` : '',
      ariaControls ? `aria-controls="${ariaControls}"` : '',
      disabled ? 'aria-disabled="true"' : ''
    ].filter(Boolean).join(' ');
    
    // Build common attributes
    const commonAttrs = [
      id ? `id="${id}"` : '',
      `class="${classes}"`,
      ariaAttributes,
      onClick ? `onclick="${onClick}"` : '',
      disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');
    
    // Mobile toggle variant has special structure
    if (variant === 'mobile-toggle') {
      const element = href ? 'a' : 'button';
      const hrefAttr = href ? `href="${href}"` : '';
      const typeAttr = !href ? `type="${type}"` : '';
      
      return `
        <${element} ${commonAttrs} ${hrefAttr} ${typeAttr}>
          <span class="toggle-bar" aria-hidden="true"></span>
          <span class="toggle-bar" aria-hidden="true"></span>
          <span class="toggle-bar" aria-hidden="true"></span>
          <span class="sr-only">${text}</span>
        </${element}>
      `;
    }
    
    // Standard button/link
    if (href && !disabled) {
      return `
        <a ${commonAttrs} href="${href}" role="button">
          ${text}
        </a>
      `;
    }
    
    return `
      <button ${commonAttrs} type="${type}">
        ${text}
      </button>
    `;
  },

  /**
   * Create CTA (Call-to-Action) button
   * @param {string} text - Button text
   * @param {string} onClick - Click handler
   * @param {Object} options - Additional options
   */
  cta(text, onClick, options = {}) {
    return this.create({
      variant: 'primary',
      text,
      onClick,
      ariaLabel: options.ariaLabel || text,
      ...options
    });
  },

  /**
   * Create mobile menu toggle button
   * @param {string} onClick - Click handler
   * @param {boolean} isExpanded - Menu expanded state
   */
  mobileToggle(onClick, isExpanded = false) {
    return this.create({
      variant: 'mobile-toggle',
      text: isExpanded ? 'Close menu' : 'Open menu',
      onClick,
      ariaLabel: isExpanded ? 'Close navigation menu' : 'Open navigation menu',
      ariaExpanded: isExpanded.toString(),
      ariaControls: 'mobile-menu',
      className: isExpanded ? 'active' : ''
    });
  },

  /**
   * Create emergency/urgent action button
   * @param {string} text - Button text
   * @param {string} onClick - Click handler
   */
  emergency(text, onClick) {
    return this.create({
      variant: 'emergency',
      text,
      onClick,
      ariaLabel: `Urgent: ${text}`
    });
  },

  /**
   * Create link-style button
   * @param {string} text - Button text
   * @param {string} href - Link URL
   * @param {Object} options - Additional options
   */
  link(text, href, options = {}) {
    return this.create({
      variant: 'ghost',
      text,
      href,
      ariaLabel: options.ariaLabel || text,
      ...options
    });
  }
};

/**
 * Button JavaScript Behaviors
 * Handles click events, loading states, and accessibility
 */
export const ButtonBehaviors = {
  
  /**
   * Initialize button behaviors
   * Should be called after buttons are rendered to DOM
   */
  init() {
    // Handle loading states
    this.initLoadingStates();
    
    // Handle mobile toggle animations
    this.initMobileToggle();
    
    // Handle ripple effects
    this.initRippleEffects();
  },

  /**
   * Initialize loading state management
   */
  initLoadingStates() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn || btn.disabled || btn.classList.contains('loading')) return;
      
      // Auto-loading for specific button types
      if (btn.classList.contains('btn--primary') && btn.tagName === 'BUTTON') {
        this.setLoading(btn, true);
        
        // Simulate async operation - remove in production
        setTimeout(() => this.setLoading(btn, false), 2000);
      }
    });
  },

  /**
   * Set button loading state
   * @param {Element} button - Button element
   * @param {boolean} loading - Loading state
   */
  setLoading(button, loading) {
    if (loading) {
      button.classList.add('loading');
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.removeAttribute('aria-busy');
      button.disabled = false;
    }
  },

  /**
   * Initialize mobile toggle behavior
   */
  initMobileToggle() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('.btn--mobile-toggle');
      if (!toggle) return;
      
      const isActive = toggle.classList.contains('active');
      toggle.classList.toggle('active', !isActive);
      toggle.setAttribute('aria-expanded', (!isActive).toString());
      
      // Update aria-label
      const newLabel = !isActive ? 'Close navigation menu' : 'Open navigation menu';
      toggle.setAttribute('aria-label', newLabel);
    });
  },

  /**
   * Initialize ripple effects for touch devices
   */
  initRippleEffects() {
    if (!('ontouchstart' in window)) return;
    
    document.addEventListener('touchstart', (e) => {
      const btn = e.target.closest('.btn--primary, .btn--secondary');
      if (!btn) return;
      
      const rect = btn.getBoundingClientRect();
      const touch = e.touches[0];
      const ripple = document.createElement('span');
      
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 10px;
        height: 10px;
        left: ${touch.clientX - rect.left - 5}px;
        top: ${touch.clientY - rect.top - 5}px;
        animation: btn-ripple 0.6s ease-out;
      `;
      
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  }
};

// Export component for use in templates and dynamic imports
export default {
  Button,
  ButtonBehaviors,
  BUTTON_CSS
};