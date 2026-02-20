/**
 * JobsDataLayer.js
 * Elite Jobs Page - Data Management Layer
 * 
 * Responsibilities:
 * - Job data indexing and caching
 * - Category-based lookups (O(1) performance)
 * - Data utilities and transformations
 * 
 * Performance: Optimized for 1000+ jobs
 */

class JobsDataLayer {
    constructor(jobsData) {
        this.allJobs = jobsData || [];
        this.categoryIndex = new Map();
        this.cache = new Map();
        this._buildIndexes();
    }

    /**
     * Build category index for O(1) lookups
     * @private
     */
    _buildIndexes() {
        this.categoryIndex.clear();

        this.allJobs.forEach(job => {
            const category = job.category.toLowerCase();

            if (!this.categoryIndex.has(category)) {
                this.categoryIndex.set(category, []);
            }

            this.categoryIndex.get(category).push(job);
        });
    }

    /**
     * Get all jobs
     * @returns {Array} All jobs
     */
    getAllJobs() {
        return this.allJobs;
    }

    /**
     * Get jobs by category (O(1) lookup)
     * @param {string} category - Category name
     * @returns {Array} Jobs in category
     */
    getJobsByCategory(category) {
        if (!category) return this.allJobs;

        const key = category.toLowerCase();
        return this.categoryIndex.get(key) || [];
    }

    /**
     * Get jobs by exact filters
     * @param {string} category - Category filter
     * @param {string} type - Job type filter
     * @returns {Array} Filtered jobs
     */
    getJobsByFilters(category, type) {
        const cacheKey = `${category}|${type}`;

        // Check cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        let results = this.allJobs;

        // Apply category filter
        if (category) {
            results = this.getJobsByCategory(category);
        }

        // Apply type filter
        if (type) {
            results = results.filter(job => job.type === type);
        }

        // Cache results
        this.cache.set(cacheKey, results);

        return results;
    }

    /**
     * Get random jobs from category (excluding specific jobs)
     * @param {string} category - Category name
     * @param {number} count - Number of jobs needed
     * @param {Set} excludeIds - Job IDs to exclude
     * @returns {Array} Random jobs
     */
    getRandomJobsFromCategory(category, count, excludeIds = new Set()) {
        const categoryJobs = this.getJobsByCategory(category);
        const available = categoryJobs.filter(job => !excludeIds.has(job.id));

        // Shuffle and take first N
        const shuffled = this._shuffle(available);
        return shuffled.slice(0, count);
    }

    /**
     * Get random jobs from any category
     * @param {number} count - Number of jobs needed
     * @param {Set} excludeIds - Job IDs to exclude
     * @returns {Array} Random jobs
     */
    getRandomJobs(count, excludeIds = new Set()) {
        const available = this.allJobs.filter(job => !excludeIds.has(job.id));
        const shuffled = this._shuffle(available);
        return shuffled.slice(0, count);
    }

    /**
     * Fisher-Yates shuffle algorithm
     * @private
     */
    _shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Clear cache (call when data changes)
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get statistics
     * @returns {Object} Data statistics
     */
    getStats() {
        return {
            totalJobs: this.allJobs.length,
            categories: Array.from(this.categoryIndex.keys()),
            categoryCount: this.categoryIndex.size
        };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.JobsDataLayer = JobsDataLayer;
}
