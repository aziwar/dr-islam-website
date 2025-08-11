// English Header - Refactored with Simplified Navigation
// Implements the recommended information architecture: 4 main navigation items
import { DentalLogo } from '../../content/components/DentalLogo.js';
import { Button } from '../../components/atoms/Button.js';

export function getEnglishHeader() {
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

    <!-- Enhanced Header Styles -->
    <style>
      /* ===== ENHANCED EMERGENCY BANNER ===== */
      .emergency-banner {
        background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%);
        color: var(--white);
        padding: var(--space-sm) 0;
        position: sticky;
        top: 0;
        z-index: 102;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: emergencyPulse 3s infinite ease-in-out;
      }

      .emergency-banner__content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-lg);
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--container-padding);
      }

      .emergency-banner__text {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-weight: 500;
        margin: 0;
      }

      .emergency-banner__icon {
        font-size: var(--text-lg);
        animation: emergencyBlink 2s infinite;
      }

      .emergency-banner__cta {
        color: var(--white);
        font-weight: 600;
        text-decoration: none;
        padding: var(--space-xs) var(--space-md);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-lg);
        transition: var(--transition-fast);
        white-space: nowrap;
      }

      .emergency-banner__cta:hover,
      .emergency-banner__cta:focus {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--white);
        transform: scale(1.05);
      }

      @keyframes emergencyPulse {
        0%, 100% { background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%); }
        50% { background: linear-gradient(135deg, #DC3545 0%, var(--emergency) 100%); }
      }

      @keyframes emergencyBlink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.7; }
      }

      /* ===== STRUCTURED HEADER ===== */
      .header--structured {
        background: var(--white);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        position: sticky;
        top: 0;
        z-index: 101;
        border-bottom: 1px solid var(--bg-section);
      }

      .nav--simplified {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: var(--space-md) var(--container-padding);
        gap: var(--space-lg);
      }

      /* ===== ENHANCED LOGO ===== */
      .dental-logo {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        text-decoration: none;
      }

      .logo__text {
        display: flex;
        flex-direction: column;
      }

      .logo__name {
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--secondary);
        line-height: 1.2;
      }

      .logo__subtitle {
        font-size: var(--text-sm);
        color: var(--text-light);
        line-height: 1.2;
      }

      /* ===== SIMPLIFIED NAVIGATION ===== */
      .main-nav {
        display: flex;
        align-items: center;
        gap: var(--space-xl);
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-base);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        transition: var(--transition-normal);
        white-space: nowrap;
      }

      .nav-link:hover,
      .nav-link:focus {
        color: var(--primary);
        background: rgba(160, 143, 101, 0.08);
      }

      .nav-dropdown-icon {
        font-size: var(--text-xs);
        transition: var(--transition-fast);
      }

      .nav-item:hover .nav-dropdown-icon {
        transform: rotate(180deg);
      }

      /* ===== MEGA MENU ===== */
      .nav-megamenu {
        position: absolute;
        top: 100%;
        left: -50%;
        right: -50%;
        background: var(--white);
        border: 1px solid var(--bg-section);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        padding: var(--space-xl);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--transition-normal);
        z-index: 1000;
        min-width: 600px;
      }

      .nav-item--services:hover .nav-megamenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-megamenu__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-lg);
        margin-bottom: var(--space-lg);
      }

      .nav-megamenu__category h3 {
        font-size: var(--text-sm);
        color: var(--text-light);
        margin-bottom: var(--space-sm);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .nav-megamenu__links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-megamenu__links a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-xs) 0;
        font-size: var(--text-sm);
        transition: var(--transition-fast);
      }

      .nav-megamenu__links a:hover {
        color: var(--primary);
        padding-left: var(--space-xs);
      }

      .nav-megamenu__footer {
        display: flex;
        gap: var(--space-md);
        justify-content: center;
        padding-top: var(--space-lg);
        border-top: 1px solid var(--bg-section);
      }

      /* ===== DROPDOWN MENU ===== */
      .nav-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        border: 1px solid var(--bg-section);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: var(--space-md);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--transition-normal);
        z-index: 1000;
        min-width: 200px;
      }

      .nav-item--resources:hover .nav-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-dropdown__links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-dropdown__links a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
      }

      .nav-dropdown__links a:hover {
        color: var(--primary);
        background: rgba(160, 143, 101, 0.08);
      }

      /* ===== NAV CTA ===== */
      .nav-cta {
        display: flex;
        align-items: center;
      }

      .nav-cta__button {
        font-weight: 600;
      }

      /* ===== FLOATING CTA ===== */
      .floating-cta {
        position: fixed;
        bottom: var(--space-lg);
        right: var(--space-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: var(--transition-normal);
      }

      .floating-cta.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .floating-cta__button {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        background: var(--primary);
        color: var(--white);
        border: none;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-full);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
        box-shadow: var(--shadow-xl);
      }

      .floating-cta__button:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-2xl);
        background: var(--primary-dark);
      }

      /* ===== MOBILE NAVIGATION ===== */
      .mobile-nav {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        height: calc(100vh - 100%);
        background: var(--white);
        transform: translateY(0);
        transition: var(--transition-normal);
        z-index: 1000;
        overflow-y: auto;
      }

      .mobile-nav.active {
        transform: translateY(-100vh);
      }

      .mobile-nav__content {
        padding: var(--space-xl);
      }

      .mobile-nav__section {
        margin-bottom: var(--space-xl);
        padding-bottom: var(--space-xl);
        border-bottom: 1px solid var(--bg-section);
      }

      .mobile-nav__title {
        font-size: var(--text-xl);
        color: var(--secondary);
        margin-bottom: var(--space-lg);
        text-align: center;
      }

      .mobile-nav__grid {
        display: grid;
        gap: var(--space-lg);
      }

      .mobile-nav__category h4 {
        font-size: var(--text-sm);
        color: var(--text-light);
        margin-bottom: var(--space-sm);
        text-transform: uppercase;
      }

      .mobile-nav__category a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-sm) 0;
        border-bottom: 1px solid transparent;
      }

      .mobile-nav__category a:hover {
        color: var(--primary);
        border-color: var(--primary);
      }

      .mobile-nav__link {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-md) 0;
        font-size: var(--text-lg);
        border-bottom: 1px solid var(--bg-section);
        transition: var(--transition-fast);
      }

      .mobile-nav__link:hover {
        color: var(--primary);
        padding-left: var(--space-md);
      }

      .mobile-nav__ctas {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }

      /* ===== RESPONSIVE DESIGN ===== */
      @media (max-width: var(--breakpoint-lg-max)) {
        .main-nav,
        .nav-cta {
          display: none;
        }

        .nav-toggle {
          display: flex;
        }

        .nav-megamenu__grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: var(--breakpoint-md-max)) {
        .logo__text {
          display: none;
        }

        .emergency-banner__content {
          flex-direction: column;
          gap: var(--space-sm);
          text-align: center;
        }

        .floating-cta {
          bottom: var(--space-md);
          right: var(--space-md);
        }
      }

      @media (max-width: var(--breakpoint-sm-max)) {
        .nav--simplified {
          padding: var(--space-sm) var(--container-padding);
        }

        .emergency-banner__text {
          font-size: var(--text-sm);
        }
      }

      /* ===== ACCESSIBILITY ===== */
      @media (prefers-reduced-motion: reduce) {
        .nav-megamenu,
        .nav-dropdown,
        .floating-cta,
        .mobile-nav,
        .nav-dropdown-icon {
          transition: none !important;
          animation: none !important;
        }
      }

      /* ===== HIGH CONTRAST ===== */
      @media (prefers-contrast: high) {
        .nav-link,
        .nav-megamenu__links a,
        .nav-dropdown__links a {
          border: 1px solid currentColor;
        }
      }
    </style>

    <!-- Enhanced Navigation JavaScript -->
    <script>
      // Enhanced mobile menu functionality
      function toggleMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        const isActive = mobileNav.classList.contains('active');
        
        mobileNav.classList.toggle('active', !isActive);
        mobileNav.setAttribute('aria-hidden', isActive.toString());
        navToggle.setAttribute('aria-expanded', (!isActive).toString());
        backdrop.style.display = !isActive ? 'block' : 'none';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isActive ? 'hidden' : '';
      }

      function closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        backdrop.style.display = 'none';
        document.body.style.overflow = '';
      }

      // Floating CTA visibility
      function initFloatingCTA() {
        const floatingCTA = document.getElementById('floatingCTA');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          
          // Show floating CTA when scrolling down and past hero section
          if (currentScrollY > 800 && currentScrollY > lastScrollY) {
            floatingCTA.classList.add('visible');
            floatingCTA.setAttribute('aria-hidden', 'false');
          } else if (currentScrollY < 400 || currentScrollY < lastScrollY) {
            floatingCTA.classList.remove('visible');
            floatingCTA.setAttribute('aria-hidden', 'true');
          }
          
          lastScrollY = currentScrollY;
        });
      }

      // Initialize enhanced navigation features
      document.addEventListener('DOMContentLoaded', () => {
        initFloatingCTA();
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeMobileMenu();
          }
        });
        
        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
          link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 100);
          });
        });
      });
    </script>
  `;
}