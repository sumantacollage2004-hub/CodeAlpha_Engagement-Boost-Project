/* ═══════════════════════════════════════════
   CODEALPHA ENGAGEMENT BOOST — SCRIPT.JS
═══════════════════════════════════════════ */

// ── INTERSECTION OBSERVER: Scroll-in animations ──
(function () {
  const sections = document.querySelectorAll('.post-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // stagger children cards
          const cards = entry.target.querySelectorAll(
            '.post-card, .reel-script-block, .post-concept'
          );
          cards.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
          });
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach((s) => observer.observe(s));
})();

// ── ANIMATED COUNTER for stats ──
(function () {
  function animateCounter(el, target, suffix, duration) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = eased * target;
      el.textContent = (isFloat ? value.toFixed(0) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('.stat-num');
          nums.forEach((el) => {
            const raw = el.textContent.trim(); // e.g. "10K+", "95%", "50+"
            const suffix = raw.replace(/[0-9]/g, '').replace(/^[0-9K]+/, '');
            let target = parseFloat(raw);
            let displaySuffix = suffix;
            if (raw.includes('K')) {
              target = parseFloat(raw) * 1000;
              displaySuffix = 'K+';
            }
            animateCounter(el, target, raw.includes('K') ? displaySuffix : suffix, 1500);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) statsObserver.observe(statsStrip);
})();

// ── PROJECT PILLS: hover ripple effect ──
(function () {
  document.querySelectorAll('.project-pill').forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'scale(1.06)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = 'scale(1)';
    });
    pill.style.transition = 'transform 0.18s ease, background 0.2s ease';
  });
})();

// ── SMOOTH PARALLAX on header ──
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.transform = `translateY(${y * 0.18}px)`;
    header.style.opacity = Math.max(0, 1 - y / 400);
  }, { passive: true });
})();

// ── KEYBOARD NAVIGATION for sections ──
(function () {
  const sections = ['#post1', '#post2', '#post3'];
  let current = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      current = Math.min(current + 1, sections.length - 1);
      document.querySelector(sections[current])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      current = Math.max(current - 1, 0);
      document.querySelector(sections[current])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();

// ── COPY hashtag on click ──
(function () {
  document.querySelectorAll('.hashtags').forEach((el) => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy hashtags';

    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.textContent.trim()).then(() => {
        const orig = el.textContent;
        el.textContent = '✅ Copied to clipboard!';
        setTimeout(() => { el.textContent = orig; }, 1800);
      });
    });
  });
})();

// ── SCROLL PROGRESS INDICATOR ──
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #3a8eff, #ff6b2b, #00d48a);
    width: 0%; z-index: 1000; transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
})();

// ── CTA BUTTON micro interaction ──
(function () {
  document.querySelectorAll('.card-cta').forEach((btn) => {
    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.96)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

console.log('%cCodeAlpha Engagement Boost 🚀', 'color:#3a8eff;font-size:18px;font-weight:bold;');
console.log('%cDesigned for LinkedIn & Instagram student outreach.', 'color:#00d48a;font-size:13px;');
