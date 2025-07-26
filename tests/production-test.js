// Production Test Suite for dr-elsagher.com
const { chromium } = require('playwright');

async function testProduction() {
    console.log('🚀 Starting Production Tests for dr-elsagher.com...');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const results = {
        tests: [],
        passed: 0,
        failed: 0,
        timestamp: new Date().toISOString()
    };
    
    // Test function helper
    const addTest = (name, passed, details = '') => {
        results.tests.push({ name, passed, details });
        if (passed) results.passed++;
        else results.failed++;
        console.log(`${passed ? '✅' : '❌'} ${name}${details ? ': ' + details : ''}`);
    };
    
    try {
        // Test 1: Homepage loads successfully
        console.log('\n📋 Testing Homepage Load...');
        const response = await page.goto('https://dr-elsagher.com', { 
            waitUntil: 'domcontentloaded',
            timeout: 30000 
        });
        
        addTest('Homepage loads', response.status() === 200, `Status: ${response.status()}`);
        
        // Test 2: Page title is correct
        const title = await page.title();
        addTest('Page title correct', 
            title.includes('Dr. Islam Elsagher'), 
            `Got: "${title}"`);
        
        // Test 3: Mobile menu button exists
        console.log('\n📱 Testing Mobile Navigation...');
        const mobileToggle = await page.$('.mobile-menu-toggle');
        addTest('Mobile menu button exists', mobileToggle !== null);
        
        if (mobileToggle) {
            // Test 4: Set mobile viewport
            await page.setViewportSize({ width: 375, height: 667 });
            await page.waitForTimeout(1000);
            
            // Test 5: Mobile menu button is visible in mobile view
            const toggleVisible = await page.isVisible('.mobile-menu-toggle');
            addTest('Mobile toggle visible on mobile', toggleVisible);
            
            if (toggleVisible) {
                // Test 6: Mobile menu functionality
                await page.click('.mobile-menu-toggle');
                await page.waitForTimeout(500);
                
                const menuActive = await page.$('.mobile-menu-toggle.active');
                addTest('Mobile menu toggles active state', menuActive !== null);
                
                // Test 7: Mobile menu items are accessible
                const menuItems = await page.$$('#mobileMenu li a');
                addTest('Mobile menu has navigation items', 
                    menuItems.length >= 5, 
                    `Found ${menuItems.length} items`);
            }
        }
        
        // Test 8: Desktop view
        console.log('\n🖥️  Testing Desktop View...');
        await page.setViewportSize({ width: 1200, height: 800 });
        await page.waitForTimeout(1000);
        
        const desktopToggleHidden = await page.isHidden('.mobile-menu-toggle');
        addTest('Mobile toggle hidden on desktop', desktopToggleHidden);
        
        // Test 9: Essential content exists
        console.log('\n📄 Testing Content...');
        const logoExists = await page.$('.logo img') !== null;
        addTest('Logo image exists', logoExists);
        
        const servicesSection = await page.$('#services') !== null;
        addTest('Services section exists', servicesSection);
        
        const contactSection = await page.$('#contact') !== null;
        addTest('Contact section exists', contactSection);
        
        // Test 10: Performance check
        console.log('\n⚡ Testing Performance...');
        const navigationStart = await page.evaluate(() => performance.timing.navigationStart);
        const loadComplete = await page.evaluate(() => performance.timing.loadEventEnd);
        const loadTime = loadComplete - navigationStart;
        
        addTest('Page loads within 5 seconds', 
            loadTime < 5000, 
            `Load time: ${loadTime}ms`);
        
    } catch (error) {
        addTest('Test execution', false, `Error: ${error.message}`);
    } finally {
        await browser.close();
    }
    
    // Results summary
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('=' .repeat(50));
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
    console.log(`🕐 Completed: ${results.timestamp}`);
    
    if (results.failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Website is fully functional.');
    } else {
        console.log('\n⚠️  Some tests failed. Review details above.');
    }
    
    // Save results
    require('fs').writeFileSync(
        'production-test-results.json', 
        JSON.stringify(results, null, 2)
    );
    
    return results.failed === 0;
}

// Run tests if called directly
if (require.main === module) {
    testProduction().catch(console.error);
}

module.exports = { testProduction };
