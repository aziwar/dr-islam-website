// Validation script for refactoring changes
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🧪 REFACTORING VALIDATION TEST\n');

// Test 1: Verify component files exist
const componentPaths = [
  '../src/templates/en/head.js',
  '../src/templates/en/header.js', 
  '../src/templates/en/sections/hero.js',
  '../src/templates/en/sections/services.js',
  '../src/templates/en/sections/about.js',
  '../src/templates/ar/head.js',
  '../src/templates/ar/header.js',
  '../src/styles/CSSManager.js'
];

let passedTests = 0;
let totalTests = 0;

console.log('📁 Component Structure Test:');
for (const componentPath of componentPaths) {
  totalTests++;
  const fullPath = path.join(__dirname, componentPath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${path.basename(componentPath)}`);
  if (exists) passedTests++;
}

// Test 2: Verify imports work
console.log('\n🔗 Import Validation Test:');
try {
  totalTests++;
  // Test English components
  const { getEnglishHead } = await import('../src/templates/en/head.js');
  const headContent = getEnglishHead();
  const hasTitle = headContent.includes('Dr. Islam Elsagher');
  console.log(`${hasTitle ? '✅' : '❌'} English head component works`);
  if (hasTitle) passedTests++;
  
  totalTests++;
  // Test Arabic components  
  const { getArabicHead } = await import('../src/templates/ar/head.js');
  const arabicHeadContent = getArabicHead();
  const hasArabicTitle = arabicHeadContent.includes('اسلام الصغير');
  console.log(`${hasArabicTitle ? '✅' : '❌'} Arabic head component works`);
  if (hasArabicTitle) passedTests++;
  
  totalTests++;
  // Test CSS Manager
  const { CSSManager } = await import('../src/styles/CSSManager.js');
  const cssManager = new CSSManager();
  const criticalCSS = cssManager.getCriticalCSS();
  const hasCriticalStyles = criticalCSS.includes(':root') || criticalCSS.includes('html');
  console.log(`${hasCriticalStyles ? '✅' : '❌'} CSS Manager works`);
  if (hasCriticalStyles) passedTests++;
  
} catch (error) {
  console.log(`❌ Import test failed: ${error.message}`);
}

// Test 3: Verify duplicate removal
console.log('\n🗑️  Duplicate Removal Test:');
totalTests++;
const duplicateGalleryAPI = fs.existsSync(path.join(__dirname, '../src/api/gallery-api.js'));
console.log(`${!duplicateGalleryAPI ? '✅' : '❌'} Duplicate gallery API removed`);
if (!duplicateGalleryAPI) passedTests++;

totalTests++;
const duplicateServiceWorker = fs.existsSync(path.join(__dirname, '../src/performance/ServiceWorker.js'));  
console.log(`${!duplicateServiceWorker ? '✅' : '❌'} Duplicate service worker removed`);
if (!duplicateServiceWorker) passedTests++;

// Final report
console.log('\n📊 VALIDATION RESULTS:');
console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
console.log(`📈 Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`);

if (passedTests === totalTests) {
  console.log('\n🎉 ALL TESTS PASSED - Refactoring successful!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed - Review needed');
  process.exit(1);
}