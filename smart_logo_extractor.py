"""
Smart Logo Extractor for Dr. Islam Website
This script automatically extracts logos from screenshots with any background
and saves them in multiple formats and sizes.

Author: AI Assistant
Date: 2025-07-07
"""

import os
import sys
from pathlib import Path

# Check if required libraries are installed
required_libs = {
    'rembg': 'rembg',
    'PIL': 'pillow',
    'cv2': 'opencv-python',
    'numpy': 'numpy'
}

print("Checking required libraries...")
missing_libs = []

for lib_import, lib_install in required_libs.items():
    try:
        __import__(lib_import)
        print(f"✓ {lib_install} is installed")
    except ImportError:
        missing_libs.append(lib_install)
        print(f"✗ {lib_install} is NOT installed")

if missing_libs:
    print("\nPlease install missing libraries:")
    print(f"pip install {' '.join(missing_libs)}")
    sys.exit(1)

# Import libraries after checking
from rembg import remove
from PIL import Image, ImageOps
import cv2
import numpy as np
from datetime import datetime
class LogoExtractor:
    """Smart logo extraction from screenshots"""
    
    def __init__(self, input_path):
        self.input_path = Path(input_path)
        self.output_dir = Path("assets/images")
        self.output_dir.mkdir(exist_ok=True)
        
        # Logo specifications
        self.sizes = {
            "main": (400, 150),
            "mobile": (300, 115),
            "favicon": (32, 32)
        }
        
        # Load image
        self.original = Image.open(self.input_path)
        print(f"Loaded image: {self.original.size}")
    
    def remove_background(self):
        """Remove background using AI"""
        print("\n1. Removing background...")
        
        # Method 1: Using rembg (AI-powered)
        with open(self.input_path, 'rb') as input_file:
            input_data = input_file.read()
            output_data = remove(input_data)
        
        # Save temporary file
        temp_path = self.output_dir / "temp_no_bg.png"
        with open(temp_path, 'wb') as output_file:
            output_file.write(output_data)        
        # Load the processed image
        self.no_bg_image = Image.open(temp_path)
        print("✓ Background removed successfully")
        
        return self.no_bg_image
    
    def crop_to_content(self, image):
        """Auto-crop to remove empty space"""
        print("\n2. Auto-cropping to content...")
        
        # Convert to numpy array
        img_array = np.array(image)
        
        # Find non-transparent pixels
        if img_array.shape[2] == 4:  # Has alpha channel
            alpha = img_array[:, :, 3]
            rows = np.any(alpha, axis=1)
            cols = np.any(alpha, axis=0)
            y_min, y_max = np.where(rows)[0][[0, -1]]
            x_min, x_max = np.where(cols)[0][[0, -1]]
            
            # Add small padding
            padding = 10
            y_min = max(0, y_min - padding)
            x_min = max(0, x_min - padding)
            y_max = min(img_array.shape[0], y_max + padding)
            x_max = min(img_array.shape[1], x_max + padding)
            
            # Crop
            cropped = image.crop((x_min, y_min, x_max, y_max))
            print(f"✓ Cropped from {image.size} to {cropped.size}")            return cropped
        
        return image
    
    def resize_logo(self, image, size, name):
        """Resize logo maintaining aspect ratio"""
        print(f"\n3. Creating {name} version ({size[0]}x{size[1]}px)...")
        
        # Calculate aspect ratio
        aspect = image.width / image.height
        target_aspect = size[0] / size[1]
        
        if aspect > target_aspect:
            # Width is limiting factor
            new_width = size[0]
            new_height = int(size[0] / aspect)
        else:
            # Height is limiting factor
            new_height = size[1]
            new_width = int(size[1] * aspect)
        
        # Resize
        resized = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Create canvas with exact size
        canvas = Image.new('RGBA', size, (0, 0, 0, 0))
        
        # Paste centered
        x = (size[0] - new_width) // 2
        y = (size[1] - new_height) // 2
        canvas.paste(resized, (x, y), resized)        
        print(f"✓ Resized to {canvas.size}")
        return canvas
    
    def create_variations(self, base_image):
        """Create all logo variations"""
        print("\n4. Creating logo variations...")
        
        logos = {}
        
        # Main versions
        logos['main'] = self.resize_logo(base_image, self.sizes['main'], 'main')
        logos['mobile'] = self.resize_logo(base_image, self.sizes['mobile'], 'mobile')
        
        # White version (for dark backgrounds)
        white_bg = Image.new('RGBA', self.sizes['main'], (255, 255, 255, 255))
        white_bg.paste(logos['main'], (0, 0), logos['main'])
        logos['white'] = white_bg
        
        # Dark version (for light backgrounds)
        logos['dark'] = logos['main'].copy()
        
        # Favicon
        logos['favicon'] = self.resize_logo(base_image, self.sizes['favicon'], 'favicon')
        
        return logos
    
    def save_logos(self, logos):
        """Save all logo versions"""
        print("\n5. Saving logo files...")
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")        
        saved_files = []
        
        for name, image in logos.items():
            filename = f"logo-{name}.png"
            filepath = self.output_dir / filename
            
            # Save with optimization
            image.save(filepath, 'PNG', optimize=True)
            saved_files.append(filepath)
            print(f"✓ Saved: {filename}")
            
            # Also save timestamped backup
            backup_name = f"logo-{name}_{timestamp}.png"
            backup_path = self.output_dir / backup_name
            image.save(backup_path, 'PNG', optimize=True)
        
        return saved_files
    
    def process(self):
        """Main processing pipeline"""
        print(f"\n{'='*50}")
        print("Smart Logo Extractor - Dr. Islam Website")
        print(f"{'='*50}")
        
        # Step 1: Remove background
        no_bg = self.remove_background()
        
        # Step 2: Auto-crop
        cropped = self.crop_to_content(no_bg)
        
        # Step 3: Create variations
        logos = self.create_variations(cropped)        
        # Step 4: Save all versions
        saved = self.save_logos(logos)
        
        print(f"\n{'='*50}")
        print(f"✓ SUCCESS! Created {len(saved)} logo files")
        print(f"✓ Location: {self.output_dir}")
        print(f"{'='*50}\n")
        
        return saved


def main():
    """Main execution"""
    print("\nDr. Islam Website - Smart Logo Extractor")
    print("This tool will extract your logo from screenshots\n")
    
    # Get input file
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        # Look for screenshots in current directory
        screenshots = list(Path('.').glob('*.png')) + list(Path('.').glob('*.jpg'))
        
        if not screenshots:
            print("No image files found!")
            print("\nUsage: python smart_logo_extractor.py [image_file]")
            print("Or place PNG/JPG files in current directory")
            return
        
        print("Found images:")
        for i, img in enumerate(screenshots):
            print(f"{i+1}. {img.name}")        
        # Select image
        choice = input("\nSelect image number (or press Enter for first): ")
        if choice.strip():
            idx = int(choice) - 1
            input_file = screenshots[idx]
        else:
            input_file = screenshots[0]
    
    # Process
    try:
        extractor = LogoExtractor(input_file)
        extractor.process()
        
        print("\nNext steps:")
        print("1. Check the 'assets/images' folder for your logos")
        print("2. Review each version to ensure quality")
        print("3. Commit and push to GitHub")
        print("\nThe website will automatically use these logos!")
        
    except Exception as e:
        print(f"\nError: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure the image contains the logo")
        print("2. Try a screenshot with better contrast")
        print("3. Check that all libraries are installed")


if __name__ == "__main__":
    main()
