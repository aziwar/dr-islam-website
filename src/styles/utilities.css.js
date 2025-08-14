// UTILITIES.CSS.JS - Utility classes and helpers (≤5KB)
// Modern utility system with logical properties and responsive variants

export const UTILITIES_CSS = `
/* Continue CSS Layers from other stylesheets */
@layer utility-spacing, utility-layout, utility-typography, utility-colors, utility-responsive;

/* Utility Spacing - Logical properties for modern CSS */
@layer utility-spacing {
  /* Margin utilities with logical properties */
  .m-0 { margin: 0; }
  .m-auto { margin: auto; }
  
  .mt-0 { margin-block-start: 0; }
  .mt-xs { margin-block-start: var(--space-xs); }
  .mt-sm { margin-block-start: var(--space-sm); }
  .mt-md { margin-block-start: var(--space-md); }
  .mt-lg { margin-block-start: var(--space-lg); }
  .mt-xl { margin-block-start: var(--space-xl); }
  .mt-2xl { margin-block-start: var(--space-2xl); }
  .mt-3xl { margin-block-start: var(--space-3xl); }
  
  .mb-0 { margin-block-end: 0; }
  .mb-xs { margin-block-end: var(--space-xs); }
  .mb-sm { margin-block-end: var(--space-sm); }
  .mb-md { margin-block-end: var(--space-md); }
  .mb-lg { margin-block-end: var(--space-lg); }
  .mb-xl { margin-block-end: var(--space-xl); }
  .mb-2xl { margin-block-end: var(--space-2xl); }
  .mb-3xl { margin-block-end: var(--space-3xl); }
  
  .ms-0 { margin-inline-start: 0; }
  .ms-auto { margin-inline-start: auto; }
  .ms-xs { margin-inline-start: var(--space-xs); }
  .ms-sm { margin-inline-start: var(--space-sm); }
  .ms-md { margin-inline-start: var(--space-md); }
  .ms-lg { margin-inline-start: var(--space-lg); }
  
  .me-0 { margin-inline-end: 0; }
  .me-auto { margin-inline-end: auto; }
  .me-xs { margin-inline-end: var(--space-xs); }
  .me-sm { margin-inline-end: var(--space-sm); }
  .me-md { margin-inline-end: var(--space-md); }
  .me-lg { margin-inline-end: var(--space-lg); }
  
  .mx-0 { margin-inline: 0; }
  .mx-auto { margin-inline: auto; }
  .mx-xs { margin-inline: var(--space-xs); }
  .mx-sm { margin-inline: var(--space-sm); }
  .mx-md { margin-inline: var(--space-md); }
  .mx-lg { margin-inline: var(--space-lg); }
  
  .my-0 { margin-block: 0; }
  .my-xs { margin-block: var(--space-xs); }
  .my-sm { margin-block: var(--space-sm); }
  .my-md { margin-block: var(--space-md); }
  .my-lg { margin-block: var(--space-lg); }
  .my-xl { margin-block: var(--space-xl); }
  
  /* Padding utilities with logical properties */
  .p-0 { padding: 0; }
  
  .pt-0 { padding-block-start: 0; }
  .pt-xs { padding-block-start: var(--space-xs); }
  .pt-sm { padding-block-start: var(--space-sm); }
  .pt-md { padding-block-start: var(--space-md); }
  .pt-lg { padding-block-start: var(--space-lg); }
  .pt-xl { padding-block-start: var(--space-xl); }
  .pt-2xl { padding-block-start: var(--space-2xl); }
  .pt-3xl { padding-block-start: var(--space-3xl); }
  
  .pb-0 { padding-block-end: 0; }
  .pb-xs { padding-block-end: var(--space-xs); }
  .pb-sm { padding-block-end: var(--space-sm); }
  .pb-md { padding-block-end: var(--space-md); }
  .pb-lg { padding-block-end: var(--space-lg); }
  .pb-xl { padding-block-end: var(--space-xl); }
  .pb-2xl { padding-block-end: var(--space-2xl); }
  .pb-3xl { padding-block-end: var(--space-3xl); }
  
  .ps-0 { padding-inline-start: 0; }
  .ps-xs { padding-inline-start: var(--space-xs); }
  .ps-sm { padding-inline-start: var(--space-sm); }
  .ps-md { padding-inline-start: var(--space-md); }
  .ps-lg { padding-inline-start: var(--space-lg); }
  
  .pe-0 { padding-inline-end: 0; }
  .pe-xs { padding-inline-end: var(--space-xs); }
  .pe-sm { padding-inline-end: var(--space-sm); }
  .pe-md { padding-inline-end: var(--space-md); }
  .pe-lg { padding-inline-end: var(--space-lg); }
  
  .px-0 { padding-inline: 0; }
  .px-xs { padding-inline: var(--space-xs); }
  .px-sm { padding-inline: var(--space-sm); }
  .px-md { padding-inline: var(--space-md); }
  .px-lg { padding-inline: var(--space-lg); }
  .px-xl { padding-inline: var(--space-xl); }
  
  .py-0 { padding-block: 0; }
  .py-xs { padding-block: var(--space-xs); }
  .py-sm { padding-block: var(--space-sm); }
  .py-md { padding-block: var(--space-md); }
  .py-lg { padding-block: var(--space-lg); }
  .py-xl { padding-block: var(--space-xl); }
}

/* Utility Layout - Modern layout utilities */
@layer utility-layout {
  /* Display utilities */
  .block { display: block; }
  .inline { display: inline; }
  .inline-block { display: inline-block; }
  .flex { display: flex; }
  .inline-flex { display: inline-flex; }
  .grid { display: grid; }
  .inline-grid { display: inline-grid; }
  .hidden { display: none; }
  
  /* Flexbox utilities */
  .flex-row { flex-direction: row; }
  .flex-row-reverse { flex-direction: row-reverse; }
  .flex-col { flex-direction: column; }
  .flex-col-reverse { flex-direction: column-reverse; }
  
  .flex-wrap { flex-wrap: wrap; }
  .flex-nowrap { flex-wrap: nowrap; }
  .flex-wrap-reverse { flex-wrap: wrap-reverse; }
  
  .items-start { align-items: flex-start; }
  .items-end { align-items: flex-end; }
  .items-center { align-items: center; }
  .items-baseline { align-items: baseline; }
  .items-stretch { align-items: stretch; }
  
  .justify-start { justify-content: flex-start; }
  .justify-end { justify-content: flex-end; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .justify-around { justify-content: space-around; }
  .justify-evenly { justify-content: space-evenly; }
  
  .content-start { align-content: flex-start; }
  .content-end { align-content: flex-end; }
  .content-center { align-content: center; }
  .content-between { align-content: space-between; }
  .content-around { align-content: space-around; }
  .content-evenly { align-content: space-evenly; }
  
  .self-auto { align-self: auto; }
  .self-start { align-self: flex-start; }
  .self-end { align-self: flex-end; }
  .self-center { align-self: center; }
  .self-stretch { align-self: stretch; }
  .self-baseline { align-self: baseline; }
  
  .flex-1 { flex: 1 1 0%; }
  .flex-auto { flex: 1 1 auto; }
  .flex-initial { flex: 0 1 auto; }
  .flex-none { flex: none; }
  
  .grow { flex-grow: 1; }
  .grow-0 { flex-grow: 0; }
  .shrink { flex-shrink: 1; }
  .shrink-0 { flex-shrink: 0; }
  
  /* Grid utilities */
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  
  .grid-rows-1 { grid-template-rows: repeat(1, minmax(0, 1fr)); }
  .grid-rows-2 { grid-template-rows: repeat(2, minmax(0, 1fr)); }
  .grid-rows-3 { grid-template-rows: repeat(3, minmax(0, 1fr)); }
  .grid-rows-4 { grid-template-rows: repeat(4, minmax(0, 1fr)); }
  .grid-rows-5 { grid-template-rows: repeat(5, minmax(0, 1fr)); }
  .grid-rows-6 { grid-template-rows: repeat(6, minmax(0, 1fr)); }
  
  .col-auto { grid-column: auto; }
  .col-span-1 { grid-column: span 1 / span 1; }
  .col-span-2 { grid-column: span 2 / span 2; }
  .col-span-3 { grid-column: span 3 / span 3; }
  .col-span-4 { grid-column: span 4 / span 4; }
  .col-span-5 { grid-column: span 5 / span 5; }
  .col-span-6 { grid-column: span 6 / span 6; }
  .col-span-full { grid-column: 1 / -1; }
  
  .row-auto { grid-row: auto; }
  .row-span-1 { grid-row: span 1 / span 1; }
  .row-span-2 { grid-row: span 2 / span 2; }
  .row-span-3 { grid-row: span 3 / span 3; }
  .row-span-4 { grid-row: span 4 / span 4; }
  .row-span-5 { grid-row: span 5 / span 5; }
  .row-span-6 { grid-row: span 6 / span 6; }
  .row-span-full { grid-row: 1 / -1; }
  
  .gap-0 { gap: 0; }
  .gap-xs { gap: var(--space-xs); }
  .gap-sm { gap: var(--space-sm); }
  .gap-md { gap: var(--space-md); }
  .gap-lg { gap: var(--space-lg); }
  .gap-xl { gap: var(--space-xl); }
  .gap-2xl { gap: var(--space-2xl); }
  
  .gap-x-0 { column-gap: 0; }
  .gap-x-xs { column-gap: var(--space-xs); }
  .gap-x-sm { column-gap: var(--space-sm); }
  .gap-x-md { column-gap: var(--space-md); }
  .gap-x-lg { column-gap: var(--space-lg); }
  .gap-x-xl { column-gap: var(--space-xl); }
  
  .gap-y-0 { row-gap: 0; }
  .gap-y-xs { row-gap: var(--space-xs); }
  .gap-y-sm { row-gap: var(--space-sm); }
  .gap-y-md { row-gap: var(--space-md); }
  .gap-y-lg { row-gap: var(--space-lg); }
  .gap-y-xl { row-gap: var(--space-xl); }
  
  /* Position utilities */
  .static { position: static; }
  .fixed { position: fixed; }
  .absolute { position: absolute; }
  .relative { position: relative; }
  .sticky { position: sticky; }
  
  /* Inset utilities - Using logical properties */
  .inset-0 { inset: 0; }
  .inset-auto { inset: auto; }
  
  .top-0 { inset-block-start: 0; }
  .top-auto { inset-block-start: auto; }
  .bottom-0 { inset-block-end: 0; }
  .bottom-auto { inset-block-end: auto; }
  
  .start-0 { inset-inline-start: 0; }
  .start-auto { inset-inline-start: auto; }
  .end-0 { inset-inline-end: 0; }
  .end-auto { inset-inline-end: auto; }
  
  /* Size utilities */
  .w-auto { width: auto; }
  .w-full { width: 100%; }
  .w-screen { width: 100vw; }
  .w-min { width: min-content; }
  .w-max { width: max-content; }
  .w-fit { width: fit-content; }
  
  .h-auto { height: auto; }
  .h-full { height: 100%; }
  .h-screen { height: 100vh; }
  .h-min { height: min-content; }
  .h-max { height: max-content; }
  .h-fit { height: fit-content; }
  
  .min-w-0 { min-width: 0; }
  .min-w-full { min-width: 100%; }
  .min-w-min { min-width: min-content; }
  .min-w-max { min-width: max-content; }
  .min-w-fit { min-width: fit-content; }
  
  .max-w-none { max-width: none; }
  .max-w-xs { max-width: 20rem; }
  .max-w-sm { max-width: 24rem; }
  .max-w-md { max-width: 28rem; }
  .max-w-lg { max-width: 32rem; }
  .max-w-xl { max-width: 36rem; }
  .max-w-2xl { max-width: 42rem; }
  .max-w-3xl { max-width: 48rem; }
  .max-w-4xl { max-width: 56rem; }
  .max-w-5xl { max-width: 64rem; }
  .max-w-6xl { max-width: 72rem; }
  .max-w-7xl { max-width: 80rem; }
  .max-w-full { max-width: 100%; }
  
  .min-h-0 { min-height: 0; }
  .min-h-full { min-height: 100%; }
  .min-h-screen { min-height: 100vh; }
  
  .max-h-full { max-height: 100%; }
  .max-h-screen { max-height: 100vh; }
  
  /* Overflow utilities */
  .overflow-auto { overflow: auto; }
  .overflow-hidden { overflow: hidden; }
  .overflow-clip { overflow: clip; }
  .overflow-visible { overflow: visible; }
  .overflow-scroll { overflow: scroll; }
  
  .overflow-x-auto { overflow-x: auto; }
  .overflow-x-hidden { overflow-x: hidden; }
  .overflow-x-clip { overflow-x: clip; }
  .overflow-x-visible { overflow-x: visible; }
  .overflow-x-scroll { overflow-x: scroll; }
  
  .overflow-y-auto { overflow-y: auto; }
  .overflow-y-hidden { overflow-y: hidden; }
  .overflow-y-clip { overflow-y: clip; }
  .overflow-y-visible { overflow-y: visible; }
  .overflow-y-scroll { overflow-y: scroll; }
  
  /* Z-index utilities */
  .z-0 { z-index: 0; }
  .z-10 { z-index: 10; }
  .z-20 { z-index: 20; }
  .z-30 { z-index: 30; }
  .z-40 { z-index: 40; }
  .z-50 { z-index: 50; }
  .z-auto { z-index: auto; }
}

/* Utility Typography - Text utilities */
@layer utility-typography {
  /* Font family utilities */
  .font-sans { font-family: var(--font-sans); }
  .font-serif { font-family: var(--font-serif); }
  .font-mono { font-family: var(--font-mono); }
  
  /* Font size utilities */
  .text-xs { font-size: var(--text-xs); }
  .text-sm { font-size: var(--text-sm); }
  .text-base { font-size: var(--text-base); }
  .text-lg { font-size: var(--text-lg); }
  .text-xl { font-size: var(--text-xl); }
  .text-2xl { font-size: var(--text-2xl); }
  .text-3xl { font-size: var(--text-3xl); }
  .text-4xl { font-size: var(--text-4xl); }
  .text-5xl { font-size: var(--text-5xl); }
  
  /* Font weight utilities */
  .font-thin { font-weight: 100; }
  .font-extralight { font-weight: 200; }
  .font-light { font-weight: 300; }
  .font-normal { font-weight: 400; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .font-extrabold { font-weight: 800; }
  .font-black { font-weight: 900; }
  
  /* Line height utilities */
  .leading-none { line-height: 1; }
  .leading-tight { line-height: 1.25; }
  .leading-snug { line-height: 1.375; }
  .leading-normal { line-height: 1.5; }
  .leading-relaxed { line-height: 1.625; }
  .leading-loose { line-height: 2; }
  
  /* Letter spacing utilities */
  .tracking-tighter { letter-spacing: -0.05em; }
  .tracking-tight { letter-spacing: -0.025em; }
  .tracking-normal { letter-spacing: 0em; }
  .tracking-wide { letter-spacing: 0.025em; }
  .tracking-wider { letter-spacing: 0.05em; }
  .tracking-widest { letter-spacing: 0.1em; }
  
  /* Text alignment utilities - Logical properties aware */
  .text-start { text-align: start; }
  .text-end { text-align: end; }
  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-justify { text-align: justify; }
  
  /* Text decoration utilities */
  .underline { text-decoration-line: underline; }
  .overline { text-decoration-line: overline; }
  .line-through { text-decoration-line: line-through; }
  .no-underline { text-decoration-line: none; }
  
  /* Text transform utilities */
  .uppercase { text-transform: uppercase; }
  .lowercase { text-transform: lowercase; }
  .capitalize { text-transform: capitalize; }
  .normal-case { text-transform: none; }
  
  /* Text overflow utilities */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .text-ellipsis { text-overflow: ellipsis; }
  .text-clip { text-overflow: clip; }
  
  /* White space utilities */
  .whitespace-normal { white-space: normal; }
  .whitespace-nowrap { white-space: nowrap; }
  .whitespace-pre { white-space: pre; }
  .whitespace-pre-line { white-space: pre-line; }
  .whitespace-pre-wrap { white-space: pre-wrap; }
  
  /* Word break utilities */
  .break-normal { overflow-wrap: normal; word-break: normal; }
  .break-words { overflow-wrap: break-word; }
  .break-all { word-break: break-all; }
}

/* Utility Colors - Color utilities */
@layer utility-colors {
  /* Text colors */
  .text-primary { color: var(--primary); }
  .text-secondary { color: var(--secondary); }
  .text-success { color: var(--success); }
  .text-warning { color: var(--warning); }
  .text-error { color: var(--error); }
  .text-info { color: var(--info); }
  
  .text-dark { color: var(--text-dark); }
  .text-light { color: var(--text-light); }
  .text-muted { color: var(--text-muted); }
  .text-inverse { color: var(--text-inverse); }
  
  .text-white { color: var(--white); }
  .text-black { color: var(--black); }
  
  /* Background colors */
  .bg-primary { background-color: var(--primary); }
  .bg-secondary { background-color: var(--secondary); }
  .bg-success { background-color: var(--success); }
  .bg-warning { background-color: var(--warning); }
  .bg-error { background-color: var(--error); }
  .bg-info { background-color: var(--info); }
  
  .bg-white { background-color: var(--white); }
  .bg-black { background-color: var(--black); }
  .bg-transparent { background-color: transparent; }
  
  /* Border colors */
  .border-primary { border-color: var(--primary); }
  .border-secondary { border-color: var(--secondary); }
  .border-success { border-color: var(--success); }
  .border-warning { border-color: var(--warning); }
  .border-error { border-color: var(--error); }
  .border-info { border-color: var(--info); }
  
  .border-gray-100 { border-color: #f7fafc; }
  .border-gray-200 { border-color: #edf2f7; }
  .border-gray-300 { border-color: #e2e8f0; }
  .border-gray-400 { border-color: #cbd5e0; }
  .border-gray-500 { border-color: #a0aec0; }
  
  .border-transparent { border-color: transparent; }
}

/* Utility Responsive - Container query utilities */
@layer utility-responsive {
  /* Container utilities */
  .container-xs { container-type: inline-size; max-width: 375px; }
  .container-sm { container-type: inline-size; max-width: 640px; }
  .container-md { container-type: inline-size; max-width: 768px; }
  .container-lg { container-type: inline-size; max-width: 1024px; }
  .container-xl { container-type: inline-size; max-width: 1280px; }
  .container-2xl { container-type: inline-size; max-width: 1536px; }
  
  .container-query { container-type: inline-size; }
  .container-size { container-type: size; }
  .container-normal { container-type: normal; }
  
  /* Aspect ratio utilities */
  .aspect-square { aspect-ratio: 1 / 1; }
  .aspect-video { aspect-ratio: 16 / 9; }
  .aspect-photo { aspect-ratio: 4 / 3; }
  .aspect-golden { aspect-ratio: 1.618 / 1; }
  .aspect-auto { aspect-ratio: auto; }
  
  /* Object fit utilities */
  .object-contain { object-fit: contain; }
  .object-cover { object-fit: cover; }
  .object-fill { object-fit: fill; }
  .object-none { object-fit: none; }
  .object-scale-down { object-fit: scale-down; }
  
  .object-bottom { object-position: bottom; }
  .object-center { object-position: center; }
  .object-left { object-position: left; }
  .object-left-bottom { object-position: left bottom; }
  .object-left-top { object-position: left top; }
  .object-right { object-position: right; }
  .object-right-bottom { object-position: right bottom; }
  .object-right-top { object-position: right top; }
  .object-top { object-position: top; }
}

/* Touch utilities */
.touch-none { touch-action: none; }
.touch-pan-x { touch-action: pan-x; }
.touch-pan-y { touch-action: pan-y; }
.touch-manipulation { touch-action: manipulation; }

/* Scrolling utilities */
.scroll-smooth { scroll-behavior: smooth; }
.scroll-auto { scroll-behavior: auto; }

/* Screen reader utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Focus utilities */
.focus\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\:ring:focus { outline: 2px solid transparent; outline-offset: 2px; box-shadow: 0 0 0 3px rgb(var(--primary-rgb) / 0.5); }
.focus\:ring-primary:focus { box-shadow: 0 0 0 3px rgb(var(--primary-rgb) / 0.5); }

/* Hover utilities (only apply on devices that support hover) */
@media (hover: hover) {
  .hover\:bg-primary:hover { background-color: var(--primary); }
  .hover\:text-primary:hover { color: var(--primary); }
  .hover\:scale-105:hover { transform: scale(1.05); }
  .hover\:shadow-lg:hover { box-shadow: var(--shadow-lg); }
}

/* Container query breakpoint utilities */
@container (min-width: 320px) {
  .cq-xs\:block { display: block; }
  .cq-xs\:flex { display: flex; }
  .cq-xs\:grid { display: grid; }
  .cq-xs\:hidden { display: none; }
}

@container (min-width: 640px) {
  .cq-sm\:block { display: block; }
  .cq-sm\:flex { display: flex; }
  .cq-sm\:grid { display: grid; }
  .cq-sm\:hidden { display: none; }
  .cq-sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@container (min-width: 768px) {
  .cq-md\:block { display: block; }
  .cq-md\:flex { display: flex; }
  .cq-md\:grid { display: grid; }
  .cq-md\:hidden { display: none; }
  .cq-md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@container (min-width: 1024px) {
  .cq-lg\:block { display: block; }
  .cq-lg\:flex { display: flex; }
  .cq-lg\:grid { display: grid; }
  .cq-lg\:hidden { display: none; }
  .cq-lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Performance utilities */
.gpu-accelerated {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.contain-layout { contain: layout; }
.contain-style { contain: style; }
.contain-paint { contain: paint; }
.contain-strict { contain: strict; }

/* Modern CSS features */
.supports-backdrop-filter { 
  backdrop-filter: blur(10px);
}

.supports-container-queries {
  container-type: inline-size;
}

/* Fallbacks for older browsers */
@supports not (container-type: inline-size) {
  .cq-sm\:grid-cols-2,
  .cq-md\:grid-cols-3,
  .cq-lg\:grid-cols-4 {
    /* Fallback to regular breakpoints */
    display: grid;
  }
  
  @media (min-width: 640px) {
    .cq-sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  
  @media (min-width: 768px) {
    .cq-md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  
  @media (min-width: 1024px) {
    .cq-lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
}
`;

// Auto-inject utilities CSS (loaded last)
if (typeof document !== 'undefined') {
  const loadUtilitiesCSS = () => {
    if (document.getElementById('utilities-css')) return;
    
    const style = document.createElement('style');
    style.id = 'utilities-css';
    style.innerHTML = UTILITIES_CSS;
    document.head.appendChild(style);
  };
  
  // Load after other CSS files
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(loadUtilitiesCSS, 150));
  } else {
    setTimeout(loadUtilitiesCSS, 150);
  }
}