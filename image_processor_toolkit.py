"""
Advanced Image Processing Toolkit v1.0
GPU-accelerated background removal for multiple website projects
Author: AI Assistant & Ahmed Ziwar
Date: 2025-07-08

Features:
- Multiple background removal methods
- GPU acceleration support
- Reusable across projects
- Automatic fallback to CPU
"""

import os
import sys
import json
import time
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union
from datetime import datetime
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('ImageProcessor')

# Configuration file path
CONFIG_PATH = Path.home() / '.image_processor' / 'config.json'
class GPUManager:
    """Handle GPU detection and configuration"""
    
    def __init__(self):
        self.has_cuda = False
        self.has_gpu = False
        self.device = 'cpu'
        self.gpu_name = None
        self.check_gpu()
    
    def check_gpu(self):
        """Check GPU availability"""
        try:
            import torch
            self.has_cuda = torch.cuda.is_available()
            if self.has_cuda:
                self.has_gpu = True
                self.device = 'cuda:0'
                self.gpu_name = torch.cuda.get_device_name(0)
                logger.info(f"✓ GPU detected: {self.gpu_name}")
            else:
                logger.warning("✗ CUDA not available - using CPU")
        except Exception as e:
            logger.error(f"GPU check failed: {e}")
            
        # Try CuPy for transparent-background
        try:
            import cupy
            logger.info("✓ CuPy available for GPU acceleration")
        except ImportError:
            logger.info("CuPy not installed - GPU acceleration limited")
class BackgroundRemover:
    """Multi-method background removal"""
    
    def __init__(self, method='auto', gpu_manager=None):
        self.method = method
        self.gpu = gpu_manager or GPUManager()
        self.remover = None
        self.available_methods = []
        self._init_methods()
    
    def _init_methods(self):
        """Initialize available removal methods"""
        # Method 1: transparent-background (BEST)
        try:
            from transparent_background import Remover
            self.available_methods.append('transparent-background')
            if self.method in ['auto', 'transparent-background']:
                self.remover = Remover(
                    mode='base-nightly',  # Latest model
                    jit=True,
                    device=self.gpu.device,
                    resize='dynamic'
                )
                logger.info("✓ Using transparent-background with GPU" if self.gpu.has_gpu else "✓ Using transparent-background with CPU")
        except Exception as e:
            logger.warning(f"transparent-background unavailable: {e}")
            
        # Method 2: rembg (FALLBACK)
        if not self.remover:
            try:
                from rembg import remove
                self.available_methods.append('rembg')
                logger.info("✓ Using rembg as fallback")
            except ImportError:
                logger.warning("rembg not available")
    
    def process(self, image, output_type='rgba'):
        """Process image with best available method"""
        if self.remover and 'transparent-background' in self.available_methods:
            return self.remover.process(image, type=output_type)
        elif 'rembg' in self.available_methods:
            from PIL import Image
            import io
            if isinstance(image, Image.Image):
                buffer = io.BytesIO()
                image.save(buffer, format='PNG')
                img_data = buffer.getvalue()
            else:
                img_data = image
            from rembg import remove
            result = remove(img_data)
            return Image.open(io.BytesIO(result))
        else:
            raise RuntimeError("No background removal method available")

