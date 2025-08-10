// INPUT ATOM COMPONENT - Form inputs with validation states
// Supports text, email, tel, textarea, and select with accessibility

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

/**
 * Input Component CSS Styles
 * Provides consistent styling for all form inputs with validation states
 */
export const INPUT_CSS = `
${DESIGN_TOKENS}

/* ===== BASE INPUT STYLES ===== */
.input {
  display: block;
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--text);
  background-color: var(--white);
  border: 2px solid #e5e5e5;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.input::placeholder {
  color: #999;
  opacity: 1;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1);
  background-color: var(--white);
}

.input:hover:not(:focus):not(:disabled) {
  border-color: #ccc;
}

.input:disabled {
  background-color: #f5f5f5;
  border-color: #e5e5e5;
  color: #999;
  cursor: not-allowed;
  opacity: 0.6;
}

/* ===== VALIDATION STATES ===== */
.input--error {
  border-color: var(--emergency);
  background-color: rgba(220, 53, 69, 0.02);
}

.input--error:focus {
  border-color: var(--emergency);
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.input--success {
  border-color: var(--success);
  background-color: rgba(40, 167, 69, 0.02);
}

.input--success:focus {
  border-color: var(--success);
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.input--warning {
  border-color: var(--warning);
  background-color: rgba(255, 193, 7, 0.02);
}

.input--warning:focus {
  border-color: var(--warning);
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
}

/* ===== INPUT VARIANTS ===== */
.input--small {
  min-height: 40px;
  padding: 8px 12px;
  font-size: var(--text-sm);
}

.input--large {
  min-height: 56px;
  padding: 16px 20px;
  font-size: var(--text-lg);
}

/* Textarea specific styles */
.input--textarea {
  min-height: 120px;
  max-height: 300px;
  resize: vertical;
  line-height: 1.6;
}

.input--textarea.small {
  min-height: 80px;
}

.input--textarea.large {
  min-height: 160px;
}

/* Select specific styles */
.input--select {
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' fill='%23666'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  cursor: pointer;
}

[dir="rtl"] .input--select {
  background-position: left 12px center;
  padding-right: 16px;
  padding-left: 40px;
}

/* ===== INPUT GROUPS ===== */
.input-wrapper {
  position: relative;
  display: block;
  width: 100%;
}

.input-wrapper--with-icon {
  position: relative;
}

.input-wrapper--with-icon .input {
  padding-left: 48px;
}

[dir="rtl"] .input-wrapper--with-icon .input {
  padding-left: 16px;
  padding-right: 48px;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  z-index: 1;
}

[dir="rtl"] .input-icon {
  left: auto;
  right: 16px;
}

.input-wrapper--loading .input {
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z' fill='%23BEB093'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  animation: input-spin 1s linear infinite;
}

[dir="rtl"] .input-wrapper--loading .input {
  background-position: left 12px center;
}

@keyframes input-spin {
  to { background-position: right 12px center; }
}

/* ===== FLOATING LABELS ===== */
.input-wrapper--floating {
  position: relative;
  margin-top: 16px;
}

.input-floating-label {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  background: var(--white);
  padding: 0 4px;
  color: #666;
  font-size: var(--text-base);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

[dir="rtl"] .input-floating-label {
  left: auto;
  right: 16px;
}

.input-wrapper--floating .input:focus + .input-floating-label,
.input-wrapper--floating .input:not(:placeholder-shown) + .input-floating-label,
.input-wrapper--floating .input.has-value + .input-floating-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  color: var(--primary);
  font-weight: 500;
}

.input-wrapper--floating .input--error:focus + .input-floating-label,
.input-wrapper--floating .input--error:not(:placeholder-shown) + .input-floating-label {
  color: var(--emergency);
}

.input-wrapper--floating .input--success:focus + .input-floating-label,
.input-wrapper--floating .input--success:not(:placeholder-shown) + .input-floating-label {
  color: var(--success);
}

/* ===== ARABIC/RTL SUPPORT ===== */
[dir="rtl"] .input {
  text-align: right;
}

.input--arabic {
  font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif;
  line-height: 1.8;
  letter-spacing: 0;
}

/* ===== ACCESSIBILITY ===== */
.input:invalid {
  box-shadow: none;
}

.input[aria-invalid="true"] {
  border-color: var(--emergency);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: var(--breakpoint-sm-max)) {
  .input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  .input--small {
    font-size: 16px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .input,
  .input-floating-label {
    transition: none !important;
  }
  
  .input-wrapper--loading .input {
    animation: none !important;
  }
}

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
  .input {
    border-width: 3px;
  }
  
  .input:focus {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}
`;

