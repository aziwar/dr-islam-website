export default {
  async fetch(request) {
    return new Response(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دكتور اسلام الصغير - طبيب أسنان وزراعة</title>
    <style>
        :root{--primary:#BEB093;--secondary:#777669;--white:#FFF;--light:#F8F7F5;--text:#333}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;color:var(--text);line-height:1.6;direction:rtl}
        header{background:#fff;box-shadow:0 2px 5px rgba(0,0,0,0.1);position:sticky;top:0;z-index:100}
        nav{display:flex;justify-content:space-between;align-items:center;padding:1rem 5%;max-width:1200px;margin:0 auto}
        nav ul{display:flex;list-style:none;gap:2rem}
        nav a{text-decoration:none;color:var(--secondary);font-weight:500}
        .hero{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;padding:100px 5%;text-align:center}
        .container{max-width:1200px;margin:0 auto}
        h1{font-size:2.5rem;margin-bottom:1rem}
        .subtitle{font-size:1.2rem;margin-bottom:2rem}
        .cta-button{display:inline-block;background:#fff;color:var(--secondary);padding:15px 30px;border-radius:5px;text-decoration:none;font-weight:bold}
        .services{padding:80px 5%;background:var(--light)}
        h2{font-size:2rem;text-align:center;color:var(--secondary);margin-bottom:3rem}
        .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem}
        .service-card{background:#fff;padding:2rem;border-radius:10px;box-shadow:0 3px 10px rgba(0,0,0,0.1);text-align:center}
        .about{padding:80px 5%}
        .contact{padding:80px 5%;background:var(--light)}
        footer{background:var(--secondary);color:#fff;text-align:center;padding:20px}
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Dr. Islam Elsagher</div>
            <ul>
                <li><a href="#services">الخدمات</a></li>
                <li><a href="#about">عن الطبيب</a></li>
                <li><a href="#contact">اتصل بنا</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero">
        <div class="container">
            <h1>دكتور اسلام رمضان الصغير</h1>
            <p class="subtitle">طبيب أسنان عام / أخصائي زراعة الأسنان</p>
            <a href="https://wa.me/96598563711" class="cta-button">احجز موعدك الآن</a>
        </div>
    </section>
    <section id="services" class="services">
        <div class="container">
            <h2>خدماتنا</h2>
            <div class="services-grid">
                <div class="service-card"><h3>زراعة الأسنان</h3><p>زراعة فورية ومتأخرة بأحدث التقنيات</p></div>
                <div class="service-card"><h3>علاج الجذور</h3><p>علاج متخصص لقنوات الجذور</p></div>
                <div class="service-card"><h3>التركيبات</h3><p>تركيبات ثابتة ومتحركة</p></div>
                <div class="service-card"><h3>جراحة الأسنان</h3><p>خلع جراحي وعمليات متقدمة</p></div>
                <div class="service-card"><h3>تجميل الأسنان</h3><p>ابتسامة هوليوود وتبييض</p></div>
                <div class="service-card"><h3>علاج اللثة</h3><p>علاج أمراض اللثة والأنسجة</p></div>
                <div class="service-card"><h3>الحشوات التجميلية</h3><p>حشوات بلون الأسنان الطبيعي</p></div>
                <div class="service-card"><h3>إعادة التأهيل الكامل</h3><p>علاج شامل للفم والأسنان</p></div>
            </div>
        </div>
    </section>
    <section id="about" class="about">
        <div class="container">
            <h2>عن الطبيب</h2>
            <p>أكثر من 15 عامًا من الخبرة في طب الأسنان في مصر والكويت</p>
        </div>
    </section>
    <section id="contact" class="contact">
        <div class="container">
            <h2>اتصل بنا</h2>
            <p>الهاتف: <a href="tel:+96598563711">98563711</a></p>
            <p>البريد: <a href="mailto:dr.islam_elsagher@gmail.com">dr.islam_elsagher@gmail.com</a></p>
            <p>الموقع: مدينة الكويت</p>
        </div>
    </section>
    <footer>
        <p>&copy; 2025 دكتور اسلام الصغير - جميع الحقوق محفوظة</p>
    </footer>
</body>
</html>`, {
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    });
  }
};