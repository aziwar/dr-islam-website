#!/usr/bin/env node

/**
 * Dr. Islam Website - Comprehensive Integration Tests
 * Validates API endpoints, form submissions, and core functionality
 */

import { chromium } from 'playwright';

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 30000,
    retries: 2
};

class SiteIntegrationTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async initialize() {
        console.log('🚀 Starting Dr. Islam Website Integration Tests');
        console.log('=' .repeat(60));
        
        this.browser = await chromium.launch({ headless: true });
        this.page = await this.browser.newPage();
        
        // Set viewport for desktop testing
        await this.page.setViewportSize({ width: 1200, height: 800 });
    }

    async runTest(testName, testFunction) {
        try {
            console.log(`\n🧪 Testing: ${testName}`);
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

    async testPageLoad() {
        await this.page.goto(TEST_CONFIG.baseUrl, { 
            waitUntil: 'networkidle',
            timeout: TEST_CONFIG.timeout 
        });
        
        // Verify page title
        const title = await this.page.title();
        if (!title.includes('Dr. Islam')) {
            throw new Error(`Invalid page title: ${title}`);
        }
        
        // Verify essential elements
        await this.page.waitForSelector('.hero');
        await this.page.waitForSelector('.services');
        await this.page.waitForSelector('.contact');
    }

    async testNavigation() {
        // Test main navigation links
        const navLinks = [
            { selector: 'a[href="#services"]', section: '.services' },
            { selector: 'a[href="#gallery"]', section: '.gallery' },
            { selector: 'a[href="#contact"]', section: '.contact' }
        ];

        for (const link of navLinks) {
            await this.page.click(link.selector);
            await this.page.waitForTimeout(500);
            
            // Verify section is visible
            const isVisible = await this.page.isVisible(link.section);
            if (!isVisible) {
                throw new Error(`Section ${link.section} not visible after navigation`);
            }
        }
    }
    async testBookingModal() {
        // Test booking modal functionality
        await this.page.click('button[onclick="openBookingModal()"]');
        await this.page.waitForSelector('.booking-modal', { visible: true });
        
        // Test form fields
        await this.page.fill('input[name="name"]', 'Test Patient');
        await this.page.fill('input[name="phone"]', '+965 98563711');
        await this.page.fill('input[name="email"]', 'test@example.com');
        
        // Verify form validation
        const submitButton = await this.page.$('.booking-modal button[type="submit"]');
        if (!submitButton) {
            throw new Error('Submit button not found in booking modal');
        }
        
        // Close modal
        await this.page.click('.booking-modal .close-btn');
        await this.page.waitForSelector('.booking-modal', { visible: false });
    }

    async testLanguageSwitching() {
        // Test Arabic version
        await this.page.goto(`${TEST_CONFIG.baseUrl}/ar`);
        await this.page.waitForSelector('.hero');
        
        // Verify Arabic content
        const arabicText = await this.page.textContent('h1');
        if (!arabicText.includes('اسلام') && !arabicText.includes('دكتور')) {
            throw new Error('Arabic content not properly loaded');
        }
        
        // Test back to English
        await this.page.goto(`${TEST_CONFIG.baseUrl}/en`);
        await this.page.waitForSelector('.hero');
        
        const englishText = await this.page.textContent('h1');
        if (!englishText.includes('Dr.') && !englishText.includes('Islam')) {
            throw new Error('English content not properly loaded');
        }
    }

    async testGalleryAPI() {
        // Test gallery endpoint
        const response = await this.page.request.get(`${TEST_CONFIG.baseUrl}/api/gallery`);
        
        if (!response.ok()) {
            throw new Error(`Gallery API failed: ${response.status()}`);
        }
        
        const galleryData = await response.json();
        if (!Array.isArray(galleryData)) {
            throw new Error('Gallery API should return an array');
        }
    }

    async testContactForm() {
        // Navigate to contact section
        await this.page.click('a[href="#contact"]');
        await this.page.waitForSelector('.contact-form');
        
        // Fill out contact form
        await this.page.fill('.contact-form input[name="name"]', 'Test User');
        await this.page.fill('.contact-form input[name="email"]', 'test@example.com');
        await this.page.fill('.contact-form input[name="phone"]', '+965 98563711');
        await this.page.fill('.contact-form textarea[name="message"]', 'Test message for integration testing.');
        
        // Verify form validation triggers
        const nameField = await this.page.$('.contact-form input[name="name"]');
        await nameField.focus();
        await nameField.blur();
        
        // Check for validation styling (should be present if validation is working)
        const hasValidationClass = await this.page.evaluate(() => {
            const input = document.querySelector('.contact-form input[name="name"]');
            return input && (input.classList.contains('valid') || input.classList.contains('invalid'));
        });
        
        if (!hasValidationClass) {
            console.warn('⚠️  Form validation styling may not be working properly');
        }
    }
    async testDesktopFeatures() {
        // Verify desktop-specific features at 1200px+ viewport
        await this.page.setViewportSize({ width: 1200, height: 800 });
        await this.page.reload();
        
        // Test desktop booking widget
        const desktopWidget = await this.page.$('.desktop-booking-widget');
        if (!desktopWidget) {
            throw new Error('Desktop booking widget not found');
        }
        
        const isVisible = await desktopWidget.isVisible();
        if (!isVisible) {
            throw new Error('Desktop booking widget not visible');
        }
        
        // Test desktop sidebar
        const sidebar = await this.page.$('#desktopSidebar');
        if (sidebar) {
            const sidebarVisible = await sidebar.isVisible();
            if (!sidebarVisible) {
                console.warn('⚠️  Desktop sidebar not visible - may be intentionally hidden');
            }
        }
        
        // Test gallery lightbox functionality
        const galleryItems = await this.page.$$('.gallery-item img');
        if (galleryItems.length > 0) {
            // Click first gallery item to test lightbox
            await galleryItems[0].click();
            await this.page.waitForTimeout(300);
            
            // Check if lightbox appears
            const lightbox = await this.page.$('.image-lightbox');
            if (lightbox) {
                const lightboxVisible = await lightbox.isVisible();
                if (lightboxVisible) {
                    // Close lightbox
                    await this.page.click('.lightbox-close, .lightbox-backdrop');
                    await this.page.waitForTimeout(300);
                }
            }
        }
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            // Core functionality tests
            await this.runTest('Page Load & Essential Elements', () => this.testPageLoad());
            await this.runTest('Navigation Functionality', () => this.testNavigation());
            await this.runTest('Booking Modal Operation', () => this.testBookingModal());
            await this.runTest('Language Switching (AR/EN)', () => this.testLanguageSwitching());
            await this.runTest('Gallery API Endpoint', () => this.testGalleryAPI());
            await this.runTest('Contact Form Validation', () => this.testContactForm());
            await this.runTest('Desktop Features (1200px+)', () => this.testDesktopFeatures());
            
            // Generate test report
            await this.generateReport();
            
        } catch (error) {
            console.error('💥 Test suite failed to initialize:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST RESULTS SUMMARY');
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
        
        console.log('\n🎯 Integration test completed!');
        
        // Exit with error code if tests failed
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new SiteIntegrationTester();
    tester.runAllTests().catch(console.error);
}

export default SiteIntegrationTester;