// Enhanced mobile menu functionality
export function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');

  const isActive = mobileNav.classList.contains('active');

  mobileNav.classList.toggle('active', !isActive);
  mobileNav.setAttribute('aria-hidden', isActive.toString());
  navToggle.setAttribute('aria-expanded', (!isActive).toString());
  backdrop.style.display = !isActive ? 'block' : 'none';

  // Prevent body scroll when menu is open
  document.body.style.overflow = !isActive ? 'hidden' : '';
}

export function closeMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');

  mobileNav.classList.remove('active');
  mobileNav.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  backdrop.style.display = 'none';
  document.body.style.overflow = '';
}

// Floating CTA visibility
export function initFloatingCTA() {
  const floatingCTA = document.getElementById('floatingCTA');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Show floating CTA when scrolling down and past hero section
    if (currentScrollY > 800 && currentScrollY > lastScrollY) {
      floatingCTA.classList.add('visible');
      floatingCTA.setAttribute('aria-hidden', 'false');
    } else if (currentScrollY < 400 || currentScrollY < lastScrollY) {
      floatingCTA.classList.remove('visible');
      floatingCTA.setAttribute('aria-hidden', 'true');
    }

    lastScrollY = currentScrollY;
  });
}

// Initialize enhanced navigation features
document.addEventListener('DOMContentLoaded', () => {
  initFloatingCTA();

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMobileMenu, 100);
    });
  });
});
