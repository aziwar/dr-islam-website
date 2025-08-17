// Modern Header Interactions - 2024/2025 Standards
// Advanced navigation interactions with accessibility, performance, and modern UX

class ModernHeaderController {
  constructor() {
    this.header = null;
    this.mobileToggle = null;
    this.mobileMenu = null;
    this.navigationMenu = null;
    this.backdrop = null;
    this.dropdownTriggers = [];
    this.isMenuOpen = false;
    this.activeDropdown = null;
    this.focusableElements = [];
    this.lastFocusedElement = null;
    
    // Performance and behavior settings
    this.prefersReducedMotion = window.matchMedia('(prefers-reduce-motion: reduce)').matches;
    this.isTouch = 'ontouchstart' in window;
    this.scrollTimeout = null;
    this.resizeTimeout = null;
    
    this.init();
  }

  /**
   * Initialize the header controller
   */
  init() {
    this.bindElements();
    this.bindEvents();
    this.setupAccessibility();
    this.setupKeyboardNavigation();
    this.setupScrollBehavior();
    this.setupResponsiveBehavior();
    
    // Ensure proper initial state
    this.updateMenuState(false);
    this.closeAllDropdowns();
    
    }

  /**
   * Bind DOM elements
   */
  bindElements() {
    this.header = document.querySelector('.modern-header');
    this.mobileToggle = document.querySelector('[data-mobile-toggle]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.navigationMenu = document.querySelector('[data-navigation-menu]');
    this.backdrop = document.querySelector('[data-nav-backdrop]');
    
    // Dropdown elements
    this.dropdownTriggers = Array.from(document.querySelectorAll('[data-dropdown-trigger]'));
    this.dropdownMenus = Array.from(document.querySelectorAll('[data-dropdown-menu]'));
    
    // Emergency banner
    this.emergencyBanner = document.querySelector('.modern-emergency-banner');
    
    if (!this.header) {
      return;
    }
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener('click', this.closeMobileMenu.bind(this));
    }

    // Dropdown interactions
    this.dropdownTriggers.forEach(trigger => {
      const key = trigger.dataset.dropdownTrigger;
      const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
      
      if (menu) {
        // Mouse events
        if (!this.isTouch) {
          trigger.addEventListener('mouseenter', () => this.openDropdown(key));
          trigger.parentElement.addEventListener('mouseleave', () => this.closeDropdown(key));
        }
        
        // Click events (for both touch and desktop)
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleDropdown(key);
        });
        
        // Focus events
        trigger.addEventListener('focus', () => this.openDropdown(key));
        
        // Keyboard support
        trigger.addEventListener('keydown', (e) => this.handleDropdownKeydown(e, key));
        
        // Menu item keyboard support
        menu.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('keydown', (e) => this.handleMenuItemKeydown(e, key));
        });
      }
    });

    // Global events
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Intersection Observer for scroll effects
    this.setupScrollObserver();
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Set initial ARIA attributes
    if (this.mobileToggle) {
      this.mobileToggle.setAttribute('aria-expanded', 'false');
    }

    if (this.mobileMenu) {
      this.mobileMenu.setAttribute('aria-hidden', 'true');
    }

    if (this.backdrop) {
      this.backdrop.setAttribute('aria-hidden', 'true');
    }

    // Setup dropdown ARIA
    this.dropdownTriggers.forEach(trigger => {
      const key = trigger.dataset.dropdownTrigger;
      const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
      
      if (menu) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-controls', menu.id);
        
        // Set initial menu state
        menu.setAttribute('aria-hidden', 'true');
        menu.querySelectorAll('.dropdown-item').forEach(item => {
          item.setAttribute('tabindex', '-1');
        });
      }
    });

    // Find all focusable elements for focus management
    this.updateFocusableElements();
  }

  /**
   * Update focusable elements list
   */
  updateFocusableElements() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    this.focusableElements = Array.from(
      this.header.querySelectorAll(focusableSelectors.join(', '))
    ).filter(el => {
      return el.offsetWidth > 0 && el.offsetHeight > 0 && !el.hidden;
    });
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Skip navigation (if needed in the future)
    this.setupSkipNavigation();
  }

  /**
   * Setup skip navigation
   */
  setupSkipNavigation() {
    // This could be expanded if skip navigation is needed
    // Currently the existing structure handles focus well
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.updateMenuState(!this.isMenuOpen);
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    this.updateMenuState(true);
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.updateMenuState(false);
  }

  /**
   * Update mobile menu state
   */
  updateMenuState(isOpen) {
    this.isMenuOpen = isOpen;

    // Update ARIA attributes
    if (this.mobileToggle) {
      this.mobileToggle.setAttribute('aria-expanded', isOpen.toString());
      
      // Update toggle text for screen readers
      const toggleText = this.mobileToggle.querySelector('[data-toggle-text]');
      if (toggleText) {
        const language = this.header.dataset.language;
        toggleText.textContent = isOpen 
          ? (language === 'ar' ? 'إغلاق' : 'Close')
          : (language === 'ar' ? 'القائمة' : 'Menu');
      }
    }

    if (this.mobileMenu) {
      this.mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
    }

    if (this.backdrop) {
      this.backdrop.setAttribute('aria-hidden', (!isOpen).toString());
    }

    // Manage focus
    if (isOpen) {
      this.lastFocusedElement = document.activeElement;
      this.trapFocus();
    } else {
      this.releaseFocus();
    }

    // Manage body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Update visual state
    this.header.classList.toggle('menu-open', isOpen);
  }

  /**
   * Trap focus within mobile menu
   */
  trapFocus() {
    if (!this.mobileMenu) return;

    const focusableElements = this.mobileMenu.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement.focus();

    // Handle tab cycling
    this.focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);
  }

  /**
   * Release focus trap
   */
  releaseFocus() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }

    // Return focus to last focused element
    if (this.lastFocusedElement && this.lastFocusedElement.focus) {
      this.lastFocusedElement.focus();
    }
  }

  /**
   * Toggle dropdown
   */
  toggleDropdown(key) {
    if (this.activeDropdown === key) {
      this.closeDropdown(key);
    } else {
      this.closeAllDropdowns();
      this.openDropdown(key);
    }
  }

  /**
   * Open dropdown
   */
  openDropdown(key) {
    const trigger = document.querySelector(`[data-dropdown-trigger="${key}"]`);
    const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
    
    if (!trigger || !menu) return;

    // Close other dropdowns first
    this.closeAllDropdowns();

    this.activeDropdown = key;
    
    // Update ARIA attributes
    trigger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    
    // Enable menu items for keyboard navigation
    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.setAttribute('tabindex', '0');
    });

    // Add visual state
    trigger.classList.add('dropdown-active');
  }

  /**
   * Close dropdown
   */
  closeDropdown(key) {
    const trigger = document.querySelector(`[data-dropdown-trigger="${key}"]`);
    const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
    
    if (!trigger || !menu) return;

    // Update ARIA attributes
    trigger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    
    // Disable menu items for keyboard navigation
    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.setAttribute('tabindex', '-1');
    });

    // Remove visual state
    trigger.classList.remove('dropdown-active');
    
    if (this.activeDropdown === key) {
      this.activeDropdown = null;
    }
  }

  /**
   * Close all dropdowns
   */
  closeAllDropdowns() {
    this.dropdownTriggers.forEach(trigger => {
      const key = trigger.dataset.dropdownTrigger;
      this.closeDropdown(key);
    });
  }

  /**
   * Handle dropdown keyboard interactions
   */
  handleDropdownKeydown(e, key) {
    const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
    if (!menu) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.toggleDropdown(key);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.openDropdown(key);
        // Focus first menu item
        const firstItem = menu.querySelector('.dropdown-item');
        if (firstItem) firstItem.focus();
        break;
      case 'Escape':
        this.closeDropdown(key);
        break;
    }
  }

  /**
   * Handle menu item keyboard interactions
   */
  handleMenuItemKeydown(e, key) {
    const menu = document.querySelector(`[data-dropdown-menu="${key}"]`);
    const trigger = document.querySelector(`[data-dropdown-trigger="${key}"]`);
    if (!menu || !trigger) return;

    const items = Array.from(menu.querySelectorAll('.dropdown-item'));
    const currentIndex = items.indexOf(e.target);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex].focus();
        break;
      case 'Escape':
        e.preventDefault();
        this.closeDropdown(key);
        trigger.focus();
        break;
      case 'Tab':
        // Let natural tab behavior occur, but close dropdown
        this.closeDropdown(key);
        break;
    }
  }

  /**
   * Handle global keyboard shortcuts
   */
  handleGlobalKeydown(e) {
    // Escape key closes everything
    if (e.key === 'Escape') {
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      } else if (this.activeDropdown) {
        this.closeAllDropdowns();
      }
    }
  }

  /**
   * Handle document clicks (for closing dropdowns)
   */
  handleDocumentClick(e) {
    // Close dropdowns if clicking outside
    if (this.activeDropdown && !e.target.closest('.nav-dropdown')) {
      this.closeAllDropdowns();
    }

    // Close mobile menu if clicking backdrop
    if (this.isMenuOpen && e.target === this.backdrop) {
      this.closeMobileMenu();
    }
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.updateScrollState();
    }, 10);
  }

  /**
   * Update header state based on scroll position
   */
  updateScrollState() {
    if (!this.header) return;

    const scrollY = window.scrollY;
    const isScrolled = scrollY > 50;

    // Add scrolled class for styling
    this.header.classList.toggle('header-scrolled', isScrolled);

    // Close dropdowns when scrolling on mobile
    if (this.isTouch && scrollY > 0 && this.activeDropdown) {
      this.closeAllDropdowns();
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateResponsiveState();
    }, 100);
  }

  /**
   * Update responsive state
   */
  updateResponsiveState() {
    // Close mobile menu if screen becomes large
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Update focusable elements
    this.updateFocusableElements();
  }

  /**
   * Setup scroll behavior observer
   */
  setupScrollBehavior() {
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.target === this.emergencyBanner) {
            this.header.classList.toggle('emergency-hidden', !entry.isIntersecting);
          }
        });
      }, {
        rootMargin: '0px 0px -100% 0px'
      });

      if (this.emergencyBanner) {
        this.scrollObserver.observe(this.emergencyBanner);
      }
    }
  }

  /**
   * Setup responsive behavior
   */
  setupResponsiveBehavior() {
    // Watch for container queries support
    if ('container' in document.documentElement.style) {
      this.header.style.containerType = 'inline-size';
    }

    // Listen for media query changes
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(orientation: landscape)')
    ];

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', this.handleMediaQueryChange.bind(this));
    });
  }

  /**
   * Handle media query changes
   */
  handleMediaQueryChange(e) {
    if (e.media.includes('prefers-reduced-motion')) {
      this.prefersReducedMotion = e.matches;
      this.header.classList.toggle('reduced-motion', e.matches);
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    // Remove all event listeners
    document.removeEventListener('keydown', this.handleGlobalKeydown.bind(this));
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));

    // Clear timeouts
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

    // Disconnect observers
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    // Release focus trap if active
    this.releaseFocus();

    // Reset body styles
    document.body.style.overflow = '';

    }
}

