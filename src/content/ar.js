// src/content/ar.js
import { MOBILE_UX_JS } from './js/mobile-ux.js';
import { DentalLogo } from './components/DentalLogo.js';
import { ENHANCEMENTS_CSS } from './css/enhancements.css.js';

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
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${btoa(DentalLogo.favicon)}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Preload critical Arabic brand fonts for LCP improvement -->
    <link rel="preload" href="https://fonts.gstatic.com/s/amiri/v27/J7aHnp1uDWRBEqV98dVQjhukTg.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/ibmplexsansarabic/v13/Qw3MZQNVEjzh-Fl5nUUsVjePl6I6LSFovCz67P8_wao.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/cairo/v28/SLXGc1nY6HkvalIvTp2mxdt0UX8gfg.woff2" as="font" type="font/woff2" crossorigin>
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//unpkg.com">
    <!-- Preload critical CSS -->
    <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Noto+Kufi+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <noscript><link rel="stylesheet" href="/styles.css"></noscript>
    
    <!-- UI/UX Enhancements -->
    <style>
        ${ENHANCEMENTS_CSS}
        ${DentalLogo.css}
    </style>
    
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
    <!-- Skip Links for Keyboard Navigation -->
    <a href="#main-content" class="skip-link">انتقل إلى المحتوى الرئيسي</a>
    <a href="#nav-menu" class="skip-link">انتقل إلى التنقل</a>
    <a href="#contact" class="skip-link">انتقل إلى معلومات الاتصال</a>

    <!-- Emergency Banner -->
    <div class="emergency-banner">
        <p>حالات طوارئ الأسنان؟ اتصل الآن: <a href="tel:+96598563711" aria-label="رقم الطوارئ: 98563711">98563711</a></p>
    </div>

    <header>
        <nav>
            <div class="logo dental-logo">
                ${DentalLogo.svg}
            </div>
            <button class="nav-toggle" aria-label="القائمة" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="main-nav">
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

    <div class="nav-backdrop"></div>

    <!-- Breadcrumb Navigation (Arabic) -->
    <nav class="breadcrumb-nav" aria-label="التنقل التفصيلي" id="breadcrumbNav" style="display: none;">
        <div class="container">
            <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
                <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a href="#" onclick="scrollToSection('hero')" itemprop="item">
                        <span itemprop="name">الرئيسية</span>
                    </a>
                    <meta itemprop="position" content="1" />
                </li>
                <li class="breadcrumb-item active" id="currentBreadcrumb" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name">الرئيسية</span>
                    <meta itemprop="position" content="2" />
                </li>
            </ol>
        </div>
    </nav>

    <main id="main-content" role="main">
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
                <h3>📅 حجز سريع</h3>
                <p>احجز موعدك في 30 ثانية</p>
                <div class="widget-trust">
                    <span class="trust-badge">✓ متاح نفس اليوم</span>
                    <span class="trust-badge">✓ استشارة مجانية</span>
                </div>
            </div>
            <form class="quick-booking-form" onsubmit="handleQuickBooking(event)">
                <input type="text" placeholder="اسمك الكريم" required>
                <input type="tel" placeholder="📱 رقم الهاتف" required>
                <select required>
                    <option value="">🦷 اختر الخدمة</option>
                    <option value="checkup">🔍 فحص عام</option>
                    <option value="cleaning">✨ تنظيف الأسنان</option>
                    <option value="implant">🦷 زراعة الأسنان</option>
                    <option value="cosmetic">💎 تجميل الأسنان</option>
                    <option value="emergency">🚨 زيارة طارئة</option>
                </select>
                <button type="submit" class="btn btn-primary">
                    📞 احجز الآن - استشارة مجانية
                </button>
            </form>
            <div class="widget-footer">
                <p class="availability-note">⚡ متاح اليوم: 9:00 ص - 9:00 م</p>
            </div>
        </div>
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
            
            <!-- Desktop Service Comparison Table (Arabic) -->
            <div class="services-comparison">
                <table class="comparison-table" role="table" aria-label="جدول مقارنة الخدمات">
                    <thead>
                        <tr>
                            <th scope="col">الخدمة</th>
                            <th scope="col">الوصف</th>
                            <th scope="col">المدة</th>
                            <th scope="col">السعر</th>
                            <th scope="col">احجز الآن</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="service-name">زراعة الأسنان</td>
                            <td class="service-description">زراعة فورية ومتأخرة بأحدث التقنيات. زراعة سن واحد أو تأهيل الفم بالكامل.</td>
                            <td class="service-duration">٦٠-٩٠ دقيقة</td>
                            <td class="service-price popular">٣٥٠-٨٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">علاج الجذور</td>
                            <td class="service-description">علاج متخصص لقنوات الجذور بتقنيات حديثة وإدارة الألم.</td>
                            <td class="service-duration">٤٥-٦٠ دقيقة</td>
                            <td class="service-price">٨٠-١٥٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">تجميل الأسنان</td>
                            <td class="service-description">ابتسامة هوليوود، القشور التجميلية، وتبييض الأسنان للحصول على جمالية مثالية.</td>
                            <td class="service-duration">٩٠-١٢٠ دقيقة</td>
                            <td class="service-price">٢٠٠-٦٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">جراحة الأسنان</td>
                            <td class="service-description">خلع جراحي، إزالة ضرس العقل، والعمليات المتقدمة.</td>
                            <td class="service-duration">٣٠-٤٥ دقيقة</td>
                            <td class="service-price">٥٠-٢٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">التركيبات</td>
                            <td class="service-description">تركيبات ثابتة ومتحركة، تيجان، وجسور لاستعادة الأسنان.</td>
                            <td class="service-duration">٦٠-٧٥ دقيقة</td>
                            <td class="service-price">١٢٠-٤٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">علاج اللثة</td>
                            <td class="service-description">علاج أمراض اللثة والأنسجة والعلاج الوقائي.</td>
                            <td class="service-duration">٤٥-٦٠ دقيقة</td>
                            <td class="service-price">٦٠-١٢٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">الحشوات التجميلية</td>
                            <td class="service-description">حشوات بلون الأسنان الطبيعي بمواد مركبة متطورة.</td>
                            <td class="service-duration">٣٠-٤٥ دقيقة</td>
                            <td class="service-price">٢٥-٨٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">إعادة التأهيل الكامل</td>
                            <td class="service-description">علاج شامل للفم والأسنان يجمع بين عدة تخصصات للحصول على استعادة كاملة.</td>
                            <td class="service-duration">٢-٣ ساعات</td>
                            <td class="service-price">٨٠٠-٢٠٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">استشارة</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Service Comparison Section (Arabic) -->
    <section id="comparison" class="service-comparison">
        <div class="container">
            <h2>قارن بين خدماتنا</h2>
            <p class="comparison-subtitle">اختر الحل المناسب لحالتك من خلال مقارنة شاملة لعلاجات الأسنان</p>
            
            <!-- Desktop Comparison Table -->
            <div class="comparison-table-container desktop-only">
                <table class="comparison-table" dir="rtl">
                    <thead>
                        <tr>
                            <th class="criteria-column">المعايير</th>
                            <th class="service-column recommended">
                                <div class="service-header">
                                    <span class="service-icon">🦷</span>
                                    <h3>زراعة الأسنان</h3>
                                    <span class="recommended-badge">الأكثر شيوعاً</span>
                                </div>
                            </th>
                            <th class="service-column">
                                <div class="service-header">
                                    <span class="service-icon">🌉</span>
                                    <h3>جسر الأسنان</h3>
                                </div>
                            </th>
                            <th class="service-column">
                                <div class="service-header">
                                    <span class="service-icon">🦷</span>
                                    <h3>طقم الأسنان الجزئي</h3>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="criteria">⏱️ مدة العلاج</td>
                            <td class="excellent">3-6 أشهر</td>
                            <td class="good">2-4 أسابيع</td>
                            <td class="good">2-6 أسابيع</td>
                        </tr>
                        <tr>
                            <td class="criteria">💰 التكلفة</td>
                            <td class="high">عالية (استثمار طويل المدى)</td>
                            <td class="medium">متوسطة</td>
                            <td class="low">منخفضة</td>
                        </tr>
                        <tr>
                            <td class="criteria">⏳ مدة البقاء</td>
                            <td class="excellent">مدى الحياة (مع العناية الجيدة)</td>
                            <td class="good">10-15 سنة</td>
                            <td class="medium">5-10 سنوات</td>
                        </tr>
                        <tr>
                            <td class="criteria">📊 معدل النجاح</td>
                            <td class="excellent">95-98%</td>
                            <td class="good">85-90%</td>
                            <td class="medium">75-85%</td>
                        </tr>
                        <tr>
                            <td class="criteria">🦴 الحفاظ على العظام</td>
                            <td class="excellent">يحفز نمو العظام</td>
                            <td class="poor">قد يؤدي لفقدان العظام</td>
                            <td class="poor">لا يمنع فقدان العظام</td>
                        </tr>
                        <tr>
                            <td class="criteria">🪥 سهولة التنظيف</td>
                            <td class="excellent">مثل الأسنان الطبيعية</td>
                            <td class="medium">يتطلب عناية خاصة</td>
                            <td class="good">قابل للإزالة والتنظيف</td>
                        </tr>
                        <tr>
                            <td class="criteria">🍎 كفاءة المضغ</td>
                            <td class="excellent">100% (مثل الطبيعية)</td>
                            <td class="good">85-90%</td>
                            <td class="medium">60-70%</td>
                        </tr>
                        <tr>
                            <td class="criteria">😊 الناحية الجمالية</td>
                            <td class="excellent">طبيعية تماماً</td>
                            <td class="good">جيدة جداً</td>
                            <td class="medium">مقبولة</td>
                        </tr>
                        <tr>
                            <td class="criteria">⚡ الراحة</td>
                            <td class="excellent">راحة كاملة</td>
                            <td class="good">راحة جيدة</td>
                            <td class="medium">قد تحتاج تعديل</td>
                        </tr>
                        <tr>
                            <td class="criteria">🦷 تأثير على الأسنان المجاورة</td>
                            <td class="excellent">لا تأثير</td>
                            <td class="poor">يتطلب برد الأسنان</td>
                            <td class="good">تأثير طفيف</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Comparison Cards -->
            <div class="comparison-mobile mobile-only">
                <div class="comparison-tabs">
                    <button class="tab-btn active" onclick="showComparisonTab(0, this)">زراعة الأسنان</button>
                    <button class="tab-btn" onclick="showComparisonTab(1, this)">جسر الأسنان</button>
                    <button class="tab-btn" onclick="showComparisonTab(2, this)">طقم جزئي</button>
                </div>

                <div class="tab-content active" data-tab="0">
                    <div class="service-card-mobile recommended">
                        <div class="service-header-mobile">
                            <span class="service-icon">🦷</span>
                            <h3>زراعة الأسنان</h3>
                            <span class="recommended-badge">الأكثر شيوعاً</span>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item excellent">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">3-6 أشهر</span>
                            </div>
                            <div class="criteria-item high">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">عالية (استثمار طويل المدى)</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">مدى الحياة (مع العناية الجيدة)</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">95-98%</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">يحفز نمو العظام</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">مثل الأسنان الطبيعية</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة زراعة الأسنان</button>
                    </div>
                </div>

                <div class="tab-content" data-tab="1">
                    <div class="service-card-mobile">
                        <div class="service-header-mobile">
                            <span class="service-icon">🌉</span>
                            <h3>جسر الأسنان</h3>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item good">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">2-4 أسابيع</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">متوسطة</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">10-15 سنة</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">85-90%</span>
                            </div>
                            <div class="criteria-item poor">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">قد يؤدي لفقدان العظام</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">يتطلب عناية خاصة</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة جسر الأسنان</button>
                    </div>
                </div>

                <div class="tab-content" data-tab="2">
                    <div class="service-card-mobile">
                        <div class="service-header-mobile">
                            <span class="service-icon">🦷</span>
                            <h3>طقم الأسنان الجزئي</h3>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item good">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">2-6 أسابيع</span>
                            </div>
                            <div class="criteria-item low">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">منخفضة</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">5-10 سنوات</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">75-85%</span>
                            </div>
                            <div class="criteria-item poor">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">لا يمنع فقدان العظام</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">قابل للإزالة والتنظيف</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة طقم الأسنان</button>
                    </div>
                </div>
            </div>

            <div class="comparison-footer">
                <p class="comparison-note">💡 <strong>نصيحة الطبيب:</strong> زراعة الأسنان هي الخيار الأمثل لمعظم الحالات لأنها تحافظ على صحة العظام وتوفر حلاً دائماً. احجز استشارة مجانية لتحديد العلاج المناسب لحالتك.</p>
                <button class="consultation-btn" onclick="openBookingModal()">
                    📞 احجز استشارة مجانية - تقييم حالتك
                </button>
            </div>
        </div>
    </section>

    <!-- Enhanced Testimonials Section (Arabic) -->
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>ماذا يقول مرضانا</h2>
            <div class="testimonial-carousel-container">
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide active">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-ahmed-ar">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="صورة المريض">👤</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-ahmed-ar">أحمد السالم</h4>
                                    <span class="treatment-type">زراعة الأسنان</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 نجوم من أصل 5">⭐⭐⭐⭐⭐</div>
                            <blockquote>"خدمة ممتازة وطبيب محترف جداً. الدكتور اسلام شرح لي كل خطوة في العلاج وكانت النتيجة رائعة. لا أستطيع أن أكون أكثر سعادة بابتسامتي الجديدة!"</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">يناير 2025</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </article>
                    </div>
                    
                    <div class="testimonial-slide">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-fatima-ar">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="صورة المريضة">👩</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-fatima-ar">فاطمة العلي</h4>
                                    <span class="treatment-type">طب الأسنان التجميلي</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 نجوم من أصل 5">⭐⭐⭐⭐⭐</div>
                            <blockquote>"أفضل تجربة زراعة أسنان في الكويت. الدكتور متمكن جداً وفريق العمل متعاون. أنصح الجميع بزيارة العيادة للحصول على علاج عالي الجودة."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">ديسمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </article>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>محمد الخالد</h4>
                                    <span class="treatment-type">ابتسامة هوليوود</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"علاج احترافي ونتائج مبهرة. الدكتور اسلام حول ابتسامتي تماماً بإجراء ابتسامة هوليوود. التقنيات المستخدمة حديثة ومتطورة."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">نوفمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👩</div>
                                <div class="patient-details">
                                    <h4>سارة الراشد</h4>
                                    <span class="treatment-type">علاج الجذور</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"علاج جذور بدون ألم! كنت خائفة جداً لكن الدكتور اسلام جعل التجربة مريحة تماماً. أسلوبه اللطيف والأجهزة الحديثة أحدثت الفرق."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">أكتوبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>عمر المطيري</h4>
                                    <span class="treatment-type">تنظيف الأسنان</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"خدمة نظافة الأسنان استثنائية. العيادة نظيفة وحديثة جداً. الدكتور اسلام وفريقه يحافظون على أعلى معايير التعقيم ورعاية المرضى."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">سبتمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Carousel Controls (Arabic) -->
                <div class="carousel-controls">
                    <button class="carousel-btn next" onclick="moveTestimonialCarousel(1)">‹</button>
                    <div class="carousel-dots" id="testimonialDots">
                        <button class="dot active" onclick="currentTestimonialSlide(1)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(2)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(3)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(4)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(5)"></button>
                    </div>
                    <button class="carousel-btn prev" onclick="moveTestimonialCarousel(-1)">›</button>
                </div>
                
                <!-- Testimonial Summary Stats (Arabic) -->
                <div class="testimonial-stats">
                    <div class="stat-item">
                        <div class="stat-number">4.9</div>
                        <div class="stat-label">متوسط التقييم</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">مريض سعيد</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">%98</div>
                        <div class="stat-label">ينصحون بالعيادة</div>
                    </div>
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
                        <img src="/assets/real-case1.webp" alt="قبل زراعة الأسنان الأمامية" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد زراعة الأسنان الأمامية" loading="lazy">
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
                        <img src="/assets/real-case2.webp" alt="قبل زراعة متعددة" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="بعد زراعة متعددة" loading="lazy">
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
                        <img src="/assets/real-case3.webp" alt="قبل ابتسامة هوليوود" loading="lazy">
                        <img src="/assets/case3-after.webp" alt="بعد ابتسامة هوليوود" loading="lazy">
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
                        <img src="/assets/case1-before.webp" alt="قبل تبييض الأسنان" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد تبييض الأسنان" loading="lazy">
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
                        <img src="/assets/case2-before.webp" alt="قبل التقويم الشفاف" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="بعد التقويم الشفاف" loading="lazy">
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
                        <img src="/assets/case1-before.webp" alt="قبل إعادة تأهيل كاملة" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد إعادة تأهيل كاملة" loading="lazy">
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

    <!-- Enhanced FAQ Section with Search -->
    <section id="faq" class="faq">
        <div class="container">
            <h2>أسئلة شائعة</h2>
            <div class="faq-search-container">
                <div class="faq-search-box">
                    <input type="text" 
                           id="faqSearch" 
                           placeholder="🔍 ابحث عن الإجابات..." 
                           class="faq-search-input"
                           onkeyup="searchFAQs(this.value)">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
                <div class="faq-categories">
                    <button class="category-btn active" onclick="filterFAQs('all')">جميع الأسئلة</button>
                    <button class="category-btn" onclick="filterFAQs('cost')">💰 التكلفة والتأمين</button>
                    <button class="category-btn" onclick="filterFAQs('treatment')">🦷 العلاج</button>
                    <button class="category-btn" onclick="filterFAQs('pain')">😌 الألم والراحة</button>
                    <button class="category-btn" onclick="filterFAQs('aftercare')">🔄 ما بعد العلاج</button>
                </div>
            </div>
            
            <div class="faq-list" id="faqList">
                <div class="faq-item" data-category="cost" data-keywords="تكلفة سعر مال تأمين دفع زراعة أسنان غالي">
                    <h3>كم تكلفة زراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تختلف التكلفة حسب الحالة ونوع الزرعة المستخدمة. نقدم استشارة مجانية لتقييم حالتك وتقديم خطة علاج مفصلة مع التكلفة. الأسعار تتراوح عادة من 150-300 دينار كويتي حسب التعقيد.</p>
                        <div class="faq-tags">
                            <span class="tag">💰 التكلفة</span>
                            <span class="tag">🦷 الزراعة</span>
                            <span class="tag">📋 الاستشارة</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="pain" data-keywords="ألم مؤلم وجع تخدير راحة مهدئ">
                    <h3>هل عملية الزراعة مؤلمة؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نستخدم أحدث تقنيات التخدير الموضعي لضمان راحتك التامة. معظم المرضى يصفون العملية بأنها أقل ألماً من خلع الأسنان العادي. كما نوفر خيارات تهدئة للمرضى القلقين.</p>
                        <div class="faq-tags">
                            <span class="tag">😌 الراحة</span>
                            <span class="tag">💉 التخدير</span>
                            <span class="tag">🏥 العملية</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="وقت مدة كم طويل شفاء تعافي عملية">
                    <h3>كم تستغرق مدة العلاج؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تعتمد مدة العلاج على الحالة. الزراعة الفورية يمكن إتمامها في جلسة واحدة، بينما الزراعة التقليدية تحتاج 3-6 أشهر للاندماج الكامل. نقدم جداول زمنية مفصلة أثناء الاستشارة.</p>
                        <div class="faq-tags">
                            <span class="tag">⏰ الوقت</span>
                            <span class="tag">🔄 العملية</span>
                            <span class="tag">🦷 الاندماج</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="cost" data-keywords="تأمين صحي تغطية طبي مطالبة تعويض">
                    <h3>هل تقبلون التأمين الصحي؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نتعامل مع معظم شركات التأمين الصحي في الكويت بما في ذلك الوطنية والأهلية وشركة الخليج للتأمين. يرجى التواصل معنا للتأكد من قبول تأمينك الصحي ونسبة التغطية.</p>
                        <div class="faq-tags">
                            <span class="tag">🏥 التأمين</span>
                            <span class="tag">💳 التغطية</span>
                            <span class="tag">🇰🇼 الكويت</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="aftercare" data-keywords="بعد العناية صيانة تنظيف فرشاة نظافة متابعة">
                    <h3>كيف أعتني بالزراعة بعد العلاج؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>العناية بالزراعة مشابهة للأسنان الطبيعية - التنظيف المنتظم بالفرشاة والخيط والفحص الدوري عند الطبيب. نقدم تعليمات مفصلة للعناية ونحدد مواعيد متابعة لضمان الشفاء الأمثل والنجاح طويل المدى.</p>
                        <div class="faq-tags">
                            <span class="tag">🔄 العناية</span>
                            <span class="tag">🪥 النظافة</span>
                            <span class="tag">✅ الصيانة</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="نجاح معدل فشل ضمان كفالة جودة">
                    <h3>ما هو معدل نجاح زراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>زراعة الأسنان لها معدل نجاح 95-98% عند تنفيذها من قبل أخصائيين ذوي خبرة. عيادتنا تستخدم ماركات زراعة عالية الجودة ذات سجل حافل ونقدم تغطية ضمان لراحة بالك.</p>
                        <div class="faq-tags">
                            <span class="tag">📊 معدل النجاح</span>
                            <span class="tag">🛡️ الضمان</span>
                            <span class="tag">⭐ الجودة</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="treatment" data-keywords="عمر صغير كبير مناسب مرشح متطلبات">
                    <h3>هل أنا مرشح جيد لزراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>معظم البالغين الأصحاء مرشحون جيدون للزراعة. نقوم بتقييم كثافة العظام وصحة اللثة والحالة الطبية العامة. العمر ليس عائقاً - لقد عالجنا بنجاح مرضى من سن 18 إلى أكثر من 80 عاماً.</p>
                        <div class="faq-tags">
                            <span class="tag">👤 الترشح</span>
                            <span class="tag">🔍 التقييم</span>
                            <span class="tag">🎯 الملاءمة</span>
                        </div>
                    </div>
                </div>
                
                <div class="faq-item" data-category="cost" data-keywords="خطة دفع تقسيط تمويل خيارات طرق">
                    <h3>هل تقدمون خطط دفع أو تمويل؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نعم، نقدم خطط دفع مرنة ونتعامل مع شركات التمويل لجعل العلاج في متناول الجميع. نقبل النقد والبطاقات الائتمانية ويمكننا ترتيب خطط تقسيط حسب ميزانيتك واحتياجات العلاج.</p>
                        <div class="faq-tags">
                            <span class="tag">💳 خطط الدفع</span>
                            <span class="tag">🏦 التمويل</span>
                            <span class="tag">💰 مرونة</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="faq-no-results" id="faqNoResults" style="display: none;">
                <div class="no-results-content">
                    <h3>🔍 لم يتم العثور على أسئلة مطابقة</h3>
                    <p>لا تجد ما تبحث عنه؟ تواصل معنا مباشرة للحصول على إجابات مفصلة.</p>
                    <button class="cta-button" onclick="openBookingModal()">اسأل خبيرنا</button>
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
    </main>

    <footer>
        <p>&copy; 2025 دكتور اسلام الصغير - جميع الحقوق محفوظة</p>
    </footer>

    <!-- Desktop Sidebar Widget (Arabic) -->
    <div class="desktop-sidebar" id="desktopSidebar" style="display: none;">
        <div class="sidebar-header">
            <h4>🏥 د. اسلام الصغير</h4>
            <p style="font-size: 0.85rem; color: var(--text-light);">رعاية أسنان متخصصة</p>
        </div>
        <div class="sidebar-stats">
            <div class="stat-item">
                <span class="stat-number">+15</span>
                <span class="stat-label">سنة خبرة</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">%100</span>
                <span class="stat-label">رضا المرضى</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">+2000</span>
                <span class="stat-label">مريض</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">24/7</span>
                <span class="stat-label">طوارئ</span>
            </div>
        </div>
        <div class="sidebar-actions">
            <button class="sidebar-btn primary" onclick="openBookingModal()">
                📞 احجز موعد
            </button>
            <button class="sidebar-btn secondary" onclick="openWhatsApp()">
                💬 واتساب
            </button>
        </div>
        <div class="sidebar-contact">
            <p style="font-size: 0.8rem; text-align: center; color: var(--text-light); margin-top: 1rem;">
                📍 السالمية، الكويت<br>
                ⏰ 9 ص - 9 م (السبت-الخميس)
            </p>
        </div>
    </div>

    <!-- Sticky WhatsApp Booking Button -->
    <button class="sticky-book" onclick="openBookingModal()">
        احجز موعد 💬
    </button>

    <script type="module">
    // Import shared utilities
    import { 
        toggleMobileMenu, 
        closeMobileMenu,
        updateBreadcrumb,
        openBookingModal,
        closeBookingModal,
        showBookingSuccess,
        setupLazyLoading,
        setupGalleryTouch,
        setupBeforeAfterTouch,
        setupSmoothScroll,
        setupKeyboardNav,
        setupFormEnhancements,
        setupFormValidation,
        addLoadingState,
        removeLoadingState,
        initializeUIUtils
    } from '../shared/ui-utils.js';
    import { validateField, initFormValidation } from '../shared/form-utils.js';

    // Make functions globally available for inline event handlers
    window.toggleMobileMenu = toggleMobileMenu;
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.showBookingSuccess = showBookingSuccess;

    // Close menu when clicking outside or on backdrop
    document.addEventListener('click', function(e) {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (backdrop.contains(e.target)) {
            closeMobileMenu();
        } else if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking navigation links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Set up navigation toggle event listener
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleMobileMenu);
        }
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

    // Breadcrumb Navigation System (Arabic)
    const breadcrumbNav = document.getElementById('breadcrumbNav');
    const currentBreadcrumb = document.getElementById('currentBreadcrumb');
    
    // Section name mapping (Arabic)
    const sectionNames = {
        'hero': 'الرئيسية',
        'services': 'الخدمات',
        'about': 'عن الدكتور إسلام',
        'testimonials': 'آراء المرضى',
        'gallery': 'معرض الصور',
        'faq': 'أسئلة شائعة',
        'contact': 'اتصل بنا'
    };
    
    let currentSection = 'hero';
    
    // Use imported updateBreadcrumb function with Arabic section names
    window.sectionNames = sectionNames;
    window.breadcrumbNav = breadcrumbNav;
    window.currentBreadcrumb = currentBreadcrumb;
    
    // Scroll to section function for breadcrumb home link
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = sectionId === 'hero' ? 0 : 100;
            const targetPosition = section.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // Intersection Observer for section detection
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateBreadcrumb(entry.target.id);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    document.addEventListener('DOMContentLoaded', function() {
        const sectionsToObserve = ['hero', 'services', 'about', 'testimonials', 'gallery', 'faq', 'contact'];
        sectionsToObserve.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                sectionObserver.observe(section);
            }
        });
    });

    // FAQ Accordion
    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        // FAQ functionality with touch-outside-to-close
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            
            question.addEventListener('click', function() {
                // Close other open FAQ items on mobile
                if (window.innerWidth <= 768) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
                item.classList.toggle('active');
            });
        });
        
        // Touch-outside-to-close for mobile FAQ
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', function(e) {
                const activeFaq = document.querySelector('.faq-item.active');
                if (activeFaq && !activeFaq.contains(e.target)) {
                    activeFaq.classList.remove('active');
                }
            });
        }
    });

    // Enhanced scroll-triggered navigation (inspired by reference projects)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            const header = document.querySelector('header');
            const scrollY = window.scrollY;
            
            // Shadow effect
            if (scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
            
            // Enhanced navigation state (from reference project patterns)
            if (scrollY > 150) {
                header.classList.add('nav-scrolled');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.classList.remove('nav-scrolled');
                header.style.background = '';
                header.style.backdropFilter = '';
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
            afterImg.style.clipPath = 'inset(0 0 0 ' + percent + '%)';
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

    // Booking modal functions imported from ui-utils.js
    
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
                let message = 'السلام عليكم دكتور اسلام،\\n\\n';
                message += 'أرغب في حجز موعد:\\n\\n';
                message += '👤 الاسم: ' + name + '\\n';
                message += '📞 الهاتف: ' + phone + '\\n';
                message += '🦷 الخدمة: ' + service + '\\n';
                message += '⏰ الوقت المفضل: ' + time + '\\n';
                
                if (notes.trim()) {
                    message += '📝 ملاحظات: ' + notes + '\\n';
                }
                
                message += '\\nشكراً لكم';
                
                // Encode message for URL
                const encodedMessage = encodeURIComponent(message);
                
                // Create WhatsApp URL
                const whatsappUrl = 'https://wa.me/96598563711?text=' + encodedMessage;
                
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
    
    // showBookingSuccess function imported from ui-utils.js

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
                        beforeImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
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
                        beforeImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
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
    
    // Gallery and lazy loading functions imported from ui-utils.js
    
    // =================================
    // BEFORE/AFTER SLIDER TOUCH
    // =================================
    
    // setupBeforeAfterTouch function imported from ui-utils.js
    
    // =================================
    // SMOOTH SCROLL ENHANCEMENTS
    // =================================
    
    // Scroll and keyboard navigation functions imported from ui-utils.js
    
    // =================================
    // LOADING STATES
    // =================================
    
    // Loading state functions imported from ui-utils.js
    
    // =================================
    // FORM ENHANCEMENTS
    // =================================
    
    // Arabic error messages for form validation
    window.arabicErrorMessages = {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        name: 'الاسم يجب أن يحتوي على حروف فقط',
        success: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        error: 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        networkError: 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
    };
    
    // Form functions imported from ui-utils.js and form-utils.js

    
    // =================================
    // PERFORMANCE MONITORING
    // =================================
    
    const monitorPerformance = () => {
        // Track Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Track First Input Delay
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Track Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    };
    
    // =================================
    // INITIALIZE EVERYTHING
    // =================================
    
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all UI utilities from shared modules
        initializeUIUtils();
        initFormValidation();
        
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
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch(err => /* ServiceWorker registration failed - logging disabled */);
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
                this.viewMoreBtn.innerHTML = 'عرض ' + remaining + ' حالة إضافية <span class="arrow">←</span>';
            }
        }
    }

    // Initialize enhanced gallery
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryFilter();
    });
    // =================================
    // MOBILE UX ENHANCEMENTS
    // =================================
    ` + MOBILE_UX_JS + `

    // =================================
    // DESKTOP SIDEBAR FUNCTIONALITY (ARABIC)
    // =================================
    
    // Show desktop sidebar on large screens
    function initDesktopSidebar() {
        if (window.innerWidth >= 1200) {
            const sidebar = document.getElementById('desktopSidebar');
            if (sidebar) {
                sidebar.style.display = 'block';
            }
        }
    }
    
    // Enhanced Gallery Lightbox for Desktop (Arabic)
    let currentLightboxIndex = 0;
    let lightboxImages = [];
    
    function initGalleryLightbox() {
        // Collect all gallery images
        lightboxImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
            src: img.src,
            alt: img.alt,
            caption: img.closest('.gallery-item')?.querySelector('p')?.textContent || img.alt
        }));
        
        // Add click handlers
        document.querySelectorAll('.gallery-item img').forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                currentLightboxIndex = index;
                showImageLightbox();
            });
            
            // Add keyboard support
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'عرض ' + img.alt + ' بالحجم الكامل');
            
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentLightboxIndex = index;
                    showImageLightbox();
                }
            });
        });
    }
    
    function showImageLightbox() {
        const image = lightboxImages[currentLightboxIndex];
        if (!image) return;
        
        // Create lightbox with enhanced structure
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-labelledby', 'lightbox-title');
        
        lightbox.innerHTML = \`
            <div class="lightbox-backdrop" onclick="closeLightbox()" aria-hidden="true"></div>
            <div class="lightbox-content">
                <div class="lightbox-header">
                    <h2 id="lightbox-title" class="sr-only">\${image.alt}</h2>
                    <button class="lightbox-close" onclick="closeLightbox()" aria-label="إغلاق العارض" tabindex="0">
                        <span aria-hidden="true">✕</span>
                    </button>
                </div>
                <div class="lightbox-body">
                    <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)" aria-label="الصورة السابقة" \${currentLightboxIndex === 0 ? 'disabled' : ''}>
                        <span aria-hidden="true">‹</span>
                    </button>
                    <div class="lightbox-image-container">
                        <img src="\${image.src}" alt="\${image.alt}" class="lightbox-image">
                        <div class="lightbox-loading" aria-hidden="true">جاري التحميل...</div>
                    </div>
                    <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)" aria-label="الصورة التالية" \${currentLightboxIndex === lightboxImages.length - 1 ? 'disabled' : ''}>
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
                <div class="lightbox-footer">
                    <div class="lightbox-caption">\${image.caption}</div>
                    <div class="lightbox-counter">\${currentLightboxIndex + 1} / \${lightboxImages.length}</div>
                </div>
            </div>
        \`;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const closeButton = lightbox.querySelector('.lightbox-close');
        closeButton.focus();
        
        // Trap focus within lightbox
        trapFocus(lightbox);
        
        // Preload adjacent images for smooth navigation
        preloadAdjacentImages();
        
        // Add keyboard listeners
        document.addEventListener('keydown', handleLightboxKeydown);
        
        // Fade in animation
        requestAnimationFrame(() => {
            lightbox.classList.add('show');
        });
    }
    
    function navigateLightbox(direction) {
        const newIndex = currentLightboxIndex + direction;
        
        if (newIndex >= 0 && newIndex < lightboxImages.length) {
            currentLightboxIndex = newIndex;
            updateLightboxContent();
            preloadAdjacentImages();
        }
    }
    
    function updateLightboxContent() {
        const lightbox = document.querySelector('.image-lightbox');
        if (!lightbox) return;
        
        const image = lightboxImages[currentLightboxIndex];
        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const counter = lightbox.querySelector('.lightbox-counter');
        const title = lightbox.querySelector('#lightbox-title');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Show loading state
        const loading = lightbox.querySelector('.lightbox-loading');
        loading.style.display = 'block';
        img.style.opacity = '0';
        
        // Update image
        img.onload = () => {
            loading.style.display = 'none';
            img.style.opacity = '1';
        };
        
        img.src = image.src;
        img.alt = image.alt;
        caption.textContent = image.caption;
        counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
        title.textContent = image.alt;
        
        // Update navigation buttons
        prevBtn.disabled = currentLightboxIndex === 0;
        nextBtn.disabled = currentLightboxIndex === lightboxImages.length - 1;
    }
    
    function preloadAdjacentImages() {
        // Preload previous and next images for smooth navigation
        [-1, 1].forEach(offset => {
            const index = currentLightboxIndex + offset;
            if (index >= 0 && index < lightboxImages.length) {
                const img = new Image();
                img.src = lightboxImages[index].src;
            }
        });
    }
    
    function handleLightboxKeydown(e) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox(1);
                break;
        }
    }
    
    function trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
    
    function closeLightbox() {
        const lightbox = document.querySelector('.image-lightbox');
        if (lightbox) {
            // Fade out animation
            lightbox.classList.add('hide');
            
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = '';
                
                // Return focus to original trigger
                const originalImage = document.querySelectorAll('.gallery-item img')[currentLightboxIndex];
                if (originalImage) {
                    originalImage.focus();
                }
                
                // Remove keyboard listener
                document.removeEventListener('keydown', handleLightboxKeydown);
            }, 200);
        }
    }
    
    // Initialize desktop features
    document.addEventListener('DOMContentLoaded', () => {
        initDesktopSidebar();
        initGalleryLightbox();
        initTestimonialCarousel();
        initFAQSearch();
        initEnhancedFAQs();
    });
    
    window.addEventListener('resize', () => {
        initDesktopSidebar();
        initGalleryLightbox();
    });
    
    // =================================
    // SERVICE COMPARISON TAB FUNCTIONALITY
    // =================================
    
    function showComparisonTab(tabIndex, buttonElement) {
        // Remove active class from all tabs and tab buttons
        const allTabs = document.querySelectorAll('.tab-content');
        const allButtons = document.querySelectorAll('.tab-btn');
        
        allTabs.forEach(tab => tab.classList.remove('active'));
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected tab and button
        const selectedTab = document.querySelector('[data-tab="' + tabIndex + '"]');
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
        
        // Smooth scroll to comparison section on mobile tab change
        if (window.innerWidth <= 768) {
            const comparisonSection = document.getElementById('comparison');
            if (comparisonSection) {
                setTimeout(() => {
                    comparisonSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        }
        
        // Add haptic feedback on mobile devices
        if (navigator.vibrate && window.innerWidth <= 768) {
            navigator.vibrate(25);
        }
    }

    // Make functions globally available for Arabic version
    window.moveTestimonialCarousel = moveTestimonialCarousel;
    window.currentTestimonialSlide = currentTestimonialSlide;
    window.searchFAQs = searchFAQs;
    window.filterFAQs = filterFAQs;
    window.showComparisonTab = showComparisonTab;
    
    </script>
    
    <!-- WAVE 1: Critical JavaScript Foundation -->
    <script src="/js/ui-utils.js" defer></script>
    
</body>
</html>`;