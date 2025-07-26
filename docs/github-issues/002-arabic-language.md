# Issue #2: Implement Arabic Language Version [P0 - CRITICAL]

## Problem
Website only available in English despite serving Kuwait market where Arabic is primary language.

## Impact
- 70%+ of target audience prefers Arabic
- Lost patients due to language barrier
- Poor local SEO performance
- Competitor advantage

## Current State
- HTML has `lang="ar"` and `dir="rtl"` but content is English
- No language switcher implemented
- Arabic fonts loaded but unused

## Solution Tasks
1. **Content Translation**
   - Translate all UI text to Arabic
   - Medical terms accuracy review
   - RTL layout verification

2. **Technical Implementation**
   ```javascript
   // Add to src/content/ar.js
   export const HTML_AR = `<!DOCTYPE html>
   <html lang="ar" dir="rtl">
   <!-- Full Arabic content -->
   `
   ```

3. **Language Switcher**
   - Add toggle button in header
   - Store preference in localStorage
   - Update URLs: /ar/ and /en/

## Acceptance Criteria
- [ ] Complete Arabic translation
- [ ] Working language switcher
- [ ] RTL layout properly rendered
- [ ] Arabic SEO meta tags
- [ ] Bilingual sitemap.xml

**Labels:** feature, critical, i18n
**Assignee:** @aziwar
**Milestone:** MVP Launch
