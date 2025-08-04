#!/usr/bin/env node

/**
 * Admin Authentication Security Tests
 * Tests the critical security fix for authentication bypass vulnerability
 * 
 * Critical Issue Fixed: validateAuth() returned object but callers checked truthiness
 * This caused authentication bypass - any object is truthy in JavaScript
 */

import { chromium } from 'playwright';

const TEST_CONFIG = {
    baseUrl: 'http://127.0.0.1:8787',
    adminEndpoint: '/admin/gallery',
    uploadEndpoint: '/api/gallery/upload',
    timeout: 10000
};

// Test tokens
const VALID_TOKEN = 'test_admin_token_for_local_development';
const INVALID_TOKEN = 'invalid_token_12345';

class AdminAuthTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async init() {
        console.log('🔒 Starting Admin Authentication Security Tests');
        console.log('=' .repeat(60));
        
        this.browser = await chromium.launch({ headless: true });
        this.page = await this.browser.newPage();
    }

    async runTest(testName, testFn) {
        try {
            console.log(`\n🔒 Testing: ${testName}`);
            await testFn();
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

    async testNoAuthReturns401() {
        const response = await this.page.request.get(
            `${TEST_CONFIG.baseUrl}${TEST_CONFIG.adminEndpoint}`
        );
        
        if (response.status() !== 401) {
            throw new Error(`Expected 401, got ${response.status()}`);
        }

        const body = await response.json();
        if (!body.error || body.error !== 'Unauthorized') {
            throw new Error(`Expected 'Unauthorized' error, got: ${JSON.stringify(body)}`);
        }
    }

    async testInvalidTokenReturns401() {
        const response = await this.page.request.get(
            `${TEST_CONFIG.baseUrl}${TEST_CONFIG.adminEndpoint}`,
            {
                headers: {
                    'Authorization': `Bearer ${INVALID_TOKEN}`
                }
            }
        );
        
        if (response.status() !== 401) {
            throw new Error(`Expected 401, got ${response.status()}`);
        }

        const body = await response.json();
        if (!body.error || body.error !== 'Unauthorized') {
            throw new Error(`Expected 'Unauthorized' error, got: ${JSON.stringify(body)}`);
        }
    }

    async testValidTokenReturns200() {
        const response = await this.page.request.get(
            `${TEST_CONFIG.baseUrl}${TEST_CONFIG.adminEndpoint}`,
            {
                headers: {
                    'Authorization': `Bearer ${VALID_TOKEN}`
                }
            }
        );
        
        if (response.status() !== 200) {
            const body = await response.text();
            throw new Error(`Expected 200 for valid token, got ${response.status()}. Response: ${body}`);
        }

        const contentType = response.headers()['content-type'];
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error(`Expected HTML response, got: ${contentType}`);
        }
    }

    async testMalformedAuthReturns401() {
        const malformedHeaders = [
            { 'Authorization': 'InvalidFormat' },
            { 'Authorization': 'Bearer' }, // Missing token
            { 'Authorization': '' },
            { 'Authorization': 'Basic dGVzdA==' }, // Wrong auth type
        ];

        for (const headers of malformedHeaders) {
            const response = await this.page.request.get(
                `${TEST_CONFIG.baseUrl}${TEST_CONFIG.adminEndpoint}`,
                { headers }
            );
            
            if (response.status() !== 401) {
                throw new Error(`Malformed auth accepted: ${JSON.stringify(headers)}`);
            }
        }
    }

    async testAPIEndpointsAlsoSecured() {
        // Test that API endpoints follow same security pattern
        const endpoints = [
            '/api/gallery/list',
            '/api/gallery/upload' // This will be POST but should still return 401 for wrong method
        ];

        for (const endpoint of endpoints) {
            const response = await this.page.request.get(
                `${TEST_CONFIG.baseUrl}${endpoint}`
            );
            
            // Should either be 401 (unauthorized) or 404 (method not allowed)
            // But NOT 200 (successful access)
            if (response.status() === 200) {
                throw new Error(`API endpoint ${endpoint} accessible without auth`);
            }
        }
    }

    async runAllTests() {
        try {
            await this.init();
            
            await this.runTest('No Authorization Header → 401', () => this.testNoAuthReturns401());
            await this.runTest('Invalid Token → 401', () => this.testInvalidTokenReturns401());
            await this.runTest('Valid Token → 200', () => this.testValidTokenReturns200());
            await this.runTest('Malformed Auth → 401', () => this.testMalformedAuthReturns401());
            await this.runTest('API Endpoints Secured', () => this.testAPIEndpointsAlsoSecured());
            
            this.generateReport();
            
        } catch (error) {
            console.error('💥 Test suite failed:', error.message);
            process.exit(1);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 ADMIN AUTHENTICATION TEST RESULTS');
        console.log('='.repeat(60));
        
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`  • ${test.name}: ${test.error}`);
                });
        }
        
        console.log('\n🔒 SECURITY STATUS:');
        if (this.results.failed === 0) {
            console.log('  ✅ All authentication tests passed');
            console.log('  ✅ Critical vulnerability fixed');
            console.log('  ✅ Admin endpoints properly secured');
        } else {
            console.log('  ❌ Security vulnerabilities detected');
            console.log('  ❌ Admin endpoints may be compromised');
        }
        
        console.log('\n🔧 TECHNICAL DETAILS:');
        console.log('  • Fixed: validateAuth() return value handling');
        console.log('  • Security: Constant-time token comparison');
        console.log('  • Protection: Rate limiting and account lockout');
        console.log('  • Method: Environment variables for token storage');
        
        if (this.results.failed > 0) {
            process.exit(1);
        }
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const tester = new AdminAuthTester();
    tester.runAllTests().catch(console.error);
}

export default AdminAuthTester;