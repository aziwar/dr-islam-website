# TOKEN-EFFICIENT WEB DEV WORKFLOW FOR DR-ISLAM WEBSITE

## 1. SETUP CLAUDE.md FILE
Create this in your project root to save tokens on every chat:

```markdown
# dr-islam-website

## Project Context
- Cloudflare Workers site (no Node.js server)
- Bilingual: Arabic (RTL) + English
- Static assets in R2 bucket
- Mobile-first responsive design

## Key Files
- src/index.js - Worker entry
- src/content/styles.js - All CSS (line 950+ mobile styles)
- src/content/ar.js - Arabic HTML
- src/content/en.js - English HTML

## Common Issues
- CSS cache: max-age=31536000 (needs purge after changes)
- Mobile styles need !important for specificity
- Media queries start at line 754 and 989

## Deploy Command
npx wrangler deploy

## Test Mobile
- Viewport: 390x844 (iPhone 12)
- Check: .emergency-banner (18px) and .sticky-book (80px bottom)
```

## 2. TOKEN-SAVING STRATEGIES

### A. Use Playwright Efficiently
```javascript
// BAD: Takes screenshot (high tokens)
await page.screenshot({ path: 'mobile.png' });

// GOOD: Extract data only (low tokens)
await page.evaluate(() => ({
  banner: getComputedStyle(document.querySelector('.emergency-banner')).fontSize,
  button: getComputedStyle(document.querySelector('.sticky-book')).bottom
}));
```

### B. Context7 Usage
```
// Search for specific topics only
context7:get-library-docs
- tokens: 3000 (not 10000)
- topic: "specific feature" (not general)
```

### C. File Operations
```
// BAD: Read entire file
read_file(path, 0, 1000)

// GOOD: Read specific sections
read_file(path, 950, 30)  // Just mobile styles
```

## 3. EFFICIENT WORKFLOW PATTERN

### Step 1: Quick Diagnosis
```javascript
// One-line mobile check
window.matchMedia('(max-width: 768px)').matches && 
document.querySelector('.emergency-banner')?.style.fontSize
```

### Step 2: Targeted Fixes
```
// Use edit_block, not rewrite
edit_block(file, old_string, new_string, 1)
```

### Step 3: Deploy & Verify
```powershell
cd D:\Github-work\dr-islam-website; npx wrangler deploy
```

### Step 4: Cache Management
```
# Check cache headers only
curl -I https://dr-elsagher.com/styles.css
```

## 4. CHAT OPTIMIZATION TIPS

### Start Each Chat With:
1. "Continue from previous session" (loads context)
2. Reference CLAUDE.md automatically
3. State specific goal: "Fix mobile WhatsApp button position"

### Avoid:
- Long explanations of what you already know
- Screenshots unless absolutely necessary
- Reading entire files
- Multiple similar searches

### Use:
- Specific line numbers from memory
- JavaScript evaluation for testing
- Direct edits with edit_block
- One-command deployments

## 5. TESTING WITHOUT SCREENSHOTS

### Mobile CSS Test (5 tokens vs 500):
```javascript
// Create test function
const testMobile = () => {
  const results = {
    viewport: window.innerWidth,
    mediaQuery: window.matchMedia('(max-width: 768px)').matches,
    styles: {}
  };
  
  ['emergency-banner', 'sticky-book'].forEach(cls => {
    const el = document.querySelector('.' + cls);
    if (el) {
      const style = getComputedStyle(el);
      results.styles[cls] = {
        fontSize: style.fontSize,
        bottom: style.bottom
      };
    }
  });
  
  return results;
};

// Run in Playwright
await page.evaluate(testMobile);
```

## 6. PROJECT-SPECIFIC SHORTCUTS

### Quick Mobile Fix:
```
1. edit_block styles.js line 955 "bottom: 80px !important"
2. edit_block index.js line 16 'ETag: "css-v' + Date.now() + '"'
3. wrangler deploy
4. Clear Cloudflare cache
```

### Quick Test:
```javascript
// Playwright one-liner
await page.goto('https://dr-elsagher.com'); 
await page.setViewportSize({width:390,height:844}); 
await page.evaluate(() => [
  getComputedStyle(document.querySelector('.emergency-banner')).fontSize,
  getComputedStyle(document.querySelector('.sticky-book')).bottom
]);
```

## 7. MEMORY USAGE

Store only essential info:
- Fixed issues with line numbers
- Deployment versions
- Cache-busting strategies
- NOT: Full file contents or long logs

## ESTIMATED TOKEN SAVINGS
- Old way: ~15,000 tokens per fix
- New way: ~3,000 tokens per fix
- Savings: 80% reduction

## QUICK REFERENCE CARD
```
Mobile viewport: 390x844
Emergency banner: 18px !important (line 963)
WhatsApp button: 80px !important (line 955)
Deploy: npx wrangler deploy
Cache: Purge via Cloudflare dashboard
Test: Playwright evaluate, not screenshot
```