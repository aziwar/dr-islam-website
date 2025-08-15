// Herrington-Inspired Medical Design System for Dr. Islam Website
// Adapted from Herrington theme's professional business styling for medical/dental use

export const HERRINGTON_MEDICAL_CSS = `
/* ===== HERRINGTON-INSPIRED MEDICAL DESIGN SYSTEM ===== */

/* Medical Color Palette (Adapted from Herrington's Professional Scheme) */
:root {
  /* Primary Medical Colors */
  --medical-primary: #2c5aa0;        /* Professional blue (trust) */
  --medical-secondary: #4a9d5f;      /* Health green */
  --medical-accent: #BEB093;         /* Premium gold - Dr. Islam Brand Color */
  --medical-accent-secondary: #D4C5A3; /* Premium gold highlight - Dr. Islam Brand Color */
  --medical-emergency: #dc3545;      /* Emergency red */
  
  /* Neutral Scale */
  --medical-neutral-50: #f8f9fa;
  --medical-neutral-100: #e9ecef;
  --medical-neutral-200: #dee2e6;
  --medical-neutral-300: #ced4da;
  --medical-neutral-400: #adb5bd;
  --medical-neutral-500: #6c757d;
  --medical-neutral-600: #495057;
  --medical-neutral-700: #343a40;
  --medical-neutral-800: #212529;
  --medical-neutral-900: #121c27;
  
  /* Medical Context Colors */
  --medical-success: #28a745;        /* Healthy/positive */
  --medical-warning: #ffc107;        /* Caution */
  --medical-info: #17a2b8;           /* Information */
  
  /* Typography (Herrington-inspired) */
  --medical-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --medical-font-accent: 'Playfair Display', Georgia, serif;
  
  /* Spacing System */
  --medical-space-xs: 0.25rem;       /* 4px */
  --medical-space-sm: 0.5rem;        /* 8px */
  --medical-space-md: 1rem;          /* 16px */
  --medical-space-lg: 1.5rem;        /* 24px */
  --medical-space-xl: 2rem;          /* 32px */
  --medical-space-2xl: 3rem;         /* 48px */
  --medical-space-3xl: 4rem;         /* 64px */
  
  /* Border Radius */
  --medical-radius-sm: 4px;
  --medical-radius-md: 8px;
  --medical-radius-lg: 12px;
  --medical-radius-xl: 16px;
  --medical-radius-pill: 50px;
  
  /* Shadows */
  --medical-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --medical-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --medical-shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.15);
  --medical-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  /* Transitions */
  --medical-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --medical-transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --medical-transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== MEDICAL SERVICE CARDS (Herrington-inspired) ===== */
.medical-service-card {
  background: white;
  border-radius: var(--medical-radius-lg);
  padding: var(--medical-space-xl);
  box-shadow: var(--medical-shadow-sm);
  transition: all var(--medical-transition-normal);
  border: 1px solid var(--medical-neutral-200);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.medical-service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--medical-primary), var(--medical-secondary));
  transform: translateX(-100%);
  transition: transform var(--medical-transition-normal);
}

.medical-service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--medical-shadow-lg);
  border-color: var(--medical-primary);
}

.medical-service-card:hover::before {
  transform: translateX(0);
}

.service-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--medical-primary), var(--medical-secondary));
  border-radius: var(--medical-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--medical-space-lg);
  color: white;
  font-size: 1.5rem;
  position: relative;
  overflow: hidden;
}

.service-icon::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: rotate(45deg) translateX(-100%);
  transition: transform var(--medical-transition-slow);
}

.medical-service-card:hover .service-icon::after {
  transform: rotate(45deg) translateX(100%);
}

.service-title {
  font-family: var(--medical-font-accent);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--medical-neutral-900);
  margin-bottom: var(--medical-space-sm);
  line-height: 1.3;
}

.service-description {
  color: var(--medical-neutral-600);
  line-height: 1.6;
  margin-bottom: var(--medical-space-lg);
  flex-grow: 1;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--medical-space-xl) 0;
}

.service-features li {
  padding: var(--medical-space-sm) 0;
  padding-left: var(--medical-space-lg);
  position: relative;
  color: var(--medical-neutral-700);
  font-size: 0.9rem;
}

.service-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--medical-secondary);
  font-weight: bold;
  font-size: 1rem;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  background: var(--medical-primary);
  color: white;
  padding: var(--medical-space-sm) var(--medical-space-lg);
  border-radius: var(--medical-radius-pill);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--medical-transition-normal);
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.service-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left var(--medical-transition-normal);
}

.service-cta:hover {
  background: var(--medical-secondary);
  transform: translateY(-2px);
  box-shadow: var(--medical-shadow-md);
}

.service-cta:hover::before {
  left: 100%;
}

/* ===== PATIENT TESTIMONIAL CARDS ===== */
.patient-testimonial {
  background: white;
  border-radius: var(--medical-radius-lg);
  padding: var(--medical-space-xl);
  box-shadow: var(--medical-shadow-sm);
  transition: all var(--medical-transition-normal);
  border-left: 4px solid var(--medical-accent);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.patient-testimonial:hover {
  transform: translateY(-4px);
  box-shadow: var(--medical-shadow-lg);
}

.testimonial-rating {
  display: flex;
  gap: var(--medical-space-xs);
  margin-bottom: var(--medical-space-md);
}

.rating-star {
  color: var(--medical-accent);
  font-size: 1.2rem;
  line-height: 1;
}

.rating-star svg {
    width: 20px;
    height: 20px;
}

.rating-star.empty {
  color: var(--medical-neutral-300);
}

.testimonial-text {
  font-style: italic;
  color: var(--medical-neutral-700);
  line-height: 1.6;
  margin: 0 0 var(--medical-space-lg) 0;
  font-size: 1.05rem;
  flex-grow: 1;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 3rem;
  color: var(--medical-primary);
  position: absolute;
  top: -10px;
  left: -10px;
  opacity: 0.3;
  font-family: serif;
}

.patient-info {
  display: flex;
  align-items: center;
  gap: var(--medical-space-md);
  padding-top: var(--medical-space-md);
  border-top: 1px solid var(--medical-neutral-200);
}

.patient-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--medical-primary);
}

.patient-details {
  flex-grow: 1;
}

.patient-name {
  font-weight: 600;
  color: var(--medical-neutral-900);
  margin: 0;
  font-size: 1rem;
}

.treatment-type {
  color: var(--medical-neutral-600);
  margin: var(--medical-space-xs) 0 0 0;
  font-size: 0.9rem;
}

/* ===== PROFESSIONAL TEAM CARDS ===== */
.team-member-card {
  background: white;
  border-radius: var(--medical-radius-lg);
  overflow: hidden;
  box-shadow: var(--medical-shadow-sm);
  transition: all var(--medical-transition-normal);
  position: relative;
}

.team-member-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--medical-shadow-lg);
}

.team-photo {
  width: 100%;
  height: 280px;
  object-fit: cover;
  position: relative;
}

.team-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%);
  opacity: 0;
  transition: opacity var(--medical-transition-normal);
  display: flex;
  align-items: flex-end;
  padding: var(--medical-space-lg);
}

.team-member-card:hover .team-overlay {
  opacity: 1;
}

.team-social {
  display: flex;
  gap: var(--medical-space-sm);
}

.team-social a {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all var(--medical-transition-normal);
}

.team-social a:hover {
  background: var(--medical-primary);
  transform: translateY(-2px);
}

.team-info {
  padding: var(--medical-space-lg);
  text-align: center;
}

.team-name {
  font-family: var(--medical-font-accent);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--medical-neutral-900);
  margin: 0 0 var(--medical-space-xs) 0;
}

.team-role {
  color: var(--medical-primary);
  font-weight: 500;
  margin: 0 0 var(--medical-space-sm) 0;
  font-size: 0.95rem;
}

.team-credentials {
  color: var(--medical-neutral-600);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .medical-service-card,
  .patient-testimonial,
  .team-member-card {
    margin-bottom: var(--medical-space-lg);
  }
  
  .service-icon {
    width: 56px;
    height: 56px;
  }
  
  .team-photo {
    height: 240px;
  }
  
  .medical-service-card,
  .patient-testimonial {
    padding: var(--medical-space-lg);
  }
}

/* ===== GRID LAYOUTS ===== */
.medical-grid {
  display: grid;
  gap: var(--medical-space-xl);
  margin: var(--medical-space-2xl) 0;
}

.services-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.testimonials-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.team-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

@media (max-width: 768px) {
  .medical-grid {
    grid-template-columns: 1fr;
    gap: var(--medical-space-lg);
    margin: var(--medical-space-xl) 0;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes medical-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes medical-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.fade-in-up {
  animation: medical-fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.pulse-animation {
  animation: medical-pulse 2s ease-in-out infinite;
}

/* ===== INTERSECTION OBSERVER ANIMATIONS ===== */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animations for multiple cards */
.animate-on-scroll:nth-child(1) { transition-delay: 0ms; }
.animate-on-scroll:nth-child(2) { transition-delay: 100ms; }
.animate-on-scroll:nth-child(3) { transition-delay: 200ms; }
.animate-on-scroll:nth-child(4) { transition-delay: 300ms; }
.animate-on-scroll:nth-child(5) { transition-delay: 400ms; }
.animate-on-scroll:nth-child(6) { transition-delay: 500ms; }
`;