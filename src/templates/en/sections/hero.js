// Enhanced Hero Section with Interactive CTAs and Trust Indicators
export function getEnglishHeroSection() {
  return `
    <section class="hero modern-hero" role="region" aria-labelledby="hero-heading">
        <!-- Hero Background with Glow Effects -->
        <div class="hero-background">
            <div class="hero-glow hero-glow-1"></div>
            <div class="hero-glow hero-glow-2"></div>
        </div>
        
        <div class="container">
            <div class="hero-content">
                <!-- Main Hero Content -->
                <div class="hero-main animate-appear">
                    <!-- Professional Badge -->
                    <div class="hero-badge-wrapper">
                        <span class="hero-badge">
                            <svg class="badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Board Certified Dentist & Implantologist
                        </span>
                    </div>

                    <!-- Main Heading with Gradient -->
                    <h1 id="hero-heading" class="hero-title">
                        <span class="title-line">Transform Your Smile with</span>
                        <span class="title-highlight">Dr. Islam Elsagher</span>
                        <span class="title-subtitle">Leading Dental Excellence in Kuwait</span>
                    </h1>

                    <!-- Enhanced Description -->
                    <p class="hero-description">
                        Experience world-class dental care with advanced technology, compassionate treatment, 
                        and proven results. Your perfect smile journey starts here.
                    </p>

                    <!-- Interactive Trust Indicators -->
                    <div class="trust-indicators">
                        <div class="trust-item" data-tooltip="15+ years of professional excellence">
                            <div class="trust-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="trust-content">
                                <span class="trust-number">15+</span>
                                <span class="trust-label">Years Experience</span>
                            </div>
                        </div>

                        <div class="trust-item" data-tooltip="Advanced dental technology and techniques">
                            <div class="trust-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="trust-content">
                                <span class="trust-number">100%</span>
                                <span class="trust-label">Latest Technology</span>
                            </div>
                        </div>

                        <div class="trust-item" data-tooltip="Verified patient satisfaction ratings">
                            <div class="trust-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="trust-content">
                                <span class="trust-number">2500+</span>
                                <span class="trust-label">Happy Patients</span>
                            </div>
                        </div>

                        <div class="trust-item" data-tooltip="Same-day emergency appointments available">
                            <div class="trust-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="trust-content">
                                <span class="trust-number">Same Day</span>
                                <span class="trust-label">Appointments</span>
                            </div>
                        </div>
                    </div>

                    <!-- Interactive CTA Buttons -->
                    <div class="hero-cta-section">
                        <!-- Primary CTA -->
                        <button class="cta-primary interactive-cta" onclick="openBookingModal()" data-action="book-appointment">
                            <span class="cta-content">
                                <svg class="cta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                Book Free Consultation
                            </span>
                            <span class="cta-shine"></span>
                        </button>

                        <!-- Secondary CTA -->
                        <button class="cta-secondary interactive-cta" onclick="scrollToSection('services')" data-action="view-services">
                            <span class="cta-content">
                                <svg class="cta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                View Our Services
                            </span>
                        </button>

                        <!-- Emergency CTA -->
                        <a href="tel:+96598563711" class="cta-emergency" data-action="emergency-call">
                            <div class="emergency-pulse"></div>
                            <span class="emergency-text">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Emergency? Call Now
                            </span>
                        </a>
                    </div>

                    <!-- Social Proof -->
                    <div class="social-proof">
                        <div class="social-proof-avatars">
                            <div class="avatar-group">
                                <div class="avatar"></div>
                                <div class="avatar"></div>
                                <div class="avatar"></div>
                                <div class="avatar"></div>
                                <div class="avatar-more">+2500</div>
                            </div>
                        </div>
                        <div class="social-proof-text">
                            <p><strong>2,500+ patients</strong> trust Dr. Elsagher for their dental care</p>
                            <div class="rating-stars">
                                <span class="stars">★★★★★</span>
                                <span class="rating-text">4.9/5 patient satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Enhanced Desktop Booking Widget -->
                <div class="desktop-booking-widget enhanced-widget">
                    <div class="widget-glow"></div>
                    
                    <div class="widget-header">
                        <div class="widget-title">
                            <svg class="widget-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            <h3>Quick Appointment</h3>
                        </div>
                        <p class="widget-subtitle">Book your visit in under 30 seconds</p>
                        
                        <div class="widget-benefits">
                            <div class="benefit-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Same Day Available</span>
                            </div>
                            <div class="benefit-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Free Consultation</span>
                            </div>
                            <div class="benefit-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>No Waiting List</span>
                            </div>
                        </div>
                    </div>

                    <form class="quick-booking-form enhanced-form" onsubmit="handleQuickBooking(event)">
                        <div class="form-step active" data-step="1">
                            <div class="form-group">
                                <label for="hero-name">Full Name</label>
                                <input type="text" id="hero-name" name="name" placeholder="Enter your full name" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="hero-phone">Phone Number</label>
                                <input type="tel" id="hero-phone" name="phone" placeholder="+965 XXXX XXXX" required>
                            </div>
                        </div>

                        <div class="form-step" data-step="2">
                            <div class="form-group">
                                <label for="hero-service">Select Service</label>
                                <select id="hero-service" name="service" required>
                                    <option value="">Choose your treatment</option>
                                    <option value="checkup" data-icon="🔍">General Checkup</option>
                                    <option value="cleaning" data-icon="✨">Professional Cleaning</option>
                                    <option value="implant" data-icon="🦷">Dental Implants</option>
                                    <option value="cosmetic" data-icon="💎">Cosmetic Dentistry</option>
                                    <option value="emergency" data-icon="🚨">Emergency Care</option>
                                    <option value="consultation" data-icon="💬">Free Consultation</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="hero-time">Preferred Time</label>
                                <select id="hero-time" name="preferred_time">
                                    <option value="">Any time</option>
                                    <option value="morning">Morning (9AM - 12PM)</option>
                                    <option value="afternoon">Afternoon (12PM - 6PM)</option>
                                    <option value="evening">Evening (6PM - 9PM)</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn-step btn-prev" onclick="previousStep()" style="display: none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Previous
                            </button>
                            
                            <button type="button" class="btn-step btn-next" onclick="nextStep()">
                                Next Step
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            
                            <button type="submit" class="btn-submit" style="display: none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Book Free Consultation
                            </button>
                        </div>

                        <div class="form-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 50%;"></div>
                            </div>
                            <span class="progress-text">Step 1 of 2</span>
                        </div>
                    </form>

                    <div class="widget-footer">
                        <div class="availability-indicator">
                            <div class="status-dot available"></div>
                            <span class="availability-text">Available Today: 9:00 AM - 9:00 PM</span>
                        </div>
                        
                        <div class="widget-guarantee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>100% Secure & Private</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Action Button for Mobile -->
        <div class="hero-fab">
            <button class="fab-button" onclick="openBookingModal()" aria-label="Quick booking">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <div class="fab-tooltip">Quick Book</div>
        </div>
    </section>`;
}