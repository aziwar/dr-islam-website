
import './header.js';

// Close menu when clicking outside or on backdrop
document.addEventListener('click', function(e) {
    const menu = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const backdrop = document.querySelector('.nav-backdrop');

    if (backdrop.contains(e.target)) {
        closeMobileMenu();
    } else if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu when clicking navigation links
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Set up navigation toggle event listener
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleMobileMenu);
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {

    const faqItems = document.querySelectorAll('.faq-item');

    // FAQ functionality with touch-outside-to-close
    faqItems.forEach(item => {
        const question = item.querySelector('h3');

        question.addEventListener('click', function() {
            // Close other open FAQ items on mobile
            if (window.innerWidth <= 768) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
            item.classList.toggle('active');
        });
    });

    // Touch-outside-to-close for mobile FAQ
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function(e) {
            const activeFaq = document.querySelector('.faq-item.active');
            if (activeFaq && !activeFaq.contains(e.target)) {
                activeFaq.classList.remove('active');
            }
        });
    }
});

// Fix navigation on window resize and load events

// Enhanced scroll-triggered navigation (inspired by reference projects)
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(function() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;

        // Shadow effect
        if (scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }

        // Enhanced navigation state (from reference project patterns)
        if (scrollY > 150) {
            header.classList.add('nav-scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.classList.remove('nav-scrolled');
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    });
});

// Enhanced Booking Modal Functionality

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// Handle Quick Booking Widget
function handleQuickBooking(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Auto-fill main booking form and open modal
    setTimeout(() => {
        document.getElementById('bookingName').value = name;
        document.getElementById('bookingPhone').value = phone;
        document.getElementById('bookingService').value = service;

        // Reset widget form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Open main booking modal
        openBookingModal();

        // Track quick booking usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quick_booking_used', {
                'event_category': 'engagement',
                'event_label': 'desktop_widget'
            });
        }
    }, 800);
}

// Handle booking form submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission();
        });
    }
});

// Form submission handler with feedback states
function handleBookingSubmission() {
    const form = document.getElementById('bookingForm');
    const submitButton = form.querySelector('.booking-submit-btn');
    const progressBar = form.querySelector('.form-progress-bar');
    const messageContainer = document.getElementById('formMessage');
    const messageIcon = messageContainer.querySelector('.form-message-icon');
    const messageText = messageContainer.querySelector('.form-message-text');

    // Get form data
    const formData = {
        name: form.bookingName.value.trim(),
        phone: form.bookingPhone.value.trim(),
        service: form.bookingService.value,
        time: form.bookingTime.value,
        notes: form.bookingNotes.value.trim()
    };

    // Validate required fields
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
        showFormMessage('error', validation.message);
        highlightInvalidFields(validation.fields);
        return;
    }

    // Start loading state
    showLoadingState();

    // Simulate form processing with progress updates
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 90) progress = 90;
        updateProgressBar(progress);
    }, 200);

    // Process submission (simulate network delay)
    setTimeout(() => {
        clearInterval(progressInterval);
        updateProgressBar(100);

        // Build WhatsApp message
        const whatsappMessage = buildWhatsAppMessage(formData);
        const whatsappURL = `https://wa.me/96566006699?text=${encodeURIComponent(whatsappMessage)}`;

        // Show success state
        setTimeout(() => {
            showFormMessage('success', '✅ Form submitted! Redirecting to WhatsApp...');
            hideLoadingState();

            // Track successful submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'booking_form',
                    'value': 1
                });
            }

            // Redirect to WhatsApp
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                closeBookingModal();
                resetForm();
            }, 1500);

        }, 500);

    }, 2000 + Math.random() * 1000);

    // Functions for form feedback
    function showLoadingState() {
        form.classList.add('form-loading');
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="booking-btn-icon icon--spin">⏳</span>
            Preparing WhatsApp...
        `;
        hideFormMessage();
    }

    function hideLoadingState() {
        form.classList.remove('form-loading');
        submitButton.disabled = false;
        submitButton.innerHTML = `
            <span class="booking-btn-icon">💬</span>
            Continue to WhatsApp
        `;
    }

    function updateProgressBar(percent) {
        progressBar.style.width = percent + '%';
    }

    function showFormMessage(type, message) {
        messageContainer.className = `form-message form-message-${type}`;
        messageIcon.innerHTML = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        messageText.textContent = message;
        messageContainer.style.display = 'flex';
    }

    function hideFormMessage() {
        messageContainer.style.display = 'none';
    }

    function resetForm() {
        form.reset();
        form.classList.remove('form-loading');
        progressBar.style.width = '0%';
        hideFormMessage();
        clearFieldValidation();
    }

    function highlightInvalidFields(fields) {
        // Clear previous validation
        clearFieldValidation();

        // Highlight invalid fields
        fields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.classList.add('form-field-error');
                field.addEventListener('input', clearFieldError, { once: true });
            }
        });
    }

    function clearFieldValidation() {
        form.querySelectorAll('.form-field-error').forEach(field => {
            field.classList.remove('form-field-error');
        });
    }

    function clearFieldError(e) {
        e.target.classList.remove('form-field-error');
    }
}

// Form validation function
function validateBookingForm(data) {
    const invalidFields = [];
    let message = '';

    if (!data.name) {
        invalidFields.push('name');
        message = 'Please enter your name';
    } else if (data.name.length < 2) {
        invalidFields.push('name');
        message = 'Name must be at least 2 characters';
    }

    if (!data.phone) {
        invalidFields.push('phone');
        message = 'Please enter your phone number';
    } else if (!/^[+]?[\d\-\s()]{8,}$/.test(data.phone)) {
        invalidFields.push('phone');
        message = 'Please enter a valid phone number';
    }

    if (!data.service) {
        invalidFields.push('service');
        message = 'Please select a service';
    }

    if (!data.time) {
        invalidFields.push('time');
        message = 'Please select your preferred time';
    }

    return {
        isValid: invalidFields.length === 0,
        fields: invalidFields,
        message: message
    };
}

// Build WhatsApp message from form data
function buildWhatsAppMessage(data) {
    return `🦷 *Booking Request - Dr. Islam Elsagher*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
🩺 *Service:* ${data.service}
⏰ *Preferred Time:* ${data.time}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}

