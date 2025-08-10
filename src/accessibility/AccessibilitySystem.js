// ACCESSIBILITY SYSTEM - WCAG 2.1 AA compliance and inclusive design
// Comprehensive accessibility system for Dr. Islam dental practice website

export class AccessibilitySystem {
  
  constructor(options = {}) {
    this.config = {
      // WCAG compliance level
      wcagLevel: 'AA',
      wcagVersion: '2.1',
      
      // Language support
      primaryLanguage: 'en',
      secondaryLanguage: 'ar',
      autoDetectLanguage: true,
      
      // Keyboard navigation
      enableKeyboardTraps: true,
      enableSkipLinks: false,
      enableFocusManagement: true,
      customFocusIndicators: true,
      
      // Screen reader support
      enableARIALive: true,
      enableLandmarkNavigation: true,
      enableDescriptiveHeadings: true,
      enableFormLabeling: true,
      
      // Visual accessibility
      enableHighContrast: true,
      enableReducedMotion: true,
      enableTextScaling: true,
      minColorContrast: 4.5,  // AA standard
      
      // Medical website specific
      enableMedicalTerminology: true,
      enableEmergencyAccessibility: true,
      enableFormValidationAnnouncements: true,
      enableAppointmentAccessibility: true,
      
      // Audit and monitoring
      enableRealTimeAudit: true,
      enableUsageTracking: true,
      auditInterval: 30000,
      
      ...options
    };

    // Accessibility state
    this.state = {
      currentLanguage: this.config.primaryLanguage,
      keyboardNavigation: false,
      screenReaderActive: false,
      highContrastMode: false,
      reducedMotionMode: false,
      textScaleLevel: 100,
      focusHistory: [],
      ariaLiveRegions: new Map(),
      landmarkElements: new Map(),
      auditResults: []
    };

    // Event handlers
    this.eventHandlers = new Map();
    this.focusTrapStack = [];
    this.mutationObserver = null;
    this.auditTimer = null;

    this.init();
  }

  /**
   * Initialize accessibility system
   */
  async init() {
    try {
      console.log('♿ Initializing Accessibility System...');
      
      // Core accessibility setup
      this.setupSemanticStructure();
      this.setupKeyboardNavigation();
      this.setupScreenReaderSupport();
      this.setupVisualAccessibility();
      this.setupLanguageSupport();
      
      // Medical website specific features
      this.setupMedicalAccessibility();
      this.setupEmergencyAccessibility();
      this.setupFormAccessibility();
      this.setupAppointmentAccessibility();
      
      // Dynamic content monitoring
      this.setupDynamicContentMonitoring();
      
      // Accessibility auditing
      if (this.config.enableRealTimeAudit) {
        this.startAccessibilityAuditing();
      }
      
      // User preference detection
      this.detectUserPreferences();
      
      console.log('✅ Accessibility System initialized successfully');
      
      // Announce to screen readers
      this.announceToScreenReader('Accessibility features have been loaded and are ready for use.');
      
    } catch (error) {
      console.error('❌ Accessibility System initialization failed:', error);
    }
  }

  /**
   * Set up semantic HTML structure and ARIA landmarks
   */
  setupSemanticStructure() {
    // Ensure proper document structure
    this.validateDocumentStructure();
    
    // Add ARIA landmarks if missing
    this.ensureLandmarkStructure();
    
    // Set up heading hierarchy
    this.validateHeadingStructure();
    
    // Add semantic roles where needed
    this.enhanceSemanticRoles();
    
    // Set up skip links
    if (this.config.enableSkipLinks) {
      this.createSkipLinks();
    }
  }

