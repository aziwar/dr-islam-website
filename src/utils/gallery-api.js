// Gallery API - RESTful endpoints for dynamic gallery management
import { GalleryManager } from './gallery-manager.js';
import { logger } from './logger.js';

export class GalleryAPI {
  constructor(r2Bucket, kvNamespace, adminToken) {
    this.galleryManager = new GalleryManager(r2Bucket, kvNamespace);
    this.adminToken = adminToken;
    
    // Rate limiting for admin endpoints
    this.adminRateLimit = new Map();
    this.rateLimitWindow = 15 * 60 * 1000; // 15 minutes
    this.maxAdminRequests = 50; // Max requests per window
    
    // Failed login tracking
    this.failedAttempts = new Map();
    this.maxFailedAttempts = 5;
    this.lockoutDuration = 30 * 60 * 1000; // 30 minutes
    
    // CSRF token storage
    this.csrfTokens = new Map();
    this.csrfTokenExpiry = 60 * 60 * 1000; // 1 hour
  }

  // Route gallery API requests
  async handleRequest(request, url) {
    const path = url.pathname;
    const method = request.method;

    try {
      // Route API endpoints
      if (path === '/api/gallery/upload' && method === 'POST') {
        return await this.handleUpload(request);
      }
      
      if (path === '/api/gallery/list' && method === 'GET') {
        return await this.handleList(request, url);
      }
      
      if (path === '/api/gallery/public' && method === 'GET') {
        return await this.handlePublicGallery(request, url);
      }
      
      if (path.startsWith('/api/gallery/approve/') && method === 'POST') {
        return await this.handleApprove(request, path);
      }
      
      if (path.startsWith('/api/gallery/delete/') && method === 'DELETE') {
        return await this.handleDelete(request, path);
      }
      
      if (path === '/admin/gallery' && method === 'GET') {
        return await this.handleAdminInterface(request);
      }

      return this.errorResponse('Not found', 404);
    } catch (error) {
      logger.error('Gallery API error:', error);
      return this.errorResponse('Internal server error', 500);
    }
  }

