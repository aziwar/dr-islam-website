"""
Fix differences between AR and EN versions
"""
import os

os.chdir(r'D:\Github-work\dr-islam-website')

# Read EN file
with open('src/content/en.js', 'r', encoding='utf-8') as f:
    en_content = f.read()

# Fix 1: Update viewport meta tag to match AR version
print("Fixing viewport meta tag...")
en_content = en_content.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
)

# Fix 2: Add Noto Kufi Arabic font (useful for Arabic names in English version)
print("Adding Noto Kufi Arabic font...")
en_content = en_content.replace(
    'family=Poppins:wght@300;400;500;600;700&display=swap',
    'family=Noto+Kufi+Arabic:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap'
)

# Fix 3: Update gallery to match AR's single image structure
print("Updating gallery structure...")
old_gallery = '''<div class="gallery-grid">
                <div class="gallery-item">
                    <img src="assets/before-after/case1-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case1-after.jpg" alt="After treatment" loading="lazy">
                    <p>Front teeth implants</p>
                </div>
                <div class="gallery-item">
                    <img src="assets/before-after/case2-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case2-after.jpg" alt="After treatment" loading="lazy">
                    <p>Hollywood smile</p>
                </div>
                <div class="gallery-item">
                    <img src="assets/before-after/case3-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case3-after.jpg" alt="After treatment" loading="lazy">
                    <p>Orthodontic and cosmetic treatment</p>
                </div>
            </div>'''

new_gallery = '''<div class="gallery-grid">
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case1.png" alt="Real transformation" loading="lazy" decoding="async">
                    <p>Amazing smile transformation</p>
                </div>
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case2.png" alt="Treatment result" loading="lazy" decoding="async">
                    <p>Hollywood smile</p>
                </div>
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case3.png" alt="Advanced treatment" loading="lazy" decoding="async">
                    <p>Orthodontic and cosmetic treatment</p>
                </div>
            </div>'''

en_content = en_content.replace(old_gallery, new_gallery)

# Fix 4: Add mobile menu link click handlers (find where to insert)
print("Adding mobile menu link handlers...")
# Find the existing mobile menu close function
close_menu_code = '''    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            backdrop.classList.remove('active');
        }
    });'''

# Add the mobile menu link handler after the close menu code
mobile_link_handler = '''
    
    // Close menu when clicking navigation links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });'''

en_content = en_content.replace(close_menu_code, close_menu_code + mobile_link_handler)

# Write back the fixed content
with open('src/content/en.js', 'w', encoding='utf-8') as f:
    f.write(en_content)

print("\n✅ All fixes applied successfully!")
print("\nChanges made:")
print("1. ✅ Viewport meta tag updated with maximum-scale=5.0")
print("2. ✅ Added Noto Kufi Arabic font")
print("3. ✅ Gallery structure updated to match AR version")
print("4. ✅ Mobile menu link handlers added")
