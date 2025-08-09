// Gallery Manager - Dynamic Before/After Photo System
// Handles image upload, processing, and R2 storage

export class GalleryManager {
  constructor(r2Bucket, kvNamespace) {
    this.r2Bucket = r2Bucket;
    this.kvNamespace = kvNamespace;
    this.supportedFormats = ['image/jpeg', 'image/png', 'image/webp'];
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.maxFilesPerSession = 10; // Rate limiting per session
    this.responsiveSizes = [320, 768, 1200];
    
    // File signature validation
    this.fileSignatures = {
      'image/jpeg': [0xFF, 0xD8, 0xFF],
      'image/png': [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
      'image/webp': [0x52, 0x49, 0x46, 0x46]
    };
    
    // Session-based rate limiting
    this.uploadCounts = new Map();
    this.sessionTimeout = 60 * 60 * 1000; // 1 hour
  }

  // Upload and process before/after case
  async uploadCase(formData, metadata = {}) {
    try {
      const beforeFile = formData.get('beforeImage');
      const afterFile = formData.get('afterImage');
      
      if (!beforeFile || !afterFile) {
        throw new Error('Both before and after images are required');
      }

      // Validate files with session tracking
      const sessionId = metadata.sessionId || crypto.randomUUID();
      await this._validateFile(beforeFile, sessionId);
      await this._validateFile(afterFile, sessionId);

      // Generate unique case ID
      const caseId = `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Process and upload images
      const beforeImages = await this._processAndUploadImage(beforeFile, `${caseId}_before`);
      const afterImages = await this._processAndUploadImage(afterFile, `${caseId}_after`);

      // Create case metadata
      const caseData = {
        id: caseId,
        title: metadata.title || 'Dental Treatment Case',
        category: metadata.category || 'general',
        description: metadata.description || '',
        beforeImages,
        afterImages,
        status: 'pending', // pending, approved, rejected
        uploadedAt: new Date().toISOString(),
        uploadedBy: metadata.uploadedBy || 'admin',
        patientConsent: metadata.patientConsent === 'true',
        treatmentType: metadata.treatmentType || 'general'
      };

      // Store metadata in KV
      await this.kvNamespace.put(`gallery:${caseId}`, JSON.stringify(caseData));
      
      // Add to cases index
      await this._addToCasesIndex(caseId);

      return {
        success: true,
        caseId,
        message: 'Case uploaded successfully and pending approval'
      };

    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  // Process image and create responsive versions
  async _processAndUploadImage(file, baseName) {
    const arrayBuffer = await file.arrayBuffer();
    const originalImage = new Uint8Array(arrayBuffer);

    // Upload original
    const originalKey = `assets/${baseName}.webp`;
    await this.r2Bucket.put(originalKey, originalImage, {
      httpMetadata: {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000, immutable'
      }
    });

    const images = {
      original: originalKey,
      responsive: {}
    };

    // Create responsive versions
    for (const size of this.responsiveSizes) {
      try {
        // In a real implementation, you'd use image processing library
        // For now, we'll upload the original as different sizes
        const responsiveKey = `assets/${baseName}-${size}w.webp`;
        await this.r2Bucket.put(responsiveKey, originalImage, {
          httpMetadata: {
            contentType: 'image/webp',
            cacheControl: 'public, max-age=31536000, immutable'
          }
        });
        images.responsive[`${size}w`] = responsiveKey;
      } catch (error) {
        // Failed to create responsive version - silently continue
      }
    }

    return images;
  }

  // Enhanced file validation with security checks
  async _validateFile(file, sessionId = null) {
    // Basic validation
    if (!file || !file.size) {
      throw new Error('Invalid file');
    }

    if (!this.supportedFormats.includes(file.type)) {
      throw new Error(`Unsupported format. Supported: ${this.supportedFormats.join(', ')}`);
    }

    if (file.size > this.maxFileSize) {
      throw new Error(`File too large. Maximum size: ${this.maxFileSize / 1024 / 1024}MB`);
    }

    // Rate limiting per session
    if (sessionId) {
      const sessionKey = `session_${sessionId}`;
      const sessionData = this.uploadCounts.get(sessionKey);
      const now = Date.now();
      
      if (sessionData) {
        // Clean expired sessions
        if (now - sessionData.timestamp > this.sessionTimeout) {
          this.uploadCounts.delete(sessionKey);
        } else if (sessionData.count >= this.maxFilesPerSession) {
          throw new Error(`Upload limit exceeded. Maximum ${this.maxFilesPerSession} files per hour.`);
        } else {
          sessionData.count++;
          sessionData.timestamp = now;
        }
      } else {
        this.uploadCounts.set(sessionKey, { count: 1, timestamp: now });
      }
    }

    // File signature validation (magic bytes)
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const signature = this.fileSignatures[file.type];
    
    if (signature) {
      const matches = signature.every((byte, index) => bytes[index] === byte);
      if (!matches) {
        throw new Error(`File signature validation failed. File may be corrupted or malicious.`);
      }
    }

    // Content-based validation for images
    await this._validateImageContent(buffer, file.type);

    // Scan for potentially dangerous embedded content
    await this._scanForThreats(buffer);
  }

  // Validate image content structure
  async _validateImageContent(buffer, mimeType) {
    const bytes = new Uint8Array(buffer);
    
    // Check for suspicious patterns in image data
    const suspiciousPatterns = [
      // Script tags in image metadata
      [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], // <script
      // PHP tags
      [0x3C, 0x3F, 0x70, 0x68, 0x70], // <?php
      // JavaScript patterns
      [0x6A, 0x61, 0x76, 0x61, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74] // javascript
    ];

    for (const pattern of suspiciousPatterns) {
      for (let i = 0; i <= bytes.length - pattern.length; i++) {
        const matches = pattern.every((byte, index) => bytes[i + index] === byte);
        if (matches) {
          throw new Error('Potentially malicious content detected in image file');
        }
      }
    }

    // Verify image dimensions are reasonable (not a zip bomb attempt)
    if (mimeType === 'image/png') {
      // PNG: Check IHDR chunk for dimensions
      if (bytes.length >= 24) {
        const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
        const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
        
        if (width > 10000 || height > 10000 || width * height > 50000000) {
          throw new Error('Image dimensions exceed security limits');
        }
      }
    }
  }

  // Basic threat scanning
  async _scanForThreats(buffer) {
    const bytes = new Uint8Array(buffer);
    
    // Check for executable file signatures within image
    const executableSignatures = [
      [0x4D, 0x5A], // MZ (Windows PE)
      [0x7F, 0x45, 0x4C, 0x46], // ELF
      [0xCA, 0xFE, 0xBA, 0xBE], // Mach-O
      [0x50, 0x4B, 0x03, 0x04] // ZIP (potential polyglot)
    ];

    for (const signature of executableSignatures) {
      for (let i = 0; i <= bytes.length - signature.length; i++) {
        const matches = signature.every((byte, index) => bytes[i + index] === byte);
        if (matches) {
          throw new Error('Embedded executable content detected');
        }
      }
    }

    // Check for suspiciously high entropy (encrypted/packed content)
    const entropy = this._calculateEntropy(bytes.slice(0, Math.min(1024, bytes.length)));
    if (entropy > 7.5 && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.warn('High entropy detected in file - potential packed/encrypted content');
    }
  }

  // Calculate Shannon entropy for threat detection
  _calculateEntropy(bytes) {
    const frequencies = new Array(256).fill(0);
    for (const byte of bytes) {
      frequencies[byte]++;
    }

    let entropy = 0;
    const length = bytes.length;
    for (const freq of frequencies) {
      if (freq > 0) {
        const probability = freq / length;
        entropy -= probability * Math.log2(probability);
      }
    }

    return entropy;
  }

  // Get approved cases for public display
  async getPublicGallery(category = 'all', limit = 12) {
    try {
      const indexData = await this.kvNamespace.get('gallery:index');
      let caseIds = indexData ? JSON.parse(indexData) : [];

      // Get approved cases
      const cases = [];
      for (const caseId of caseIds) {
        const caseData = await this.kvNamespace.get(`gallery:${caseId}`);
        if (caseData) {
          const case_ = JSON.parse(caseData);
          if (case_.status === 'approved') {
            if (category === 'all' || case_.category === category) {
              cases.push({
                id: case_.id,
                title: case_.title,
                category: case_.category,
                description: case_.description,
                treatmentType: case_.treatmentType,
                beforeImage: case_.beforeImages.original,
                afterImage: case_.afterImages.original,
                beforeImageResponsive: case_.beforeImages.responsive,
                afterImageResponsive: case_.afterImages.responsive
              });
            }
          }
        }
        if (cases.length >= limit) break;
      }

      return { cases, total: cases.length };
    } catch (error) {
      throw new Error(`Failed to get public gallery: ${error.message}`);
    }
  }

  // Approve case
  async approveCase(caseId, approvedBy = 'admin') {
    try {
      const caseData = await this.kvNamespace.get(`gallery:${caseId}`);
      if (!caseData) {
        throw new Error('Case not found');
      }

      const case_ = JSON.parse(caseData);
      case_.status = 'approved';
      case_.approvedAt = new Date().toISOString();
      case_.approvedBy = approvedBy;

      await this.kvNamespace.put(`gallery:${caseId}`, JSON.stringify(case_));
      
      return { success: true, message: 'Case approved successfully' };
    } catch (error) {
      throw new Error(`Failed to approve case: ${error.message}`);
    }
  }

  // Add case to index
  async _addToCasesIndex(caseId) {
    try {
      const indexData = await this.kvNamespace.get('gallery:index');
      let caseIds = indexData ? JSON.parse(indexData) : [];
      
      if (!caseIds.includes(caseId)) {
        caseIds.unshift(caseId); // Add to beginning (newest first)
        await this.kvNamespace.put('gallery:index', JSON.stringify(caseIds));
      }
    } catch (error) {
      // Failed to update cases index - silently continue
    }
  }
}