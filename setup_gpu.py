"""
Image Processor CUDA Setup Guide
"""

import subprocess
import sys

print("=== GPU ACCELERATION SETUP ===\n")

# Check current status
print("1. CHECKING CURRENT STATUS...")
subprocess.run([sys.executable, "-c", """
import torch
print(f'PyTorch CUDA: {torch.cuda.is_available()}')
if torch.cuda.is_available():
    print(f'GPU: {torch.cuda.get_device_name(0)}')
else:
    print('CUDA NOT AVAILABLE - Need to install CUDA Toolkit')
"""])

print("\n2. NEXT STEPS FOR GPU ACCELERATION:")
print("   a) Download CUDA Toolkit 12.1:")
print("      https://developer.nvidia.com/cuda-12-1-0-download-archive")
print("   b) Download cuDNN 8.9:")
print("      https://developer.nvidia.com/cudnn")
print("   c) Restart after installation")
print("   d) pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121")

print("\n3. FOR NOW - Using CPU mode with transparent-background")
print("   First run downloads model (~170MB)")
print("\n4. SAVE CONFIG GLOBALLY:")
subprocess.run([sys.executable, "-m", "pip", "config", "set", "global.index-url", "https://download.pytorch.org/whl/cu121"])

print("\n✓ Config saved for future GPU installs")
