// src/content/styles.js
export const CSS = `
/* Brand Colors */
:root {
    --primary: #BEB093;
    --secondary: #777669;
    --white: #FFFFFF;
    --light: #F8F7F5;
    --text: #333333;
    --emergency: #dc3545;
    --success: #28a745;
}

/* Base HTML font size for responsive units */
html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
}

/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Kufi Arabic', 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    color: var(--text);
    line-height: 1.6;
    direction: rtl;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
}

/* Typography */
h1, h2, h3 {
    font-weight: 600;
    margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.2rem; font-weight: 600; }

/* Emergency Banner */
.emergency-banner {
    background: var(--emergency);
    color: var(--white);
    text-align: center;
    padding: 10px;
    font-weight: 500;
    font-size: 1.125rem;
    position: sticky;
    top: 0;
    z-index: 101;
}

.emergency-banner a {
    color: var(--white);
    font-weight: bold;
    text-decoration: underline;
}

/* Header - Modern Glassmorphism */
header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 40px;
    z-index: 100;
    transition: all 0.3s ease;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 80px;
    width: 80px;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    /* High-DPI rendering optimizations */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* No padding or background for icon style */
    display: block;
}

/* Hide broken image icon */
.logo-img::before {
    content: "Dr. Islam Elsagher";
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
}

.logo-img:not([src]), 
.logo-img[src=""] {
    width: 180px;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
}

nav a {
    text-decoration: none;
    color: var(--secondary);
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    padding: 5px 10px;
}

nav a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

nav a:hover {
    color: var(--primary);
}

nav a:hover::after {
    width: 80%;
}

/* Hero with Animated Gradient */
.hero {
    background: linear-gradient(-45deg, #BEB093, #777669, #8B7F6B, #9A8E77);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    color: var(--white);
    padding: 100px 5%;
    text-align: center;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.subtitle {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

/* Trust Badges in Hero */
.trust-badges {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
    color: var(--white);
    padding: 18px 40px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 5px 25px rgba(190, 176, 147, 0.3);
    position: relative;
    overflow: hidden;
}

.cta-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.cta-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 35px rgba(190, 176, 147, 0.4);
}

.cta-button:hover::after {
    width: 350px;
    height: 350px;
}

/* Sticky Booking Button */
.sticky-book {
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: var(--success);
    color: var(--white);
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 999;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
    50% { box-shadow: 0 5px 30px rgba(40, 167, 69, 0.5); }
    100% { box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
}

.sticky-book:hover {
    transform: scale(1.1);
    background: #218838;
}

/* Services */
.services {
    padding: 80px 5%;
    background: var(--light);
}

.services h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

/* Service Cards with Glassmorphism */
.service-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(190, 176, 147, 0.1) 0%, transparent 70%);
    transform: rotate(45deg);
    transition: all 0.6s ease;
    opacity: 0;
}

.service-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.service-card:hover::before {
    opacity: 1;
}

.service-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

/* Testimonials */
.testimonials {
    padding: 80px 5%;
    background: var(--white);
}

.testimonials h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.testimonial-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(190, 176, 147, 0.2);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.4s ease;
    position: relative;
}

.testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}

.testimonial-card::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 4rem;
    color: var(--primary);
    opacity: 0.1;
    font-family: Georgia, serif;
}

.stars {
    color: #FFD700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.testimonial-card p {
    font-style: italic;
    margin-bottom: 1rem;
    line-height: 1.8;
}

.testimonial-card cite {
    color: var(--primary);
    font-weight: 600;
    font-style: normal;
}

/* Gallery */
.gallery {
    padding: 80px 5%;
    background: var(--light);
}

.gallery h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 1rem;
}

.gallery-subtitle {
    text-align: center;
    color: var(--text);
    margin-bottom: 3rem;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.gallery-item {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    position: relative;
    height: 400px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.before-after-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.before-after-slider {
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: var(--primary);
    cursor: ew-resize;
    transition: opacity 0.3s;
}

.before-after-slider::before {
    content: '◄ ►';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary);
    color: white;
    padding: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.gallery-item img {
    width: 50%;
    height: 200px;
    object-fit: cover;
    display: inline-block;
    transition: opacity 0.3s ease;
}

/* Gallery Skeleton Loaders */
.gallery-item.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.gallery-item img.lazy-loading {
    opacity: 0;
}

.gallery-item img.lazy-loaded {
    opacity: 1;
}

.gallery-item p {
    padding: 1rem;
    color: var(--primary);
    font-weight: 600;
}

/* About */
.about {
    padding: 80px 5%;
}

.about h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.credentials ul {
    list-style: none;
    padding-right: 20px;
}

.credentials li {
    margin-bottom: 1rem;
    position: relative;
    padding-right: 20px;
}

.credentials li:before {
    content: "•";
    color: var(--primary);
    position: absolute;
    right: 0;
    font-size: 1.5rem;
}

/* Certifications */
.certifications {
    margin-top: 2rem;
}

.certifications h4 {
    margin-bottom: 1rem;
    color: var(--secondary);
}

.cert-badges {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.cert-badge {
    background: var(--light);
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    display: inline-block;
}

/* Stats */
.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
}

.stat {
    text-align: center;
}

.stat h4 {
    color: var(--primary);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

/* FAQ */
.faq {
    padding: 80px 5%;
    background: var(--white);
}

.faq h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.faq-list {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: var(--light);
    padding: 2rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.faq-item h3 {
    color: var(--primary);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.faq-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    transition: transform 0.3s ease;
    display: inline-block;
}

.faq-item.active .faq-icon {
    transform: rotate(45deg);
}

.faq-item p {
    line-height: 1.8;
}

/* Contact */
.contact {
    padding: 80px 5%;
    background: var(--light);
}

.contact h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
    margin-bottom: 3rem;
}

.contact-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.contact-card a {
    color: var(--secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}

.contact-card a:hover {
    color: var(--primary);
}

/* Working Hours */
.working-hours {
    background: var(--white);
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.working-hours h3 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 1.5rem;
}

.hours-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.day-hours {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--light);
}

.day {
    font-weight: 600;
    color: var(--secondary);
}

.hours {
    color: var(--text);
}

/* Footer */
footer {
    background: var(--secondary);
    color: var(--white);
    text-align: center;
    padding: 20px;
}

/* Mobile Navigation */
..mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1001;
}

..mobile-menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--secondary);
    margin: 5px 0;
    transition: 0.3s;
}

..mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

..mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

..mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Responsive - Enhanced Mobile Support */
@media (max-width: 768px) {
    /* Logo adjustments */
    .logo-img {
        height: 40px;
        max-width: 150px;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    /* Hide desktop nav */
    nav > ul {
        display: none !important;
    }
    
    /* Mobile Navigation */
    ..mobile-menu-toggle {
        display: block;
    }
    
    nav {
        position: relative;
    }
    
    /* Mobile Navigation - Hidden by default */
    #mobileMenu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transition: right 0.3s ease;
        z-index: 1000;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex !important;
    }
    
    /* Mobile Menu Backdrop */
    .mobile-menu-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .mobile-menu-backdrop.active {
        opacity: 1;
        visibility: visible;
    }
    
    #mobileMenu.active {
        right: 0;
    }
    
    nav a {
        font-size: 1.2rem;
        padding: 15px 30px;
        min-height: 48px;
        display: flex;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Hero Mobile */
    .hero {
        padding: 60px 5%;
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
    
    h1 {
        font-size: 2rem;
        line-height: 1.3;
    }
    
    .subtitle {
        font-size: 1rem;
    }
    
    /* Touch-friendly CTA */
    .cta-button {
        padding: 20px 45px;
        font-size: 1.1rem;
        min-height: 56px;
    }
    
    /* Service Cards Mobile */
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .service-card {
        padding: 2rem;
    }
    
    /* Remove hover effects on mobile */
    .service-card:hover {
        transform: none;
    }
    
    /* About Section */
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .doctor-image {
        max-width: 250px;
        margin: 0 auto;
    }
    
    /* Stats Mobile */
    .stats {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .stat-card {
        min-height: auto;
        padding: 1.5rem;
    }
    
    /* Testimonials Mobile */
    .testimonial-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    /* Gallery Mobile */
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-item {
        height: 300px;
    }
    
    .before-after-slider {
        width: 6px;
    }
    
    /* FAQ Mobile */
    .faq-item h3 {
        font-size: 1rem;
        padding: 15px 0;
        min-height: 48px;
    }
    
    /* Contact Cards Mobile */
    .contact-cards {
        grid-template-columns: 1fr;
    }
    
    .contact-card {
        min-height: 60px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .contact-card a {
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    
    /* Trust Badges */
    .trust-badges {
        flex-direction: column;
        gap: 1rem;
    }
    
    .badge {
        font-size: 0.9rem;
        padding: 10px 20px;
        width: 100%;
        max-width: 250px;
    }
    
    /* Mobile WhatsApp Button - Maximum Specificity */
    body .sticky-book,
    body a.sticky-book,
    html body .sticky-book,
    html body a.sticky-book {
        bottom: 80px !important;
        right: 20px !important;
        font-size: 1rem !important;
        padding: 15px 25px !important;
        min-width: auto !important;
        z-index: 997 !important;
        position: fixed !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Mobile Emergency Banner - Maximum Specificity */
    body .emergency-banner,
    body p.emergency-banner,
    html body .emergency-banner,
    html body p.emergency-banner {
        font-size: 18px !important;
        padding: 8px 10px !important;
        min-height: 35px !important;
        line-height: 1.4 !important;
        display: block !important;
        visibility: visible !important;
    }
    
    /* Header adjustments */
    header {
        top: 35px;
        padding: 0.5rem 5%;
    }
    
    /* Working Hours Mobile */
    .hours-grid {
        gap: 0.5rem;
    }
    
    .hour-item {
        padding: 8px;
        font-size: 0.9rem;
    }
}

/* RTL Mobile Support */
@media (max-width: 768px) {
    [dir="rtl"] #mobileMenu {
        left: auto;
        right: -100%;
    }
    
    [dir="rtl"] #mobileMenu.active {
        right: 0;
        left: auto;
    }
    
    [dir="rtl"] .sticky-book {
        right: 20px;
        left: auto;
    }
    
    [dir="rtl"] ..mobile-menu-toggle {
        margin-right: auto;
        margin-left: 0;
    }
}

/* Small Mobile Screens */
@media (max-width: 480px) {
    h1 {
        font-size: 1.75rem;
    }
    
    .cta-button {
        width: 100%;
        max-width: 300px;
    }
    
    .service-card {
        padding: 1.5rem;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .emergency-banner {
        font-size: 0.75rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .gallery-item {
        position: relative;
        touch-action: pan-y;
    }
}

/* Performance Optimizations */
img {
    loading: lazy;
}

/* Accessibility */
a:focus,
button:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* ===== UI/UX IMPROVEMENTS MERGED 2025-07-18 ===== */

/* UI/UX IMPROVEMENTS - Mobile First Approach */

/* =================================
   PHASE 1: TOUCH TARGET OPTIMIZATION
   ================================= */

/* Ensure all interactive elements meet 48x48px minimum */
.nav-link,
.btn,
.gallery-nav button,
.faq-item h3,
.contact-card a,
.sticky-book,
button,
a[role="button"],
input[type="submit"],
input[type="button"] {
    min-height: 48px;
    min-width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

/* Increase clickable area without visual change */
.nav-link::before,
.btn::before,
button::before {
    content: '';
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
}

/* =================================
   PHASE 2: ARABIC TYPOGRAPHY
   ================================= */

/* Import Arabic optimized fonts */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');

/* Arabic specific typography */
body.ar,
.ar body {
    font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', -apple-system, sans-serif;
    font-weight: 400;
    letter-spacing: 0;
    word-spacing: 0.1em;
    line-height: 1.8;
}

/* Arabic headings */
.ar h1, .ar h2, .ar h3, .ar h4, .ar h5, .ar h6 {
    font-family: 'Cairo', 'Tajawal', sans-serif;
    font-weight: 700;
    letter-spacing: 0;
}

/* Better Arabic readability on mobile */
@media (max-width: 768px) {
    .ar body {
        font-size: 17px;
        line-height: 1.9;
    }
    
    .ar p {
        margin-bottom: 1.2rem;
    }
}

/* =================================
   PHASE 3: LOADING STATES
   ================================= */

/* Skeleton loading animation */
.skeleton {
    background: linear-gradient(90deg, 
        rgba(190, 176, 147, 0.1) 25%, 
        rgba(190, 176, 147, 0.2) 50%, 
        rgba(190, 176, 147, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Loading spinner */
.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(190, 176, 147, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Button loading state */
.btn.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
}

.btn.loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

/* =================================
   PHASE 4: FOCUS STATES & ACCESSIBILITY
   ================================= */

/* Visible focus for keyboard navigation */
:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
}

/* Better focus for buttons and links */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

/* Skip navigation link */
.skip-nav {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 4px 0;
    z-index: 1000;
}

.skip-nav:focus {
    top: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :focus {
        outline-width: 4px;
    }
    
    .btn {
        border: 2px solid currentColor;
    }
}

/* =================================
   PHASE 5: MICRO-INTERACTIONS
   ================================= */

/* Smooth transitions */
a,
button,
.btn,
.nav-link,
.gallery-item,
.faq-item {
    transition: all 0.3s ease;
}

/* Button hover effects */
.btn:hover:not(.loading) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active:not(.loading) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Link underline animation */
a:not(.btn):not(.nav-link) {
    position: relative;
    text-decoration: none;
}

a:not(.btn):not(.nav-link)::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
}

a:not(.btn):not(.nav-link):hover::after {
    width: 100%;
}

/* Gallery hover effects */
.gallery-item {
    overflow: hidden;
}

.gallery-item img {
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* FAQ accordion animation */
.faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.faq-item.active .faq-content {
    max-height: 500px;
    transition: max-height 0.5s ease-in;
}

.faq-item h3::after {
    content: '+';
    position: absolute;
    left: 20px;
    transition: transform 0.3s ease;
}

.faq-item.active h3::after {
    transform: rotate(45deg);
}

/* =================================
   PHASE 6: MOBILE TOUCH GESTURES
   ================================= */

/* Swipeable gallery */
.gallery-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.gallery-container::-webkit-scrollbar {
    display: none;
}

.gallery-item {
    scroll-snap-align: center;
}

/* Touch feedback */
.touchable {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}

.touchable:active {
    opacity: 0.8;
    transform: scale(0.98);
}

/* =================================
   PHASE 7: PERFORMANCE OPTIMIZATIONS
   ================================= */

/* Hardware acceleration for animations */
.animated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Lazy loading images */
img[loading="lazy"] {
    background: var(--light);
}

/* Image fade-in when loaded */
img {
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

/* =================================
   PHASE 8: ERROR STATES
   ================================= */

/* Form validation */
.error {
    border-color: var(--emergency) !important;
    background-color: rgba(220, 53, 69, 0.05);
}

.error-message {
    color: var(--emergency);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.error-message::before {
    content: '⚠️';
}

/* Success states */
.success {
    border-color: var(--success) !important;
    background-color: rgba(40, 167, 69, 0.05);
}

.success-message {
    color: var(--success);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.success-message::before {
    content: '✓';
}

/* =================================
   PHASE 9: RESPONSIVE UTILITIES
   ================================= */

/* Hide scrollbars but keep functionality */
.no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Prevent text selection on UI elements */
.no-select {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Prevent layout shift from scrollbar */
html {
    overflow-y: scroll;
}

/* Safe area insets for modern phones */
.safe-top {
    padding-top: env(safe-area-inset-top);
}

.safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}


/* ===== PWA INSTALL PROMPT STYLES ===== */

/* PWA Install Prompt Styles */
.install-prompt {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 15px;
    animation: slideUp 0.3s ease-out;
}

.install-prompt p {
    margin: 0;
    font-weight: 600;
    color: var(--text);
}

.install-prompt button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.install-prompt button:first-of-type {
    background: var(--primary);
    color: white;
}

.install-prompt button:first-of-type:hover {
    background: var(--secondary);
}

.install-prompt button:last-of-type {
    background: transparent;
    color: var(--text);
    border: 1px solid #ddd;
}

@keyframes slideUp {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

@media (max-width: 768px) {
    .install-prompt {
        width: calc(100% - 40px);
        flex-direction: column;
        text-align: center;
    }
    
    .install-prompt button {
        width: 100%;
    }
}
`;