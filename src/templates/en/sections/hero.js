// Enhanced Hero Section with Professional Layout
export function getEnglishHeroSection() {
  return `
    <section class="hero" role="region" aria-labelledby="hero-heading">
      <div class="container">
        <div class="hero-content" style="text-align: left; max-width: 600px; margin: 0;">
          <h1 id="hero-heading">Professional Dental Care in Kuwait</h1>
          <p class="subtitle">Dr. Islam Elsagher - Experienced General Dentist & Implantologist</p>
          <div class="trust-badges" style="justify-content: flex-start;">
            <span class="badge">Over 10 Years Experience</span>
            <span class="badge">1000+ Happy Patients</span>
            <span class="badge">Modern Equipment</span>
          </div>
          <div class="cta-buttons" style="display: flex; gap: 1rem; margin-top: 2rem;">
            <a href="#" class="cta-button" style="background-color: #BEB093;">Book Appointment</a>
            <a href="tel:+96598563711" class="cta-button" style="background-color: #D4C5A3;">Call Now: +965 98563711</a>
          </div>
        </div>
      </div>
    </section>
  `;
}