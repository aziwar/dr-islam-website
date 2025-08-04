# CLAUDE CODE MCP TEST SCENARIOS

**Companion to CLAUDE_CODE_STRATEGY.md**
**Purpose:** Specific test cases for playwright automation

## 🧪 PLAYWRIGHT TEST TEMPLATES

### Security Test Template
```javascript
// tests/security/admin-token.test.js
test('Gallery API requires authentication', async ({ page }) => {
  // Test unauthorized access
  const response = await page.request.get('/api/gallery/upload');
  expect(response.status()).toBe(401);
  
  // Test with valid token
  const authResponse = await page.request.get('/api/gallery/upload', {
    headers: { 'Authorization': 'Bearer test-token' }
  });
  expect(authResponse.status()).not.toBe(401);
});
```

### Mobile Responsiveness Test
```javascript
// tests/mobile/responsive.test.js
test('Mobile navigation works correctly', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://127.0.0.1:8787');
  
  // Check hamburger menu visible
  const hamburger = await page.$('.mobile-menu-toggle');
  expect(await hamburger.isVisible()).toBe(true);
  
  // Test menu interaction
  await hamburger.click();
  const mobileMenu = await page.$('#mobileMenu');
  expect(await mobileMenu.isVisible()).toBe(true);
  
  // Test touch targets
  const buttons = await page.$$('button, a, .btn');
  for (const button of buttons) {
    const box = await button.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
    expect(box.width).toBeGreaterThanOrEqual(48);
  }
});
```

### Arabic RTL Test
```javascript
// tests/mobile/arabic-rtl.test.js
test('Arabic version displays correctly', async ({ page }) => {
  // Test direct navigation
  await page.goto('http://127.0.0.1:8787/ar/');
  const html = await page.$('html');
  expect(await html.getAttribute('dir')).toBe('rtl');
  expect(await html.getAttribute('lang')).toBe('ar');
  
  // Test query parameter
  await page.goto('http://127.0.0.1:8787/?lang=ar');
  const htmlParam = await page.$('html');
  expect(await htmlParam.getAttribute('dir')).toBe('rtl');
  
  // Take screenshot for visual verification
  await page.screenshot({ path: 'arabic-homepage.png' });
});
```

### Performance Test
```javascript
// tests/performance/lighthouse.test.js
test('Lighthouse scores meet targets', async ({ page }) => {
  await page.goto('http://127.0.0.1:8787');
  
  // Run lighthouse audit
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      // Get performance metrics
      const perfData = performance.getEntriesByType('navigation')[0];
      resolve({
        TTFB: perfData.responseStart - perfData.fetchStart,
        FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        LCP: null // Would need PerformanceObserver
      });
    });
  });
  
  expect(metrics.TTFB).toBeLessThan(200);
  expect(metrics.FCP).toBeLessThan(1500);
});
```

## 🔍 CONTEXT7 USAGE PATTERNS

### Pattern 1: Problem-Specific Queries
```javascript
// When Claude Code encounters an issue:
if (cssNotWorking) {
  // Ask context7 for specific solution
  "CSS Grid not working in Safari 2025 fix use context7"
}

if (arabicTextOverflow) {
  // Get RTL-specific guidance
  "Arabic text overflow CSS solutions 2025 use context7"
}
```

### Pattern 2: Best Practice Queries
```javascript
// Before implementing any feature:
beforeImplementing('FAQ search') {
  // Get latest patterns
  "Vanilla JavaScript search implementation 2025 use context7"
  "Debounce search input performance use context7"
}

beforeImplementing('Service comparison table') {
  // Get responsive table patterns
  "Responsive table design mobile-first 2025 use context7"
  "Table to cards pattern CSS use context7"
}
```

### Pattern 3: Validation Queries
```javascript
// After implementing, verify approach:
afterImplementing('Mobile menu') {
  // Validate implementation
  "Mobile menu accessibility checklist 2025 use context7"
  "Touch gesture best practices 2025 use context7"
}
```

## 📱 MOBILE-SPECIFIC TESTS

### Touch Interaction Test
```javascript
test('Gallery swipe works with haptic feedback', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://127.0.0.1:8787#gallery');
  
  // Test swipe gesture
  const gallery = await page.$('.before-after-slider');
  await gallery.swipe({ direction: 'left', distance: 100 });
  
  // Verify haptic feedback called
  const vibrateCallled = await page.evaluate(() => {
    return window.navigator.vibrate.called;
  });
  expect(vibrateCallled).toBe(true);
});
```

### Form Validation Test
```javascript
test('Form shows real-time validation', async ({ page }) => {
  await page.goto('http://127.0.0.1:8787#contact');
  
  // Test email validation
  const emailInput = await page.$('input[type="email"]');
  await emailInput.type('invalid-email');
  await page.waitForTimeout(350); // Debounce delay
  
  const errorVisible = await page.$('.error-message');
  expect(await errorVisible.isVisible()).toBe(true);
  
  // Fix email and verify
  await emailInput.fill('valid@email.com');
  await page.waitForTimeout(350);
  expect(await errorVisible.isVisible()).toBe(false);
});
```

## 🚨 CRITICAL PATH TESTS

These MUST pass before any deployment:

1. **Security Test Suite**
   - Admin token not exposed
   - Gallery API protected
   - No console.logs in production

2. **Core Functionality**
   - Both languages load
   - Navigation works all viewports
   - Contact form submits
   - WhatsApp button clicks

3. **Performance Benchmarks**
   - TTFB < 200ms
   - FCP < 1.5s
   - LCP < 2.5s
   - CLS < 0.1

4. **Accessibility**
   - All touch targets 48px+
   - Proper ARIA labels
   - Keyboard navigation works
   - Screen reader compatible

## 💡 SMART DEBUGGING WITH CONTEXT7

When tests fail, Claude Code should:

```javascript
// Example: Mobile menu not closing
testFailure: "Mobile menu stays open after navigation"

// Step 1: Query context7 for common issues
"Mobile menu not closing on navigation common issues use context7"

// Step 2: Get specific implementation pattern
"JavaScript event delegation mobile menu 2025 use context7"

// Step 3: Apply fix and retest with playwright
```

## 📊 REPORTING TEMPLATE

Claude Code should generate after each session:

```markdown
# Fix Report - [Date]

## Fixed Issues
- ✅ Admin token secured (moved to env vars)
- ✅ Arabic routing (?lang=ar parameter)
- ✅ Mobile touch targets (all 48px+)

## Test Results
- Security: 5/5 tests passing
- Mobile: 8/8 tests passing  
- Performance: 4/4 tests passing
- Accessibility: 6/6 tests passing

## Screenshots
- Desktop: [link]
- Mobile: [link]
- Arabic: [link]

## Deployment
- Commit: abc123
- Status: Auto-deployed via GitHub integration
```

---
**These test scenarios ensure Claude Code validates every fix properly using playwright automation.**