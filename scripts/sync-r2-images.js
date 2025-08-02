// DR-ISLAM-WEBSITE R2 IMAGE SYNC AUTOMATION
// Prevents future production image failures

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'assets';
const BUCKET_NAME = 'dr-islam-images';

async function syncImagesToR2() {
    console.log('🔄 Starting R2 image sync...');
    console.log(`📁 Source: ${ASSETS_DIR}`);
    console.log(`☁️  Target: ${BUCKET_NAME}`);
    
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error(`❌ Assets directory not found: ${ASSETS_DIR}`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(ASSETS_DIR);
    const webpFiles = files.filter(file => file.endsWith('.webp'));
    
    console.log(`📊 Found ${webpFiles.length} WebP images to sync`);
    
    let uploaded = 0;
    let failed = 0;
    const failedFiles = [];
    
    for (const file of webpFiles) {
        try {
            const localPath = path.join(ASSETS_DIR, file);
            const r2Path = `assets/${file}`;
            
            console.log(`⬆️  Uploading: ${file}`);
            
            const command = `npx wrangler r2 object put "${BUCKET_NAME}/${r2Path}" --file="${localPath}"`;
            execSync(command, { stdio: 'pipe' });
            
            uploaded++;
            console.log(`✅ ${file} uploaded successfully`);
            
        } catch (error) {
            console.error(`❌ Failed to upload ${file}:`, error.message);
            failed++;
            failedFiles.push(file);
        }
    }
    
    console.log('\n📈 SYNC RESULTS:');
    console.log(`✅ Uploaded: ${uploaded} files`);
    console.log(`❌ Failed: ${failed} files`);
    
    if (failedFiles.length > 0) {
        console.log('⚠️  Failed files:', failedFiles.join(', '));
    }
    
    const success = failed === 0;
    console.log(`🎯 Overall result: ${success ? 'SUCCESS' : 'PARTIAL FAILURE'}`);
    
    return success;
}

// Execute if run directly
syncImagesToR2().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('💥 Sync failed:', error);
    process.exit(1);
});

export { syncImagesToR2 };