  /**
   * Validate and enhance document structure
   */
  validateDocumentStructure() {
    const doc = document.documentElement;
    
    // Ensure lang attribute exists
    if (!doc.lang) {
      doc.lang = this.config.primaryLanguage;
      console.log('♿ Added lang attribute to document');
    }
    
    // Ensure dir attribute for RTL support
    if (this.config.secondaryLanguage === 'ar' && !doc.dir) {
      doc.dir = 'ltr'; // Default, will be switched for Arabic
    }
    
    // Ensure title is descriptive
    const title = document.querySelector('title');
    if (title && (!title.textContent || title.textContent.trim().length < 10)) {
      title.textContent = 'Dr. Islam Dental Practice - Professional Dental Care Services';
      console.log('♿ Enhanced page title for accessibility');
    }
  }

  /**
   * Ensure proper ARIA landmark structure
   */
  ensureLandmarkStructure() {
    const landmarks = {
      header: 'banner',
      nav: 'navigation',
      main: 'main',
      aside: 'complementary',
      footer: 'contentinfo'
    };

    Object.entries(landmarks).forEach(([element, role]) => {
      let landmark = document.querySelector(element);
      
      if (!landmark) {
        // Try to find by role
        landmark = document.querySelector(`[role="${role}"]`);
      }
      
      if (landmark) {
        // Ensure role is set
        if (!landmark.getAttribute('role') && element !== 'main') {
          landmark.setAttribute('role', role);
        }
        
        // Add to landmarks map
        this.state.landmarkElements.set(role, landmark);
        
        // Add landmark navigation support
        this.enhanceLandmarkNavigation(landmark, role);
      }
    });

    // Ensure main content has proper focus management
    const main = this.state.landmarkElements.get('main');
    if (main && !main.getAttribute('tabindex')) {
      main.setAttribute('tabindex', '-1');
    }
  }

