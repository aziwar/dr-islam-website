// src/content/en.js
import { MOBILE_UX_JS } from './js/mobile-ux.js';
import { DentalLogo } from './components/DentalLogo.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';
import { DynamicGallery } from './components/DynamicGallery.js';
import { Icon } from '../components/atoms/Icon.js';
import { 
    toggleMobileMenu, 
    closeMobileMenu,
    updateBreadcrumb,
    openBookingModal,
    closeBookingModal,
    showBookingSuccess,
    setupLazyLoading,
    setupGalleryTouch,
    setupBeforeAfterTouch,
    setupSmoothScroll,
    setupKeyboardNav,
    setupFormEnhancements,
    setupFormValidation,
    addLoadingState,
    removeLoadingState,
    initializeUIUtils
} from '../shared/ui-utils.js';
import { validateField, initFormValidation } from '../shared/form-utils.js';

export const HTML_EN = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

    <!-- PWA Support -->
    <link rel="manifest" href="/manifest-en.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Dr. Islam">
    <title>Dr. Islam Elsagher - General Dentist & Implantologist</title>
    <meta name="description" content="Dr. Islam Elsagher provides comprehensive dental care in Kuwait. 15+ years experience in implants, cosmetic dentistry, and oral surgery.">
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${btoa(DentalLogo.favicon)}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Preload critical fonts for LCP improvement -->
    <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2" as="font" type="font/woff2" crossorigin>
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//unpkg.com">
    <!-- Preload critical CSS -->
    <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <noscript><link rel="stylesheet" href="/styles.css"></noscript>
    
    <!-- UI/UX Enhancements -->
    <style>
        ${ENHANCEMENTS_CSS}
        ${DentalLogo.css}
    </style>
    
    <!-- Schema Markup for Dentist -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Dr. Islam Elsagher",
        "alternateName": "د. اسلام الصغير",
        "description": "General Dentist and Dental Implant Specialist in Kuwait",
        "image": "https://dr-elsagher.com/assets/dr-islam.jpg",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KW"
        },
        "telephone": "+96598563711",
        "url": "https://dr-elsagher.com",
        "sameAs": [
            "https://www.instagram.com/dr.islamelsagher/"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ]
    }
    </script>
    
    <!-- Google Analytics integration disabled for privacy -->
