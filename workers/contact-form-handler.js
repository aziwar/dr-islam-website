/**
 * Cloudflare Worker - Contact Form Handler
 * Handles contact form submissions for Dr. Islam Elsagher dental clinic
 */

// Configuration
const CONFIG = {
    // Email configuration
    CLINIC_EMAIL: 'dr.islam_elsagher@gmail.com',
    FROM_EMAIL: 'noreply@dr-elsagher.com',
    
    // SendGrid API (preferred)
    SENDGRID_API_URL: 'https://api.sendgrid.com/v3/mail/send',
    
    // Resend API (alternative)
    RESEND_API_URL: 'https://api.resend.com/emails',
    
    // Rate limiting
    RATE_LIMIT_REQUESTS: 5,
    RATE_LIMIT_WINDOW: 3600, // 1 hour in seconds
    
    // Allowed origins
    ALLOWED_ORIGINS: [
        'https://dr-elsagher.com',
        'https://www.dr-elsagher.com',
        'http://localhost:3000', // For development
        'http://127.0.0.1:5500'  // For local testing
    ]
};

// Email templates
const EMAIL_TEMPLATES = {
    // Email to clinic
    TO_CLINIC: (data) => ({
        subject: `📋 طلب موعد جديد - ${data.service}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #2c5aa0;">
                        <h1 style="color: #2c5aa0; margin: 0; font-size: 24px;">🦷 عيادة د. اسلام الصغير</h1>
                        <p style="color: #666; margin: 5px 0 0 0;">طلب موعد جديد</p>
                    </div>
                    
                    <!-- Patient Information -->
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #2c5aa0; margin-top: 0; font-size: 18px; display: flex; align-items: center;">
                            👤 معلومات المريض
                        </h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px 0; font-weight: bold; color: #555; width: 30%;">الاسم:</td>
                                <td style="padding: 10px 0; color: #333;">${data.name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px 0; font-weight: bold; color: #555;">الهاتف:</td>
                                <td style="padding: 10px 0; color: #333;">
                                    <a href="tel:${data.phone}" style="color: #2c5aa0; text-decoration: none;">${data.phone}</a>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px 0; font-weight: bold; color: #555;">البريد الإلكتروني:</td>
                                <td style="padding: 10px 0; color: #333;">
                                    <a href="mailto:${data.email}" style="color: #2c5aa0; text-decoration: none;">${data.email}</a>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 10px 0; font-weight: bold; color: #555;">نوع الخدمة:</td>
                                <td style="padding: 10px 0; color: #333;">
                                    <span style="background: #e3f2fd; color: #1976d2; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                                        ${getServiceNameArabic(data.service)}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Message Section -->
                    ${data.message ? `
                    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; margin-bottom: 20px;">
                        <h3 style="color: #e65100; margin-top: 0; font-size: 16px; display: flex; align-items: center;">
                            💬 تفاصيل إضافية
                        </h3>
                        <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-line;">${data.message}</p>
                    </div>
                    ` : ''}
                    
                    <!-- Priority Indicator -->
                    <div style="background: ${data.service === 'emergency' ? '#ffebee' : '#e8f5e8'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 0; color: ${data.service === 'emergency' ? '#c62828' : '#2e7d32'}; font-weight: bold;">
                            ${data.service === 'emergency' ? '🚨 حالة طوارئ - يتطلب اهتمام فوري' : '📅 طلب موعد عادي'}
                        </p>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <h3 style="color: #555; margin-bottom: 15px;">إجراءات سريعة</h3>
                        <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                            <a href="tel:${data.phone}" style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                📞 اتصال مباشر
                            </a>
                            <a href="https://wa.me/96598563711?text=مرحبا، أود حجز موعد للمريض ${data.name}" style="background: #128c7e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                💬 WhatsApp
                            </a>
                            <a href="mailto:${data.email}?subject=رد على طلب الموعد" style="background: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                📧 رد بالإيميل
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                        <p style="margin: 0;">تم الإرسال من موقع عيادة د. اسلام الصغير</p>
                        <p style="margin: 5px 0 0 0;">📧 ${data.timestamp}</p>
                    </div>
                </div>
            </div>
        `,
        text: `
طلب موعد جديد - عيادة د. اسلام الصغير

معلومات المريض:
- الاسم: ${data.name}
- الهاتف: ${data.phone}
- البريد الإلكتروني: ${data.email}
- نوع الخدمة: ${getServiceNameArabic(data.service)}

${data.message ? `تفاصيل إضافية:\n${data.message}\n` : ''}

${data.service === 'emergency' ? '🚨 حالة طوارئ - يتطلب اهتمام فوري' : ''}

تم الإرسال في: ${data.timestamp}
        `
    }),
    
    // Confirmation email to patient
    TO_PATIENT: (data) => ({
        subject: `✅ تأكيد استلام طلب الموعد - عيادة د. اسلام الصغير`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2c5aa0; margin: 0; font-size: 24px;">🦷 عيادة د. اسلام الصغير</h1>
                        <p style="color: #666; margin: 5px 0 0 0;">شكراً لتواصلك معنا</p>
                    </div>
                    
                    <!-- Confirmation Message -->
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                        <h2 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 20px;">✅ تم استلام طلبك بنجاح</h2>
                        <p style="color: #555; margin: 0; line-height: 1.6;">
                            عزيزي/عزيزتي <strong>${data.name}</strong>,<br>
                            شكراً لك على تواصلك مع عيادة د. اسلام الصغير. تم استلام طلب موعدك بنجاح.
                        </p>
                    </div>
                    
                    <!-- Request Summary -->
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c5aa0; margin-top: 0; font-size: 16px;">📋 ملخص طلبك</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">نوع الخدمة:</td>
                                <td style="padding: 8px 0; color: #333;">${getServiceNameArabic(data.service)}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">تاريخ الطلب:</td>
                                <td style="padding: 8px 0; color: #333;">${data.timestamp}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">رقم المرجع:</td>
                                <td style="padding: 8px 0; color: #333; font-family: monospace;">#${data.reference || 'DR' + Date.now().toString().slice(-6)}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Next Steps -->
                    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #e65100; margin-top: 0; font-size: 16px;">📅 الخطوات التالية</h3>
                        <ul style="color: #333; line-height: 1.8; margin: 0; padding-right: 20px;">
                            <li>سيتواصل معك فريقنا خلال <strong>24 ساعة</strong> لتأكيد الموعد</li>
                            <li>سنتصل بك على الرقم: <strong>${data.phone}</strong></li>
                            <li>في حالة الطوارئ، اتصل فوراً على: <strong>98563711</strong></li>
                            <li>يمكنك أيضاً التواصل معنا عبر WhatsApp للحصول على رد أسرع</li>
                        </ul>
                    </div>
                    
                    <!-- Important Notes -->
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1976d2; margin-top: 0; font-size: 16px;">📝 ملاحظات مهمة</h3>
                        <ul style="color: #333; line-height: 1.8; margin: 0; padding-right: 20px;">
                            <li><strong>أحضر معك:</strong> البطاقة المدنية وبطاقة التأمين الصحي</li>
                            <li><strong>المواعيد:</strong> من السبت إلى الخميس (9 صباحاً - 9 مساءً)</li>
                            <li><strong>إلغاء الموعد:</strong> يرجى إخبارنا قبل 24 ساعة على الأقل</li>
                            <li><strong>استفسارات:</strong> لا تتردد في التواصل معنا في أي وقت</li>
                        </ul>
                    </div>
                    
                    <!-- Contact Information -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <h3 style="color: #555; margin-bottom: 15px;">للتواصل السريع</h3>
                        <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                            <a href="tel:+96598563711" style="background: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                📞 98563711
                            </a>
                            <a href="https://wa.me/96598563711" style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                        <p style="margin: 0;"><strong>عيادة د. اسلام الصغير</strong></p>
                        <p style="margin: 5px 0 0 0;">طبيب أسنان عام وأخصائي زراعة الأسنان - الكويت</p>
                        <p style="margin: 5px 0 0 0;">
                            <a href="https://dr-elsagher.com" style="color: #2c5aa0; text-decoration: none;">dr-elsagher.com</a> | 
                            <a href="https://www.instagram.com/dr.islamelsagher/" style="color: #2c5aa0; text-decoration: none;">@dr.islamelsagher</a>
                        </p>
                    </div>
                </div>
            </div>
        `,
        text: `
عيادة د. اسلام الصغير - تأكيد استلام طلب الموعد

عزيزي/عزيزتي ${data.name},

شكراً لك على تواصلك مع عيادة د. اسلام الصغير. تم استلام طلب موعدك بنجاح.

ملخص طلبك:
- نوع الخدمة: ${getServiceNameArabic(data.service)}
- تاريخ الطلب: ${data.timestamp}

الخطوات التالية:
- سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الموعد
- سنتصل بك على الرقم: ${data.phone}
- في حالة الطوارئ، اتصل فوراً على: 98563711

للتواصل السريع:
- هاتف: 98563711
- WhatsApp: https://wa.me/96598563711

عيادة د. اسلام الصغير
طبيب أسنان عام وأخصائي زراعة الأسنان - الكويت
        `
    })
};

// Helper function to get Arabic service names
function getServiceNameArabic(service) {
    const serviceNames = {
        'consultation': 'استشارة',
        'implant': 'زراعة أسنان',
        'cosmetic': 'تجميل أسنان',
        'root-canal': 'علاج جذور',
        'emergency': 'طوارئ'
    };
    return serviceNames[service] || service;
}

// Rate limiting using Cloudflare KV (if available) or in-memory fallback
class RateLimiter {
    constructor(env) {
        this.env = env;
        this.memoryStore = new Map(); // Fallback for development
    }
    
    async checkRateLimit(ip) {
        const key = `rate_limit:${ip}`;
        const now = Math.floor(Date.now() / 1000);
        
        try {
            // Try to use Cloudflare KV if available
            if (this.env.RATE_LIMIT_KV) {
                const stored = await this.env.RATE_LIMIT_KV.get(key);
                const data = stored ? JSON.parse(stored) : { count: 0, resetTime: now + CONFIG.RATE_LIMIT_WINDOW };
                
                if (now > data.resetTime) {
                    data.count = 1;
                    data.resetTime = now + CONFIG.RATE_LIMIT_WINDOW;
                } else {
                    data.count++;
                }
                
                await this.env.RATE_LIMIT_KV.put(key, JSON.stringify(data), {
                    expirationTtl: CONFIG.RATE_LIMIT_WINDOW
                });
                
                return {
                    allowed: data.count <= CONFIG.RATE_LIMIT_REQUESTS,
                    remaining: Math.max(0, CONFIG.RATE_LIMIT_REQUESTS - data.count),
                    resetTime: data.resetTime
                };
            }
        } catch (error) {
            console.warn('KV storage not available, using memory fallback:', error.message);
        }
        
        // Fallback to in-memory storage (for development)
        const stored = this.memoryStore.get(key) || { count: 0, resetTime: now + CONFIG.RATE_LIMIT_WINDOW };
        
        if (now > stored.resetTime) {
            stored.count = 1;
            stored.resetTime = now + CONFIG.RATE_LIMIT_WINDOW;
        } else {
            stored.count++;
        }
        
        this.memoryStore.set(key, stored);
        
        return {
            allowed: stored.count <= CONFIG.RATE_LIMIT_REQUESTS,
            remaining: Math.max(0, CONFIG.RATE_LIMIT_REQUESTS - stored.count),
            resetTime: stored.resetTime
        };
    }
}

// Email sender with multiple provider support
class EmailSender {
    constructor(env) {
        this.env = env;
    }
    
    async sendEmail(to, subject, html, text) {
        // Try SendGrid first
        if (this.env.SENDGRID_API_KEY) {
            try {
                return await this.sendWithSendGrid(to, subject, html, text);
            } catch (error) {
                console.warn('SendGrid failed, trying Resend:', error.message);
            }
        }
        
        // Try Resend as fallback
        if (this.env.RESEND_API_KEY) {
            try {
                return await this.sendWithResend(to, subject, html, text);
            } catch (error) {
                console.warn('Resend failed:', error.message);
                throw new Error('All email providers failed');
            }
        }
        
        throw new Error('No email API keys configured');
    }
    
    async sendWithSendGrid(to, subject, html, text) {
        const response = await fetch(CONFIG.SENDGRID_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: to }],
                    subject: subject
                }],
                from: { 
                    email: CONFIG.FROM_EMAIL,
                    name: 'عيادة د. اسلام الصغير'
                },
                content: [
                    { type: 'text/html', value: html },
                    { type: 'text/plain', value: text }
                ]
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`SendGrid error: ${response.status} - ${error}`);
        }
        
        return { success: true, provider: 'SendGrid' };
    }
    
    async sendWithResend(to, subject, html, text) {
        const response = await fetch(CONFIG.RESEND_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: `عيادة د. اسلام الصغير <${CONFIG.FROM_EMAIL}>`,
                to: [to],
                subject: subject,
                html: html,
                text: text
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Resend error: ${response.status} - ${error}`);
        }
        
        return { success: true, provider: 'Resend' };
    }
}

