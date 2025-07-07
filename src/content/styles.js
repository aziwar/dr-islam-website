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

.logo-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.logo-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--secondary);
}

.logo-arabic {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary);
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
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1001;
}

.mobile-menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--secondary);
    margin: 5px 0;
    transition: 0.3s;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Responsive - Enhanced Mobile Support */
@media (max-width: 768px) {
    /* Hide desktop nav */
    nav > ul {
        display: none !important;
    }
    
    /* Mobile Navigation */
    .mobile-menu-toggle {
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
    
    /* Sticky WhatsApp Button */
    .sticky-book {
        bottom: 20px;
        right: 20px;
        font-size: 1rem;
        padding: 15px 25px;
        min-width: auto;
    }
    
    /* Emergency Banner */
    .emergency-banner {
        font-size: 0.85rem;
        padding: 8px 10px;
        min-height: 35px;
        line-height: 1.2;
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
    
    [dir="rtl"] .mobile-menu-toggle {
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
}`;