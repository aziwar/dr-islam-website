// Updated image serving logic for src/index.js
const GITHUB_BASE = 'https://raw.githubusercontent.com/aziwar/dr-islam-website/master';

export const imageHandler = async (path) => {
  // Map image paths to GitHub raw URLs
  const imageMappings = {
    '/assets/images/logo-main.png': `${GITHUB_BASE}/assets/images/logo-main.png`,
    '/assets/images/logo-mobile.png': `${GITHUB_BASE}/assets/images/logo-mobile.png`,
    '/assets/images/logo-white.png': `${GITHUB_BASE}/assets/images/logo-white.png`,
    '/assets/images/logo-dark.png': `${GITHUB_BASE}/assets/images/logo-dark.png`,
    // Add gallery images when available
    '/assets/before-after/case1-before.jpg': `${GITHUB_BASE}/assets/before-after/case1-before.jpg`,
    '/assets/before-after/case1-after.jpg': `${GITHUB_BASE}/assets/before-after/case1-after.jpg`,
  };

  const imageUrl = imageMappings[path];
  if (imageUrl) {
    const response = await fetch(imageUrl);
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type'),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  }
  
  return new Response('Image not found', { status: 404 });
};