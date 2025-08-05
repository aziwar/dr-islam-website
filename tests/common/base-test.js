/**
 * Base Test Class
 * Shared utilities and patterns for all test files
 * Provides consistent testing framework and reporting
 */

import { chromium } from 'playwright';

export const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 15000,
    viewports: {
        mobile: { width: 375, height: 667 },
        tablet: { width: 768, height: 1024 },
        desktop: { width: 1200, height: 800 }
    }
};

export class BaseTest {
    constructor(testSuiteName) {
        this.testSuiteName = testSuiteName;
        this.browser = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: [],
            startTime: null,
            endTime: null
        };
    }

    async initialize() {
        this.results.startTime = Date.now();
        console.log(`🧪 Starting ${this.testSuiteName}`);
        console.log('=' .repeat(60));
        console.log(`📍 Testing against: ${TEST_CONFIG.baseUrl}`);
        
        this.browser = await chromium.launch({ headless: true });
    }

    async runTest(testName, testFunction) {
        try {
            console.log(`\n🔬 Testing: ${testName}`);
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

    async createPage(viewport = 'desktop') {
        const page = await this.browser.newPage();
        const viewportConfig = TEST_CONFIG.viewports[viewport];
        if (viewportConfig) {
            await page.setViewportSize(viewportConfig);
        }
        return page;
    }

    async cleanup() {
        this.results.endTime = Date.now();
        if (this.browser) {
            await this.browser.close();
        }
    }

    generateReport() {
        const duration = this.results.endTime - this.results.startTime;
        
        console.log('\n' + '='.repeat(60));
        console.log(`📊 ${this.testSuiteName.toUpperCase()} RESULTS`);
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⏱️  Duration: ${Math.round(duration / 1000)}s`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }
        
        const successRate = Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100);
        console.log(`\n📈 Success Rate: ${successRate}%`);
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Utility functions
export const utils = {
    // Wait for an element to be visible
    async waitForElement(page, selector, timeout = 5000) {
        try {
            await page.waitForSelector(selector, { 
                state: 'visible', 
                timeout 
            });
            return true;
        } catch (error) {
            return false;
        }
    },

    // Take screenshot with error handling
    async takeScreenshot(page, name, fullPage = false) {
        try {
            const path = `${name}.png`;
            await page.screenshot({ 
                path, 
                fullPage,
                quality: 80
            });
            return path;
        } catch (error) {
            console.log(`   ⚠️  Failed to take screenshot: ${error.message}`);
            return null;
        }
    },

    // Get performance metrics
    async getPerformanceMetrics(page) {
        return await page.evaluate(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            return {
                domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
                loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
                firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                totalLoadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0
            };
        });
    },

    // Check if server is running
    async checkServer(url = TEST_CONFIG.baseUrl) {
        try {
            const response = await fetch(url);
            return response.ok;
        } catch (error) {
            return false;
        }
    },

    // Format file size
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    // Generate test data
    generateTestImageBlob() {
        // Simple 1x1 PNG image
        const pngData = Buffer.from([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
            0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 image
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
            0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
            0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
            0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x25,
            0xDB, 0x56, 0xCA, 0x00, 0x00, 0x00, 0x00, 0x49, // IEND chunk
            0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);
        return new Blob([pngData], { type: 'image/png' });
    }
};