// Console Log Cleanup Script - Remove debug logs, keep essential ones
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ESSENTIAL_PATTERNS = [
  'console.error',
  'console.warn', 
  'Service Worker',
  'PWA',
  'Error:',
  'Failed:',
  '❌',
  '⚠️',
  '✅',
  'registration'
];

function shouldKeepConsoleLog(line) {
  const cleanLine = line.trim();
  
  // Keep essential logging
  if (ESSENTIAL_PATTERNS.some(pattern => cleanLine.includes(pattern))) {
    return true;
  }
  
  // Keep error handling
  if (cleanLine.includes('catch') || cleanLine.includes('error')) {
    return true;
  }
  
  return false;
}

function cleanupFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const cleanedLines = [];
  let removedCount = 0;
  
  for (const line of lines) {
    if (line.includes('console.log') && !shouldKeepConsoleLog(line)) {
      removedCount++;
      continue;
    }
    cleanedLines.push(line);
  }
  
  if (removedCount > 0) {
    fs.writeFileSync(filePath, cleanedLines.join('\n'));
    console.log(`✅ ${path.basename(filePath)}: Removed ${removedCount} debug console.log statements`);
  }
  
  return removedCount;
}

const filesToClean = [
  'src/shared/common-content.js',
  'src/performance/CSSOptimizer.js',
  'src/performance/ImageOptimizer.js',
  'src/premium/PremiumFeaturesSystem.js',
  'src/security/EnterpriseSecuritySystem.js'
];

let totalRemoved = 0;
for (const file of filesToClean) {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    totalRemoved += cleanupFile(fullPath);
  }
}

console.log(`\n🎯 Total removed: ${totalRemoved} debug console.log statements`);
console.log('✅ Essential error/warning logs preserved');