from PIL import Image, ImageDraw, ImageFont
import os

# Create favicon with brand colors
sizes = [(16, 16), (32, 32), (48, 48)]

for width, height in sizes:
    # Create image with brand gold background
    img = Image.new('RGB', (width, height), color='#BEB093')
    draw = ImageDraw.Draw(img)
    
    # Draw the letter 'د' in dark gray
    try:
        # Adjust font size based on icon size
        font_size = int(height * 0.7)
        font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    # Center the text
    text = 'د'
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 2  # Slight upward adjustment
    
    draw.text((x, y), text, font=font, fill='#777669')
    
    # Save PNG files
    if width == 16:
        img.save('favicon-16x16.png')
    elif width == 32:
        img.save('favicon-32x32.png')
        # Also save as main favicon.ico
        img.save('favicon.ico', format='ICO')

print("Favicon files created successfully!")