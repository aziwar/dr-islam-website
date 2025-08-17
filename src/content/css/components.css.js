// COMPONENTS.CSS.JS - All UI Components & Interactions
// Consolidates: services.css.js + gallery.css.js + forms.css.js + ui-components.css.js + mobile-interactions.css.js
// ~1500 lines → Complete UI component library

import { DESIGN_TOKENS } from '../../shared/design-tokens.js';

export const COMPONENTS_CSS = `
/* ===== SERVICES SECTION ===== */
.services {
    padding: var(--space-3xl) 5%;
    background: var(--light);
}

.services h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: var(--space-2xl);
}

.services-grid {
    display: grid;
    /* Mobile-first: Single column */
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

/* Small mobile: Keep single column for safety */
@media (min-width: var(--breakpoint-xs)) {
    .services-grid {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }
}

/* Medium mobile and up: Safe responsive grid */
@media (min-width: var(--breakpoint-sm)) {
    .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: var(--space-lg);
    }
}

/* Tablet: Standard layout */
@media (min-width: var(--breakpoint-md)) {
    .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
}

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
    will-change: transform, box-shadow;
    transform: translateZ(0);
    backface-visibility: hidden;
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
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    border-color: rgba(190, 176, 147, 0.4);
}

/* Enhanced desktop hover effects */
@media (min-width: var(--breakpoint-md)) {
    .service-card:hover {
        transform: translateY(-15px) scale(1.03);
        box-shadow: 0 25px 80px rgba(0,0,0,0.2);
    }
}

/* Service Card Icons */
.service-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem auto;
    background: linear-gradient(135deg, #BEB093 0%, #D4C5A3 100%);
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
}

.service-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
    border-radius: 50%;
    transition: all 0.3s ease;
}

.service-icon svg {
    width: 40px;
    height: 40px;
    color: white;
    z-index: 1;
    position: relative;
    transition: all 0.3s ease;
}

.service-card:hover .service-icon {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 15px 35px rgba(190, 176, 147, 0.4);
    background: linear-gradient(135deg, #D4C5A3 0%, #BEB093 100%);
}

.service-card:hover .service-icon svg {
    transform: scale(1.1);
}

/* ===== FORM FEEDBACK STATES ===== */

/* Form Loading State */
.form-loading {
    position: relative;
    pointer-events: none;
}

.form-loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(2px);
    z-index: 10;
    border-radius: inherit;
    transition: all 0.3s ease;
}

.form-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin: -20px 0 0 -20px;
    border: 3px solid rgba(190, 176, 147, 0.3);
    border-top-color: #BEB093;
    border-radius: 50%;
    animation: formSpinner 0.8s linear infinite;
    z-index: 11;
}

@keyframes formSpinner {
    to { transform: rotate(360deg); }
}

/* Form Messages */
.form-message {
    padding: 16px;
    border-radius: 12px;
    margin: 16px 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    line-height: 1.4;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-10px);
}

.form-message.show {
    opacity: 1;
    transform: translateY(0);
}

.form-message-success {
    background: rgba(72, 187, 120, 0.1);
    border: 1px solid rgba(72, 187, 120, 0.3);
    color: #2D5A27;
}

.form-message-error {
    background: rgba(245, 101, 101, 0.1);
    border: 1px solid rgba(245, 101, 101, 0.3);
    color: #C41E3A;
}

.form-message-info {
    background: rgba(66, 153, 225, 0.1);
    border: 1px solid rgba(66, 153, 225, 0.3);
    color: #1F4E79;
}

.form-message-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

/* Button Loading State */
.btn-loading {
    position: relative;
    color: transparent !important;
    pointer-events: none;
}

.btn-loading::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: btnSpinner 0.6s linear infinite;
}

@keyframes btnSpinner {
    to { transform: rotate(360deg); }
}

/* Form Progress Bar */
.form-progress {
    height: 4px;
    background: rgba(190, 176, 147, 0.2);
    border-radius: 2px;
    margin-bottom: 24px;
    overflow: hidden;
}

.form-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #BEB093, #D4C5A3);
    border-radius: 2px;
    width: 0%;
    transition: width 0.3s ease;
    position: relative;
}

.form-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: progressShimmer 1.5s infinite;
}

@keyframes progressShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Input States Enhancement */
.form-group input.success,
.form-group textarea.success,
.form-group select.success {
    border-color: #48BB78;
    background-color: rgba(72, 187, 120, 0.05);
}

.form-group input.error,
.form-group textarea.error,
.form-group select.error {
    border-color: #F56565;
    background-color: rgba(245, 101, 101, 0.05);
    animation: inputShake 0.5s ease-in-out;
}

@keyframes inputShake {
    0%, 20%, 40%, 60%, 80% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
}

.form-group .field-feedback {
    font-size: 0.85rem;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transform: translateY(-5px);
    transition: all 0.2s ease;
}

.form-group .field-feedback.show {
    opacity: 1;
    transform: translateY(0);
}

.form-group .field-feedback.success {
    color: #2D5A27;
}

.form-group .field-feedback.error {
    color: #C41E3A;
}

/* Service Actions */
.service-actions {
    margin-top: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.service-card:hover .service-actions {
    opacity: 1;
    transform: translateY(0);
}

.service-learn-more {
    background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(190, 176, 147, 0.3);
    min-height: 44px;
    position: relative;
    overflow: hidden;
}

.service-learn-more::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.service-learn-more:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(190, 176, 147, 0.4);
    background: linear-gradient(135deg, #D4C5A3 0%, var(--primary) 100%);
}

.service-learn-more:hover::before {
    left: 100%;
}

.service-card:hover::before {
    opacity: 1;
}


.service-card h3 {
    color: var(--secondary);
    margin-bottom: var(--space-md);
    /* Fluid heading size */
    font-size: var(--text-xl);
    position: relative;
    z-index: 1;
}

.service-card p {
    color: var(--text);
    line-height: 1.7;
    opacity: 0.9;
    position: relative;
    z-index: 1;
}

/* ===== PROFESSIONAL SERVICES SECTION ===== */
.professional-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-lg);
}

.professional-service-card {
    --hover-scale: 1;
    --hover-translate-y: 0;

    background: var(--white);
    border-radius: var(--radius-xl);
    padding: var(--space-lg);
    text-align: center;
    border: 1px solid var(--primary-alpha);
    box-shadow: var(--shadow-lg);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateY(var(--hover-translate-y)) scale(var(--hover-scale));
    will-change: transform, box-shadow;
}

.professional-service-card:hover {
    box-shadow: var(--shadow-2xl);
}

.professional-service-card .service-icon {
    font-size: var(--text-3xl);
    line-height: 1;
    margin-bottom: var(--space-md);
    color: var(--primary-dark);
}

.professional-service-card .service-title {
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--secondary);
    margin-bottom: var(--space-sm);
}

.professional-service-card .service-description {
    color: var(--text-light);
    margin-bottom: var(--space-lg);
    min-height: 2.5em; /* Prevents layout shift */
}

.professional-service-card .service-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    background: var(--primary);
    color: var(--white);
    border-radius: var(--radius-full);
    text-decoration: none;
    font-weight: var(--weight-semibold);
    transition: var(--transition-normal);
}

.professional-service-card .service-cta:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
}

.professional-service-card .service-cta svg {
    transition: transform 0.3s ease;
}

.professional-service-card .service-cta:hover svg {
    transform: translateX(4px);
}

/* RTL Support */
[dir="rtl"] .professional-service-card .service-cta svg {
    transform: scaleX(-1);
}

[dir="rtl"] .professional-service-card .service-cta:hover svg {
    transform: scaleX(-1) translateX(-4px);
}

/* Scroll Animation */
.professional-service-card.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.professional-service-card.in-view {
    opacity: 1;
    transform: translateY(0);
}

/* Responsive */
@media (max-width: var(--breakpoint-md)) {
    .professional-services-grid {
        grid-template-columns: 1fr;
        gap: var(--space-md); /* Reduce gap on smaller screens */
    }

    .professional-service-card {
        padding: var(--space-md); /* Reduce padding */
    }

    .professional-service-card .service-title {
        font-size: var(--text-lg); /* Adjust font size for mobile */
    }

    .professional-service-card .service-description {
        min-height: 0; /* Allow height to be flexible on mobile */
    }
}

/* About Section */
.about {
    padding: 80px 5%;
    background: var(--white);
}

.about-content {
    display: grid;
    /* Mobile-first: single column */
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

/* Tablet and up: two columns */
@media (min-width: var(--breakpoint-md)) {
    .about-content {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
    }
}

.about-text h2 {
    color: var(--secondary);
    margin-bottom: 2rem;
    font-size: 2.5rem;
}

.about-text p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text);
    opacity: 0.9;
}

.doctor-image {
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
    position: relative;
}

.doctor-image img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
}

.doctor-image:hover img {
    transform: scale(1.05);
}

/* Stats Section */
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* Fluid spacing */
    gap: var(--space-xl);
    margin: var(--space-3xl) 0;
}

.stat-card {
    background: var(--primary);
    color: var(--white);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.stat-number {
    /* Fluid large number typography */
    font-size: var(--text-4xl);
    font-weight: 700;
    margin-bottom: var(--space-xs);
    position: relative;
    z-index: 1;
}

.stat-label {
    font-size: var(--text-base);
    opacity: 0.9;
    position: relative;
    z-index: 1;
}

/* Testimonials */
.testimonials {
    padding: 80px 5%;
    background: var(--light);
}

.testimonials h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.testimonial-grid {
    display: grid;
    /* Mobile-first: single column, then responsive */
    grid-template-columns: 1fr;
    gap: var(--space-lg);
}

/* Tablet and up: safe responsive grid */
@media (min-width: var(--breakpoint-md)) {
    .testimonial-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}

.testimonial-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    position: relative;
    transition: all 0.3s ease;
}

.testimonial-card:hover {
    /* Mobile-first: subtle shadow only */
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.testimonial-card::before {
    content: '"';
    font-size: var(--text-4xl);
    color: var(--primary);
    position: absolute;
    top: -10px;
    left: 20px;
    font-family: Georgia, serif;
    opacity: 0.3;
}

.testimonial-text {
    font-style: italic;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text);
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-weight: 600;
    font-size: 1.2rem;
}

.author-info h4 {
    color: var(--secondary);
    margin-bottom: 0.25rem;
}

.author-info span {
    color: var(--primary);
    font-size: 0.9rem;
}

/* Enhanced Testimonial Carousel */
.testimonial-carousel-container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}

.testimonial-carousel {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.testimonial-slide {
    display: none;
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.5s ease-in-out;
    animation-duration: 0.8s;
    animation-fill-mode: both;
}

.testimonial-slide.active {
    display: block;
    opacity: 1;
    transform: translateX(0);
    animation-name: slideInTestimonial;
}

@keyframes slideInTestimonial {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.testimonial-card.featured {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid rgba(0, 102, 204, 0.1);
    padding: 3rem;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.carousel-nav {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    margin-top: 2rem;
}

.carousel-btn {
    background: var(--primary);
    color: white;
    border: none;
    width: 50px;
    height: 50px;    
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-btn:hover {
    background: var(--secondary);
    transform: scale(1.1);
}

.carousel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.indicator-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(190, 176, 147, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    /* Touch target improvement */
    min-height: 48px;
    min-width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.indicator-dot::before {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: inherit;
    position: absolute;
}

.indicator-dot.active {
    background: var(--primary);
    transform: scale(1.2);
}

/* ===== GALLERY SECTION ===== */
.gallery {
    padding: 80px 5%;
    background: var(--light);
}

/* ===== LOADING STATES & SKELETON UI ===== */
.skeleton {
    background: linear-gradient(90deg, 
        rgba(160, 143, 101, 0.08) 25%, 
        rgba(160, 143, 101, 0.15) 50%, 
        rgba(160, 143, 101, 0.08) 75%
    );
    background-size: 200% 100%;
    animation: skeletonShimmer 1.5s ease-in-out infinite;
    border-radius: var(--radius-md);
}

@keyframes skeletonShimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.gallery-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-lg);
    margin-bottom: 3rem;
}

.gallery-item-skeleton {
    background: var(--white);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    height: 350px;
}

.gallery-item-skeleton .skeleton-image {
    height: 220px;
    width: 100%;
}

.gallery-item-skeleton .skeleton-content {
    padding: 1.5rem;
}

.gallery-item-skeleton .skeleton-title {
    height: 20px;
    width: 70%;
    margin-bottom: 0.5rem;
}

.gallery-item-skeleton .skeleton-category {
    height: 16px;
    width: 40%;
    margin-bottom: 1rem;
}

.gallery-item-skeleton .skeleton-description {
    height: 14px;
    width: 100%;
    margin-bottom: 0.5rem;
}

.gallery-item-skeleton .skeleton-description:last-child {
    width: 60%;
    margin-bottom: 0;
}

/* Image loading states */
.image-container {
    position: relative;
    overflow: hidden;
}

.image-loading {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-loaded {
    opacity: 1;
}

.image-blur-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    transform: scale(1.1);
    transition: opacity 0.3s ease;
    z-index: 1;
}

.image-blur-placeholder.hidden {
    opacity: 0;
    pointer-events: none;
}

/* ===== FORM LOADING STATES ===== */
.form-loading {
    position: relative;
    pointer-events: none;
}

.form-loading::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    z-index: 10;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
}

.loading-spinner {
    display: inline-flex;
    align-items: center;
    margin-right: 0.5rem;
}

.loading-spinner svg {
    color: currentColor;
}

/* Form success states */
.is-success .form-group {
    border-color: var(--success);
}

.is-success button[type="submit"] {
    background: var(--success);
    border-color: var(--success);
}

/* Form error states */
.is-error button[type="submit"] {
    background: var(--error);
    border-color: var(--error);
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes fadeIn {
    to { opacity: 1; }
}

/* ===== BOOKING WIDGET LOADING STATES ===== */
.booking-widget-loading {
    position: relative;
}

.booking-widget-loading .booking-form {
    opacity: 0.6;
    pointer-events: none;
}

.booking-widget-loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid var(--primary-alpha);
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    animation: bookingSpinner 1s linear infinite;
    z-index: 20;
}

@keyframes bookingSpinner {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.gallery h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

.gallery-subtitle {
    text-align: center;
    color: var(--text);
    margin-bottom: 3rem;
    font-size: 1.2rem;
    opacity: 0.9;
}

.gallery-filters {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--white);
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    min-height: 44px;
    display: flex;
    align-items: center;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 176, 147, 0.3);
    will-change: transform, box-shadow;
}

/* Enhanced Gallery Animations - Wave 5 */
.gallery-item {
    will-change: transform, opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: galleryItemFadeIn 0.6s ease-out;
}

.gallery-item:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    z-index: 10;
    position: relative;
}

.gallery-item.filtered-out {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
    transition: all 0.3s ease-out;
}

.gallery-item.filtered-in {
    opacity: 1;
    transform: scale(1);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: filterFadeIn 0.6s ease-out;
}

@keyframes galleryItemFadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes filterFadeIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.case-images {
    overflow: hidden;
    border-radius: 12px;
    position: relative;
    transition: all 0.3s ease;
}

.case-images img {
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
}

.gallery-item:hover .case-images img {
    transform: scale(1.05);
}

.case-info h4 {
    transition: color 0.3s ease;
}

.gallery-item:hover .case-info h4 {
    color: var(--primary);
}

.case-badge {
    transition: all 0.3s ease;
    will-change: transform;
}

.gallery-item:hover .case-badge {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-grid.enhanced {
    display: flex;
    flex-wrap: wrap;
    margin: -1.25rem;
    margin-bottom: 3rem;
}

@supports (display: grid) {
    .gallery-grid.enhanced {
        display: grid;
        /* Mobile-first: Single column, then responsive */
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin: 0;
        margin-bottom: 3rem;
    }
    
    /* Small mobile: Keep single column for safety */
    @media (min-width: var(--breakpoint-xs)) {
        .gallery-grid.enhanced {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
        }
    }
    
    /* Medium mobile: Two columns if space allows */
    @media (min-width: var(--breakpoint-sm)) {
        .gallery-grid.enhanced {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--space-lg);
        }
    }
    
    /* Tablet: Larger cards */
    @media (min-width: var(--breakpoint-md)) {
        .gallery-grid.enhanced {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
        }
    }
    
    /* Large screens: Safe sizing */
    @media (min-width: var(--breakpoint-xl)) {
        .gallery-grid.enhanced {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
    }
    
    /* Extra large screens: Full size */
    @media (min-width: var(--breakpoint-2xl)) {
        .gallery-grid.enhanced {
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        }
    }
}

.gallery-item {
    background: var(--white);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    position: relative;
}

.gallery-item:hover {
    /* Mobile-first: subtle shadow only */
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.case-images {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.case-images img {
    width: 50%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
    transition: all 0.4s ease;
}

.case-info {
    padding: 1.5rem;
}

.case-info h3 {
    color: var(--secondary);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
}

.case-category {
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.case-description {
    color: var(--text);
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.9;
}

.before-after-slider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 80%;
    background: var(--white);
    border-radius: 2px;
    cursor: ew-resize;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    z-index: 10;
}

.before-after-slider::before {
    content: '↔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary);
    color: var(--white);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-sm);
    font-weight: bold;
}

.view-more-btn {
    display: block;
    margin: 3rem auto 0;
    background: var(--primary);
    color: var(--white);
    padding: 15px 30px;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: var(--text-base);
    min-height: 50px;
}

.view-more-btn:hover {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

/* ===== FORMS & CONTACT ===== */
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
    gap: var(--space-lg);
    text-align: center;
    margin-bottom: 3rem;
}

.contact-card {
    min-height: 60px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    -webkit-tap-highlight-color: transparent;
}

.contact-card a:hover {
    color: var(--primary);
}

.contact-cards {
    display: grid;
    /* Mobile-first: Single column */
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
}

/* Small mobile: Single column for safety */
@media (min-width: var(--breakpoint-xs)) {
    .contact-cards {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }
}

/* Medium mobile and up: Responsive grid */
@media (min-width: var(--breakpoint-sm)) {
    .contact-cards {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: var(--space-lg);
    }
}

.contact-cards .contact-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.3s ease;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.contact-cards .contact-card:hover {
    /* Mobile-first: subtle shadow only */
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.contact-form {
    width: min(100%, 600px);
    margin: 0 auto;
    background: var(--white);
    /* Mobile-first: smaller padding and border radius */
    padding: var(--space-lg);
    border-radius: var(--radius-lg);
    box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

/* Desktop: enhanced styling */
@media (min-width: var(--breakpoint-md)) {
    .contact-form {
        padding: 3rem;
        border-radius: var(--radius-xl);
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
}

.form-group {
    margin-bottom: 2rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary);
    font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: var(--text-base);
    transition: all 0.3s ease;
    background: var(--white);
    color: var(--text);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1);
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

.submit-btn {
    background: var(--primary);
    color: var(--white);
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    min-height: 56px;
}

.submit-btn:hover {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

/* Working Hours */
.hours-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
    margin: 2rem 0;
}

.hours-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    border: 1px solid rgba(190, 176, 147, 0.2);
}

.hours-day {
    font-weight: 600;
    color: var(--secondary);
}

.hours-time {
    color: var(--primary);
    font-weight: 500;
}

/* Emergency Contact */
.emergency-contact {
    background: var(--emergency);
    color: var(--white);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    margin: 2rem 0;
}

.emergency-contact h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.emergency-contact a {
    color: var(--white);
    font-weight: bold;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 10px;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* ===== FAQ SECTION ===== */
.faq {
    padding: 80px 5%;
    background: var(--white);
}

.faq h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.faq-search {
    width: min(100%, 500px);
    margin: 0 auto 3rem;
    position: relative;
}

.faq-search input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e1e5e9;
    border-radius: 25px;
    font-size: var(--text-base);
    transition: all 0.3s ease;
}

.faq-search input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1);
}

.faq-search::before {
    content: '🔍';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
}

.faq-list {
    width: min(100%, 800px);
    margin: 0 auto;
}

.faq-item {
    background: var(--white);
    border: 1px solid #e1e5e9;
    border-radius: 15px;
    margin-bottom: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq-item:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
}

.faq-item.active {
    border-color: var(--primary);
}

.faq-item h3 {
    margin: 0;
    padding: 1.5rem 2rem;
    cursor: pointer;
    background: var(--light);
    transition: all 0.3s ease;
    position: relative;
    font-size: 1.1rem;
    color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
}

.faq-item h3:hover {
    background: rgba(190, 176, 147, 0.1);
}

.faq-item h3::after {
    content: '+';
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    transition: transform 0.3s ease;
}

.faq-item.active h3::after {
    transform: rotate(45deg);
}

.faq-answer {
    padding: 0 2rem 2rem;
    color: var(--text);
    line-height: 1.7;
    display: none;
    animation: slideDown 0.3s ease;
}

.faq-item.active .faq-answer {
    display: block;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== MOBILE INTERACTIONS ===== */

/* Touch Gestures */
.touch-area {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

/* Swipe Indicators */
.swipe-indicator {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    opacity: 0;
    animation: swipeHint 3s ease-in-out infinite;
}

@keyframes swipeHint {
    0%, 90%, 100% { opacity: 0; }
    45% { opacity: 1; }
}

/* Pull-to-refresh */
.pull-refresh {
    position: relative;
    overflow: hidden;
}

.pull-refresh-indicator {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
}

.pull-refresh.pulling .pull-refresh-indicator {
    top: 20px;
}

/* Desktop hover enhancements */
@media (min-width: var(--breakpoint-md)) {
    .service-card:hover {
        /* Desktop: add transform effects */
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    }
    
    .gallery-item:hover {
        /* Desktop: add transform effects */
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .testimonial-card:hover {
        /* Desktop: add transform effects */
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
    
    .contact-cards .contact-card:hover {
        /* Desktop: add transform effects */
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    .testimonial-slide,
    .gallery-item,
    .service-card,
    .testimonial-card {
        transition: none;
        animation: none;
    }
    
    .shimmer::before {
        animation: none;
    }
    
    .swipe-indicator {
        animation: none;
        opacity: 0.7;
    }
}

/* ===== DESKTOP ENHANCEMENTS ===== */
@media (min-width: var(--breakpoint-lg)) {
    .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-lg);
    }
    
    .service-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .testimonial-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    .gallery-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-md);
    }
    
    .gallery-item {
        cursor: zoom-in;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .gallery-item::before {
        content: '🔍';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 102, 204, 0.9);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s ease;
        font-size: 1.2rem;
    }
    
    .gallery-item:hover::before {
        opacity: 1;
    }
    
    .gallery-item:hover {
        transform: scale(1.05);
    }
    
    .contact-info {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* ===== RESPONSIVE BOOKING WIDGET ===== */
/* Mobile-first: Hidden by default, show as inline widget */
.desktop-booking-widget {
    display: none;
}

/* Tablet: Show as floating card */
@media (min-width: var(--breakpoint-md)) and (max-width: var(--breakpoint-lg-max)) {
    .desktop-booking-widget {
        display: block;
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: var(--space-lg) auto;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(190, 176, 147, 0.2);
        border-radius: var(--radius-xl);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        contain: layout style paint;
    }
}

/* Large Desktop: Sticky sidebar widget */
@media (min-width: var(--breakpoint-xl)) {
    .desktop-booking-widget {
        display: block;
        position: sticky;
        top: 20px;
        right: 20px;
        width: 320px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(190, 176, 147, 0.2);
        border-radius: var(--radius-xl);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        z-index: var(--z-sticky);
        margin-left: auto;
        transform: translateZ(0);
        will-change: transform;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        contain: layout style paint;
    }
}

/* Desktop hover enhancement only */
@media (min-width: var(--breakpoint-xl)) {
    .desktop-booking-widget:hover {
        transform: translateY(-5px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
}

.widget-header {
    /* Mobile-first: fluid padding */
    padding: var(--space-lg);
    text-align: center;
    border-bottom: 1px solid rgba(190, 176, 147, 0.1);
}

/* Desktop: larger padding */
@media (min-width: var(--breakpoint-xl)) {
    .widget-header {
        padding: 1.5rem;
    }
}
    
    .widget-header h3 {
        margin: 0 0 0.5rem 0;
        color: var(--secondary);
        font-size: 1.3rem;
        font-weight: 600;
    }
    
    .widget-header p {
        margin: 0 0 1rem 0;
        color: var(--text);
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .widget-trust {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 1rem;
        padding-bottom: 0;
    }
    
    .trust-badge {
        font-size: 0.8rem;
        color: #28a745;
        font-weight: 500;
        background: rgba(40, 167, 69, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        display: inline-block;
    }

.booking-widget-actions {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.booking-widget-actions .cta-button {
    width: 100%;
    text-decoration: none;
}

.booking-widget-actions .cta-button.secondary {
    background-color: #777669;
    color: white;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
}
    
    .widget-footer {
        padding: 1rem 1.5rem;
        background: rgba(190, 176, 147, 0.05);
        border-radius: 0 0 20px 20px;
        text-align: center;
    }
    
    .availability-note {
        margin: 0;
        font-size: 0.85rem;
        color: var(--secondary);
        font-weight: 500;
    }
}

/* RTL Support for Desktop Widget */
[dir="rtl"] .desktop-booking-widget {
    right: auto;
    left: 20px;
    margin-right: auto;
    margin-left: 0;
}

[dir="rtl"] .widget-trust {
    text-align: right;
}

/* ===== BOOKING MODAL SYSTEM ===== */
/* Mobile-first modal design */
.booking-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-md);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.booking-modal[style*="flex"] {
    opacity: 1;
    visibility: visible;
}

.booking-modal-content {
    background: var(--white);
    /* Mobile-first: full width with margin */
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.3s ease;
    position: relative;
}

@keyframes modalSlideIn {
    from {
        transform: scale(0.9) translateY(20px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.booking-modal-header {
    padding: var(--space-lg);
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.booking-modal-header h3 {
    margin: 0;
    color: var(--primary);
    font-size: var(--text-xl);
}

.close-modal {
    background: none;
    border: none;
    font-size: var(--text-2xl);
    color: #999;
    cursor: pointer;
    padding: var(--space-xs);
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
}

.close-modal:hover {
    background: #f5f5f5;
    color: #666;
}

.booking-modal-body {
    padding: var(--space-lg);
}

.booking-description {
    margin-bottom: var(--space-lg);
    color: #666;
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
}

.booking-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.form-progress {
    height: 4px;
    background: #f0f0f0;
    border-radius: 2px;
    margin-bottom: var(--space-md);
    overflow: hidden;
}

.form-progress-bar {
    height: 100%;
    background: var(--primary);
    width: 0%;
    transition: width 0.3s ease;
}

.form-group {
    position: relative;
    margin-bottom: var(--space-md);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid #e0e0e0;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-family: inherit;
    transition: all 0.3s ease;
    background: #fff;
    min-height: 48px;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.2);
}

.form-group label {
    position: absolute;
    top: 50%;
    left: var(--space-md);
    transform: translateY(-50%);
    color: #999;
    font-size: var(--text-sm);
    pointer-events: none;
    transition: all 0.3s ease;
    background: white;
    padding: 0 4px;
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group select:focus + label,
.form-group select:not([value=""]) + label {
    top: 0;
    font-size: var(--text-xs);
    color: var(--primary);
}

.booking-modal-actions {
    margin-top: var(--space-lg);
    text-align: center;
}

.booking-submit-btn {
    background: linear-gradient(135deg, var(--primary), #a89977);
    color: white;
    border: none;
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-lg);
    font-size: var(--text-lg);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    width: 100%;
    min-height: 56px;
}

.booking-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.4);
}

.booking-btn-icon {
    font-size: var(--text-xl);
}

.booking-disclaimer {
    margin-top: var(--space-sm);
    color: #999;
    font-size: var(--text-sm);
    text-align: center;
}

/* Desktop enhancements */
@media (min-width: var(--breakpoint-md)) {
    .booking-modal {
        padding: var(--space-xl);
    }
    
    .booking-modal-content {
        max-height: 80vh;
    }
    
    .booking-submit-btn {
        width: auto;
        min-width: 200px;
    }
}

/* RTL Support */
[dir="rtl"] .close-modal {
    left: var(--space-lg);
    right: auto;
}

[dir="rtl"] .form-group label {
    left: auto;
    right: var(--space-md);
}

[dir="rtl"] .trust-badge {
    text-align: right;
}

/* ===== SERVICE COMPARISON TABLE (DESKTOP) ===== */
@media (min-width: var(--breakpoint-xl)) {
    .services {
        position: relative;
    }
    
    .services-grid {
        display: none;
    }
    
    .services-comparison {
        display: block;
        margin-top: 2rem;
    }
    
    .comparison-table {
        width: 100%;
        border-collapse: collapse;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .comparison-table th,
    .comparison-table td {
        padding: 1.5rem;
        text-align: left;
        border-bottom: 1px solid rgba(190, 176, 147, 0.2);
        vertical-align: middle;
    }
    
    .comparison-table th {
        background: linear-gradient(135deg, var(--primary) 0%, #a89977 100%);
        color: white;
        font-weight: 600;
        font-size: var(--text-base);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .comparison-table tbody tr {
        transition: all 0.3s ease;
        position: relative;
    }
    
    .comparison-table tbody tr:hover {
        background: rgba(190, 176, 147, 0.05);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .service-name {
        font-weight: 600;
        color: var(--secondary);
        font-size: 1.1rem;
    }
    
    .service-description {
        color: var(--text);
        line-height: 1.6;
        max-width: 300px;
    }
    
    .service-duration {
        color: var(--secondary);
        font-weight: 500;
        white-space: nowrap;
    }
    
    .service-price {
        font-weight: 700;
        font-size: 1.2rem;
        color: #28a745;
        white-space: nowrap;
    }
    
    .service-price.popular {
        color: var(--primary);
        position: relative;
    }
    
    .service-price.popular::before {
        content: '⭐ Popular';
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 500;
        white-space: nowrap;
    }
    
    .service-cta {
        text-align: center;
    }
    
    .service-btn {
        background: linear-gradient(135deg, var(--primary) 0%, #a89977 100%);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        min-width: 120px;
        position: relative;
        overflow: hidden;
    }
    
    .service-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
    }
    
    .service-btn:hover::before {
        left: 100%;
    }
    
    .service-btn:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 8px 20px rgba(190, 176, 147, 0.4);
    }
    
    .service-btn.emergency {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    }
    
    .service-btn.emergency:hover {
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }
}

/* RTL Support for Service Table */
[dir="rtl"] .comparison-table th,
[dir="rtl"] .comparison-table td {
    text-align: right;
}

[dir="rtl"] .service-price.popular::before {
    content: 'الأكثر شعبية ⭐';
}

/* Show table on desktop, hide on mobile */
/* Mobile-first: Grid layout by default */
.services-grid {
    display: grid;
}

.services-comparison {
    display: none;
}

/* Large desktop: Show comparison table if available */
@media (min-width: var(--breakpoint-xl)) {
    .services-comparison {
        /* Keep comparison hidden for now - could be enabled later */
        display: none;
    }
}

/* ===== PRINT STYLES ===== */
@media print {
    .gallery-filters,
    .carousel-nav,
    .carousel-indicators,
    .faq-search,
    .submit-btn {
        display: none !important;
    }
    
    .gallery-item,
    .service-card,
    .testimonial-card {
        break-inside: avoid;
        page-break-inside: avoid;
    }
    
    .faq-answer {
        display: block !important;
    }
    
    .contact-form {
        box-shadow: none;
        border: 1px solid #ccc;
    }
}

/* ===== RTL TESTIMONIAL FIXES ===== */
[dir="rtl"] .testimonial-card,
[dir="rtl"] .patient-testimonial {
    text-align: right;
}

[dir="rtl"] .testimonial-card::before {
    left: auto;
    right: 20px;
}

[dir="rtl"] .testimonial-author,
[dir="rtl"] .patient-info,
[dir="rtl"] .testimonial-header {
    flex-direction: row-reverse;
}

[dir="rtl"] .testimonial-rating {
    display: flex;
    flex-direction: row-reverse;
}

[dir="rtl"] .author-info,
[dir="rtl"] .patient-details {
    text-align: right;
}

/* Service Comparison Mobile Styles */
.mobile-comparison {
    display: none;
}

@media (max-width: 768px) {
    .comparison-table-wrapper {
        display: none;
    }
    
    .mobile-comparison {
        display: block;
    }
}

.comparison-tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-btn {
    flex: 1;
    padding: 0.75rem 0.5rem;
    background: #f8f9fa;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease;
    position: relative;
}

.tab-btn:not(:last-child) {
    border-right: 1px solid #e9ecef;
}

.tab-btn.active {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(190, 176, 147, 0.3);
}

.tab-btn:hover:not(.active) {
    background: #e9ecef;
    color: #333;
}

.mobile-comparison-card {
    display: none;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-comparison-card.active {
    display: block;
    transform: translateX(0);
    opacity: 1;
    animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.mobile-card-header {
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 1.5rem;
}

.mobile-card-header.recommended {
    border-bottom-color: var(--primary);
    background: linear-gradient(135deg, rgba(190, 176, 147, 0.1) 0%, rgba(190, 176, 147, 0.05) 100%);
    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-radius: 12px 12px 0 0;
}

.mobile-card-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.5rem 0;
}

.recommended-badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.option-subtitle {
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
}

.mobile-features {
    display: grid;
    gap: 1rem;
}

.mobile-feature {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.mobile-feature:hover {
    background: #e9ecef;
    transform: translateY(-2px);
}

.mobile-feature.highlight {
    background: linear-gradient(135deg, rgba(190, 176, 147, 0.1) 0%, rgba(190, 176, 147, 0.05) 100%);
    border-left: 4px solid var(--primary);
}

.feature-name {
    font-weight: 500;
    color: #333;
}

.feature-value {
    font-weight: 600;
    color: var(--primary);
}

/* Touch-friendly swipe indicators */
.mobile-comparison::after {
    content: '← Swipe to compare →';
    display: block;
    text-align: center;
    color: #999;
    font-size: 0.8rem;
    margin-top: 1rem;
    padding: 0.5rem;
}

/* RTL Support for Mobile Comparison */
[dir="rtl"] .mobile-comparison::after {
    content: '→ اسحب للمقارنة ←';
}

[dir="rtl"] .mobile-feature {
    flex-direction: row-reverse;
}

[dir="rtl"] .mobile-feature.highlight {
    border-left: none;
    border-right: 4px solid var(--primary);
}

[dir="rtl"] .tab-btn:not(:last-child) {
    border-right: none;
    border-left: 1px solid #e9ecef;
}
`;