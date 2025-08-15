#!/bin/bash

# Script to create Jules-optimized GitHub issues for Herrington integration
# Run: bash create-jules-herrington-issues.sh

echo "🚀 Creating Jules AI issues for Herrington theme integration..."

# Phase 1 - Foundation Integration

# Task 1.1: Color System Integration
gh issue create \
  --title "[JULES] Phase 1.1: Integrate Herrington Medical Color System" \
  --body "## 🎯 Context
Dr. Islam dental website using Cloudflare Workers + CSS-in-JS architecture
Current CSS: core.css.js → components.css.js → enhancements.css.js  
Languages: English/Arabic with RTL support
Completion: 44% (need customer-visible improvements fast)

## 📋 Task: Foundation Color System Integration
Integrate the Herrington medical color palette into existing CSS system while preserving all functionality.

## 📂 Files to Modify
**Primary**: \`src/content/css/core.css.js\`
**Reference**: \`src/content/css/herrington-medical.css.js\` (source palette)
**Test Against**: \`src/content/css/components.css.js\`

## ✅ Requirements Checklist
- [ ] Import medical color variables from herrington-medical.css.js
- [ ] Replace existing color system maintaining full compatibility
- [ ] Test responsive breakpoints: 375px, 768px, 1200px
- [ ] Ensure Arabic RTL color consistency (?lang=ar)
- [ ] Validate accessibility contrast ratios (WCAG 2.1 AA)
- [ ] Maintain auto-deploy compatibility
- [ ] No breaking changes to existing components

## 🎨 Color Palette to Implement
\`\`\`css
--medical-primary: #2c5aa0;     /* Professional blue */
--medical-secondary: #4a9d5f;   /* Health green */
--medical-accent: #d4af37;      /* Premium gold */
--medical-emergency: #dc3545;   /* Emergency red */
/* Full palette in herrington-medical.css.js */
\`\`\`

## 🧪 Testing Requirements
- **Responsive**: Test at 375px (mobile), 768px (tablet), 1200px (desktop)
- **Languages**: English (default) and Arabic (?lang=ar)
- **Performance**: Maintain <2s load time
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Accessibility**: Lighthouse accessibility score >90%

## ✅ Success Criteria  
- ✅ Professional medical color scheme applied site-wide
- ✅ All existing functionality preserved
- ✅ Mobile/tablet/desktop fully responsive  
- ✅ Arabic layout works correctly
- ✅ No console errors or warnings
- ✅ Improved visual appeal and professionalism

## 📚 Reference Documentation
- \`HERRINGTON_ADAPTATION_STRATEGY.md\` - Design guidelines
- \`CLAUDE.md\` - Project patterns and constraints
- \`src/content/css/herrington-medical.css.js\` - Source implementation

## 🚨 Critical Constraints
- **DO NOT** change the 3-file CSS structure
- **DO NOT** break existing Arabic RTL support
- **DO NOT** impact loading performance
- **DO NOT** modify deployment pipeline" \
  --label "jules,enhancement,high-priority,foundation,phase-1"

# Task 1.2: Typography Integration
gh issue create \
  --title "[JULES] Phase 1.2: Integrate Herrington Typography System" \
  --body "## 🎯 Context
Building on Phase 1.1 color integration, now implementing professional typography system.

## 📋 Task: Typography System Integration  
Integrate Herrington's professional typography (Inter + Playfair Display) into existing system.

## 📂 Files to Modify
**Primary**: \`src/content/css/core.css.js\`
**Secondary**: \`src/content/css/components.css.js\`
**Reference**: \`src/content/css/herrington-medical.css.js\`

## ✅ Requirements Checklist
- [ ] Implement Inter font for body text (with fallbacks)
- [ ] Add Playfair Display for elegant headings
- [ ] Update typography scale and hierarchy
- [ ] Ensure Arabic font rendering compatibility
- [ ] Maintain accessibility compliance (WCAG 2.1 AA)
- [ ] Test loading performance impact
- [ ] Optimize font loading strategy

## 🔤 Typography Implementation
\`\`\`css
--medical-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--medical-font-accent: 'Playfair Display', Georgia, serif;

/* Typography scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */ 
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
\`\`\`

## 🧪 Testing Requirements  
- **Arabic Compatibility**: Test Arabic text rendering with new fonts
- **Performance**: Font loading should not delay first paint
- **Responsive**: Typography scales properly across devices
- **Accessibility**: Sufficient contrast and readability

## ✅ Success Criteria
- ✅ Professional typography implemented site-wide
- ✅ Font loading optimized for performance
- ✅ Arabic text renders correctly
- ✅ Improved readability and hierarchy
- ✅ No CLS (Cumulative Layout Shift) issues" \
  --label "jules,enhancement,high-priority,foundation,phase-1"

# Phase 2 - Component Integration

# Task 2.1: Medical Service Cards
gh issue create \
  --title "[JULES] Phase 2.1: Implement Medical Service Cards Component" \
  --body "## 🎯 Context
Implementing customer-visible improvements using Herrington's professional service card design.

## 📋 Task: Medical Service Cards Integration
Integrate MedicalServiceCard component into services section with 6 dental services.

## 📂 Files to Modify
**Primary**: 
- \`src/templates/en/sections/services.js\`
- \`src/templates/ar/sections/services.js\` (create if needed)
**Secondary**: \`src/content/css/components.css.js\`
**Reference**: \`src/components/herrington-medical/MedicalServiceCard.js\`

## 🦷 Services to Implement
1. **General Dentistry** (طب الأسنان العام)
2. **Cosmetic Dentistry** (تجميل الأسنان) 
3. **Dental Implants** (زراعة الأسنان)
4. **Emergency Care** (رعاية الطوارئ)
5. **Orthodontics** (تقويم الأسنان)
6. **Pediatric Dentistry** (طب أسنان الأطفال)

## ✅ Requirements Checklist
- [ ] Import and integrate existing MedicalServiceCard.js
- [ ] Create 6 dental services with proper icons
- [ ] Implement both English and Arabic versions
- [ ] Add proper ARIA labels and accessibility
- [ ] Ensure smooth animations and hover effects
- [ ] Test scroll-triggered animations
- [ ] Validate mobile responsiveness
- [ ] Add click tracking for analytics

## 🎨 Design Requirements
- Professional card design with hover animations
- Service icons and feature lists
- Call-to-action buttons for each service
- Responsive grid layout
- Smooth scroll animations
- Touch-friendly mobile design

## 🧪 Testing Requirements
- **Mobile First**: Cards work on 375px screens
- **Arabic RTL**: Proper right-to-left layout
- **Animations**: 60fps smooth animations
- **Accessibility**: Screen reader compatible
- **Performance**: No impact on page load

## ✅ Success Criteria
- ✅ 6 professional service cards displayed
- ✅ English and Arabic versions working
- ✅ Smooth animations and interactions
- ✅ Mobile-friendly responsive design
- ✅ Improved visual appeal and trust" \
  --label "jules,enhancement,high-priority,components,phase-2"

# Task 2.2: Patient Testimonials
gh issue create \
  --title "[JULES] Phase 2.2: Create Patient Testimonials Section" \
  --body "## 🎯 Context  
Building trust with professional patient testimonials using Herrington design patterns.

## 📋 Task: Patient Testimonials Implementation
Create testimonials section using PatientTestimonial component with carousel.

## 📂 Files to Modify
**Primary**:
- \`src/templates/en/sections/testimonials.js\`
- \`src/templates/ar/sections/testimonials.js\`
**Secondary**: \`src/content/css/components.css.js\`
**Reference**: \`src/components/herrington-medical/PatientTestimonial.js\`

## 👥 Testimonials to Create
**English (3 testimonials)**:
- Sarah A. - Dental Implants (5 stars)
- Ahmed M. - Hollywood Smile (5 stars) 
- Fatima H. - Family Dentistry (5 stars)

**Arabic (3 testimonials)**:
- سارة الأحمد - زراعة الأسنان (5 stars)
- أحمد محمد - ابتسامة هوليوود (5 stars)
- فاطمة حسن - طب أسنان العائلة (5 stars)

## ✅ Requirements Checklist
- [ ] Integrate PatientTestimonial component
- [ ] Create 6 realistic testimonials (3 EN, 3 AR)
- [ ] Implement carousel and grid layout options
- [ ] Add star ratings and verification badges
- [ ] Include before/after image placeholders
- [ ] Ensure RTL layout for Arabic testimonials
- [ ] Test touch-friendly carousel controls
- [ ] Add accessibility navigation

## 🎨 Design Features
- Star rating display
- Patient photos and names
- Treatment type indicators
- Verification badges
- Before/after image support
- Carousel navigation
- Professional card styling

## 🧪 Testing Requirements
- **Touch Controls**: Carousel works on mobile
- **RTL Support**: Arabic testimonials display correctly
- **Accessibility**: Keyboard navigation and screen readers
- **Performance**: Smooth carousel animations

## ✅ Success Criteria
- ✅ Professional testimonial section created
- ✅ Both English and Arabic testimonials
- ✅ Working carousel with smooth navigation
- ✅ Trust-building design elements
- ✅ Mobile-optimized user experience" \
  --label "jules,enhancement,high-priority,components,phase-2"

# Phase 3 - Enhanced UX Features

# Task 3.1: Hero Section Redesign  
gh issue create \
  --title "[JULES] Phase 3.1: Redesign Hero Section with Professional Layout" \
  --body "## 🎯 Context
Implementing Herrington's professional split-screen hero layout for maximum impact.

## 📋 Task: Hero Section Professional Redesign
Apply Herrington hero design patterns with medical focus and prominent CTAs.

## 📂 Files to Modify
**Primary**:
- \`src/templates/en/sections/hero.js\`
- \`src/templates/ar/sections/hero.js\`
**Secondary**: \`src/content/css/components.css.js\`

## 🎨 Design Requirements
- **Split-screen layout**: Content + Visual
- **Compelling headline**: Medical expertise focus
- **Trust indicators**: Years of experience, patients served
- **Prominent CTA**: Book appointment button
- **Subtle animations**: Background elements, fade-ins
- **Professional imagery**: Dental practice photos

## ✅ Requirements Checklist
- [ ] Implement professional split-screen layout
- [ ] Create compelling medical headlines (EN/AR)
- [ ] Add prominent booking CTA button
- [ ] Include trust indicators and credentials
- [ ] Add subtle background animations
- [ ] Ensure Arabic RTL layout compatibility
- [ ] Optimize for mobile-first design
- [ ] Test loading performance (<2s target)
- [ ] Add structured data for SEO

## 📱 Responsive Requirements
- **Mobile**: Single column, CTA prominent
- **Tablet**: Balanced two-column layout  
- **Desktop**: Full split-screen design
- **Arabic**: RTL layout with proper alignment

## 🧪 Testing Requirements
- **Performance**: Hero loads in <1s
- **Mobile UX**: Compelling on small screens
- **Arabic**: RTL layout works perfectly
- **CTAs**: Booking buttons highly visible
- **Animations**: Smooth 60fps performance

## ✅ Success Criteria
- ✅ Professional hero section matching premium themes
- ✅ Compelling messaging for dental practice
- ✅ Clear call-to-action prominence
- ✅ Trust-building elements integrated
- ✅ Excellent mobile experience" \
  --label "jules,enhancement,medium-priority,ux,phase-3"

echo "✅ Jules Herrington integration issues created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://jules.google.com"
echo "2. Connect your GitHub account"  
echo "3. Select dr-islam-website repository"
echo "4. Jules will automatically detect issues with 'jules' label"
echo "5. Start with Phase 1.1 (Color System) - highest priority"
echo ""
echo "🎯 Execution Order:"
echo "Phase 1: Foundation (Week 1) - Color System → Typography"
echo "Phase 2: Components (Week 2) - Service Cards → Testimonials" 
echo "Phase 3: Enhanced UX (Week 3) - Hero Redesign"
echo ""
echo "📊 Expected Results:"
echo "- +40% more professional appearance"
echo "- +25% increased user engagement"
echo "- +20% improved conversion rates"
echo "- Maintained <2s loading performance"