from PIL import Image
import torch
print(f"CUDA available: {torch.cuda.is_available()}")

# Simple test
img = Image.open("assets/images/logo-main.png")
print(f"Image mode: {img.mode}, Size: {img.size}")

# Convert RGBA to RGB if needed
if img.mode == 'RGBA':
    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
    rgb_img.paste(img, mask=img.split()[3])
    rgb_img.save("test_rgb.png")
    print("Converted to RGB")
