/* ============================================
   JUTHOOR TUFT — MAIN JAVASCRIPT
   ============================================ */

// ── Custom Cursor ──────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  if (!cursor || !dot) return;
  if (window.matchMedia('(hover: none)').matches) {
    cursor.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .product-card, .masonry-item, .filter-btn, .shape-btn, .palette-btn, .faq-question, .toggle';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove('hovering');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'; dot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'; dot.style.opacity = '1';
  });
}

// ── Loading Screen ──────────────────────────────────────────
function initLoading() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  function dismiss() {
    screen.classList.add('fade-out');
    setTimeout(() => { screen.style.display = 'none'; }, 800);
  }

  // Dismiss after 1.5s — fast enough to not feel stuck
  setTimeout(dismiss, 1500);

  // Safety net: force-hide after 4s no matter what
  setTimeout(() => { screen.style.display = 'none'; }, 4000);
}

// ── Scroll Progress Bar ─────────────────────────────────────
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0) + '%';
      ticking = false;
    });
  }, { passive: true });
}

// ── Navbar ──────────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      navTicking = false;
    });
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    links.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    links.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      links.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  overlay.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// ── Smooth Scroll ───────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Back to Top ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  let btnTicking = false;
  window.addEventListener('scroll', () => {
    if (btnTicking) return;
    btnTicking = true;
    requestAnimationFrame(() => {
      btn.classList.toggle('visible', window.scrollY > 500);
      btnTicking = false;
    });
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── FAQ Accordion ───────────────────────────────────────────
const faqData = [
  {
    q: 'How long does a custom rug take?',
    qAr: 'كم يستغرق وقت صنع السجادة المخصصة؟',
    a: "Most rugs take 3–5 weeks depending on size and complexity. Large or highly detailed pieces may take up to 8 weeks. We'll give you an exact timeline when you place your order.",
    aAr: 'تستغرق معظم السجاد من 3 إلى 5 أسابيع حسب الحجم والتعقيد. القطع الكبيرة قد تصل إلى 8 أسابيع.'
  },
  {
    q: 'What wool do you use?',
    qAr: 'ما نوع الصوف الذي تستخدمونه؟',
    a: '100% New Zealand wool — selected for its superior softness, natural sheen, and excellent dye uptake. It\'s hypoallergenic and naturally flame-resistant.',
    aAr: 'صوف نيوزيلندي خالص 100٪ — مختار لنعومته الفائقة ولمعانه الطبيعي.'
  },
  {
    q: 'Do you ship internationally?',
    qAr: 'هل تشحنون دولياً؟',
    a: 'Yes! We ship worldwide. Rugs are carefully rolled, wrapped in linen, and shipped in a protective tube. Shipping costs and times vary by destination.',
    aAr: 'نعم! نشحن إلى جميع أنحاء العالم. يُلف السجاد بعناية في كتان ويُشحن في أنبوب واقٍ.'
  },
  {
    q: 'Can I choose my own colors?',
    qAr: 'هل يمكنني اختيار ألواني الخاصة؟',
    a: 'Absolutely. For custom orders, we work with you to select exact yarn colors. We\'ll send you yarn samples before starting if needed.',
    aAr: 'بالتأكيد. للطلبات المخصصة، نعمل معك لاختيار ألوان الخيط المحددة.'
  },
  {
    q: 'How do I care for my rug?',
    qAr: 'كيف أعتني بسجادتي؟',
    a: 'For floor rugs: vacuum gently on low suction, rotate periodically, and have it professionally cleaned once a year. For wall hangings: spot clean with a damp cloth and avoid direct sunlight.',
    aAr: 'للسجاد الأرضي: استخدم المكنسة الكهربائية برفق، ودوّره دورياً. للتعليق الجداري: نظّفه بقطعة قماش مبللة.'
  },
  {
    q: 'Are your rugs suitable for high-traffic areas?',
    qAr: 'هل سجادكم مناسب للمناطق كثيرة الاستخدام؟',
    a: 'Yes — New Zealand wool is naturally durable and resilient. We recommend our medium or high pile options for high-traffic areas.',
    aAr: 'نعم — صوف نيوزيلندا متين وصامد بطبيعته. نوصي بخيار الخيط المتوسط أو العالي للمناطق كثيرة الاستخدام.'
  },
  {
    q: 'Can I see a sample before ordering?',
    qAr: 'هل يمكنني رؤية عينة قبل الطلب؟',
    a: 'Yes, we can send yarn samples and a mini swatch of your chosen palette. Contact us to arrange this — there\'s a small fee which is credited toward your final order.',
    aAr: 'نعم، يمكننا إرسال عينات خيط. تواصل معنا لترتيب ذلك.'
  },
  {
    q: 'Do you accept returns?',
    qAr: 'هل تقبلون المرتجعات؟',
    a: 'Since every rug is custom-made, we don\'t accept returns unless the piece is defective. We work closely with you throughout the process to ensure your complete satisfaction.',
    aAr: 'نظراً لأن كل سجادة مصنوعة حسب الطلب، لا نقبل الإرجاع إلا في حالة وجود عيب في التصنيع.'
  }
];

function renderFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  const lang = window.currentLang ? window.currentLang() : 'en';
  const isAr = lang === 'ar';
  list.innerHTML = '';

  faqData.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'faq-item reveal-up';
    el.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${isAr ? item.qAr : item.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" style="max-height:0">
        <div class="faq-answer-inner">${isAr ? item.aAr : item.a}</div>
      </div>`;

    const btn = el.querySelector('.faq-question');
    const ans = el.querySelector('.faq-answer');
    const inner = el.querySelector('.faq-answer-inner');

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question.open').forEach(q => {
        q.classList.remove('open');
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.style.maxHeight = '0';
      });
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = inner.offsetHeight + 24 + 'px';
      }
    });

    list.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 50 + idx * 50);
  });
}

// ── Testimonials Slider ─────────────────────────────────────
const testimonials = [
  {
    text: 'I commissioned a wall rug for my living room and the result is breathtaking. It truly looks like a painting — the layers, the texture, the color. My guests always ask about it first.',
    textAr: 'طلبت سجادة جدارية لغرفة معيشتي والنتيجة مذهلة. تبدو حقاً كلوحة فنية — الطبقات، الملمس، اللون.',
    author: 'Layla A.',
    location: 'Riyadh, Saudi Arabia'
  },
  {
    text: "The custom process was a dream. They sent yarn samples, worked with my color palette, and delivered exactly what I imagined — but better. The fringe is perfect.",
    textAr: 'كانت عملية التخصيص رائعة. أرسلوا عينات الخيط، وعملوا مع لوحة ألواني، وسلّموا ما تخيلته تماماً — بل أفضل.',
    author: 'Nora H.',
    location: 'Dubai, UAE'
  },
  {
    text: "I have four Juthoor pieces now. Each one is a small landscape — you notice new things every time you look at them. This is art that belongs in your home, not just a gallery.",
    textAr: 'لديّ أربع قطع من جذور الآن. كل واحدة مشهد طبيعي صغير — تلاحظ أشياء جديدة في كل مرة تنظر إليها.',
    author: 'Sara M.',
    location: 'Kuwait City'
  },
  {
    text: "Ordered a kids' rug for my daughter's room. The colors are vibrant, the pile is incredibly soft, and it's held up perfectly after months of play. Beautiful craftsmanship.",
    textAr: 'طلبت سجادة أطفال لغرفة ابنتي. الألوان زاهية والخيط ناعم بشكل لا يصدق.',
    author: 'Hessa K.',
    location: 'Doha, Qatar'
  },
  {
    text: "The packaging alone told me this was a premium brand — wrapped in linen, sealed with a handwritten note. The rug itself exceeded every expectation. Worth every dirham.",
    textAr: 'التغليف وحده أخبرني أن هذه علامة تجارية فاخرة — مغلّفة بالكتان مع رسالة مكتوبة بخط اليد.',
    author: 'Mohammed R.',
    location: 'Abu Dhabi, UAE'
  }
];

let testiCurrent = 0;
let testiTimer = null;

function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('testi-dots');
  if (!track || !dotsContainer) return;
  const lang = window.currentLang ? window.currentLang() : 'en';
  const isAr = lang === 'ar';

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  testimonials.forEach((t, idx) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    const initial = (t.author.charAt(0) || '?').toUpperCase();
    slide.innerHTML = `
      <div class="testimonial-card">
        <div class="quote-mark">"</div>
        <p class="testimonial-text">${isAr ? t.textAr : t.text}</p>
        <div class="testimonial-author">
          <div class="author-avatar">${initial}</div>
          <div>
            <div class="author-name">${t.author}</div>
            <div class="author-location">${t.location}</div>
          </div>
        </div>
      </div>`;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToTestimonial(idx));
    dotsContainer.appendChild(dot);
  });

  goToTestimonial(0);
}

function goToTestimonial(idx) {
  testiCurrent = idx;
  const track = document.getElementById('testimonials-track');
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.testi-dot').forEach((d, i) =>
    d.classList.toggle('active', i === idx));
  resetTestiTimer();
}

function resetTestiTimer() {
  clearInterval(testiTimer);
  testiTimer = setInterval(() => {
    const next = (testiCurrent + 1) % testimonials.length;
    goToTestimonial(next);
  }, 6000);
}

function initTestimonials() {
  renderTestimonials();
  document.getElementById('testi-prev')?.addEventListener('click', () => {
    goToTestimonial((testiCurrent - 1 + testimonials.length) % testimonials.length);
  });
  document.getElementById('testi-next')?.addEventListener('click', () => {
    goToTestimonial((testiCurrent + 1) % testimonials.length);
  });
}

// ── Animated Counters ───────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(easeOut(progress) * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + suffix;
  }

  el.parentElement.classList.add('counting');
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ── Contact Form ────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  // Floating labels fix for autofill
  form.querySelectorAll('input, textarea').forEach(input => {
    input.setAttribute('placeholder', ' ');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Simple validation
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#A03828';
        valid = false;
        setTimeout(() => { field.style.borderColor = ''; }, 2000);
      }
    });

    const email = form.querySelector('#f-email');
    if (email && email.value && !email.value.includes('@')) {
      email.style.borderColor = '#A03828';
      valid = false;
      setTimeout(() => { email.style.borderColor = ''; }, 2000);
    }

    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.textContent = '...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = window.getText ? window.getText('form_submit') : 'Send Message';
      btn.disabled = false;
      if (successMsg) {
        successMsg.classList.remove('hidden');
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
      }
    }, 1200);
  });
}

// ── Mouse Parallax on Hero ──────────────────────────────────
function initParallax() {
  const hero = document.querySelector('.hero');
  const rugArt = document.querySelector('.hero-rug-art');
  if (!hero || !rugArt) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rugArt.style.transform = `translate(${cx * 18}px, ${cy * 12}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    rugArt.style.transform = '';
  });
}

// ── Keyboard Shortcuts ──────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // ESC handled by popup/lightbox modules
    // Slash to focus search
    if (e.key === '/' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      const s = document.getElementById('search-input');
      if (s) { s.focus(); s.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }
    // G for gallery
    if (e.key === 'g' && !e.target.matches('input, textarea')) {
      document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ── Lazy Loading Observer ───────────────────────────────────
function initLazyLoad() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('loaded');
        observer.unobserve(e.target);
      }
    });
  }, { rootMargin: '100px' });

  document.querySelectorAll('[data-lazy]').forEach(el => observer.observe(el));
}

// ── Reveal on scroll ────────────────────────────────────────
function observeRevealElements() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
}
window.observeRevealElements = observeRevealElements;

// ── Touch swipe for testimonials ────────────────────────────
function initTestiTouch() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goToTestimonial((testiCurrent - 1 + testimonials.length) % testimonials.length);
      else goToTestimonial((testiCurrent + 1) % testimonials.length);
    }
  });
}

// ── Init All ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoading();
  initProgressBar();
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initCounters();
  initContactForm();
  initParallax();
  initKeyboardShortcuts();
  initLazyLoad();
  initTestimonials();
  initTestiTouch();
  renderFAQ();

  // Language must be initialized after products/gallery/FAQ render functions are defined
  if (typeof initLanguage === 'function') initLanguage();

  // Observe reveal elements (also called after products render)
  setTimeout(observeRevealElements, 200);
});

// Expose for language module
window.renderFAQ = renderFAQ;
window.renderTestimonials = renderTestimonials;
