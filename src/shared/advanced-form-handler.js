// ADVANCED-FORM-HANDLER.JS - Enhanced Form Management System
// Real-time validation, smart features, progress tracking, and UX enhancements

import { validateField, validateForm, updateFormState, showFormMessage, clearFormMessages, getCurrentLanguage } from './form-utils.js';

/**
 * Advanced Form Handler Class
 * Provides comprehensive form management with real-time validation and smart features
 */
export class AdvancedFormHandler {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.options = {
            realTimeValidation: true,
            smartFeatures: true,
            progressTracking: true,
            autoResize: true,
            characterCount: true,
            smartSuggestions: false,
            ...options
        };
        
        this.validationRules = {};
        this.validationTimeouts = new Map();
        this.suggestionData = new Map();
        this.progressFields = [];
        this.currentLang = getCurrentLanguage();
        
        this.init();
    }
    
    /**
     * Initialize the form handler
     */
    init() {
        this.setupFormStructure();
        this.setupEventListeners();
        this.setupProgressTracking();
        this.setupSmartFeatures();
        this.setupAccessibility();
        
        // Mark form as enhanced
        this.form.classList.add('enhanced-form');
        this.form.setAttribute('data-enhanced', 'true');
    }
    
    /**
     * Setup form structure and prepare fields
     */
    setupFormStructure() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group') || this.createFormGroup(field);
            
            // Add input type classes for smart features
            if (field.type === 'email') {
                formGroup.classList.add('email-input');
            } else if (field.type === 'tel') {
                formGroup.classList.add('phone-input');
            } else if (field.name === 'name' || field.id === 'name') {
                formGroup.classList.add('name-input');
            }
            
            // Setup placeholder for floating labels
            if (!field.placeholder || field.placeholder === field.getAttribute('data-label')) {
                field.placeholder = ' '; // Space is important for CSS selector
            }
            
            // Setup character counting
            if (this.options.characterCount && (field.tagName === 'TEXTAREA' || field.maxLength)) {
                this.setupCharacterCounter(formGroup, field);
            }
            
            // Setup auto-resize for textareas
            if (this.options.autoResize && field.tagName === 'TEXTAREA') {
                this.setupAutoResize(field);
            }
        });
    }
    
    /**
     * Create form group wrapper if it doesn't exist
     */
    createFormGroup(field) {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        
        field.parentNode.insertBefore(formGroup, field);
        formGroup.appendChild(field);
        
        return formGroup;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Real-time validation
        if (this.options.realTimeValidation) {
            this.form.addEventListener('input', this.handleInput.bind(this));
            this.form.addEventListener('blur', this.handleBlur.bind(this), true);
            this.form.addEventListener('focus', this.handleFocus.bind(this), true);
        }
        
        // Form submission
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Smart suggestions
        if (this.options.smartSuggestions) {
            this.form.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
        
        // Progress tracking
        if (this.options.progressTracking) {
            this.form.addEventListener('input', this.updateProgress.bind(this));
        }
    }
    
    /**
     * Handle input events for real-time validation
     */
    handleInput(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Clear existing timeout
        if (this.validationTimeouts.has(field)) {
            clearTimeout(this.validationTimeouts.get(field));
        }
        
        // Clear error state immediately on typing
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
            this.clearValidationMessage(formGroup);
        }
        
        // Update character counter
        this.updateCharacterCounter(formGroup, field);
        
        // Update floating label state
        this.updateFloatingLabel(formGroup, field);
        
        // Auto-resize textarea
        if (field.tagName === 'TEXTAREA' && this.options.autoResize) {
            this.autoResizeTextarea(field);
        }
        
        // Debounced validation
        const timeout = setTimeout(() => {
            this.validateFieldRealTime(field, formGroup);
        }, 300);
        
        this.validationTimeouts.set(field, timeout);
    }
    
    /**
     * Handle blur events
     */
    handleBlur(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Clear any pending validation timeout
        if (this.validationTimeouts.has(field)) {
            clearTimeout(this.validationTimeouts.get(field));
        }
        
        // Immediate validation on blur
        this.validateFieldRealTime(field, formGroup);
    }
    
    /**
     * Handle focus events
     */
    handleFocus(event) {
        const field = event.target;
        const formGroup = field.closest('.form-group');
        
        if (!formGroup) return;
        
        // Update floating label
        this.updateFloatingLabel(formGroup, field);
        
        // Show suggestions if available
        if (this.options.smartSuggestions) {
            this.showSuggestions(field);
        }
    }
    
    /**
     * Real-time field validation
     */
    async validateFieldRealTime(field, formGroup) {
        // Show validating state
        formGroup.classList.add('validating');
        formGroup.classList.remove('valid', 'invalid');
        
        // Simulate async validation delay for better UX
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const isValid = validateField(field);
        
        // Remove validating state
        formGroup.classList.remove('validating');
        
        // Update validation state
        if (isValid) {
            formGroup.classList.add('valid');
            formGroup.classList.remove('invalid');
            this.clearValidationMessage(formGroup);
        } else {
            formGroup.classList.add('invalid');
            formGroup.classList.remove('valid');
            this.showValidationMessage(formGroup, this.getFieldError(field));
        }
    }
    
    /**
     * Get appropriate error message for field
     */
    getFieldError(field) {
        const messages = {
            en: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                phone: 'Please enter a valid phone number',
                minLength: `Minimum ${field.minLength} characters required`,
                maxLength: `Maximum ${field.maxLength} characters allowed`,
                pattern: 'Invalid format'
            },
            ar: {
                required: 'هذا الحقل مطلوب',
                email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
                phone: 'يرجى إدخال رقم هاتف صحيح',
                minLength: `يجب أن يحتوي على ${field.minLength} أحرف على الأقل`,
                maxLength: `يجب ألا يتجاوز ${field.maxLength} حرفاً`,
                pattern: 'تنسيق غير صحيح'
            }
        };
        
        const lang = this.currentLang;
        const value = field.value.trim();
        
        if (field.required && !value) {
            return messages[lang].required;
        }
        
        if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return messages[lang].email;
        }
        
        if (field.type === 'tel' && value && !/^[\+]?[0-9\s\-()]{8,}$/.test(value)) {
            return messages[lang].phone;
        }
        
        if (field.minLength && value.length > 0 && value.length < field.minLength) {
            return messages[lang].minLength;
        }
        
        if (field.maxLength && value.length > field.maxLength) {
            return messages[lang].maxLength;
        }
        
        if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
            return messages[lang].pattern;
        }
        
        return messages[lang].required;
    }
    
    /**
     * Show validation message
     */
    showValidationMessage(formGroup, message) {
        this.clearValidationMessage(formGroup);
        
        const messageElement = document.createElement('div');
        messageElement.className = 'error-message';
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'polite');
        
        formGroup.appendChild(messageElement);
    }
    
    /**
     * Clear validation message
     */
    clearValidationMessage(formGroup) {
        const existing = formGroup.querySelector('.error-message, .success-message');
        if (existing) {
            existing.remove();
        }
    }
    
    /**
     * Update floating label state
     */
    updateFloatingLabel(formGroup, field) {
        const hasValue = field.value.trim() !== '' || field.type === 'date' || field.type === 'time';
        
        if (hasValue) {
            formGroup.classList.add('has-value');
        } else {
            formGroup.classList.remove('has-value');
        }
    }
    
    /**
     * Setup character counter
     */
    setupCharacterCounter(formGroup, field) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        formGroup.appendChild(counter);
        
        this.updateCharacterCounter(formGroup, field);
    }
    
    /**
     * Update character counter
     */
    updateCharacterCounter(formGroup, field) {
        const counter = formGroup.querySelector('.char-counter');
        if (!counter) return;
        
        const current = field.value.length;
        const max = field.maxLength || 500;
        const remaining = max - current;
        
        counter.textContent = `${current}/${max}`;
        
        // Update counter state
        counter.classList.remove('warning', 'danger');
        if (remaining <= 20 && remaining > 0) {
            counter.classList.add('warning');
        } else if (remaining <= 0) {
            counter.classList.add('danger');
        }
    }
    
    /**
     * Setup auto-resize for textareas
     */
    setupAutoResize(textarea) {
        textarea.style.overflow = 'hidden';
        this.autoResizeTextarea(textarea);
    }
    
    /**
     * Auto-resize textarea
     */
    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
    }
    
    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        if (!this.options.progressTracking) return;
        
        // Create progress bar if it doesn't exist
        let progressContainer = this.form.querySelector('.form-progress');
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.className = 'form-progress';
            progressContainer.innerHTML = '<div class="form-progress-bar"></div>';
            
            // Insert at the beginning of the form
            this.form.insertBefore(progressContainer, this.form.firstChild);
        }
        
        // Get all required fields for progress calculation
        this.progressFields = Array.from(this.form.querySelectorAll('input[required], textarea[required], select[required]'));
        
        this.updateProgress();
    }
    
    /**
     * Update form progress
     */
    updateProgress() {
        if (!this.options.progressTracking || this.progressFields.length === 0) return;
        
        const progressBar = this.form.querySelector('.form-progress-bar');
        if (!progressBar) return;
        
        let completedFields = 0;
        
        this.progressFields.forEach(field => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                if (field.checked) completedFields++;
            } else if (field.value.trim() !== '') {
                completedFields++;
            }
        });
        
        const progress = (completedFields / this.progressFields.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    /**
     * Setup smart features
     */
    setupSmartFeatures() {
        if (!this.options.smartFeatures) return;
        
        // Setup common email domain suggestions
        this.suggestionData.set('email', [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'live.com'
        ]);
        
        // Setup phone number formatting
        const phoneFields = this.form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            field.addEventListener('input', this.formatPhoneNumber.bind(this));
        });
    }
    
    /**
     * Format phone number input
     */
    formatPhoneNumber(event) {
        const field = event.target;
        let value = field.value.replace(/\D/g, ''); // Remove non-digits
        
        // Kuwait phone number formatting
        if (value.startsWith('965') && value.length <= 11) {
            // Format: +965 XXXX XXXX
            if (value.length > 3) {
                value = '+965 ' + value.substring(3, 7) + (value.length > 7 ? ' ' + value.substring(7, 11) : '');
            } else {
                value = '+965 ' + value.substring(3);
            }
        } else if (value.length <= 8) {
            // Local format: XXXX XXXX
            if (value.length > 4) {
                value = value.substring(0, 4) + ' ' + value.substring(4, 8);
            }
        }
        
        field.value = value;
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels and descriptions
        const fields = this.form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const label = formGroup?.querySelector('label');
            
            if (label && !field.getAttribute('aria-labelledby')) {
                if (!label.id) {
                    label.id = `label-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                }
                field.setAttribute('aria-labelledby', label.id);
            }
            
            // Add required attribute to ARIA
            if (field.required) {
                field.setAttribute('aria-required', 'true');
            }
        });
    }
    
    /**
     * Handle form submission
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        // Clear any existing messages
        clearFormMessages(this.form);
        
        // Validate entire form
        const isValid = this.validateEntireForm();
        
        if (!isValid) {
            // Focus on first invalid field
            const firstInvalid = this.form.querySelector('.form-group.invalid input, .form-group.invalid textarea, .form-group.invalid select');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Set loading state
        this.setFormState('loading');
        
        try {
            // Simulate form submission (replace with actual submission logic)
            await this.submitForm();
            
            // Set success state
            this.setFormState('success');
            
            // Show success message
            const successMessage = this.currentLang === 'ar' ? 
                'تم إرسال النموذج بنجاح! سنتواصل معك قريباً.' : 
                'Form submitted successfully! We will contact you soon.';
            
            showFormMessage(this.form, successMessage, 'success');
            
            // Reset form after delay
            setTimeout(() => {
                this.resetForm();
            }, 3000);
            
        } catch (error) {
            // Set error state
            this.setFormState('error');
            
            const errorMessage = this.currentLang === 'ar' ? 
                'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' : 
                'An error occurred during submission. Please try again.';
            
            showFormMessage(this.form, errorMessage, 'error');
        }
    }
    
    /**
     * Validate entire form with visual feedback
     */
    validateEntireForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        fields.forEach(field => {
            const formGroup = field.closest('.form-group');
            if (!formGroup) return;
            
            const isValid = validateField(field);
            
            formGroup.classList.remove('valid', 'invalid', 'validating');
            
            if (isValid) {
                formGroup.classList.add('valid');
                this.clearValidationMessage(formGroup);
            } else {
                formGroup.classList.add('invalid');
                this.showValidationMessage(formGroup, this.getFieldError(field));
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    /**
     * Set form state (loading, success, error, normal)
     */
    setFormState(state) {
        const submitButton = this.form.querySelector('button[type="submit"], .submit-btn');
        
        // Remove all state classes
        this.form.classList.remove('is-loading', 'is-success', 'is-error');
        if (submitButton) {
            submitButton.classList.remove('loading', 'success', 'error');
        }
        
        // Apply new state
        switch (state) {
            case 'loading':
                this.form.classList.add('is-loading');
                if (submitButton) {
                    submitButton.classList.add('loading');
                    submitButton.disabled = true;
                }
                break;
                
            case 'success':
                this.form.classList.add('is-success');
                if (submitButton) {
                    submitButton.classList.add('success');
                    submitButton.disabled = false;
                }
                break;
                
            case 'error':
                this.form.classList.add('is-error');
                if (submitButton) {
                    submitButton.classList.add('error');
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
     * Submit form (implement actual submission logic here)
     */
    async submitForm() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Log form data (replace with actual submission)
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            return { success: true, message: 'Form submitted successfully' };
        } else {
            throw new Error('Network error occurred');
        }
    }
    
    /**
     * Reset form to initial state
     */
    resetForm() {
        this.form.reset();
        this.setFormState('normal');
        
        // Clear all validation states
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('valid', 'invalid', 'validating', 'has-value');
            this.clearValidationMessage(group);
        });
        
        // Reset progress
        this.updateProgress();
        
        // Clear form messages
        clearFormMessages(this.form);
    }
}

/**
 * Initialize enhanced forms on page load
 */
export function initializeAdvancedForms() {
    // Auto-initialize all forms with enhanced features
    const forms = document.querySelectorAll('form:not([data-enhanced])');
    
    forms.forEach(form => {
        new AdvancedFormHandler(form, {
            realTimeValidation: true,
            smartFeatures: true,
            progressTracking: true,
            autoResize: true,
            characterCount: true
        });
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAdvancedForms);
    } else {
        initializeAdvancedForms();
    }
}

// Export for manual initialization
export default AdvancedFormHandler;