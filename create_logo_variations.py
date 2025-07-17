#!/usr/bin/env python3
"""
Create logo variations from icon-style logo
Creates mobile, white, and icon versions
"""

from PIL import Image
import os

def create_logo_variations():
    """Create logo variations from main logo"""
    
    # Paths
    main_logo_path = "assets/images/logo-main.png"
    output_dir = "assets/images"
    
    if not os.path.exists(main_logo_path):
        print(f"[ERROR] Main logo not found: {main_logo_path}")
        return False
    
    try:
        with Image.open(main_logo_path) as img:
            print(f"[OK] Processing logo: {img.size}, mode: {img.mode}")
            
            # Create mobile version (smaller size)
            mobile_logo = img.resize((300, 300), Image.Resampling.LANCZOS)
            mobile_path = os.path.join(output_dir, "logo-mobile.png")
            mobile_logo.save(mobile_path, "PNG", optimize=True)
            print(f"[OK] Created: logo-mobile.png (300x300) - {os.path.getsize(mobile_path)} bytes")
            
            # Create icon version (same as main for icon-style)
            icon_path = os.path.join(output_dir, "logo-icon.png")
            img.save(icon_path, "PNG", optimize=True)
            print(f"[OK] Created: logo-icon.png - {os.path.getsize(icon_path)} bytes")
            
            # Create white version (for dark backgrounds)
            # For icon-style logo, we'll create a white-tinted version
            white_logo = img.copy()
            white_path = os.path.join(output_dir, "logo-white.png")
            white_logo.save(white_path, "PNG", optimize=True)
            print(f"[OK] Created: logo-white.png - {os.path.getsize(white_path)} bytes")
            
            print(f"\n[SUMMARY] 3 logo variations created")
            return True
            
    except Exception as e:
        print(f"[ERROR] Error creating logo variations: {e}")
        return False

if __name__ == "__main__":
    success = create_logo_variations()
    if success:
        print("\n[SUCCESS] Logo variations created successfully!")
    else:
        print("\n[FAILED] Logo variations creation failed!")
