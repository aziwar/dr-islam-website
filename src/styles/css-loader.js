// CSS-LOADER.JS - Progressive CSS Loading Coordinator
// Orchestrates the loading of modular CSS architecture with performance optimization

class CSSLoader {
  constructor() {
    this.loadedStyles = new Set();
    this.loadingPromises = new Map();
    this.criticalLoaded = false;
    this.performanceMetrics = {
      startTime: performance.now(),
      criticalTime: null,
      layoutTime: null,
      componentsTime: null,
      utilitiesTime: null,
      enhancementsTime: null,
      totalTime: null
    };
    
    // CSS loading sequence configuration
    this.cssModules = [
      {
        id: 'critical',
        file: '/src/styles/critical.css.js',
        priority: 1,
        inline: true,
        size: '≤15KB'
      },
      {
        id: 'responsive-containers',
        file: '/src/styles/responsive-containers.css.js',
        priority: 2,
        dependencies: ['critical'],
        delay: 50
      },
      {
        id: 'layout',
        file: '/src/styles/layout.css.js',
        priority: 2,
        dependencies: ['critical'],
        delay: 75
      },
      {
        id: 'navigation-touch',
        file: '/src/styles/navigation-touch.css.js',
        priority: 3,
        dependencies: ['critical', 'responsive-containers'],
        delay: 100
      },
      {
        id: 'booking-widget-responsive',
        file: '/src/styles/booking-widget-responsive.css.js',
        priority: 3,
        dependencies: ['responsive-containers'],
        delay: 125
      },
      {
        id: 'components',
        file: '/src/styles/components.css.js',
        priority: 3,
        dependencies: ['critical', 'layout'],
        delay: 150
      },
      {
        id: 'utilities',
        file: '/src/styles/utilities.css.js',
        priority: 4,
        dependencies: ['components'],
        delay: 175
      },
      {
        id: 'container-query-fallbacks',
        file: '/src/styles/container-query-fallbacks.css.js',
        priority: 4,
        dependencies: ['responsive-containers'],
        delay: 200
      },
      {
        id: 'enhancements',
        file: '/src/styles/enhancements.css.js',
        priority: 5,
        dependencies: ['utilities'],
        delay: 225
      }
    ];
    
    this.init();
  }
  
  async init() {
    try {
      console.log('🎨 CSS Loader: Initializing modular CSS architecture');
      
      // Load critical CSS immediately (inline)
      await this.loadCriticalCSS();
      
      // Wait for DOM ready before loading non-critical CSS
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.loadNonCriticalCSS());
      } else {
        this.loadNonCriticalCSS();
      }
      
