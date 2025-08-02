/**
 * Placeholder Image System for Dr. Islam Dental Website
 * Generates SVG placeholders for missing images
 */

export const PlaceholderImages = {
    // Professional headshot placeholder
    doctorPhoto: (width = 400, height = 400) => `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#BEB093"/>
            <circle cx="${width/2}" cy="${height*0.35}" r="${width*0.15}" fill="white" opacity="0.9"/>
            <path d="M${width*0.3} ${height*0.6} Q${width*0.5} ${height*0.5} ${width*0.7} ${height*0.6} 
                     Q${width*0.7} ${height*0.8} ${width*0.3} ${height*0.8} Z" fill="white" opacity="0.9"/>
            <text x="${width/2}" y="${height*0.9}" text-anchor="middle" fill="white" font-family="Arial" font-size="${width*0.06}">
                Dr. Islam Elsagher
            </text>
        </svg>
    `,

    // Institution logo placeholder
    institutionLogo: (name, width = 120, height = 120) => `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#F8F7F5" stroke="#BEB093" stroke-width="2"/>
            <circle cx="${width/2}" cy="${height*0.4}" r="${width*0.2}" fill="#BEB093" opacity="0.3"/>
            <text x="${width/2}" y="${height*0.7}" text-anchor="middle" fill="#8B4513" 
                  font-family="Arial" font-size="${Math.min(width, height)*0.12}" font-weight="bold">
                ${name.substring(0, 8)}
            </text>
            <text x="${width/2}" y="${height*0.85}" text-anchor="middle" fill="#8B4513" 
                  font-family="Arial" font-size="${Math.min(width, height)*0.08}">
                Institution
            </text>
        </svg>
    `,

    // Certificate placeholder
    certificate: (title, width = 300, height = 200) => `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#F8F7F5" stroke="#BEB093" stroke-width="3"/>
            <rect x="20" y="20" width="${width-40}" height="${height-40}" fill="none" stroke="#BEB093" stroke-width="1"/>
            <circle cx="${width/2}" cy="${height*0.3}" r="15" fill="#BEB093"/>
            <text x="${width/2}" y="${height*0.5}" text-anchor="middle" fill="#8B4513" 
                  font-family="Arial" font-size="14" font-weight="bold">
                Certificate
            </text>
            <text x="${width/2}" y="${height*0.65}" text-anchor="middle" fill="#8B4513" 
                  font-family="Arial" font-size="10">
                ${title.substring(0, 20)}
            </text>
            <text x="${width/2}" y="${height*0.8}" text-anchor="middle" fill="#8B4513" 
                  font-family="Arial" font-size="8">
                Dr. Islam Elsagher
            </text>
        </svg>
    `,

    // Before/after treatment placeholder
    treatmentPhoto: (type = "before", width = 300, height = 200) => `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${type === 'before' ? '#E8E8E8' : '#F0F8FF'}"/>
            <rect x="10" y="10" width="${width-20}" height="${height-20}" fill="white" opacity="0.8"/>
            <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)*0.2}" 
                    fill="${type === 'before' ? '#D3D3D3' : '#98FB98'}" opacity="0.7"/>
            <text x="${width/2}" y="${height*0.3}" text-anchor="middle" fill="#666" 
                  font-family="Arial" font-size="16" font-weight="bold">
                ${type.toUpperCase()}
            </text>
            <text x="${width/2}" y="${height*0.7}" text-anchor="middle" fill="#666" 
                  font-family="Arial" font-size="12">
                Treatment Photo
            </text>
        </svg>
    `,

    // Convert SVG to data URL
    toDataUrl: (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
};

// Usage examples:
export const generatePlaceholders = () => {
    return {
        'dr-islam.jpg': PlaceholderImages.toDataUrl(PlaceholderImages.doctorPhoto(400, 400)),
        'logo-icon.webp': PlaceholderImages.toDataUrl(PlaceholderImages.institutionLogo('University', 120, 120)),
        'before-1.jpg': PlaceholderImages.toDataUrl(PlaceholderImages.treatmentPhoto('before', 300, 200)),
        'after-1.jpg': PlaceholderImages.toDataUrl(PlaceholderImages.treatmentPhoto('after', 300, 200)),
        'certificate-1.jpg': PlaceholderImages.toDataUrl(PlaceholderImages.certificate('Dental License', 300, 200))
    };
};