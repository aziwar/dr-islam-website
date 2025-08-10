// SERVICECARD MOLECULE COMPONENT - Service display card
// Combines Typography, Icon, and Button atoms for service presentation

/**
 * ServiceCard Component CSS Styles
 * Professional service cards with hover effects and accessibility
 */
export const SERVICECARD_CSS = `
/* ===== BASE SERVICECARD STYLES ===== */
.service-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
  
  /* Performance optimization */
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary);
}

.service-card:focus-within {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  border-color: var(--primary);
}

/* ===== CARD HEADER ===== */
.service-card__header {
  margin-bottom: var(--space-lg);
  position: relative;
}

.service-card__icon {
  margin: 0 auto var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), #a89680);
  border-radius: 50%;
  color: var(--white);
  transition: all 0.3s ease;
}

.service-card:hover .service-card__icon {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(190, 176, 147, 0.3);
}

.service-card__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--success);
  color: var(--white);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== CARD CONTENT ===== */
.service-card__content {
  margin-bottom: var(--space-lg);
}

.service-card__title {
  margin-bottom: var(--space-sm);
  color: var(--secondary);
  transition: color 0.3s ease;
}

.service-card:hover .service-card__title {
  color: var(--primary);
}

.service-card__description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
}

.service-card__features {
  list-style: none;
  padding: 0;
  margin: var(--space-md) 0 0;
  text-align: left;
}

.service-card__features li {
  padding: var(--space-xs) 0;
  color: #555;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.service-card__features li::before {
  content: '✓';
  color: var(--success);
  font-weight: bold;
  font-size: var(--text-sm);
}

/* ===== CARD FOOTER ===== */
.service-card__footer {
  margin-top: auto;
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.service-card__link:hover {
  color: var(--secondary);
  gap: var(--space-sm);
}

.service-card__link:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ===== CARD VARIANTS ===== */
.service-card--featured {
  background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
  color: var(--white);
  transform: scale(1.05);
  border: none;
}

.service-card--featured .service-card__icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.service-card--featured .service-card__title {
  color: var(--white);
}

.service-card--featured:hover .service-card__title {
  color: rgba(255, 255, 255, 0.9);
}

.service-card--featured .service-card__description {
  color: rgba(255, 255, 255, 0.9);
}

.service-card--featured .service-card__link {
  color: var(--white);
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
}

.service-card--featured .service-card__link:hover {
  background: rgba(255, 255, 255, 0.3);
  color: var(--white);
}

.service-card--compact {
  padding: var(--space-lg);
  text-align: left;
}

.service-card--compact .service-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.service-card--compact .service-card__icon {
  width: 60px;
  height: 60px;
  margin: 0;
  flex-shrink: 0;
}

.service-card--compact .service-card__title {
  margin-bottom: var(--space-xs);
}

.service-card--horizontal {
  display: flex;
  text-align: left;
  gap: var(--space-lg);
  padding: var(--space-lg);
}

.service-card--horizontal .service-card__header {
  margin-bottom: 0;
  flex-shrink: 0;
}

.service-card--horizontal .service-card__content {
  flex: 1;
  margin-bottom: 0;
}

.service-card--horizontal .service-card__icon {
  margin: 0;
}

/* ===== PRICING VARIANT ===== */
.service-card--pricing {
  border: 2px solid #f0f0f0;
  position: relative;
}

.service-card--pricing .service-card__price {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--space-xs);
}

.service-card--pricing .service-card__period {
  font-size: var(--text-sm);
  color: #666;
  margin-bottom: var(--space-lg);
}

.service-card--pricing.featured {
  border-color: var(--primary);
  border-width: 3px;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: var(--breakpoint-sm-max)) {
  .service-card {
    padding: var(--space-lg);
    margin-bottom: var(--space-md);
  }
  
  .service-card__icon {
    width: 60px;
    height: 60px;
  }
  
  .service-card--horizontal {
    flex-direction: column;
    text-align: center;
  }
  
  .service-card--compact {
    text-align: center;
  }
  
  .service-card--compact .service-card__header {
    flex-direction: column;
    text-align: center;
  }
  
  .service-card:hover {
    transform: none; /* Disable hover transforms on touch devices */
  }
}

/* ===== GRID LAYOUT ===== */
.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  margin: var(--space-xl) 0;
}

.service-cards--compact {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.service-cards--large {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-2xl);
}

@media (max-width: var(--breakpoint-sm-max)) {
  .service-cards,
  .service-cards--compact,
  .service-cards--large {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}

/* ===== ACCESSIBILITY ===== */
.service-card[role="button"] {
  cursor: pointer;
}

.service-card[role="button"]:focus {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-card__icon,
  .service-card__title,
  .service-card__link {
    transition: none !important;
  }
  
  .service-card:hover {
    transform: none !important;
  }
}

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
  .service-card {
    border-width: 2px;
    border-color: currentColor;
  }
  
  .service-card:focus-within {
    outline-width: 4px;
  }
}

/* ===== RTL SUPPORT ===== */
[dir="rtl"] .service-card--compact {
  text-align: right;
}

[dir="rtl"] .service-card--horizontal {
  direction: rtl;
}

[dir="rtl"] .service-card__badge {
  right: auto;
  left: -10px;
}

[dir="rtl"] .service-card__features {
  text-align: right;
}
`;

