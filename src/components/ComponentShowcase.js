// COMPONENT SHOWCASE - Documentation and testing page for all components
// Comprehensive showcase for atoms, molecules, and testing all variants

/**
 * Component Showcase Generator
 * Creates a complete testing and documentation page for all components
 */
export const ComponentShowcase = {
  
  /**
   * Generate complete showcase page
   * @returns {string} Complete showcase HTML
   */
  async create() {
    // Import all components
    const { Button } = await import('./atoms/Button.js');
    const { Icon } = await import('./atoms/Icon.js');
    const { Input } = await import('./atoms/Input.js');
    const { Typography } = await import('./atoms/Typography.js');
    const { FormGroup } = await import('./molecules/FormGroup.js');
    const { ServiceCard } = await import('./molecules/ServiceCard.js');
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Library - Dr. Islam Dental Practice</title>
        <style>
          ${await this.getShowcaseCSS()}
        </style>
      </head>
      <body>
        <div class="showcase">
          <header class="showcase-header">
            <div class="showcase-container">
              ${Typography.heading(1, 'Component Library', { className: 'showcase-title' })}
              ${Typography.subtitle('Comprehensive component showcase and documentation')}
              <nav class="showcase-nav">
                <a href="#atoms">Atoms</a>
                <a href="#molecules">Molecules</a>
                <a href="#testing">Testing</a>
                <a href="#accessibility">Accessibility</a>
              </nav>
            </div>
          </header>

          <main class="showcase-main">
            <div class="showcase-container">
              
              <!-- ATOMS SECTION -->
              <section id="atoms" class="showcase-section">
                ${Typography.heading(2, 'Atom Components', { color: 'primary' })}
                ${Typography.paragraph('Basic UI elements that serve as building blocks for more complex components.')}
                
                <!-- BUTTON COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'Button Component')}
                  ${Typography.paragraph('Interactive buttons with multiple variants, accessibility features, and loading states.')}
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Primary Buttons</h4>
                      ${Button.cta('Book Appointment', 'testAction()')}
                      ${Button.create({ variant: 'primary', text: 'Large Button', size: 'large' })}
                      ${Button.create({ variant: 'primary', text: 'Loading...', loading: true })}
                      ${Button.create({ variant: 'primary', text: 'Disabled', disabled: true })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Secondary & Ghost</h4>
                      ${Button.create({ variant: 'secondary', text: 'Secondary Button' })}
                      ${Button.create({ variant: 'ghost', text: 'Ghost Button' })}
                      ${Button.create({ variant: 'secondary', text: 'Small', size: 'small' })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Emergency & Mobile Toggle</h4>
                      ${Button.emergency('Emergency Call', 'callEmergency()')}
                      ${Button.mobileToggle('toggleMenu()', false)}
                      ${Button.mobileToggle('toggleMenu()', true)}
                    </div>
                  </div>
                  
                  <div class="code-example">
                    <h4>Code Example</h4>
                    <pre><code>// Primary CTA Button
Button.cta('Book Appointment', 'openBookingModal()')

// Secondary Button with custom size
Button.create({ 
  variant: 'secondary', 
  text: 'Learn More', 
  size: 'large' 
})

// Emergency button
Button.emergency('Call Now', 'callNow()')</code></pre>
                  </div>
                </div>

                <!-- ICON COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'Icon Component')}
                  ${Typography.paragraph('SVG icon system with dental logo, accessibility support, and multiple sizes.')}
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Dental Logo</h4>
                      ${Icon.dentalLogo({ size: 'xl' })}
                      ${Icon.dentalLogo({ size: 'lg' })}
                      ${Icon.dentalLogo({ size: 'md' })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Contact Icons</h4>
                      ${Icon.contact('phone', { size: 'lg' })}
                      ${Icon.contact('email', { size: 'lg' })}
                      ${Icon.contact('location', { size: 'lg' })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Navigation Icons</h4>
                      ${Icon.nav('menu')}
                      ${Icon.nav('close')}
                      ${Icon.nav('arrow-right')}
                      ${Icon.nav('arrow-left')}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Status Icons</h4>
                      ${Icon.status('check')}
                      ${Icon.status('warning')}
                      ${Icon.status('info')}
                      ${Icon.loading()}
                    </div>
                  </div>
                  
                  <div class="code-example">
                    <h4>Code Example</h4>
                    <pre><code>// Dental logo with custom size
Icon.dentalLogo({ size: 'xl' })

// Contact icons with color
Icon.contact('phone', { color: 'primary' })

// Interactive navigation icon
Icon.nav('menu', { interactive: true, onClick: 'toggleMenu()' })</code></pre>
                  </div>
                </div>

                <!-- INPUT COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'Input Component')}
                  ${Typography.paragraph('Form inputs with validation states, floating labels, and accessibility.')}
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Basic Inputs</h4>
                      ${Input.text('demo-name', 'Full Name')}
                      ${Input.email('demo-email', 'Email Address')}
                      ${Input.tel('demo-phone', 'Phone Number')}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Validation States</h4>
                      ${Input.text('demo-error', 'Error State', { validation: 'error' })}
                      ${Input.text('demo-success', 'Success State', { validation: 'success' })}
                      ${Input.text('demo-warning', 'Warning State', { validation: 'warning' })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Textarea & Select</h4>
                      ${Input.textarea('demo-message', 'Your Message')}
                      ${Input.select('demo-service', [
                        { value: 'cleaning', text: 'Dental Cleaning' },
                        { value: 'implant', text: 'Dental Implant' },
                        { value: 'whitening', text: 'Teeth Whitening' }
                      ])}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Floating Labels</h4>
                      ${Input.floating('text', 'demo-float-name', 'Full Name')}
                      ${Input.floating('email', 'demo-float-email', 'Email Address')}
                    </div>
                  </div>
                </div>

                <!-- TYPOGRAPHY COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'Typography Component')}
                  ${Typography.paragraph('Semantic typography with Arabic support, responsive sizing, and accessibility.')}
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Headings</h4>
                      ${Typography.heading(1, 'Heading 1')}
                      ${Typography.heading(2, 'Heading 2')}
                      ${Typography.heading(3, 'Heading 3')}
                      ${Typography.heading(4, 'Heading 4')}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Text Variants</h4>
                      ${Typography.paragraph('This is a regular paragraph with normal text.')}
                      ${Typography.subtitle('This is subtitle text that stands out.')}
                      ${Typography.lead('This is lead text for important introductions.')}
                      ${Typography.caption('This is caption text for small details.')}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Colors & Weights</h4>
                      ${Typography.paragraph('Primary color text', { color: 'primary' })}
                      ${Typography.paragraph('Secondary color text', { color: 'secondary' })}
                      ${Typography.paragraph('Success color text', { color: 'success' })}
                      ${Typography.paragraph('Bold weight text', { weight: 'bold' })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Arabic Typography</h4>
                      ${Typography.arabic('h3', 'عنوان باللغة العربية')}
                      ${Typography.arabic('p', 'هذا نص تجريبي باللغة العربية لاختبار الخطوط والتنسيق.')}
                    </div>
                  </div>
                </div>
              </section>

              <!-- MOLECULES SECTION -->
              <section id="molecules" class="showcase-section">
                ${Typography.heading(2, 'Molecule Components', { color: 'primary' })}
                ${Typography.paragraph('Complex components that combine multiple atoms for complete functionality.')}
                
                <!-- FORMGROUP COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'FormGroup Component')}
                  ${Typography.paragraph('Complete form fields with labels, validation, and help text.')}
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Basic Form Groups</h4>
                      ${await FormGroup.text('demo-fg-name', 'Full Name', { 
                        required: true,
                        helpText: 'Enter your full name as it appears on your ID' 
                      })}
                      ${await FormGroup.email('demo-fg-email', 'Email Address', { 
                        required: true 
                      })}
                      ${await FormGroup.tel('demo-fg-phone', 'Phone Number', { 
                        optional: true,
                        helpText: 'We\'ll use this to confirm your appointment' 
                      })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Validation States</h4>
                      ${await FormGroup.text('demo-fg-error', 'Error Field', { 
                        errorMessage: 'This field is required and cannot be empty' 
                      })}
                      ${await FormGroup.text('demo-fg-success', 'Success Field', { 
                        successMessage: 'Great! This field is properly filled' 
                      })}
                      ${await FormGroup.text('demo-fg-warning', 'Warning Field', { 
                        warningMessage: 'This field might need attention' 
                      })}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Layout Variants</h4>
                      ${await FormGroup.text('demo-fg-inline', 'Inline Label', { 
                        layout: 'inline' 
                      })}
                      ${await FormGroup.text('demo-fg-compact', 'Compact Field', { 
                        layout: 'compact' 
                      })}
                      ${await FormGroup.floating('text', 'demo-fg-float', 'Floating Label')}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Complex Fields</h4>
                      ${await FormGroup.textarea('demo-fg-message', 'Your Message', { 
                        required: true,
                        helpText: 'Please describe your dental concern in detail',
                        rows: 4 
                      })}
                      ${await FormGroup.select('demo-fg-service', 'Preferred Service', [
                        { value: '', text: 'Select a service...' },
                        { value: 'cleaning', text: 'Dental Cleaning' },
                        { value: 'implant', text: 'Dental Implant' },
                        { value: 'cosmetic', text: 'Cosmetic Dentistry' }
                      ], { required: true })}
                    </div>
                  </div>
                </div>

                <!-- SERVICECARD COMPONENT -->
                <div class="component-demo">
                  ${Typography.heading(3, 'ServiceCard Component')}
                  ${Typography.paragraph('Professional service cards with various layouts and interactive features.')}
                  
                  <div class="demo-grid service-cards">
                    ${await ServiceCard.basic(
                      'Dental Cleaning',
                      'Professional teeth cleaning and oral hygiene maintenance to keep your smile healthy and bright.',
                      'dental-logo',
                      { 
                        link: '/services/cleaning',
                        linkText: 'Learn More'
                      }
                    )}
                    
                    ${await ServiceCard.featured(
                      'Dental Implants',
                      'Permanent tooth replacement solution that looks and feels like natural teeth.',
                      'dental-logo',
                      { 
                        badge: 'Most Popular',
                        link: '/services/implants',
                        linkText: 'Book Consultation'
                      }
                    )}
                    
                    ${await ServiceCard.compact(
                      'Emergency Care',
                      'Immediate dental care for urgent situations and dental emergencies.',
                      'phone',
                      { 
                        link: 'tel:+1234567890',
                        linkText: 'Call Now'
                      }
                    )}
                  </div>
                  
                  <div class="demo-grid">
                    <div class="demo-item">
                      <h4>Pricing Card</h4>
                      ${await ServiceCard.pricing(
                        'Basic Cleaning',
                        '$99',
                        'per visit',
                        [
                          'Professional teeth cleaning',
                          'Oral health assessment',
                          'Fluoride treatment',
                          'Plaque and tartar removal'
                        ],
                        { 
                          linkText: 'Book Now',
                          onClick: 'bookService("cleaning")'
                        }
                      )}
                    </div>
                    
                    <div class="demo-item">
                      <h4>Horizontal Layout</h4>
                      ${await ServiceCard.create({
                        title: 'Teeth Whitening',
                        description: 'Professional teeth whitening for a brighter, more confident smile.',
                        icon: 'star',
                        variant: 'horizontal',
                        link: '/services/whitening'
                      })}
                    </div>
                  </div>
                </div>
              </section>

              <!-- TESTING SECTION -->
              <section id="testing" class="showcase-section">
                ${Typography.heading(2, 'Component Testing', { color: 'primary' })}
                ${Typography.paragraph('Interactive testing scenarios for validation, accessibility, and edge cases.')}
                
                <div class="component-demo">
                  ${Typography.heading(3, 'Form Validation Testing')}
                  
                  <form class="test-form" onsubmit="testFormValidation(event)">
                    ${await FormGroup.text('test-name', 'Full Name', { 
                      required: true,
                      helpText: 'Required field - try submitting empty' 
                    })}
                    
                    ${await FormGroup.email('test-email', 'Email Address', { 
                      required: true,
                      helpText: 'Try entering invalid email format' 
                    })}
                    
                    ${await FormGroup.tel('test-phone', 'Phone Number', { 
                      required: true,
                      helpText: 'Enter a valid phone number' 
                    })}
                    
                    ${await FormGroup.textarea('test-message', 'Message', { 
                      required: true,
                      helpText: 'Minimum 10 characters required',
                      attributes: { minlength: '10' }
                    })}
                    
                    <div class="test-form-actions">
                      ${Button.create({ 
                        type: 'submit', 
                        variant: 'primary', 
                        text: 'Test Validation' 
                      })}
                      ${Button.create({ 
                        type: 'reset', 
                        variant: 'secondary', 
                        text: 'Reset Form' 
                      })}
                    </div>
                  </form>
                </div>
              </section>

              <!-- ACCESSIBILITY SECTION -->
              <section id="accessibility" class="showcase-section">
                ${Typography.heading(2, 'Accessibility Testing', { color: 'primary' })}
                ${Typography.paragraph('Test keyboard navigation, screen reader compatibility, and WCAG compliance.')}
                
                <div class="component-demo">
                  ${Typography.heading(3, 'Keyboard Navigation Test')}
                  ${Typography.paragraph('Use Tab, Enter, and Space keys to navigate through these components:')}
                  
                  <div class="a11y-test-grid">
                    ${Button.create({ variant: 'primary', text: 'Focusable Button 1', onClick: 'showAlert("Button 1 clicked!")' })}
                    ${Button.create({ variant: 'secondary', text: 'Focusable Button 2', onClick: 'showAlert("Button 2 clicked!")' })}
                    ${Icon.create({ name: 'phone', interactive: true, onClick: 'showAlert("Icon clicked!")', ariaLabel: 'Call us' })}
                    ${Input.text('a11y-input', 'Accessible Input')}
                    ${Button.create({ variant: 'ghost', text: 'Last Focusable Element' })}
                  </div>
                  
                  ${Typography.heading(4, 'Screen Reader Testing')}
                  ${Typography.paragraph('The following elements include proper ARIA labels and descriptions:')}
                  
                  <ul>
                    <li>All buttons have descriptive aria-label attributes</li>
                    <li>Form inputs are properly labeled and associated</li>
                    <li>Icons have appropriate aria-hidden or aria-label attributes</li>
                    <li>Form validation messages use role="alert" for screen reader announcements</li>
                    <li>Interactive elements have proper focus indicators</li>
                  </ul>
                </div>
              </section>
            </div>
          </main>
        </div>

        <script>
          ${await this.getShowcaseJS()}
        </script>
      </body>
      </html>
    `;
  },

  /**
   * Get showcase page CSS
   */
  async getShowcaseCSS() {
    // Import all component CSS
    const { BUTTON_CSS } = await import('./atoms/Button.js');
    const { ICON_CSS } = await import('./atoms/Icon.js');
    const { INPUT_CSS } = await import('./atoms/Input.js');
    const { TYPOGRAPHY_CSS } = await import('./atoms/Typography.js');
    const { FORMGROUP_CSS } = await import('./molecules/FormGroup.js');
    const { SERVICECARD_CSS } = await import('./molecules/ServiceCard.js');
    const { DESIGN_TOKENS } = await import('../shared/design-tokens.js');

    return `
      ${DESIGN_TOKENS}
      ${BUTTON_CSS}
      ${ICON_CSS}
      ${INPUT_CSS}
      ${TYPOGRAPHY_CSS}
      ${FORMGROUP_CSS}
      ${SERVICECARD_CSS}
      
      /* Showcase-specific styles */
      .showcase {
        font-family: 'Poppins', 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: var(--text);
        background: #f8f9fa;
        min-height: 100vh;
      }
      
      .showcase-header {
        background: linear-gradient(135deg, var(--primary) 0%, #a89680 100%);
        color: var(--white);
        padding: var(--space-2xl) 0;
        text-align: center;
      }
      
      .showcase-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-md);
      }
      
      .showcase-title {
        margin-bottom: var(--space-md);
        color: var(--white) !important;
      }
      
      .showcase-nav {
        margin-top: var(--space-lg);
        display: flex;
        justify-content: center;
        gap: var(--space-lg);
        flex-wrap: wrap;
      }
      
      .showcase-nav a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
      }
      
      .showcase-nav a:hover {
        background: rgba(255, 255, 255, 0.2);
        color: var(--white);
      }
      
      .showcase-main {
        padding: var(--space-2xl) 0;
      }
      
      .showcase-section {
        margin-bottom: var(--space-4xl);
        background: var(--white);
        border-radius: var(--radius-lg);
        padding: var(--space-2xl);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .component-demo {
        margin-bottom: var(--space-3xl);
        padding-bottom: var(--space-2xl);
        border-bottom: 1px solid #eee;
      }
      
      .component-demo:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }
      
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-xl);
        margin: var(--space-xl) 0;
      }
      
      .demo-item {
        background: #f8f9fa;
        padding: var(--space-lg);
        border-radius: var(--radius-md);
        border: 1px solid #e9ecef;
      }
      
      .demo-item h4 {
        margin: 0 0 var(--space-md) 0;
        color: var(--secondary);
        font-size: var(--text-lg);
        font-weight: 600;
      }
      
      .demo-item > * + * {
        margin-top: var(--space-sm);
      }
      
      .code-example {
        background: #2d3748;
        color: #e2e8f0;
        padding: var(--space-lg);
        border-radius: var(--radius-md);
        margin-top: var(--space-lg);
        overflow-x: auto;
      }
      
      .code-example h4 {
        margin: 0 0 var(--space-md) 0;
        color: #9ca3af;
        font-size: var(--text-base);
      }
      
      .code-example pre {
        margin: 0;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: var(--text-sm);
        line-height: 1.5;
        white-space: pre-wrap;
      }
      
      .test-form {
        background: #f8f9fa;
        padding: var(--space-xl);
        border-radius: var(--radius-lg);
        border: 1px solid #e9ecef;
      }
      
      .test-form-actions {
        display: flex;
        gap: var(--space-md);
        margin-top: var(--space-lg);
        justify-content: flex-end;
      }
      
      .a11y-test-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-md);
        padding: var(--space-lg);
        background: #f8f9fa;
        border-radius: var(--radius-md);
        border: 2px dashed #ddd;
        margin: var(--space-lg) 0;
      }
      
      .a11y-test-grid > * {
        flex: 0 0 auto;
      }
      
      /* Mobile responsiveness */
      @media (max-width: var(--breakpoint-md-max)) {
        .demo-grid {
          grid-template-columns: 1fr;
        }
        
        .showcase-nav {
          flex-direction: column;
          align-items: center;
        }
        
        .showcase-container {
          padding: 0 var(--space-sm);
        }
        
        .showcase-section {
          padding: var(--space-lg);
        }
      }
      
      /* Focus indicators for accessibility */
      *:focus {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
      }
      
      /* Smooth scrolling for navigation */
      html {
        scroll-behavior: smooth;
      }
      
      /* Print styles */
      @media print {
        .showcase-header {
          background: none;
          color: var(--text);
        }
        
        .component-demo {
          break-inside: avoid;
        }
      }
    `;
  },

  /**
   * Get showcase page JavaScript
   */
  async getShowcaseJS() {
    return `
      // Import and initialize all component behaviors
      async function initializeShowcase() {
        try {
          // Import all behavior modules
          const { ButtonBehaviors } = await import('./atoms/Button.js');
          const { IconBehaviors } = await import('./atoms/Icon.js');
          const { InputBehaviors } = await import('./atoms/Input.js');
          const { TypographyBehaviors } = await import('./atoms/Typography.js');
          const { FormGroupBehaviors } = await import('./molecules/FormGroup.js');
          const { ServiceCardBehaviors } = await import('./molecules/ServiceCard.js');
          
          // Initialize all behaviors
          ButtonBehaviors.init();
          IconBehaviors.init();
          InputBehaviors.init();
          TypographyBehaviors.init();
          FormGroupBehaviors.init();
          ServiceCardBehaviors.init();
          
          console.log('✅ Component showcase initialized successfully');
        } catch (error) {
          console.error('❌ Failed to initialize showcase:', error);
        }
      }

      // Test functions for interactive examples
      function testAction() {
        showAlert('Test action triggered!');
      }

      function callEmergency() {
        showAlert('Emergency call initiated!');
      }

      function toggleMenu() {
        showAlert('Mobile menu toggled!');
      }

      function bookService(service) {
        showAlert(\`Booking \${service} service...\`);
      }

      function showAlert(message) {
        // Create accessible alert
        const alert = document.createElement('div');
        alert.style.cssText = \`
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--success);
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          font-family: inherit;
          font-size: 14px;
          max-width: 300px;
          word-wrap: break-word;
        \`;
        alert.textContent = message;
        alert.setAttribute('role', 'alert');
        alert.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(alert);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 3000);
      }

      // Form validation test
      function testFormValidation(event) {
        event.preventDefault();
        
        const form = event.target;
        const formGroups = form.querySelectorAll('.form-group');
        let isValid = true;
        
        formGroups.forEach(formGroup => {
          const input = formGroup.querySelector('.input');
          if (input) {
            const fieldValid = input.checkValidity();
            if (!fieldValid) {
              isValid = false;
              
              // Set error state
              formGroup.classList.add('form-group--error');
              input.classList.add('input--error');
              
              // Show error message
              let errorMessage = 'This field is invalid';
              if (input.required && !input.value.trim()) {
                errorMessage = 'This field is required';
              } else if (input.type === 'email') {
                errorMessage = 'Please enter a valid email address';
              }
              
              // Update or create error message
              let messageElement = formGroup.querySelector('.form-group__message');
              if (!messageElement) {
                messageElement = document.createElement('div');
                messageElement.className = 'form-group__message form-group__message--error';
                messageElement.setAttribute('role', 'alert');
                messageElement.setAttribute('aria-live', 'polite');
                formGroup.appendChild(messageElement);
              }
              messageElement.textContent = errorMessage;
            } else {
              // Clear error state
              formGroup.classList.remove('form-group--error');
              formGroup.classList.add('form-group--success');
              input.classList.remove('input--error');
              input.classList.add('input--success');
              
              const messageElement = formGroup.querySelector('.form-group__message');
              if (messageElement) {
                messageElement.remove();
              }
            }
          }
        });
        
        if (isValid) {
          showAlert('✅ Form validation passed! All fields are valid.');
        } else {
          showAlert('❌ Form validation failed. Please check the highlighted fields.');
        }
      }

      // Smooth scrolling for navigation
      document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.showcase-nav a');
        navLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
        
        // Initialize showcase
        initializeShowcase();
      });

      // Accessibility testing helpers
      function testKeyboardNavigation() {
        showAlert('Use Tab to navigate, Enter/Space to activate. Check focus indicators!');
      }

      // Component registry integration test
      async function testComponentRegistry() {
        try {
          const { ComponentRegistry } = await import('./ComponentRegistry.js');
          
          // Test component loading
          const buttonComponent = await ComponentRegistry.load('atoms', 'Button');
          console.log('✅ Button component loaded:', buttonComponent);
          
          // Test search functionality  
          const searchResults = ComponentRegistry.search('form');
          console.log('🔍 Search results for "form":', searchResults);
          
          // Test cache stats
          const cacheStats = ComponentRegistry.getCacheStats();
          console.log('📊 Cache statistics:', cacheStats);
          
          showAlert(\`Component Registry test completed. Check console for details.\`);
        } catch (error) {
          console.error('❌ Component Registry test failed:', error);
          showAlert('Component Registry test failed. Check console for errors.');
        }
      }

      // Expose test functions globally
      window.testComponentRegistry = testComponentRegistry;
      window.testKeyboardNavigation = testKeyboardNavigation;
    `;
  }
};

// Export for use in development and testing
export default ComponentShowcase;