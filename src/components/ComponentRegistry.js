// COMPONENT REGISTRY - Central component management system
// Manages all UI components with dynamic imports for optimal performance

export const ComponentRegistry = {
  
  // Atom Components - Basic UI elements
  atoms: {
    Button: {
      component: () => import('./atoms/Button.js'),
      description: 'Interactive button with multiple variants and accessibility',
      variants: ['primary', 'secondary', 'emergency', 'mobile-toggle', 'ghost'],
      props: ['variant', 'size', 'disabled', 'loading', 'onClick', 'ariaLabel']
    },
    Icon: {
      component: () => import('./atoms/Icon.js'),
      description: 'SVG icon system with dental logo and ARIA support',
      variants: ['dental-logo', 'menu', 'close', 'phone', 'email', 'location'],
      props: ['name', 'size', 'color', 'ariaLabel', 'decorative']
    },
    Input: {
      component: () => import('./atoms/Input.js'),
      description: 'Form input with validation states and error handling',
      variants: ['text', 'email', 'tel', 'textarea', 'select'],
      props: ['type', 'value', 'placeholder', 'required', 'error', 'success', 'disabled']
    },
    Typography: {
      component: () => import('./atoms/Typography.js'),
      description: 'Heading and text components with Arabic support',
      variants: ['h1', 'h2', 'h3', 'h4', 'p', 'subtitle', 'caption'],
      props: ['variant', 'color', 'align', 'weight', 'lang']
    },
    Badge: {
      component: () => import('./atoms/Badge.js'),
      description: 'Status and category badge component',
      variants: ['success', 'warning', 'error', 'info', 'category'],
      props: ['variant', 'text', 'size']
    },
    Spinner: {
      component: () => import('./atoms/Spinner.js'),
      description: 'Loading spinner with accessibility',
      variants: ['small', 'medium', 'large'],
      props: ['size', 'color', 'ariaLabel']
    }
  },

  // Molecule Components - Combinations of atoms
  molecules: {
    FormGroup: {
      component: () => import('./molecules/FormGroup.js'),
      description: 'Input with label, validation, and error message',
      variants: ['default', 'floating-label', 'stacked'],
      props: ['label', 'input', 'error', 'success', 'required', 'helpText']
    },
    ServiceCard: {
      component: () => import('./molecules/ServiceCard.js'),
      description: 'Service display card with icon, title, and description',
      variants: ['default', 'featured', 'compact'],
      props: ['title', 'description', 'icon', 'link', 'featured']
    },
    NavItem: {
      component: () => import('./molecules/NavItem.js'),
      description: 'Navigation item with hover states and active indication',
      variants: ['default', 'mobile', 'breadcrumb'],
      props: ['text', 'href', 'active', 'onClick', 'variant']
    },
    GalleryItem: {
      component: () => import('./molecules/GalleryItem.js'),
      description: 'Individual gallery case with before/after images',
      variants: ['default', 'compact', 'lightbox'],
      props: ['title', 'category', 'beforeImage', 'afterImage', 'description', 'onClick']
    }
  },

  // Organism Components - Complex UI sections
  organisms: {
    Header: {
      component: () => import('./organisms/Header.js'),
      description: 'Site header with navigation and mobile menu',
      variants: ['default', 'transparent', 'sticky'],
      props: ['variant', 'navigation', 'logo', 'mobileMenu']
    },
    BookingModal: {
      component: () => import('./organisms/BookingModal.js'),
      description: 'Complete booking modal with form validation',
      variants: ['appointment', 'consultation', 'emergency'],
      props: ['type', 'onSubmit', 'onClose', 'defaultData']
    },
    Gallery: {
      component: () => import('./organisms/Gallery.js'),
      description: 'Image gallery with filtering and lightbox',
      variants: ['grid', 'masonry', 'carousel'],
      props: ['items', 'categories', 'variant', 'lightbox']
    },
    Footer: {
      component: () => import('./organisms/Footer.js'),
      description: 'Site footer with contact info and links',
      variants: ['default', 'minimal'],
      props: ['contactInfo', 'links', 'socialMedia', 'variant']
    }
  },

  // Component loading and caching
  _cache: new Map(),
  
  /**
   * Load a component with caching
   * @param {string} type - 'atoms', 'molecules', or 'organisms'
   * @param {string} name - Component name
   * @returns {Promise<Object>} Component module
   */
  async load(type, name) {
    const cacheKey = `${type}:${name}`;
    
    // Return cached component if available
    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey);
    }
    
    // Validate component exists
    if (!this[type] || !this[type][name]) {
      throw new Error(`Component ${type}:${name} not found in registry`);
    }
    
    try {
      // Load component module
      const module = await this[type][name].component();
      
      // Cache the loaded component
      this._cache.set(cacheKey, module);
      
      return module;
    } catch (error) {
      throw new Error(`Failed to load component ${type}:${name}: ${error.message}`);
    }
  },

  /**
   * Get component metadata without loading
   * @param {string} type - Component type
   * @param {string} name - Component name
   * @returns {Object} Component metadata
   */
  getMetadata(type, name) {
    if (!this[type] || !this[type][name]) {
      return null;
    }
    
    const { component, ...metadata } = this[type][name];
    return metadata;
  },

  /**
   * List all components of a type
   * @param {string} type - Component type to list
   * @returns {Array} Array of component names
   */
  list(type) {
    if (!this[type]) {
      return [];
    }
    
    return Object.keys(this[type]);
  },

  /**
   * Search components by description or variant
   * @param {string} query - Search term
   * @returns {Array} Matching components
   */
  search(query) {
    const results = [];
    const searchTerm = query.toLowerCase();
    
    ['atoms', 'molecules', 'organisms'].forEach(type => {
      Object.entries(this[type]).forEach(([name, config]) => {
        const searchableText = `${name} ${config.description} ${config.variants.join(' ')}`.toLowerCase();
        
        if (searchableText.includes(searchTerm)) {
          results.push({
            type,
            name,
            ...this.getMetadata(type, name)
          });
        }
      });
    });
    
    return results;
  },

  /**
   * Preload critical components for better performance
   * @param {Array} components - Array of {type, name} objects to preload
   */
  async preload(components) {
    const loadPromises = components.map(({ type, name }) => 
      this.load(type, name).catch(error => {
        console.warn(`Failed to preload ${type}:${name}:`, error);
        return null;
      })
    );
    
    await Promise.all(loadPromises);
  },

  /**
   * Clear component cache (useful for development)
   */
  clearCache() {
    this._cache.clear();
  },

  /**
   * Get cache statistics
   * @returns {Object} Cache stats
   */
  getCacheStats() {
    return {
      size: this._cache.size,
      components: Array.from(this._cache.keys())
    };
  }
};

// Development helper - log registry info
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  window.ComponentRegistry = ComponentRegistry;
  console.log('🏗️ Component Registry loaded:', {
    atoms: ComponentRegistry.list('atoms').length,
    molecules: ComponentRegistry.list('molecules').length,
    organisms: ComponentRegistry.list('organisms').length
  });
}

export default ComponentRegistry;