</head>
<body>
    <!-- Skip Links for Keyboard Navigation -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <a href="#nav-menu" class="skip-link">Skip to navigation</a>

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
    </nav>

    <main id="main-content" role="main">
    <section class="hero" role="region" aria-labelledby="hero-heading">
        <div class="container">
            <div class="hero-main">
                <h1 id="hero-heading">Dr. Islam Elsagher</h1>
                <p class="subtitle">General Dentist & Implantologist</p>
                <div class="trust-badges">
                    <span class="badge">15+ Years Experience</span>
                    <span class="badge">Latest Technology</span>
                    <span class="badge">100% Patient Satisfaction</span>
                </div>
                <button class="cta-button" onclick="openBookingModal()">Book Your Appointment</button>
            </div>
            
            <!-- Desktop Booking Widget -->
            <div class="desktop-booking-widget">
                <div class="widget-header">
                    <h3>📅 Quick Appointment</h3>
                    <p>Book your visit in 30 seconds</p>
                    <div class="widget-trust">
                        <span class="trust-badge">✓ Same Day Available</span>
                        <span class="trust-badge">✓ Free Consultation</span>
                    </div>
                </div>
                <form class="quick-booking-form" onsubmit="handleQuickBooking(event)">
                    <input type="text" placeholder="Your Name" required>
                    <input type="tel" placeholder="📱 Phone Number" required>
                    <select required>
                        <option value="">🦷 Select Service</option>
                        <option value="checkup">🔍 General Checkup</option>
                        <option value="cleaning">✨ Teeth Cleaning</option>
                        <option value="implant">🦷 Dental Implants</option>
                        <option value="cosmetic">💎 Cosmetic Dentistry</option>
                        <option value="emergency">🚨 Emergency Visit</option>
                    </select>
                    <button type="submit" class="btn btn-primary">
                        📞 Book Now - Free Consultation
                    </button>
                </form>
                <div class="widget-footer">
                    <p class="availability-note">⚡ Available Today: 9:00 AM - 9:00 PM</p>
                </div>
            </div>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                <div class="service-card" data-service="dental-implants">
                    <div class="service-icon">
                        ${Icon.create({ name: 'dental-implant', size: 'xl', ariaLabel: 'Dental Implants Icon' })}
                    </div>
                    <h3>Dental Implants</h3>
                    <p>Immediate and delayed implants with latest techniques</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('dental-implants')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="root-canal">
                    <div class="service-icon">
                        ${Icon.create({ name: 'root-canal', size: 'xl', ariaLabel: 'Root Canal Treatment Icon' })}
                    </div>
                    <h3>Root Canal Treatment</h3>
                    <p>Specialized endodontic treatment</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('root-canal')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="prosthodontics">
                    <div class="service-icon">
                        ${Icon.create({ name: 'prosthodontics', size: 'xl', ariaLabel: 'Prosthodontics Icon' })}
                    </div>
                    <h3>Prosthodontics</h3>
                    <p>Fixed and removable prosthetics</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('prosthodontics')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="oral-surgery">
                    <div class="service-icon">
                        ${Icon.create({ name: 'oral-surgery', size: 'xl', ariaLabel: 'Oral Surgery Icon' })}
                    </div>
                    <h3>Oral Surgery</h3>
                    <p>Surgical extractions and advanced procedures</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('oral-surgery')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="cosmetic-dentistry">
                    <div class="service-icon">
                        ${Icon.create({ name: 'cosmetic-dentistry', size: 'xl', ariaLabel: 'Cosmetic Dentistry Icon' })}
                    </div>
                    <h3>Cosmetic Dentistry</h3>
                    <p>Hollywood smile and whitening</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('cosmetic-dentistry')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="gum-treatment">
                    <div class="service-icon">
                        ${Icon.create({ name: 'gum-treatment', size: 'xl', ariaLabel: 'Gum Treatment Icon' })}
                    </div>
                    <h3>Gum Treatment</h3>
                    <p>Periodontal disease treatment</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('gum-treatment')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="aesthetic-fillings">
                    <div class="service-icon">
                        ${Icon.create({ name: 'aesthetic-fillings', size: 'xl', ariaLabel: 'Aesthetic Fillings Icon' })}
                    </div>
                    <h3>Aesthetic Fillings</h3>
                    <p>Natural tooth-colored fillings</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('aesthetic-fillings')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="full-mouth-rehab">
                    <div class="service-icon">
                        ${Icon.create({ name: 'full-mouth-rehab', size: 'xl', ariaLabel: 'Full Mouth Rehabilitation Icon' })}
                    </div>
                    <h3>Full Mouth Rehabilitation</h3>
                    <p>Comprehensive oral treatment</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('full-mouth-rehab')">Learn More</button>
                    </div>
                </div>
            </div>
            
            <!-- Desktop Service Comparison Table -->
            <div class="services-comparison">
                <table class="comparison-table" role="table" aria-label="Service comparison table">
                    <thead>
                        <tr>
                            <th scope="col">Service</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Price Range</th>
                            <th scope="col">Book Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="service-name">Dental Implants</td>
                            <td class="service-description">Immediate and delayed implants with latest techniques. Single tooth or full mouth restoration.</td>
                            <td class="service-duration">60-90 min</td>
                            <td class="service-price popular">350-800 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Root Canal Treatment</td>
                            <td class="service-description">Specialized endodontic treatment with modern rotary techniques and pain management.</td>
                            <td class="service-duration">45-60 min</td>
                            <td class="service-price">80-150 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Cosmetic Dentistry</td>
                            <td class="service-description">Hollywood smile, veneers, and teeth whitening for perfect aesthetics.</td>
                            <td class="service-duration">90-120 min</td>
                            <td class="service-price">200-600 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Oral Surgery</td>
                            <td class="service-description">Surgical extractions, wisdom teeth removal, and advanced procedures.</td>
                            <td class="service-duration">30-45 min</td>
                            <td class="service-price">50-200 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Prosthodontics</td>
                            <td class="service-description">Fixed and removable prosthetics, crowns, and bridges restoration.</td>
                            <td class="service-duration">60-75 min</td>
                            <td class="service-price">120-400 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Gum Treatment</td>
                            <td class="service-description">Periodontal disease treatment and maintenance therapy.</td>
                            <td class="service-duration">45-60 min</td>
                            <td class="service-price">60-120 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Aesthetic Fillings</td>
                            <td class="service-description">Natural tooth-colored fillings with advanced composite materials.</td>
                            <td class="service-duration">30-45 min</td>
                            <td class="service-price">25-80 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Book Now</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">Full Mouth Rehabilitation</td>
                            <td class="service-description">Comprehensive oral treatment combining multiple specialties for complete restoration.</td>
                            <td class="service-duration">2-3 hours</td>
                            <td class="service-price">800-2000 KD</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">Consult</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Service Comparison Table -->
    <section id="service-comparison" class="service-comparison">
        <div class="container">
            <div class="section-header">
                <h2>Compare Treatment Options</h2>
                <p class="section-subtitle">Make an informed decision with our detailed comparison</p>
            </div>
            
            <div class="comparison-container">
                <div class="comparison-table-wrapper">
                    <table class="comparison-table" role="table" aria-label="Treatment options comparison">
                        <thead>
                            <tr>
                                <th scope="col" class="feature-column">Treatment Features</th>
                                <th scope="col" class="option-column recommended">
                                    <div class="option-header">
                                        <h3>Dental Implants</h3>
                                        <span class="recommended-badge">✨ Recommended</span>
                                    </div>
                                </th>
                                <th scope="col" class="option-column">
                                    <div class="option-header">
                                        <h3>Dental Bridge</h3>
                                        <span class="option-subtitle">Traditional Option</span>
                                    </div>
                                </th>
                                <th scope="col" class="option-column">
                                    <div class="option-header">
                                        <h3>Partial Dentures</h3>
                                        <span class="option-subtitle">Removable Option</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="feature-label">
                                    <strong>Treatment Duration</strong>
                                    <span class="feature-desc">Time to complete treatment</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">3-6 months</span>
                                        <span class="detail">Single visit for immediate implants</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">2-3 weeks</span>
                                        <span class="detail">Multiple appointments required</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">2-4 weeks</span>
                                        <span class="detail">Quick fabrication process</span>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="feature-label">
                                    <strong>Durability</strong>
                                    <span class="feature-desc">Expected lifespan</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">25+ years</span>
                                        <span class="detail">Lifetime with proper care</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">10-15 years</span>
                                        <span class="detail">May need replacement</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">5-8 years</span>
                                        <span class="detail">Regular adjustments needed</span>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="feature-label">
                                    <strong>Cost Range</strong>
                                    <span class="feature-desc">Investment in KWD</span>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">200-400 KWD</span>
                                        <span class="detail">Best long-term value</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">150-300 KWD</span>
                                        <span class="detail">Moderate upfront cost</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">100-250 KWD</span>
                                        <span class="detail">Lowest initial investment</span>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="feature-label">
                                    <strong>Bone Preservation</strong>
                                    <span class="feature-desc">Maintains jaw bone health</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">✓ Excellent</span>
                                        <span class="detail">Stimulates natural bone growth</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">× Limited</span>
                                        <span class="detail">May require adjacent tooth removal</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">× Poor</span>
                                        <span class="detail">Bone loss continues over time</span>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="feature-label">
                                    <strong>Maintenance</strong>
                                    <span class="feature-desc">Daily care requirements</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">Like natural teeth</span>
                                        <span class="detail">Brush and floss normally</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">Standard care</span>
                                        <span class="detail">Regular brushing and flossing</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">Special cleaning</span>
                                        <span class="detail">Remove for cleaning and soaking</span>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="feature-label">
                                    <strong>Success Rate</strong>
                                    <span class="feature-desc">Treatment predictability</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">95-98%</span>
                                        <span class="detail">Highly predictable outcome</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">90-95%</span>
                                        <span class="detail">Reliable when properly done</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">85-90%</span>
                                        <span class="detail">Fit and comfort may vary</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Mobile-friendly comparison cards (hidden on desktop) -->
                <div class="mobile-comparison">
                    <div class="comparison-tabs">
                        <button class="tab-btn active" onclick="showMobileComparison('implants')">Dental Implants</button>
                        <button class="tab-btn" onclick="showMobileComparison('bridge')">Dental Bridge</button>
                        <button class="tab-btn" onclick="showMobileComparison('dentures')">Dentures</button>
                    </div>
                    
                    <div id="implants-mobile" class="mobile-comparison-card active">
                        <div class="mobile-card-header recommended">
                            <h3>Dental Implants</h3>
                            <span class="recommended-badge">✨ Recommended</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">3-6 months</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">25+ years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">200-400 KWD</span>
                            </div>
                            <div class="mobile-feature highlight">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">95-98%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="bridge-mobile" class="mobile-comparison-card">
                        <div class="mobile-card-header">
                            <h3>Dental Bridge</h3>
                            <span class="option-subtitle">Traditional Option</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">2-3 weeks</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">10-15 years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">150-300 KWD</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">90-95%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="dentures-mobile" class="mobile-comparison-card">
                        <div class="mobile-card-header">
                            <h3>Partial Dentures</h3>
                            <span class="option-subtitle">Removable Option</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">2-4 weeks</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">5-8 years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">100-250 KWD</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">85-90%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-cta">
                    <p class="cta-text">Ready to choose the best option for your needs?</p>
                    <button class="cta-button" onclick="openBookingModal()">Get Free Consultation</button>
                    <p class="cta-note">Dr. Islam will help you choose the perfect treatment plan</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced Testimonials Section -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>What Our Patients Say</h2>
            <div class="testimonial-carousel-container">
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide active">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-ahmed">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="Patient avatar">👤</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-ahmed">Ahmed Al-Salem</h4>
                                    <span class="treatment-type">Dental Implants</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Excellent service and very professional doctor. Dr. Islam explained every step of the treatment and the result was amazing. I couldn't be happier with my new smile!"</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">January 2025</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </article>
                    </div>
                    
                    <div class="testimonial-slide">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-fatima">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="Patient avatar">👩</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-fatima">Fatima Al-Ali</h4>
                                    <span class="treatment-type">Cosmetic Dentistry</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Best dental implant experience in Kuwait. The doctor is very skilled and the team is cooperative. I recommend everyone to visit the clinic for quality treatment."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">December 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </article>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>Mohammed Al-Khalid</h4>
                                    <span class="treatment-type">Smile Makeover</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Professional treatment and stunning results. Dr. Islam completely transformed my smile with Hollywood smile procedure. The technology used is state-of-the-art."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">November 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👩</div>
                                <div class="patient-details">
                                    <h4>Sarah Al-Rashid</h4>
                                    <span class="treatment-type">Root Canal Treatment</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Painless root canal treatment! I was terrified but Dr. Islam made the whole experience comfortable. His gentle approach and modern equipment made all the difference."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">October 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>Omar Al-Mutairi</h4>
                                    <span class="treatment-type">Teeth Cleaning</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Exceptional dental hygiene service. The clinic is very clean and modern. Dr. Islam and his team maintain the highest standards of sterilization and patient care."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">September 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Carousel Controls -->
                <div class="carousel-controls">
                    <button class="carousel-btn prev" onclick="moveTestimonialCarousel(-1)">‹</button>
                    <div class="carousel-dots" id="testimonialDots">
                        <button class="dot active" onclick="currentTestimonialSlide(1)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(2)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(3)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(4)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(5)"></button>
                    </div>
                    <button class="carousel-btn next" onclick="moveTestimonialCarousel(1)">›</button>
                </div>
                
                <!-- Testimonial Summary Stats -->
                <div class="testimonial-stats">
                    <div class="stat-item">
                        <div class="stat-number">4.9</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Happy Patients</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Would Recommend</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Before/After Gallery with Lightbox -->
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>Real Results</h2>
            <p class="gallery-subtitle">See the amazing transformation of our patients' smiles</p>
            
            <!-- Gallery Tabs -->
            <div class="gallery-tabs">
                <button class="gallery-tab active" data-category="all" onclick="switchGalleryCategory('all')">All Cases</button>
                <button class="gallery-tab" data-category="implants" onclick="switchGalleryCategory('implants')">Dental Implants</button>
                <button class="gallery-tab" data-category="cosmetic" onclick="switchGalleryCategory('cosmetic')">Cosmetic Dentistry</button>
                <button class="gallery-tab" data-category="restoration" onclick="switchGalleryCategory('restoration')">Restoration</button>
            </div>
            
            <!-- Dynamic Gallery Container -->
            <!-- Gallery Filter Tabs -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">All Cases</button>
                <button class="filter-btn" data-filter="implants">Dental Implants</button>
                <button class="filter-btn" data-filter="cosmetic">Cosmetic Dentistry</button>
                <button class="filter-btn" data-filter="orthodontic">Orthodontics</button>
                <button class="filter-btn" data-filter="reconstruction">Full Mouth Rehabilitation</button>
            </div>
            
            <div class="gallery-grid enhanced">
                <!-- Dental Implants Cases -->
                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case1.webp" alt="Before front tooth implant" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After front tooth implant" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Immediate Front Tooth Implant</h4>
                        <p class="case-details">Male patient, 35 years - Immediate implant with ceramic crown</p>
                        <p class="treatment-time">Treatment duration: Single session</p>
                        <span class="case-badge implant">Implant</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case2.webp" alt="Before multiple implants" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="After multiple implants" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Multiple Implants with Fixed Bridge</h4>
                        <p class="case-details">Female patient, 42 years - Replacement of 4 missing teeth</p>
                        <p class="treatment-time">Treatment duration: 4 months</p>
                        <span class="case-badge implant">Implant</span>
                    </div>
                </div>

                <!-- Cosmetic Cases -->
                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/real-case3.webp" alt="Before Hollywood smile" loading="lazy">
                        <img src="/assets/case3-after.webp" alt="After Hollywood smile" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Complete Hollywood Smile</h4>
                        <p class="case-details">Female patient, 28 years - 16 ceramic veneers</p>
                        <p class="treatment-time">Treatment duration: 2 weeks</p>
                        <span class="case-badge cosmetic">Cosmetic</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="Before teeth whitening" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After teeth whitening" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Laser Whitening + Restoration</h4>
                        <p class="case-details">Male patient, 31 years - Whitening with cosmetic fillings</p>
                        <p class="treatment-time">Treatment duration: 2 sessions</p>
                        <span class="case-badge cosmetic">Cosmetic</span>
                    </div>
                </div>

                <!-- Orthodontic Cases -->
                <div class="gallery-item" data-category="orthodontic">
                    <div class="case-images">
                        <img src="/assets/case2-before.webp" alt="Before clear aligners" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="After clear aligners" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Clear Aligners (Invisalign)</h4>
                        <p class="case-details">Female patient, 24 years - Crowding correction</p>
                        <p class="treatment-time">Treatment duration: 8 months</p>
                        <span class="case-badge orthodontic">Orthodontic</span>
                    </div>
                </div>

                <!-- Full Mouth Reconstruction -->
                <div class="gallery-item" data-category="reconstruction">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="Before full mouth rehabilitation" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After full mouth rehabilitation" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Complete Mouth Rehabilitation</h4>
                        <p class="case-details">Male patient, 55 years - Multiple implants with crowns</p>
                        <p class="treatment-time">Treatment duration: 6 months</p>
                        <span class="case-badge reconstruction">Rehabilitation</span>
                    </div>
                </div>
            </div>

            <!-- View More Button -->
            <div class="gallery-actions">
                <button class="view-more-btn">View More Cases <span class="arrow">→</span></button>
                <p class="gallery-stats">+1200 Successful Cases | 98% Success Rate</p>
            </div>
            
            <!-- Gallery Lightbox -->
            <div id="gallery-lightbox" class="gallery-lightbox">
                <div class="lightbox-content">
                    <img id="lightbox-image" class="lightbox-image" src="" alt="Enlarged gallery image" role="img" aria-describedby="lightbox-title lightbox-category">
                    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
                    <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">&#8249;</button>
                    <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">&#8250;</button>
                    <div class="lightbox-info">
                        <div id="lightbox-title" class="lightbox-title"></div>
                        <div id="lightbox-category" class="lightbox-category"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>About Dr. Islam Elsagher</h2>
            <div class="about-content">
                <div class="credentials">
                    <h3>Qualifications</h3>
                    <ul>
                        <li>Bachelor of Oral and Dental Medicine - Alexandria University (2004-2009)</li>
                        <li>Diploma in Dental Implants - Alexandria University (2010-2011)</li>
                        <li>Master of Periodontics - Al-Azhar University</li>
                        <li>Master of Laser Sciences - Cairo University</li>
                    </ul>
                    <div class="certifications">
                        <h4>Certifications & Memberships</h4>
                        <div class="cert-badges">
                            <span class="cert-badge">Member of Kuwait Dental Association</span>
                            <span class="cert-badge">Licensed by Kuwait Ministry of Health</span>
                        </div>
                    </div>
                </div>
                <div class="experience">
                    <h3>Professional Experience</h3>
                    <p>Over 15 years of dental practice experience in Egypt and Kuwait</p>
                    <div class="stats">
                        <div class="stat">
                            <h4>5000+</h4>
                            <p>Happy Patients</p>
                        </div>
                        <div class="stat">
                            <h4>1200+</h4>
                            <p>Successful Implants</p>
                        </div>
                        <div class="stat">
                            <h4>15+</h4>
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced FAQ Section with Search -->
    <section id="faq" class="faq">
        <div class="container">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-search-container">
                <div class="faq-search-box">
                    <input type="text" 
                           id="faqSearch" 
                           placeholder="🔍 Search for answers..." 
                           class="faq-search-input"
                           onkeyup="searchFAQs(this.value)">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
                <div class="faq-categories">
                    <button class="category-btn active" onclick="filterFAQs('all')">All Questions</button>
                    <button class="category-btn" onclick="filterFAQs('cost')">💰 Cost & Insurance</button>
                    <button class="category-btn" onclick="filterFAQs('treatment')">🦷 Treatment Process</button>
                    <button class="category-btn" onclick="filterFAQs('pain')">😌 Pain & Comfort</button>
                    <button class="category-btn" onclick="filterFAQs('aftercare')">🔄 Aftercare</button>
                </div>
            </div>
            
            <div class="faq-list" id="faqList">
                <div class="faq-item" data-category="cost" data-keywords="cost price money insurance payment dental implant expensive">
                    <h3>How much does dental implant cost? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>The cost varies depending on the case and type of implant used. We offer free consultation to evaluate your case and provide a detailed treatment plan with costs. Prices typically range from 150-300 KD depending on complexity.</p>
                        <div class="faq-tags">
                            <span class="tag">💰 Cost</span>
                            <span class="tag">🦷 Implants</span>
                            <span class="tag">📋 Consultation</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="pain" data-keywords="pain painful hurt anesthesia comfort sedation">
                    <h3>Is the implant procedure painful? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We use the latest local anesthesia techniques to ensure your complete comfort. Most patients describe the procedure as less painful than a regular tooth extraction. We also offer sedation options for anxious patients.</p>
                        <div class="faq-tags">
                            <span class="tag">😌 Comfort</span>
                            <span class="tag">💉 Anesthesia</span>
                            <span class="tag">🏥 Procedure</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="time duration how long healing recovery process">
                    <h3>How long does the treatment take? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Treatment duration depends on the case. Immediate implants can be completed in one session, while traditional implants need 3-6 months for complete integration. We provide detailed timelines during consultation.</p>
                        <div class="faq-tags">
                            <span class="tag">⏰ Timeline</span>
                            <span class="tag">🔄 Process</span>
                            <span class="tag">🦷 Integration</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="cost" data-keywords="insurance health coverage medical claim reimbursement">
                    <h3>Do you accept health insurance? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We work with most health insurance companies in Kuwait including Watania, Al-Ahlia, and Gulf Insurance. Please contact us to confirm if your health insurance is accepted and what percentage is covered.</p>
                        <div class="faq-tags">
                            <span class="tag">🏥 Insurance</span>
                            <span class="tag">💳 Coverage</span>
                            <span class="tag">🇰🇼 Kuwait</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="aftercare" data-keywords="after care maintenance cleaning brush hygiene follow up">
                    <h3>How do I care for my implants after treatment? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Implant care is similar to natural teeth - regular brushing, flossing, and dental checkups. We provide detailed aftercare instructions and schedule follow-up appointments to ensure optimal healing and long-term success.</p>
                        <div class="faq-tags">
                            <span class="tag">🔄 Aftercare</span>
                            <span class="tag">🪥 Hygiene</span>
                            <span class="tag">✅ Maintenance</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="success rate failure guarantee warranty quality">
                    <h3>What is the success rate of dental implants? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Dental implants have a 95-98% success rate when performed by experienced professionals. Our clinic uses premium implant brands with proven track records and provides warranty coverage for your peace of mind.</p>
                        <div class="faq-tags">
                            <span class="tag">📊 Success Rate</span>
                            <span class="tag">🛡️ Warranty</span>
                            <span class="tag">⭐ Quality</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="age old young suitable candidate requirements">
                    <h3>Am I a good candidate for dental implants? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Most healthy adults are good candidates for implants. We evaluate bone density, gum health, and overall medical condition. Age is not a limiting factor - we've successfully treated patients from 18 to 80+ years old.</p>
                        <div class="faq-tags">
                            <span class="tag">👤 Candidacy</span>
                            <span class="tag">🔍 Evaluation</span>
                            <span class="tag">🎯 Suitability</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="cost" data-keywords="payment plan installment financing options methods">
                    <h3>Do you offer payment plans or financing? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Yes, we offer flexible payment plans and work with financing companies to make treatment affordable. We accept cash, credit cards, and can arrange installment plans based on your budget and treatment needs.</p>
                        <div class="faq-tags">
                            <span class="tag">💳 Payment Plans</span>
                            <span class="tag">🏦 Financing</span>
                            <span class="tag">💰 Flexible</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="faq-no-results" id="faqNoResults" style="display: none;">
                <div class="no-results-content">
                    <h3>🔍 No matching questions found</h3>
                    <p>Can't find what you're looking for? Contact us directly for personalized answers.</p>
                    <button class="cta-button" onclick="openBookingModal()">Ask Our Expert</button>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-info">
                <div class="contact-card">
                    <h3>Phone</h3>
                    <p><a href="tel:+96598563711">+965 98563711</a></p>
                </div>
                <div class="contact-card">
                    <h3>Email</h3>
                    <p><a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
                </div>
                <div class="contact-card">
                    <h3>Instagram</h3>
                    <p><a href="https://www.instagram.com/dr.islamelsagher/" target="_blank">@dr.islamelsagher</a></p>
                </div>
                <div class="contact-card">
                    <h3>WhatsApp</h3>
                    <p><a href="https://wa.me/96598563711">+965 98563711</a></p>
                </div>
            </div>
            <div class="working-hours">
                <h3>Working Hours</h3>
                <div class="hours-grid">
                    <div class="day-hours">
                        <span class="day">Saturday - Thursday:</span>
                        <span class="hours">9:00 AM - 9:00 PM</span>
                    </div>
                    <div class="day-hours">
                        <span class="day">Friday:</span>
                        <span class="hours">Closed</span>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-section">
                <h3>Send us a Message</h3>
                <form id="contactForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="name" name="name" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" required>
                            <label for="phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service" required>
                            <option value="">Select Service</option>
                            <option value="dental-implants">Dental Implants</option>
                            <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                            <option value="general-dentistry">General Dentistry</option>
                            <option value="emergency">Emergency Treatment</option>
                            <option value="consultation">Consultation</option>
                            <option value="other">Other</option>
                        </select>
                        <label for="service">Service Needed</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="4" required></textarea>
                        <label for="message">Message</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">Sending...</span>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Enhanced Booking Modal -->
    <div id="bookingModal" class="booking-modal" style="display: none;">
        <div class="booking-modal-content">
            <div class="booking-modal-header">
                <h3>📅 Book Your Appointment</h3>
                <button class="close-modal" onclick="closeBookingModal()">&times;</button>
            </div>
            <div class="booking-modal-body">
                <p class="booking-description">We'll help you book an appointment via WhatsApp with your details pre-filled.</p>
                
                <form id="bookingForm" class="booking-form">
                    <div class="form-progress">
                        <div class="form-progress-bar"></div>
                    </div>
                    
                    <div id="formMessage" class="form-message" style="display: none;">
                        <span class="form-message-icon"></span>
                        <div class="form-message-text"></div>
                    </div>
                    <div class="form-group">
                        <input type="text" id="bookingName" name="name" required>
                        <label for="bookingName">Your Name</label>
                    </div>
                    
                    <div class="form-group">
                        <input type="tel" id="bookingPhone" name="phone" required>
                        <label for="bookingPhone">Phone Number</label>
                    </div>
                    
                    <div class="form-group">
                        <select id="bookingService" name="service" required>
                            <option value="">Select Service</option>
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Root Canal Treatment">Root Canal Treatment</option>
                            <option value="Prosthodontics">Prosthodontics</option>
                            <option value="Oral Surgery">Oral Surgery</option>
                            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                            <option value="Gum Treatment">Gum Treatment</option>
                            <option value="Aesthetic Fillings">Aesthetic Fillings</option>
                            <option value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</option>
                            <option value="General Consultation">General Consultation</option>
                            <option value="Emergency Treatment">Emergency Treatment</option>
                        </select>
                        <label for="bookingService">Service Needed</label>
                    </div>
                    
                    <div class="form-group">
                        <select id="bookingTime" name="time" required>
                            <option value="">Preferred Time</option>
                            <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                            <option value="Afternoon (12:00 PM - 6:00 PM)">Afternoon (12:00 PM - 6:00 PM)</option>
                            <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                            <option value="Any time">Any time</option>
                        </select>
                        <label for="bookingTime">Preferred Time</label>
                    </div>
                    
                    <div class="form-group">
                        <textarea id="bookingNotes" name="notes" rows="3" placeholder="Any specific concerns or requests (optional)"></textarea>
                        <label for="bookingNotes">Additional Notes</label>
                    </div>
                    
                    <div class="booking-modal-actions">
                        <button type="submit" class="booking-submit-btn">
                            <span class="booking-btn-icon">💬</span>
                            Continue to WhatsApp
                        </button>
                        <p class="booking-disclaimer">You'll be redirected to WhatsApp with your information pre-filled</p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-main">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            ${Icon.dentalLogo({ size: 'xl', className: 'footer-logo-icon' })}
                            <div class="footer-brand-text">
                                <h3>Dr. Islam Elsagher</h3>
                                <p>Excellence in Dental Care</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            Over 15 years of experience providing comprehensive dental care in Kuwait. 
                            Specializing in dental implants, cosmetic dentistry, and oral surgery.
                        </p>
                    </div>
                    
                    <div class="footer-contact">
                        <h4>Contact Information</h4>
                        <div class="contact-items">
                            <div class="contact-item">
                                ${Icon.create({ name: 'phone', size: 'sm', color: 'primary' })}
                                <span>+965 9856 3711</span>
                            </div>
                            <div class="contact-item">
                                ${Icon.create({ name: 'phone', size: 'sm', color: 'primary' })}
                                <span>+965 6600 6699</span>
                            </div>
                            <div class="contact-item">
                                ${Icon.create({ name: 'location', size: 'sm', color: 'primary' })}
                                <span>Hawally, Kuwait</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-hours">
                        <h4>Working Hours</h4>
                        <div class="hours-schedule">
                            <div class="schedule-item">
                                ${Icon.create({ name: 'clock', size: 'sm', color: 'primary' })}
                                <div class="schedule-text">
                                    <span>Saturday - Thursday</span>
                                    <span>9:00 AM - 9:00 PM</span>
                                </div>
                            </div>
                            <div class="schedule-item">
                                <div class="availability-badge">
                                    <span class="status-indicator"></span>
                                    <span>Available Today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-links">
                        <a href="#services">Services</a>
                        <a href="#gallery">Gallery</a>
                        <a href="#faq">FAQ</a>
                        <a href="?lang=ar">العربية</a>
                    </div>
                    <div class="footer-copyright">
                        <p>&copy; 2025 Dr. Islam Elsagher - All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Desktop Sidebar Widget -->
    <div class="desktop-sidebar" id="desktopSidebar" style="display: none;">
        <div class="sidebar-header">
            <h4>🏥 Dr. Islam Al-Sagher</h4>
            <p style="font-size: 0.85rem; color: var(--text-light);">Expert Dental Care</p>
        </div>
        <div class="sidebar-stats">
            <div class="stat-item">
                <span class="stat-number">15+</span>
                <span class="stat-label">Years</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Satisfaction</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">2000+</span>
                <span class="stat-label">Patients</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">24/7</span>
                <span class="stat-label">Emergency</span>
            </div>
        </div>
        <div class="sidebar-actions">
            <button class="sidebar-btn primary" onclick="openBookingModal()">
                📞 Book Appointment
            </button>
            <button class="sidebar-btn secondary" onclick="openWhatsApp()">
                💬 WhatsApp Chat
            </button>
        </div>
        <div class="sidebar-contact">
            <p style="font-size: 0.8rem; text-align: center; color: var(--text-light); margin-top: 1rem;">
                📍 Salmiya, Kuwait<br>
                ⏰ 9 AM - 9 PM (Sat-Thu)
            </p>
        </div>
    </div>

    <!-- Sticky WhatsApp Booking Button -->
    <button class="sticky-book" onclick="openBookingModal()">
        Book Appointment 💬
    </button>

    <script>

    // Global variables for testimonials and gallery
    let currentTestimonialIndex = 0;
    let testimonialSlides = null;
    let testimonialDots = null;
    let testimonialAutoSlide = null;
    
    // Global testimonial functions (available immediately)
    function moveTestimonialCarousel(direction) {
        if (!testimonialSlides) {
            testimonialSlides = document.querySelectorAll('.testimonial-slide');
            testimonialDots = document.querySelectorAll('.carousel-dots .dot');
        }
        
        currentTestimonialIndex += direction;
        
        if (currentTestimonialIndex >= testimonialSlides.length) {
            currentTestimonialIndex = 0;
        } else if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialSlides.length - 1;
        }
        
        showTestimonialSlide(currentTestimonialIndex);
        resetTestimonialAutoSlide();
    }
    
    function currentTestimonialSlide(index) {
        if (!testimonialSlides) {
            testimonialSlides = document.querySelectorAll('.testimonial-slide');
            testimonialDots = document.querySelectorAll('.carousel-dots .dot');
        }
        
        currentTestimonialIndex = index - 1;
        showTestimonialSlide(currentTestimonialIndex);
        resetTestimonialAutoSlide();
    }
    
    function showTestimonialSlide(index) {
        if (!testimonialSlides) return;
        
        // Hide all slides
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (testimonialDots[i]) {
                testimonialDots[i].classList.remove('active');
            }
        });
        
        // Show current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
            if (testimonialDots[index]) {
                testimonialDots[index].classList.add('active');
            }
        }
    }
    
    function resetTestimonialAutoSlide() {
        if (testimonialAutoSlide) {
            clearInterval(testimonialAutoSlide);
        }
        startTestimonialAutoSlide();
    }
    
    function startTestimonialAutoSlide() {
        testimonialAutoSlide = setInterval(() => {
            moveTestimonialCarousel(1);
        }, 6000);
    }
    
    // Global gallery function
    function switchGalleryCategory(category) {
        // Update tab active state
        document.querySelectorAll('.gallery-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });
        
        // Filter gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('visible'), 10);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }

    // Close menu when clicking outside or on backdrop
    document.addEventListener('click', function(e) {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (backdrop.contains(e.target)) {
            closeMobileMenu();
        } else if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking navigation links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Set up navigation toggle event listener
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleMobileMenu);
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Breadcrumb Navigation System
    const breadcrumbNav = document.getElementById('breadcrumbNav');
    const currentBreadcrumb = document.getElementById('currentBreadcrumb');
    
    // Section name mapping
    const sectionNames = {
        'hero': 'Home',
        'services': 'Services',
        'about': 'About Dr. Islam',
        'testimonials': 'Testimonials',
        'gallery': 'Before/After Gallery',
        'faq': 'FAQ',
        'contact': 'Contact Us'
    };
    
    let currentSection = 'hero';
    
    
    // Scroll to section function for breadcrumb home link
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = sectionId === 'hero' ? 0 : 100;
            const targetPosition = section.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Intersection Observer for section detection
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateBreadcrumb(entry.target.id);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    document.addEventListener('DOMContentLoaded', function() {
        const sectionsToObserve = ['hero', 'services', 'about', 'testimonials', 'gallery', 'faq', 'contact'];
        sectionsToObserve.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                sectionObserver.observe(section);
            }
        });
    });


    // FAQ Accordion
    document.addEventListener('DOMContentLoaded', function() {
        
        const faqItems = document.querySelectorAll('.faq-item');
        
        // FAQ functionality with touch-outside-to-close
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            
            question.addEventListener('click', function() {
                // Close other open FAQ items on mobile
                if (window.innerWidth <= 768) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
                item.classList.toggle('active');
            });
        });
        
        // Touch-outside-to-close for mobile FAQ
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', function(e) {
                const activeFaq = document.querySelector('.faq-item.active');
                if (activeFaq && !activeFaq.contains(e.target)) {
                    activeFaq.classList.remove('active');
                }
            });
        }
    });
    
    // Fix navigation on window resize and load events

    // Enhanced scroll-triggered navigation (inspired by reference projects)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const header = document.querySelector('header');
            const scrollY = window.scrollY;
            
            // Shadow effect
            if (scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
            
            // Enhanced navigation state (from reference project patterns)
            if (scrollY > 150) {
                header.classList.add('nav-scrolled');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.classList.remove('nav-scrolled');
                header.style.background = '';
                header.style.backdropFilter = '';
            }
        });
    });

    // Enhanced Booking Modal Functionality
    
    // Close modal on outside click
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('bookingModal');
        if (e.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
    
    // Handle Quick Booking Widget
    function handleQuickBooking(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const service = form.querySelector('select').value;
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;
        
        // Auto-fill main booking form and open modal
        setTimeout(() => {
            document.getElementById('bookingName').value = name;
            document.getElementById('bookingPhone').value = phone;
            document.getElementById('bookingService').value = service;
            
            // Reset widget form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Open main booking modal
            openBookingModal();
            
            // Track quick booking usage
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quick_booking_used', {
                    'event_category': 'engagement',
                    'event_label': 'desktop_widget'
                });
            }
        }, 800);
    }
    
    // Handle booking form submission
    document.addEventListener('DOMContentLoaded', function() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleBookingSubmission();
            });
        }
    });

    // Form submission handler with feedback states
    function handleBookingSubmission() {
        const form = document.getElementById('bookingForm');
        const submitButton = form.querySelector('.booking-submit-btn');
        const progressBar = form.querySelector('.form-progress-bar');
        const messageContainer = document.getElementById('formMessage');
        const messageIcon = messageContainer.querySelector('.form-message-icon');
        const messageText = messageContainer.querySelector('.form-message-text');
        
        // Get form data
        const formData = {
            name: form.bookingName.value.trim(),
            phone: form.bookingPhone.value.trim(),
            service: form.bookingService.value,
            time: form.bookingTime.value,
            notes: form.bookingNotes.value.trim()
        };
        
        // Validate required fields
        const validation = validateBookingForm(formData);
        if (!validation.isValid) {
            showFormMessage('error', validation.message);
            highlightInvalidFields(validation.fields);
            return;
        }
        
        // Start loading state
        showLoadingState();
        
        // Simulate form processing with progress updates
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress > 90) progress = 90;
            updateProgressBar(progress);
        }, 200);
        
        // Process submission (simulate network delay)
        setTimeout(() => {
            clearInterval(progressInterval);
            updateProgressBar(100);
            
            // Build WhatsApp message
            const whatsappMessage = buildWhatsAppMessage(formData);
            const whatsappURL = \`https://wa.me/96566006699?text=\${encodeURIComponent(whatsappMessage)}\`;
            
            // Show success state
            setTimeout(() => {
                showFormMessage('success', '✅ Form submitted! Redirecting to WhatsApp...');
                hideLoadingState();
                
                // Track successful submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'engagement',
                        'event_label': 'booking_form',
                        'value': 1
                    });
                }
                
                // Redirect to WhatsApp
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                    closeBookingModal();
                    resetForm();
                }, 1500);
                
            }, 500);
            
        }, 2000 + Math.random() * 1000);
        
        // Functions for form feedback
        function showLoadingState() {
            form.classList.add('form-loading');
            submitButton.disabled = true;
            submitButton.innerHTML = \`
                <span class="booking-btn-icon icon--spin">⏳</span>
                Preparing WhatsApp...
            \`;
            hideFormMessage();
        }
        
        function hideLoadingState() {
            form.classList.remove('form-loading');
            submitButton.disabled = false;
            submitButton.innerHTML = \`
                <span class="booking-btn-icon">💬</span>
                Continue to WhatsApp
            \`;
        }
        
        function updateProgressBar(percent) {
            progressBar.style.width = percent + '%';
        }
        
        function showFormMessage(type, message) {
            messageContainer.className = \`form-message form-message-\${type}\`;
            messageIcon.innerHTML = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
            messageText.textContent = message;
            messageContainer.style.display = 'flex';
        }
        
        function hideFormMessage() {
            messageContainer.style.display = 'none';
        }
        
        function resetForm() {
            form.reset();
            form.classList.remove('form-loading');
            progressBar.style.width = '0%';
            hideFormMessage();
            clearFieldValidation();
        }
        
        function highlightInvalidFields(fields) {
            // Clear previous validation
            clearFieldValidation();
            
            // Highlight invalid fields
            fields.forEach(fieldName => {
                const field = form.querySelector(\`[name="\${fieldName}"]\`);
                if (field) {
                    field.classList.add('form-field-error');
                    field.addEventListener('input', clearFieldError, { once: true });
                }
            });
        }
        
        function clearFieldValidation() {
            form.querySelectorAll('.form-field-error').forEach(field => {
                field.classList.remove('form-field-error');
            });
        }
        
        function clearFieldError(e) {
            e.target.classList.remove('form-field-error');
        }
    }
    
    // Form validation function
    function validateBookingForm(data) {
        const invalidFields = [];
        let message = '';
        
        if (!data.name) {
            invalidFields.push('name');
            message = 'Please enter your name';
        } else if (data.name.length < 2) {
            invalidFields.push('name');
            message = 'Name must be at least 2 characters';
        }
        
        if (!data.phone) {
            invalidFields.push('phone');
            message = 'Please enter your phone number';
        } else if (!/^[+]?[\\d\\-\\s()]{8,}$/.test(data.phone)) {
            invalidFields.push('phone');
            message = 'Please enter a valid phone number';
        }
        
        if (!data.service) {
            invalidFields.push('service');
            message = 'Please select a service';
        }
        
        if (!data.time) {
            invalidFields.push('time');
            message = 'Please select your preferred time';
        }
        
        return {
            isValid: invalidFields.length === 0,
            fields: invalidFields,
            message: message
        };
    }
    
    // Build WhatsApp message from form data
    function buildWhatsAppMessage(data) {
        return \`🦷 *Booking Request - Dr. Islam Elsagher*

👤 *Name:* \${data.name}
📱 *Phone:* \${data.phone}
🩺 *Service:* \${data.service}
⏰ *Preferred Time:* \${data.time}
\${data.notes ? \`📝 *Notes:* \${data.notes}\` : ''}

📍 *Clinic Location:* Hawally, Kuwait
🕐 *Working Hours:* 9:00 AM - 9:00 PM

Please confirm my appointment. Thank you! 🙏\`;
    }
    

    // Analytics tracking for direct WhatsApp links
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_direct_click'
                });
            }
        });
    });

    // Before/After Gallery
    document.addEventListener('DOMContentLoaded', function() {
        const galleries = document.querySelectorAll('.gallery-item');
        galleries.forEach(gallery => {
            let isDown = false;
            const container = gallery.querySelector('.before-after-container');
            if (container) {
                const slider = document.createElement('div');
                slider.className = 'before-after-slider';
                container.appendChild(slider);
                
                const beforeImg = container.querySelector('img:first-child');
                if (beforeImg) {
                    beforeImg.style.clipPath = 'inset(0 50% 0 0)';
                    
                    slider.addEventListener('mousedown', () => isDown = true);
                    document.addEventListener('mouseup', () => isDown = false);
                    document.addEventListener('mousemove', (e) => {
                        if (!isDown) return;
                        const rect = container.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        slider.style.left = percent + '%';
                        beforeImg.style.clipPath = \`inset(0 \${100 - percent}% 0 0)\`;
                    });
                    
                    // Touch support
                    slider.addEventListener('touchstart', () => isDown = true);
                    document.addEventListener('touchend', () => isDown = false);
                    document.addEventListener('touchmove', (e) => {
                        if (!isDown) return;
                        const rect = container.getBoundingClientRect();
                        const x = e.touches[0].clientX - rect.left;
                        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        slider.style.left = percent + '%';
                        beforeImg.style.clipPath = \`inset(0 \${100 - percent}% 0 0)\`;
                    });
                }
            }
        });
    });

    // Emergency banner auto-fade
    setTimeout(() => {
        const emergencyBanner = document.querySelector('.emergency-banner');
        if (emergencyBanner) {
            emergencyBanner.style.transition = 'opacity 0.5s';
            emergencyBanner.style.opacity = '0.8';
        }
    }, 10000);
    
    
    // ===== UI/UX ENHANCEMENTS INJECTED 2025-07-18 =====
    // UI/UX Enhancement JavaScript
// Mobile-first improvements for dr-islam-website

(function() {
    'use strict';
    
    // =================================
    // LAZY LOADING IMAGES
    // =================================
    
    
    // =================================
    // TOUCH GESTURES FOR GALLERY
    // =================================
    
    
    // =================================
    // BEFORE/AFTER SLIDER TOUCH
    // =================================
    
    
    // =================================
    // SMOOTH SCROLL ENHANCEMENTS
    // =================================
    
    
    // =================================
    // KEYBOARD NAVIGATION
    // =================================
    
    
    // =================================
    // LOADING STATES
    // =================================
    
    
    // =================================
    // FORM ENHANCEMENTS
    // =================================
    


    
    // =================================
    // PERFORMANCE MONITORING
    // =================================
    
    const monitorPerformance = () => {
        // Track Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Track First Input Delay
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Track Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    };
    
    // =================================
    // INITIALIZE EVERYTHING
    // =================================
    
    document.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        setupGalleryTouch();
        setupBeforeAfterTouch();
        setupSmoothScroll();
        setupKeyboardNav();
        setupFormEnhancements();
        setupFormValidation(); // Add real-time validation
        
        // Only monitor performance in development
        if (window.location.hostname === 'localhost') {
            monitorPerformance();
        }
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('js-loaded');
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'الصفحة جاهزة';
        document.body.appendChild(announcement);
    });
    
    // =================================
    // PROGRESSIVE ENHANCEMENT CHECK
    // =================================
    
    // Add class to indicate JS is available
    document.documentElement.classList.add('js');
    document.documentElement.classList.remove('no-js');
    
})();
    // ===== END UI/UX ENHANCEMENTS =====
    
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch(err => /* ServiceWorker registration failed - logging disabled */);
        });
        
        // PWA Install prompts are now handled by PWA Manager
        // (Legacy implementation removed to prevent conflicts with modern PWA Manager)
    }
    
    // =================================
    // MOBILE UX ENHANCEMENTS
    // =================================
    ` + MOBILE_UX_JS + `

    // =================================
    // DESKTOP SIDEBAR FUNCTIONALITY
    // =================================
    
    // Show desktop sidebar on large screens
    function initDesktopSidebar() {
        if (window.innerWidth >= 1200) {
            const sidebar = document.getElementById('desktopSidebar');
            if (sidebar) {
                sidebar.style.display = 'block';
            }
        }
    }
    
    // Enhanced Gallery Lightbox for Desktop
    let currentLightboxIndex = 0;
    let lightboxImages = [];
    
    function initGalleryLightbox() {
        // Collect all gallery images
        lightboxImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
            src: img.src,
            alt: img.alt,
            caption: img.closest('.gallery-item')?.querySelector('p')?.textContent || img.alt
        }));
        
        // Add click handlers
        document.querySelectorAll('.gallery-item img').forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                currentLightboxIndex = index;
                showImageLightbox();
            });
            
            // Add keyboard support
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'View ' + img.alt + ' in full size');
            
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentLightboxIndex = index;
                    showImageLightbox();
                }
            });
        });
    }
    
    function showImageLightbox() {
        const image = lightboxImages[currentLightboxIndex];
        if (!image) return;
        
        // Create lightbox with enhanced structure
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-labelledby', 'lightbox-title');
        
        lightbox.innerHTML = \`
            <div class="lightbox-backdrop" onclick="closeLightbox()" aria-hidden="true"></div>
            <div class="lightbox-content">
                <div class="lightbox-header">
                    <h2 id="lightbox-title" class="sr-only">\${image.alt}</h2>
                    <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close lightbox" tabindex="0">
                        <span aria-hidden="true">✕</span>
                    </button>
                </div>
                <div class="lightbox-body">
                    <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)" aria-label="Previous image" \${currentLightboxIndex === 0 ? 'disabled' : ''}>
                        <span aria-hidden="true">‹</span>
                    </button>
                    <div class="lightbox-image-container">
                        <img src="\${image.src}" alt="\${image.alt}" class="lightbox-image">
                        <div class="lightbox-loading" aria-hidden="true">Loading...</div>
                    </div>
                    <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)" aria-label="Next image" \${currentLightboxIndex === lightboxImages.length - 1 ? 'disabled' : ''}>
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
                <div class="lightbox-footer">
                    <div class="lightbox-caption">\${image.caption}</div>
                    <div class="lightbox-counter">\${currentLightboxIndex + 1} / \${lightboxImages.length}</div>
                </div>
            </div>
        \`;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.focus();
        
        // Trap focus within lightbox
        trapFocus(lightbox);
        
        // Preload adjacent images for smooth navigation
        preloadAdjacentImages();
        
        // Add keyboard listeners
        document.addEventListener('keydown', handleLightboxKeydown);
        
        // Fade in animation
        requestAnimationFrame(() => {
            lightbox.classList.add('show');
        });
    }
    
    function navigateLightbox(direction) {
        const newIndex = currentLightboxIndex + direction;
        
        if (newIndex >= 0 && newIndex < lightboxImages.length) {
            currentLightboxIndex = newIndex;
            updateLightboxContent();
            preloadAdjacentImages();
        }
    }
    
    function updateLightboxContent() {
        const lightbox = document.querySelector('.image-lightbox');
        if (!lightbox) return;
        
        const image = lightboxImages[currentLightboxIndex];
        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const counter = lightbox.querySelector('.lightbox-counter');
        const title = lightbox.querySelector('#lightbox-title');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Show loading state
        const loading = lightbox.querySelector('.lightbox-loading');
        loading.style.display = 'block';
        img.style.opacity = '0';
        
        // Update image
        img.onload = () => {
            loading.style.display = 'none';
            img.style.opacity = '1';
        };
        
        img.src = image.src;
        img.alt = image.alt;
        caption.textContent = image.caption;
        counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
        title.textContent = image.alt;
        
        // Update navigation buttons
        prevBtn.disabled = currentLightboxIndex === 0;
        nextBtn.disabled = currentLightboxIndex === lightboxImages.length - 1;
    }
    
    function preloadAdjacentImages() {
        // Preload previous and next images for smooth navigation
        [-1, 1].forEach(offset => {
            const index = currentLightboxIndex + offset;
            if (index >= 0 && index < lightboxImages.length) {
                const img = new Image();
                img.src = lightboxImages[index].src;
            }
        });
    }
    
    function handleLightboxKeydown(e) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox(1);
                break;
        }
    }
    
    function trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    
    function closeLightbox() {
        const lightbox = document.querySelector('.image-lightbox');
        if (lightbox) {
            // Fade out animation
            lightbox.classList.add('hide');
            
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
                
                // Return focus to original trigger
                const originalImage = document.querySelectorAll('.gallery-item img')[currentLightboxIndex];
                if (originalImage) {
                    originalImage.focus();
                }
                
                // Remove keyboard listener
                document.removeEventListener('keydown', handleLightboxKeydown);
            }, 200);
        }
    }
    
    // =================================
    // TESTIMONIAL CAROUSEL FUNCTIONALITY
    // =================================
    
    let currentTestimonialIndex = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.carousel-dots .dot');
    let testimonialAutoSlide = null;
    
    function showTestimonialSlide(index) {
        // Hide all slides
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (testimonialDots[i]) {
                testimonialDots[i].classList.remove('active');
            }
        });
        
        // Show current slide
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
            if (testimonialDots[index]) {
                testimonialDots[index].classList.add('active');
            }
        }
    }
    
    function moveTestimonialCarousel(direction) {
        currentTestimonialIndex += direction;
        
        if (currentTestimonialIndex >= testimonialSlides.length) {
            currentTestimonialIndex = 0;
        } else if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialSlides.length - 1;
        }
        
        showTestimonialSlide(currentTestimonialIndex);
        resetTestimonialAutoSlide();
    }
    
    function currentTestimonialSlide(index) {
        currentTestimonialIndex = index - 1;
        showTestimonialSlide(currentTestimonialIndex);
        resetTestimonialAutoSlide();
    }
    
    function startTestimonialAutoSlide() {
        testimonialAutoSlide = setInterval(() => {
            moveTestimonialCarousel(1);
        }, 6000);
    }
    
    function resetTestimonialAutoSlide() {
        if (testimonialAutoSlide) {
            clearInterval(testimonialAutoSlide);
        }
        startTestimonialAutoSlide();
    }
    
    // Initialize testimonial carousel
    function initTestimonialCarousel() {
        if (testimonialSlides.length > 0) {
            showTestimonialSlide(0);
            startTestimonialAutoSlide();
            
            // Pause auto-slide on hover
            const carousel = document.querySelector('.testimonial-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', () => {
                    if (testimonialAutoSlide) {
                        clearInterval(testimonialAutoSlide);
                    }
                });
                
                carousel.addEventListener('mouseleave', () => {
                    startTestimonialAutoSlide();
                });
            }
        }
    }
    
    // =================================
    // FAQ SEARCH & FILTER FUNCTIONALITY
    // =================================
    
    let allFAQs = [];
    let filteredFAQs = [];
    
    function initFAQSearch() {
        const faqItems = document.querySelectorAll('.faq-item');
        allFAQs = Array.from(faqItems).map(item => ({
            element: item,
            question: item.querySelector('h3').textContent.toLowerCase(),
            answer: item.querySelector('.faq-content p').textContent.toLowerCase(),
            keywords: item.dataset.keywords || '',
            category: item.dataset.category || 'all'
        }));
        filteredFAQs = [...allFAQs];
    }
    
    function searchFAQs(query) {
        const searchTerm = query.toLowerCase().trim();
        const faqList = document.getElementById('faqList');
        const noResults = document.getElementById('faqNoResults');
        
        if (searchTerm === '') {
            // Show all FAQs in current category filter
            filteredFAQs.forEach(faq => {
                faq.element.style.display = 'block';
            });
            noResults.style.display = 'none';
            return;
        }
        
        let visibleCount = 0;
        
        filteredFAQs.forEach(faq => {
            const isMatch = faq.question.includes(searchTerm) ||
                          faq.answer.includes(searchTerm) ||
                          faq.keywords.includes(searchTerm);
            
            if (isMatch) {
                faq.element.style.display = 'block';
                visibleCount++;
                
                // Highlight search terms
                highlightSearchTerms(faq.element, searchTerm);
            } else {
                faq.element.style.display = 'none';
            }
        });
        
        // Show no results message if no matches
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
    
    function highlightSearchTerms(element, searchTerm) {
        // Simple highlighting - in production, use a more robust solution
        const question = element.querySelector('h3');
        const answer = element.querySelector('.faq-content p');
        
        [question, answer].forEach(el => {
            if (el && searchTerm.length > 2) {
                let html = el.innerHTML;
                const regex = new RegExp('(' + searchTerm + ')', 'gi');
                html = html.replace(regex, '<mark style="background: #ffeb3b; padding: 0 2px;">$1</mark>');
                el.innerHTML = html;
            }
        });
    }
    
    function filterFAQs(category) {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const searchInput = document.getElementById('faqSearch');
        
        // Update active category button
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Filter FAQs by category
        if (category === 'all') {
            filteredFAQs = [...allFAQs];
        } else {
            filteredFAQs = allFAQs.filter(faq => faq.category === category);
        }
        
        // Clear search and show filtered results
        searchInput.value = '';
        searchFAQs('');
        
        // Hide non-matching category items
        allFAQs.forEach(faq => {
            if (category === 'all' || faq.category === category) {
                faq.element.style.display = 'block';
            } else {
                faq.element.style.display = 'none';
            }
        });
    }
    
    // Enhanced FAQ accordion functionality
    function initEnhancedFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const icon = question.querySelector('.faq-icon');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQs on mobile, allow multiple open on desktop
                if (window.innerWidth <= 768) {
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        if (otherIcon) otherIcon.textContent = '+';
                    });
                }
                
                // Toggle current FAQ
                if (!isActive) {
                    item.classList.add('active');
                    if (icon) icon.textContent = '−';
                } else {
                    item.classList.remove('active');
                    if (icon) icon.textContent = '+';
                }
                
                // Smooth scroll to question on mobile
                if (window.innerWidth <= 768 && !isActive) {
                    setTimeout(() => {
                        question.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 200);
                }
            });
        });
    }

    // Initialize all UI components
    document.addEventListener('DOMContentLoaded', () => {
        initTestimonialCarousel();
        initFAQSearch();
        initEnhancedFAQs();
    });
    
    // =================================
    // SERVICE COMPARISON TAB FUNCTIONALITY
    // =================================
    
    function showComparisonTab(tabIndex, buttonElement) {
        // Remove active class from all tabs and tab buttons
        const allTabs = document.querySelectorAll('.tab-content');
        const allButtons = document.querySelectorAll('.tab-btn');
        
        allTabs.forEach(tab => tab.classList.remove('active'));
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected tab and button
        const selectedTab = document.querySelector('[data-tab="' + tabIndex + '"]');
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
        
        // Smooth scroll to comparison section on mobile tab change
        if (window.innerWidth <= 768) {
            const comparisonSection = document.getElementById('comparison');
            if (comparisonSection) {
                setTimeout(() => {
                    comparisonSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        }
        
        // Add haptic feedback on mobile devices
        if (navigator.vibrate && window.innerWidth <= 768) {
            navigator.vibrate(25);
        }
    }

    // Gallery Lightbox Functions
    let currentLightboxIndex = 0;
    let galleryData = [];
    let touchStartX = 0;
    let touchEndX = 0;
    
    function openLightbox(index) {
        if (!galleryData || !galleryData[index]) return;
        
        currentLightboxIndex = index;
        const case_ = galleryData[index];
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCategory = document.getElementById('lightbox-category');
        
        // Set image and info
        lightboxImage.src = '/' + case_.afterImage; // Show 'after' image by default
        lightboxImage.alt = case_.title + ' - After';
        lightboxTitle.textContent = case_.title;
        lightboxCategory.textContent = case_.category;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function navigateLightbox(direction) {
        if (!galleryData) return;
        
        currentLightboxIndex += direction;
        
        // Loop around
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = galleryData.length - 1;
        } else if (currentLightboxIndex >= galleryData.length) {
            currentLightboxIndex = 0;
        }
        
        // Update lightbox content
        const case_ = galleryData[currentLightboxIndex];
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxCategory = document.getElementById('lightbox-category');
        
        lightboxImage.src = '/' + case_.afterImage;
        lightboxImage.alt = case_.title + ' - After';
        lightboxTitle.textContent = case_.title;
        lightboxCategory.textContent = case_.category;
    }
    
    function switchGalleryCategory(category) {
        // Update tab active state
        document.querySelectorAll('.gallery-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-category="' + category + '"]').classList.add('active');
        
        // Reload gallery with new category
        const container = document.getElementById('dynamic-gallery');
        container.innerHTML = '<div class="gallery-loading"><div class="loading-spinner"></div><p>Loading ' + 
          (category === 'all' ? 'all cases' : category + ' cases') + '...</p></div>';
        
        loadDynamicGallery('dynamic-gallery', category);
    }
    
    async function loadDynamicGallery(containerId, category) {
        try {
            const response = await fetch('/api/gallery/public?category=' + category + '&limit=12');
            const data = await response.json();
            
            const container = document.getElementById(containerId);
            
            if (!data.success || !data.cases || data.cases.length === 0) {
                container.innerHTML = '<div class="gallery-empty"><p>No cases available at the moment.</p></div>';
                return;
            }
            
            const casesHTML = data.cases.map((case_, index) => {
                return \`
                  <div class="gallery-case" data-case-index="\${index}">
                    <div class="case-images" onclick="openLightbox(\${index})" style="cursor: pointer;">
                      <div class="before-after-container">
                        <picture class="before-image">
                          <img src="/\${case_.beforeImage || case_.afterImage}" 
                               alt="\${case_.title} - Before" 
                               loading="lazy">
                        </picture>
                        
                        <picture class="after-image">
                          <img src="/\${case_.afterImage || case_.beforeImage}" 
                               alt="\${case_.title} - After" 
                               loading="lazy">
                        </picture>
                        
                        <div class="before-after-labels">
                          <span class="label">Before</span>
                          <span class="label">After</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="case-info">
                      <h3 class="case-title">\${case_.title}</h3>
                      <span class="case-category">\${case_.category}</span>
                      \${case_.description ? \`<p class="case-description">\${case_.description}</p>\` : ''}
                    </div>
                  </div>
                \`;
            }).join('');
            
            container.innerHTML = casesHTML;
            
            // Store gallery data for lightbox navigation
            galleryData = data.cases;
            
        } catch (error) {
            // Failed to load gallery - show fallback content
            const container = document.getElementById(containerId);
            container.innerHTML = \`
                <div class="gallery-case" onclick="openLightbox(0)">
                    <div class="case-images" style="cursor: pointer;">
                        <img src="/assets/real-case1.webp" alt="Amazing smile transformation" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="case-info">
                        <h3 class="case-title">Amazing smile transformation</h3>
                        <span class="case-category">cosmetic</span>
                    </div>
                </div>
                <div class="gallery-case" onclick="openLightbox(1)">
                    <div class="case-images" style="cursor: pointer;">
                        <img src="/assets/real-case2.webp" alt="Hollywood smile" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="case-info">
                        <h3 class="case-title">Hollywood smile</h3>
                        <span class="case-category">cosmetic</span>
                    </div>
                </div>
                <div class="gallery-case" onclick="openLightbox(2)">
                    <div class="case-images" style="cursor: pointer;">
                        <img src="/assets/real-case3.webp" alt="Orthodontic treatment" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="case-info">
                        <h3 class="case-title">Orthodontic treatment</h3>
                        <span class="case-category">orthodontic</span>
                    </div>
                </div>
            \`;
            
            // Fallback gallery data
            galleryData = [
                { title: 'Amazing smile transformation', category: 'cosmetic', afterImage: 'assets/real-case1.webp' },
                { title: 'Hollywood smile', category: 'cosmetic', afterImage: 'assets/real-case2.webp' },
                { title: 'Orthodontic treatment', category: 'orthodontic', afterImage: 'assets/real-case3.webp' }
            ];
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('gallery-lightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
    
    // Touch/swipe support for mobile
    document.addEventListener('DOMContentLoaded', function() {
        const lightbox = document.getElementById('gallery-lightbox');
        if (!lightbox) return;
        
        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Touch events for swipe
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeDistance = touchStartX - touchEndX;
            const minSwipeDistance = 50;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swipe left - next image
                    navigateLightbox(1);
                } else {
                    // Swipe right - previous image
                    navigateLightbox(-1);
                }
            }
        }
        
        // Load initial gallery
        loadDynamicGallery('dynamic-gallery', 'all');
    });

    // Make functions globally available
    window.moveTestimonialCarousel = moveTestimonialCarousel;
    window.currentTestimonialSlide = currentTestimonialSlide;
    window.searchFAQs = searchFAQs;
    window.filterFAQs = filterFAQs;
    window.showComparisonTab = showComparisonTab;
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.navigateLightbox = navigateLightbox;
    window.switchGalleryCategory = switchGalleryCategory;
    
    </script>
    
    <!-- WAVE 1: Critical JavaScript Foundation -->
    <script src="/js/ui-utils.js" defer></script>
    
</body>
</html>`;