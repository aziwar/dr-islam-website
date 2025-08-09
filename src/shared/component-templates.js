// COMPONENT-TEMPLATES.JS - Shared Component Generation Templates
// Consolidated HTML generation patterns from ar.js and en.js
// Eliminates 60-80% duplication in component structures

/**
 * Service Card Template Generator
 * Used for creating consistent service card layouts
 */
export function createServiceCard(service, options = {}) {
    const { language = 'en', className = 'service-card' } = options;
    
    return `
        <div class="${className}" data-service="${service.id || ''}" role="article">
            <div class="service-icon" aria-hidden="true">
                ${service.icon || '🦷'}
            </div>
            <h3 class="service-title">
                ${service.title || ''}
            </h3>
            <p class="service-description">
                ${service.description || ''}
            </p>
            ${service.features ? `
                <ul class="service-features" role="list">
                    ${service.features.map(feature => `
                        <li role="listitem">${feature}</li>
                    `).join('')}
                </ul>
            ` : ''}
            ${service.price ? `
                <div class="service-price" aria-label="${language === 'ar' ? 'السعر' : 'Price'}">
                    ${service.price}
                </div>
            ` : ''}
            <button class="service-btn cta-button" 
                    data-service="${service.id || ''}"
                    aria-label="${language === 'ar' ? 'احجز ' + service.title : 'Book ' + service.title}">
                ${language === 'ar' ? 'احجز الآن' : 'Book Now'}
            </button>
        </div>
    `;
}

/**
 * Contact Card Template Generator
 * Creates consistent contact information cards
 */
