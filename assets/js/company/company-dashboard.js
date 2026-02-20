(function () {
    'use strict';

    window.CompanyDashboard = {
        init: function () {
            if (!Guards.requireCompany()) return;

            this.loadCompanyData();
            this.loadStats();
            this.loadRecentJobs();
            this.loadApplications();
            this.setupEventListeners();
        },

        loadCompanyData: function () {
            const company = Auth.getCurrentUser();
            if (!company) return;

            const companyNameEl = document.querySelector('.sidebar-user-info h4');
            const companyEmailEl = document.querySelector('.sidebar-user-info p');
            const companyAvatarEl = document.querySelector('.sidebar-user-avatar');

            if (companyNameEl) companyNameEl.textContent = company.companyName;
            if (companyEmailEl) companyEmailEl.textContent = company.email;
            if (companyAvatarEl) {
                companyAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.companyName)}&background=D4AF37&color=0B0B0B&size=128`;
            }

            const welcomeEl = document.querySelector('.topbar-welcome h2');
            if (welcomeEl) {
                welcomeEl.textContent = `Welcome, ${company.companyName}`;
            }
        },

        loadStats: function () {
            const company = Auth.getCurrentUser();
            const jobs = Storage.getJobsByCompany(company.id);
            const applications = Storage.getApplicationsByCompany(company.id);
            const activeJobs = jobs.filter(j => j.status === 'active');

            this.animateStatCard('[data-stat="jobs"]', jobs.length);
            this.animateStatCard('[data-stat="applications"]', applications.length);
            this.animateStatCard('[data-stat="active"]', activeJobs.length);
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
            const company = Auth.getCurrentUser();
            const jobs = Storage.getJobsByCompany(company.id).slice(0, 3);
            const container = document.querySelector('.recent-jobs-list');

            if (!container) return;

            if (jobs.length === 0) {
                container.innerHTML = `
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <i class="fas fa-briefcase" style="font-size: 3rem; color: var(--gold-accent); margin-bottom: 1rem;"></i>
                        <p style="color: var(--muted-text); margin-bottom: 1.5rem;">No jobs posted yet</p>
                        <a href="company-post-job.html" class="btn btn-primary">Post Your First Job</a>
                    </div>
                `;
                return;
            }

            container.innerHTML = jobs.map(job => `
                <div class="card hover-lift">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <h4 style="margin: 0 0 0.5rem 0; color: var(--text-light);">${job.title}</h4>
                            <p style="margin: 0; font-size: 0.875rem; color: var(--muted-text);">${job.location || 'Remote'}</p>
                        </div>
                        <span class="badge badge-${job.status === 'active' ? 'success' : 'warning'}">${job.status || 'active'}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        <span class="badge badge-info">${job.type || 'Full-time'}</span>
                        <span class="badge badge-success">${job.salary || 'Competitive'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--muted-text); font-size: 0.875rem;">${UI.formatDate(job.createdAt)}</span>
                        <a href="company-post-job.html?id=${job.id}" class="btn btn-ghost" style="padding: 0.5rem 1rem;">Edit</a>
                    </div>
                </div>
            `).join('');
        },

        loadApplications: function () {
            const company = Auth.getCurrentUser();
            const applications = Storage.getApplicationsByCompany(company.id);
            const tbody = document.querySelector('.applications-table tbody');

            if (!tbody) return;

            if (applications.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" style="text-align: center; padding: 2rem; color: var(--muted-text);">
                            No applications yet
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = applications.slice(0, 5).map(app => {
                const job = Storage.getJobById(app.jobId);
                const user = Storage.getUserById(app.userId);

                return `
                    <tr>
                        <td>${user ? user.name : 'N/A'}</td>
                        <td>${job ? job.title : 'N/A'}</td>
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
            const logoutBtn = document.querySelector('[data-action="logout"]');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    Auth.logout();
                });
            }

            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.dashboard-sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('active');
                });
            }
        }
    };

    if (document.querySelector('.company-dashboard-wrapper')) {
        document.addEventListener('DOMContentLoaded', () => {
            CompanyDashboard.init();
        });
    }
})();
