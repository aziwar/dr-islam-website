# Issue #4: Implement Contact Form Backend [P0 - CRITICAL]

## Problem
Contact form exists but has no backend - form submissions go nowhere.

## Business Impact
- Lost patient inquiries
- No appointment requests
- Missed revenue opportunities
- Poor user experience

## Current Implementation
```html
<!-- Form exists but action="#" -->
<form action="#" method="POST">
```

## Solution Options

### Option 1: Cloudflare Workers Email
```javascript
// Add to src/index.js
async function handleContactForm(request) {
    const formData = await request.formData();
    
    // Send email via SendGrid/Mailgun API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: 'dr.islam@clinic.com' }]
            }],
            from: { email: formData.get('email') },
            subject: 'New Patient Inquiry',
            content: [{
                type: 'text/html',
                value: formatEmailTemplate(formData)
            }]
        })
    });
}
```

### Option 2: Third-Party Service
- Formspree.io
- Netlify Forms equivalent
- Google Forms embed

## Acceptance Criteria
- [ ] Form submissions delivered to email
- [ ] Success/error messages shown
- [ ] Form validation working
- [ ] Spam protection (reCAPTCHA)
- [ ] Thank you page redirect

**Labels:** feature, critical, backend
**Assignee:** @aziwar
**Milestone:** MVP Launch
