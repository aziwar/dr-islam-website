export const getEnglishFaqSection = () => `
    <section id="faq" class="faq">
        <div class="container">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-search-container">
                <div class="faq-search-box">
                    <input type="text"
                           id="faqSearch"
                           placeholder="🔍 Search for answers..."
                           class="faq-search-input"
                           onkeyup="searchFAQs(this.value)">
                    <div class="search-suggestions" id="searchSuggestions"></div>
                </div>
                <div class="faq-categories">
                    <button class="category-btn active" onclick="filterFAQs('all')">All Questions</button>
                    <button class="category-btn" onclick="filterFAQs('cost')">💰 Cost & Insurance</button>
                    <button class="category-btn" onclick="filterFAQs('treatment')">🦷 Treatment Process</button>
                    <button class="category-btn" onclick="filterFAQs('pain')">😌 Pain & Comfort</button>
                    <button class="category-btn" onclick="filterFAQs('aftercare')">🔄 Aftercare</button>
                </div>
            </div>

            <div class="faq-list" id="faqList">
                <div class="faq-item" data-category="cost" data-keywords="cost price money insurance payment dental implant expensive">
                    <h3>How much does dental implant cost? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>The cost varies depending on the case and type of implant used. We offer free consultation to evaluate your case and provide a detailed treatment plan with costs. Prices typically range from 150-300 KD depending on complexity.</p>
                        <div class="faq-tags">
                            <span class="tag">💰 Cost</span>
                            <span class="tag">🦷 Implants</span>
                            <span class="tag">📋 Consultation</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="pain" data-keywords="pain painful hurt anesthesia comfort sedation">
                    <h3>Is the implant procedure painful? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We use the latest local anesthesia techniques to ensure your complete comfort. Most patients describe the procedure as less painful than a regular tooth extraction. We also offer sedation options for anxious patients.</p>
                        <div class="faq-tags">
                            <span class="tag">😌 Comfort</span>
                            <span class="tag">💉 Anesthesia</span>
                            <span class="tag">🏥 Procedure</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="time duration how long healing recovery process">
                    <h3>How long does the treatment take? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Treatment duration depends on the case. Immediate implants can be completed in one session, while traditional implants need 3-6 months for complete integration. We provide detailed timelines during consultation.</p>
                        <div class="faq-tags">
                            <span class="tag">⏰ Timeline</span>
                            <span class="tag">🔄 Process</span>
                            <span class="tag">🦷 Integration</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="cost" data-keywords="insurance health coverage medical claim reimbursement">
                    <h3>Do you accept health insurance? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>We work with most health insurance companies in Kuwait including Watania, Al-Ahlia, and Gulf Insurance. Please contact us to confirm if your health insurance is accepted and what percentage is covered.</p>
                        <div class="faq-tags">
                            <span class="tag">🏥 Insurance</span>
                            <span class="tag">💳 Coverage</span>
                            <span class="tag">🇰🇼 Kuwait</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="aftercare" data-keywords="after care maintenance cleaning brush hygiene follow up">
                    <h3>How do I care for my implants after treatment? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Implant care is similar to natural teeth - regular brushing, flossing, and dental checkups. We provide detailed aftercare instructions and schedule follow-up appointments to ensure optimal healing and long-term success.</p>
                        <div class="faq-tags">
                            <span class="tag">🔄 Aftercare</span>
                            <span class="tag">🪥 Hygiene</span>
                            <span class="tag">✅ Maintenance</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="success rate failure guarantee warranty quality">
                    <h3>What is the success rate of dental implants? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Dental implants have a 95-98% success rate when performed by experienced professionals. Our clinic uses premium implant brands with proven track records and provides warranty coverage for your peace of mind.</p>
                        <div class="faq-tags">
                            <span class="tag">📊 Success Rate</span>
                            <span class="tag">🛡️ Warranty</span>
                            <span class="tag">⭐ Quality</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="treatment" data-keywords="age old young suitable candidate requirements">
                    <h3>Am I a good candidate for dental implants? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Most healthy adults are good candidates for implants. We evaluate bone density, gum health, and overall medical condition. Age is not a limiting factor - we've successfully treated patients from 18 to 80+ years old.</p>
                        <div class="faq-tags">
                            <span class="tag">👤 Candidacy</span>
                            <span class="tag">🔍 Evaluation</span>
                            <span class="tag">🎯 Suitability</span>
                        </div>
                    </div>
                </div>

                <div class="faq-item" data-category="cost" data-keywords="payment plan installment financing options methods">
                    <h3>Do you offer payment plans or financing? <span class="faq-icon">+</span></h3>
                    <div class="faq-content">
                        <p>Yes, we offer flexible payment plans and work with financing companies to make treatment affordable. We accept cash, credit cards, and can arrange installment plans based on your budget and treatment needs.</p>
                        <div class="faq-tags">
                            <span class="tag">💳 Payment Plans</span>
                            <span class="tag">🏦 Financing</span>
                            <span class="tag">💰 Flexible</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="faq-no-results" id="faqNoResults" style="display: none;">
                <div class="no-results-content">
                    <h3>🔍 No matching questions found</h3>
                    <p>Can't find what you're looking for? Contact us directly for personalized answers.</p>
                    <button class="cta-button" onclick="openBookingModal()">Ask Our Expert</button>
                </div>
            </div>
        </div>
    </section>
`;
