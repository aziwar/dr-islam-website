import PatientTestimonial from '../../../components/herrington-medical/PatientTestimonial.js';

export const getEnglishTestimonialsSection = () => `
  <section id="testimonials" class="testimonials">
    <div class="container">
      <h2 class="text-center">What Our Patients Say</h2>
      <p class="text-center subtitle" style="color: var(--text-light); max-width: 600px; margin: 0 auto 2rem auto;">Real stories from our valued patients.</p>
      ${PatientTestimonial.generateTestimonialsGrid(PatientTestimonial.getNewTestimonials(), 'en')}
    </div>
  </section>
`;
