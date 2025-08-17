// English Header and Navigation Section - Modern 2024/2025 Standards
// Enhanced with accessibility, responsive design, and modern interactions
import { DentalLogo } from '../../content/components/DentalLogo.js';
// Component imports removed - now using inline implementations

/**
 * Get English Header - Modern header with 2024/2025 standards
 * Uses the new modern header architecture
 */
export function getEnglishHeader() {
  // Simple inline header implementation
  return `
    <header class="main-header">
      <div class="container">
        <nav class="nav-wrapper">
          <a href="/" class="logo">Dr. Islam Elsagher</a>
          <ul class="nav-menu">
            <li><a href="#services">Services</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button class="nav-toggle" aria-label="Menu">☰</button>
        </nav>
      </div>
    </header>
  `;
}

/**
 * Legacy header for backward compatibility (if needed)
 * @deprecated Use getEnglishHeader() which now returns modern header
 */
export function getLegacyEnglishHeader() {
  return `
    <!-- Emergency Banner - Enhanced with better CTA -->
    <div class="emergency-banner" role="banner" aria-label="Dental emergency contact information">
        <div class="emergency-banner__content">
            <p class="emergency-banner__text">
                <span class="emergency-banner__icon">🚨</span>
                Dental Emergency? We're here 24/7
            </p>
            <a href="tel:+96598563711"
               class="emergency-banner__cta"
               aria-label="Call emergency number 98563711">
                Call Now: +965 98563711
            </a>
        </div>
    </div>

    <header role="banner" class="header header--structured">
        <nav role="navigation" aria-label="Main navigation" id="nav-menu" class="nav nav--simplified">

            <!-- Logo -->
            <div class="logo dental-logo">
                ${DentalLogo.svgEn}
                <div class="logo__text">
                    <div class="logo__name">Dr. Islam Elsagher</div>
                    <div class="logo__subtitle">General Dentist & Implantologist</div>
                </div>
            </div>

            <!-- Simplified Main Navigation (4 items max) -->
            <ul class="main-nav" role="menu">

                <!-- Services with Mega Menu -->
                <li role="menuitem" class="nav-item nav-item--services">
                    <a href="#services"
                       class="nav-link nav-link--services"
                       aria-label="Browse our dental services"
                       aria-expanded="false"
                       aria-haspopup="true">
                        Services
                        <span class="nav-dropdown-icon" aria-hidden="true">▼</span>
                    </a>

                    <!-- Services Mega Menu -->
                    <div class="nav-megamenu" aria-label="Services submenu">
                        <div class="nav-megamenu__grid">
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🚨 Emergency Care</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#emergency-booking">Emergency Treatment</a></li>
                                    <li><a href="tel:+96598563711">24/7 Emergency Line</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">⭐ Popular Services</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#dental-implants">Dental Implants</a></li>
                                    <li><a href="#cosmetic-dentistry">Hollywood Smile</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🔧 Specialized</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#root-canal">Root Canal</a></li>
                                    <li><a href="#oral-surgery">Oral Surgery</a></li>
                                    <li><a href="#prosthodontics">Prosthodontics</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🛡️ Preventive</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#cleaning">Professional Cleaning</a></li>
                                    <li><a href="#gum-treatment">Gum Treatment</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="nav-megamenu__footer">
                            <button class="btn btn--primary" onclick="openBookingModal()">
                                Book Consultation
                            </button>
                            <a href="#services" class="btn btn--ghost">View All Services</a>
                        </div>
                    </div>
                </li>

                <!-- About Dr. Islam -->
                <li role="menuitem" class="nav-item">
                    <a href="#about"
                       class="nav-link"
                       aria-label="Learn about Dr. Islam Elsagher">
                        About Dr. Islam
                    </a>
                </li>

                <!-- Patient Resources -->
                <li role="menuitem" class="nav-item nav-item--resources">
                    <a href="#resources"
                       class="nav-link nav-link--resources"
                       aria-label="Patient resources and information"
                       aria-expanded="false"
                       aria-haspopup="true">
                        Patient Resources
                        <span class="nav-dropdown-icon" aria-hidden="true">▼</span>
                    </a>

                    <!-- Resources Dropdown -->
                    <div class="nav-dropdown" aria-label="Patient resources submenu">
                        <ul class="nav-dropdown__links">
                            <li><a href="#testimonials">Patient Reviews</a></li>
                            <li><a href="#gallery">Before & After Gallery</a></li>
                            <li><a href="#faq">Frequently Asked Questions</a></li>
                            <li><a href="#post-care">Post-Treatment Care</a></li>
                            <li><a href="#insurance">Insurance & Payment</a></li>
                        </ul>
                    </div>
                </li>

                <!-- Contact & Booking -->
                <li role="menuitem" class="nav-item nav-item--contact">
                    <a href="#contact"
                       class="nav-link"
                       aria-label="Contact information and appointment booking">
                        Contact & Booking
                    </a>
                </li>

                <!-- Language Switch -->
                <li role="menuitem" class="nav-item nav-item--lang">
                    <a href="/ar/"
                       class="nav-link lang-switch"
                       aria-label="Switch to Arabic language"
                       lang="ar">
                        العربية
                    </a>
                </li>
            </ul>

            <!-- Primary CTA Button -->
            <div class="nav-cta">
                ${Button.create({
                    variant: 'primary',
                    text: 'Book Now',
                    onClick: 'openBookingModal()',
                    ariaLabel: 'Schedule an appointment',
                    className: 'nav-cta__button'
                })}
            </div>

            <!-- Mobile Menu Toggle -->
            ${Button.create({
                variant: 'mobile-toggle',
                text: 'Toggle navigation menu',
                onClick: 'toggleMobileMenu()',
                ariaLabel: 'Toggle navigation menu',
                ariaExpanded: 'false',
                ariaControls: 'mobile-nav-menu',
                className: 'nav-toggle'
            })}

        </nav>

        <!-- Mobile Navigation Menu -->
        <div class="mobile-nav" id="mobile-nav-menu" aria-hidden="true">
            <div class="mobile-nav__content">

                <!-- Mobile Services Menu -->
                <div class="mobile-nav__section">
                    <h3 class="mobile-nav__title">Services</h3>
                    <div class="mobile-nav__grid">
                        <div class="mobile-nav__category">
                            <h4>🚨 Emergency</h4>
                            <a href="#emergency-booking">Emergency Treatment</a>
                            <a href="tel:+96598563711">Call Now</a>
                        </div>
                        <div class="mobile-nav__category">
                            <h4>⭐ Popular</h4>
                            <a href="#dental-implants">Dental Implants</a>
                            <a href="#cosmetic-dentistry">Hollywood Smile</a>
                        </div>
                        <div class="mobile-nav__category">
                            <h4>🔧 Specialized</h4>
                            <a href="#root-canal">Root Canal</a>
                            <a href="#oral-surgery">Oral Surgery</a>
                            <a href="#prosthodontics">Prosthodontics</a>
                        </div>
                        <div class="mobile-nav__category">
                            <h4>🛡️ Preventive</h4>
                            <a href="#cleaning">Professional Cleaning</a>
                            <a href="#gum-treatment">Gum Treatment</a>
                        </div>
                    </div>
                </div>

                <!-- Mobile Main Links -->
                <div class="mobile-nav__section">
                    <a href="#about" class="mobile-nav__link">About Dr. Islam</a>
                    <a href="#testimonials" class="mobile-nav__link">Patient Reviews</a>
                    <a href="#gallery" class="mobile-nav__link">Before & After</a>
                    <a href="#faq" class="mobile-nav__link">FAQ</a>
                    <a href="#contact" class="mobile-nav__link">Contact</a>
                </div>

                <!-- Mobile CTAs -->
                <div class="mobile-nav__ctas">
                    <button class="btn btn--primary btn--large" onclick="openBookingModal(); closeMobileMenu();">
                        Book Appointment
                    </button>
                    <a href="tel:+96598563711" class="btn btn--emergency btn--large">
                        Emergency Call
                    </a>
                    <a href="/ar/" class="btn btn--ghost" lang="ar">العربية</a>
                </div>

            </div>
        </div>

    </header>

    <!-- Navigation Backdrop -->
    <div class="nav-backdrop" onclick="closeMobileMenu()" aria-hidden="true"></div>

    <!-- Floating Booking CTA (appears on scroll) -->
    <div class="floating-cta" id="floatingCTA" aria-hidden="true">
        <button class="floating-cta__button"
                onclick="openBookingModal()"
                aria-label="Quick appointment booking">
            <span class="floating-cta__icon">📅</span>
            <span class="floating-cta__text">Book Now</span>
        </button>
    </div>

  `;
}