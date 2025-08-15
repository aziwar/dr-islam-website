// New Homepage Design for Dr. Islam Website
// Inspired by modern dental template with Dr. Islam brand colors
import { DentalLogo } from '../../content/components/DentalLogo.js';
import { Button } from '../../components/atoms/Button.js';
import { Icon } from '../../components/atoms/Icon.js';
import { ServiceCard } from '../../components/molecules/ServiceCard.js';

export function getNewHomepage() {
  return `
    <!-- Emergency Banner -->
    <div class="emergency-banner" role="banner" aria-label="Emergency dental care contact">
        <div class="emergency-content">
            <div class="emergency-info">
                <span class="emergency-icon">🚨</span>
                <span class="emergency-text">Dental Emergency? We're Available 24/7</span>
            </div>
            <a href="tel:+96598563711" class="emergency-cta" aria-label="Call emergency number">
                <span class="emergency-phone">Call Now: +965 98563711</span>
            </a>
        </div>
    </div>

    <!-- Header Section -->
    <header class="modern-header">
        <!-- Top Bar -->
        <div class="header-top">
            <div class="container">
                <div class="top-info">
                    <div class="contact-info">
                        <a href="#" class="location-link">
                            <span class="icon">📍</span>
                            Hawally, Kuwait
                        </a>
                        <a href="tel:+96598563711" class="phone-link">
                            <span class="icon">📞</span>
                            +965 98563711
                        </a>
                    </div>
                    <div class="social-links">
                        <a href="https://www.instagram.com/dr.islamelsagher/" target="_blank" aria-label="Follow us on Instagram">
                            ${Icon.create({ name: 'instagram', size: 'sm', ariaLabel: 'Instagram' })}
                        </a>
                        <a href="https://wa.me/96598563711" target="_blank" aria-label="Contact us on WhatsApp">
                            ${Icon.create({ name: 'whatsapp', size: 'sm', ariaLabel: 'WhatsApp' })}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Header -->
        <div class="header-main">
            <div class="container">
                <div class="header-content">
                    <!-- Logo -->
                    <a href="#" class="logo-container">
                        ${DentalLogo.svgEn}
                        <div class="logo-text">
                            <div class="logo-name">Dr. Islam Elsagher</div>
                            <div class="logo-subtitle">General Dentist & Implantologist</div>
                        </div>
                    </a>
                    
                    <!-- Desktop Navigation -->
                    <nav class="main-navigation" role="navigation" aria-label="Main navigation">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="#home" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#services" class="nav-link">Services</a>
                                <div class="dropdown-menu">
                                    <div class="dropdown-grid">
                                        <div class="dropdown-section">
                                            <h4>🚨 Emergency Care</h4>
                                            <a href="#emergency">Emergency Treatment</a>
                                        </div>
                                        <div class="dropdown-section">
                                            <h4>⭐ Popular Services</h4>
                                            <a href="#implants">Dental Implants</a>
                                            <a href="#cosmetic">Hollywood Smile</a>
                                        </div>
                                        <div class="dropdown-section">
                                            <h4>🔧 Specialized</h4>
                                            <a href="#root-canal">Root Canal</a>
                                            <a href="#oral-surgery">Oral Surgery</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#about" class="nav-link">About Dr. Islam</a>
                            </li>
                            <li class="nav-item">
                                <a href="#contact" class="nav-link">Contact</a>
                            </li>
                            <li class="nav-item language">
                                <a href="/ar/" class="nav-link lang-switch">العربية</a>
                            </li>
                        </ul>
                    </nav>
                    
                    <!-- CTA Button -->
                    ${Button.create({
                        variant: 'primary',
                        text: 'Book Appointment',
                        onClick: 'openBookingModal()',
                        ariaLabel: 'Schedule an appointment',
                        className: 'header-cta'
                    })}

                    <!-- Mobile Menu Button -->
                    ${Button.create({
                        variant: 'mobile-toggle',
                        text: '☰',
                        onClick: 'toggleMobileMenu()',
                        ariaLabel: 'Toggle navigation menu',
                        className: 'mobile-menu-btn'
                    })}
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobile-menu">
            <div class="mobile-menu-content">
                <div class="mobile-nav-section">
                    <h3>Navigation</h3>
                    <a href="#home" class="mobile-nav-link">Home</a>
                    <a href="#services" class="mobile-nav-link">Services</a>
                    <a href="#about" class="mobile-nav-link">About Dr. Islam</a>
                    <a href="#contact" class="mobile-nav-link">Contact</a>
                </div>
                <div class="mobile-cta-section">
                    ${Button.create({
                        variant: 'primary',
                        text: 'Book Appointment',
                        onClick: 'openBookingModal(); closeMobileMenu();',
                        className: 'mobile-cta-btn'
                    })}
                    <a href="tel:+96598563711" class="mobile-emergency-btn">
                        🚨 Emergency Call
                    </a>
                    <a href="/ar/" class="mobile-lang-switch">العربية</a>
                </div>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section id="home" class="hero-section">
            <div class="hero-background"></div>
            <div class="hero-overlay"></div>
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">
                            Exceptional Dental Care<br>
                            <span class="hero-highlight">for Your Entire Family</span>
                        </h1>
                        <p class="hero-description">
                            We provide personalized, high-quality dental care with 15+ years of experience. 
                            From routine check-ups to complex implant procedures, we're here for your smile.
                        </p>
                        <div class="hero-actions">
                            ${Button.create({
                                variant: 'primary-large',
                                text: 'Book Your Visit',
                                onClick: 'openBookingModal()',
                                className: 'hero-cta'
                            })}
                            <a href="#about" class="hero-secondary-btn">
                                Learn More About Dr. Islam
                            </a>
                        </div>
                    </div>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-number">5000+</div>
                            <div class="stat-label">Happy Patients</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">15+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">98%</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="about-section">
            <div class="container">
                <div class="about-grid">
                    <div class="about-image">
                        <div class="image-container">
                            <img src="/assets/images/dr-islam-portrait.webp" alt="Dr. Islam Elsagher" class="doctor-image">
                            <div class="image-overlay">
                                <div class="credentials">
                                    <div class="credential-item">✓ Licensed by Kuwait Ministry of Health</div>
                                    <div class="credential-item">✓ Member of Kuwait Dental Association</div>
                                    <div class="credential-item">✓ Master's in Periodontics & Laser Sciences</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="about-content">
                        <h2 class="section-title">Welcome to Dr. Islam's Practice</h2>
                        <p class="about-text">
                            We are a premier dental clinic dedicated to providing top-quality dental services. 
                            Our clinic is equipped with the latest technology, and Dr. Islam is committed to 
                            ensuring your comfort and health. From routine check-ups to complex procedures, 
                            we are here to help you achieve and maintain a beautiful, healthy smile.
                        </p>
                        <p class="about-text">
                            With over 15 years of experience in Egypt and Kuwait, Dr. Islam specializes in 
                            dental implants, cosmetic dentistry, and oral surgery. We believe in a patient-first 
                            approach, taking the time to understand your needs and concerns.
                        </p>
                        <a href="#qualifications" class="about-link">
                            Learn More About Dr. Islam's Qualifications →
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="services-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Our Comprehensive Services</h2>
                    <p class="section-subtitle">Expert care for all your dental needs</p>
                </div>
                <div class="services-grid">
                    <!-- Emergency Care -->
                    <div class="service-category emergency-category">
                        <div class="category-header">
                            <h3 class="category-title">🚨 Emergency Care</h3>
                            <p class="category-subtitle">Urgent dental problems - we're here to help</p>
                        </div>
                        <div class="category-services">
                            ${await ServiceCard.create({
                                title: 'Emergency Treatment',
                                description: 'Immediate pain relief and urgent dental care available 24/7',
                                icon: 'emergency-dental',
                                variant: 'emergency',
                                badge: '24/7',
                                onClick: 'openBookingModal("emergency")'
                            })}
                        </div>
                    </div>

                    <!-- Popular Services -->
                    <div class="service-category popular-category">
                        <div class="category-header">
                            <h3 class="category-title">⭐ Popular Services</h3>
                            <p class="category-subtitle">Our most requested treatments</p>
                        </div>
                        <div class="category-services">
                            ${await ServiceCard.create({
                                title: 'Dental Implants',
                                description: 'Immediate and delayed implants with latest techniques. Permanent solution for missing teeth.',
                                icon: 'dental-implant',
                                variant: 'primary',
                                badge: 'Most Popular',
                                features: ['Single tooth replacement', 'Multiple teeth solutions', 'Same-day implants available'],
                                onClick: 'openBookingModal("dental-implants")'
                            })}
                            ${await ServiceCard.create({
                                title: 'Hollywood Smile',
                                description: 'Complete cosmetic makeover with veneers and whitening for that perfect smile.',
                                icon: 'cosmetic-dentistry',
                                variant: 'primary',
                                badge: 'Celebrity Choice',
                                features: ['Porcelain veneers', 'Professional whitening', 'Complete smile design'],
                                onClick: 'openBookingModal("cosmetic-dentistry")'
                            })}
                        </div>
                    </div>

                    <!-- Specialized Services -->
                    <div class="service-category specialized-category">
                        <div class="category-header">
                            <h3 class="category-title">🔧 Specialized Treatments</h3>
                            <p class="category-subtitle">Advanced procedures by our specialist</p>
                        </div>
                        <div class="category-services">
                            ${await ServiceCard.create({
                                title: 'Root Canal Treatment',
                                description: 'Advanced endodontic treatment to save your natural teeth',
                                icon: 'root-canal',
                                variant: 'standard',
                                features: ['Pain-free procedure', 'Latest rotary systems', 'Single visit option'],
                                onClick: 'openBookingModal("root-canal")'
                            })}
                            ${await ServiceCard.create({
                                title: 'Oral Surgery',
                                description: 'Surgical extractions and advanced oral surgical procedures',
                                icon: 'oral-surgery',
                                variant: 'standard',
                                features: ['Wisdom teeth removal', 'Surgical extractions', 'Bone grafting'],
                                onClick: 'openBookingModal("oral-surgery")'
                            })}
                        </div>
                    </div>

                    <!-- Preventive Care -->
                    <div class="service-category preventive-category">
                        <div class="category-header">
                            <h3 class="category-title">🛡️ Preventive Care</h3>
                            <p class="category-subtitle">Keep your smile healthy and beautiful</p>
                        </div>
                        <div class="category-services">
                            ${await ServiceCard.create({
                                title: 'Professional Cleaning',
                                description: 'Regular maintenance to prevent dental problems',
                                icon: 'dental-cleaning',
                                variant: 'preventive',
                                features: ['Deep cleaning', 'Plaque removal', 'Polishing'],
                                onClick: 'openBookingModal("cleaning")'
                            })}
                            ${await ServiceCard.create({
                                title: 'Gum Treatment',
                                description: 'Periodontal therapy and gum disease prevention',
                                icon: 'gum-treatment',
                                variant: 'preventive',
                                features: ['Gum disease treatment', 'Periodontal maintenance', 'Deep cleaning'],
                                onClick: 'openBookingModal("gum-treatment")'
                            })}
                        </div>
                    </div>
                </div>

                <!-- Services CTA -->
                <div class="services-cta">
                    <div class="cta-content">
                        <h3>Not sure which service you need?</h3>
                        <p>Schedule a consultation and let Dr. Islam recommend the best treatment for you.</p>
                        <div class="cta-buttons">
                            ${Button.create({
                                variant: 'primary',
                                text: 'Schedule Free Consultation',
                                onClick: 'openBookingModal()',
                                className: 'cta-primary'
                            })}
                            <a href="#services-table" class="cta-secondary">View All Services</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Meet The Doctor Section -->
        <section id="meet-doctor" class="doctor-section">
            <div class="container">
                <div class="doctor-grid">
                    <div class="doctor-info">
                        <h2 class="section-title">Meet Dr. Islam Elsagher</h2>
                        <p class="doctor-description">
                            Dr. Islam is a passionate and skilled dentist with over 15 years of experience. 
                            He graduated with honors from Alexandria University and holds advanced degrees in 
                            Periodontics and Laser Sciences. His gentle approach and commitment to patient 
                            comfort make every visit a positive experience.
                        </p>
                        
                        <div class="qualifications">
                            <h4>Education & Qualifications</h4>
                            <ul class="qualification-list">
                                <li>Bachelor of Oral and Dental Medicine - Alexandria University (2004-2009)</li>
                                <li>Diploma in Dental Implants - Alexandria University (2010-2011)</li>
                                <li>Master of Periodontics - Al-Azhar University</li>
                                <li>Master of Laser Sciences - Cairo University</li>
                            </ul>
                        </div>

                        <div class="experience-stats">
                            <div class="stat-item">
                                <div class="stat-number">5000+</div>
                                <div class="stat-label">Happy Patients</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">1200+</div>
                                <div class="stat-label">Successful Implants</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">15+</div>
                                <div class="stat-label">Years Experience</div>
                            </div>
                        </div>
                        
                        <a href="#about-full" class="doctor-link">
                            Learn More About Dr. Islam's Experience →
                        </a>
                    </div>
                    <div class="doctor-image">
                        <img src="/assets/images/dr-islam-clinic.webp" alt="Dr. Islam Elsagher in his clinic" class="clinic-image">
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="testimonials-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">What Our Patients Say</h2>
                    <p class="section-subtitle">Real experiences from real patients</p>
                </div>
                <div class="testimonials-grid">
                    <!-- Testimonial 1 -->
                    <div class="testimonial-card">
                        <div class="quote-icon">💬</div>
                        <p class="testimonial-text">
                            "Excellent service and very professional doctor. Dr. Islam explained every step of the treatment 
                            and the result was amazing. I couldn't be happier with my new smile!"
                        </p>
                        <div class="testimonial-author">
                            <div class="author-avatar">👤</div>
                            <div class="author-info">
                                <div class="author-name">Ahmed Al-Salem</div>
                                <div class="author-treatment">Dental Implants</div>
                                <div class="author-rating">⭐⭐⭐⭐⭐</div>
                            </div>
                        </div>
                        <div class="testimonial-meta">
                            <span class="testimonial-date">January 2025</span>
                            <span class="verified-badge">✓ Verified Patient</span>
                        </div>
                    </div>

                    <!-- Testimonial 2 -->
                    <div class="testimonial-card">
                        <div class="quote-icon">💬</div>
                        <p class="testimonial-text">
                            "Best dental implant experience in Kuwait. The doctor is very skilled and the team is cooperative. 
                            I recommend everyone to visit the clinic for quality treatment."
                        </p>
                        <div class="testimonial-author">
                            <div class="author-avatar">👩</div>
                            <div class="author-info">
                                <div class="author-name">Fatima Al-Ali</div>
                                <div class="author-treatment">Cosmetic Dentistry</div>
                                <div class="author-rating">⭐⭐⭐⭐⭐</div>
                            </div>
                        </div>
                        <div class="testimonial-meta">
                            <span class="testimonial-date">December 2024</span>
                            <span class="verified-badge">✓ Verified Patient</span>
                        </div>
                    </div>

                    <!-- Testimonial 3 -->
                    <div class="testimonial-card">
                        <div class="quote-icon">💬</div>
                        <p class="testimonial-text">
                            "Professional treatment and stunning results. Dr. Islam completely transformed my smile with 
                            Hollywood smile procedure. The technology used is state-of-the-art."
                        </p>
                        <div class="testimonial-author">
                            <div class="author-avatar">👨</div>
                            <div class="author-info">
                                <div class="author-name">Mohammed Al-Khalid</div>
                                <div class="author-treatment">Smile Makeover</div>
                                <div class="author-rating">⭐⭐⭐⭐⭐</div>
                            </div>
                        </div>
                        <div class="testimonial-meta">
                            <span class="testimonial-date">November 2024</span>
                            <span class="verified-badge">✓ Verified Patient</span>
                        </div>
                    </div>
                </div>

                <!-- Testimonial Stats -->
                <div class="testimonial-stats">
                    <div class="stat-item">
                        <div class="stat-number">4.9</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Happy Patients</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Would Recommend</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact & Map Section -->
        <section id="contact" class="contact-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Request an Appointment</h2>
                    <p class="section-subtitle">We're looking forward to hearing from you</p>
                </div>
                <div class="contact-grid">
                    <!-- Contact Form -->
                    <div class="contact-form-container">
                        <form class="contact-form" action="/api/contact" method="POST">
                            <div class="form-group">
                                <label for="contact-name" class="form-label">Full Name *</label>
                                <input type="text" id="contact-name" name="name" required class="form-input">
                            </div>
                            <div class="form-group">
                                <label for="contact-email" class="form-label">Email</label>
                                <input type="email" id="contact-email" name="email" class="form-input">
                            </div>
                            <div class="form-group">
                                <label for="contact-phone" class="form-label">Phone *</label>
                                <input type="tel" id="contact-phone" name="phone" required class="form-input">
                            </div>
                            <div class="form-group">
                                <label for="contact-service" class="form-label">Service Needed</label>
                                <select id="contact-service" name="service" class="form-select">
                                    <option value="">Select Service</option>
                                    <option value="dental-implants">Dental Implants</option>
                                    <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                                    <option value="root-canal">Root Canal Treatment</option>
                                    <option value="general-checkup">General Checkup</option>
                                    <option value="emergency">Emergency Treatment</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="contact-message" class="form-label">Message</label>
                                <textarea id="contact-message" name="message" rows="4" class="form-textarea"></textarea>
                            </div>
                            ${Button.create({
                                variant: 'primary',
                                text: 'Send Message',
                                type: 'submit',
                                className: 'form-submit'
                            })}
                        </form>
                    </div>

                    <!-- Contact Info & Map -->
                    <div class="contact-info-container">
                        <div class="contact-info">
                            <h4 class="contact-title">Office Hours</h4>
                            <div class="office-hours">
                                <div class="hours-item">
                                    <span class="day">Saturday - Thursday</span>
                                    <span class="time">9:00 AM - 9:00 PM</span>
                                </div>
                                <div class="hours-item">
                                    <span class="day">Friday</span>
                                    <span class="time">Closed</span>
                                </div>
                                <div class="availability-status">Available Today</div>
                            </div>

                            <div class="contact-methods">
                                <div class="contact-method">
                                    <div class="method-icon">📞</div>
                                    <div class="method-info">
                                        <div class="method-label">Phone</div>
                                        <a href="tel:+96598563711" class="method-value">+965 98563711</a>
                                    </div>
                                </div>
                                <div class="contact-method">
                                    <div class="method-icon">✉️</div>
                                    <div class="method-info">
                                        <div class="method-label">Email</div>
                                        <a href="mailto:dr.islam_elsagher@gmail.com" class="method-value">dr.islam_elsagher@gmail.com</a>
                                    </div>
                                </div>
                                <div class="contact-method">
                                    <div class="method-icon">📱</div>
                                    <div class="method-info">
                                        <div class="method-label">WhatsApp</div>
                                        <a href="https://wa.me/96598563711" class="method-value">+965 98563711</a>
                                    </div>
                                </div>
                                <div class="contact-method">
                                    <div class="method-icon">📍</div>
                                    <div class="method-info">
                                        <div class="method-label">Location</div>
                                        <span class="method-value">Hawally, Kuwait</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- CSS Styles -->
    <style>
        /* ===== BRAND COLORS ===== */
        :root {
            /* Dr. Islam Brand Colors */
            --primary: #A08F65;
            --primary-dark: #8B7B56;
            --primary-light: #BEB093;
            --secondary: #3D3B32;
            --accent: #D4C5A3;
            
            /* Supporting Colors */
            --white: #FFFFFF;
            --black: #000000;
            --gray-50: #F9FAFB;
            --gray-100: #F3F4F6;
            --gray-200: #E5E7EB;
            --gray-300: #D1D5DB;
            --gray-400: #9CA3AF;
            --gray-500: #6B7280;
            --gray-600: #4B5563;
            --gray-700: #374151;
            --gray-800: #1F2937;
            --emergency: #DC2626;
            
            /* Spacing */
            --space-xs: 0.25rem;
            --space-sm: 0.5rem;
            --space-md: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --space-2xl: 3rem;
            --space-3xl: 4rem;
            
            /* Typography */
            --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-size-xs: 0.75rem;
            --font-size-sm: 0.875rem;
            --font-size-base: 1rem;
            --font-size-lg: 1.125rem;
            --font-size-xl: 1.25rem;
            --font-size-2xl: 1.5rem;
            --font-size-3xl: 1.875rem;
            --font-size-4xl: 2.25rem;
            --font-size-5xl: 3rem;
            --font-size-6xl: 3.75rem;
            
            /* Shadows */
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            
            /* Borders */
            --radius-sm: 0.375rem;
            --radius-md: 0.5rem;
            --radius-lg: 0.75rem;
            --radius-xl: 1rem;
            
            /* Transitions */
            --transition-fast: all 0.15s ease-in-out;
            --transition-normal: all 0.3s ease-in-out;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: var(--font-family);
            font-size: var(--font-size-base);
            line-height: 1.6;
            color: var(--gray-800);
            background-color: var(--gray-50);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--space-md);
        }

        /* ===== EMERGENCY BANNER ===== */
        .emergency-banner {
            background: linear-gradient(135deg, var(--emergency) 0%, #B91C1C 100%);
            color: var(--white);
            padding: var(--space-sm) 0;
            position: sticky;
            top: 0;
            z-index: 60;
        }

        .emergency-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--space-md);
        }

        .emergency-info {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        }

        .emergency-icon {
            font-size: var(--font-size-lg);
            animation: pulse 2s infinite;
        }

        .emergency-cta {
            color: var(--white);
            text-decoration: none;
            font-weight: 600;
            padding: var(--space-xs) var(--space-md);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
        }

        .emergency-cta:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* ===== HEADER ===== */
        .modern-header {
            background: var(--white);
            box-shadow: var(--shadow-md);
            position: sticky;
            top: 0;
            z-index: 50;
        }

        .header-top {
            background: var(--gray-100);
            border-bottom: 1px solid var(--gray-200);
            padding: var(--space-sm) 0;
        }

        .top-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: var(--font-size-sm);
        }

        .contact-info {
            display: flex;
            gap: var(--space-lg);
        }

        .contact-info a {
            color: var(--gray-600);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            transition: var(--transition-fast);
        }

        .contact-info a:hover {
            color: var(--primary);
        }

        .social-links {
            display: flex;
            gap: var(--space-md);
        }

        .social-links a {
            color: var(--gray-500);
            transition: var(--transition-fast);
        }

        .social-links a:hover {
            color: var(--primary);
        }

        .header-main {
            padding: var(--space-md) 0;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo-container {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            text-decoration: none;
        }

        .logo-text {
            display: flex;
            flex-direction: column;
        }

        .logo-name {
            font-size: var(--font-size-xl);
            font-weight: 700;
            color: var(--secondary);
        }

        .logo-subtitle {
            font-size: var(--font-size-sm);
            color: var(--gray-600);
        }

        .main-navigation {
            display: none;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: var(--space-xl);
            align-items: center;
        }

        .nav-link {
            color: var(--gray-600);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition-fast);
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary);
        }

        .dropdown {
            position: relative;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: -50px;
            right: -50px;
            background: var(--white);
            border: 1px solid var(--gray-200);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            padding: var(--space-lg);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: var(--transition-normal);
            z-index: 100;
            min-width: 500px;
        }

        .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
        }

        .dropdown-section h4 {
            color: var(--primary);
            font-size: var(--font-size-sm);
            margin-bottom: var(--space-sm);
        }

        .dropdown-section a {
            display: block;
            color: var(--gray-600);
            text-decoration: none;
            padding: var(--space-xs) 0;
            font-size: var(--font-size-sm);
            transition: var(--transition-fast);
        }

        .dropdown-section a:hover {
            color: var(--primary);
            padding-left: var(--space-sm);
        }

        .header-cta {
            display: none;
        }

        .mobile-menu-btn {
            display: block;
        }

        /* ===== MOBILE MENU ===== */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            height: calc(100vh - 100%);
            background: var(--white);
            transform: translateY(0);
            transition: var(--transition-normal);
            z-index: 40;
            overflow-y: auto;
        }

        .mobile-menu.active {
            display: block;
            transform: translateY(-100vh);
        }

        .mobile-menu-content {
            padding: var(--space-xl);
        }

        .mobile-nav-section {
            margin-bottom: var(--space-xl);
            padding-bottom: var(--space-xl);
            border-bottom: 1px solid var(--gray-200);
        }

        .mobile-nav-section h3 {
            color: var(--secondary);
            margin-bottom: var(--space-lg);
        }

        .mobile-nav-link {
            display: block;
            color: var(--gray-600);
            text-decoration: none;
            padding: var(--space-md) 0;
            font-size: var(--font-size-lg);
            border-bottom: 1px solid var(--gray-100);
            transition: var(--transition-fast);
        }

        .mobile-nav-link:hover {
            color: var(--primary);
            padding-left: var(--space-md);
        }

        .mobile-cta-section {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
        }

        .mobile-cta-btn {
            width: 100%;
            text-align: center;
            padding: var(--space-md);
            font-size: var(--font-size-lg);
        }

        .mobile-emergency-btn {
            display: block;
            text-align: center;
            background: var(--emergency);
            color: var(--white);
            text-decoration: none;
            padding: var(--space-md);
            border-radius: var(--radius-md);
            font-weight: 600;
            transition: var(--transition-fast);
        }

        .mobile-emergency-btn:hover {
            background: #B91C1C;
            transform: translateY(-1px);
        }

        .mobile-lang-switch {
            display: block;
            text-align: center;
            color: var(--gray-600);
            text-decoration: none;
            padding: var(--space-md);
            border: 1px solid var(--gray-300);
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
        }

        .mobile-lang-switch:hover {
            border-color: var(--primary);
            color: var(--primary);
        }

        /* ===== HERO SECTION ===== */
        .hero-section {
            position: relative;
            min-height: 80vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
            overflow: hidden;
        }

        .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://placehold.co/1920x1080/A08F65/FFFFFF?text=Modern+Dental+Clinic');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.3;
        }

        .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(61, 59, 50, 0.7);
        }

        .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            animation: fadeInUp 1s ease-out;
        }

        .hero-title {
            font-size: var(--font-size-4xl);
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: var(--space-lg);
        }

        .hero-highlight {
            color: var(--accent);
        }

        .hero-description {
            font-size: var(--font-size-lg);
            max-width: 600px;
            margin: 0 auto var(--space-xl);
            opacity: 0.9;
        }

        .hero-actions {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
            align-items: center;
            margin-bottom: var(--space-3xl);
        }

        .hero-cta {
            font-size: var(--font-size-lg);
            padding: var(--space-lg) var(--space-2xl);
        }

        .hero-secondary-btn {
            color: var(--white);
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: var(--space-md) var(--space-xl);
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
        }

        .hero-secondary-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
            max-width: 500px;
            margin: 0 auto;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: var(--font-size-3xl);
            font-weight: 700;
            color: var(--accent);
        }

        .stat-label {
            font-size: var(--font-size-sm);
            opacity: 0.8;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ===== SECTIONS ===== */
        section {
            padding: var(--space-3xl) 0;
        }

        .section-title {
            font-size: var(--font-size-3xl);
            font-weight: 700;
            color: var(--secondary);
            text-align: center;
            margin-bottom: var(--space-lg);
        }

        .section-subtitle {
            font-size: var(--font-size-lg);
            color: var(--gray-600);
            text-align: center;
            margin-bottom: var(--space-2xl);
        }

        .section-header {
            margin-bottom: var(--space-3xl);
        }

        /* ===== ABOUT SECTION ===== */
        .about-section {
            background: var(--white);
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
            align-items: center;
        }

        .about-image {
            position: relative;
        }

        .image-container {
            position: relative;
            border-radius: var(--radius-xl);
            overflow: hidden;
            box-shadow: var(--shadow-xl);
        }

        .doctor-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }

        .image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            padding: var(--space-xl);
            color: var(--white);
        }

        .credential-item {
            display: flex;
            align-items: center;
            font-size: var(--font-size-sm);
            margin-bottom: var(--space-xs);
        }

        .about-content {
            text-align: center;
        }

        .about-text {
            font-size: var(--font-size-lg);
            color: var(--gray-600);
            margin-bottom: var(--space-lg);
            line-height: 1.7;
        }

        .about-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition-fast);
        }

        .about-link:hover {
            text-decoration: underline;
        }

        /* ===== SERVICES SECTION ===== */
        .services-section {
            background: var(--gray-50);
        }

        .services-grid {
            display: flex;
            flex-direction: column;
            gap: var(--space-3xl);
        }

        .service-category {
            background: var(--white);
            border-radius: var(--radius-xl);
            padding: var(--space-2xl);
            box-shadow: var(--shadow-md);
        }

        .category-header {
            text-align: center;
            margin-bottom: var(--space-xl);
        }

        .category-title {
            font-size: var(--font-size-2xl);
            font-weight: 600;
            margin-bottom: var(--space-sm);
        }

        .category-subtitle {
            color: var(--gray-600);
            font-size: var(--font-size-base);
        }

        .emergency-category .category-title {
            color: var(--emergency);
        }

        .popular-category .category-title {
            color: var(--primary);
        }

        .specialized-category .category-title {
            color: var(--secondary);
        }

        .preventive-category .category-title {
            color: var(--gray-600);
        }

        .category-services {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-xl);
        }

        .services-cta {
            background: var(--white);
            border-radius: var(--radius-xl);
            padding: var(--space-3xl);
            text-align: center;
            box-shadow: var(--shadow-md);
        }

        .cta-content h3 {
            font-size: var(--font-size-xl);
            color: var(--secondary);
            margin-bottom: var(--space-sm);
        }

        .cta-content p {
            color: var(--gray-600);
            margin-bottom: var(--space-xl);
        }

        .cta-buttons {
            display: flex;
            flex-direction: column;
            gap: var(--space-md);
            align-items: center;
        }

        .cta-secondary {
            color: var(--gray-600);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition-fast);
        }

        .cta-secondary:hover {
            color: var(--primary);
        }

        /* ===== DOCTOR SECTION ===== */
        .doctor-section {
            background: var(--white);
        }

        .doctor-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
            align-items: center;
        }

        .doctor-description {
            font-size: var(--font-size-lg);
            color: var(--gray-600);
            margin-bottom: var(--space-xl);
            line-height: 1.7;
        }

        .qualifications {
            margin-bottom: var(--space-xl);
        }

        .qualifications h4 {
            color: var(--secondary);
            font-size: var(--font-size-lg);
            margin-bottom: var(--space-md);
        }

        .qualification-list {
            list-style: none;
            padding-left: 0;
        }

        .qualification-list li {
            color: var(--gray-600);
            margin-bottom: var(--space-sm);
            padding-left: var(--space-lg);
            position: relative;
        }

        .qualification-list li:before {
            content: "✓";
            color: var(--primary);
            font-weight: bold;
            position: absolute;
            left: 0;
        }

        .experience-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
            margin-bottom: var(--space-xl);
            padding: var(--space-xl);
            background: var(--gray-50);
            border-radius: var(--radius-lg);
        }

        .doctor-link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition-fast);
        }

        .doctor-link:hover {
            text-decoration: underline;
        }

        .clinic-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-xl);
        }

        /* ===== TESTIMONIALS SECTION ===== */
        .testimonials-section {
            background: var(--white);
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-xl);
            margin-bottom: var(--space-3xl);
        }

        .testimonial-card {
            background: var(--gray-50);
            padding: var(--space-xl);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            text-align: center;
        }

        .quote-icon {
            font-size: var(--font-size-3xl);
            color: var(--primary);
            margin-bottom: var(--space-md);
        }

        .testimonial-text {
            font-size: var(--font-size-lg);
            color: var(--gray-600);
            font-style: italic;
            margin-bottom: var(--space-lg);
            line-height: 1.7;
        }

        .testimonial-author {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--space-md);
            margin-bottom: var(--space-md);
        }

        .author-avatar {
            font-size: var(--font-size-3xl);
        }

        .author-info {
            text-align: left;
        }

        .author-name {
            font-weight: 600;
            color: var(--secondary);
        }

        .author-treatment {
            font-size: var(--font-size-sm);
            color: var(--gray-600);
        }

        .author-rating {
            font-size: var(--font-size-sm);
            color: var(--primary);
        }

        .testimonial-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: var(--font-size-sm);
            color: var(--gray-500);
        }

        .verified-badge {
            color: var(--primary);
            font-weight: 500;
        }

        .testimonial-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-lg);
            max-width: 500px;
            margin: 0 auto;
            padding: var(--space-xl);
            background: var(--gray-50);
            border-radius: var(--radius-lg);
        }

        /* ===== CONTACT SECTION ===== */
        .contact-section {
            background: var(--white);
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
        }

        .contact-form-container {
            background: var(--gray-50);
            padding: var(--space-2xl);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
        }

        .contact-form {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-label {
            font-weight: 500;
            color: var(--gray-700);
            margin-bottom: var(--space-sm);
        }

        .form-input,
        .form-select,
        .form-textarea {
            width: 100%;
            padding: var(--space-md);
            border: 2px solid var(--gray-300);
            border-radius: var(--radius-md);
            font-size: var(--font-size-base);
            transition: var(--transition-fast);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(160, 143, 101, 0.1);
        }

        .form-textarea {
            resize: vertical;
            font-family: inherit;
        }

        .form-submit {
            width: 100%;
            font-size: var(--font-size-lg);
            padding: var(--space-md);
        }

        .contact-info-container {
            display: flex;
            flex-direction: column;
            gap: var(--space-xl);
        }

        .contact-title {
            font-size: var(--font-size-lg);
            color: var(--secondary);
            margin-bottom: var(--space-md);
        }

        .office-hours {
            background: var(--gray-50);
            padding: var(--space-lg);
            border-radius: var(--radius-md);
        }

        .hours-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--space-sm);
        }

        .day {
            font-weight: 500;
            color: var(--gray-700);
        }

        .time {
            color: var(--gray-600);
        }

        .availability-status {
            margin-top: var(--space-md);
            padding: var(--space-sm);
            background: var(--primary);
            color: var(--white);
            text-align: center;
            border-radius: var(--radius-sm);
            font-size: var(--font-size-sm);
            font-weight: 500;
        }

        .contact-methods {
            display: flex;
            flex-direction: column;
            gap: var(--space-lg);
        }

        .contact-method {
            display: flex;
            align-items: center;
            gap: var(--space-md);
        }

        .method-icon {
            font-size: var(--font-size-xl);
            width: 40px;
            text-align: center;
        }

        .method-label {
            font-size: var(--font-size-sm);
            color: var(--gray-500);
        }

        .method-value {
            color: var(--gray-700);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition-fast);
        }

        .method-value:hover {
            color: var(--primary);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (min-width: 768px) {
            .container {
                padding: 0 var(--space-lg);
            }

            .emergency-content {
                padding: 0 var(--space-lg);
            }

            .top-info {
                font-size: var(--font-size-base);
            }

            .main-navigation {
                display: block;
            }

            .header-cta {
                display: inline-block;
            }

            .mobile-menu-btn {
                display: none;
            }

            .hero-title {
                font-size: var(--font-size-5xl);
            }

            .hero-actions {
                flex-direction: row;
                justify-content: center;
            }

            .about-grid {
                grid-template-columns: 1fr 1fr;
            }

            .about-content {
                text-align: left;
            }

            .category-services {
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }

            .doctor-grid {
                grid-template-columns: 1fr 1fr;
            }

            .testimonials-grid {
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }

            .contact-grid {
                grid-template-columns: 1fr 1fr;
            }

            .cta-buttons {
                flex-direction: row;
            }
        }

        @media (min-width: 1024px) {
            .container {
                padding: 0 var(--space-xl);
            }

            .emergency-content {
                padding: 0 var(--space-xl);
            }

            .hero-title {
                font-size: var(--font-size-6xl);
            }

            .testimonials-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* ===== ACCESSIBILITY ===== */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
                transition: none !important;
            }
        }

        @media (prefers-contrast: high) {
            .nav-link,
            .method-value,
            .about-link,
            .doctor-link {
                border: 1px solid currentColor;
                padding: var(--space-xs);
            }
        }

        /* ===== PRINT STYLES ===== */
        @media print {
            .emergency-banner,
            .header-top,
            .mobile-menu,
            .hero-section,
            .contact-form-container {
                display: none;
            }
            
            body {
                color: black;
                background: white;
            }
        }
    </style>

    <!-- JavaScript for Enhanced Functionality -->
    <script>
        // Initialize page functionality
        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
            initializeAnimations();
            initializeFormHandling();
        });

        function initializeNavigation() {
            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', function() {
                    mobileMenu.classList.toggle('active');
                    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
                });
            }

            // Close mobile menu on link click
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Smooth scroll for anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        function initializeAnimations() {
            // Intersection Observer for scroll animations
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);

                // Observe elements for animation
                const animateElements = document.querySelectorAll('.service-category, .testimonial-card, .about-grid > *, .doctor-grid > *');
                animateElements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    observer.observe(el);
                });
            }
        }

        function initializeFormHandling() {
            const contactForm = document.querySelector('.contact-form');
            
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const submitBtn = this.querySelector('.form-submit');
                    const originalText = submitBtn.textContent;
                    
                    // Show loading state
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    try {
                        const formData = new FormData(this);
                        const response = await fetch('/api/contact', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const result = await response.json();
                        
                        if (result.success) {
                            // Show success message
                            this.innerHTML = '<div style="text-align: center; padding: 2rem; background: #10B981; color: white; border-radius: 0.5rem;"><h3>Message Sent Successfully!</h3><p>We will contact you within 2 hours to confirm your appointment.</p></div>';
                        } else {
                            throw new Error(result.error || 'Failed to send message');
                        }
                    } catch (error) {
                        alert('Error sending message: ' + error.message);
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
            }
        }

        // Global functions for onclick handlers
        window.openBookingModal = function(service = '') {
            // This will be handled by the existing booking modal system
            console.log('Opening booking modal for service:', service);
        };

        window.toggleMobileMenu = function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            }
        };

        window.closeMobileMenu = function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        };
    </script>
  `;
}