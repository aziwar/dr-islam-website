# Dynamic Gallery Upload System - Setup Guide

## Overview
A complete dynamic before/after photo gallery system for Dr. Islam Elsagher's dental website. Allows staff to upload patient photos with admin approval workflow.

## Features
- ✅ **Secure Upload**: Admin token-protected file uploads
- ✅ **Image Processing**: Auto-conversion to WebP with responsive sizes
- ✅ **Approval Workflow**: Cases require admin approval before public display
- ✅ **R2 Storage**: Images stored in Cloudflare R2 bucket
- ✅ **KV Metadata**: Case metadata stored in Cloudflare KV
- ✅ **Admin Interface**: Complete web-based admin panel
- ✅ **Public API**: RESTful API for gallery management
- ✅ **Responsive Design**: Mobile-optimized gallery display

## Setup Instructions

### 1. Create KV Namespace
```bash
# Create production KV namespace
npx wrangler kv:namespace create "GALLERY_KV"

# Create preview KV namespace for development
npx wrangler kv:namespace create "GALLERY_KV" --preview
```

### 2. Update wrangler.toml
Replace the placeholder values in `wrangler.toml`:
```toml
# KV namespace for gallery metadata
[[kv_namespaces]]
binding = "GALLERY_KV"
id = "your-actual-kv-namespace-id"
preview_id = "your-actual-kv-preview-id"

# Environment variables
[vars]
ADMIN_TOKEN = "your-secure-admin-token-here"
```

### 3. Generate Secure Admin Token
```bash
# Generate a secure random token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy to Cloudflare Workers
```bash
npm run deploy
```

## Usage Guide

### Admin Access
1. Navigate to: `https://dr-elsagher.com/admin/gallery`
2. Enter your admin token when prompted
3. Upload before/after photos with case details
4. Approve cases to make them public

### API Endpoints

#### Upload Case (Admin only)
```
POST /api/gallery/upload
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: multipart/form-data

FormData:
- beforeImage: File
- afterImage: File
- title: String
- category: String (implants|cosmetic|orthodontic|restoration|surgery)
- description: String (optional)
- treatmentType: String (optional)
- patientConsent: Boolean (required)
```

#### Get Public Gallery
```
GET /api/gallery/public?category=all&limit=12

Response:
{
  "success": true,
  "cases": [
    {
      "id": "case_xxx",
      "title": "Dental Implant Case",
      "category": "implants",
      "description": "Single tooth replacement",
      "beforeImage": "assets/case_xxx_before.webp",
      "afterImage": "assets/case_xxx_after.webp",
      "beforeImageResponsive": {
        "320w": "assets/case_xxx_before-320w.webp",
        "768w": "assets/case_xxx_before-768w.webp"
      },
      "afterImageResponsive": {
        "320w": "assets/case_xxx_after-320w.webp", 
        "768w": "assets/case_xxx_after-768w.webp"
      }
    }
  ],
  "total": 1
}
```

#### Admin Endpoints (Require Auth)
- `GET /api/gallery/list?status=pending` - List cases by status
- `POST /api/gallery/approve/{caseId}` - Approve a case
- `DELETE /api/gallery/delete/{caseId}` - Delete a case

### Integrating with Website

#### Method 1: Direct HTML (Recommended)
```javascript
// In your content files (en.js, ar.js)
import { DynamicGallery } from './components/DynamicGallery.js';

// Add to your HTML content
const galleryHTML = DynamicGallery.generateGalleryHTML('all', 'main-gallery');
const tabsHTML = DynamicGallery.generateCategoryTabs();

// Include in your page content
const pageContent = `
  <section class="gallery-section">
    <h2>Before & After Gallery</h2>
    ${tabsHTML}
    ${galleryHTML}
  </section>
`;
```

#### Method 2: Replace Static Gallery
Replace existing static gallery sections with:
```html
<div id="dynamic-gallery-implants"></div>
<script>
  // This will auto-load when page loads
  const galleryHTML = DynamicGallery.generateGalleryHTML('implants', 'dynamic-gallery-implants');
  document.getElementById('dynamic-gallery-implants').innerHTML = galleryHTML;
</script>
```

## File Structure
```
src/
├── utils/
│   ├── gallery-manager.js    # Core gallery management logic
│   ├── gallery-api.js        # RESTful API endpoints
│   └── ...
├── content/
│   └── components/
│       └── DynamicGallery.js # Frontend gallery component
└── index.js                  # Main Worker (updated with gallery routes)
```

## Security Features

### Authentication
- Bearer token authentication for all admin operations
- Token validation on every protected request
- No authentication required for public gallery viewing

### File Validation
- File type validation (JPEG, PNG, WebP only)
- File size limits (10MB maximum)
- Patient consent checkbox required

### Data Protection
- Images stored in private R2 bucket
- Metadata stored in encrypted KV namespace
- No sensitive patient information stored

## Monitoring & Maintenance

### Logs
All gallery operations are logged with:
- Upload events with case IDs
- Approval/rejection actions
- Error tracking
- Performance metrics

### Database Cleanup
Periodically review and clean up:
- Rejected cases older than 30 days
- Orphaned image files
- KV namespace usage

### Backup Strategy
- R2 bucket: Enable versioning for image backup
- KV namespace: Export data periodically
- Admin token: Rotate every 6 months

## Troubleshooting

### Common Issues

1. **"Unauthorized" Error**
   - Check admin token in wrangler.toml
   - Ensure token is passed correctly in Authorization header

2. **Images Not Uploading**
   - Verify R2 bucket permissions
   - Check file size and format
   - Review Worker logs for errors

3. **Gallery Not Loading**
   - Check KV namespace configuration
   - Verify API endpoints are accessible
   - Review browser console for JavaScript errors

4. **Permission Denied**
   - Ensure GALLERY_KV binding is correct
   - Verify wrangler.toml configuration
   - Check Cloudflare dashboard settings

### Debug Mode
Enable debug logging by setting environment variable:
```toml
[vars]
DEBUG_MODE = "true"
```

## Cost Optimization

### R2 Storage
- Images stored once, accessed via CDN
- Responsive sizes reduce bandwidth
- Automatic caching reduces costs

### KV Operations
- Efficient indexing system
- Minimal read/write operations
- Pagination for large datasets

### Worker Execution
- Optimized image processing
- Minimal memory usage
- Fast response times

## Roadmap

### Phase 2 Enhancements
- [ ] Image compression optimization
- [ ] Batch upload capability
- [ ] Case categories management
- [ ] Patient consent tracking
- [ ] Analytics dashboard
- [ ] Email notifications for approvals

### Phase 3 Features
- [ ] Advanced image editing
- [ ] Video support
- [ ] Client portal access
- [ ] Integration with practice management software

## Support
For technical support or feature requests, refer to the main project documentation or contact the development team.