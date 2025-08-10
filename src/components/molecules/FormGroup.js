// FORMGROUP MOLECULE COMPONENT - Input + label + validation message
// Combines Input, Typography, and Icon atoms for complete form fields

/**
 * FormGroup Component CSS Styles
 * Layouts and spacing for form field groups
 */
export const FORMGROUP_CSS = `
/* ===== BASE FORMGROUP STYLES ===== */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-lg);
  position: relative;
}

.form-group:last-child {
  margin-bottom: 0;
}

/* ===== LABEL STYLES ===== */
.form-group__label {
  margin-bottom: var(--space-xs);
  font-weight: 500;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.form-group__label--required::after {
  content: '*';
  color: var(--emergency);
  font-weight: bold;
  margin-left: 2px;
}

[dir="rtl"] .form-group__label--required::after {
  margin-left: 0;
  margin-right: 2px;
}

.form-group__label--optional {
  opacity: 0.7;
}

.form-group__label--floating {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;
}

/* ===== INPUT WRAPPER ===== */
.form-group__input {
  position: relative;
}

/* ===== HELP TEXT ===== */
.form-group__help {
  margin-top: var(--space-xs);
  font-size: var(--text-sm);
  color: #666;
  line-height: 1.4;
}

/* ===== VALIDATION MESSAGES ===== */
.form-group__message {
  margin-top: var(--space-xs);
  font-size: var(--text-sm);
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.form-group__message--error {
  color: var(--emergency);
}

.form-group__message--success {
  color: var(--success);
}

.form-group__message--warning {
  color: var(--warning);
}

.form-group__message-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

/* ===== LAYOUT VARIANTS ===== */
.form-group--inline {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-md);
}

.form-group--inline .form-group__label {
  margin-bottom: 0;
  min-width: 120px;
  flex-shrink: 0;
  padding-top: 12px; /* Align with input padding */
}

.form-group--inline .form-group__input {
  flex: 1;
}

.form-group--inline .form-group__message,
.form-group--inline .form-group__help {
  margin-top: var(--space-xs);
  margin-left: 136px; /* Label width + gap */
}

[dir="rtl"] .form-group--inline .form-group__message,
[dir="rtl"] .form-group--inline .form-group__help {
  margin-left: 0;
  margin-right: 136px;
}

.form-group--compact {
  margin-bottom: var(--space-md);
}

.form-group--compact .form-group__label {
  margin-bottom: var(--space-2xs);
  font-size: var(--text-sm);
}

.form-group--compact .form-group__message,
.form-group--compact .form-group__help {
  margin-top: var(--space-2xs);
  font-size: var(--text-xs);
}

/* ===== VALIDATION STATE STYLING ===== */
.form-group--error .form-group__label {
  color: var(--emergency);
}

.form-group--success .form-group__label {
  color: var(--success);
}

.form-group--warning .form-group__label {
  color: var(--warning);
}

/* ===== DISABLED STATE ===== */
.form-group--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.form-group--disabled .form-group__label {
  color: #999;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: var(--breakpoint-sm-max)) {
  .form-group--inline {
    flex-direction: column;
  }
  
  .form-group--inline .form-group__label {
    min-width: auto;
    padding-top: 0;
  }
  
  .form-group--inline .form-group__message,
  .form-group--inline .form-group__help {
    margin-left: 0;
    margin-right: 0;
  }
}

/* ===== ACCESSIBILITY ===== */
.form-group__sr-description {
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

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
  .form-group__label--required::after {
    background: currentColor;
    color: white;
    padding: 0 2px;
    border-radius: 2px;
  }
}
`;

/**
 * FormGroup Component Generator
 * Creates complete form field groups with labels, inputs, and validation
 */