📍 *Clinic Location:* Hawally, Kuwait
🕐 *Working Hours:* 9:00 AM - 9:00 PM

Please confirm my appointment. Thank you! 🙏`;
}


// Analytics tracking for direct WhatsApp links
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact', {
                'event_category': 'engagement',
                'event_label': 'whatsapp_direct_click'
            });
        }
    });
});

// Before/After Gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.gallery-item');
    galleries.forEach(gallery => {
        let isDown = false;
        const container = gallery.querySelector('.before-after-container');
        if (container) {
            const slider = document.createElement('div');
            slider.className = 'before-after-slider';
            container.appendChild(slider);

            const beforeImg = container.querySelector('img:first-child');
            if (beforeImg) {
                beforeImg.style.clipPath = 'inset(0 50% 0 0)';

                slider.addEventListener('mousedown', () => isDown = true);
                document.addEventListener('mouseup', () => isDown = false);
                document.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    slider.style.left = percent + '%';
                    beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                });

                // Touch support
                slider.addEventListener('touchstart', () => isDown = true);
                document.addEventListener('touchend', () => isDown = false);
                document.addEventListener('touchmove', (e) => {
                    if (!isDown) return;
                    const rect = container.getBoundingClientRect();
                    const x = e.touches[0].clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    slider.style.left = percent + '%';
                    beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                });
            }
        }
    });
});

// Emergency banner auto-fade
setTimeout(() => {
    const emergencyBanner = document.querySelector('.emergency-banner');
    if (emergencyBanner) {
        emergencyBanner.style.transition = 'opacity 0.5s';
        emergencyBanner.style.opacity = '0.8';
    }
}, 10000);


// ===== END UI/UX ENHANCEMENTS =====

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch(err => /* ServiceWorker registration failed - logging disabled */);
    });

    // PWA Install prompts are now handled by PWA Manager
    // (Legacy implementation removed to prevent conflicts with modern PWA Manager)
}

// =================================
// MOBILE UX ENHANCEMENTS
// =================================
// MOBILE_UX_JS will be injected by the build process

// =================================
// DESKTOP SIDEBAR FUNCTIONALITY
// =================================

// Enhanced Gallery Lightbox for Desktop
let currentLightboxIndex = 0;
let lightboxImages = [];

function initGalleryLightbox() {
    // Collect all gallery images
    lightboxImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
        src: img.src,
        alt: img.alt,
        caption: img.closest('.gallery-item')?.querySelector('p')?.textContent || img.alt
    }));

    // Add click handlers
    document.querySelectorAll('.gallery-item img').forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            currentLightboxIndex = index;
            showImageLightbox();
        });

        // Add keyboard support
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'View ' + img.alt + ' in full size');

        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentLightboxIndex = index;
                showImageLightbox();
            }
        });
    });
}

function showImageLightbox() {
    const image = lightboxImages[currentLightboxIndex];
    if (!image) return;

    // Create lightbox with enhanced structure
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-labelledby', 'lightbox-title');

    lightbox.innerHTML = `
        <div class="lightbox-backdrop" onclick="closeLightbox()" aria-hidden="true"></div>
        <div class="lightbox-content">
            <div class="lightbox-header">
                <h2 id="lightbox-title" class="sr-only">${image.alt}</h2>
                <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close lightbox" tabindex="0">
                    <span aria-hidden="true">✕</span>
                </button>
            </div>
            <div class="lightbox-body">
                <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)" aria-label="Previous image" ${currentLightboxIndex === 0 ? 'disabled' : ''}>
                    <span aria-hidden="true">‹</span>
                </button>
                <div class="lightbox-image-container">
                    <img src="${image.src}" alt="${image.alt}" class="lightbox-image">
                    <div class="lightbox-loading" aria-hidden="true">Loading...</div>
                </div>
                <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)" aria-label="Next image" ${currentLightboxIndex === lightboxImages.length - 1 ? 'disabled' : ''}>
                    <span aria-hidden="true">›</span>
                </button>
            </div>
            <div class="lightbox-footer">
                <div class="lightbox-caption">${image.caption}</div>
                <div class="lightbox-counter">${currentLightboxIndex + 1} / ${lightboxImages.length}</div>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Focus management
    const closeButton = lightbox.querySelector('.lightbox-close');
    closeButton.focus();

    // Trap focus within lightbox
    trapFocus(lightbox);

    // Preload adjacent images for smooth navigation
    preloadAdjacentImages();

    // Add keyboard listeners
    document.addEventListener('keydown', handleLightboxKeydown);

    // Fade in animation
    requestAnimationFrame(() => {
        lightbox.classList.add('show');
    });
}

