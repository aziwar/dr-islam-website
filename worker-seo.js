// Cloudflare Worker - SEO Enhanced Version
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/' || path === '/index.html') {
      return new Response(HTML_EN, {
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    } else if (path === '/ar' || path === '/ar/') {
      return new Response(HTML_AR, {
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    } else if (path === '/logo.svg') {
      return new Response(LOGO_SVG, {
        headers: { 
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=604800'
        }
      });
    } else if (path === '/robots.txt') {
      return new Response(ROBOTS_TXT, {
        headers: { 
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } else if (path === '/sitemap.xml') {
      return new Response(SITEMAP_XML, {
        headers: { 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    } else if (path === '/favicon.svg' || path === '/favicon.ico') {
      return new Response(FAVICON_SVG, {
        headers: { 
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=604800'
        }
      });
    } else if (path === '/manifest.json') {
      return new Response(MANIFEST_JSON, {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
    
    return new Response(HTML_404, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="white"/>
  
  <!-- Dental Implant with Crescent Symbol -->
  <g transform="translate(50, 100)">
    <!-- Crescent Moon -->
    <path d="M30,0 A30,30 0 1,1 30,60 A20,20 0 1,0 30,0" fill="#777669"/>
    
    <!-- Dental Implant Screw -->
    <g transform="translate(35, 15)">
      <!-- Screw threads -->
      <path d="M5,0 L5,30 M0,5 L10,5 M0,10 L10,10 M0,15 L10,15 M0,20 L10,20 M0,25 L10,25" 
            stroke="#BEB093" stroke-width="2" fill="none"/>
      <!-- Implant top -->
      <rect x="0" y="0" width="10" height="5" fill="#BEB093"/>
    </g>
    
    <!-- Decorative swirl -->
    <path d="M15,35 Q25,40 35,35 T55,40" stroke="#BEB093" stroke-width="2" fill="none"/>
  </g>
  
  <!-- Text "Dr.Islam Elsagher" -->
  <text x="120" y="100" font-family="Georgia, serif" font-size="36" fill="#777669" font-style="italic">Dr.Islam</text>
  <text x="240" y="100" font-family="Georgia, serif" font-size="36" fill="#BEB093" font-style="italic">Elsagher</text>
  
  <!-- Arabic Text -->
  <text x="200" y="140" font-family="Arial, sans-serif" font-size="20" fill="#777669" text-anchor="middle" direction="rtl">
    دكتــور . اسـلام الصغـيـر
  </text>
</svg>`;

const ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://dr-elsagher.com/sitemap.xml`;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dr-elsagher.com/</loc>
    <lastmod>2025-07-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dr-elsagher.com/ar</loc>
    <lastmod>2025-07-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#BEB093"/>
  <path d="M50,20 A30,30 0 1,1 50,80 A20,20 0 1,0 50,20" fill="white"/>
</svg>`;

const MANIFEST_JSON = JSON.stringify({
  name: "Dr. Islam Elsagher",
  short_name: "Dr. Islam",
  start_url: "/",
  display: "standalone",
  theme_color: "#BEB093",
  icons: [{src: "/favicon.svg", sizes: "any", type: "image/svg+xml"}]
});

const HTML_EN = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Islam Elsagher - Dentist in Kuwait</title>
    <meta name="description" content="Dr. Islam Elsagher - General Dentist & Dental Implant Specialist. 15+ years experience in Kuwait.">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#BEB093">
    <style>
        :root { --primary: #BEB093; --secondary: #777669; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; max-width: 1200px; margin: 0 auto; }
        .logo { height: 80px; display: flex; align-items: center; }
        .logo img { height: 100%; width: auto; }
        nav ul { list-style: none; display: flex; gap: 2rem; }
        nav a { text-decoration: none; color: #333; transition: color 0.3s; }
        nav a:hover { color: var(--primary); }
        .hero { background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 4rem 5%; text-align: center; }
        .hero h1 { font-size: 2.5rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .subtitle { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        .cta-button { display: inline-block; padding: 1rem 2rem; background: var(--primary); color: white; text-decoration: none; border-radius: 5px; margin: 0.5rem; transition: transform 0.3s; }
        .cta-button:hover { transform: translateY(-2px); }
        .cta-button.secondary { background: var(--secondary); }
        section { padding: 3rem 5%; max-width: 1200px; margin: 0 auto; }
        h2 { font-size: 2rem; color: var(--secondary); margin-bottom: 2rem; text-align: center; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .service-card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); text-align: center; }
        .service-icon { font-size: 3rem; margin-bottom: 1rem; }
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 2rem 0; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
        footer { background: var(--secondary); color: white; text-align: center; padding: 2rem; margin-top: 3rem; }
        @media (max-width: 768px) { nav ul { display: none; } .hero h1 { font-size: 2rem; } .logo { height: 60px; } }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="/logo.svg" alt="Dr. Islam Elsagher - Dentist in Kuwait">
            </div>
            <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/ar">العربية</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero">
        <h1>Dr. Islam Elsagher</h1>
        <p class="subtitle">General Dentist / Dental Implant Specialist</p>
        <div>
            <a href="https://wa.me/96598563711" class="cta-button">Book Appointment</a>
            <a href="tel:+96598563711" class="cta-button secondary">Call Now</a>
        </div>
    </section>
    <section id="services">
        <h2>Our Services</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">🦷</div>
                <h3>Dental Implants</h3>
                <p>Immediate and delayed implants with world-class technology</p>
            </div>
            <div class="service-card">
                <div class="service-icon">🔬</div>
                <h3>Root Canal Treatment</h3>
                <p>Specialized endodontic treatment with latest equipment</p>
            </div>
            <div class="service-card">
                <div class="service-icon">👑</div>
                <h3>Prosthodontics</h3>
                <p>High-quality fixed and removable prosthetics</p>
            </div>
            <div class="service-card">
                <div class="service-icon">✨</div>
                <h3>Cosmetic Dentistry</h3>
                <p>Hollywood smile and professional whitening</p>
            </div>
        </div>
    </section>
    <section id="contact">
        <h2>Contact Us</h2>
        <div class="contact-info">
            <div class="contact-card">
                <h3>📞 Phone</h3>
                <p><a href="tel:+96598563711">+965 98563711</a></p>
            </div>
            <div class="contact-card">
                <h3>📧 Email</h3>
                <p><a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
            </div>
            <div class="contact-card">
                <h3>📍 Location</h3>
                <p>Kuwait City</p>
            </div>
        </div>
    </section>
    <a href="https://wa.me/96598563711" class="whatsapp-float">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    </a>
    <footer>
        <p>&copy; 2025 Dr. Islam Elsagher - All Rights Reserved</p>
    </footer>
</body>
</html>`;

const HTML_AR = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Islam Elsagher - طبيب أسنان في الكويت</title>
    <meta name="description" content="Dr. Islam Elsagher - طبيب أسنان عام وأخصائي زراعة الأسنان. خبرة 15+ عام في الكويت.">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#BEB093">
    <style>
        :root { --primary: #BEB093; --secondary: #777669; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; max-width: 1200px; margin: 0 auto; }
        .logo { height: 80px; display: flex; align-items: center; }
        .logo img { height: 100%; width: auto; }
        nav ul { list-style: none; display: flex; gap: 2rem; }
        nav a { text-decoration: none; color: #333; transition: color 0.3s; }
        nav a:hover { color: var(--primary); }
        .hero { background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%); padding: 4rem 5%; text-align: center; }
        .hero h1 { font-size: 2.5rem; color: var(--secondary); margin-bottom: 0.5rem; }
        .subtitle { font-size: 1.2rem; color: #666; margin-bottom: 2rem; }
        .cta-button { display: inline-block; padding: 1rem 2rem; background: var(--primary); color: white; text-decoration: none; border-radius: 5px; margin: 0.5rem; transition: transform 0.3s; }
        .cta-button:hover { transform: translateY(-2px); }
        .cta-button.secondary { background: var(--secondary); }
        section { padding: 3rem 5%; max-width: 1200px; margin: 0 auto; }
        h2 { font-size: 2rem; color: var(--secondary); margin-bottom: 2rem; text-align: center; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .service-card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); text-align: center; }
        .service-icon { font-size: 3rem; margin-bottom: 1rem; }
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 2rem 0; }
        .whatsapp-float { position: fixed; bottom: 20px; left: 20px; background: #25D366; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
        footer { background: var(--secondary); color: white; text-align: center; padding: 2rem; margin-top: 3rem; }
        @media (max-width: 768px) { nav ul { display: none; } .hero h1 { font-size: 2rem; } .logo { height: 60px; } }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="/logo.svg" alt="Dr. Islam Elsagher - طبيب أسنان في الكويت">
            </div>
            <ul>
                <li><a href="#services">الخدمات</a></li>
                <li><a href="#contact">اتصل بنا</a></li>
                <li><a href="/">English</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero">
        <h1>Dr. Islam Elsagher</h1>
        <p class="subtitle">طبيب أسنان عام / أخصائي زراعة الأسنان</p>
        <div>
            <a href="https://wa.me/96598563711" class="cta-button">احجز موعدك</a>
            <a href="tel:+96598563711" class="cta-button secondary">اتصل الآن</a>
        </div>
    </section>
    <section id="services">
        <h2>خدماتنا الطبية</h2>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">🦷</div>
                <h3>زراعة الأسنان</h3>
                <p>زراعة فورية ومتأخرة بأحدث التقنيات العالمية</p>
            </div>
            <div class="service-card">
                <div class="service-icon">🔬</div>
                <h3>علاج الجذور</h3>
                <p>علاج متخصص لقنوات الجذور بأحدث الأجهزة</p>
            </div>
            <div class="service-card">
                <div class="service-icon">👑</div>
                <h3>التركيبات</h3>
                <p>تركيبات ثابتة ومتحركة عالية الجودة</p>
            </div>
            <div class="service-card">
                <div class="service-icon">✨</div>
                <h3>تجميل الأسنان</h3>
                <p>ابتسامة هوليوود وتبييض احترافي</p>
            </div>
        </div>
    </section>
    <section id="contact">
        <h2>اتصل بنا</h2>
        <div class="contact-info">
            <div class="contact-card">
                <h3>📞 الهاتف</h3>
                <p><a href="tel:+96598563711">98563711</a></p>
            </div>
            <div class="contact-card">
                <h3>📧 البريد الإلكتروني</h3>
                <p><a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
            </div>
            <div class="contact-card">
                <h3>📍 الموقع</h3>
                <p>مدينة الكويت</p>
            </div>
        </div>
    </section>
    <a href="https://wa.me/96598563711" class="whatsapp-float">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    </a>
    <footer>
        <p>&copy; 2025 Dr. Islam Elsagher - جميع الحقوق محفوظة</p>
    </footer>
</body>
</html>`;

const HTML_404 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f5f5f5; }
        .error-container { text-align: center; padding: 2rem; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        a { color: #0066cc; text-decoration: none; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <p>Sorry, page not found</p>
        <p><a href="/">Back to Homepage</a> | <a href="/ar">النسخة العربية</a></p>
    </div>
</body>
</html>`;