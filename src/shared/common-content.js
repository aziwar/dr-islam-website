// Shared content and functionality between AR and EN versions

// Common functions that work for both languages
export const commonFunctions = `
    // Form validation utilities
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[0-9]{8,}$/.test(phone);
    }

    // Gallery functionality
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = '<img class="modal-image" alt=""><span class="close-modal">&times;</span>';
        document.body.appendChild(modal);

        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                modal.querySelector('.modal-image').src = img.src;
                modal.querySelector('.modal-image').alt = img.alt;
                modal.classList.add('active');
            });
        });

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mobile menu functionality (updated to match actual implementation)
    function toggleMobileMenu() {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (!menu || !toggle || !backdrop) return;
        
        const isOpen = menu.classList.contains('is-open');
        
        menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open');
        backdrop.classList.toggle('is-open');
        
        toggle.setAttribute('aria-expanded', !isOpen);
        
        // Prevent body scroll when menu is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        const menu = document.querySelector('.main-nav');
        const toggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (!menu || !toggle || !backdrop) return;
        
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Before/After slider functionality
    function initializeBeforeAfterSlider() {
        const sliders = document.querySelectorAll('.before-after-container');
        
        sliders.forEach(container => {
            const slider = container.querySelector('.before-after-slider');
            const beforeImg = container.querySelector('.before-img');
            let isDragging = false;

            const moveSlider = (clientX) => {
                const rect = container.getBoundingClientRect();
                const x = clientX - rect.left;
                const percent = (x / rect.width) * 100;
                
                if (percent >= 0 && percent <= 100) {
                    slider.style.left = percent + '%';
                    beforeImg.style.width = percent + '%';
                }
            };

            slider.addEventListener('mousedown', () => isDragging = true);
            slider.addEventListener('touchstart', () => isDragging = true);

            document.addEventListener('mousemove', (e) => {
                if (isDragging) moveSlider(e.clientX);
            });

            document.addEventListener('touchmove', (e) => {
                if (isDragging) moveSlider(e.touches[0].clientX);
            });

            document.addEventListener('mouseup', () => isDragging = false);
            document.addEventListener('touchend', () => isDragging = false);
        });
    }

    // Lazy loading for images
    function initializeLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance monitoring
    function monitorPerformance() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            // In production, send to analytics instead
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                // In production, send to analytics instead
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let cls = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                    // In production, send to analytics instead
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Service Worker registration
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    // Success - no console.log in production
                })
                .catch(err => {
                    // Error - no console.log in production
                });
        }
    }

    // PWA install prompt
    function initializePWAPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install UI after a delay
            setTimeout(() => {
                const installBanner = document.createElement('div');
                installBanner.className = 'install-prompt';
                installBanner.innerHTML = \`
                    <p>\${window.isArabic ? 'أضف التطبيق للشاشة الرئيسية' : 'Add app to home screen'}</p>
                    <button onclick="installPWA()">\${window.isArabic ? 'تثبيت' : 'Install'}</button>
                    <button onclick="dismissInstallPrompt()">\${window.isArabic ? 'لاحقاً' : 'Later'}</button>
                \`;
                document.body.appendChild(installBanner);
            }, 30000); // Show after 30 seconds
        });
        
        window.installPWA = () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    deferredPrompt = null;
                });
            }
        };
        
        window.dismissInstallPrompt = () => {
            const prompt = document.querySelector('.install-prompt');
            if (prompt) prompt.remove();
        };
    }

    // Initialize all features
    document.addEventListener('DOMContentLoaded', () => {
        initializeGallery();
        initializeSmoothScroll();
        initializeBeforeAfterSlider();
        initializeLazyLoading();
        monitorPerformance();
        registerServiceWorker();
        initializePWAPrompt();
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    });
`;