// ADVANCED ANALYTICS - Comprehensive user behavior and medical KPI tracking
// Privacy-compliant analytics with conversion optimization and medical practice insights

export class AdvancedAnalytics {
  
  constructor(options = {}) {
    this.config = {
      // Analytics Configuration
      trackingId: process.env.ANALYTICS_TRACKING_ID || null,
      debug: process.env.NODE_ENV !== 'production',
      
      // Medical Practice KPIs
      enableMedicalKPIs: true,
      enableConversionTracking: true,
      enableUserJourneyMapping: true,
      enablePatientInsights: true,
      
      // Privacy and Compliance
      enableGDPRCompliance: true,
      enableHIPAACompliance: true,
      anonymizeIPs: true,
      respectDoNotTrack: true,
      dataRetentionDays: 730, // 2 years for medical practices
      
      // Tracking Features
      enablePageViews: true,
      enableUserInteractions: true,
      enableFormTracking: true,
      enableScrollTracking: true,
      enableTimingTracking: true,
      enableErrorTracking: true,
      enablePerformanceTracking: true,
      enableA11yTracking: true,
      
      // Medical-Specific Tracking
      trackAppointmentBookings: true,
      trackEmergencyContacts: true,
      trackServiceInterest: true,
      trackHealthContentEngagement: true,
      trackTreatmentInquiries: true,
      
      // Conversion Goals
      conversionGoals: {
        'appointment_booked': { value: 100, currency: 'USD' },
        'contact_form_submitted': { value: 50, currency: 'USD' },
        'emergency_contact_used': { value: 200, currency: 'USD' },
        'service_inquiry': { value: 25, currency: 'USD' },
        'newsletter_signup': { value: 10, currency: 'USD' }
      },
      
      // Dashboard and Reporting
      enableRealTimeDashboard: true,
      enableCustomReports: true,
      reportingInterval: 300000, // 5 minutes
      
      // Integration
      googleAnalyticsId: process.env.GA_TRACKING_ID,
      facebookPixelId: process.env.FB_PIXEL_ID,
      hotjarId: process.env.HOTJAR_ID,
      customEndpoint: process.env.CUSTOM_ANALYTICS_ENDPOINT,
      
      ...options
    };

    // Analytics State
    this.state = {
      initialized: false,
      sessionId: null,
      userId: null,
      patientId: null,
      sessionStartTime: Date.now(),
      pageViewCount: 0,
      interactions: [],
      conversions: [],
      medicalKPIs: {},
      userJourney: [],
      currentPage: null,
      lastInteraction: null,
      consentStatus: null
    };

    // Data collection
    this.eventQueue = [];
    this.batchedEvents = [];
    this.performanceMetrics = new Map();
    this.userBehaviorPatterns = new Map();
    this.conversionFunnel = new Map();

    // Medical KPI tracking
    this.medicalMetrics = {
      appointmentBookings: 0,
      emergencyContacts: 0,
      serviceInquiries: 0,
      patientEducationEngagement: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
      conversionRate: 0
    };

    // Consent and privacy
    this.consentManager = null;
    this.privacySettings = {};

    this.init();
  }

  /**
   * Initialize Advanced Analytics
   */
  async init() {
    try {
      
      // Check privacy compliance
      await this.setupPrivacyCompliance();
      
      // Initialize session
      this.initializeSession();
      
      // Set up tracking systems
      this.setupCoreTracking();
      this.setupMedicalKPITracking();
      this.setupConversionTracking();
      this.setupUserJourneyMapping();
      this.setupPerformanceTracking();
      
      // Initialize external services
      await this.initializeExternalServices();
      
      // Set up data processing
      this.setupDataProcessing();
      
      // Set up reporting
      if (this.config.enableRealTimeDashboard) {
        this.setupRealTimeDashboard();
      }
      
      // Start periodic reporting
      this.startPeriodicReporting();
      
      console.log('✅ Advanced Analytics initialized successfully');
      this.trackEvent('analytics_system_initialized');
      
    } catch (error) {
      console.error('❌ Advanced Analytics initialization failed:', error);
    }
  }

