// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu after a nav link is tapped
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Scroll-spy: highlight the nav link for the section in view ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-header nav a[href^="#"]');
const navIndicator = document.getElementById('navIndicator');

const moveIndicatorTo = (link) => {
  if (!navIndicator || !link || window.innerWidth <= 640) return;
  const linkRect = link.getBoundingClientRect();
  const navRect = siteNav.getBoundingClientRect();
  navIndicator.style.left = `${linkRect.left - navRect.left}px`;
  navIndicator.style.width = `${linkRect.width}px`;
  navIndicator.style.opacity = '1';
};

const setActiveLink = (id) => {
  let activeLink = null;
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) activeLink = link;
  });
  if (activeLink) moveIndicatorTo(activeLink);
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Reposition the indicator on resize (e.g. rotating a tablet)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const current = document.querySelector('.site-header nav a.active');
    if (current) moveIndicatorTo(current);
  }, 150);
});

// ---------- Animated stat counters ----------
// Numbers count up from 0 when they scroll into view — a small nod to the
// "live readout" feel of the rest of the page, not just a static label.
const counters = document.querySelectorAll('[data-count-to]');

const animateCounter = (el) => {
  const target = el.getAttribute('data-count-to');
  const decimals = target.includes('.') ? target.split('.')[1].length : 0;
  const endValue = parseFloat(target);

  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const duration = 1000;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = (endValue * eased).toFixed(decimals);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((el) => counterObserver.observe(el));

// ---------- Copy email to clipboard ----------
const emailBtn = document.getElementById('emailBtn');
const emailToast = document.getElementById('emailToast');

if (emailBtn && emailToast && navigator.clipboard) {
  emailBtn.addEventListener('click', () => {
    const email = emailBtn.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      emailToast.classList.add('show');
      setTimeout(() => emailToast.classList.remove('show'), 1800);
    }).catch(() => {
      // Clipboard write failed silently (e.g. permissions) — the mailto
      // link still opens the user's mail client as a fallback, so no
      // further handling is needed here.
    });
  });
}

