// COMPONENTS.CSS.JS - Interactive elements and forms (≤18KB)
// Modern component styling with container queries and CSS layers

export const COMPONENTS_CSS = `
/* Continue CSS Layers from critical.css.js and layout.css.js */
@layer form-components, interactive-elements, modal-components, widget-components;

/* Form Components - Modern form styling */
@layer form-components {
  /* Form containers */
  .form-container {
    container-type: inline-size;
    container-name: form;
    
    background: var(--white);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    box-shadow: var(--shadow-md);
    border: 1px solid #e5e5e5;
    
    /* Modern glassmorphism */
    backdrop-filter: blur(10px);
    background: rgb(255 255 255 / 0.95);
  }
  
  /* Form field groups */
  .field-group {
    margin-block-end: var(--space-lg);
    position: relative;
  }
  
  .field-group.half-width {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }
  
  @container form (min-width: 500px) {
    .field-group.half-width {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  /* Form labels */
  .form-label {
    display: block;
    font-weight: var(--weight-medium);
    color: var(--text-dark);
    margin-block-end: var(--space-xs);
    font-size: var(--text-sm);
    
    /* Required indicator */
    position: relative;
  }
  
  .form-label.required::after {
    content: '*';
    color: var(--error);
    margin-inline-start: var(--space-2xs);
    font-weight: var(--weight-bold);
  }
  
  /* RTL form labels */
  [dir="rtl"] .form-label {
    text-align: right;
    font-family: 'IBM Plex Sans Arabic', 'Cairo', sans-serif;
  }
  
  /* Form inputs */
  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid #e5e5e5;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-family: inherit;
    background: var(--white);
    
    /* Modern focus states */
    transition: var(--transition-normal);
    outline: none;
    
    /* Touch-friendly sizing */
    min-block-size: 48px;
    
    /* Container query responsive */
    container-type: inline-size;
  }
  
  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgb(var(--primary-rgb) / 0.1);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  .form-input:invalid:not(:placeholder-shown) {
    border-color: var(--error);
    box-shadow: 0 0 0 4px rgb(var(--error-rgb) / 0.1);
  }
  
  .form-input::placeholder {
    color: var(--text-muted);
    opacity: 1;
  }
  
  /* Modern textarea */
  .form-textarea {
    min-block-size: 120px;
    resize: vertical;
    font-family: inherit;
    line-height: var(--leading-relaxed);
  }
  
  /* Custom select styling */
  .form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-inline-end: 40px;
    cursor: pointer;
    appearance: none;
  }
  
  [dir="rtl"] .form-select {
    background-position: left 12px center;
    padding-inline-start: 40px;
    padding-inline-end: var(--space-md);
  }
  
  /* Error states */
  .field-error {
    color: var(--error);
    font-size: var(--text-sm);
    margin-block-start: var(--space-xs);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .field-error::before {
    content: '⚠';
    font-weight: var(--weight-bold);
  }
  
  /* Success states */
  .field-success {
    color: var(--success);
    font-size: var(--text-sm);
    margin-block-start: var(--space-xs);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .field-success::before {
    content: '✓';
    font-weight: var(--weight-bold);
  }
  
  /* Checkbox and Radio */
  .form-checkbox,
  .form-radio {
    appearance: none;
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid #d1d5db;
    background: var(--white);
    cursor: pointer;
    position: relative;
    
    /* Touch-friendly */
    min-block-size: 24px;
    min-inline-size: 24px;
  }
  
  .form-checkbox {
    border-radius: var(--radius-sm);
  }
  
  .form-radio {
    border-radius: 50%;
  }
  
  .form-checkbox:checked,
  .form-radio:checked {
    background: var(--primary);
    border-color: var(--primary);
  }
  
  .form-checkbox:checked::after {
    content: '✓';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-weight: var(--weight-bold);
    font-size: 14px;
  }
  
  .form-radio:checked::after {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    inline-size: 8px;
    block-size: 8px;
    background: var(--white);
    border-radius: 50%;
  }
  
  /* Checkbox/Radio labels */
  .checkbox-label,
  .radio-label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    cursor: pointer;
    padding: var(--space-xs);
    border-radius: var(--radius-md);
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-block-size: 44px;
  }
  
  .checkbox-label:hover,
  .radio-label:hover {
    background: rgb(var(--primary-rgb) / 0.05);
  }
  
  /* RTL form controls */
  [dir="rtl"] .checkbox-label,
  [dir="rtl"] .radio-label {
    flex-direction: row-reverse;
  }
}

/* Interactive Elements - Buttons, links, interactive components */
@layer interactive-elements {
  /* Primary button */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    text-decoration: none;
    font-weight: var(--weight-semibold);
    font-size: var(--text-base);
    
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-lg);
    border: none;
    cursor: pointer;
    
    /* Touch-friendly */
    min-block-size: 48px;
    min-inline-size: 120px;
    
    /* Modern effects */
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
    
    /* Performance optimizations */
    will-change: transform, box-shadow;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  .btn-primary:hover,
  .btn-primary:focus {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  }
  
  .btn-primary:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  
  /* Secondary button */
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    
    background: var(--white);
    color: var(--primary);
    text-decoration: none;
    font-weight: var(--weight-medium);
    font-size: var(--text-base);
    
    padding: var(--space-sm) var(--space-lg);
    border: 2px solid var(--primary);
    border-radius: var(--radius-lg);
    cursor: pointer;
    
    /* Touch-friendly */
    min-block-size: 48px;
    min-inline-size: 120px;
    
    transition: var(--transition-normal);
  }
  
  .btn-secondary:hover,
  .btn-secondary:focus {
    background: var(--primary);
    color: var(--text-inverse);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  /* Loading states */
  .btn-loading {
    position: relative;
    color: transparent;
    pointer-events: none;
  }
  
  .btn-loading::after {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: 20px;
    block-size: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-block-start: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Service cards */
  .service-card {
    background: var(--white);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid #f3f4f6;
    
    transition: var(--transition-normal);
    container-type: inline-size;
    container-name: service-card;
    
    /* Performance */
    will-change: transform, box-shadow;
    transform: translateZ(0);
  }
  
  /* Desktop hover effects */
  @media (hover: hover) {
    .service-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: rgb(var(--primary-rgb) / 0.2);
    }
  }
  
  .service-card-icon {
    inline-size: 48px;
    block-size: 48px;
    background: rgb(var(--primary-rgb) / 0.1);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-end: var(--space-md);
    font-size: 24px;
    color: var(--primary);
  }
  
  .service-card-title {
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--text-dark);
    margin-block-end: var(--space-sm);
  }
  
  .service-card-description {
    color: var(--text-light);
    line-height: var(--leading-relaxed);
    margin-block-end: var(--space-md);
  }
  
  .service-card-price {
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    color: var(--primary);
  }
  
  /* Gallery component */
  .gallery-item {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: #f8fafc;
    aspect-ratio: 1;
    
    container-type: inline-size;
    container-name: gallery-item;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-normal);
  }
  
  /* Desktop gallery effects */
  @media (hover: hover) {
    .gallery-item:hover .gallery-image {
      transform: scale(1.05);
    }
    
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
  }
  
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgb(var(--primary-rgb) / 0.8) 0%, rgb(var(--secondary-rgb) / 0.8) 100%);
    opacity: 0;
    transition: var(--transition-normal);
    
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-inverse);
    font-weight: var(--weight-semibold);
  }
  
  /* Stats component */
  .stats-item {
    text-align: center;
    padding: var(--space-lg);
    
    container-type: inline-size;
    container-name: stats-item;
  }
  
  .stats-number {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: var(--weight-bold);
    color: var(--primary);
    margin-block-end: var(--space-xs);
    font-feature-settings: 'tnum';
  }
  
  .stats-label {
    color: var(--text-light);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: var(--text-sm);
  }
  
  /* Testimonial component */
  .testimonial-card {
    background: var(--white);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid #f3f4f6;
    position: relative;
    
    container-type: inline-size;
    container-name: testimonial;
  }
  
  .testimonial-content {
    font-style: italic;
    color: var(--text);
    line-height: var(--leading-relaxed);
    margin-block-end: var(--space-lg);
    position: relative;
  }
  
  .testimonial-content::before {
    content: '"';
    position: absolute;
    inset-block-start: -10px;
    inset-inline-start: -10px;
    font-size: 3rem;
    color: rgb(var(--primary-rgb) / 0.2);
    font-family: Georgia, serif;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .testimonial-avatar {
    inline-size: 48px;
    block-size: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #f3f4f6;
  }
  
  .testimonial-info h4 {
    font-weight: var(--weight-semibold);
    color: var(--text-dark);
    margin-block-end: var(--space-2xs);
  }
  
  .testimonial-title {
    color: var(--text-light);
    font-size: var(--text-sm);
  }
  
  /* RTL testimonials */
  [dir="rtl"] .testimonial-content {
    font-family: 'IBM Plex Sans Arabic', 'Cairo', sans-serif;
  }
  
  [dir="rtl"] .testimonial-content::before {
    content: '"';
    inset-inline-start: auto;
    inset-inline-end: -10px;
  }
}

/* Modal Components - Modern modal system */
@layer modal-components {
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.6);
    backdrop-filter: blur(8px);
    z-index: var(--z-modal);
    
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s var(--ease-out), visibility 0.3s var(--ease-out);
    
    /* Prevent body scroll */
    overscroll-behavior: contain;
  }
  
  .modal-backdrop.is-open {
    opacity: 1;
    visibility: visible;
  }
  
  .modal-container {
    position: fixed;
    inset: 0;
    z-index: calc(var(--z-modal) + 1);
    
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-md);
    
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  
  .modal-content {
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
    border: 1px solid rgb(255 255 255 / 0.2);
    
    max-inline-size: min(600px, calc(100vw - 32px));
    max-block-size: calc(100vh - 32px);
    
    position: relative;
    
    /* Modern glassmorphism */
    backdrop-filter: blur(20px);
    background: rgb(255 255 255 / 0.95);
    
    /* Animation */
    transform: scale(0.95) translateY(20px);
    opacity: 0;
    transition: transform 0.3s var(--ease-out), opacity 0.3s var(--ease-out);
    
    container-type: inline-size;
    container-name: modal;
  }
  
  .modal-backdrop.is-open .modal-content {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-lg) var(--space-xl);
    border-block-end: 1px solid #e5e5e5;
  }
  
  .modal-title {
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--text-dark);
  }
  
  .modal-close {
    background: none;
    border: none;
    inline-size: 32px;
    block-size: 32px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    cursor: pointer;
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-block-size: 44px;
    min-inline-size: 44px;
  }
  
  .modal-close:hover,
  .modal-close:focus {
    background: rgb(var(--primary-rgb) / 0.1);
    color: var(--primary);
    outline: 2px solid rgb(var(--primary-rgb) / 0.2);
    outline-offset: 2px;
  }
  
  .modal-body {
    padding: var(--space-xl);
    overflow-y: auto;
    max-block-size: calc(80vh - 120px);
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-md);
    padding: var(--space-lg) var(--space-xl);
    border-block-start: 1px solid #e5e5e5;
  }
  
  @container modal (max-width: 400px) {
    .modal-footer {
      flex-direction: column;
    }
    
    .modal-footer .btn-primary,
    .modal-footer .btn-secondary {
      inline-size: 100%;
    }
  }
}

/* Widget Components - Booking widget and interactive widgets */
@layer widget-components {
  .booking-widget {
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid #e5e5e5;
    overflow: hidden;
    
    container-type: inline-size;
    container-name: booking-widget;
    
    /* Modern glassmorphism */
    backdrop-filter: blur(15px);
    background: rgb(255 255 255 / 0.98);
  }
  
  .widget-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    padding: var(--space-lg) var(--space-xl);
    text-align: center;
  }
  
  .widget-title {
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    margin-block-end: var(--space-xs);
  }
  
  .widget-subtitle {
    opacity: 0.9;
    font-size: var(--text-sm);
  }
  
  .widget-body {
    padding: var(--space-xl);
  }
  
  .widget-section {
    margin-block-end: var(--space-lg);
  }
  
  .widget-section:last-child {
    margin-block-end: 0;
  }
  
  .service-selector {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }
  
  @container booking-widget (min-width: 400px) {
    .service-selector {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .service-option {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    border: 2px solid #e5e5e5;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-block-size: 48px;
  }
  
  .service-option:hover {
    border-color: rgb(var(--primary-rgb) / 0.3);
    background: rgb(var(--primary-rgb) / 0.05);
  }
  
  .service-option.selected {
    border-color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.1);
  }
  
  .service-option input[type="radio"] {
    appearance: none;
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }
  
  .service-option input[type="radio"]:checked {
    border-color: var(--primary);
    background: var(--primary);
  }
  
  .service-option input[type="radio"]:checked::after {
    content: '';
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    transform: translate(-50%, -50%);
    inline-size: 8px;
    block-size: 8px;
    background: var(--white);
    border-radius: 50%;
  }
  
  .service-info {
    flex: 1;
  }
  
  .service-name {
    font-weight: var(--weight-medium);
    margin-block-end: var(--space-2xs);
  }
  
  .service-price {
    color: var(--primary);
    font-weight: var(--weight-semibold);
    font-size: var(--text-sm);
  }
  
  /* Time slots */
  .time-slots {
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
  
  .time-slot {
    background: none;
    border: 2px solid #e5e5e5;
    color: var(--text);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-block-size: 44px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .time-slot:hover {
    border-color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.05);
  }
  
  .time-slot.selected {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--text-inverse);
  }
  
  .time-slot.unavailable {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* RTL widget support */
  [dir="rtl"] .widget-header {
    text-align: center;
  }
  
  [dir="rtl"] .service-option {
    flex-direction: row-reverse;
  }
  
  [dir="rtl"] .service-info {
    text-align: right;
  }
}

/* Accessibility Enhancements */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .gallery-image,
  .modal-content,
  .btn-primary,
  .btn-secondary {
    transition-duration: 0.01ms !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .form-input,
  .form-select,
  .form-textarea {
    border-width: 3px;
  }
  
  .btn-primary,
  .btn-secondary {
    border-width: 3px;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .form-container,
  .service-card,
  .testimonial-card,
  .modal-content,
  .booking-widget {
    background: rgb(30 30 30 / 0.95);
    border-color: rgb(64 64 64 / 0.3);
  }
}

/* Performance Optimizations */
.service-card,
.gallery-item,
.modal-content,
.booking-widget {
  contain: layout style;
}
`;

// Auto-inject components CSS (loaded after layout CSS)
if (typeof document !== 'undefined') {
  const loadComponentsCSS = () => {
    if (document.getElementById('components-css')) return;
    
    const style = document.createElement('style');
    style.id = 'components-css';
    style.innerHTML = COMPONENTS_CSS;
    document.head.appendChild(style);
  };
  
  // Load after layout CSS
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadComponentsCSS, 100));
  } else {
    setTimeout(loadComponentsCSS, 100);
  }
}