/**
 * Input Component Generator
 * Creates accessible form inputs with validation states
 */
export const Input = {
  
  /**
   * Generate input HTML
   * @param {Object} props - Input properties
   * @param {string} props.type - Input type (text|email|tel|password|number|url|search|textarea|select)
   * @param {string} props.name - Input name attribute
   * @param {string} props.id - Input ID attribute
   * @param {string} props.value - Input value
   * @param {string} props.placeholder - Placeholder text
   * @param {string} props.label - Floating label text
   * @param {boolean} props.required - Required field
   * @param {boolean} props.disabled - Disabled state
   * @param {boolean} props.readonly - Readonly state
   * @param {string} props.validation - Validation state (error|success|warning)
   * @param {string} props.size - Input size (small|default|large)
   * @param {string} props.icon - Icon name for input icon
   * @param {boolean} props.loading - Loading state
   * @param {string} props.className - Additional CSS classes
   * @param {Array} props.options - Options for select input
   * @param {number} props.rows - Rows for textarea
   * @param {number} props.maxlength - Maximum character length
   * @param {string} props.pattern - Input pattern for validation
   * @param {string} props.autocomplete - Autocomplete attribute
   * @param {string} props.ariaDescribedby - ARIA describedby attribute
   * @param {Object} props.attributes - Additional HTML attributes
   * @returns {string} Input HTML
   */
  create(props = {}) {
    const {
      type = 'text',
      name = '',
      id = '',
      value = '',
      placeholder = '',
      label = '',
      required = false,
      disabled = false,
      readonly = false,
      validation = null,
      size = 'default',
      icon = null,
      loading = false,
      className = '',
      options = [],
      rows = 4,
      maxlength = null,
      pattern = null,
      autocomplete = null,
      ariaDescribedby = null,
      attributes = {}
    } = props;
    
    // Build CSS classes
    const inputClasses = [
      'input',
      type === 'textarea' ? 'input--textarea' : '',
      type === 'select' ? 'input--select' : '',
      validation ? `input--${validation}` : '',
      size !== 'default' ? `input--${size}` : '',
      value ? 'has-value' : '',
      className
    ].filter(Boolean).join(' ');
    
    const wrapperClasses = [
      'input-wrapper',
      icon ? 'input-wrapper--with-icon' : '',
      loading ? 'input-wrapper--loading' : '',
      label ? 'input-wrapper--floating' : ''
    ].filter(Boolean).join(' ');
    
    // Build HTML attributes
    const inputAttributes = {
      class: inputClasses,
      name: name || id,
      id: id || name,
      placeholder: label ? ' ' : placeholder, // Space for floating label detection
      required: required || undefined,
      disabled: disabled || undefined,
      readonly: readonly || undefined,
      maxlength: maxlength || undefined,
      pattern: pattern || undefined,
      autocomplete: autocomplete || undefined,
      'aria-invalid': validation === 'error' ? 'true' : undefined,
      'aria-describedby': ariaDescribedby || undefined,
      ...attributes
    };
    
    // Build attribute string
    const attrString = Object.entries(inputAttributes)
      .filter(([, value]) => value !== undefined && value !== false)
      .map(([key, value]) => value === true ? key : `${key}="${value}"`)
      .join(' ');
    
    // Generate input element based on type
    let inputElement;
    
    if (type === 'textarea') {
      inputElement = `<textarea ${attrString} rows="${rows}">${value}</textarea>`;
    } else if (type === 'select') {
      const optionsHtml = options.map(option => {
        const optValue = typeof option === 'object' ? option.value : option;
        const optText = typeof option === 'object' ? option.text : option;
        const selected = optValue === value ? 'selected' : '';
        return `<option value="${optValue}" ${selected}>${optText}</option>`;
      }).join('');
      
      inputElement = `<select ${attrString}>${optionsHtml}</select>`;
    } else {
      inputElement = `<input type="${type}" value="${value}" ${attrString}>`;
    }
    
    // Build wrapper with optional elements
    let wrapperContent = '';
    
    // Add icon if specified
    if (icon) {
      wrapperContent += `<span class="input-icon" aria-hidden="true">${icon}</span>`;
    }
    
    // Add input element
    wrapperContent += inputElement;
    
    // Add floating label if specified
    if (label) {
      wrapperContent += `<label for="${id || name}" class="input-floating-label">${label}</label>`;
    }
    
    return `<div class="${wrapperClasses}">${wrapperContent}</div>`;
  },

  /**
   * Create text input
   * @param {string} name - Input name/id
   * @param {string} placeholder - Placeholder text
   * @param {Object} options - Additional options
   */
  text(name, placeholder, options = {}) {
    return this.create({
      type: 'text',
      name,
      id: name,
      placeholder,
      ...options
    });
  },

  /**
   * Create email input
   * @param {string} name - Input name/id
   * @param {string} placeholder - Placeholder text
   * @param {Object} options - Additional options
   */
  email(name, placeholder, options = {}) {
    return this.create({
      type: 'email',
      name,
      id: name,
      placeholder,
      autocomplete: 'email',
      ...options
    });
  },

  /**
   * Create telephone input
   * @param {string} name - Input name/id
   * @param {string} placeholder - Placeholder text
   * @param {Object} options - Additional options
   */
  tel(name, placeholder, options = {}) {
    return this.create({
      type: 'tel',
      name,
      id: name,
      placeholder,
      autocomplete: 'tel',
      ...options
    });
  },

  /**
   * Create password input
   * @param {string} name - Input name/id
   * @param {string} placeholder - Placeholder text
   * @param {Object} options - Additional options
   */
  password(name, placeholder, options = {}) {
    return this.create({
      type: 'password',
      name,
      id: name,
      placeholder,
      autocomplete: 'current-password',
      ...options
    });
  },

  /**
   * Create textarea
   * @param {string} name - Textarea name/id
   * @param {string} placeholder - Placeholder text
   * @param {Object} options - Additional options
   */
  textarea(name, placeholder, options = {}) {
    return this.create({
      type: 'textarea',
      name,
      id: name,
      placeholder,
      rows: options.rows || 4,
      ...options
    });
  },

  /**
   * Create select dropdown
   * @param {string} name - Select name/id
   * @param {Array} options - Select options
   * @param {Object} props - Additional properties
   */
  select(name, options, props = {}) {
    return this.create({
      type: 'select',
      name,
      id: name,
      options,
      ...props
    });
  },

  /**
   * Create floating label input
   * @param {string} type - Input type
   * @param {string} name - Input name/id
   * @param {string} label - Floating label text
   * @param {Object} options - Additional options
   */
  floating(type, name, label, options = {}) {
    return this.create({
      type,
      name,
      id: name,
      label,
      ...options
    });
  }
};

