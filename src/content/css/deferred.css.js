// Deferred CSS - Non-critical styles loaded after initial paint
export const DEFERRED_CSS = `
/* Non-critical styles - Loaded after first paint */

/* Detailed navigation styles */
nav a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

nav a:hover {
    color: var(--primary);
}

nav a:hover::after {
    width: 80%;
}

/* Enhanced CTA button effects */
.cta-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.cta-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 35px rgba(190, 176, 147, 0.4);
}

.cta-button:hover::after {
    width: 350px;
    height: 350px;
}

/* Mobile menu - Non-critical animations */
#mobileMenu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    display: flex;
}

#mobileMenu.active {
    right: 0;
}

.mobile-menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-backdrop.active {
    opacity: 1;
    visibility: visible;
}

/* Mobile menu toggle animations */
.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Services section */
.services {
    padding: 80px 0;
    background: var(--light);
}

.services h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.service-card {
    background: var(--white);
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.service-card h3 {
    color: var(--secondary);
    font-size: 1.4rem;
    margin-bottom: 1rem;
}

.service-card p {
    color: #666;
    line-height: 1.8;
}

/* About section */
.about {
    padding: 80px 0;
    background: var(--white);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    align-items: center;
}

.doctor-image {
    text-align: center;
}

.doctor-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.doctor-info h2 {
    color: var(--secondary);
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.doctor-info p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #555;
}

/* Testimonials */
.testimonials {
    padding: 80px 0;
    background: var(--light);
}

.testimonials h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary);
}

.testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.testimonial-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
}

.testimonial-card::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 4rem;
    color: var(--primary);
    font-family: serif;
}

.stars {
    color: #ffd700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.testimonial-card p {
    font-style: italic;
    line-height: 1.8;
    margin-bottom: 1rem;
    color: #555;
}

.testimonial-card cite {
    font-weight: bold;
    color: var(--secondary);
}

/* Gallery */
.gallery {
    padding: 80px 0;
    background: var(--white);
}

.gallery h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary);
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: scale(1.05);
}

.gallery-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

/* Before/After slider */
.before-after-container {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
}

.before-after-slider {
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: white;
    cursor: ew-resize;
    z-index: 2;
}

.before-after-slider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.before-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
}

/* Contact form */
.contact {
    padding: 80px 0;
    background: var(--light);
}

.contact h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary);
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-form input,
.contact-form textarea {
    padding: 15px 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    font-family: inherit;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: var(--primary);
}

/* Modal styles */
.modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: slideIn 0.3s ease;
}

.close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 2rem;
    cursor: pointer;
    color: #aaa;
}

.close:hover {
    color: var(--primary);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

/* Notification */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    z-index: 10001;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
}

.success-notification {
    background: var(--success);
}

.notification.show {
    opacity: 1;
    transform: translateX(0);
}

/* Footer */
footer {
    background: var(--secondary);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: auto;
}

/* Sticky WhatsApp button */
.sticky-book {
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: var(--success);
    color: white;
    padding: 15px 25px;
    border-radius: 50px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    z-index: 999;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); }
    50% { box-shadow: 0 5px 30px rgba(40, 167, 69, 0.5); }
    100% { box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3); }
}

.sticky-book:hover {
    transform: scale(1.1);
    background: #218838;
}

/* Loading states */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(190, 176, 147, 0.2);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Image lazy loading */
img[data-src] {
    opacity: 0;
    transition: opacity 0.3s ease;
}

img.loaded {
    opacity: 1;
}

/* Gallery modal */
.gallery-modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    animation: fadeIn 0.3s ease;
}

.gallery-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
}

.close-modal {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 3rem;
    color: white;
    cursor: pointer;
    z-index: 10001;
}

.close-modal:hover {
    color: var(--primary);
}

`;