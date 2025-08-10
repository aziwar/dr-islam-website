// CORE.CSS.JS - Foundation Styles (Critical + Responsive)
// Consolidates: critical.css.js + critical-inline.css.js + responsive.css.js
// ~2000 lines → Critical path foundation

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

export const CORE_CSS = `
${DESIGN_TOKENS}

/* ===== BRAND FONTS ===== */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@400;600&family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

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

h1 { 
    font-size: var(--text-4xl); 
    line-height: var(--leading-tight);
}
h2 { 
    font-size: var(--text-3xl); 
    line-height: var(--leading-tight);
}
h3 { 
    font-size: var(--text-2xl); 
    line-height: var(--leading-snug);
}
h4 { 
    font-size: var(--text-xl); 
    font-weight: 600; 
    line-height: var(--leading-snug);
}

/* Arabic Typography - Brand Fonts */
body.ar,
.ar body {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', 'Noto Kufi Arabic', -apple-system, sans-serif;
    font-weight: 400;
    letter-spacing: 0;
    word-spacing: 0.1em;
    line-height: 1.8;
}

.ar h1, .ar h2, .ar h3, .ar h4, .ar h5, .ar h6 {
    font-family: 'Amiri', 'Cairo', 'Tajawal', sans-serif;
    font-weight: 700;
    letter-spacing: 0;
}

/* ===== EMERGENCY BANNER - MODERN 2024/2025 ===== */
.emergency-banner {
    background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%);
    color: var(--white);
    text-align: center;
    padding: clamp(12px, 2.5vw, 16px) clamp(16px, 4vw, 24px);
    font-weight: 500;
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    position: sticky;
    top: 0;
    z-index: 101;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    contain: layout style paint;
    will-change: transform;
    line-height: 1.4;
}

.emergency-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%);
    pointer-events: none;
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
}

.emergency-banner a {
    color: var(--white);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 2px;
    padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px);
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.emergency-banner a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
    z-index: -1;
}

.emergency-banner a:hover::before,
.emergency-banner a:focus::before {
    transform: scaleX(1);
}

.emergency-banner a:hover,
.emergency-banner a:focus {
    text-decoration-color: rgba(255, 255, 255, 0.8);
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
}

.emergency-banner a:active {
    transform: scale(0.98);
}

/* Dark mode support for emergency banner */
@media (prefers-color-scheme: dark) {
    .emergency-banner {
        background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%);
        border-bottom-color: rgba(255, 255, 255, 0.1);
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .emergency-banner {
        background: #000;
        color: #fff;
        border: 3px solid #fff;
        border-bottom: 3px solid #fff;
    }
    
    .emergency-banner a {
        text-decoration-thickness: 3px;
        outline: 2px solid #fff;
    }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    .emergency-banner::before {
        animation: none;
    }
    
    .emergency-banner a::before,
    .emergency-banner a {
        transition: none;
    }
}

/* ===== HEADER & NAVIGATION ===== */
header {
    /* Enhanced Glassmorphism Effect */
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 1px 0px rgba(255, 255, 255, 0.8) inset,
        0 -1px 0px rgba(0, 0, 0, 0.02) inset;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    position: sticky;
    top: 40px;
    z-index: 999;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 12px;
    margin: 0 20px;
    overflow: hidden;
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

/* Enhanced scroll-triggered navigation state (from reference projects) */
header.nav-scrolled {
    transition: all 0.3s ease-in-out;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

header.nav-scrolled nav a {
    color: var(--secondary);
    font-weight: 600;
}

header.nav-scrolled .logo {
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

/* ===== HERO SECTION ===== */
.hero {
    background: linear-gradient(-45deg, #BEB093, #777669, #8B7F6B, #9A8E77);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    color: var(--white);
    padding: var(--space-3xl) var(--space-md);
    text-align: center;
    min-height: clamp(60vh, 80vh, 100vh);
}

/* Hero Typography - Brand Display Font */
.hero h1,
#hero-heading {
    font-family: 'Playfair Display', 'Source Serif Pro', Georgia, serif;
    font-weight: 600;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 1.1;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
    font-feature-settings: 'kern' 1, 'liga' 1;
}

.hero .subtitle {
    font-family: 'Source Serif Pro', 'Playfair Display', Georgia, serif;
    font-weight: 400;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    line-height: 1.4;
    margin-bottom: 1.5rem;
    opacity: 0.95;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.01em;
}

/* Arabic Hero Typography - Brand Display Font */
.ar .hero h1,
.ar #hero-heading {
    font-family: 'Amiri', 'Cairo', 'Tajawal', serif;
    font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    color: var(--white);
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    line-height: 1.2;
    margin-bottom: 1.5rem;
}

.ar .hero .subtitle {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', sans-serif;
    font-weight: 400;
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 0.95;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    letter-spacing: 0;
}

/* Arabic CTA and Interactive Elements - Brand Typography */
.ar .cta-button,
.ar .booking-submit-btn,
.ar button,
.ar .btn {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', sans-serif;
    font-weight: 600;
    letter-spacing: 0;
}

/* Arabic Form Elements - Brand Typography */
.ar input,
.ar select,
.ar textarea,
.ar label {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', sans-serif;
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
    background: linear-gradient(135deg, #BEB093 0%, #D4C5A3 100%);
    color: var(--white);
    padding: 20px 45px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 
        0 8px 30px rgba(190, 176, 147, 0.4),
        0 4px 15px rgba(190, 176, 147, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
    will-change: transform, box-shadow;
    transform: translateZ(0);
    backface-visibility: hidden;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    text-align: center;
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
    transform: translateY(-4px) scale(1.06);
    background: linear-gradient(135deg, #D4C5A3 0%, #BEB093 100%);
    box-shadow: 
        0 15px 40px rgba(190, 176, 147, 0.5),
        0 8px 20px rgba(190, 176, 147, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
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

/* ===== ENHANCED FOOTER ===== */
.site-footer {
    background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
    color: var(--white);
    padding: 60px 0 20px;
    position: relative;
    overflow: hidden;
}

.site-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #BEB093 0%, #D4C5A3 50%, #BEB093 100%);
}

.footer-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.footer-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
}

.footer-brand {
    max-width: 100%;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.footer-logo-icon {
    color: #BEB093;
    filter: drop-shadow(0 2px 8px rgba(190, 176, 147, 0.3));
}

.footer-brand-text h3 {
    font-family: 'Playfair Display', 'Source Serif Pro', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--white);
    margin: 0;
    line-height: 1.2;
}

.footer-brand-text p {
    font-size: 0.9rem;
    color: #BEB093;
    margin: 4px 0 0 0;
    font-weight: 500;
}

.footer-description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: 0.95rem;
}

.footer-contact h4,
.footer-hours h4 {
    font-family: 'Playfair Display', Georgia, serif;
    color: #BEB093;
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-weight: 600;
}

.contact-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
}

.contact-item .icon {
    color: #BEB093;
    flex-shrink: 0;
}

.hours-schedule {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.schedule-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.schedule-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.schedule-text span:first-child {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}

.schedule-text span:last-child {
    color: #BEB093;
    font-weight: 600;
}

.availability-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(34, 197, 94, 0.1);
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-indicator {
    width: 8px;
    height: 8px;
    background: #22C55E;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.availability-badge span:last-child {
    color: #22C55E;
    font-size: 0.85rem;
    font-weight: 500;
}

.footer-bottom {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 40px;
    border-top: 1px solid rgba(190, 176, 147, 0.2);
    align-items: center;
    text-align: center;
}

.footer-links {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
}

.footer-links a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 8px 12px;
    border-radius: 6px;
}

.footer-links a:hover {
    color: #BEB093;
    background: rgba(190, 176, 147, 0.1);
    transform: translateY(-1px);
}

.footer-copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
}

/* Tablet Responsive */
@media (min-width: 768px) {
    .footer-main {
        grid-template-columns: 1fr 300px;
        gap: 60px;
    }
    
    .footer-contact {
        grid-column: 2;
        grid-row: 1;
    }
    
    .footer-hours {
        grid-column: 2;
        grid-row: 2;
    }
    
    .footer-brand {
        grid-column: 1;
        grid-row: 1 / span 2;
    }
    
    .footer-bottom {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
    }
}

/* Desktop Responsive */
@media (min-width: 1024px) {
    .site-footer {
        padding: 80px 0 30px;
    }
    
    .footer-main {
        grid-template-columns: 2fr 1fr 1fr;
        gap: 80px;
    }
    
    .footer-brand {
        grid-column: 1;
        grid-row: 1;
        max-width: 400px;
    }
    
    .footer-contact {
        grid-column: 2;
        grid-row: 1;
    }
    
    .footer-hours {
        grid-column: 3;
        grid-row: 1;
    }
    
    .footer-logo-icon {
        transform: scale(1.1);
    }
    
    .footer-brand-text h3 {
        font-size: 1.75rem;
    }
}

/* Arabic Footer Styles */
.ar .site-footer {
    direction: rtl;
}

.ar .footer-brand-text h3 {
    font-family: 'Amiri', 'Cairo', 'Tajawal', serif;
}

.ar .footer-contact h4,
.ar .footer-hours h4 {
    font-family: 'Amiri', 'Cairo', serif;
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
    padding: 0.75rem 1rem;
    min-height: 48px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
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
/* Skip navigation removed per user request */

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

/* ===== UNIFIED RESPONSIVE NAVIGATION SYSTEM ===== */

/* Main Navigation - Mobile First Design */
.main-nav {
    /* Mobile: Hidden off-canvas by default */
    position: fixed;
    top: 0;
    right: -100%;
    width: min(80vw, 400px);
    height: 100vh;
    /* Enhanced Mobile Navigation Glassmorphism */
    background: rgba(255, 255, 255, 0.95);
    -webkit-backdrop-filter: blur(25px) saturate(180%) brightness(1.1);
    backdrop-filter: blur(25px) saturate(180%) brightness(1.1);
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
        -10px 0 50px rgba(0, 0, 0, 0.15),
        -1px 0 0 rgba(255, 255, 255, 0.6) inset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) var(--space-md);
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

.main-nav.is-open {
    right: 0;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Smooth slide-in animation */
.main-nav {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateX(100%);
}

.main-nav.is-open {
    transform: translateX(0);
}

.main-nav a {
    font-size: var(--text-lg);
    padding: var(--space-sm) var(--space-lg);
    min-height: 48px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    border-radius: var(--radius-md);
    width: 100%;
    justify-content: center;
}

.main-nav a:hover,
.main-nav a:focus {
    color: var(--primary);
    background: rgba(190, 176, 147, 0.1);
}

/* Navigation Toggle Button */
.nav-toggle {
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
    min-height: 48px;
    min-width: 48px;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    position: relative;
}

.nav-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--secondary);
    margin: 5px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.nav-toggle.is-open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.is-open span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.is-open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Navigation Backdrop - Enhanced Glassmorphism */
.nav-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* Enhanced Backdrop Effect */
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    background: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--z-modal) - 10);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
}

.nav-backdrop.is-open {
    opacity: 1;
    visibility: visible;
}

/* Progressive Enhancement: Tablet and Desktop */
@media (min-width: var(--breakpoint-md)) {
    .main-nav {
        /* Reset mobile styles */
        position: static;
        width: auto;
        height: auto;
        background: transparent;
        backdrop-filter: none;
        flex-direction: row;
        justify-content: flex-end;
        gap: var(--space-md);
        padding: 0;
        right: 0;
        overflow: visible;
    }
    
    .main-nav a {
        font-size: var(--text-base);
        padding: var(--space-xs) var(--space-sm);
        width: auto;
        justify-content: flex-start;
    }
    
    .nav-toggle {
        display: none;
    }
    
    .nav-backdrop {
        display: none;
    }
}

/* Responsive Layout Adjustments */
@media (max-width: var(--breakpoint-sm-max)) {
    /* Small screens: Optimize layout */
    .logo-img {
        height: clamp(32px, 8vw, 48px);
        max-width: clamp(120px, 30vw, 180px);
    }
    
    .hero h1,
    #hero-heading {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(2rem, 8vw, 2.8rem);
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -0.01em;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .hero .subtitle {
        font-family: 'Source Serif Pro', Georgia, serif;
        font-size: clamp(1rem, 4vw, 1.2rem);
        font-weight: 400;
        line-height: 1.4;
        opacity: 0.95;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .cta-button {
        padding: 18px 35px;
        font-size: 1rem;
        font-weight: 700;
        min-height: 56px;
        min-width: 180px;
        letter-spacing: 0.3px;
    }
    
    /* Grid layouts become single column */
    .services-grid,
    .stats,
    .testimonial-grid,
    .contact-cards {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-item {
        height: clamp(250px, 60vw, 350px);
    }
    
    /* About section stack */
    .about-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-lg);
    }
    
    .doctor-image {
        max-width: min(250px, 80vw);
        margin: 0 auto;
    }
    
    /* Service cards optimization */
    .service-card {
        padding: var(--space-lg);
    }
    
    .service-card:hover {
        transform: none; /* Disable hover transforms on touch devices */
    }
    
    /* Trust badges stack */
    .trust-badges {
        flex-direction: column;
        gap: var(--space-sm);
    }
    
    .badge {
        font-size: var(--text-sm);
        padding: var(--space-xs) var(--space-md);
        width: 100%;
        max-width: 280px;
    }
    
    /* Header adjustments */
    header {
        top: clamp(20px, 5vh, 40px);
        padding: var(--space-sm) var(--space-md);
    }
    
    /* Breadcrumb adjustments */
    .breadcrumb-nav {
        top: clamp(60px, 12vh, 80px);
        padding: var(--space-xs) 0;
    }
    
    .breadcrumb-list {
        font-size: var(--text-xs);
    }
    
    /* FAQ optimizations */
    .faq-item h3 {
        font-size: var(--text-base);
        padding: var(--space-sm) 0;
        min-height: 48px;
    }
    
    /* Arabic typography adjustments */
    .ar body {
        font-size: var(--text-lg);
        line-height: var(--leading-relaxed);
    }
    
    .ar p {
        margin-bottom: var(--space-sm);
    }
}

/* Sticky Elements Responsive */
.sticky-book {
    bottom: var(--space-xl);
    right: var(--space-md);
    font-size: var(--text-base);
    padding: var(--space-sm) var(--space-md);
    z-index: var(--z-fixed);
}

.emergency-banner {
    font-size: clamp(0.9rem, 2vw, 1rem);
    padding: clamp(10px, 2vw, 14px) clamp(12px, 3vw, 20px);
    min-height: 40px;
    line-height: 1.4;
    backdrop-filter: blur(6px);
}

.emergency-banner a {
    padding: clamp(6px, 1.5vw, 10px) clamp(8px, 2vw, 12px);
    border-radius: 6px;
}

/* ===== RTL SUPPORT ===== */
[dir="rtl"] .main-nav {
    /* Fix: Use the actual navigation width instead of 100% viewport */
    left: calc(-1 * min(80vw, 400px));
    right: auto;
}

[dir="rtl"] .main-nav.is-open {
    left: 0;
    right: auto;
}

[dir="rtl"] .sticky-book {
    left: var(--space-md);
    right: auto;
}

[dir="rtl"] .breadcrumb-item:not(:last-child)::after {
    content: '/';
    margin: 0 var(--space-xs);
}

/* ===== SMALL MOBILE ===== */
@media (max-width: var(--breakpoint-xs-max)) {
    h1 {
        font-size: 1.75rem;
    }
    
    .cta-button {
        width: 100%;
        max-width: 280px;
        padding: 16px 30px;
        font-size: 0.95rem;
        font-weight: 700;
    }
    
    .service-card {
        padding: 1.5rem;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .emergency-banner {
        font-size: clamp(0.75rem, 3vw, 0.9rem);
        padding: clamp(8px, 2vw, 12px) clamp(10px, 3vw, 16px);
        backdrop-filter: blur(4px);
        /* Remove text overflow for better accessibility */
        white-space: normal;
        line-height: 1.3;
    }
    
    .emergency-banner a {
        padding: clamp(4px, 1vw, 8px) clamp(6px, 2vw, 10px);
        font-size: clamp(0.75rem, 3vw, 0.9rem);
        min-height: 40px;
        border-radius: 4px;
    }
    
    .gallery-item {
        position: relative;
        touch-action: pan-y;
    }
}

/* ===== TABLET RANGE ===== */
@media (min-width: var(--breakpoint-md)) and (max-width: var(--breakpoint-md-max)) {
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
        padding: 0.75rem 1rem;
        min-height: 48px;
        border-radius: 6px;
    }
    
    .breadcrumb-item a:hover {
        background: rgba(0, 124, 186, 0.05);
        text-decoration: none;
    }
    
    /* Navigation is now handled by unified system above */
    
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
    
    .hero h1,
    #hero-heading {
        font-family: 'Playfair Display', 'Source Serif Pro', Georgia, serif;
        font-size: clamp(3.5rem, 5vw, 4.8rem);
        font-weight: 600;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        font-feature-settings: 'kern' 1, 'liga' 1, 'swsh' 1;
    }
    
    .hero p,
    .hero .subtitle {
        font-family: 'Source Serif Pro', 'Playfair Display', Georgia, serif;
        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
        font-weight: 400;
        line-height: 1.4;
        margin-bottom: 2rem;
        max-width: 600px;
        opacity: 0.95;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.01em;
    }
    
    .cta-button {
        padding: 22px 50px;
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        border-radius: 50px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        min-width: 220px;
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