const navbar = document.getElementById('navbar');
const topButton = document.getElementById('topButton');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');

function updateScrollState() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  topButton.classList.toggle('visible', window.scrollY > 500);
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('#navLinks a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

themeToggle.addEventListener('click', () => {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', isLight ? 'Toggle light mode' : 'Toggle dark mode');
  localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');
});
if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.dataset.theme = 'light';
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const linkObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('#navLinks a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach((section) => linkObserver.observe(section));
