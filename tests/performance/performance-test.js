#!/usr/bin/env node

/**
 * Dr. Islam Website - Performance Testing Suite
 * Tests Core Web Vitals, loading speeds, and performance metrics
 */

import { chromium } from 'playwright';

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 30000,
    performanceThresholds: {
        LCP: 2500,        // Largest Contentful Paint (ms)
        FID: 100,         // First Input Delay (ms) 
        CLS: 0.1,         // Cumulative Layout Shift
        TTI: 3500,        // Time to Interactive (ms)
        loadTime: 3000    // Full page load (ms)
    }
};

class PerformanceTester {
    constructor() {
        this.browser = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: [],
            metrics: {}
        };
    }

    async initialize() {
        console.log('⚡ Starting Performance Testing Suite');
        console.log('=' .repeat(60));
        
        this.browser = await chromium.launch({ headless: true });
    }

    async runTest(testName, testFunction) {
        try {
            console.log(`\n⚡ Testing: ${testName}`);
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

    async measureCoreWebVitals() {
        const page = await this.browser.newPage();
        
        try {
            // Enable performance tracking
            await page.coverage.startJSCoverage();
            await page.coverage.startCSSCoverage();
            
            const startTime = Date.now();
            
            // Navigate and measure initial load
            await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle' });
            
            const loadTime = Date.now() - startTime;
            this.results.metrics.loadTime = loadTime;
            
            // Measure Core Web Vitals using browser APIs
            const vitals = await page.evaluate(() => {
                return new Promise((resolve) => {
                    const vitals = {};
                    
                    // Largest Contentful Paint
                    new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        if (entries.length > 0) {
                            vitals.LCP = entries[entries.length - 1].startTime;
                        }
                    }).observe({ entryTypes: ['largest-contentful-paint'] });
                    
                    // Cumulative Layout Shift
                    let clsValue = 0;
                    new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        vitals.CLS = clsValue;
                    }).observe({ entryTypes: ['layout-shift'] });
                    
                    // First Input Delay (simulated)
                    vitals.FID = performance.now() - performance.timeOrigin;
                    
                    setTimeout(() => resolve(vitals), 2000);
                });
            });
            
            this.results.metrics = { ...this.results.metrics, ...vitals };
            
            // Validate against thresholds
            const failures = [];
            
            if (loadTime > TEST_CONFIG.performanceThresholds.loadTime) {
                failures.push(`Load time ${loadTime}ms exceeds ${TEST_CONFIG.performanceThresholds.loadTime}ms`);
            }
            
            if (vitals.LCP && vitals.LCP > TEST_CONFIG.performanceThresholds.LCP) {
                failures.push(`LCP ${Math.round(vitals.LCP)}ms exceeds ${TEST_CONFIG.performanceThresholds.LCP}ms`);
            }
            
            if (vitals.CLS && vitals.CLS > TEST_CONFIG.performanceThresholds.CLS) {
                failures.push(`CLS ${vitals.CLS.toFixed(3)} exceeds ${TEST_CONFIG.performanceThresholds.CLS}`);
            }
            
            if (failures.length > 0) {
                throw new Error(failures.join('; '));
            }
            
            console.log(`   📊 Load Time: ${loadTime}ms`);
            console.log(`   📊 LCP: ${vitals.LCP ? Math.round(vitals.LCP) + 'ms' : 'N/A'}`);
            console.log(`   📊 CLS: ${vitals.CLS ? vitals.CLS.toFixed(3) : 'N/A'}`);
            
        } finally {
            await page.close();
        }
    }
    async testResourceOptimization() {
        const page = await this.browser.newPage();
        
        try {
            const resourceSizes = {};
            const resourceCount = { js: 0, css: 0, images: 0, total: 0 };
            
            // Monitor network requests
            page.on('response', async (response) => {
                const url = response.url();
                const size = parseInt(response.headers()['content-length'] || '0');
                
                if (url.includes('.js')) {
                    resourceCount.js++;
                    resourceSizes.js = (resourceSizes.js || 0) + size;
                } else if (url.includes('.css')) {
                    resourceCount.css++;
                    resourceSizes.css = (resourceSizes.css || 0) + size;
                } else if (url.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
                    resourceCount.images++;
                    resourceSizes.images = (resourceSizes.images || 0) + size;
                }
                
                resourceCount.total++;
            });
            
            await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle' });
            
            // Analyze resource efficiency
            const issues = [];
            
            if (resourceCount.total > 50) {
                issues.push(`Too many requests: ${resourceCount.total} (recommend <50)`);
            }
            
            if (resourceSizes.js > 500000) { // 500KB
                issues.push(`JavaScript bundle too large: ${Math.round(resourceSizes.js/1024)}KB`);
            }
            
            if (resourceSizes.css > 100000) { // 100KB
                issues.push(`CSS bundle too large: ${Math.round(resourceSizes.css/1024)}KB`);
            }
            
            if (issues.length > 0) {
                console.warn(`⚠️  Resource optimization issues: ${issues.join('; ')}`);
            }
            
            console.log(`   📊 Total Requests: ${resourceCount.total}`);
            console.log(`   📊 JS Size: ${Math.round((resourceSizes.js || 0)/1024)}KB`);
            console.log(`   📊 CSS Size: ${Math.round((resourceSizes.css || 0)/1024)}KB`);
            console.log(`   📊 Images: ${resourceCount.images} files`);
            
        } finally {
            await page.close();
        }
    }

    async testCachingHeaders() {
        const page = await this.browser.newPage();
        
        try {
            const cacheableResources = [];
            
            page.on('response', (response) => {
                const cacheControl = response.headers()['cache-control'];
                const url = response.url();
                
                if (url.match(/\.(js|css|png|jpg|jpeg|webp|woff2?)$/)) {
                    cacheableResources.push({
                        url: url.split('/').pop(),
                        cacheControl: cacheControl || 'none',
                        status: response.status()
                    });
                }
            });
            
            await page.goto(TEST_CONFIG.baseUrl);
            await page.waitForTimeout(2000);
            
            // Analyze caching strategy
            const uncachedResources = cacheableResources.filter(resource => 
                !resource.cacheControl.includes('max-age') && 
                !resource.cacheControl.includes('immutable')
            );
            
            if (uncachedResources.length > 0) {
                console.warn(`⚠️  ${uncachedResources.length} static resources lack caching headers`);
                uncachedResources.slice(0, 3).forEach(resource => {
                    console.warn(`     • ${resource.url}: ${resource.cacheControl}`);
                });
            }
            
            console.log(`   📊 Cacheable Resources: ${cacheableResources.length}`);
            console.log(`   📊 Properly Cached: ${cacheableResources.length - uncachedResources.length}`);
            
        } finally {
            await page.close();
        }
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            await this.runTest('Core Web Vitals', () => this.measureCoreWebVitals());
            await this.runTest('Resource Optimization', () => this.testResourceOptimization());
            await this.runTest('Caching Strategy', () => this.testCachingHeaders());
            
            await this.generateReport();
            
        } catch (error) {
            console.error('💥 Performance test suite failed:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 PERFORMANCE TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        
        if (Object.keys(this.results.metrics).length > 0) {
            console.log('\n📈 PERFORMANCE METRICS:');
            if (this.results.metrics.loadTime) {
                console.log(`   Load Time: ${this.results.metrics.loadTime}ms`);
            }
            if (this.results.metrics.LCP) {
                console.log(`   LCP: ${Math.round(this.results.metrics.LCP)}ms`);
            }
            if (this.results.metrics.CLS) {
                console.log(`   CLS: ${this.results.metrics.CLS.toFixed(3)}`);
            }
        }
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }
        
        console.log('\n⚡ Performance test completed!');
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new PerformanceTester();
    tester.runAllTests().catch(console.error);
}

export default PerformanceTester;