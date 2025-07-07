# Smart Logo Extractor - Installation & Usage Guide

## Features
- **Automatic background removal** using AI (rembg)
- **Smart cropping** to remove empty space
- **Multiple sizes** generated automatically
- **Maintains aspect ratio** for all versions
- **Creates backups** with timestamps

## Installation

### Step 1: Install Python (if not installed)
Download from: https://www.python.org/downloads/

### Step 2: Install Required Libraries
```bash
pip install rembg pillow opencv-python numpy
```

### Step 3: First-time rembg setup
The first run will download the AI model (~170MB):
```bash
python -c "from rembg import remove; print('Setup complete!')"
```

## Usage

### Method 1: Drag & Drop
1. Save your logo screenshots as PNG or JPG
2. Place them in the same folder as the script
3. Run: `python smart_logo_extractor.py`
4. Select which image to process

### Method 2: Direct Path
```bash
python smart_logo_extractor.py "path/to/your/screenshot.png"
```

## Output
The script creates:
- `logo-main.png` (400×150px) - Desktop version
- `logo-mobile.png` (300×115px) - Mobile version
- `logo-white.png` - White background version
- `logo-dark.png` - Transparent version
- `logo-favicon.png` (32×32px) - Browser icon
- Timestamped backups of each

## Troubleshooting

### "Module not found" error
Run: `pip install [module_name]`

### Poor background removal
- Use screenshots with good contrast
- Avoid complex/textured backgrounds
- Try different lighting/angles

### Memory issues
- Close other applications
- Use smaller input images
- Try the simple version (see below)

## Alternative: Simple Version
If rembg doesn't work, use `simple_logo_extractor.py` which uses color-based removal instead.