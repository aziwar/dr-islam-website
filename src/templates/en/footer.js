import { Icon } from '../../components/atoms/Icon.js';

export const getEnglishFooter = () => `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-main">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            ${Icon.dentalLogo({ size: 'xl', className: 'footer-logo-icon' })}
                            <div class="footer-brand-text">
                                <h3>Dr. Islam Elsagher</h3>
                                <p>Excellence in Dental Care</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            Over 15 years of experience providing comprehensive dental care in Kuwait.
                            Specializing in dental implants, cosmetic dentistry, and oral surgery.
                        </p>
                    </div>

                    <div class="footer-contact">
                        <h4>Contact Information</h4>
                        <div class="contact-items">
                            <div class="contact-item">
                                ${Icon.create({ name: 'phone', size: 'sm', color: 'primary' })}
                                <span>+965 9856 3711</span>
                            </div>
                            <div class="contact-item">
                                ${Icon.create({ name: 'phone', size: 'sm', color: 'primary' })}
                                <span>+965 6600 6699</span>
                            </div>
                            <div class="contact-item">
                                ${Icon.create({ name: 'location', size: 'sm', color: 'primary' })}
                                <span>Hawally, Kuwait</span>
                            </div>
                        </div>
                    </div>

                    <div class="footer-hours">
                        <h4>Working Hours</h4>
                        <div class="hours-schedule">
                            <div class="schedule-item">
                                ${Icon.create({ name: 'clock', size: 'sm', color: 'primary' })}
                                <div class="schedule-text">
                                    <span>Saturday - Thursday</span>
                                    <span>9:00 AM - 9:00 PM</span>
                                </div>
                            </div>
                            <div class="schedule-item">
                                <div class="availability-badge">
                                    <span class="status-indicator"></span>
                                    <span>Available Today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-links">
                        <a href="#services">Services</a>
                        <a href="#gallery">Gallery</a>
                        <a href="#faq">FAQ</a>
                        <a href="?lang=ar">العربية</a>
                    </div>
                    <div class="footer-copyright">
                        <p>&copy; 2025 Dr. Islam Elsagher - All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
`;
