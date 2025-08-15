// Modern Header Component - 2024/2025 Standards
// Unified responsive header supporting both English and Arabic layouts
// Features: Mobile-first, accessibility-focused, RTL/LTR support, modern interactions

import { DentalLogo } from '../../content/components/DentalLogo.js';

/**
 * Modern Header Component Factory
 * Creates a unified header component that adapts to language and provides
 * modern navigation patterns with accessibility and responsive design
 */
export class ModernHeader {
  constructor(language = 'en') {
    this.language = language;
    this.isRTL = language === 'ar';
    this.navigationItems = this.getNavigationItems();
  }

  /**
   * Get localized navigation items
   */
  getNavigationItems() {
    const items = {
      en: {
        services: {
          label: 'Services',
          href: '#services',
          dropdownItems: [
            { label: 'All Services', href: '#services' },
            { label: 'Cosmetic Dentistry', href: '#cosmetic-dentistry' },
            { label: 'General Dentistry', href: '#general-dentistry' },
            { label: 'Emergency Care', href: '#emergency-care' },
            { label: 'Preventive Care', href: '#preventive-care' }
          ]
        },
        about: { label: 'About', href: '#about' },
        patients: {
          label: 'Patients',
          href: '#testimonials',
          dropdownItems: [
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'Before/After Gallery', href: '#gallery' },
            { label: 'Patient Resources', href: '#resources' },
            { label: 'FAQ', href: '#faq' }
          ]
        },
        contact: { label: 'Contact', href: '#contact' },
        book: { label: 'Book Now', href: '#book-appointment' },
        emergency: { label: 'Emergency: +965 98563711', href: 'tel:+96598563711' },
        languageSwitch: { label: 'العربية', href: '/ar/' }
      },
      ar: {
        services: {
          label: 'الخدمات',
          href: '#services',
          dropdownItems: [
            { label: 'جميع الخدمات', href: '#services' },
            { label: 'تجميل الأسنان', href: '#cosmetic-dentistry' },
            { label: 'طب الأسنان العام', href: '#general-dentistry' },
            { label: 'العناية الطارئة', href: '#emergency-care' },
            { label: 'العناية الوقائية', href: '#preventive-care' }
          ]
        },
        about: { label: 'عن الطبيب', href: '#about' },
        patients: {
          label: 'المرضى',
          href: '#testimonials',
          dropdownItems: [
            { label: 'آراء المرضى', href: '#testimonials' },
            { label: 'قبل وبعد', href: '#gallery' },
            { label: 'موارد المرضى', href: '#resources' },
            { label: 'أسئلة شائعة', href: '#faq' }
          ]
        },
        contact: { label: 'اتصل بنا', href: '#contact' },
        book: { label: 'احجز الآن', href: '#book-appointment' },
        emergency: { label: 'طوارئ: 98563711', href: 'tel:+96598563711' },
        languageSwitch: { label: 'English', href: '/' }
      }
    };
    return items[this.language];
  }

  /**
   * Generate emergency banner HTML
   */
  generateEmergencyBanner() {
    const { emergency } = this.navigationItems;
    return `
      <div class="modern-emergency-banner" role="banner" aria-label="${this.language === 'en' ? 'Dental emergency contact information' : 'معلومات الاتصال للطوارئ السنية'}">
        <div class="emergency-content">
          <div class="emergency-text">
            ${this.language === 'en' ? 'Dental Emergency?' : 'حالة طوارئ الأسنان؟'}
          </div>
          <a href="${emergency.href}" 
             class="emergency-cta" 
             aria-label="${this.language === 'en' ? 'Call emergency number' : 'اتصل برقم الطوارئ'}">
            <svg class="emergency-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${emergency.label}
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Generate navigation item HTML
   */
  generateNavigationItem(item, key) {
    if (item.dropdownItems) {
      return this.generateDropdownItem(item, key);
    }
    
    const isBookCTA = key === 'book';
    const isEmergency = key === 'emergency';
    
    return `
      <li class="nav-item ${isBookCTA ? 'nav-cta-item' : ''}" role="none">
        <a href="${item.href}" 
           class="nav-link ${isBookCTA ? 'nav-cta-button' : ''} ${isEmergency ? 'nav-emergency-link' : ''}"
           aria-label="${this.language === 'en' ? `Navigate to ${item.label}` : `انتقل إلى ${item.label}`}"
           role="menuitem">
          ${isBookCTA ? `
            <svg class="cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
            </svg>
          ` : ''}
          <span class="nav-text">${item.label}</span>
        </a>
      </li>
    `;
  }

  /**
   * Generate dropdown navigation item HTML
   */
  generateDropdownItem(item, key) {
    const dropdownId = `dropdown-${key}`;
    return `
      <li class="nav-item nav-dropdown" role="none">
        <button class="nav-link dropdown-trigger" 
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="${dropdownId}"
                role="menuitem"
                data-dropdown-trigger="${key}">
          <span class="nav-text">${item.label}</span>
          <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="dropdown-menu" 
             id="${dropdownId}" 
             role="menu" 
             aria-labelledby="${dropdownId}-trigger"
             data-dropdown-menu="${key}">
          ${item.dropdownItems.map(dropdownItem => `
            <a href="${dropdownItem.href}" 
               class="dropdown-item" 
               role="menuitem"
               tabindex="-1">
              ${dropdownItem.label}
            </a>
          `).join('')}
        </div>
      </li>
    `;
  }

  /**
   * Generate main header HTML
   */
  generateHeader() {
    const { services, about, patients, contact, book, languageSwitch } = this.navigationItems;
    
    return `
      <!-- Modern Header with 2024/2025 Standards -->
      <header class="modern-header" 
              role="banner" 
              data-header-theme="default"
              data-language="${this.language}"
              ${this.isRTL ? 'dir="rtl"' : 'dir="ltr"'}>
        
        <!-- Header Container -->
        <div class="header-container" data-header-container>
          
          <!-- Primary Navigation -->
          <nav class="primary-navigation" 
               role="navigation" 
               aria-label="${this.language === 'en' ? 'Main navigation' : 'التنقل الرئيسي'}"
               data-navigation="primary">
            
            <!-- Logo Section -->
            <div class="nav-brand" data-nav-brand>
              <a href="${this.language === 'en' ? '/' : '/ar/'}" 
                 class="brand-link"
                 aria-label="${this.language === 'en' ? 'Dr. Islam Elsagher - Homepage' : 'د. إسلام الصاغر - الصفحة الرئيسية'}">
                <div class="brand-logo">
                  ${this.language === 'en' ? DentalLogo.svgEn : DentalLogo.svg}
                </div>
              </a>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle" 
                    aria-expanded="false"
                    aria-controls="mobile-navigation-menu"
                    aria-label="${this.language === 'en' ? 'Toggle navigation menu' : 'تبديل قائمة التنقل'}"
                    data-mobile-toggle>
              <span class="toggle-icon">
                <span class="toggle-line" aria-hidden="true"></span>
                <span class="toggle-line" aria-hidden="true"></span>
                <span class="toggle-line" aria-hidden="true"></span>
              </span>
              <span class="sr-only" data-toggle-text>
                ${this.language === 'en' ? 'Menu' : 'القائمة'}
              </span>
            </button>

            <!-- Navigation Menu -->
            <div class="navigation-menu" 
                 id="navigation-menu"
                 data-navigation-menu
                 role="menubar">
              <ul class="nav-list" role="none">
                ${this.generateNavigationItem(services, 'services')}
                ${this.generateNavigationItem(about, 'about')}
                ${this.generateNavigationItem(patients, 'patients')}
                ${this.generateNavigationItem(contact, 'contact')}
                ${this.generateNavigationItem(book, 'book')}
                <li class="nav-item nav-language-switch" role="none">
                  <a href="${languageSwitch.href}" 
                     class="nav-link language-switch-link"
                     aria-label="${this.language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}"
                     role="menuitem">
                    <span class="language-text">${languageSwitch.label}</span>
                  </a>
                </li>
              </ul>
            </div>

            <!-- Mobile Navigation Menu -->
            <div class="mobile-navigation" 
                 id="mobile-navigation-menu"
                 data-mobile-menu
                 role="menu"
                 aria-hidden="true">
              <div class="mobile-menu-content">
                <ul class="mobile-nav-list" role="none">
                  ${this.generateNavigationItem(services, 'services')}
                  ${this.generateNavigationItem(about, 'about')}
                  ${this.generateNavigationItem(patients, 'patients')}
                  ${this.generateNavigationItem(contact, 'contact')}
                  <li class="mobile-nav-item mobile-cta-section" role="none">
                    ${this.generateNavigationItem(book, 'book')}
                  </li>
                  <li class="mobile-nav-item mobile-language-section" role="none">
                    <a href="${languageSwitch.href}" 
                       class="mobile-nav-link language-switch-link"
                       role="menuitem">
                      ${languageSwitch.label}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <!-- Navigation Backdrop -->
        <div class="nav-backdrop" 
             data-nav-backdrop
             aria-hidden="true"></div>
      </header>

      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb-navigation" 
           aria-label="${this.language === 'en' ? 'Breadcrumb navigation' : 'التنقل التفصيلي'}" 
           id="breadcrumb-navigation" 
           data-breadcrumb-nav
           style="display: none;">
        <div class="breadcrumb-container">
          <ol class="breadcrumb-list" 
              itemscope 
              itemtype="https://schema.org/BreadcrumbList">
            <li class="breadcrumb-item" 
                itemprop="itemListElement" 
                itemscope 
                itemtype="https://schema.org/ListItem">
              <a href="#" 
                 onclick="scrollToSection('hero')" 
                 itemprop="item"
                 class="breadcrumb-link">
                <span itemprop="name">${this.language === 'en' ? 'Home' : 'الرئيسية'}</span>
              </a>
              <meta itemprop="position" content="1" />
            </li>
            <li class="breadcrumb-item breadcrumb-current" 
                id="current-breadcrumb" 
                itemprop="itemListElement" 
                itemscope 
                itemtype="https://schema.org/ListItem">
              <span itemprop="name">${this.language === 'en' ? 'Home' : 'الرئيسية'}</span>
              <meta itemprop="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>
    `;
  }

  /**
   * Generate complete header with emergency banner
   */
  generate() {
    return `
      ${this.generateEmergencyBanner()}
      ${this.generateHeader()}
    `;
  }
}

/**
 * Factory functions for creating headers
 */
export function createModernEnglishHeader() {
  const header = new ModernHeader('en');
  return header.generate();
}

export function createModernArabicHeader() {
  const header = new ModernHeader('ar');
  return header.generate();
}

/**
 * Legacy compatibility exports
 */
export function getEnglishHeader() {
  return createModernEnglishHeader();
}

export function getArabicHeader() {
  return createModernArabicHeader();
}