// Main CSS module - Combines all CSS modules
import { CRITICAL_CSS } from './css/critical.css.js';
import { COMPONENT_CSS } from './css/components.css.js';
import { RESPONSIVE_CSS } from './css/responsive.css.js';

// Combine all CSS modules
export const CSS = CRITICAL_CSS + COMPONENT_CSS + RESPONSIVE_CSS;

// Export individual modules for selective loading if needed
export { CRITICAL_CSS, COMPONENT_CSS, RESPONSIVE_CSS };

// Helper function to get CSS based on device type (optional optimization)
export function getCSSForRequest(request, isMobile) {
    const userAgent = request.headers.get('User-Agent') || '';
    const isActuallyMobile = isMobile || /Mobile|Android|iPhone/i.test(userAgent);
    
    // For mobile devices, we might want to prioritize critical and responsive CSS
    if (isActuallyMobile) {
        return CRITICAL_CSS + RESPONSIVE_CSS + COMPONENT_CSS;
    }
    
    // For desktop, load in standard order
    return CRITICAL_CSS + COMPONENT_CSS + RESPONSIVE_CSS;
}

// Performance optimization: Get minified CSS
export function getMinifiedCSS() {
    // In production, you might want to minify the CSS
    // For now, just return the combined CSS
    return CSS;
}
