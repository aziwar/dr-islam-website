// ICON ATOM COMPONENT - SVG icon system with accessibility
// Includes dental logo and common UI icons

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

/**
 * Icon Component CSS Styles
 * Handles sizing, coloring, and accessibility for SVG icons
 */
export const ICON_CSS = `
${DESIGN_TOKENS}

/* ===== BASE ICON STYLES ===== */
.icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  flex-shrink: 0;
}

.icon svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: currentColor;
  transition: all 0.3s ease;
}

/* ===== SIZE VARIANTS ===== */
.icon--xs {
  width: 12px;
  height: 12px;
}

.icon--sm {
  width: 16px;
  height: 16px;
}

.icon--md {
  width: 24px;
  height: 24px;
}

.icon--lg {
  width: 32px;
  height: 32px;
}

.icon--xl {
  width: 48px;
  height: 48px;
}

.icon--2xl {
  width: 64px;
  height: 64px;
}

/* ===== DENTAL LOGO SPECIFIC STYLES ===== */
.icon--dental-logo {
  color: var(--primary);
  transition: color 0.3s ease;
}

.icon--dental-logo:hover {
  color: var(--secondary);
}

[data-theme="dark"] .icon--dental-logo {
  color: #F8F7F5;
}

.icon--dental-logo.large {
  width: 80px;
  height: 80px;
}

.icon--dental-logo.responsive {
  width: clamp(32px, 8vw, 80px);
  height: clamp(32px, 8vw, 80px);
}

/* ===== COLOR VARIANTS ===== */
.icon--primary { color: var(--primary); }
.icon--secondary { color: var(--secondary); }
.icon--success { color: var(--success); }
.icon--warning { color: var(--warning); }
.icon--error { color: var(--emergency); }
.icon--white { color: var(--white); }
.icon--muted { color: #666; }

/* ===== INTERACTIVE ICONS ===== */
.icon--interactive {
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon--interactive:hover {
  transform: scale(1.1);
}

.icon--interactive:active {
  transform: scale(0.95);
}

/* ===== ANIMATED ICONS ===== */
.icon--spin {
  animation: icon-spin 1s linear infinite;
}

@keyframes icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon--pulse {
  animation: icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes icon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ===== ACCESSIBILITY ===== */
.icon[aria-hidden="true"] {
  pointer-events: none;
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .icon--spin,
  .icon--pulse {
    animation: none !important;
  }
  
  .icon--interactive {
    transition: none !important;
  }
  
  .icon--interactive:hover {
    transform: none !important;
  }
}
`;

/**
 * SVG Icon Library
 * Contains all SVG path data for icons
 */
