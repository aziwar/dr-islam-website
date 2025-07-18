// Automated mobile testing with Playwright
const { chromium } = require('playwright');

async function testMobileBreakpoints() {
  const browser = await chromium.launch();
  const breakpoints = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 }
  ];

  for (const device of breakpoints) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height }
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:8787');
    
    // Test WhatsApp button position
    const whatsappBtn = await page.$('.whatsapp-float');
    const position = await whatsappBtn.boundingBox();
    console.log(`${device.name}: WhatsApp button at ${position.y}px from top`);
    
    // Test emergency banner font
    const bannerSize = await page.$eval('.emergency-banner', 
      el => window.getComputedStyle(el).fontSize
    );
    console.log(`${device.name}: Emergency banner font is ${bannerSize}`);
    
    await context.close();
  }
  
  await browser.close();
}

testMobileBreakpoints();