/**
 * ServiceCard Component Generator
 * Creates professional service cards with various layouts and features
 */
export const ServiceCard = {
  
  /**
   * Generate service card HTML
   * @param {Object} props - ServiceCard properties
   * @param {string} props.title - Card title
   * @param {string} props.description - Card description
   * @param {string} props.icon - Icon name or HTML
   * @param {string} props.link - Card link URL
   * @param {string} props.linkText - Link text (default: "Learn More")
   * @param {string} props.variant - Card variant (default|featured|compact|horizontal|pricing)
   * @param {string} props.badge - Badge text for featured cards
   * @param {Array} props.features - List of features for detailed cards
   * @param {string} props.price - Price for pricing cards
   * @param {string} props.period - Price period (e.g., "per month")
   * @param {boolean} props.clickable - Make entire card clickable
   * @param {string} props.onClick - Click handler for clickable cards
   * @param {string} props.className - Additional CSS classes
   * @param {string} props.id - Element ID
   * @returns {string} ServiceCard HTML
   */
  async create(props = {}) {
    const {
      title = '',
      description = '',
      icon = '',
      link = '',
      linkText = 'Learn More',
      variant = 'default',
      badge = '',
      features = [],
      price = '',
      period = '',
      clickable = false,
      onClick = '',
      className = '',
      id = ''
    } = props;
    
    // Import required atom components
    const { Typography } = await import('../atoms/Typography.js');
    const { Icon } = await import('../atoms/Icon.js');
    const { Button } = await import('../atoms/Button.js');
    
    // Build CSS classes
    const cardClasses = [
      'service-card',
      variant !== 'default' ? `service-card--${variant}` : '',
      className
    ].filter(Boolean).join(' ');
    
    // Generate icon HTML
    let iconHtml = '';
    if (icon) {
      // Check if icon is a name from IconLibrary or custom HTML
      if (icon.includes('<') || icon.includes('svg')) {
        iconHtml = `<div class="service-card__icon">${icon}</div>`;
      } else {
        iconHtml = `<div class="service-card__icon">${Icon.create({ 
          name: icon, 
          size: 'xl', 
          decorative: true 
        })}</div>`;
      }
    }
    
    // Generate badge HTML
    let badgeHtml = '';
    if (badge) {
      badgeHtml = `<div class="service-card__badge">${badge}</div>`;
    }
    
    // Generate title HTML
    const titleHtml = Typography.create({
      variant: 'h3',
      text: title,
      className: 'service-card__title'
    });
    
    // Generate description HTML
    const descriptionHtml = description ? Typography.create({
      variant: 'p',
      text: description,
      className: 'service-card__description'
    }) : '';
    
    // Generate features list HTML
    let featuresHtml = '';
    if (features.length > 0) {
      const featureItems = features.map(feature => `<li>${feature}</li>`).join('');
      featuresHtml = `<ul class="service-card__features">${featureItems}</ul>`;
    }
    
    // Generate pricing HTML
    let pricingHtml = '';
    if (price) {
      pricingHtml = `
        <div class="service-card__pricing">
          <div class="service-card__price">${price}</div>
          ${period ? `<div class="service-card__period">${period}</div>` : ''}
        </div>
      `;
    }
    
    // Generate link/button HTML
    let linkHtml = '';
    if (link && !clickable) {
      linkHtml = `
        <a href="${link}" class="service-card__link">
          ${linkText}
          ${Icon.nav('arrow-right', { size: 'sm', decorative: true })}
        </a>
      `;
    } else if (onClick && !clickable) {
      linkHtml = Button.create({
        variant: variant === 'featured' ? 'secondary' : 'ghost',
        text: linkText,
        onClick,
        size: 'small'
      });
    }
    
    // Build card attributes
    const cardAttributes = [
      id ? `id="${id}"` : '',
      `class="${cardClasses}"`,
      clickable ? `role="button"` : '',
      clickable ? `tabindex="0"` : '',
      clickable && onClick ? `onclick="${onClick}"` : '',
      clickable && link ? `onclick="window.location.href='${link}'"` : ''
    ].filter(Boolean).join(' ');
    
    // Build card structure based on variant
    let headerContent = '';
    let contentStructure = '';
    
    if (variant === 'compact' || variant === 'horizontal') {
      headerContent = `
        <div class="service-card__header">
          ${iconHtml}
          <div>
            ${titleHtml}
            ${variant === 'compact' ? descriptionHtml : ''}
          </div>
          ${badgeHtml}
        </div>
      `;
      
      contentStructure = variant === 'horizontal' ? `
        ${headerContent}
        <div class="service-card__content">
          ${variant === 'horizontal' ? descriptionHtml : ''}
          ${featuresHtml}
          ${pricingHtml}
        </div>
        ${linkHtml ? `<div class="service-card__footer">${linkHtml}</div>` : ''}
      ` : `
        ${headerContent}
        ${variant === 'compact' && features.length > 0 ? featuresHtml : ''}
        ${linkHtml ? `<div class="service-card__footer">${linkHtml}</div>` : ''}
      `;
    } else {
      // Default, featured, pricing variants
      headerContent = `
        <div class="service-card__header">
          ${iconHtml}
          ${badgeHtml}
        </div>
      `;
      
      contentStructure = `
        ${headerContent}
        <div class="service-card__content">
          ${titleHtml}
          ${descriptionHtml}
          ${featuresHtml}
          ${pricingHtml}
        </div>
        ${linkHtml ? `<div class="service-card__footer">${linkHtml}</div>` : ''}
      `;
    }
    
    return `<div ${cardAttributes}>${contentStructure}</div>`;
  },

  /**
   * Create basic service card
   * @param {string} title - Card title
   * @param {string} description - Card description
   * @param {string} icon - Icon name
   * @param {Object} options - Additional options
   */
  async basic(title, description, icon, options = {}) {
    return this.create({
      title,
      description,
      icon,
      ...options
    });
  },

  /**
   * Create featured service card
   * @param {string} title - Card title
   * @param {string} description - Card description
   * @param {string} icon - Icon name
   * @param {Object} options - Additional options
   */
  async featured(title, description, icon, options = {}) {
    return this.create({
      title,
      description,
      icon,
      variant: 'featured',
      badge: options.badge || 'Popular',
      ...options
    });
  },

  /**
   * Create compact service card
   * @param {string} title - Card title
   * @param {string} description - Card description
   * @param {string} icon - Icon name
   * @param {Object} options - Additional options
   */
  async compact(title, description, icon, options = {}) {
    return this.create({
      title,
      description,
      icon,
      variant: 'compact',
      ...options
    });
  },

  /**
   * Create pricing card
   * @param {string} title - Card title
   * @param {string} price - Price
   * @param {string} period - Period (e.g., "per month")
   * @param {Array} features - List of features
   * @param {Object} options - Additional options
   */
  async pricing(title, price, period, features, options = {}) {
    return this.create({
      title,
      price,
      period,
      features,
      variant: 'pricing',
      linkText: options.linkText || 'Choose Plan',
      ...options
    });
  },

  /**
   * Create clickable service card
   * @param {string} title - Card title
   * @param {string} description - Card description
   * @param {string} icon - Icon name
   * @param {string} action - Click action (URL or function)
   * @param {Object} options - Additional options
   */
  async clickable(title, description, icon, action, options = {}) {
    const isUrl = action.startsWith('http') || action.startsWith('/');
    
    return this.create({
      title,
      description,
      icon,
      clickable: true,
      [isUrl ? 'link' : 'onClick']: action,
      ...options
    });
  }
};

