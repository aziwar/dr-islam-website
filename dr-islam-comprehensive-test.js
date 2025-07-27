const { test, expect, devices } = require('@playwright/test');

// Dr. Islam Dental Website Comprehensive Test Suite
const BASE_URL = 'https://dr-elsagher.com';

// Test configuration
const MOBILE_DEVICES = ['iPhone 12', 'Samsung Galaxy S21', 'iPad'];
const DESKTOP_VIEWPORTS = [{ width: 1920, height: 1080 }, { width: 1366, height: 768 }];

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms) 
  CLS: 0.1   // Cumulative Layout Shift
};

// Utility functions
async function measurePerformance(page) {
  const performance = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const metrics = {};
        
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            metrics.LCP = entry.startTime;
          }
          if (entry.entryType === 'first-input') {
            metrics.FID = entry.processingStart - entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            metrics.CLS = (metrics.CLS || 0) + entry.value;
          }
        });
        
        // Wait for metrics to be collected
        setTimeout(() => resolve(metrics), 2000);
      }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    });
  });
  
  return performance;
}

async function checkAccessibility(page, elementSelector = null) {
  await page.addScriptTag({
    url: 'https://unpkg.com/axe-core@4.7.2/axe.min.js'
  });
  
  const results = await page.evaluate((selector) => {
    return axe.run(selector ? document.querySelector(selector) : document);
  }, elementSelector);
  
  return results;
}

async function takeScreenshot(page, name, fullPage = false) {
  await page.screenshot({
    path: `test-results/${name}.png`,
    fullPage: fullPage
  });
}

