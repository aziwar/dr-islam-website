/**
 * Contact Form Testing Script
 * Tests the Cloudflare Worker backend for Dr. Islam's contact form
 */

// Test configuration
const CONFIG = {
    // Update this URL once worker is deployed
    WORKER_URL: 'https://dr-islam-contact-form.your-subdomain.workers.dev',
    // Or with custom domain: 'https://dr-elsagher.com/api/contact'
    
    TIMEOUT: 30000, // 30 seconds
    
    // Test data
    VALID_DATA: {
        name: 'أحمد محمد السالم',
        email: 'ahmed.salem@example.com',
        phone: '+96598563711',
        service: 'consultation',
        message: 'أرغب في حجز موعد لاستشارة طبية. شكراً لكم.'
    },
    
    INVALID_DATA: {
        name: 'X', // Too short
        email: 'invalid-email',
        phone: '123', // Invalid Kuwait number
        service: '', // Empty
        message: 'x'.repeat(1001) // Too long
    },
    
    SPAM_DATA: {
        name: 'Win Casino Lottery',
        email: 'spam@example.com',
        phone: '+96598563711',
        service: 'consultation',
        message: 'URGENT!!! CLICK HERE TO WIN $$$!!! Best casino lottery winner claim your prize now!!!'
    }
};

// Test utilities
class ContactFormTester {
    constructor() {
        this.results = [];
        this.startTime = Date.now();
    }
    
    async submitForm(data, testName) {
        console.log(`\n🧪 Testing: ${testName}`);
        console.log('Data:', JSON.stringify(data, null, 2));
        
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            
            const response = await fetch(CONFIG.WORKER_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            const testResult = {
                test: testName,
                status: response.status,
                success: response.ok,
                data: result,
                responseTime: Date.now() - this.startTime
            };
            
            this.results.push(testResult);
            
            if (response.ok) {
                console.log('✅ Success:', result.message);
                if (result.reference) {
                    console.log('📧 Reference:', result.reference);
                }
            } else {
                console.log('❌ Failed:', result.message || result.error);
                if (result.details) {
                    console.log('Details:', result.details);
                }
            }
            
            return testResult;
            
        } catch (error) {
            console.log('💥 Network Error:', error.message);
            
            const testResult = {
                test: testName,
                status: 0,
                success: false,
                error: error.message,
                responseTime: Date.now() - this.startTime
            };
            
            this.results.push(testResult);
            return testResult;
        }
    }
    
    async testCORS() {
        console.log('\n🌐 Testing CORS...');
        
        try {
            const response = await fetch(CONFIG.WORKER_URL, {
                method: 'OPTIONS',
                headers: {
                    'Origin': 'https://dr-elsagher.com',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            });
            
            const corsHeaders = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            };
            
            console.log('CORS Headers:', corsHeaders);
            
            if (response.ok && corsHeaders['Access-Control-Allow-Origin']) {
                console.log('✅ CORS configured correctly');
                return true;
            } else {
                console.log('❌ CORS issues detected');
                return false;
            }
            
        } catch (error) {
            console.log('💥 CORS test failed:', error.message);
            return false;
        }
    }
    
    async testRateLimit() {
        console.log('\n⏱️ Testing Rate Limiting...');
        
        const requests = [];
        for (let i = 0; i < 6; i++) {
            requests.push(
                this.submitForm({
                    ...CONFIG.VALID_DATA,
                    name: `Rate Test ${i + 1}`,
                    email: `test${i}@example.com`
                }, `Rate Limit Test ${i + 1}/6`)
            );
        }
        
        const results = await Promise.all(requests);
        const blocked = results.filter(r => r.status === 429);
        
        if (blocked.length > 0) {
            console.log(`✅ Rate limiting working: ${blocked.length} requests blocked`);
            return true;
        } else {
            console.log('⚠️ Rate limiting may not be configured');
            return false;
        }
    }
    
