// Critical CSS - Only above-the-fold styles for inline inclusion
export const CRITICAL_INLINE_CSS = `
/* Essential styles for initial paint - Keep under 14KB */

/* CSS Variables */
:root {
    --primary: #BEB093;
    --secondary: #777669;
    --white: #FFFFFF;
    --light: #F8F7F5;
    --text: #333333;
    --emergency: #c41e3a;
    --success: #28a745;
}

/* Base reset - Only for critical elements */
*,*::before,*::after{box-sizing:border-box}
html{font-size:16px;scroll-behavior:smooth}
body{margin:0;font-family:'Noto Kufi Arabic','Poppins',sans-serif;color:var(--text);line-height:1.6;direction:rtl}

/* Emergency Banner - Critical for immediate visibility */
.emergency-banner{
    background:var(--emergency);
    color:var(--white);
    text-align:center;
    padding:10px;
    font-weight:500;
    font-size:1.125rem;
    position:sticky;
    top:0;
    z-index:101;
}
.emergency-banner a{color:var(--white);font-weight:bold;text-decoration:underline}

/* Header - Critical for navigation */
header{
    background:rgba(255,255,255,0.85);
    backdrop-filter:blur(10px);
    box-shadow:0 8px 32px rgba(0,0,0,0.1);
    position:sticky;
    top:40px;
    z-index:100;
}

nav{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:1rem 5%;
    max-width:1200px;
    margin:0 auto;
}

.logo{display:flex;align-items:center;min-height:48px}
.logo-img{height:80px;width:80px;object-fit:contain}

/* Mobile menu toggle - Critical for mobile navigation */
.mobile-menu-toggle{
    display:none;
    background:none;
    border:none;
    cursor:pointer;
    padding:12px;
    min-height:48px;
    min-width:48px;
    z-index:1001;
}

.mobile-menu-toggle span{
    display:block;
    width:25px;
    height:3px;
    background:var(--secondary);
    margin:5px 0;
    transition:0.3s;
}

/* Desktop navigation */
nav ul{
    display:flex;
    list-style:none;
    gap:1.5rem;
    margin:0;
    padding:0;
}

nav a{
    text-decoration:none;
    color:var(--secondary);
    font-weight:500;
    padding:8px 12px;
    min-height:44px;
    display:flex;
    align-items:center;
}

/* Hero section - Above the fold */
.hero{
    background:linear-gradient(-45deg,#BEB093,#777669,#8B7F6B,#9A8E77);
    background-size:400% 400%;
    animation:gradientShift 15s ease infinite;
    color:var(--white);
    padding:100px 5% 60px;
    text-align:center;
    min-height:60vh;
}

@keyframes gradientShift{
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

h1{font-size:2.5rem;font-weight:600;margin-bottom:1rem}
.subtitle{font-size:1.2rem;margin-bottom:1.5rem}

.trust-badges{
    display:flex;
    justify-content:center;
    gap:2rem;
    margin:2rem 0;
    flex-wrap:wrap;
}

.badge{
    background:rgba(255,255,255,0.2);
    padding:8px 20px;
    border-radius:25px;
    font-size:0.9rem;
    border:1px solid rgba(255,255,255,0.3);
}

.cta-button{
    display:inline-block;
    background:linear-gradient(135deg,var(--primary) 0%,#a89680 100%);
    color:var(--white);
    padding:18px 40px;
    border-radius:50px;
    text-decoration:none;
    font-weight:bold;
    transition:all 0.4s ease;
    box-shadow:0 5px 25px rgba(190,176,147,0.3);
    border:none;
    cursor:pointer;
}

/* Skip links - Accessibility critical */
.skip-link{
    position:absolute;
    top:-40px;
    left:0;
    background:#2c2c2c;
    color:#FFF;
    padding:8px 16px;
    text-decoration:none;
    z-index:10000;
    font-weight:600;
}
.skip-link:focus{top:0}

/* Mobile optimizations - Critical for mobile first paint */
@media (max-width:768px){
    .logo-img{height:40px;max-width:150px}
    nav > ul{display:none !important}
    .mobile-menu-toggle{display:flex !important;visibility:visible !important;opacity:1 !important}
    
    h1{font-size:2rem;line-height:1.3}
    .subtitle{font-size:1rem}
    .hero{padding:60px 5%;min-height:100vh;display:flex;align-items:center}
    .cta-button{padding:20px 45px;font-size:1.1rem;min-height:56px}
    
    header{top:35px;padding:0.5rem 5%}
    .trust-badges{flex-direction:column;gap:1rem}
    .badge{font-size:0.9rem;padding:10px 20px;width:100%;max-width:250px}
}

/* Focus states - Critical for accessibility */
:focus{
    outline:3px solid var(--primary) !important;
    outline-offset:2px !important;
}

/* Container - Layout critical */
.container{max-width:1200px;margin:0 auto;padding:0 5%}
`;