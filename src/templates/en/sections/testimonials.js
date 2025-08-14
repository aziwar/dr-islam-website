export const getEnglishTestimonialsSection = () => `
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>What Our Patients Say</h2>
            <div class="testimonial-carousel-container">
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide active">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-ahmed">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="Patient avatar">👤</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-ahmed">Ahmed Al-Salem</h4>
                                    <span class="treatment-type">Dental Implants</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Excellent service and very professional doctor. Dr. Islam explained every step of the treatment and the result was amazing. I couldn't be happier with my new smile!"</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">January 2025</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </article>
                    </div>

                    <div class="testimonial-slide">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-fatima">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="Patient avatar">👩</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-fatima">Fatima Al-Ali</h4>
                                    <span class="treatment-type">Cosmetic Dentistry</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Best dental implant experience in Kuwait. The doctor is very skilled and the team is cooperative. I recommend everyone to visit the clinic for quality treatment."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">December 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </article>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>Mohammed Al-Khalid</h4>
                                    <span class="treatment-type">Smile Makeover</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Professional treatment and stunning results. Dr. Islam completely transformed my smile with Hollywood smile procedure. The technology used is state-of-the-art."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">November 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👩</div>
                                <div class="patient-details">
                                    <h4>Sarah Al-Rashid</h4>
                                    <span class="treatment-type">Root Canal Treatment</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Painless root canal treatment! I was terrified but Dr. Islam made the whole experience comfortable. His gentle approach and modern equipment made all the difference."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">October 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>Omar Al-Mutairi</h4>
                                    <span class="treatment-type">Teeth Cleaning</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"Exceptional dental hygiene service. The clinic is very clean and modern. Dr. Islam and his team maintain the highest standards of sterilization and patient care."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">September 2024</span>
                                <span class="verified">✓ Verified Patient</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Carousel Controls -->
                <div class="carousel-controls">
                    <button class="carousel-btn prev" onclick="moveTestimonialCarousel(-1)">‹</button>
                    <div class="carousel-dots" id="testimonialDots">
                        <button class="dot active" onclick="currentTestimonialSlide(1)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(2)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(3)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(4)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(5)"></button>
                    </div>
                    <button class="carousel-btn next" onclick="moveTestimonialCarousel(1)">›</button>
                </div>

                <!-- Testimonial Summary Stats -->
                <div class="testimonial-stats">
                    <div class="stat-item">
                        <div class="stat-number">4.9</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Happy Patients</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Would Recommend</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