    async runAllTests() {
        console.log('🚀 Starting Contact Form Tests');
        console.log('Worker URL:', CONFIG.WORKER_URL);
        console.log('=' .repeat(50));
        
        // Test CORS
        await this.testCORS();
        
        // Test valid submission
        await this.submitForm(CONFIG.VALID_DATA, 'Valid Form Submission');
        
        // Test validation errors
        await this.submitForm(CONFIG.INVALID_DATA, 'Invalid Data Validation');
        
        // Test spam detection
        await this.submitForm(CONFIG.SPAM_DATA, 'Spam Detection');
        
        // Test empty submission
        await this.submitForm({}, 'Empty Form Submission');
        
        // Test method not allowed
        try {
            const response = await fetch(CONFIG.WORKER_URL, { method: 'GET' });
            console.log('\n🚫 Testing GET method...');
            if (response.status === 405) {
                console.log('✅ GET method correctly blocked');
            } else {
                console.log('⚠️ GET method should return 405');
            }
        } catch (error) {
            console.log('💥 GET test failed:', error.message);
        }
        
        // Test rate limiting (commented out to avoid spamming)
        // await this.testRateLimit();
        
        this.printSummary();
    }
    
    printSummary() {
        console.log('\n' + '=' .repeat(50));
        console.log('📊 TEST SUMMARY');
        console.log('=' .repeat(50));
        
        const totalTests = this.results.length;
        const passedTests = this.results.filter(r => r.success).length;
        const failedTests = totalTests - passedTests;
        
        console.log(`Total Tests: ${totalTests}`);
        console.log(`✅ Passed: ${passedTests}`);
        console.log(`❌ Failed: ${failedTests}`);
        console.log(`Success Rate: ${(passedTests / totalTests * 100).toFixed(1)}%`);
        
        console.log('\nDetailed Results:');
        this.results.forEach((result, index) => {
            const status = result.success ? '✅' : '❌';
            console.log(`${index + 1}. ${status} ${result.test} (Status: ${result.status})`);
        });
        
        console.log('\n🎯 Next Steps:');
        if (passedTests === totalTests) {
            console.log('✅ All tests passed! Contact form is ready for production.');
        } else {
            console.log('⚠️ Some tests failed. Please review the issues above.');
        }
        
        console.log('\n📧 To verify email delivery:');
        console.log('1. Check clinic email inbox: dr.islam_elsagher@gmail.com');
        console.log('2. Check test email inbox for confirmation');
        console.log('3. Check spam/junk folders if emails not found');
        
        console.log('\n🔧 Troubleshooting:');
        console.log('- Update WORKER_URL in this script');
        console.log('- Check Cloudflare Worker logs: wrangler tail');
        console.log('- Verify email API keys are set');
        console.log('- Confirm CORS origins are correct');
    }
}

// Manual test data for browser testing
const manualTestData = {
    valid: CONFIG.VALID_DATA,
    invalid: CONFIG.INVALID_DATA,
    spam: CONFIG.SPAM_DATA
};

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactFormTester, CONFIG, manualTestData };
}

// Auto-run tests if script is executed directly
if (typeof window === 'undefined' && require.main === module) {
    console.log('📝 Contact Form Test Script');
    console.log('Update CONFIG.WORKER_URL before running tests');
    console.log('\nTo run tests:');
    console.log('1. Deploy your Cloudflare Worker');
    console.log('2. Update WORKER_URL in this script');
    console.log('3. Run: node test-contact-form.js');
}

// Browser testing function
function testContactFormInBrowser() {
    if (typeof window !== 'undefined') {
        console.log('🌐 Running Contact Form Tests in Browser');
        
        const tester = new ContactFormTester();
        tester.runAllTests().catch(error => {
            console.error('Test suite failed:', error);
        });
    }
}

// Make browser function available globally
if (typeof window !== 'undefined') {
    window.testContactForm = testContactFormInBrowser;
    window.ContactFormTester = ContactFormTester;
    window.testData = manualTestData;
    
    console.log('🧪 Contact Form Tester loaded!');
    console.log('Run: testContactForm() to start tests');
    console.log('Manual test data available in: window.testData');
}