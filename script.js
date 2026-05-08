// ===== TYPING ANIMATION =====
const roles = ['MERN Stack Developer', 'React.js Developer', 'Node.js Developer', 'Full Stack Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(type, 400); return; }
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(type, 1800); return; }
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ===== PARTICLES =====
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 60; i++) {
  const p = document.createElement('div');
  const size = Math.random() * 3 + 1;
  p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(129,140,248,${Math.random() * 0.4 + 0.1});left:${Math.random()*100}%;top:${Math.random()*100}%;animation:particleAnim ${Math.random()*8+4}s ease-in-out infinite ${Math.random()*8}s;`;
  particlesEl.appendChild(p);
}
const style = document.createElement('style');
style.textContent = `@keyframes particleAnim{0%,100%{transform:translateY(0) scale(1);opacity:0.3;}50%{transform:translateY(-${Math.random()*60+20}px) scale(1.2);opacity:0.8;}}`;
document.head.appendChild(style);

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => { hamburger.classList.remove('open'); navLinks.classList.remove('open'); });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === current));
}

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.service-card, .project-card, .timeline-card, .contact-card, .skill-item, .stat-card, .about-grid, .contact-form');
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(num => {
        const target = +num.dataset.target;
        let count = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          num.textContent = Math.floor(count);
          if (count >= target) clearInterval(timer);
        }, 40);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent!</span><i class="fa-solid fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    this.reset();
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

