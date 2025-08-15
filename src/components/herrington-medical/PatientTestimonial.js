// Patient Testimonial Component - Herrington-Inspired Design
// Adapted for Dr. Islam Dental Website

export class PatientTestimonial {
  constructor(options = {}) {
    this.options = {
      name: 'Patient Name',
      photo: '/images/patients/default.jpg',
      rating: 5,
      testimonial: 'Great dental experience!',
      treatment: 'General Cleaning',
      date: null,
      verified: false,
      beforeAfter: null,
      animation: true,
      ...options
    };
  }

  render() {
    return `
      <div class="patient-testimonial${this.options.animation ? ' animate-on-scroll' : ''}" 
           data-testimonial-id="${this.options.id || ''}"
           role="article"
           aria-labelledby="testimonial-${this.options.id || 'default'}-name">
        
        <div class="testimonial-header">
          <div class="testimonial-rating" role="img" aria-label="${this.options.rating} out of 5 stars">
            ${this.renderStars()}
          </div>
          
          ${this.options.verified ? `
            <div class="verified-badge" aria-label="Verified patient">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="sr-only">Verified</span>
            </div>
          ` : ''}
        </div>

        <blockquote class="testimonial-text">
          ${this.options.testimonial}
        </blockquote>

        ${this.options.beforeAfter ? this.renderBeforeAfter() : ''}

        <div class="patient-info">
          <img src="${this.options.photo}" 
               alt="Photo of ${this.options.name}" 
               class="patient-photo"
               loading="lazy"
               onerror="this.src='/images/patients/default.jpg'">
          
          <div class="patient-details">
            <h4 id="testimonial-${this.options.id || 'default'}-name" class="patient-name">
              ${this.options.name}
            </h4>
            <p class="treatment-type">${this.options.treatment}</p>
            ${this.options.date ? `
              <time class="testimonial-date" datetime="${this.options.date}">
                ${this.formatDate(this.options.date)}
              </time>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  renderStars() {
    const fullStars = Math.floor(this.options.rating);
    const hasHalfStar = this.options.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="rating-star filled" aria-hidden="true">⭐</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      starsHTML += '<span class="rating-star half" aria-hidden="true">⭐</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="rating-star empty" aria-hidden="true">☆</span>';
    }

    return starsHTML;
  }

