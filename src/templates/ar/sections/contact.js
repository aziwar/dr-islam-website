export const getArabicContactSection = () => `
    <section id="contact" class="contact">
        <div class="container">
            <h2>اتصل بنا</h2>
            <div class="contact-info">
                <div class="contact-card">
                    <h3>الهاتف</h3>
                    <p><a href="tel:+96598563711">98563711</a></p>
                </div>
                <div class="contact-card">
                    <h3>البريد الإلكتروني</h3>
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
                <h3>ساعات العمل</h3>
                <div class="hours-grid">
                    <div class="day-hours">
                        <span class="day">السبت - الخميس:</span>
                        <span class="hours">9:00 صباحاً - 9:00 مساءً</span>
                    </div>
                    <div class="day-hours">
                        <span class="day">الجمعة:</span>
                        <span class="hours">مغلق</span>
                    </div>
                </div>
            </div>

            <div class="contact-form-section">
                <h3>أرسل لنا رسالة</h3>
                <form id="contactForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="name" name="name" required>
                            <label for="name">الاسم الكامل</label>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" required>
                            <label for="phone">رقم الهاتف</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">البريد الإلكتروني</label>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service" required>
                            <option value="">اختر الخدمة</option>
                            <option value="dental-implants">زراعة الأسنان</option>
                            <option value="cosmetic-dentistry">طب الأسنان التجميلي</option>
                            <option value="general-dentistry">طب الأسنان العام</option>
                            <option value="emergency">علاج طارئ</option>
                            <option value="consultation">استشارة</option>
                            <option value="other">أخرى</option>
                        </select>
                        <label for="service">الخدمة المطلوبة</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="4" required></textarea>
                        <label for="message">الرسالة</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">إرسال الرسالة</span>
                        <span class="btn-loading" style="display: none;">جاري الإرسال...</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
`;