export const FormGroup = {
  
  /**
   * Generate form group HTML
   * @param {Object} props - FormGroup properties
   * @param {string} props.label - Field label text
   * @param {Object} props.input - Input configuration (passed to Input component)
   * @param {string} props.helpText - Help text description
   * @param {string} props.errorMessage - Error message text
   * @param {string} props.successMessage - Success message text
   * @param {string} props.warningMessage - Warning message text
   * @param {string} props.layout - Layout variant (default|inline|compact)
   * @param {boolean} props.required - Required field
   * @param {boolean} props.optional - Optional field (shows "optional" text)
   * @param {boolean} props.disabled - Disabled state
   * @param {boolean} props.floatingLabel - Use floating label instead of top label
   * @param {string} props.className - Additional CSS classes
   * @param {string} props.id - Element ID
   * @returns {string} FormGroup HTML
   */
  async create(props = {}) {
    const {
      label = '',
      input = {},
      helpText = '',
      errorMessage = '',
      successMessage = '',
      warningMessage = '',
      layout = 'default',
      required = false,
      optional = false,
      disabled = false,
      floatingLabel = false,
      className = '',
      id = ''
    } = props;
    
    // Import required atom components
    const { Input } = await import('../atoms/Input.js');
    const { Typography } = await import('../atoms/Typography.js');
    const { Icon } = await import('../atoms/Icon.js');
    
    // Determine validation state
    let validationState = 'default';
    let validationMessage = '';
    let validationIcon = '';
    
    if (errorMessage) {
      validationState = 'error';
      validationMessage = errorMessage;
      validationIcon = Icon.status('warning', { size: 'sm', decorative: true });
    } else if (successMessage) {
      validationState = 'success';
      validationMessage = successMessage;
      validationIcon = Icon.status('check', { size: 'sm', decorative: true });
    } else if (warningMessage) {
      validationState = 'warning';
      validationMessage = warningMessage;
      validationIcon = Icon.status('warning', { size: 'sm', color: 'warning', decorative: true });
    }
    
    // Build CSS classes
    const groupClasses = [
      'form-group',
      layout !== 'default' ? `form-group--${layout}` : '',
      validationState !== 'default' ? `form-group--${validationState}` : '',
      disabled ? 'form-group--disabled' : '',
      className
    ].filter(Boolean).join(' ');
    
    // Generate unique IDs for accessibility
    const inputId = input.id || `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const helpId = helpText ? `${inputId}-help` : '';
    const messageId = validationMessage ? `${inputId}-message` : '';
    
    // Prepare input configuration
    const inputConfig = {
      ...input,
      id: inputId,
      disabled: disabled || input.disabled,
      validation: validationState !== 'default' ? validationState : input.validation,
      ariaDescribedby: [helpId, messageId].filter(Boolean).join(' ') || undefined,
      label: floatingLabel ? label : input.label
    };
    
    // Generate input HTML
    const inputHtml = Input.create(inputConfig);
    
    // Generate label HTML (if not floating)
    let labelHtml = '';
    if (label && !floatingLabel) {
      const labelClasses = [
        'form-group__label',
        required ? 'form-group__label--required' : '',
        optional ? 'form-group__label--optional' : ''
      ].filter(Boolean).join(' ');
      
      const optionalText = optional ? ' (optional)' : '';
      
      labelHtml = Typography.create({
        variant: 'caption',
        as: 'label',
        text: label + optionalText,
        className: labelClasses,
        attributes: { for: inputId }
      });
    }
    
    // Generate help text HTML
    let helpHtml = '';
    if (helpText) {
      helpHtml = Typography.create({
        variant: 'small',
        text: helpText,
        className: 'form-group__help',
        id: helpId,
        color: 'muted'
      });
    }
    
    // Generate validation message HTML
    let messageHtml = '';
    if (validationMessage) {
      messageHtml = `
        <div class="form-group__message form-group__message--${validationState}" id="${messageId}" role="alert" aria-live="polite">
          <span class="form-group__message-icon">${validationIcon}</span>
          <span>${validationMessage}</span>
        </div>
      `;
    }
    
    // Build screen reader description
    const srDescriptions = [];
    if (required) srDescriptions.push('required field');
    if (helpText) srDescriptions.push(helpText);
    
    const srDescription = srDescriptions.length > 0 ? 
      `<div class="form-group__sr-description">${srDescriptions.join(', ')}</div>` : '';
    
    return `
      <div class="${groupClasses}" ${id ? `id="${id}"` : ''}>
        ${labelHtml}
        <div class="form-group__input">
          ${inputHtml}
        </div>
        ${helpHtml}
        ${messageHtml}
        ${srDescription}
      </div>
    `;
  },

  /**
   * Create text input group
   * @param {string} name - Input name/id
   * @param {string} label - Field label
   * @param {Object} options - Additional options
   */
  async text(name, label, options = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.text(name, options.placeholder || label, {
        required: options.required,
        value: options.value
      }),
      required: options.required,
      helpText: options.helpText,
      ...options
    });
  },

  /**
   * Create email input group
   * @param {string} name - Input name/id
   * @param {string} label - Field label
   * @param {Object} options - Additional options
   */
  async email(name, label, options = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.email(name, options.placeholder || label, {
        required: options.required,
        value: options.value
      }),
      required: options.required,
      helpText: options.helpText,
      ...options
    });
  },

  /**
   * Create telephone input group
   * @param {string} name - Input name/id
   * @param {string} label - Field label
   * @param {Object} options - Additional options
   */
  async tel(name, label, options = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.tel(name, options.placeholder || label, {
        required: options.required,
        value: options.value
      }),
      required: options.required,
      helpText: options.helpText,
      ...options
    });
  },

  /**
   * Create textarea group
   * @param {string} name - Textarea name/id
   * @param {string} label - Field label
   * @param {Object} options - Additional options
   */
  async textarea(name, label, options = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.textarea(name, options.placeholder || label, {
        required: options.required,
        value: options.value,
        rows: options.rows
      }),
      required: options.required,
      helpText: options.helpText,
      ...options
    });
  },

  /**
   * Create select dropdown group
   * @param {string} name - Select name/id
   * @param {string} label - Field label
   * @param {Array} options - Select options
   * @param {Object} props - Additional properties
   */
  async select(name, label, options, props = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.select(name, options, {
        required: props.required,
        value: props.value
      }),
      required: props.required,
      helpText: props.helpText,
      ...props
    });
  },

  /**
   * Create floating label input group
   * @param {string} type - Input type
   * @param {string} name - Input name/id
   * @param {string} label - Floating label text
   * @param {Object} options - Additional options
   */
  async floating(type, name, label, options = {}) {
    const { Input } = await import('../atoms/Input.js');
    
    return this.create({
      label,
      input: Input.floating(type, name, label, {
        required: options.required,
        value: options.value
      }),
      floatingLabel: true,
      required: options.required,
      helpText: options.helpText,
      ...options
    });
  }
};

/**
 * FormGroup JavaScript Behaviors
 * Handles validation, interactions, and accessibility
 */
export const FormGroupBehaviors = {
  
  /**
   * Initialize form group behaviors
   */
  init() {
    this.initValidation();
    this.initAccessibility();
    this.initInteractions();
  },

  /**
   * Initialize validation behaviors
   */
  initValidation() {
    document.addEventListener('blur', (e) => {
      const input = e.target.closest('.input');
      const formGroup = input?.closest('.form-group');
      
      if (!input || !formGroup) return;
      
      this.validateFormGroup(formGroup);
    });
    
    // Real-time validation for error states
    document.addEventListener('input', (e) => {
      const input = e.target.closest('.input');
      const formGroup = input?.closest('.form-group--error');
      
      if (!input || !formGroup) return;
      
      // Clear error if input becomes valid
      if (input.checkValidity()) {
        this.setValidationState(formGroup, 'success', 'Field is valid');
      }
    });
  },

  /**
   * Initialize accessibility behaviors
   */
  initAccessibility() {
    // Announce validation state changes
    document.addEventListener('DOMSubtreeModified', (e) => {
      const message = e.target.closest('.form-group__message[role="alert"]');
      if (message && message.textContent.trim()) {
        // Screen readers will automatically announce role="alert" content
        console.log('Validation message announced:', message.textContent);
      }
    });
  },

  /**
   * Initialize interaction behaviors
   */
  initInteractions() {
    // Handle required field indicators
    document.addEventListener('focusin', (e) => {
      const input = e.target.closest('.input');
      const formGroup = input?.closest('.form-group');
      const label = formGroup?.querySelector('.form-group__label--required');
      
      if (label) {
        label.setAttribute('data-focused', 'true');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      const input = e.target.closest('.input');
      const formGroup = input?.closest('.form-group');
      const label = formGroup?.querySelector('.form-group__label--required');
      
      if (label) {
        label.removeAttribute('data-focused');
      }
    });
  },

  /**
   * Validate form group
   * @param {Element} formGroup - Form group element
   * @returns {boolean} Is valid
   */
  validateFormGroup(formGroup) {
    const input = formGroup.querySelector('.input');
    if (!input) return true;
    
    const isValid = input.checkValidity();
    const isRequired = input.required;
    const isEmpty = !input.value.trim();
    
    if (!isValid) {
      let errorMessage = 'This field is invalid';
      
      if (isRequired && isEmpty) {
        errorMessage = 'This field is required';
      } else if (input.type === 'email') {
        errorMessage = 'Please enter a valid email address';
      } else if (input.type === 'tel') {
        errorMessage = 'Please enter a valid phone number';
      }
      
      this.setValidationState(formGroup, 'error', errorMessage);
      return false;
    } else {
      this.setValidationState(formGroup, 'success', 'Field is valid');
      return true;
    }
  },

  /**
   * Set validation state for form group
   * @param {Element} formGroup - Form group element
   * @param {string} state - Validation state (error|success|warning|default)
   * @param {string} message - Validation message
   */
  setValidationState(formGroup, state, message = '') {
    // Clear existing validation states
    formGroup.classList.remove('form-group--error', 'form-group--success', 'form-group--warning');
    
    // Add new state
    if (state !== 'default') {
      formGroup.classList.add(`form-group--${state}`);
    }
    
    // Update input validation state
    const input = formGroup.querySelector('.input');
    if (input) {
      input.classList.remove('input--error', 'input--success', 'input--warning');
      if (state !== 'default') {
        input.classList.add(`input--${state}`);
      }
      input.setAttribute('aria-invalid', state === 'error' ? 'true' : 'false');
    }
    
    // Update validation message
    let messageElement = formGroup.querySelector('.form-group__message');
    
    if (message && state !== 'default') {
      if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-group__message';
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'polite');
        formGroup.appendChild(messageElement);
      }
      
      messageElement.className = `form-group__message form-group__message--${state}`;
      messageElement.textContent = message;
    } else if (messageElement && !message) {
      messageElement.remove();
    }
  },

  /**
   * Clear validation state for form group
   * @param {Element} formGroup - Form group element
   */
  clearValidationState(formGroup) {
    this.setValidationState(formGroup, 'default');
  },

  /**
   * Validate all form groups in container
   * @param {Element} container - Container element
   * @returns {boolean} All valid
   */
  validateAll(container) {
    const formGroups = container.querySelectorAll('.form-group');
    let allValid = true;
    
    formGroups.forEach(formGroup => {
      const isValid = this.validateFormGroup(formGroup);
      if (!isValid) {
        allValid = false;
      }
    });
    
    return allValid;
  }
};

// Export component for use in templates and dynamic imports
export default {
  FormGroup,
  FormGroupBehaviors,
  FORMGROUP_CSS
};