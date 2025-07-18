// Offline page HTML content
export const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>غير متصل - د. اسلام الصغير</title>
    <style>
        :root {
            --primary: #BEB093;
            --secondary: #777669;
            --light: #F8F7F5;
            --text: #333333;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--light);
            color: var(--text);
            direction: rtl;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }
        
        .offline-container {
            text-align: center;
            max-width: 500px;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .offline-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 40px;
        }
        
        h1 {
            color: var(--secondary);
            margin-bottom: 20px;
            font-size: 28px;
        }
        
        p {
            margin-bottom: 30px;
            line-height: 1.6;
            color: #666;
        }
        
        .retry-btn {
            background: var(--primary);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .retry-btn:hover {
            background: var(--secondary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .contact-info {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #eee;
        }
        
        .contact-info h2 {
            font-size: 18px;
            margin-bottom: 15px;
            color: var(--secondary);
        }
        
        .contact-info a {
            color: var(--primary);
            text-decoration: none;
            display: block;
            margin: 10px 0;
            font-size: 18px;
        }
        
        @media (max-width: 768px) {
            .offline-container {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="offline-icon">📵</div>
        <h1>أنت غير متصل بالإنترنت</h1>
        <p>
            يبدو أنك غير متصل بالإنترنت حالياً. 
            تحقق من اتصالك بالإنترنت وحاول مرة أخرى.
        </p>
        <button class="retry-btn" onclick="window.location.reload()">
            إعادة المحاولة
        </button>
        
        <div class="contact-info">
            <h2>للحالات الطارئة، اتصل بنا:</h2>
            <a href="tel:+96598563711">📞 98563711</a>
            <a href="https://wa.me/96598563711">💬 WhatsApp</a>
        </div>
    </div>
    
    <script>
        // Try to reconnect when online
        window.addEventListener('online', () => {
            window.location.reload();
        });
    </script>
</body>
</html>`;