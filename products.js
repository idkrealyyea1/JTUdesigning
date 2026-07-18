/* ============================================
   JUTHOOR TUFT — PRODUCTS DATA & LOGIC
   ============================================ */

// SVG rug art generator — creates landscape-style tufted rug illustrations
function makeRugSVG(config) {
  const { id, shape, bands, hasFringe, aspectRatio } = config;
  const W = 300, H = Math.round(W * aspectRatio);

  // Generate organic clip path based on shape
  function getClip() {
    switch (shape) {
      case 'wide':
        return `M 15 30 Q 80 10 150 18 Q 220 26 285 15 Q 298 50 295 ${H - 40} Q 290 ${H - 10} 220 ${H - 5} Q 150 ${H} 80 ${H - 8} Q 20 ${H - 15} 5 ${H - 50} Q -5 ${H/2} 15 30Z`;
      case 'runner':
        return `M 20 25 Q 60 10 100 18 Q 140 26 175 12 Q 200 5 215 22 Q 225 40 222 ${H - 60} Q 220 ${H - 20} 200 ${H - 10} Q 150 ${H - 2} 100 ${H} Q 55 ${H - 4} 30 ${H - 18} Q 8 ${H - 38} 5 ${H - 80} Q -2 ${H/2} 20 25Z`;
      case 'organic':
        return `M 30 20 Q 90 5 160 15 Q 220 25 268 10 Q 290 28 285 80 Q 280 140 292 200 Q 300 260 288 320 Q 272 ${H - 60} 270 ${H - 20} Q 230 ${H + 2} 150 ${H - 5} Q 80 ${H} 40 ${H - 12} Q 8 ${H - 30} 12 ${H - 90} Q 16 ${H - 150} 5 200 Q -5 140 10 80 Q 20 40 30 20Z`;
      default: // tall
        return `M 25 20 Q 75 6 150 14 Q 225 22 275 10 Q 292 28 288 80 Q 282 140 290 ${H/2} Q 298 ${H/2 + 100} 285 ${H - 60} Q 270 ${H - 10} 200 ${H - 2} Q 150 ${H + 4} 100 ${H - 4} Q 50 ${H} 20 ${H - 18} Q 2 ${H - 50} 8 ${H/2} Q 14 ${H/2 - 100} 5 80 Q -2 40 25 20Z`;
    }
  }

  // Generate wavy band path between two y positions
  function wavePath(y1, y2, waveAmp, waveOffset) {
    const amp = waveAmp || 12;
    const off = waveOffset || 0;
    const cp1x = W * 0.25, cp1y = y1 + amp + off;
    const cp2x = W * 0.5,  cp2y = y1 - amp + off;
    const cp3x = W * 0.75, cp3y = y1 + amp * 0.7 + off;
    const cp4x = W * 0.25, cp4y = y2 - amp * 0.8 + off;
    const cp5x = W * 0.6,  cp5y = y2 + amp * 0.6 + off;
    return `M 0 ${y2} L ${W} ${y2} L ${W} ${y1} Q ${cp3x} ${cp1y} ${cp2x} ${cp2y} Q ${cp1x} ${cp1y - 2} 0 ${y1} Z`;
  }

  const fringeH = hasFringe ? 50 : 0;
  const drawH = H - fringeH;
  const bandCount = bands.length;
  const bandH = drawH / bandCount;

  let bandPaths = '';
  for (let i = 0; i < bandCount; i++) {
    const y1 = i * bandH;
    const y2 = (i + 1) * bandH;
    const waveAmp = 8 + Math.sin(i * 1.3) * 6;
    const waveOff = Math.cos(i * 0.8) * 4;
    bandPaths += `<path d="${wavePath(y1, y2, waveAmp, waveOff)}" fill="${bands[i]}" />`;
  }

  // Fringe lines
  let fringe = '';
  if (hasFringe) {
    const fringeColor = bands[bands.length - 1];
    for (let x = 18; x < W - 10; x += 12) {
      const len = 30 + Math.random() * 20;
      const sway = (Math.random() - 0.5) * 8;
      fringe += `<line x1="${x}" y1="${drawH}" x2="${x + sway}" y2="${drawH + len}" stroke="${fringeColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>`;
    }
  }

  // Subtle texture overlay lines
  let texture = '';
  for (let i = 0; i < bandCount; i++) {
    const y = i * bandH + bandH / 2;
    texture += `<path d="M 20 ${y} Q ${W*0.4} ${y - 5} ${W*0.6} ${y + 4} Q ${W*0.8} ${y - 3} ${W - 20} ${y}" stroke="rgba(255,255,255,0.07)" stroke-width="1" fill="none"/>`;
  }

  return `<svg viewBox="0 0 ${W} ${H + fringeH}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;">
  <defs>
    <clipPath id="rug-clip-${id}">
      <path d="${getClip()}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#rug-clip-${id})">
    <rect width="${W}" height="${H}" fill="${bands[0]}"/>
    ${bandPaths}
    ${texture}
  </g>
  ${fringe}
</svg>`;
}

