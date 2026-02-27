/**
 * JobDetailsRenderer.js
 * Handles the dynamic rendering of the Job Details page
 */

class JobDetailsRenderer {
    constructor() {
        this.container = document.getElementById('jobContent');
        this.urlParams = new URLSearchParams(window.location.search);
        this.jobId = this.urlParams.get('id');
    }

    init() {
        if (!this.container) return;

        if (!this.jobId) {
            this.showError('No job specified.');
            return;
        }

        // Wait for JobsData to be available
        if (window.JobsData) {
            this.loadJob();
        } else {
            // Retry if data not loaded yet
            setTimeout(() => this.init(), 100);
        }
    }

    loadJob() {
        const job = window.JobsData.getById(this.jobId);

        if (!job) {
            this.showError('Job not found.');
            return;
        }

        document.title = `${job.title} at ${job.company} - Teletravail`;
        this.render(job);
        this.setupEventListeners(job);
    }

    render(job) {
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k, d) => d || k;
        // 1. Render Main Content using the new CSS classes
        const mainContent = `
            <div class="details-card reveal-up">
                <div class="job-header-section">
                    <div class="company-logo-large">
                        ${job.companyLogo || job.company.charAt(0)}
                    </div>
                    <div>
                        <h1 class="job-title-large">${job.title}</h1>
                        <div class="company-name-link">
                            <i class="fas fa-building"></i> ${job.company}
                        </div>
                        <div class="job-badges" style="margin-top: var(--spacing-md);">
                             <span class="badge badge-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                             <span class="badge badge-type"><i class="fas fa-clock"></i> ${job.type}</span>
                             <span class="badge badge-category"><i class="fas fa-tag"></i> ${job.category}</span>
                             ${job.experienceLevel ? `<span class="badge" style="background: rgba(255,255,255,0.1); color: var(--text-light); border: 1px solid rgba(255,255,255,0.2);"><i class="fas fa-layer-group"></i> ${job.experienceLevel}</span>` : ''}
                        </div>
                    </div>
                </div>

                <div class="job-rich-text">
                    <h3>${t('about_role')}</h3>
                    ${job.fullDescription || `<p>${job.description}</p>`}

                    ${this._renderList(t('responsibilities'), job.responsibilities)}
                    ${this._renderList(t('requirements'), job.requirements)}
                
                    <h3>${t('required_skills')}</h3>
                    <div class="skills-container">
                        ${(job.skills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        // 2. Render Sidebar
        const sidebar = `
            <div class="sidebar-wrapper">
                <div class="sidebar-card reveal-left">
                    <div class="action-buttons">
                        <button id="applyBtn" class="btn btn-primary btn-apply-large">
                            ${t('apply_now')} <i class="fas fa-arrow-right"></i>
                        </button>
                        <button class="btn btn-ghost" style="width: 100%; border-color: rgba(198, 166, 75, 0.3); color: var(--gold-accent);">
                            <i class="far fa-bookmark"></i> ${t('save_job')}
                        </button>
                    </div>

                    <div class="sidebar-info-row">
                        <span class="info-label">${t('label_salary')}</span>
                        <span class="info-value salary">${job.salary}</span>
                    </div>
                    <div class="sidebar-info-row">
                        <span class="info-label">${t('label_posted')}</span>
                        <span class="info-value">${this._formatDate(job.createdAt)}</span>
                    </div>
                    <div class="sidebar-info-row">
                        <span class="info-label">${t('label_experience')}</span>
                        <span class="info-value">${job.location}</span>
                    </div>
                    <div class="sidebar-info-row">
                        <span class="info-label">${t('filter_type')}</span>
                        <span class="info-value">${job.type}</span>
                    </div>
                    
                    <div style="margin-top: var(--spacing-lg); padding-top: var(--spacing-lg); border-top: 1px solid rgba(255,255,255,0.1);">
                        <p style="color: var(--muted-text); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">${t('share_job')}</p>
                        <div style="display: flex; gap: var(--spacing-sm);">
                            <button class="btn btn-ghost btn-sm"><i class="fab fa-linkedin"></i></button>
                            <button class="btn btn-ghost btn-sm"><i class="fab fa-twitter"></i></button>
                            <button class="btn btn-ghost btn-sm"><i class="fas fa-link"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Combine
        this.container.innerHTML = mainContent + sidebar;

        // Add class to container for grid layout
        this.container.className = 'job-details-grid';

        // 3. Inject Modal
        this._injectModal(job);

