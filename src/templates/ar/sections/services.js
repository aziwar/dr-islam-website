export const getArabicServicesSection = () => `
    <section id="services" class="services">
        <div class="container">
            <h2>خدماتنا</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>زراعة الأسنان</h3>
                    <p>زراعة فورية ومتأخرة بأحدث التقنيات</p>
                </div>
                <div class="service-card">
                    <h3>علاج الجذور</h3>
                    <p>علاج متخصص لقنوات الجذور</p>
                </div>
                <div class="service-card">
                    <h3>التركيبات</h3>
                    <p>تركيبات ثابتة ومتحركة</p>
                </div>
                <div class="service-card">
                    <h3>جراحة الأسنان</h3>
                    <p>خلع جراحي وعمليات متقدمة</p>
                </div>
                <div class="service-card">
                    <h3>تجميل الأسنان</h3>
                    <p>ابتسامة هوليوود وتبييض</p>
                </div>
                <div class="service-card">
                    <h3>علاج اللثة</h3>
                    <p>علاج أمراض اللثة والأنسجة</p>
                </div>
                <div class="service-card">
                    <h3>الحشوات التجميلية</h3>
                    <p>حشوات بلون الأسنان الطبيعي</p>
                </div>
                <div class="service-card">
                    <h3>إعادة التأهيل الكامل</h3>
                    <p>علاج شامل للفم والأسنان</p>
                </div>
            </div>

            <!-- Desktop Service Comparison Table (Arabic) -->
            <div class="services-comparison">
                <table class="comparison-table" role="table" aria-label="جدول مقارنة الخدمات">
                    <thead>
                        <tr>
                            <th scope="col">الخدمة</th>
                            <th scope="col">الوصف</th>
                            <th scope="col">المدة</th>
                            <th scope="col">السعر</th>
                            <th scope="col">احجز الآن</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="service-name">زراعة الأسنان</td>
                            <td class="service-description">زراعة فورية ومتأخرة بأحدث التقنيات. زراعة سن واحد أو تأهيل الفم بالكامل.</td>
                            <td class="service-duration">٦٠-٩٠ دقيقة</td>
                            <td class="service-price popular">٣٥٠-٨٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">علاج الجذور</td>
                            <td class="service-description">علاج متخصص لقنوات الجذور بتقنيات حديثة وإدارة الألم.</td>
                            <td class="service-duration">٤٥-٦٠ دقيقة</td>
                            <td class="service-price">٨٠-١٥٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">تجميل الأسنان</td>
                            <td class="service-description">ابتسامة هوليوود، القشور التجميلية، وتبييض الأسنان للحصول على جمالية مثالية.</td>
                            <td class="service-duration">٩٠-١٢٠ دقيقة</td>
                            <td class="service-price">٢٠٠-٦٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">جراحة الأسنان</td>
                            <td class="service-description">خلع جراحي، إزالة ضرس العقل، والعمليات المتقدمة.</td>
                            <td class="service-duration">٣٠-٤٥ دقيقة</td>
                            <td class="service-price">٥٠-٢٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">التركيبات</td>
                            <td class="service-description">تركيبات ثابتة ومتحركة، تيجان، وجسور لاستعادة الأسنان.</td>
                            <td class="service-duration">٦٠-٧٥ دقيقة</td>
                            <td class="service-price">١٢٠-٤٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">علاج اللثة</td>
                            <td class="service-description">علاج أمراض اللثة والأنسجة والعلاج الوقائي.</td>
                            <td class="service-duration">٤٥-٦٠ دقيقة</td>
                            <td class="service-price">٦٠-١٢٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">الحشوات التجميلية</td>
                            <td class="service-description">حشوات بلون الأسنان الطبيعي بمواد مركبة متطورة.</td>
                            <td class="service-duration">٣٠-٤٥ دقيقة</td>
                            <td class="service-price">٢٥-٨٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">احجز الآن</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="service-name">إعادة التأهيل الكامل</td>
                            <td class="service-description">علاج شامل للفم والأسنان يجمع بين عدة تخصصات للحصول على استعادة كاملة.</td>
                            <td class="service-duration">٢-٣ ساعات</td>
                            <td class="service-price">٨٠٠-٢٠٠٠ د.ك</td>
                            <td class="service-cta">
                                <button class="service-btn" onclick="openBookingModal()">استشارة</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
`;
