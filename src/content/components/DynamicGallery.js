// Dynamic Gallery Component - Displays approved cases from admin uploads
export const DynamicGallery = {
  
  // Generate gallery HTML for a specific category
  generateGalleryHTML(category = 'all', containerId = 'dynamic-gallery') {
    return `
      <div id="${containerId}" class="dynamic-gallery">
        <div class="gallery-loading">
          <div class="loading-spinner"></div>
          <p>Loading recent cases...</p>
        </div>
      </div>
      
      <!-- Gallery Lightbox -->
      <div id="gallery-lightbox" class="gallery-lightbox">
        <div class="lightbox-content">
          <img id="lightbox-image" class="lightbox-image" src="" alt="">
          <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
          <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">&#8249;</button>
          <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">&#8250;</button>
          <div class="lightbox-info">
            <div id="lightbox-title" class="lightbox-title"></div>
            <div id="lightbox-category" class="lightbox-category"></div>
          </div>
        </div>
      </div>
      
      <style>
        .dynamic-gallery {
          display: grid;
          /* Mobile-first: single column */
          grid-template-columns: 1fr;
          gap: 15px;
          margin: 15px 0;
        }
        
        .gallery-loading {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #BEB093;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .gallery-case {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .gallery-case:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .case-images {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .before-after-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .before-image, .after-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }
        
        .after-image {
          opacity: 0;
        }
        
        .gallery-case:hover .after-image {
          opacity: 1;
        }
        
        .before-after-labels {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        
        .label {
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .case-info {
          padding: 15px;
        }
        
        .case-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }
        
        .case-category {
          display: inline-block;
          background: #BEB093;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        
        .case-description {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }
        
        .gallery-error {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: #d32f2f;
          background: #ffebee;
          border-radius: 8px;
        }
        
        .gallery-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }
        
        @media (min-width: 48rem) {
          .dynamic-gallery {
            /* Tablet and desktop: responsive columns */
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
          }
        }
        
        /* Previous mobile-only section converted to tablet+ */
        @media (max-width: 47.99rem) {
          .case-images {
            height: 200px;
          }
        }

        /* Gallery Lightbox Styles */
        .gallery-lightbox {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .gallery-lightbox.active {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .lightbox-close {
          position: absolute;
          /* Mobile-first: smaller close button, easier positioning */
          top: -40px;
          right: -10px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .lightbox-prev {
          left: -70px;
        }

        .lightbox-next {
          right: -70px;
        }

        .lightbox-info {
          position: absolute;
          bottom: -60px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
        }

        .lightbox-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .lightbox-category {
          font-size: 14px;
          opacity: 0.8;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Desktop lightbox enhancements */
        @media (min-width: 48rem) {
          .lightbox-content {
            /* Desktop: smaller content area for better positioning */
            max-width: 90%;
            max-height: 90%;
          }

          .lightbox-close {
            /* Desktop: larger close button, further positioning */
            top: -50px;
            right: 0;
            width: 40px;
            height: 40px;
          }

          .lightbox-nav {
            /* Desktop: larger navigation buttons */
            width: 50px;
            height: 50px;
            font-size: 18px;
          }

          .lightbox-prev {
            /* Desktop: further positioning */
            left: -70px;
          }
        }

          .lightbox-next {
            right: -50px;
          }

          .lightbox-info {
            bottom: -40px;
          }

          .lightbox-title {
            font-size: 16px;
          }

          .lightbox-category {
            font-size: 12px;
          }
        }
      </style>
      
      <script>
        (function() {
          async function loadDynamicGallery(containerId, category) {
            try {
              const response = await fetch('/api/gallery/public?category=' + category + '&limit=12');
              const data = await response.json();
              
              const container = document.getElementById(containerId);
              
              if (!data.success || !data.cases || data.cases.length === 0) {
                container.innerHTML = '<div class="gallery-empty"><p>No cases available at the moment.</p></div>';
                return;
              }
              
              const casesHTML = data.cases.map((case_, index) => {
                return \`
                  <div class="gallery-case" data-case-index="\${index}">
                    <div class="case-images" onclick="openLightbox(\${index})" style="cursor: pointer;">
                      <div class="before-after-container">
                        <picture class="before-image">
                          <source srcset="/\${case_.beforeImageResponsive['320w']} 320w,
                                         /\${case_.beforeImageResponsive['768w']} 768w,
                                         /\${case_.beforeImage} 1200w"
                                  sizes="(max-width: 320px) 320px, (max-width: 768px) 768px, 1200px">
                          <img src="/\${case_.beforeImage}" 
                               alt="\${case_.title} - Before" 
                               loading="lazy"
                               data-before="/\${case_.beforeImage}"
                               data-after="/\${case_.afterImage}">
                        </picture>
                        
                        <picture class="after-image">
                          <source srcset="/\${case_.afterImageResponsive['320w']} 320w,
                                         /\${case_.afterImageResponsive['768w']} 768w,
                                         /\${case_.afterImage} 1200w"
                                  sizes="(max-width: 320px) 320px, (max-width: 768px) 768px, 1200px">
                          <img src="/\${case_.afterImage}" 
                               alt="\${case_.title} - After" 
                               loading="lazy">
                        </picture>
                        
                        <div class="before-after-labels">
                          <span class="label">Before</span>
                          <span class="label">After</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="case-info">
                      <h3 class="case-title">\${case_.title}</h3>
                      <span class="case-category">\${case_.category}</span>
                      \${case_.description ? \`<p class="case-description">\${case_.description}</p>\` : ''}
                    </div>
                  </div>
                \`;
              }).join('');
              
              container.innerHTML = casesHTML;
              
              // Store gallery data for lightbox navigation
              window.galleryData = data.cases;
              
            } catch (error) {
              // Failed to load gallery - error displayed to user
              const container = document.getElementById(containerId);
              container.innerHTML = '<div class="gallery-error"><p>Failed to load gallery. Please try again later.</p></div>';
            }
          }
          
          // Gallery Lightbox Functions
          let currentLightboxIndex = 0;
          let touchStartX = 0;
          let touchEndX = 0;
          
          window.openLightbox = function(index) {
            if (!window.galleryData || !window.galleryData[index]) return;
            
            currentLightboxIndex = index;
            const case_ = window.galleryData[index];
            const lightbox = document.getElementById('gallery-lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxTitle = document.getElementById('lightbox-title');
            const lightboxCategory = document.getElementById('lightbox-category');
            
            // Set image and info
            lightboxImage.src = '/' + case_.afterImage; // Show 'after' image by default
            lightboxImage.alt = case_.title + ' - After';
            lightboxTitle.textContent = case_.title;
            lightboxCategory.textContent = case_.category;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Focus for keyboard navigation
            lightbox.focus();
          };
          
          window.closeLightbox = function() {
            const lightbox = document.getElementById('gallery-lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
          };
          
          window.navigateLightbox = function(direction) {
            if (!window.galleryData) return;
            
            currentLightboxIndex += direction;
            
            // Loop around
            if (currentLightboxIndex < 0) {
              currentLightboxIndex = window.galleryData.length - 1;
            } else if (currentLightboxIndex >= window.galleryData.length) {
              currentLightboxIndex = 0;
            }
            
            // Update lightbox content
            const case_ = window.galleryData[currentLightboxIndex];
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxTitle = document.getElementById('lightbox-title');
            const lightboxCategory = document.getElementById('lightbox-category');
            
            lightboxImage.src = '/' + case_.afterImage;
            lightboxImage.alt = case_.title + ' - After';
            lightboxTitle.textContent = case_.title;
            lightboxCategory.textContent = case_.category;
          };
          
          // Keyboard navigation
          document.addEventListener('keydown', function(e) {
            const lightbox = document.getElementById('gallery-lightbox');
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
              case 'Escape':
                closeLightbox();
                break;
              case 'ArrowLeft':
                navigateLightbox(-1);
                break;
              case 'ArrowRight':
                navigateLightbox(1);
                break;
            }
          });
          
          // Touch/swipe support for mobile
          document.addEventListener('DOMContentLoaded', function() {
            const lightbox = document.getElementById('gallery-lightbox');
            if (!lightbox) return;
            
            // Click outside to close
            lightbox.addEventListener('click', function(e) {
              if (e.target === lightbox) {
                closeLightbox();
              }
            });
            
            // Touch events for swipe
            lightbox.addEventListener('touchstart', function(e) {
              touchStartX = e.changedTouches[0].screenX;
            });
            
            lightbox.addEventListener('touchend', function(e) {
              touchEndX = e.changedTouches[0].screenX;
              handleSwipe();
            });
            
            function handleSwipe() {
              const swipeDistance = touchStartX - touchEndX;
              const minSwipeDistance = 50;
              
              if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                  // Swipe left - next image
                  navigateLightbox(1);
                } else {
                  // Swipe right - previous image
                  navigateLightbox(-1);
                }
              }
            }
          });
          
          // Auto-load when DOM is ready
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
              loadDynamicGallery('${containerId}', '${category}');
            });
          } else {
            loadDynamicGallery('${containerId}', '${category}');
          }
        })();
      </script>
    `;
  },

  // Generate category filter tabs
  generateCategoryTabs(categories = ['all', 'implants', 'cosmetic', 'orthodontic', 'restoration']) {
    return `
      <div class="gallery-tabs">
        ${categories.map((cat, index) => `
          <button class="gallery-tab ${index === 0 ? 'active' : ''}" 
                  data-category="${cat}"
                  onclick="switchGalleryCategory('${cat}')">
            ${this.getCategoryLabel(cat)}
          </button>
        `).join('')}
      </div>
      
      <style>
        .gallery-tabs {
          display: flex;
          /* Mobile-first: left-aligned, scrollable */
          justify-content: flex-start;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .gallery-tab {
          background: none;
          border: none;
          /* Mobile-first: smaller padding and font */
          padding: 10px 16px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .gallery-tab:hover,
        .gallery-tab.active {
          color: #BEB093;
          border-bottom-color: #BEB093;
        }
        
        /* Desktop gallery tabs enhancements */
        @media (min-width: 48rem) {
          .gallery-tabs {
            /* Desktop: centered, more spacing */
            justify-content: center;
            margin-bottom: 30px;
          }
          
          .gallery-tab {
            /* Desktop: larger padding and font */
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      </style>
      
      <script>
        function switchGalleryCategory(category) {
          // Update tab active state
          document.querySelectorAll('.gallery-tab').forEach(tab => {
            tab.classList.remove('active');
          });
          document.querySelector('[data-category="' + category + '"]').classList.add('active');
          
          // Reload gallery with new category
          const container = document.getElementById('dynamic-gallery');
          container.innerHTML = '<div class="gallery-loading"><div class="loading-spinner"></div><p>Loading ' + 
            (category === 'all' ? 'all cases' : category + ' cases') + '...</p></div>';
          
          // Simulate the gallery loading function
          loadDynamicGallery('dynamic-gallery', category);
        }
      </script>
    `;
  },

  // Get human-readable category labels
  getCategoryLabel(category) {
    const labels = {
      all: 'All Cases',
      implants: 'Dental Implants',
      cosmetic: 'Cosmetic Dentistry',
      orthodontic: 'Orthodontics',
      restoration: 'Restoration',
      surgery: 'Oral Surgery'
    };
    return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }
};