// Input validation and sanitization
class FormValidator {
    static validate(data) {
        const errors = [];
        
        // Required fields
        if (!data.name || data.name.trim().length < 2) {
            errors.push('الاسم مطلوب ويجب أن يكون على الأقل حرفين');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('البريد الإلكتروني غير صحيح');
        }
        
        if (!data.phone || !this.isValidPhone(data.phone)) {
            errors.push('رقم الهاتف غير صحيح');
        }
        
        if (!data.service || !['consultation', 'implant', 'cosmetic', 'root-canal', 'emergency'].includes(data.service)) {
            errors.push('نوع الخدمة مطلوب');
        }
        
        // Length limits
        if (data.name && data.name.length > 100) {
            errors.push('الاسم طويل جداً (الحد الأقصى 100 حرف)');
        }
        
        if (data.message && data.message.length > 1000) {
            errors.push('الرسالة طويلة جداً (الحد الأقصى 1000 حرف)');
        }
        
        return errors;
    }
    
    static sanitize(data) {
        return {
            name: this.sanitizeString(data.name),
            email: this.sanitizeEmail(data.email),
            phone: this.sanitizePhone(data.phone),
            service: this.sanitizeString(data.service),
            message: this.sanitizeString(data.message || ''),
            timestamp: new Date().toLocaleString('ar-EG', { 
                timeZone: 'Asia/Kuwait',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }
    
    static sanitizeString(str) {
        if (!str) return '';
        return str.toString().trim().slice(0, 1000);
    }
    
    static sanitizeEmail(email) {
        if (!email) return '';
        return email.toString().toLowerCase().trim().slice(0, 255);
    }
    
    static sanitizePhone(phone) {
        if (!phone) return '';
        // Remove non-numeric characters except + and spaces
        return phone.toString().replace(/[^+\d\s-]/g, '').trim().slice(0, 20);
    }
    
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 255;
    }
    
    static isValidPhone(phone) {
        // Kuwait phone numbers: +965XXXXXXXX or local 8-digit
        const kuwaitPhoneRegex = /^(\+965|965)?[2456789]\d{7}$/;
        const cleanPhone = phone.replace(/[\s-]/g, '');
        return kuwaitPhoneRegex.test(cleanPhone);
    }
}

// Spam protection
class SpamProtection {
    static checkSpam(data, headers) {
        let spamScore = 0;
        const reasons = [];
        
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /viagra|casino|lottery|winner|claim|prize/i,
            /click here|urgent|act now/i,
            /\$\$\$|\€\€\€|!!!/g
        ];
        
        const allText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(allText)) {
                spamScore += 25;
                reasons.push('Suspicious content pattern detected');
            }
        }
        
