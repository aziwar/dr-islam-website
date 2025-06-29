// src/content/logo.js
export const LOGO_SVG = `<svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#BEB093;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#777669;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Dental implant icon -->
  <circle cx="30" cy="20" r="8" fill="url(#logoGrad)" />
  <rect x="26" y="20" width="8" height="20" fill="url(#logoGrad)" />
  <path d="M22 38 L30 45 L38 38" stroke="url(#logoGrad)" stroke-width="2" fill="none" />
  
  <!-- Text -->
  <text x="50" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#777669">
    Dr. Islam Elsagher
  </text>
  
  <!-- Tagline -->
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="12" fill="#BEB093">
    General Dentist & Implantologist
  </text>
</svg>`;