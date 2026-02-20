(function () {
    'use strict';

    window.UserDashboard = {
        init: function () {
            if (!Guards.requireUser()) return;

            this.loadUserData();
            this.loadStats();
            this.loadRecentJobs();
            this.loadApplications();
            this.setupEventListeners();
        },

        loadUserData: function () {
            const user = Auth.getCurrentUser();
            if (!user) return;

            // Update user info in sidebar
            const userNameEl = document.querySelector('.sidebar-user-info h4');
            const userEmailEl = document.querySelector('.sidebar-user-info p');
            const userAvatarEl = document.querySelector('.sidebar-user-avatar');

            if (userNameEl) userNameEl.textContent = user.name;
            if (userEmailEl) userEmailEl.textContent = user.email;
            if (userAvatarEl) {
                userAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=D4AF37&color=0B0B0B&size=128`;
            }

            // Update welcome message
            const welcomeEl = document.querySelector('.topbar-welcome h2');
            if (welcomeEl) {
                welcomeEl.textContent = `Welcome back, ${user.name}`;
            }
        },

        loadStats: function () {
            const user = Auth.getCurrentUser();
            const applications = Storage.getApplicationsByUser(user.id);
            const savedJobs = Storage.getSavedJobs ? Storage.getSavedJobs(user.id) : [];

            // Update stat cards
            this.animateStatCard('#stat-applications', applications.length);
            this.animateStatCard('#stat-saved', savedJobs.length || 5); // Fallback mock
            this.animateStatCard('#stat-messages', 8); // Mock
            this.animateStatCard('#stat-views', 87); // Mock
        },

        animateStatCard: function (selector, targetValue) {
            const el = document.querySelector(selector);
            if (!el) return;

            let current = 0;
            const increment = targetValue / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    el.textContent = targetValue;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 30);
        },

        loadRecentJobs: function () {
            const jobs = Storage.getJobs().slice(0, 3);
            const container = document.querySelector('.recent-jobs-list');

            if (!container) return;

            if (jobs.length === 0) {
                UI.showEmptyState(container, 'No jobs available', 'Browse Jobs', 'dashboard-jobs.html');
                return;
            }

            container.innerHTML = jobs.map(job => {
                const company = Storage.getCompanyById(job.companyId);
                return `
                    <div class="card hover-lift">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <div style="width: 50px; height: 50px; background: var(--gold-gradient); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 700; color: var(--primary-bg);">
                                ${company ? company.companyName.substring(0, 2).toUpperCase() : 'CO'}
                            </div>
                            <div>
                                <h4 style="margin: 0; color: var(--text-light);">${job.title}</h4>
                                <p style="margin: 0; font-size: 0.875rem; color: var(--muted-text);">${company ? company.companyName : 'Company'}</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                            <span class="badge badge-info">${job.type || 'Full-time'}</span>
                            <span class="badge badge-success">${job.location || 'Remote'}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--gold-accent); font-weight: 600;">${job.salary || 'Competitive'}</span>
                            <a href="job-details.html?id=${job.id}" class="btn btn-ghost" style="padding: 0.5rem 1rem;">View</a>
                        </div>
                    </div>
                `;
            }).join('');
        },

        loadApplications: function () {
            const user = Auth.getCurrentUser();
            const applications = Storage.getApplicationsByUser(user.id);
            const tbody = document.querySelector('.applications-table tbody');

            if (!tbody) return;

            if (applications.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align: center; padding: 2rem; color: var(--muted-text);">
                            No applications yet. <a href="dashboard-jobs.html" style="color: var(--gold-accent);">Browse jobs</a>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = applications.slice(0, 5).map(app => {
                const job = Storage.getJobById(app.jobId);
                const company = job ? Storage.getCompanyById(job.companyId) : null;

                return `
                    <tr>
                        <td>${job ? job.title : 'N/A'}</td>
                        <td>${company ? company.companyName : 'N/A'}</td>
                        <td>${UI.formatDate(app.createdAt)}</td>
                        <td><span class="badge badge-${this.getStatusColor(app.status)}">${app.status}</span></td>
                    </tr>
                `;
            }).join('');
        },

        getStatusColor: function (status) {
            const colors = {
                pending: 'warning',
                interview: 'info',
                accepted: 'success',
                rejected: 'error'
            };
            return colors[status] || 'info';
        },

        setupEventListeners: function () {
            // Logout
            const logoutBtn = document.querySelector('[data-action="logout"]');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    Auth.logout();
                });
            }

            // Mobile menu toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.dashboard-sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('active');
                });
            }
        }
    };

    // Auto-init if on dashboard page
    if (document.querySelector('.dashboard-wrapper')) {
        document.addEventListener('DOMContentLoaded', () => {
            UserDashboard.init();
        });
    }
})();
