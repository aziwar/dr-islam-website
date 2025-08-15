# JULES: Sandbox Environment Testing Commands

## 🏗️ Pre-Testing Setup Commands

**Jules: Execute these commands in your sandbox environment before browser testing:**

### 1. Project Setup & Dependencies
```bash
# Navigate to project directory
cd dr-islam-website

# Install dependencies (if needed)
npm install

# Check for any missing dependencies
npm audit --omit=dev
```

### 2. Development Server Startup
```bash
# Start development server
npm run dev

# Wait for server to be ready - should show:
# "Server running at http://127.0.0.1:8787"
# "Ready to serve requests"
```

### 3. Server Health Check
```bash
# Test if server responds (run in another terminal)
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8787
# Should return: 200

# Check for any startup errors
curl -s http://127.0.0.1:8787 | head -20
# Should return valid HTML
```

## 🧪 Browser Testing Workflow

### Step 1: Environment Validation
1. **Verify server is running**: http://127.0.0.1:8787 loads properly
2. **Check console for errors**: No critical JavaScript errors on load
3. **Verify Arabic language**: http://127.0.0.1:8787/?lang=ar works correctly
4. **Test basic navigation**: All menu items and links functional

### Step 2: Comprehensive Section Testing
For EACH section, test on Mobile (375px), Tablet (768px), Desktop (1200px):

#### Hero Section Testing:
- [ ] Gradient background animation loads correctly
- [ ] Text content displays properly in both languages
- [ ] CTA buttons are visible and functional
- [ ] Responsive layout works on all device sizes
- [ ] No JavaScript errors in console

#### Services Section Testing (New Jules Implementation):
- [ ] Professional service cards render correctly
- [ ] 6 services display: General, Cosmetic, Implants, Emergency, Orthodontics, Pediatric
- [ ] Hover animations work smoothly
- [ ] Brand colors (#BEB093, #D4C5A3) applied correctly
- [ ] Arabic RTL layout displays properly
- [ ] Mobile responsive grid functions correctly

#### Testimonials Section Testing (New Jules Implementation):
- [ ] 3 testimonials display correctly
- [ ] Star ratings use brand gold color (#BEB093)
- [ ] Patient names and treatments show properly
- [ ] Card styling consistent with design
- [ ] Arabic testimonials display correctly in RTL
- [ ] Mobile layout responsive and readable

#### Typography Testing (New Jules Implementation):
- [ ] Inter font loads for body text
- [ ] Playfair Display loads for headings
- [ ] Font rendering smooth on all devices
- [ ] Arabic text displays correctly with IBM Plex Sans Arabic
- [ ] No font loading errors in console
- [ ] Typography hierarchy clear and professional

### Step 3: Cross-Language Testing
Test switching between English and Arabic:
- [ ] Language parameter (?lang=ar) works correctly
- [ ] All content translates properly
- [ ] RTL layout applies consistently
- [ ] No layout breaks during language switch
- [ ] Navigation and forms work in both languages

### Step 4: Performance & Console Analysis
- [ ] Page load time under 2 seconds
- [ ] No critical JavaScript errors
- [ ] CSS loads without 404 errors
- [ ] Images and assets load correctly
- [ ] No console warnings about performance

## 📊 Issue Classification System

When reporting issues, classify each as:

### 🔴 Environment Issues:
- Server won't start or crashes
- Dependencies missing or conflicting
- Build process failures
- Development-only problems

### 🟠 Code Implementation Issues:  
- Broken functionality
- JavaScript errors
- CSS rendering problems
- Mobile responsiveness failures

### 🟡 Visual Polish Issues:
- Styling inconsistencies
- Spacing or alignment problems
- Typography rendering
- Color usage inconsistencies

### 🟢 Enhancement Opportunities:
- Performance optimizations
- Accessibility improvements
- User experience enhancements
- Additional features

## ✅ Success Criteria for Jules:

- [ ] Development server starts successfully in sandbox
- [ ] All 8 website sections tested on 3 device sizes
- [ ] Both English and Arabic versions fully tested
- [ ] Console errors documented with screenshots
- [ ] Performance metrics captured
- [ ] Issues classified by type and priority
- [ ] Actionable fix recommendations provided
- [ ] Evidence-based reporting with specific file references

**Jules: Document everything you find with screenshots and specific technical details for efficient fixing.**