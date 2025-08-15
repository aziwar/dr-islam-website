// Professional Service Card Component for Dr. Islam Website

export class ProfessionalServiceCard {
  constructor(options = {}) {
    this.options = {
      icon: '🦷',
      title: 'Dental Service',
      description: 'Professional dental care service',
      ctaText: 'Learn More',
      ctaLink: '#services',
      animation: true,
      ...options
    };
  }

  render() {
    return `
      <div class="professional-service-card${this.options.animation ? ' animate-on-scroll' : ''}"
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
    return new ProfessionalServiceCard(options).render();
  }

  static getServices() {
    return [
      {
        id: 'general-dentistry',
        icon: '🦷',
        title: 'General Dentistry',
        description: 'Regular checkups and cleanings',
        ctaText: 'Learn More',
        ctaLink: '#contact'
      },
      {
        id: 'cosmetic-dentistry',
        icon: '✨',
        title: 'Cosmetic Dentistry',
        description: 'Smile makeovers and whitening',
        ctaText: 'Learn More',
        ctaLink: '#contact'
      },
      {
        id: 'dental-implants',
        icon: '🔧',
        title: 'Dental Implants',
        description: 'Tooth replacement solutions',
        ctaText: 'Learn More',
        ctaLink: '#contact'
      },
      {
        id: 'emergency-care',
        icon: '🚨',
        title: 'Emergency Care',
        description: '24/7 urgent dental care',
        ctaText: 'Call Now',
        ctaLink: 'tel:+96598563711'
      },
      {
        id: 'orthodontics',
        icon: '😁',
        title: 'Orthodontics',
        description: 'Braces and teeth straightening',
        ctaText: 'Learn More',
        ctaLink: '#contact'
      },
      {
        id: 'pediatric-dentistry',
        icon: '👶',
        title: 'Pediatric Dentistry',
        description: 'Children\'s dental care',
        ctaText: 'Learn More',
        ctaLink: '#contact'
      }
    ];
  }

  static getServicesArabic() {
    return [
      {
        id: 'general-dentistry-ar',
        icon: '🦷',
        title: 'طب الأسنان العام',
        description: 'فحوصات وتنظيفات منتظمة',
        ctaText: 'اعرف المزيد',
        ctaLink: '#contact'
      },
      {
        id: 'cosmetic-dentistry-ar',
        icon: '✨',
        title: 'تجميل الأسنان',
        description: 'تجديد الابتسامة وتبييض الأسنان',
        ctaText: 'اعرف المزيد',
        ctaLink: '#contact'
      },
      {
        id: 'dental-implants-ar',
        icon: '🔧',
        title: 'زراعة الأسنان',
        description: 'حلول استبدال الأسنان',
        ctaText: 'اعرف المزيد',
        ctaLink: '#contact'
      },
      {
        id: 'emergency-care-ar',
        icon: '🚨',
        title: 'رعاية الطوارئ',
        description: 'رعاية أسنان عاجلة على مدار الساعة',
        ctaText: 'اتصل الآن',
        ctaLink: 'tel:+96598563711'
      },
      {
        id: 'orthodontics-ar',
        icon: '😁',
        title: 'تقويم الأسنان',
        description: 'تقويم الأسنان وتصحيحها',
        ctaText: 'اعرف المزيد',
        ctaLink: '#contact'
      },
      {
        id: 'pediatric-dentistry-ar',
        icon: '👶',
        title: 'طب أسنان الأطفال',
        description: 'رعاية أسنان الأطفال',
        ctaText: 'اعرف المزيد',
        ctaLink: '#contact'
      }
    ];
  }

  static generateServicesGrid(services) {
    return `
      <div class="professional-services-grid">
        ${services.map(service => ProfessionalServiceCard.create(service)).join('')}
      </div>
    `;
  }

  static initialize() {
    const init = () => {
      this.initializeAnimations();
      this.enhanceInteractivity();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  static initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.professional-service-card.animate-on-scroll').forEach(card => {
      observer.observe(card);
    });
  }

  static enhanceInteractivity() {
    document.querySelectorAll('.professional-service-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.setProperty('--hover-scale', '1.05');
        card.style.setProperty('--hover-translate-y', '-10px');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--hover-scale', '1');
        card.style.setProperty('--hover-translate-y', '0');
      });
    });
  }
}

export default ProfessionalServiceCard;
