/**
 * Configuration Module
 * Centralized configuration for contact form worker
 */

export const CONFIG = {
    // Email configuration
    CLINIC_EMAIL: 'dr.islam_elsagher@gmail.com',
    FROM_EMAIL: 'noreply@dr-elsagher.com',
    
    // SendGrid API (preferred)
    SENDGRID_API_URL: 'https://api.sendgrid.com/v3/mail/send',
    
    // Resend API (alternative)
    RESEND_API_URL: 'https://api.resend.com/emails',
    
    // Rate limiting
    RATE_LIMIT_REQUESTS: 5,
    RATE_LIMIT_WINDOW: 3600, // 1 hour in seconds
    
    // Allowed origins
    ALLOWED_ORIGINS: [
        'https://dr-elsagher.com',
        'https://www.dr-elsagher.com',
        'http://localhost:3000', // For development
        'http://127.0.0.1:5500'  // For local testing
    ]
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
};