export const getArabicHeroSection = () => `
    <section class="hero">
        <div class="container">
            <h1>دكتور اسلام الصغير</h1>
            <p class="subtitle">طبيب أسنان عام / أخصائي زراعة الأسنان</p>
            <div class="trust-badges">
                <span class="badge">خبرة +15 عاماً</span>
                <span class="badge">أحدث التقنيات</span>
                <span class="badge">رضا 100% للمرضى</span>
            </div>
            <button class="cta-button" onclick="openBookingModal()">احجز موعدك الآن</button>
        </div>

        <!-- Desktop Booking Widget -->
        <div class="desktop-booking-widget">
            <div class="widget-header">
                <h3>احجز موعدك الآن</h3>
            </div>
            <div class="widget-trust">
                <span class="trust-badge">خبرة +15 عاماً</span>
                <span class="trust-badge">رضا 100% للمرضى</span>
            </div>
            <div class="booking-widget-actions">
                <button class="cta-button" onclick="openBookingModal()">احجز موعدك الآن</button>
                <a href="https://wa.me/96598563711" target="_blank" class="cta-button secondary">واتساب</a>
            </div>
        </div>
    </div>
    </section>
`;