/**
 * Initialize the modern header when DOM is ready
 */
function initializeModernHeader() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.modernHeaderController = new ModernHeaderController();
    });
  } else {
    window.modernHeaderController = new ModernHeaderController();
  }
}

/**
 * Utility functions for external use
 */
window.ModernHeaderUtils = {
  /**
   * Programmatically close mobile menu
   */
  closeMobileMenu() {
    if (window.modernHeaderController) {
      window.modernHeaderController.closeMobileMenu();
    }
  },

  /**
   * Programmatically close all dropdowns
   */
  closeDropdowns() {
    if (window.modernHeaderController) {
      window.modernHeaderController.closeAllDropdowns();
    }
  },

  /**
   * Update breadcrumb (for compatibility with existing code)
   */
  updateBreadcrumb(text) {
    const breadcrumbCurrent = document.getElementById('current-breadcrumb');
    const breadcrumbNav = document.getElementById('breadcrumb-navigation');
    
    if (breadcrumbCurrent && breadcrumbNav) {
      const span = breadcrumbCurrent.querySelector('span[itemprop="name"]');
      if (span) {
        span.textContent = text;
      }
      
      // Show breadcrumb if not already visible
      if (breadcrumbNav.style.display === 'none') {
        breadcrumbNav.style.display = 'block';
        setTimeout(() => {
          breadcrumbNav.classList.add('visible');
        }, 50);
      }
    }
  },

  /**
   * Hide breadcrumb
   */
  hideBreadcrumb() {
    const breadcrumbNav = document.getElementById('breadcrumb-navigation');
    if (breadcrumbNav) {
      breadcrumbNav.classList.remove('visible');
      setTimeout(() => {
        breadcrumbNav.style.display = 'none';
      }, 300);
    }
  }
};

// Auto-initialize
initializeModernHeader();

// Export for module systems
export { ModernHeaderController, initializeModernHeader };