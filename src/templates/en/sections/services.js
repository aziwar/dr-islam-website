// English Services Section
import ProfessionalServiceCard from '../../../components/dr-islam/ProfessionalServiceCard.js';

export function getEnglishServicesSection() {
  const services = ProfessionalServiceCard.getServices();

  return `
    <section id="services" class="services">
        <div class="container">
            <h2>Our Professional Services</h2>
            <p class="section-subtitle">High-quality dental care tailored to your needs.</p>
            ${ProfessionalServiceCard.generateServicesGrid(services)}
        </div>
    </section>
    <script type="module">
        import ProfessionalServiceCard from '/src/components/dr-islam/ProfessionalServiceCard.js';
        ProfessionalServiceCard.initialize();
    </script>
  `;
}