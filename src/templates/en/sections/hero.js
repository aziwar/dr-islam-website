// English Hero Section with Desktop Booking Widget
export function getEnglishHeroSection() {
  return `
    <section class="hero" role="region" aria-labelledby="hero-heading">
        <div class="container">
            <div class="hero-main">
                <h1 id="hero-heading">Dr. Islam Elsagher</h1>
                <p class="subtitle">General Dentist & Implantologist</p>
                <div class="trust-badges">
                    <span class="badge">15+ Years Experience</span>
                    <span class="badge">Latest Technology</span>
                    <span class="badge">100% Patient Satisfaction</span>
                </div>
                <button class="cta-button" onclick="openBookingModal()">Book Your Appointment</button>
            </div>
            
            <!-- Desktop Booking Widget -->
            <div class="desktop-booking-widget">
                <div class="widget-header">
                    <h3>📅 Quick Appointment</h3>
                    <p>Book your visit in 30 seconds</p>
                    <div class="widget-trust">
                        <span class="trust-badge">✓ Same Day Available</span>
                        <span class="trust-badge">✓ Free Consultation</span>
                    </div>
                </div>
                <form class="quick-booking-form" onsubmit="handleQuickBooking(event)">
                    <input type="text" placeholder="Your Name" required>
                    <input type="tel" placeholder="📱 Phone Number" required>
                    <select required>
                        <option value="">🦷 Select Service</option>
                        <option value="checkup">🔍 General Checkup</option>
                        <option value="cleaning">✨ Teeth Cleaning</option>
                        <option value="implant">🦷 Dental Implants</option>
                        <option value="cosmetic">💎 Cosmetic Dentistry</option>
                        <option value="emergency">🚨 Emergency Visit</option>
                    </select>
                    <button type="submit" class="btn btn-primary">
                        📞 Book Now - Free Consultation
                    </button>
                </form>
                <div class="widget-footer">
                    <p class="availability-note">⚡ Available Today: 9:00 AM - 9:00 PM</p>
                </div>
            </div>
        </div>
    </section>`;
}