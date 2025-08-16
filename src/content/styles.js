// Main CSS module - Consolidated 3-file architecture with performance optimization
import { CORE_CSS } from './css/core.css.js';
import { COMPONENTS_CSS } from './css/components.css.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';
import { A11Y_CSS } from './css/a11y.css.js';
import { HEADER_CSS } from './css/header.css.js';
import { MODERN_HEADER_CSS } from './css/modern-header.css.js';
import { PerformanceOptimizer } from '../utils/performance-optimizer.js';

// Critical CSS for inline inclusion (above-the-fold)
export const INLINE_CSS = extractCriticalCSS();

// Deferred CSS for progressive loading
export const DEFERRED_STYLES = COMPONENTS_CSS + ENHANCEMENTS_CSS + HEADER_CSS + MODERN_HEADER_CSS;

// Full CSS for legacy support with accessibility enhancements
export const CSS = CORE_CSS + COMPONENTS_CSS + ENHANCEMENTS_CSS + A11Y_CSS + HEADER_CSS + MODERN_HEADER_CSS + PerformanceOptimizer.generateSkeletonCSS();

// Export consolidated modules
export { CORE_CSS, COMPONENTS_CSS, ENHANCEMENTS_CSS };

// Extract critical CSS from the full stylesheet
function extractCriticalCSS() {
    const fullCSS = CORE_CSS + COMPONENTS_CSS + ENHANCEMENTS_CSS + A11Y_CSS + MODERN_HEADER_CSS;
    
    // Critical selectors for above-the-fold content
    const criticalPatterns = [
        // Essential reset and variables
        ':root', 'html', 'body', '*', '::before', '::after',
        
        // Above-the-fold layout
        'header', 'nav', '.logo', '.dental-logo',
        '.hero', '.hero h1', '.hero p', '.hero-content',
        '.cta-button', '.nav-toggle', '.main-nav',
        
        // Modern header navigation (critical for mobile UX)
        '.modern-header', '.mobile-menu-toggle', '.nav-brand', '.brand-link',
        '.navigation-menu', '.mobile-navigation', '.nav-backdrop',
        '.nav-menu', '.nav-item', '.nav-link', '.toggle-icon', '.toggle-line',
        
        // Loading states (critical for perceived performance)
        '.skeleton', '.loading-spinner', '.progressive-load',
        
        // Essential responsive breakpoints
        '@media (max-width: 768px)', '@media (min-width: 48rem)',
        
        // Critical animations
        '@keyframes skeleton-loading', '@keyframes spin'
    ];
    
    const criticalCSS = [];
    const lines = fullCSS.split('\n');
    let inCriticalRule = false;
    let braceDepth = 0;
    let currentRule = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Check if this line contains critical selectors
        const isCritical = criticalPatterns.some(pattern => 
            trimmed.includes(pattern) || 
            (pattern.startsWith('@') && trimmed.startsWith(pattern))
        );
        
        if (isCritical && !inCriticalRule) {
            inCriticalRule = true;
            braceDepth = 0;
            currentRule = line;
        } else if (inCriticalRule) {
            currentRule += '\n' + line;
        }
        
        // Track CSS rule depth
        if (inCriticalRule) {
            braceDepth += (line.match(/\{/g) || []).length;
            braceDepth -= (line.match(/\}/g) || []).length;
            
            if (braceDepth === 0 && trimmed.endsWith('}')) {
                criticalCSS.push(currentRule);
                inCriticalRule = false;
                currentRule = '';
            }
        }
    }
    
    return criticalCSS.join('\n') + '\n' + A11Y_CSS + '\n' + PerformanceOptimizer.generateSkeletonCSS();
}

// Helper function to get CSS based on device type and performance requirements
export function getCSSForRequest(request, isMobile) {
    const userAgent = request.headers.get('User-Agent') || '';
    const acceptHeader = request.headers.get('Accept') || '';
    const isActuallyMobile = isMobile || /Mobile|Android|iPhone/i.test(userAgent);
    const supportsModernCSS = !userAgent.includes('MSIE') && !userAgent.includes('Trident');
    
    // For mobile devices, prioritize critical path
    if (isActuallyMobile) {
        return {
            critical: INLINE_CSS,
            deferred: COMPONENTS_CSS + ENHANCEMENTS_CSS,
            total: CSS
        };
    }
    
    // For desktop with modern browser support
    if (supportsModernCSS) {
        return {
            critical: INLINE_CSS,
            deferred: DEFERRED_STYLES,
            total: CSS
        };
    }
    
    // Legacy fallback - serve all CSS inline
    return {
        critical: CSS,
        deferred: '',
        total: CSS
    };
}

// Performance optimization: Get minified CSS with compression
export function getMinifiedCSS(cssContent = CSS) {
    return cssContent
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around CSS syntax
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove leading/trailing whitespace
        .trim();
}

// Generate optimized CSS with performance features
export function generateOptimizedCSS() {
    const critical = getMinifiedCSS(INLINE_CSS);
    const deferred = getMinifiedCSS(DEFERRED_STYLES);
    const skeleton = PerformanceOptimizer.generateSkeletonCSS();
    
    return {
        critical: critical + skeleton,
        deferred: deferred,
        size: {
            critical: (critical.length / 1024).toFixed(1) + 'KB',
            deferred: (deferred.length / 1024).toFixed(1) + 'KB',
            total: ((critical.length + deferred.length) / 1024).toFixed(1) + 'KB'
        }
    };
}

// Generate performance-optimized HTML head tags
export function generateOptimizedHead(lang = 'en') {
    const optimizedCSS = generateOptimizedCSS();
    
    return `
        ${PerformanceOptimizer.generatePerformanceMeta()}
        ${PerformanceOptimizer.generateResourceHints()}
        <!-- Font loading handled by head templates -->
        
        <style id="critical-css">
            ${optimizedCSS.critical}
        </style>
        
        <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="/styles.css"></noscript>
    `;
}

// Generate performance scripts for dynamic loading
export function generateOptimizedScripts() {
    return PerformanceOptimizer.generateLazyLoadScript() + 
           PerformanceOptimizer.generateAdvancedLoadingScript() + 
           PerformanceOptimizer.generateServiceWorkerScript();
}
