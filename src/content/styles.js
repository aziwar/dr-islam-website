// Main CSS module - Consolidated 3-file architecture
import { CORE_CSS } from './css/core.css.js';
import { COMPONENTS_CSS } from './css/components.css.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';

// Critical CSS for inline inclusion (above-the-fold)
export const INLINE_CSS = CORE_CSS;

// Deferred CSS for progressive loading
export const DEFERRED_STYLES = COMPONENTS_CSS + ENHANCEMENTS_CSS;

// Full CSS for legacy support
export const CSS = CORE_CSS + COMPONENTS_CSS + ENHANCEMENTS_CSS;

// Export consolidated modules
export { CORE_CSS, COMPONENTS_CSS, ENHANCEMENTS_CSS };

// Helper function to get CSS based on device type (optional optimization)
export function getCSSForRequest(request, isMobile) {
    const userAgent = request.headers.get('User-Agent') || '';
    const isActuallyMobile = isMobile || /Mobile|Android|iPhone/i.test(userAgent);
    
    // For mobile devices, prioritize core + enhancements
    if (isActuallyMobile) {
        return CORE_CSS + ENHANCEMENTS_CSS + COMPONENTS_CSS;
    }
    
    // For desktop, load all optimized CSS
    return CSS;
}

// Performance optimization: Get minified CSS
export function getMinifiedCSS() {
    // In production, you might want to minify the CSS
    // For now, just return the combined CSS
    return CSS;
}