function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;

    if (newIndex >= 0 && newIndex < lightboxImages.length) {
        currentLightboxIndex = newIndex;
        updateLightboxContent();
        preloadAdjacentImages();
    }
}

function updateLightboxContent() {
    const lightbox = document.querySelector('.image-lightbox');
    if (!lightbox) return;

    const image = lightboxImages[currentLightboxIndex];
    const img = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const counter = lightbox.querySelector('.lightbox-counter');
    const title = lightbox.querySelector('#lightbox-title');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Show loading state
    const loading = lightbox.querySelector('.lightbox-loading');
    loading.style.display = 'block';
    img.style.opacity = '0';

    // Update image
    img.onload = () => {
        loading.style.display = 'none';
        img.style.opacity = '1';
    };

    img.src = image.src;
    img.alt = image.alt;
    caption.textContent = image.caption;
    counter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
    title.textContent = image.alt;

    // Update navigation buttons
    prevBtn.disabled = currentLightboxIndex === 0;
    nextBtn.disabled = currentLightboxIndex === lightboxImages.length - 1;
}

function preloadAdjacentImages() {
    // Preload previous and next images for smooth navigation
    [-1, 1].forEach(offset => {
        const index = currentLightboxIndex + offset;
        if (index >= 0 && index < lightboxImages.length) {
            const img = new Image();
            img.src = lightboxImages[index].src;
        }
    });
}

function handleLightboxKeydown(e) {
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateLightbox(1);
            break;
    }
}

function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.image-lightbox');
    if (lightbox) {
        // Fade out animation
        lightbox.classList.add('hide');

        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';

            // Return focus to original trigger
            const originalImage = document.querySelectorAll('.gallery-item img')[currentLightboxIndex];
            if (originalImage) {
                originalImage.focus();
            }

            // Remove keyboard listener
            document.removeEventListener('keydown', handleLightboxKeydown);
        }, 200);
    }
}

// =================================
// TESTIMONIAL CAROUSEL FUNCTIONALITY
// =================================

let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.carousel-dots .dot');
let testimonialAutoSlide = null;

function showTestimonialSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (testimonialDots[i]) {
            testimonialDots[i].classList.remove('active');
        }
    });

    // Show current slide
    if (testimonialSlides[index]) {
        testimonialSlides[index].classList.add('active');
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
    }
}

function moveTestimonialCarousel(direction) {
    currentTestimonialIndex += direction;

    if (currentTestimonialIndex >= testimonialSlides.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonialSlides.length - 1;
    }

    showTestimonialSlide(currentTestimonialIndex);
    resetTestimonialAutoSlide();
}

