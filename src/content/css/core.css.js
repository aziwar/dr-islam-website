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

/* ===== DROPDOWN NAVIGATION ===== */
.nav-item {
    position: relative;
}

.dropdown {
    position: relative;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.dropdown-icon {
    transition: transform 0.2s ease;
    opacity: 0.7;
}

.dropdown:hover .dropdown-icon,
.dropdown[aria-expanded="true"] .dropdown-icon {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(190, 176, 147, 0.2);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    padding: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
}

.dropdown:hover .dropdown-menu,
.dropdown[aria-expanded="true"] .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--secondary);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.dropdown-item:hover,
.dropdown-item:focus {
    background: rgba(190, 176, 147, 0.1);
    color: var(--primary);
    transform: translateX(4px);
}

/* CTA Button Styling */
.cta-item .nav-cta {
    background: var(--primary);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(190, 176, 147, 0.3);
}

.cta-item .nav-cta:hover {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.4);
}

.cta-item .nav-cta::after {
    display: none;
}

.cta-icon {
    transition: transform 0.2s ease;
}

.nav-cta:hover .cta-icon {
    transform: scale(1.1);
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

/* Mobile Dropdown Styles */
@media (max-width: 1024px) {
    .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        background: rgba(190, 176, 147, 0.1);
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin-top: 0.5rem;
        padding: 0;
        display: none;
    }
    
    .dropdown.is-open .dropdown-menu {
        display: block;
    }
    
    .dropdown-item {
        padding: 0.75rem 2rem;
        border-left: 3px solid transparent;
    }
    
    .dropdown-item:hover {
        border-left-color: var(--primary);
        background: rgba(190, 176, 147, 0.2);
        transform: none;
    }
    
    .nav-cta {
        justify-content: center;
        margin: 1rem 0;
    }
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

/* ===== ENHANCED HERO SECTION - WAVE 2 REDESIGN ===== */
.modern-hero {
    position: relative;
    min-height: 100vh;
    padding: calc(var(--space-4) + 80px) 0 var(--space-8);
    background: var(--background);
    overflow: hidden;
}

/* Hero Background Effects */
.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
}

.hero-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: heroGlow 8s ease-in-out infinite alternate;
}

.hero-glow-1 {
    top: -20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--brand-light) 0%, transparent 70%);
    animation-delay: 0s;
}

.hero-glow-2 {
    bottom: -30%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%);
    animation-delay: 2s;
}

@keyframes heroGlow {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.6; }
}

/* Hero Content Layout */
.hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-8);
    align-items: center;
    min-height: 80vh;
}

.hero-main {
    max-width: 600px;
    animation: slideInLeft 1s ease-out;
}

/* Professional Badge */
.hero-badge-wrapper {
    margin-bottom: var(--space-6);
    animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: rgba(var(--brand-rgb), 0.1);
    border: 1px solid rgba(var(--brand-rgb), 0.2);
    border-radius: 50px;
    color: var(--brand);
    font-size: var(--text-sm);
    font-weight: 500;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.badge-icon {
    color: var(--brand);
}

/* Enhanced Hero Title */
.hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: var(--heading);
}

.title-line {
    display: block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 400;
    color: var(--text-muted);
    margin-bottom: var(--space-2);
}

.title-highlight {
    display: block;
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: clamp(3rem, 7vw, 4.5rem);
    font-weight: 700;
    margin-bottom: var(--space-2);
    position: relative;
}

.title-highlight::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand) 0%, var(--accent) 100%);
    border-radius: 2px;
    animation: underlineExpand 1s ease-out 1s both;
}

.title-subtitle {
    display: block;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 500;
    color: var(--text-muted);
}

@keyframes underlineExpand {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
}

/* Hero Description */
.hero-description {
    font-size: var(--text-lg);
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: var(--space-8);
    animation: fadeInUp 1s ease-out 0.4s both;
}

/* Interactive Trust Indicators */
.trust-indicators {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    animation: fadeInUp 1s ease-out 0.6s both;
}

.trust-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: rgba(var(--white-rgb), 0.8);
    border: 1px solid var(--border-light);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.trust-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(var(--brand-rgb), 0.1), transparent);
    transition: left 0.5s ease;
}

.trust-item:hover::before {
    left: 100%;
}

.trust-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(var(--brand-rgb), 0.15);
    border-color: var(--brand-light);
}

.trust-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    color: var(--white);
    border-radius: 12px;
    flex-shrink: 0;
}

.trust-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.trust-number {
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--heading);
    line-height: 1;
}

.trust-label {
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-weight: 500;
}

/* Interactive CTA Section */
.hero-cta-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    animation: fadeInUp 1s ease-out 0.8s both;
}

.interactive-cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4) var(--space-6);
    border: none;
    border-radius: 12px;
    font-size: var(--text-base);
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    min-height: 56px;
}

.cta-primary {
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    color: var(--white);
    box-shadow: 0 4px 20px rgba(var(--brand-rgb), 0.3);
}

.cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(var(--brand-rgb), 0.4);
}

.cta-secondary {
    background: rgba(var(--white-rgb), 0.9);
    color: var(--brand);
    border: 2px solid var(--brand-light);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.cta-secondary:hover {
    background: var(--brand);
    color: var(--white);
    transform: translateY(-2px);
}

.cta-content {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    position: relative;
    z-index: 1;
}

.cta-icon {
    transition: transform 0.3s ease;
}

.interactive-cta:hover .cta-icon {
    transform: scale(1.1);
}

/* CTA Shine Effect */
.cta-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.cta-primary:hover .cta-shine {
    left: 100%;
}

/* Emergency CTA */
.cta-emergency {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: rgba(var(--emergency-rgb), 0.1);
    border: 2px solid var(--emergency);
    border-radius: 50px;
    color: var(--emergency);
    text-decoration: none;
    font-weight: 600;
    font-size: var(--text-sm);
    transition: all 0.3s ease;
}

.cta-emergency:hover {
    background: var(--emergency);
    color: var(--white);
    transform: scale(1.05);
}

.emergency-pulse {
    position: absolute;
    top: 50%;
    left: 12px;
    width: 8px;
    height: 8px;
    background: var(--emergency);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: emergencyPulse 2s ease-in-out infinite;
}

@keyframes emergencyPulse {
    0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
    50% { opacity: 0.3; transform: translateY(-50%) scale(1.2); }
}

/* Social Proof */
.social-proof {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    animation: fadeInUp 1s ease-out 1s both;
}

.avatar-group {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid var(--white);
    margin-left: -8px;
    background: linear-gradient(135deg, var(--brand-light) 0%, var(--accent-light) 100%);
}

.avatar:first-child {
    margin-left: 0;
}

.avatar-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--text-muted);
    color: var(--white);
    border-radius: 50%;
    border: 3px solid var(--white);
    font-size: var(--text-xs);
    font-weight: 600;
    margin-left: -8px;
}

.social-proof-text p {
    color: var(--text-muted);
    font-size: var(--text-sm);
    margin-bottom: var(--space-1);
}

.rating-stars {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.stars {
    color: #FFB800;
    font-size: var(--text-sm);
}

.rating-text {
    color: var(--text-muted);
    font-size: var(--text-xs);
}

/* Enhanced Desktop Booking Widget */
.enhanced-widget {
    position: relative;
    width: 380px;
    background: rgba(var(--white-rgb), 0.95);
    border: 1px solid var(--border-light);
    border-radius: 24px;
    padding: var(--space-6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    animation: slideInRight 1s ease-out 0.5s both;
}

.widget-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    border-radius: 24px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.enhanced-widget:hover .widget-glow {
    opacity: 0.2;
}

.widget-title {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
}

.widget-icon {
    color: var(--brand);
}

.widget-title h3 {
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--heading);
    margin: 0;
}

.widget-subtitle {
    color: var(--text-muted);
    font-size: var(--text-sm);
    margin-bottom: var(--space-4);
}

.widget-benefits {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
}

.benefit-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--text-muted);
}

.benefit-item svg {
    color: var(--success);
    flex-shrink: 0;
}

/* Enhanced Form Styling */
.enhanced-form {
    margin-bottom: var(--space-6);
}

.form-step {
    display: none;
    flex-direction: column;
    gap: var(--space-4);
}

.form-step.active {
    display: flex;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

.form-group label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--heading);
}

.form-group input,
.form-group select {
    padding: var(--space-3);
    border: 2px solid var(--border);
    border-radius: 12px;
    font-size: var(--text-base);
    background: var(--white);
    color: var(--text);
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(var(--brand-rgb), 0.1);
}

.form-navigation {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
}

.btn-step,
.btn-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--brand);
    border-radius: 12px;
    background: var(--white);
    color: var(--brand);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
}

.btn-step:hover,
.btn-submit:hover {
    background: var(--brand);
    color: var(--white);
}

.btn-submit {
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    color: var(--white);
    border: none;
}

.form-progress {
    text-align: center;
}

.progress-bar {
    width: 100%;
    height: 4px;
    background: var(--border-light);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: var(--space-2);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--brand) 0%, var(--accent) 100%);
    transition: width 0.3s ease;
}

.progress-text {
    font-size: var(--text-xs);
    color: var(--text-muted);
}

/* Widget Footer */
.widget-footer {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-light);
}

.availability-indicator {
    display: flex;
    align-items: center;
    gap: var(--space-2);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: statusPulse 2s ease-in-out infinite;
}

.status-dot.available {
    background: var(--success);
}

@keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.availability-text {
    font-size: var(--text-xs);
    color: var(--text-muted);
    font-weight: 500;
}

.widget-guarantee {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    color: var(--text-muted);
}

.widget-guarantee svg {
    color: var(--success);
}

/* Floating Action Button */
.hero-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: none;
}

.fab-button {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
    color: var(--white);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(var(--brand-rgb), 0.3);
    transition: all 0.3s ease;
}

