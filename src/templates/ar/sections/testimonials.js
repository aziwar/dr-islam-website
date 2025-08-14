export const getArabicTestimonialsSection = () => `
    <section id="testimonials" class="testimonials">
        <div class="container">
            <h2>ماذا يقول مرضانا</h2>
            <div class="testimonial-carousel-container">
                <div class="testimonial-carousel" id="testimonialCarousel">
                    <div class="testimonial-slide active">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-ahmed-ar">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="صورة المريض">👤</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-ahmed-ar">أحمد السالم</h4>
                                    <span class="treatment-type">زراعة الأسنان</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 نجوم من أصل 5">⭐⭐⭐⭐⭐</div>
                            <blockquote>"خدمة ممتازة وطبيب محترف جداً. الدكتور اسلام شرح لي كل خطوة في العلاج وكانت النتيجة رائعة. لا أستطيع أن أكون أكثر سعادة بابتسامتي الجديدة!"</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">يناير 2025</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </article>
                    </div>

                    <div class="testimonial-slide">
                        <article class="testimonial-card featured" role="article" aria-labelledby="testimonial-fatima-ar">
                            <div class="patient-info">
                                <div class="patient-avatar" role="img" aria-label="صورة المريضة">👩</div>
                                <div class="patient-details">
                                    <h4 id="testimonial-fatima-ar">فاطمة العلي</h4>
                                    <span class="treatment-type">طب الأسنان التجميلي</span>
                                </div>
                            </div>
                            <div class="stars" role="img" aria-label="5 نجوم من أصل 5">⭐⭐⭐⭐⭐</div>
                            <blockquote>"أفضل تجربة زراعة أسنان في الكويت. الدكتور متمكن جداً وفريق العمل متعاون. أنصح الجميع بزيارة العيادة للحصول على علاج عالي الجودة."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">ديسمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </article>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>محمد الخالد</h4>
                                    <span class="treatment-type">ابتسامة هوليوود</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"علاج احترافي ونتائج مبهرة. الدكتور اسلام حول ابتسامتي تماماً بإجراء ابتسامة هوليوود. التقنيات المستخدمة حديثة ومتطورة."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">نوفمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👩</div>
                                <div class="patient-details">
                                    <h4>سارة الراشد</h4>
                                    <span class="treatment-type">علاج الجذور</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"علاج جذور بدون ألم! كنت خائفة جداً لكن الدكتور اسلام جعل التجربة مريحة تماماً. أسلوبه اللطيف والأجهزة الحديثة أحدثت الفرق."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">أكتوبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-slide">
                        <div class="testimonial-card featured">
                            <div class="patient-info">
                                <div class="patient-avatar">👨</div>
                                <div class="patient-details">
                                    <h4>عمر المطيري</h4>
                                    <span class="treatment-type">تنظيف الأسنان</span>
                                </div>
                            </div>
                            <div class="stars">⭐⭐⭐⭐⭐</div>
                            <blockquote>"خدمة نظافة الأسنان استثنائية. العيادة نظيفة وحديثة جداً. الدكتور اسلام وفريقه يحافظون على أعلى معايير التعقيم ورعاية المرضى."</blockquote>
                            <div class="testimonial-meta">
                                <span class="date">سبتمبر 2024</span>
                                <span class="verified">✓ مريض مؤكد</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Carousel Controls (Arabic) -->
                <div class="carousel-controls">
                    <button class="carousel-btn next" onclick="moveTestimonialCarousel(1)">‹</button>
                    <div class="carousel-dots" id="testimonialDots">
                        <button class="dot active" onclick="currentTestimonialSlide(1)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(2)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(3)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(4)"></button>
                        <button class="dot" onclick="currentTestimonialSlide(5)"></button>
                    </div>
                    <button class="carousel-btn prev" onclick="moveTestimonialCarousel(-1)">›</button>
                </div>

                <!-- Testimonial Summary Stats (Arabic) -->
                <div class="testimonial-stats">
                    <div class="stat-item">
                        <div class="stat-number">4.9</div>
                        <div class="stat-label">متوسط التقييم</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">مريض سعيد</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">%98</div>
                        <div class="stat-label">ينصحون بالعيادة</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
