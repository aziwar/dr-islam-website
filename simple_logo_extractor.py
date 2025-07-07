"""
Simple Logo Extractor - Color-based Background Removal
For when rembg is not available or doesn't work well
"""

import cv2
import numpy as np
from PIL import Image
from pathlib import Path
import sys

def remove_white_background(image_path):
    """Remove white/light backgrounds using color threshold"""
    print("Removing white background...")
    
    # Read image
    img = cv2.imread(str(image_path))
    
    # Convert to RGB (OpenCV uses BGR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Define white color range
    lower_white = np.array([200, 200, 200])
    upper_white = np.array([255, 255, 255])
    
    # Create mask
    mask = cv2.inRange(img_rgb, lower_white, upper_white)
    
    # Invert mask
    mask_inv = cv2.bitwise_not(mask)
    
    # Apply morphology to clean up
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))    mask_clean = cv2.morphologyEx(mask_inv, cv2.MORPH_CLOSE, kernel)
    mask_clean = cv2.morphologyEx(mask_clean, cv2.MORPH_OPEN, kernel)
    
    # Convert to RGBA
    img_rgba = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2RGBA)
    
    # Apply mask to alpha channel
    img_rgba[:, :, 3] = mask_clean
    
    # Convert to PIL Image
    pil_image = Image.fromarray(img_rgba)
    
    print("✓ Background removed")
    return pil_image

def process_logo(input_path):
    """Main processing function"""
    print(f"\nProcessing: {input_path}")
    
    # Remove background
    logo = remove_white_background(input_path)
    
    # Create output directory
    output_dir = Path("assets/images")
    output_dir.mkdir(exist_ok=True)
    
    # Save result
    output_path = output_dir / "logo-extracted.png"
    logo.save(output_path, 'PNG')
    
    print(f"✓ Saved to: {output_path}")
    print("\nNote: This is a simple extraction.")
    print("For better results, use smart_logo_extractor.py")
def main():
    """Main execution"""
    print("\nSimple Logo Extractor")
    print("For white/light backgrounds only\n")
    
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    else:
        # Find image files
        images = list(Path('.').glob('*.png')) + list(Path('.').glob('*.jpg'))
        
        if not images:
            print("No images found!")
            return
        
        print("Found images:")
        for i, img in enumerate(images):
            print(f"{i+1}. {img.name}")
        
        choice = input("\nSelect number: ")
        input_file = images[int(choice)-1]
    
    try:
        process_logo(input_file)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
