// DR-ISLAM-WEBSITE IMAGE VERIFICATION SYSTEM (ES Module)
// Validates production image serving

import https from 'https';

const REQUIRED_IMAGES = [
    'favicon-16x16.webp',
    'favicon-32x32.webp', 
    'logo-main.webp',
    'logo-icon.webp',
    'case1-before.webp',
    'case1-after.webp',
    'case2-before.webp', 
    'case2-after.webp',
    'case3-before.webp',
    'case3-after.webp',
    'real-case1.webp',
    'real-case2.webp',
    'real-case3.webp',
    'showcase.webp'
];

const BASE_URL = 'https://dr-elsagher.com/assets';

async function verifyImages() {
    console.log('🔍 Verifying production image serving...');
    console.log(`🌐 Base URL: ${BASE_URL}`);
    console.log(`📊 Testing ${REQUIRED_IMAGES.length} critical images\n`);
    
    let passed = 0;
    let failed = 0;
    const results = [];
    
    for (const image of REQUIRED_IMAGES) {
        try {
            const url = `${BASE_URL}/${image}`;
            const start = Date.now();
            
            await checkImageUrl(url);
            
            const duration = Date.now() - start;
            console.log(`✅ ${image.padEnd(25)} - ${duration}ms`);
            
            results.push({
                image,
                status: 'OK',
                duration: `${duration}ms`,
                url
            });
            passed++;
            
        } catch (error) {
            console.log(`❌ ${image.padEnd(25)} - ${error.message}`);
            
            results.push({
                image,
                status: 'FAILED',
                error: error.message,
                url: `${BASE_URL}/${image}`
            });
            failed++;
        }
    }
    
    console.log('\n📈 VERIFICATION RESULTS:');
    console.log(`✅ Passed: ${passed}/${REQUIRED_IMAGES.length}`);
    console.log(`❌ Failed: ${failed}/${REQUIRED_IMAGES.length}`);
    console.log(`📊 Success Rate: ${((passed/REQUIRED_IMAGES.length)*100).toFixed(1)}%`);
    
    if (failed > 0) {
        console.log('\n⚠️  FAILED IMAGES:');
        results.filter(r => r.status === 'FAILED').forEach(r => {
            console.log(`   • ${r.image}: ${r.error}`);
        });
    }
    
    const success = failed === 0;
    console.log(`\n🎯 Overall Status: ${success ? 'ALL IMAGES SERVING' : 'ISSUES DETECTED'}`);
    
    return { success, results, passed, failed };
}

function checkImageUrl(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                resolve();
            } else {
                reject(new Error(`HTTP ${response.statusCode}`));
            }
        });
        
        request.on('error', (error) => {
            reject(new Error(`Network error: ${error.message}`));
        });
        
        request.setTimeout(10000, () => {
            request.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// Execute verification
verifyImages().then(({ success }) => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('💥 Verification failed:', error);
    process.exit(1);
});
