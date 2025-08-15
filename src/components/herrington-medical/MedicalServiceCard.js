// Medical Service Card Component - Herrington-Inspired Design
// Adapted for Dr. Islam Dental Website

export class MedicalServiceCard {
  constructor(options = {}) {
    this.options = {
      icon: '🦷',
      title: 'Dental Service',
      description: 'Professional dental care service',
      features: [],
      ctaText: 'Learn More',
      ctaLink: '#services',
      animation: true,
      ...options
    };
  }

  render() {
    return `
      <div class="medical-service-card${this.options.animation ? ' animate-on-scroll' : ''}" 
           data-service-id="${this.options.id || ''}"
           role="article"
           aria-labelledby="service-${this.options.id || 'default'}-title">
        
        <div class="service-icon" aria-hidden="true">
          ${this.options.icon}
        </div>
        
        <div class="service-content">
          <h3 id="service-${this.options.id || 'default'}-title" class="service-title">
            ${this.options.title}
          </h3>
          
          <p class="service-description">
            ${this.options.description}
          </p>
          
          ${this.options.features.length > 0 ? `
            <ul class="service-features" role="list">
              ${this.options.features.map(feature => `
                <li role="listitem">${feature}</li>
              `).join('')}
            </ul>
          ` : ''}
          
          <a href="${this.options.ctaLink}" 
             class="service-cta" 
             role="button"
             aria-label="${this.options.ctaText} for ${this.options.title}">
            <span>${this.options.ctaText}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  static create(options) {
    return new MedicalServiceCard(options).render();
  }

  // Predefined dental services with Herrington-inspired styling
  static getDentalServices() {
    return [
      {
        id: 'general-dentistry',
        icon: '🦷',
        title: 'General Dentistry',
        description: 'Comprehensive dental care for the whole family including cleanings, fillings, and preventive treatments.',
        features: [
          'Professional cleanings every 6 months',
          'Comprehensive oral examinations',
          'Digital X-rays for accurate diagnosis',
          'Preventive care and education'
        ],
        ctaText: 'Book Checkup',
        ctaLink: '#book-general'
      },
      {
        id: 'cosmetic-dentistry',
        icon: '✨',
        title: 'Cosmetic Dentistry',
        description: 'Transform your smile with our advanced cosmetic procedures including veneers, whitening, and smile makeovers.',
        features: [
          'Professional teeth whitening',
          'Porcelain veneers',
          'Smile design consultation',
          'Before/after digital preview'
        ],
        ctaText: 'Smile Makeover',
        ctaLink: '#book-cosmetic'
      },
      {
        id: 'dental-implants',
        icon: '🔧',
        title: 'Dental Implants',
        description: 'Permanent solution for missing teeth using state-of-the-art implant technology for natural-looking results.',
        features: [
          'Single tooth replacement',
          'Full mouth reconstruction',
          '3D surgical planning',
          'Lifetime warranty available'
        ],
        ctaText: 'Consultation',
        ctaLink: '#book-implants'
      },
      {
        id: 'emergency-care',
        icon: '🚨',
        title: 'Emergency Care',
        description: '24/7 emergency dental services for urgent situations including severe pain, trauma, and dental emergencies.',
        features: [
          '24/7 emergency hotline',
          'Same-day appointments',
          'Pain relief guarantee',
          'Insurance accepted'
        ],
        ctaText: 'Call Now',
        ctaLink: 'tel:+96598563711'
      },
      {
        id: 'orthodontics',
        icon: '😁',
        title: 'Orthodontics',
        description: 'Straighten your teeth with modern orthodontic solutions including clear aligners and traditional braces.',
        features: [
          'Invisalign clear aligners',
          'Traditional metal braces',
          'Ceramic braces',
          'Free consultation'
        ],
        ctaText: 'Free Consult',
        ctaLink: '#book-ortho'
      },
      {
        id: 'pediatric-dentistry',
        icon: '👶',
        title: 'Pediatric Dentistry',
        description: 'Specialized dental care for children in a fun, comfortable environment designed to make visits enjoyable.',
        features: [
          'Child-friendly environment',
          'Preventive care education',
          'Fluoride treatments',
          'Sedation options available'
        ],
        ctaText: 'Book for Child',
        ctaLink: '#book-pediatric'
      }
    ];
  }

  // Arabic versions of dental services
  static getDentalServicesArabic() {
    return [
      {
        id: 'general-dentistry-ar',
        icon: '🦷',
        title: 'طب الأسنان العام',
        description: 'رعاية شاملة للأسنان لجميع أفراد الأسرة تشمل التنظيف والحشوات والعلاجات الوقائية.',
        features: [
          'تنظيف احترافي كل ٦ أشهر',
          'فحص شامل للفم',
          'أشعة رقمية للتشخيص الدقيق',
          'الرعاية الوقائية والتثقيف'
        ],
        ctaText: 'احجز فحص',
        ctaLink: '#book-general'
      },
      {
        id: 'cosmetic-dentistry-ar',
        icon: '✨',
        title: 'تجميل الأسنان',
        description: 'غيّر ابتسامتك بإجراءاتنا التجميلية المتطورة بما في ذلك القشور والتبييض وتجديد الابتسامة.',
        features: [
          'تبييض الأسنان الاحترافي',
          'قشور البورسلين',
          'استشارة تصميم الابتسامة',
          'معاينة رقمية قبل وبعد'
        ],
        ctaText: 'تجديد الابتسامة',
        ctaLink: '#book-cosmetic'
      },
      {
        id: 'dental-implants-ar',
        icon: '🔧',
        title: 'زراعة الأسنان',
        description: 'حل دائم للأسنان المفقودة باستخدام أحدث تقنيات الزراعة للحصول على نتائج طبيعية.',
        features: [
          'استبدال سن واحد',
          'إعادة بناء الفم بالكامل',
          'التخطيط الجراحي ثلاثي الأبعاد',
          'ضمان مدى الحياة متاح'
        ],
        ctaText: 'استشارة',
        ctaLink: '#book-implants'
      },
      {
        id: 'emergency-care-ar',
        icon: '🚨',
        title: 'رعاية الطوارئ',
        description: 'خدمات طوارئ الأسنان على مدار ٢٤/٧ للحالات العاجلة بما في ذلك الألم الشديد والإصابات.',
        features: [
          'خط طوارئ ٢٤/٧',
          'مواعيد في نفس اليوم',
          'ضمان تخفيف الألم',
          'نقبل التأمين'
        ],
        ctaText: 'اتصل الآن',
        ctaLink: 'tel:+96598563711'
      }
    ];
  }

  // Generate services grid
  static generateServicesGrid(services, language = 'en') {
    return `
      <div class="medical-grid services-grid">
        ${services.map((service, index) => {
          service.animation = true;
          return MedicalServiceCard.create(service);
        }).join('')}
      </div>
    `;
  }

  // Initialize scroll animations
  static initializeAnimations() {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.add('in-view');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
  }

  // Enhanced hover effects
  static enhanceInteractivity() {
    document.querySelectorAll('.medical-service-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });

      // Add click tracking for analytics
      card.addEventListener('click', (e) => {
        const serviceId = card.dataset.serviceId;
        if (serviceId && window.gtag) {
          gtag('event', 'service_card_click', {
            event_category: 'engagement',
            event_label: serviceId,
            value: 1
          });
        }
      });
    });
  }

  // Accessibility enhancements
  static enhanceAccessibility() {
    document.querySelectorAll('.service-cta').forEach(cta => {
      cta.addEventListener('focus', () => {
        cta.style.outline = '2px solid var(--medical-primary)';
        cta.style.outlineOffset = '2px';
      });

      cta.addEventListener('blur', () => {
        cta.style.outline = 'none';
      });

      // Keyboard navigation
      cta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cta.click();
        }
      });
    });
  }

  // Initialize all enhancements
  static initialize() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeAnimations();
        this.enhanceInteractivity();
        this.enhanceAccessibility();
      });
    } else {
      this.initializeAnimations();
      this.enhanceInteractivity();
      this.enhanceAccessibility();
    }
  }
}

// Export for use in other modules
export default MedicalServiceCard;