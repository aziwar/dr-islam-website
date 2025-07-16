"""
Quick Test Script for Image Processor Toolkit
"""

from image_processor_toolkit import ImageProcessor
from pathlib import Path

# Initialize processor
processor = ImageProcessor()

# Example usage for dr-islam logo
def process_dr_islam_logo():
    # Find logo screenshots
    screenshots = list(Path('.').glob('logo*.png')) + list(Path('.').glob('logo*.jpg'))
    
    if not screenshots:
        print("No logo screenshots found! Save as logo.png or logo.jpg")
        return
    
    # Process first logo
    logo_file = screenshots[0]
    print(f"\nProcessing: {logo_file}")
    
    # Create output directory
    output_dir = Path('assets/images')
    output_dir.mkdir(exist_ok=True)
    
    # Process with logo sizes
    results = processor.process_image(
        logo_file,
        output_dir,
        project_type='logo'  # Uses predefined logo sizes
    )
    
    print("\nGenerated files:")
    for name, path in results.items():
        print(f"  - {path.name}")
    
    print("\n✓ Logo processing complete!")
    print("Next: git add assets/images/* && git commit -m 'Add processed logo images'")

if __name__ == "__main__":
    process_dr_islam_logo()
