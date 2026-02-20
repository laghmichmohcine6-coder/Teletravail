(function () {
    'use strict';

    window.JobManager = {
        init: function () {
            if (!Guards.requireCompany()) return;

            this.loadJobs();
            this.setupEventListeners();
        },

        loadJobs: function () {
            const company = Auth.getCurrentUser();
            const jobs = Storage.getJobsByCompany(company.id);
            const container = document.querySelector('.jobs-container');

            if (!container) return;

            if (jobs.length === 0) {
                UI.showEmptyState(container, 'No jobs posted yet', 'Post a Job', 'company-post-job.html');
                return;
            }

            container.innerHTML = jobs.map(job => `
                <div class="job-card card hover-lift">
                    <div class="job-header">
                        <div>
                            <h3>${job.title}</h3>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
                                <span class="badge badge-info">${job.type || 'Full-time'}</span>
                                <span class="badge badge-success">${job.location || 'Remote'}</span>
                                <span class="badge badge-${job.status === 'active' ? 'success' : 'warning'}">${job.status || 'active'}</span>
                            </div>
                        </div>
                        <span style="color: var(--gold-accent); font-weight: 600;">${job.salary || 'Competitive'}</span>
                    </div>
                    <p style="color: var(--muted-text); margin: 1rem 0;">${job.description ? job.description.substring(0, 150) + '...' : ''}</p>
                    <div class="job-meta">
                        <span><i class="fas fa-calendar"></i> Posted ${UI.formatDate(job.createdAt)}</span>
                        <span><i class="fas fa-users"></i> ${this.getApplicationCount(job.id)} applicants</span>
                    </div>
                    <div class="job-actions">
                        <a href="company-applicants.html?jobId=${job.id}" class="btn btn-ghost">View Applicants</a>
                        <button onclick="JobManager.editJob('${job.id}')" class="btn btn-ghost">Edit</button>
                        <button onclick="JobManager.deleteJob('${job.id}')" class="btn btn-ghost" style="color: #ef4444;">Delete</button>
                    </div>
                </div>
            `).join('');
        },

        getApplicationCount: function (jobId) {
            const applications = Storage.getApplicationsByJob(jobId);
            return applications.length;
        },

        editJob: function (jobId) {
            window.location.href = `company-post-job.html?id=${jobId}`;
        },

        deleteJob: function (jobId) {
            if (!Roles.canDeleteJob(jobId)) {
                UI.showToast('You do not have permission to delete this job', 'error');
                return;
            }

            UI.showConfirm('Are you sure you want to delete this job? This action cannot be undone.', () => {
                if (Storage.deleteJob(jobId)) {
                    UI.showToast('Job deleted successfully', 'success');
                    this.loadJobs();
                } else {
                    UI.showToast('Failed to delete job', 'error');
                }
            });
        },

        setupEventListeners: function () {
            // Search and filter can be added here
        }
    };

    // Auto-init if on jobs management page
    if (document.querySelector('.jobs-container')) {
        document.addEventListener('DOMContentLoaded', () => {
            JobManager.init();
        });
    }
})();
