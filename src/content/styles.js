// Main CSS module - Optimized with splitting
import { CRITICAL_INLINE_CSS } from './css/critical-inline.css.js';
import { DEFERRED_CSS } from './css/deferred.css.js';
import { CRITICAL_CSS } from './css/critical.css.js';
import { COMPONENT_CSS } from './css/components.css.js';
import { RESPONSIVE_CSS } from './css/responsive.css.js';
import { MOBILE_UX_CSS } from './css/mobile-ux.css.js';
import { ACCESSIBILITY_CSS } from '../accessibility-fixes.css.js';

// Critical CSS for inline inclusion (above-the-fold)
export const INLINE_CSS = CRITICAL_INLINE_CSS;

// Deferred CSS for progressive loading
export const DEFERRED_STYLES = DEFERRED_CSS + COMPONENT_CSS + MOBILE_UX_CSS + ACCESSIBILITY_CSS;

// Full CSS for legacy support
export const CSS = CRITICAL_CSS + COMPONENT_CSS + RESPONSIVE_CSS + MOBILE_UX_CSS + ACCESSIBILITY_CSS;

// Export individual modules for selective loading if needed
export { CRITICAL_INLINE_CSS, DEFERRED_CSS, CRITICAL_CSS, COMPONENT_CSS, RESPONSIVE_CSS, MOBILE_UX_CSS, ACCESSIBILITY_CSS };

// Helper function to get CSS based on device type (optional optimization)
export function getCSSForRequest(request, isMobile) {
    const userAgent = request.headers.get('User-Agent') || '';
    const isActuallyMobile = isMobile || /Mobile|Android|iPhone/i.test(userAgent);
    
    // For mobile devices, prioritize mobile-optimized CSS
    if (isActuallyMobile) {
        return INLINE_CSS + MOBILE_UX_CSS + RESPONSIVE_CSS + ACCESSIBILITY_CSS;
    }
    
    // For desktop, load optimized CSS
    return INLINE_CSS + DEFERRED_STYLES;
}

// Performance optimization: Get minified CSS
export function getMinifiedCSS() {
    // In production, you might want to minify the CSS
    // For now, just return the combined CSS
    return CSS;
}
