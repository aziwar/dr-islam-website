#!/bin/bash

# Corrected Jules Issues Script - Preserving Dr. Islam Brand Colors
# Run: bash create-corrected-jules-issues.sh

echo "🎨 Creating corrected Jules AI issues (preserving Dr. Islam brand colors)..."

# Task 1: Professional Service Cards
gh issue create \
  --title "[JULES] Create Professional Dental Services Section" \
  --body "## 🎯 Task: Professional Service Cards with Existing Brand Colors

**IMPORTANT**: Use existing Dr. Islam brand colors, DO NOT create new colors!
- Primary Gold: \`#BEB093\` (main brand color)
- Secondary Gold: \`#D4C5A3\` (lighter variation)  
- Accent Dark: \`#8B7F6B\` (darker variation)

## 📂 Files to Modify
- **Main**: \`src/templates/en/sections/services.js\`
- **CSS**: \`src/content/css/components.css.js\`
- **Reference**: \`src/components/herrington-medical/MedicalServiceCard.js\`

## 🦷 Create 6 Dental Services:
1. **General Dentistry** (🦷) - Regular checkups and cleanings
2. **Cosmetic Dentistry** (✨) - Smile makeovers and whitening  
3. **Dental Implants** (🔧) - Tooth replacement solutions
4. **Emergency Care** (🚨) - 24/7 urgent dental care
5. **Orthodontics** (😁) - Braces and teeth straightening
6. **Pediatric Dentistry** (👶) - Children's dental care

## ✅ Requirements:
- [ ] Use ONLY existing brand colors (#BEB093, #D4C5A3, #8B7F6B)
- [ ] Each card: icon, title, description, 3-4 features, CTA button
- [ ] Hover animations (subtle lift effect)
- [ ] Responsive: 375px (mobile), 768px (tablet), 1200px (desktop)
- [ ] Arabic RTL support (?lang=ar)
- [ ] Professional appearance matching premium sites
- [ ] No performance impact (keep <2s loading)

## Success Criteria:
✅ 6 professional service cards displayed
✅ Uses existing Dr. Islam brand colors
✅ Works on all devices and in Arabic
✅ Professional, trustworthy appearance" \
  --label "jules,enhancement,high-priority"

# Task 2: Patient Testimonials  
gh issue create \
  --title "[JULES] Create Patient Testimonials Section" \
  --body "## 🎯 Task: Patient Testimonials with Brand Colors

Use existing Dr. Islam brand colors for all styling:
- Primary Gold: \`#BEB093\` (for stars, accents)
- Secondary Gold: \`#D4C5A3\` (for highlights)
- Keep existing text colors

## 📂 Files to Modify
- **Main**: \`src/templates/en/sections/testimonials.js\`
- **CSS**: \`src/content/css/components.css.js\`
- **Reference**: \`src/components/herrington-medical/PatientTestimonial.js\`

## 👥 Create 3 Testimonials:

**Testimonial 1 - Sarah A.**
- 5 gold stars (#BEB093)
- Treatment: Dental Implants  
- Quote: 'Dr. Islam replaced my missing teeth with implants that look completely natural. The process was comfortable and the results are amazing!'

**Testimonial 2 - Ahmed M.**
- 5 gold stars (#BEB093)
- Treatment: Cosmetic Dentistry
- Quote: 'Professional teeth whitening and bonding gave me the confident smile I always wanted. Excellent service and results!'

**Testimonial 3 - Fatima H.**
- 5 gold stars (#BEB093) 
- Treatment: Family Dentistry
- Quote: 'Dr. Islam takes care of our whole family. Great with kids and always explains everything clearly. Highly recommend!'

## ✅ Requirements:
- [ ] Use ONLY existing brand colors for styling
- [ ] 5-star ratings using brand gold (#BEB093)
- [ ] Professional card design with subtle shadows
- [ ] Responsive grid layout
- [ ] Hover effects matching site style
- [ ] Works on 375px, 768px, 1200px
- [ ] Arabic version compatibility

## Success Criteria:
✅ 3 trust-building testimonials created
✅ Professional design using existing colors
✅ Mobile-friendly responsive layout" \
  --label "jules,enhancement,high-priority"

# Task 3: Hero Section Enhancement
gh issue create \
  --title "[JULES] Enhance Hero Section with Professional Layout" \
  --body "## 🎯 Task: Hero Section Enhancement

**CRITICAL**: Keep the existing animated gradient background! Only improve the content layout.

## 📂 Files to Modify
- **Main**: \`src/templates/en/sections/hero.js\`
- **CSS**: \`src/content/css/components.css.js\`

## 🎨 Content to Add:
- **Headline**: 'Professional Dental Care in Kuwait'
- **Subheadline**: 'Dr. Islam Elsagher - Experienced General Dentist & Implantologist'
- **Trust Indicators**: 'Over 10 Years Experience • 1000+ Happy Patients • Modern Equipment'
- **Primary CTA**: 'Book Appointment' (use existing #BEB093)
- **Secondary CTA**: 'Call Now: +965 98563711'

## ✅ Requirements:
- [ ] KEEP existing animated gradient background
- [ ] Professional content layout (text left, visual space right)
- [ ] Use existing brand colors for CTAs (#BEB093, #D4C5A3)
- [ ] Mobile-first responsive design
- [ ] Arabic RTL layout support (?lang=ar)
- [ ] Text readable over gradient background
- [ ] Prominent, accessible CTA buttons

## Success Criteria:
✅ Enhanced professional hero section
✅ Existing gradient background preserved
✅ Better content hierarchy and layout
✅ Strong call-to-action prominence" \
  --label "jules,enhancement,medium-priority"

# Task 4: Typography Enhancement
gh issue create \
  --title "[JULES] Enhance Typography with Professional Fonts" \
  --body "## 🎯 Task: Typography System Enhancement

Improve typography using Herrington-inspired fonts while preserving all functionality.

## 📂 Files to Modify
- **Main**: \`src/content/css/core.css.js\`

## 🔤 Add Professional Fonts:
- **Primary**: Inter font for body text (with system fallbacks)
- **Accent**: Playfair Display for headings (with serif fallbacks)

## ✅ CRITICAL Requirements:
- [ ] Don't break ANY existing functionality
- [ ] Keep all responsive breakpoints (375px, 768px, 1200px)
- [ ] Arabic text must still display correctly (?lang=ar)
- [ ] Maintain existing color scheme (#BEB093, #D4C5A3)
- [ ] Don't slow down website loading time
- [ ] All existing components must still work
- [ ] Improve readability and visual hierarchy
- [ ] Maintain accessibility standards

## 🧪 Must Test:
- [ ] English and Arabic versions work
- [ ] All existing pages load properly
- [ ] No console errors
- [ ] Loading time stays under 2 seconds
- [ ] Fonts load properly across browsers

## Success Criteria:
✅ Professional typography implemented
✅ Better readability and hierarchy
✅ All existing functionality preserved
✅ Works with English and Arabic text" \
  --label "jules,enhancement,medium-priority"

echo "✅ Corrected Jules issues created successfully!"
echo ""
echo "🎨 KEY POINTS:"
echo "- All tasks preserve existing Dr. Islam brand colors (#BEB093, #D4C5A3)"
echo "- No new color schemes will be introduced"
echo "- Existing functionality and Arabic support maintained"
echo "- Professional appearance using current brand identity"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://jules.google.com"
echo "2. Connect GitHub and select dr-islam-website"
echo "3. Jules will find issues with 'jules' label"
echo "4. Start with high-priority tasks first"
echo "5. Review PRs and test before merging"