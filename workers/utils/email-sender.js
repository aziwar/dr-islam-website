/**
 * Email Sending Utilities
 * Handles email delivery via SendGrid and Resend APIs
 */

import { CONFIG } from '../modules/config.js';

/**
 * Send email using SendGrid API
 * @param {Object} emailData - Email data
 * @param {string} apiKey - SendGrid API key
 * @returns {Promise<Object>} - Send result
 */
export async function sendWithSendGrid(emailData, apiKey) {
    const payload = {
        personalizations: [{
            to: [{ email: emailData.to }],
            subject: emailData.subject
        }],
        from: { email: CONFIG.FROM_EMAIL },
        content: [{
            type: 'text/html',
            value: emailData.html
        }]
    };

    const response = await fetch(CONFIG.SENDGRID_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    return {
        success: response.ok,
        status: response.status,
        provider: 'SendGrid',
        response: response.ok ? null : await response.text()
    };
}

/**
 * Send email using Resend API
 * @param {Object} emailData - Email data
 * @param {string} apiKey - Resend API key
 * @returns {Promise<Object>} - Send result
 */
export async function sendWithResend(emailData, apiKey) {
    const payload = {
        from: CONFIG.FROM_EMAIL,
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html
    };

    const response = await fetch(CONFIG.RESEND_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    return {
        success: response.ok,
        status: response.status,
        provider: 'Resend',
        response: response.ok ? await response.json() : await response.text()
    };
}

/**
 * Send email with fallback providers
 * @param {Object} emailData - Email data
 * @param {Object} env - Environment variables
 * @returns {Promise<Object>} - Send result
 */
export async function sendEmail(emailData, env) {
    const providers = [];
    
    // Add available providers
    if (env.SENDGRID_API_KEY) {
        providers.push({
            name: 'SendGrid',
            sender: sendWithSendGrid,
            apiKey: env.SENDGRID_API_KEY
        });
    }
    
    if (env.RESEND_API_KEY) {
        providers.push({
            name: 'Resend',
            sender: sendWithResend,
            apiKey: env.RESEND_API_KEY
        });
    }
    
    if (providers.length === 0) {
        throw new Error('No email providers configured');
    }
    
    // Try each provider
    let lastError = null;
    
    for (const provider of providers) {
        try {
            const result = await provider.sender(emailData, provider.apiKey);
            
            if (result.success) {
                return {
                    success: true,
                    provider: provider.name,
                    ...result
                };
            }
            
            lastError = new Error(`${provider.name} failed: ${result.response}`);
        } catch (error) {
            lastError = error;
            // Continue to next provider
        }
    }
    
    // All providers failed
    throw lastError || new Error('All email providers failed');
}