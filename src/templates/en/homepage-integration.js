// Homepage Integration - Complete homepage sections for Dr. Islam
// Integrates the new modern design with existing component system

import { getEnglishHomepageNew } from './homepage-new.js';
import { getEnglishHeader } from './header-refactored.js';
import { getEnglishServicesSection } from './sections/services-refactored.js';

/**
 * Get complete homepage sections for integration
 * Returns an object with individual sections that can replace existing ones
 */
export async function getHomepageIntegration() {
  
  // Get the complete new homepage content
  const newHomepage = await getEnglishHomepageNew();
  
  // Extract individual sections from the homepage
  const sections = extractSections(newHomepage);
  
  return {
    // Header section (can replace existing header)
    header: await getEnglishHeader(),
    
    // Hero section from new design
    hero: sections.hero,
    
    // Services section from refactored design  
    services: await getEnglishServicesSection(),
    
    // Additional sections from new design
    about: sections.about,
    testimonials: sections.testimonials,
    contact: sections.contact,
    
    // Complete new homepage if needed
    complete: newHomepage
  };
}

/**
 * Extract individual sections from complete homepage HTML
 */
function extractSections(htmlContent) {
  const sections = {};
  
  // Extract hero section
  const heroMatch = htmlContent.match(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/);
  sections.hero = heroMatch ? heroMatch[0] : '';
  
  // Extract about section  
  const aboutMatch = htmlContent.match(/<section[^>]*id="about"[^>]*>[\s\S]*?<\/section>/);
  sections.about = aboutMatch ? aboutMatch[0] : '';
  
  // Extract testimonials section
  const testimonialsMatch = htmlContent.match(/<section[^>]*id="testimonials"[^>]*>[\s\S]*?<\/section>/);
  sections.testimonials = testimonialsMatch ? testimonialsMatch[0] : '';
  
  // Extract contact section
  const contactMatch = htmlContent.match(/<section[^>]*id="contact"[^>]*>[\s\S]*?<\/section>/);
  sections.contact = contactMatch ? contactMatch[0] : '';
  
  return sections;
}

/**
 * Replace specific sections in existing HTML content
 */
export function replaceSections(existingHtml, newSections) {
  let updatedHtml = existingHtml;
  
  // Replace hero section
  if (newSections.hero) {
    updatedHtml = updatedHtml.replace(
      /<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/,
      newSections.hero
    );
  }
  
  // Replace services section
  if (newSections.services) {
    updatedHtml = updatedHtml.replace(
      /<section[^>]*id="services"[^>]*>[\s\S]*?<\/section>/,
      newSections.services
    );
  }
  
  // Replace about section
  if (newSections.about) {
    updatedHtml = updatedHtml.replace(
      /<section[^>]*id="about"[^>]*>[\s\S]*?<\/section>/,
      newSections.about
    );
  }
  
  // Replace testimonials section
  if (newSections.testimonials) {
    updatedHtml = updatedHtml.replace(
      /<section[^>]*id="testimonials"[^>]*>[\s\S]*?<\/section>/,
      newSections.testimonials
    );
  }
  
  // Replace contact section
  if (newSections.contact) {
    updatedHtml = updatedHtml.replace(
      /<section[^>]*id="contact"[^>]*>[\s\S]*?<\/section>/,
      newSections.contact
    );
  }
  
  return updatedHtml;
}

/**
 * Integration patterns for different update approaches
 */
export const INTEGRATION_PATTERNS = {
  
  // Full homepage replacement
  COMPLETE_REPLACEMENT: 'complete',
  
  // Section by section replacement
  SECTION_REPLACEMENT: 'sections',
  
  // Header only update
  HEADER_ONLY: 'header',
  
  // Hero + Services only
  HERO_SERVICES: 'hero_services'
};