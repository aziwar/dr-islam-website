# Dr. Islam Website - Development Rules v1.0
Last Updated: 2025-07-06

## Core Principles
1. **READ-PLAN-ACTION** for all changes
2. **RTL-First** development (Arabic is primary)
3. **Zero-Cost** hosting on Cloudflare Workers
4. **Mobile-First** responsive design

## Mandatory Protocols

### Before ANY Code Change
1. Check current deployment status
2. Validate with Context7 (Trust Score 8+)
3. Test RTL compatibility
4. Document in COMPLIANCE_LOG.md

### File Operations
- Use Desktop Commander for all file ops
- Chunk writes to 25-30 lines max
- Always verify: write → get_file_info → confirm

### Deployment
- Test locally first
- Check worker size limits (<1MB)
- Validate all assets load under 100ms
- Update sitemap.xml for new pages

## Project Structure
```
/ (root)
├── index.html          # Arabic (primary)
├── index-en.html       # English version
├── css/style.css       # RTL-aware styles
├── js/script.js        # Minimal JS
├── worker-seo.js       # Active worker
└── .claude/            # Dev compliance
```

## Brand Standards
- Primary: #BEB093 (gold)
- Secondary: #777669 (gray)
- Font: Poppins
- Icons: Font Awesome 6

## Known Gotchas
1. RTL breaks with position:absolute
2. Cloudflare Workers 10ms CPU limit
3. WhatsApp links need country code
4. Forms require external service (Formspree)

## Compliance Tracking
Response counter: Required in all interactions
Context7 check: Before any library use
Memory sync: Qdrant + Graphiti dual storage

## Quick Checks
- [ ] RTL tested?
- [ ] Mobile responsive?
- [ ] Under 1MB total?
- [ ] Analytics working?
- [ ] SEO meta tags?