function currentTestimonialSlide(index) {
    currentTestimonialIndex = index - 1;
    showTestimonialSlide(currentTestimonialIndex);
    resetTestimonialAutoSlide();
}

function startTestimonialAutoSlide() {
    testimonialAutoSlide = setInterval(() => {
        moveTestimonialCarousel(1);
    }, 6000);
}

function resetTestimonialAutoSlide() {
    if (testimonialAutoSlide) {
        clearInterval(testimonialAutoSlide);
    }
    startTestimonialAutoSlide();
}

// Initialize testimonial carousel
function initTestimonialCarousel() {
    if (testimonialSlides.length > 0) {
        showTestimonialSlide(0);
        startTestimonialAutoSlide();

        // Pause auto-slide on hover
        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                if (testimonialAutoSlide) {
                    clearInterval(testimonialAutoSlide);
                }
            });

            carousel.addEventListener('mouseleave', () => {
                startTestimonialAutoSlide();
            });
        }
    }
}

// =================================
// FAQ SEARCH & FILTER FUNCTIONALITY
// =================================

let allFAQs = [];
let filteredFAQs = [];

function initFAQSearch() {
    const faqItems = document.querySelectorAll('.faq-item');
    allFAQs = Array.from(faqItems).map(item => ({
        element: item,
        question: item.querySelector('h3').textContent.toLowerCase(),
        answer: item.querySelector('.faq-content p').textContent.toLowerCase(),
        keywords: item.dataset.keywords || '',
        category: item.dataset.category || 'all'
    }));
    filteredFAQs = [...allFAQs];
}

function searchFAQs(query) {
    const searchTerm = query.toLowerCase().trim();
    const faqList = document.getElementById('faqList');
    const noResults = document.getElementById('faqNoResults');

    if (searchTerm === '') {
        // Show all FAQs in current category filter
        filteredFAQs.forEach(faq => {
            faq.element.style.display = 'block';
        });
        noResults.style.display = 'none';
        return;
    }

    let visibleCount = 0;

    filteredFAQs.forEach(faq => {
        const isMatch = faq.question.includes(searchTerm) ||
                      faq.answer.includes(searchTerm) ||
                      faq.keywords.includes(searchTerm);

        if (isMatch) {
            faq.element.style.display = 'block';
            visibleCount++;

            // Highlight search terms
            highlightSearchTerms(faq.element, searchTerm);
        } else {
            faq.element.style.display = 'none';
        }
    });

    // Show no results message if no matches
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

function highlightSearchTerms(element, searchTerm) {
    // Simple highlighting - in production, use a more robust solution
    const question = element.querySelector('h3');
    const answer = element.querySelector('.faq-content p');

    [question, answer].forEach(el => {
        if (el && searchTerm.length > 2) {
            let html = el.innerHTML;
            const regex = new RegExp('(' + searchTerm + ')', 'gi');
            html = html.replace(regex, '<mark style="background: #ffeb3b; padding: 0 2px;">$1</mark>');
            el.innerHTML = html;
        }
    });
}

function filterFAQs(category) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('faqSearch');

    // Update active category button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter FAQs by category
    if (category === 'all') {
        filteredFAQs = [...allFAQs];
    } else {
        filteredFAQs = allFAQs.filter(faq => faq.category === category);
    }

    // Clear search and show filtered results
    searchInput.value = '';
    searchFAQs('');

    // Hide non-matching category items
    allFAQs.forEach(faq => {
        if (category === 'all' || faq.category === category) {
            faq.element.style.display = 'block';
        } else {
            faq.element.style.display = 'none';
        }
    });
}

// Enhanced FAQ accordion functionality
function initEnhancedFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const icon = question.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQs on mobile, allow multiple open on desktop
            if (window.innerWidth <= 768) {
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                });
            }

            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.textContent = '−';
            } else {
                item.classList.remove('active');
                if (icon) icon.textContent = '+';
            }

            // Smooth scroll to question on mobile
            if (window.innerWidth <= 768 && !isActive) {
                setTimeout(() => {
                    question.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 200);
            }
        });
    });
}

// Initialize all UI components
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialCarousel();
    initFAQSearch();
    initEnhancedFAQs();
});

// =================================
// SERVICE COMPARISON TAB FUNCTIONALITY
// =================================