class ImageProcessor:
    """Main processing class for multiple projects"""
    
    def __init__(self, config_path=None):
        self.config_path = config_path or CONFIG_PATH
        self.gpu = GPUManager()
        self.remover = BackgroundRemover(gpu_manager=self.gpu)
        self.load_config()
        
    def load_config(self):
        """Load or create configuration"""
        self.config_path.parent.mkdir(exist_ok=True)
        if self.config_path.exists():
            with open(self.config_path, 'r') as f:
                self.config = json.load(f)
        else:
            self.config = {
                'output_formats': ['png', 'webp'],
                'sizes': {
                    'logo': {'main': (400, 150), 'mobile': (300, 115), 'favicon': (32, 32)},
                    'product': {'large': (1200, 1200), 'medium': (600, 600), 'thumb': (150, 150)},
                    'hero': {'desktop': (1920, 1080), 'mobile': (768, 1024)}
                },
                'gpu_enabled': True,
                'cache_models': True
            }
            self.save_config()
    
    def save_config(self):
        with open(self.config_path, 'w') as f:
            json.dump(self.config, f, indent=2)
    
    def process_image(self, input_path, output_dir, project_type='logo', sizes=None):
        """Process single image"""
        from PIL import Image
        
        input_path = Path(input_path)
        output_dir = Path(output_dir)
        output_dir.mkdir(exist_ok=True)
        
        # Load and process
        start_time = time.time()
        logger.info(f"Processing: {input_path.name}")
        
        image = Image.open(input_path).convert('RGBA')
        
        # Convert RGBA to RGB for transparent-background compatibility
        if image.mode == 'RGBA':
            rgb_image = Image.new('RGB', image.size, (255, 255, 255))
            rgb_image.paste(image, mask=image.split()[3])
            processed = self.remover.process(rgb_image, output_type='rgba')
        else:
            processed = self.remover.process(image, output_type='rgba')
        
        # Auto-crop with GPU acceleration
        import numpy as np
        try:
            import cupy as cp
            CUPY_AVAILABLE = True
        except:
            CUPY_AVAILABLE = False
        
        arr = np.array(processed)
        if arr.shape[2] == 4:  # Has alpha
            if CUPY_AVAILABLE:
                # GPU-accelerated cropping
                gpu_arr = cp.asarray(arr)
                alpha = gpu_arr[:,:,3]
                rows = cp.any(alpha > 0, axis=1)
                cols = cp.any(alpha > 0, axis=0)
                y_indices = cp.where(rows)[0]
                x_indices = cp.where(cols)[0]
                if len(y_indices) > 0 and len(x_indices) > 0:
                    y_min, y_max = int(y_indices[0]), int(y_indices[-1])
                    x_min, x_max = int(x_indices[0]), int(x_indices[-1])
                else:
                    y_min = y_max = x_min = x_max = 0
            else:
                # CPU fallback
                alpha = arr[:,:,3]
                rows = np.any(alpha, axis=1)
                cols = np.any(alpha, axis=0)
                y_min, y_max = np.where(rows)[0][[0, -1]]
                x_min, x_max = np.where(cols)[0][[0, -1]]
            padding = 10
            y_min = max(0, y_min - padding)
            x_min = max(0, x_min - padding)
            y_max = min(arr.shape[0], y_max + padding)
            x_max = min(arr.shape[1], x_max + padding)
            processed = processed.crop((x_min, y_min, x_max, y_max))
        
        # Generate sizes
        sizes = sizes or self.config['sizes'].get(project_type, {})
        results = {}        
        for size_name, (width, height) in sizes.items():
            # Calculate aspect preserving dimensions
            aspect = processed.width / processed.height
            target_aspect = width / height
            
            if aspect > target_aspect:
                new_width = width
                new_height = int(width / aspect)
            else:
                new_height = height
                new_width = int(height * aspect)
            
            # Resize and center
            resized = processed.resize((new_width, new_height), Image.Resampling.LANCZOS)
            canvas = Image.new('RGBA', (width, height), (0, 0, 0, 0))
            x = (width - new_width) // 2
            y = (height - new_height) // 2
            canvas.paste(resized, (x, y), resized)
            
            # Save in multiple formats
            for fmt in self.config['output_formats']:
                filename = f"{input_path.stem}-{size_name}.{fmt}"
                filepath = output_dir / filename
                
                if fmt == 'webp':
                    canvas.save(filepath, 'WEBP', quality=95, method=6)
                else:
                    canvas.save(filepath, 'PNG', optimize=True)
                
                results[f"{size_name}_{fmt}"] = filepath        
        elapsed = time.time() - start_time
        logger.info(f"✓ Processed in {elapsed:.2f}s using {self.gpu.device}")
        return results

    def batch_process(self, input_dir, output_dir, project_type='logo'):
        """Process multiple images"""
        input_dir = Path(input_dir)
        images = list(input_dir.glob('*.png')) + list(input_dir.glob('*.jpg'))
        
        results = {}
        for img_path in images:
            try:
                results[img_path.name] = self.process_image(
                    img_path, output_dir, project_type
                )
            except Exception as e:
                logger.error(f"Failed {img_path.name}: {e}")
        
        return results


# Quick test
if __name__ == "__main__":
    processor = ImageProcessor()
    
    # Test GPU
    print(f"\nGPU Status: {processor.gpu.has_gpu}")
    print(f"Device: {processor.gpu.device}")
    print(f"Methods: {processor.remover.available_methods}")
    
    print("\nReady to process images!")