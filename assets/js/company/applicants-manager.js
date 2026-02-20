(function () {
    'use strict';

    window.ApplicantsManager = {
        init: function () {
            if (!Guards.requireCompany()) return;

            const urlParams = new URLSearchParams(window.location.search);
            this.jobId = urlParams.get('jobId');

            if (!this.jobId) {
                window.location.href = 'company-jobs.html';
                return;
            }

            if (!Roles.canViewApplicants(this.jobId)) {
                UI.showToast('You do not have permission to view these applicants', 'error');
                window.location.href = 'company-jobs.html';
                return;
            }

            this.loadJobInfo();
            this.loadApplicants();
            this.setupEventListeners();
        },

        loadJobInfo: function () {
            const job = Storage.getJobById(this.jobId);
            const titleEl = document.querySelector('.job-title');

            if (titleEl && job) {
                titleEl.textContent = `Applicants for ${job.title}`;
            }
        },

        loadApplicants: function () {
            const applications = Storage.getApplicationsByJob(this.jobId);
            const container = document.querySelector('.applicants-container');

            if (!container) return;

            if (applications.length === 0) {
                UI.showEmptyState(container, 'No applicants yet', '', '');
                return;
            }

            container.innerHTML = applications.map(app => {
                const user = Storage.getUserByEmail(app.userEmail);

                return `
                    <div class="applicant-card card hover-lift">
                        <div class="applicant-header">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user ? user.name : app.userName || 'User')}&background=D4AF37&color=0B0B0B&size=128" 
                                     alt="Avatar" 
                                     style="width: 60px; height: 60px; border-radius: 50%;">
                                <div>
                                    <h3>${user ? user.name : app.userName || 'N/A'}</h3>
                                    <p>${user ? user.email : app.userEmail || 'N/A'}</p>
                                </div>
                            </div>
                            <span class="badge badge-${this.getStatusColor(app.status)}">${app.status}</span>
                        </div>
                        ${app.coverLetter ? `
                            <div class="applicant-cover-letter">
                                <h4>Cover Letter</h4>
                                <p>${app.coverLetter}</p>
                            </div>
                        ` : ''}
                        <div class="applicant-meta">
                            <span><i class="fas fa-calendar"></i> Applied ${UI.formatDate(app.createdAt)}</span>
                            <span><i class="fas fa-clock"></i> ${UI.timeAgo(app.createdAt)}</span>
                        </div>
                        <div class="applicant-actions">
                            <button onclick="ApplicantsManager.updateStatus('${app.id}', 'interview')" class="btn btn-ghost">Schedule Interview</button>
                            <button onclick="ApplicantsManager.updateStatus('${app.id}', 'accepted')" class="btn btn-ghost" style="color: #10b981;">Accept</button>
                            <button onclick="ApplicantsManager.updateStatus('${app.id}', 'rejected')" class="btn btn-ghost" style="color: #ef4444;">Reject</button>
                        </div>
                    </div>
                `;
            }).join('');
        },

        updateStatus: function (applicationId, status) {
            const statusText = {
                interview: 'schedule an interview with',
                accepted: 'accept',
                rejected: 'reject'
            };

            UI.showConfirm(`Are you sure you want to ${statusText[status]} this applicant?`, () => {
                if (Storage.updateApplication(applicationId, { status })) {
                    UI.showToast(`Application ${status} successfully`, 'success');
                    this.loadApplicants();
                } else {
                    UI.showToast('Failed to update application', 'error');
                }
            });
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

    // Auto-init if on applicants page
    if (document.querySelector('.applicants-container')) {
        document.addEventListener('DOMContentLoaded', () => {
            ApplicantsManager.init();
        });
    }
})();
