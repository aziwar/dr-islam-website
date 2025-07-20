// CSS Modular Pattern Example
// Shows how to split large CSS files into modules

export const CRITICAL_CSS = `
/* Above-fold styles only - ~300-500 lines max */
:root {
  --primary: #BEB093;
  --secondary: #777669;
  --bg: #F8F7F5;
}

body {
  font-family: 'Cairo', 'Tajawal', sans-serif;
  background: var(--bg);
  margin: 0;
}

.header {
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
}
`;

export const COMPONENT_CSS = `
/* Component-specific styles - ~500 lines max */
.service-card {
  transform: translateZ(0);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.cta-button {
  background: var(--primary);
  animation: pulse 2s infinite;
}
`;

export const RESPONSIVE_CSS = `
/* Media queries - ~500 lines max */
@media (max-width: 768px) {
  .header { padding: 1rem; }
  .service-card { width: 100%; }
}

@media (max-width: 480px) {
  body { font-size: 14px; }
}
`;

// Usage in Worker
export function getCSSForRequest(request, isMobile) {
  if (isMobile) {
    return CRITICAL_CSS + RESPONSIVE_CSS;
  }
  return CRITICAL_CSS + COMPONENT_CSS + RESPONSIVE_CSS;
}