/**
 * ServiceCard JavaScript Behaviors
 * Handles interactions, accessibility, and animations
 */
export const ServiceCardBehaviors = {
  
  /**
   * Initialize service card behaviors
   */
  init() {
    this.initClickableCards();
    this.initAccessibility();
    this.initAnimations();
  },

  /**
   * Initialize clickable card behaviors
   */
  initClickableCards() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card[role="button"]');
      if (!card) return;
      
      // Prevent double-clicking on links within the card
      if (e.target.closest('a, button')) return;
      
      const link = card.getAttribute('data-link');
      const onClick = card.getAttribute('onclick');
      
      if (link) {
        window.location.href = link;
      } else if (onClick) {
        // onclick is already handled by the attribute
      }
    });
    
    // Keyboard navigation for clickable cards
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      
      const card = e.target.closest('.service-card[role="button"]');
      if (!card) return;
      
      e.preventDefault();
      card.click();
    });
  },

  /**
   * Initialize accessibility features
   */
  initAccessibility() {
    // Add ARIA labels to clickable cards
    document.querySelectorAll('.service-card[role="button"]').forEach(card => {
      const title = card.querySelector('.service-card__title')?.textContent;
      if (title && !card.hasAttribute('aria-label')) {
        card.setAttribute('aria-label', `View details for ${title}`);
      }
    });
    
    // Handle focus management
    document.addEventListener('focusin', (e) => {
      const card = e.target.closest('.service-card');
      if (card) {
        card.setAttribute('data-focused', 'true');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      const card = e.target.closest('.service-card');
      if (card) {
        card.removeAttribute('data-focused');
      }
    });
  },

  /**
   * Initialize animation behaviors
   */
  initAnimations() {
    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      
      // Observe all service cards
      document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      });
    }
  },

  /**
   * Create service card grid
   * @param {Array} services - Array of service data
   * @param {string} container - Container selector
   * @param {Object} options - Grid options
   */
  async createGrid(services, container, options = {}) {
    const {
      variant = 'default',
      gridClass = 'service-cards'
    } = options;
    
    const containerElement = document.querySelector(container);
    if (!containerElement) return;
    
    const cardPromises = services.map(service => ServiceCard.create({
      ...service,
      variant: service.variant || variant
    }));
    
    const cardHtmlArray = await Promise.all(cardPromises);
    const gridHtml = `
      <div class="${gridClass}">
        ${cardHtmlArray.join('')}
      </div>
    `;
    
    containerElement.innerHTML = gridHtml;
    
    // Initialize behaviors for new cards
    this.initClickableCards();
    this.initAccessibility();
    this.initAnimations();
  }
};

// Export component for use in templates and dynamic imports
export default {
  ServiceCard,
  ServiceCardBehaviors,
  SERVICECARD_CSS
};