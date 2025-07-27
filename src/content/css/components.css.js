// Component CSS - Modularized for better maintainability
import { SERVICES_CSS } from './services.css.js';
import { GALLERY_CSS } from './gallery.css.js';
import { FORMS_CSS } from './forms.css.js';

// Export combined CSS for backward compatibility
export const COMPONENT_CSS = `
${SERVICES_CSS}

${GALLERY_CSS}

${FORMS_CSS}
`;