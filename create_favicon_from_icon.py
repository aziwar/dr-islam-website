#!/usr/bin/env python3
"""
Create favicon files from icon-style logo
Uses the icon-dr-islam-png.png from identity folder
"""

from PIL import Image
import os
import shutil

def create_favicon_files():
    """Create favicon files from icon-style logo"""
    
    # Input and output paths
    input_path = "identity logo Dr.islam/icon/icon-dr-islam-png.png"
    output_dir = "assets/images"
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Load the icon image
    if not os.path.exists(input_path):
        print(f"[ERROR] Input file not found: {input_path}")
        return False
    
    try:
        with Image.open(input_path) as img:
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            print(f"[OK] Loaded icon: {img.size}, mode: {img.mode}")
            
            # Create favicon sizes
            favicon_sizes = [
                (16, 16, "favicon-16x16.png"),
                (32, 32, "favicon-32x32.png"),
                (48, 48, "favicon-48x48.png"),
                (64, 64, "favicon-64x64.png"),
                (128, 128, "favicon-128x128.png"),
                (256, 256, "favicon-256x256.png")
            ]
            
            created_files = []
            
            for width, height, filename in favicon_sizes:
                # Resize maintaining aspect ratio
                favicon = img.resize((width, height), Image.Resampling.LANCZOS)
                
                # Save as PNG with transparency
                output_path = os.path.join(output_dir, filename)
                favicon.save(output_path, "PNG", optimize=True)
                
                # Get file size
                file_size = os.path.getsize(output_path)
                created_files.append(f"{filename} ({file_size} bytes)")
                print(f"[OK] Created: {filename} ({width}x{height}) - {file_size} bytes")
            
            # Create ICO file (multi-size)
            ico_path = "favicon.ico"
            ico_sizes = [(16, 16), (32, 32), (48, 48)]
            ico_images = []
            
            for width, height in ico_sizes:
                ico_img = img.resize((width, height), Image.Resampling.LANCZOS)
                ico_images.append(ico_img)
            
            # Save ICO file
            ico_images[0].save(ico_path, format='ICO', sizes=ico_sizes)
            ico_size = os.path.getsize(ico_path)
            created_files.append(f"favicon.ico ({ico_size} bytes)")
            print(f"[OK] Created: favicon.ico - {ico_size} bytes")
            
            # Create Apple Touch Icon (180x180)
            apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
            apple_path = os.path.join(output_dir, "apple-touch-icon.png")
            apple_icon.save(apple_path, "PNG", optimize=True)
            apple_size = os.path.getsize(apple_path)
            created_files.append(f"apple-touch-icon.png ({apple_size} bytes)")
            print(f"[OK] Created: apple-touch-icon.png (180x180) - {apple_size} bytes")
            
            print(f"\n[SUMMARY] {len(created_files)} favicon files created")
            return True
            
    except Exception as e:
        print(f"[ERROR] Error creating favicon files: {e}")
        return False

if __name__ == "__main__":
    success = create_favicon_files()
    if success:
        print("\n[SUCCESS] Favicon creation completed successfully!")
    else:
        print("\n[FAILED] Favicon creation failed!")
