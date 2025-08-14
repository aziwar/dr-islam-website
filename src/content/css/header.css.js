export const HEADER_CSS = `
      /* ===== ENHANCED EMERGENCY BANNER ===== */
      .emergency-banner {
        background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%);
        color: var(--white);
        padding: var(--space-sm) 0;
        position: sticky;
        top: 0;
        z-index: 102;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: emergencyPulse 3s infinite ease-in-out;
      }

      .emergency-banner__content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-lg);
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: 0 var(--container-padding);
      }

      .emergency-banner__text {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        font-weight: 500;
        margin: 0;
      }

      .emergency-banner__icon {
        font-size: var(--text-lg);
        animation: emergencyBlink 2s infinite;
      }

      .emergency-banner__cta {
        color: var(--white);
        font-weight: 600;
        text-decoration: none;
        padding: var(--space-xs) var(--space-md);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-lg);
        transition: var(--transition-fast);
        white-space: nowrap;
      }

      .emergency-banner__cta:hover,
      .emergency-banner__cta:focus {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--white);
        transform: scale(1.05);
      }

      @keyframes emergencyPulse {
        0%, 100% { background: linear-gradient(135deg, var(--emergency) 0%, #C53030 100%); }
        50% { background: linear-gradient(135deg, #DC3545 0%, var(--emergency) 100%); }
      }

      @keyframes emergencyBlink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.7; }
      }

      /* ===== STRUCTURED HEADER ===== */
      .header--structured {
        background: var(--white);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        position: sticky;
        top: 0;
        z-index: 101;
        border-bottom: 1px solid var(--bg-section);
      }

      .nav--simplified {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: var(--container-max-width);
        margin: 0 auto;
        padding: var(--space-md) var(--container-padding);
        gap: var(--space-lg);
      }

      /* ===== ENHANCED LOGO ===== */
      .dental-logo {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        text-decoration: none;
      }

      .logo__text {
        display: flex;
        flex-direction: column;
      }

      .logo__name {
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--secondary);
        line-height: 1.2;
      }

      .logo__subtitle {
        font-size: var(--text-sm);
        color: var(--text-light);
        line-height: 1.2;
      }

      /* ===== SIMPLIFIED NAVIGATION ===== */
      .main-nav {
        display: flex;
        align-items: center;
        gap: var(--space-xl);
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .nav-item {
        position: relative;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-base);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        transition: var(--transition-normal);
        white-space: nowrap;
      }

      .nav-link:hover,
      .nav-link:focus {
        color: var(--primary);
        background: rgba(160, 143, 101, 0.08);
      }

      .nav-dropdown-icon {
        font-size: var(--text-xs);
        transition: var(--transition-fast);
      }

      .nav-item:hover .nav-dropdown-icon {
        transform: rotate(180deg);
      }

      /* ===== MEGA MENU ===== */
      .nav-megamenu {
        position: absolute;
        top: 100%;
        left: -50%;
        right: -50%;
        background: var(--white);
        border: 1px solid var(--bg-section);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        padding: var(--space-xl);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--transition-normal);
        z-index: 1000;
        min-width: 600px;
      }

      .nav-item--services:hover .nav-megamenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-megamenu__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-lg);
        margin-bottom: var(--space-lg);
      }

      .nav-megamenu__category h3 {
        font-size: var(--text-sm);
        color: var(--text-light);
        margin-bottom: var(--space-sm);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .nav-megamenu__links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-megamenu__links a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-xs) 0;
        font-size: var(--text-sm);
        transition: var(--transition-fast);
      }

      .nav-megamenu__links a:hover {
        color: var(--primary);
        padding-left: var(--space-xs);
      }

      .nav-megamenu__footer {
        display: flex;
        gap: var(--space-md);
        justify-content: center;
        padding-top: var(--space-lg);
        border-top: 1px solid var(--bg-section);
      }

      /* ===== DROPDOWN MENU ===== */
      .nav-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        border: 1px solid var(--bg-section);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: var(--space-md);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: var(--transition-normal);
        z-index: 1000;
        min-width: 200px;
      }

      .nav-item--resources:hover .nav-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .nav-dropdown__links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-dropdown__links a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
      }

      .nav-dropdown__links a:hover {
        color: var(--primary);
        background: rgba(160, 143, 101, 0.08);
      }

      /* ===== NAV CTA ===== */
      .nav-cta {
        display: flex;
        align-items: center;
      }

      .nav-cta__button {
        font-weight: 600;
      }

      /* ===== FLOATING CTA ===== */
      .floating-cta {
        position: fixed;
        bottom: var(--space-lg);
        right: var(--space-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: var(--transition-normal);
      }

      .floating-cta.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .floating-cta__button {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        background: var(--primary);
        color: var(--white);
        border: none;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-full);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
        box-shadow: var(--shadow-xl);
      }

      .floating-cta__button:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-2xl);
        background: var(--primary-dark);
      }

      /* ===== MOBILE NAVIGATION ===== */
      .mobile-nav {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        height: calc(100vh - 100%);
        background: var(--white);
        transform: translateY(0);
        transition: var(--transition-normal);
        z-index: 1000;
        overflow-y: auto;
      }

      .mobile-nav.active {
        transform: translateY(-100vh);
      }

      .mobile-nav__content {
        padding: var(--space-xl);
      }

      .mobile-nav__section {
        margin-bottom: var(--space-xl);
        padding-bottom: var(--space-xl);
        border-bottom: 1px solid var(--bg-section);
      }

      .mobile-nav__title {
        font-size: var(--text-xl);
        color: var(--secondary);
        margin-bottom: var(--space-lg);
        text-align: center;
      }

      .mobile-nav__grid {
        display: grid;
        gap: var(--space-lg);
      }

      .mobile-nav__category h4 {
        font-size: var(--text-sm);
        color: var(--text-light);
        margin-bottom: var(--space-sm);
        text-transform: uppercase;
      }

      .mobile-nav__category a {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-sm) 0;
        border-bottom: 1px solid transparent;
      }

      .mobile-nav__category a:hover {
        color: var(--primary);
        border-color: var(--primary);
      }

      .mobile-nav__link {
        display: block;
        color: var(--secondary);
        text-decoration: none;
        padding: var(--space-md) 0;
        font-size: var(--text-lg);
        border-bottom: 1px solid var(--bg-section);
        transition: var(--transition-fast);
      }

      .mobile-nav__link:hover {
        color: var(--primary);
        padding-left: var(--space-md);
      }

      .mobile-nav__ctas {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }

      /* ===== RESPONSIVE DESIGN ===== */
      @media (max-width: var(--breakpoint-lg-max)) {
        .main-nav,
        .nav-cta {
          display: none;
        }

        .nav-toggle {
          display: flex;
        }

        .nav-megamenu__grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: var(--breakpoint-md-max)) {
        .logo__text {
          display: none;
        }

        .emergency-banner__content {
          flex-direction: column;
          gap: var(--space-sm);
          text-align: center;
        }

        .floating-cta {
          bottom: var(--space-md);
          right: var(--space-md);
        }
      }

      @media (max-width: var(--breakpoint-sm-max)) {
        .nav--simplified {
          padding: var(--space-sm) var(--container-padding);
        }

        .emergency-banner__text {
          font-size: var(--text-sm);
        }
      }

      /* ===== ACCESSIBILITY ===== */
      @media (prefers-reduced-motion: reduce) {
        .nav-megamenu,
        .nav-dropdown,
        .floating-cta,
        .mobile-nav,
        .nav-dropdown-icon {
          transition: none !important;
          animation: none !important;
        }
      }

      /* ===== HIGH CONTRAST ===== */
      @media (prefers-contrast: high) {
        .nav-link,
        .nav-megamenu__links a,
        .nav-dropdown__links a {
          border: 1px solid currentColor;
        }
      }
`;
