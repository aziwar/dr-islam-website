# DR-ISLAM-WEBSITE MOBILE FIX ACTION PLAN

## Issue Summary
Mobile styles exist but aren't applying due to CSS specificity and caching issues.

## Step 1: Update Mobile CSS (src/content/styles.js)
Replace lines 954-969 with higher specificity:

```css
/* Mobile WhatsApp Button - Maximum Specificity */
body .sticky-book,
body a.sticky-book,
html body .sticky-book {
    bottom: 80px !important;
    right: 20px !important;
    position: fixed !important;
    display: block !important;
    visibility: visible !important;
}

/* Mobile Emergency Banner - Maximum Specificity */
body .emergency-banner,
body p.emergency-banner,
html body .emergency-banner {
    font-size: 18px !important;
    line-height: 1.4 !important;
    display: block !important;
    visibility: visible !important;
}
```

## Step 2: Add Cache Version (src/index.js)
Add after line 10:
```javascript
const BUILD_DATE = new Date().toISOString().split('T')[0];
const CSS_VERSION = `mobile-fix-${BUILD_DATE}`;
```

Update headers (around line 15):
```javascript
'Cache-Control': 'public, max-age=300, s-maxage=3600, must-revalidate',
'ETag': `"${CSS_VERSION}"`,
```

## Step 3: Deploy Commands
```powershell
# 1. Test locally first
npm run dev

# 2. Deploy to production
npm run deploy:prod

# 3. Clear browser cache and test
# Press Ctrl+Shift+R on the live site
```

## Step 4: Verify Without Playwright
```powershell
# Check deployment version
curl -I https://dr-elsagher.com | findstr "ETag"

# Download mobile view
curl -H "User-Agent: iPhone" https://dr-elsagher.com > test-mobile.html

# Search for our CSS
Select-String -Path test-mobile.html -Pattern "font-size: 18px"
```

## If Still Not Working
1. Check if CSS file is minified (might strip !important)
2. Look for inline styles overriding our CSS
3. Consider adding styles directly to HTML template as last resort

## Token-Efficient Testing
- Use browser DevTools mobile emulator locally
- Check ETag header to confirm new deployment
- Use Select-String to verify CSS in downloaded HTML