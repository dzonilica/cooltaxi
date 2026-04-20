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
    }, 800);
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
    // On pages without video hero, start frosted immediately
    const hasVideoHero = document.querySelector('.hero-video-bg');
    if (!hasVideoHero) {
      navbar.classList.add('scrolled');
    }
    // index.html scroll is handled by its own GSAP script block
    if (!document.getElementById('mainNav')) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      });
    }
  }

  // ---------- Mobile Menu (other pages with .mobile-menu) ----------
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
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // If no loader, init immediately
  if (!loader) initRevealAnimations();
});
