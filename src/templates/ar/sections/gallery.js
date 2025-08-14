export const getArabicGallerySection = () => `
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>نتائج حقيقية تتحدث عن نفسها</h2>
            <p class="gallery-subtitle">أكثر من 1200 حالة ناجحة وابتسامات متجددة</p>

            <!-- Gallery Filter Tabs -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">جميع الحالات</button>
                <button class="filter-btn" data-filter="implants">زراعة الأسنان</button>
                <button class="filter-btn" data-filter="cosmetic">تجميل الأسنان</button>
                <button class="filter-btn" data-filter="orthodontic">التقويم</button>
                <button class="filter-btn" data-filter="reconstruction">إعادة التأهيل</button>
            </div>

            <div class="gallery-grid enhanced">
                <!-- Dental Implants Cases -->
                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case1.webp" alt="قبل زراعة الأسنان الأمامية" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد زراعة الأسنان الأمامية" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>زراعة أسنان أمامية فورية</h4>
                        <p class="case-details">مريض، 35 عام - زراعة فورية مع تاج خزفي</p>
                        <p class="treatment-time">مدة العلاج: جلسة واحدة</p>
                        <span class="case-badge implant">زراعة</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case2.webp" alt="قبل زراعة متعددة" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="بعد زراعة متعددة" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>زراعة متعددة مع جسر ثابت</h4>
                        <p class="case-details">مريضة، 42 عام - استبدال 4 أسنان مفقودة</p>
                        <p class="treatment-time">مدة العلاج: 4 أشهر</p>
                        <span class="case-badge implant">زراعة</span>
                    </div>
                </div>

                <!-- Cosmetic Cases -->
                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/real-case3.webp" alt="قبل ابتسامة هوليوود" loading="lazy">
                        <img src="/assets/case3-after.webp" alt="بعد ابتسامة هوليوود" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>ابتسامة هوليوود كاملة</h4>
                        <p class="case-details">مريضة، 28 عام - فينير خزفي 16 سن</p>
                        <p class="treatment-time">مدة العلاج: أسبوعين</p>
                        <span class="case-badge cosmetic">تجميلي</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="قبل تبييض الأسنان" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد تبييض الأسنان" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>تبييض بالليزر + ترميم</h4>
                        <p class="case-details">مريض، 31 عام - تبييض مع حشوات تجميلية</p>
                        <p class="treatment-time">مدة العلاج: جلستين</p>
                        <span class="case-badge cosmetic">تجميلي</span>
                    </div>
                </div>

                <!-- Orthodontic Cases -->
                <div class="gallery-item" data-category="orthodontic">
                    <div class="case-images">
                        <img src="/assets/case2-before.webp" alt="قبل التقويم الشفاف" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="بعد التقويم الشفاف" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>تقويم شفاف (Invisalign)</h4>
                        <p class="case-details">مريضة، 24 عام - تصحيح ازدحام الأسنان</p>
                        <p class="treatment-time">مدة العلاج: 8 أشهر</p>
                        <span class="case-badge orthodontic">تقويم</span>
                    </div>
                </div>

                <!-- Full Mouth Reconstruction -->
                <div class="gallery-item" data-category="reconstruction">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="قبل إعادة تأهيل كاملة" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="بعد إعادة تأهيل كاملة" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>إعادة تأهيل كاملة للفم</h4>
                        <p class="case-details">مريض، 55 عام - زراعات متعددة مع تيجان</p>
                        <p class="treatment-time">مدة العلاج: 6 أشهر</p>
                        <span class="case-badge reconstruction">إعادة تأهيل</span>
                    </div>
                </div>
            </div>

            <!-- View More Button -->
            <div class="gallery-actions">
                <button class="view-more-btn">عرض المزيد من الحالات <span class="arrow">←</span></button>
                <p class="gallery-stats">+1200 حالة ناجحة | معدل نجاح 98%</p>
            </div>
        </div>
    </section>
`;
