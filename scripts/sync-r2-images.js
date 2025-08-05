// DR-ISLAM-WEBSITE R2 IMAGE SYNC AUTOMATION
// Prevents future production image failures

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'assets';
const BUCKET_NAME = 'dr-islam-images';
const R2_ENDPOINT = '9a55d808300cfa4186a82af70ebbde03.r2.cloudflarestorage.com';

async function syncImagesToR2() {
    if (!fs.existsSync(ASSETS_DIR)) {
        process.exit(1);
    }
    
    const files = fs.readdirSync(ASSETS_DIR);
    const webpFiles = files.filter(file => file.endsWith('.webp'));
    
    let uploaded = 0;
    let failed = 0;
    const failedFiles = [];
    
    for (const file of webpFiles) {
        try {
            const localPath = path.join(ASSETS_DIR, file);
            const r2Path = `assets/${file}`;
            
            const command = `npx wrangler r2 object put "${BUCKET_NAME}/${r2Path}" --file="${localPath}"`;
            execSync(command, { stdio: 'pipe' });
            
            uploaded++;
            
        } catch (error) {
            failed++;
            failedFiles.push(file);
        }
    }
    
    const success = failed === 0;
    return success;
}

// Execute if run directly
syncImagesToR2().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    process.exit(1);
});

export { syncImagesToR2 };
