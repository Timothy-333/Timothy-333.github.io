// ===== Initialize AOS =====
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('mainNav');
const heroSection = document.getElementById('hero');

const handleNavbarScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

globalThis.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ===== Back to Top Button =====
const backToTop = document.querySelector('.back-to-top');

const handleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
};

globalThis.addEventListener('scroll', handleBackToTop);
handleBackToTop();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile nav if open
      const navCollapse = document.getElementById('navContent');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const highlightNav = () => {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

globalThis.addEventListener('scroll', highlightNav);
highlightNav();

// ===== Typing Effect for Hero Title (optional enhancement) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '1';
}

// ===== Parallax Effect on Shapes =====
const shapes = document.querySelectorAll('.shape');

globalThis.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  
  shapes.forEach((shape, i) => {
    const factor = (i + 1) * 0.5;
    shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== Card Tilt Effect =====
// Note: CSS transform transitions are disabled for these cards in styles.css
const cards = document.querySelectorAll('.project-card:not(.project-featured), .skill-card, .cert-card, .about-card');

const MAX_TILT_DEG = 3.5;
const LIFT_PX = 2;
const EASE = 0.85;

cards.forEach((card) => {
  let rafId = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    rafId = null;

    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;

    const rotateY = -currentX * MAX_TILT_DEG;
    const rotateX = currentY * MAX_TILT_DEG;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${LIFT_PX}px)`;

    const stillMoving = Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
    if (stillMoving) rafId = requestAnimationFrame(render);
  };

  const schedule = () => {
    if (rafId == null) rafId = requestAnimationFrame(render);
  };

  card.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Convert to -1..1 range
    targetX = (x - 0.5) * 2;
    targetY = (y - 0.5) * 2;

    schedule();
  }, { passive: true });

  card.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    schedule();
  }, { passive: true });
});

// ===== Skill Tag Hover Animation =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-3px) scale(1.05)';
  });
  
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #58a6ff;');
console.log('%cWant to connect? Find me on GitHub or LinkedIn!', 'font-size: 14px; color: #8b949e;');
console.log('%chttps://github.com/Timothy-333', 'font-size: 12px; color: #3fb950;');
