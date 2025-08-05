// Arabic Routing Patterns - Query parameter support implementation

// PATTERN 1: Priority-based language detection
export const languageDetectionPattern = {
  // ❌ WRONG - Only checked path, ignored query parameters
  wrongPattern: `
    if (path === '/ar' || path === '/ar/') {
      html = HTML_AR;
      hreflang = 'ar';
    }
  `,
  
  // ✅ CORRECT - Check query param first, then path, then header
  correctPattern: `
    // Added query parameter support
    const langParam = url.searchParams.get('lang');
    
    // Priority order: query param > path > Accept-Language header
    if (path === '/ar' || path === '/ar/' || langParam === 'ar') {
      html = HTML_AR;
      hreflang = 'ar';
    }
  `,
  
  priority: [
    '1. Query parameter (?lang=ar) - Highest priority',
    '2. URL path (/ar/) - Traditional routing',
    '3. Accept-Language header - Browser preference'
  ]
};

// PATTERN 2: Query parameter extraction
export const queryParameterPattern = {
  implementation: `
    // Extract language from URL query parameters
    const langParam = url.searchParams.get('lang');
    
    // url.searchParams is a URLSearchParams object
    // Returns null if parameter doesn't exist
    // Returns string value if it exists
  `,
  
  usage: {
    arabic: '/?lang=ar',
    english: '/?lang=en',
    default: '/ (uses path or header fallback)'
  }
};

// PATTERN 3: Complete language routing logic
export const completeRoutingLogic = {
  implementation: `
    function handleHTMLRequest(request, url) {
      // Extract all language indicators
      const acceptLanguage = request.headers.get('Accept-Language') || '';
      const preferredLang = acceptLanguage.includes('ar') ? 'ar' : 'en';
      const path = url.pathname;
      const langParam = url.searchParams.get('lang');
      
      let html = HTML_EN;
      let hreflang = 'en';
      
      // Determine language with priority order
      if (path === '/ar' || path === '/ar/' || langParam === 'ar') {
        html = HTML_AR;
        hreflang = 'ar';
      } else if (path === '/' && preferredLang === 'ar') {
        // Redirect Arabic browser users to /ar/
        return Response.redirect(url.origin + '/ar/', 302);
      }
      
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Language': hreflang
        }
      });
    }
  `
};

// PATTERN 4: RTL support for Arabic
export const rtlSupportPattern = {
  htmlStructure: `
    // Arabic HTML must include RTL attributes
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body dir="rtl">
        <!-- Content -->
      </body>
    </html>
  `,
  
  cssConsiderations: [
    'Use logical properties (start/end instead of left/right)',
    'Mirror layouts for RTL languages',
    'Flip directional icons',
    'Adjust text alignment'
  ]
};

// PATTERN 5: Testing Arabic routing
export const testingPattern = {
  playwrightTests: `
    // Test all routing methods
    const viewports = [375, 768, 1200];
    
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 800 });
      
      // Test query parameter
      await page.goto('http://127.0.0.1:8787/?lang=ar');
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('ar');
      
      // Test path routing
      await page.goto('http://127.0.0.1:8787/ar/');
      const dir = await page.getAttribute('html', 'dir');
      expect(dir).toBe('rtl');
    }
  `,
  
  manualVerification: [
    'Check /?lang=ar shows Arabic content',
    'Verify /ar/ path still works',
    'Test RTL layout at all breakpoints',
    'Confirm no mixed language content'
  ]
};

// PATTERN 6: Language switching UI
export const languageSwitcherPattern = {
  implementation: `
    // In navigation or header
    <div class="language-switcher">
      <a href="/?lang=en" class="lang-link">English</a>
      <a href="/?lang=ar" class="lang-link">العربية</a>
    </div>
  `,
  
  javascriptEnhancement: `
    // Preserve other query parameters when switching
    function switchLanguage(lang) {
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.location.href = url.toString();
    }
  `
};