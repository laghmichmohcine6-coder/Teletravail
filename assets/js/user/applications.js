(function () {
    'use strict';

    window.Applications = {
        init: function () {
            if (!Guards.requireUser()) return;

            this.loadApplications();
            this.setupEventListeners();
        },

        loadApplications: function () {
            const user = Auth.getCurrentUser();
            const applications = Storage.getApplicationsByUser(user.id);
            const container = document.querySelector('.applications-container');

            if (!container) return;

            if (applications.length === 0) {
                UI.showEmptyState(
                    container,
                    "You haven't applied to any jobs yet.",
                    'Browse Remote Jobs',
                    'dashboard-jobs.html'
                );
                return;
            }

            container.innerHTML = applications.map(app => {
                const job = Storage.getJobById(app.jobId);
                const company = job ? Storage.getCompanyById(job.companyId) : null;

                return `
                    <div class="application-card card hover-lift">
                        <div class="application-header">
                            <div>
                                <h3>${job ? job.title : 'N/A'}</h3>
                                <p>${company ? company.companyName : 'N/A'}</p>
                            </div>
                            <span class="badge badge-${this.getStatusColor(app.status)}">${app.status}</span>
                        </div>
                        <div class="application-meta">
                            <span><i class="fas fa-calendar"></i> Applied ${UI.formatDate(app.createdAt)}</span>
                            <span><i class="fas fa-clock"></i> ${UI.timeAgo(app.createdAt)}</span>
                        </div>
                        ${app.coverLetter ? `<p class="application-cover-letter">${app.coverLetter}</p>` : ''}
                        <div class="application-actions">
                            <a href="job-details.html?id=${app.jobId}" class="btn btn-ghost">View Job</a>
                        </div>
                    </div>
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
            // Filter functionality can be added here
        }
    };

    // Auto-init if on applications page
    if (document.querySelector('.applications-container')) {
        document.addEventListener('DOMContentLoaded', () => {
            Applications.init();
        });
    }
})();
