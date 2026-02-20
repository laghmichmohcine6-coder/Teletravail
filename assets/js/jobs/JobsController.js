/**
 * JobsController.js
 * Elite Jobs Page - Main Controller
 * 
 * Orchestrates all modules:
 * - Data Layer
 * - Filter Engine
 * - Renderer
 * - Animations
 */

class JobsController {
    constructor() {
        this.dataLayer = null;
        this.filterEngine = null;
        this.renderer = null;
        this.animations = null;

        this.currentFilters = {
            category: '',
            type: ''
        };
    }

    /**
     * Initialize the jobs page
     */
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize modules
            this.initModules();

            // Setup event listeners
            this.setupEventListeners();

            // Initial render
            this.applyFilters();

            // Initialize animations
            if (this.animations) {
                this.animations.init();
            }

            console.log('✅ Elite Jobs Page initialized successfully');
        } catch (error) {
            console.error('Failed to initialize jobs page:', error);
            this.handleError(error);
        }
    }

    /**
     * Initialize all modules
     */
    initModules() {
        // Get jobs data
        const jobsData = window.JobsData ? window.JobsData.getAll() : [];

        if (jobsData.length === 0) {
            console.warn('No jobs data found');
        }

        // Initialize data layer
        this.dataLayer = new JobsDataLayer(jobsData);

        // Initialize filter engine
        this.filterEngine = new JobsFilterEngine(this.dataLayer);

        // Initialize renderer
        this.renderer = new JobsRenderer('.jobs-grid', '#jobCount');

        // Initialize animations
        this.animations = new JobsAnimations();
    }

    /**
     * Setup event listeners for filters
     */
    setupEventListeners() {
        const categorySelect = document.getElementById('categoryFilter');
        const typeSelect = document.getElementById('typeFilter');

        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFiltersWithAnimation();

                // Animate the select element
                if (this.animations) {
                    this.animations.animateFilterChange(categorySelect);
                }
            });
        }

        if (typeSelect) {
            typeSelect.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFiltersWithAnimation();

                // Animate the select element
                if (this.animations) {
                    this.animations.animateFilterChange(typeSelect);
                }
            });
        }
    }

    /**
     * Apply filters and render results
     */
    applyFilters() {
        const { category, type } = this.currentFilters;

        // Get filtered results
        const result = this.filterEngine.filter(category, type);

        // Validate results
        if (!this.filterEngine.validateResults(result.jobs)) {
            console.error('Invalid filter results');
            return;
        }

        // Render jobs
        this.renderer.render(result.jobs, result);

        // Log filter info (for debugging)
        if (result.isFallback) {
            console.log(`ℹ️ Fallback applied: ${result.reason}`);
        }
    }

    /**
     * Apply filters with smooth animation
     */
    async applyFiltersWithAnimation() {
        if (this.animations && this.animations.isGSAPLoaded) {
            await this.animations.transitionFilter(() => {
                this.applyFilters();
            });
        } else {
            this.applyFilters();
        }
    }

    /**
     * Handle errors gracefully
     */
    handleError(error) {
        console.error('Jobs page error:', error);

        if (this.renderer) {
            this.renderer.showError();
        }
    }

    /**
     * Get current filter state
     */
    getFilterState() {
        return { ...this.currentFilters };
    }

    /**
     * Reset filters
     */
    resetFilters() {
        this.currentFilters = {
            category: '',
            type: ''
        };

        // Reset UI
        const categorySelect = document.getElementById('categoryFilter');
        const typeSelect = document.getElementById('typeFilter');

        if (categorySelect) categorySelect.value = '';
        if (typeSelect) typeSelect.value = '';

        // Re-render
        this.applyFiltersWithAnimation();
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.JobsController = JobsController;

    // Create global instance
    window.jobsController = new JobsController();
    window.jobsController.init();
}
