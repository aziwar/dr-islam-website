/**
 * Email Templates Module
 * All email templates for the contact form system
 */

export const EMAIL_TEMPLATES = {
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
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 30%;">الاسم:</td>
                                <td style="padding: 8px 0; color: #666;">${data.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">الهاتف:</td>
                                <td style="padding: 8px 0; color: #666;">${data.phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #333;">البريد:</td>
                                <td style="padding: 8px 0; color: #666;">${data.email}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <!-- Service Information -->
                    <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #1976d2; margin-top: 0; font-size: 18px;">🏥 الخدمة المطلوبة</h2>
                        <p style="color: #333; font-size: 16px; margin: 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #1976d2;">
                            ${data.service}
                        </p>
                    </div>
                    
                    ${data.message ? `
                    <!-- Message -->
                    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #f57c00; margin-top: 0; font-size: 18px;">💬 رسالة إضافية</h2>
                        <p style="color: #333; line-height: 1.6; margin: 0; background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #f57c00;">
                            ${data.message}
                        </p>
                    </div>
                    ` : ''}
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            📅 تم الإرسال في: ${new Date().toLocaleString('ar-EG', { timeZone: 'Asia/Kuwait' })}
                        </p>
                        <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">
                            عيادة د. اسلام الصغير - الكويت 🇰🇼
                        </p>
                    </div>
                </div>
            </div>
        `
    }),

    // Confirmation email to patient
    TO_PATIENT: (data) => ({
        subject: 'تأكيد طلب الموعد - عيادة د. اسلام الصغير',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #2c5aa0;">
                        <h1 style="color: #2c5aa0; margin: 0; font-size: 24px;">🦷 عيادة د. اسلام الصغير</h1>
                        <p style="color: #666; margin: 5px 0 0 0;">تأكيد طلب الموعد</p>
                    </div>
                    
                    <!-- Greeting -->
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #2c5aa0; font-size: 20px; margin-bottom: 15px;">أهلاً وسهلاً ${data.name} 👋</h2>
                        <p style="color: #333; line-height: 1.6; margin: 0;">
                            شكراً لتواصلك معنا. لقد تم استلام طلب موعدك بنجاح وسيتم التواصل معك في أقرب وقت ممكن.
                        </p>
                    </div>
                    
                    <!-- Appointment Details -->
                    <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <h3 style="color: #2e7d32; margin-top: 0; font-size: 18px;">📋 تفاصيل طلب الموعد</h3>
                        <div style="background: white; padding: 15px; border-radius: 5px;">
                            <p style="margin: 0 0 10px 0; color: #333;"><strong>الخدمة:</strong> ${data.service}</p>
                            <p style="margin: 0 0 10px 0; color: #333;"><strong>الهاتف:</strong> ${data.phone}</p>
                            <p style="margin: 0; color: #333;"><strong>تاريخ الطلب:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
                        </div>
                    </div>
                    
                    <!-- Contact Info -->
                    <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <h3 style="color: #f57c00; margin-top: 0; font-size: 18px;">📞 للتواصل السريع</h3>
                        <p style="color: #333; margin: 0; line-height: 1.8;">
                            📱 واتساب: <a href="https://wa.me/96560606040" style="color: #25d366; text-decoration: none;">+965 6060 6040</a><br>
                            📧 البريد: dr.islam_elsagher@gmail.com<br>
                            🌐 الموقع: <a href="https://dr-elsagher.com" style="color: #2c5aa0; text-decoration: none;">dr-elsagher.com</a>
                        </p>
                    </div>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #2c5aa0; font-weight: bold; margin-bottom: 10px;">
                            نحن في خدمتك دائماً 🦷✨
                        </p>
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            عيادة د. اسلام الصغير - الكويت 🇰🇼
                        </p>
                    </div>
                </div>
            </div>
        `
    }),

    // Error notification template
    ERROR_NOTIFICATION: (error, data) => ({
        subject: '🚨 Contact Form Error - dr-elsagher.com',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 5px solid #ffc107;">
                    <h2 style="color: #856404; margin-top: 0;">Contact Form Error</h2>
                    <p><strong>Error:</strong> ${error}</p>
                    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
                    ${data ? `<p><strong>Data:</strong> ${JSON.stringify(data, null, 2)}</p>` : ''}
                </div>
            </div>
        `
    })
};