// CRITICAL CSS FIXES NEEDED

// Current (BROKEN):
.logo {            // Missing closing brace
display: flex;
align-items: center;
}

.logo-img {        // Missing selector definition
height: 50px;
width: auto;
max-width: 200px;
object-fit: contain;
}

// Other broken selectors:
.logo-img:before   // Missing dots
.logo-img:after    // Missing dots
@media .logo-img   // Missing dots

// CORRECTED VERSION:
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img,
.logo-img {
  height: 60px;
  width: auto;
  max-width: 250px;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Fallback for broken images */
.logo-img:before {
  content: "";
  display: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .logo img,
  .logo-img {
    height: 45px;
    max-width: 180px;
  }
}