export const IconLibrary = {
  
  // Dental Logo - Professional dental practice symbol
  'dental-logo': `
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dental-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:currentColor;stop-opacity:1" />
          <stop offset="100%" style="stop-color:currentColor;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      
      <!-- Tooth shape with professional styling -->
      <path d="M20 8 C25 6, 35 6, 40 8 C42 10, 42 15, 40 25 C38 35, 32 35, 30 30 C30 28, 30 25, 30 22 C30 25, 30 28, 30 30 C28 35, 22 35, 20 25 C18 15, 18 10, 20 8 Z" 
            fill="url(#dental-gradient)" stroke="currentColor" stroke-width="1"/>
      
      <!-- Text: Dr. Islam Elsagher -->
      <text x="50" y="15" font-family="serif" font-size="8" font-weight="600" fill="currentColor">Dr. Islam</text>
      <text x="50" y="28" font-family="serif" font-size="8" font-weight="600" fill="currentColor">Elsagher</text>
      
      <!-- Dental specialty indicator -->
      <circle cx="45" cy="35" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="50" cy="35" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="55" cy="35" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  `,

  // Menu hamburger icon
  'menu': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
    </svg>
  `,

  // Close X icon
  'close': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `,

  // Phone icon
  'phone': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  `,

  // Email icon
  'email': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  `,

  // Location/Map pin icon
  'location': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `,

  // Calendar icon
  'calendar': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    </svg>
  `,

  // Clock/Time icon
  'clock': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  `,

  // Star icon (for ratings)
  'star': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  `,

  // Star outline (for empty ratings)
  'star-outline': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
    </svg>
  `,

  // Arrow right
  'arrow-right': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
    </svg>
  `,

  // Arrow left
  'arrow-left': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `,

  // Checkmark
  'check': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  `,

  // Warning/Alert
  'warning': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  `,

  // Information
  'info': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  `,

  // Loading spinner
  'loading': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
    </svg>
  `,

  // Dental Service Icons
  
  // Dental Implant
  'dental-implant': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2 4.5v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-7c1-1 2-2.5 2-4.5 0-3.5-2.5-6-6-6z" fill="currentColor"/>
      <circle cx="10" cy="7" r="1" fill="white" opacity="0.9"/>
      <circle cx="14" cy="7" r="1" fill="white" opacity="0.9"/>
      <path d="M8 15h8v2H8v-2z" fill="white" opacity="0.7"/>
      <rect x="11" y="18" width="2" height="3" fill="#BEB093"/>
    </svg>
  `,

  // Root Canal
  'root-canal': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2 4.5v9c0 .5.5 1 1 1h6c.5 0 1-.5 1-1v-9c1-1 2-2.5 2-4.5 0-3.5-2.5-6-6-6z" fill="currentColor"/>
      <path d="M10 14v6h1v-6h-1zm3 0v6h1v-6h-1z" fill="white"/>
      <circle cx="12" cy="8" r="2" fill="none" stroke="white" stroke-width="1"/>
      <path d="M12 6v4" stroke="white" stroke-width="1"/>
    </svg>
  `,

  // Prosthodontics (Crown)
  'prosthodontics': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L8 6v3c0 3 2 5.5 4 6 2-.5 4-3 4-6V6l-4-4z" fill="currentColor"/>
      <path d="M10 8h4v2h-4v-2z" fill="white" opacity="0.8"/>
      <circle cx="10" cy="6" r="0.5" fill="white"/>
      <circle cx="14" cy="6" r="0.5" fill="white"/>
      <path d="M8 16c0 2 2 4 4 4s4-2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
  `,

  // Oral Surgery
  'oral-surgery': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2 4.5v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-7c1-1 2-2.5 2-4.5 0-3.5-2.5-6-6-6z" fill="currentColor"/>
      <path d="M14 4l4 2-2 4-4-2 2-4z" fill="white" opacity="0.9"/>
      <path d="M16 6l2 1-1 2-2-1 1-2z" fill="#BEB093"/>
      <circle cx="9" cy="7" r="1" fill="white" opacity="0.7"/>
    </svg>
  `,

  // Cosmetic Dentistry (Smile)
  'cosmetic-dentistry': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
      <path d="M7 14c2 4 8 4 10 0" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M8 16h8" stroke="white" stroke-width="1"/>
      <path d="M9 17h6" stroke="white" stroke-width="0.5"/>
    </svg>
  `,

  // Gum Treatment (Periodontal)
  'gum-treatment': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 14c2-2 4-1 6 0 2-1 4-2 6 0v6c0 1-1 2-2 2H7c-1 0-2-1-2-2v-6z" fill="currentColor"/>
      <path d="M6 12c1-3 2-4 3-4s2 1 3 4c1-3 2-4 3-4s2 1 3 4" stroke="currentColor" stroke-width="1" fill="none"/>
      <rect x="8" y="16" width="8" height="1" fill="white" opacity="0.8"/>
      <rect x="9" y="17" width="6" height="1" fill="white" opacity="0.6"/>
      <circle cx="12" cy="6" r="2" fill="none" stroke="#ff6b6b" stroke-width="1"/>
    </svg>
  `,

  // Aesthetic Fillings
  'aesthetic-fillings': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 6 4.5 6 8c0 2 1 3.5 2 4.5v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-7c1-1 2-2.5 2-4.5 0-3.5-2.5-6-6-6z" fill="currentColor"/>
      <circle cx="12" cy="8" r="2" fill="white"/>
      <circle cx="12" cy="8" r="1" fill="#BEB093"/>
      <path d="M10 12h4v2h-4v-2z" fill="white" opacity="0.8"/>
      <path d="M10.5 14h3v1h-3v-1z" fill="white" opacity="0.6"/>
    </svg>
  `,

  // Full Mouth Rehabilitation
  'full-mouth-rehab': `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M6 8c2-1 4-1 6 0 2-1 4-1 6 0" stroke="currentColor" stroke-width="1" fill="none"/>
      <path d="M6 16c2 1 4 1 6 0 2 1 4 1 6 0" stroke="currentColor" stroke-width="1" fill="none"/>
      <circle cx="8" cy="10" r="1" fill="currentColor"/>
      <circle cx="12" cy="10" r="1" fill="currentColor"/>
      <circle cx="16" cy="10" r="1" fill="currentColor"/>
      <rect x="8" y="12" width="8" height="2" fill="currentColor" opacity="0.6"/>
      <path d="M5 12c3-2 6-2 9 0 3-2 6-2 9 0" stroke="#BEB093" stroke-width="1" fill="none"/>
    </svg>
  `
};

/**
 * Icon Component Generator
 * Creates accessible SVG icons with proper ARIA attributes
 */
