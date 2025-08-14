// ENHANCEMENTS.CSS.JS - Animations and effects (≤8KB)
// Modern animations, transitions, and visual effects for progressive enhancement

export const ENHANCEMENTS_CSS = `
/* Continue CSS Layers from other stylesheets */
@layer animations, transitions, effects, scroll-driven, view-transitions;

/* Animations - Modern keyframe animations */
@layer animations {
  /* Fade animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes fadeInDown {
    from { 
      opacity: 0; 
      transform: translateY(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  /* Scale animations */
  @keyframes scaleIn {
    from { 
      opacity: 0; 
      transform: scale(0.9); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  @keyframes scaleOut {
    from { 
      opacity: 1; 
      transform: scale(1); 
    }
    to { 
      opacity: 0; 
      transform: scale(0.9); 
    }
  }
  
  /* Slide animations - Using logical properties */
  @keyframes slideInFromStart {
    from { 
      opacity: 0; 
      transform: translateX(-100%); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slideInFromEnd {
    from { 
      opacity: 0; 
      transform: translateX(100%); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  /* RTL-aware slide animations */
  [dir="rtl"] @keyframes slideInFromStart {
    from { 
      opacity: 0; 
      transform: translateX(100%); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  [dir="rtl"] @keyframes slideInFromEnd {
    from { 
      opacity: 0; 
      transform: translateX(-100%); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  /* Bounce animations */
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
  
  /* Pulse animations */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
  
  @keyframes pulseRing {
    0% {
      transform: scale(0.33);
      opacity: 1;
    }
    80%, 100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
  
  /* Rotation animations */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Shimmer effect for loading states */
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  /* Typewriter effect */
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blinkCursor {
    from, to { border-color: transparent; }
    50% { border-color: var(--primary); }
  }
  
  /* Progress bar animation */
  @keyframes progressFill {
    from { width: 0%; }
    to { width: var(--progress-width, 100%); }
  }
  
  /* Gradient shift (for hero background) */
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  /* Floating animation */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  /* Wiggle animation */
  @keyframes wiggle {
    0%, 7%, 14%, 21%, 28%, 35%, 42%, 49%, 56%, 63%, 70%, 77%, 84%, 91%, 98%, 100% {
      transform: rotate(0deg);
    }
    3.5%, 10.5%, 17.5%, 24.5%, 31.5%, 38.5%, 45.5%, 52.5%, 59.5%, 66.5%, 73.5%, 80.5%, 87.5%, 94.5% {
      transform: rotate(-3deg);
    }
    7%, 14%, 21%, 28%, 35%, 42%, 49%, 56%, 63%, 70%, 77%, 84%, 91%, 98% {
      transform: rotate(3deg);
    }
  }
}

/* Transitions - Smooth interactive transitions */
@layer transitions {
  /* Enhanced transition classes */
  .transition-none { transition: none; }
  .transition-all { transition: all var(--transition-normal); }
  .transition-fast { transition: all var(--transition-fast); }
  .transition-slow { transition: all var(--transition-slow); }
  
  /* Specific property transitions */
  .transition-colors {
    transition: color var(--transition-normal), background-color var(--transition-normal), border-color var(--transition-normal);
  }
  
  .transition-opacity { transition: opacity var(--transition-normal); }
  .transition-shadow { transition: box-shadow var(--transition-normal); }
  .transition-transform { transition: transform var(--transition-normal); }
  
  /* Transform utilities */
  .scale-95 { transform: scale(0.95); }
  .scale-100 { transform: scale(1); }
  .scale-105 { transform: scale(1.05); }
  .scale-110 { transform: scale(1.1); }
  
  .rotate-0 { transform: rotate(0deg); }
  .rotate-45 { transform: rotate(45deg); }
  .rotate-90 { transform: rotate(90deg); }
  .rotate-180 { transform: rotate(180deg); }
  
  .translate-x-0 { transform: translateX(0); }
  .translate-y-0 { transform: translateY(0); }
  .-translate-y-1 { transform: translateY(-0.25rem); }
  .-translate-y-2 { transform: translateY(-0.5rem); }
  .translate-y-1 { transform: translateY(0.25rem); }
  .translate-y-2 { transform: translateY(0.5rem); }
  
  /* Hover transform effects (only on devices with hover) */
  @media (hover: hover) {
    .hover\:scale-105:hover { transform: scale(1.05); }
    .hover\:scale-110:hover { transform: scale(1.1); }
    .hover\:-translate-y-1:hover { transform: translateY(-0.25rem); }
    .hover\:-translate-y-2:hover { transform: translateY(-0.5rem); }
    .hover\:rotate-3:hover { transform: rotate(3deg); }
    .hover\:-rotate-3:hover { transform: rotate(-3deg); }
  }
  
  /* Focus transform effects */
  .focus\:scale-105:focus { transform: scale(1.05); }
  .focus\:scale-110:focus { transform: scale(1.1); }
  
  /* Group hover effects */
  .group:hover .group-hover\:scale-105 { transform: scale(1.05); }
  .group:hover .group-hover\:opacity-100 { opacity: 1; }
  .group:hover .group-hover\:opacity-0 { opacity: 0; }
}

/* Effects - Visual effects and enhancements */
@layer effects {
  /* Blur effects */
  .blur-none { filter: blur(0); }
  .blur-sm { filter: blur(4px); }
  .blur-md { filter: blur(8px); }
  .blur-lg { filter: blur(16px); }
  .blur-xl { filter: blur(24px); }
  
  .backdrop-blur-none { backdrop-filter: blur(0); }
  .backdrop-blur-sm { backdrop-filter: blur(4px); }
  .backdrop-blur-md { backdrop-filter: blur(8px); }
  .backdrop-blur-lg { backdrop-filter: blur(16px); }
  .backdrop-blur-xl { backdrop-filter: blur(24px); }
  
  /* Glassmorphism effects */
  .glass {
    background: rgb(255 255 255 / 0.25);
    backdrop-filter: blur(10px) saturate(180%);
    border: 1px solid rgb(255 255 255 / 0.18);
  }
  
  .glass-dark {
    background: rgb(0 0 0 / 0.25);
    backdrop-filter: blur(10px) saturate(180%);
    border: 1px solid rgb(255 255 255 / 0.18);
  }
  
  .glass-strong {
    background: rgb(255 255 255 / 0.4);
    backdrop-filter: blur(20px) saturate(200%);
    border: 1px solid rgb(255 255 255 / 0.3);
  }
  
  /* Gradient effects */
  .gradient-primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  }
  
  .gradient-secondary {
    background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
  }
  
  .gradient-radial {
    background: radial-gradient(circle at center, var(--primary) 0%, var(--primary-dark) 100%);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }
  
  /* Shadow effects */
  .shadow-colored {
    box-shadow: 0 10px 25px rgb(var(--primary-rgb) / 0.3);
  }
  
  .shadow-glow {
    box-shadow: 0 0 20px rgb(var(--primary-rgb) / 0.4);
  }
  
  .shadow-inner-light {
    box-shadow: inset 0 2px 4px rgb(255 255 255 / 0.1);
  }
  
  /* Loading states */
  .loading {
    position: relative;
    overflow: hidden;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgb(255 255 255 / 0.4) 50%, 
      transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  .skeleton {
    background: linear-gradient(90deg, 
      #f0f0f0 0%, 
      #e0e0e0 50%, 
      #f0f0f0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  /* Pulse effects */
  .pulse-ring {
    position: relative;
  }
  
  .pulse-ring::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 3px solid var(--primary);
    border-radius: inherit;
    opacity: 0.8;
    animation: pulseRing 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  
  /* Typewriter effect */
  .typewriter {
    overflow: hidden;
    border-right: 2px solid var(--primary);
    white-space: nowrap;
    animation: 
      typewriter 3s steps(40, end),
      blinkCursor 500ms steps(40, end) infinite;
  }
  
  /* Progress effects */
  .progress-bar {
    position: relative;
    overflow: hidden;
    background: #f0f0f0;
    border-radius: 10px;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    border-radius: inherit;
    animation: progressFill 2s ease-in-out forwards;
    position: relative;
  }
  
  .progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgb(255 255 255 / 0.3) 50%, 
      transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  /* Morphing effects */
  .morph {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation: morph 8s ease-in-out infinite;
  }
  
  @keyframes morph {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  }
  
  /* Particle effect */
  .particle-bg {
    position: relative;
    overflow: hidden;
  }
  
  .particle-bg::before,
  .particle-bg::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgb(var(--primary-rgb) / 0.1);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  .particle-bg::before {
    top: 20%;
    left: 20%;
    animation-delay: -2s;
  }
  
  .particle-bg::after {
    top: 60%;
    right: 20%;
    animation-delay: -4s;
  }
}

/* Scroll-Driven Animations - Modern scroll-based effects */
@layer scroll-driven {
  /* Intersection Observer animations */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.in-view {
    opacity: 1;
    transform: translateY(0);
  }
  
  .animate-on-scroll.slide-left {
    transform: translateX(-30px);
  }
  
  .animate-on-scroll.slide-left.in-view {
    transform: translateX(0);
  }
  
  .animate-on-scroll.slide-right {
    transform: translateX(30px);
  }
  
  .animate-on-scroll.slide-right.in-view {
    transform: translateX(0);
  }
  
  .animate-on-scroll.scale {
    transform: scale(0.8);
  }
  
  .animate-on-scroll.scale.in-view {
    transform: scale(1);
  }
  
  /* Staggered animations */
  .stagger-delay-1 { transition-delay: 0.1s; }
  .stagger-delay-2 { transition-delay: 0.2s; }
  .stagger-delay-3 { transition-delay: 0.3s; }
  .stagger-delay-4 { transition-delay: 0.4s; }
  .stagger-delay-5 { transition-delay: 0.5s; }
  
  /* Parallax effects */
  .parallax {
    transform: translateZ(0);
    will-change: transform;
  }
  
  .parallax-slow {
    transform: translate3d(0, 0, 0);
  }
  
  /* Sticky reveal effects */
  .sticky-reveal {
    position: sticky;
    top: 0;
    background: rgb(255 255 255 / 0.95);
    backdrop-filter: blur(10px);
    transition: background-color 0.3s ease;
  }
  
  .sticky-reveal.scrolled {
    background: rgb(255 255 255 / 0.98);
    box-shadow: var(--shadow-sm);
  }
}

/* View Transitions - Modern page transitions */
@layer view-transitions {
  /* View transition names */
  .page-transition {
    view-transition-name: page-content;
  }
  
  .header-transition {
    view-transition-name: main-header;
  }
  
  .hero-transition {
    view-transition-name: hero-section;
  }
  
  /* Custom view transition animations */
  ::view-transition-old(page-content) {
    animation: slideOutToLeft 0.3s ease-in forwards;
  }
  
  ::view-transition-new(page-content) {
    animation: slideInFromRight 0.3s ease-out forwards;
  }
  
  @keyframes slideOutToLeft {
    to { transform: translateX(-100%); }
  }
  
  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  /* Fade transition */
  ::view-transition-old(fade) {
    animation: fadeOut 0.2s ease-in forwards;
  }
  
  ::view-transition-new(fade) {
    animation: fadeIn 0.2s ease-out forwards;
  }
}

/* Animation utility classes */
.animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
.animate-fadeOut { animation: fadeOut 0.5s ease forwards; }
.animate-fadeInUp { animation: fadeInUp 0.6s ease forwards; }
.animate-fadeInDown { animation: fadeInDown 0.6s ease forwards; }
.animate-scaleIn { animation: scaleIn 0.3s ease forwards; }
.animate-scaleOut { animation: scaleOut 0.3s ease forwards; }
.animate-slideInFromStart { animation: slideInFromStart 0.5s ease forwards; }
.animate-slideInFromEnd { animation: slideInFromEnd 0.5s ease forwards; }
.animate-bounce { animation: bounce 2s infinite; }
.animate-pulse { animation: pulse 2s infinite; }
.animate-spin { animation: spin 1s linear infinite; }
.animate-spinSlow { animation: spinSlow 3s linear infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-wiggle { animation: wiggle 1s ease-in-out; }

/* Animation timing utilities */
.animation-delay-75 { animation-delay: 75ms; }
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-150 { animation-delay: 150ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-500 { animation-delay: 500ms; }
.animation-delay-700 { animation-delay: 700ms; }
.animation-delay-1000 { animation-delay: 1000ms; }

/* Animation duration utilities */
.animation-fast { animation-duration: 150ms; }
.animation-normal { animation-duration: 300ms; }
.animation-slow { animation-duration: 500ms; }
.animation-slower { animation-duration: 750ms; }
.animation-slowest { animation-duration: 1000ms; }

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-fadeIn,
  .animate-fadeOut,
  .animate-fadeInUp,
  .animate-fadeInDown,
  .animate-scaleIn,
  .animate-scaleOut,
  .animate-slideInFromStart,
  .animate-slideInFromEnd,
  .animate-bounce,
  .animate-pulse,
  .animate-spin,
  .animate-spinSlow,
  .animate-float,
  .animate-wiggle,
  .typewriter,
  .loading,
  .skeleton {
    animation: none !important;
  }
  
  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  
  .transition-all,
  .transition-fast,
  .transition-slow,
  .transition-colors,
  .transition-opacity,
  .transition-shadow,
  .transition-transform {
    transition: none !important;
  }
}

/* Performance optimizations */
.animate-fadeIn,
.animate-fadeOut,
.animate-fadeInUp,
.animate-fadeInDown,
.animate-scaleIn,
.animate-scaleOut,
.animate-slideInFromStart,
.animate-slideInFromEnd,
.animate-bounce,
.animate-pulse,
.animate-float {
  will-change: transform, opacity;
}

.animate-spin,
.animate-spinSlow {
  will-change: transform;
}

.loading,
.skeleton,
.progress-fill {
  will-change: background-position, width;
}

/* Reset will-change after animation */
.animation-finished {
  will-change: auto;
}

/* Dark mode animation adjustments */
@media (prefers-color-scheme: dark) {
  .skeleton {
    background: linear-gradient(90deg, 
      #2a2a2a 0%, 
      #3a3a3a 50%, 
      #2a2a2a 100%);
  }
  
  .glass {
    background: rgb(0 0 0 / 0.3);
    border: 1px solid rgb(255 255 255 / 0.1);
  }
  
  .glass-strong {
    background: rgb(0 0 0 / 0.5);
    border: 1px solid rgb(255 255 255 / 0.2);
  }
}

/* High performance mode for low-end devices */
@media (max-width: 768px) and (prefers-reduced-motion: no-preference) {
  .animate-bounce,
  .animate-float,
  .animate-wiggle,
  .morph,
  .particle-bg::before,
  .particle-bg::after {
    animation-duration: 2s; /* Reduce animation duration */
  }
  
  .backdrop-blur-lg,
  .backdrop-blur-xl,
  .glass-strong {
    backdrop-filter: blur(8px); /* Reduce blur intensity */
  }
}
`;

// Auto-inject enhancements CSS (loaded last for progressive enhancement)
if (typeof document !== 'undefined') {
  const loadEnhancementsCSS = () => {
    if (document.getElementById('enhancements-css')) return;
    
    const style = document.createElement('style');
    style.id = 'enhancements-css';
    style.innerHTML = ENHANCEMENTS_CSS;
    document.head.appendChild(style);
  };
  
  // Load after all other CSS files
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadEnhancementsCSS, 200));
  } else {
    setTimeout(loadEnhancementsCSS, 200);
  }
  
  // Initialize scroll-driven animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 250);
  }
}