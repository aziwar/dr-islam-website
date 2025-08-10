// PWA MANAGER - Progressive Web App implementation for medical practice
// Complete PWA functionality with offline support, push notifications, and app-like experience

export class PWAManager {
  
  constructor(options = {}) {
    this.config = {
      // PWA Configuration
      appName: 'Dr. Islam Dental Practice',
      shortName: 'Dr Islam Dental',
      description: 'Professional dental care services with emergency support',
      themeColor: '#BEB093',
      backgroundColor: '#FFFFFF',
      startUrl: '/',
      display: 'standalone',
      orientation: 'portrait-primary',
      
      // Medical website specific
      enableMedicalOfflineMode: true,
      enableAppointmentReminders: true,
      enableEmergencyNotifications: true,
      enableOfflineEmergencyInfo: true,
      
      // Push notifications
      enablePushNotifications: true,
      vapidPublicKey: process.env.VAPID_PUBLIC_KEY || null,
      notificationCategories: [
        'appointment-reminder',
        'emergency-alert',
        'treatment-followup',
        'health-tips',
        'clinic-updates'
      ],
      
      // Offline functionality
      offlinePages: [
        '/',
        '/services',
        '/contact',
        '/emergency',
        '/about'
      ],
      
      offlineResources: [
        '/css/critical.css',
        '/js/core-utils.js',
        '/optimized-images/logo-80w.webp',
        '/emergency-contact-info.json'
      ],
      
      // App-like features
      enableFullscreen: true,
      enableScreenWakeLock: true,
      enableBackgroundSync: true,
      enablePeriodicSync: true,
      
      ...options
    };

    // PWA state
    this.state = {
      isInstalled: false,
      isStandalone: false,
      installPromptEvent: null,
      serviceWorkerReady: false,
      pushSubscription: null,
      offlineMode: false,
      lastSyncTime: null,
      pendingData: [],
      wakeLock: null
    };

    // Event handlers
    this.eventHandlers = new Map();
    this.notificationQueue = [];
    this.installationFlow = null;

    this.init();
  }

  /**
   * Initialize PWA Manager
   */
  async init() {
    try {
      console.log('📱 Initializing PWA Manager...');
      
      // Check PWA support
      this.checkPWASupport();
      
      // Generate and inject manifest
      await this.generateManifest();
      
      // Set up service worker
      await this.setupServiceWorker();
      
      // Set up app installation
      this.setupInstallationFlow();
      
      // Set up push notifications
      if (this.config.enablePushNotifications) {
        await this.setupPushNotifications();
      }
      
      // Set up offline functionality
      this.setupOfflineSupport();
      
      // Set up medical-specific PWA features
      this.setupMedicalPWAFeatures();
      
      // Set up app-like behaviors
      this.setupAppLikeBehaviors();
      
      // Monitor PWA metrics
      this.setupPWAMetrics();
      
      console.log('✅ PWA Manager initialized successfully');
      
      // Announce PWA readiness
      this.announceToUsers('Progressive Web App features are now available');
      
    } catch (error) {
      console.error('❌ PWA Manager initialization failed:', error);
    }
  }

  /**
   * Check PWA support in current browser
   */
  checkPWASupport() {
    const support = {
      serviceWorker: 'serviceWorker' in navigator,
      manifest: 'serviceWorker' in navigator && 'PushManager' in window,
      pushNotifications: 'PushManager' in window && 'Notification' in window,
      backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
      periodicSync: 'serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype,
      installPrompt: 'BeforeInstallPromptEvent' in window,
      fullscreen: 'requestFullscreen' in document.documentElement,
      wakeLock: 'wakeLock' in navigator
    };

    console.log('📱 PWA Support:', support);
    
    // Store support info
    this.state.support = support;
    
    // Show warnings for unsupported features
    if (!support.serviceWorker) {
      console.warn('⚠️ Service Worker not supported - PWA features will be limited');
    }
    
    if (!support.pushNotifications) {
      console.warn('⚠️ Push notifications not supported');
    }

    return support;
  }