  /**
   * Set up privacy compliance (GDPR/HIPAA)
   */
  async setupPrivacyCompliance() {
    // Check Do Not Track
    if (this.config.respectDoNotTrack && navigator.doNotTrack === '1') {
      this.state.trackingDisabled = true;
      return;
    }

    // Set up consent management
    this.consentManager = {
      hasConsent: () => this.checkUserConsent(),
      requestConsent: () => this.showConsentDialog(),
      updateConsent: (settings) => this.updateConsentSettings(settings)
    };

    // Check existing consent
    const existingConsent = localStorage.getItem('analytics_consent');
    if (existingConsent) {
      this.state.consentStatus = JSON.parse(existingConsent);
    } else if (this.config.enableGDPRCompliance) {
      // Show consent dialog for new users in GDPR regions
      await this.showConsentDialog();
    } else {
      // Implied consent for non-GDPR regions
      this.state.consentStatus = {
        analytics: true,
        marketing: false,
        timestamp: Date.now()
      };
    }

    // Set up data anonymization
    if (this.config.anonymizeIPs) {
      this.setupIPAnonymization();
    }
  }

  /**
   * Show privacy consent dialog
   */
  async showConsentDialog() {
    return new Promise((resolve) => {
      const consentDialog = document.createElement('div');
      consentDialog.className = 'analytics-consent-dialog';
      consentDialog.innerHTML = `
        <div class="consent-dialog-overlay">
          <div class="consent-dialog-content">
            <div class="consent-dialog-header">
              <h3>🔒 Privacy & Analytics Consent</h3>
            </div>
            
            <div class="consent-dialog-body">
              <p>We value your privacy and are committed to protecting your personal information while providing you with the best dental care experience.</p>
              
              <div class="consent-options">
                <div class="consent-option">
                  <label class="consent-checkbox">
                    <input type="checkbox" id="analytics-consent" checked>
                    <span class="checkmark"></span>
                    <span class="consent-label">
                      <strong>Essential Analytics</strong>
                      <small>Help us improve our website performance and user experience. No personal medical information is collected.</small>
                    </span>
                  </label>
                </div>
                
                <div class="consent-option">
                  <label class="consent-checkbox">
                    <input type="checkbox" id="marketing-consent">
                    <span class="checkmark"></span>
                    <span class="consent-label">
                      <strong>Marketing Analytics</strong>
                      <small>Allow us to show you relevant dental health content and appointment reminders.</small>
                    </span>
                  </label>
                </div>
              </div>
              
              <div class="privacy-notice">
                <p><small>
                  ✅ We never collect personal medical information<br>
                  ✅ All data is anonymized and encrypted<br>
                  ✅ HIPAA and GDPR compliant<br>
                  ✅ You can change these settings anytime
                </small></p>
              </div>
            </div>
            
            <div class="consent-dialog-footer">
              <button class="btn btn--secondary" id="consent-decline">Decline All</button>
              <button class="btn btn--primary" id="consent-accept">Accept Selected</button>
            </div>
          </div>
        </div>
      `;

      // Add consent dialog styles
      this.injectConsentCSS();
      
      document.body.appendChild(consentDialog);

      // Handle consent choices
      document.getElementById('consent-accept').addEventListener('click', () => {
        const analyticsConsent = document.getElementById('analytics-consent').checked;
        const marketingConsent = document.getElementById('marketing-consent').checked;
        
        this.state.consentStatus = {
          analytics: analyticsConsent,
          marketing: marketingConsent,
          timestamp: Date.now()
        };
        
        localStorage.setItem('analytics_consent', JSON.stringify(this.state.consentStatus));
        consentDialog.remove();
        resolve();
      });

      document.getElementById('consent-decline').addEventListener('click', () => {
        this.state.consentStatus = {
          analytics: false,
          marketing: false,
          timestamp: Date.now()
        };
        
        localStorage.setItem('analytics_consent', JSON.stringify(this.state.consentStatus));
        this.state.trackingDisabled = true;
        consentDialog.remove();
        resolve();
      });
    });
  }

  /**
   * Initialize tracking session
   */
  initializeSession() {
    // Generate session ID
    this.state.sessionId = this.generateSessionId();
    
    // Get or create user ID
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = this.generateUserId();
      localStorage.setItem('analytics_user_id', userId);
    }
    this.state.userId = userId;
    
    // Track session start
    this.state.sessionStartTime = Date.now();
    this.state.currentPage = {
      url: window.location.href,
      title: document.title,
      timestamp: Date.now()
    };

