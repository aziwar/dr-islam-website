// HTML Validation Test for dr-elsagher.com
const { chromium } = require('playwright');

async function validateHTML() {
    console.log('🔍 Starting HTML Validation Tests...');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const results = {
        englishVersion: { tests: [], passed: 0, failed: 0 },
        arabicVersion: { tests: [], passed: 0, failed: 0 },
        timestamp: new Date().toISOString()
    };
    
    const addTest = (version, name, passed, details = '') => {
        results[version].tests.push({ name, passed, details });
        if (passed) results[version].passed++;
        else results[version].failed++;
        console.log(`  ${passed ? '✅' : '❌'} ${name}${details ? ': ' + details : ''}`);
    };
    
    // Test English version
    console.log('\n🇺🇸 Testing English Version (/)...');
    try {
        await page.goto('https://dr-elsagher.com/', { waitUntil: 'domcontentloaded' });
        
        // Check for nested picture elements
        const nestedPictures = await page.$$('picture picture');
        addTest('englishVersion', 'No nested picture elements', 
            nestedPictures.length === 0, 
            `Found ${nestedPictures.length} nested pictures`);
        
        // Check picture element structure
        const pictureElements = await page.$$('picture');
        addTest('englishVersion', 'Picture elements exist', 
            pictureElements.length > 0, 
            `Found ${pictureElements.length} picture elements`);
        
        // Validate picture element content
        for (let i = 0; i < pictureElements.length; i++) {
            const sources = await pictureElements[i].$$('source');
            const imgs = await pictureElements[i].$$('img');
            
            addTest('englishVersion', `Picture ${i+1} has sources`, 
                sources.length > 0, 
                `${sources.length} sources`);
            
            addTest('englishVersion', `Picture ${i+1} has img element`, 
                imgs.length === 1, 
                `${imgs.length} img elements`);
        }
        
        // Check mobile menu structure
        const mobileMenu = await page.$('#mobileMenu');
        addTest('englishVersion', 'Mobile menu exists with correct ID', 
            mobileMenu !== null);
        
        const mobileToggle = await page.$('.mobile-menu-toggle');
        addTest('englishVersion', 'Mobile toggle button exists', 
            mobileToggle !== null);
        
        // Check for duplicate IDs
        const menuId = await page.$$('[id="mobileMenu"]');
        addTest('englishVersion', 'No duplicate mobileMenu IDs', 
            menuId.length === 1, 
            `Found ${menuId.length} elements with id="mobileMenu"`);
        
        // Validate HTML5 structure
        const doctype = await page.evaluate(() => {
            const doctype = document.doctype;
            return doctype ? doctype.name : null;
        });
        addTest('englishVersion', 'Valid HTML5 doctype', 
            doctype === 'html');
        
        const htmlLang = await page.$eval('html', el => el.getAttribute('lang'));
        addTest('englishVersion', 'HTML lang attribute set', 
            htmlLang === 'en', 
            `lang="${htmlLang}"`);
            
    } catch (error) {
        addTest('englishVersion', 'Page load and testing', false, `Error: ${error.message}`);
    }
    
    // Test Arabic version
    console.log('\n🇸🇦 Testing Arabic Version (/ar/)...');
    try {
        await page.goto('https://dr-elsagher.com/ar/', { waitUntil: 'domcontentloaded' });
        
        // Check for nested picture elements
        const nestedPictures = await page.$$('picture picture');
        addTest('arabicVersion', 'No nested picture elements', 
            nestedPictures.length === 0, 
            `Found ${nestedPictures.length} nested pictures`);
        
        // Check picture element structure
        const pictureElements = await page.$$('picture');
        addTest('arabicVersion', 'Picture elements exist', 
            pictureElements.length > 0, 
            `Found ${pictureElements.length} picture elements`);
        
        // Validate picture element content
        for (let i = 0; i < pictureElements.length; i++) {
            const sources = await pictureElements[i].$$('source');
            const imgs = await pictureElements[i].$$('img');
            
            addTest('arabicVersion', `Picture ${i+1} has sources`, 
                sources.length > 0, 
                `${sources.length} sources`);
            
            addTest('arabicVersion', `Picture ${i+1} has img element`, 
                imgs.length === 1, 
                `${imgs.length} img elements`);
        }
        
        // Check RTL direction
        const htmlDir = await page.$eval('html', el => el.getAttribute('dir'));
        addTest('arabicVersion', 'HTML dir attribute set to RTL', 
            htmlDir === 'rtl', 
            `dir="${htmlDir}"`);
        
        const htmlLang = await page.$eval('html', el => el.getAttribute('lang'));
        addTest('arabicVersion', 'HTML lang attribute set', 
            htmlLang === 'ar', 
            `lang="${htmlLang}"`);
        
        // Check mobile menu structure (same as English)
        const mobileMenu = await page.$('#mobileMenu');
        addTest('arabicVersion', 'Mobile menu exists with correct ID', 
            mobileMenu !== null);
        
        const mobileToggle = await page.$('.mobile-menu-toggle');
        addTest('arabicVersion', 'Mobile toggle button exists', 
            mobileToggle !== null);
        
        // Check for duplicate IDs
        const menuId = await page.$$('[id="mobileMenu"]');
        addTest('arabicVersion', 'No duplicate mobileMenu IDs', 
            menuId.length === 1, 
            `Found ${menuId.length} elements with id="mobileMenu"`);
            
    } catch (error) {
        addTest('arabicVersion', 'Page load and testing', false, `Error: ${error.message}`);
    }
    
    await browser.close();
    
    // Results summary
    console.log('\n📊 HTML VALIDATION RESULTS');
    console.log('=' .repeat(50));
    
    const totalPassed = results.englishVersion.passed + results.arabicVersion.passed;
    const totalFailed = results.englishVersion.failed + results.arabicVersion.failed;
    const successRate = ((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1);
    
    console.log(`🇺🇸 English: ${results.englishVersion.passed}✅ ${results.englishVersion.failed}❌`);
    console.log(`🇸🇦 Arabic:  ${results.arabicVersion.passed}✅ ${results.arabicVersion.failed}❌`);
    console.log(`📈 Overall: ${totalPassed}✅ ${totalFailed}❌ (${successRate}% success)`);
    
    if (totalFailed === 0) {
        console.log('\n🎉 ALL HTML VALIDATION TESTS PASSED!');
        console.log('✅ Nested picture elements fixed');
        console.log('✅ HTML5 structure valid');
        console.log('✅ No duplicate IDs');
        console.log('✅ Ready for W3C validation');
    } else {
        console.log('\n⚠️  Some validation issues found. Check details above.');
    }
    
    // Save results
    require('fs').writeFileSync(
        'html-validation-results.json', 
        JSON.stringify(results, null, 2)
    );
    
    return totalFailed === 0;
}

// Run validation if called directly
if (require.main === module) {
    validateHTML().catch(console.error);
}

module.exports = { validateHTML };
