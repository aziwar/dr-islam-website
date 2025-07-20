// Component CSS - Feature-specific styles (~500 lines)
export const COMPONENT_CSS = `
/* Services */
.services {
    padding: 80px 5%;
    background: var(--light);
}

.services h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

/* Service Cards with Glassmorphism */
.service-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(190, 176, 147, 0.1) 0%, transparent 70%);
    transform: rotate(45deg);
    transition: all 0.6s ease;
    opacity: 0;
}

.service-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.service-card:hover::before {
    opacity: 1;
}

.service-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

/* Testimonials */
.testimonials {
    padding: 80px 5%;
    background: var(--white);
}

.testimonials h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.testimonial-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(190, 176, 147, 0.2);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
    transition: all 0.4s ease;
    position: relative;
}

.testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}

.testimonial-card::before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 4rem;
    color: var(--primary);
    opacity: 0.1;
    font-family: Georgia, serif;
}

.stars {
    color: #FFD700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.testimonial-card p {
    font-style: italic;
    margin-bottom: 1rem;
    line-height: 1.8;
}

.testimonial-card cite {
    color: var(--primary);
    font-weight: 600;
    font-style: normal;
}

/* Gallery */
.gallery {
    padding: 80px 5%;
    background: var(--light);
}

.gallery h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 1rem;
}

.gallery-subtitle {
    text-align: center;
    color: var(--text);
    margin-bottom: 3rem;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.gallery-item {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    position: relative;
    height: 400px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.before-after-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.before-after-slider {
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: var(--primary);
    cursor: ew-resize;
    transition: opacity 0.3s;
}

.before-after-slider::before {
    content: '◄ ►';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary);
    color: white;
    padding: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.gallery-item img {
    width: 50%;
    height: 200px;
    object-fit: cover;
    display: inline-block;
    transition: opacity 0.3s ease;
}

/* Gallery Skeleton Loaders */
.gallery-item.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

.gallery-item img.lazy-loading {
    opacity: 0;
}

.gallery-item img.lazy-loaded {
    opacity: 1;
}

.gallery-item p {
    padding: 1rem;
    color: var(--primary);
    font-weight: 600;
}

/* About */
.about {
    padding: 80px 5%;
}

.about h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.credentials ul {
    list-style: none;
    padding-right: 20px;
}

.credentials li {
    margin-bottom: 1rem;
    position: relative;
    padding-right: 20px;
}

.credentials li:before {
    content: "•";
    color: var(--primary);
    position: absolute;
    right: 0;
    font-size: 1.5rem;
}

/* Certifications */
.certifications {
    margin-top: 2rem;
}

.certifications h4 {
    margin-bottom: 1rem;
    color: var(--secondary);
}

.cert-badges {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.cert-badge {
    background: var(--light);
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9rem;
    display: inline-block;
}

/* Stats */
.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
}

.stat {
    text-align: center;
}

.stat h4 {
    color: var(--primary);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

/* FAQ */
.faq {
    padding: 80px 5%;
    background: var(--white);
}

.faq h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.faq-list {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: var(--light);
    padding: 2rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.faq-item h3 {
    color: var(--primary);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 48px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.faq-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
    transition: transform 0.3s ease;
    display: inline-block;
}

.faq-item.active .faq-icon {
    transform: rotate(45deg);
}

.faq-item p {
    line-height: 1.8;
}

/* FAQ accordion animation */
.faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.faq-item.active .faq-content {
    max-height: 500px;
    transition: max-height 0.5s ease-in;
}

.faq-item h3::after {
    content: '+';
    position: absolute;
    left: 20px;
    transition: transform 0.3s ease;
}

.faq-item.active h3::after {
    transform: rotate(45deg);
}

/* Contact */
.contact {
    padding: 80px 5%;
    background: var(--light);
}

.contact h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
    margin-bottom: 3rem;
}

.contact-card {
    min-height: 60px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.contact-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.contact-card a {
    color: var(--secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    -webkit-tap-highlight-color: transparent;
}

.contact-card a:hover {
    color: var(--primary);
}

/* Working Hours */
.working-hours {
    background: var(--white);
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.working-hours h3 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 1.5rem;
}

.hours-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.day-hours {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--light);
}

.day {
    font-weight: 600;
    color: var(--secondary);
}

.hours {
    color: var(--text);
}

.hour-item {
    padding: 8px;
    font-size: 0.9rem;
}

/* Button loading state */
.btn.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
}

.btn.loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

/* Smooth transitions */
a,
button,
.btn,
.nav-link,
.gallery-item,
.faq-item {
    transition: all 0.3s ease;
}

/* Button hover effects */
.btn:hover:not(.loading) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active:not(.loading) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Link underline animation */
a:not(.btn):not(.nav-link) {
    position: relative;
    text-decoration: none;
}

a:not(.btn):not(.nav-link)::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
}

a:not(.btn):not(.nav-link):hover::after {
    width: 100%;
}

/* Gallery hover effects */
.gallery-item {
    overflow: hidden;
}

.gallery-item img {
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* Swipeable gallery */
.gallery-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.gallery-container::-webkit-scrollbar {
    display: none;
}

.gallery-item {
    scroll-snap-align: center;
}

/* Touch feedback */
.touchable {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}

.touchable:active {
    opacity: 0.8;
    transform: scale(0.98);
}`;