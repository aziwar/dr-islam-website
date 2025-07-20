#!/bin/bash
# Test cache headers implementation
# Run this after npm run dev

echo "=== TESTING CACHE HEADERS ==="
echo ""

# Test HTML page
echo "1. Testing HTML page (/):"
curl -s -I http://localhost:8787/ | grep -i cache-control
echo ""

# Test Arabic page
echo "2. Testing Arabic page (/ar/):"
curl -s -I http://localhost:8787/ar/ | grep -i cache-control
echo ""

# Test CSS
echo "3. Testing CSS (/styles.css):"
curl -s -I http://localhost:8787/styles.css | grep -i cache-control
echo ""

# Test robots.txt
echo "4. Testing robots.txt:"
curl -s -I http://localhost:8787/robots.txt | grep -i cache-control
echo ""

# Test sitemap
echo "5. Testing sitemap.xml:"
curl -s -I http://localhost:8787/sitemap.xml | grep -i cache-control
echo ""

# Test manifest
echo "6. Testing manifest-en.json:"
curl -s -I http://localhost:8787/manifest-en.json | grep -i cache-control
echo ""

# Test service worker
echo "7. Testing service worker (/sw.js):"
curl -s -I http://localhost:8787/sw.js | grep -i cache-control
echo ""

# Test offline page
echo "8. Testing offline page:"
curl -s -I http://localhost:8787/offline.html | grep -i cache-control
echo ""

echo "=== EXPECTED RESULTS ==="
echo "- HTML: s-maxage=86400"
echo "- CSS: s-maxage=3600"
echo "- Robots/Sitemap/Manifest: s-maxage=86400"
echo "- Service Worker: s-maxage=3600"
echo "- All should include s-maxage directive"