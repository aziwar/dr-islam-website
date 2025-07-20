#!/bin/bash
# Test performance monitoring implementation
# Run this after npm run dev and check console output

echo "=== TESTING PERFORMANCE MONITORING ==="
echo "Check the terminal running 'npm run dev' for console.log outputs"
echo ""

# Test HTML pages
echo "1. Testing HTML page (/):"
curl -s http://localhost:8787/ > /dev/null
echo "   ✓ Check console for: operation: 'html'"
echo ""

echo "2. Testing Arabic page (/ar/):"
curl -s http://localhost:8787/ar/ > /dev/null  
echo "   ✓ Check console for: operation: 'html', lang: 'ar'"
echo ""

# Test static files
echo "3. Testing CSS:"
curl -s http://localhost:8787/styles.css > /dev/null
echo "   ✓ Check console for: operation: 'css'"
echo ""

echo "4. Testing robots.txt:"
curl -s http://localhost:8787/robots.txt > /dev/null
echo "   ✓ Check console for: operation: 'robots-txt'"
echo ""

# Test manifest
echo "5. Testing manifest:"
curl -s http://localhost:8787/manifest-en.json > /dev/null
echo "   ✓ Check console for: operation: 'manifest'"
echo ""

# Test service worker
echo "6. Testing service worker:"
curl -s http://localhost:8787/sw.js > /dev/null
echo "   ✓ Check console for: operation: 'service-worker'"
echo ""

# Test image (this will show detailed metrics)
echo "7. Testing image fetch:"
curl -s http://localhost:8787/assets/images/logo-en.png > /dev/null
echo "   ✓ Check console for: operation: 'image-fetch' with source info"
echo ""

echo "=== EXPECTED CONSOLE OUTPUT FORMAT ==="
echo "Each request should log metrics like:"
echo "{
  url: 'http://localhost:8787/...',
  method: 'GET',
  timestamp: '2025-07-20T17:45:00.000Z',
  operation: 'html|css|image|etc',
  duration: 12.5,
  ...additional metrics
}"
echo ""
echo "Image requests include: source, webpRequested, r2Duration, etc."