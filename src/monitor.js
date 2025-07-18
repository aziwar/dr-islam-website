// Health check monitor for dr-islam-website
export default {
  async fetch(request, env) {
    return new Response('Monitor is running');
  },

  async scheduled(event, env, ctx) {
    // Run every 5 minutes via cron trigger
    const siteUrl = 'https://dr-elsagher.com';
    
    try {
      const response = await fetch(siteUrl);
      const html = await response.text();
      
      // Check critical elements
      const checks = {
        status: response.status,
        cacheControl: response.headers.get('cache-control'),
        cfCacheStatus: response.headers.get('cf-cache-status'),
        hasWhatsApp: html.includes('whatsapp-float'),
        hasEmergencyBanner: html.includes('emergency-banner'),
        responseTime: response.headers.get('cf-ray') ? 'fast' : 'slow'
      };
      
      // Log issues
      const issues = [];
      
      if (checks.status !== 200) {
        issues.push(`Site returned ${checks.status}`);
      }
      
      if (checks.cacheControl?.includes('max-age=86400')) {
        issues.push('Cache duration too long - CSS changes won\'t appear');
      }
      
      if (!checks.hasWhatsApp) {
        issues.push('WhatsApp button missing');
      }
      
      if (!checks.hasEmergencyBanner) {
        issues.push('Emergency banner missing');
      }
      
      // Store results (you can send to email/slack/discord)
      if (issues.length > 0) {
        console.error('Site issues detected:', issues);
        // Add notification logic here
      } else {
        console.log('Site health check passed');
      }
      
      return checks;
      
    } catch (error) {
      console.error('Health check failed:', error);
      return { error: error.message };
    }
  }
};