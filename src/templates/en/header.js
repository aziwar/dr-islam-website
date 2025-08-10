// English Header and Navigation Section
import { DentalLogo } from '../../content/components/DentalLogo.js';

export function getEnglishHeader() {
  return `
    <!-- Emergency Banner -->
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
                <li role="menuitem"><a href="#services" aria-label="Navigate to Services section">Services</a></li>
                <li role="menuitem"><a href="#about" aria-label="Navigate to About section">About</a></li>
                <li role="menuitem"><a href="#testimonials" aria-label="Navigate to Testimonials section">Testimonials</a></li>
                <li role="menuitem"><a href="#gallery" aria-label="Navigate to Before/After gallery">Before/After</a></li>
                <li role="menuitem"><a href="#faq" aria-label="Navigate to FAQ section">FAQ</a></li>
                <li role="menuitem"><a href="#contact" aria-label="Navigate to Contact section">Contact</a></li>
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