export const Icon = {
  
  /**
   * Generate icon HTML
   * @param {Object} props - Icon properties
   * @param {string} props.name - Icon name from IconLibrary
   * @param {string} props.size - Icon size (xs|sm|md|lg|xl|2xl)
   * @param {string} props.color - Icon color variant
   * @param {string} props.className - Additional CSS classes
   * @param {string} props.ariaLabel - ARIA label for accessibility
   * @param {boolean} props.decorative - Whether icon is decorative (aria-hidden)
   * @param {boolean} props.interactive - Whether icon is clickable
   * @param {boolean} props.spin - Whether to spin animation
   * @param {boolean} props.pulse - Whether to pulse animation
   * @param {string} props.onClick - Click handler function name
   * @param {string} props.id - Element ID
   * @returns {string} Icon HTML
   */
  create(props = {}) {
    const {
      name,
      size = 'md',
      color = null,
      className = '',
      ariaLabel = null,
      decorative = false,
      interactive = false,
      spin = false,
      pulse = false,
      onClick = null,
      id = ''
    } = props;
    
    // Validate icon exists
    if (!name || !IconLibrary[name]) {
      console.warn(`Icon "${name}" not found in IconLibrary`);
      return '';
    }
    
    // Build CSS classes
    const classes = [
      'icon',
      `icon--${size}`,
      name === 'dental-logo' ? 'icon--dental-logo' : '',
      color ? `icon--${color}` : '',
      interactive ? 'icon--interactive' : '',
      spin ? 'icon--spin' : '',
      pulse ? 'icon--pulse' : '',
      className
    ].filter(Boolean).join(' ');
    
    // Build attributes
    const attributes = [
      id ? `id="${id}"` : '',
      `class="${classes}"`,
      decorative ? 'aria-hidden="true"' : '',
      ariaLabel && !decorative ? `aria-label="${ariaLabel}"` : '',
      !decorative && !ariaLabel ? `role="img"` : '',
      onClick ? `onclick="${onClick}"` : '',
      interactive ? 'tabindex="0"' : ''
    ].filter(Boolean).join(' ');
    
    return `
      <span ${attributes}>
        ${IconLibrary[name]}
      </span>
    `;
  },

  /**
   * Create dental logo icon
   * @param {Object} options - Options
   */
  dentalLogo(options = {}) {
    return this.create({
      name: 'dental-logo',
      size: options.size || 'xl',
      ariaLabel: options.ariaLabel || 'Dr. Islam Elsagher Dental Practice',
      ...options
    });
  },

  /**
   * Create contact icon (phone, email, location)
   * @param {string} type - Contact type
   * @param {Object} options - Options
   */
  contact(type, options = {}) {
    const icons = {
      phone: 'phone',
      email: 'email',
      location: 'location'
    };
    
    return this.create({
      name: icons[type] || type,
      size: options.size || 'md',
      color: options.color || 'primary',
      ariaLabel: options.ariaLabel || `Contact ${type}`,
      ...options
    });
  },

  /**
   * Create navigation icon (menu, close, arrows)
   * @param {string} type - Navigation type
   * @param {Object} options - Options
   */
  nav(type, options = {}) {
    return this.create({
      name: type,
      size: options.size || 'md',
      interactive: true,
      ariaLabel: options.ariaLabel || `${type} navigation`,
      ...options
    });
  },

  /**
   * Create status icon (check, warning, info)
   * @param {string} type - Status type
   * @param {Object} options - Options
   */
  status(type, options = {}) {
    const colorMap = {
      check: 'success',
      warning: 'warning',
      info: 'primary'
    };
    
    return this.create({
      name: type,
      size: options.size || 'sm',
      color: colorMap[type] || options.color,
      ariaLabel: options.ariaLabel || `${type} status`,
      ...options
    });
  },

  /**
   * Create loading spinner
   * @param {Object} options - Options
   */
  loading(options = {}) {
    return this.create({
      name: 'loading',
      size: options.size || 'md',
      spin: true,
      ariaLabel: 'Loading...',
      ...options
    });
  }
};

/**
 * Icon JavaScript Behaviors
 * Handles interactive icons and animations
 */
export const IconBehaviors = {
  
  /**
   * Initialize icon behaviors
   */
  init() {
    this.initInteractiveIcons();
    this.initKeyboardNavigation();
  },

  /**
   * Initialize interactive icon behaviors
   */
  initInteractiveIcons() {
    document.addEventListener('click', (e) => {
      const icon = e.target.closest('.icon--interactive');
      if (!icon) return;
      
      // Add click animation
      icon.style.transform = 'scale(0.95)';
      setTimeout(() => {
        icon.style.transform = '';
      }, 150);
    });
  },

  /**
   * Initialize keyboard navigation for interactive icons
   */
  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      
      const icon = e.target.closest('.icon--interactive[tabindex="0"]');
      if (!icon) return;
      
      e.preventDefault();
      
      // Trigger click event
      icon.click();
    });
  },

  /**
   * Toggle icon spin animation
   * @param {Element|string} icon - Icon element or selector
   * @param {boolean} spin - Whether to spin
   */
  toggleSpin(icon, spin) {
    const element = typeof icon === 'string' ? document.querySelector(icon) : icon;
    if (!element) return;
    
    element.classList.toggle('icon--spin', spin);
  },

  /**
   * Toggle icon pulse animation
   * @param {Element|string} icon - Icon element or selector
   * @param {boolean} pulse - Whether to pulse
   */
  togglePulse(icon, pulse) {
    const element = typeof icon === 'string' ? document.querySelector(icon) : icon;
    if (!element) return;
    
    element.classList.toggle('icon--pulse', pulse);
  }
};

// Export component for use in templates and dynamic imports
export default {
  Icon,
  IconBehaviors,
  IconLibrary,
  ICON_CSS
};