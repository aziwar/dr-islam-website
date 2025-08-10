// MODULE SYSTEM - Dynamic imports and code splitting optimization
// Advanced JavaScript modularization for Cloudflare Workers compatibility

export class ModuleSystem {
  
  constructor(options = {}) {
    this.config = {
      chunkSizeLimit: 30000, // 30KB per chunk
      enablePrefetch: true,
      enablePreload: true,
      retryAttempts: 3,
      cacheDuration: 86400000, // 24 hours
      ...options
    };
    
    this.moduleCache = new Map();
    this.loadingPromises = new Map();
    this.preloadedModules = new Set();
    this.errorCount = new Map();
  }

  /**
   * Dynamic module loader with caching and error handling
   * @param {string} modulePath - Path to module
   * @param {Object} options - Loading options
   * @returns {Promise} Module exports
   */
  async loadModule(modulePath, options = {}) {
    const {
      priority = 'low',
      timeout = 10000,
      fallback = null,
      preload = false
    } = options;

    // Check cache first
    if (this.moduleCache.has(modulePath)) {
      return this.moduleCache.get(modulePath);
    }

    // Check if already loading
    if (this.loadingPromises.has(modulePath)) {
      return this.loadingPromises.get(modulePath);
    }

    // Create loading promise
    const loadingPromise = this.performModuleLoad(modulePath, {
      priority,
      timeout,
      fallback,
      preload
    });

    this.loadingPromises.set(modulePath, loadingPromise);

    try {
      const module = await loadingPromise;
      this.moduleCache.set(modulePath, module);
      this.loadingPromises.delete(modulePath);
      return module;
    } catch (error) {
      this.loadingPromises.delete(modulePath);
      await this.handleLoadError(modulePath, error, fallback);
      throw error;
    }
  }

  /**
   * Perform actual module loading with retry logic
   * @private
   */
  async performModuleLoad(modulePath, options) {
    const { priority, timeout, preload } = options;
    let lastError;

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        // Add performance mark
        performance.mark(`module-load-start-${modulePath}`);

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Module load timeout: ${modulePath}`)), timeout);
        });

        // Load with timeout
        const modulePromise = this.importWithStrategy(modulePath, priority, preload);
        const module = await Promise.race([modulePromise, timeoutPromise]);

        // Mark successful load
        performance.mark(`module-load-end-${modulePath}`);
        performance.measure(
          `module-load-${modulePath}`,
          `module-load-start-${modulePath}`,
          `module-load-end-${modulePath}`
        );

        console.log(`✅ Module loaded: ${modulePath} (attempt ${attempt})`);
        return module;

      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Module load failed: ${modulePath} (attempt ${attempt})`, error);

