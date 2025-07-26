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

/* Enhanced Gallery */
.gallery {
    padding: 80px 5%;
    background: var(--light);
}

.gallery h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

.gallery-subtitle {
    text-align: center;
    color: var(--text);
    margin-bottom: 3rem;
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Gallery Filter Tabs */
.gallery-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--white);
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 176, 147, 0.3);
}

/* Enhanced Gallery Grid */
.gallery-grid.enhanced {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
}

.gallery-item {
    background: var(--white);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    position: relative;
}

.gallery-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

/* Case Images Container */
.case-images {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.case-images img {
    width: 50%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
    transition: all 0.4s ease;
}

.case-images img:first-child {
    border-right: 2px solid var(--white);
}

.gallery-item:hover .case-images img {
    filter: brightness(1.1) contrast(1.05);
}

/* Before/After Labels */
.case-images::before,
.case-images::after {
    position: absolute;
    top: 10px;
    padding: 6px 12px;
    background: rgba(0,0,0,0.7);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 15px;
    z-index: 2;
}

.case-images::before {
    content: 'قبل';
    right: 10px;
}

.case-images::after {
    content: 'بعد';
    left: 10px;
}

/* Case Information */
.case-info {
    padding: 1.5rem;
    text-align: right;
    direction: rtl;
}

.case-info h4 {
    color: var(--secondary);
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    font-weight: 700;
}

.case-details {
    color: var(--text);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
}

.treatment-time {
    color: var(--primary);
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

/* Case Badges */
.case-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    position: absolute;
    bottom: 15px;
    left: 15px;
}

.case-badge.implant {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
}

.case-badge.cosmetic {
    background: linear-gradient(135deg, #E91E63, #C2185B);
    color: white;
}

.case-badge.orthodontic {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    color: white;
}

.case-badge.reconstruction {
    background: linear-gradient(135deg, #FF9800, #F57C00);
    color: white;
}

/* Gallery Actions */
.gallery-actions {
    text-align: center;
    margin-top: 3rem;
}

.view-more-btn {
    background: var(--primary);
    color: var(--white);
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.view-more-btn:hover {
    background: var(--secondary);
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.4);
}

.view-more-btn .arrow {
    transition: transform 0.3s ease;
}

.view-more-btn:hover .arrow {
    transform: translateX(-5px);
}

.gallery-stats {
    color: var(--secondary);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
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
}

/* Contact Form */
.contact-form-section {
    background: var(--white);
    padding: 3rem 2rem;
    border-radius: 15px;
    max-width: 600px;
    margin: 3rem auto 0;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.contact-form-section h3 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    position: relative;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--light);
    border-radius: 8px;
    background: var(--white);
    font-size: 1rem;
    color: var(--text);
    transition: all 0.3s ease;
    font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    background: #fefefe;
}

.form-group label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: var(--text-light);
    font-size: 1rem;
    transition: all 0.3s ease;
    pointer-events: none;
    background: var(--white);
    padding: 0 0.5rem;
}

.form-group input:focus + label,
.form-group input.has-value + label,
.form-group select:focus + label,
.form-group select:not([value=""]) + label,
.form-group textarea:focus + label,
.form-group textarea.has-value + label {
    top: -0.5rem;
    left: 0.5rem;
    font-size: 0.875rem;
    color: var(--primary);
    font-weight: 500;
}

.form-group select {
    cursor: pointer;
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.submit-btn {
    background: var(--primary);
    color: var(--white);
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.submit-btn .btn-loading {
    display: none;
}

.submit-btn.loading .btn-text {
    display: none;
}

.submit-btn.loading .btn-loading {
    display: inline;
}

/* Form validation styles */
.form-group input:invalid:not(:focus):not(:placeholder-shown),
.form-group select:invalid:not(:focus),
.form-group textarea:invalid:not(:focus):not(:placeholder-shown) {
    border-color: #dc3545;
}

.form-group input:valid:not(:focus):not(:placeholder-shown),
.form-group select:valid:not(:focus),
.form-group textarea:valid:not(:focus):not(:placeholder-shown) {
    border-color: #28a745;
}

/* Success/Error messages */
.form-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 500;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

/* RTL Support for Arabic */
[dir="rtl"] .form-group label {
    left: auto;
    right: 1rem;
}

[dir="rtl"] .form-group input:focus + label,
[dir="rtl"] .form-group input.has-value + label,
[dir="rtl"] .form-group select:focus + label,
[dir="rtl"] .form-group select:not([value=""]) + label,
[dir="rtl"] .form-group textarea:focus + label,
[dir="rtl"] .form-group textarea.has-value + label {
    left: auto;
    right: 0.5rem;
}`;