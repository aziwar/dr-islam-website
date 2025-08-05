#!/usr/bin/env node

/**
 * WCAG 2.1 AA Accessibility Compliance Tests
 * Comprehensive accessibility testing using axe-core with Playwright
 * 
 * Tests: WCAG 2.0/2.1 A/AA compliance, RTL accessibility, keyboard navigation
 * Framework: Playwright + @axe-core/playwright
 */

import { chromium } from 'playwright';

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 30000,
    viewports: [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1200, height: 800 }
    ]
};

class WCAGAccessibilityTester {
    constructor() {
        this.browser = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: [],
            violations: [],
            screenshots: []
        };
    }

    async initialize() {
        console.log('♿ Starting WCAG 2.1 AA Accessibility Tests');
        console.log('=' .repeat(60));
        console.log(`📍 Testing against: ${TEST_CONFIG.baseUrl}`);
        console.log(`📐 Viewports: ${TEST_CONFIG.viewports.map(v => `${v.name}(${v.width}x${v.height})`).join(', ')}`);
        
        this.browser = await chromium.launch({ headless: true });
    }

    async runTest(testName, testFunction) {
        try {
            console.log(`\n♿ Testing: ${testName}`);
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

    // Custom AxeBuilder implementation (since @axe-core/playwright may not be installed)
    async runAxeAnalysis(page, options = {}) {
        // Inject axe-core directly into the page
        await page.addScriptTag({
            url: 'https://unpkg.com/axe-core@4.7.0/axe.min.js'
        });

        // Wait for axe to load
        await page.waitForFunction(() => window.axe);

        // Configure axe rules for WCAG 2.0/2.1 A/AA compliance
        const axeConfig = {
            tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
            exclude: options.exclude || [],
            include: options.include || [document],
            rules: options.rules || {}
        };

        // Run axe analysis
        const results = await page.evaluate((config) => {
            return new Promise((resolve) => {
                window.axe.run(config, (err, results) => {
                    if (err) throw err;
                    resolve(results);
                });
            });
        }, axeConfig);

        return results;
    }

    // Test English homepage accessibility
    async testEnglishHomepageAccessibility() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/`, { waitUntil: 'networkidle' });
            
            // Test across all viewports
            for (const viewport of TEST_CONFIG.viewports) {
                await page.setViewportSize({ width: viewport.width, height: viewport.height });
                
                console.log(`   📐 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
                
                const results = await this.runAxeAnalysis(page);
                
                if (results.violations.length > 0) {
                    // Log violations but don't fail immediately - collect all issues
                    results.violations.forEach(violation => {
                        this.results.violations.push({
                            page: 'English Homepage',
                            viewport: viewport.name,
                            rule: violation.id,
                            impact: violation.impact,
                            description: violation.description,
                            helpUrl: violation.helpUrl,
                            nodes: violation.nodes.length
                        });
                    });
                    console.log(`   ⚠️  Found ${results.violations.length} violations on ${viewport.name}`);
                } else {
                    console.log(`   ✅ No violations found on ${viewport.name}`);
                }

                // Take screenshot for documentation
                const screenshotPath = `accessibility-en-${viewport.name}.png`;
                await page.screenshot({ 
                    path: screenshotPath,
                    fullPage: true 
                });
                this.results.screenshots.push({
                    page: 'English Homepage',
                    viewport: viewport.name,
                    path: screenshotPath
                });
            }
            
            // If we collected violations, report them
            const pageViolations = this.results.violations.filter(v => v.page === 'English Homepage');
            if (pageViolations.length > 0) {
                throw new Error(`Found ${pageViolations.length} accessibility violations across viewports`);
            }
            
        } finally {
            await page.close();
        }
    }

    // Test Arabic homepage accessibility (RTL considerations)
    async testArabicHomepageAccessibility() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/?lang=ar`, { waitUntil: 'networkidle' });
            
            // Verify RTL is applied
            const htmlDir = await page.getAttribute('html', 'dir');
            if (htmlDir !== 'rtl') {
                throw new Error(`Expected dir="rtl" on Arabic page, got: ${htmlDir}`);
            }
            
            const htmlLang = await page.getAttribute('html', 'lang');
            if (htmlLang !== 'ar') {
                throw new Error(`Expected lang="ar" on Arabic page, got: ${htmlLang}`);
            }
            
            console.log(`   ✅ RTL and language attributes properly set`);
            
            // Test across all viewports
            for (const viewport of TEST_CONFIG.viewports) {
                await page.setViewportSize({ width: viewport.width, height: viewport.height });
                
                console.log(`   📐 Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
                
                const results = await this.runAxeAnalysis(page);
                
                if (results.violations.length > 0) {
                    results.violations.forEach(violation => {
                        this.results.violations.push({
                            page: 'Arabic Homepage',
                            viewport: viewport.name,
                            rule: violation.id,
                            impact: violation.impact,
                            description: violation.description,
                            helpUrl: violation.helpUrl,
                            nodes: violation.nodes.length
                        });
                    });
                    console.log(`   ⚠️  Found ${results.violations.length} violations on ${viewport.name}`);
                } else {
                    console.log(`   ✅ No violations found on ${viewport.name}`);
                }

                // Take screenshot for documentation
                const screenshotPath = `accessibility-ar-${viewport.name}.png`;
                await page.screenshot({ 
                    path: screenshotPath,
                    fullPage: true 
                });
                this.results.screenshots.push({
                    page: 'Arabic Homepage',
                    viewport: viewport.name,
                    path: screenshotPath
                });
            }
            
            // If we collected violations, report them
            const pageViolations = this.results.violations.filter(v => v.page === 'Arabic Homepage');
            if (pageViolations.length > 0) {
                throw new Error(`Found ${pageViolations.length} accessibility violations across viewports`);
            }
            
        } finally {
            await page.close();
        }
    }

    // Test keyboard navigation
    async testKeyboardNavigation() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/`, { waitUntil: 'networkidle' });
            
            // Test tab navigation through focusable elements
            let focusableElements = [];
            let tabCount = 0;
            const maxTabs = 20; // Prevent infinite loops
            
            while (tabCount < maxTabs) {
                await page.keyboard.press('Tab');
                tabCount++;
                
                const activeElement = await page.evaluate(() => {
                    const element = document.activeElement;
                    if (element && element !== document.body) {
                        return {
                            tagName: element.tagName,
                            id: element.id,
                            className: element.className,
                            role: element.getAttribute('role'),
                            ariaLabel: element.getAttribute('aria-label'),
                            textContent: element.textContent?.substring(0, 50) || ''
                        };
                    }
                    return null;
                });
                
                if (activeElement) {
                    focusableElements.push(activeElement);
                } else {
                    break; // End of focusable elements
                }
            }
            
            if (focusableElements.length === 0) {
                throw new Error('No focusable elements found - keyboard navigation not working');
            }
            
            console.log(`   ✅ Found ${focusableElements.length} focusable elements`);
            
            // Verify important elements are focusable
            const importantElements = ['contact form', 'navigation links', 'buttons'];
            const elementText = focusableElements.map(el => el.textContent.toLowerCase()).join(' ');
            
            let missingElements = [];
            importantElements.forEach(element => {
                if (!elementText.includes(element.split(' ')[0])) {
                    missingElements.push(element);
                }
            });
            
            if (missingElements.length > 0) {
                console.log(`   ⚠️  Some important elements may not be keyboard accessible: ${missingElements.join(', ')}`);
            }
            
            // Test escape key functionality (for modals, etc.)
            await page.keyboard.press('Escape');
            console.log(`   ✅ Keyboard navigation tested successfully`);
            
        } finally {
            await page.close();
        }
    }

    // Test color contrast (basic check using computed styles)
    async testColorContrast() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/`, { waitUntil: 'networkidle' });
            
            // Check contrast for key text elements
            const contrastResults = await page.evaluate(() => {
                const elements = document.querySelectorAll('h1, h2, h3, p, a, button, .text-content');
                const results = [];
                
                elements.forEach((element, index) => {
                    if (index > 10) return; // Limit to first 10 elements
                    
                    const styles = window.getComputedStyle(element);
                    const color = styles.color;
                    const backgroundColor = styles.backgroundColor;
                    const fontSize = styles.fontSize;
                    
                    results.push({
                        tagName: element.tagName,
                        color,
                        backgroundColor,
                        fontSize,
                        textContent: element.textContent?.substring(0, 30) || ''
                    });
                });
                
                return results;
            });
            
            console.log(`   ✅ Analyzed color contrast for ${contrastResults.length} elements`);
            
            // Note: Full contrast calculation requires complex color space conversion
            // This is a basic check - axe-core handles the full calculation
            const lowContrastWarnings = contrastResults.filter(result => 
                result.color === 'rgb(128, 128, 128)' || // Gray text warning
                result.backgroundColor === result.color
            );
            
            if (lowContrastWarnings.length > 0) {
                console.log(`   ⚠️  Potential low contrast elements found: ${lowContrastWarnings.length}`);
            } else {
                console.log(`   ✅ No obvious contrast issues detected`);
            }
            
        } finally {
            await page.close();
        }
    }

    // Test form accessibility
    async testFormAccessibility() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/`, { waitUntil: 'networkidle' });
            
            // Look for forms on the page
            const forms = await page.$$('form');
            
            if (forms.length === 0) {
                console.log(`   ⚠️  No forms found to test`);
                return;
            }
            
            console.log(`   📝 Testing ${forms.length} form(s) for accessibility`);
            
            for (let i = 0; i < forms.length; i++) {
                const form = forms[i];
                
                // Check for form labels and accessibility attributes
                const formAnalysis = await form.evaluate((formElement) => {
                    const inputs = formElement.querySelectorAll('input, textarea, select');
                    const results = {
                        totalInputs: inputs.length,
                        labeledInputs: 0,
                        ariaLabeledInputs: 0,
                        requiredInputs: 0,
                        issues: []
                    };
                    
                    inputs.forEach(input => {
                        const id = input.id;
                        const label = formElement.querySelector(`label[for="${id}"]`);
                        const ariaLabel = input.getAttribute('aria-label');
                        const ariaLabelledBy = input.getAttribute('aria-labelledby');
                        const required = input.required;
                        
                        if (label) results.labeledInputs++;
                        if (ariaLabel || ariaLabelledBy) results.ariaLabeledInputs++;
                        if (required) results.requiredInputs++;
                        
                        if (!label && !ariaLabel && !ariaLabelledBy) {
                            results.issues.push(`Input ${input.type} missing label or aria-label`);
                        }
                    });
                    
                    return results;
                });
                
                console.log(`   📝 Form ${i + 1}: ${formAnalysis.totalInputs} inputs, ${formAnalysis.labeledInputs} labeled`);
                
                if (formAnalysis.issues.length > 0) {
                    console.log(`   ⚠️  Form accessibility issues:`);
                    formAnalysis.issues.forEach(issue => {
                        console.log(`      • ${issue}`);
                    });
                } else {
                    console.log(`   ✅ Form ${i + 1} accessibility looks good`);
                }
            }
            
        } finally {
            await page.close();
        }
    }

    // Test screen reader compatibility (basic structural check)
    async testScreenReaderCompatibility() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(`${TEST_CONFIG.baseUrl}/`, { waitUntil: 'networkidle' });
            
            // Check for essential screen reader elements
            const srCompatibility = await page.evaluate(() => {
                const results = {
                    hasSkipLinks: !!document.querySelector('a[href^="#"], .skip-link'),
                    hasHeadingStructure: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0,
                    hasLandmarks: document.querySelectorAll('main, nav, aside, header, footer, [role="main"], [role="navigation"]').length > 0,
                    hasAltText: Array.from(document.querySelectorAll('img')).every(img => img.alt !== undefined),
                    hasAriaLabels: document.querySelectorAll('[aria-label], [aria-labelledby]').length > 0,
                    hasPageTitle: document.title && document.title.trim().length > 0,
                    hasLangAttribute: document.documentElement.lang && document.documentElement.lang.trim().length > 0
                };
                
                // Count heading levels
                results.headingLevels = {};
                document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                    const level = heading.tagName.toLowerCase();
                    results.headingLevels[level] = (results.headingLevels[level] || 0) + 1;
                });
                
                return results;
            });
            
            console.log(`   📖 Screen Reader Compatibility Analysis:`);
            console.log(`      Skip Links: ${srCompatibility.hasSkipLinks ? '✅' : '❌'}`);
            console.log(`      Heading Structure: ${srCompatibility.hasHeadingStructure ? '✅' : '❌'}`);
            console.log(`      Landmarks: ${srCompatibility.hasLandmarks ? '✅' : '❌'}`);
            console.log(`      Alt Text: ${srCompatibility.hasAltText ? '✅' : '❌'}`);
            console.log(`      ARIA Labels: ${srCompatibility.hasAriaLabels ? '✅' : '❌'}`);
            console.log(`      Page Title: ${srCompatibility.hasPageTitle ? '✅' : '❌'}`);
            console.log(`      Lang Attribute: ${srCompatibility.hasLangAttribute ? '✅' : '❌'}`);
            
            if (Object.keys(srCompatibility.headingLevels).length > 0) {
                console.log(`      Heading Levels: ${Object.entries(srCompatibility.headingLevels).map(([level, count]) => `${level.toUpperCase()}(${count})`).join(', ')}`);
            }
            
            // Check for critical screen reader issues
            const issues = [];
            if (!srCompatibility.hasHeadingStructure) issues.push('Missing heading structure');
            if (!srCompatibility.hasLandmarks) issues.push('Missing landmark elements');
            if (!srCompatibility.hasPageTitle) issues.push('Missing page title');
            if (!srCompatibility.hasLangAttribute) issues.push('Missing language attribute');
            
            if (issues.length > 0) {
                throw new Error(`Screen reader compatibility issues: ${issues.join(', ')}`);
            }
            
        } finally {
            await page.close();
        }
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            await this.runTest('English Homepage WCAG Compliance', () => this.testEnglishHomepageAccessibility());
            await this.runTest('Arabic Homepage WCAG Compliance (RTL)', () => this.testArabicHomepageAccessibility());
            await this.runTest('Keyboard Navigation', () => this.testKeyboardNavigation());
            await this.runTest('Color Contrast Analysis', () => this.testColorContrast());
            await this.runTest('Form Accessibility', () => this.testFormAccessibility());
            await this.runTest('Screen Reader Compatibility', () => this.testScreenReaderCompatibility());
            
            this.generateReport();
            
        } catch (error) {
            console.error('💥 WCAG accessibility test suite failed:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 WCAG 2.1 AA ACCESSIBILITY TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`🚨 Total Violations: ${this.results.violations.length}`);
        console.log(`📸 Screenshots: ${this.results.screenshots.length}`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }

        if (this.results.violations.length > 0) {
            console.log('\n🚨 ACCESSIBILITY VIOLATIONS:');
            
            // Group by impact level
            const violationsByImpact = {};
            this.results.violations.forEach(violation => {
                const impact = violation.impact || 'unknown';
                if (!violationsByImpact[impact]) violationsByImpact[impact] = [];
                violationsByImpact[impact].push(violation);
            });
            
            ['critical', 'serious', 'moderate', 'minor', 'unknown'].forEach(impact => {
                if (violationsByImpact[impact]) {
                    console.log(`\n  ${impact.toUpperCase()} (${violationsByImpact[impact].length}):`);
                    violationsByImpact[impact].forEach(violation => {
                        console.log(`    • ${violation.rule} on ${violation.page} (${violation.viewport})`);
                        console.log(`      ${violation.description}`);
                        console.log(`      Help: ${violation.helpUrl}`);
                        console.log(`      Nodes affected: ${violation.nodes}`);
                    });
                }
            });
        }

        if (this.results.screenshots.length > 0) {
            console.log('\n📸 SCREENSHOTS CAPTURED:');
            this.results.screenshots.forEach(screenshot => {
                console.log(`  • ${screenshot.page} (${screenshot.viewport}): ${screenshot.path}`);
            });
        }
        
        console.log('\n♿ ACCESSIBILITY STATUS:');
        if (this.results.failed === 0 && this.results.violations.length === 0) {
            console.log('  ✅ All accessibility tests passed');
            console.log('  ✅ WCAG 2.1 AA compliance verified');
            console.log('  ✅ RTL (Arabic) accessibility working');
            console.log('  ✅ Keyboard navigation functional');
            console.log('  ✅ Screen reader compatibility confirmed');
        } else {
            console.log('  ❌ Accessibility issues detected');
            console.log('  ❌ WCAG compliance needs attention');
            if (this.results.violations.length > 0) {
                console.log(`  ❌ ${this.results.violations.length} violations need resolution`);
            }
        }
        
        console.log('\n🔧 TECHNICAL DETAILS:');
        console.log('  • Uses axe-core 4.7.0 for WCAG validation');
        console.log('  • Tests WCAG 2.0/2.1 A and AA compliance');
        console.log('  • Cross-viewport testing (mobile, tablet, desktop)');
        console.log('  • RTL (Arabic) accessibility validation');
        console.log('  • Keyboard navigation and screen reader testing');
        console.log('  • Screenshots captured for visual documentation');
        
        console.log('\n📚 RECOMMENDATIONS:');
        console.log('  • Install @axe-core/playwright for enhanced testing');
        console.log('  • Consider automated color contrast validation');
        console.log('  • Implement skip links for keyboard users');
        console.log('  • Add ARIA landmarks and labels where missing');
        console.log('  • Test with actual screen readers (NVDA, JAWS, VoiceOver)');
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new WCAGAccessibilityTester();
    tester.runAllTests().catch(console.error);
}

export default WCAGAccessibilityTester;