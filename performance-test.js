// Performance testing script to measure improvements
import { chromium } from 'playwright';

class PerformanceTester {
  constructor() {
    this.results = {
      before: {},
      after: {},
      improvements: {}
    };
  }

  async runTest(url, testName = 'default') {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      // Simulate mobile device
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
    });
    
    const page = await context.newPage();
    
    // Enable performance monitoring
    await page.addInitScript(() => {
      window.performanceMetrics = {
        navigationStart: performance.timeOrigin,
        entries: []
      };
      
      // Monitor all performance entries
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          window.performanceMetrics.entries.push({
            name: entry.name,
            type: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration,
            transferSize: entry.transferSize,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize
          });
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint'] });
    });
    
    console.log(`\n🧪 Testing: ${testName}`);
    console.log(`📍 URL: ${url}`);
    
    const startTime = Date.now();
    
    try {
      // Navigate and wait for load
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for critical content
      await page.waitForSelector('.hero h1', { timeout: 10000 });
      
      // Get performance metrics
      const metrics = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const paintMetrics = performance.getEntriesByType('paint');
        const lcpMetrics = performance.getEntriesByType('largest-contentful-paint');
        
        return {
          // Navigation timing
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          
          // Paint timing
          firstPaint: paintMetrics.find(m => m.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paintMetrics.find(m => m.name === 'first-contentful-paint')?.startTime || 0,
          
          // LCP
          largestContentfulPaint: lcpMetrics[lcpMetrics.length - 1]?.startTime || 0,
          
          // Resource analysis
          totalResources: window.performanceMetrics.entries.filter(e => e.type === 'resource').length,
          totalTransferSize: window.performanceMetrics.entries
            .filter(e => e.type === 'resource')
            .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          
          // CSS resources
          cssResources: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && e.name.includes('.css')).length,
          cssTransferSize: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && e.name.includes('.css'))
            .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          
          // Image resources
          imageResources: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && (e.name.includes('.jpg') || e.name.includes('.png') || e.name.includes('.webp'))).length,
          imageTransferSize: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && (e.name.includes('.jpg') || e.name.includes('.png') || e.name.includes('.webp')))
            .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          
          // JavaScript resources
          jsResources: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && e.name.includes('.js')).length,
          jsTransferSize: window.performanceMetrics.entries
            .filter(e => e.type === 'resource' && e.name.includes('.js'))
            .reduce((sum, entry) => sum + (entry.transferSize || 0), 0)
        };
      });
      
      // Calculate total test time
      const totalTime = Date.now() - startTime;
      
      // Display results
      console.log(`\n📊 Performance Results:`);
      console.log(`⏱️  Total Test Time: ${totalTime}ms`);
      console.log(`🎨 First Paint: ${Math.round(metrics.firstPaint)}ms`);
      console.log(`🖼️  First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
      console.log(`🏆 Largest Contentful Paint: ${Math.round(metrics.largestContentfulPaint)}ms`);
      console.log(`📄 DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
      console.log(`✅ Load Complete: ${Math.round(metrics.loadComplete)}ms`);
      
      console.log(`\n📦 Resource Analysis:`);
      console.log(`📁 Total Resources: ${metrics.totalResources}`);
      console.log(`📊 Total Transfer Size: ${(metrics.totalTransferSize / 1024).toFixed(1)}KB`);
      console.log(`🎨 CSS Resources: ${metrics.cssResources} (${(metrics.cssTransferSize / 1024).toFixed(1)}KB)`);
      console.log(`🖼️  Image Resources: ${metrics.imageResources} (${(metrics.imageTransferSize / 1024).toFixed(1)}KB)`);
      console.log(`⚙️  JS Resources: ${metrics.jsResources} (${(metrics.jsTransferSize / 1024).toFixed(1)}KB)`);
      
      // Performance scoring
      const score = this.calculatePerformanceScore(metrics);
      console.log(`\n🏅 Performance Score: ${score.total}/100`);
      console.log(`   - Speed: ${score.speed}/40`);
      console.log(`   - Efficiency: ${score.efficiency}/30`);
      console.log(`   - Best Practices: ${score.practices}/30`);
      
      await browser.close();
      return { ...metrics, score, totalTime };
      
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
      await browser.close();
      return null;
    }
  }

  calculatePerformanceScore(metrics) {
    // Speed score (40 points)
    let speedScore = 40;
    if (metrics.firstContentfulPaint > 3000) speedScore -= 15;
    else if (metrics.firstContentfulPaint > 2000) speedScore -= 10;
    else if (metrics.firstContentfulPaint > 1500) speedScore -= 5;
    
    if (metrics.largestContentfulPaint > 4000) speedScore -= 15;
    else if (metrics.largestContentfulPaint > 2500) speedScore -= 10;
    else if (metrics.largestContentfulPaint > 2000) speedScore -= 5;
    
    // Efficiency score (30 points)
    let efficiencyScore = 30;
    const totalSizeKB = metrics.totalTransferSize / 1024;
    if (totalSizeKB > 2000) efficiencyScore -= 15;
    else if (totalSizeKB > 1500) efficiencyScore -= 10;
    else if (totalSizeKB > 1000) efficiencyScore -= 5;
    
    if (metrics.totalResources > 50) efficiencyScore -= 10;
    else if (metrics.totalResources > 30) efficiencyScore -= 5;
    
    // Best practices score (30 points)
    let practicesScore = 30;
    if (metrics.cssResources > 3) practicesScore -= 5;
    if (metrics.jsResources > 5) practicesScore -= 5;
    if (metrics.imageResources > 20) practicesScore -= 5;
    
    return {
      speed: Math.max(0, speedScore),
      efficiency: Math.max(0, efficiencyScore),
      practices: Math.max(0, practicesScore),
      total: Math.max(0, speedScore + efficiencyScore + practicesScore)
    };
  }

  async comparePerformance(beforeUrl, afterUrl) {
    console.log('🔄 Running Performance Comparison...\n');
    
    const beforeResults = await this.runTest(beforeUrl, 'BEFORE Optimizations');
    const afterResults = await this.runTest(afterUrl, 'AFTER Optimizations');
    
    if (!beforeResults || !afterResults) {
      console.error('❌ Unable to complete comparison');
      return;
    }
    
    console.log(`\n📈 Performance Improvements:`);
    
    const improvements = {
      fcp: ((beforeResults.firstContentfulPaint - afterResults.firstContentfulPaint) / beforeResults.firstContentfulPaint * 100),
      lcp: ((beforeResults.largestContentfulPaint - afterResults.largestContentfulPaint) / beforeResults.largestContentfulPaint * 100),
      transferSize: ((beforeResults.totalTransferSize - afterResults.totalTransferSize) / beforeResults.totalTransferSize * 100),
      resources: beforeResults.totalResources - afterResults.totalResources,
      score: afterResults.score.total - beforeResults.score.total
    };
    
    console.log(`🎨 First Contentful Paint: ${improvements.fcp > 0 ? '↓' : '↑'} ${Math.abs(improvements.fcp).toFixed(1)}%`);
    console.log(`🏆 Largest Contentful Paint: ${improvements.lcp > 0 ? '↓' : '↑'} ${Math.abs(improvements.lcp).toFixed(1)}%`);
    console.log(`📦 Transfer Size: ${improvements.transferSize > 0 ? '↓' : '↑'} ${Math.abs(improvements.transferSize).toFixed(1)}%`);
    console.log(`📁 Resource Count: ${improvements.resources > 0 ? '↓' : '↑'} ${Math.abs(improvements.resources)} resources`);
    console.log(`🏅 Overall Score: ${improvements.score > 0 ? '↑' : '↓'} ${Math.abs(improvements.score)} points`);
    
    return improvements;
  }
}

// Run performance test
async function runPerformanceTest() {
  const tester = new PerformanceTester();
  
  // Test local development server
  const testUrl = process.argv[2] || 'http://localhost:8787';
  console.log('🚀 Starting Performance Analysis...');
  
  await tester.runTest(testUrl, 'Current Version');
  
  console.log('\n✨ Test completed!');
  console.log('\n💡 Recommendations:');
  console.log('   - Implement critical CSS inlining');
  console.log('   - Use WebP images with fallbacks');
  console.log('   - Enable lazy loading for below-fold content');
  console.log('   - Minimize JavaScript execution on initial load');
  console.log('   - Consider service worker caching strategies');
}

// Run if called directly
runPerformanceTest().catch(console.error);

export { PerformanceTester };