// English Page Layout - Assembles all components
import { getEnglishHead } from './head.js';
import { getEnglishHeader } from './header.js';
import { getEnglishHeroSection } from './sections/hero.js';
import { getEnglishServicesSection } from './sections/services.js';
// Import other sections as they're extracted

export function createEnglishPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    ${getEnglishHead()}
</head>
<body>
    ${getEnglishHeader()}
    
    <main id="main-content" role="main">
        ${getEnglishHeroSection()}
        ${getEnglishServicesSection()}
        
        <!-- TODO: Extract remaining sections:
             - About section
             - Testimonials section  
             - Gallery section
             - FAQ section
             - Contact section
             - Footer section
             - JavaScript modules -->
    </main>
</body>
</html>`;
}