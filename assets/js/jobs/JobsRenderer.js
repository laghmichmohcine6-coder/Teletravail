/**
 * JobsRenderer.js
 * Elite Jobs Page - DOM Rendering Engine
 * 
 * Responsibilities:
 * - Generate job card HTML
 * - Update DOM efficiently
 * - Handle empty states (though never shown due to smart filtering)
 * - Manage job count display
 */

class JobsRenderer {
    constructor(containerSelector, countSelector) {
        this.container = document.querySelector(containerSelector);
        this.countElement = document.querySelector(countSelector);

        if (!this.container) {
            console.error(`Container not found: ${containerSelector}`);
        }
    }

    /**
     * Render jobs to the DOM
     * @param {Array} jobs - Jobs to render
     * @param {Object} filterResult - Filter result metadata
     */
    render(jobs, filterResult = {}) {
        // Clear existing content
        this.container.innerHTML = '';

        // Update count
        this.updateCount(filterResult);

        // Render each job card
        jobs.forEach((job, index) => {
            const card = this.createJobCard(job, index);
            this.container.appendChild(card);
        });
    }

    /**
     * Create a premium job card element
     * @param {Object} job - Job data
     * @param {number} index - Card index for animation
     * @returns {HTMLElement} Job card element
     */
    createJobCard(job, index) {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.setAttribute('data-job-id', job.id);
        card.setAttribute('data-index', index);
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="job-card-header">
                <div class="job-company-info">
                    <div class="job-logo">
                        ${job.companyLogo || job.company.charAt(0)}
                    </div>
                    <div class="job-company-details">
                        <h3 class="job-title">${this._escapeHtml(job.title)}</h3>
                        <p class="job-company">${this._escapeHtml(job.company)}</p>
                    </div>
                </div>
                <button class="job-bookmark-btn" onclick="event.stopPropagation();" aria-label="Bookmark job">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>

            <div class="job-badges">
                <span class="badge badge-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${this._escapeHtml(job.location)}
                </span>
                <span class="badge badge-type">
                    <i class="fas fa-clock"></i>
                    ${this._escapeHtml(job.type)}
                </span>
                <span class="badge badge-category">
                    <i class="fas fa-tag"></i>
                    ${this._escapeHtml(job.category)}
                </span>
            </div>

            <p class="job-description">
                ${this._escapeHtml(job.description)}
            </p>

            <div class="job-footer">
                <span class="job-salary">${this._escapeHtml(job.salary)}</span>
                <button class="btn btn-primary job-apply-btn" onclick="event.stopPropagation();">
                    ${window.i18n ? window.i18n.t('apply_now') : 'Apply Now'}
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        // Add click handler for navigation
        card.addEventListener('click', () => {
            window.location.href = `job-details.html?id=${job.id}`;
        });

        return card;
    }

    /**
     * Update job count display
     * @param {Object} filterResult - Filter result metadata
     */
    updateCount(filterResult) {
        if (!this.countElement) return;

        const count = filterResult.count || 0;
        this.countElement.textContent = count;

        // Add visual feedback for fallback results
        if (filterResult.isFallback) {
            this.countElement.classList.add('fallback-count');
        } else {
            this.countElement.classList.remove('fallback-count');
        }
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.container.innerHTML = `
            <div class="jobs-loading">
                <div class="loading-spinner"></div>
                <p>Loading amazing opportunities...</p>
            </div>
        `;
    }

    /**
     * Show error state (fallback only)
     */
    showError(message = 'Something went wrong. Please try again.') {
        this.container.innerHTML = `
            <div class="jobs-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops!</h3>
                <p>${this._escapeHtml(message)}</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    Refresh Page
                </button>
            </div>
        `;
    }

    /**
     * Get all rendered job cards
     * @returns {NodeList} Job card elements
     */
    getJobCards() {
        return this.container.querySelectorAll('.job-card');
    }

    /**
     * Clear container
     */
    clear() {
        this.container.innerHTML = '';
    }

    /**
     * Escape HTML to prevent XSS
     * @private
     */
    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.JobsRenderer = JobsRenderer;

    // Re-render job cards whenever the language changes
    document.addEventListener('languageChanged', () => {
        // Update any static data-i18n elements inside job cards that were
        // already rendered (the "jobs found" span is handled by i18n.updatePage,
        // but Apply Now buttons inside cards need a re-render).
        document.querySelectorAll('.job-apply-btn').forEach(btn => {
            // Preserve the icon
            const icon = btn.querySelector('i');
            btn.textContent = window.i18n ? window.i18n.t('apply_now') : 'Apply Now';
            if (icon) btn.appendChild(icon);
        });
    });
}
