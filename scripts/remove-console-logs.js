#!/usr/bin/env node

// Script to remove all console.log statements from production code
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function removeConsoleLogs(dir) {
    const files = readdirSync(dir);
    
    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        
        if (stat.isDirectory() && !file.includes('node_modules')) {
            removeConsoleLogs(filePath);
        } else if (file.endsWith('.js')) {
            let content = readFileSync(filePath, 'utf8');
            const originalLength = content.length;
            
            // Remove console.log, console.error, console.warn, console.debug, console.info
            content = content.replace(/console\.(log|error|warn|debug|info)\([^)]*\);?\s*/g, '');
            
            if (content.length !== originalLength) {
                writeFileSync(filePath, content);
                console.log(`✓ Cleaned: ${filePath}`);
            }
        }
    });
}

// Run the cleanup
console.log('Removing console statements from production code...');
removeConsoleLogs('./src');
console.log('✅ Console statements removed successfully!');