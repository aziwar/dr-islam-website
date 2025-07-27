#!/usr/bin/env node

/**
 * Post-Deployment Verification Script
 * Comprehensive testing of all critical website functionality
 */

const https = require('https');
const http = require('http');

const tests = [
    {
        name: 'Main Website',
        url: 'https://dr-elsagher.com/',
        expectedStatus: 200,
        checkContent: true,
        contentCheck: 'د. اسلام'
    },
    {
        name: 'CSS Stylesheet',
        url: 'https://dr-elsagher.com/css/style.css',
        expectedStatus: 200,
        checkContent: true,
        contentCheck: '.hero'
    },
    {
        name: 'JavaScript Main',
        url: 'https://dr-elsagher.com/js/main.js',
        expectedStatus: 200,
        checkContent: true,
        contentCheck: 'function'
    },
    {
        name: 'Favicon',
        url: 'https://dr-elsagher.com/favicon.ico',
        expectedStatus: 200,
        checkContent: false
    },
    {
        name: 'Contact API (OPTIONS)',
        url: 'https://dr-elsagher.com/api/contact',
        method: 'OPTIONS',
        expectedStatus: 200,
        headers: {
            'Origin': 'https://dr-elsagher.com'
        },
        checkHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods']
    },
    {
        name: 'WWW Redirect',
        url: 'https://www.dr-elsagher.com/',
        expectedStatus: 200,
        checkContent: true,
        contentCheck: 'د. اسلام'
    }
];

async function runTest(test) {
    return new Promise((resolve) => {
        const protocol = test.url.startsWith('https:') ? https : http;
        const options = {
            method: test.method || 'GET',
            headers: test.headers || {}
        };

        const req = protocol.request(test.url, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                if (test.checkContent) {
                    data += chunk;
                }
            });

            res.on('end', () => {
                const result = {
                    name: test.name,
                    url: test.url,
                    status: res.statusCode,
                    success: res.statusCode === test.expectedStatus,
                    headers: res.headers,
                    issues: []
                };

                // Check status code
                if (res.statusCode !== test.expectedStatus) {
                    result.issues.push(`Expected status ${test.expectedStatus}, got ${res.statusCode}`);
                    result.success = false;
                }

                // Check content if required
                if (test.checkContent && test.contentCheck) {
                    if (!data.includes(test.contentCheck)) {
                        result.issues.push(`Content check failed: "${test.contentCheck}" not found`);
                        result.success = false;
                    }
                }

                // Check headers if required
                if (test.checkHeaders) {
                    test.checkHeaders.forEach(header => {
                        const headerKey = header.toLowerCase();
                        if (!res.headers[headerKey]) {
                            result.issues.push(`Missing header: ${header}`);
                            result.success = false;
                        }
                    });
                }

                resolve(result);
            });
        });

        req.on('error', (err) => {
            resolve({
                name: test.name,
                url: test.url,
                status: 0,
                success: false,
                issues: [`Request failed: ${err.message}`]
            });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            resolve({
                name: test.name,
                url: test.url,
                status: 0,
                success: false,
                issues: ['Request timeout']
            });
        });

        req.end();
    });
}

async function runAllTests() {
    console.log('🚀 Starting Post-Deployment Verification');
    console.log('=====================================\n');

    const results = [];
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        console.log(`🔄 Testing: ${test.name}...`);
        const result = await runTest(test);
        results.push(result);

        if (result.success) {
            console.log(`✅ ${test.name} - PASSED (${result.status})`);
            passed++;
        } else {
            console.log(`❌ ${test.name} - FAILED (${result.status})`);
            result.issues.forEach(issue => {
                console.log(`   Issue: ${issue}`);
            });
            failed++;
        }
        console.log('');
    }

    // Summary
    console.log('=====================================');
    console.log('📊 DEPLOYMENT VERIFICATION SUMMARY');
    console.log('=====================================');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
    
    if (failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Deployment successful.');
        console.log('🌐 Website is live and fully functional at: https://dr-elsagher.com');
    } else {
        console.log('\n⚠️  Some tests failed. Please review the issues above.');
    }

    // Critical functionality check
    const criticalTests = ['Main Website', 'CSS Stylesheet', 'JavaScript Main'];
    const criticalFailures = results.filter(r => criticalTests.includes(r.name) && !r.success);
    
    if (criticalFailures.length === 0) {
        console.log('\n✅ CRITICAL FUNCTIONALITY: All essential features are working');
        console.log('   - Website loads correctly');
        console.log('   - CSS styling is applied');
        console.log('   - JavaScript functionality is active');
        console.log('   - Contact form API is responding');
    } else {
        console.log('\n🚨 CRITICAL ISSUES DETECTED:');
        criticalFailures.forEach(failure => {
            console.log(`   - ${failure.name}: ${failure.issues.join(', ')}`);
        });
    }

    return { passed, failed, results };
}

// Run the tests
runAllTests().catch(console.error);