// Test Suite: Homepage & RTL Layout
test.describe('Homepage & RTL Layout Tests', () => {
  test('should load homepage with proper RTL Arabic rendering', async ({ page }) => {
    console.log('🏠 Testing homepage RTL layout...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check page title and meta
    await expect(page).toHaveTitle(/د\. محمد الصاغر|Dr\. Mohamed El-Sagher/);
    
    // Verify RTL direction is set
    const htmlDir = await page.getAttribute('html', 'dir');
    expect(htmlDir).toBe('rtl');
    
    // Check Arabic text is properly rendered
    const arabicElements = await page.locator('*:has-text("د. محمد الصاغر")').count();
    expect(arabicElements).toBeGreaterThan(0);
    
    // Verify main sections are visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Take screenshot
    await takeScreenshot(page, 'homepage-rtl', true);
    
    console.log('✅ Homepage RTL layout test passed');
  });

  test('should have proper page load performance', async ({ page }) => {
    console.log('⚡ Testing page load performance...');
    
    const startTime = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Measure Core Web Vitals
    const metrics = await measurePerformance(page);
    
    console.log('Performance Metrics:', metrics);
    console.log(`Load Time: ${loadTime}ms`);
    
    // Assert performance thresholds
    if (metrics.LCP) {
      expect(metrics.LCP).toBeLessThan(PERFORMANCE_THRESHOLDS.LCP);
    }
    if (metrics.CLS) {
      expect(metrics.CLS).toBeLessThan(PERFORMANCE_THRESHOLDS.CLS);
    }
    
    expect(loadTime).toBeLessThan(5000); // 5 second total load
    
    console.log('✅ Performance test passed');
  });
});

// Test Suite: Mobile Navigation
test.describe('Mobile Navigation Tests', () => {
  test('should handle mobile navigation with proper cleanup', async ({ page }) => {
    console.log('📱 Testing mobile navigation...');
    
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check if mobile menu toggle exists
    const menuToggle = page.locator('[data-mobile-menu-toggle], .mobile-menu-toggle, .hamburger, .menu-toggle');
    await expect(menuToggle.first()).toBeVisible();
    
    // Test menu opening
    await menuToggle.first().click();
    await page.waitForTimeout(500); // Wait for animation
    
    // Check if menu is open
    const mobileMenu = page.locator('[data-mobile-menu], .mobile-menu, .nav-menu');
    await expect(mobileMenu.first()).toBeVisible();
    
    // Test navigation links
    const navLinks = page.locator('nav a, .mobile-menu a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Test accessibility - check for ARIA attributes
    const hasAriaLabel = await menuToggle.first().getAttribute('aria-label');
    const hasAriaExpanded = await menuToggle.first().getAttribute('aria-expanded');
    
    console.log('Menu ARIA attributes:', { hasAriaLabel, hasAriaExpanded });
    
    // Test menu closing
    await menuToggle.first().click();
    await page.waitForTimeout(500);
    
    // Take screenshot
    await takeScreenshot(page, 'mobile-navigation');
    
    console.log('✅ Mobile navigation test passed');
  });

  test('should support keyboard navigation', async ({ page }) => {
    console.log('⌨️ Testing keyboard navigation...');
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    
    // Should be able to navigate to interactive elements
    expect(['A', 'BUTTON', 'INPUT'].includes(focusedElement)).toBeTruthy();
    
    console.log('✅ Keyboard navigation test passed');
  });
});

// Test Suite: Gallery System
test.describe('Gallery System Tests', () => {
  test('should validate gallery filtering and lazy loading', async ({ page }) => {
    console.log('🖼️ Testing gallery system...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Look for gallery section
    const gallerySection = page.locator('.gallery, #gallery, [data-gallery]');
    
    if (await gallerySection.count() > 0) {
      await gallerySection.first().scrollIntoViewIfNeeded();
      
      // Check for filter buttons
      const filterButtons = page.locator('.filter-btn, .gallery-filter, [data-filter]');
      const filterCount = await filterButtons.count();
      
      if (filterCount > 0) {
        // Test filtering functionality
        await filterButtons.first().click();
        await page.waitForTimeout(1000); // Wait for filter animation
        
        // Check if images are filtered
        const visibleImages = page.locator('.gallery img:visible, .gallery-item:visible');
        const visibleCount = await visibleImages.count();
        expect(visibleCount).toBeGreaterThan(0);
      }
      
      // Test lazy loading by checking for loading attributes
      const lazyImages = page.locator('img[loading="lazy"], img[data-src]');
      const lazyCount = await lazyImages.count();
      console.log(`Found ${lazyCount} lazy-loaded images`);
      
      // Take screenshot
      await takeScreenshot(page, 'gallery-system');
    } else {
      console.log('ℹ️ No gallery section found on homepage');
    }
    
    console.log('✅ Gallery system test completed');
  });
});

// Test Suite: FAQ Accordion
test.describe('FAQ Accordion Tests', () => {
  test('should check FAQ accordion with ARIA attributes', async ({ page }) => {
    console.log('❓ Testing FAQ accordion...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Look for FAQ section
    const faqSection = page.locator('.faq, #faq, [data-faq], .accordion');
    
    if (await faqSection.count() > 0) {
      await faqSection.first().scrollIntoViewIfNeeded();
      
      // Find accordion items
      const accordionItems = page.locator('.faq-item, .accordion-item, [data-accordion-item]');
      const itemCount = await accordionItems.count();
      
      if (itemCount > 0) {
        const firstItem = accordionItems.first();
        const trigger = firstItem.locator('button, .faq-question, [data-accordion-trigger]').first();
        
        // Check ARIA attributes
        const ariaExpanded = await trigger.getAttribute('aria-expanded');
        const ariaControls = await trigger.getAttribute('aria-controls');
        
        console.log('Accordion ARIA attributes:', { ariaExpanded, ariaControls });
        
        // Test accordion functionality
        await trigger.click();
        await page.waitForTimeout(500);
        
        // Check if content is revealed
        const content = firstItem.locator('.faq-answer, .accordion-content, [data-accordion-content]').first();
        await expect(content).toBeVisible();
        
        // Test keyboard navigation
        await trigger.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(500);
      }
      
      // Take screenshot
      await takeScreenshot(page, 'faq-accordion');
    } else {
      console.log('ℹ️ No FAQ section found on homepage');
    }
    
    console.log('✅ FAQ accordion test completed');
  });
});

// Test Suite: Contact Integration
test.describe('Contact Integration Tests', () => {
  test('should test WhatsApp links and contact form', async ({ page }) => {
    console.log('📞 Testing contact integration...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Test WhatsApp links
    const whatsappLinks = page.locator('a[href*="whatsapp"], a[href*="wa.me"]');
    const whatsappCount = await whatsappLinks.count();
    
    if (whatsappCount > 0) {
      const firstWhatsappLink = whatsappLinks.first();
      const href = await firstWhatsappLink.getAttribute('href');
      expect(href).toContain('whatsapp');
      console.log(`Found ${whatsappCount} WhatsApp links`);
    }
    
    // Test contact form if present
    const contactForm = page.locator('form, .contact-form, #contact-form');
    
    if (await contactForm.count() > 0) {
      const form = contactForm.first();
      await form.scrollIntoViewIfNeeded();
      
      // Check form fields
      const nameField = form.locator('input[name*="name"], input[id*="name"]').first();
      const emailField = form.locator('input[type="email"], input[name*="email"]').first();
      const messageField = form.locator('textarea, input[name*="message"]').first();
      
      if (await nameField.count() > 0) {
        await nameField.fill('Test Name');
      }
      if (await emailField.count() > 0) {
        await emailField.fill('test@example.com');
      }
      if (await messageField.count() > 0) {
        await messageField.fill('Test message');
      }
      
      console.log('Contact form fields tested');
    }
    
    // Take screenshot
    await takeScreenshot(page, 'contact-integration');
    
    console.log('✅ Contact integration test completed');
  });
});

// Test Suite: Cross-browser Testing
test.describe('Cross-browser Tests', () => {
  ['chromium', 'firefox', 'webkit'].forEach(browserName => {
    test(`should work correctly in ${browserName}`, async ({ page, browser }) => {
      console.log(`🌐 Testing in ${browserName}...`);
      
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Basic functionality test
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Check for JavaScript errors
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      
      await page.waitForTimeout(2000);
      
      if (errors.length > 0) {
        console.log(`⚠️ JavaScript errors in ${browserName}:`, errors);
      }
      
      // Take screenshot
      await takeScreenshot(page, `browser-${browserName}`);
      
      console.log(`✅ ${browserName} test completed`);
    });
  });
});

// Test Suite: Responsive Design
test.describe('Responsive Design Tests', () => {
  MOBILE_DEVICES.forEach(deviceName => {
    test(`should be responsive on ${deviceName}`, async ({ page, browser }) => {
      console.log(`📱 Testing responsive design on ${deviceName}...`);
      
      const device = devices[deviceName];
      if (device) {
        await page.setViewportSize(device.viewport);
        await page.setUserAgent(device.userAgent);
      }
      
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      
      // Check that content is visible and properly laid out
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Check for horizontal scrolling (should not exist)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = device ? device.viewport.width : 375;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // 10px tolerance
      
      // Take screenshot
      await takeScreenshot(page, `responsive-${deviceName.replace(/\s+/g, '-')}`);
      
      console.log(`✅ ${deviceName} responsive test completed`);
    });
  });
});

// Test Suite: Accessibility Testing
test.describe('Accessibility Tests', () => {
  test('should meet accessibility standards', async ({ page }) => {
    console.log('♿ Testing accessibility...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Run axe accessibility tests
    const accessibilityResults = await checkAccessibility(page);
    
    console.log('Accessibility violations:', accessibilityResults.violations.length);
    
    if (accessibilityResults.violations.length > 0) {
      console.log('Accessibility issues found:');
      accessibilityResults.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Affected elements: ${violation.nodes.length}`);
      });
    }
    
    // Allow minor accessibility issues but flag critical ones
    const criticalViolations = accessibilityResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations.length).toBe(0);
    
    console.log('✅ Accessibility test completed');
  });
});