// Product catalogue
const products = [
  {
    id: 1,
    name: 'Earthscape Runner',
    nameAr: 'مسار الأرض',
    collection: 'Landscape',
    collectionAr: 'طبيعة',
    type: 'wall',
    dimensions: '40 × 110 cm',
    colors: ['#3A3838', '#5A6E3A', '#3D5830', '#C17F5E', '#A03828', '#D4967C'],
    production: '3–4 weeks',
    material: '100% New Zealand Wool',
    description: 'A tall wall hanging that reads like a cross-section of ancient desert strata. Charcoal peaks give way to olive and forest green before descending into warm terracotta and rich brick red, finishing in salmon fringe.',
    descriptionAr: 'لوحة جدارية طويلة تشبه مقطعاً في طبقات الصحراء القديمة.',
    sizes: ['40 × 80 cm', '40 × 110 cm', '40 × 140 cm', 'Custom'],
    care: 'Spot clean. Dry flat. Avoid direct sunlight.',
    hasFringe: true,
    tags: ['wall', 'landscape', 'modern'],
    svgConfig: { shape: 'runner', aspectRatio: 2.75, bands: ['#3A3838','#5A6E3A','#3D5830','#8B6B4A','#C17F5E','#A03828','#D4967C'] }
  },
  {
    id: 2,
    name: 'Desert Horizon',
    nameAr: 'أفق الصحراء',
    collection: 'Landscape',
    collectionAr: 'طبيعة',
    type: 'floor',
    dimensions: '200 × 90 cm',
    colors: ['#F2EDE4', '#1A1A1A', '#A03828', '#C1502A', '#D4A830', '#5A6E3A', '#4A7898'],
    production: '4–5 weeks',
    material: '100% New Zealand Wool',
    description: 'A wide-format floor rug inspired by the open horizon — cream and black organic forms float above flowing bands of brick red, burnt orange, mustard, olive, and slate blue.',
    descriptionAr: 'سجادة أرضية عريضة مستوحاة من الأفق المفتوح.',
    sizes: ['150 × 70 cm', '200 × 90 cm', '250 × 120 cm', 'Custom'],
    care: 'Vacuum weekly. Professional clean annually.',
    hasFringe: false,
    tags: ['floor', 'landscape', 'modern'],
    svgConfig: { shape: 'wide', aspectRatio: 0.45, bands: ['#D4C5A9','#1A1A1A','#A03828','#C1502A','#D4A830','#5A6E3A','#4A7898'] }
  },
  {
    id: 3,
    name: 'Mountain Mist',
    nameAr: 'ضباب الجبل',
    collection: 'Landscape',
    collectionAr: 'طبيعة',
    type: 'wall',
    dimensions: '40 × 140 cm',
    colors: ['#A03828', '#C1502A', '#D4967C', '#4A7898', '#3D5830', '#7A9C7A'],
    production: '4–5 weeks',
    material: '100% New Zealand Wool',
    description: 'Warm reds and terracottas cascade into cool blues before deepening into forest greens. A composition of contrasts, like a mountain at dusk seen through rising mist.',
    descriptionAr: 'أحمر دافئ يتدفق إلى أزرق بارد ثم يعمق في أخضر الغابة.',
    sizes: ['40 × 100 cm', '40 × 140 cm', '55 × 160 cm', 'Custom'],
    care: 'Spot clean. Do not soak.',
    hasFringe: true,
    tags: ['wall', 'landscape', 'modern'],
    svgConfig: { shape: 'organic', aspectRatio: 3.5, bands: ['#A03828','#C1502A','#D4967C','#4A7898','#5A7898','#3D5830','#5A7868','#8A9C7A'] }
  },
  {
    id: 4,
    name: 'Autumn Layers',
    nameAr: 'طبقات الخريف',
    collection: 'Modern',
    collectionAr: 'عصري',
    type: 'floor',
    dimensions: '150 × 150 cm',
    colors: ['#C17F5E', '#D4967C', '#A03828', '#D4A830', '#3D5830'],
    production: '3–4 weeks',
    material: '100% New Zealand Wool',
    description: 'A square floor piece in the warmest tones of autumn — layered terracottas, peaches, and deep reds with a hint of gold, anchored by dark olive at the base.',
    descriptionAr: 'قطعة مربعة بأدفأ ألوان الخريف.',
    sizes: ['100 × 100 cm', '150 × 150 cm', '200 × 200 cm', 'Custom'],
    care: 'Vacuum gently. Professional clean recommended.',
    hasFringe: false,
    tags: ['floor', 'modern'],
    svgConfig: { shape: 'wide', aspectRatio: 1, bands: ['#C17F5E','#D4967C','#A03828','#B85C38','#D4A830','#3D5830'] }
  },
  {
    id: 5,
    name: 'Ocean Floor',
    nameAr: 'قاع المحيط',
    collection: 'Minimal',
    collectionAr: 'بسيط',
    type: 'wall',
    dimensions: '50 × 120 cm',
    colors: ['#2C3E6B', '#4A7898', '#7A9CB5', '#C17F5E', '#D4967C'],
    production: '3–4 weeks',
    material: '100% New Zealand Wool',
    description: 'Deep navy melts into slate blue and pale aqua before a warm terracotta horizon appears — like standing at the shoreline between sea and desert sand.',
    descriptionAr: 'كحلي عميق يذوب في أزرق ودافئ ترراكوتا.',
    sizes: ['40 × 80 cm', '50 × 120 cm', '60 × 150 cm', 'Custom'],
    care: 'Spot clean only. Keep away from moisture.',
    hasFringe: true,
    tags: ['wall', 'minimal', 'modern'],
    svgConfig: { shape: 'runner', aspectRatio: 2.4, bands: ['#2C3E6B','#4A7898','#5A8FAA','#7A9CB5','#A8BECC','#C17F5E','#D4967C'] }
  },
  {
    id: 6,
    name: 'Forest Depths',
    nameAr: 'أعماق الغابة',
    collection: 'Landscape',
    collectionAr: 'طبيعة',
    type: 'wall',
    dimensions: '45 × 130 cm',
    colors: ['#3D5830', '#5A6E3A', '#7A8C4A', '#C17F5E', '#D4967C', '#8A9C7A'],
    production: '3–4 weeks',
    material: '100% New Zealand Wool',
    description: 'A journey through layers of green — from the darkest forest floor through olive meadows, brightening to lime-touched growth, before warm earth tones ground the piece.',
    descriptionAr: 'رحلة عبر طبقات الأخضر من أعماق الغابة.',
    sizes: ['40 × 100 cm', '45 × 130 cm', '55 × 160 cm', 'Custom'],
    care: 'Spot clean. Hang or store flat.',
    hasFringe: true,
    tags: ['wall', 'landscape'],
    svgConfig: { shape: 'organic', aspectRatio: 2.9, bands: ['#3D5830','#4A6B3C','#5A6E3A','#7A8C4A','#8A9C5A','#C17F5E','#D4967C'] }
  },
  {
    id: 7,
    name: 'Sunrise',
    nameAr: 'شروق الشمس',
    collection: 'Modern',
    collectionAr: 'عصري',
    type: 'floor',
    dimensions: '100 × 160 cm',
    colors: ['#D4967C', '#C1502A', '#D4A830', '#C17F5E', '#F2EDE4'],
    production: '3 weeks',
    material: '100% New Zealand Wool',
    description: 'A floor rug that captures the brief moment when the sun clears the horizon — salmon, burnt orange, and gold with warm cream highlights, full of energy and warmth.',
    descriptionAr: 'سجادة أرضية تلتقط لحظة شروق الشمس.',
    sizes: ['80 × 120 cm', '100 × 160 cm', '140 × 200 cm', 'Custom'],
    care: 'Vacuum regularly. Rotate occasionally.',
    hasFringe: false,
    tags: ['floor', 'modern', 'minimal'],
    svgConfig: { shape: 'wide', aspectRatio: 1.6, bands: ['#F2EDE4','#D4967C','#C17F5E','#C1502A','#D4A830','#C17F5E'] }
  },
  {
    id: 8,
    name: 'Little Explorer',
    nameAr: 'المستكشف الصغير',
    collection: 'Kids',
    collectionAr: 'أطفال',
    type: 'floor',
    dimensions: '120 × 180 cm',
    colors: ['#4A7898', '#D4A830', '#5A6E3A', '#D4967C', '#F2EDE4'],
    production: '3–4 weeks',
    material: '100% New Zealand Wool (non-toxic dyes)',
    description: 'A soft, playful floor rug for little ones — with the same landscape layers in brighter, child-friendly tones. Safe, durable, and beautiful enough for any room.',
    descriptionAr: 'سجادة أرضية ناعمة للأطفال بألوان مفرحة وطبقات طبيعية.',
    sizes: ['100 × 150 cm', '120 × 180 cm', '150 × 200 cm', 'Custom'],
    care: 'Spot clean. Machine wash cover only.',
    hasFringe: false,
    tags: ['floor', 'kids'],
    svgConfig: { shape: 'wide', aspectRatio: 1.5, bands: ['#F2EDE4','#4A7898','#D4A830','#5A6E3A','#D4967C','#C17F5E'] }
  },
  {
    id: 9,
    name: 'Custom Horizon',
    nameAr: 'الأفق المخصص',
    collection: 'Custom',
    collectionAr: 'مخصص',
    type: 'floor',
    dimensions: 'Your Choice',
    colors: ['#C17F5E', '#5A6E3A', '#4A7898', '#3A3838', '#D4967C'],
    production: '4–8 weeks',
    material: '100% New Zealand Wool',
    description: 'Your vision, our hands. Choose any size, any color palette, any shape. We work with you from the first sketch to the finished piece.',
    descriptionAr: 'تصورك، بين أيدينا. اختر الحجم واللون والشكل.',
    sizes: ['Any size on request'],
    care: 'Based on final design.',
    hasFringe: true,
    tags: ['floor', 'wall', 'custom'],
    svgConfig: { shape: 'organic', aspectRatio: 2.2, bands: ['#C17F5E','#5A6E3A','#4A7898','#D4A830','#A03828','#3A3838','#D4967C'] }
  }
];