  /**
   * Validate heading structure (h1-h6 hierarchy)
   */
  validateHeadingStructure() {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let currentLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      // Check for proper heading hierarchy
      if (index === 0 && level !== 1) {
        console.warn('♿ Accessibility Warning: First heading should be h1, found:', heading.tagName);
      } else if (level > currentLevel + 1) {
        console.warn('♿ Accessibility Warning: Heading hierarchy skip detected:', heading.textContent);
      }
      
      currentLevel = level;
      
      // Ensure headings have proper content
      if (!heading.textContent || heading.textContent.trim().length < 3) {
        console.warn('♿ Accessibility Warning: Heading has insufficient content:', heading);
      }
      
      // Add IDs for anchor linking if missing
      if (!heading.id) {
        heading.id = this.generateHeadingId(heading.textContent);
      }
    });
  }

  /**
   * Set up comprehensive keyboard navigation
   */
  setupKeyboardNavigation() {
    // Track keyboard usage
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.state.keyboardNavigation = true;
        document.body.classList.add('keyboard-navigation');
        this.handleTabNavigation(e);
      }
    });

    // Remove keyboard class on mouse usage
    document.addEventListener('mousedown', () => {
      this.state.keyboardNavigation = false;
      document.body.classList.remove('keyboard-navigation');
    });

    // Set up custom focus indicators
    if (this.config.customFocusIndicators) {
      this.setupCustomFocusIndicators();
    }

    // Set up focus management
    if (this.config.enableFocusManagement) {
      this.setupFocusManagement();
    }

    // Set up keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Handle Tab navigation and focus management
   */
  handleTabNavigation(e) {
    const activeElement = document.activeElement;
    
    // Track focus history for better navigation
    this.state.focusHistory.push({
      element: activeElement,
      timestamp: Date.now(),
      direction: e.shiftKey ? 'backward' : 'forward'
    });

    // Keep only last 10 focus events
    if (this.state.focusHistory.length > 10) {
      this.state.focusHistory.shift();
    }

    // Handle focus traps
    if (this.focusTrapStack.length > 0) {
      const currentTrap = this.focusTrapStack[this.focusTrapStack.length - 1];
      this.handleFocusTrap(e, currentTrap);
    }

    // Special handling for medical forms
    if (activeElement && activeElement.closest('.medical-form, .booking-form')) {
      this.handleMedicalFormFocus(activeElement);
    }
  }

  /**
   * Set up custom focus indicators for better visibility
   */
  setupCustomFocusIndicators() {
    const focusCSS = `
      /* High-visibility focus indicators */
      .keyboard-navigation *:focus {
        outline: 3px solid #0066cc;
        outline-offset: 2px;
        box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px #0066cc;
        border-radius: 2px;
      }
      
      /* Enhanced focus for interactive elements */
      .keyboard-navigation button:focus,
      .keyboard-navigation a:focus,
      .keyboard-navigation input:focus,
      .keyboard-navigation select:focus,
      .keyboard-navigation textarea:focus {
        outline: 3px solid #ff6b35;
        outline-offset: 2px;
        box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px #ff6b35;
        background-color: rgba(255, 107, 53, 0.1);
      }
      
      /* Emergency contact focus */
      .keyboard-navigation .btn--emergency:focus,
      .keyboard-navigation [data-emergency="true"]:focus {
        outline: 3px solid #dc3545;
        outline-offset: 2px;
        box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px #dc3545;
        animation: emergency-focus-pulse 1s infinite;
      }
      
      @keyframes emergency-focus-pulse {
        0%, 100% { box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px #dc3545; }
        50% { box-shadow: 0 0 0 1px #ffffff, 0 0 0 6px #dc3545; }
      }
      
      /* High contrast focus indicators */
      @media (prefers-contrast: high) {
        .keyboard-navigation *:focus {
          outline: 4px solid #000000;
          outline-offset: 2px;
          box-shadow: 0 0 0 1px #ffffff, 0 0 0 6px #000000;
        }
      }
      
      /* Reduced motion focus */
      @media (prefers-reduced-motion: reduce) {
        .emergency-focus-pulse {
          animation: none !important;
        }
      }
    `;

    this.injectCSS(focusCSS, 'accessibility-focus-styles');
  }

  /**
   * Create skip links for keyboard navigation
   */
  createSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.setAttribute('aria-label', 'Skip navigation links');
    
    const links = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#primary-navigation', text: 'Skip to navigation' },
      { href: '#booking-section', text: 'Skip to appointment booking' },
      { href: '#contact-info', text: 'Skip to contact information' },
      { href: '#emergency-contact', text: 'Skip to emergency contact' }
    ];

    links.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      
      // Add event listener to ensure target is focusable
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.href);
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      
      skipLinks.appendChild(skipLink);
    });

    // Add skip links CSS
    const skipCSS = `
      .skip-links {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10000;
        width: 100%;
      }
      
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000000;
        color: #ffffff;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 0 0 4px 4px;
        font-weight: bold;
        font-size: 16px;
        transition: top 0.2s ease;
      }
      
      .skip-link:focus {
        top: 0;
        outline: 3px solid #ff6b35;
        outline-offset: 2px;
      }
      
      .skip-link:hover:focus {
        background: #333333;
      }
    `;

    this.injectCSS(skipCSS, 'accessibility-skip-links');
    
    // Insert skip links at the beginning of body
    document.body.insertBefore(skipLinks, document.body.firstChild);
  }

  /**
   * Set up comprehensive screen reader support
   */
  setupScreenReaderSupport() {
    // Detect screen reader usage
    this.detectScreenReader();
    
    // Set up ARIA live regions
    if (this.config.enableARIALive) {
      this.setupARIALiveRegions();
    }
    
    // Enhanced form labeling
    if (this.config.enableFormLabeling) {
      this.enhanceFormLabeling();
    }
    
    // Descriptive link text
    this.enhanceLinkDescriptions();
    
    // Image alternative text
    this.enhanceImageAccessibility();
    
    // Table accessibility
    this.enhanceTableAccessibility();
  }

  /**
   * Detect screen reader usage
   */
  detectScreenReader() {
    // Multiple methods to detect screen reader usage
    const hasScreenReader = 
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('VoiceOver') ||
      window.speechSynthesis ||
      'speechSynthesis' in window;
    
    if (hasScreenReader) {
      this.state.screenReaderActive = true;
      document.body.classList.add('screen-reader-active');
      console.log('♿ Screen reader detected');
    }

    // Enhanced detection through interaction patterns
    let potentialScreenReaderUser = false;
    let keyboardOnlyNavigation = 0;

    document.addEventListener('keydown', (e) => {
      if (['Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space'].includes(e.key)) {
        keyboardOnlyNavigation++;
        
        if (keyboardOnlyNavigation > 10 && !potentialScreenReaderUser) {
          potentialScreenReaderUser = true;
          this.state.screenReaderActive = true;
          document.body.classList.add('screen-reader-active');
          console.log('♿ Screen reader usage inferred from navigation patterns');
        }
      }
    });
  }

  /**
   * Set up ARIA live regions for dynamic content announcements
   */
  setupARIALiveRegions() {
    // Main announcement region
    const mainAnnouncer = this.createLiveRegion('main-announcements', 'polite');
    
    // Alert region for urgent messages
    const alertRegion = this.createLiveRegion('alert-announcements', 'assertive');
    
    // Status region for form validation and progress
    const statusRegion = this.createLiveRegion('status-announcements', 'polite');
    
    // Medical-specific regions
    const appointmentRegion = this.createLiveRegion('appointment-announcements', 'polite');
    const emergencyRegion = this.createLiveRegion('emergency-announcements', 'assertive');

    // Store references
    this.state.ariaLiveRegions.set('main', mainAnnouncer);
    this.state.ariaLiveRegions.set('alert', alertRegion);
    this.state.ariaLiveRegions.set('status', statusRegion);
    this.state.ariaLiveRegions.set('appointment', appointmentRegion);
    this.state.ariaLiveRegions.set('emergency', emergencyRegion);
  }

  /**
   * Create an ARIA live region
   */
  createLiveRegion(id, politeness = 'polite') {
    const region = document.createElement('div');
    region.id = id;
    region.setAttribute('aria-live', politeness);
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(region);
    return region;
  }

  /**
   * Set up medical website specific accessibility features
   */
  setupMedicalAccessibility() {
    // Medical terminology pronunciation guides
    if (this.config.enableMedicalTerminology) {
      this.setupMedicalTerminology();
    }
    
    // Service descriptions with accessibility enhancements
    this.enhanceServiceDescriptions();
    
    // Treatment information accessibility
    this.enhanceTreatmentInformation();
    
    // Doctor and staff information accessibility
    this.enhanceStaffInformation();
  }

  /**
   * Set up emergency accessibility features
   */
  setupEmergencyAccessibility() {
    if (!this.config.enableEmergencyAccessibility) return;

    // Find emergency contact elements
    const emergencyElements = document.querySelectorAll(
      '.btn--emergency, [data-emergency="true"], a[href^="tel:"], .emergency-contact'
    );

    emergencyElements.forEach(element => {
      // Enhance with ARIA attributes
      if (!element.getAttribute('aria-label')) {
        const text = element.textContent || 'Emergency contact';
        element.setAttribute('aria-label', `Emergency: ${text}`);
      }
      
      // Add role if missing
      if (!element.getAttribute('role') && element.tagName !== 'A' && element.tagName !== 'BUTTON') {
        element.setAttribute('role', 'button');
      }
      
      // Ensure keyboard accessibility
      if (!element.getAttribute('tabindex') && !['A', 'BUTTON', 'INPUT'].includes(element.tagName)) {
        element.setAttribute('tabindex', '0');
        
        // Add keyboard activation
        element.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
          }
        });
      }
      
      // Add emergency announcement
      element.addEventListener('focus', () => {
        this.announceToScreenReader('Emergency contact focused. Press Enter or Space to activate.', 'emergency');
      });
      
      element.addEventListener('click', () => {
        this.announceToScreenReader('Emergency contact activated.', 'emergency');
      });
    });
  }

  /**
   * Set up form accessibility features
   */
  setupFormAccessibility() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add form landmark
      if (!form.getAttribute('role')) {
        form.setAttribute('role', 'form');
      }
      
      // Add form description
      if (!form.getAttribute('aria-label') && !form.getAttribute('aria-labelledby')) {
        const formType = this.getFormType(form);
        form.setAttribute('aria-label', `${formType} form`);
      }
      
      // Enhance form fields
      this.enhanceFormFields(form);
      
      // Set up validation announcements
      if (this.config.enableFormValidationAnnouncements) {
        this.setupFormValidationAnnouncements(form);
      }
      
      // Add submission feedback
      this.setupFormSubmissionFeedback(form);
    });
  }

  /**
   * Enhance form fields with proper labeling and instructions
   */
  enhanceFormFields(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
      // Ensure proper labeling
      this.ensureFieldLabeling(field);
      
      // Add required field announcements
      if (field.required) {
        this.enhanceRequiredField(field);
      }
      
      // Add format instructions for special fields
      this.addFieldInstructions(field);
      
      // Set up real-time validation feedback
      this.setupFieldValidation(field);
    });
  }

  /**
   * Set up appointment booking accessibility
   */
  setupAppointmentAccessibility() {
    if (!this.config.enableAppointmentAccessibility) return;

    // Find booking elements
    const bookingElements = document.querySelectorAll(
      '.booking-trigger, .cta-button, [data-booking="true"], .appointment-form'
    );

    bookingElements.forEach(element => {
      // Enhanced ARIA labeling
      if (element.classList.contains('cta-button') || element.dataset.booking === 'true') {
        if (!element.getAttribute('aria-label')) {
          element.setAttribute('aria-label', 'Schedule dental appointment');
        }
        
        if (!element.getAttribute('aria-describedby')) {
          const description = this.createBookingDescription();
          element.setAttribute('aria-describedby', description.id);
        }
      }
      
      // Booking flow announcements
      element.addEventListener('click', () => {
        this.announceToScreenReader('Opening appointment booking system. Please wait while the booking form loads.', 'appointment');
      });
    });

    // Monitor for dynamic booking content
    this.monitorBookingContent();
  }

  /**
   * Set up language support for multilingual accessibility
   */
  setupLanguageSupport() {
    // Language switcher accessibility
    const langSwitchers = document.querySelectorAll('[data-lang], .lang-switch, .language-selector');
    
    langSwitchers.forEach(switcher => {
      if (!switcher.getAttribute('aria-label')) {
        const lang = switcher.dataset.lang || switcher.textContent;
        switcher.setAttribute('aria-label', `Switch to ${lang} language`);
      }
      
      switcher.addEventListener('click', (e) => {
        const newLang = e.target.dataset.lang || e.target.getAttribute('hreflang');
        if (newLang) {
          this.switchLanguage(newLang);
        }
      });
    });

    // Set up RTL support detection
    if (this.config.autoDetectLanguage) {
      this.setupLanguageDetection();
    }
  }

  /**
   * Switch language and update accessibility features
   */
  switchLanguage(newLang) {
    const oldLang = this.state.currentLanguage;
    this.state.currentLanguage = newLang;
    
    // Update document language
    document.documentElement.lang = newLang;
    
    // Update direction for RTL languages
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
    
    // Announce language change
    const langNames = { en: 'English', ar: 'Arabic' };
    this.announceToScreenReader(`Language switched to ${langNames[newLang] || newLang}`, 'main');
    
    // Update ARIA labels and descriptions for new language
    this.updateLanguageDependentARIA(newLang);
    
    console.log(`♿ Language switched from ${oldLang} to ${newLang}`);
  }

  /**
   * Set up visual accessibility features
   */
  setupVisualAccessibility() {
    // High contrast mode support
    if (this.config.enableHighContrast) {
      this.setupHighContrastMode();
    }
    
    // Reduced motion support
    if (this.config.enableReducedMotion) {
      this.setupReducedMotionMode();
    }
    
    // Text scaling support
    if (this.config.enableTextScaling) {
      this.setupTextScaling();
    }
    
    // Color contrast monitoring
    this.setupColorContrastMonitoring();
  }

  /**
   * Set up dynamic content monitoring for accessibility
   */
  setupDynamicContentMonitoring() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        // Handle added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.processNewContent(node);
          }
        });
        
        // Handle attribute changes
        if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
          this.handleAttributeChange(mutation);
        }
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'aria-hidden', 'role', 'aria-label']
    });
  }

  /**
   * Process newly added content for accessibility
   */
  processNewContent(element) {
    // Enhance forms if any were added
    const newForms = element.matches('form') ? [element] : Array.from(element.querySelectorAll('form'));
    newForms.forEach(form => this.enhanceFormFields(form));
    
    // Enhance images
    const newImages = element.matches('img') ? [element] : Array.from(element.querySelectorAll('img'));
    newImages.forEach(img => this.enhanceImageAccessibility(img));
    
    // Enhance interactive elements
    const interactiveElements = element.querySelectorAll('button, a, input, select, textarea, [tabindex], [role="button"]');
    interactiveElements.forEach(el => this.enhanceInteractiveElement(el));
    
    // Check for modal or dialog content
    if (element.matches('.modal, .dialog, [role="dialog"], [role="alertdialog"]') || 
        element.querySelector('.modal, .dialog, [role="dialog"], [role="alertdialog"]')) {
      this.handleModalAccessibility(element);
    }
  }

  /**
   * Start real-time accessibility auditing
   */
  startAccessibilityAuditing() {
    this.auditTimer = setInterval(() => {
      this.performAccessibilityAudit();
    }, this.config.auditInterval);
    
    // Perform initial audit
    setTimeout(() => this.performAccessibilityAudit(), 2000);
  }

  /**
   * Perform comprehensive accessibility audit
   */
  performAccessibilityAudit() {
    const auditResults = {
      timestamp: Date.now(),
      violations: [],
      warnings: [],
      passes: [],
      summary: {}
    };

    // Audit WCAG compliance
    const wcagResults = this.auditWCAGCompliance();
    auditResults.violations.push(...wcagResults.violations);
    auditResults.warnings.push(...wcagResults.warnings);
    auditResults.passes.push(...wcagResults.passes);

    // Audit keyboard accessibility
    const keyboardResults = this.auditKeyboardAccessibility();
    auditResults.violations.push(...keyboardResults.violations);
    auditResults.warnings.push(...keyboardResults.warnings);

    // Audit screen reader compatibility
    const screenReaderResults = this.auditScreenReaderCompatibility();
    auditResults.violations.push(...screenReaderResults.violations);
    auditResults.warnings.push(...screenReaderResults.warnings);

    // Generate summary
    auditResults.summary = {
      totalViolations: auditResults.violations.length,
      totalWarnings: auditResults.warnings.length,
      totalPasses: auditResults.passes.length,
      complianceScore: this.calculateComplianceScore(auditResults)
    };

    // Store results
    this.state.auditResults.push(auditResults);
    
    // Keep only last 10 audits
    if (this.state.auditResults.length > 10) {
      this.state.auditResults.shift();
    }

    // Log results
    if (auditResults.violations.length > 0) {
      console.warn('♿ Accessibility Violations Found:', auditResults.violations);
    }
    
    if (auditResults.warnings.length > 0) {
      console.warn('♿ Accessibility Warnings:', auditResults.warnings);
    }

    console.log(`♿ Accessibility Audit Complete: ${auditResults.summary.complianceScore}% compliant`);
    
    return auditResults;
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message, region = 'main') {
    const liveRegion = this.state.ariaLiveRegions.get(region);
    if (liveRegion) {
      // Clear previous message
      liveRegion.textContent = '';
      
      // Set new message with slight delay for better screen reader support
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
      
      // Clear message after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 5000);
    }
  }

  /**
   * Create focus trap for modals and forms
   */
  createFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return null;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const focusTrap = {
      container,
      firstElement,
      lastElement,
      isActive: true,
      previousFocus: document.activeElement
    };
    
    // Add to focus trap stack
    this.focusTrapStack.push(focusTrap);
    
    // Focus first element
    firstElement.focus();
    
    return focusTrap;
  }

  /**
   * Remove focus trap
   */
  removeFocusTrap(focusTrap) {
    const index = this.focusTrapStack.indexOf(focusTrap);
    if (index > -1) {
      this.focusTrapStack.splice(index, 1);
      focusTrap.isActive = false;
      
      // Restore previous focus
      if (focusTrap.previousFocus && focusTrap.previousFocus.focus) {
        focusTrap.previousFocus.focus();
      }
    }
  }

  /**
   * Utility methods
   */

  injectCSS(css, id) {
    // Remove existing style if present
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Inject new styles
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  generateHeadingId(text) {
    return text.toLowerCase()
               .replace(/[^a-z0-9]+/g, '-')
               .replace(/^-+|-+$/g, '')
               .substring(0, 50);
  }

  getFormType(form) {
    if (form.id) return form.id.replace('-form', '');
    if (form.action.includes('booking')) return 'appointment booking';
    if (form.action.includes('contact')) return 'contact';
    if (form.querySelector('[type="email"]')) return 'contact';
    return 'form';
  }

  calculateComplianceScore(auditResults) {
    const totalChecks = auditResults.violations.length + auditResults.warnings.length + auditResults.passes.length;
    if (totalChecks === 0) return 100;
    
    return Math.round((auditResults.passes.length / totalChecks) * 100);
  }

  /**
   * Public API methods
   */

  /**
   * Get current accessibility state
   */
  getAccessibilityState() {
    return { ...this.state };
  }

  /**
   * Force accessibility audit
   */
  auditAccessibility() {
    return this.performAccessibilityAudit();
  }

  /**
   * Toggle high contrast mode
   */
  toggleHighContrast() {
    this.state.highContrastMode = !this.state.highContrastMode;
    document.body.classList.toggle('high-contrast', this.state.highContrastMode);
    
    this.announceToScreenReader(
      `High contrast mode ${this.state.highContrastMode ? 'enabled' : 'disabled'}`,
      'main'
    );
  }

  /**
   * Set text scale level (100-200%)
   */
  setTextScale(scale) {
    this.state.textScaleLevel = Math.max(100, Math.min(200, scale));
    document.documentElement.style.fontSize = `${(16 * this.state.textScaleLevel) / 100}px`;
    
    this.announceToScreenReader(`Text size set to ${this.state.textScaleLevel}%`, 'main');
  }

  /**
   * Destroy accessibility system
   */
  destroy() {
    // Disconnect observers
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    // Clear timers
    if (this.auditTimer) {
      clearInterval(this.auditTimer);
    }
    
    // Remove event handlers
    this.eventHandlers.forEach((handler, element) => {
      element.removeEventListener('keydown', handler);
    });
    
    // Clear focus traps
    this.focusTrapStack.forEach(trap => {
      this.removeFocusTrap(trap);
    });
    
    console.log('♿ Accessibility System destroyed');
  }
}

// Initialize accessibility system when DOM is ready
let accessibilitySystem = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    accessibilitySystem = new AccessibilitySystem();
    window.accessibilitySystem = accessibilitySystem;
  });
} else {
  accessibilitySystem = new AccessibilitySystem();
  window.accessibilitySystem = accessibilitySystem;
}

export default AccessibilitySystem;