/* ============================================
   COOL TAXI — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Loading Screen ----------
  const loader = document.querySelector('.loader-screen');
  if (loader) {
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.documentElement.style.overflow = '';
      initRevealAnimations();
    }, 1600);
  }

  // ---------- Top Progress Bar ----------
  const progressFill = document.querySelector('.top-progress-bar .fill');
  if (progressFill) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.width = pct + '%';
    });
  }

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---------- Mobile Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Reveal on Scroll ----------
  // FIX: Immediately show elements already in viewport to prevent transparency flicker
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // stop observing once revealed
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => {
      // Immediately reveal if already in viewport (prevents hover-flicker bug)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }

  // If no loader, init immediately
  if (!loader) initRevealAnimations();
});
