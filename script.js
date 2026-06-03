const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach((bar, i) => {
        bar.style.animationDelay = (i * 0.12) + 's';
        bar.style.animationPlayState = 'running';
      });
    }
  });
}, { threshold: 0.3 });

const allProjects = [
  { num:'01', title:'Portfolio Platform', desc:'Fully responsive, animated developer portfolio built from scratch using Vue.js and custom CSS with scroll-driven animations and dark/light mode.', tags:['Vue.js','CSS3','Animation','Design'], link:'#' },
  { num:'02', title:'E-Commerce Dashboard', desc:'Admin panel with real-time data, charts, and order management. Handled 2000+ product entries with smooth pagination and live search.', tags:['React','Node.js','REST API','Design'], link:'#' },
  { num:'03', title:'Task Management App', desc:'Drag-and-drop kanban board with authentication, local persistence, notifications, and a polished dark-mode interface.', tags:['Vue.js','Firebase','Design','Figma'], link:'#' },
  { num:'04', title:'Weather Forecast UI', desc:'API-powered weather app with animated icons, 7-day forecast, geolocation detection, and a glassmorphism design system.', tags:['JavaScript','CSS3','REST API'], link:'#' },
  { num:'05', title:'Dev Blog & CMS', desc:'Custom CMS with markdown support, tag filtering, reading time estimates, and SEO-ready static generation via Nuxt.js.', tags:['Vue.js','Nuxt.js','Design'], link:'#' },
  { num:'06', title:'Real-Time Chat App', desc:'Full-featured messaging with WebSocket, typing indicators, read receipts, file sharing, and multi-room support.', tags:['Node.js','React','Socket.io'], link:'#' },
  { num:'07', title:'Fitness Tracker PWA', desc:'Progressive Web App for tracking workouts, calories, and progress with offline support and push notifications.', tags:['Vue.js','IndexedDB','Design'], link:'#' },
  { num:'08', title:'URL Shortener Service', desc:'Full-stack URL shortener with analytics dashboard, custom aliases, click tracking, and QR code generation.', tags:['Node.js','React','REST API'], link:'#' },
  { num:'09', title:'Code Snippet Manager', desc:'Browser-based tool to save, tag, and search code snippets with syntax highlighting and one-click copy.', tags:['JavaScript','CSS3','Design'], link:'#' },
  { num:'10', title:'Invoice Generator', desc:'Professional invoice builder with PDF export, client management, tax calculation, and email delivery via SMTP.', tags:['Node.js','Vue.js','REST API'], link:'#' },
  { num:'11', title:'Recipe Finder App', desc:'Search thousands of recipes by ingredient, cuisine, or dietary preference with save-to-favourites and meal planning.', tags:['React','REST API','Design'], link:'#' },
  { num:'12', title:'GitHub Stats Dashboard', desc:'Visual dashboard pulling live GitHub data — commits, streaks, top languages, and repo growth over time.', tags:['JavaScript','REST API','CSS3'], link:'#' },
];
let activeFilter = 'all';

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');
}
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path || (path === 'index.html' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active-link');
    }
  });
}
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.tags.includes(filter));
  grid.innerHTML = filtered.map(p => `
    <div class="proj-full-card fade-up">
      <div class="proj-full-num">${p.num}</div>
      <h3>${p.title}</h3>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-full-tags">${p.tags.map(t => `<span class="proj-full-tag">${t}</span>`).join('')}</div>
      <a class="proj-link" href="${p.link}">View Project</a>
    </div>
  `).join('');
  grid.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
function filterProjects(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects(filter);
}
function submitForm() {
  const name = document.getElementById('f-name')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const msg = document.getElementById('f-msg')?.value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in your name, email, and message!');
    return;
  }
  const type = document.getElementById('f-type')?.value;
  const budget = document.getElementById('f-budget')?.value;
  const subject = encodeURIComponent('Project Inquiry from ' + name);
  const body = encodeURIComponent(`Hi Cyusa,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${type}\nBudget: ${budget}\n\nMessage:\n${msg}`);
  window.location.href = `mailto:cyusaivan0@gmail.com?subject=${subject}&body=${body}`;
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
}
function initAnimations() {
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  document.querySelectorAll('#skills').forEach(el => barObserver.observe(el));
  document.querySelectorAll('.skill-bar').forEach(bar => { bar.style.animationPlayState = 'paused'; });
}
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  setActiveNav();
  initAnimations();
  renderProjects(activeFilter);
});