  // Handle case upload
  async handleUpload(request) {
    try {
      // Validate admin token
      const authHeader = request.headers.get('Authorization');
      const authResult = this.validateAuth(authHeader);
      if (!authResult.valid) {
        return this.errorResponse('Unauthorized', 401);
      }

      const formData = await request.formData();
      
      // Extract metadata
      const metadata = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        treatmentType: formData.get('treatmentType'),
        patientConsent: formData.get('patientConsent'),
        uploadedBy: formData.get('uploadedBy') || 'admin'
      };

      const result = await this.galleryManager.uploadCase(formData, metadata);
      
      logger.log('Case uploaded:', { caseId: result.caseId, uploadedBy: metadata.uploadedBy });
      
      return this.successResponse(result);
    } catch (error) {
      logger.error('Upload error:', error);
      return this.errorResponse(error.message, 400);
    }
  }

  // Handle gallery list (admin)
  async handleList(request, url) {
    try {
      // Validate admin token
      const authHeader = request.headers.get('Authorization');
      const authResult = this.validateAuth(authHeader);
      if (!authResult.valid) {
        return this.errorResponse('Unauthorized', 401);
      }

      const searchParams = url.searchParams;
      const status = searchParams.get('status') || 'all';
      const limit = parseInt(searchParams.get('limit')) || 20;
      const offset = parseInt(searchParams.get('offset')) || 0;

      const result = await this.galleryManager.getAllCases({ status, limit, offset });
      return this.successResponse(result);
    } catch (error) {
      logger.error('List error:', error);
      return this.errorResponse(error.message, 500);
    }
  }

  // Handle public gallery (no auth required)
  async handlePublicGallery(request, url) {
    try {
      const searchParams = url.searchParams;
      const category = searchParams.get('category') || 'all';
      const limit = parseInt(searchParams.get('limit')) || 12;

      const result = await this.galleryManager.getPublicGallery(category, limit);
      return this.successResponse(result);
    } catch (error) {
      logger.error('Public gallery error:', error);
      return this.errorResponse(error.message, 500);
    }
  }

  // Handle case approval
  async handleApprove(request, path) {
    try {
      // Validate admin token
      const authHeader = request.headers.get('Authorization');
      const authResult = this.validateAuth(authHeader);
      if (!authResult.valid) {
        return this.errorResponse('Unauthorized', 401);
      }

      const caseId = path.split('/').pop();
      const body = await request.json();
      const approvedBy = body.approvedBy || 'admin';

      const result = await this.galleryManager.approveCase(caseId, approvedBy);
      
      logger.log('Case approved:', { caseId, approvedBy });
      
      return this.successResponse(result);
    } catch (error) {
      logger.error('Approve error:', error);
      return this.errorResponse(error.message, 400);
    }
  }

  // Handle case deletion
  async handleDelete(request, path) {
    try {
      // Validate admin token
      const authHeader = request.headers.get('Authorization');
      const authResult = this.validateAuth(authHeader);
      if (!authResult.valid) {
        return this.errorResponse('Unauthorized', 401);
      }

      const caseId = path.split('/').pop();
      const result = await this.galleryManager.deleteCase(caseId);
      
      logger.log('Case deleted:', { caseId });
      
      return this.successResponse(result);
    } catch (error) {
      logger.error('Delete error:', error);
      return this.errorResponse(error.message, 400);
    }
  }

  // Serve admin interface
  async handleAdminInterface(request) {
    try {
      // Validate admin token
      const authHeader = request.headers.get('Authorization');
      const authResult = this.validateAuth(authHeader);
      if (!authResult.valid) {
        return this.errorResponse('Unauthorized', 401);
      }

      const adminHTML = this.generateAdminInterface();
      return new Response(adminHTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    } catch (error) {
      logger.error('Admin interface error:', error);
      return this.errorResponse('Internal server error', 500);
    }
  }

  // Enhanced admin authentication with rate limiting
  validateAuth(authHeader, clientIP = null) {
    // Check rate limiting first
    if (clientIP && !this.checkRateLimit(clientIP)) {
      return { valid: false, reason: 'rate_limit_exceeded' };
    }

    // Check for account lockout
    if (clientIP && this.isLockedOut(clientIP)) {
      return { valid: false, reason: 'account_locked' };
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.recordFailedAttempt(clientIP);
      return { valid: false, reason: 'missing_token' };
    }

    const token = authHeader.substring(7);
    
    // Constant-time comparison to prevent timing attacks
    const isValid = this.constantTimeCompare(token, this.adminToken);
    
    if (!isValid) {
      this.recordFailedAttempt(clientIP);
      return { valid: false, reason: 'invalid_token' };
    }

    // Reset failed attempts on successful auth
    if (clientIP) {
      this.failedAttempts.delete(clientIP);
    }

    return { valid: true };
  }

  // Constant-time string comparison to prevent timing attacks
  constantTimeCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  // Rate limiting for admin endpoints
  checkRateLimit(clientIP) {
    const now = Date.now();
    const clientKey = `admin_${clientIP}`;
    const clientData = this.adminRateLimit.get(clientKey);

    if (!clientData) {
      this.adminRateLimit.set(clientKey, { count: 1, windowStart: now });
      return true;
    }

    // Reset window if expired
    if (now - clientData.windowStart > this.rateLimitWindow) {
      this.adminRateLimit.set(clientKey, { count: 1, windowStart: now });
      return true;
    }

    // Check if limit exceeded
    if (clientData.count >= this.maxAdminRequests) {
      return false;
    }

    clientData.count++;
    return true;
  }

  // Track failed authentication attempts
  recordFailedAttempt(clientIP) {
    if (!clientIP) return;

    const now = Date.now();
    const attemptData = this.failedAttempts.get(clientIP);

    if (!attemptData) {
      this.failedAttempts.set(clientIP, { count: 1, firstAttempt: now });
    } else {
      attemptData.count++;
      
      // Auto-reset after lockout duration
      if (now - attemptData.firstAttempt > this.lockoutDuration) {
        this.failedAttempts.set(clientIP, { count: 1, firstAttempt: now });
      }
    }
  }

  // Check if IP is locked out due to failed attempts
  isLockedOut(clientIP) {
    const attemptData = this.failedAttempts.get(clientIP);
    
    if (!attemptData) return false;
    
    const now = Date.now();
    
    // Check if lockout period has expired
    if (now - attemptData.firstAttempt > this.lockoutDuration) {
      this.failedAttempts.delete(clientIP);
      return false;
    }

    return attemptData.count >= this.maxFailedAttempts;
  }

  // Generate CSRF token for admin operations
  generateCSRFToken(sessionId) {
    const token = crypto.randomUUID();
    const expiry = Date.now() + this.csrfTokenExpiry;
    
    this.csrfTokens.set(sessionId, { token, expiry });
    
    // Cleanup expired tokens
    this.cleanupExpiredTokens();
    
    return token;
  }

  // Validate CSRF token
  validateCSRFToken(sessionId, providedToken) {
    const tokenData = this.csrfTokens.get(sessionId);
    
    if (!tokenData) return false;
    
    // Check expiry
    if (Date.now() > tokenData.expiry) {
      this.csrfTokens.delete(sessionId);
      return false;
    }

    return this.constantTimeCompare(tokenData.token, providedToken);
  }

  // Cleanup expired CSRF tokens
  cleanupExpiredTokens() {
    const now = Date.now();
    for (const [sessionId, tokenData] of this.csrfTokens.entries()) {
      if (now > tokenData.expiry) {
        this.csrfTokens.delete(sessionId);
      }
    }
  }

  // Generate admin interface HTML
  generateAdminInterface() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery Admin - Dr. Islam Elsagher</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: 500; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
        textarea { height: 80px; resize: vertical; }
        .file-input { border: 2px dashed #ddd; padding: 20px; text-align: center; border-radius: 4px; cursor: pointer; }
        .file-input:hover { border-color: #007cba; background: #f8f9fa; }
        .btn { background: #007cba; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .btn:hover { background: #005a8b; }
        .btn-danger { background: #dc3545; }
        .btn-danger:hover { background: #c82333; }
        .case-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .case-item { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
        .case-images { display: flex; }
        .case-images img { width: 50%; height: 150px; object-fit: cover; }
        .case-info { padding: 15px; }
        .case-actions { padding: 10px 15px; background: #f8f9fa; display: flex; gap: 10px; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-approved { background: #d1edff; color: #0c5460; }
        .alert { padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .alert-success { background: #d1edff; color: #0c5460; border: 1px solid #bee5eb; }
        .alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Gallery Administration</h1>
            <p>Upload and manage before/after photos for Dr. Islam Elsagher's website</p>
        </div>

        <div id="alerts"></div>

        <div class="card">
            <h2>Upload New Case</h2>
            <form id="uploadForm" enctype="multipart/form-data">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label for="beforeImage">Before Image *</label>
                        <div class="file-input" onclick="document.getElementById('beforeImage').click()">
                            <input type="file" id="beforeImage" name="beforeImage" accept="image/*" required style="display: none;">
                            <span>Click to select before image</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="afterImage">After Image *</label>
                        <div class="file-input" onclick="document.getElementById('afterImage').click()">
                            <input type="file" id="afterImage" name="afterImage" accept="image/*" required style="display: none;">
                            <span>Click to select after image</span>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="title">Case Title *</label>
                    <input type="text" id="title" name="title" required placeholder="e.g., Dental Implant Case #1">
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label for="category">Category *</label>
                        <select id="category" name="category" required>
                            <option value="">Select category</option>
                            <option value="implants">Dental Implants</option>
                            <option value="cosmetic">Cosmetic Dentistry</option>
                            <option value="orthodontic">Orthodontics</option>
                            <option value="restoration">Dental Restoration</option>
                            <option value="surgery">Oral Surgery</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="treatmentType">Treatment Type</label>
                        <input type="text" id="treatmentType" name="treatmentType" placeholder="e.g., Single Crown, Veneers">
                    </div>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" placeholder="Brief description of the case..."></textarea>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="patientConsent" name="patientConsent" value="true" required>
                        Patient consent obtained for photo usage
                    </label>
                </div>

                <button type="submit" class="btn">Upload Case</button>
            </form>
        </div>

        <div class="card">
            <h2>Pending Cases</h2>
            <div id="pendingCases" class="case-list">
                <p>Loading cases...</p>
            </div>
        </div>

        <div class="card">
            <h2>Approved Cases</h2>
            <div id="approvedCases" class="case-list">
                <p>Loading cases...</p>
            </div>
        </div>
    </div>

    <script>
        const API_BASE = '/api/gallery';
        const authHeader = 'Bearer ' + prompt('Enter admin token:');

        // Upload form handler
        document.getElementById('uploadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            try {
                showAlert('Uploading case...', 'info');
                
                const response = await fetch(API_BASE + '/upload', {
                    method: 'POST',
                    headers: { 'Authorization': authHeader },
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showAlert('Case uploaded successfully!', 'success');
                    e.target.reset();
                    loadCases();
                } else {
                    showAlert('Upload failed: ' + result.error, 'error');
                }
            } catch (error) {
                showAlert('Upload failed: ' + error.message, 'error');
            }
        });

        // Load cases
        async function loadCases() {
            try {
                const [pending, approved] = await Promise.all([
                    fetch(API_BASE + '/list?status=pending', { headers: { 'Authorization': authHeader } }),
                    fetch(API_BASE + '/list?status=approved', { headers: { 'Authorization': authHeader } })
                ]);

                const pendingData = await pending.json();
                const approvedData = await approved.json();

                renderCases('pendingCases', pendingData.cases, 'pending');
                renderCases('approvedCases', approvedData.cases, 'approved');
            } catch (error) {
                showAlert('Failed to load cases: ' + error.message, 'error');
            }
        }

        // Render cases
        function renderCases(containerId, cases, type) {
            const container = document.getElementById(containerId);
            
            if (!cases || cases.length === 0) {
                container.innerHTML = '<p>No cases found.</p>';
                return;
            }

            container.innerHTML = cases.map(case_ => \`
                <div class="case-item">
                    <div class="case-images">
                        <img src="/\${case_.beforeImages.original}" alt="Before" loading="lazy">
                        <img src="/\${case_.afterImages.original}" alt="After" loading="lazy">
                    </div>
                    <div class="case-info">
                        <h3>\${case_.title}</h3>
                        <p><strong>Category:</strong> \${case_.category}</p>
                        <p><strong>Treatment:</strong> \${case_.treatmentType || 'N/A'}</p>
                        <p><strong>Uploaded:</strong> \${new Date(case_.uploadedAt).toLocaleDateString()}</p>
                        <span class="status status-\${case_.status}">\${case_.status.toUpperCase()}</span>
                    </div>
                    <div class="case-actions">
                        \${type === 'pending' ? \`<button class="btn" onclick="approveCase('\${case_.id}')">Approve</button>\` : ''}
                        <button class="btn btn-danger" onclick="deleteCase('\${case_.id}')">Delete</button>
                    </div>
                </div>
            \`).join('');
        }

        // Approve case
        async function approveCase(caseId) {
            try {
                const response = await fetch(API_BASE + '/approve/' + caseId, {
                    method: 'POST',
                    headers: { 
                        'Authorization': authHeader,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ approvedBy: 'admin' })
                });

                const result = await response.json();

                if (result.success) {
                    showAlert('Case approved successfully!', 'success');
                    loadCases();
                } else {
                    showAlert('Approval failed: ' + result.error, 'error');
                }
            } catch (error) {
                showAlert('Approval failed: ' + error.message, 'error');
            }
        }

        // Delete case
        async function deleteCase(caseId) {
            if (!confirm('Are you sure you want to delete this case?')) return;

            try {
                const response = await fetch(API_BASE + '/delete/' + caseId, {
                    method: 'DELETE',
                    headers: { 'Authorization': authHeader }
                });

                const result = await response.json();

                if (result.success) {
                    showAlert('Case deleted successfully!', 'success');
                    loadCases();
                } else {
                    showAlert('Deletion failed: ' + result.error, 'error');
                }
            } catch (error) {
                showAlert('Deletion failed: ' + error.message, 'error');
            }
        }

        // Show alert
        function showAlert(message, type) {
            const alertsContainer = document.getElementById('alerts');
            const alertClass = type === 'error' ? 'alert-error' : 'alert-success';
            
            alertsContainer.innerHTML = \`
                <div class="alert \${alertClass}">
                    \${message}
                </div>
            \`;

            setTimeout(() => {
                alertsContainer.innerHTML = '';
            }, 5000);
        }

        // File input handlers
        document.getElementById('beforeImage').addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'Click to select before image';
            e.target.parentElement.querySelector('span').textContent = fileName;
        });

        document.getElementById('afterImage').addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'Click to select after image';
            e.target.parentElement.querySelector('span').textContent = fileName;
        });

        // Load cases on page load
        loadCases();
    </script>
</body>
</html>`;
  }

  // Helper methods
  successResponse(data) {
    return new Response(JSON.stringify({ success: true, ...data }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  errorResponse(message, status = 400) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: message 
    }), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}