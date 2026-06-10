// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// SMOOTH SCROLL FOR ANCHORS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================
// SCROLL-TRIGGERED ANIMATIONS
// ===========================
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
};

const observerCallback = (entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for siblings
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.animate-on-scroll'));
      const siblingIndex = siblings.indexOf(entry.target);
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, siblingIndex * 100);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
animatedElements.forEach(el => observer.observe(el));

// ===========================
// FAQ ACCORDION
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    
    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===========================
// COUNTER ANIMATION FOR STATS
// ===========================
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const startTime = performance.now();
  const isDecimal = String(target).includes('.');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const current = easedProgress * target;
    
    if (isDecimal) {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Observe stats section
const statsElements = document.querySelectorAll('.hero-stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      
      statsElements.forEach(el => {
        const text = el.textContent;
        if (text.includes('/')) {
          animateCounter(el, 4.9, '/5');
        } else if (text.includes('+')) {
          animateCounter(el, 500, '+');
        } else {
          animateCounter(el, parseInt(text), '');
        }
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ===========================
// PARALLAX EFFECT ON HERO IMAGE
// ===========================
const heroImage = document.getElementById('hero-book-image');

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) {
    const scrolled = window.scrollY;
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;
    
    if (scrolled < heroHeight) {
      const translateY = scrolled * 0.15;
      const rotate = scrolled * 0.02;
      heroImage.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    }
  }
});

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-effect 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 10;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
