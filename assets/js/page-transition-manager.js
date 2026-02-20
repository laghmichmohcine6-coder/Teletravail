/**
 * Télétravail — Premium Page Transition Manager
 * ─────────────────────────────────────────────
 * Animation concept:
 *   EXIT  → black overlay fades in (300ms), then navigate
 *   ENTER → overlay immediately gone, page content fades + slides up (420ms)
 *
 * A thin gold progress bar runs during navigation for extra polish.
 *
 * Works on ALL pages — dashboard & public.
 * No GSAP, no heavy dependencies.
 */

(function () {
    'use strict';

    /* ── Config ──────────────────────────────────────────────── */
    const DURATION_OUT = 300;   // ms — must match --pt-duration-out in CSS
    const DURATION_IN = 420;   // ms — must match --pt-duration-in  in CSS

    /* ── State ───────────────────────────────────────────────── */
    let isTransitioning = false;

    /* Pages that qualify for animated navigation.
     * Using a simple include-check so relative and absolute hrefs both match. */
    const INTERNAL_PAGES = [
        'index.html',
        'jobs.html',
        'job-details.html',
        'about.html',
        'contact.html',
        'login.html',
        'register.html',
        'apply.html',
        'dashboard.html',
        'dashboard-applications.html',
        'profile.html',
        'company-login.html',
        'company-register.html',
        'company-dashboard.html',
        'company-jobs.html',
        'company-post-job.html',
        'company-profile.html',
        'company-applicants.html',
    ];

    /* ── Progress bar ────────────────────────────────────────── */
    let progressBar;

    function createProgressBar() {
        if (document.getElementById('pt-progress')) return;
        progressBar = document.createElement('div');
        progressBar.id = 'pt-progress';
        document.body.appendChild(progressBar);
    }

    function startProgress() {
        if (!progressBar) return;
        progressBar.classList.add('pt-running');
    }

    function stopProgress() {
        if (!progressBar) return;
        progressBar.classList.remove('pt-running');
        /* Fast fade-out */
        progressBar.style.width = '100%';
        progressBar.style.opacity = '0';
        setTimeout(() => {
            progressBar.style.width = '0%';
            progressBar.style.opacity = '';
        }, 300);
    }

    /* ── Helpers ─────────────────────────────────────────────── */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function isInternalLink(link) {
        const href = link.getAttribute('href');
        if (!href) return false;
        if (href.startsWith('#')) return false;     // Hash-only links
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if (link.target === '_blank') return false;
        if (link.hasAttribute('data-action')) return false;    // e.g. logout
        if (link.hasAttribute('onclick') && link.getAttribute('onclick').includes('logout')) return false;

        return INTERNAL_PAGES.some(page => href.includes(page));
    }

    /* ── Exit animation ──────────────────────────────────────── */
    async function exitPage() {
        if (prefersReducedMotion()) return;

        document.body.classList.add('pt-exit');
        document.documentElement.classList.add('pt-active');
        await delay(DURATION_OUT);
    }

    /* ── Entrance animation ──────────────────────────────────── */
    function enterPage() {
        /* Make sure overlay is gone immediately on new page */
        document.body.classList.remove('pt-exit');
        document.documentElement.classList.remove('pt-active');

        const wrapper = document.querySelector('.page-transition');
        if (!wrapper) {
            stopProgress();
            return;
        }

        /* Start invisible, then trigger transition on next frame */
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(18px)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                wrapper.classList.add('pt-visible');
                wrapper.style.opacity = '';
                wrapper.style.transform = '';

                setTimeout(() => {
                    wrapper.style.willChange = 'auto';
                    stopProgress();
                    isTransitioning = false;
                }, DURATION_IN);
            });
        });
    }

    /* ── Navigate ────────────────────────────────────────────── */
    async function navigateTo(url) {
        if (isTransitioning) return;
        isTransitioning = true;

        startProgress();

        try {
            await exitPage();
            window.location.href = url;
        } catch (err) {
            /* Fallback — never block navigation */
            window.location.href = url;
        }
    }

    /* ── Intercept clicks ────────────────────────────────────── */
    function interceptClicks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && isInternalLink(link)) {
                e.preventDefault();
                navigateTo(link.href);
            }
        });
    }

    /* ── Handle browser back/forward ─────────────────────────── */
    function handleBrowserNav() {
        /* If page is served from bfcache (back/forward), reset state */
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                isTransitioning = false;
                document.body.classList.remove('pt-exit');
                document.documentElement.classList.remove('pt-active');
                enterPage();
            }
        });

        window.addEventListener('popstate', () => {
            isTransitioning = false;
        });
    }

    /* ── Hide initial loading screen ─────────────────────────── */
    function hideInitialLoader() {
        const loader = document.querySelector('.loading-screen');
        if (loader) {
            setTimeout(() => loader.classList.add('hidden'), 400);
        }
    }

    /* ── Bootstrap ───────────────────────────────────────────── */
    function init() {
        createProgressBar();
        interceptClicks();
        handleBrowserNav();
        hideInitialLoader();
        enterPage();   /* Animate current page entrance */
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
