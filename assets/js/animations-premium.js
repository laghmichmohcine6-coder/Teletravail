// Premium Logo Intro Animation
const LogoIntro = {
    init() {
        // Check if intro has been shown in this session
        const introShown = sessionStorage.getItem('introShown');

        if (!introShown) {
            this.show();
            sessionStorage.setItem('introShown', 'true');
        } else {
            // Skip intro, just show page
            document.body.classList.add('intro-complete');
        }
    },

    show() {
        // Create intro overlay
        const overlay = document.createElement('div');
        overlay.className = 'logo-intro-overlay';
        overlay.innerHTML = `
            <div class="logo-intro-container">
                <div class="logo-intro-icon">T</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Add CSS if not already present
        if (!document.getElementById('logo-intro-styles')) {
            const style = document.createElement('style');
            style.id = 'logo-intro-styles';
            style.textContent = `
                .logo-intro-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0B0B0B;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: introFadeOut 0.8s ease 3.2s forwards;
                }
                
                .logo-intro-container {
                    position: relative;
                }
                
                .logo-intro-icon {
                    font-size: 120px;
                    font-weight: 900;
                    background: linear-gradient(135deg, #D4AF37 0%, #F5BD02 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: logoFall 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                    filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.5));
                }
                
                @keyframes logoFall {
                    0% {
                        transform: translateY(-100vh) scale(0.5);
                        opacity: 0;
                    }
                    70% {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                    80% {
                        transform: translateY(-20px) scale(1.05);
                    }
                    90% {
                        transform: translateY(5px) scale(0.98);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes introFadeOut {
                    to {
                        opacity: 0;
                        visibility: hidden;
                    }
                }
                
                body:not(.intro-complete) {
                    overflow: hidden;
                }
                
                .intro-complete .logo-intro-overlay {
                    display: none;
                }
            `;
            document.head.appendChild(style);
        }

        // Earthquake effect on landing
        setTimeout(() => {
            this.earthquake();
            this.flash();
        }, 1200);

        // Complete intro
        setTimeout(() => {
            document.body.classList.add('intro-complete');
            overlay.remove();
        }, 4000);
    },

    earthquake() {
        const body = document.body;
        body.style.animation = 'earthquake 0.5s ease';

        // Add earthquake keyframes if not present
        if (!document.getElementById('earthquake-styles')) {
            const style = document.createElement('style');
            style.id = 'earthquake-styles';
            style.textContent = `
                @keyframes earthquake {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5px, 2px); }
                    20% { transform: translate(5px, -2px); }
                    30% { transform: translate(-3px, 3px); }
                    40% { transform: translate(3px, -3px); }
                    50% { transform: translate(-2px, 2px); }
                    60% { transform: translate(2px, -2px); }
                    70% { transform: translate(-1px, 1px); }
                    80% { transform: translate(1px, -1px); }
                    90% { transform: translate(-1px, 0); }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            body.style.animation = '';
        }, 500);
    },

    flash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
            z-index: 99998;
            pointer-events: none;
            animation: flashEffect 0.4s ease;
        `;
        document.body.appendChild(flash);

        // Add flash keyframes
        if (!document.getElementById('flash-styles')) {
            const style = document.createElement('style');
            style.id = 'flash-styles';
            style.textContent = `
                @keyframes flashEffect {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => flash.remove(), 400);
    }
};

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
        // Only show logo intro on homepage
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            LogoIntro.init();
        }

        PageTransitions.init();
        ScrollReveal.init();
        MicroInteractions.init();
    });
}
