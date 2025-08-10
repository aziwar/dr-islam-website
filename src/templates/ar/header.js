// Arabic Header and Navigation Section
import { DentalLogo } from '../../content/components/DentalLogo.js';

export function getArabicHeader() {
  return `
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
    </nav>`;
}