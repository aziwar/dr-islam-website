// Cloudflare Worker - Bilingual site with language routing
export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // GitHub raw content base URL
    const GITHUB_BASE = 'https://raw.githubusercontent.com/aziwar/dr-islam-website/master';
    
    // Language routing logic
    if (path === '/') {
      // Default to English
      path = '/index-en.html';
    } else if (path === '/ar' || path === '/ar/') {
      // Arabic version
      path = '/index.html';
    } else if (path.startsWith('/ar/')) {
      // Remove /ar prefix for assets
      path = path.replace('/ar/', '/');
    }
    
    try {
      // Fetch from GitHub
      const response = await fetch(`${GITHUB_BASE}${path}`);
      
      if (!response.ok) {
        // 404 fallback
        return new Response(get404Page(), {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
      
      // Determine content type
      const contentType = getContentType(path);
      
      // Return with proper headers
      return new Response(response.body, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600'
        }
      });
      
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};

function getContentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html; charset=utf-8',
    'css': 'text/css; charset=utf-8',
    'js': 'application/javascript; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'ico': 'image/x-icon',
    'svg': 'image/svg+xml'
  };
  return types[ext] || 'text/plain; charset=utf-8';
}

function get404Page() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .error-container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
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
}