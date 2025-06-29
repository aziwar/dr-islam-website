// src/content/styles.js
export const CSS = `
:root {
    --primary-color: #BEB093;
    --secondary-color: #777669;
    --text-dark: #333;
    --text-light: #666;
    --white: #ffffff;
    --bg-light: #f8f8f8;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
}

[dir="rtl"] body {
    font-family: 'Ge ss two', -apple-system, Arial, sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
header {
    background: var(--white);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 20px;
}

.logo {
    height: 50px;
}

nav {
    display: flex;
    gap: 2rem;
}

nav a {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    transition: color 0.3s;
}
nav a:hover {
    color: var(--primary-color);
}

.lang-switch {
    background: var(--primary-color);
    color: var(--white) !important;
    padding: 0.5rem 1rem;
    border-radius: 5px;
}

.hero {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 4rem 0;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.tagline {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}
.cta-button {
    display: inline-block;
    background: var(--white);
    color: var(--primary-color);
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
}

.services {
    padding: 4rem 0;
    background: var(--bg-light);
}

.services h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--secondary-color);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
.service {
    background: var(--white);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.service:hover {
    transform: translateY(-5px);
}

.service h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.about, .contact {
    padding: 4rem 0;
}

.about h2, .contact h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--secondary-color);
}

.about ul {
    list-style: none;
    margin-top: 2rem;
}

.about ul li {
    padding: 0.5rem 0;
    padding-left: 2rem;
    position: relative;
}

.about ul li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
}

[dir="rtl"] .about ul li {
    padding-left: 0;
    padding-right: 2rem;
}

[dir="rtl"] .about ul li:before {
    left: auto;
    right: 0;
}

.contact-info {
    text-align: center;
    margin-bottom: 3rem;
}

.contact-info p {
    margin: 0.5rem 0;
}

.contact-info a {
    color: var(--primary-color);
    text-decoration: none;
}

.appointment-cta {
    text-align: center;
    background: var(--bg-light);
    padding: 2rem;
    border-radius: 10px;
}

.appointment-cta h3 {
    margin-bottom: 1rem;
}

footer {
    background: var(--secondary-color);
    color: var(--white);
    text-align: center;
    padding: 2rem 0;
}

@media (max-width: 768px) {
    nav {
        gap: 1rem;
        font-size: 0.9rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
    }
}
`;