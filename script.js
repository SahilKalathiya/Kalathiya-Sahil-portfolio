/* ─────────────────────────────────────────
   SAHIL KALATHIYA PORTFOLIO – script.js
───────────────────────────────────────── */

// ─── 1. PARTICLE CANVAS ───────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005),
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.floor((W * H) / 5000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.twinkle += p.twinkleSpeed;
      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

      // mouse repulsion
      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += (dx / dist) * 0.8;
          p.y += (dy / dist) * 0.8;
        }
      }

      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 170, 255, ${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  init();
  draw();
})();

// ─── 2. NAVBAR SCROLL + ACTIVE LINK ──────────────────────
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], .section[id]');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;

  // scrolled class
  navbar.classList.toggle('scrolled', sy > 60);

  // back to top
  document.getElementById('back-to-top').classList.toggle('visible', sy > 400);

  // active nav link
  let current = '';
  sections.forEach(sec => {
    const tops = sec.offsetTop - 100;
    if (sy >= tops) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// ─── 3. HAMBURGER MENU ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

// ─── 4. SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = entry.target.closest('.about-stats, .skills-grid, .projects-grid, .about-grid, .edu-grid, .timeline');
      if (siblings) {
        const all = [...siblings.querySelectorAll('.reveal')];
        const idx = all.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('in-view'), idx * 100);
      } else {
        entry.target.classList.add('in-view');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── 5. TYPED TEXT ────────────────────────────────────────
(function typedText() {
  const roles = [
    'Full Stack Developer',
    'Shopify Developer',
    'WordPress Developer',
    'Angular Developer',
    'Firebase Expert',
    'E-Commerce Specialist',
  ];
  const el = document.getElementById('typed-text');
  let roleIdx = 0, charIdx = 0, deleting = false, pause = false;

  function type() {
    if (pause) return;
    const current = roles[roleIdx];

    if (!deleting && charIdx <= current.length) {
      el.textContent = current.substring(0, charIdx++);
      setTimeout(type, 80);
    } else if (!deleting && charIdx > current.length) {
      pause = true;
      setTimeout(() => { deleting = true; pause = false; type(); }, 2000);
    } else if (deleting && charIdx > 0) {
      el.textContent = current.substring(0, charIdx--);
      setTimeout(type, 40);
    } else {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(type, 400);
    }
  }
  type();
})();

// ─── 6. PROJECT CARD MOUSE TRACK ──────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

// ─── 7. SMOOTH SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── 8. BACK TO TOP ───────────────────────────────────────
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── 9. CONTACT FORM (EmailJS) ────────────────────────────
// ╔══════════════════════════════════════════════════════════╗
// ║  EMAILJS SETUP (One-time):                               ║
// ║  1. Go to https://www.emailjs.com/ and sign up FREE      ║
// ║  2. Add Email Service → Connect your Gmail               ║
// ║  3. Create Email Template with variables:                 ║
// ║     {{from_name}}, {{from_email}}, {{subject}},           ║
// ║     {{message}}, {{to_email}}                             ║
// ║  4. Replace the 3 placeholders below with your values    ║
// ╚══════════════════════════════════════════════════════════╝

const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';     // from EmailJS → Account
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';     // from EmailJS → Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // from EmailJS → Email Templates

// Init EmailJS
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn     = document.getElementById('btn-send');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled  = true;

  const templateParams = {
    from_name:  document.getElementById('form-name').value,
    from_email: document.getElementById('form-email').value,
    subject:    document.getElementById('form-subject').value || 'Portfolio Contact',
    message:    document.getElementById('form-message').value,
    to_email:   'sahild8856@gmail.com',
  };

  if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    // Fallback: show setup instructions if not configured yet
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled  = false;
    success.innerHTML = '<i class="fas fa-info-circle"></i> Setup EmailJS to enable real emails (see console)';
    success.classList.add('show');
    console.log('%c[Portfolio] To enable real emails:', 'color:#a855f7;font-weight:bold;font-size:14px');
    console.log('1. Go to https://www.emailjs.com/ and sign up');
    console.log('2. Connect your Gmail: sahild8856@gmail.com');
    console.log('3. Create a template and replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID in script.js');
    setTimeout(() => {
      success.classList.remove('show');
      success.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
    }, 5000);
    return;
  }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      success.classList.add('show');
      this.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    })
    .catch((err) => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      console.error('EmailJS error:', err);
      if (error) {
        error.classList.add('show');
        setTimeout(() => error.classList.remove('show'), 5000);
      }
    });
});

// ─── 10. HERO ORB TILT ────────────────────────────────────
const heroOrb = document.querySelector('.hero-orb');
if (heroOrb) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    const rect = heroOrb.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    heroOrb.style.transform = `rotateY(${dx * 15}deg) rotateX(${-dy * 15}deg)`;
  });
  document.querySelector('.hero').addEventListener('mouseleave', () => {
    heroOrb.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
  heroOrb.style.transition = 'transform 0.15s ease';
}

// ─── 11. COUNTER ANIMATION ────────────────────────────────
const statCards = document.querySelectorAll('.stat-card h3');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statCards.forEach(el => statsObserver.observe(el));

function animateCounter(el) {
  const text   = el.textContent.trim();
  const num    = parseInt(text);
  const suffix = text.replace(/[0-9]/g, '');
  const dur    = 1500;
  const step   = 16;
  const steps  = dur / step;
  let cur = 0;
  const inc = num / steps;
  const timer = setInterval(() => {
    cur += inc;
    if (cur >= num) { cur = num; clearInterval(timer); }
    el.textContent = Math.floor(cur) + suffix;
  }, step);
}

// ─── 12. PAGE LOAD ANIMATION ──────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});

// ─── 13. PROJECT FILTER TABS ──────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});
