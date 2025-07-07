// src/content/en.js
export const HTML_EN = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dr. Islam Elsagher - General Dentist & Implantologist</title>
    <meta name="description" content="Dr. Islam Elsagher provides comprehensive dental care in Kuwait. 15+ years experience in implants, cosmetic dentistry, and oral surgery.">
    
    <!-- CSS Links - CRITICAL FIX -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    
    <!-- Schema Markup for Dentist -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Dr. Islam Elsagher",
      "alternateName": "د. اسلام الصغير",
      "description": "General Dentist and Dental Implant Specialist in Kuwait",
      "image": "https://dr-elsagher.com/assets/dr-islam.jpg",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KW"
      },
      "telephone": "+96598563711",
      "url": "https://dr-elsagher.com",
      "sameAs": [
        "https://www.instagram.com/dr.islamelsagher/"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ]
    }
    </script>
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
</head>
<body>
    <!-- Emergency Banner -->
    <div class="emergency-banner">
        <p>Dental Emergency? Call Now: <a href="tel:+96598563711">+965 98563711</a></p>
    </div>

    <header>
        <nav>
            <div class="logo">
                <div class="logo-text">
                    <span class="logo-name">Dr. Islam Elsagher</span>
                    <span class="logo-arabic">د. اسلام الصغير</span>
                </div>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul id="mobileMenu">
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#gallery">Before/After</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/ar/" class="lang-switch">العربية</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Dr. Islam Elsagher</h1>
            <p class="subtitle">General Dentist & Implantologist</p>
            <div class="trust-badges">
                <span class="badge">15+ Years Experience</span>
                <span class="badge">Latest Technology</span>
                <span class="badge">100% Patient Satisfaction</span>
            </div>
            <a href="https://wa.me/96598563711" class="cta-button">Book Your Appointment</a>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Dental Implants</h3>
                    <p>Immediate and delayed implants with latest techniques</p>
                </div>
                <div class="service-card">
                    <h3>Root Canal Treatment</h3>
                    <p>Specialized endodontic treatment</p>
                </div>
                <div class="service-card">
                    <h3>Prosthodontics</h3>
                    <p>Fixed and removable prosthetics</p>
                </div>
                <div class="service-card">
                    <h3>Oral Surgery</h3>
                    <p>Surgical extractions and advanced procedures</p>
                </div>
                <div class="service-card">
                    <h3>Cosmetic Dentistry</h3>
                    <p>Hollywood smile and whitening</p>
                </div>
                <div class="service-card">
                    <h3>Gum Treatment</h3>
                    <p>Periodontal disease treatment</p>
                </div>
                <div class="service-card">
                    <h3>Aesthetic Fillings</h3>
                    <p>Natural tooth-colored fillings</p>
                </div>
                <div class="service-card">
                    <h3>Full Mouth Rehabilitation</h3>
                    <p>Comprehensive oral treatment</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>What Our Patients Say</h2>
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"Excellent service and very professional doctor. Dr. Islam explained every step of the treatment and the result was amazing"</p>
                    <cite>- Ahmed Al-Salem</cite>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"Best dental implant experience. The doctor is very skilled and the team is cooperative. I recommend everyone to visit the clinic"</p>
                    <cite>- Fatima Al-Ali</cite>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"Professional treatment and stunning results. Dr. Islam completely transformed my smile. Thank you so much"</p>
                    <cite>- Mohammed Al-Khalid</cite>
                </div>
            </div>
        </div>
    </section>

    <!-- Before/After Gallery -->
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>Real Results</h2>
            <p class="gallery-subtitle">See the amazing transformation of our patients' smiles</p>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="assets/before-after/case1-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case1-after.jpg" alt="After treatment" loading="lazy">
                    <p>Front teeth implants</p>
                </div>
                <div class="gallery-item">
                    <img src="assets/before-after/case2-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case2-after.jpg" alt="After treatment" loading="lazy">
                    <p>Hollywood smile</p>
                </div>
                <div class="gallery-item">
                    <img src="assets/before-after/case3-before.jpg" alt="Before treatment" loading="lazy">
                    <img src="assets/before-after/case3-after.jpg" alt="After treatment" loading="lazy">
                    <p>Orthodontic and cosmetic treatment</p>
                </div>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>About Dr. Islam Elsagher</h2>
            <div class="about-content">
                <div class="credentials">
                    <h3>Qualifications</h3>
                    <ul>
                        <li>Bachelor of Oral and Dental Medicine - Alexandria University (2004-2009)</li>
                        <li>Diploma in Dental Implants - Alexandria University (2010-2011)</li>
                        <li>Master of Periodontics - Al-Azhar University</li>
                        <li>Master of Laser Sciences - Cairo University</li>
                    </ul>
                    <div class="certifications">
                        <h4>Certifications & Memberships</h4>
                        <div class="cert-badges">
                            <span class="cert-badge">Member of Kuwait Dental Association</span>
                            <span class="cert-badge">Licensed by Kuwait Ministry of Health</span>
                        </div>
                    </div>
                </div>
                <div class="experience">
                    <h3>Professional Experience</h3>
                    <p>Over 15 years of dental practice experience in Egypt and Kuwait</p>
                    <div class="stats">
                        <div class="stat">
                            <h4>5000+</h4>
                            <p>Happy Patients</p>
                        </div>
                        <div class="stat">
                            <h4>1200+</h4>
                            <p>Successful Implants</p>
                        </div>
                        <div class="stat">
                            <h4>15+</h4>
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq">
        <div class="container">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
                <div class="faq-item">
                    <h3>How much does dental implant cost?</h3>
                    <p>The cost varies depending on the case and type of implant used. We offer free consultation to evaluate your case and provide a detailed treatment plan with costs.</p>
                </div>
                <div class="faq-item">
                    <h3>Is the implant procedure painful?</h3>
                    <p>We use the latest local anesthesia techniques to ensure your complete comfort. Most patients describe the procedure as less painful than a regular tooth extraction.</p>
                </div>
                <div class="faq-item">
                    <h3>How long does the treatment take?</h3>
                    <p>Treatment duration depends on the case. Immediate implants can be completed in one session, while traditional implants need 3-6 months for complete integration.</p>
                </div>
                <div class="faq-item">
                    <h3>Do you accept health insurance?</h3>
                    <p>We work with most health insurance companies in Kuwait. Please contact us to confirm if your health insurance is accepted.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-info">
                <div class="contact-card">
                    <h3>Phone</h3>
                    <p><a href="tel:+96598563711">+965 98563711</a></p>
                </div>
                <div class="contact-card">
                    <h3>Email</h3>
                    <p><a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
                </div>
                <div class="contact-card">
                    <h3>Instagram</h3>
                    <p><a href="https://www.instagram.com/dr.islamelsagher/" target="_blank">@dr.islamelsagher</a></p>
                </div>
                <div class="contact-card">
                    <h3>WhatsApp</h3>
                    <p><a href="https://wa.me/96598563711">+965 98563711</a></p>
                </div>
            </div>
            <div class="working-hours">
                <h3>Working Hours</h3>
                <div class="hours-grid">
                    <div class="day-hours">
                        <span class="day">Saturday - Thursday:</span>
                        <span class="hours">9:00 AM - 9:00 PM</span>
                    </div>
                    <div class="day-hours">
                        <span class="day">Friday:</span>
                        <span class="hours">Closed</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2025 Dr. Islam Elsagher - All Rights Reserved</p>
    </footer>

    <!-- Sticky WhatsApp Booking Button -->
    <a href="https://wa.me/96598563711" class="sticky-book">
        Book Appointment 💬
    </a>

    <script>
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            question.style.cursor = 'pointer';
            answer.style.maxHeight = '200px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '200px';
                }
            });
        });
    });

    // Header shadow on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
        });
    });

    // Analytics tracking
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_click'
                });
            }
        });
    });

    // Before/After Gallery
    document.addEventListener('DOMContentLoaded', function() {
        const galleries = document.querySelectorAll('.gallery-item');
        galleries.forEach(gallery => {
            let isDown = false;
            const container = gallery.querySelector('.before-after-container');
            if (container) {
                const slider = document.createElement('div');
                slider.className = 'before-after-slider';
                container.appendChild(slider);
                
                const beforeImg = container.querySelector('img:first-child');
                if (beforeImg) {
                    beforeImg.style.clipPath = 'inset(0 50% 0 0)';
                    
                    slider.addEventListener('mousedown', () => isDown = true);
                    document.addEventListener('mouseup', () => isDown = false);
                    document.addEventListener('mousemove', (e) => {
                        if (!isDown) return;
                        const rect = container.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        slider.style.left = percent + '%';
                        beforeImg.style.clipPath = \`inset(0 \${100 - percent}% 0 0)\`;
                    });
                    
                    // Touch support
                    slider.addEventListener('touchstart', () => isDown = true);
                    document.addEventListener('touchend', () => isDown = false);
                    document.addEventListener('touchmove', (e) => {
                        if (!isDown) return;
                        const rect = container.getBoundingClientRect();
                        const x = e.touches[0].clientX - rect.left;
                        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                        slider.style.left = percent + '%';
                        beforeImg.style.clipPath = \`inset(0 \${100 - percent}% 0 0)\`;
                    });
                }
            }
        });
    });

    // Emergency banner auto-fade
    setTimeout(() => {
        const emergencyBanner = document.querySelector('.emergency-banner');
        if (emergencyBanner) {
            emergencyBanner.style.transition = 'opacity 0.5s';
            emergencyBanner.style.opacity = '0.8';
        }
    }, 10000);
    </script>
</body>
</html>`;