  /**
   * Generate and inject PWA manifest
   */
  async generateManifest() {
    const manifest = {
      name: this.config.appName,
      short_name: this.config.shortName,
      description: this.config.description,
      start_url: this.config.startUrl,
      display: this.config.display,
      orientation: this.config.orientation,
      theme_color: this.config.themeColor,
      background_color: this.config.backgroundColor,
      
      // App icons for various sizes
      icons: [
        {
          src: '/optimized-images/pwa/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-96x96.png',
          sizes: '96x96', 
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: '/optimized-images/pwa/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any'
        }
      ],
      
      // Medical website specific categories
      categories: ['medical', 'health', 'healthcare', 'dental'],
      
      // Shortcuts for common actions
      shortcuts: [
        {
          name: 'Book Appointment',
          short_name: 'Book',
          description: 'Schedule a dental appointment',
          url: '/book?utm_source=pwa_shortcut',
          icons: [
            {
              src: '/optimized-images/pwa/shortcut-book.png',
              sizes: '96x96',
              type: 'image/png'
            }
          ]
        },
        {
          name: 'Emergency Contact',
          short_name: 'Emergency',
          description: 'Contact for dental emergencies',
          url: '/emergency?utm_source=pwa_shortcut',
          icons: [
            {
              src: '/optimized-images/pwa/shortcut-emergency.png',
              sizes: '96x96',
              type: 'image/png'
            }
          ]
        },
        {
          name: 'Services',
          short_name: 'Services',
          description: 'View our dental services',
          url: '/services?utm_source=pwa_shortcut',
          icons: [
            {
              src: '/optimized-images/pwa/shortcut-services.png',
              sizes: '96x96',
              type: 'image/png'
            }
          ]
        },
        {
          name: 'Contact Us',
          short_name: 'Contact',
          description: 'Get in touch with our practice',
          url: '/contact?utm_source=pwa_shortcut',
          icons: [
            {
              src: '/optimized-images/pwa/shortcut-contact.png',
              sizes: '96x96',
              type: 'image/png'
            }
          ]
        }
      ],

      // Screenshots for app store listings
      screenshots: [
        {
          src: '/optimized-images/pwa/screenshot-1.png',
          sizes: '540x720',
          type: 'image/png',
          form_factor: 'narrow'
        },
        {
          src: '/optimized-images/pwa/screenshot-2.png',
          sizes: '720x540',
          type: 'image/png',
          form_factor: 'wide'
        }
      ],
      
      // Share target for sharing medical information
      share_target: {
        action: '/share',
        method: 'POST',
        enctype: 'multipart/form-data',
        params: {
          title: 'title',
          text: 'text',
          url: 'url'
        }
      },

      // Protocol handlers for tel: links
      protocol_handlers: [
        {
          protocol: 'tel',
          url: '/emergency?phone=%s'
        }
      ]
    };

    // Convert to JSON and create blob URL
    const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json'
    });
    const manifestURL = URL.createObjectURL(manifestBlob);

    // Inject manifest link
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = manifestURL;
    document.head.appendChild(manifestLink);

    // Add iOS-specific meta tags
    this.addIOSMetaTags();
    
    console.log('📱 PWA Manifest generated and injected');
    return manifest;
  }

  /**
   * Add iOS-specific meta tags for better PWA support
   */
  addIOSMetaTags() {
    const metaTags = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: this.config.shortName },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'msapplication-TileColor', content: this.config.themeColor },
      { name: 'msapplication-tap-highlight', content: 'no' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Add iOS icons
    const iconSizes = [57, 72, 76, 114, 120, 144, 152, 180];
    iconSizes.forEach(size => {
      const link = document.createElement('link');
      link.rel = 'apple-touch-icon';
      link.sizes = `${size}x${size}`;
      link.href = `/optimized-images/pwa/apple-icon-${size}x${size}.png`;
      document.head.appendChild(link);
    });
  }

  /**
   * Set up service worker for PWA functionality
   */
  async setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('⚠️ Service Worker not supported');
      return;
    }

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      console.log('✅ Service Worker registered:', registration);
      
      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;
      this.state.serviceWorkerReady = true;
      
      // Listen for service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New update available
            this.showUpdateAvailable();
          }
        });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleServiceWorkerMessage(event.data);
      });

      // Set up background sync
      if (this.config.enableBackgroundSync) {
        await this.setupBackgroundSync(registration);
      }

      // Set up periodic sync
      if (this.config.enablePeriodicSync) {
        await this.setupPeriodicSync(registration);
      }

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  }

  /**
   * Set up app installation flow
   */
  setupInstallationFlow() {
    // Detect if app is already installed
    this.detectInstallationState();
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.state.installPromptEvent = e;
      this.showInstallPrompt();
    });

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      this.state.isInstalled = true;
      this.handleAppInstalled();
    });

    // Check if launched from home screen
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.state.isStandalone = true;
      this.handleStandaloneMode();
    }
  }

  /**
   * Show custom install prompt
   */
  showInstallPrompt() {
    // Create elegant install prompt UI
    const installPrompt = document.createElement('div');
    installPrompt.className = 'pwa-install-prompt';
    installPrompt.innerHTML = `
      <div class="install-prompt-content">
        <div class="install-prompt-icon">
          📱
        </div>
        <div class="install-prompt-text">
          <h3>Install Dr. Islam Dental App</h3>
          <p>Get faster access to appointments and emergency contact with our app</p>
        </div>
        <div class="install-prompt-actions">
          <button class="btn btn--primary" id="install-app-btn">Install</button>
          <button class="btn btn--secondary" id="dismiss-install-btn">Maybe Later</button>
        </div>
      </div>
    `;

    // Add installation CSS
    this.injectInstallCSS();
    
    document.body.appendChild(installPrompt);

    // Handle install button
    document.getElementById('install-app-btn').addEventListener('click', async () => {
      if (this.state.installPromptEvent) {
        this.state.installPromptEvent.prompt();
        const { outcome } = await this.state.installPromptEvent.userChoice;
        
        if (outcome === 'accepted') {
          console.log('✅ User accepted app installation');
        } else {
          console.log('❌ User dismissed app installation');
        }
        
        this.state.installPromptEvent = null;
        installPrompt.remove();
      }
    });

    // Handle dismiss button
    document.getElementById('dismiss-install-btn').addEventListener('click', () => {
      installPrompt.remove();
      
      // Show again in 7 days
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    });

    // Auto-hide after 30 seconds
    setTimeout(() => {
      if (installPrompt.parentNode) {
        installPrompt.remove();
      }
    }, 30000);
  }

  /**
   * Set up push notifications
   */
  async setupPushNotifications() {
    if (!('PushManager' in window) || !('Notification' in window)) {
      console.warn('⚠️ Push notifications not supported');
      return;
    }

    // Request notification permission
    const permission = await this.requestNotificationPermission();
    
    if (permission === 'granted') {
      await this.subscribeToPush();
      this.setupNotificationHandling();
    }
  }

  /**
   * Request notification permission with context
   */
  async requestNotificationPermission() {
    if (Notification.permission === 'granted') {
      return 'granted';
    }

    // Show permission request UI first
    const shouldRequest = await this.showPermissionRequestUI();
    
    if (shouldRequest) {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        this.showNotificationSuccess();
      } else {
        this.showNotificationDenied();
      }
      
      return permission;
    }
    
    return Notification.permission;
  }

  /**
   * Show permission request UI
   */
  showPermissionRequestUI() {
    return new Promise((resolve) => {
      const permissionPrompt = document.createElement('div');
      permissionPrompt.className = 'pwa-permission-prompt';
      permissionPrompt.innerHTML = `
        <div class="permission-prompt-content">
          <div class="permission-prompt-icon">
            🔔
          </div>
          <div class="permission-prompt-text">
            <h3>Stay Updated</h3>
            <p>Receive appointment reminders and important health updates</p>
            <ul>
              <li>Appointment reminders</li>
              <li>Emergency dental tips</li>
              <li>Health and wellness updates</li>
            </ul>
          </div>
          <div class="permission-prompt-actions">
            <button class="btn btn--primary" id="allow-notifications-btn">Enable Notifications</button>
            <button class="btn btn--secondary" id="skip-notifications-btn">Skip for Now</button>
          </div>
        </div>
      `;

      document.body.appendChild(permissionPrompt);

      document.getElementById('allow-notifications-btn').addEventListener('click', () => {
        permissionPrompt.remove();
        resolve(true);
      });

      document.getElementById('skip-notifications-btn').addEventListener('click', () => {
        permissionPrompt.remove();
        resolve(false);
      });
    });
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.config.vapidPublicKey)
      });

      this.state.pushSubscription = subscription;
      
      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
      
      console.log('✅ Push notification subscription created');
      
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
    }
  }

  /**
   * Set up medical-specific PWA features
   */
  setupMedicalPWAFeatures() {
    // Emergency offline information
    if (this.config.enableOfflineEmergencyInfo) {
      this.cacheEmergencyInformation();
    }

    // Appointment reminders
    if (this.config.enableAppointmentReminders) {
      this.setupAppointmentReminders();
    }

    // Medical data sync
    this.setupMedicalDataSync();
    
    // Health tips notifications
    this.setupHealthTipsNotifications();
  }

  /**
   * Cache essential emergency information for offline access
   */
  async cacheEmergencyInformation() {
    const emergencyInfo = {
      phone: '+1234567890',
      address: '123 Medical Center Dr, City, State 12345',
      hours: {
        emergency: '24/7 Emergency Line Available',
        regular: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM'
      },
      services: [
        'Emergency tooth pain relief',
        'Broken tooth repair',
        'Lost filling replacement',
        'Dental trauma care'
      ],
      instructions: {
        'Severe Pain': 'Rinse with warm water, use cold compress, avoid aspirin on gums',
        'Broken Tooth': 'Save pieces, rinse mouth, apply cold compress',
        'Lost Filling': 'Keep area clean, use temporary filling material if available',
        'Knocked Out Tooth': 'Handle by crown only, keep moist, see dentist within 30 minutes'
      }
    };

    // Store in localStorage for offline access
    localStorage.setItem('emergency-dental-info', JSON.stringify(emergencyInfo));
    
    // Also cache via service worker
    if (this.state.serviceWorkerReady) {
      navigator.serviceWorker.controller?.postMessage({
        type: 'CACHE_EMERGENCY_INFO',
        data: emergencyInfo
      });
    }
  }

  /**
   * Set up app-like behaviors
   */
  setupAppLikeBehaviors() {
    // Fullscreen support
    if (this.config.enableFullscreen) {
      this.setupFullscreenSupport();
    }

    // Screen wake lock for emergency situations
    if (this.config.enableScreenWakeLock) {
      this.setupWakeLock();
    }

    // App-like navigation
    this.setupAppNavigation();
    
    // Handle app lifecycle events
    this.setupLifecycleEvents();
  }

  /**
   * Set up screen wake lock for emergency situations
   */
  async setupWakeLock() {
    if (!('wakeLock' in navigator)) {
      console.warn('⚠️ Wake Lock API not supported');
      return;
    }

    // Enable wake lock during emergency contact
    document.addEventListener('click', async (e) => {
      if (e.target.closest('.btn--emergency, [data-emergency="true"]')) {
        try {
          this.state.wakeLock = await navigator.wakeLock.request('screen');
          
          // Release after 5 minutes or when user closes emergency
          setTimeout(() => {
            if (this.state.wakeLock) {
              this.state.wakeLock.release();
              this.state.wakeLock = null;
            }
          }, 300000);
          
        } catch (error) {
          console.error('❌ Wake lock failed:', error);
        }
      }
    });
  }

  /**
   * Set up PWA metrics and analytics
   */
  setupPWAMetrics() {
    // Track PWA usage
    if (this.state.isStandalone) {
      this.trackEvent('pwa_launched_standalone');
    }
    
    // Track installation funnel
    this.trackInstallationFunnel();
    
    // Monitor offline usage
    this.monitorOfflineUsage();
    
    // Track notification engagement
    this.trackNotificationMetrics();
  }

  /**
   * Handle service worker messages
   */
  handleServiceWorkerMessage(data) {
    switch (data.type) {
      case 'OFFLINE_MODE':
        this.handleOfflineMode(data.offline);
        break;
      case 'SYNC_COMPLETE':
        this.handleSyncComplete(data);
        break;
      case 'CACHE_UPDATE':
        this.handleCacheUpdate(data);
        break;
      case 'EMERGENCY_NOTIFICATION':
        this.handleEmergencyNotification(data);
        break;
    }
  }

  /**
   * Show update available notification
   */
  showUpdateAvailable() {
    // Inject modern update banner CSS
    this.injectUpdateBannerCSS();

    const updateBanner = document.createElement('div');
    updateBanner.className = 'pwa-update-banner';
    updateBanner.setAttribute('role', 'banner');
    updateBanner.setAttribute('aria-label', 'App update notification');
    updateBanner.innerHTML = `
      <div class="update-banner-content">
        <div class="update-banner-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z" transform="rotate(270 12 12)"/>
          </svg>
        </div>
        <div class="update-banner-text">
          <span class="update-title">App update available</span>
          <span class="update-subtitle">Get the latest features and improvements</span>
        </div>
        <div class="update-banner-actions">
          <button class="btn btn--update-primary" id="update-app-btn" aria-label="Update app now">
            Update Now
          </button>
          <button class="btn btn--update-dismiss" id="dismiss-update-btn" aria-label="Dismiss update notification">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(updateBanner);

    // Add smooth entrance animation
    requestAnimationFrame(() => {
      updateBanner.classList.add('show');
    });

    document.getElementById('update-app-btn').addEventListener('click', () => {
      updateBanner.classList.add('updating');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });

    document.getElementById('dismiss-update-btn').addEventListener('click', () => {
      updateBanner.classList.add('dismissing');
      setTimeout(() => {
        updateBanner.remove();
      }, 300);
    });
  }

  /**
   * Utility methods
   */

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }

  injectInstallCSS() {
    const css = `
      .pwa-install-prompt {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideUp 0.3s ease;
      }
      
      .install-prompt-content {
        display: flex;
        align-items: center;
        padding: 20px;
        gap: 16px;
      }
      
      .install-prompt-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }
      
      .install-prompt-text h3 {
        margin: 0 0 4px 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      
      .install-prompt-text p {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
      }
      
      .install-prompt-actions {
        display: flex;
        gap: 8px;
        flex-direction: column;
        min-width: 120px;
      }
      
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      
      @media (min-width: 768px) {
        .pwa-install-prompt {
          max-width: 500px;
          left: auto;
          right: 20px;
        }
        
        .install-prompt-actions {
          flex-direction: row;
        }
      }
    `;
    
    this.injectCSS(css, 'pwa-install-styles');
  }

  /**
   * Inject modern update banner CSS
   */
  injectUpdateBannerCSS() {
    const css = `
      .pwa-update-banner {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04),
          0 0 0 1px rgba(0, 0, 0, 0.05);
        z-index: 10001;
        transform: translateX(calc(100% + 40px));
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, opacity;
        contain: layout style;
      }

      .pwa-update-banner.show {
        transform: translateX(0);
        opacity: 1;
      }

      .pwa-update-banner.updating {
        transform: scale(0.95);
        opacity: 0.7;
      }

      .pwa-update-banner.dismissing {
        transform: translateX(calc(100% + 40px)) scale(0.9);
        opacity: 0;
      }

      .update-banner-content {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 20px;
      }

      .update-banner-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #BEB093 0%, #D4C5A3 100%);
        border-radius: 12px;
        color: white;
        box-shadow: 0 4px 8px rgba(190, 176, 147, 0.3);
      }

      .update-banner-text {
        flex: 1;
        min-width: 0;
      }

      .update-title {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
        line-height: 1.4;
      }

      .update-subtitle {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
        line-height: 1.4;
      }

      .update-banner-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex-shrink: 0;
      }

      .btn--update-primary {
        background: linear-gradient(135deg, #BEB093 0%, #D4C5A3 100%);
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(190, 176, 147, 0.2);
        min-width: 100px;
      }

      .btn--update-primary:hover {
        background: linear-gradient(135deg, #A69A81 0%, #C2B391 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(190, 176, 147, 0.3);
      }

      .btn--update-primary:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(190, 176, 147, 0.2);
      }

      .btn--update-dismiss {
        background: transparent;
        border: 1px solid #e5e7eb;
        color: #6b7280;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      }

      .btn--update-dismiss:hover {
        background: #f3f4f6;
        border-color: #d1d5db;
        color: #374151;
      }

      .btn--update-dismiss:active {
        background: #e5e7eb;
        transform: scale(0.95);
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .pwa-update-banner {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
          transform: translateY(-100%);
        }

        .pwa-update-banner.show {
          transform: translateY(0);
        }

        .pwa-update-banner.dismissing {
          transform: translateY(-100%) scale(0.95);
        }

        .update-banner-content {
          padding: 16px;
          gap: 12px;
        }

        .update-banner-icon {
          width: 36px;
          height: 36px;
        }

        .update-banner-actions {
          flex-direction: row;
        }

        .btn--update-primary {
          font-size: 0.8rem;
          padding: 8px 12px;
          min-width: 80px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .pwa-update-banner {
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }

        .update-title {
          color: #f9fafb;
        }

        .update-subtitle {
          color: #d1d5db;
        }

        .btn--update-dismiss {
          border-color: #374151;
          color: #9ca3af;
        }

        .btn--update-dismiss:hover {
          background: #374151;
          border-color: #4b5563;
          color: #d1d5db;
        }
      }

      /* High contrast mode */
      @media (prefers-contrast: high) {
        .pwa-update-banner {
          border: 2px solid #000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .update-title {
          color: #000;
          font-weight: 700;
        }

        .btn--update-primary {
          background: #000;
          color: #fff;
          border: 2px solid #000;
        }

        .btn--update-dismiss {
          border: 2px solid #000;
          color: #000;
        }
      }

      /* Reduce motion */
      @media (prefers-reduced-motion: reduce) {
        .pwa-update-banner {
          transition: opacity 0.2s ease;
        }

        .pwa-update-banner.updating,
        .pwa-update-banner.dismissing {
          transform: none;
        }
      }
    `;

    this.injectCSS(css, 'pwa-update-banner-styles');
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

  trackEvent(eventName, data = {}) {
    // Track PWA events
    console.log(`📊 PWA Event: ${eventName}`, data);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'pwa',
        ...data
      });
    }
  }

  announceToUsers(message) {
    // Announce PWA features to users
    if (window.performanceMonitor) {
      window.performanceMonitor.announceToScreenReader?.(message, 'main');
    }
  }

  /**
   * Public API methods
   */

  /**
   * Install the app programmatically
   */
  async installApp() {
    if (this.state.installPromptEvent) {
      this.state.installPromptEvent.prompt();
      const { outcome } = await this.state.installPromptEvent.userChoice;
      return outcome === 'accepted';
    }
    return false;
  }

  /**
   * Check if app is installed
   */
  isAppInstalled() {
    return this.state.isInstalled || this.state.isStandalone;
  }

  /**
   * Send push notification
   */
  async sendNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/optimized-images/pwa/icon-192x192.png',
        badge: '/optimized-images/pwa/badge-72x72.png',
        ...options
      });
      
      return notification;
    }
    
    return null;
  }

  /**
   * Get PWA state
   */
  getPWAState() {
    return { ...this.state };
  }

  /**
   * Destroy PWA manager
   */
  destroy() {
    // Release wake lock
    if (this.state.wakeLock) {
      this.state.wakeLock.release();
    }
    
    // Clear event handlers
    this.eventHandlers.clear();
    
    console.log('📱 PWA Manager destroyed');
  }
}

// Initialize PWA manager when DOM is ready
let pwaManager = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    pwaManager = new PWAManager();
    window.pwaManager = pwaManager;
  });
} else {
  pwaManager = new PWAManager();
  window.pwaManager = pwaManager;
}

export default PWAManager;