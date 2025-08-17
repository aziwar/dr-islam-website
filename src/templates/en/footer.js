// English Footer - Simplified inline implementation

export const getEnglishFooter = () => `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="footer-brand-text">
                                <h3>Dr. Islam Elsagher</h3>
                                <p>Your Trusted Dental Care Partner</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            Providing exceptional dental care with state-of-the-art technology and a compassionate approach to ensure your comfort and satisfaction.
                        </p>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <div class="footer-section-content">
                        <div class="contact-items">
                            <div class="contact-item">
                                <span>📞 +965 9856 3711</span>
                            </div>
                            <div class="contact-item">
                                <span>📞 +965 6600 6699</span>
                            </div>
                            <div class="contact-item">
                                <span>📍 Hawally, Kuwait</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Working Hours</h4>
                    <div class="footer-section-content">
                        <div class="hours-schedule">
                            <div class="schedule-item">
                                <div class="schedule-text">
                                    <span>Saturday - Thursday</span>
                                    <strong>9:00 AM - 9:00 PM</strong>
                                </div>
                            </div>
                            <div class="schedule-item">
                                <div class="schedule-text">
                                    <span>Friday</span>
                                    <strong>2:00 PM - 9:00 PM</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <div class="footer-section-content">
                        <nav class="footer-nav">
                            <a href="#services">Services</a>
                            <a href="#testimonials">Testimonials</a>
                            <a href="#contact">Contact</a>
                            <a href="#about">About</a>
                        </nav>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p class="copyright">© ${new Date().getFullYear()} Dr. Islam Elsagher. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
`;