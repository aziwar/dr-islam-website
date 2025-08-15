import PatientTestimonial from '../../../components/herrington-medical/PatientTestimonial.js';

export const getArabicTestimonialsSection = () => `
  <section id="testimonials" class="testimonials" dir="rtl">
    <div class="container">
      <h2 class="text-center">ماذا يقول مرضانا</h2>
      <p class="text-center subtitle" style="color: var(--text-light); max-width: 600px; margin: 0 auto 2rem auto;">قصص حقيقية من مرضانا الكرام.</p>
      ${PatientTestimonial.generateTestimonialsGrid(PatientTestimonial.getNewTestimonialsArabic(), 'ar')}
    </div>
  </section>
`;
