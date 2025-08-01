/**
 * Cloudflare Worker - Contact Form Handler (Modular)
 * Handles contact form submissions for Dr. Islam Elsagher dental clinic
 * Refactored into modular components for better maintainability
 */

import { CONFIG, CORS_HEADERS } from './modules/config.js';
import { EMAIL_TEMPLATES } from './templates/email-templates.js';
import { validateContactForm, sanitizeFormData } from './utils/validation.js';
import { checkRateLimit, getClientIP, cleanupRateLimitStore } from './utils/rate-limiter.js';
import { sendEmail } from './utils/email-sender.js';

/**
 * Main worker event listener
 */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

/**
 * Main request handler
 * @param {Request} request - Incoming request
 * @returns {Promise<Response>} - Response
 */
async function handleRequest(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions();
    }
    
    // Only allow POST requests
    if (request.method !== 'POST') {
        return createResponse({ error: 'Method not allowed' }, 405);
    }
    
    try {
        // Get client IP for rate limiting
        const clientIP = getClientIP(request);
        
        // Check rate limit
        const rateLimitResult = checkRateLimit(clientIP);
        if (rateLimitResult.isRateLimited) {
            return createResponse({
                error: 'Rate limit exceeded',
                details: 'لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة لاحقاً',
                retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            }, 429);
        }
        
        // Parse and validate request
        const formData = await parseRequest(request);
        const validation = validateContactForm(formData);
        
        if (!validation.isValid) {
            return createResponse({
                error: 'Validation failed',
                details: validation.errors
            }, 400);
        }
        
        // Sanitize data
        const sanitizedData = sanitizeFormData(formData);
        
        // Send emails
        const emailResult = await sendContactEmails(sanitizedData, request.env);
        
        // Cleanup rate limit store periodically
        if (Math.random() < 0.1) { // 10% chance
            cleanupRateLimitStore();
        }
        
        return createResponse({
            success: true,
            message: 'تم إرسال طلب الموعد بنجاح! سيتم التواصل معك قريباً.',
            emailResult
        });
        
    } catch (error) {
        // Log error details for debugging
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        };
        
        return createResponse({
            error: 'Internal server error',
            details: 'حدث خطأ في النظام. يرجى المحاولة لاحقاً أو التواصل مباشرة.'
        }, 500);
    }
}

/**
 * Parse incoming request data
 * @param {Request} request - Incoming request
 * @returns {Promise<Object>} - Parsed form data
 */
async function parseRequest(request) {
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
        return await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    } else {
        throw new Error('Unsupported content type');
    }
}

/**
 * Send contact form emails
 * @param {Object} data - Sanitized form data
 * @param {Object} env - Environment variables
 * @returns {Promise<Object>} - Email sending results
 */
async function sendContactEmails(data, env) {
    const results = {};
    
    try {
        // Send email to clinic
        const clinicEmail = EMAIL_TEMPLATES.TO_CLINIC(data);
        clinicEmail.to = CONFIG.CLINIC_EMAIL;
        
        const clinicResult = await sendEmail(clinicEmail, env);
        results.clinic = clinicResult;
        
        // Send confirmation email to patient (if email provided)
        if (data.email) {
            try {
                const patientEmail = EMAIL_TEMPLATES.TO_PATIENT(data);
                patientEmail.to = data.email;
                
                const patientResult = await sendEmail(patientEmail, env);
                results.patient = patientResult;
            } catch (error) {
                // Patient email failure shouldn't fail the whole request
                results.patient = { success: false, error: error.message };
            }
        }
        
        return results;
        
    } catch (error) {
        // If clinic email fails, the whole operation fails
        throw new Error(`Failed to send clinic notification: ${error.message}`);
    }
}

/**
 * Handle CORS preflight requests
 * @returns {Response} - CORS preflight response
 */
function handleOptions() {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS
    });
}

/**
 * Create JSON response with CORS headers
 * @param {Object} data - Response data
 * @param {number} status - HTTP status code
 * @returns {Response} - JSON response
 */
function createResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...CORS_HEADERS
        }
    });
}

/**
 * Export for testing purposes
 */
export { handleRequest, parseRequest, sendContactEmails };