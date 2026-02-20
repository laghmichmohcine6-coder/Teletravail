/**
 * Télétravail - Dashboard JavaScript
 * Dashboard interactions and functionality
 */

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    checkDashboardAuth();
    initializeDashboard();
    loadUserData();
    initializeSidebar();
    loadDashboardData();
});

// ========================================
// AUTHENTICATION CHECK
// ========================================
function checkDashboardAuth() {
    const user = localStorage.getItem('teletravail_user') || sessionStorage.getItem('teletravail_user');

    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    return JSON.parse(user);
}

// ========================================
// DASHBOARD INITIALIZATION
// ========================================
function initializeDashboard() {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const mainContent = document.querySelector('.dashboard-main');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar?.classList.toggle('collapsed');
            mainContent?.classList.toggle('expanded');
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('[data-action="logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}

// ========================================
// LOAD USER DATA
// ========================================
function loadUserData() {
    const userData = checkDashboardAuth();
    if (!userData) return;

    // Update welcome message
    const welcomeName = document.querySelector('.topbar-welcome h2');
    if (welcomeName) {
        welcomeName.textContent = `Welcome back, ${userData.name}`;
    }

    // Update user info in sidebar
    const sidebarUserName = document.querySelector('.sidebar-user-info h4');
    const sidebarUserEmail = document.querySelector('.sidebar-user-info p');

    if (sidebarUserName) sidebarUserName.textContent = userData.name;
    if (sidebarUserEmail) sidebarUserEmail.textContent = userData.email;
}

// ========================================
// SIDEBAR NAVIGATION
// ========================================
function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu-link');
    const currentPage = window.location.pathname.split('/').pop();

    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Set active state
        if (href === currentPage || (currentPage === 'dashboard.html' && href === '#overview')) {
            link.classList.add('active');
        }

        // Handle internal navigation
        if (href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active from all
                sidebarLinks.forEach(l => l.classList.remove('active'));

                // Add active to clicked
                link.classList.add('active');

                // Show corresponding section
                const sectionId = href.substring(1);
                showDashboardSection(sectionId);
            });
        }
    });
}

function showDashboardSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in');
    }
}

// ========================================
// LOAD DASHBOARD DATA
// ========================================
function loadDashboardData() {
    // Animate stat counters
    animateStatCounters();

    // Load recent jobs
    loadRecentJobs();

    // Load applications
    loadApplications();
}

function animateStatCounters() {
    const statCards = document.querySelectorAll('.stat-card-value');

    statCards.forEach(card => {
        const target = parseInt(card.getAttribute('data-value') || card.textContent);
        animateValue(card, 0, target, 1500);
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// RECENT JOBS (Mock Data)
// ========================================
function loadRecentJobs() {
    const jobsContainer = document.querySelector('.recent-jobs-list');
    if (!jobsContainer) return;

    const mockJobs = [
        {
            title: 'Senior Frontend Developer',
            company: 'TechCorp Global',
            type: 'Full Remote',
            salary: '$80k - $120k',
            posted: '2 days ago'
        },
        {
            title: 'UX/UI Designer',
            company: 'DesignHub',
            type: 'Hybrid',
            salary: '$70k - $95k',
            posted: '3 days ago'
        },
        {
            title: 'Product Manager',
            company: 'StartupXYZ',
            type: 'Full Remote',
            salary: '$90k - $130k',
            posted: '5 days ago'
        }
    ];

    jobsContainer.innerHTML = mockJobs.map(job => `
    <div class="job-item card hover-lift">
      <h4>${job.title}</h4>
      <p class="text-muted">${job.company}</p>
      <div class="job-meta">
        <span class="badge badge-info">${job.type}</span>
        <span class="text-gold">${job.salary}</span>
      </div>
      <p class="text-muted" style="font-size: 0.875rem; margin-top: 0.5rem;">${job.posted}</p>
    </div>
  `).join('');
}

// ========================================
// APPLICATIONS (Mock Data)
// ========================================
function loadApplications() {
    const applicationsTable = document.querySelector('.applications-table tbody');
    if (!applicationsTable) return;

    const mockApplications = [
        {
            position: 'Frontend Developer',
            company: 'TechCorp',
            date: '2024-02-10',
            status: 'In Review'
        },
        {
            position: 'UI Designer',
            company: 'DesignHub',
            date: '2024-02-08',
            status: 'Interview'
        },
        {
            position: 'Product Manager',
            company: 'StartupXYZ',
            date: '2024-02-05',
            status: 'Pending'
        }
    ];

    applicationsTable.innerHTML = mockApplications.map(app => `
    <tr>
      <td>${app.position}</td>
      <td>${app.company}</td>
      <td>${app.date}</td>
      <td><span class="badge badge-${getStatusBadge(app.status)}">${app.status}</span></td>
    </tr>
  `).join('');
}

function getStatusBadge(status) {
    const badges = {
        'In Review': 'info',
        'Interview': 'warning',
        'Pending': 'secondary',
        'Accepted': 'success',
        'Rejected': 'danger'
    };
    return badges[status] || 'info';
}

// ========================================
// LOGOUT
// ========================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('teletravail_user');
        sessionStorage.removeItem('teletravail_user');

        // Show notification
        window.TeletravailApp?.showNotification('Logged out successfully', 'success');

        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

// ========================================
// PROFILE EDIT
// ========================================
function initializeProfileEdit() {
    const profileForm = document.getElementById('profileForm');
    if (!profileForm) return;

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(profileForm);
        const userData = Object.fromEntries(formData);

        // Show loading
        const submitBtn = profileForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Simulate save
        setTimeout(() => {
            // Update stored user data
            const currentUser = JSON.parse(localStorage.getItem('teletravail_user') || '{}');
            const updatedUser = { ...currentUser, ...userData };
            localStorage.setItem('teletravail_user', JSON.stringify(updatedUser));

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Show success
            window.TeletravailApp?.showNotification('Profile updated successfully!', 'success');

            // Reload user data
            loadUserData();
        }, 1000);
    });
}

// Initialize profile edit if on profile page
if (window.location.pathname.includes('profile.html')) {
    document.addEventListener('DOMContentLoaded', initializeProfileEdit);
}

// ========================================
// EXPORT
// ========================================
window.TeletravailDashboard = {
    loadUserData,
    handleLogout,
    showDashboardSection
};
