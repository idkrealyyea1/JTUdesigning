/* ============================================
   JUTHOOR TUFT — SCROLL ANIMATIONS
   ============================================ */

// ── IntersectionObserver for all reveal elements ─────────────
function initScrollAnimations() {
  // Reveal up / left / right
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // Process steps — stagger
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const step = parseInt(entry.target.dataset.step) || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, step * 80);
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.process-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    stepObserver.observe(step);
  });

  // Stat items — scale in
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, i * 100);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.85)';
    item.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
    statObserver.observe(item);
  });

  // About values — slide in
  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.value-item').forEach((v, i) => {
          setTimeout(() => {
            v.style.opacity = '1';
            v.style.transform = 'translateX(0)';
          }, i * 80);
        });
        valueObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const valuesEl = document.querySelector('.about-values');
  if (valuesEl) {
    valuesEl.querySelectorAll('.value-item').forEach(v => {
      v.style.opacity = '0';
      v.style.transform = 'translateX(-20px)';
      v.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    valueObserver.observe(valuesEl);
  }

  // Testimonial card entrance
  const testiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        testiObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const testiSection = document.querySelector('.testimonials');
  if (testiSection) {
    testiSection.style.opacity = '0';
    testiSection.style.transform = 'translateY(40px)';
    testiSection.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    testiObserver.observe(testiSection);
  }

  // Contact form fields — stagger in
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.form-group').forEach((fg, i) => {
          setTimeout(() => {
            fg.style.opacity = '1';
            fg.style.transform = 'translateY(0)';
          }, i * 80);
        });
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.querySelectorAll('.form-group').forEach(fg => {
      fg.style.opacity = '0';
      fg.style.transform = 'translateY(20px)';
      fg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    contactObserver.observe(contactForm);
  }

  // Footer entrance
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.footer-brand, .footer-links, .footer-social').forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 120);
        });
        footerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const footerTop = document.querySelector('.footer-top');
  if (footerTop) {
    footerTop.querySelectorAll('.footer-brand, .footer-links, .footer-social').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    footerObserver.observe(footerTop);
  }
}

// ── Parallax on section backgrounds ──────────────────────────
function initSectionParallax() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const bg = statsSection.querySelector('.stats-bg');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = statsSection.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0 && bg) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        bg.style.transform = `translateY(${(progress - 0.5) * -30}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

// ── Blob subtle mouse tracking ────────────────────────────────
function initBlobTracking() {
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (!blob1 || !blob2) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 40;
    targetY = (e.clientY / window.innerHeight - 0.5) * 40;
  }, { passive: true });

  function animate() {
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;
    blob1.style.transform = `translate(${currentX * 0.6}px, ${currentY * 0.4}px)`;
    blob2.style.transform = `translate(${-currentX * 0.4}px, ${-currentY * 0.6}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Section title character split animation ───────────────────
function initTitleAnimations() {
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const words = entry.target.querySelectorAll('.word');
        words.forEach((word, i) => {
          setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
          }, i * 60);
        });
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Wrap section title words
  document.querySelectorAll('.section-title').forEach(title => {
    const html = title.innerHTML;
    const wrapped = html.split(' ').map(word =>
      `<span class="word" style="display:inline-block;opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease;">${word}&nbsp;</span>`
    ).join('');
    title.innerHTML = wrapped;
    titleObserver.observe(title);
  });
}

// ── Designer preview entrance animation ───────────────────────
function initDesignerAnimation() {
  const designerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const preview = entry.target.querySelector('.designer-preview');
        const controls = entry.target.querySelector('.designer-controls');
        if (preview) {
          preview.style.opacity = '0';
          preview.style.transform = 'translateX(30px)';
          setTimeout(() => {
            preview.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            preview.style.opacity = '1';
            preview.style.transform = 'none';
          }, 200);
        }
        if (controls) {
          controls.style.opacity = '0';
          controls.style.transform = 'translateX(-30px)';
          setTimeout(() => {
            controls.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            controls.style.opacity = '1';
            controls.style.transform = 'none';
          }, 100);
        }
        designerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const designerWrap = document.querySelector('.designer-wrap');
  if (designerWrap) designerObserver.observe(designerWrap);
}

// ── Gallery masonry hover 3D tilt ────────────────────────────
function initMasonryTilt() {
  // Skip on touch devices — tilt-on-hover has no meaning there and just burns cycles
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.masonry-item').forEach(item => {
    let ticking = false;
    let lastEvent = null;
    item.addEventListener('mousemove', (e) => {
      lastEvent = e;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = item.getBoundingClientRect();
        const cx = (lastEvent.clientX - rect.left) / rect.width - 0.5;
        const cy = (lastEvent.clientY - rect.top) / rect.height - 0.5;
        item.style.transform = `scale(1.02) perspective(600px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg)`;
        ticking = false;
      });
    }, { passive: true });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    });
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'transform 0.15s ease, box-shadow 0.4s ease';
    });
  });
}

// ── Product card subtle tilt ──────────────────────────────────
function initProductTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  let ticking = false;
  let lastEvent = null;
  document.addEventListener('mousemove', (e) => {
    if (!e.target.closest('.product-card')) return;
    lastEvent = e;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const card = lastEvent.target.closest('.product-card');
      ticking = false;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = (lastEvent.clientX - rect.left) / rect.width - 0.5;
      const cy = (lastEvent.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-12px) rotate(${cx * -1}deg) scale(1.01) perspective(800px) rotateX(${cy * -3}deg)`;
    });
  }, { passive: true });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest('.product-card');
    if (card) card.style.transform = '';
  }, true);
}

// ── Init all animations ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to let other modules render their elements first
  setTimeout(() => {
    initScrollAnimations();
    initSectionParallax();
    initBlobTracking();
    initDesignerAnimation();
    // initTitleAnimations(); // Optional — can cause issues with language switch
  }, 100);

  // After gallery & products render
  setTimeout(() => {
    initMasonryTilt();
    initProductTilt();
  }, 600);
});
