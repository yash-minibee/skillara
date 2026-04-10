// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('mainNav');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ===== SCROLL ANIMATIONS =====
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => scrollObserver.observe(el));

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');

function goToSlide(n) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

document.querySelector('.slider-prev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
document.querySelector('.slider-next')?.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

if (slides.length) {
  slides[0].classList.add('active');
  if (dots[0]) dots[0].classList.add('active');
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}

// ===== COURSE FILTER =====
const filterTabs = document.querySelectorAll('.filter-tab');
const courseItems = document.querySelectorAll('.course-item');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    courseItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.4s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-section').forEach(el => skillObserver.observe(el));

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}
