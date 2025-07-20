// Security Headers Example
// Shows mandatory security headers for Cloudflare Workers

export const SECURITY_HEADERS = {
  // Prevent clickjacking
  "X-Frame-Options": "DENY",
  
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",
  
  // Control referrer information
  "Referrer-Policy": "strict-origin-when-cross-origin",
  
  // Prevent loading in cross-origin contexts
  "Cross-Origin-Embedder-Policy": "require-corp",
  
  // Prevent window references across origins
  "Cross-Origin-Opener-Policy": "same-site",
  
  // Restrict resource sharing
  "Cross-Origin-Resource-Policy": "same-site",
  
  // Opt out of FLoC
  "Permissions-Policy": "interest-cohort=()"
};

// Apply to response
export function applySecurityHeaders(response) {
  const newHeaders = new Headers(response.headers);
  
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}