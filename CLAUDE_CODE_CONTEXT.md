# dr-islam-website Quick Context

## Architecture
- Platform: Cloudflare Workers
- URL: https://dr-elsagher.com
- Languages: Arabic (RTL) + English
- Brand Colors: #BEB093, #777669

## Key Files
- `/src/worker.js` - Main worker
- `/src/content/ar.js` - Arabic content
- `/src/content/en.js` - English content
- `/src/content/styles.js` - Shared styles

## Constraints
- 10ms CPU limit (Workers)
- RTL-first design
- Zero hosting cost
- No external forms (use WhatsApp)

## Common Tasks
1. Update content → edit ar.js/en.js
2. Style changes → edit styles.js
3. Deploy → git push (triggers auto-deploy)

## Known Issues
- RTL breaks with position:absolute
- Forms need external service
- Cache headers already optimized