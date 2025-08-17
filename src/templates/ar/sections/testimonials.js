// Arabic Testimonials Section
// Simplified inline implementation

export const getArabicTestimonialsSection = () => `
  <section id="testimonials" class="testimonials" dir="rtl">
    <div class="container">
      <h2 class="text-center" style="margin-bottom: 1rem;">آراء المرضى</h2>
      <p class="text-center subtitle" style="color: var(--text-light); max-width: 600px; margin: 0 auto 2rem auto;">قصص حقيقية من مرضانا الكرام.</p>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-header">
            <span class="testimonial-name">سارة أحمد</span>
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <p class="testimonial-text">"د. اسلام أفضل طبيب أسنان زرته. محترف وحنون وماهر!"</p>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-header">
            <span class="testimonial-name">محمد الخالد</span>
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <p class="testimonial-text">"خدمة ممتازة ومرافق حديثة. أنصح بشدة!"</p>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-header">
            <span class="testimonial-name">فاطمة العلي</span>
            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <p class="testimonial-text">"الفريق جعلني أشعر بالراحة طوال فترة العلاج. تجربة رائعة!"</p>
        </div>
      </div>
    </div>
  </section>
`;