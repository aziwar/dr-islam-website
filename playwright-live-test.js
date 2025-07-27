const { chromium } = require('playwright');

async function testDrIslamWebsite() {
  console.log('🎭 Starting Playwright tests for https://dr-elsagher.com\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Enable console logging
  page.on('console', msg => console.log('🌐 Console:', msg.text()));
  page.on('pageerror', error => console.log('❌ Page Error:', error.message));
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };
  
  function logTest(name, status, details = '') {
    const emoji = status === 'PASS' ? '✅' : '❌';
    console.log(`${emoji} ${name}: ${status}`);
    if (details) console.log(`   ${details}`);
    
    results.tests.push({ name, status, details });
    if (status === 'PASS') results.passed++;
    else results.failed++;
  }

  try {
    // Test 1: Homepage Loading and RTL Layout
    console.log('\n📱 Test 1: Homepage Loading and RTL Layout');
    const startTime = Date.now();
    await page.goto('https://dr-elsagher.com');
    const loadTime = Date.now() - startTime;
    
    // Check page title
    const title = await page.title();
    logTest('Page Title', title.includes('اسلام') ? 'PASS' : 'FAIL', `Title: ${title}`);
    
    // Check RTL direction
    const htmlDir = await page.getAttribute('html', 'dir');
    logTest('RTL Direction', htmlDir === 'rtl' ? 'PASS' : 'FAIL', `Direction: ${htmlDir}`);
    
    // Check load time
    logTest('Load Performance', loadTime < 3000 ? 'PASS' : 'FAIL', `Load time: ${loadTime}ms`);
    
    // Test 2: Mobile Navigation
    console.log('\n📱 Test 2: Mobile Navigation');
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu toggle exists
    const menuToggle = await page.locator('.mobile-menu-toggle').count();
    logTest('Mobile Menu Toggle Visible', menuToggle > 0 ? 'PASS' : 'FAIL');
    
    if (menuToggle > 0) {
      // Click to open menu
      await page.click('.mobile-menu-toggle');
      await page.waitForTimeout(500);
      
      // Check if menu opened
      const menuActive = await page.locator('.nav-menu.active').count();
      logTest('Mobile Menu Opens', menuActive > 0 ? 'PASS' : 'FAIL');
      
      // Check ARIA attributes
      const ariaExpanded = await page.getAttribute('.mobile-menu-toggle', 'aria-expanded');
      logTest('ARIA Expanded Attribute', ariaExpanded === 'true' ? 'PASS' : 'FAIL');
      
      // Click menu link to close
      await page.click('.nav-menu a[href="#services"]');
      await page.waitForTimeout(500);
      
      const menuClosed = await page.locator('.nav-menu.active').count();
      logTest('Mobile Menu Closes on Link Click', menuClosed === 0 ? 'PASS' : 'FAIL');
    }

    // Test 3: Gallery Functionality
    console.log('\n🖼️ Test 3: Gallery Functionality');
    await page.setViewportSize({ width: 1024, height: 768 }); // Desktop view
    
    // Navigate to gallery
    await page.click('a[href="#gallery"]');
    await page.waitForTimeout(1000);
    
    // Check gallery filters
    const filterButtons = await page.locator('.filter-btn').count();
    logTest('Gallery Filter Buttons', filterButtons >= 4 ? 'PASS' : 'FAIL', `Found ${filterButtons} filters`);
    
    // Test filter functionality
    if (filterButtons > 0) {
      await page.click('.filter-btn[data-filter="implants"]');
      await page.waitForTimeout(500);
      
      const activeFilter = await page.locator('.filter-btn.active[data-filter="implants"]').count();
      logTest('Gallery Filter Selection', activeFilter > 0 ? 'PASS' : 'FAIL');
    }
    
    // Check gallery items
    const galleryItems = await page.locator('.gallery-item').count();
    logTest('Gallery Items Present', galleryItems > 0 ? 'PASS' : 'FAIL', `Found ${galleryItems} items`);

    // Test 4: FAQ Accordion
    console.log('\n❓ Test 4: FAQ Accordion');
    await page.click('a[href="#faq"]');
    await page.waitForTimeout(1000);
    
    const faqItems = await page.locator('.faq-item').count();
    logTest('FAQ Items Present', faqItems > 0 ? 'PASS' : 'FAIL', `Found ${faqItems} FAQ items`);
    
    if (faqItems > 0) {
      // Test first FAQ
      const firstQuestion = page.locator('.faq-item h3').first();
      await firstQuestion.click();
      await page.waitForTimeout(500);
      
      const faqActive = await page.locator('.faq-item.active').count();
      logTest('FAQ Accordion Toggle', faqActive > 0 ? 'PASS' : 'FAIL');
      
      // Check ARIA attributes
      const ariaExpanded = await firstQuestion.getAttribute('aria-expanded');
      logTest('FAQ ARIA Attributes', ariaExpanded === 'true' ? 'PASS' : 'FAIL');
    }

    // Test 5: Contact and WhatsApp Integration
    console.log('\n📞 Test 5: Contact and WhatsApp Integration');
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(1000);
    
    // Check WhatsApp links
    const whatsappLinks = await page.locator('a[href^="https://wa.me"]').count();
    logTest('WhatsApp Links Present', whatsappLinks > 0 ? 'PASS' : 'FAIL', `Found ${whatsappLinks} WhatsApp links`);
    
    // Check phone number links
    const phoneLinks = await page.locator('a[href^="tel:"]').count();
    logTest('Phone Links Present', phoneLinks > 0 ? 'PASS' : 'FAIL', `Found ${phoneLinks} phone links`);
    
    // Check sticky booking button
    const stickyButton = await page.locator('.sticky-book').count();
    logTest('Sticky Booking Button', stickyButton > 0 ? 'PASS' : 'FAIL');

    // Test 6: Arabic Content Quality
    console.log('\n🔤 Test 6: Arabic Content Quality');
    await page.goto('https://dr-elsagher.com/ar/');
    await page.waitForTimeout(1000);
    
    // Check Arabic text in hero section
    const heroText = await page.locator('.hero h1').textContent();
    logTest('Arabic Hero Text', heroText.includes('اسلام') ? 'PASS' : 'FAIL');
    
    // Check services in Arabic
    const arabicServices = await page.locator('.service-card h3').first().textContent();
    logTest('Arabic Services Text', arabicServices.includes('زراعة') ? 'PASS' : 'FAIL');

    // Test 7: Performance Metrics
    console.log('\n⚡ Test 7: Performance Metrics');
    
    // Reload page and measure performance
    const perfStart = Date.now();
    await page.goto('https://dr-elsagher.com', { waitUntil: 'networkidle' });
    const perfEnd = Date.now() - perfStart;
    
    logTest('Network Idle Performance', perfEnd < 5000 ? 'PASS' : 'FAIL', `${perfEnd}ms to network idle`);
    
    // Check for lazy loading images
    const lazyImages = await page.locator('img[loading="lazy"]').count();
    logTest('Lazy Loading Images', lazyImages > 0 ? 'PASS' : 'FAIL', `Found ${lazyImages} lazy images`);
    
    // Check for service worker
    const swScript = await page.locator('script').evaluateAll(scripts => 
      scripts.some(script => script.textContent && script.textContent.includes('serviceWorker'))
    );
    logTest('Service Worker Registration', swScript ? 'PASS' : 'FAIL');

    // Test 8: Responsive Design
    console.log('\n📱 Test 8: Responsive Design Testing');
    
    const viewports = [
      { width: 320, height: 568, name: 'iPhone SE' },
      { width: 375, height: 667, name: 'iPhone 6/7/8' },
      { width: 768, height: 1024, name: 'iPad' },
      { width: 1920, height: 1080, name: 'Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Check if hero section is visible
      const heroVisible = await page.locator('.hero').isVisible();
      logTest(`${viewport.name} Hero Visibility`, heroVisible ? 'PASS' : 'FAIL');
      
      // Check if services section is visible
      const servicesVisible = await page.locator('#services').isVisible();
      logTest(`${viewport.name} Services Visibility`, servicesVisible ? 'PASS' : 'FAIL');
    }

  } catch (error) {
    console.log('❌ Test Suite Error:', error.message);
    results.failed++;
  }

  await browser.close();
  
  // Final Results
  console.log('\n' + '='.repeat(50));
  console.log('🎭 PLAYWRIGHT TEST RESULTS');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${results.tests.length}`);
  console.log(`🏆 Success Rate: ${Math.round((results.passed / results.tests.length) * 100)}%`);
  
  if (results.failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.tests.filter(t => t.status === 'FAIL').forEach(test => {
      console.log(`   • ${test.name}: ${test.details}`);
    });
  }
  
  console.log('\n🎯 Test completed successfully!');
}

// Run the tests
testDrIslamWebsite().catch(console.error);