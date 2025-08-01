// PWA and Install Prompt CSS Module
export const PWA_CSS = `
/* PWA Install Prompt */
.install-prompt {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 400px;
    width: 90%;
    display: none;
    animation: slideUp 0.3s ease-out;
}

.install-prompt.show {
    display: block;
}

.install-prompt h3 {
    margin: 0 0 10px 0;
    color: var(--primary);
    font-size: 1.2rem;
}

.install-prompt p {
    margin: 0 0 20px 0;
    color: var(--text);
    font-size: 0.95rem;
}

.install-prompt button {
    padding: 10px 20px;
    margin: 0 10px 0 0;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    min-height: 44px;
}

.install-prompt button:first-of-type {
    background: var(--primary);
    color: white;
}

.install-prompt button:first-of-type:hover {
    background: var(--secondary);
}

.install-prompt button:last-of-type {
    background: transparent;
    color: var(--text);
    border: 1px solid #ddd;
}

@keyframes slideUp {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}
`;