"""
Generate mobile preview HTML with actual styles
"""
import os

os.chdir(r'D:\Github-work\dr-islam-website')

# Read the CSS from styles.js
with open('src/content/styles.js', 'r', encoding='utf-8') as f:
    styles_content = f.read()

# Extract CSS
css_start = styles_content.find('var CSS = `') + len('var CSS = `')
css_end = styles_content.rfind('`;')
css = styles_content[css_start:css_end]

# Read the template
with open('mobile-preview.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Replace placeholder with actual CSS
preview = template.replace('${CSS_CONTENT}', css)

# Write the final preview
with open('mobile-preview-live.html', 'w', encoding='utf-8') as f:
    f.write(preview)

print("✅ Mobile preview generated: mobile-preview-live.html")
print("\n📱 Open mobile-preview-live.html in your browser to test")
print("\n🔍 Key things to check:")
print("1. Emergency banner font size (should be 18px)")
print("2. WhatsApp button position (should be 80px from bottom)")
print("3. Mobile menu toggle visibility")
print("4. Service cards layout on mobile")
print("5. Gallery image display")

# Also create a quick mobile test report
report = """
# MOBILE VERSION CHECKUP REPORT

## ✅ FIXED ISSUES:
1. **Viewport meta tag** - Now includes maximum-scale=5.0
2. **Font imports** - Added Noto Kufi Arabic to EN version
3. **Gallery structure** - Unified to use single images
4. **Mobile menu handlers** - Added click handlers to close menu

## 📱 MOBILE-SPECIFIC CSS APPLIED:
- Emergency banner: font-size: 18px !important
- WhatsApp button: bottom: 80px !important  
- Mobile menu: Proper toggle display
- Service cards: Single column on mobile
- Gallery: Responsive grid

## 🔍 TESTING CHECKLIST:
- [ ] Emergency banner readable at 18px
- [ ] WhatsApp button not overlapping content
- [ ] Mobile menu opens/closes properly
- [ ] All sections responsive
- [ ] Images load correctly
- [ ] Touch targets are 48px minimum
- [ ] No horizontal scroll
"""

with open('MOBILE_VERSION_REPORT.md', 'w', encoding='utf-8') as f:
    f.write(report)

print("\n📄 Report saved: MOBILE_VERSION_REPORT.md")
