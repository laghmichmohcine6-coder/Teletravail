

// Premium Page Transitions
const PageTransitions = {
    init() {
        // Add transition styles
        this.addStyles();

        // Intercept all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || link.target === '_blank') return;

            e.preventDefault();
            this.navigate(href);
        });

        // Entrance animation
        this.enter();
    },

    addStyles() {
        if (document.getElementById('page-transition-styles')) return;

        const style = document.createElement('style');
        style.id = 'page-transition-styles';
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0B0B0B;
                z-index: 9999;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.4s ease;
            }
            
            .page-transition-overlay.active {
                opacity: 1;
            }
            
            body.page-entering {
                animation: pageEnter 0.6s ease forwards;
            }
            
            @keyframes pageEnter {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    },

    navigate(url) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        // Trigger transition
        setTimeout(() => overlay.classList.add('active'), 10);

        // Navigate after transition
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    },

    enter() {
        document.body.classList.add('page-entering');
        setTimeout(() => {
            document.body.classList.remove('page-entering');
        }, 600);
    }
};

// Scroll Reveal Animations
const ScrollReveal = {
    init() {
        this.addStyles();
        this.observe();
    },

    addStyles() {
        if (document.getElementById('scroll-reveal-styles')) return;

        const style = document.createElement('style');
        style.id = 'scroll-reveal-styles';
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-scale {
                opacity: 0;
                transform: scale(0.9);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .reveal-scale.revealed {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
    },

    observe() {
        const elements = document.querySelectorAll('.reveal, .reveal-scale');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }
};

// Micro Interactions
const MicroInteractions = {
    init() {
        this.addButtonEffects();
        this.addCardHovers();
    },

    addButtonEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Skip the Apply Now button -- inline style.transform bypasses !important CSS locks.
            if (btn.id === 'applyBtn' || btn.classList.contains('btn-apply-large')) return;

            btn.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-2px)';
            });

            btn.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });

            btn.addEventListener('mousedown', function () {
                this.style.transform = 'translateY(0) scale(0.98)';
            });

            btn.addEventListener('mouseup', function () {
                this.style.transform = 'translateY(-2px) scale(1)';
            });
        });
    },

    addCardHovers() {
        document.querySelectorAll('.card, .stat-card, .job-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });
    }
};

// Initialize all animations
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        PageTransitions.init();
        ScrollReveal.init();
        MicroInteractions.init();
    });
}