export function createContactCard(contact, options = {}) {
    const { language = 'en', className = 'contact-card' } = options;
    
    const iconMap = {
        phone: '📞',
        email: '✉️', 
        instagram: '📷',
        whatsapp: '💬',
        location: '📍',
        hours: '🕐'
    };
    
    return `
        <div class="${className}" role="article">
            <div class="contact-icon" aria-hidden="true">
                ${iconMap[contact.type] || contact.icon || '📞'}
            </div>
            <h3 class="contact-title">
                ${contact.title || ''}
            </h3>
            <div class="contact-content">
                ${contact.href ? `
                    <a href="${contact.href}" 
                       class="contact-link"
                       target="${contact.external ? '_blank' : '_self'}"
                       rel="${contact.external ? 'noopener noreferrer' : ''}"
                       aria-label="${contact.ariaLabel || contact.value}">
                        ${contact.value}
                    </a>
                ` : `
                    <span class="contact-value">${contact.value || ''}</span>
                `}
                ${contact.subtitle ? `
                    <small class="contact-subtitle">${contact.subtitle}</small>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Hero Section Template Generator
 * Creates consistent hero section layouts
 */
export function createHeroSection(hero, options = {}) {
    const { language = 'en', isRTL = false } = options;
    
    return `
        <section class="hero" role="banner" aria-labelledby="hero-title">
            <div class="hero-container">
                <div class="hero-content" dir="${isRTL ? 'rtl' : 'ltr'}">
                    <h1 id="hero-title" class="hero-title">
                        ${hero.title || ''}
                    </h1>
                    ${hero.subtitle ? `
                        <p class="hero-subtitle">
                            ${hero.subtitle}
                        </p>
                    ` : ''}
                    ${hero.description ? `
                        <p class="hero-description">
                            ${hero.description}
                        </p>
                    ` : ''}
                    <div class="hero-actions">
                        ${hero.primaryButton ? `
                            <button class="cta-button primary" 
                                    data-action="${hero.primaryButton.action || ''}"
                                    aria-describedby="hero-description">
                                ${hero.primaryButton.text}
                            </button>
                        ` : ''}
                        ${hero.secondaryButton ? `
                            <button class="cta-button secondary"
                                    data-action="${hero.secondaryButton.action || ''}">
                                ${hero.secondaryButton.text}
                            </button>
                        ` : ''}
                    </div>
                </div>
                ${hero.image ? `
                    <div class="hero-image" role="img" aria-label="${hero.imageAlt || ''}">
                        <img src="${hero.image}" 
                             alt="${hero.imageAlt || ''}"
                             loading="eager"
                             decoding="async">
                    </div>
                ` : ''}
            </div>
        </section>
    `;
}

/**
 * Notification System
 * Creates and manages toast notifications
 */
export class NotificationSystem {
    constructor(options = {}) {
        this.container = options.container || this.createContainer();
        this.defaultDuration = options.duration || 5000;
        this.maxNotifications = options.maxNotifications || 3;
        this.language = options.language || 'en';
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = null) {
        // Remove excess notifications
        const existing = this.container.querySelectorAll('.notification');
        if (existing.length >= this.maxNotifications) {
            existing[0].remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon" aria-hidden="true">
                    ${this.getIcon(type)}
                </div>
                <div class="notification-message">
                    ${message}
                </div>
                <button class="notification-close" 
                        aria-label="${this.language === 'ar' ? 'إغلاق' : 'Close'}"
                        type="button">
                    ×
                </button>
            </div>
        `;
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));
        
        // Add to container with animation
        this.container.appendChild(notification);
        requestAnimationFrame(() => {
            notification.classList.add('notification--visible');
        });
        
        // Auto-remove after duration
        if (duration !== 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration || this.defaultDuration);
        }
        
        return notification;
    }
    
    remove(notification) {
        if (notification && notification.parentElement) {
            notification.classList.add('notification--removing');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300); // Match CSS animation duration
        }
    }
    
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            loading: '⏳'
        };
        return icons[type] || icons.info;
    }
    
    success(message, duration) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    }
    
    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
    
    loading(message) {
        return this.show(message, 'loading', 0); // Don't auto-dismiss loading notifications
    }
}

/**
 * Gallery Item Template Generator
 * Creates consistent gallery items with lightbox support
 */
export function createGalleryItem(item, options = {}) {
    const { language = 'en', className = 'gallery-item' } = options;
    
    return `
        <div class="${className}" 
             role="button" 
             tabindex="0"
             data-lightbox="gallery"
             data-src="${item.fullSize || item.src}"
             aria-label="${item.alt || (language === 'ar' ? 'صورة المعرض' : 'Gallery image')}">
            <div class="gallery-image">
                <img src="${item.thumbnail || item.src}" 
                     alt="${item.alt || ''}"
                     loading="lazy"
                     decoding="async">
                <div class="gallery-overlay" aria-hidden="true">
                    <span class="gallery-icon">🔍</span>
                </div>
            </div>
            ${item.caption ? `
                <div class="gallery-caption">
                    <h4 class="gallery-title">${item.title || ''}</h4>
                    <p class="gallery-description">${item.caption}</p>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Form Field Template Generator
 * Creates consistent form fields with validation support
 */
export function createFormField(field, options = {}) {
    const { language = 'en', showLabels = true } = options;
    
    const fieldId = field.id || `field-${Math.random().toString(36).substr(2, 9)}`;
    const isRequired = field.required || false;
    const requiredMark = isRequired ? ' *' : '';
    
    let inputHTML = '';
    
    switch (field.type) {
        case 'textarea':
            inputHTML = `
                <textarea id="${fieldId}" 
                         name="${field.name || ''}"
                         class="form-input"
                         ${isRequired ? 'required' : ''}
                         ${field.minLength ? `minlength="${field.minLength}"` : ''}
                         ${field.maxLength ? `maxlength="${field.maxLength}"` : ''}
                         rows="${field.rows || 4}"
                         placeholder="${field.placeholder || ''}"
                         aria-describedby="${fieldId}-help">${field.value || ''}</textarea>
            `;
            break;
            
        case 'select':
            inputHTML = `
                <select id="${fieldId}" 
                        name="${field.name || ''}"
                        class="form-input"
                        ${isRequired ? 'required' : ''}
                        aria-describedby="${fieldId}-help">
                    ${field.options ? field.options.map(option => `
                        <option value="${option.value}" 
                                ${option.selected ? 'selected' : ''}>
                            ${option.text}
                        </option>
                    `).join('') : ''}
                </select>
            `;
            break;
            
        default:
            inputHTML = `
                <input type="${field.type || 'text'}" 
                       id="${fieldId}"
                       name="${field.name || ''}"
                       class="form-input"
                       ${isRequired ? 'required' : ''}
                       ${field.minLength ? `minlength="${field.minLength}"` : ''}
                       ${field.maxLength ? `maxlength="${field.maxLength}"` : ''}
                       ${field.pattern ? `pattern="${field.pattern}"` : ''}
                       ${field.min ? `min="${field.min}"` : ''}
                       ${field.max ? `max="${field.max}"` : ''}
                       placeholder="${field.placeholder || ''}"
                       value="${field.value || ''}"
                       autocomplete="${field.autocomplete || 'off'}"
                       aria-describedby="${fieldId}-help">
            `;
    }
    
    return `
        <div class="form-field">
            ${showLabels && field.label ? `
                <label for="${fieldId}" class="form-label">
                    ${field.label}${requiredMark}
                </label>
            ` : ''}
            ${inputHTML}
            ${field.help ? `
                <div id="${fieldId}-help" class="form-help" role="note">
                    ${field.help}
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Complete Form Template Generator
 * Creates full forms with validation and submission handling
 */
export function createForm(formData, options = {}) {
    const { language = 'en', className = 'form' } = options;
    
    return `
        <form class="${className}" 
              action="${formData.action || '#'}"
              method="${formData.method || 'POST'}"
              ${formData.enctype ? `enctype="${formData.enctype}"` : ''}
              novalidate>
            
            ${formData.title ? `
                <div class="form-header">
                    <h2 class="form-title">${formData.title}</h2>
                    ${formData.description ? `
                        <p class="form-description">${formData.description}</p>
                    ` : ''}
                </div>
            ` : ''}
            
            <div class="form-fields">
                ${formData.fields ? formData.fields.map(field => 
                    createFormField(field, { language, showLabels: true })
                ).join('') : ''}
            </div>
            
            <div class="form-actions">
                ${formData.submitButton ? `
                    <button type="submit" 
                            class="form-submit cta-button primary"
                            ${formData.submitButton.disabled ? 'disabled' : ''}>
                        ${formData.submitButton.text || (language === 'ar' ? 'إرسال' : 'Submit')}
                    </button>
                ` : ''}
                ${formData.resetButton ? `
                    <button type="reset" 
                            class="form-reset cta-button secondary">
                        ${formData.resetButton.text || (language === 'ar' ? 'إعادة تعيين' : 'Reset')}
                    </button>
                ` : ''}
            </div>
        </form>
    `;
}

// Create singleton notification system instance
export const notifications = new NotificationSystem();

// Auto-initialize notifications when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize notification system based on current language
        const urlParams = new URLSearchParams(window.location.search);
        const language = urlParams.get('lang') || 
                        document.documentElement.lang || 
                        (document.documentElement.dir === 'rtl' ? 'ar' : 'en');
        
        notifications.language = language;
    });
}