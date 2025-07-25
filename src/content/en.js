// src/content/en.js
export const HTML_EN = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

    <!-- PWA Support -->
    <link rel="manifest" href="/manifest-en.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Dr. Islam">
        <title>Dr. Islam Elsagher - General Dentist & Implantologist</title>
    <meta name="description" content="Dr. Islam Elsagher provides comprehensive dental care in Kuwait. 15+ years experience in implants, cosmetic dentistry, and oral surgery.">
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="48x48" href="/assets/images/favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="64x64" href="/assets/images/favicon-64x64.png">
    <link rel="icon" type="image/png" sizes="128x128" href="/assets/images/favicon-128x128.png">
    <link rel="icon" type="image/png" sizes="256x256" href="/assets/images/favicon-256x256.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
    
    <!-- Google Analytics - Placeholder removed for privacy -->
    <!-- TODO: Add actual GA4 tracking ID when client provides credentials -->
</head>
<body>
    <!-- Emergency Banner -->
    <div class="emergency-banner">
        <p>Dental Emergency? Call Now: <a href="tel:+96598563711">+965 98563711</a></p>
    </div>

    <header>
        <nav>
            <div class="logo">
                <picture>
                    <source srcset="/assets/images/logo-main.webp" type="image/webp">
                    <source media="(max-width: 768px)" srcset="/assets/images/logo-mobile.webp" type="image/webp">
                    <source media="(max-width: 768px)" srcset="/assets/images/logo-mobile.png">
                    <img src="/assets/images/logo-main.png" alt="دكتور اسلام الصغير - Dr. Islam Elsagher" class="logo-img" loading="eager">
                </picture>
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

    <div class="mobile-menu-backdrop" onclick="closeMobileMenu()"></div>

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
                    <picture>
                        <source 
                            type="image/webp"
                            srcset="/assets/before-after/real-case1-320w.webp 320w,
                                    /assets/before-after/real-case1-768w.webp 768w,
                                    /assets/before-after/real-case1.webp 1200w"
                            sizes="(max-width: 320px) 280px, (max-width: 768px) 720px, 1200px"
                        >
                        <img 
                            src="/assets/before-after/real-case1.png" 
                            alt="Real transformation"
                            loading="lazy"
                            class="gallery-img"
                        >
                    </picture>
                    <p>Amazing smile transformation</p>
                </div>
                <div class="gallery-item">
                    <picture>
                        <source 
                            type="image/webp"
                            srcset="/assets/before-after/real-case2-320w.webp 320w,
                                    /assets/before-after/real-case2-768w.webp 768w,
                                    /assets/before-after/real-case2.webp 1200w"
                            sizes="(max-width: 320px) 280px, (max-width: 768px) 720px, 1200px"
                        >
                        <img 
                            src="/assets/before-after/real-case2.png" 
                            alt="Treatment result"
                            loading="lazy"
                            class="gallery-img"
                        >
                    </picture>
                    <p>Hollywood smile</p>
                </div>
                <div class="gallery-item">
                    <picture>
                        <source 
                            type="image/webp"
                            srcset="/assets/before-after/real-case3-320w.webp 320w,
                                    /assets/before-after/real-case3-768w.webp 768w,
                                    /assets/before-after/real-case3.webp 1200w"
                            sizes="(max-width: 320px) 280px, (max-width: 768px) 720px, 1200px"
                        >
                        <img 
                            src="/assets/before-after/real-case3.png" 
                            alt="Advanced treatment"
                            loading="lazy"
                            class="gallery-img"
                        >
                    </picture>
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
                    <h3>How much does dental implant cost? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>The cost varies depending on the case and type of implant used. We offer free consultation to evaluate your case and provide a detailed treatment plan with costs.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>Is the implant procedure painful? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We use the latest local anesthesia techniques to ensure your complete comfort. Most patients describe the procedure as less painful than a regular tooth extraction.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>How long does the treatment take? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Treatment duration depends on the case. Immediate implants can be completed in one session, while traditional implants need 3-6 months for complete integration.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>Do you accept health insurance? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We work with most health insurance companies in Kuwait. Please contact us to confirm if your health insurance is accepted.</p>
                    </div>
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
            
            <div class="contact-form-section">
                <h3>Send us a Message</h3>
                <form id="contactForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="name" name="name" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" required>
                            <label for="phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service" required>
                            <option value="">Select Service</option>
                            <option value="dental-implants">Dental Implants</option>
                            <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                            <option value="general-dentistry">General Dentistry</option>
                            <option value="emergency">Emergency Treatment</option>
                            <option value="consultation">Consultation</option>
                            <option value="other">Other</option>
                        </select>
                        <label for="service">Service Needed</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="4" required></textarea>
                        <label for="message">Message</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">Sending...</span>
                    </button>
                </form>
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
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        backdrop.classList.toggle('active');
    }

    // Close Mobile Menu
    function closeMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        menu.classList.remove('active');
        toggle.classList.remove('active');
        backdrop.classList.remove('active');
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            backdrop.classList.remove('active');
        }
    });
    
    // Close menu when clicking navigation links
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
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
        
        // FAQ functionality  
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
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
    
    
    // ===== UI/UX ENHANCEMENTS INJECTED 2025-07-18 =====
    // UI/UX Enhancement JavaScript
