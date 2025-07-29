#!/bin/bash

# Enhanced AVIF Image Generation Script for Dr. Islam Website
# This script converts existing WebP images to AVIF format with optimized quality settings

echo "🚀 Enhanced AVIF Image Generation Starting..."
echo "📅 $(date)"
echo ""

# Create AVIF directory if it doesn't exist
mkdir -p assets/avif-optimized

# Performance tracking
start_time=$(date +%s)
total_files=0
converted_files=0
total_savings=0

# Enhanced function to convert WebP to AVIF with performance tracking
convert_to_avif() {
    local input_file="$1"
    local output_file="$2"
    local quality_preset="${3:-80}"
    
    total_files=$((total_files + 1))
    
    if [ ! -f "$input_file" ]; then
        echo "⚠️  Source file not found: $input_file"
        return 1
    fi
    
    echo "🔄 Converting: $(basename "$input_file")"
    echo "   Input: $input_file"
    echo "   Output: $output_file"
    
    # Choose encoder with optimized settings
    local conversion_success=false
    
    if command -v avifenc &> /dev/null; then
        # Use avifenc with optimized settings for web
        echo "   Using: avifenc (libavif)"
        if avifenc --min 0 --max "$quality_preset" --speed 4 --jobs 4 \
                  --yuv 420 --depth 8 "$input_file" "$output_file" 2>/dev/null; then
            conversion_success=true
        fi
    elif command -v magick &> /dev/null; then
        # Use ImageMagick with AVIF support
        echo "   Using: ImageMagick"
        if magick "$input_file" -quality "$quality_preset" -define avif:speed=4 \
                 "$output_file" 2>/dev/null; then
            conversion_success=true
        fi
    elif command -v ffmpeg &> /dev/null; then
        # Use FFmpeg as alternative
        echo "   Using: FFmpeg"
        if ffmpeg -i "$input_file" -c:v libaom-av1 -crf 30 -b:v 0 \
                  "$output_file" -y 2>/dev/null; then
            conversion_success=true
        fi
    else
        echo "❌ No AVIF encoder found!"
        echo "   Please install one of: libavif-tools, ImageMagick with AVIF support, or FFmpeg"
        return 1
    fi
    
    if [ "$conversion_success" = true ] && [ -f "$output_file" ]; then
        # Calculate file sizes and savings
        local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
        local avif_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
        local savings_bytes=$((original_size - avif_size))
        local savings_percent=$((100 - (avif_size * 100 / original_size)))
        
        # Format file sizes
        local original_kb=$((original_size / 1024))
        local avif_kb=$((avif_size / 1024))
        
        converted_files=$((converted_files + 1))
        total_savings=$((total_savings + savings_bytes))
        
        echo "✅ Success: ${original_kb}KB → ${avif_kb}KB (${savings_percent}% reduction)"
        echo ""
    else
        echo "❌ Failed to convert: $input_file"
        echo ""
        return 1
    fi
}

# Convert WebP images to AVIF
echo "Converting WebP images to AVIF..."

# Gallery case images
convert_to_avif "assets/webp-optimized/case3-before.webp" "assets/avif-optimized/case3-before.avif"
convert_to_avif "assets/webp-optimized/case3-after.webp" "assets/avif-optimized/case3-after.avif"
convert_to_avif "assets/webp-optimized/real-case1.webp" "assets/avif-optimized/real-case1.avif"
convert_to_avif "assets/webp-optimized/real-case2.webp" "assets/avif-optimized/real-case2.avif"

# Doctor showcase image
convert_to_avif "assets/webp-optimized/showcase.webp" "assets/avif-optimized/showcase.avif"

# Logo images
convert_to_avif "assets/webp-optimized/logo-icon.webp" "assets/avif-optimized/logo-icon.avif"

# Responsive variants - Case images
convert_to_avif "assets/webp-optimized/case3-before-320w.webp" "assets/avif-optimized/case3-before-320w.avif"
convert_to_avif "assets/webp-optimized/case3-before-768w.webp" "assets/avif-optimized/case3-before-768w.avif"
convert_to_avif "assets/webp-optimized/case3-after-320w.webp" "assets/avif-optimized/case3-after-320w.avif"
convert_to_avif "assets/webp-optimized/case3-after-768w.webp" "assets/avif-optimized/case3-after-768w.avif"

convert_to_avif "assets/webp-optimized/real-case1-320w.webp" "assets/avif-optimized/real-case1-320w.avif"
convert_to_avif "assets/webp-optimized/real-case1-768w.webp" "assets/avif-optimized/real-case1-768w.avif"
convert_to_avif "assets/webp-optimized/real-case2-320w.webp" "assets/avif-optimized/real-case2-320w.avif"
convert_to_avif "assets/webp-optimized/real-case2-768w.webp" "assets/avif-optimized/real-case2-768w.avif"

# Responsive variants - Doctor showcase
convert_to_avif "assets/webp-optimized/showcase-320w.webp" "assets/avif-optimized/showcase-320w.avif"
convert_to_avif "assets/webp-optimized/showcase-768w.webp" "assets/avif-optimized/showcase-768w.avif"

# Responsive variants - Logo
convert_to_avif "assets/webp-optimized/logo-icon-320w.webp" "assets/avif-optimized/logo-icon-320w.avif"
convert_to_avif "assets/webp-optimized/logo-icon-768w.webp" "assets/avif-optimized/logo-icon-768w.avif"

# Calculate final statistics
end_time=$(date +%s)
duration=$((end_time - start_time))
total_savings_mb=$((total_savings / 1024 / 1024))
total_savings_kb=$((total_savings / 1024))

echo ""
echo "📊 AVIF Generation Complete!"
echo "=================================================="
echo "⏱️  Duration: ${duration} seconds"
echo "📁 Total files processed: $total_files"
echo "✅ Successfully converted: $converted_files"
echo "❌ Failed conversions: $((total_files - converted_files))"
echo ""
echo "💾 Space Savings:"
if [ $total_savings_mb -gt 0 ]; then
    echo "   Total saved: ${total_savings_mb}MB (${total_savings_kb}KB)"
else
    echo "   Total saved: ${total_savings_kb}KB"
fi
echo ""
echo "🚀 Performance Benefits:"
echo "   • ~30-50% smaller files than WebP"
echo "   • ~60-80% smaller files than JPEG"
echo "   • Better quality at same file size"
echo "   • Progressive loading support"
echo "   • Hardware-accelerated decoding"
echo ""
echo "🌐 Browser Support:"
echo "   • Chrome 85+ ✅"
echo "   • Firefox 93+ ✅"
echo "   • Safari 16+ ✅"
echo "   • Edge 85+ ✅"
echo "   • Automatic fallback to WebP/JPEG ✅"
echo ""
echo "📁 AVIF images saved to: assets/avif-optimized/"
echo ""
echo "🔧 Integration:"
echo "   The website will automatically serve AVIF images"
echo "   to supported browsers with seamless fallbacks."
echo ""
echo "🎯 Next Steps:"
echo "   1. Test the website in different browsers"
echo "   2. Monitor Core Web Vitals improvements"
echo "   3. Check browser dev tools for format selection"
echo ""
echo "✨ AVIF optimization complete!"