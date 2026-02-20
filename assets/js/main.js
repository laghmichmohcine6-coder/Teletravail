/**
 * Télétravail - Enhanced Main JavaScript
 * Core functionality with statistics fix, job filtering, and premium features
 */

// ========================================
// GLOBAL STATE
// ========================================
const state = {
  isMenuOpen: false,
  currentUser: null,
  currentCategory: 'all',
  currentLanguage: localStorage.getItem('language') || 'en'
};

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
  navbar: null,
  mobileMenuToggle: null,
  navMenu: null,
  loadingScreen: null
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  initializeNavigation();
  initializeScrollEffects();
  initializeAnimations();
  initializeCursor();
  hideLoadingScreen();
  checkAuth();
  initializeStats();
  initializeJobFiltering();
});

function initializeElements() {
  elements.navbar = document.querySelector('.navbar');
  elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  elements.navMenu = document.querySelector('.nav-menu');
  elements.loadingScreen = document.querySelector('.loading-screen');
}

// ========================================
// LOADING SCREEN
// ========================================
function hideLoadingScreen() {
  setTimeout(() => {
    if (elements.loadingScreen) {
      elements.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1000);
}

// ========================================
// NAVIGATION
// ========================================
function initializeNavigation() {
  // Scroll effect on navbar
  window.addEventListener('scroll', handleNavbarScroll);

  // Mobile menu toggle
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (state.isMenuOpen &&
      !elements.navMenu.contains(e.target) &&
      !elements.mobileMenuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });
}

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    elements.navbar?.classList.add('scrolled');
  } else {
    elements.navbar?.classList.remove('scrolled');
  }
}

function toggleMobileMenu() {
  state.isMenuOpen = !state.isMenuOpen;
  elements.navMenu?.classList.toggle('active');

  // Animate hamburger icon
  const icon = elements.mobileMenuToggle?.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  }
}

function closeMobileMenu() {
  state.isMenuOpen = false;
  elements.navMenu?.classList.remove('active');

  const icon = elements.mobileMenuToggle?.querySelector('i');
  if (icon) {
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  }
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    closeMobileMenu();
  }
}

// ========================================
// STATISTICS (FIX NaN ISSUE)
// ========================================
function initializeStats() {
  const statsContainer = document.querySelector('.stats-grid');
  if (!statsContainer) return;

  // Get data from localStorage with fallback to empty arrays
  const users = JSON.parse(localStorage.getItem('teletravail_users') || '[]');
  const companies = JSON.parse(localStorage.getItem('teletravail_companies') || '[]');
  const applications = JSON.parse(localStorage.getItem('teletravail_applications') || '[]');

  // Get jobs from JobsData if available, otherwise use empty array
  const jobs = window.JobsData ? window.JobsData.getAll() : [];

  // Calculate stats with fallback to 0
  const stats = {
    totalJobs: jobs.length || 0,
    totalCompanies: companies.length || 0,
    totalApplications: applications.length || 0,
    activeUsers: users.length || 0
  };

  // Update stat numbers
  updateStatNumber('stat-jobs', stats.totalJobs);
  updateStatNumber('stat-companies', stats.totalCompanies);
  updateStatNumber('stat-applications', stats.totalApplications);
  updateStatNumber('stat-users', stats.activeUsers);
}

function updateStatNumber(id, value) {
  const element = document.getElementById(id);
  if (element) {
    const target = parseInt(value) || 0;
    element.setAttribute('data-target', target);
    animateCounter(element, target);
  }
}

// ========================================
// JOB FILTERING
// ========================================
function initializeJobFiltering() {
  const filterButtons = document.querySelectorAll('.job-filter-btn');
  const jobsContainer = document.querySelector('.jobs-grid');

  if (!filterButtons.length || !jobsContainer) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Get category
      const category = this.getAttribute('data-category');
      state.currentCategory = category;

      // Filter and render jobs
      renderJobs(category);
    });
  });

  // Initial render
  renderJobs('all');
}

function renderJobs(category = 'all') {
  const jobsContainer = document.querySelector('.jobs-grid');
  if (!jobsContainer || !window.JobsData) return;

  const jobs = window.JobsData.getByCategory(category);
  const displayJobs = jobs.slice(0, 6); // Show first 6

  jobsContainer.innerHTML = displayJobs.map(job => `
    <div class="card hover-glow reveal-scale" style="cursor: pointer;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
        <div style="display: flex; gap: var(--spacing-md);">
          <div style="width: 60px; height: 60px; background: var(--gold-gradient); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: var(--primary-bg);">
            ${job.companyLogo}
          </div>
          <div>
            <h3 style="margin: 0 0 0.25rem 0; color: var(--text-light);">${job.title}</h3>
            <p style="margin: 0; color: var(--muted-text); font-size: 0.9rem;">${job.company}</p>
          </div>
        </div>
        <button class="btn btn-ghost" style="padding: 0.5rem;">
          <i class="far fa-bookmark"></i>
        </button>
      </div>
      
      <div style="display: flex; gap: var(--spacing-xs); margin-bottom: var(--spacing-md); flex-wrap: wrap;">
        <span class="badge badge-info">${job.location}</span>
        <span class="badge badge-success">${job.type}</span>
      </div>
      
      <p style="color: var(--muted-text); margin-bottom: var(--spacing-md); line-height: 1.6;">
        ${job.description}
      </p>
      
      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--spacing-md); border-top: 1px solid var(--border-color);">
        <span style="color: var(--gold-accent); font-weight: 600; font-size: 1.125rem;">${job.salary || 'Competitive'}</span>
        <a href="job-details.html?id=${job.id}" class="btn btn-primary" style="padding: 0.5rem 1.5rem;">Apply Now</a>
      </div>
    </div>
  `).join('');

  // Re-observe for scroll animations
  if (window.ScrollReveal) {
    window.ScrollReveal.observe();
  }
}



// ========================================
// SCROLL ANIMATIONS
// ========================================
function initializeScrollEffects() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ========================================
// COUNTER ANIMATIONS
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(current));
    }
  }, 16);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initializeAnimations() {
  // Animate counters when they come into view
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target')) || 0;
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ========================================
// CUSTOM CURSOR
// ========================================
function initializeCursor() {
  // Only on desktop
  if (window.innerWidth < 768) return;

  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  const cursorGlowLarge = document.createElement('div');
  cursorGlowLarge.className = 'cursor-glow-large';
  document.body.appendChild(cursorGlowLarge);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';

    cursorGlowLarge.style.left = e.clientX + 'px';
    cursorGlowLarge.style.top = e.clientY + 'px';
  });

  // Scale cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, .btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlowLarge.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlowLarge.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(el => {
    const speed = el.getAttribute('data-speed') || 0.5;
    const yPos = -(window.scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ========================================
// AUTHENTICATION CHECK
// ========================================
function checkAuth() {
  const currentUser = localStorage.getItem('teletravail_user');
  if (currentUser) {
    state.currentUser = JSON.parse(currentUser);
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-bg);
    color: var(--text-light);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-md);
    border-left: 4px solid var(--gold-accent);
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// FORM VALIDATION
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

// ========================================
// EXPORT FOR OTHER MODULES
// ========================================
window.TeletravailApp = {
  state,
  showNotification,
  validateEmail,
  validatePassword,
  checkAuth,
  renderJobs,
  initializeStats
};
