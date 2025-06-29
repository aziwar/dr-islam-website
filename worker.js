export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve CSS
    if (path === '/css/style.css') {
      return new Response(CSS_CONTENT, {
        headers: { 'Content-Type': 'text/css; charset=utf-8' }
      });
    }

    // Serve JS
    if (path === '/js/main.js') {
      return new Response(JS_CONTENT, {
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
      });
    }

    // Default to HTML
    return new Response(HTML_CONTENT, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

// Embedded content
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دكتور اسلام الصغير - طبيب أسنان وزراعة</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">Dr. Islam Elsagher</div>
            <ul>
                <li><a href="#services">الخدمات</a></li>
                <li><a href="#about">عن الطبيب</a></li>
                <li><a href="#contact">اتصل بنا</a></li>
            </ul>
        </nav>
    </header>`;