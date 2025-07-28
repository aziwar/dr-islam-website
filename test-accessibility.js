// Quick accessibility test script
const { chromium } = require('playwright');
const axe = require('axe-core');

async function testAccessibility() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('Testing accessibility improvements...\n');
    
    // Test local development server
    await page.goto('http://localhost:3000');
    
    // Inject axe-core
    await page.addScriptTag({ path: require.resolve('axe-core') });
    
    // Run accessibility tests
    const results = await page.evaluate(async () => {
        return await axe.run();
    });
    
    // Display results
    console.log('Accessibility Test Results:');
    console.log('==========================');
    console.log(`✅ Passes: ${results.passes.length}`);
    console.log(`❌ Violations: ${results.violations.length}`);
    console.log(`⚠️  Incomplete: ${results.incomplete.length}`);
    console.log(`ℹ️  Inapplicable: ${results.inapplicable.length}\n`);
    
    // Show violations if any
    if (results.violations.length > 0) {
        console.log('Violations Found:');
        console.log('================');
        results.violations.forEach((violation, index) => {
            console.log(`\n${index + 1}. ${violation.help}`);
            console.log(`   Impact: ${violation.impact}`);
            console.log(`   WCAG: ${violation.tags.join(', ')}`);
            console.log(`   Elements affected: ${violation.nodes.length}`);
            violation.nodes.forEach(node => {
                console.log(`   - ${node.target.join(' ')}`);
            });
        });
    } else {
        console.log('🎉 No accessibility violations found!');
    }
    
    // Test specific improvements
    console.log('\n\nTesting Specific Improvements:');
    console.log('=============================');
    
    // Test 1: Check aria-labels match visible text
    const phoneLink = await page.$('a[href^="tel:"]');
    if (phoneLink) {
        const visibleText = await phoneLink.textContent();
        const ariaLabel = await phoneLink.getAttribute('aria-label');
        console.log(`\n1. Phone link aria-label test:`);
        console.log(`   Visible text: "${visibleText}"`);
        console.log(`   Aria-label: "${ariaLabel || 'None'}"`);
        console.log(`   ✅ Match: ${!ariaLabel || ariaLabel.includes(visibleText)}`);
    }
    
    // Test 2: Check focus indicators
    const focusTest = await page.evaluate(() => {
        const testButton = document.querySelector('button');
        if (testButton) {
            testButton.focus();
            const styles = window.getComputedStyle(testButton);
            return {
                outline: styles.outline,
                outlineOffset: styles.outlineOffset,
                boxShadow: styles.boxShadow
            };
        }
        return null;
    });
    
    if (focusTest) {
        console.log(`\n2. Focus indicator test:`);
        console.log(`   Outline: ${focusTest.outline}`);
        console.log(`   Outline offset: ${focusTest.outlineOffset}`);
        console.log(`   Box shadow: ${focusTest.boxShadow}`);
        console.log(`   ✅ Enhanced focus indicators: ${focusTest.outline.includes('3px')}`);
    }
    
    // Test 3: Check color contrast
    const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const styles = window.getComputedStyle(body);
        return {
            color: styles.color,
            backgroundColor: styles.backgroundColor
        };
    });
    
    console.log(`\n3. Color declaration test:`);
    console.log(`   Body color: ${bodyStyles.color}`);
    console.log(`   Body background: ${bodyStyles.backgroundColor}`);
    console.log(`   ✅ Explicit colors: ${bodyStyles.color !== '' && bodyStyles.backgroundColor !== ''}`);
    
    // Test 4: External link indicators
    const externalLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[target="_blank"]'));
        return links.map(link => ({
            text: link.textContent,
            hasIndicator: window.getComputedStyle(link, '::after').content !== 'none'
        }));
    });
    
    if (externalLinks.length > 0) {
        console.log(`\n4. External link indicators:`);
        externalLinks.forEach(link => {
            console.log(`   "${link.text}": ${link.hasIndicator ? '✅ Has indicator' : '❌ No indicator'}`);
        });
    }
    
    await browser.close();
    console.log('\n✅ Accessibility testing completed!');
}

// Run the test
testAccessibility().catch(console.error);