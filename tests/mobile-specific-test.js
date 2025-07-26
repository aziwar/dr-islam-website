// Mobile-Specific Test Suite for dr-elsagher.com
const { chromium, devices } = require('playwright');

async function testMobileSpecific() {
    console.log('📱 Starting Mobile-Specific Tests...');
    
    const browser = await chromium.launch({ headless: true });
    
    const testDevices = [
        { name: 'iPhone 12', device: devices['iPhone 12'] },
        { name: 'iPhone 12 Pro', device: devices['iPhone 12 Pro'] },
        { name: 'Galaxy S9+', device: devices['Galaxy S9+'] },
        { name: 'iPad', device: devices['iPad'] }
    ];
    
    const results = {
        deviceTests: [],
        overallPassed: 0,
        overallFailed: 0,
        timestamp: new Date().toISOString()
    };
    
    for (const testDevice of testDevices) {
        console.log(`\n🔧 Testing on ${testDevice.name}...`);
        
        const context = await browser.newContext({
            ...testDevice.device,
            locale: 'en-US'
        });
        
        const page = await context.newPage();
        
        const deviceResult = {
            device: testDevice.name,
            tests: [],
            passed: 0,
            failed: 0
        };
        
        const addTest = (name, passed, details = '') => {
            deviceResult.tests.push({ name, passed, details });
            if (passed) {
                deviceResult.passed++;
                results.overallPassed++;
            } else {
                deviceResult.failed++;
                results.overallFailed++;
            }
            console.log(`  ${passed ? '✅' : '❌'} ${name}${details ? ': ' + details : ''}`);
        };
        
        try {
            // Load page
            await page.goto('https://dr-elsagher.com', { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
            });
            
            // Test viewport dimensions
            const viewport = page.viewportSize();
            addTest('Viewport configured', viewport !== null, 
                `${viewport.width}x${viewport.height}`);
            
            // Test mobile menu visibility and functionality
            await page.waitForTimeout(1000);
            
            // Check if mobile menu toggle is visible
            const toggleVisible = await page.isVisible('.mobile-menu-toggle');
            addTest('Mobile menu toggle visible', toggleVisible);
            
            if (toggleVisible) {
                // Test menu interaction
                const menuBeforeClick = await page.$('#mobileMenu.active');
                addTest('Menu initially closed', menuBeforeClick === null);
                
                // Click the toggle
                await page.click('.mobile-menu-toggle');
                await page.waitForTimeout(300);
                
                // Check if menu opened
                const menuAfterClick = await page.$('#mobileMenu.active');
                const toggleAfterClick = await page.$('.mobile-menu-toggle.active');
                
                addTest('Menu opens on click', menuAfterClick !== null);
                addTest('Toggle shows active state', toggleAfterClick !== null);
                
                // Test navigation links
                const navLinks = await page.$$('#mobileMenu a');
                addTest('Navigation links present', navLinks.length >= 5,
                    `Found ${navLinks.length} links`);
                
                // Test link accessibility
                for (let i = 0; i < Math.min(navLinks.length, 3); i++) {
                    const href = await navLinks[i].getAttribute('href');
                    addTest(`Link ${i+1} has valid href`, 
                        href && href.length > 0, `href="${href}"`);
                }
                
                // Test clicking outside closes menu
                await page.click('body', { position: { x: 50, y: 50 } });
                await page.waitForTimeout(300);
                
                const menuAfterOutsideClick = await page.$('#mobileMenu.active');
                addTest('Menu closes on outside click', menuAfterOutsideClick === null);
            }
            
            // Test responsive images
            const logoImg = await page.$('.logo img');
            if (logoImg) {
                const logoLoaded = await page.evaluate((img) => img.complete && img.naturalHeight !== 0, logoImg);
                addTest('Logo image loads correctly', logoLoaded);
            }
            
            // Test text readability (font size)
            const bodyFontSize = await page.evaluate(() => {
                return parseFloat(window.getComputedStyle(document.body).fontSize);
            });
            addTest('Text readable on mobile', bodyFontSize >= 14, 
                `Font size: ${bodyFontSize}px`);
            
            // Test touch targets
            const buttons = await page.$$('button, a');
            let touchTargetsPassed = 0;
            for (const button of buttons.slice(0, 5)) { // Test first 5 buttons
                const box = await button.boundingBox();
                if (box && (box.width >= 44 && box.height >= 44)) {
                    touchTargetsPassed++;
                }
            }
            addTest('Touch targets adequate size', 
                touchTargetsPassed >= Math.min(buttons.length, 3),
                `${touchTargetsPassed} of ${Math.min(buttons.length, 5)} tested`);
                
        } catch (error) {
            addTest('Device test execution', false, `Error: ${error.message}`);
        }
        
        await context.close();
        results.deviceTests.push(deviceResult);
    }
    
    await browser.close();
    
    // Results summary
    console.log('\n📊 MOBILE TEST RESULTS SUMMARY');
    console.log('=' .repeat(60));
    console.log(`✅ Total Passed: ${results.overallPassed}`);
    console.log(`❌ Total Failed: ${results.overallFailed}`);
    console.log(`📈 Success Rate: ${((results.overallPassed / (results.overallPassed + results.overallFailed)) * 100).toFixed(1)}%`);
    
    console.log('\n📱 Device-by-Device Results:');
    results.deviceTests.forEach(device => {
        console.log(`${device.device}: ${device.passed}✅ ${device.failed}❌`);
    });
    
    // Save results
    require('fs').writeFileSync(
        'mobile-test-results.json', 
        JSON.stringify(results, null, 2)
    );
    
    return results.overallFailed === 0;
}

// Run tests if called directly
if (require.main === module) {
    testMobileSpecific().catch(console.error);
}

module.exports = { testMobileSpecific };
