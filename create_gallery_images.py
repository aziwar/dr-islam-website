import os
from PIL import Image, ImageDraw, ImageFont

# Create before/after directory
os.makedirs('assets/before-after', exist_ok=True)

# Cases to create
cases = [
    ('case1', 'زراعة أسنان أمامية', 'Dental Implants'),
    ('case2', 'ابتسامة هوليوود', 'Hollywood Smile'),
    ('case3', 'علاج تقويمي', 'Orthodontic Treatment')
]

for case_name, ar_text, en_text in cases:
    for state in ['before', 'after']:
        # Create 600x400 image
        img = Image.new('RGB', (600, 400), color='#f0f0f0')
        draw = ImageDraw.Draw(img)
        
        # Add text
        text = f"{state.upper()}\n{en_text}"
        color = '#BEB093' if state == 'after' else '#777669'
        
        # Draw centered text
        draw.text((300, 200), text, fill=color, anchor="mm")
        
        # Save
        filename = f'assets/before-after/{case_name}-{state}.jpg'
        img.save(filename, quality=85)
        print(f"Created: {filename}")

print("\nGallery placeholders created successfully!")