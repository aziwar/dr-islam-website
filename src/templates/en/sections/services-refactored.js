// English Services Section - Refactored with Well-Structured Design
// Implements categorized service hierarchy and progressive disclosure
import { ServiceCard } from '../../../components/molecules/ServiceCard.js';

/**
 * Enhanced Services Section with Categorized Layout
 * Implements the recommended information architecture:
 * - Emergency Care (Urgent/Pain Relief)
 * - Popular Services (Implants, Hollywood Smile) 
 * - Preventive Care (Cleanings, Check-ups)
 * - Specialized Services (Root Canal, Surgery, Prosthodontics)
 */
export async function getEnglishServicesSection() {
  
  // Define service categories with priority hierarchy
  const serviceCategories = {
    emergency: {
      title: "🚨 Emergency Care",
      subtitle: "Urgent dental problems - we're here to help",
      priority: "urgent",
      services: [
        {
          title: "Emergency Treatment",
          description: "Immediate pain relief and urgent dental care",
          icon: "emergency-dental",
          variant: "featured",
          badge: "24/7",
          link: "#emergency-booking",
          onClick: "openEmergencyBooking()"
        }
      ]
    },
    
    popular: {
      title: "⭐ Popular Services", 
      subtitle: "Our most requested treatments",
      priority: "high",
      services: [
        {
          title: "Dental Implants",
          description: "Immediate and delayed implants with latest techniques. Permanent solution for missing teeth.",
          icon: "dental-implant",
          variant: "primary",
          badge: "Most Popular",
          features: ["Single tooth replacement", "Multiple teeth solutions", "Same-day implants available"],
          onClick: "showServiceDetails('dental-implants')"
        },
        {
          title: "Hollywood Smile",
          description: "Complete cosmetic makeover with veneers and whitening for that perfect smile.",
          icon: "cosmetic-dentistry",
          variant: "primary", 
          badge: "Celebrity Choice",
          features: ["Porcelain veneers", "Professional whitening", "Complete smile design"],
          onClick: "showServiceDetails('cosmetic-dentistry')"
        }
      ]
    },

    specialized: {
      title: "🔧 Specialized Treatments",
      subtitle: "Advanced procedures by our specialists", 
      priority: "medium",
      services: [
        {
          title: "Root Canal Treatment",
          description: "Advanced endodontic treatment to save your natural teeth",
          icon: "root-canal",
          variant: "standard",
          features: ["Pain-free procedure", "Latest rotary systems", "Single visit option"],
          onClick: "showServiceDetails('root-canal')"
        },
        {
          title: "Oral Surgery",
          description: "Surgical extractions and advanced oral surgical procedures",
          icon: "oral-surgery", 
          variant: "standard",
          features: ["Wisdom teeth removal", "Surgical extractions", "Bone grafting"],
          onClick: "showServiceDetails('oral-surgery')"
        },
        {
          title: "Prosthodontics",
          description: "Fixed and removable prosthetic solutions for missing teeth",
          icon: "prosthodontics",
          variant: "standard",
          features: ["Crown & bridge work", "Dentures", "Partial prosthetics"],
          onClick: "showServiceDetails('prosthodontics')"
        }
      ]
    },

    preventive: {
      title: "🛡️ Preventive Care",
      subtitle: "Keep your smile healthy and beautiful",
      priority: "low", 
      services: [
        {
          title: "Professional Cleaning",
          description: "Regular maintenance to prevent dental problems",
          icon: "dental-cleaning",
          variant: "preventive",
          features: ["Deep cleaning", "Plaque removal", "Polishing"],
          onClick: "showServiceDetails('cleaning')"
        },
        {
          title: "Gum Treatment", 
          description: "Periodontal therapy and gum disease prevention",
          icon: "gum-treatment",
          variant: "preventive",
          features: ["Gum disease treatment", "Periodontal maintenance", "Deep cleaning"],
          onClick: "showServiceDetails('gum-treatment')"
        }
      ]
    }
  };

  // Generate service cards for each category
  const generateCategorySection = async (category, data) => {
    const serviceCardsHtml = await Promise.all(
      data.services.map(service => ServiceCard.create(service))
    );

    return `
      <div class="service-category service-category--${data.priority}" data-category="${category}">
        <div class="service-category__header">
          <h3 class="service-category__title">${data.title}</h3>
          <p class="service-category__subtitle">${data.subtitle}</p>
        </div>
        <div class="service-category__grid">
          ${serviceCardsHtml.join('')}
        </div>
      </div>
    `;
  };

  // Generate all category sections
  const categorySections = await Promise.all([
    generateCategorySection('emergency', serviceCategories.emergency),
    generateCategorySection('popular', serviceCategories.popular), 
    generateCategorySection('specialized', serviceCategories.specialized),
    generateCategorySection('preventive', serviceCategories.preventive)
  ]);

  return `
    <section id="services" class="services services--structured" role="region" aria-labelledby="services-heading">
      <div class="container">
        
        <!-- Main Services Header -->
        <header class="services__header">
          <h2 id="services-heading" class="services__title">Our Comprehensive Dental Services</h2>
          <p class="services__description">
            Dr. Islam provides complete dental care from emergency treatment to cosmetic makeovers. 
            Choose the service category that matches your needs.
          </p>
        </header>

        <!-- Service Categories -->
        <div class="services__categories">
          ${categorySections.join('')}
        </div>

        <!-- View All Services CTA -->
        <div class="services__footer">
          <div class="services__cta">
            <h3>Not sure which service you need?</h3>
            <p>Schedule a consultation and let Dr. Islam recommend the best treatment for you.</p>
            <button class="btn btn--primary btn--large" onclick="openBookingModal()">
              Schedule Free Consultation
            </button>
            <button class="btn btn--ghost" onclick="showServiceDetails('all')">
              View All Services
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- Enhanced Services Section Styles -->
    <style>
      /* ===== STRUCTURED SERVICES LAYOUT ===== */
      .services--structured {
        padding: var(--space-3xl) 0;
        background: linear-gradient(135deg, var(--bg-light) 0%, var(--white) 100%);
      }

      .services__header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto var(--space-3xl);
      }

      .services__title {
        font-size: var(--text-4xl);
        color: var(--secondary);
        margin-bottom: var(--space-md);
        font-weight: 600;
      }

      .services__description {
        font-size: var(--text-lg);
        color: var(--text-light);
        line-height: var(--leading-relaxed);
      }

      /* ===== SERVICE CATEGORIES ===== */
      .services__categories {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xl);
      }

      .service-category {
        position: relative;
      }

      .service-category__header {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .service-category__title {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-sm);
        font-weight: 600;
      }

      .service-category__subtitle {
        font-size: var(--text-base);
        color: var(--text-light);
        margin-bottom: 0;
      }

      /* Category Priority Styling */
      .service-category--urgent .service-category__title {
        color: var(--emergency);
      }

      .service-category--high .service-category__title {
        color: var(--primary);
      }

      .service-category--medium .service-category__title {
        color: var(--secondary);
      }

      .service-category--low .service-category__title {
        color: var(--text-light);
      }

      /* ===== CATEGORY GRIDS ===== */
      .service-category__grid {
        display: grid;
        gap: var(--space-xl);
      }

      /* Emergency - Full width spotlight */
      .service-category--urgent .service-category__grid {
        grid-template-columns: 1fr;
        max-width: 600px;
        margin: 0 auto;
      }

      /* Popular - Two equal columns */
      .service-category--high .service-category__grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--space-2xl);
      }

      /* Specialized - Three columns */
      .service-category--medium .service-category__grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-lg);
      }

      /* Preventive - Two columns, smaller cards */
      .service-category--low .service-category__grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-lg);
      }

      /* ===== SERVICES FOOTER ===== */
      .services__footer {
        margin-top: var(--space-3xl);
        padding-top: var(--space-2xl);
        border-top: 1px solid var(--bg-section);
      }

      .services__cta {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .services__cta h3 {
        font-size: var(--text-xl);
        color: var(--secondary);
        margin-bottom: var(--space-sm);
      }

      .services__cta p {
        color: var(--text-light);
        margin-bottom: var(--space-lg);
        line-height: var(--leading-relaxed);
      }

      .services__cta .btn {
        margin: 0 var(--space-xs) var(--space-sm);
      }

      /* ===== RESPONSIVE DESIGN ===== */
      @media (max-width: var(--breakpoint-md-max)) {
        .service-category--high .service-category__grid,
        .service-category--medium .service-category__grid,
        .service-category--low .service-category__grid {
          grid-template-columns: 1fr;
        }

        .services__categories {
          gap: var(--space-2xl);
        }

        .services__cta .btn {
          display: block;
          width: 100%;
          max-width: 300px;
          margin: 0 auto var(--space-sm);
        }
      }

      @media (max-width: var(--breakpoint-sm-max)) {
        .services--structured {
          padding: var(--space-2xl) 0;
        }

        .services__header {
          margin-bottom: var(--space-2xl);
        }

        .services__title {
          font-size: var(--text-3xl);
        }
      }
    </style>
  `;
}