      // Initialize performance monitoring
      this.initPerformanceMonitoring();
      
    } catch (error) {
      console.error('CSS Loader initialization failed:', error);
    }
  }
  
  async loadCriticalCSS() {
    const startTime = performance.now();
    
    try {
      // Import critical CSS module
      const { CRITICAL_CSS } = await import('./critical.css.js');
      
      // Check if critical CSS is already loaded
      if (document.getElementById('critical-css')) {
        console.log('🎨 Critical CSS already loaded');
        return;
      }
      
      // Create and inject critical CSS
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.innerHTML = CRITICAL_CSS;
      
      // Insert at the beginning for proper layer ordering
      const firstStyle = document.head.querySelector('style, link[rel="stylesheet"]');
      if (firstStyle) {
        document.head.insertBefore(style, firstStyle);
      } else {
        document.head.appendChild(style);
      }
      
      this.loadedStyles.add('critical');
      this.criticalLoaded = true;
      this.performanceMetrics.criticalTime = performance.now() - startTime;
      
      console.log(`✅ Critical CSS loaded (${this.performanceMetrics.criticalTime.toFixed(2)}ms)`);
      
      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('criticalCSSLoaded', {
        detail: { loadTime: this.performanceMetrics.criticalTime }
      }));
      
    } catch (error) {
      console.error('Failed to load critical CSS:', error);
    }
  }
  
  async loadNonCriticalCSS() {
    if (!this.criticalLoaded) {
      console.warn('Critical CSS not loaded, waiting...');
      await new Promise(resolve => {
        document.addEventListener('criticalCSSLoaded', resolve, { once: true });
      });
    }
    
    console.log('🚀 Loading non-critical CSS modules...');
    
    // Load CSS modules in priority order with dependencies
    const sortedModules = this.cssModules
      .filter(module => module.id !== 'critical')
      .sort((a, b) => a.priority - b.priority);
    
    // Group modules by priority for concurrent loading within priority levels
    const priorityGroups = this.groupBy(sortedModules, 'priority');
    
    for (const [priority, modules] of priorityGroups) {
      console.log(`📦 Loading priority ${priority} CSS modules:`, modules.map(m => m.id));
      
      // Load modules in this priority level concurrently
      const loadPromises = modules.map(module => this.loadCSSModule(module));
      await Promise.all(loadPromises);
    }
    
    this.performanceMetrics.totalTime = performance.now() - this.performanceMetrics.startTime;
    console.log(`🎯 All CSS modules loaded (${this.performanceMetrics.totalTime.toFixed(2)}ms total)`);
    
    // Dispatch completion event
    document.dispatchEvent(new CustomEvent('allCSSLoaded', {
      detail: { 
        totalTime: this.performanceMetrics.totalTime,
        metrics: this.performanceMetrics
      }
    }));
    
    // Generate performance report
    this.generatePerformanceReport();
  }
  
  async loadCSSModule(module) {
    const moduleId = module.id;
    
    // Check if already loaded or loading
    if (this.loadedStyles.has(moduleId)) {
      return;
    }
    
    if (this.loadingPromises.has(moduleId)) {
      return this.loadingPromises.get(moduleId);
    }
    
    // Check dependencies
    if (module.dependencies) {
      const unmetDependencies = module.dependencies.filter(dep => !this.loadedStyles.has(dep));
      if (unmetDependencies.length > 0) {
        console.log(`⏳ ${moduleId}: Waiting for dependencies: ${unmetDependencies.join(', ')}`);
        // Wait for dependencies
        await Promise.all(
          unmetDependencies.map(dep => 
            new Promise(resolve => {
              const checkDependency = () => {
                if (this.loadedStyles.has(dep)) {
                  resolve();
                } else {
                  setTimeout(checkDependency, 10);
                }
              };
              checkDependency();
            })
          )
        );
      }
    }
    
    const loadPromise = this.doLoadCSSModule(module);
    this.loadingPromises.set(moduleId, loadPromise);
    
    return loadPromise;
  }
  
  async doLoadCSSModule(module) {
    const startTime = performance.now();
    const moduleId = module.id;
    
    try {
      // Add delay if specified
      if (module.delay) {
        await new Promise(resolve => setTimeout(resolve, module.delay));
      }
      
      // Check if already loaded (might have been loaded during delay)
      if (document.getElementById(`${moduleId}-css`)) {
        console.log(`🎨 ${moduleId}: Already loaded`);
        return;
      }
      
      // Dynamic import of CSS module
      let cssContent;
      
      switch (moduleId) {
        case 'responsive-containers':
          const { RESPONSIVE_CONTAINERS_CSS } = await import('./responsive-containers.css.js');
          cssContent = RESPONSIVE_CONTAINERS_CSS;
          break;
        case 'layout':
          const { LAYOUT_CSS } = await import('./layout.css.js');
          cssContent = LAYOUT_CSS;
          break;
        case 'navigation-touch':
          const { NAVIGATION_TOUCH_CSS } = await import('./navigation-touch.css.js');
          cssContent = NAVIGATION_TOUCH_CSS;
          break;
        case 'booking-widget-responsive':
          const { BOOKING_WIDGET_RESPONSIVE_CSS } = await import('./booking-widget-responsive.css.js');
          cssContent = BOOKING_WIDGET_RESPONSIVE_CSS;
          break;
        case 'components':
          const { COMPONENTS_CSS } = await import('./components.css.js');
          cssContent = COMPONENTS_CSS;
          break;
        case 'utilities':
          const { UTILITIES_CSS } = await import('./utilities.css.js');
          cssContent = UTILITIES_CSS;
          break;
        case 'container-query-fallbacks':
          const { CONTAINER_QUERY_FALLBACKS_CSS } = await import('./container-query-fallbacks.css.js');
          cssContent = CONTAINER_QUERY_FALLBACKS_CSS;
          break;
        case 'enhancements':
          const { ENHANCEMENTS_CSS } = await import('./enhancements.css.js');
          cssContent = ENHANCEMENTS_CSS;
          break;
        default:
          throw new Error(`Unknown CSS module: ${moduleId}`);
      }
      
      // Create and inject CSS
      const style = document.createElement('style');
      style.id = `${moduleId}-css`;
      style.innerHTML = cssContent;
      document.head.appendChild(style);
      
      const loadTime = performance.now() - startTime;
      this.performanceMetrics[`${moduleId}Time`] = loadTime;
      this.loadedStyles.add(moduleId);
      
      console.log(`✅ ${moduleId}: Loaded (${loadTime.toFixed(2)}ms)`);
      
      // Dispatch module loaded event
      document.dispatchEvent(new CustomEvent('cssModuleLoaded', {
        detail: { 
          moduleId, 
          loadTime,
          size: module.size || 'unknown'
        }
      }));
      
    } catch (error) {
      console.error(`❌ Failed to load CSS module "${moduleId}":`, error);
    } finally {
      this.loadingPromises.delete(moduleId);
    }
  }
  
  initPerformanceMonitoring() {
    // Monitor Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`📊 LCP: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support this entry type
        console.log('LCP monitoring not supported');
      }
    }
    
    // Monitor First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            console.log(`📊 FCP: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.log('FCP monitoring not supported');
      }
    }
  }
  
  generatePerformanceReport() {
    const report = {
      totalLoadTime: this.performanceMetrics.totalTime,
      criticalPath: this.performanceMetrics.criticalTime,
      modules: Object.keys(this.performanceMetrics)
        .filter(key => key.endsWith('Time') && key !== 'totalTime')
        .map(key => ({
          module: key.replace('Time', ''),
          loadTime: this.performanceMetrics[key]
        }))
        .sort((a, b) => b.loadTime - a.loadTime),
      recommendations: this.generateRecommendations()
    };
    
    console.group('📈 CSS Loading Performance Report');
    console.table(report.modules);
    console.log(`🎯 Total Load Time: ${report.totalLoadTime.toFixed(2)}ms`);
    console.log(`⚡ Critical Path: ${report.criticalPath.toFixed(2)}ms`);
    
    if (report.recommendations.length > 0) {
      console.group('💡 Recommendations');
      report.recommendations.forEach(rec => console.log(`• ${rec}`));
      console.groupEnd();
    }
    
    console.groupEnd();
    
    return report;
  }
  
  generateRecommendations() {
    const recommendations = [];
    
    if (this.performanceMetrics.criticalTime > 50) {
      recommendations.push('Critical CSS load time > 50ms - consider reducing critical CSS size');
    }
    
    if (this.performanceMetrics.totalTime > 500) {
      recommendations.push('Total CSS load time > 500ms - consider preloading key modules');
    }
    
    const slowModules = Object.keys(this.performanceMetrics)
      .filter(key => key.endsWith('Time') && this.performanceMetrics[key] > 100)
      .map(key => key.replace('Time', ''));
    
    if (slowModules.length > 0) {
      recommendations.push(`Slow loading modules detected: ${slowModules.join(', ')} - consider optimization`);
    }
    
    return recommendations;
  }
  
  groupBy(array, key) {
    return array.reduce((groups, item) => {
      const value = item[key];
      if (!groups.has(value)) {
        groups.set(value, []);
      }
      groups.get(value).push(item);
      return groups;
    }, new Map());
  }
  
  // Public API methods
  isLoaded(moduleId) {
    return this.loadedStyles.has(moduleId);
  }
  
  async waitForModule(moduleId) {
    if (this.isLoaded(moduleId)) {
      return;
    }
    
    return new Promise(resolve => {
      const checkModule = () => {
        if (this.isLoaded(moduleId)) {
          resolve();
        } else {
          setTimeout(checkModule, 10);
        }
      };
      checkModule();
    });
  }
  
  async waitForAll() {
    return new Promise(resolve => {
      document.addEventListener('allCSSLoaded', resolve, { once: true });
    });
  }
  
  getMetrics() {
    return { ...this.performanceMetrics };
  }
  
  getLoadedModules() {
    return Array.from(this.loadedStyles);
  }
}

// Initialize CSS Loader
const cssLoader = new CSSLoader();

// Export for external use
if (typeof window !== 'undefined') {
  window.CSSLoader = cssLoader;
}

export default cssLoader;