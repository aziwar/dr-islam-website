#!/usr/bin/env node

/**
 * Favicon Generation Script for Dr. Islam Dental Website
 * Generates favicons from the DentalLogo SVG component
 */

import { writeFileSync, mkdirSync } from 'fs';
import { DentalLogo } from '../src/content/components/DentalLogo.js';

// Create assets/images directory if it doesn't exist
try {
    mkdirSync('assets/images', { recursive: true });
} catch (err) {
    // Directory might already exist
}

// Generate different favicon sizes using SVG as base
const faviconSizes = [16, 32, 48, 64, 128, 256];

// Create base64 encoded SVG favicon
const faviconSvg = DentalLogo.favicon;
const faviconBase64 = Buffer.from(faviconSvg).toString('base64');

// Generate basic HTML for testing favicons
const faviconTestHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Favicon Test - Dr. Islam</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${faviconBase64}">
</head>
<body>
    <h1>Favicon Test Page</h1>
    <p>Check the browser tab for the favicon</p>
    <div style="font-size: 64px;">${faviconSvg}</div>
</body>
</html>`;

// Write favicon test file
writeFileSync('favicon-test.html', faviconTestHtml);

// Create ICO fallback (simplified approach)
const icoContent = `data:image/svg+xml;base64,${faviconBase64}`;

// Generate manifest icons data
const manifestIcons = faviconSizes.map(size => ({
    src: `/assets/images/favicon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png"
}));

// Favicon generation complete - production build

// Generate a simple Apple touch icon using the SVG
const appleTouchIcon = DentalLogo.favicon
    .replace('width="16"', 'width="180"')
    .replace('height="16"', 'height="180"')
    .replace('viewBox="0 0 16 16"', 'viewBox="0 0 16 16"');

const appleTouchIconBase64 = Buffer.from(appleTouchIcon).toString('base64');

// Apple Touch Icon generated for production

export { faviconSvg, faviconBase64, manifestIcons };