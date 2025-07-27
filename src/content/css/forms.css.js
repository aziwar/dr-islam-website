// Forms, Buttons, Animations CSS Module (~300 lines)
export const FORMS_CSS = `
/* Contact */
.contact {
    padding: 80px 5%;
    background: var(--light);
}

.contact h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 3rem;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
    margin-bottom: 3rem;
}

.contact-card {
    min-height: 60px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.contact-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.contact-card a {
    color: var(--secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    -webkit-tap-highlight-color: transparent;
}

.contact-card a:hover {
    color: var(--primary);
}

/* Contact Form */
.contact-form-section {
    background: var(--white);
    padding: 3rem 2rem;
    border-radius: 15px;
    max-width: 600px;
    margin: 3rem auto 0;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.contact-form-section h3 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    position: relative;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--light);
    border-radius: 8px;
    background: var(--white);
    font-size: 1rem;
    color: var(--text);
    transition: all 0.3s ease;
    font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    background: #fefefe;
}

.form-group label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: var(--text-light);
    font-size: 1rem;
    transition: all 0.3s ease;
    pointer-events: none;
    background: var(--white);
    padding: 0 0.5rem;
}

.form-group input:focus + label,
.form-group input.has-value + label,
.form-group select:focus + label,
.form-group select:not([value=""]) + label,
.form-group textarea:focus + label,
.form-group textarea.has-value + label {
    top: -0.5rem;
    left: 0.5rem;
    font-size: 0.875rem;
    color: var(--primary);
    font-weight: 500;
}

.form-group select {
    cursor: pointer;
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.submit-btn {
    background: var(--primary);
    color: var(--white);
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.submit-btn .btn-loading {
    display: none;
}

.submit-btn.loading .btn-text {
    display: none;
}

.submit-btn.loading .btn-loading {
    display: inline;
}

/* Form validation styles */
.form-group input:invalid:not(:focus):not(:placeholder-shown),
.form-group select:invalid:not(:focus),
.form-group textarea:invalid:not(:focus):not(:placeholder-shown) {
    border-color: #dc3545;
}

.form-group input:valid:not(:focus):not(:placeholder-shown),
.form-group select:valid:not(:focus),
.form-group textarea:valid:not(:focus):not(:placeholder-shown) {
    border-color: #28a745;
}

/* Success/Error messages */
.form-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 500;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

/* Button loading state */
.btn.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
}

.btn.loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

/* Smooth transitions */
a,
button,
.btn,
.nav-link,
.gallery-item,
.faq-item {
    transition: all 0.3s ease;
}

/* Button hover effects */
.btn:hover:not(.loading) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:active:not(.loading) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Link underline animation */
a:not(.btn):not(.nav-link) {
    position: relative;
    text-decoration: none;
}

a:not(.btn):not(.nav-link)::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
}

a:not(.btn):not(.nav-link):hover::after {
    width: 100%;
}

/* Animations */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translateY(0);
    }
    40%, 43% {
        transform: translateY(-15px);
    }
    70% {
        transform: translateY(-8px);
    }
    90% {
        transform: translateY(-3px);
    }
}

/* Form accessibility enhancements */
.form-group input[required] + label::after,
.form-group select[required] + label::after,
.form-group textarea[required] + label::after {
    content: ' *';
    color: #dc3545;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    box-shadow: 0 0 0 3px rgba(190, 176, 147, 0.1);
}

/* Error states */
.form-group.error input,
.form-group.error select,
.form-group.error textarea {
    border-color: #dc3545;
}

.form-group.error label {
    color: #dc3545;
}

.error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

/* RTL Support for Arabic */
[dir="rtl"] .form-group label {
    left: auto;
    right: 1rem;
}

[dir="rtl"] .form-group input:focus + label,
[dir="rtl"] .form-group input.has-value + label,
[dir="rtl"] .form-group select:focus + label,
[dir="rtl"] .form-group select:not([value=""]) + label,
[dir="rtl"] .form-group textarea:focus + label,
[dir="rtl"] .form-group textarea.has-value + label {
    left: auto;
    right: 0.5rem;
}

/* Responsive form layout */
@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .contact-form-section {
        padding: 2rem 1rem;
        margin: 2rem 1rem 0;
    }
    
    .contact-info {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
`;