        // Check for excessive links
        const linkCount = (data.message.match(/https?:\/\//g) || []).length;
        if (linkCount > 2) {
            spamScore += 30;
            reasons.push('Too many links in message');
        }
        
        // Check user agent
        const userAgent = headers.get('user-agent') || '';
        if (!userAgent || userAgent.length < 20) {
            spamScore += 20;
            reasons.push('Suspicious or missing user agent');
        }
        
        // Check for bot indicators
        const botPatterns = /bot|crawler|spider|scraper/i;
        if (botPatterns.test(userAgent)) {
            spamScore += 40;
            reasons.push('Bot user agent detected');
        }
        
        return {
            isSpam: spamScore >= 50,
            score: spamScore,
            reasons: reasons
        };
    }
}

// CORS handler
function handleCORS(request, env) {
    const origin = request.headers.get('Origin');
    const allowedOrigin = CONFIG.ALLOWED_ORIGINS.includes(origin) ? origin : CONFIG.ALLOWED_ORIGINS[0];
    
    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age': '86400'
    };
}

// Main handler
export default {
    async fetch(request, env, ctx) {
        try {
            // Handle CORS preflight
            if (request.method === 'OPTIONS') {
                return new Response(null, {
                    status: 200,
                    headers: handleCORS(request, env)
                });
            }
            
            // Only allow POST requests
            if (request.method !== 'POST') {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Method not allowed',
                    message: 'يُسمح فقط بطلبات POST'
                }), {
                    status: 405,
                    headers: {
                        'Content-Type': 'application/json',
                        ...handleCORS(request, env)
                    }
                });
            }
            
            // Rate limiting
            const clientIP = request.headers.get('CF-Connecting-IP') || 
                           request.headers.get('X-Forwarded-For') || 
                           'unknown';
            
            const rateLimiter = new RateLimiter(env);
            const rateLimit = await rateLimiter.checkRateLimit(clientIP);
            
            if (!rateLimit.allowed) {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Rate limit exceeded',
                    message: 'تم تجاوز الحد المسموح من الطلبات. حاول مرة أخرى لاحقاً.',
                    retryAfter: rateLimit.resetTime
                }), {
                    status: 429,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
                        ...handleCORS(request, env)
                    }
                });
            }
            
            // Parse and validate form data
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            
            // Validate input
            const validationErrors = FormValidator.validate(data);
            if (validationErrors.length > 0) {
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Validation failed',
                    message: 'بيانات النموذج غير صحيحة',
                    details: validationErrors
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        ...handleCORS(request, env)
                    }
                });
            }
            
            // Sanitize data
            const sanitizedData = FormValidator.sanitize(data);
            
            // Spam protection
            const spamCheck = SpamProtection.checkSpam(sanitizedData, request.headers);
            if (spamCheck.isSpam) {
                console.warn('Spam detected:', spamCheck.reasons);
                
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Spam detected',
                    message: 'تم رفض الطلب. إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بنا مباشرة.'
                }), {
                    status: 422,
                    headers: {
                        'Content-Type': 'application/json',
                        ...handleCORS(request, env)
                    }
                });
            }
            
            // Send emails
            const emailSender = new EmailSender(env);
            const results = [];
            
            try {
                // Send email to clinic
                const clinicTemplate = EMAIL_TEMPLATES.TO_CLINIC(sanitizedData);
                const clinicResult = await emailSender.sendEmail(
                    CONFIG.CLINIC_EMAIL,
                    clinicTemplate.subject,
                    clinicTemplate.html,
                    clinicTemplate.text
                );
                results.push({ type: 'clinic', ...clinicResult });
                
                // Send confirmation email to patient
                const patientTemplate = EMAIL_TEMPLATES.TO_PATIENT(sanitizedData);
                const patientResult = await emailSender.sendEmail(
                    sanitizedData.email,
                    patientTemplate.subject,
                    patientTemplate.html,
                    patientTemplate.text
                );
                results.push({ type: 'patient', ...patientResult });
                
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Email sending failed',
                    message: 'فشل في إرسال الإيميل. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
                    debug: env.NODE_ENV === 'development' ? emailError.message : undefined
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...handleCORS(request, env)
                    }
                });
            }
            
            // Success response
            return new Response(JSON.stringify({
                success: true,
                message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.',
                reference: 'DR' + Date.now().toString().slice(-6),
                emailResults: results
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                    ...handleCORS(request, env)
                }
            });
            
        } catch (error) {
            console.error('Worker error:', error);
            
            return new Response(JSON.stringify({
                success: false,
                error: 'Internal server error',
                message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
                debug: env.NODE_ENV === 'development' ? error.message : undefined
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...handleCORS(request, env)
                }
            });
        }
    }
};