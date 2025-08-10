// English Services Section
import { Icon } from '../../../components/atoms/Icon.js';

export function getEnglishServicesSection() {
  return `
    <section id="services" class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                <div class="service-card" data-service="dental-implants">
                    <div class="service-icon">
                        ${Icon.create({ name: 'dental-implant', size: 'xl', ariaLabel: 'Dental Implants Icon' })}
                    </div>
                    <h3>Dental Implants</h3>
                    <p>Immediate and delayed implants with latest techniques</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('dental-implants')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="root-canal">
                    <div class="service-icon">
                        ${Icon.create({ name: 'root-canal', size: 'xl', ariaLabel: 'Root Canal Treatment Icon' })}
                    </div>
                    <h3>Root Canal Treatment</h3>
                    <p>Specialized endodontic treatment</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('root-canal')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="prosthodontics">
                    <div class="service-icon">
                        ${Icon.create({ name: 'prosthodontics', size: 'xl', ariaLabel: 'Prosthodontics Icon' })}
                    </div>
                    <h3>Prosthodontics</h3>
                    <p>Fixed and removable prosthetics</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('prosthodontics')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="oral-surgery">
                    <div class="service-icon">
                        ${Icon.create({ name: 'oral-surgery', size: 'xl', ariaLabel: 'Oral Surgery Icon' })}
                    </div>
                    <h3>Oral Surgery</h3>
                    <p>Surgical extractions and advanced procedures</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('oral-surgery')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="cosmetic-dentistry">
                    <div class="service-icon">
                        ${Icon.create({ name: 'cosmetic-dentistry', size: 'xl', ariaLabel: 'Cosmetic Dentistry Icon' })}
                    </div>
                    <h3>Cosmetic Dentistry</h3>
                    <p>Hollywood smile and whitening</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('cosmetic-dentistry')">Learn More</button>
                    </div>
                </div>
                <div class="service-card" data-service="gum-treatment">
                    <div class="service-icon">
                        ${Icon.create({ name: 'gum-treatment', size: 'xl', ariaLabel: 'Gum Treatment Icon' })}
                    </div>
                    <h3>Gum Treatment</h3>
                    <p>Periodontal therapy and gum disease treatment</p>
                    <div class="service-actions">
                        <button class="service-learn-more" onclick="showServiceDetails('gum-treatment')">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}