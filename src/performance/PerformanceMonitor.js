// PERFORMANCE MONITOR - Comprehensive Core Web Vitals and performance tracking
// Advanced performance monitoring system for Dr. Islam dental practice website

export class PerformanceMonitor {
  
  constructor(options = {}) {
    this.config = {
      // Core Web Vitals thresholds (Google's "good" thresholds)
      thresholds: {
        lcp: 2500,      // Largest Contentful Paint: < 2.5s
        fid: 100,       // First Input Delay: < 100ms
        cls: 0.1,       // Cumulative Layout Shift: < 0.1
        fcp: 1800,      // First Contentful Paint: < 1.8s
        tti: 3800,      // Time to Interactive: < 3.8s
        fmp: 2000       // First Meaningful Paint: < 2s
      },
      
      // Performance budgets for medical website
      budgets: {
        totalPageWeight: 2000000,    // 2MB total page weight
        imageWeight: 1000000,        // 1MB for images
        jsWeight: 500000,            // 500KB for JavaScript
        cssWeight: 200000,           // 200KB for CSS
        criticalRenderPath: 14000    // 14KB critical resources
      },
      
      // Monitoring settings
      sampleRate: 1.0,               // Monitor 100% of page loads
      reportingInterval: 30000,      // Report every 30 seconds
      enableRealTimeAlerts: true,    // Enable performance alerts
      enableResourceTiming: true,    // Track resource performance
      enableUserTiming: true,        // Track custom performance marks
      
      // Medical website specific settings
      trackBookingFlow: true,        // Monitor appointment booking performance
      trackFormSubmissions: true,    // Monitor contact form performance
      trackGalleryLoading: true,     // Monitor image gallery performance
      trackEmergencyContact: true,   // Critical: emergency contact speed
      
      ...options
    };

    // Performance data storage
    this.metrics = {
      coreWebVitals: {},
      resourceTiming: [],
      userTiming: [],
      customMetrics: {},
      performanceEntries: [],
      budgetViolations: [],
      alerts: []
    };

    // Performance observers
    this.observers = new Map();
    this.reportingTimer = null;
    this.sessionId = this.generateSessionId();
    
    // Integration with existing systems
    this.integrations = {
      serviceWorker: null,
      moduleSystem: null,
      imageOptimizer: null,
      cssOptimizer: null
    };

    this.init();
  }

  /**
   * Initialize performance monitoring system
   */
  async init() {
    try {
      console.log('🚀 Initializing Performance Monitor...');
      
      // Set up performance observers
      this.setupCoreWebVitalsTracking();
      this.setupResourceTimingTracking();
      this.setupUserTimingTracking();
      this.setupCustomMetricsTracking();
      
      // Initialize integrations
      await this.initializeIntegrations();
      
      // Start reporting
      this.startPerformanceReporting();
      
      // Set up emergency performance monitoring
      this.setupEmergencyMonitoring();
      
      // Medical website specific tracking
      this.setupMedicalWebsiteTracking();
      
      console.log('✅ Performance Monitor initialized successfully');
      
      // Send initial performance baseline
      this.reportPerformanceBaseline();
      
    } catch (error) {
      console.error('❌ Performance Monitor initialization failed:', error);
    }
  }