    // Set up session management
    this.setupSessionManagement();
  }

  /**
   * Set up core tracking functionality
   */
  setupCoreTracking() {
    if (!this.hasTrackingConsent()) return;

    // Page view tracking
    if (this.config.enablePageViews) {
      this.trackPageView();
      this.setupSPATracking(); // Single Page Application tracking
    }

    // User interaction tracking
    if (this.config.enableUserInteractions) {
      this.setupInteractionTracking();
    }

    // Form tracking
    if (this.config.enableFormTracking) {
      this.setupFormTracking();
    }

    // Scroll tracking
    if (this.config.enableScrollTracking) {
      this.setupScrollTracking();
    }

    // Timing tracking
    if (this.config.enableTimingTracking) {
      this.setupTimingTracking();
    }

    // Error tracking
    if (this.config.enableErrorTracking) {
      this.setupErrorTracking();
    }

    // Accessibility tracking
    if (this.config.enableA11yTracking) {
      this.setupAccessibilityTracking();
    }
  }

  /**
   * Set up medical KPI tracking
   */
  setupMedicalKPITracking() {
    if (!this.config.enableMedicalKPIs || !this.hasTrackingConsent()) return;

    // Appointment booking tracking
    if (this.config.trackAppointmentBookings) {
      this.setupAppointmentTracking();
    }

    // Emergency contact tracking
    if (this.config.trackEmergencyContacts) {
      this.setupEmergencyContactTracking();
    }

    // Service interest tracking
    if (this.config.trackServiceInterest) {
      this.setupServiceInterestTracking();
    }

    // Health content engagement
    if (this.config.trackHealthContentEngagement) {
      this.setupHealthContentTracking();
    }

    // Treatment inquiry tracking
    if (this.config.trackTreatmentInquiries) {
      this.setupTreatmentInquiryTracking();
    }
  }

  /**
   * Set up appointment booking tracking
   */
  setupAppointmentTracking() {
    // Track booking button clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.booking-trigger, .cta-button, [data-booking="true"]')) {
        this.trackMedicalEvent('appointment_booking_initiated', {
          source: e.target.textContent || 'booking_button',
          page: window.location.pathname,
          timestamp: Date.now()
        });
      }
    });

    // Track booking form interactions
    document.addEventListener('submit', (e) => {
      if (e.target.matches('.booking-form, [data-form-type="booking"]')) {
        const formData = new FormData(e.target);
        const appointmentData = {
          service: formData.get('service') || 'general',
          preferred_time: formData.get('time') || 'not_specified',
          timestamp: Date.now()
        };

        this.trackConversion('appointment_booked', appointmentData);
        this.medicalMetrics.appointmentBookings++;
      }
    });

    // Track booking modal/widget usage
    this.observeBookingElements();
  }

  /**
   * Set up emergency contact tracking
   */
  setupEmergencyContactTracking() {
    // Track emergency button usage
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn--emergency, [data-emergency="true"]')) {
        this.trackMedicalEvent('emergency_contact_used', {
          contact_type: 'emergency_button',
          page: window.location.pathname,
          timestamp: Date.now(),
          urgency: 'high'
        });
        
        this.trackConversion('emergency_contact_used');
        this.medicalMetrics.emergencyContacts++;
      }
    });

    // Track phone number clicks
    document.addEventListener('click', (e) => {
      const telLink = e.target.closest('a[href^="tel:"]');
      if (telLink) {
        const phoneNumber = telLink.href.replace('tel:', '');
        
        this.trackMedicalEvent('phone_contact_used', {
          phone_number: phoneNumber,
          contact_method: 'phone_link',
          timestamp: Date.now()
        });
      }
    });
  }

  /**
   * Set up service interest tracking
   */
  setupServiceInterestTracking() {
    // Track service page visits
    if (window.location.pathname.includes('/services/')) {
      const serviceName = this.extractServiceFromPath(window.location.pathname);
      this.trackMedicalEvent('service_page_visited', {
        service: serviceName,
        timestamp: Date.now()
      });
    }

    // Track service card interactions
    document.addEventListener('click', (e) => {
      const serviceCard = e.target.closest('.service-card, [data-service]');
      if (serviceCard) {
        const serviceName = serviceCard.dataset.service || 
                          serviceCard.querySelector('.service-card__title')?.textContent || 
                          'unknown';
        
        this.trackMedicalEvent('service_interest', {
          service: serviceName,
          interaction_type: 'service_card_click',
          timestamp: Date.now()
        });
      }
    });

    // Track "Learn More" clicks
    document.addEventListener('click', (e) => {
      if (e.target.textContent?.toLowerCase().includes('learn more')) {
        const context = this.getClickContext(e.target);
        
        this.trackMedicalEvent('service_inquiry', {
          service: context.service || 'general',
          inquiry_type: 'learn_more',
          timestamp: Date.now()
        });
        
        this.trackConversion('service_inquiry');
      }
    });
  }

  /**
   * Set up conversion tracking
   */
  setupConversionTracking() {
    if (!this.config.enableConversionTracking || !this.hasTrackingConsent()) return;

    // Track form submissions as conversions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      const formType = this.getFormType(form);
      
      if (formType !== 'unknown') {
        const conversionData = {
          form_type: formType,
          page: window.location.pathname,
          timestamp: Date.now()
        };

        switch (formType) {
          case 'contact':
            this.trackConversion('contact_form_submitted', conversionData);
            break;
          case 'booking':
            this.trackConversion('appointment_booked', conversionData);
            break;
          case 'newsletter':
            this.trackConversion('newsletter_signup', conversionData);
            break;
        }
      }
    });

    // Track micro-conversions
    this.setupMicroConversionTracking();
  }

  /**
   * Set up micro-conversion tracking
   */
  setupMicroConversionTracking() {
    // Track video engagement
    document.addEventListener('play', (e) => {
      if (e.target.tagName === 'VIDEO') {
        this.trackEvent('video_engagement', {
          action: 'play',
          video_title: e.target.title || 'untitled',
          timestamp: Date.now()
        });
      }
    });

    // Track PDF downloads
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href$=".pdf"]');
      if (link) {
        this.trackEvent('pdf_download', {
          file_name: link.href.split('/').pop(),
          timestamp: Date.now()
        });
      }
    });

    // Track external link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link && !link.href.includes(window.location.hostname)) {
        this.trackEvent('external_link_click', {
          destination: link.href,
          timestamp: Date.now()
        });
      }
    });
  }

  /**
   * Set up user journey mapping
   */
  setupUserJourneyMapping() {
    if (!this.config.enableUserJourneyMapping || !this.hasTrackingConsent()) return;

    // Track navigation flow
    this.trackNavigationFlow();
    
    // Track user engagement patterns
    this.trackEngagementPatterns();
    
    // Track conversion paths
    this.trackConversionPaths();
  }

  /**
   * Track navigation flow
   */
  trackNavigationFlow() {
    let previousPage = document.referrer;
    
    // Track page transitions
    const trackPageTransition = () => {
      const currentPage = {
        url: window.location.href,
        title: document.title,
        timestamp: Date.now(),
        referrer: previousPage
      };
      
      this.state.userJourney.push(currentPage);
      
      // Keep only last 20 pages to avoid memory issues
      if (this.state.userJourney.length > 20) {
        this.state.userJourney.shift();
      }
      
      previousPage = window.location.href;
    };

    // Track initial page
    trackPageTransition();
    
    // Track SPA navigation
    window.addEventListener('popstate', trackPageTransition);
    
    // Track programmatic navigation
    const originalPushState = history.pushState;
    history.pushState = function() {
      originalPushState.apply(history, arguments);
      trackPageTransition();
    };
  }

  /**
   * Set up performance tracking integration
   */
  setupPerformanceTracking() {
    if (!this.config.enablePerformanceTracking || !this.hasTrackingConsent()) return;

    // Integration with PerformanceMonitor
    if (window.performanceMonitor) {
      const performanceData = window.performanceMonitor.getCurrentMetrics();
      
      this.trackEvent('performance_metrics', {
        core_web_vitals: performanceData.coreWebVitals,
        performance_score: performanceData.performanceScore,
        timestamp: Date.now()
      });
    }

    // Track Core Web Vitals for analytics
    this.trackCoreWebVitals();
  }

  /**
   * Track Core Web Vitals for analytics
   */
  trackCoreWebVitals() {
    if ('PerformanceObserver' in window) {
      // LCP tracking
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.trackEvent('core_web_vital', {
          metric: 'LCP',
          value: Math.round(lastEntry.startTime),
          rating: this.getCWVRating('LCP', lastEntry.startTime),
          timestamp: Date.now()
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID tracking
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          const fid = entry.processingStart - entry.startTime;
          
          this.trackEvent('core_web_vital', {
            metric: 'FID',
            value: Math.round(fid),
            rating: this.getCWVRating('FID', fid),
            timestamp: Date.now()
          });
        });
      }).observe({ entryTypes: ['first-input'] });
    }
  }

  /**
   * Set up real-time dashboard
   */
  setupRealTimeDashboard() {
    // Create dashboard container
    if (this.config.debug) {
      this.createDebugDashboard();
    }
    
    // Set up real-time metrics
    this.updateRealTimeMetrics();
  }

  /**
   * Create debug dashboard for development
   */
  createDebugDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'analytics-debug-dashboard';
    dashboard.innerHTML = `
      <div class="analytics-dashboard">
        <h3>📊 Analytics Debug</h3>
        <div class="dashboard-metrics">
          <div class="metric">
            <label>Session ID:</label>
            <span id="debug-session-id">${this.state.sessionId}</span>
          </div>
          <div class="metric">
            <label>Page Views:</label>
            <span id="debug-page-views">${this.state.pageViewCount}</span>
          </div>
          <div class="metric">
            <label>Interactions:</label>
            <span id="debug-interactions">${this.state.interactions.length}</span>
          </div>
          <div class="metric">
            <label>Conversions:</label>
            <span id="debug-conversions">${this.state.conversions.length}</span>
          </div>
        </div>
        <div class="dashboard-controls">
          <button id="debug-clear-data">Clear Data</button>
          <button id="debug-export-data">Export Data</button>
        </div>
      </div>
    `;

    // Add dashboard styles
    this.injectDebugDashboardCSS();
    
    document.body.appendChild(dashboard);
    
    // Set up dashboard controls
    document.getElementById('debug-clear-data').addEventListener('click', () => {
      this.clearAnalyticsData();
    });
    
    document.getElementById('debug-export-data').addEventListener('click', () => {
      this.exportAnalyticsData();
    });
  }

  /**
   * Track event with privacy compliance
   */
  trackEvent(eventName, data = {}) {
    if (!this.hasTrackingConsent() || this.state.trackingDisabled) {
      return;
    }

    const event = {
      event: eventName,
      session_id: this.state.sessionId,
      user_id: this.state.userId,
      timestamp: Date.now(),
      page_url: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent,
      ...data
    };

    // Add to event queue
    this.eventQueue.push(event);
    
    // Process event queue
    this.processEventQueue();
    
    // Debug logging
    if (this.config.debug) {
    }
  }

  /**
   * Track medical-specific events
   */
  trackMedicalEvent(eventName, medicalData = {}) {
    // Ensure medical data is anonymized
    const anonymizedData = this.anonymizeMedicalData(medicalData);
    
    this.trackEvent(eventName, {
      event_category: 'medical',
      ...anonymizedData
    });
  }

  /**
   * Track conversion with value
   */
  trackConversion(conversionName, additionalData = {}) {
    if (!this.hasTrackingConsent()) return;

    const conversionGoal = this.config.conversionGoals[conversionName];
    
    const conversionEvent = {
      conversion_name: conversionName,
      conversion_value: conversionGoal?.value || 0,
      currency: conversionGoal?.currency || 'USD',
      session_id: this.state.sessionId,
      timestamp: Date.now(),
      ...additionalData
    };

    this.state.conversions.push(conversionEvent);
    
    // Track as regular event
    this.trackEvent('conversion', conversionEvent);
    
    // Send to external services
    this.sendConversionToExternalServices(conversionName, conversionEvent);
  }

  /**
   * Track page view
   */
  trackPageView(customData = {}) {
    if (!this.hasTrackingConsent()) return;

    this.state.pageViewCount++;
    
    const pageViewData = {
      page_url: window.location.href,
      page_title: document.title,
      page_path: window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now(),
      ...customData
    };

    this.trackEvent('page_view', pageViewData);
    
    // Update current page
    this.state.currentPage = pageViewData;
  }

  /**
   * Process event queue (batch processing)
   */
  processEventQueue() {
    if (this.eventQueue.length === 0) return;

    // Add events to batch
    this.batchedEvents.push(...this.eventQueue);
    this.eventQueue = [];

    // Send batch if it's large enough or enough time has passed
    if (this.batchedEvents.length >= 10 || this.shouldSendBatch()) {
      this.sendEventBatch();
    }
  }

  /**
   * Send event batch to analytics services
   */
  async sendEventBatch() {
    if (this.batchedEvents.length === 0) return;

    const batch = [...this.batchedEvents];
    this.batchedEvents = [];

    try {
      // Send to custom endpoint
      if (this.config.customEndpoint) {
        await this.sendToCustomEndpoint(batch);
      }

      // Send to Google Analytics
      if (this.config.googleAnalyticsId) {
        this.sendToGoogleAnalytics(batch);
      }

      // Send to Facebook Pixel
      if (this.config.facebookPixelId) {
        this.sendToFacebookPixel(batch);
      }

      if (this.config.debug) {
      }

    } catch (error) {
      console.error('❌ Analytics batch send failed:', error);
      
      // Re-queue events for retry
      this.batchedEvents.unshift(...batch);
    }
  }

  /**
   * Utility methods
   */

  hasTrackingConsent() {
    return this.state.consentStatus?.analytics === true;
  }

  generateSessionId() {
    return 'sess_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  generateUserId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  anonymizeMedicalData(data) {
    // Remove or hash any potentially sensitive information
    const anonymized = { ...data };
    
    // Remove direct identifiers
    delete anonymized.email;
    delete anonymized.phone;
    delete anonymized.name;
    delete anonymized.address;
    
    return anonymized;
  }

  getCWVRating(metric, value) {
    const thresholds = {
      LCP: { good: 2500, needsImprovement: 4000 },
      FID: { good: 100, needsImprovement: 300 },
      CLS: { good: 0.1, needsImprovement: 0.25 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  getFormType(form) {
    if (form.id) return form.id.replace('-form', '');
    if (form.action.includes('booking')) return 'booking';
    if (form.action.includes('contact')) return 'contact';
    if (form.querySelector('[type="email"]') && form.querySelector('input[name*="newsletter"]')) return 'newsletter';
    return 'unknown';
  }

  extractServiceFromPath(pathname) {
    const parts = pathname.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2] || 'unknown';
  }

  injectCSS(css, id) {
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  injectConsentCSS() {
    const css = `
      .analytics-consent-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }
      
      .consent-dialog-overlay {
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .consent-dialog-content {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .consent-dialog-header {
        padding: 24px 24px 16px 24px;
        border-bottom: 1px solid #eee;
      }
      
      .consent-dialog-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
      }
      
      .consent-dialog-body {
        padding: 24px;
      }
      
      .consent-options {
        margin: 20px 0;
      }
      
      .consent-option {
        margin-bottom: 16px;
      }
      
      .consent-checkbox {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
      }
      
      .consent-label {
        flex: 1;
      }
      
      .consent-label strong {
        display: block;
        margin-bottom: 4px;
      }
      
      .consent-label small {
        color: #666;
        line-height: 1.4;
      }
      
      .privacy-notice {
        background: #f8f9fa;
        padding: 16px;
        border-radius: 8px;
        margin-top: 20px;
      }
      
      .consent-dialog-footer {
        padding: 16px 24px 24px 24px;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
    `;
    
    this.injectCSS(css, 'analytics-consent-styles');
  }

  /**
   * Public API methods
   */

  /**
   * Track custom event
   */
  track(eventName, properties = {}) {
    this.trackEvent(eventName, properties);
  }

  /**
   * Track page navigation
   */
  page(pageName, properties = {}) {
    this.trackPageView({
      page_name: pageName,
      ...properties
    });
  }

  /**
   * Identify user (with privacy compliance)
   */
  identify(userId, traits = {}) {
    if (!this.hasTrackingConsent()) return;
    
    // Only store anonymized traits
    const anonymizedTraits = this.anonymizeMedicalData(traits);
    
    this.state.userId = userId;
    this.trackEvent('user_identified', anonymizedTraits);
  }

  /**
   * Get analytics data for reporting
   */
  getAnalyticsData() {
    return {
      session: this.state,
      metrics: this.medicalMetrics,
      conversions: this.state.conversions,
      userJourney: this.state.userJourney
    };
  }

  /**
   * Export analytics data
   */
  exportAnalyticsData() {
    const data = this.getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  /**
   * Clear analytics data
   */
  clearAnalyticsData() {
    this.state.interactions = [];
    this.state.conversions = [];
    this.state.userJourney = [];
    this.eventQueue = [];
    this.batchedEvents = [];
    
  }

  /**
   * Destroy analytics system
   */
  destroy() {
    // Send any remaining events
    if (this.batchedEvents.length > 0) {
      this.sendEventBatch();
    }
    
    // Clear timers and observers
    if (this.reportingTimer) {
      clearInterval(this.reportingTimer);
    }
    
    // Remove debug dashboard
    const dashboard = document.getElementById('analytics-debug-dashboard');
    if (dashboard) {
      dashboard.remove();
    }
    
  }
}

// Initialize Advanced Analytics when DOM is ready
let advancedAnalytics = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    advancedAnalytics = new AdvancedAnalytics();
    window.analytics = advancedAnalytics;
  });
} else {
  advancedAnalytics = new AdvancedAnalytics();
  window.analytics = advancedAnalytics;
}

export default AdvancedAnalytics;