# Logo Implementation Plan - Dr. Islam Website

## Current Situation
- Website currently uses inline SVG logo from `src/content/logo.js`
- User has provided new logo design with dental symbol and bilingual text
- Logo needs to work on different backgrounds (white, beige, dark)

## Implementation Strategy

### 1. **Logo Formats & Sizes**
Create the following versions:
- **logo-main.png** (400x150px) - High quality for desktop header
- **logo-mobile.png** (300x115px) - Optimized for mobile
- **logo-white.png** - Version for dark backgrounds
- **logo-dark.png** - Version for light backgrounds
- **favicon.png** (32x32, 16x16) - Browser icon

### 2. **File Structure**
```
assets/
└── images/
    ├── logo-main.png
    ├── logo-mobile.png
    ├── logo-white.png
    ├── logo-dark.png
    └── logo-ar.png (if needed for RTL)
```

### 3. **Implementation Steps**
1. **Convert Logo** - Save provided logo as PNG with transparency
2. **Create Variations** - Different sizes and background versions
3. **Update Worker** - Serve PNG files instead of SVG
4. **Update HTML** - Replace SVG with img tags
5. **Add Responsive CSS** - Switch logos based on screen size
6. **Optimize Loading** - Use lazy loading and preload

### 4. **Technical Considerations**
- Use `<picture>` element for responsive images
- Add `loading="eager"` for header logo
- Implement dark mode logo switching
- Ensure proper aspect ratio maintained
- Add alt text for accessibility

### 5. **Performance**
- Compress PNGs with TinyPNG
- Use WebP format with PNG fallback
- Preload critical logo in header
- Cache logos with long expiry

### 6. **Mobile Specific**
- Smaller file size for mobile version
- Center alignment on small screens
- Proper touch target size
- Consider retina displays (2x versions)