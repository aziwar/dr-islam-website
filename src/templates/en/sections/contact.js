export const getEnglishContactSection = () => `
    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-info">
                <div class="contact-card">
                    <h3>Phone</h3>
                    <p><a href="tel:+96598563711">+965 98563711</a></p>
                </div>
                <div class="contact-card">
                    <h3>Email</h3>
                    <p><a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
                </div>
                <div class="contact-card">
                    <h3>Instagram</h3>
                    <p><a href="https://www.instagram.com/dr.islamelsagher/" target="_blank">@dr.islamelsagher</a></p>
                </div>
                <div class="contact-card">
                    <h3>WhatsApp</h3>
                    <p><a href="https://wa.me/96598563711">+965 98563711</a></p>
                </div>
            </div>
            <div class="working-hours">
                <h3>Working Hours</h3>
                <div class="hours-grid">
                    <div class="day-hours">
                        <span class="day">Saturday - Thursday:</span>
                        <span class="hours">9:00 AM - 9:00 PM</span>
                    </div>
                    <div class="day-hours">
                        <span class="day">Friday:</span>
                        <span class="hours">Closed</span>
                    </div>
                </div>
            </div>

            <div class="contact-form-section">
                <h3>Send us a Message</h3>
                <form id="contactForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="name" name="name" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" required>
                            <label for="phone">Phone Number</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-group">
                        <select id="service" name="service" required>
                            <option value="">Select Service</option>
                            <option value="dental-implants">Dental Implants</option>
                            <option value="cosmetic-dentistry">Cosmetic Dentistry</option>
                            <option value="general-dentistry">General Dentistry</option>
                            <option value="emergency">Emergency Treatment</option>
                            <option value="consultation">Consultation</option>
                            <option value="other">Other</option>
                        </select>
                        <label for="service">Service Needed</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="4" required></textarea>
                        <label for="message">Message</label>
                    </div>
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">Sending...</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
`;
