// Cloudflare Worker - Optimized with embedded content (Brand Fixed)
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

const ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://dr-islam-website.ahmedziwar.workers.dev/sitemap.xml`;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dr-islam-website.ahmedziwar.workers.dev/</loc>
    <lastmod>2025-06-30</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dr-islam-website.ahmedziwar.workers.dev/ar</loc>
    <lastmod>2025-06-30</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#BEB093"/>
  <text x="50" y="55" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="white">DI</text>
</svg>`;

const MANIFEST_JSON = JSON.stringify({
  name: "Dr. Islam Elsagher",
  short_name: "Dr. Islam",
  start_url: "/",
  display: "standalone",
  theme_color: "#BEB093"
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
        .logo { font-size: 1.5rem; color: var(--primary); font-weight: bold; }
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