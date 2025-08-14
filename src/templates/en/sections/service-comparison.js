export const getEnglishServiceComparisonSection = () => `
    <section id="service-comparison" class="service-comparison">
        <div class="container">
            <div class="section-header">
                <h2>Compare Treatment Options</h2>
                <p class="section-subtitle">Make an informed decision with our detailed comparison</p>
            </div>

            <div class="comparison-container">
                <div class="comparison-table-wrapper">
                    <table class="comparison-table" role="table" aria-label="Treatment options comparison">
                        <thead>
                            <tr>
                                <th scope="col" class="feature-column">Treatment Features</th>
                                <th scope="col" class="option-column recommended">
                                    <div class="option-header">
                                        <h3>Dental Implants</h3>
                                        <span class="recommended-badge">✨ Recommended</span>
                                    </div>
                                </th>
                                <th scope="col" class="option-column">
                                    <div class="option-header">
                                        <h3>Dental Bridge</h3>
                                        <span class="option-subtitle">Traditional Option</span>
                                    </div>
                                </th>
                                <th scope="col" class="option-column">
                                    <div class="option-header">
                                        <h3>Partial Dentures</h3>
                                        <span class="option-subtitle">Removable Option</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="feature-label">
                                    <strong>Treatment Duration</strong>
                                    <span class="feature-desc">Time to complete treatment</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">3-6 months</span>
                                        <span class="detail">Single visit for immediate implants</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">2-3 weeks</span>
                                        <span class="detail">Multiple appointments required</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">2-4 weeks</span>
                                        <span class="detail">Quick fabrication process</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="feature-label">
                                    <strong>Durability</strong>
                                    <span class="feature-desc">Expected lifespan</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">25+ years</span>
                                        <span class="detail">Lifetime with proper care</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">10-15 years</span>
                                        <span class="detail">May need replacement</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">5-8 years</span>
                                        <span class="detail">Regular adjustments needed</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="feature-label">
                                    <strong>Cost Range</strong>
                                    <span class="feature-desc">Investment in KWD</span>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">200-400 KWD</span>
                                        <span class="detail">Best long-term value</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">150-300 KWD</span>
                                        <span class="detail">Moderate upfront cost</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">100-250 KWD</span>
                                        <span class="detail">Lowest initial investment</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="feature-label">
                                    <strong>Bone Preservation</strong>
                                    <span class="feature-desc">Maintains jaw bone health</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">✓ Excellent</span>
                                        <span class="detail">Stimulates natural bone growth</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">× Limited</span>
                                        <span class="detail">May require adjacent tooth removal</span>
                                    </div>
                                </td>
                                <td class="benefit-low">
                                    <div class="comparison-value">
                                        <span class="value">× Poor</span>
                                        <span class="detail">Bone loss continues over time</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="feature-label">
                                    <strong>Maintenance</strong>
                                    <span class="feature-desc">Daily care requirements</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">Like natural teeth</span>
                                        <span class="detail">Brush and floss normally</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">Standard care</span>
                                        <span class="detail">Regular brushing and flossing</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">Special cleaning</span>
                                        <span class="detail">Remove for cleaning and soaking</span>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="feature-label">
                                    <strong>Success Rate</strong>
                                    <span class="feature-desc">Treatment predictability</span>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">95-98%</span>
                                        <span class="detail">Highly predictable outcome</span>
                                    </div>
                                </td>
                                <td class="benefit-high">
                                    <div class="comparison-value">
                                        <span class="value">90-95%</span>
                                        <span class="detail">Reliable when properly done</span>
                                    </div>
                                </td>
                                <td class="benefit-medium">
                                    <div class="comparison-value">
                                        <span class="value">85-90%</span>
                                        <span class="detail">Fit and comfort may vary</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile-friendly comparison cards (hidden on desktop) -->
                <div class="mobile-comparison">
                    <div class="comparison-tabs">
                        <button class="tab-btn active" onclick="showMobileComparison('implants')">Dental Implants</button>
                        <button class="tab-btn" onclick="showMobileComparison('bridge')">Dental Bridge</button>
                        <button class="tab-btn" onclick="showMobileComparison('dentures')">Dentures</button>
                    </div>

                    <div id="implants-mobile" class="mobile-comparison-card active">
                        <div class="mobile-card-header recommended">
                            <h3>Dental Implants</h3>
                            <span class="recommended-badge">✨ Recommended</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">3-6 months</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">25+ years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">200-400 KWD</span>
                            </div>
                            <div class="mobile-feature highlight">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">95-98%</span>
                            </div>
                        </div>
                    </div>

                    <div id="bridge-mobile" class="mobile-comparison-card">
                        <div class="mobile-card-header">
                            <h3>Dental Bridge</h3>
                            <span class="option-subtitle">Traditional Option</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">2-3 weeks</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">10-15 years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">150-300 KWD</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">90-95%</span>
                            </div>
                        </div>
                    </div>

                    <div id="dentures-mobile" class="mobile-comparison-card">
                        <div class="mobile-card-header">
                            <h3>Partial Dentures</h3>
                            <span class="option-subtitle">Removable Option</span>
                        </div>
                        <div class="mobile-features">
                            <div class="mobile-feature">
                                <span class="feature-name">Duration:</span>
                                <span class="feature-value">2-4 weeks</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Durability:</span>
                                <span class="feature-value">5-8 years</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Cost:</span>
                                <span class="feature-value">100-250 KWD</span>
                            </div>
                            <div class="mobile-feature">
                                <span class="feature-name">Success Rate:</span>
                                <span class="feature-value">85-90%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="comparison-cta">
                    <p class="cta-text">Ready to choose the best option for your needs?</p>
                    <button class="cta-button" onclick="openBookingModal()">Get Free Consultation</button>
                    <p class="cta-note">Dr. Islam will help you choose the perfect treatment plan</p>
                </div>
            </div>
        </div>
    </section>
`;
