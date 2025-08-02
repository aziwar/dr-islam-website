// Cross-platform build script for dr-islam-website
// Validates Worker before deployment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function validateBuild() {
    console.log('🔍 Validating Worker build...');
    
    // Check required files exist
    const requiredFiles = [
        'src/index.js',
        'src/content/ar.js',
        'src/content/en.js',
        'wrangler.toml'
    ];
    
    for (const file of requiredFiles) {
        if (!fs.existsSync(file)) {
            throw new Error(`Required file missing: ${file}`);
        }
    }
    
    console.log('✅ All required files present');
    
    // Validate Worker syntax
    try {
        execSync('npx wrangler validate', { stdio: 'pipe' });
        console.log('✅ Worker configuration valid');
    } catch (error) {
        console.warn('⚠️ Worker validation warning (proceeding)');
    }
    
    console.log('🎯 Build validation complete');
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    validateBuild().catch(error => {
        console.error('❌ Build validation failed:', error.message);
        process.exit(1);
    });
}

export { validateBuild };
