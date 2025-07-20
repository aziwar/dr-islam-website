// Critical CSS - Above-fold styles only (~500 lines)
export const CRITICAL_CSS = `
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
    scroll-behavior: smooth;
    overflow-y: scroll;
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

/* Footer */
footer {
    background: var(--secondary);
    color: var(--white);
    text-align: center;
    padding: 20px;
}

/* Touch Target Optimization */
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

/* Arabic Typography */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');

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

/* Focus States & Accessibility */
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

/* Image optimization */
img {
    loading: lazy;
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

/* Loading states */
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
}`;