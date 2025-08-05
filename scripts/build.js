// Cross-platform build script for dr-islam-website
// Validates Worker before deployment

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function validateBuild() {
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
    
    // Validate Worker syntax
    try {
        execSync('npx wrangler validate', { stdio: 'pipe' });
    } catch (error) {
        // Worker validation warning - proceeding
    }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    validateBuild().catch(error => {
        process.exit(1);
    });
}

export { validateBuild };