let filteredProducts = [...products];
let activeFilter = 'all';
let searchQuery = '';
let activeProductId = null;
let activeImageIndex = 0;

function getProductImages(p) {
  // Generate 3 visual variants of the same rug for gallery
  const configs = [
    p.svgConfig,
    { ...p.svgConfig, bands: [...p.svgConfig.bands].reverse() },
    { ...p.svgConfig, bands: p.svgConfig.bands.slice().sort(() => Math.random() - 0.5) }
  ];
  return configs.map((c, i) => makeRugSVG({ id: `${p.id}-img${i}`, ...c }));
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return;

  const lang = window.currentLang ? window.currentLang() : 'en';
  const isAr = lang === 'ar';

  // Apply filter & search
  filteredProducts = products.filter(p => {
    const matchFilter = activeFilter === 'all' || p.tags.includes(activeFilter);
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q));
    return matchFilter && matchSearch;
  });

  noResults.classList.toggle('hidden', filteredProducts.length > 0);
  grid.innerHTML = '';

  filteredProducts.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal-up';
    card.style.transitionDelay = `${idx * 0.06}s`;
    card.dataset.id = p.id;

    const svg = makeRugSVG({ id: `card-${p.id}`, ...p.svgConfig });
    const dotColors = p.colors.slice(0, 5).map(c =>
      `<span class="color-dot" style="background:${c}"></span>`
    ).join('');

    const name = isAr ? p.nameAr : p.name;
    const col = isAr ? p.collectionAr : p.collection;
    const type = p.type === 'wall' ? (isAr ? 'جداري' : 'Wall') : (isAr ? 'أرضي' : 'Floor');

    card.innerHTML = `
      <div class="product-card-art">
        ${svg}
        <span class="product-badge">${isAr ? 'مصنوع يدوياً' : 'Handmade'}</span>
      </div>
      <div class="product-card-info">
        <div class="product-card-collection">${col}</div>
        <h3 class="product-card-name">${name}</h3>
        <div class="product-card-meta">
          <span class="meta-tag">${p.dimensions}</span>
          <span class="meta-tag">${type}</span>
          <span class="meta-tag">${isAr ? p.production.replace('weeks','أسابيع') : p.production}</span>
        </div>
        <div class="product-color-dots">${dotColors}</div>
        <button class="product-card-cta" data-id="${p.id}">${window.getText ? window.getText('view_details') : 'View Details'}</button>
      </div>`;

    card.querySelector('.product-card-cta').addEventListener('click', (e) => {
      e.stopPropagation();
      openProductPopup(p.id);
    });
    card.addEventListener('click', () => openProductPopup(p.id));

    grid.appendChild(card);

    // Trigger visibility animation
    setTimeout(() => card.classList.add('visible'), 30 + idx * 60);
  });

  // Re-observe new cards for scroll animation
  if (typeof window.observeRevealElements === 'function') {
    window.observeRevealElements();
  }
}

