export const getArabicFaqSection = () => `
    <section id="faq" class="faq">
        <div class="container">
            <h2>أسئلة شائعة</h2>
            <div class="faq-search-container">
                <div class="faq-search-box">
                    <input type="text"
                           id="faqSearch"
                           placeholder="🔍 ابحث عن الإجابات..."
                           class="faq-search-input"
                           onkeyup="searchFAQs(this.value)">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
                <div class="faq-categories">
                    <button class="category-btn active" onclick="filterFAQs('all')">جميع الأسئلة</button>
                    <button class="category-btn" onclick="filterFAQs('cost')">💰 التكلفة والتأمين</button>
                    <button class="category-btn" onclick="filterFAQs('treatment')">🦷 العلاج</button>
                    <button class="category-btn" onclick="filterFAQs('pain')">😌 الألم والراحة</button>
                    <button class="category-btn" onclick="filterFAQs('aftercare')">🔄 ما بعد العلاج</button>
                </div>
            </div>

            <div class="faq-list" id="faqList">
                <div class="faq-item" data-category="cost" data-keywords="تكلفة سعر مال تأمين دفع زراعة أسنان غالي">
                    <h3>كم تكلفة زراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تختلف التكلفة حسب الحالة ونوع الزرعة المستخدمة. نقدم استشارة مجانية لتقييم حالتك وتقديم خطة علاج مفصلة مع التكلفة. الأسعار تتراوح عادة من 150-300 دينار كويتي حسب التعقيد.</p>
                        <div class="faq-tags">
                            <span class="tag">💰 التكلفة</span>
                            <span class="tag">🦷 الزراعة</span>
                            <span class="tag">📋 الاستشارة</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="pain" data-keywords="ألم مؤلم وجع تخدير راحة مهدئ">
                    <h3>هل عملية الزراعة مؤلمة؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نستخدم أحدث تقنيات التخدير الموضعي لضمان راحتك التامة. معظم المرضى يصفون العملية بأنها أقل ألماً من خلع الأسنان العادي. كما نوفر خيارات تهدئة للمرضى القلقين.</p>
                        <div class="faq-tags">
                            <span class="tag">😌 الراحة</span>
                            <span class="tag">💉 التخدير</span>
                            <span class="tag">🏥 العملية</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="وقت مدة كم طويل شفاء تعافي عملية">
                    <h3>كم تستغرق مدة العلاج؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>تعتمد مدة العلاج على الحالة. الزراعة الفورية يمكن إتمامها في جلسة واحدة، بينما الزراعة التقليدية تحتاج 3-6 أشهر للاندماج الكامل. نقدم جداول زمنية مفصلة أثناء الاستشارة.</p>
                        <div class="faq-tags">
                            <span class="tag">⏰ الوقت</span>
                            <span class="tag">🔄 العملية</span>
                            <span class="tag">🦷 الاندماج</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="cost" data-keywords="تأمين صحي تغطية طبي مطالبة تعويض">
                    <h3>هل تقبلون التأمين الصحي؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نتعامل مع معظم شركات التأمين الصحي في الكويت بما في ذلك الوطنية والأهلية وشركة الخليج للتأمين. يرجى التواصل معنا للتأكد من قبول تأمينك الصحي ونسبة التغطية.</p>
                        <div class="faq-tags">
                            <span class="tag">🏥 التأمين</span>
                            <span class="tag">💳 التغطية</span>
                            <span class="tag">🇰🇼 الكويت</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="aftercare" data-keywords="بعد العناية صيانة تنظيف فرشاة نظافة متابعة">
                    <h3>كيف أعتني بالزراعة بعد العلاج؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>العناية بالزراعة مشابهة للأسنان الطبيعية - التنظيف المنتظم بالفرشاة والخيط والفحص الدوري عند الطبيب. نقدم تعليمات مفصلة للعناية ونحدد مواعيد متابعة لضمان الشفاء الأمثل والنجاح طويل المدى.</p>
                        <div class="faq-tags">
                            <span class="tag">🔄 العناية</span>
                            <span class="tag">🪥 النظافة</span>
                            <span class="tag">✅ الصيانة</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="نجاح معدل فشل ضمان كفالة جودة">
                    <h3>ما هو معدل نجاح زراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>زراعة الأسنان لها معدل نجاح 95-98% عند تنفيذها من قبل أخصائيين ذوي خبرة. عيادتنا تستخدم ماركات زراعة عالية الجودة ذات سجل حافل ونقدم تغطية ضمان لراحة بالك.</p>
                        <div class="faq-tags">
                            <span class="tag">📊 معدل النجاح</span>
                            <span class="tag">🛡️ الضمان</span>
                            <span class="tag">⭐ الجودة</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="عمر صغير كبير مناسب مرشح متطلبات">
                    <h3>هل أنا مرشح جيد لزراعة الأسنان؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>معظم البالغين الأصحاء مرشحون جيدون للزراعة. نقوم بتقييم كثافة العظام وصحة اللثة والحالة الطبية العامة. العمر ليس عائقاً - لقد عالجنا بنجاح مرضى من سن 18 إلى أكثر من 80 عاماً.</p>
                        <div class="faq-tags">
                            <span class="tag">👤 الترشح</span>
                            <span class="tag">🔍 التقييم</span>
                            <span class="tag">🎯 الملاءمة</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="cost" data-keywords="خطة دفع تقسيط تمويل خيارات طرق">
                    <h3>هل تقدمون خطط دفع أو تمويل؟ <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>نعم، نقدم خطط دفع مرنة ونتعامل مع شركات التمويل لجعل العلاج في متناول الجميع. نقبل النقد والبطاقات الائتمانية ويمكننا ترتيب خطط تقسيط حسب ميزانيتك واحتياجات العلاج.</p>
                        <div class="faq-tags">
                            <span class="tag">💳 خطط الدفع</span>
                            <span class="tag">🏦 التمويل</span>
                            <span class="tag">💰 مرونة</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="faq-no-results" id="faqNoResults" style="display: none;">
                <div class="no-results-content">
                    <h3>🔍 لم يتم العثور على أسئلة مطابقة</h3>
                    <p>لا تجد ما تبحث عنه؟ تواصل معنا مباشرة للحصول على إجابات مفصلة.</p>
                    <button class="cta-button" onclick="openBookingModal()">اسأل خبيرنا</button>
                </div>
            </div>
        </div>
    </section>
`;
