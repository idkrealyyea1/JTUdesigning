/* ============================================
   JUTHOOR TUFT — GALLERY & LIGHTBOX
   ============================================ */

// Gallery items — SVG rug art with varied heights for masonry
const galleryItems = [
  { id: 'g1',  img: 'https://images.unsplash.com/photo-1676557078316-eb85791d3cb0?w=800&q=80&fit=crop' },
  { id: 'g2',  img: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=800&q=80&fit=crop' },
  { id: 'g3',  img: 'https://images.unsplash.com/photo-1680633480092-fe3d1c0a164a?w=800&q=80&fit=crop' },
  { id: 'g4',  img: 'https://images.unsplash.com/photo-1756361771374-8796aab066da?w=800&q=80&fit=crop' },
  { id: 'g5',  img: 'https://images.unsplash.com/photo-1580661485007-c7d629416f73?w=800&q=80&fit=crop' },
  { id: 'g6',  img: 'https://images.unsplash.com/photo-1565508644803-61d8ea2795b7?w=800&q=80&fit=crop' },
  { id: 'g7',  img: 'https://images.unsplash.com/photo-1765802536365-e2267a489a2c?w=800&q=80&fit=crop' },
  { id: 'g8',  img: 'https://images.unsplash.com/photo-1700606874696-9974eb24ff5a?w=800&q=80&fit=crop' },
  { id: 'g9',  img: 'https://images.unsplash.com/photo-1726208209286-cd879d9c1415?w=800&q=80&fit=crop' },
  { id: 'g10', img: 'https://images.unsplash.com/photo-1770545289310-d5bf9bfb4045?w=800&q=80&fit=crop' },
  { id: 'g11', img: 'https://images.unsplash.com/photo-1774505841514-264b1d2f69a2?w=800&q=80&fit=crop' },
  { id: 'g12', img: 'https://images.unsplash.com/photo-1550376026-7375b92bb318?w=800&q=80&fit=crop' },
];

// Reuse the SVG generator from products.js
function makeGallerySVG(item) {
  const { id, shape, ar, bands, fringe } = item;
  const W = 300, H = Math.round(W * ar);
  const fringeH = fringe ? 50 : 0;
  const drawH = H - fringeH;

  function getClip() {
    switch (shape) {
      case 'wide':
        return `M 15 30 Q 80 10 150 18 Q 220 26 285 15 Q 298 50 295 ${H-40} Q 290 ${H-10} 220 ${H-5} Q 150 ${H} 80 ${H-8} Q 20 ${H-15} 5 ${H-50} Q -5 ${H/2} 15 30Z`;
      case 'runner':
        return `M 20 25 Q 60 10 100 18 Q 140 26 175 12 Q 200 5 215 22 Q 225 40 222 ${H-60} Q 220 ${H-20} 200 ${H-10} Q 150 ${H-2} 100 ${H} Q 55 ${H-4} 30 ${H-18} Q 8 ${H-38} 5 ${H-80} Q -2 ${H/2} 20 25Z`;
      default:
        return `M 30 20 Q 90 5 160 15 Q 220 25 268 10 Q 290 28 285 80 Q 280 140 292 200 Q 300 260 288 320 Q 272 ${H-60} 270 ${H-20} Q 230 ${H+2} 150 ${H-5} Q 80 ${H} 40 ${H-12} Q 8 ${H-30} 12 ${H-90} Q 16 ${H-150} 5 200 Q -5 140 10 80 Q 20 40 30 20Z`;
    }
  }

  const bandCount = bands.length;
  const bandH = drawH / bandCount;

  let bandPaths = '';
  for (let i = 0; i < bandCount; i++) {
    const y1 = i * bandH;
    const y2 = (i + 1) * bandH;
    const waveAmp = 8 + Math.sin(i * 1.3) * 6;
    const cp1y = y1 + waveAmp, cp2y = y1 - waveAmp;
    bandPaths += `<path d="M 0 ${y2} L ${W} ${y2} L ${W} ${y1} Q ${W*0.75} ${cp1y} ${W*0.5} ${cp2y} Q ${W*0.25} ${cp1y-2} 0 ${y1} Z" fill="${bands[i]}"/>`;
  }

  let fringeLines = '';
  if (fringe) {
    const fc = bands[bands.length - 1];
    for (let x = 18; x < W - 10; x += 10) {
      const len = 28 + (x % 20);
      fringeLines += `<line x1="${x}" y1="${drawH}" x2="${x + (x%7-3)}" y2="${drawH + len}" stroke="${fc}" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>`;
    }
  }

  return `<svg viewBox="0 0 ${W} ${H+fringeH}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;">
  <defs><clipPath id="gc-${id}"><path d="${getClip()}"/></clipPath></defs>
  <g clip-path="url(#gc-${id})">
    <rect width="${W}" height="${H}" fill="${bands[0]}"/>
    ${bandPaths}
    <g opacity="0.06">${Array.from({length:bandCount},(_,i)=>`<path d="M 20 ${i*bandH+bandH/2} Q ${W*.4} ${i*bandH+bandH/2-5} ${W*.6} ${i*bandH+bandH/2+4} Q ${W*.8} ${i*bandH+bandH/2-3} ${W-20} ${i*bandH+bandH/2}" stroke="white" stroke-width="1" fill="none"/>`).join('')}</g>
  </g>
  ${fringeLines}
</svg>`;
}

let lightboxIndex = 0;

function renderGallery() {
  const grid = document.getElementById('masonry-grid');
  if (!grid) return;
  grid.innerHTML = '';

  galleryItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'masonry-item';
    div.dataset.idx = idx;
    div.innerHTML = `
      <img src="${item.img}" alt="Gallery ${idx + 1}" style="width:100%;display:block;" loading="lazy">
      <div class="masonry-overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>`;
    div.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(div);
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLightboxImage();
}

function updateLightboxImage() {
  const wrap = document.getElementById('lightbox-image-wrap');
  const counter = document.getElementById('lightbox-counter');
  const item = galleryItems[lightboxIndex];
  if (!item) return;
  wrap.style.transform = 'scale(0.92)';
  setTimeout(() => {
    wrap.innerHTML = `<img src="${item.img}" alt="Gallery ${lightboxIndex + 1}" style="width:100%;max-height:85vh;object-fit:contain;display:block;">`;
    wrap.style.transform = 'scale(1)';
    wrap.style.transition = 'transform 0.3s ease';
    setTimeout(() => { wrap.style.transition = ''; }, 350);
  }, 120);
  counter.textContent = `${lightboxIndex + 1} / ${galleryItems.length}`;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function initGallery() {
  renderGallery();

  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.getElementById('lightbox-prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  });
  document.getElementById('lightbox-next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % galleryItems.length;
    updateLightboxImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length; updateLightboxImage(); }
    if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % galleryItems.length; updateLightboxImage(); }
  });

  // Touch swipe support
  let touchStartX = 0;
  lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      lightboxIndex = dx > 0
        ? (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
        : (lightboxIndex + 1) % galleryItems.length;
      updateLightboxImage();
    }
  });
}

document.addEventListener('DOMContentLoaded', initGallery);
