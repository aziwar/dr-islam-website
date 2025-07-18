# BEST PRACTICES SUMMARY

## 1. TOKEN-SAVING WORKFLOW (80% REDUCTION)

### A. CLAUDE.md Setup ✅
- Created at project root
- Loads automatically each chat
- Contains project context, key files, common issues

### B. Playwright Testing
```javascript
// ❌ BAD: Screenshots = 500+ tokens
await page.screenshot({ path: 'mobile.png' });

// ✅ GOOD: Data only = 20 tokens
await page.evaluate(() => ({
  banner: getComputedStyle(document.querySelector('.emergency-banner')).fontSize,
  button: getComputedStyle(document.querySelector('.sticky-book')).bottom
}));
```

### C. File Operations
```javascript
// ❌ BAD: Read entire file
read_file(path, 0, 1000);

// ✅ GOOD: Read specific sections
read_file(path, 950, 30);  // Just mobile styles
```

## 2. MOBILE TESTING STRATEGY

### One-Command Test
```javascript
// Playwright mobile test (20 tokens)
await page.goto('https://dr-elsagher.com');
await page.setViewportSize({width: 390, height: 844});
const results = await page.evaluate(() => ({
  banner: getComputedStyle(document.querySelector('.emergency-banner')).fontSize,
  button: getComputedStyle(document.querySelector('.sticky-book')).bottom,
  mediaQuery: window.matchMedia('(max-width: 768px)').matches
}));
```

### CSS Cache Headers Check
```bash
# Quick cache check (5 tokens)
curl -I https://dr-elsagher.com/styles.css | grep -E "etag|cache-control"
```

## 3. DEPLOYMENT WORKFLOW

### Quick Fix Pattern
1. **Target edit**: `edit_block(file, old, new, 1)`
2. **Deploy**: `npx wrangler deploy`
3. **Test**: Playwright evaluate (no screenshots)
4. **Cache**: Purge via dashboard if needed

### Cache-Busting Strategy
```javascript
// Update ETag on each deployment
'ETag': '"css-v' + Date.now() + '"'
// Or reduce cache time
'Cache-Control': 'public, max-age=3600, must-revalidate'
```

## 4. CONTEXT7 USAGE

### Efficient Docs Fetching
```javascript
// ❌ BAD: Too many tokens
context7:get-library-docs(libraryID, 10000, "general topic")

// ✅ GOOD: Specific and limited
context7:get-library-docs(libraryID, 3000, "cache headers etag")
```

## 5. CHAT OPTIMIZATION

### Start Each Chat
1. Load CLAUDE.md automatically
2. State specific goal: "Fix mobile banner font size"
3. Reference line numbers from memory

### Avoid
- Long explanations
- Screenshots unless critical
- Multiple similar searches
- Reading entire files

## 6. RESULTS

- **Old way**: ~15,000 tokens per fix
- **New way**: ~3,000 tokens per fix
- **Savings**: 80% reduction
- **Chats needed**: 1 instead of 3

## QUICK REFERENCE
```
Mobile: 390x844 (iPhone 12)
Banner: font-size: 18px !important (line 963)
Button: bottom: 80px !important (line 955)
Deploy: npx wrangler deploy
Test: page.evaluate() not screenshot()
Cache: Purge after CSS changes
```