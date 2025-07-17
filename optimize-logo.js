import sharp from 'sharp';
import { promises as fs } from 'fs';

// Convert logo to optimal formats
async function optimizeLogo() {
  const input = 'identity logo Dr.islam/logo/logo-dr-islam-brown1.jpg';
  
  // Convert to PNG with transparency
  await sharp(input)
    .resize(400, 150, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('assets/images/logo-main-optimized.png');
    
  // Convert to WebP for modern browsers
  await sharp(input)
    .resize(400, 150, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile('assets/images/logo-main.webp');
    
  // Mobile versions
  await sharp(input)
    .resize(200, 75, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 100 })
    .toFile('assets/images/logo-mobile-optimized.png');
    
  console.log('Logos optimized for clarity!');
}

optimizeLogo();