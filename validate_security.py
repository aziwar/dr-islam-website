"""
Validate security headers and SEO implementation
"""
import os

os.chdir(r'D:\Github-work\dr-islam-website')

print("=== SECURITY & SEO VALIDATION ===\n")

# Check if robots.txt handler exists
with open('src/index.js', 'r', encoding='utf-8') as f:
    index_content = f.read()

checks = {
    'robots.txt handler': 'handleRobotsTxt()' in index_content,
    'sitemap.xml handler': 'handleSitemap(' in index_content,
    'CSP header': 'Content-Security-Policy' in index_content,
    'HSTS header': 'Strict-Transport-Security' in index_content,
    'Permissions-Policy': 'Permissions-Policy' in index_content,
    'hreflang support': 'hreflang' in index_content,
    'Content-Language': 'Content-Language' in index_content,
    'X-Robots-Tag': 'X-Robots-Tag' in index_content
}

print("SECURITY CHECKS:")
for check, result in checks.items():
    status = "PASS" if result else "FAIL"
    print(f"  {check}: {status}")

print("\nNEXT STEPS:")
print("1. Commit and push changes")
print("2. Monitor GitHub Actions deployment")
print("3. Test robots.txt at https://dr-elsagher.com/robots.txt")
print("4. Test sitemap at https://dr-elsagher.com/sitemap.xml")
print("5. Use Chrome DevTools to verify security headers")

print("\nVALIDATION COMPLETE!")
