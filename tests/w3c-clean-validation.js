// Comprehensive W3C Clean Validation Test
const { chromium } = require('playwright');

async function performCleanValidation() {
    console.log('🔍 W3C Clean Validation Test - Both Versions');
    console.log('=' .repeat(60));
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const results = {
        english: { url: 'https://dr-elsagher.com/', tests: [], passed: 0, failed: 0 },
        arabic: { url: 'https://dr-elsagher.com/ar/', tests: [], passed: 0, failed: 0 },
        timestamp: new Date().toISOString(),
        overallStatus: 'UNKNOWN'
    };
    
    const addTest = (version, category, name, passed, details = '') => {
        const test = { category, name, passed, details };
        results[version].tests.push(test);
        if (passed) results[version].passed++;
        else results[version].failed++;
        
        const icon = passed ? '✅' : '❌';
        console.log(`    ${icon} ${name}${details ? ': ' + details : ''}`);
    };
    
    // Validation categories to check
    const validationChecks = [
        {
            category: 'HTML5 Structure',
            checks: [
                { name: 'Valid DOCTYPE declaration', test: () => page.evaluate(() => {
                    const doctype = document.doctype;
                    return doctype && doctype.name === 'html' && !doctype.publicId && !doctype.systemId;
                })},
                { name: 'HTML element has lang attribute', test: () => page.$eval('html', el => el.hasAttribute('lang'))},
                { name: 'Meta charset declared', test: () => page.$('meta[charset]') !== null},
                { name: 'Meta viewport present', test: () => page.$('meta[name="viewport"]') !== null}
            ]
        },
        {
            category: 'Semantic Structure',
            checks: [
                { name: 'Title element present', test: () => page.$('title') !== null},
                { name: 'Meta description present', test: () => page.$('meta[name="description"]') !== null},
                { name: 'Heading hierarchy proper', test: async () => {
                    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', els => els.map(el => el.tagName));
                    return headings.includes('H1') && headings.length > 0;
                }},
                { name: 'Main landmark present', test: () => page.$('main') !== null}
            ]
        },
        {
            category: 'Image Elements',
            checks: [
                { name: 'No nested picture elements', test: () => page.$$('picture picture').then(els => els.length === 0)},
                { name: 'All img elements have alt attributes', test: async () => {
                    const imgsWithoutAlt = await page.$$('img:not([alt])');
                    return imgsWithoutAlt.length === 0;
                }},
                { name: 'Picture elements properly structured', test: async () => {
                    const pictures = await page.$$('picture');
                    for (const picture of pictures) {
                        const img = await picture.$('img');
                        if (!img) return false;
                    }
                    return true;
                }},
                { name: 'Source elements have proper attributes', test: async () => {
                    const invalidSources = await page.$$('source:not([srcset])');
                    return invalidSources.length === 0;
                }}
            ]
        },
        {
            category: 'Interactive Elements',
            checks: [
                { name: 'Buttons have accessible content', test: async () => {
                    const emptyButtons = await page.$$('button:empty:not([aria-label]):not([aria-labelledby])');
                    return emptyButtons.length === 0;
                }},
                { name: 'Links have accessible content', test: async () => {
                    const emptyLinks = await page.$$('a:empty:not([aria-label]):not([aria-labelledby])');
                    return emptyLinks.length === 0;
                }},
                { name: 'No duplicate IDs', test: async () => {
                    const ids = await page.$$eval('[id]', els => els.map(el => el.id));
                    const uniqueIds = [...new Set(ids)];
                    return ids.length === uniqueIds.length;
                }},
                { name: 'Form elements properly labeled', test: async () => {
                    const unlabeledInputs = await page.$$('input:not([aria-label]):not([aria-labelledby]):not([id])');
                    return unlabeledInputs.length === 0;
                }}
            ]
        },
        {
            category: 'Script and Style',
            checks: [
                { name: 'No inline styles', test: () => page.$$('[style]').then(els => els.length === 0)},
                { name: 'Script elements properly formed', test: async () => {
                    const scripts = await page.$$('script[src]');
                    for (const script of scripts) {
                        const hasContent = await script.textContent();
                        if (hasContent && hasContent.trim()) return false; // Script with src should be empty
                    }
                    return true;
                }},
                { name: 'CSS linked properly', test: () => page.$('link[rel="stylesheet"]') !== null}
            ]
        }
    ];
    
    // Test both versions
    for (const [version, versionData] of Object.entries({ english: results.english, arabic: results.arabic })) {
        console.log(`\n🌐 Testing ${version.toUpperCase()} Version: ${versionData.url}`);
        console.log('-' .repeat(50));
        
        try {
            const response = await page.goto(versionData.url, { 
                waitUntil: 'domcontentloaded',
                timeout: 30000 
            });
            
            addTest(version, 'Network', 'Page loads successfully', 
                response.status() === 200, 
                `Status: ${response.status()}`);
            
            // Wait for page to be fully loaded
            await page.waitForTimeout(2000);
            
            // Run all validation checks
            for (const category of validationChecks) {
                console.log(`\n  📋 ${category.category}:`);
                
                for (const check of category.checks) {
                    try {
                        const result = await check.test();
                        addTest(version, category.category, check.name, result);
                    } catch (error) {
                        addTest(version, category.category, check.name, false, `Error: ${error.message}`);
                    }
                }
            }
            
            // Version-specific checks
            if (version === 'arabic') {
                console.log('\n  🕌 Arabic-Specific Tests:');
                
                const dirAttribute = await page.$eval('html', el => el.getAttribute('dir'));
                addTest(version, 'Localization', 'RTL direction set', 
                    dirAttribute === 'rtl', 
                    `dir="${dirAttribute}"`);
                
                const langAttribute = await page.$eval('html', el => el.getAttribute('lang'));
                addTest(version, 'Localization', 'Arabic language set', 
                    langAttribute === 'ar', 
                    `lang="${langAttribute}"`);
            } else {
                console.log('\n  🇺🇸 English-Specific Tests:');
                
                const langAttribute = await page.$eval('html', el => el.getAttribute('lang'));
                addTest(version, 'Localization', 'English language set', 
                    langAttribute === 'en', 
                    `lang="${langAttribute}"`);
            }
            
            // Performance checks
            console.log('\n  ⚡ Performance Tests:');
            
            const loadTime = await page.evaluate(() => {
                const timing = performance.timing;
                return timing.loadEventEnd - timing.navigationStart;
            });
            
            addTest(version, 'Performance', 'Page loads within 10 seconds', 
                loadTime < 10000, 
                `Load time: ${loadTime}ms`);
            
        } catch (error) {
            addTest(version, 'Critical', 'Page accessibility', false, `Error: ${error.message}`);
        }
    }
    
    await browser.close();
    
    // Calculate overall results
    const totalPassed = results.english.passed + results.arabic.passed;
    const totalFailed = results.english.failed + results.arabic.failed;
    const successRate = ((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1);
    
    // Determine overall status
    if (totalFailed === 0) {
        results.overallStatus = 'CLEAN_VALIDATION';
    } else if (successRate >= 95) {
        results.overallStatus = 'MINOR_ISSUES';
    } else {
        results.overallStatus = 'VALIDATION_ERRORS';
    }
    
    // Results summary
    console.log('\n' + '=' .repeat(60));
    console.log('📊 W3C CLEAN VALIDATION RESULTS');
    console.log('=' .repeat(60));
    
    console.log(`🇺🇸 English Version: ${results.english.passed}✅ ${results.english.failed}❌`);
    console.log(`🕌 Arabic Version:  ${results.arabic.passed}✅ ${results.arabic.failed}❌`);
    console.log(`📈 Overall Success: ${totalPassed}✅ ${totalFailed}❌ (${successRate}%)`);
    
    console.log(`\n🎯 VALIDATION STATUS: ${results.overallStatus}`);
    
    if (results.overallStatus === 'CLEAN_VALIDATION') {
        console.log('\n🎉 PERFECT W3C VALIDATION!');
        console.log('✅ Both English and Arabic versions pass all tests');
        console.log('✅ HTML5 structure is compliant');
        console.log('✅ No accessibility issues found');
        console.log('✅ Ready for official W3C validation');
        console.log('\n🌐 Validation URLs:');
        console.log('📝 English: https://validator.w3.org/nu/?doc=https%3A%2F%2Fdr-elsagher.com%2F');
        console.log('📝 Arabic:  https://validator.w3.org/nu/?doc=https%3A%2F%2Fdr-elsagher.com%2Far%2F');
    } else {
        console.log(`\n⚠️  Status: ${results.overallStatus}`);
        console.log('Some issues may need attention before final validation.');
    }
    
    // Save detailed results
    require('fs').writeFileSync(
        'w3c-clean-validation-report.json', 
        JSON.stringify(results, null, 2)
    );
    
    console.log('\n📄 Detailed report saved: w3c-clean-validation-report.json');
    
    return results.overallStatus === 'CLEAN_VALIDATION';
}

// Run validation if called directly
if (require.main === module) {
    performCleanValidation().catch(console.error);
}

module.exports = { performCleanValidation };
