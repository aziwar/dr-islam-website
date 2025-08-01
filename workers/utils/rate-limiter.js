/**
 * Rate Limiting Utilities
 * Simple in-memory rate limiting for contact form submissions
 */

import { CONFIG } from '../modules/config.js';

// In-memory store for rate limiting (resets on worker restart)
const rateLimitStore = new Map();

/**
 * Check if request is rate limited
 * @param {string} clientIP - Client IP address
 * @returns {Object} - Rate limit status
 */
export function checkRateLimit(clientIP) {
    const now = Date.now();
    const windowStart = now - (CONFIG.RATE_LIMIT_WINDOW * 1000);
    
    // Get or create rate limit data for this IP
    let ipData = rateLimitStore.get(clientIP) || {
        requests: [],
        lastCleanup: now
    };
    
    // Clean old requests (outside the window)
    ipData.requests = ipData.requests.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limit exceeded
    const isRateLimited = ipData.requests.length >= CONFIG.RATE_LIMIT_REQUESTS;
    
    if (!isRateLimited) {
        // Add current request
        ipData.requests.push(now);
        ipData.lastCleanup = now;
        rateLimitStore.set(clientIP, ipData);
    }
    
    return {
        isRateLimited,
        requestCount: ipData.requests.length,
        maxRequests: CONFIG.RATE_LIMIT_REQUESTS,
        windowSeconds: CONFIG.RATE_LIMIT_WINDOW,
        resetTime: windowStart + (CONFIG.RATE_LIMIT_WINDOW * 1000)
    };
}

/**
 * Clean up old rate limit data (called periodically)
 */
export function cleanupRateLimitStore() {
    const now = Date.now();
    const cleanupThreshold = now - (CONFIG.RATE_LIMIT_WINDOW * 2 * 1000); // 2x window
    
    for (const [ip, data] of rateLimitStore.entries()) {
        if (data.lastCleanup < cleanupThreshold) {
            rateLimitStore.delete(ip);
        }
    }
}

/**
 * Get client IP from request
 * @param {Request} request - Cloudflare request object
 * @returns {string} - Client IP address
 */
export function getClientIP(request) {
    // Cloudflare provides client IP in various headers
    return request.headers.get('CF-Connecting-IP') ||
           request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
           request.headers.get('X-Real-IP') ||
           '0.0.0.0';
}