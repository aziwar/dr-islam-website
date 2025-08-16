// FORM-UTILS.JS - Shared Form Utility Functions
// Consolidated form validation and handling from ar.js and en.js
// Includes internationalization support for error messages

/**
 * Localized error messages
 */
const ERROR_MESSAGES = {
    ar: {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        minLength: 'يجب أن يحتوي هذا الحقل على {min} أحرف على الأقل',
        maxLength: 'يجب ألا يتجاوز هذا الحقل {max} حرفاً',
        pattern: 'تنسيق هذا الحقل غير صحيح'
    },
    en: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        minLength: 'This field must contain at least {min} characters',
        maxLength: 'This field must not exceed {max} characters',
        pattern: 'This field format is invalid'
    }
};

/**
 * Detect current language from URL or document
 */
export function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ERROR_MESSAGES[langParam]) {
        return langParam;
    }
    
    // Check HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && ERROR_MESSAGES[htmlLang]) {
        return htmlLang;
    }
    
    // Default to Arabic if document direction is RTL, otherwise English
    return document.documentElement.dir === 'rtl' ? 'ar' : 'en';
}

/**
 * Get localized error message
 */
export function getErrorMessage(type, params = {}) {
    const lang = getCurrentLanguage();
    let message = ERROR_MESSAGES[lang][type] || ERROR_MESSAGES.en[type];
    
    // Replace placeholders
    Object.keys(params).forEach(key => {
        message = message.replace(`{${key}}`, params[key]);
    });
    
    return message;
}

/**
 * Remove field error display
 */
function removeFieldError(field) {
    const existingError = field.parentElement?.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    field.parentElement?.appendChild(errorElement);
}

/**
 * Validate individual form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
export function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error states
    field.classList.remove('error', 'success');
    removeFieldError(field);
    
    // Skip validation if field is empty and not required
    if (!value && !field.required) return true;
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = getErrorMessage('required');
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('email');
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-()]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('phone');
        }
    }
    
    // Min length validation
    if (field.minLength && value.length > 0 && value.length < field.minLength) {
        isValid = false;
        errorMessage = getErrorMessage('minLength', { min: field.minLength });
    }
    
    // Max length validation
    if (field.maxLength && value.length > field.maxLength) {
        isValid = false;
        errorMessage = getErrorMessage('maxLength', { max: field.maxLength });
    }
    
    // Pattern validation
    if (field.pattern && value) {
        const patternRegex = new RegExp(field.pattern);
        if (!patternRegex.test(value)) {
            isValid = false;
            errorMessage = getErrorMessage('pattern');
        }
    }
    
    // Apply visual feedback
    if (isValid) {
        field.classList.add('success');
    } else {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate entire form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
export function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        const isFieldValid = validateField(field);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Update form state (visual feedback)
 * @param {HTMLFormElement} form - The form to update
 * @param {string} state - The state ('loading', 'success', 'error', 'normal')
 */
export function updateFormState(form, state) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    
    // Remove all state classes
    form.classList.remove('is-loading', 'is-success', 'is-error');
    
    if (submitButton) {
        submitButton.classList.remove('is-loading', 'is-success', 'is-error');
    }
    
    // Apply new state
    switch (state) {
        case 'loading':
            form.classList.add('is-loading');
            if (submitButton) {
                submitButton.classList.add('is-loading');
                submitButton.disabled = true;
            }
            break;
            
        case 'success':
            form.classList.add('is-success');
            if (submitButton) {
                submitButton.classList.add('is-success');
                submitButton.disabled = false;
            }
            break;
            
        case 'error':
            form.classList.add('is-error');
            if (submitButton) {
                submitButton.classList.add('is-error');
                submitButton.disabled = false;
            }
            break;
            
        case 'normal':
        default:
            if (submitButton) {
                submitButton.disabled = false;
            }
            break;
    }
}

/**
 * Initialize form validation for a form
 * @param {HTMLFormElement} form - The form to initialize
 */
export function initFormValidation(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    
    fields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => {
            validateField(field);
        });
        
        // Clear error on input (immediate feedback)
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                field.classList.remove('error');
                removeFieldError(field);
            }
        });
    });
    
    // Validate form on submit
    form.addEventListener('submit', (e) => {
        const isValid = validateForm(form);
        if (!isValid) {
            e.preventDefault();
            
            // Focus on first invalid field
            const firstInvalidField = form.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
}

/**
 * Handle form submission with validation and feedback
 * @param {HTMLFormElement} form - The form to handle
 * @param {Function} onSubmit - Callback function to handle successful submission
 * @param {Object} options - Additional options
 */
export function handleFormSubmit(form, onSubmit, options = {}) {
    const { 
        showSuccessMessage = true, 
        resetOnSuccess = true,
        successDelay = 3000 
    } = options;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm(form);
        if (!isValid) {
            const firstInvalidField = form.querySelector('.error');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }
        
        try {
            // Set loading state
            updateFormState(form, 'loading');
            
            // Call submission handler
            await onSubmit(new FormData(form));
            
            // Set success state
            updateFormState(form, 'success');
            
            if (showSuccessMessage) {
                showFormMessage(form, getErrorMessage('success') || 'تم إرسال النموذج بنجاح / Form submitted successfully', 'success');
            }
            
            if (resetOnSuccess) {
                setTimeout(() => {
                    form.reset();
                    updateFormState(form, 'normal');
                    clearFormMessages(form);
                }, successDelay);
            }
            
        } catch (error) {
            // Log error in development only
            if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                console.error('Form submission error:', error);
            }
            updateFormState(form, 'error');
            showFormMessage(form, error.message || 'حدث خطأ أثناء الإرسال / An error occurred during submission', 'error');
        }
    });
}

/**
 * Show form-level message
 * @param {HTMLFormElement} form - The form to show message for
 * @param {string} message - The message to show
 * @param {string} type - Message type ('success', 'error', 'info')
 */
export function showFormMessage(form, message, type = 'info') {
    clearFormMessages(form);
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageElement.setAttribute('aria-live', 'polite');
    
    // Insert at top of form
    form.insertBefore(messageElement, form.firstChild);
}

/**
 * Clear all form messages
 * @param {HTMLFormElement} form - The form to clear messages from
 */
export function clearFormMessages(form) {
    const messages = form.querySelectorAll('.form-message');
    messages.forEach(message => message.remove());
}

/**
 * Initialize all forms on the page with validation
 */
export function initializeAllForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        initFormValidation(form);
    });
}

// Auto-initialize forms when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeAllForms);
}