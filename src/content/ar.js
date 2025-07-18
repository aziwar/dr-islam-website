// src/content/ar.js
export const HTML_AR = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
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
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
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
            <a href="https://wa.me/96598563711" class="cta-button">احجز موعدك الآن</a>
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

    <!-- Before/After Gallery -->
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>نتائج حقيقية</h2>
            <p class="gallery-subtitle">شاهد التحول المذهل لابتسامات مرضانا</p>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case1.png" alt="حالة حقيقية" loading="lazy" decoding="async">
                    <p>تحول مذهل للابتسامة</p>
                </div>
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case2.png" alt="نتيجة علاج" loading="lazy" decoding="async">
                    <p>ابتسامة هوليوود</p>
                </div>
                <div class="gallery-item">
                    <img src="/assets/before-after/real-case3.png" alt="علاج متقدم" loading="lazy" decoding="async">
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
                    <p>تختلف التكلفة حسب الحالة ونوع الزرعة المستخدمة. نقدم استشارة مجانية لتقييم حالتك وتقديم خطة علاج مفصلة مع التكلفة.</p>
                </div>
                <div class="faq-item">
                    <h3>هل الزراعة مؤلمة؟ <span class="faq-icon">+</span></h3>
                    <p>نستخدم أحدث تقنيات التخدير الموضعي لضمان راحتك التامة. معظم المرضى يصفون العملية بأنها أقل ألماً من خلع الأسنان العادي.</p>
                </div>
                <div class="faq-item">
                    <h3>ما هي مدة العلاج؟ <span class="faq-icon">+</span></h3>
                    <p>تعتمد مدة العلاج على الحالة. الزراعة الفورية يمكن إتمامها في جلسة واحدة، بينما الزراعة التقليدية تحتاج 3-6 أشهر للاندماج الكامل.</p>
                </div>
                <div class="faq-item">
                    <h3>هل تقبلون التأمين الصحي؟ <span class="faq-icon">+</span></h3>
                    <p>نتعامل مع معظم شركات التأمين الصحي في الكويت. يرجى التواصل معنا للتأكد من قبول تأمينك الصحي.</p>
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
        </div>
    </section>

    <footer>
        <p>&copy; 2025 دكتور اسلام الصغير - جميع الحقوق محفوظة</p>
    </footer>

    <!-- Sticky WhatsApp Booking Button -->
    <a href="https://wa.me/96598563711" class="sticky-book">
        احجز موعد 💬
    </a>

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
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            question.style.cursor = 'pointer';
            answer.style.maxHeight = '200px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '200px';
                }
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

    // Analytics tracking
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    'event_category': 'engagement',
                    'event_label': 'whatsapp_click'
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
    </script>
</body>
</html>`;