// BOOKING-WIDGET-RESPONSIVE.CSS.JS - Device-optimized booking widget
// Mobile-first booking widget with desktop enhancements

export const BOOKING_WIDGET_RESPONSIVE_CSS = `
/* Responsive Booking Widget - Mobile-first with desktop enhancements */
@layer booking-mobile, booking-desktop, booking-animations;

@layer booking-mobile {
  /* Base booking widget - Mobile first */
  .booking-widget {
    container-type: inline-size;
    container-name: booking-widget;
    
    background: var(--white);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid #e5e5e5;
    overflow: hidden;
    
    /* Mobile: Full screen modal approach */
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    
    /* Modern glassmorphism */
    backdrop-filter: blur(20px);
    background: rgb(255 255 255 / 0.98);
    
    /* Hidden by default */
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
    transition: all 0.3s var(--ease-out);
    
    /* Enable scrolling on mobile */
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  
  .booking-widget.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  /* Mobile booking widget header */
  .booking-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    padding: var(--space-lg) var(--space-xl);
    text-align: center;
    position: relative;
  }
  
  .booking-close {
    position: absolute;
    top: var(--space-lg);
    right: var(--space-lg);
    
    background: rgb(255 255 255 / 0.2);
    border: none;
    color: var(--text-inverse);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    transition: var(--transition-fast);
    -webkit-tap-highlight-color: transparent;
  }
  
  .booking-close:hover,
  .booking-close:focus {
    background: rgb(255 255 255 / 0.3);
    outline: 2px solid rgb(255 255 255 / 0.5);
    outline-offset: 2px;
  }
  
  /* RTL close button */
  [dir="rtl"] .booking-close {
    right: auto;
    left: var(--space-lg);
  }
  
  .booking-title {
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    margin-bottom: var(--space-xs);
  }
  
  .booking-subtitle {
    opacity: 0.9;
    font-size: var(--text-sm);
  }
  
  /* Mobile booking form */
  .booking-form {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    min-height: calc(100vh - 120px);
  }
  
  /* Service selection - Mobile stacked layout */
  .service-selection {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: 1fr;
  }
  
  .service-card {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    border: 2px solid #e5e5e5;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-height: 64px;
  }
  
  .service-card:hover,
  .service-card:focus {
    border-color: rgb(var(--primary-rgb) / 0.3);
    background: rgb(var(--primary-rgb) / 0.05);
  }
  
  .service-card.selected {
    border-color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.1);
  }
  
  .service-radio {
    appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
  }
  
  .service-radio:checked {
    border-color: var(--primary);
    background: var(--primary);
  }
  
  .service-radio:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background: var(--white);
    border-radius: 50%;
  }
  
  .service-info {
    flex: 1;
  }
  
  .service-name {
    font-weight: var(--weight-semibold);
    margin-bottom: var(--space-2xs);
    color: var(--text-dark);
  }
  
  .service-duration {
    font-size: var(--text-sm);
    color: var(--text-light);
    margin-bottom: var(--space-xs);
  }
  
  .service-price {
    color: var(--primary);
    font-weight: var(--weight-bold);
    font-size: var(--text-lg);
  }
  
  /* Date and time selection - Mobile optimized */
  .datetime-selection {
    display: grid;
    gap: var(--space-lg);
  }
  
  .date-picker {
    display: grid;
    gap: var(--space-sm);
  }
  
  .date-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-xs);
  }
  
  .date-cell {
    aspect-ratio: 1;
    background: none;
    border: 1px solid #e5e5e5;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-height: 44px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .date-cell:hover:not(.unavailable) {
    border-color: var(--primary);
    background: rgb(var(--primary-rgb) / 0.05);
  }
  
  .date-cell.selected {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--text-inverse);
  }
  
  .date-cell.unavailable {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .date-cell.today {
    border-color: var(--secondary);
    font-weight: var(--weight-semibold);
  }
  
  /* Time slots - Mobile scrollable */
  .time-selection {
    max-height: 200px;
    overflow-y: auto;
    padding: var(--space-xs);
    border: 1px solid #e5e5e5;
    border-radius: var(--radius-lg);
  }
  
  .time-slots {
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .time-slot {
    background: none;
    border: 2px solid #e5e5e5;
    color: var(--text);
    padding: var(--space-sm);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: var(--text-sm);
    transition: var(--transition-fast);
    
    /* Touch-friendly */
    min-height: 48px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .time-slot:hover:not(.unavailable) {
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
  
  /* Patient information form - Mobile optimized */
  .patient-form {
    display: grid;
    gap: var(--space-md);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .form-label {
    font-weight: var(--weight-medium);
    color: var(--text-dark);
    font-size: var(--text-sm);
  }
  
  .form-input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid #e5e5e5;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    background: var(--white);
    
    /* Touch-friendly */
    min-height: 48px;
    
    transition: var(--transition-fast);
    outline: none;
  }
  
  .form-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgb(var(--primary-rgb) / 0.1);
  }
  
  .form-input::placeholder {
    color: var(--text-muted);
  }
  
  /* Mobile form actions */
  .booking-actions {
    padding: var(--space-lg) var(--space-xl);
    border-top: 1px solid #e5e5e5;
    background: var(--white);
    
    /* Sticky to bottom on mobile */
    position: sticky;
    bottom: 0;
    margin-top: auto;
  }
  
  .booking-submit {
    width: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: var(--text-inverse);
    border: none;
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-lg);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    cursor: pointer;
    
    /* Touch-friendly */
    min-height: 56px;
    
    transition: var(--transition-normal);
    box-shadow: var(--shadow-md);
  }
  
  .booking-submit:hover,
  .booking-submit:focus {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    outline: 2px solid rgb(var(--primary-rgb) / 0.3);
    outline-offset: 2px;
  }
  
  .booking-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Loading state */
  .booking-submit.loading {
    position: relative;
    color: transparent;
  }
  
  .booking-submit.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@layer booking-desktop {
  /* Desktop booking widget - Floating modal */
  @container booking-widget (min-width: 600px) {
    .booking-widget {
      /* Desktop: Centered modal */
      position: fixed;
      top: 50%;
      left: 50%;
      width: min(90vw, 800px);
      height: min(85vh, 700px);
      transform: translate(-50%, -50%) scale(0.95);
      
      inset: auto;
      border-radius: var(--radius-2xl);
      overflow: hidden;
    }
    
    .booking-widget.is-open {
      transform: translate(-50%, -50%) scale(1);
    }
    
    .booking-form {
      min-height: auto;
      max-height: calc(85vh - 180px);
      overflow-y: auto;
    }
    
    .booking-actions {
      position: static;
      margin-top: 0;
    }
  }
  
  /* Desktop layout enhancements */
  @container booking-widget (min-width: 700px) {
    .booking-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
      align-items: start;
    }
    
    .service-selection {
      grid-column: 1 / -1;
      grid-template-columns: repeat(2, 1fr);
    }
    
    .datetime-selection {
      grid-column: 1;
    }
    
    .patient-form {
      grid-column: 2;
    }
    
    .booking-actions {
      grid-column: 1 / -1;
    }
  }
  
  /* Large desktop optimizations */
  @container booking-widget (min-width: 900px) {
    .service-selection {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .time-slots {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .date-grid {
      gap: var(--space-sm);
    }
  }
  
  /* Desktop hover effects */
  @media (hover: hover) {
    .service-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .time-slot:hover:not(.unavailable),
    .date-cell:hover:not(.unavailable) {
      transform: translateY(-1px);
    }
    
    .booking-submit:hover {
      background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
    }
  }
  
  /* Desktop keyboard navigation */
  @media (hover: hover) {
    .service-card:focus,
    .time-slot:focus,
    .date-cell:focus {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }
}

@layer booking-animations {
  /* Booking widget backdrop */
  .booking-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.6);
    backdrop-filter: blur(8px);
    z-index: calc(var(--z-modal) - 1);
    
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s var(--ease-out), visibility 0.3s var(--ease-out);
  }
  
  .booking-backdrop.is-open {
    opacity: 1;
    visibility: visible;
  }
  
  /* Step transitions */
  .booking-step {
    opacity: 0;
    transform: translateX(30px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .booking-step.active {
    opacity: 1;
    transform: translateX(0);
  }
  
  .booking-step.previous {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  /* Progress indicator */
  .booking-progress {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-xl);
    border-bottom: 1px solid #e5e5e5;
  }
  
  .progress-step {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #e5e5e5;
    color: var(--text-light);
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    
    transition: var(--transition-fast);
  }
  
  .progress-step.active {
    background: var(--primary);
    color: var(--text-inverse);
  }
  
  .progress-step.completed {
    background: var(--success);
    color: var(--text-inverse);
  }
  
  .progress-line {
    width: 40px;
    height: 2px;
    background: #e5e5e5;
    transition: var(--transition-fast);
  }
  
  .progress-line.active {
    background: var(--primary);
  }
  
  /* Booking confirmation animation */
  .booking-success {
    text-align: center;
    padding: var(--space-3xl);
  }
  
  .success-icon {
    width: 80px;
    height: 80px;
    background: var(--success);
    border-radius: 50%;
    margin: 0 auto var(--space-lg);
    
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-inverse);
    font-size: 2rem;
    
    animation: scaleIn 0.5s ease forwards;
  }
  
  @keyframes scaleIn {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  /* Mobile pull-to-dismiss gesture */
  .booking-widget.drag-active {
    transform: translateY(var(--drag-distance, 0));
    transition: none;
  }
  
  .booking-widget.will-dismiss {
    opacity: 0.7;
  }
}

/* RTL Support */
[dir="rtl"] .booking-form {
  direction: rtl;
}

[dir="rtl"] .service-card {
  flex-direction: row-reverse;
}

[dir="rtl"] .service-info {
  text-align: right;
}

/* Accessibility enhancements */
@media (prefers-reduced-motion: reduce) {
  .booking-widget,
  .booking-backdrop,
  .booking-step,
  .service-card,
  .time-slot,
  .date-cell {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .service-card,
  .time-slot,
  .date-cell,
  .form-input {
    border-width: 3px;
  }
  
  .booking-submit:focus {
    outline-width: 4px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .booking-widget {
    background: rgb(30 30 30 / 0.98);
    border-color: rgb(64 64 64 / 0.3);
  }
  
  .booking-actions {
    background: rgb(30 30 30);
    border-color: rgb(64 64 64 / 0.3);
  }
}

/* Print styles */
@media print {
  .booking-widget {
    position: static !important;
    transform: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  
  .booking-close,
  .booking-backdrop {
    display: none !important;
  }
}
`;

// Auto-inject booking widget responsive CSS
if (typeof document !== 'undefined') {
  const loadBookingWidgetCSS = () => {
    if (document.getElementById('booking-widget-responsive-css')) return;
    
    const style = document.createElement('style');
    style.id = 'booking-widget-responsive-css';
    style.innerHTML = BOOKING_WIDGET_RESPONSIVE_CSS;
    document.head.appendChild(style);
  };
  
  // Load after components CSS
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadBookingWidgetCSS, 125));
  } else {
    setTimeout(loadBookingWidgetCSS, 125);
  }
}