function showComparisonTab(tabIndex, buttonElement) {
    // Remove active class from all tabs and tab buttons
    const allTabs = document.querySelectorAll('.tab-content');
    const allButtons = document.querySelectorAll('.tab-btn');

    allTabs.forEach(tab => tab.classList.remove('active'));
    allButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to selected tab and button
    const selectedTab = document.querySelector('[data-tab="' + tabIndex + '"]');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    // Smooth scroll to comparison section on mobile tab change
    if (window.innerWidth <= 768) {
        const comparisonSection = document.getElementById('comparison');
        if (comparisonSection) {
            setTimeout(() => {
                comparisonSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100);
        }
    }

    // Add haptic feedback on mobile devices
    if (navigator.vibrate && window.innerWidth <= 768) {
        navigator.vibrate(25);
    }
}

// Gallery Lightbox Functions
let currentLightboxIndex = 0;
let galleryData = [];
let touchStartX = 0;
let touchEndX = 0;

function openLightbox(index) {
    if (!galleryData || !galleryData[index]) return;

    currentLightboxIndex = index;
    const case_ = galleryData[index];
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
}

function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function navigateLightbox(direction) {
    if (!galleryData) return;

    currentLightboxIndex += direction;

    // Loop around
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryData.length - 1;
    } else if (currentLightboxIndex >= galleryData.length) {
        currentLightboxIndex = 0;
    }

    // Update lightbox content
    const case_ = galleryData[currentLightboxIndex];
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');

    lightboxImage.src = '/' + case_.afterImage;
    lightboxImage.alt = case_.title + ' - After';
    lightboxTitle.textContent = case_.title;
    lightboxCategory.textContent = case_.category;
}

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

    loadDynamicGallery('dynamic-gallery', category);
}

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
            return `
              <div class="gallery-case" data-case-index="${index}">
                <div class="case-images" onclick="openLightbox(${index})" style="cursor: pointer;">
                  <div class="before-after-container">
                    <picture class="before-image">
                      <img src="/${case_.beforeImage || case_.afterImage}"
                           alt="${case_.title} - Before"
                           loading="lazy">
                    </picture>

                    <picture class="after-image">
                      <img src="/${case_.afterImage || case_.beforeImage}"
                           alt="${case_.title} - After"
                           loading="lazy">
                    </picture>

                    <div class="before-after-labels">
                      <span class="label">Before</span>
                      <span class="label">After</span>
                    </div>
                  </div>
                </div>

                <div class="case-info">
                  <h3 class="case-title">${case_.title}</h3>
                  <span class="case-category">${case_.category}</span>
                  ${case_.description ? `<p class="case-description">${case_.description}</p>` : ''}
                </div>
              </div>
            `;
        }).join('');

        container.innerHTML = casesHTML;

        // Store gallery data for lightbox navigation
        galleryData = data.cases;

    } catch (error) {
        // Failed to load gallery - show fallback content
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="gallery-case" onclick="openLightbox(0)">
                <div class="case-images" style="cursor: pointer;">
                    <img src="/assets/real-case1.webp" alt="Amazing smile transformation" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="case-info">
                    <h3 class="case-title">Amazing smile transformation</h3>
                    <span class="case-category">cosmetic</span>
                </div>
            </div>
            <div class="gallery-case" onclick="openLightbox(1)">
                <div class="case-images" style="cursor: pointer;">
                    <img src="/assets/real-case2.webp" alt="Hollywood smile" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="case-info">
                    <h3 class="case-title">Hollywood smile</h3>
                    <span class="case-category">cosmetic</span>
                </div>
            </div>
            <div class="gallery-case" onclick="openLightbox(2)">
                <div class="case-images" style="cursor: pointer;">
                    <img src="/assets/real-case3.webp" alt="Orthodontic treatment" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="case-info">
                    <h3 class="case-title">Orthodontic treatment</h3>
                    <span class="case-category">orthodontic</span>
                </div>
            </div>
        `;

        // Fallback gallery data
        galleryData = [
            { title: 'Amazing smile transformation', category: 'cosmetic', afterImage: 'assets/real-case1.webp' },
            { title: 'Hollywood smile', category: 'cosmetic', afterImage: 'assets/real-case2.webp' },
            { title: 'Orthodontic treatment', category: 'orthodontic', afterImage: 'assets/real-case3.webp' }
        ];
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

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

    // Load initial gallery
    loadDynamicGallery('dynamic-gallery', 'all');
});

// Make functions globally available
window.moveTestimonialCarousel = moveTestimonialCarousel;
window.currentTestimonialSlide = currentTestimonialSlide;
window.searchFAQs = searchFAQs;
window.filterFAQs = filterFAQs;
window.showComparisonTab = showComparisonTab;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.switchGalleryCategory = switchGalleryCategory;
