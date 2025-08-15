# AGENTS.md - Dr. Islam Website Development Guidelines

## 🤖 For AI Agents (Jules, etc.)

### CRITICAL BRAND REQUIREMENTS
**NEVER change these brand colors - they are core to Dr. Islam's identity:**
- Primary Gold: `#BEB093` (main brand color)  
- Secondary Gold: `#D4C5A3` (lighter variation)
- Accent Dark: `#8B7F6B` (darker variation)

**DO NOT create new color schemes. DO NOT ask about colors.**

### PROJECT ARCHITECTURE
- **Platform**: Cloudflare Workers (edge computing)
- **Languages**: Vanilla JavaScript + CSS-in-JS  
- **CSS Structure**: `core.css.js → components.css.js → enhancements.css.js`
- **Dual Language**: English (default) + Arabic RTL support (?lang=ar)
- **Auto-Deploy**: Changes push to production automatically

### RESPONSIVE REQUIREMENTS
Test ALL changes at these breakpoints:
- **Mobile**: 375px (priority #1)
- **Tablet**: 768px  
- **Desktop**: 1200px
- **Arabic**: Must work with RTL layout (?lang=ar parameter)

### PERFORMANCE CONSTRAINTS
- **Load Time**: Must stay under 2 seconds
- **Bundle Size**: Keep CSS minimal, use efficient selectors
- **Mobile First**: Optimize for mobile performance
- **No Heavy Dependencies**: Stick to vanilla JS patterns

### CODE PATTERNS
```javascript
// Security: Always validate
if (!authResult.valid) return error;

// Language detection
const lang = url.searchParams.get('lang') || 'en';

// CSS-in-JS pattern
const styles = `
  .component {
    color: var(--primary-gold);
    background: var(--secondary-gold);
  }
`;
```

### TESTING REQUIREMENTS
Before submitting PRs, verify:
- [ ] Mobile responsive (375px) works perfectly
- [ ] Arabic version (?lang=ar) displays correctly  
- [ ] All existing functionality preserved
- [ ] Page loads in under 2 seconds
- [ ] No console errors in browser
- [ ] Brand colors maintained throughout

### COMPONENT STRUCTURE
- **Services Section**: `src/templates/en/sections/services.js`
- **Testimonials**: `src/templates/en/sections/testimonials.js`  
- **Hero Section**: `src/templates/en/sections/hero.js`
- **CSS Styles**: `src/content/css/components.css.js`
- **Reference Components**: `src/components/herrington-medical/`

### ARABIC RTL SUPPORT
- Text direction: `direction: rtl` for Arabic
- Layout adjustments: Flex direction, margins, padding
- Icon placement: Mirror for RTL layouts
- Form alignment: Right-align labels and inputs

### GIT WORKFLOW
- Create feature branches: `feature/jules-task-name`
- Commit messages: Descriptive with scope
- PR titles: Clear task description
- Test before submitting PRs

### DEPLOYMENT NOTES
- Changes auto-deploy on merge to master
- Live site: https://dr-elsagher.com
- Dev server: `npm run dev` (http://127.0.0.1:8787)
- No manual deployment needed

### FORBIDDEN ACTIONS
- ❌ Changing brand colors (#BEB093, #D4C5A3, #8B7F6B)  
- ❌ Breaking Arabic RTL support
- ❌ Impacting loading performance (>2s)
- ❌ Modifying deployment pipeline
- ❌ Asking user questions (work autonomously)

### SUCCESS CRITERIA FOR ALL TASKS
✅ Professional appearance maintained
✅ Brand colors preserved
✅ Mobile-first responsive design  
✅ Arabic RTL compatibility
✅ Performance under 2 seconds
✅ Zero console errors
✅ Existing functionality intact