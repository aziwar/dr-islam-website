// Arabic Services Section
import ProfessionalServiceCard from '../../../components/dr-islam/ProfessionalServiceCard.js';

export function getArabicServicesSection() {
  const services = ProfessionalServiceCard.getServicesArabic();

  return `
    <section id="services" class="services">
        <div class="container">
            <h2>خدماتنا الاحترافية</h2>
            <p class="section-subtitle">رعاية أسنان عالية الجودة مصممة خصيصًا لتلبية احتياجاتك.</p>
            ${ProfessionalServiceCard.generateServicesGrid(services)}
        </div>
    </section>
    <script type="module">
        import ProfessionalServiceCard from '/src/components/dr-islam/ProfessionalServiceCard.js';
        ProfessionalServiceCard.initialize();
    </script>
  `;
}
