"""
Smart Logo Extractor v2 for Dr. Islam Website
Enhanced with better error handling and best practices
Date: 2025-07-08
"""

import os
import sys
import logging
from pathlib import Path
from typing import Dict, Tuple, Optional
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Check required libraries
REQUIRED_LIBS = {
    'rembg': 'rembg',
    'PIL': 'pillow',
    'cv2': 'opencv-python',
    'numpy': 'numpy'
}

def check_dependencies() -> bool:
    """Check if all required libraries are installed"""
    missing_libs = []
    
    for lib_import, lib_install in REQUIRED_LIBS.items():
        try:
            __import__(lib_import)
            logger.info(f"✓ {lib_install} is installed")
        except ImportError:
            missing_libs.append(lib_install)
            logger.error(f"✗ {lib_install} is NOT installed")
    
    if missing_libs:
        logger.error(f"Please install: pip install {' '.join(missing_libs)}")
        return False
    return True

# Import after dependency check
if check_dependencies():
    from rembg import remove
    from PIL import Image, ImageOps
    import cv2
    import numpy as np


class LogoExtractor:
    """Smart logo extraction with error handling"""
    
    def __init__(self, input_path: str):
        self.input_path = Path(input_path)
        if not self.input_path.exists():
            raise FileNotFoundError(f"Input file not found: {input_path}")
            
        self.output_dir = Path("assets/images")
        self.output_dir.mkdir(exist_ok=True)
        
        # Logo specifications
        self.sizes = {
            "main": (400, 150),
            "mobile": (300, 115),
            "favicon": (32, 32)
        }
        
        try:
            self.original = Image.open(self.input_path)
            logger.info(f"Loaded image: {self.original.size}")
        except Exception as e:
            raise ValueError(f"Failed to load image: {e}")    
    def remove_background(self) -> Optional[Image.Image]:
        """Remove background using AI with error handling"""
        logger.info("Removing background...")
        
        try:
            # Read and process with rembg
            with open(self.input_path, 'rb') as input_file:
                input_data = input_file.read()
                output_data = remove(input_data)
            
            # Save temporary file
            temp_path = self.output_dir / "temp_no_bg.png"
            with open(temp_path, 'wb') as output_file:
                output_file.write(output_data)
            
            self.no_bg_image = Image.open(temp_path)
            logger.info("✓ Background removed successfully")
            return self.no_bg_image
            
        except Exception as e:
            logger.error(f"Failed to remove background: {e}")
            # Fallback: return original with warning
            logger.warning("Using original image without background removal")
            return self.original
    
    def crop_to_content(self, image: Image.Image) -> Image.Image:
        """Auto-crop with error handling"""
        logger.info("Auto-cropping to content...")
        