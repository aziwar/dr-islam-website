// Gallery and Visual Effects CSS Module (~350 lines)
export const GALLERY_CSS = `
/* Enhanced Gallery */
.gallery {
    padding: 80px 5%;
    background: var(--light);
}

.gallery h2 {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

.gallery-subtitle {
    text-align: center;
    color: var(--text);
    margin-bottom: 3rem;
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Gallery Filter Tabs */
.gallery-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--white);
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 176, 147, 0.3);
}

/* Enhanced Gallery Grid */
.gallery-grid.enhanced {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
}

.gallery-item {
    background: var(--white);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    position: relative;
}

.gallery-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

/* Case Images Container */
.case-images {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.case-images img {
    width: 50%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
    transition: all 0.4s ease;
}

.case-images img:first-child {
    border-right: 2px solid var(--white);
}

.gallery-item:hover .case-images img {
    filter: brightness(1.1) contrast(1.05);
}

/* Before/After Labels */
.case-images::before,
.case-images::after {
    position: absolute;
    top: 10px;
    padding: 6px 12px;
    background: rgba(0,0,0,0.7);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 15px;
    z-index: 2;
}

.case-images::before {
    content: 'قبل';
    right: 10px;
}

.case-images::after {
    content: 'بعد';
    left: 10px;
}

/* Case Information */
.case-info {
    padding: 1.5rem;
    text-align: right;
    direction: rtl;
}

.case-info h4 {
    color: var(--secondary);
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
    font-weight: 700;
}

.case-details {
    color: var(--text);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
}

.treatment-time {
    color: var(--primary);
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

/* Case Badges */
.case-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    position: absolute;
    bottom: 15px;
    left: 15px;
}

.case-badge.implant {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
}

.case-badge.cosmetic {
    background: linear-gradient(135deg, #E91E63, #C2185B);
    color: white;
}

.case-badge.orthodontic {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    color: white;
}

.case-badge.reconstruction {
    background: linear-gradient(135deg, #FF9800, #F57C00);
    color: white;
}

/* Gallery Actions */
.gallery-actions {
    text-align: center;
    margin-top: 3rem;
}

.view-more-btn {
    background: var(--primary);
    color: var(--white);
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.view-more-btn:hover {
    background: var(--secondary);
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(190, 176, 147, 0.4);
}

.view-more-btn .arrow {
    transition: transform 0.3s ease;
}

.view-more-btn:hover .arrow {
    transform: translateX(-5px);
}

.gallery-stats {
    color: var(--secondary);
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
}

/* Before/After Interactive Slider */
.before-after-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.before-after-slider {
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: var(--primary);
    cursor: ew-resize;
    transition: opacity 0.3s;
}

.before-after-slider::before {
    content: '◄ ►';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary);
    color: white;
    padding: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.gallery-item img {
    width: 50%;
    height: 200px;
    object-fit: cover;
    display: inline-block;
    transition: opacity 0.3s ease;
}

/* Gallery Skeleton Loaders */
.gallery-item.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

.gallery-item img.lazy-loading {
    opacity: 0;
}

.gallery-item img.lazy-loaded {
    opacity: 1;
}

.gallery-item p {
    padding: 1rem;
    color: var(--primary);
    font-weight: 600;
}

@keyframes skeleton-loading {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

/* Gallery hover effects */
.gallery-item {
    overflow: hidden;
}

.gallery-item img {
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* Swipeable gallery */
.gallery-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.gallery-container::-webkit-scrollbar {
    display: none;
}

.gallery-item {
    scroll-snap-align: center;
}

/* Touch feedback */
.touchable {
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
}

.touchable:active {
    opacity: 0.8;
    transform: scale(0.98);
}

/* Visual Effects and Animations */
.fade-in {
    animation: fadeIn 0.6s ease-in;
}

.slide-up {
    animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Gallery Grid */
@media (max-width: 768px) {
    .gallery-grid.enhanced {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .case-images {
        height: 180px;
    }
    
    .gallery-filters {
        justify-content: flex-start;
        overflow-x: auto;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
    }
    
    .filter-btn {
        flex-shrink: 0;
        padding: 8px 16px;
        font-size: 0.9rem;
    }
}
`;