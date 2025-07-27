// Services, About, Testimonials CSS Module (~300 lines)
export const SERVICES_CSS = `
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

/* About */
.about {
    padding: 80px 5%;
    background: var(--white);
}

.about-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.about-text h2 {
    color: var(--secondary);
    margin-bottom: 1.5rem;
}

.about-text p {
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.about-image img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

/* Certifications */
.certifications {
    padding: 60px 5%;
    background: var(--light);
}

.certifications h3 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 2rem;
}

.cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.cert-item {
    text-align: center;
    padding: 1.5rem;
    background: var(--white);
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

/* Stats */
.stats {
    padding: 60px 5%;
    background: var(--primary);
    color: var(--white);
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.stat-item h3 {
    font-size: 3rem;
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

.faq-item {
    background: var(--white);
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.faq-question {
    padding: 1.5rem;
    background: var(--light);
    cursor: pointer;
    font-weight: 600;
    color: var(--secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s ease;
}

.faq-question:hover {
    background: rgba(190, 176, 147, 0.1);
}

.faq-question .icon {
    transition: transform 0.3s ease;
    font-size: 1.2rem;
}

.faq-item.active .faq-question .icon {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.active .faq-answer {
    max-height: 200px;
    padding: 1.5rem;
}

/* FAQ accordion animation */
.faq-answer {
    background: var(--white);
    color: var(--text);
    line-height: 1.6;
}

.faq-answer p {
    margin: 0;
}

/* Working Hours */
.working-hours {
    background: var(--light);
    padding: 2rem;
    border-radius: 15px;
    margin-top: 2rem;
}

.working-hours h4 {
    color: var(--secondary);
    margin-bottom: 1rem;
    text-align: center;
}

.hours-list {
    list-style: none;
    padding: 0;
}

.hours-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(190, 176, 147, 0.2);
}

.hours-list li:last-child {
    border-bottom: none;
}

.day {
    font-weight: 600;
    color: var(--primary);
}

.time {
    color: var(--text);
}

.closed {
    color: #999;
}

/* RTL Support for About Section */
.about-container[dir="rtl"] {
    text-align: right;
}

.about-container[dir="rtl"] .about-text {
    order: 2;
}

.about-container[dir="rtl"] .about-image {
    order: 1;
}
`;