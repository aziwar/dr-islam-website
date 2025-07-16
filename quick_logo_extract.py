"""
Quick Logo Extractor - Simplified Version
No GUI, just command line with immediate results
"""

import sys
from pathlib import Path
from PIL import Image
import os

def simple_extract():
    # Find image files
    images = list(Path('.').glob('*.png')) + list(Path('.').glob('*.jpg'))
    
    if not images:
        print("No images found! Place logo screenshots in this folder.")
        return
    
    print("\nFound images:")
    for i, img in enumerate(images, 1):
        print(f"{i}. {img.name}")
    
    choice = input("\nSelect number (or Enter for first): ").strip()
    img_path = images[int(choice)-1 if choice else 0]
    
    # Create output dir
    output_dir = Path("assets/images")
    output_dir.mkdir(exist_ok=True)
    
    # Open and save
    try:
        img = Image.open(img_path)
        
        # Save as-is first
        output = output_dir / f"logo-original.png"
        img.save(output)
        print(f"\nSaved: {output}")
        
        # Create basic sizes
        sizes = {"main": (400, 150), "mobile": (300, 115)}
        
        for name, size in sizes.items():
            resized = img.resize(size, Image.Resampling.LANCZOS)
            output = output_dir / f"logo-{name}.png"
            resized.save(output)
            print(f"Saved: {output}")
        
        print(f"\nDone! Check {output_dir.absolute()}")
        os.startfile(output_dir.absolute())
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    simple_extract()
