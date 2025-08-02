# 🔍 QUICK DIAGNOSIS COMMANDS
**Run these commands immediately to identify root cause**

## 🚨 IMMEDIATE DIAGNOSTIC COMMANDS

### 1. Check Worker Status
```bash
cd D:\Github-work\dr-islam-website
npx wrangler list
npx wrangler status dr-islam-website
```

### 2. Verify R2 Bucket
```bash
npx wrangler r2 object list dr-islam-images | wc -l
# Should show 41+ images
```

### 3. Test Production URLs
```bash
curl -I https://dr-elsagher.com
curl -I https://dr-elsagher.com/assets/webp-optimized/favicon-16x16.webp
curl -I https://dr-elsagher.com/assets/webp-optimized/logo-main.webp
```

### 4. Check Worker Architecture
```bash
# Verify Worker serves from src/content/ not index.html
cat src/index.js | grep -A5 "HTML_AR\|HTML_EN"
```

### 5. Monitor Worker Logs
```bash
npx wrangler tail dr-islam-website --format pretty
# Keep running and test website
```

---

## 🔧 IMMEDIATE FIXES TO TRY

### Fix 1: Force Worker Redeploy
```bash
npx wrangler deploy --force
```

### Fix 2: Check HTML Sources
```bash
# Compare content
head -20 index.html
head -20 src/content/ar.js
# Should contain same HTML structure
```

### Fix 3: Verify Image Paths
```bash
grep -n "assets/webp-optimized" src/content/ar.js
grep -n "assets/webp-optimized" src/content/en.js
# Should find image references
```

### Fix 4: Clear Cloudflare Cache
```bash
# Via Cloudflare dashboard:
# Caching > Configuration > Purge Everything
```

---

## ⚡ EXPECTED RESULTS

### Working Website Should Show:
- ✅ Logo in header
- ✅ Favicon in browser tab  
- ✅ Gallery images loading
- ✅ No console errors
- ✅ Mobile responsive design

### Common Failure Patterns:
- ❌ All images show broken icons
- ❌ CSS not applied (unstyled HTML)
- ❌ JavaScript not working
- ❌ Mobile layout broken
- ❌ 404 errors in Network tab

---

## 🎯 ROOT CAUSE IDENTIFICATION

### If Images Don't Load:
1. **R2 Bucket Empty**: Re-upload images
2. **Worker Route Broken**: Fix image handling logic
3. **Cache Issues**: Purge Cloudflare cache
4. **Wrong Paths**: Update HTML image references

### If CSS Not Working:
1. **Missing CSS Link**: Add to Worker HTML
2. **CSP Blocking**: Update security headers
3. **Syntax Errors**: Fix styles.js
4. **Cache Issues**: Force refresh

### If Site Completely Broken:
1. **Worker Not Deployed**: Force redeploy
2. **Domain Routing**: Check DNS/routing
3. **Architecture Mismatch**: Update Worker files
4. **Branch Issues**: Check Git deployment

---

**DIAGNOSIS TIME**: 15 minutes max to identify root cause
**FIX TIME**: 30 minutes to 2 hours depending on issue complexity
