#!/usr/bin/env node

/**
 * Dr. Islam Website - Mobile-Specific Integration Tests
 * Tests mobile interactions, touch events, and responsive behavior
 */

import { chromium } from 'playwright';

const MOBILE_DEVICES = [
    { name: 'iPhone 12', viewport: { width: 390, height: 844 } },
    { name: 'Samsung Galaxy S21', viewport: { width: 384, height: 854 } },
    { name: 'iPad', viewport: { width: 768, height: 1024 } }
];

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 30000
};

class MobileIntegrationTester {
    constructor() {
        this.browser = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async initialize() {
        console.log('📱 Starting Mobile-Specific Integration Tests');
        console.log('=' .repeat(60));
        
        this.browser = await chromium.launch({ headless: true });
    }

    async runTest(testName, testFunction) {
        try {
            console.log(`\n📱 Testing: ${testName}`);
            await testFunction();
            this.results.passed++;
            this.results.tests.push({ name: testName, status: 'PASS' });
            console.log(`✅ PASS: ${testName}`);
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({ 
                name: testName, 
                status: 'FAIL', 
                error: error.message 
            });
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Error: ${error.message}`);
        }
    }

    async testMobileMenuFunctionality() {
        for (const device of MOBILE_DEVICES) {
            const page = await this.browser.newPage();
            await page.setViewportSize(device.viewport);
            
            try {
                await page.goto(TEST_CONFIG.baseUrl);
                await page.waitForSelector('.mobile-menu-toggle', { visible: true });
                
                // Test mobile menu toggle
                await page.click('.mobile-menu-toggle');
                await page.waitForTimeout(500);
                
                // Verify menu is visible
                const mobileNav = await page.$('.mobile-nav');
                if (!mobileNav) {
                    throw new Error(`Mobile navigation not found on ${device.name}`);
                }
                
                const isVisible = await mobileNav.isVisible();
                if (!isVisible) {
                    throw new Error(`Mobile menu not visible on ${device.name}`);
                }
                
                // Test menu close
                await page.click('.mobile-menu-toggle');
                await page.waitForTimeout(500);
                
            } finally {
                await page.close();
            }
        }
    }
    async testTouchInteractions() {
        const page = await this.browser.newPage();
        await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            // Test FAQ touch interactions
            const faqItems = await page.$$('.faq-item h3');
            if (faqItems.length > 0) {
                // Tap first FAQ item
                await faqItems[0].tap();
                await page.waitForTimeout(300);
                
                // Verify content expansion
                const faqContent = await page.$('.faq-item .faq-content');
                if (faqContent) {
                    const isVisible = await faqContent.isVisible();
                    if (!isVisible) {
                        throw new Error('FAQ content not expanded on tap');
                    }
                }
                
                // Test touch-outside-to-close (if implemented)
                await page.tap('body', { position: { x: 100, y: 100 } });
                await page.waitForTimeout(300);
            }
            
            // Test gallery swipe if gallery exists
            const galleryItems = await page.$$('.gallery-item');
            if (galleryItems.length > 1) {
                const firstItem = galleryItems[0];
                const box = await firstItem.boundingBox();
                
                if (box) {
                    // Simulate swipe gesture
                    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                    await page.mouse.down();
                    await page.mouse.move(box.x - 100, box.y + box.height / 2);
                    await page.mouse.up();
                    await page.waitForTimeout(500);
                }
            }
            
        } finally {
            await page.close();
        }
    }

    async testMobileFormUsability() {
        const page = await this.browser.newPage();
        await page.setViewportSize({ width: 390, height: 844 });
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            // Test booking modal on mobile
            const bookingButton = await page.$('button[onclick="openBookingModal()"]');
            if (bookingButton) {
                await bookingButton.tap();
                await page.waitForSelector('.booking-modal', { visible: true });
                
                // Test form field accessibility on mobile
                const nameInput = await page.$('.booking-modal input[name="name"]');
                if (nameInput) {
                    await nameInput.tap();
                    await nameInput.fill('Mobile Test User');
                    
                    // Verify virtual keyboard doesn't break layout
                    const modal = await page.$('.booking-modal');
                    const isStillVisible = await modal.isVisible();
                    if (!isStillVisible) {
                        throw new Error('Modal disappeared when virtual keyboard appeared');
                    }
                }
                
                // Close modal
                const closeBtn = await page.$('.booking-modal .close-btn');
                if (closeBtn) {
                    await closeBtn.tap();
                }
            }
            
        } finally {
            await page.close();
        }
    }

    async testResponsiveBreakpoints() {
        const breakpoints = [
            { name: 'Mobile Small', width: 320, height: 568 },
            { name: 'Mobile Large', width: 414, height: 896 },
            { name: 'Tablet Portrait', width: 768, height: 1024 },
            { name: 'Tablet Landscape', width: 1024, height: 768 }
        ];
        
        for (const breakpoint of breakpoints) {
            const page = await this.browser.newPage();
            await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
            
            try {
                await page.goto(TEST_CONFIG.baseUrl);
                await page.waitForSelector('.hero');
                
                // Check essential elements are visible
                const essentialSelectors = ['.hero', '.services', '.contact'];
                for (const selector of essentialSelectors) {
                    const element = await page.$(selector);
                    if (!element) {
                        throw new Error(`${selector} not found at ${breakpoint.name} (${breakpoint.width}px)`);
                    }
                    
                    const isVisible = await element.isVisible();
                    if (!isVisible) {
                        throw new Error(`${selector} not visible at ${breakpoint.name} (${breakpoint.width}px)`);
                    }
                }
                
                // Test navigation visibility
                if (breakpoint.width < 768) {
                    // Should show mobile menu toggle
                    const mobileToggle = await page.$('.mobile-menu-toggle');
                    if (!mobileToggle || !(await mobileToggle.isVisible())) {
                        throw new Error(`Mobile menu toggle not visible at ${breakpoint.name}`);
                    }
                } else {
                    // Should show desktop navigation
                    const desktopNav = await page.$('.main-nav');
                    if (!desktopNav || !(await desktopNav.isVisible())) {
                        console.warn(`⚠️  Desktop navigation may not be visible at ${breakpoint.name}`);
                    }
                }
                
            } finally {
                await page.close();
            }
        }
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            await this.runTest('Mobile Menu Functionality', () => this.testMobileMenuFunctionality());
            await this.runTest('Touch Interactions', () => this.testTouchInteractions());
            await this.runTest('Mobile Form Usability', () => this.testMobileFormUsability());
            await this.runTest('Responsive Breakpoints', () => this.testResponsiveBreakpoints());
            
            await this.generateReport();
            
        } catch (error) {
            console.error('💥 Mobile test suite failed:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 MOBILE TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📈 Success Rate: ${Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }
        
        console.log('\n📱 Mobile integration test completed!');
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new MobileIntegrationTester();
    tester.runAllTests().catch(console.error);
}

export default MobileIntegrationTester;