  renderBeforeAfter() {
    if (!this.options.beforeAfter) return '';

    return `
      <div class="before-after-gallery">
        <h5 class="gallery-title">Treatment Results</h5>
        <div class="before-after-images">
          <div class="before-image">
            <img src="${this.options.beforeAfter.before}" 
                 alt="Before treatment" 
                 loading="lazy">
            <span class="image-label">Before</span>
          </div>
          <div class="after-image">
            <img src="${this.options.beforeAfter.after}" 
                 alt="After treatment" 
                 loading="lazy">
            <span class="image-label">After</span>
          </div>
        </div>
      </div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static create(options) {
    return new PatientTestimonial(options).render();
  }

  // Predefined patient testimonials
  static getDentalTestimonials() {
    return [
      {
        id: 'sarah-implant',
        name: 'Sarah Al-Ahmad',
        photo: '/images/patients/sarah.jpg',
        rating: 5,
        testimonial: 'Dr. Islam transformed my smile with dental implants. The procedure was painless, and the results look completely natural. I can eat and smile with confidence again!',
        treatment: 'Dental Implants',
        date: '2024-12-15',
        verified: true,
        beforeAfter: {
          before: '/images/before-after/sarah-before.jpg',
          after: '/images/before-after/sarah-after.jpg'
        }
      },
      {
        id: 'ahmed-cosmetic',
        name: 'Ahmed Mohammed',
        photo: '/images/patients/ahmed.jpg',
        rating: 5,
        testimonial: 'Amazing cosmetic dentistry work! Dr. Islam gave me the Hollywood smile I always wanted. Professional service and great results.',
        treatment: 'Hollywood Smile',
        date: '2024-11-28',
        verified: true
      },
      {
        id: 'fatima-cleaning',
        name: 'Fatima Hassan',
        photo: '/images/patients/fatima.jpg',
        rating: 5,
        testimonial: 'Excellent dental care! Dr. Islam and his team are very professional and gentle. My family has been coming here for years.',
        treatment: 'Family Dentistry',
        date: '2024-12-10',
        verified: true
      },
      {
        id: 'omar-emergency',
        name: 'Omar Abdullah',
        photo: '/images/patients/omar.jpg',
        rating: 5,
        testimonial: 'I had a dental emergency at night and Dr. Islam was available immediately. Quick, professional, and pain-free treatment. Highly recommend!',
        treatment: 'Emergency Care',
        date: '2024-12-01',
        verified: true
      },
      {
        id: 'maryam-ortho',
        name: 'Maryam Ali',
        photo: '/images/patients/maryam.jpg',
        rating: 5,
        testimonial: 'Invisalign treatment was perfect! Dr. Islam explained everything clearly and the results exceeded my expectations. Thank you!',
        treatment: 'Invisalign',
        date: '2024-11-15',
        verified: true
      },
      {
        id: 'khalid-pediatric',
        name: 'Khalid & Layla (Parents)',
        photo: '/images/patients/family.jpg',
        rating: 5,
        testimonial: 'Dr. Islam is wonderful with children! Our kids actually look forward to dental visits now. The clinic is child-friendly and staff is amazing.',
        treatment: 'Pediatric Dentistry',
        date: '2024-12-05',
        verified: true
      }
    ];
  }

  // Arabic versions of testimonials
  static getDentalTestimonialsArabic() {
    return [
      {
        id: 'sarah-implant-ar',
        name: 'سارة الأحمد',
        photo: '/images/patients/sarah.jpg',
        rating: 5,
        testimonial: 'د. إسلام غيّر ابتسامتي بزراعة الأسنان. كان الإجراء بدون ألم والنتائج تبدو طبيعية تماماً. أستطيع الأكل والابتسام بثقة مرة أخرى!',
        treatment: 'زراعة الأسنان',
        date: '2024-12-15',
        verified: true,
        beforeAfter: {
          before: '/images/before-after/sarah-before.jpg',
          after: '/images/before-after/sarah-after.jpg'
        }
      },
      {
        id: 'ahmed-cosmetic-ar',
        name: 'أحمد محمد',
        photo: '/images/patients/ahmed.jpg',
        rating: 5,
        testimonial: 'عمل تجميل أسنان مذهل! د. إسلام أعطاني ابتسامة هوليوود التي طالما حلمت بها. خدمة احترافية ونتائج رائعة.',
        treatment: 'ابتسامة هوليوود',
        date: '2024-11-28',
        verified: true
      },
      {
        id: 'fatima-cleaning-ar',
        name: 'فاطمة حسن',
        photo: '/images/patients/fatima.jpg',
        rating: 5,
        testimonial: 'رعاية أسنان ممتازة! د. إسلام وفريقه محترفون ولطفاء جداً. عائلتي تأتي هنا لسنوات.',
        treatment: 'طب أسنان العائلة',
        date: '2024-12-10',
        verified: true
      },
      {
        id: 'omar-emergency-ar',
        name: 'عمر عبدالله',
        photo: '/images/patients/omar.jpg',
        rating: 5,
        testimonial: 'كانت لدي حالة طوارئ أسنان في الليل وكان د. إسلام متاحاً فوراً. علاج سريع ومحترف وبدون ألم. أنصح بشدة!',
        treatment: 'رعاية الطوارئ',
        date: '2024-12-01',
        verified: true
      }
    ];
  }

  // Generate testimonials grid
  static generateTestimonialsGrid(testimonials, language = 'en') {
    return `
      <div class="medical-grid testimonials-grid">
        ${testimonials.map(testimonial => {
          testimonial.animation = true;
          return PatientTestimonial.create(testimonial);
        }).join('')}
      </div>
    `;
  }

  // Carousel version for homepage
  static generateTestimonialsCarousel(testimonials, language = 'en') {
    return `
      <div class="testimonials-carousel" role="region" aria-label="Patient testimonials">
        <div class="carousel-container">
          <div class="carousel-track">
            ${testimonials.map((testimonial, index) => `
              <div class="carousel-slide ${index === 0 ? 'active' : ''}" 
                   data-slide="${index}">
                ${PatientTestimonial.create(testimonial)}
              </div>
            `).join('')}
          </div>
          
          <div class="carousel-controls">
            <button class="carousel-btn prev" aria-label="Previous testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            
            <div class="carousel-dots">
              ${testimonials.map((_, index) => `
                <button class="carousel-dot ${index === 0 ? 'active' : ''}" 
                        data-slide="${index}"
                        aria-label="Go to testimonial ${index + 1}"></button>
              `).join('')}
            </div>
            
            <button class="carousel-btn next" aria-label="Next testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize carousel functionality
  static initializeCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Show current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      // Move track
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Auto-play (optional)
    const autoPlay = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
  }

  // Enhanced accessibility
  static enhanceAccessibility() {
    document.querySelectorAll('.patient-testimonial').forEach(testimonial => {
      // Add focus management
      testimonial.setAttribute('tabindex', '0');
      
      testimonial.addEventListener('focus', () => {
        testimonial.style.outline = '2px solid var(--medical-primary)';
        testimonial.style.outlineOffset = '4px';
      });

      testimonial.addEventListener('blur', () => {
        testimonial.style.outline = 'none';
      });
    });
  }

  // Initialize all functionality
  static initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeCarousel();
        this.enhanceAccessibility();
      });
    } else {
      this.initializeCarousel();
      this.enhanceAccessibility();
    }
  }
}

export default PatientTestimonial;