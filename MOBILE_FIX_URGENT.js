// MOBILE CSS FIX - Apply these changes to src/content/styles.js

// 1. Find the mobile media query section (around line 954)
// Replace the existing mobile styles with:

@media (max-width: 768px) {
    /* Critical Mobile Fixes with Higher Specificity */
    
    /* WhatsApp Button - Force Mobile Position */
    .sticky-book,
    a.sticky-book {
        bottom: 80px !important;
        right: 20px !important;
        font-size: 1rem !important;
        padding: 15px 25px !important;
        min-width: auto !important;
        z-index: 997 !important;
        position: fixed !important;
        display: block !important;
    }
    
    /* Emergency Banner - Force Mobile Size */
    .emergency-banner,
    p.emergency-banner {
        font-size: 18px !important;
        padding: 8px 10px !important;
        min-height: 35px !important;
        line-height: 1.2 !important;
        display: block !important;
    }
    
    /* Navigation - Ensure Hidden on Mobile */
    nav > ul {
        display: none !important;
    }
    
    /* Mobile Menu Toggle - Ensure Visible */
    .mobile-menu-toggle {
        display: block !important;
    }
}

// 2. Update cache headers in src/index.js
const CACHE_VERSION = 'v2-mobile-fix-' + new Date().toISOString().split('T')[0];

// 3. Add viewport meta if missing in HTML template
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">

// 4. Deploy with cache purge
// Run: npm run deploy
// Then: npm run purge-cache