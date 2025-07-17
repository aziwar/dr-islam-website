from PIL import Image
import os

# Load the icon PNG
icon_path = "identity logo Dr.islam/icon/icon-dr-islam-png.png"
img = Image.open(icon_path)

# Ensure RGBA mode for transparency
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Create different sizes
sizes = {
    'logo-main.png': (250, 250),      # Main logo
    'logo-mobile.png': (150, 150),    # Mobile version
    'logo-favicon.png': (32, 32),     # Favicon
    'logo-icon.png': (200, 200),      # General icon
    'logo-white.png': (250, 250),     # For dark backgrounds
    'logo-clear.png': (250, 250)      # High quality version
}

output_dir = "assets/images"

for filename, size in sizes.items():
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(os.path.join(output_dir, filename), 'PNG', optimize=True)
    print(f"Created: {filename} ({size[0]}x{size[1]})")

# Create WebP version for better performance
img.save(os.path.join(output_dir, "logo-main.webp"), 'WEBP', quality=90)
print("Created: logo-main.webp")

print("\nAll logo variants created with transparent backgrounds!")