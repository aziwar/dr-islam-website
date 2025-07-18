"""
Compare AR and EN versions of dr-islam-website to find and fix differences
"""
import re
import os

os.chdir(r'D:\Github-work\dr-islam-website')

# Read both files
with open('src/content/ar.js', 'r', encoding='utf-8') as f:
    ar_content = f.read()
    
with open('src/content/en.js', 'r', encoding='utf-8') as f:
    en_content = f.read()

# Extract HTML content
ar_html_start = ar_content.find('var HTML_AR = `') + len('var HTML_AR = `')
ar_html_end = ar_content.rfind('`;')
ar_html = ar_content[ar_html_start:ar_html_end]

en_html_start = en_content.find('var HTML_EN = `') + len('var HTML_EN = `')
en_html_end = en_content.rfind('`;')
en_html = en_content[en_html_start:en_html_end]

print("=== ANALYSIS REPORT ===\n")

# 1. Meta tags comparison
print("1. META TAGS:")
ar_viewport = re.search(r'<meta name="viewport"[^>]+>', ar_html)
en_viewport = re.search(r'<meta name="viewport"[^>]+>', en_html)
if ar_viewport and en_viewport:
    if ar_viewport.group() != en_viewport.group():
        print(f"   ❌ Viewport mismatch:")
        print(f"      AR: {ar_viewport.group()}")
        print(f"      EN: {en_viewport.group()}")
    else:
        print("   ✅ Viewport tags match")

# 2. Check picture/source tags
print("\n2. LOGO PICTURE TAGS:")
ar_picture = re.findall(r'<picture>.*?</picture>', ar_html, re.DOTALL)
en_picture = re.findall(r'<picture>.*?</picture>', en_html, re.DOTALL)
if len(ar_picture) != len(en_picture):
    print(f"   ❌ Picture tag count mismatch: AR={len(ar_picture)}, EN={len(en_picture)}")
else:
    print(f"   ✅ Picture tags match: {len(ar_picture)} each")

# 3. Service cards
print("\n3. SERVICE CARDS:")
ar_services = re.findall(r'<div class="service-card">.*?</div>', ar_html, re.DOTALL)
en_services = re.findall(r'<div class="service-card">.*?</div>', en_html, re.DOTALL)
print(f"   AR: {len(ar_services)} service cards")
print(f"   EN: {len(en_services)} service cards")
if len(ar_services) == len(en_services):
    print("   ✅ Service card count matches")
else:
    print("   ❌ Service card count mismatch")

# 4. Gallery items
print("\n4. GALLERY ITEMS:")
ar_gallery_items = re.findall(r'<div class="gallery-item">.*?</div>\s*</div>', ar_html, re.DOTALL)
en_gallery_items = re.findall(r'<div class="gallery-item">.*?</div>\s*</div>', en_html, re.DOTALL)
print(f"   AR: {len(ar_gallery_items)} gallery items")
print(f"   EN: {len(en_gallery_items)} gallery items")

# Show EN gallery structure
if en_gallery_items:
    print("\n   EN Gallery structure:")
    for i, item in enumerate(en_gallery_items[:3]):
        imgs = re.findall(r'src="([^"]+)"', item)
        print(f"   Item {i+1}: {len(imgs)} images - {imgs}")

# Show AR gallery structure  
if ar_gallery_items:
    print("\n   AR Gallery structure:")
    for i, item in enumerate(ar_gallery_items[:3]):
        imgs = re.findall(r'src="([^"]+)"', item)
        print(f"   Item {i+1}: {len(imgs)} images - {imgs}")

# 5. Mobile menu event listeners
print("\n5. MOBILE MENU HANDLERS:")
ar_mobile_links = ar_html.count("document.querySelectorAll('#mobileMenu a')")
en_mobile_links = en_html.count("document.querySelectorAll('#mobileMenu a')")
print(f"   AR: {ar_mobile_links} mobile menu link handlers")
print(f"   EN: {en_mobile_links} mobile menu link handlers")
if ar_mobile_links != en_mobile_links:
    print("   ❌ Mobile menu handlers mismatch")

# 6. Font imports
print("\n6. FONT IMPORTS:")
ar_fonts = re.findall(r'family=([^&"]+)', ar_html)
en_fonts = re.findall(r'family=([^&"]+)', en_html)
print(f"   AR fonts: {ar_fonts}")
print(f"   EN fonts: {en_fonts}")

# 7. Schema.org JSON-LD
print("\n7. SCHEMA.ORG DATA:")
ar_schema = re.findall(r'<script type="application/ld\+json">.*?</script>', ar_html, re.DOTALL)
en_schema = re.findall(r'<script type="application/ld\+json">.*?</script>', en_html, re.DOTALL)
print(f"   AR: {len(ar_schema)} schema blocks")
print(f"   EN: {len(en_schema)} schema blocks")

# 8. WhatsApp button
print("\n8. WHATSAPP BUTTON:")
ar_whatsapp = re.findall(r'class="sticky-book"[^>]*>([^<]+)', ar_html)
en_whatsapp = re.findall(r'class="sticky-book"[^>]*>([^<]+)', en_html)
print(f"   AR: {ar_whatsapp}")
print(f"   EN: {en_whatsapp}")

# 9. FAQ items
print("\n9. FAQ ITEMS:")
ar_faq = re.findall(r'<div class="faq-item">', ar_html)
en_faq = re.findall(r'<div class="faq-item">', en_html)
print(f"   AR: {len(ar_faq)} FAQ items")
print(f"   EN: {len(en_faq)} FAQ items")

# 10. Emergency banner
print("\n10. EMERGENCY BANNER:")
ar_emergency = re.search(r'<div class="emergency-banner">.*?</div>', ar_html, re.DOTALL)
en_emergency = re.search(r'<div class="emergency-banner">.*?</div>', en_html, re.DOTALL)
if ar_emergency and en_emergency:
    print("   ✅ Both have emergency banner")
else:
    print("   ❌ Emergency banner mismatch")

print("\n=== KEY DIFFERENCES TO FIX ===")
issues = []

if ar_viewport and en_viewport and ar_viewport.group() != en_viewport.group():
    issues.append("1. Viewport meta tag differs between AR and EN")

if len(ar_gallery_items) != len(en_gallery_items):
    issues.append("2. Gallery items count mismatch")

if ar_mobile_links != en_mobile_links:
    issues.append("3. Mobile menu event handlers differ")

if set(ar_fonts) != set(en_fonts):
    issues.append("4. Font imports differ")

if len(ar_picture) != len(en_picture):
    issues.append("5. Picture/source tags differ")

if issues:
    for issue in issues:
        print(f"❌ {issue}")
else:
    print("✅ No major structural differences found")
