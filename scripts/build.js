#!/usr/bin/env node
/**
 * Build Script for Dr. Islam Website
 * Removes console.logs from production files and prepares for deployment
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

const PROJECT_ROOT = process.cwd();

// Files to exclude from console.log removal (test files, etc.)
const EXCLUDE_PATTERNS = [
    '**/node_modules/**',
    '**/test*/**',
    '**/*test*.js',
    '**/*Test*.js',
    '**/deployment-verification.js',
    '**/performance-test.js',
    '**/.wrangler/**',
    '**/docs/**',
    '**/playwright*'
];

// Files to include for console.log removal
const INCLUDE_PATTERNS = [
    'js/**/*.js',
    'src/**/*.js',
    'workers/**/*.js',
    'sw.js'
];

async function removeConsoleLogs() {
    console.log('🔧 Starting build process...');
    
    let totalRemoved = 0;
    let filesModified = 0;
    const modifiedFiles = [];
    
    try {
        // Find all JavaScript files to process
        const files = await glob(INCLUDE_PATTERNS, {
            ignore: EXCLUDE_PATTERNS,
            cwd: PROJECT_ROOT,
            absolute: true
        });
        
        console.log(`📁 Found ${files.length} production JavaScript files`);
        
        for (const filePath of files) {
            const content = readFileSync(filePath, 'utf8');
            const originalContent = content;
            
            // Remove console statements with regex
            // Match console.log/error/warn/info/debug/trace
            let processedContent = content
                // Remove standalone console statements
                .replace(/^\s*console\.(log|error|warn|info|debug|trace)\s*\([^)]*\);?\s*$/gm, '')
                // Remove console statements in catch blocks but preserve comments
                .replace(/console\.(log|error|warn|info|debug|trace)\s*\([^)]*\);?/g, '/* console logging disabled */');
            
            // Count removed statements
            const originalConsoleCount = (originalContent.match(/console\.(log|error|warn|info|debug|trace)/g) || []).length;
            const newConsoleCount = (processedContent.match(/console\.(log|error|warn|info|debug|trace)/g) || []).length;
            const removedCount = originalConsoleCount - newConsoleCount;
            
            if (processedContent !== originalContent) {
                writeFileSync(filePath, processedContent, 'utf8');
                const relativePath = path.relative(PROJECT_ROOT, filePath);
                console.log(`✅ Modified: ${relativePath} - Removed ${removedCount} console statements`);
                totalRemoved += removedCount;
                filesModified++;
                modifiedFiles.push(relativePath);
            }
        }
        
        // Generate build report
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportContent = `Build Report - ${timestamp}
Files Modified: ${filesModified}
Console Statements Removed: ${totalRemoved}

Modified Files:
${modifiedFiles.map(file => `- ${file}`).join('\n')}
`;
        
        writeFileSync(path.join(PROJECT_ROOT, 'scripts', `build-report-${timestamp.split('T')[0]}.txt`), reportContent);
        
        console.log('\n🎉 Build process completed successfully!');
        console.log(`📊 Files modified: ${filesModified}`);
        console.log(`🗑️  Console statements removed: ${totalRemoved}`);
        
        return { success: true, filesModified, totalRemoved };
        
    } catch (error) {
        console.error('❌ Build process failed:', error.message);
        process.exit(1);
    }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    removeConsoleLogs();
}

export { removeConsoleLogs };