        // Trigger animations if available
        if (window.ScrollReveal) {
            window.ScrollReveal().reveal('.reveal-up', { delay: 200, distance: '20px', origin: 'bottom' });
            window.ScrollReveal().reveal('.reveal-left', { delay: 400, distance: '20px', origin: 'right' });
        }
    }

    _renderList(title, items) {
        if (!items || items.length === 0) return '';

        // Handle case where items might be a single string (legacy data)
        let listItems = [];
        if (Array.isArray(items)) {
            listItems = items;
        } else if (typeof items === 'string') {
            // Try to split by comma if resembles list, otherwise single item
            listItems = items.includes(',') ? items.split(',').map(i => i.trim()) : [items];
        }

        const listHtml = listItems.map(item => `<li>${item}</li>`).join('');

        return `
            <h3>${title}</h3>
            <ul>${listHtml}</ul>
        `;
    }

    _formatDate(dateString) {
        if (!dateString) return window.i18n ? window.i18n.t('recently_posted') : 'Recently';
        try {
            const date = new Date(dateString);
            const lang = (window.i18n && window.i18n.currentLang) || 'en';
            return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) {
            return dateString;
        }
    }

    _injectModal(job) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();
        const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k, d) => d || k;

        const modalHtml = `
            <div id="applicationModal" class="modal-overlay">
                <div class="apply-modal">
                    <button class="modal-close" id="closeModalBtn">&times;</button>
                    
                    <h2 style="color: var(--gold-accent); margin-bottom: var(--spacing-sm);">${t('modal_apply_for')} ${job.title}</h2>
                    <p style="color: var(--muted-text); margin-bottom: var(--spacing-lg);">${t('modal_at')} ${job.company}</p>

                    <form id="applicationForm">
                        <div style="margin-bottom: var(--spacing-md);">
                            <label style="display: block; color: var(--text-light); margin-bottom: 0.5rem;">${t('form_full_name')}</label>
                            <input type="text" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: var(--radius-sm); outline: none;">
                        </div>
                        
                        <div style="margin-bottom: var(--spacing-md);">
                            <label style="display: block; color: var(--text-light); margin-bottom: 0.5rem;">${t('form_email_addr')}</label>
                            <input type="email" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: var(--radius-sm); outline: none;">
                        </div>

                        <div style="margin-bottom: var(--spacing-md);">
                            <label style="display: block; color: var(--text-light); margin-bottom: 0.5rem;">${t('form_resume')}</label>
                            <input type="url" placeholder="https://linkedin.com/in/..." style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: var(--radius-sm); outline: none;">
                        </div>

                         <div style="margin-bottom: var(--spacing-xl);">
                            <label style="display: block; color: var(--text-light); margin-bottom: 0.5rem;">${t('form_cover_letter')}</label>
                            <textarea rows="4" style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: var(--radius-sm); outline: none; font-family: inherit;"></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; cursor: pointer;">
                            ${t('btn_submit')}
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    setupEventListeners(job) {
        const applyBtn = document.getElementById('applyBtn');
        const modal = document.getElementById('applicationModal');
        const closeBtn = document.getElementById('closeModalBtn');
        const form = document.getElementById('applicationForm');

        if (applyBtn && modal) {
            applyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on click outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                // btn.disabled = true; // disabled style might need css, keeping it simpler

                // Simulate API call
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Applied Successfully!';
                    btn.style.background = '#48bb78'; // Success green
                    btn.style.borderColor = '#48bb78';

                    // Simple toast fallback if UI is not available
                    const successMsg = window.i18n ? window.i18n.t('application_submitted') : 'Application submitted successfully!';
                    if (window.UI && window.UI.showToast) {
                        window.UI.showToast(successMsg, 'success');
                    } else {
                        console.log(successMsg);
                    }

                    setTimeout(() => {
                        modal.classList.remove('active');
                        btn.innerHTML = originalText;
                        // btn.disabled = false;
                        btn.style.background = ''; // Reset
                        btn.style.borderColor = '';
                        form.reset();
                    }, 1500);
                }, 1500);
            });
        }
    }

    showError(message) {
        this.container.innerHTML = `
            <div style="text-align: center; padding: 5rem; grid-column: 1 / -1;">
                <h2 style="font-size: 3rem; margin-bottom: 1rem;"><i class="fas fa-exclamation-circle" style="color: var(--gold-accent);"></i></h2>
                <h2 style="margin-bottom: 1rem; color: var(--text-light);">Job Not Found</h2>
                <p style="color: var(--muted-text); margin-bottom: 2rem;">${message}</p>
                <a href="jobs.html" class="btn btn-primary">Browse Jobs</a>
            </div>
        `;
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the details page by looking for the unique container
    const container = document.getElementById('jobContent');
    if (container) {
        const renderer = new JobDetailsRenderer();
        renderer.init();
    }
});
