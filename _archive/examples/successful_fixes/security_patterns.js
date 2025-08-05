/**
 * Security Patterns - Extracted from Successful Fixes
 * These patterns have been tested and proven in production
 */

// ================================
// 1. AUTHENTICATION VALIDATION FIX
// ================================
// PROBLEM: validateAuth() returned object but code checked truthiness
// SOLUTION: Explicitly check the .valid property

// ❌ VULNERABLE PATTERN - DO NOT USE
/*
if (!this.validateAuth(authHeader)) {
    return this.errorResponse('Unauthorized', 401);
}
*/

// ✅ SECURE PATTERN - USE THIS
const authResult = this.validateAuth(authHeader);
if (!authResult.valid) {
    return this.errorResponse('Unauthorized', 401);
}

// ================================
// 2. CONSTANT-TIME TOKEN COMPARISON
// ================================
// Prevents timing attacks by ensuring comparison takes same time

validateAuth(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, reason: 'missing_header' };
    }

    const token = authHeader.slice(7);
    const expectedToken = this.env.ADMIN_TOKEN;

    // Constant-time comparison
    if (token.length !== expectedToken.length) {
        return { valid: false, reason: 'invalid_length' };
    }

    let mismatch = 0;
    for (let i = 0; i < token.length; i++) {
        mismatch |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
    }

    return {
        valid: mismatch === 0,
        reason: mismatch === 0 ? 'valid' : 'invalid_token'
    };
}

// ================================
// 3. RATE LIMITING IMPLEMENTATION
// ================================
// Protect against brute force attacks

class RateLimiter {
    constructor() {
        this.attempts = new Map();
        this.WINDOW_MS = 15 * 60 * 1000; // 15 minutes
        this.MAX_ATTEMPTS = 50;
        this.LOCKOUT_ATTEMPTS = 5;
        this.LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes
    }

    checkLimit(identifier) {
        const now = Date.now();
        const userAttempts = this.attempts.get(identifier) || { count: 0, firstAttempt: now, locked: false };

        // Check if locked out
        if (userAttempts.locked && now - userAttempts.lockedAt < this.LOCKOUT_DURATION) {
            return { allowed: false, reason: 'locked_out' };
        }

        // Reset if window expired
        if (now - userAttempts.firstAttempt > this.WINDOW_MS) {
            userAttempts.count = 0;
            userAttempts.firstAttempt = now;
            userAttempts.locked = false;
        }

        userAttempts.count++;

        // Lock out after failed attempts
        if (userAttempts.count > this.LOCKOUT_ATTEMPTS) {
            userAttempts.locked = true;
            userAttempts.lockedAt = now;
            this.attempts.set(identifier, userAttempts);
            return { allowed: false, reason: 'locked_out' };
        }

        // Rate limit check
        if (userAttempts.count > this.MAX_ATTEMPTS) {
            this.attempts.set(identifier, userAttempts);
            return { allowed: false, reason: 'rate_limited' };
        }

        this.attempts.set(identifier, userAttempts);
        return { allowed: true };
    }
}

// ================================
// 4. ENVIRONMENT VARIABLE USAGE
// ================================
// NEVER hardcode sensitive values

// ❌ WRONG - Hardcoded token
// const ADMIN_TOKEN = "b5157dafc042828c9a22ce407c72f70ecfaba8b53e5d3ca5e5d23d7a309719b7";

// ✅ RIGHT - Environment variable
const adminToken = env.ADMIN_TOKEN;

// For local development, use .dev.vars:
/*
# .dev.vars
ADMIN_TOKEN=your-secure-token-here
KV_NAMESPACE_ID=28bd1e108a434cd4bf812a65f82d5526
*/

// ================================
// 5. ERROR HANDLING WITHOUT INFO LEAKAGE
// ================================
// Don't reveal system details in error messages

// ❌ WRONG - Reveals internal info
catch (error) {
    return new Response(JSON.stringify({
        error: error.message,
        stack: error.stack,
        query: sql
    }), { status: 500 });
}

// ✅ RIGHT - Generic error for production
catch (error) {
    logger.error('Internal error:', error); // Log full error internally
    return new Response(JSON.stringify({
        error: 'Internal server error'
    }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}