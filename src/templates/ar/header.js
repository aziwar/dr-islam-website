// Arabic Header - Refactored with Simplified Navigation
import { DentalLogo } from '../../content/components/DentalLogo.js';
import { Button } from '../../components/atoms/Button.js';

export function getArabicHeader() {
  return `
    <!-- Emergency Banner - Enhanced with better CTA (Arabic) -->
    <div class="emergency-banner" role="banner" aria-label="معلومات الاتصال بحالات الطوارئ للأسنان">
        <div class="emergency-banner__content">
            <p class="emergency-banner__text">
                <span class="emergency-banner__icon">🚨</span>
                طوارئ أسنان؟ نحن هنا 24/7
            </p>
            <a href="tel:+96598563711"
               class="emergency-banner__cta"
               aria-label="اتصل برقم الطوارئ 98563711">
                اتصل الآن: +96598563711
            </a>
        </div>
    </div>

    <header role="banner" class="header header--structured">
        <nav role="navigation" aria-label="Main navigation" id="nav-menu" class="nav nav--simplified">

            <!-- Logo -->
            <div class="logo dental-logo">
                ${DentalLogo.svg}
                <div class="logo__text">
                    <div class="logo__name">د. إسلام الصغير</div>
                    <div class="logo__subtitle">طبيب أسنان عام وأخصائي زراعة</div>
                </div>
            </div>

            <!-- Simplified Main Navigation (4 items max) -->
            <ul class="main-nav" role="menu">

                <!-- Services with Mega Menu -->
                <li role="menuitem" class="nav-item nav-item--services">
                    <a href="#services"
                       class="nav-link nav-link--services"
                       aria-label="تصفح خدماتنا للأسنان"
                       aria-expanded="false"
                       aria-haspopup="true">
                        الخدمات
                        <span class="nav-dropdown-icon" aria-hidden="true">▼</span>
                    </a>

                    <!-- Services Mega Menu (Arabic) -->
                    <div class="nav-megamenu" aria-label="قائمة الخدمات الفرعية">
                        <div class="nav-megamenu__grid">
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🚨 رعاية الطوارئ</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#emergency-booking">علاج الطوارئ</a></li>
                                    <li><a href="tel:+96598563711">خط الطوارئ 24/7</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">⭐ الخدمات الأكثر طلباً</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#dental-implants">زراعة الأسنان</a></li>
                                    <li><a href="#cosmetic-dentistry">ابتسامة هوليوود</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🔧 التخصصية</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#root-canal">علاج الجذور</a></li>
                                    <li><a href="#oral-surgery">جراحة الفم</a></li>
                                    <li><a href="#prosthodontics">التركيبات</a></li>
                                </ul>
                            </div>
                            <div class="nav-megamenu__category">
                                <h3 class="nav-megamenu__title">🛡️ الوقائية</h3>
                                <ul class="nav-megamenu__links">
                                    <li><a href="#cleaning">تنظيف احترافي</a></li>
                                    <li><a href="#gum-treatment">علاج اللثة</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="nav-megamenu__footer">
                            <button class="btn btn--primary" onclick="openBookingModal()">
                                حجز استشارة
                            </button>
                            <a href="#services" class="btn btn--ghost">عرض كل الخدمات</a>
                        </div>
                    </div>
                </li>

                <!-- About Dr. Islam -->
                <li role="menuitem" class="nav-item">
                    <a href="#about"
                       class="nav-link"
                       aria-label="اعرف المزيد عن د. إسلام الصغير">
                        عن الطبيب
                    </a>
                </li>

                <!-- Patient Resources -->
                <li role="menuitem" class="nav-item nav-item--resources">
                    <a href="#resources"
                       class="nav-link nav-link--resources"
                       aria-label="مصادر ومعلومات للمرضى"
                       aria-expanded="false"
                       aria-haspopup="true">
                        مصادر للمرضى
                        <span class="nav-dropdown-icon" aria-hidden="true">▼</span>
                    </a>

                    <!-- Resources Dropdown (Arabic) -->
                    <div class="nav-dropdown" aria-label="قائمة مصادر المرضى الفرعية">
                        <ul class="nav-dropdown__links">
                            <li><a href="#testimonials">آراء المرضى</a></li>
                            <li><a href="#gallery">معرض قبل وبعد</a></li>
                            <li><a href="#faq">أسئلة شائعة</a></li>
                            <li><a href="#post-care">العناية بعد العلاج</a></li>
                            <li><a href="#insurance">التأمين والدفع</a></li>
                        </ul>
                    </div>
                </li>

                <!-- Contact & Booking -->
                <li role="menuitem" class="nav-item nav-item--contact">
                    <a href="#contact"
                       class="nav-link"
                       aria-label="معلومات الاتصال وحجز المواعيد">
                        اتصل وحجز
                    </a>
                </li>

                <!-- Language Switch -->
                <li role="menuitem" class="nav-item nav-item--lang">
                    <a href="/"
                       class="nav-link lang-switch"
                       aria-label="التحويل إلى اللغة الإنجليزية"
                       lang="en">
                        English
                    </a>
                </li>
            </ul>

            <!-- Primary CTA Button -->
            <div class="nav-cta">
                ${Button.create({
                    variant: 'primary',
                    text: 'احجز الآن',
                    onClick: 'openBookingModal()',
                    ariaLabel: 'احجز موعداً',
                    className: 'nav-cta__button'
                })}
            </div>

            <!-- Mobile Menu Toggle -->
            ${Button.create({
                variant: 'mobile-toggle',
                text: 'تبديل قائمة التنقل',
                onClick: 'toggleMobileMenu()',
                ariaLabel: 'تبديل قائمة التنقل',
                ariaExpanded: 'false',
                ariaControls: 'mobile-nav-menu',
                className: 'nav-toggle'
            })}

        </nav>
    </header>
  `;
}