.fab-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(var(--brand-rgb), 0.4);
}

.fab-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    padding: 6px 12px;
    background: var(--text);
    color: var(--white);
    font-size: var(--text-xs);
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.fab-button:hover + .fab-tooltip {
    opacity: 1;
}

/* Animations */
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero-content {
        grid-template-columns: 1fr;
        gap: var(--space-6);
        text-align: center;
    }
    
    .enhanced-widget {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
    }
    
    .trust-indicators {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .modern-hero {
        min-height: auto;
        padding: calc(var(--space-4) + 60px) 0 var(--space-6);
    }
    
    .hero-content {
        min-height: auto;
    }
    
    .trust-indicators {
        grid-template-columns: 1fr;
        gap: var(--space-3);
    }
    
    .trust-item {
        padding: var(--space-3);
    }
    
    .hero-cta-section {
        flex-direction: column;
        align-items: stretch;
    }
    
    .interactive-cta {
        width: 100%;
        justify-content: center;
    }
    
    .social-proof {
        flex-direction: column;
        gap: var(--space-2);
        text-align: center;
    }
    
    .enhanced-widget {
        padding: var(--space-4);
    }
    
    .hero-fab {
        display: block;
    }
}

@media (max-width: 480px) {
    .hero-badge {
        font-size: var(--text-xs);
        padding: var(--space-1) var(--space-3);
    }
    
    .title-line {
        font-size: 1.25rem;
    }
    
    .title-highlight {
        font-size: 2rem;
    }
    
    .title-subtitle {
        font-size: 1rem;
    }
    
    .hero-description {
        font-size: var(--text-base);
    }
    
    .trust-item {
        flex-direction: column;
        text-align: center;
        gap: var(--space-2);
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .modern-hero {
        background: var(--dark);
    }
    
    .enhanced-widget {
        background: rgba(0, 0, 0, 0.8);
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .trust-item {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .form-group input,
    .form-group select {
        background: rgba(255, 255, 255, 0.05);
        color: var(--white);
        border-color: rgba(255, 255, 255, 0.2);
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .trust-item,
    .enhanced-widget {
        border-width: 2px;
        border-color: currentColor;
    }
    
    .interactive-cta {
        border: 2px solid currentColor;
    }
}

/* Enhanced form validation states */
.form-group.field-valid input,
.form-group.field-valid select {
    border-color: var(--success);
    background-image: url("data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m3 6 2 2 4-4' stroke='%2310B981' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 40px;
}

.form-group.field-invalid input,
.form-group.field-invalid select {
    border-color: var(--error);
    background-image: url("data:image/svg+xml,%3csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m3 3 6 6m0-6-6 6' stroke='%23EF4444' stroke-width='1.5' stroke-linecap='round'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 40px;
}

/* Hero notifications */
.hero-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.hero-notification.show {
    transform: translateX(0);
}

.hero-notification.success {
    border-color: var(--success);
}

.hero-notification.error {
    border-color: var(--error);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
}

.notification-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
}

.hero-notification.success .notification-icon {
    background: rgba(var(--success-rgb), 0.1);
    color: var(--success);
}

.hero-notification.error .notification-icon {
    background: rgba(var(--error-rgb), 0.1);
    color: var(--error);
}

.notification-message {
    flex: 1;
    font-size: var(--text-sm);
    color: var(--text);
    line-height: 1.5;
}

.notification-close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
    transition: color 0.2s ease;
}

.notification-close:hover {
    color: var(--text);
}

/* Custom tooltips */
.custom-tooltip {
    position: absolute;
    background: var(--text);
    color: var(--white);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: var(--text-xs);
    font-weight: 500;
    white-space: nowrap;
    z-index: 1002;
    opacity: 0;
    transform: translateY(2px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
}

.custom-tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

.custom-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--text);
}

/* CTA interaction states */
.cta-clicked {
    transform: scale(0.98) !important;
    transition: transform 0.1s ease !important;
}

/* Spin animation for loading states */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Form step transitions */
.form-step {
    opacity: 0;
    transform: translateX(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.form-step.active {
    opacity: 1;
    transform: translateX(0);
}

/* Enhanced button states */
.btn-step:disabled,
.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-step:disabled:hover,
.btn-submit:disabled:hover {
    background: var(--white);
    color: var(--brand);
    transform: none;
}

/* Mobile-specific enhancements */
@media (max-width: 768px) {
    .hero-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
    
    .custom-tooltip {
        font-size: var(--text-xs);
        padding: 6px 10px;
    }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .hero-glow,
    .emergency-pulse,
    .status-dot,
    .animate-appear,
    .slideInLeft,
    .slideInRight,
    .fadeInUp,
    .animate-spin {
        animation: none;
    }
    
    .trust-item:hover,
    .interactive-cta:hover,
    .fab-button:hover {
        transform: none;
    }
    
    .form-step,
    .hero-notification,
    .custom-tooltip {
        transition: none;
    }
}
`;