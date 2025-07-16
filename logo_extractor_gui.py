"""
Enhanced Logo Extractor with GUI
Automatic logo extraction with file picker
"""

import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import os
import sys
from pathlib import Path

# Check and install requirements
try:
    from rembg import remove
    from PIL import Image, ImageTk
    import numpy as np
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "pillow", "numpy"])
    from rembg import remove
    from PIL import Image, ImageTk
    import numpy as np

class LogoExtractorGUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Dr. Islam Logo Extractor")
        self.root.geometry("600x500")
        
        # Variables
        self.input_path = None
        self.output_dir = Path("assets/images")
        self.output_dir.mkdir(exist_ok=True)
        
        self.setup_ui()
    
    def setup_ui(self):
        """Create the user interface"""
        # Title
        title = tk.Label(self.root, text="Logo Extractor", font=("Arial", 20, "bold"))
        title.pack(pady=20)
        
        # File selection frame
        file_frame = tk.Frame(self.root)
        file_frame.pack(pady=10)
        
        tk.Button(file_frame, text="Select Logo Image", command=self.select_file,
                 bg="#4CAF50", fg="white", font=("Arial", 12), padx=20, pady=10).pack()
        
        self.file_label = tk.Label(file_frame, text="No file selected", fg="gray")
        self.file_label.pack(pady=5)
        
        # Preview frame
        self.preview_frame = tk.Frame(self.root, relief=tk.SUNKEN, bd=2)
        self.preview_frame.pack(pady=10, padx=20, fill=tk.BOTH, expand=True)
        
        self.preview_label = tk.Label(self.preview_frame, text="Preview will appear here", fg="gray")
        self.preview_label.pack(expand=True)
        
        # Progress bar
        self.progress = ttk.Progressbar(self.root, length=400, mode='determinate')
        self.progress.pack(pady=10)
        
        # Process button
        self.process_btn = tk.Button(self.root, text="Extract Logo", command=self.process_logo,
                                    bg="#2196F3", fg="white", font=("Arial", 14), padx=30, pady=15,
                                    state=tk.DISABLED)
        self.process_btn.pack(pady=20)    
    def select_file(self):
        """Open file dialog to select image"""
        self.input_path = filedialog.askopenfilename(
            title="Select Logo Image",
            filetypes=[
                ("Image files", "*.png *.jpg *.jpeg *.bmp *.gif"),
                ("All files", "*.*")
            ]
        )
        
        if self.input_path:
            self.file_label.config(text=f"Selected: {Path(self.input_path).name}")
            self.process_btn.config(state=tk.NORMAL)
            self.show_preview()
    
    def show_preview(self):
        """Show image preview"""
        try:
            img = Image.open(self.input_path)
            # Resize for preview
            img.thumbnail((300, 200), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(img)
            self.preview_label.config(image=photo, text="")
            self.preview_label.image = photo
        except Exception as e:
            self.preview_label.config(text=f"Preview error: {e}")
    
    def update_progress(self, value, message):
        """Update progress bar and status"""
        self.progress['value'] = value
        self.root.update()
        print(message)
    
    def remove_background(self, image_path):
        """Remove background using rembg"""
        self.update_progress(10, "Loading image...")
        
        with open(image_path, 'rb') as f:
            input_data = f.read()
        
        self.update_progress(30, "Removing background (this may take a moment)...")
        output_data = remove(input_data)
        
        # Save temp file
        temp_path = self.output_dir / "temp_no_bg.png"
        with open(temp_path, 'wb') as f:
            f.write(output_data)
        
        self.update_progress(50, "Background removed!")
        return Image.open(temp_path)    
    def auto_crop(self, image):
        """Auto-crop to remove empty space"""
        self.update_progress(60, "Auto-cropping...")
        
        img_array = np.array(image)
        
        if img_array.shape[2] == 4:  # Has alpha channel
            alpha = img_array[:, :, 3]
            rows = np.any(alpha, axis=1)
            cols = np.any(alpha, axis=0)
            
            if len(np.where(rows)[0]) > 0 and len(np.where(cols)[0]) > 0:
                y_min, y_max = np.where(rows)[0][[0, -1]]
                x_min, x_max = np.where(cols)[0][[0, -1]]
                
                padding = 10
                y_min = max(0, y_min - padding)
                x_min = max(0, x_min - padding)
                y_max = min(img_array.shape[0], y_max + padding)
                x_max = min(img_array.shape[1], x_max + padding)
                
                return image.crop((x_min, y_min, x_max, y_max))
        
        return image
    
    def resize_and_save(self, image):
        """Create and save all logo versions"""
        self.update_progress(70, "Creating logo versions...")
        
        sizes = {
            "main": (400, 150),
            "mobile": (300, 115),
            "white": (400, 150),
            "dark": (400, 150),
            "favicon": (32, 32)
        }
        
        saved_files = []
        
        for i, (name, size) in enumerate(sizes.items()):
            progress = 70 + (i * 5)
            self.update_progress(progress, f"Creating {name} version...")
            
            # Calculate aspect ratio
            aspect = image.width / image.height
            target_aspect = size[0] / size[1]
            
            if aspect > target_aspect:
                new_width = size[0]
                new_height = int(size[0] / aspect)
            else:
                new_height = size[1]
                new_width = int(size[1] * aspect)
            
            # Resize
            resized = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Create canvas
            canvas = Image.new('RGBA', size, (0, 0, 0, 0))
            x = (size[0] - new_width) // 2
            y = (size[1] - new_height) // 2
            canvas.paste(resized, (x, y), resized)
            
            # Special handling for white version
            if name == "white":
                white_bg = Image.new('RGBA', size, (255, 255, 255, 255))
                white_bg.paste(canvas, (0, 0), canvas)
                canvas = white_bg
            
            # Save
            filename = f"logo-{name}.png"
            filepath = self.output_dir / filename
            canvas.save(filepath, 'PNG', optimize=True)
            saved_files.append(filename)
        
        return saved_files    
    def process_logo(self):
        """Main processing function"""
        if not self.input_path:
            messagebox.showerror("Error", "Please select an image first!")
            return
        
        try:
            # Disable button during processing
            self.process_btn.config(state=tk.DISABLED)
            
            # Remove background
            no_bg_image = self.remove_background(self.input_path)
            
            # Auto-crop
            cropped = self.auto_crop(no_bg_image)
            
            # Create all versions
            saved_files = self.resize_and_save(cropped)
            
            # Complete
            self.update_progress(100, "Complete!")
            
            # Show success message
            message = f"Successfully created {len(saved_files)} logo files:\n\n"
            message += "\n".join(saved_files)
            message += f"\n\nSaved to: {self.output_dir.absolute()}"
            
            messagebox.showinfo("Success!", message)
            
            # Open output folder
            os.startfile(self.output_dir.absolute())
            
        except Exception as e:
            messagebox.showerror("Error", f"Processing failed:\n{str(e)}")
        finally:
            self.process_btn.config(state=tk.NORMAL)
            self.progress['value'] = 0
    
    def run(self):
        """Start the GUI"""
        self.root.mainloop()


def main():
    print("Starting Logo Extractor GUI...")
    app = LogoExtractorGUI()
    app.run()


if __name__ == "__main__":
    main()
