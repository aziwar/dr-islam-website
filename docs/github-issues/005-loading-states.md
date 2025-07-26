# Issue #5: Add Loading States for Images [P1 - HIGH]

## Problem
4MB of images load without any feedback, making site appear frozen.

## User Experience Issues
- Blank spaces during load
- Layout shifts when images appear
- No progress indication
- Poor perceived performance

## Solution Implementation

### 1. Skeleton Screens
```css
.image-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
```

### 2. Progressive Loading
```javascript
// Lazy load with IntersectionObserver
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

### 3. Loading Indicators
```html
<!-- Add to gallery items -->
<div class="gallery-item">
    <div class="spinner"></div>
    <img data-src="real-image.jpg" class="lazy">
</div>
```

## Performance Metrics
- Current: 4MB loads at once
- Target: 500KB initial, rest lazy loaded
- Expected improvement: 3s faster TTI

## Acceptance Criteria
- [ ] Skeleton screens for all images
- [ ] Lazy loading implemented
- [ ] Smooth fade-in animations
- [ ] No layout shift (CLS < 0.1)
- [ ] Loading indicators visible

**Labels:** enhancement, performance, ux
**Assignee:** @aziwar
**Milestone:** Performance Optimization
