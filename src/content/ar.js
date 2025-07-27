// src/content/ar.js
export const HTML_AR = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">

    <!-- PWA Support -->
    <link rel="manifest" href="/manifest-ar.json">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="د. اسلام">
        <title>دكتور اسلام الصغير - طبيب أسنان وزراعة</title>
    <meta name="description" content="د. إسلام الصغير يقدم رعاية شاملة للأسنان في الكويت. خبرة تزيد عن 15 عامًا في الزراعة وطب الأسنان التجميلي وجراحة الفم.">
    
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
      "description": "طبيب أسنان عام وأخصائي زراعة الأسنان في الكويت",
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
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "خدمات طب الأسنان",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "زراعة الأسنان"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "علاج الجذور"
            }
          }
        ]
      }
    }
    </script>
    
    <!-- Google Analytics integration disabled for privacy -->
</head>
<body>
    <!-- Emergency Banner -->
    <div class="emergency-banner">
        <p>حالات طوارئ الأسنان؟ اتصل الآن: <a href="tel:+96598563711">98563711</a></p>
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
                <li><a href="#services">الخدمات</a></li>
                <li><a href="#about">عن الطبيب</a></li>
                <li><a href="#testimonials">آراء المرضى</a></li>
                <li><a href="#gallery">قبل وبعد</a></li>
                <li><a href="#faq">أسئلة شائعة</a></li>
                <li><a href="#contact">اتصل بنا</a></li>
                <li><a href="/" class="lang-switch">English</a></li>
            </ul>
        </nav>
    </header>

    <div class="mobile-menu-backdrop" onclick="closeMobileMenu()"></div>

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
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>خدماتنا</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>زراعة الأسنان</h3>
                    <p>زراعة فورية ومتأخرة بأحدث التقنيات</p>
                </div>
                <div class="service-card">
                    <h3>علاج الجذور</h3>
                    <p>علاج متخصص لقنوات الجذور</p>
                </div>
                <div class="service-card">
                    <h3>التركيبات</h3>
                    <p>تركيبات ثابتة ومتحركة</p>
                </div>
                <div class="service-card">
                    <h3>جراحة الأسنان</h3>
                    <p>خلع جراحي وعمليات متقدمة</p>
                </div>
                <div class="service-card">
                    <h3>تجميل الأسنان</h3>
                    <p>ابتسامة هوليوود وتبييض</p>
                </div>
                <div class="service-card">
                    <h3>علاج اللثة</h3>
                    <p>علاج أمراض اللثة والأنسجة</p>
                </div>
                <div class="service-card">
                    <h3>الحشوات التجميلية</h3>
                    <p>حشوات بلون الأسنان الطبيعي</p>
                </div>
                <div class="service-card">
                    <h3>إعادة التأهيل الكامل</h3>
                    <p>علاج شامل للفم والأسنان</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>ماذا يقول مرضانا</h2>
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"خدمة ممتازة وطبيب محترف جداً. الدكتور اسلام شرح لي كل خطوة في العلاج وكانت النتيجة رائعة"</p>
                    <cite>- أحمد السالم</cite>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"أفضل تجربة زراعة أسنان. الدكتور متمكن جداً وفريق العمل متعاون. أنصح الجميع بزيارة العيادة"</p>
                    <cite>- فاطمة العلي</cite>
                </div>
                <div class="testimonial-card">
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>"علاج احترافي ونتائج مبهرة. الدكتور اسلام حول ابتسامتي تماماً. شكراً جزيلاً"</p>
                    <cite>- محمد الخالد</cite>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced Before/After Gallery -->
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>نتائج حقيقية تتحدث عن نفسها</h2>
            <p class="gallery-subtitle">أكثر من 1200 حالة ناجحة وابتسامات متجددة</p>
            
            <!-- Gallery Filter Tabs -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">جميع الحالات</button>
                <button class="filter-btn" data-filter="implants">زراعة الأسنان</button>
                <button class="filter-btn" data-filter="cosmetic">تجميل الأسنان</button>
                <button class="filter-btn" data-filter="orthodontic">التقويم</button>
                <button class="filter-btn" data-filter="reconstruction">إعادة التأهيل</button>
            </div>
            
            <div class="gallery-grid enhanced">
                <!-- Dental Implants Cases -->
                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/before-after/real-case1.png" alt="قبل زراعة الأسنان الأمامية" loading="lazy">
                        <img src="/assets/before-after/real-case1-after.png" alt="بعد زراعة الأسنان الأمامية" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>زراعة أسنان أمامية فورية</h4>
                        <p class="case-details">مريض، 35 عام - زراعة فورية مع تاج خزفي</p>
                        <p class="treatment-time">مدة العلاج: جلسة واحدة</p>
                        <span class="case-badge implant">زراعة</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/before-after/real-case2.png" alt="قبل زراعة متعددة" loading="lazy">
                        <img src="/assets/before-after/real-case2-after.png" alt="بعد زراعة متعددة" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>زراعة متعددة مع جسر ثابت</h4>
                        <p class="case-details">مريضة، 42 عام - استبدال 4 أسنان مفقودة</p>
                        <p class="treatment-time">مدة العلاج: 4 أشهر</p>
                        <span class="case-badge implant">زراعة</span>
                    </div>
                </div>

                <!-- Cosmetic Cases -->
                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/before-after/real-case3.png" alt="قبل ابتسامة هوليوود" loading="lazy">
                        <img src="/assets/before-after/real-case3-after.png" alt="بعد ابتسامة هوليوود" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>ابتسامة هوليوود كاملة</h4>
                        <p class="case-details">مريضة، 28 عام - فينير خزفي 16 سن</p>
                        <p class="treatment-time">مدة العلاج: أسبوعين</p>
                        <span class="case-badge cosmetic">تجميلي</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/before-after/whitening1-before.jpg" alt="قبل تبييض الأسنان" loading="lazy">
                        <img src="/assets/before-after/whitening1-after.jpg" alt="بعد تبييض الأسنان" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>تبييض بالليزر + ترميم</h4>
                        <p class="case-details">مريض، 31 عام - تبييض مع حشوات تجميلية</p>
                        <p class="treatment-time">مدة العلاج: جلستين</p>
                        <span class="case-badge cosmetic">تجميلي</span>
                    </div>
                </div>

                <!-- Orthodontic Cases -->
                <div class="gallery-item" data-category="orthodontic">
                    <div class="case-images">
                        <img src="/assets/before-after/ortho1-before.jpg" alt="قبل التقويم الشفاف" loading="lazy">
                        <img src="/assets/before-after/ortho1-after.jpg" alt="بعد التقويم الشفاف" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>تقويم شفاف (Invisalign)</h4>
                        <p class="case-details">مريضة، 24 عام - تصحيح ازدحام الأسنان</p>
                        <p class="treatment-time">مدة العلاج: 8 أشهر</p>
                        <span class="case-badge orthodontic">تقويم</span>
                    </div>
                </div>

                <!-- Full Mouth Reconstruction -->
                <div class="gallery-item" data-category="reconstruction">
                    <div class="case-images">
                        <img src="/assets/before-after/fullmouth1-before.jpg" alt="قبل إعادة تأهيل كاملة" loading="lazy">
                        <img src="/assets/before-after/fullmouth1-after.jpg" alt="بعد إعادة تأهيل كاملة" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>إعادة تأهيل كاملة للفم</h4>
                        <p class="case-details">مريض، 55 عام - زراعات متعددة مع تيجان</p>
                        <p class="treatment-time">مدة العلاج: 6 أشهر</p>
                        <span class="case-badge reconstruction">إعادة تأهيل</span>
                    </div>
                </div>
            </div>

            <!-- View More Button -->
            <div class="gallery-actions">
                <button class="view-more-btn">عرض المزيد من الحالات <span class="arrow">←</span></button>
                <p class="gallery-stats">+1200 حالة ناجحة | معدل نجاح 98%</p>
            </div>
        </div>
    </section>
                    </picture>
                    <p>علاج تقويمي وتجميلي</p>
                </div>
            </div>
        </div>
    </section>

    <section id="about" class="about">
        <div class="container">
            <h2>عن الطبيب</h2>
            <div class="about-content">
                <div class="credentials">
                    <h3>المؤهلات العلمية</h3>
                    <ul>
                        <li>بكالوريوس طب وجراحة الفم والأسنان - جامعة الإسكندرية (2004-2009)</li>
                        <li>دبلوم زراعة الأسنان - جامعة الإسكندرية (2010-2011)</li>
                        <li>ماجستير أمراض اللثة - جامعة الأزهر</li>
                        <li>ماجستير علوم الليزر - جامعة القاهرة</li>
                    </ul>
                    <div class="certifications">
                        <h4>الشهادات والعضويات</h4>
                        <div class="cert-badges">
                            <span class="cert-badge">عضو الجمعية الكويتية لطب الأسنان</span>
                            <span class="cert-badge">رخصة مزاولة المهنة - وزارة الصحة الكويتية</span>
                        </div>
                    </div>
                </div>
                <div class="experience">
                    <h3>الخبرة العملية</h3>
                    <p>أكثر من 15 عامًا من الخبرة في طب الأسنان في مصر والكويت</p>
                    <div class="stats">
                        <div class="stat">
                            <h4>+5000</h4>
                            <p>مريض راضٍ</p>
                        </div>
                        <div class="stat">
                            <h4>+1200</h4>
                            <p>زراعة ناجحة</p>
                        </div>
                        <div class="stat">
                            <h4>15+</h4>
                            <p>سنوات خبرة</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq">
        <div class="container">
            <h2>أسئلة شائعة</h2>
            <div class="faq-list">
                <div class="faq-item">
                    <h3>كم تكلفة زراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تختلف التكلفة حسب الحالة ونوع الزرعة المستخدمة. نقدم استشارة مجانية لتقييم حالتك وتقديم خطة علاج مفصلة مع التكلفة.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>هل الزراعة مؤلمة؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نستخدم أحدث تقنيات التخدير الموضعي لضمان راحتك التامة. معظم المرضى يصفون العملية بأنها أقل ألماً من خلع الأسنان العادي.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>ما هي مدة العلاج؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تعتمد مدة العلاج على الحالة. الزراعة الفورية يمكن إتمامها في جلسة واحدة، بينما الزراعة التقليدية تحتاج 3-6 أشهر للاندماج الكامل.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <h3>هل تقبلون التأمين الصحي؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نتعامل مع معظم شركات التأمين الصحي في الكويت. يرجى التواصل معنا للتأكد من قبول تأمينك الصحي.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
                    <p><a href="https://wa.me/96598563711">98563711</a></p>
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

    <!-- Enhanced Booking Modal - Arabic -->
    <div id="bookingModal" class="booking-modal" style="display: none;" dir="rtl">
        <div class="booking-modal-content">
            <div class="booking-modal-header">
                <h3>📅 احجز موعدك</h3>
                <button class="close-modal" onclick="closeBookingModal()">&times;</button>
            </div>
            <div class="booking-modal-body">
                <p class="booking-description">سنساعدك في حجز موعد عبر واتساب مع ملء بياناتك مسبقاً.</p>
                
                <form id="bookingForm" class="booking-form">
                    <div class="form-group">
                        <input type="text" id="bookingName" name="name" required>
                        <label for="bookingName">الاسم الكامل</label>
                    </div>
                    
                    <div class="form-group">
                        <input type="tel" id="bookingPhone" name="phone" required>
                        <label for="bookingPhone">رقم الهاتف</label>
                    </div>
                    
                    <div class="form-group">
                        <select id="bookingService" name="service" required>
                            <option value="">اختر الخدمة</option>
                            <option value="زراعة الأسنان">زراعة الأسنان</option>
                            <option value="علاج العصب">علاج العصب</option>
                            <option value="التركيبات الثابتة والمتحركة">التركيبات الثابتة والمتحركة</option>
                            <option value="جراحة الفم">جراحة الفم</option>
                            <option value="تجميل الأسنان">تجميل الأسنان</option>
                            <option value="علاج اللثة">علاج اللثة</option>
                            <option value="الحشوات التجميلية">الحشوات التجميلية</option>
                            <option value="تأهيل الفم بالكامل">تأهيل الفم بالكامل</option>
                            <option value="استشارة عامة">استشارة عامة</option>
                            <option value="علاج طوارئ">علاج طوارئ</option>
                        </select>
                        <label for="bookingService">نوع الخدمة</label>
                    </div>
                    
                    <div class="form-group">
                        <select id="bookingTime" name="time" required>
                            <option value="">الوقت المفضل</option>
                            <option value="صباحاً (9:00 - 12:00)">صباحاً (9:00 - 12:00)</option>
                            <option value="بعد الظهر (12:00 - 6:00)">بعد الظهر (12:00 - 6:00)</option>
                            <option value="مساءً (6:00 - 9:00)">مساءً (6:00 - 9:00)</option>
                            <option value="أي وقت">أي وقت</option>
                        </select>
                        <label for="bookingTime">الوقت المفضل</label>
                    </div>
                    
                    <div class="form-group">
                        <textarea id="bookingNotes" name="notes" rows="3" placeholder="أي ملاحظات أو طلبات خاصة (اختياري)"></textarea>
                        <label for="bookingNotes">ملاحظات إضافية</label>
                    </div>
                    
                    <div class="booking-modal-actions">
                        <button type="submit" class="booking-submit-btn">
                            <span class="booking-btn-icon">💬</span>
                            متابعة عبر واتساب
                        </button>
                        <p class="booking-disclaimer">سيتم توجيهك إلى واتساب مع ملء بياناتك مسبقاً</p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2025 دكتور اسلام الصغير - جميع الحقوق محفوظة</p>
    </footer>

    <!-- Sticky WhatsApp Booking Button -->
    <button class="sticky-book" onclick="openBookingModal()">
        احجز موعد 💬
    </button>

    <script>
    // Ensure menu starts closed
    document.addEventListener('DOMContentLoaded', function() {
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (menu) menu.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
    });

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

    // Gallery Touch Support
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        let startX = 0;
        let currentX = 0;
        const slider = item.querySelector('.before-after-slider');
        const afterImg = item.querySelector('img:last-of-type');
        
        if (!slider || !afterImg) return;
        
        const handleMove = (x) => {
            const rect = item.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
            slider.style.left = percent + '%';
            afterImg.style.clipPath = \`inset(0 0 0 \${percent}%)\`;
        };
        
        // Touch events
        item.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        item.addEventListener('touchmove', (e) => {
            e.preventDefault();
            currentX = e.touches[0].clientX;
            handleMove(currentX);
        });
        
        // Mouse events for desktop
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            item.style.cursor = 'ew-resize';
            
            const handleMouseMove = (e) => {
                handleMove(e.clientX);
            };
            
            const handleMouseUp = () => {
                item.style.cursor = 'grab';
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });
    });

    // Enhanced Booking Modal Functionality - Arabic
    function openBookingModal() {
        const modal = document.getElementById('bookingModal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on the first input
        setTimeout(() => {
            document.getElementById('bookingName').focus();
        }, 100);
        
        // Track modal open event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'booking_modal_open', {
                'event_category': 'engagement',
                'event_label': 'booking_modal_ar'
            });
        }
    }
    
    function closeBookingModal() {
        const modal = document.getElementById('bookingModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal on outside click
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('bookingModal');
        if (e.target === modal) {
            closeBookingModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
    
    // Handle booking form submission
    document.addEventListener('DOMContentLoaded', function() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = document.getElementById('bookingName').value;
                const phone = document.getElementById('bookingPhone').value;
                const service = document.getElementById('bookingService').value;
                const time = document.getElementById('bookingTime').value;
                const notes = document.getElementById('bookingNotes').value;
                
                // Create WhatsApp message in Arabic
                let message = \`السلام عليكم دكتور اسلام،\\n\\n\`;
                message += \`أرغب في حجز موعد:\\n\\n\`;
                message += \`👤 الاسم: \${name}\\n\`;
                message += \`📞 الهاتف: \${phone}\\n\`;
                message += \`🦷 الخدمة: \${service}\\n\`;
                message += \`⏰ الوقت المفضل: \${time}\\n\`;
                
                if (notes.trim()) {
                    message += \`📝 ملاحظات: \${notes}\\n\`;
                }
                
                message += \`\\nشكراً لكم\`;
                
                // Encode message for URL
                const encodedMessage = encodeURIComponent(message);
                
                // Create WhatsApp URL
                const whatsappUrl = \`https://wa.me/96598563711?text=\${encodedMessage}\`;
                
                // Track booking attempt
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'booking_attempt', {
                        'event_category': 'conversion',
                        'event_label': service,
                        'value': 1
                    });
                }
                
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Close modal and show success message
                closeBookingModal();
                showBookingSuccess();
            });
        }
    });
    
    function showBookingSuccess() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'booking-success-notification';
        notification.innerHTML = \`
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">تم فتح واتساب مع بيانات الحجز!</span>
            </div>
        \`;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Analytics tracking for direct WhatsApp links
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_direct_click_ar'
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
                        messageDiv.textContent = result.message || 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                        
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
                        messageDiv.textContent = result.error || 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.';
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
                    errorDiv.textContent = 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.';
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
                        <p>قم بتثبيت التطبيق للوصول السريع</p>
                        <button onclick="installPWA()">تثبيت</button>
                        <button onclick="dismissInstall()">لاحقاً</button>
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

    // Enhanced Gallery Filter System
    class GalleryFilter {
        constructor() {
            this.filterButtons = document.querySelectorAll('.filter-btn');
            this.galleryItems = document.querySelectorAll('.gallery-item');
            this.viewMoreBtn = document.querySelector('.view-more-btn');
            this.maxVisible = 6;
            this.currentFilter = 'all';
            
            this.init();
        }
        
        init() {
            if (this.filterButtons.length && this.galleryItems.length) {
                // Add click listeners to filter buttons
                this.filterButtons.forEach(button => {
                    button.addEventListener('click', (e) => this.handleFilterClick(e));
                });
                
                // Add view more functionality
                if (this.viewMoreBtn) {
                    this.viewMoreBtn.addEventListener('click', () => this.showMoreItems());
                }
                
                // Initialize view
                this.filterItems('all');
                this.updateViewMoreButton();
            }
        }
        
        handleFilterClick(e) {
            const filterValue = e.target.dataset.filter;
            
            // Update active button
            this.filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter items
            this.filterItems(filterValue);
            this.currentFilter = filterValue;
            this.updateViewMoreButton();
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'gallery_filter', {
                    'event_category': 'gallery',
                    'event_label': filterValue,
                    'value': 1
                });
            }
        }
        
        filterItems(filter) {
            let visibleCount = 0;
            
            this.galleryItems.forEach((item, index) => {
                const category = item.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow && visibleCount < this.maxVisible) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    
                    // Staggered animation
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    visibleCount++;
                } else if (shouldShow) {
                    // Hidden but available for "view more"
                    item.style.display = 'none';
                } else {
                    // Fade out filtered items
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        updateViewMoreButton() {
            if (!this.viewMoreBtn) return;
            
            const totalFilteredItems = Array.from(this.galleryItems).filter(item => {
                const category = item.dataset.category;
                return this.currentFilter === 'all' || category === this.currentFilter;
            }).length;
            
            if (this.maxVisible >= totalFilteredItems) {
                this.viewMoreBtn.style.display = 'none';
            } else {
                this.viewMoreBtn.style.display = 'inline-flex';
                const remaining = totalFilteredItems - this.maxVisible;
                this.viewMoreBtn.innerHTML = \`عرض \${remaining} حالة إضافية <span class="arrow">←</span>\`;
            }
        }
    }

    // Initialize enhanced gallery
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryFilter();
    });

    console.log('Dr. Islam Website - Enhanced Gallery System Loaded');
    </script>
</body>
</html>`;