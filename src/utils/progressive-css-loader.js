// Progressive CSS Loader
// Implements critical CSS inline + deferred loading for optimal performance

export class ProgressiveCSSLoader {
  constructor() {
    this.criticalCSS = null;
    this.deferredCSS = null;
  }

  // Get critical CSS for inline injection (above-the-fold)
  getCriticalCSS(isMobile = false) {
    // Only return essential styles for initial render
    const criticalStyles = `
      /* Reset and base styles */
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; font-family: 'Cairo', 'Inter', sans-serif; }
      
      /* Critical layout */
      .header { position: fixed; top: 0; width: 100%; z-index: 1000; }
      .hero { min-height: 100vh; display: flex; align-items: center; }
      
      /* Critical colors */
      :root {
        --primary: #BEB093;
        --secondary: #777669;
        --background: #F8F7F5;
        --text: #333;
      }
      
      /* Critical typography */
      h1 { font-size: clamp(2rem, 5vw, 3rem); }
      
      /* Mobile-first critical */
      ${isMobile ? this.getMobileCritical() : ''}
    `;
    
    return criticalStyles.replace(/\s+/g, ' ').trim();
  }