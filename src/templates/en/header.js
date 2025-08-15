// English Header and Navigation Section - Modern 2024/2025 Standards
// Enhanced with accessibility, responsive design, and modern interactions
import { DentalLogo } from '../../content/components/DentalLogo.js';
import { createModernEnglishHeader } from '../shared/modern-header.js';

/**
 * Get English Header - Legacy compatibility wrapper
 * Now uses modern header architecture with 2024/2025 standards
 */
export function getEnglishHeader() {
  // Use modern header component
  return createModernEnglishHeader();
}

/**
 * Legacy header for backward compatibility (if needed)
 * @deprecated Use getEnglishHeader() which now returns modern header
 */
export function getLegacyEnglishHeader() {
  return `
    <!-- Legacy Emergency Banner -->
    <div class="emergency-banner" role="banner" aria-label="Dental emergency contact information">
        <p>Dental Emergency? Call Now: <a href="tel:+96598563711" aria-label="Call emergency number 98563711">+965 98563711</a></p>
    </div>

    <header role="banner">
        <nav role="navigation" aria-label="Main navigation" id="nav-menu">
            <div class="logo dental-logo">
                ${DentalLogo.svgEn}
            </div>
            <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="main-nav" role="menu">
                <li class="nav-item dropdown" role="menuitem">
                    <a href="#services" class="nav-link" aria-label="Navigate to Services section" aria-haspopup="true" aria-expanded="false">
                        Services
                        <svg class="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    <div class="dropdown-menu" role="menu">
                        <a href="#services" class="dropdown-item" role="menuitem">All Services</a>
                        <a href="#cosmetic-dentistry" class="dropdown-item" role="menuitem">Cosmetic Dentistry</a>
                        <a href="#general-dentistry" class="dropdown-item" role="menuitem">General Dentistry</a>
                        <a href="#emergency-care" class="dropdown-item" role="menuitem">Emergency Care</a>
                    </div>
                </li>
                <li role="menuitem"><a href="#about" class="nav-link" aria-label="Navigate to About section">About</a></li>
                <li class="nav-item dropdown" role="menuitem">
                    <a href="#testimonials" class="nav-link" aria-label="Navigate to Patient section" aria-haspopup="true" aria-expanded="false">
                        Patients
                        <svg class="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    <div class="dropdown-menu" role="menu">
                        <a href="#testimonials" class="dropdown-item" role="menuitem">Testimonials</a>
                        <a href="#gallery" class="dropdown-item" role="menuitem">Before/After</a>
                        <a href="#faq" class="dropdown-item" role="menuitem">FAQ</a>
                    </div>
                </li>
                <li role="menuitem"><a href="#contact" class="nav-link" aria-label="Navigate to Contact section">Contact</a></li>
                <li class="nav-item cta-item" role="menuitem">
                    <a href="#book-appointment" class="nav-cta" aria-label="Book appointment">
                        <svg class="cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Book Now
                    </a>
                </li>
                <li role="menuitem"><a href="/ar/" class="lang-switch" aria-label="Switch to Arabic language">العربية</a></li>
            </ul>
        </nav>
    </header>

    <div class="nav-backdrop"></div>

    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb-nav" aria-label="Breadcrumb navigation" id="breadcrumbNav" style="display: none;">
        <div class="container">
            <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
                <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a href="#" onclick="scrollToSection('hero')" itemprop="item">
                        <span itemprop="name">Home</span>
                    </a>
                    <meta itemprop="position" content="1" />
                </li>
                <li class="breadcrumb-item active" id="currentBreadcrumb" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name">Home</span>
                    <meta itemprop="position" content="2" />
                </li>
            </ol>
        </div>
    </nav>`;
}