        // Exponential backoff for retries
        if (attempt < this.config.retryAttempts) {
          await this.delay(Math.pow(2, attempt) * 500);
        }
      }
    }

    throw lastError;
  }

  /**
   * Import with different strategies based on priority
   * @private
   */
  async importWithStrategy(modulePath, priority, preload) {
    if (preload && this.preloadedModules.has(modulePath)) {
      // Module already preloaded, just import
      return import(modulePath);
    }

    switch (priority) {
      case 'critical':
        return this.importCritical(modulePath);
      case 'high':
        return this.importHigh(modulePath);
      case 'low':
        return this.importLow(modulePath);
      default:
        return import(modulePath);
    }
  }

  /**
   * Critical module import (blocking)
   * @private
   */
  async importCritical(modulePath) {
    // Preload and import immediately
    if (this.config.enablePreload) {
      this.preloadModule(modulePath, 'high');
    }
    
    return import(modulePath);
  }

  /**
   * High priority module import
   * @private  
   */
  async importHigh(modulePath) {
    // Use requestIdleCallback if available, otherwise immediate
    if ('requestIdleCallback' in window) {
      return new Promise((resolve, reject) => {
        requestIdleCallback(async () => {
          try {
            const module = await import(modulePath);
            resolve(module);
          } catch (error) {
            reject(error);
          }
        }, { timeout: 2000 });
      });
    }
    
    return import(modulePath);
  }

  /**
   * Low priority module import (deferred)
   * @private
   */
  async importLow(modulePath) {
    // Defer until next idle period
    return new Promise((resolve, reject) => {
      const callback = async () => {
        try {
          const module = await import(modulePath);
          resolve(module);
        } catch (error) {
          reject(error);
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
      } else {
        setTimeout(callback, 0);
      }
    });
  }

  /**
   * Preload module without executing
   * @param {string} modulePath - Module path
   * @param {string} priority - Priority level
   */
  preloadModule(modulePath, priority = 'low') {
    if (!this.config.enablePreload || this.preloadedModules.has(modulePath)) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = modulePath;
    
    if (priority === 'high') {
      link.fetchPriority = 'high';
    }

    link.onload = () => {
      this.preloadedModules.add(modulePath);
      console.log(`📦 Module preloaded: ${modulePath}`);
    };

    link.onerror = (error) => {
      console.warn(`⚠️ Module preload failed: ${modulePath}`, error);
    };

    document.head.appendChild(link);
  }

  /**
   * Prefetch module for future use
   * @param {string} modulePath - Module path
   */
  prefetchModule(modulePath) {
    if (!this.config.enablePrefetch) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = modulePath;
    link.as = 'script';

    link.onload = () => {
      console.log(`🔮 Module prefetched: ${modulePath}`);
    };

    document.head.appendChild(link);
  }

  /**
   * Handle module loading errors
   * @private
   */
  async handleLoadError(modulePath, error, fallback) {
    const errorCount = this.errorCount.get(modulePath) || 0;
    this.errorCount.set(modulePath, errorCount + 1);

    console.error(`❌ Module load error: ${modulePath}`, error);

    // Try fallback if provided
    if (fallback) {
      try {
        console.log(`🔄 Attempting fallback for: ${modulePath}`);
        return await this.loadModule(fallback.path, fallback.options);
      } catch (fallbackError) {
        console.error(`❌ Fallback failed: ${fallback.path}`, fallbackError);
      }
    }

    // Log to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'module_load_error', {
        module_path: modulePath,
        error_message: error.message,
        error_count: errorCount
      });
    }
  }

  /**
   * Generate optimized module chunks for specific features
   * @returns {Object} Module chunk definitions
   */
  generateModuleChunks() {
    return {
      
      // Core utilities chunk (critical)
      'core-utils': {
        path: '/js/chunks/core-utils.js',
        priority: 'critical',
        preload: true,
        content: `
          // Core utility functions
          export const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
              const later = () => {
                clearTimeout(timeout);
                func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
            };
          };
          
          export const throttle = (func, limit) => {
            let inThrottle;
            return function() {
              const args = arguments;
              const context = this;
              if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
              }
            };
          };
          
          export const formatPhoneNumber = (phone) => {
            const cleaned = phone.replace(/\\D/g, '');
            const match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
            return match ? \`(\${match[1]}) \${match[2]}-\${match[3]}\` : phone;
          };
          
          export const validateEmail = (email) => {
            const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return re.test(email);
          };
          
          export const sanitizeInput = (input) => {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
          };
        `
      },

      // UI components chunk (high priority)
      'ui-components': {
        path: '/js/chunks/ui-components.js',
        priority: 'high',
        preload: true,
        content: `
          // UI component behaviors
          export class ModalManager {
            constructor() {
              this.activeModals = new Set();
              this.escKeyHandler = this.handleEscKey.bind(this);
            }
            
            open(modalId) {
              const modal = document.getElementById(modalId);
              if (!modal) return;
              
              modal.classList.add('active');
              this.activeModals.add(modalId);
              document.body.style.overflow = 'hidden';
              
              if (this.activeModals.size === 1) {
                document.addEventListener('keydown', this.escKeyHandler);
              }
              
              // Focus management
              const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
              if (firstFocusable) firstFocusable.focus();
            }
            
            close(modalId) {
              const modal = document.getElementById(modalId);
              if (!modal) return;
              
              modal.classList.remove('active');
              this.activeModals.delete(modalId);
              
              if (this.activeModals.size === 0) {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', this.escKeyHandler);
              }
            }
            
            handleEscKey(e) {
              if (e.key === 'Escape' && this.activeModals.size > 0) {
                const lastModal = [...this.activeModals].pop();
                this.close(lastModal);
              }
            }
          }
          
          export class FormValidator {
            constructor(form) {
              this.form = form;
              this.fields = new Map();
              this.init();
            }
            
            init() {
              const inputs = this.form.querySelectorAll('input, textarea, select');
              inputs.forEach(input => {
                this.fields.set(input.name, input);
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearErrors(input));
              });
            }
            
            validateField(input) {
              const rules = this.getValidationRules(input);
              const value = input.value.trim();
              
              for (const rule of rules) {
                const result = rule.validate(value);
                if (!result.valid) {
                  this.showError(input, result.message);
                  return false;
                }
              }
              
              this.showSuccess(input);
              return true;
            }
            
            getValidationRules(input) {
              const rules = [];
              
              if (input.required) {
                rules.push({
                  validate: (value) => ({
                    valid: value.length > 0,
                    message: 'This field is required'
                  })
                });
              }
              
              if (input.type === 'email') {
                rules.push({
                  validate: (value) => ({
                    valid: !value || /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
                    message: 'Please enter a valid email address'
                  })
                });
              }
              
              return rules;
            }
            
            showError(input, message) {
              input.classList.add('error');
              let errorElement = input.parentNode.querySelector('.error-message');
              if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                input.parentNode.appendChild(errorElement);
              }
              errorElement.textContent = message;
            }
            
            showSuccess(input) {
              input.classList.remove('error');
              input.classList.add('success');
              const errorElement = input.parentNode.querySelector('.error-message');
              if (errorElement) errorElement.remove();
            }
            
            clearErrors(input) {
              input.classList.remove('error', 'success');
              const errorElement = input.parentNode.querySelector('.error-message');
              if (errorElement) errorElement.remove();
            }
          }
        `
      },

      // Booking system chunk (low priority until needed)
      'booking-system': {
        path: '/js/chunks/booking-system.js',
        priority: 'low',
        content: `
          // Booking system functionality
          export class BookingSystem {
            constructor() {
              this.availableSlots = new Map();
              this.selectedSlot = null;
              this.init();
            }
            
            init() {
              this.setupCalendar();
              this.bindEvents();
            }
            
            async setupCalendar() {
              try {
                const response = await fetch('/api/availability');
                const data = await response.json();
                this.availableSlots = new Map(Object.entries(data.slots || {}));
                this.renderCalendar();
              } catch (error) {
                console.error('Failed to load availability:', error);
                this.showError('Unable to load available appointments');
              }
            }
            
            renderCalendar() {
              const calendar = document.getElementById('booking-calendar');
              if (!calendar) return;
              
              const today = new Date();
              const daysToShow = 30;
              let html = '';
              
              for (let i = 1; i <= daysToShow; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() + i);
                
                const dateStr = date.toISOString().split('T')[0];
                const slots = this.availableSlots.get(dateStr) || [];
                
                if (slots.length > 0) {
                  html += \`
                    <div class="calendar-day" data-date="\${dateStr}">
                      <div class="day-header">\${date.toLocaleDateString()}</div>
                      <div class="time-slots">
                        \${slots.map(slot => \`
                          <button class="time-slot" data-time="\${slot}" onclick="bookingSystem.selectSlot('\${dateStr}', '\${slot}')">
                            \${slot}
                          </button>
                        \`).join('')}
                      </div>
                    </div>
                  \`;
                }
              }
              
              calendar.innerHTML = html;
            }
            
            selectSlot(date, time) {
              // Remove previous selection
              const selected = document.querySelector('.time-slot.selected');
              if (selected) selected.classList.remove('selected');
              
              // Add new selection
              const slot = document.querySelector(\`[data-date="\${date}"] [data-time="\${time}"]\`);
              if (slot) {
                slot.classList.add('selected');
                this.selectedSlot = { date, time };
                
                // Enable booking button
                const bookButton = document.getElementById('confirm-booking');
                if (bookButton) {
                  bookButton.disabled = false;
                  bookButton.textContent = \`Book \${date} at \${time}\`;
                }
              }
            }
            
            async confirmBooking(patientInfo) {
              if (!this.selectedSlot) {
                this.showError('Please select a time slot');
                return;
              }
              
              try {
                const response = await fetch('/api/book-appointment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    ...this.selectedSlot,
                    ...patientInfo
                  })
                });
                
                const result = await response.json();
                
                if (result.success) {
                  this.showSuccess('Appointment booked successfully!');
                  this.selectedSlot = null;
                  this.setupCalendar(); // Refresh availability
                } else {
                  this.showError(result.message || 'Booking failed');
                }
              } catch (error) {
                console.error('Booking error:', error);
                this.showError('Failed to book appointment. Please try again.');
              }
            }
            
            showError(message) {
              const notification = this.createNotification(message, 'error');
              document.body.appendChild(notification);
              setTimeout(() => notification.remove(), 5000);
            }
            
            showSuccess(message) {
              const notification = this.createNotification(message, 'success');
              document.body.appendChild(notification);
              setTimeout(() => notification.remove(), 3000);
            }
            
            createNotification(message, type) {
              const div = document.createElement('div');
              div.className = \`notification notification--\${type}\`;
              div.textContent = message;
              div.style.cssText = \`
                position: fixed; top: 20px; right: 20px; z-index: 10000;
                padding: 16px 24px; border-radius: 8px; color: white;
                background: \${type === 'error' ? '#dc3545' : '#28a745'};
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              \`;
              return div;
            }
            
            bindEvents() {
              const form = document.getElementById('booking-form');
              if (form) {
                form.addEventListener('submit', (e) => {
                  e.preventDefault();
                  const formData = new FormData(form);
                  const patientInfo = Object.fromEntries(formData);
                  this.confirmBooking(patientInfo);
                });
              }
            }
          }
          
          // Global instance
          const bookingSystem = new BookingSystem();
          window.bookingSystem = bookingSystem;
          
          export default bookingSystem;
        `
      },

      // Analytics & performance chunk (low priority)
      'analytics': {
        path: '/js/chunks/analytics.js',
        priority: 'low',
        content: `
          // Analytics and performance monitoring
          export class PerformanceMonitor {
            constructor() {
              this.metrics = {};
              this.init();
            }
            
            init() {
              this.observePerformance();
              this.trackCoreWebVitals();
              this.setupErrorTracking();
            }
            
            observePerformance() {
              if (!('PerformanceObserver' in window)) return;
              
              // Largest Contentful Paint
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  this.metrics.lcp = entry.startTime;
                  this.reportMetric('LCP', entry.startTime);
                }
              }).observe({ entryTypes: ['largest-contentful-paint'] });
              
              // First Input Delay
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  this.metrics.fid = entry.processingStart - entry.startTime;
                  this.reportMetric('FID', this.metrics.fid);
                }
              }).observe({ entryTypes: ['first-input'] });
              
              // Cumulative Layout Shift
              let clsValue = 0;
              new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                  }
                }
                this.metrics.cls = clsValue;
                this.reportMetric('CLS', clsValue);
              }).observe({ entryTypes: ['layout-shift'] });
            }
            
            trackCoreWebVitals() {
              // Time to Interactive
              if ('PerformanceObserver' in window) {
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.name === 'tti') {
                      this.metrics.tti = entry.startTime;
                      this.reportMetric('TTI', entry.startTime);
                    }
                  }
                }).observe({ entryTypes: ['measure'] });
              }
              
              // First Contentful Paint
              const paintEntries = performance.getEntriesByType('paint');
              paintEntries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                  this.metrics.fcp = entry.startTime;
                  this.reportMetric('FCP', entry.startTime);
                }
              });
            }
            
            setupErrorTracking() {
              window.addEventListener('error', (event) => {
                this.reportError({
                  type: 'javascript',
                  message: event.message,
                  filename: event.filename,
                  line: event.lineno,
                  column: event.colno,
                  stack: event.error?.stack
                });
              });
              
              window.addEventListener('unhandledrejection', (event) => {
                this.reportError({
                  type: 'promise',
                  message: event.reason?.message || 'Unhandled promise rejection',
                  stack: event.reason?.stack
                });
              });
            }
            
            reportMetric(name, value) {
              console.log(\`📊 \${name}: \${Math.round(value)}ms\`);
              
              // Send to analytics if available
              if (typeof gtag !== 'undefined') {
                gtag('event', 'performance_metric', {
                  metric_name: name,
                  metric_value: Math.round(value),
                  page_path: window.location.pathname
                });
              }
            }
            
            reportError(errorInfo) {
              console.error('💥 JavaScript Error:', errorInfo);
              
              // Send to analytics if available
              if (typeof gtag !== 'undefined') {
                gtag('event', 'javascript_error', {
                  error_type: errorInfo.type,
                  error_message: errorInfo.message,
                  error_filename: errorInfo.filename,
                  page_path: window.location.pathname
                });
              }
            }
            
            getMetrics() {
              return { ...this.metrics };
            }
          }
          
          // Initialize performance monitoring
          const performanceMonitor = new PerformanceMonitor();
          window.performanceMonitor = performanceMonitor;
          
          export default performanceMonitor;
        `
      }
    };
  }

  /**
   * Generate module loader initialization script
   * @returns {string} Module system initialization
   */
  generateInitScript() {
    return `
      // Module system initialization
      class ModuleSystemInit {
        constructor() {
          this.moduleSystem = new ModuleSystem({
            chunkSizeLimit: 30000,
            enablePrefetch: true,
            enablePreload: true,
            retryAttempts: 3
          });
          
          this.init();
        }
        
        async init() {
          try {
            // Load critical modules immediately
            await this.loadCriticalModules();
            
            // Setup intersection observer for lazy loading
            this.setupLazyLoading();
            
            // Preload high-priority modules
            this.preloadModules();
            
            console.log('✅ Module system initialized');
          } catch (error) {
            console.error('❌ Module system initialization failed:', error);
          }
        }
        
        async loadCriticalModules() {
          // Load core utilities immediately
          await this.moduleSystem.loadModule('/js/chunks/core-utils.js', {
            priority: 'critical',
            preload: true
          });
          
          // Load UI components for interactive elements
          await this.moduleSystem.loadModule('/js/chunks/ui-components.js', {
            priority: 'high',
            preload: true
          });
        }
        
        setupLazyLoading() {
          // Booking system - load when booking button is clicked
          document.addEventListener('click', (e) => {
            if (e.target.closest('.booking-trigger')) {
              this.loadBookingSystem();
            }
          });
          
          // Analytics - load after initial page load
          setTimeout(() => {
            this.moduleSystem.loadModule('/js/chunks/analytics.js', {
              priority: 'low'
            });
          }, 2000);
        }
        
        preloadModules() {
          // Prefetch booking system for likely next action
          this.moduleSystem.prefetchModule('/js/chunks/booking-system.js');
        }
        
        async loadBookingSystem() {
          try {
            const bookingModule = await this.moduleSystem.loadModule('/js/chunks/booking-system.js', {
              priority: 'high',
              timeout: 5000,
              fallback: {
                path: '/js/booking-fallback.js',
                options: { priority: 'high' }
              }
            });
            
            console.log('🗓️ Booking system loaded');
            return bookingModule;
          } catch (error) {
            console.error('❌ Failed to load booking system:', error);
            // Show user-friendly error message
            this.showBookingError();
          }
        }
        
        showBookingError() {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'booking-error';
          errorDiv.innerHTML = \`
            <div class="error-message">
              <h3>Booking System Temporarily Unavailable</h3>
              <p>Please call us directly at <a href="tel:+1234567890">(123) 456-7890</a> to schedule your appointment.</p>
            </div>
          \`;
          
          const modal = document.getElementById('booking-modal');
          if (modal) {
            modal.innerHTML = errorDiv.outerHTML;
          }
        }
        
        // Public API
        getLoadedModules() {
          return this.moduleSystem.moduleCache.keys();
        }
        
        getPerformanceStats() {
          return {
            cacheSize: this.moduleSystem.moduleCache.size,
            preloadedCount: this.moduleSystem.preloadedModules.size,
            errorCount: this.moduleSystem.errorCount.size
          };
        }
      }
      
      // Initialize when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          window.moduleSystem = new ModuleSystemInit();
        });
      } else {
        window.moduleSystem = new ModuleSystemInit();
      }
    `;
  }

  /**
   * Utility method for delays
   * @private
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate build script for module optimization
   * @returns {string} Build configuration for modules
   */
  generateBuildScript() {
    return `
      // module-build.js - JavaScript module optimization
      const path = require('path');
      const fs = require('fs').promises;
      const { rollup } = require('rollup');
      const { terser } = require('rollup-plugin-terser');
      const resolve = require('@rollup/plugin-node-resolve');
      const commonjs = require('@rollup/plugin-commonjs');
      
      class ModuleBuilder {
        constructor() {
          this.inputDir = './src/performance';
          this.outputDir = './dist/js';
          this.chunks = this.getModuleChunks();
        }
        
        async buildAll() {
          console.log('⚡ Starting JavaScript module optimization...');
          
          await fs.mkdir(path.join(this.outputDir, 'chunks'), { recursive: true });
          
          // Build individual chunks
          for (const [chunkName, config] of Object.entries(this.chunks)) {
            await this.buildChunk(chunkName, config);
          }
          
          // Build main module system
          await this.buildModuleSystem();
          
          console.log('✅ JavaScript optimization complete');
        }
        
        async buildChunk(chunkName, config) {
          const inputOptions = {
            input: 'virtual:' + chunkName,
            plugins: [
              {
                name: 'virtual',
                resolveId(id) {
                  if (id === 'virtual:' + chunkName) return id;
                  return null;
                },
                load(id) {
                  if (id === 'virtual:' + chunkName) return config.content;
                  return null;
                }
              },
              resolve(),
              commonjs(),
              terser({
                compress: {
                  drop_console: process.env.NODE_ENV === 'production',
                  drop_debugger: true
                },
                mangle: {
                  safari10: true
                }
              })
            ]
          };
          
          const outputOptions = {
            file: path.join(this.outputDir, 'chunks', chunkName + '.js'),
            format: 'es',
            sourcemap: true
          };
          
          const bundle = await rollup(inputOptions);
          await bundle.write(outputOptions);
          await bundle.close();
          
          const stats = await fs.stat(outputOptions.file);
          console.log(\`📦 \${chunkName}: \${(stats.size / 1024).toFixed(1)}KB\`);
        }
        
        async buildModuleSystem() {
          // Build main module system file
          const moduleSystemCode = \`
            \${this.getModuleSystemCore()}
            \${this.getInitializationScript()}
          \`;
          
          const minified = await this.minifyCode(moduleSystemCode);
          await fs.writeFile(
            path.join(this.outputDir, 'module-system.js'),
            minified
          );
        }
        
        getModuleChunks() {
          const { ModuleSystem } = require('./ModuleSystem.js');
          const instance = new ModuleSystem();
          return instance.generateModuleChunks();
        }
        
        getModuleSystemCore() {
          return \`// Module system core implementation here\`;
        }
        
        getInitializationScript() {
          const { ModuleSystem } = require('./ModuleSystem.js');
          const instance = new ModuleSystem();
          return instance.generateInitScript();
        }
        
        async minifyCode(code) {
          const result = await terser.minify(code, {
            compress: {
              drop_console: process.env.NODE_ENV === 'production'
            },
            mangle: true
          });
          return result.code;
        }
      }
      
      if (require.main === module) {
        const builder = new ModuleBuilder();
        builder.buildAll().catch(console.error);
      }
      
      module.exports = ModuleBuilder;
    `;
  }
}

export default ModuleSystem;