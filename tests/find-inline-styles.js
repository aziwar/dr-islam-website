// Inline Style Detector
const { chromium } = require('playwright');

async function findInlineStyles() {
    console.log('🔍 Detecting Inline Styles on Both Versions...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const versions = [
        { name: 'English', url: 'https://dr-elsagher.com/' },
        { name: 'Arabic', url: 'https://dr-elsagher.com/ar/' }
    ];
    
    for (const version of versions) {
        console.log(`📄 ${version.name} Version: ${version.url}`);
        console.log('-'.repeat(50));
        
        await page.goto(version.url, { waitUntil: 'domcontentloaded' });
        
        // Find all elements with style attributes
        const styledElements = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('[style]'));
            return elements.map(el => ({
                tag: el.tagName.toLowerCase(),
                classes: Array.from(el.classList),
                id: el.id || 'no-id',
                style: el.getAttribute('style'),
                innerHTML: el.innerHTML.substring(0, 100) + (el.innerHTML.length > 100 ? '...' : '')
            }));
        });
        
        if (styledElements.length === 0) {
            console.log('✅ No inline styles found\n');
        } else {
            console.log(`❌ Found ${styledElements.length} elements with inline styles:`);
            styledElements.forEach((el, index) => {
                console.log(`  ${index + 1}. <${el.tag}> ${el.id !== 'no-id' ? `id="${el.id}"` : ''} ${el.classes.length ? `class="${el.classes.join(' ')}"` : ''}`);
                console.log(`     Style: ${el.style}`);
                console.log(`     Content: ${el.innerHTML.replace(/\n/g, ' ').trim()}`);
                console.log();
            });
        }
    }
    
    await browser.close();
}

findInlineStyles().catch(console.error);
