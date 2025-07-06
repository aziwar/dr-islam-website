// Compliance Validator for dr-islam-website
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const checks = {
  structure: () => {
    const required = ['.claude', 'docs', 'scripts', 'css', 'js'];
    return required.every(dir => 
      fs.existsSync(path.join(projectRoot, dir))
    );
  },
  
  rtl: () => {
    const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
    return html.includes('dir="rtl"') && 
           html.includes('lang="ar"');
  },
  
  performance: () => {
    const workerPath = path.join(projectRoot, 'worker-seo.js');
    if (!fs.existsSync(workerPath)) return true; // Skip if not found
    const stats = fs.statSync(workerPath);
    return stats.size < 1024 * 1024; // Under 1MB
  },
  
  compliance: () => {
    return fs.existsSync(path.join(projectRoot, '.claude/DEVELOPMENT_RULES.md'));
  }
};

console.log('🔍 Compliance Check\n');
Object.entries(checks).forEach(([name, check]) => {
  const result = check() ? '✅' : '❌';
  console.log(`${result} ${name}`);
});

// Check for unused files
const unused = ['worker.js', 'worker-optimized.js'];
const toClean = unused.filter(f => 
  fs.existsSync(path.join(projectRoot, f))
);

if (toClean.length) {
  console.log(`\n⚠️  Clean up: ${toClean.join(', ')}`);
} else {
  console.log('\n✅ No unused files found');
}