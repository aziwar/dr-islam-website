# 🚀 CLAUDE CODE QUICK START GUIDE

**READ THIS FIRST!**
**Project:** dr-islam-website fixes
**Your Tools:** context7, playwright-automation, file system access, GitHub

## 📋 IMMEDIATE STEPS

1. **Read These Files** (in order):
   - `WEBSITE_FIX_TODO.md` - Current issues and progress
   - `CLAUDE_CODE_STRATEGY.md` - Your complete fix strategy
   - `CLAUDE_CODE_TEST_SCENARIOS.md` - Test templates
   - `CONTEXT7_QUERY_REFERENCE.md` - Quick lookup for issues

2. **Start Dev Server**:
   ```bash
   cd D:\Github-work\dr-islam-website
   npm run dev
   # Server runs at http://127.0.0.1:8787
   ```

3. **Your MCP Powers**:
   - **context7**: Add "use context7" to get latest docs
   - **playwright**: Automate browser testing
   - **File access**: Read/write all project files
   - **GitHub**: Push fixes with `gh` command

## 🔴 CRITICAL ISSUES (Fix First!)

### 1. Security - Admin Token (15 min)
```bash
# File: wrangler.toml line 18
# Remove hardcoded token
# Test with playwright that API returns 401
```

### 2. Arabic Routing Bug (30 min)
```javascript
// File: src/index.js handleHTMLRequest()
// Add: const langParam = url.searchParams.get('lang');
// Test: /?lang=ar shows Arabic content
```

## 🎯 YOUR WORKFLOW

For EVERY fix:
1. **Research** with context7
2. **Implement** the fix
3. **Test** with playwright
4. **Commit** with descriptive message
5. **Push** to trigger auto-deploy

## 💡 EXAMPLE: Fixing Navigation

```javascript
// 1. Research the issue
"CSS navigation disappearing responsive fix 2025 use context7"

// 2. Implement in src/content/css/responsive.css.js
// Add ultra-specific selectors

// 3. Test with playwright
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://127.0.0.1:8787');
await page.setViewportSize({ width: 1200, height: 800 });
// Verify nav visible

// 4. Commit
git add -A
git commit -m "fix: navigation display with specific CSS selectors"
git push origin main
```

## 📊 SUCCESS CRITERIA

Your fixes are complete when:
- ✅ Security: No hardcoded tokens
- ✅ Tests: Package.json scripts have real tests
- ✅ Arabic: ?lang=ar parameter works
- ✅ Mobile: All buttons 48px+ touch targets
- ✅ Performance: Lighthouse 95+ maintained

## 🚨 COMMON PITFALLS

1. **CSS Not Working?**
   - Check specificity conflicts
   - Test responsive breakpoints
   - Verify file is imported

2. **Arabic Issues?**
   - Check RTL styles
   - Verify translations exist
   - Test routing logic

3. **Mobile Problems?**
   - Test at 375px viewport
   - Check touch target sizes
   - Verify swipe gestures

## 🔧 POWER COMMANDS

```bash
# Quick test mobile
npx playwright test tests/mobile/

# Check Arabic routing
curl http://127.0.0.1:8787/?lang=ar | grep 'dir="rtl"'

# Validate CSS sizes
npx playwright test tests/accessibility/

# Full test suite
npm test
```

## 📈 PROGRESS TRACKING

Update `WEBSITE_FIX_TODO.md` after each fix:
- Mark items with ✅
- Update completion percentage
- Note any new issues found

## 🎬 FINAL CHECKLIST

Before considering complete:
- [ ] All tests passing
- [ ] Screenshots taken (desktop/mobile/Arabic)
- [ ] No console errors
- [ ] Performance maintained
- [ ] Deployed successfully

---

**Remember:** 
- Use context7 for ANY uncertainty
- Test EVERYTHING with playwright
- Commit frequently
- Ask for latest docs, not outdated patterns

**You've got this! The website's current issues are well-documented and the fixes are straightforward with your MCP tools.**