// Mobile-first improvements for dr-islam-website

(function() {
    'use strict';
    
    // =================================
    // LAZY LOADING IMAGES
    // =================================
    
    const setupLazyLoading = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    
                    // Handle srcset for responsive images
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before visible
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    // =================================
    // TOUCH GESTURES FOR GALLERY
    // =================================
    
    const setupGalleryTouch = () => {
        const galleries = document.querySelectorAll('.gallery-container');
        
        galleries.forEach(gallery => {
            let startX = 0;
            let scrollLeft = 0;
            let isDown = false;
            
            gallery.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - gallery.offsetLeft;
                scrollLeft = gallery.scrollLeft;
            });
            
            gallery.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                
                const x = e.touches[0].pageX - gallery.offsetLeft;
                const walk = (x - startX) * 2;
                gallery.scrollLeft = scrollLeft - walk;
            });
            
            gallery.addEventListener('touchend', () => {
                isDown = false;
                
                // Snap to nearest item
                const items = gallery.querySelectorAll('.gallery-item');
                const itemWidth = items[0].offsetWidth;
                const scrollPos = gallery.scrollLeft;
                const index = Math.round(scrollPos / itemWidth);
                
                gallery.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });
            });
        });
    };
    
    // =================================
    // BEFORE/AFTER SLIDER TOUCH
    // =================================
    
    const setupBeforeAfterTouch = () => {
        const sliders = document.querySelectorAll('.before-after-slider');
        
        sliders.forEach(slider => {
            const container = slider.parentElement;
            const before = container.querySelector('.before');
            
            let isMoving = false;
            
            const moveSlider = (clientX) => {
                const rect = container.getBoundingClientRect();
                const x = clientX - rect.left;
                const percent = (x / rect.width) * 100;
                
                // Clamp between 5% and 95%
                const clampedPercent = Math.max(5, Math.min(95, percent));
                
                slider.style.left = \`\${clampedPercent}%\`;
                before.style.clipPath = \`inset(0 \${100 - clampedPercent}% 0 0)\`;
            };
            
            // Touch events
            slider.addEventListener('touchstart', (e) => {
                isMoving = true;
                e.preventDefault();
            });
            
            document.addEventListener('touchmove', (e) => {
                if (isMoving) {
                    moveSlider(e.touches[0].clientX);
                }
            });
            
            document.addEventListener('touchend', () => {
                isMoving = false;
            });
            
            // Mouse events for desktop
            slider.addEventListener('mousedown', () => {
                isMoving = true;
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isMoving) {
                    moveSlider(e.clientX);
                }
            });
            
            document.addEventListener('mouseup', () => {
                isMoving = false;
            });
        });
    };
    
    // =================================
    // SMOOTH SCROLL ENHANCEMENTS
    // =================================
    
    const setupSmoothScroll = () => {
        // Add offset for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const top = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, this.getAttribute('href'));
                }
            });
        });
    };
    
    // =================================
    // KEYBOARD NAVIGATION
    // =================================
    
    const setupKeyboardNav = () => {
        // FAQ keyboard navigation
        const faqItems = document.querySelectorAll('.faq-item h3');
        
        faqItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-expanded', 'false');
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowDown' && faqItems[index + 1]) {
                    faqItems[index + 1].focus();
                }
                
                if (e.key === 'ArrowUp' && faqItems[index - 1]) {
                    faqItems[index - 1].focus();
                }
            });
        });
        
        // Gallery keyboard navigation
        const galleryButtons = document.querySelectorAll('.gallery-nav button');
        galleryButtons.forEach(btn => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    const prevBtn = btn.previousElementSibling;
                    if (prevBtn && prevBtn.tagName === 'BUTTON') {
                        prevBtn.focus();
                    }
                }
                
                if (e.key === 'ArrowRight') {
                    const nextBtn = btn.nextElementSibling;
                    if (nextBtn && nextBtn.tagName === 'BUTTON') {
                        nextBtn.focus();
                    }
                }
            });
        });
    };
    
    // =================================
    // LOADING STATES
    // =================================
    
    const addLoadingState = (element) => {
        element.classList.add('loading');
        element.setAttribute('aria-busy', 'true');
        element.disabled = true;
    };
    
    const removeLoadingState = (element) => {
        element.classList.remove('loading');
        element.setAttribute('aria-busy', 'false');
        element.disabled = false;
    };
    
    // =================================
    // FORM ENHANCEMENTS
    // =================================
    
    const setupFormEnhancements = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add floating labels
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.value) {
                    input.classList.add('has-value');
                }
                
                input.addEventListener('focus', () => {
                    input.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    input.classList.remove('focused');
                    if (input.value) {
                        input.classList.add('has-value');
                    } else {
                        input.classList.remove('has-value');
                    }
                });
            });
            
            // Form submission with loading state
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Only handle contact form
                if (form.id !== 'contactForm') return;
                
                const submitBtn = form.querySelector('[type="submit"]');
                addLoadingState(submitBtn);
                
                try {
                    // Prepare form data
                    const formData = new FormData(form);
                    
                    // Send to backend
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const result = await response.json();
                    
                    removeLoadingState(submitBtn);
                    
                    // Remove any existing messages
                    const existingMsg = form.querySelector('.form-message');
                    if (existingMsg) existingMsg.remove();
                    
                    // Create message element
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'form-message';
                    
                    if (result.success) {
                        messageDiv.classList.add('success');
                        messageDiv.textContent = result.message || 'Your message has been sent successfully!';
                        
                        // Reset form on success
                        form.reset();
                        
                        // Remove has-value classes from inputs
                        form.querySelectorAll('input, textarea').forEach(input => {
                            input.classList.remove('has-value');
                        });
                        
                        // Track conversion event
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'form_submit', {
                                'event_category': 'engagement',
                                'event_label': 'contact_form'
                            });
                        }
                    } else {
                        messageDiv.classList.add('error');
                        messageDiv.textContent = result.error || 'There was an error sending your message. Please try again.';
                    }
                    
                    // Insert message at top of form
                    form.insertBefore(messageDiv, form.firstChild);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        messageDiv.remove();
                    }, 5000);
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    
                    removeLoadingState(submitBtn);
                    
                    // Remove any existing messages
                    const existingMsg = form.querySelector('.form-message');
                    if (existingMsg) existingMsg.remove();
                    
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-message error';
                    errorDiv.textContent = 'Network error. Please check your connection and try again.';
                    form.insertBefore(errorDiv, form.firstChild);
                    
                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 5000);
                }
            });
        });
    };
    
    // =================================
    // PERFORMANCE MONITORING
    // =================================
    
    const monitorPerformance = () => {
        // Track Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Track First Input Delay
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Track Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                    console.log('CLS:', cls);
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    };
    
    // =================================
    // INITIALIZE EVERYTHING
    // =================================
    
    document.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        setupGalleryTouch();
        setupBeforeAfterTouch();
        setupSmoothScroll();
        setupKeyboardNav();
        setupFormEnhancements();
        
        // Only monitor performance in development
        if (window.location.hostname === 'localhost') {
            monitorPerformance();
        }
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('js-loaded');
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'الصفحة جاهزة';
        document.body.appendChild(announcement);
    });
    
    // =================================
    // PROGRESSIVE ENHANCEMENT CHECK
    // =================================
    
    // Add class to indicate JS is available
    document.documentElement.classList.add('js');
    document.documentElement.classList.remove('no-js');
    
})();
    // ===== END UI/UX ENHANCEMENTS =====
    
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                    
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch(err => console.log('ServiceWorker registration failed:', err));
        });
        
        // Install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button after 30 seconds
            setTimeout(() => {
                if (deferredPrompt) {
                    const installBanner = document.createElement('div');
                    installBanner.className = 'install-prompt';
                    installBanner.innerHTML = \`
                        <p>Install the app for quick access</p>
                        <button onclick="installPWA()">Install</button>
                        <button onclick="dismissInstall()">Later</button>
                    \`;
                    document.body.appendChild(installBanner);
                }
            }, 30000);
        });
        
        window.installPWA = async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(\`User response: \${outcome}\`);
                deferredPrompt = null;
                document.querySelector('.install-prompt')?.remove();
            }
        };
        
        window.dismissInstall = () => {
            document.querySelector('.install-prompt')?.remove();
        };
    }
    </script>
</body>
</html>`;