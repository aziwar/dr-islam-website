// CORE.CSS.JS - Foundation Styles (Critical + Responsive)
// Consolidates: critical.css.js + critical-inline.css.js + responsive.css.js
// ~2000 lines → Critical path foundation

export const CORE_CSS = `
/* ===== CSS VARIABLES & RESET ===== */
:root {
    --primary: #BEB093;
    --secondary: #777669;
    --white: #FFFFFF;
    --light: #F8F7F5;
    --text: #333333;
    --emergency: #dc3545;
    --success: #28a745;
}

html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow-y: scroll;
}

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

/* ===== TYPOGRAPHY ===== */
h1, h2, h3 {
    font-weight: 600;
    margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.2rem; font-weight: 600; }

/* Arabic Typography */
body.ar,
.ar body {
    font-family: 'Cairo', 'Tajawal', 'Noto Kufi Arabic', -apple-system, sans-serif;
    font-weight: 400;
    letter-spacing: 0;
    word-spacing: 0.1em;
    line-height: 1.8;
}

.ar h1, .ar h2, .ar h3, .ar h4, .ar h5, .ar h6 {
    font-family: 'Cairo', 'Tajawal', sans-serif;
    font-weight: 700;
    letter-spacing: 0;
}

/* ===== EMERGENCY BANNER ===== */
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
    padding: 8px 4px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
}

/* ===== HEADER & NAVIGATION ===== */
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
    min-height: 48px;
    padding: 4px;
}

.logo-img {
    height: 80px;
    width: 80px;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: block;
}

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

/* Dental Logo SVG */
.dental-logo {
    display: inline-block;
    color: var(--primary);
    transition: color 0.3s ease;
}

.dental-logo:hover {
    color: var(--secondary);
}

.dental-logo svg {
    height: auto;
    max-width: 100%;
}

[data-theme="dark"] .dental-logo {
    color: #F8F7F5;
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
    padding: 8px 12px;
    min-height: 44px;
    display: flex;
    align-items: center;
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

/* ===== HERO SECTION ===== */
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

/* ===== STICKY BOOKING BUTTON ===== */
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

/* ===== MOBILE MENU ===== */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 12px;
    min-height: 48px;
    min-width: 48px;
    z-index: 1001;
    align-items: center;
    justify-content: center;
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

/* ===== FOOTER ===== */
footer {
    background: var(--secondary);
    color: var(--white);
    text-align: center;
    padding: 20px;
}

/* ===== BREADCRUMB NAVIGATION ===== */
.breadcrumb-nav {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e5e5;
    padding: 0.75rem 0;
    position: sticky;
    top: 80px;
    z-index: 900;
    transition: all 0.3s ease;
}

.breadcrumb-nav.visible {
    opacity: 1;
    transform: translateY(0);
}

.breadcrumb-list {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.875rem;
    flex-wrap: wrap;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    color: #666;
    font-weight: 400;
}

.breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    color: #ccc;
    font-weight: 300;
}

.breadcrumb-item a {
    color: #007cba;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 0.25rem 0;
    border-radius: 4px;
}

.breadcrumb-item a:hover {
    color: #005a8b;
    text-decoration: underline;
}

.breadcrumb-item.active {
    color: #333;
    font-weight: 500;
}

/* ===== TOUCH TARGET OPTIMIZATION ===== */
.nav-link,
.btn,
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

/* ===== ACCESSIBILITY ===== */
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

:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
}

a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

/* ===== PERFORMANCE ===== */
.animated {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

img {
    loading: lazy;
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

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

/* ===== ERROR & SUCCESS STATES ===== */
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

/* ===== MOBILE RESPONSIVE (max-width: 768px) ===== */
@media (max-width: 768px) {
    html {
        height: 100%;
    }
    
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }
    
    .logo-img {
        height: 40px;
        max-width: 150px;
    }
    
    html body header nav > ul,
    html body nav > ul,
    body header nav > ul,
    header nav > ul,
    nav > ul {
        display: none !important;
        visibility: hidden !important;
    }
    
    html body .mobile-menu-toggle,
    body .mobile-menu-toggle,
    .mobile-menu-toggle {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
    }
    
    html body #mobileMenu,
    body #mobileMenu,
    #mobileMenu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.98);
        -webkit-backdrop-filter: blur(10px);
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
        visibility: visible !important;
        opacity: 1 !important;
    }
    
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
        transition: opacity 0.2s ease, visibility 0.2s ease;
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
    
    .cta-button {
        padding: 20px 45px;
        font-size: 1.1rem;
        min-height: 56px;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .service-card {
        padding: 2rem;
    }
    
    .service-card:hover {
        transform: none;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .doctor-image {
        max-width: 250px;
        margin: 0 auto;
    }
    
    .stats {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .stat-card {
        min-height: auto;
        padding: 1.5rem;
    }
    
    .testimonial-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-item {
        height: 300px;
    }
    
    .before-after-slider {
        width: 6px;
    }
    
    .faq-item h3 {
        font-size: 1rem;
        padding: 15px 0;
        min-height: 48px;
    }
    
    .contact-cards {
        grid-template-columns: 1fr;
    }
    
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
    
    header {
        top: 35px;
        padding: 0.5rem 5%;
    }
    
    .hours-grid {
        gap: 0.5rem;
    }
    
    .ar body {
        font-size: 17px;
        line-height: 1.9;
    }
    
    .ar p {
        margin-bottom: 1.2rem;
    }
    
    .breadcrumb-nav {
        top: 70px;
        padding: 0.5rem 0;
    }
    
    .breadcrumb-list {
        font-size: 0.8rem;
    }
    
    .breadcrumb-item:not(:last-child)::after {
        margin: 0 0.375rem;
    }
    
    .nav-link,
    .btn,
    button,
    a[role="button"],
    input[type="submit"],
    input[type="button"],
    .cta-button,
    .filter-btn,
    .view-more-btn,
    .submit-btn {
        min-height: 48px;
        min-width: 48px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    nav ul li {
        margin: 8px 0;
    }
    
    .mobile-menu-toggle {
        min-height: 48px;
        min-width: 48px;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

/* ===== RTL MOBILE SUPPORT ===== */
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
    
    [dir="rtl"] .breadcrumb-item:not(:last-child)::after {
        content: '/';
        margin: 0 0.5rem;
    }
}

/* ===== SMALL MOBILE (max-width: 480px) ===== */
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

/* ===== TABLET (769px - 1024px) ===== */
@media (min-width: 769px) and (max-width: 1024px) {
    .breadcrumb-nav {
        top: 75px;
    }
    
    html body .mobile-menu-toggle,\n    body .mobile-menu-toggle {
        display: flex !important;
    }
    
    body header nav > ul:not(.mobile-nav) {
        display: none !important;
    }
    
    body #mobileMenu {
        display: flex !important;
        width: 60%;
    }
    
    body nav a {
        font-size: 1.1rem;
        padding: 12px 20px;
    }
}

/* ===== DESKTOP (min-width: 1025px) ===== */
@media (min-width: 1025px) {
    .breadcrumb-nav {
        top: 85px;
    }
    
    .breadcrumb-item a {
        padding: 0.375rem 0.5rem;
        border-radius: 6px;
    }
    
    .breadcrumb-item a:hover {
        background: rgba(0, 124, 186, 0.05);
        text-decoration: none;
    }
    
    html body header.site-header nav.main-nav > ul.nav-list,
    html body header nav > ul[class*="nav"],
    html body header nav > ul,
    html body nav > ul,
    body header nav > ul,
    header nav > ul,
    nav > ul {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-direction: row !important;
    }
    
    html body .mobile-menu-toggle,
    body .mobile-menu-toggle,
    .mobile-menu-toggle {
        display: none !important;
        visibility: hidden !important;
    }
    
    html body #mobileMenu,
    body #mobileMenu,
    #mobileMenu {
        display: none !important;
        visibility: hidden !important;
    }
    
    html body .mobile-menu-backdrop,
    body .mobile-menu-backdrop,
    .mobile-menu-backdrop {
        display: none !important;
    }
    
    .hero .container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        align-items: center;
        max-width: 1200px;
    }
    
    .hero-main {
        padding-right: 2rem;
    }
    
    .dental-logo svg {
        width: 120px;
        height: 40px;
    }
}

/* ===== LARGE DESKTOP (min-width: 1200px) ===== */
@media (min-width: 1200px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .hero {
        min-height: 90vh;
        display: flex;
        align-items: center;
        background-size: cover;
        background-position: center;
        position: relative;
    }
    
    .hero .container {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 3rem;
        align-items: center;
    }
    
    .hero-content {
        max-width: none;
    }
    
    .hero h1 {
        font-size: 3.5rem;
        line-height: 1.2;
        margin-bottom: 1.5rem;
    }
    
    .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        max-width: 600px;
    }
    
    .cta-button {
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        border-radius: 50px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .cta-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .cta-button:hover::before {
        left: 100%;
    }
    
    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 102, 204, 0.3);
    }
}

/* ===== HIGH CONTRAST MODE ===== */
@media (prefers-contrast: high) {
    :focus {
        outline-width: 4px;
    }
    
    .btn {
        border: 2px solid currentColor;
    }
}

/* ===== UTILITIES ===== */
.no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-select {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.safe-top {
    padding-top: env(safe-area-inset-top);
}

.safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
}

/* ===== PRINT STYLES ===== */
@media print {
    .emergency-banner,
    .sticky-book,
    .mobile-menu-toggle {
        display: none !important;
    }
    
    header {
        position: static;
        background: white;
    }
    
    .gallery-item {
        page-break-inside: avoid;
    }
    
    a {
        text-decoration: underline;
    }
    
    body {
        font-size: 12pt;
        line-height: 1.5;
    }
}

img[loading="lazy"] {
    background: var(--light);
}
`;