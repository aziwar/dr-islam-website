// Arabic HTML Head Section
import { DentalLogo } from '../../content/components/DentalLogo.js';
import { ENHANCEMENTS_CSS } from '../../content/css/enhancements.css.js';

export function getArabicHead() {
  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

    <!-- PWA Support -->
    <link rel="manifest" href="/manifest-ar.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="د. اسلام">
    <title>دكتور اسلام الصغير - طبيب أسنان وزراعة</title>
    <meta name="description" content="د. إسلام الصغير يقدم رعاية شاملة للأسنان في الكويت. خبرة تزيد عن 15 عامًا في الزراعة وطب الأسنان التجميلي وجراحة الفم.">
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${btoa(DentalLogo.favicon)}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Preload critical Arabic fonts for LCP improvement -->
    <link rel="preload" href="https://fonts.gstatic.com/s/amiri/v27/J7aHnp1uDWRBEqV98dVQjhukTg.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/ibmplexsansarabic/v13/Qw3MZQNVEjzh-Fl5nUUsVjePl6I6LSFovCz67P8_wao.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/cairo/v28/SLXGc1nY6HkvalIvTp2mxdt0UX8gfg.woff2" as="font" type="font/woff2" crossorigin>
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//unpkg.com">
    <!-- Preload critical CSS -->
    <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <noscript><link rel="stylesheet" href="/styles.css"></noscript>
    
    <!-- UI/UX Enhancements -->
    <style>
        ${ENHANCEMENTS_CSS}
        ${DentalLogo.css}
    </style>
    
    <!-- Schema Markup for Dentist -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "د. إسلام الصغير",
        "alternateName": "Dr. Islam Elsagher",
        "description": "طبيب أسنان عام وأخصائي زراعة أسنان في الكويت",
        "image": "https://dr-elsagher.com/assets/dr-islam.jpg",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KW"
        },
        "telephone": "+96598563711",
        "url": "https://dr-elsagher.com/ar/",
        "sameAs": [
            "https://www.instagram.com/dr.islamelsagher/"
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "09:00",
                "closes": "21:00"
            }
        ]
    }
    </script>`;
}