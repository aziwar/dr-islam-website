from PIL import Image, ImageDraw, ImageFont
import os

# Create directory if it doesn't exist
os.makedirs('assets/before-after', exist_ok=True)

# Create placeholder images
cases = [
    ("Case 1: Teeth Whitening", "#999999", "#FFFFFF"),
    ("Case 2: Alignment", "#B8860B", "#FFD700"),
    ("Case 3: Restoration", "#8B4513", "#F5DEB3")
]

for i, (case_name, before_color, after_color) in enumerate(cases, 1):
    # Create before image
    before_img = Image.new('RGB', (600, 400), before_color)
    draw_before = ImageDraw.Draw(before_img)
    draw_before.text((300, 200), "BEFORE", anchor="mm", fill="white", font=None)
    before_img.save(f'assets/before-after/case{i}-before.jpg', quality=85)
    
    # Create after image
    after_img = Image.new('RGB', (600, 400), after_color)
    draw_after = ImageDraw.Draw(after_img)
    draw_after.text((300, 200), "AFTER", anchor="mm", fill="black", font=None)
    after_img.save(f'assets/before-after/case{i}-after.jpg', quality=85)

print("Placeholder images created successfully!")
