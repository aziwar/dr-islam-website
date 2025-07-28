// Template generator for creating language-specific HTML
import { t } from './translations.js';
import { commonFunctions } from './common-content.js';

export function generateHTML(lang = 'ar') {
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const manifestFile = isArabic ? '/manifest-ar.json' : '/manifest-en.json';
  const langSwitch = isArabic ? '/' : '/ar/';
  const langSwitchText = isArabic ? 'English' : 'العربية';
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

    <!-- PWA Support -->
    <link rel="manifest" href="${manifestFile}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="${isArabic ? 'د. اسلام' : 'Dr. Islam'}">
    
    <title>${t('title', lang)}</title>
    <meta name="description" content="${t('description', lang)}">
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    
    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Dr. Islam Elsagher",
      "alternateName": "د. اسلام الصغير",
      "description": "${t('description', lang)}",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KW"
      },
      "telephone": "+96598563711",
      "url": "https://drislamelsagher.com"
    }
    </script>
    
    <script>
      window.isArabic = ${isArabic};
      ${commonFunctions}
    </script>
</head>
<body>
    <!-- Skip Links -->
    <a href="#main-content" class="skip-link">${t('skipToMain', lang)}</a>
    <a href="#nav-menu" class="skip-link">${t('skipToNav', lang)}</a>
    <a href="#contact" class="skip-link">${t('skipToContact', lang)}</a>

    <!-- Emergency Banner -->
    <div class="emergency-banner" role="banner">
        <p>${t('emergencyBanner', lang)} <a href="tel:+96598563711">98563711</a></p>
    </div>

    <header>
        <nav role="navigation" aria-label="${t('menuLabel', lang)}">
            <div class="logo">
                <picture>
                    <source srcset="/assets/images/logo-main.webp" type="image/webp">
                    <img src="/assets/images/logo-main.png" alt="دكتور اسلام الصغير - Dr. Islam Elsagher" class="logo-img" loading="eager">
                </picture>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="${t('menuLabel', lang)}" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul id="mobileMenu">
                <li><a href="#services">${t('services', lang)}</a></li>
                <li><a href="#about">${t('about', lang)}</a></li>
                <li><a href="#testimonials">${t('testimonials', lang)}</a></li>
                <li><a href="#gallery">${t('gallery', lang)}</a></li>
                <li><a href="#faq">${t('faq', lang)}</a></li>
                <li><a href="#contact">${t('contact', lang)}</a></li>
                <li><a href="${langSwitch}" class="lang-switch">${langSwitchText}</a></li>
            </ul>
        </nav>
    </header>

    <div class="mobile-menu-backdrop" onclick="closeMobileMenu()"></div>

    <main id="main-content">
        ${generateHeroSection(lang)}
        ${generateServicesSection(lang)}
        ${generateAboutSection(lang)}
        ${generateTestimonialsSection(lang)}
        ${generateGallerySection(lang)}
        ${generateFAQSection(lang)}
        ${generateContactSection(lang)}
    </main>

    ${generateFooter(lang)}
    ${generateModals(lang)}
</body>
</html>`;
}

// Generate individual sections
function generateHeroSection(lang) {
  return `
    <section class="hero">
        <div class="container">
            <h1>${t('heroTitle', lang)}</h1>
            <p class="subtitle">${t('heroSubtitle', lang)}</p>
            <div class="trust-badges">
                <span class="badge">${t('experience', lang)}</span>
                <span class="badge">${t('modernTech', lang)}</span>
                <span class="badge">${t('satisfaction', lang)}</span>
            </div>
            <button class="cta-button" onclick="openBookingModal()">${t('bookNow', lang)}</button>
        </div>
    </section>`;
}

function generateServicesSection(lang) {
  const services = t('servicesList', lang);
  const servicesHTML = services.map((service, index) => `
    <div class="service-card" role="listitem" tabindex="0">
        <h3>${service.title}</h3>
        <p>${service.desc}</p>
    </div>
  `).join('');
  
  return `
    <section id="services" class="services">
        <div class="container">
            <h2>${t('servicesTitle', lang)}</h2>
            <div class="services-grid" role="list">
                ${servicesHTML}
            </div>
        </div>
    </section>`;
}

function generateAboutSection(lang) {
  const content = t('aboutContent', lang);
  const contentHTML = content.map(p => `<p>${p}</p>`).join('');
  
  return `
    <section id="about" class="about">
        <div class="container">
            <h2>${t('aboutTitle', lang)}</h2>
            <div class="about-content">
                <div class="doctor-image">
                    <img src="/assets/images/dr-islam.webp" alt="${t('heroTitle', lang)}" loading="lazy">
                </div>
                <div class="doctor-info">
                    ${contentHTML}
                </div>
            </div>
        </div>
    </section>`;
}

function generateTestimonialsSection(lang) {
  // This would be populated from a data source in production
  return `
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>${t('testimonials', lang)}</h2>
            <div class="testimonial-grid">
                <!-- Testimonials would be dynamically loaded -->
            </div>
        </div>
    </section>`;
}

function generateGallerySection(lang) {
  return `
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>${t('gallery', lang)}</h2>
            <div class="gallery-grid">
                <!-- Gallery items would be dynamically loaded -->
            </div>
        </div>
    </section>`;
}

function generateFAQSection(lang) {
  return `
    <section id="faq" class="faq">
        <div class="container">
            <h2>${t('faq', lang)}</h2>
            <div class="faq-list">
                <!-- FAQ items would be dynamically loaded -->
            </div>
        </div>
    </section>`;
}

function generateContactSection(lang) {
  return `
    <section id="contact" class="contact">
        <div class="container">
            <h2>${t('contact', lang)}</h2>
            <div class="contact-content">
                <form id="contactForm" class="contact-form">
                    <input type="text" name="name" placeholder="${t('formName', lang)}" required>
                    <input type="tel" name="phone" placeholder="${t('formPhone', lang)}" required>
                    <input type="email" name="email" placeholder="${t('formEmail', lang)}" required>
                    <textarea name="message" placeholder="${t('formMessage', lang)}" rows="5" required></textarea>
                    <button type="submit" class="cta-button">${t('formSubmit', lang)}</button>
                </form>
            </div>
        </div>
    </section>`;
}

function generateFooter(lang) {
  return `
    <footer>
        <div class="container">
            <p>&copy; 2024 ${t('heroTitle', lang)}. ${t('rights', lang)}.</p>
        </div>
    </footer>`;
}

function generateModals(lang) {
  return `
    <!-- Booking Modal -->
    <div id="bookingModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeBookingModal()">&times;</span>
            <h2>${t('formTitle', lang)}</h2>
            <form id="bookingForm">
                <input type="text" name="name" placeholder="${t('formName', lang)}" required>
                <input type="tel" name="phone" placeholder="${t('formPhone', lang)}" required>
                <input type="email" name="email" placeholder="${t('formEmail', lang)}">
                <textarea name="message" placeholder="${t('formMessage', lang)}" rows="4"></textarea>
                <button type="submit" class="cta-button">${t('formSubmit', lang)}</button>
            </form>
        </div>
    </div>
    
    <!-- Success Notification -->
    <div id="successNotification" class="notification success-notification">
        <p>${t('formSuccess', lang)}</p>
    </div>`;
}