function openProductPopup(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  activeProductId = id;
  activeImageIndex = 0;

  const overlay = document.getElementById('product-popup-overlay');
  const details = document.getElementById('popup-details');
  const lang = window.currentLang ? window.currentLang() : 'en';
  const isAr = lang === 'ar';

  const images = getProductImages(p);

  // Main image
  updatePopupImage(images, 0);

  // Thumbnails
  const thumbs = document.getElementById('popup-thumbnails');
  thumbs.innerHTML = images.map((_, i) =>
    `<div class="popup-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`
  ).join('');
  thumbs.querySelectorAll('.popup-thumb').forEach(t => {
    t.addEventListener('click', () => {
      activeImageIndex = parseInt(t.dataset.idx);
      updatePopupImage(images, activeImageIndex);
    });
  });

  // Store images for arrow navigation
  overlay._images = images;

  const name = isAr ? p.nameAr : p.name;
  const col = isAr ? p.collectionAr : p.collection;
  const desc = isAr ? p.descriptionAr : p.description;
  const type = p.type === 'wall' ? (isAr ? 'جداري' : 'Wall') : (isAr ? 'أرضي' : 'Floor');
  const get = k => window.getText ? window.getText(k) : k;

  details.innerHTML = `
    <div class="popup-name">${name}</div>
    <div class="popup-collection">${col}</div>
    <p class="popup-desc">${desc}</p>
    <div class="popup-divider"></div>
    <div class="popup-detail-row"><strong>${get('popup_type')}</strong><span>${type}</span></div>
    <div class="popup-detail-row"><strong>${get('popup_material')}</strong><span>${p.material}</span></div>
    <div class="popup-detail-row"><strong>${get('popup_sizes')}</strong><span>${p.sizes.join(', ')}</span></div>
    <div class="popup-detail-row"><strong>${get('popup_production')}</strong><span>${p.production}</span></div>
    <div class="popup-detail-row"><strong>${get('popup_care')}</strong><span>${p.care}</span></div>
    <a href="#contact" class="popup-cta" id="popup-cta-btn">${get('inquire')}</a>`;

  document.getElementById('popup-cta-btn').addEventListener('click', () => {
    closeProductPopup();
  });

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updatePopupImage(images, idx) {
  const main = document.getElementById('popup-main-image');
  main.innerHTML = images[idx] || images[0];
  activeImageIndex = idx;

  // Update thumbnails
  document.querySelectorAll('.popup-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

function closeProductPopup() {
  const overlay = document.getElementById('product-popup-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  activeProductId = null;
}

function initProducts() {
  renderProducts();

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Popup close
  const overlay = document.getElementById('product-popup-overlay');
  const closeBtn = document.getElementById('popup-close');

  closeBtn.addEventListener('click', closeProductPopup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProductPopup();
  });

  // Popup arrows
  document.getElementById('popup-prev').addEventListener('click', () => {
    const images = overlay._images;
    if (!images) return;
    const newIdx = (activeImageIndex - 1 + images.length) % images.length;
    updatePopupImage(images, newIdx);
  });
  document.getElementById('popup-next').addEventListener('click', () => {
    const images = overlay._images;
    if (!images) return;
    const newIdx = (activeImageIndex + 1) % images.length;
    updatePopupImage(images, newIdx);
  });

  // Keyboard navigation for popup
  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('product-popup-overlay');
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeProductPopup();
    if (e.key === 'ArrowLeft') document.getElementById('popup-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('popup-next').click();
  });
}

// ============================================
// RUG DESIGNER PREVIEW
// ============================================
const palettes = {
  landscape: ['#3A3838','#5A6E3A','#3D5830','#C17F5E','#A03828','#D4967C'],
  desert:    ['#D4967C','#C1502A','#D4A830','#C17F5E','#3A3838'],
  forest:    ['#3D5830','#5A6E3A','#7A8C4A','#C17F5E','#D4C5A9'],
  ocean:     ['#2C3E6B','#4A7898','#7A9CB5','#C17F5E','#D4967C'],
  minimal:   ['#D4C5A9','#C9B99A','#B5A88A','#8A8078','#3A3835'],
};

const sizeDimensions = {
  1: { label: '60 × 90 cm',  w: 60,  h: 90,  ar: 1.5 },
  2: { label: '80 × 120 cm', w: 80,  h: 120, ar: 1.5 },
  3: { label: '100 × 200 cm',w: 100, h: 200, ar: 2.0 },
  4: { label: '150 × 250 cm',w: 150, h: 250, ar: 1.67 },
  5: { label: '200 × 300 cm',w: 200, h: 300, ar: 1.5 },
};

const runnerSizeDimensions = {
  1: { label: '30 × 80 cm',  ar: 2.67 },
  2: { label: '35 × 100 cm', ar: 2.86 },
  3: { label: '40 × 120 cm', ar: 3.0 },
  4: { label: '50 × 150 cm', ar: 3.0 },
  5: { label: '60 × 180 cm', ar: 3.0 },
};

let designerState = {
  shape: 'runner',
  palette: 'landscape',
  size: 3,
  fringe: true,
  thickness: 'medium'
};

function updateDesignerPreview() {
  const svg = document.getElementById('rug-preview-svg');
  if (!svg) return;

  const { shape, palette, size, fringe } = designerState;
  const colors = palettes[palette];

  let svgShape, ar;
  if (shape === 'runner') {
    ar = runnerSizeDimensions[size].ar;
    svgShape = 'runner';
  } else if (shape === 'rectangle') {
    ar = 1.4;
    svgShape = 'wide';
  } else if (shape === 'oval' || shape === 'round') {
    ar = shape === 'oval' ? 1.3 : 1;
    svgShape = 'wide';
  } else {
    ar = 2.2;
    svgShape = 'organic';
  }

  const previewSVG = makeRugSVG({
    id: 'designer-preview',
    shape: svgShape,
    aspectRatio: ar,
    bands: colors,
    hasFringe: fringe
  });

  const W = 300, H = Math.round(300 * ar);
  svg.setAttribute('viewBox', `0 0 ${W} ${H + (fringe ? 50 : 0)}`);
  svg.innerHTML = '';
  const temp = document.createElement('div');
  temp.innerHTML = previewSVG;
  const inner = temp.querySelector('svg');
  if (inner) svg.innerHTML = inner.innerHTML;

  // Oval/round clip overlay
  if (shape === 'oval' || shape === 'round') {
    const existing = svg.querySelector('[clip-path]');
    if (existing) {
      const rx = shape === 'round' ? '48%' : '48%';
      const ry = shape === 'round' ? '48%' : '46%';
      const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg','defs'), svg.firstChild);
      const ellipClip = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
      ellipClip.id = 'ellip-clip-d';
      const ell = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
      ell.setAttribute('cx','150'); ell.setAttribute('cy', String(H/2));
      ell.setAttribute('rx', String(W * 0.47)); ell.setAttribute('ry', String(H * 0.47));
      ellipClip.appendChild(ell);
      defs.appendChild(ellipClip);
      svg.querySelectorAll('g[clip-path]').forEach(g => g.setAttribute('clip-path','url(#ellip-clip-d)'));
    }
  }

  svg.classList.add('morphing');
  setTimeout(() => svg.classList.remove('morphing'), 350);

  // Update size display
  const display = document.getElementById('size-display');
  if (display) {
    const sizeMap = shape === 'runner' ? runnerSizeDimensions : sizeDimensions;
    display.textContent = sizeMap[size]?.label || sizeDimensions[size].label;
  }
}

function initDesigner() {
  // Shape buttons
  document.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      designerState.shape = btn.dataset.shape;
      updateDesignerPreview();
    });
  });

  // Palette buttons
  document.querySelectorAll('.palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      designerState.palette = btn.dataset.palette;
      updateDesignerPreview();
    });
  });

  // Size slider
  const slider = document.getElementById('size-slider');
  if (slider) {
    slider.addEventListener('input', () => {
      designerState.size = parseInt(slider.value);
      updateDesignerPreview();
    });
  }

  // Fringe toggle
  const fringeToggle = document.getElementById('fringe-toggle');
  if (fringeToggle) {
    fringeToggle.addEventListener('change', () => {
      designerState.fringe = fringeToggle.checked;
      const label = document.getElementById('fringe-label');
      if (label) label.dataset.key = fringeToggle.checked ? 'fringe_on' : 'fringe_off';
      if (label) label.textContent = window.getText ?
        window.getText(fringeToggle.checked ? 'fringe_on' : 'fringe_off') :
        (fringeToggle.checked ? 'With Fringe' : 'No Fringe');
      updateDesignerPreview();
    });
  }

  // Thickness buttons
  document.querySelectorAll('.thickness-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.thickness-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      designerState.thickness = btn.dataset.thickness;
    });
  });

  updateDesignerPreview();
}

// Expose for language module
window.renderProducts = renderProducts;

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initProducts();
  initDesigner();
});
