/**
 * Validation Utilities
 * Form validation and sanitization functions
 */

/**
 * Validate contact form data
 * @param {Object} data - Form data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export function validateContactForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('الاسم مطلوب ويجب أن يكون على الأقل حرفين');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('رقم الهاتف مطلوب ويجب أن يكون صحيحاً');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('البريد الإلكتروني مطلوب ويجب أن يكون صحيحاً');
    }
    
    if (!data.service || data.service.trim().length < 2) {
        errors.push('نوع الخدمة مطلوب');
    }
    
    // Optional message validation
    if (data.message && data.message.length > 1000) {
        errors.push('الرسالة طويلة جداً (الحد الأقصى 1000 حرف)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (supports Kuwait and international formats)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone
 */
export function isValidPhone(phone) {
    // Remove spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Kuwait phone patterns
    const kuwaitMobile = /^(\+965|965)?[569]\d{7}$/.test(cleanPhone);
    const kuwaitLandline = /^(\+965|965)?2\d{7}$/.test(cleanPhone);
    
    // International format (basic validation)
    const international = /^\+\d{10,15}$/.test(cleanPhone);
    
    return kuwaitMobile || kuwaitLandline || international;
}

/**
 * Sanitize input data
 * @param {Object} data - Data to sanitize
 * @returns {Object} - Sanitized data
 */
export function sanitizeFormData(data) {
    return {
        name: sanitizeString(data.name),
        phone: sanitizePhone(data.phone),
        email: sanitizeString(data.email).toLowerCase(),
        service: sanitizeString(data.service),
        message: data.message ? sanitizeString(data.message) : ''
    };
}

/**
 * Sanitize string input
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeString(str) {
    if (!str) return '';
    
    return str
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML
        .replace(/javascript:/gi, '') // Remove javascript: urls
        .substring(0, 500); // Limit length
}

/**
 * Sanitize phone number
 * @param {string} phone - Phone to sanitize
 * @returns {string} - Sanitized phone
 */
function sanitizePhone(phone) {
    if (!phone) return '';
    
    return phone
        .trim()
        .replace(/[^\d\+\-\s\(\)]/g, '') // Keep only valid phone characters
        .substring(0, 20); // Limit length
}