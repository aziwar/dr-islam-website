# Architecture - dr-islam-website

## Current State
- **Platform**: Cloudflare Workers (Edge)
- **Language**: Vanilla HTML/CSS/JS
- **Database**: None (static site)
- **Analytics**: Google Analytics 4
- **Forms**: External (Formspree planned)

## File Structure
```
├── index.html          # Arabic (RTL)
├── index-en.html       # English (LTR) - MISSING
├── worker-seo.js       # Active SEO handler
├── worker.js           # UNUSED - remove
├── worker-optimized.js # UNUSED - remove
└── wrangler.toml       # Cloudflare config
```

## Performance Targets
- First Paint: <500ms
- Total Load: <1s
- Worker Size: <1MB
- CPU Time: <10ms

## Deployment Flow
1. Local development
2. Test with `wrangler dev`
3. Deploy with `wrangler publish`
4. Verify at workers.dev URL
5. Switch custom domain

## Technical Decisions
- **Why Workers?** Zero-cost, global edge
- **Why Vanilla?** Minimal size, fast load
- **Why No Framework?** Simple requirements
- **Why External Forms?** Workers limitation