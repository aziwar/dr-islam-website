export const getEnglishGallerySection = () => `
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>Real Results</h2>
            <p class="gallery-subtitle">See the amazing transformation of our patients' smiles</p>

            <!-- Gallery Tabs -->
            <div class="gallery-tabs">
                <button class="gallery-tab active" data-category="all" onclick="switchGalleryCategory('all')">All Cases</button>
                <button class="gallery-tab" data-category="implants" onclick="switchGalleryCategory('implants')">Dental Implants</button>
                <button class="gallery-tab" data-category="cosmetic" onclick="switchGalleryCategory('cosmetic')">Cosmetic Dentistry</button>
                <button class="gallery-tab" data-category="restoration" onclick="switchGalleryCategory('restoration')">Restoration</button>
            </div>

            <!-- Dynamic Gallery Container -->
            <!-- Gallery Filter Tabs -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">All Cases</button>
                <button class="filter-btn" data-filter="implants">Dental Implants</button>
                <button class="filter-btn" data-filter="cosmetic">Cosmetic Dentistry</button>
                <button class="filter-btn" data-filter="orthodontic">Orthodontics</button>
                <button class="filter-btn" data-filter="reconstruction">Full Mouth Rehabilitation</button>
            </div>

            <div class="gallery-grid enhanced">
                <!-- Dental Implants Cases -->
                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case1.webp" alt="Before front tooth implant" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After front tooth implant" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Immediate Front Tooth Implant</h4>
                        <p class="case-details">Male patient, 35 years - Immediate implant with ceramic crown</p>
                        <p class="treatment-time">Treatment duration: Single session</p>
                        <span class="case-badge implant">Implant</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="implants">
                    <div class="case-images">
                        <img src="/assets/real-case2.webp" alt="Before multiple implants" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="After multiple implants" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Multiple Implants with Fixed Bridge</h4>
                        <p class="case-details">Female patient, 42 years - Replacement of 4 missing teeth</p>
                        <p class="treatment-time">Treatment duration: 4 months</p>
                        <span class="case-badge implant">Implant</span>
                    </div>
                </div>

                <!-- Cosmetic Cases -->
                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/real-case3.webp" alt="Before Hollywood smile" loading="lazy">
                        <img src="/assets/case3-after.webp" alt="After Hollywood smile" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Complete Hollywood Smile</h4>
                        <p class="case-details">Female patient, 28 years - 16 ceramic veneers</p>
                        <p class="treatment-time">Treatment duration: 2 weeks</p>
                        <span class="case-badge cosmetic">Cosmetic</span>
                    </div>
                </div>

                <div class="gallery-item" data-category="cosmetic">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="Before teeth whitening" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After teeth whitening" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Laser Whitening + Restoration</h4>
                        <p class="case-details">Male patient, 31 years - Whitening with cosmetic fillings</p>
                        <p class="treatment-time">Treatment duration: 2 sessions</p>
                        <span class="case-badge cosmetic">Cosmetic</span>
                    </div>
                </div>

                <!-- Orthodontic Cases -->
                <div class="gallery-item" data-category="orthodontic">
                    <div class="case-images">
                        <img src="/assets/case2-before.webp" alt="Before clear aligners" loading="lazy">
                        <img src="/assets/case2-after.webp" alt="After clear aligners" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Clear Aligners (Invisalign)</h4>
                        <p class="case-details">Female patient, 24 years - Crowding correction</p>
                        <p class="treatment-time">Treatment duration: 8 months</p>
                        <span class="case-badge orthodontic">Orthodontic</span>
                    </div>
                </div>

                <!-- Full Mouth Reconstruction -->
                <div class="gallery-item" data-category="reconstruction">
                    <div class="case-images">
                        <img src="/assets/case1-before.webp" alt="Before full mouth rehabilitation" loading="lazy">
                        <img src="/assets/case1-after.webp" alt="After full mouth rehabilitation" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h4>Complete Mouth Rehabilitation</h4>
                        <p class="case-details">Male patient, 55 years - Multiple implants with crowns</p>
                        <p class="treatment-time">Treatment duration: 6 months</p>
                        <span class="case-badge reconstruction">Rehabilitation</span>
                    </div>
                </div>
            </div>

            <!-- View More Button -->
            <div class="gallery-actions">
                <button class="view-more-btn">View More Cases <span class="arrow">→</span></button>
                <p class="gallery-stats">+1200 Successful Cases | 98% Success Rate</p>
            </div>

            <!-- Gallery Lightbox -->
            <div id="gallery-lightbox" class="gallery-lightbox">
                <div class="lightbox-content">
                    <img id="lightbox-image" class="lightbox-image" src="" alt="Enlarged gallery image" role="img" aria-describedby="lightbox-title lightbox-category">
                    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
                    <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">&#8249;</button>
                    <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">&#8250;</button>
                    <div class="lightbox-info">
                        <div id="lightbox-title" class="lightbox-title"></div>
                        <div id="lightbox-category" class="lightbox-category"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
