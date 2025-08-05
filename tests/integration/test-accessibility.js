#!/usr/bin/env node

/**
 * Dr. Islam Website - Accessibility Testing Suite
 * Tests WCAG compliance, keyboard navigation, and screen reader support
 */

import { chromium } from 'playwright';

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    timeout: 30000
};

class AccessibilityTester {
    constructor() {
        this.browser = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: [],
            violations: []
        };
    }

    async initialize() {
        console.log('♿ Starting Accessibility Testing Suite');
        console.log('=' .repeat(60));
        
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

    async testKeyboardNavigation() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            // Test tab navigation through interactive elements
            const interactiveElements = await page.evaluate(() => {
                const selectors = [
                    'a', 'button', 'input', 'select', 'textarea',
                    '[tabindex]:not([tabindex="-1"])', '[role="button"]'
                ];
                
                const elements = [];
                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        if (!el.disabled && el.offsetParent !== null) {
                            elements.push({
                                tagName: el.tagName.toLowerCase(),
                                id: el.id,
                                className: el.className,
                                text: el.textContent?.trim().substring(0, 50) || ''
                            });
                        }
                    });
                });
                
                return elements;
            });
            
            console.log(`   📊 Interactive elements found: ${interactiveElements.length}`);
            
            // Test tab sequence
            let tabCount = 0;
            for (let i = 0; i < Math.min(interactiveElements.length, 20); i++) {
                await page.keyboard.press('Tab');
                tabCount++;
                
                // Check if focus is visible
                const focusedElement = await page.evaluate(() => {
                    const focused = document.activeElement;
                    const computedStyle = window.getComputedStyle(focused);
                    return {
                        tagName: focused.tagName,
                        hasVisibleFocus: computedStyle.outline !== 'none' || 
                                        computedStyle.boxShadow !== 'none' ||
                                        focused.classList.contains('focus-visible')
                    };
                });
                
                if (!focusedElement.hasVisibleFocus && 
                    ['BUTTON', 'A', 'INPUT'].includes(focusedElement.tagName)) {
                    console.warn(`⚠️  Focus indicator may be missing on ${focusedElement.tagName}`);
                }
            }
            
            console.log(`   📊 Tested ${tabCount} tab stops`);
            
        } finally {
            await page.close();
        }
    }

    async testARIALabels() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            const ariaIssues = await page.evaluate(() => {
                const issues = [];
                
                // Check buttons without accessible names
                document.querySelectorAll('button').forEach((button, index) => {
                    const hasText = button.textContent?.trim();
                    const hasAriaLabel = button.getAttribute('aria-label');
                    const hasAriaLabelledby = button.getAttribute('aria-labelledby');
                    
                    if (!hasText && !hasAriaLabel && !hasAriaLabelledby) {
                        issues.push(`Button ${index + 1} lacks accessible name`);
                    }
                });
                
                // Check images without alt text
                document.querySelectorAll('img').forEach((img, index) => {
                    if (!img.getAttribute('alt') && img.getAttribute('alt') !== '') {
                        issues.push(`Image ${index + 1} (${img.src.split('/').pop()}) missing alt text`);
                    }
                });
                
                // Check form inputs without labels
                document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach((input, index) => {
                    const hasLabel = document.querySelector(`label[for="${input.id}"]`);
                    const hasAriaLabel = input.getAttribute('aria-label');
                    const hasAriaLabelledby = input.getAttribute('aria-labelledby');
                    const hasPlaceholder = input.getAttribute('placeholder');
                    
                    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby && !hasPlaceholder) {
                        issues.push(`Input ${index + 1} (${input.type}) lacks accessible label`);
                    }
                });
                
                // Check headings hierarchy
                const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
                let previousLevel = 0;
                headings.forEach((heading, index) => {
                    const currentLevel = parseInt(heading.tagName.charAt(1));
                    if (currentLevel > previousLevel + 1) {
                        issues.push(`Heading level skip: ${heading.tagName} after H${previousLevel} (heading ${index + 1})`);
                    }
                    previousLevel = currentLevel;
                });
                
                return issues;
            });
            
            if (ariaIssues.length > 0) {
                console.warn(`⚠️  Found ${ariaIssues.length} ARIA/accessibility issues:`);
                ariaIssues.slice(0, 5).forEach(issue => {
                    console.warn(`     • ${issue}`);
                });
                this.results.violations.push(...ariaIssues);
            } else {
                console.log(`   ✅ No major ARIA issues detected`);
            }
            
        } finally {
            await page.close();
        }
    }

    async testColorContrast() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            const contrastIssues = await page.evaluate(() => {
                const issues = [];
                
                // Get computed styles for text elements
                const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span');
                
                const getContrastRatio = (color1, color2) => {
                    // Simplified contrast ratio calculation
                    // In a real implementation, you'd use a proper color contrast library
                    const rgb1 = color1.match(/\d+/g);
                    const rgb2 = color2.match(/\d+/g);
                    
                    if (!rgb1 || !rgb2) return 21; // Assume good contrast if can't parse
                    
                    const getLuminance = (r, g, b) => {
                        const [rs, gs, bs] = [r, g, b].map(c => {
                            c = c / 255;
                            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                        });
                        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                    };
                    
                    const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
                    const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
                    
                    const lighter = Math.max(l1, l2);
                    const darker = Math.min(l1, l2);
                    
                    return (lighter + 0.05) / (darker + 0.05);
                };
                
                Array.from(textElements).slice(0, 20).forEach((element, index) => {
                    const styles = window.getComputedStyle(element);
                    const color = styles.color;
                    const backgroundColor = styles.backgroundColor;
                    const fontSize = parseFloat(styles.fontSize);
                    
                    if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                        const contrast = getContrastRatio(color, backgroundColor);
                        const isLargeText = fontSize >= 18 || (fontSize >= 14 && styles.fontWeight >= 700);
                        const minContrast = isLargeText ? 3 : 4.5;
                        
                        if (contrast < minContrast) {
                            issues.push(`Low contrast (${contrast.toFixed(1)}:1) on ${element.tagName.toLowerCase()} element ${index + 1}`);
                        }
                    }
                });
                
                return issues;
            });
            
            if (contrastIssues.length > 0) {
                console.warn(`⚠️  Found ${contrastIssues.length} potential contrast issues:`);
                contrastIssues.slice(0, 3).forEach(issue => {
                    console.warn(`     • ${issue}`);
                });
            } else {
                console.log(`   ✅ No obvious contrast issues detected`);
            }
            
        } finally {
            await page.close();
        }
    }

    async testScreenReaderSupport() {
        const page = await this.browser.newPage();
        
        try {
            await page.goto(TEST_CONFIG.baseUrl);
            
            const screenReaderInfo = await page.evaluate(() => {
                const info = {
                    hasMainLandmark: !!document.querySelector('main, [role="main"]'),
                    hasNavLandmark: !!document.querySelector('nav, [role="navigation"]'),
                    hasSkipLink: !!document.querySelector('a[href^="#"][class*="skip"], a[href^="#"][class*="sr-only"]'),
                    headingStructure: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
                        level: h.tagName,
                        text: h.textContent?.trim().substring(0, 50) || ''
                    })),
                    formLabels: Array.from(document.querySelectorAll('input, textarea, select')).map(input => ({
                        type: input.type || input.tagName.toLowerCase(),
                        hasLabel: !!document.querySelector(`label[for="${input.id}"]`) || 
                                 !!input.getAttribute('aria-label') || 
                                 !!input.getAttribute('aria-labelledby')
                    }))
                };
                
                return info;
            });
            
            const issues = [];
            
            if (!screenReaderInfo.hasMainLandmark) {
                issues.push('Missing main landmark for screen readers');
            }
            
            if (!screenReaderInfo.hasNavLandmark) {
                issues.push('Missing navigation landmark');
            }
            
            if (screenReaderInfo.headingStructure.length === 0) {
                issues.push('No heading structure found');
            }
            
            const unlabeledForms = screenReaderInfo.formLabels.filter(form => !form.hasLabel);
            if (unlabeledForms.length > 0) {
                issues.push(`${unlabeledForms.length} form elements lack proper labels`);
            }
            
            if (issues.length > 0) {
                console.warn(`⚠️  Screen reader issues: ${issues.join('; ')}`);
            } else {
                console.log(`   ✅ Good screen reader support structure`);
            }
            
            console.log(`   📊 Headings: ${screenReaderInfo.headingStructure.length}`);
            console.log(`   📊 Form elements: ${screenReaderInfo.formLabels.length}`);
            
        } finally {
            await page.close();
        }
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            await this.runTest('Keyboard Navigation', () => this.testKeyboardNavigation());
            await this.runTest('ARIA Labels & Semantics', () => this.testARIALabels());
            await this.runTest('Color Contrast', () => this.testColorContrast());
            await this.runTest('Screen Reader Support', () => this.testScreenReaderSupport());
            
            await this.generateReport();
            
        } catch (error) {
            console.error('💥 Accessibility test suite failed:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 ACCESSIBILITY TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`⚠️  Total Violations: ${this.results.violations.length}`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }
        
        if (this.results.violations.length > 0) {
            console.log('\n⚠️  ACCESSIBILITY VIOLATIONS (first 10):');
            this.results.violations.slice(0, 10).forEach((violation, index) => {
                console.log(`  ${index + 1}. ${violation}`);
            });
        }
        
        console.log('\n♿ Accessibility test completed!');
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new AccessibilityTester();
    tester.runAllTests().catch(console.error);
}

export default AccessibilityTester;