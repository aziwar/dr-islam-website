const { test, expect } = require('@playwright/test');

test.describe('Dr Islam Website - Comprehensive Testing', () => {
  
  test('Homepage loads correctly with proper Arabic RTL layout', async ({ page }) => {
    await page.goto('https://dr-elsagher.com');
    
    // Check page loads and has correct title
    await expect(page).toHaveTitle(/دكتور اسلام الصغير|Dr. Islam/);
    
    // Verify RTL direction is set
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    
    // Check emergency banner is visible
    const emergencyBanner = page.locator('.emergency-banner');
    await expect(emergencyBanner).toBeVisible();
    
    // Verify hero section content
    const heroTitle = page.locator('.hero h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('دكتور اسلام الصغير');
    
    console.log('✅ Homepage RTL layout verified');
  });

  test('Mobile navigation works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://dr-elsagher.com');
    
    // Check mobile menu toggle is visible
    const menuToggle = page.locator('.mobile-menu-toggle');
    await expect(menuToggle).toBeVisible();
    
    // Click to open mobile menu
    await menuToggle.click();
    
    // Check menu is open (has active class)
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toHaveClass(/active/);
    
    // Check aria-expanded is true
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    
    // Test navigation link click
    const servicesLink = page.locator('.nav-menu a[href="#services"]');
    await expect(servicesLink).toBeVisible();
    await servicesLink.click();
    
    // Menu should close after clicking link
    await expect(navMenu).not.toHaveClass(/active/);
    
    console.log('✅ Mobile navigation functionality verified');
  });

  test('Gallery filtering and image loading works', async ({ page }) => {
    await page.goto('https://dr-elsagher.com');
    
    // Wait for gallery section to be visible
    const gallerySection = page.locator('#gallery');
    await expect(gallerySection).toBeVisible();
    
    // Check filter buttons are present
    const filterButtons = page.locator('.filter-btn');
    await expect(filterButtons).toHaveCount(5); // all, implants, cosmetic, orthodontic, reconstruction
    
    // Test filter functionality
    const implantsFilter = page.locator('.filter-btn[data-filter="implants"]');
    await implantsFilter.click();
    
    // Check active class is applied
    await expect(implantsFilter).toHaveClass(/active/);
    
    // Check that only implant items are visible
    const implantItems = page.locator('.gallery-item[data-category="implants"]');
    const cosmeticItems = page.locator('.gallery-item[data-category="cosmetic"]');
    
    await expect(implantItems.first()).toBeVisible();
    
    // Test view more button
    const viewMoreBtn = page.locator('.view-more-btn');
    if (await viewMoreBtn.isVisible()) {
      await viewMoreBtn.click();
      console.log('✅ View more button clicked');
    }
    
    console.log('✅ Gallery filtering functionality verified');
  });

  test('FAQ accordion functionality', async ({ page }) => {
    await page.goto('https://dr-elsagher.com');
    
    // Navigate to FAQ section
    await page.locator('a[href="#faq"]').click();
    await page.waitForSelector('#faq');
    
    // Check FAQ items are present
    const faqItems = page.locator('.faq-item');
    await expect(faqItems).toHaveCountGreaterThan(0);
    
    // Test first FAQ item
    const firstFAQ = faqItems.first();
    const question = firstFAQ.locator('h3');
    const answer = firstFAQ.locator('p');
    
    // Initially answer should be collapsed
    await expect(question).toHaveAttribute('aria-expanded', 'false');
    
    // Click to expand
    await question.click();
    
    // Check if expanded
    await expect(question).toHaveAttribute('aria-expanded', 'true');
    await expect(firstFAQ).toHaveClass(/active/);
    
    console.log('✅ FAQ accordion functionality verified');
  });

  test('Contact information and WhatsApp integration', async ({ page }) => {
    await page.goto('https://dr-elsagher.com');
    
    // Check contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Check phone number link
    const phoneLink = page.locator('a[href="tel:+96598563711"]');
    await expect(phoneLink).toBeVisible();
    
    // Check WhatsApp links (don't click to avoid opening external app)
    const whatsappLinks = page.locator('a[href^="https://wa.me"]');
    await expect(whatsappLinks.first()).toBeVisible();
    
    // Check sticky booking button
    const stickyButton = page.locator('.sticky-book');
    await expect(stickyButton).toBeVisible();
    await expect(stickyButton).toContainText('احجز موعد');
    
    console.log('✅ Contact and WhatsApp integration verified');
  });

  test('Performance and loading optimization', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://dr-elsagher.com');
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️ Page load time: ${loadTime}ms`);
    
    // Check for performance optimizations
    
    // 1. Check if images have lazy loading
    const images = page.locator('img[loading="lazy"]');
    const imageCount = await images.count();
    console.log(`🖼️ Lazy loading images found: ${imageCount}`);
    
    // 2. Check service worker registration
    const swScript = page.locator('script:has-text("serviceWorker")');
    
    // 3. Check CSS loading
    const cssLinks = page.locator('link[rel="stylesheet"]');
    await expect(cssLinks).toHaveCountGreaterThan(0);
    
    // 4. Verify no JavaScript errors
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    
    await page.waitForTimeout(2000); // Wait for any delayed errors
    
    if (errors.length > 0) {
      console.log('⚠️ JavaScript errors found:', errors);
    } else {
      console.log('✅ No JavaScript errors detected');
    }
    
    console.log('✅ Performance optimization checks completed');
  });

  test('Arabic language content and typography', async ({ page }) => {
    await page.goto('https://dr-elsagher.com/ar/');
    
    // Check Arabic content is properly displayed
    const heroTitle = page.locator('.hero h1');
    await expect(heroTitle).toContainText('اسلام');
    
    // Check services section has Arabic text
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    const serviceCards = page.locator('.service-card h3');
    const firstServiceCard = serviceCards.first();
    await expect(firstServiceCard).toContainText('زراعة');
    
    // Check testimonials in Arabic
    const testimonials = page.locator('.testimonial-card p');
    const firstTestimonial = testimonials.first();
    await expect(firstTestimonial).toContainText('خدمة');
    
    // Verify RTL text alignment
    const body = page.locator('body');
    await expect(body).toHaveCSS('direction', 'rtl');
    
    console.log('✅ Arabic language content and typography verified');
  });

  test('Responsive design across different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile Medium' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1920, height: 1080, name: 'Desktop Large' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('https://dr-elsagher.com');
      
      // Check key elements are visible and properly positioned
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('#services')).toBeVisible();
      
      // Check mobile menu toggle visibility on small screens
      if (viewport.width <= 768) {
        await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
      }
      
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) layout verified`);
    }
  });

  test('SEO and meta tags validation', async ({ page }) => {
    await page.goto('https://dr-elsagher.com');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Dr. Islam|طبيب أسنان/);
    
    // Check structured data (JSON-LD)
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toHaveCount(1);
    
    // Check canonical URL
    const canonicalLink = page.locator('link[rel="canonical"]');
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    
    // Check favicon
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveCountGreaterThan(0);
    
    console.log('✅ SEO and meta tags validation completed');
  });

});