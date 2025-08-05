// Professional Dental Logo Component for Dr. Islam Elsagher
export const DentalLogo = {
  // SVG Logo with Tooth Icon
  svg: `<svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Tooth Icon -->
    <g transform="translate(8, 6)">
      <path d="M14 2C17.314 2 20 4.686 20 8c0 2.5-1.2 4.8-3 6.5v9c0 3.314-2.686 6-6 6H7c-3.314 0-6-2.686-6-6v-9C-1.2 12.8-2.5 10.5-2.5 8c0-3.314 2.686-6 6-6h10.5z" 
            fill="currentColor" 
            stroke="none"/>
      <circle cx="8" cy="10" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="16" cy="10" r="1.5" fill="white" opacity="0.9"/>
      <path d="M6 16c2 2 4 2 6 2s4 0 6-2" stroke="white" stroke-width="1.5" fill="none" opacity="0.9"/>
    </g>
    
    <!-- Text -->
    <text x="38" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="currentColor">
      د. اسلام الصغير
    </text>
    <text x="38" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="400" fill="currentColor" opacity="0.8">
      طبيب أسنان
    </text>
  </svg>`,

  // English Version
  svgEn: `<svg width="140" height="40" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Tooth Icon -->
    <g transform="translate(8, 6)">
      <path d="M14 2C17.314 2 20 4.686 20 8c0 2.5-1.2 4.8-3 6.5v9c0 3.314-2.686 6-6 6H7c-3.314 0-6-2.686-6-6v-9C-1.2 12.8-2.5 10.5-2.5 8c0-3.314 2.686-6 6-6h10.5z" 
            fill="currentColor" 
            stroke="none"/>
      <circle cx="8" cy="10" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="16" cy="10" r="1.5" fill="white" opacity="0.9"/>
      <path d="M6 16c2 2 4 2 6 2s4 0 6-2" stroke="white" stroke-width="1.5" fill="none" opacity="0.9"/>
    </g>
    
    <!-- Text -->
    <text x="38" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="currentColor">
      Dr. Islam Elsagher
    </text>
    <text x="38" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="400" fill="currentColor" opacity="0.8">
      Dentist
    </text>
  </svg>`,

  // Favicon SVG (16x16)
  favicon: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1C10.2 1 12 2.8 12 5c0 1.5-.7 2.8-1.8 3.8v5.2c0 1.1-.9 2-2 2H5.8c-1.1 0-2-.9-2-2V8.8C2.7 7.8 2 6.5 2 5c0-2.2 1.8-4 4-4h2z" 
          fill="#BEB093"/>
    <circle cx="6" cy="6.5" r="0.8" fill="white"/>
    <circle cx="10" cy="6.5" r="0.8" fill="white"/>
    <path d="M5.5 9.5c1 1 2 1 3 1s2 0 3-1" stroke="white" stroke-width="0.8" fill="none"/>
  </svg>`,

  // CSS for responsive logo sizing
  css: `
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
    
    /* Responsive sizing */
    @media (max-width: var(--breakpoint-sm-max)) {
      .dental-logo svg {
        width: 100px;
        height: 33px;
      }
    }
    
    @media (min-width: var(--breakpoint-md)) {
      .dental-logo svg {
        width: 120px;
        height: 40px;
      }
    }
    
    /* Dark mode support */
    [data-theme="dark"] .dental-logo {
      color: #F8F7F5;
    }
  `
};