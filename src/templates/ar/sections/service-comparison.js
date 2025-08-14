export const getArabicServiceComparisonSection = () => `
    <section id="comparison" class="service-comparison">
        <div class="container">
            <h2>قارن بين خدماتنا</h2>
            <p class="comparison-subtitle">اختر الحل المناسب لحالتك من خلال مقارنة شاملة لعلاجات الأسنان</p>

            <!-- Desktop Comparison Table -->
            <div class="comparison-table-container desktop-only">
                <table class="comparison-table" dir="rtl">
                    <thead>
                        <tr>
                            <th class="criteria-column">المعايير</th>
                            <th class="service-column recommended">
                                <div class="service-header">
                                    <span class="service-icon">🦷</span>
                                    <h3>زراعة الأسنان</h3>
                                    <span class="recommended-badge">الأكثر شيوعاً</span>
                                </div>
                            </th>
                            <th class="service-column">
                                <div class="service-header">
                                    <span class="service-icon">🌉</span>
                                    <h3>جسر الأسنان</h3>
                                </div>
                            </th>
                            <th class="service-column">
                                <div class="service-header">
                                    <span class="service-icon">🦷</span>
                                    <h3>طقم الأسنان الجزئي</h3>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="criteria">⏱️ مدة العلاج</td>
                            <td class="excellent">3-6 أشهر</td>
                            <td class="good">2-4 أسابيع</td>
                            <td class="good">2-6 أسابيع</td>
                        </tr>
                        <tr>
                            <td class="criteria">💰 التكلفة</td>
                            <td class="high">عالية (استثمار طويل المدى)</td>
                            <td class="medium">متوسطة</td>
                            <td class="low">منخفضة</td>
                        </tr>
                        <tr>
                            <td class="criteria">⏳ مدة البقاء</td>
                            <td class="excellent">مدى الحياة (مع العناية الجيدة)</td>
                            <td class="good">10-15 سنة</td>
                            <td class="medium">5-10 سنوات</td>
                        </tr>
                        <tr>
                            <td class="criteria">📊 معدل النجاح</td>
                            <td class="excellent">95-98%</td>
                            <td class="good">85-90%</td>
                            <td class="medium">75-85%</td>
                        </tr>
                        <tr>
                            <td class="criteria">🦴 الحفاظ على العظام</td>
                            <td class="excellent">يحفز نمو العظام</td>
                            <td class="poor">قد يؤدي لفقدان العظام</td>
                            <td class="poor">لا يمنع فقدان العظام</td>
                        </tr>
                        <tr>
                            <td class="criteria">🪥 سهولة التنظيف</td>
                            <td class="excellent">مثل الأسنان الطبيعية</td>
                            <td class="medium">يتطلب عناية خاصة</td>
                            <td class="good">قابل للإزالة والتنظيف</td>
                        </tr>
                        <tr>
                            <td class="criteria">🍎 كفاءة المضغ</td>
                            <td class="excellent">100% (مثل الطبيعية)</td>
                            <td class="good">85-90%</td>
                            <td class="medium">60-70%</td>
                        </tr>
                        <tr>
                            <td class="criteria">😊 الناحية الجمالية</td>
                            <td class="excellent">طبيعية تماماً</td>
                            <td class="good">جيدة جداً</td>
                            <td class="medium">مقبولة</td>
                        </tr>
                        <tr>
                            <td class="criteria">⚡ الراحة</td>
                            <td class="excellent">راحة كاملة</td>
                            <td class="good">راحة جيدة</td>
                            <td class="medium">قد تحتاج تعديل</td>
                        </tr>
                        <tr>
                            <td class="criteria">🦷 تأثير على الأسنان المجاورة</td>
                            <td class="excellent">لا تأثير</td>
                            <td class="poor">يتطلب برد الأسنان</td>
                            <td class="good">تأثير طفيف</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Comparison Cards -->
            <div class="comparison-mobile mobile-only">
                <div class="comparison-tabs">
                    <button class="tab-btn active" onclick="showComparisonTab(0, this)">زراعة الأسنان</button>
                    <button class="tab-btn" onclick="showComparisonTab(1, this)">جسر الأسنان</button>
                    <button class="tab-btn" onclick="showComparisonTab(2, this)">طقم جزئي</button>
                </div>

                <div class="tab-content active" data-tab="0">
                    <div class="service-card-mobile recommended">
                        <div class="service-header-mobile">
                            <span class="service-icon">🦷</span>
                            <h3>زراعة الأسنان</h3>
                            <span class="recommended-badge">الأكثر شيوعاً</span>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item excellent">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">3-6 أشهر</span>
                            </div>
                            <div class="criteria-item high">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">عالية (استثمار طويل المدى)</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">مدى الحياة (مع العناية الجيدة)</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">95-98%</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">يحفز نمو العظام</span>
                            </div>
                            <div class="criteria-item excellent">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">مثل الأسنان الطبيعية</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة زراعة الأسنان</button>
                    </div>
                </div>

                <div class="tab-content" data-tab="1">
                    <div class="service-card-mobile">
                        <div class="service-header-mobile">
                            <span class="service-icon">🌉</span>
                            <h3>جسر الأسنان</h3>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item good">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">2-4 أسابيع</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">متوسطة</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">10-15 سنة</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">85-90%</span>
                            </div>
                            <div class="criteria-item poor">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">قد يؤدي لفقدان العظام</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">يتطلب عناية خاصة</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة جسر الأسنان</button>
                    </div>
                </div>

                <div class="tab-content" data-tab="2">
                    <div class="service-card-mobile">
                        <div class="service-header-mobile">
                            <span class="service-icon">🦷</span>
                            <h3>طقم الأسنان الجزئي</h3>
                        </div>
                        <div class="criteria-list">
                            <div class="criteria-item good">
                                <span class="criteria-label">⏱️ مدة العلاج:</span>
                                <span class="criteria-value">2-6 أسابيع</span>
                            </div>
                            <div class="criteria-item low">
                                <span class="criteria-label">💰 التكلفة:</span>
                                <span class="criteria-value">منخفضة</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">⏳ مدة البقاء:</span>
                                <span class="criteria-value">5-10 سنوات</span>
                            </div>
                            <div class="criteria-item medium">
                                <span class="criteria-label">📊 معدل النجاح:</span>
                                <span class="criteria-value">75-85%</span>
                            </div>
                            <div class="criteria-item poor">
                                <span class="criteria-label">🦴 الحفاظ على العظام:</span>
                                <span class="criteria-value">لا يمنع فقدان العظام</span>
                            </div>
                            <div class="criteria-item good">
                                <span class="criteria-label">🪥 سهولة التنظيف:</span>
                                <span class="criteria-value">قابل للإزالة والتنظيف</span>
                            </div>
                        </div>
                        <button class="comparison-cta" onclick="openBookingModal()">احجز استشارة طقم الأسنان</button>
                    </div>
                </div>
            </div>

            <div class="comparison-footer">
                <p class="comparison-note">💡 <strong>نصيحة الطبيب:</strong> زراعة الأسنان هي الخيار الأمثل لمعظم الحالات لأنها تحافظ على صحة العظام وتوفر حلاً دائماً. احجز استشارة مجانية لتحديد العلاج المناسب لحالتك.</p>
                <button class="consultation-btn" onclick="openBookingModal()">
                    📞 احجز استشارة مجانية - تقييم حالتك
                </button>
            </div>
        </div>
    </section>
`;
