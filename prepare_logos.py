"""
Logo Image Preparation Script
This script helps prepare the logo images for the website
"""

import os

# Logo specifications
LOGO_SPECS = {
    "logo-main.png": {
        "size": (400, 150),
        "description": "Main logo for desktop header"
    },
    "logo-mobile.png": {
        "size": (300, 115),
        "description": "Optimized logo for mobile devices"
    },
    "logo-white.png": {
        "size": (400, 150),
        "description": "White version for dark backgrounds"
    },
    "logo-dark.png": {
        "size": (400, 150),
        "description": "Dark version for light backgrounds"
    }
}

print("Dr. Islam Website - Logo Setup Instructions")
print("=" * 50)
print("\nRequired logo files:")
print("-" * 50)

for filename, specs in LOGO_SPECS.items():
    print(f"\n{filename}:")
    print(f"  Size: {specs['size'][0]}x{specs['size'][1]}px")
    print(f"  Description: {specs['description']}")

print("\n" + "=" * 50)
print("\nInstructions:")
print("1. Export your logo from the design software")
print("2. Save as PNG with transparency")
print("3. Name files exactly as shown above")
print("4. Place in assets/images/ directory")
print("\nNote: The website will automatically use these images once uploaded.")