/**
 * Input JavaScript Behaviors
 * Handles validation, interactions, and accessibility
 */
export const InputBehaviors = {
  
  /**
   * Initialize input behaviors
   */
  init() {
    this.initFloatingLabels();
    this.initValidation();
    this.initAccessibility();
    this.initMobileOptimizations();
  },

  /**
   * Initialize floating label behavior
   */
  initFloatingLabels() {
    document.addEventListener('input', (e) => {
      const input = e.target.closest('.input');
      if (!input) return;
      
      // Add/remove has-value class based on content
      if (input.value.trim()) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  },

  /**
   * Initialize validation behavior
   */
  initValidation() {
    document.addEventListener('blur', (e) => {
      const input = e.target.closest('.input');
      if (!input) return;
      
      this.validateInput(input);
    });
    
    // Real-time validation for specific inputs
    document.addEventListener('input', (e) => {
      const input = e.target.closest('.input--error');
      if (!input) return;
      
      // Clear error state if input becomes valid
      if (input.checkValidity()) {
        input.classList.remove('input--error');
        input.classList.add('input--success');
        input.setAttribute('aria-invalid', 'false');
      }
    });
  },

  /**
   * Validate individual input
   * @param {Element} input - Input element
   * @returns {boolean} Is valid
   */
  validateInput(input) {
    const isValid = input.checkValidity();
    
    if (isValid) {
      input.classList.remove('input--error');
      input.classList.add('input--success');
      input.setAttribute('aria-invalid', 'false');
    } else {
      input.classList.remove('input--success');
      input.classList.add('input--error');
      input.setAttribute('aria-invalid', 'true');
    }
    
    return isValid;
  },

  /**
   * Initialize accessibility features
   */
  initAccessibility() {
    // Announce validation state changes to screen readers
    document.addEventListener('focusin', (e) => {
      const input = e.target.closest('.input');
      if (!input) return;
      
      // Create live region if it doesn't exist
      if (!document.getElementById('input-status')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'input-status';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        document.body.appendChild(liveRegion);
      }
    });
  },

  /**
   * Initialize mobile-specific optimizations
   */
  initMobileOptimizations() {
    if (!('ontouchstart' in window)) return;
    
    // Prevent zoom on input focus for iOS
    document.addEventListener('focusin', (e) => {
      const input = e.target.closest('.input');
      if (!input) return;
      
      // Temporarily increase font size to prevent zoom
      const originalFontSize = input.style.fontSize;
      input.style.fontSize = '16px';
      
      // Restore original font size after blur
      const restoreFont = () => {
        input.style.fontSize = originalFontSize;
        input.removeEventListener('blur', restoreFont);
      };
      
      input.addEventListener('blur', restoreFont);
    });
  },

  /**
   * Set input validation state
   * @param {Element|string} input - Input element or selector
   * @param {string} state - Validation state (error|success|warning|default)
   * @param {string} message - Optional message
   */
  setValidationState(input, state, message = '') {
    const element = typeof input === 'string' ? document.querySelector(input) : input;
    if (!element) return;
    
    // Clear existing states
    element.classList.remove('input--error', 'input--success', 'input--warning');
    
    // Add new state
    if (state !== 'default') {
      element.classList.add(`input--${state}`);
    }
    
    // Set ARIA attributes
    element.setAttribute('aria-invalid', state === 'error' ? 'true' : 'false');
    
    // Announce to screen readers if message provided
    if (message) {
      const liveRegion = document.getElementById('input-status');
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }
  },

  /**
   * Set input loading state
   * @param {Element|string} input - Input element or selector
   * @param {boolean} loading - Loading state
   */
  setLoading(input, loading) {
    const element = typeof input === 'string' ? document.querySelector(input) : input;
    const wrapper = element?.closest('.input-wrapper');
    
    if (!wrapper) return;
    
    wrapper.classList.toggle('input-wrapper--loading', loading);
    element.disabled = loading;
    
    if (loading) {
      element.setAttribute('aria-busy', 'true');
    } else {
      element.removeAttribute('aria-busy');
    }
  }
};

// Export component for use in templates and dynamic imports
export default {
  Input,
  InputBehaviors,
  INPUT_CSS
};