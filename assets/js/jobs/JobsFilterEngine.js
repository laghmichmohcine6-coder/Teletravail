/**
 * JobsFilterEngine.js
 * Elite Jobs Page - Intelligent Filtering Engine
 * 
 * Core Logic:
 * - Always returns minimum 2 jobs
 * - Smart fallback system
 * - No duplicate jobs
 * - Performance optimized
 * 
 * Algorithm:
 * 1. Apply exact filters (category + type)
 * 2. If result >= 2 → return results
 * 3. If result === 1 → add 1 more from same category
 * 4. If result === 0 → return 2 from same category (or any if no category)
 */

class JobsFilterEngine {
    constructor(dataLayer) {
        this.dataLayer = dataLayer;
        this.MIN_RESULTS = 2;
    }

    /**
     * Main filtering method with intelligent fallback
     * @param {string} category - Category filter (empty string for all)
     * @param {string} type - Job type filter (empty string for all)
     * @returns {Object} { jobs: Array, isFallback: boolean, reason: string }
     */
    filter(category, type) {
        // Step 1: Try exact match
        const exactResults = this.dataLayer.getJobsByFilters(category, type);

        // Step 2: Check if we have enough results
        if (exactResults.length >= this.MIN_RESULTS) {
            return {
                jobs: exactResults,
                isFallback: false,
                reason: 'exact_match',
                count: exactResults.length
            };
        }

        // Step 3: Apply intelligent fallback
        return this._applyFallback(exactResults, category, type);
    }

    /**
     * Intelligent fallback system
     * @private
     */
    _applyFallback(exactResults, category, type) {
        const existingIds = new Set(exactResults.map(job => job.id));
        const needed = this.MIN_RESULTS - exactResults.length;

        // Case 1: We have 1 result, need 1 more
        if (exactResults.length === 1) {
            const additional = this._getFallbackJobs(category, needed, existingIds);

            return {
                jobs: [...exactResults, ...additional],
                isFallback: true,
                reason: 'partial_match_extended',
                count: exactResults.length + additional.length,
                originalCount: exactResults.length
            };
        }

        // Case 2: We have 0 results, need 2
        const fallbackJobs = this._getFallbackJobs(category, this.MIN_RESULTS, existingIds);

        return {
            jobs: fallbackJobs,
            isFallback: true,
            reason: category ? 'category_fallback' : 'global_fallback',
            count: fallbackJobs.length,
            originalCount: 0
        };
    }

    /**
     * Get fallback jobs intelligently
     * @private
     */
    _getFallbackJobs(category, count, excludeIds) {
        // If category is specified, get jobs from that category (ignore type)
        if (category) {
            const categoryJobs = this.dataLayer.getRandomJobsFromCategory(
                category,
                count,
                excludeIds
            );

            // If we still don't have enough, get from any category
            if (categoryJobs.length < count) {
                const stillNeeded = count - categoryJobs.length;
                const existingIds = new Set([
                    ...excludeIds,
                    ...categoryJobs.map(j => j.id)
                ]);

                const anyJobs = this.dataLayer.getRandomJobs(stillNeeded, existingIds);
                return [...categoryJobs, ...anyJobs];
            }

            return categoryJobs;
        }

        // No category specified, get any jobs
        return this.dataLayer.getRandomJobs(count, excludeIds);
    }

    /**
     * Validate filter results (ensure no duplicates)
     * @param {Array} jobs - Jobs to validate
     * @returns {boolean} True if valid
     */
    validateResults(jobs) {
        const ids = jobs.map(j => j.id);
        const uniqueIds = new Set(ids);

        if (ids.length !== uniqueIds.size) {
            console.error('Duplicate jobs detected in results!');
            return false;
        }

        return true;
    }

    /**
     * Get filter summary for UI display
     * @param {Object} filterResult - Result from filter()
     * @returns {string} Human-readable summary
     */
    getFilterSummary(filterResult) {
        const { count, isFallback, reason, originalCount } = filterResult;

        if (!isFallback) {
            return `${count} jobs found`;
        }

        switch (reason) {
            case 'partial_match_extended':
                return `${originalCount} exact match${originalCount === 1 ? '' : 'es'}, showing ${count} jobs`;
            case 'category_fallback':
                return `Showing ${count} jobs from this category`;
            case 'global_fallback':
                return `Showing ${count} available jobs`;
            default:
                return `${count} jobs found`;
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.JobsFilterEngine = JobsFilterEngine;
}