  /**
   * Set up Core Web Vitals tracking using PerformanceObserver
   */
  setupCoreWebVitalsTracking() {
    if (!('PerformanceObserver' in window)) {
      console.warn('⚠️ PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.coreWebVitals.lcp = lastEntry.startTime;
      this.evaluateMetric('LCP', lastEntry.startTime, this.config.thresholds.lcp);
      
      console.log(`📊 LCP: ${Math.round(lastEntry.startTime)}ms`);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);
    } catch (error) {
      console.warn('LCP observer setup failed:', error);
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime;
        this.metrics.coreWebVitals.fid = fid;
        this.evaluateMetric('FID', fid, this.config.thresholds.fid);
        
        console.log(`📊 FID: ${Math.round(fid)}ms`);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    } catch (error) {
      console.warn('FID observer setup failed:', error);
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.coreWebVitals.cls = clsValue;
          this.evaluateMetric('CLS', clsValue, this.config.thresholds.cls);
        }
      });
      
      if (clsValue > 0) {
        console.log(`📊 CLS: ${clsValue.toFixed(3)}`);
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    } catch (error) {
      console.warn('CLS observer setup failed:', error);
    }

    // First Contentful Paint (FCP)
    const paintObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.coreWebVitals.fcp = entry.startTime;
          this.evaluateMetric('FCP', entry.startTime, this.config.thresholds.fcp);
          
          console.log(`📊 FCP: ${Math.round(entry.startTime)}ms`);
        }
      });
    });

    try {
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('paint', paintObserver);
    } catch (error) {
      console.warn('Paint observer setup failed:', error);
    }
  }

  /**
   * Set up resource timing tracking
   */
  setupResourceTimingTracking() {
    if (!this.config.enableResourceTiming) return;

    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        const resourceData = {
          name: entry.name,
          type: this.getResourceType(entry.name),
          duration: entry.duration,
          transferSize: entry.transferSize || 0,
          encodedBodySize: entry.encodedBodySize || 0,
          decodedBodySize: entry.decodedBodySize || 0,
          startTime: entry.startTime,
          responseEnd: entry.responseEnd,
          timestamp: Date.now()
        };
        
        this.metrics.resourceTiming.push(resourceData);
        
        // Check performance budgets
        this.checkResourceBudget(resourceData);
        
        // Track critical resources
        if (this.isCriticalResource(entry.name)) {
          this.trackCriticalResourcePerformance(resourceData);
        }
      });
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);
    } catch (error) {
      console.warn('Resource timing observer setup failed:', error);
    }
  }

  /**
   * Set up user timing tracking for custom performance marks
   */
  setupUserTimingTracking() {
    if (!this.config.enableUserTiming) return;

    const userTimingObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        const timingData = {
          name: entry.name,
          entryType: entry.entryType,
          startTime: entry.startTime,
          duration: entry.duration || 0,
          timestamp: Date.now()
        };
        
        this.metrics.userTiming.push(timingData);
        
        // Track custom performance marks
        if (entry.entryType === 'mark') {
          this.handleCustomMark(timingData);
        } else if (entry.entryType === 'measure') {
          this.handleCustomMeasure(timingData);
        }
      });
    });

    try {
      userTimingObserver.observe({ entryTypes: ['mark', 'measure'] });
      this.observers.set('user-timing', userTimingObserver);
    } catch (error) {
      console.warn('User timing observer setup failed:', error);
    }
  }

  /**
   * Set up custom metrics tracking specific to medical website
   */
  setupCustomMetricsTracking() {
    // Track Time to Interactive (TTI) approximation
    this.trackTimeToInteractive();
    
    // Monitor performance budget violations
    this.monitorPerformanceBudgets();
    
    // Track network quality
    this.trackNetworkQuality();
    
    // Monitor memory usage
    this.trackMemoryUsage();
  }

  /**
   * Initialize integrations with existing performance systems
   */
  async initializeIntegrations() {
    try {
      // Service Worker integration
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        this.integrations.serviceWorker = navigator.serviceWorker;
        this.setupServiceWorkerPerformanceTracking();
      }
      
      // Module System integration
      if (window.moduleSystem) {
        this.integrations.moduleSystem = window.moduleSystem;
        this.trackModuleLoadingPerformance();
      }
      
      // CSS Optimizer integration
      if (window.cssLoader) {
        this.integrations.cssOptimizer = window.cssLoader;
        this.trackCSSLoadingPerformance();
      }
      
      console.log('🔗 Performance Monitor integrations initialized');
      
    } catch (error) {
      console.warn('⚠️ Some integrations failed to initialize:', error);
    }
  }

  /**
   * Set up emergency performance monitoring for medical website
   */
  setupEmergencyMonitoring() {
    if (!this.config.trackEmergencyContact) return;

    // Monitor emergency contact button performance
    const emergencyButton = document.querySelector('.btn--emergency, [data-emergency="true"]');
    if (emergencyButton) {
      this.trackCriticalInteraction('emergency-contact', emergencyButton);
    }

    // Monitor phone number click performance
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      this.trackCriticalInteraction('phone-call', link);
    });

    // Alert if emergency elements load slowly
    performance.mark('emergency-elements-check-start');
    
    requestIdleCallback(() => {
      performance.mark('emergency-elements-check-end');
      performance.measure('emergency-elements-availability', 'emergency-elements-check-start', 'emergency-elements-check-end');
      
      const measure = performance.getEntriesByName('emergency-elements-availability')[0];
      if (measure.duration > 1000) { // Alert if takes > 1s
        this.createPerformanceAlert('CRITICAL', 'Emergency elements loaded slowly', {
          duration: measure.duration,
          threshold: 1000
        });
      }
    });
  }

  /**
   * Set up medical website specific performance tracking
   */
  setupMedicalWebsiteTracking() {
    // Track appointment booking flow performance
    if (this.config.trackBookingFlow) {
      this.setupBookingFlowTracking();
    }

    // Track contact form performance
    if (this.config.trackFormSubmissions) {
      this.setupFormPerformanceTracking();
    }

    // Track image gallery performance
    if (this.config.trackGalleryLoading) {
      this.setupGalleryPerformanceTracking();
    }

    // Track mobile performance (critical for medical websites)
    this.setupMobilePerformanceTracking();
  }

  /**
   * Track appointment booking flow performance
   */
  setupBookingFlowTracking() {
    // Track booking button clicks
    document.addEventListener('click', (event) => {
      if (event.target.closest('.booking-trigger, .cta-button, [data-booking="true"]')) {
        performance.mark('booking-flow-start');
        this.trackCustomEvent('booking-flow-initiated', { timestamp: Date.now() });
      }
    });

    // Track booking modal/form appearance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.querySelector && (node.querySelector('.booking-modal') || node.id === 'booking-modal')) {
              performance.mark('booking-modal-rendered');
              performance.measure('booking-modal-load-time', 'booking-flow-start', 'booking-modal-rendered');
              
              const measure = performance.getEntriesByName('booking-modal-load-time')[0];
              this.trackCustomEvent('booking-modal-loaded', {
                loadTime: measure.duration,
                timestamp: Date.now()
              });

              // Alert if booking flow is slow (critical for medical appointments)
              if (measure.duration > 2000) {
                this.createPerformanceAlert('HIGH', 'Booking flow loading slowly', {
                  duration: measure.duration,
                  threshold: 2000
                });
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * Track form submission performance
   */
  setupFormPerformanceTracking() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const formType = this.getFormType(form);
      
      performance.mark(`form-submit-start-${formType}`);
      
      const submitHandler = () => {
        performance.mark(`form-submit-end-${formType}`);
        performance.measure(`form-submit-duration-${formType}`, 
          `form-submit-start-${formType}`, 
          `form-submit-end-${formType}`
        );
        
        const measure = performance.getEntriesByName(`form-submit-duration-${formType}`)[0];
        this.trackCustomEvent('form-submitted', {
          formType: formType,
          duration: measure.duration,
          timestamp: Date.now()
        });
      };

      // Track both successful and failed submissions
      form.addEventListener('load', submitHandler, { once: true });
      form.addEventListener('error', submitHandler, { once: true });
      
      // Fallback timeout
      setTimeout(submitHandler, 10000);
    });
  }

  /**
   * Track image gallery loading performance
   */
  setupGalleryPerformanceTracking() {
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const gallery = entry.target;
          performance.mark(`gallery-${gallery.id || 'default'}-visible`);
          
          // Track individual image loads within gallery
          const images = gallery.querySelectorAll('img');
          let loadedCount = 0;
          
          const trackImageLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              performance.mark(`gallery-${gallery.id || 'default'}-complete`);
              performance.measure(
                `gallery-load-time-${gallery.id || 'default'}`,
                `gallery-${gallery.id || 'default'}-visible`,
                `gallery-${gallery.id || 'default'}-complete`
              );
              
              const measure = performance.getEntriesByName(`gallery-load-time-${gallery.id || 'default'}`)[0];
              this.trackCustomEvent('gallery-loaded', {
                galleryId: gallery.id || 'default',
                imageCount: images.length,
                loadTime: measure.duration,
                timestamp: Date.now()
              });
            }
          };

          images.forEach(img => {
            if (img.complete) {
              trackImageLoad();
            } else {
              img.addEventListener('load', trackImageLoad, { once: true });
              img.addEventListener('error', trackImageLoad, { once: true });
            }
          });
        }
      });
    });

    // Observe all gallery containers
    document.querySelectorAll('.gallery, .gallery-grid, [data-gallery="true"]').forEach(gallery => {
      galleryObserver.observe(gallery);
    });
  }

  /**
   * Track mobile performance specifically
   */
  setupMobilePerformanceTracking() {
    // Detect mobile devices
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    window.innerWidth <= 768;
    
    if (isMobile) {
      this.metrics.customMetrics.isMobile = true;
      
      // Track touch interactions
      document.addEventListener('touchstart', () => {
        performance.mark('first-touch-start');
      }, { once: true });

      // Track viewport changes (orientation)
      window.addEventListener('orientationchange', () => {
        performance.mark('orientation-change');
        
        // Re-evaluate layout shift after orientation change
        setTimeout(() => {
          this.trackCustomEvent('orientation-changed', {
            orientation: screen.orientation ? screen.orientation.angle : window.orientation,
            timestamp: Date.now()
          });
        }, 100);
      });

      // Monitor mobile-specific performance issues
      this.trackMobileSpecificMetrics();
    }
  }

  /**
   * Track Time to Interactive approximation
   */
  trackTimeToInteractive() {
    let tti = null;
    
    // Use a combination of approaches to estimate TTI
    const calculateTTI = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (!navigationEntry) return;

      // Simple TTI approximation: DOMContentLoaded + 50ms of quiet period
      const domContentLoaded = navigationEntry.domContentLoadedEventEnd;
      const loadComplete = navigationEntry.loadEventEnd;
      
      // More sophisticated TTI would require analyzing long tasks
      tti = Math.max(domContentLoaded, loadComplete - navigationEntry.navigationStart);
      
      this.metrics.coreWebVitals.tti = tti;
      this.evaluateMetric('TTI', tti, this.config.thresholds.tti);
      
      console.log(`📊 TTI (estimated): ${Math.round(tti)}ms`);
    };

    // Calculate TTI after page load
    if (document.readyState === 'complete') {
      calculateTTI();
    } else {
      window.addEventListener('load', calculateTTI);
    }
  }

  /**
   * Monitor performance budget violations
   */
  monitorPerformanceBudgets() {
    const checkBudgets = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (!navigationEntry) return;

      // Check page weight budget
      const totalTransferSize = this.metrics.resourceTiming.reduce((sum, resource) => {
        return sum + (resource.transferSize || 0);
      }, 0);

      if (totalTransferSize > this.config.budgets.totalPageWeight) {
        this.createBudgetViolation('totalPageWeight', totalTransferSize, this.config.budgets.totalPageWeight);
      }

      // Check resource type budgets
      const resourcesByType = this.groupResourcesByType();
      
      Object.entries(this.config.budgets).forEach(([budgetType, budgetLimit]) => {
        const resourceType = budgetType.replace('Weight', '');
        const actualSize = resourcesByType[resourceType] || 0;
        
        if (actualSize > budgetLimit) {
          this.createBudgetViolation(budgetType, actualSize, budgetLimit);
        }
      });
    };

    // Check budgets after initial load
    setTimeout(checkBudgets, 3000);
    
    // Re-check periodically for dynamic content
    setInterval(checkBudgets, 30000);
  }

  /**
   * Track network quality and adapt performance expectations
   */
  trackNetworkQuality() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.metrics.customMetrics.networkInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };

      // Adjust thresholds based on network quality
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        this.adjustThresholdsForSlowNetwork();
      }

      // Listen for network changes
      connection.addEventListener('change', () => {
        this.trackCustomEvent('network-changed', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          timestamp: Date.now()
        });
      });
    }
  }

  /**
   * Track memory usage patterns
   */
  trackMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      
      this.metrics.customMetrics.memoryInfo = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };

      // Alert on high memory usage
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
        this.createPerformanceAlert('MEDIUM', 'High memory usage detected', {
          usage: memory.usedJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100).toFixed(1)
        });
      }
    }
  }

  /**
   * Start performance reporting interval
   */
  startPerformanceReporting() {
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer);
    }

    this.reportingTimer = setInterval(() => {
      this.generatePerformanceReport();
    }, this.config.reportingInterval);
  }

  /**
   * Generate comprehensive performance report
   */
  generatePerformanceReport() {
    const report = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      
      // Core Web Vitals
      coreWebVitals: { ...this.metrics.coreWebVitals },
      
      // Performance scores
      performanceScore: this.calculatePerformanceScore(),
      
      // Budget violations
      budgetViolations: [...this.metrics.budgetViolations],
      
      // Custom metrics
      customMetrics: { ...this.metrics.customMetrics },
      
      // Resource summary
      resourceSummary: this.generateResourceSummary(),
      
      // Alerts
      alerts: [...this.metrics.alerts],
      
      // Integration data
      integrationData: this.collectIntegrationData()
    };

    // Send to analytics if available
    this.sendToAnalytics(report);
    
    // Log to console in development
    if (this.isDevelopment()) {
      console.log('📊 Performance Report:', report);
    }
    
    return report;
  }

  /**
   * Calculate overall performance score (0-100)
   */
  calculatePerformanceScore() {
    const scores = {
      lcp: this.scoreMetric(this.metrics.coreWebVitals.lcp, this.config.thresholds.lcp, 2500, 4000),
      fid: this.scoreMetric(this.metrics.coreWebVitals.fid, this.config.thresholds.fid, 100, 300),
      cls: this.scoreMetric(this.metrics.coreWebVitals.cls, this.config.thresholds.cls, 0.1, 0.25),
      fcp: this.scoreMetric(this.metrics.coreWebVitals.fcp, this.config.thresholds.fcp, 1800, 3000),
      tti: this.scoreMetric(this.metrics.coreWebVitals.tti, this.config.thresholds.tti, 3800, 7300)
    };

    // Weighted average (LCP and CLS have higher weight for medical websites)
    const weights = { lcp: 0.25, fid: 0.15, cls: 0.25, fcp: 0.2, tti: 0.15 };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(scores).forEach(([metric, score]) => {
      if (score !== null) {
        totalScore += score * weights[metric];
        totalWeight += weights[metric];
      }
    });

    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : null;
  }

  /**
   * Utility methods
   */
  
  evaluateMetric(name, value, threshold) {
    const status = value <= threshold ? 'GOOD' : value <= threshold * 2 ? 'NEEDS_IMPROVEMENT' : 'POOR';
    
    if (status === 'POOR' && this.config.enableRealTimeAlerts) {
      this.createPerformanceAlert('HIGH', `${name} performance is poor`, {
        metric: name,
        value: value,
        threshold: threshold,
        status: status
      });
    }

    this.trackCustomEvent('metric-evaluated', {
      metric: name,
      value: value,
      threshold: threshold,
      status: status,
      timestamp: Date.now()
    });
  }

  createPerformanceAlert(severity, message, data = {}) {
    const alert = {
      id: this.generateAlertId(),
      severity: severity,
      message: message,
      data: data,
      timestamp: Date.now(),
      url: window.location.href
    };

    this.metrics.alerts.push(alert);
    
    // Console output with appropriate styling
    const style = severity === 'CRITICAL' ? 'color: red; font-weight: bold' :
                 severity === 'HIGH' ? 'color: orange; font-weight: bold' :
                 'color: yellow';
    
    console.warn(`%c⚠️ Performance Alert [${severity}]: ${message}`, style, data);
    
    // Send immediate alert for critical issues
    if (severity === 'CRITICAL') {
      this.sendImmediateAlert(alert);
    }
  }

  createBudgetViolation(budgetType, actual, limit) {
    const violation = {
      type: budgetType,
      actual: actual,
      limit: limit,
      overage: actual - limit,
      percentage: ((actual - limit) / limit * 100).toFixed(1),
      timestamp: Date.now()
    };

    this.metrics.budgetViolations.push(violation);
    
    this.createPerformanceAlert('MEDIUM', `Performance budget exceeded: ${budgetType}`, violation);
  }

  trackCustomEvent(eventName, data) {
    this.metrics.customMetrics[eventName] = this.metrics.customMetrics[eventName] || [];
    this.metrics.customMetrics[eventName].push({
      ...data,
      timestamp: Date.now()
    });
  }

  // Helper methods
  getResourceType(url) {
    if (url.includes('.js')) return 'js';
    if (url.includes('.css')) return 'css';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) return 'image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    return 'other';
  }

  isCriticalResource(url) {
    const criticalPatterns = [
      '/css/critical.css',
      '/js/core-utils.js',
      '/optimized-images/logo-',
      '/optimized-images/hero-'
    ];
    
    return criticalPatterns.some(pattern => url.includes(pattern));
  }

  getFormType(form) {
    if (form.id) return form.id;
    if (form.action.includes('booking')) return 'booking';
    if (form.action.includes('contact')) return 'contact';
    if (form.querySelector('[type="email"]')) return 'contact';
    return 'generic';
  }

  generateSessionId() {
    return 'perf_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  generateAlertId() {
    return 'alert_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '8787';
  }

  scoreMetric(value, goodThreshold, needsImprovementThreshold, poorThreshold) {
    if (value === null || value === undefined) return null;
    
    if (value <= goodThreshold) return 100;
    if (value <= needsImprovementThreshold) {
      return Math.round(90 - (value - goodThreshold) / (needsImprovementThreshold - goodThreshold) * 40);
    }
    if (value <= poorThreshold) {
      return Math.round(50 - (value - needsImprovementThreshold) / (poorThreshold - needsImprovementThreshold) * 40);
    }
    return 0;
  }

  // Integration methods
  sendToAnalytics(report) {
    // Google Analytics integration
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_report', {
        performance_score: report.performanceScore,
        lcp: report.coreWebVitals.lcp,
        fid: report.coreWebVitals.fid,
        cls: report.coreWebVitals.cls,
        session_id: report.sessionId
      });
    }

    // Send to Service Worker for potential caching/queuing
    if (this.integrations.serviceWorker && this.integrations.serviceWorker.controller) {
      this.integrations.serviceWorker.controller.postMessage({
        type: 'PERFORMANCE_REPORT',
        data: report
      });
    }
  }

  // Public API methods
  
  /**
   * Get current performance metrics
   */
  getCurrentMetrics() {
    return {
      coreWebVitals: { ...this.metrics.coreWebVitals },
      performanceScore: this.calculatePerformanceScore(),
      customMetrics: { ...this.metrics.customMetrics },
      alerts: [...this.metrics.alerts],
      budgetViolations: [...this.metrics.budgetViolations]
    };
  }

  /**
   * Force immediate performance report
   */
  forceReport() {
    return this.generatePerformanceReport();
  }

  /**
   * Clear all performance data
   */
  clearData() {
    this.metrics = {
      coreWebVitals: {},
      resourceTiming: [],
      userTiming: [],
      customMetrics: {},
      performanceEntries: [],
      budgetViolations: [],
      alerts: []
    };
    
    console.log('🧹 Performance data cleared');
  }

  /**
   * Destroy performance monitor
   */
  destroy() {
    // Disconnect all observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();

    // Clear reporting timer
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer);
      this.reportingTimer = null;
    }

    console.log('🔥 Performance Monitor destroyed');
  }
}

// Initialize performance monitor when DOM is ready
let performanceMonitor = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor = new PerformanceMonitor();
    window.performanceMonitor = performanceMonitor;
  });
} else {
  performanceMonitor = new PerformanceMonitor();
  window.performanceMonitor = performanceMonitor;
}

export default PerformanceMonitor;