/**
 * JobsAnimations.js
 * Elite Jobs Page - GSAP Animation Controller
 * 
 * Animations:
 * - Hero logo drop with impact effect
 * - Golden crack spread
 * - Glow pulse
 * - Card stagger reveal
 * - Smooth filtering transitions
 * - Micro-interactions
 * 
 * Requires: GSAP library
 */

class JobsAnimations {
    constructor() {
        this.isGSAPLoaded = typeof gsap !== 'undefined';

        if (!this.isGSAPLoaded) {
            console.warn('GSAP not loaded. Animations will be disabled.');
        }

        this.timelines = {};
        this.defaultDuration = 0.6;
        this.defaultEase = 'power3.out';
    }

    /**
     * Initialize all animations
     */
    init() {
        if (!this.isGSAPLoaded) return;

        this.initHeroAnimation();
        this.initScrollAnimations();
        this.initHoverEffects();
    }

    /**
     * Hero Logo Animation
     * - Drop from top
     * - Impact shake
     * - Golden crack spread
     * - Glow pulse
     */
    initHeroAnimation() {
        if (!this.isGSAPLoaded) return;

        const logo = document.querySelector('.hero-logo');
        const heroSection = document.querySelector('.jobs-hero');
        const cracks = document.querySelectorAll('.golden-crack');

        if (!logo || !heroSection) return;

        // Create master timeline
        const tl = gsap.timeline({ delay: 0.3 });

        // 1. Logo drops from top
        tl.from(logo, {
            y: -200,
            opacity: 0,
            duration: 0.8,
            ease: 'bounce.out',
            onComplete: () => {
                // Trigger impact effect
                this.createImpactEffect(heroSection);
            }
        });

        // 2. Screen shake on impact
        tl.to(heroSection, {
            x: -5,
            duration: 0.05,
            yoyo: true,
            repeat: 3,
            ease: 'power1.inOut'
        }, '-=0.2');

        // 3. Golden cracks spread
        if (cracks.length > 0) {
            tl.from(cracks, {
                scaleX: 0,
                transformOrigin: 'center',
                duration: 1.2,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.3');
        }

        // 4. Glow pulse (infinite)
        gsap.to(logo, {
            boxShadow: '0 0 30px rgba(198, 166, 75, 0.6)',
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });

        this.timelines.hero = tl;
    }

    /**
     * Create impact effect (particles/ripple)
     */
    createImpactEffect(container) {
        if (!this.isGSAPLoaded) return;

        const ripple = document.createElement('div');
        ripple.className = 'impact-ripple';
        container.appendChild(ripple);

        gsap.fromTo(ripple,
            {
                scale: 0,
                opacity: 1
            },
            {
                scale: 2,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            }
        );
    }

    /**
     * Animate job cards with stagger reveal
     * @param {NodeList|Array} cards - Job card elements
     */
    animateCards(cards) {
        if (!this.isGSAPLoaded || !cards || cards.length === 0) return;

        gsap.from(cards, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
        });
    }

    /**
     * Smooth filtering transition
     * @param {Function} callback - Function to execute during transition
     */
    async transitionFilter(callback) {
        if (!this.isGSAPLoaded) {
            callback();
            return;
        }

        const cards = document.querySelectorAll('.job-card');

        // Fade out old cards
        await gsap.to(cards, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.in'
        });

        // Execute callback (update DOM)
        callback();

        // Fade in new cards
        const newCards = document.querySelectorAll('.job-card');
        this.animateCards(newCards);
    }

    /**
     * Initialize scroll-based animations
     */
    initScrollAnimations() {
        if (!this.isGSAPLoaded || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate filter section
        gsap.from('.jobs-filters', {
            scrollTrigger: {
                trigger: '.jobs-filters',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    /**
     * Initialize hover micro-interactions
     */
    initHoverEffects() {
        if (!this.isGSAPLoaded) return;

        // Job card hover
        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('.job-card')) {
                const card = e.target.closest('.job-card');
                gsap.to(card, {
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.closest('.job-card')) {
                const card = e.target.closest('.job-card');
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }, true);

        // Button hover
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'back.out(1.7)'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    /**
     * Animate filter controls
     */
    animateFilterChange(element) {
        if (!this.isGSAPLoaded) return;

        gsap.fromTo(element,
            { scale: 0.95 },
            {
                scale: 1,
                duration: 0.2,
                ease: 'back.out(2)'
            }
        );
    }

    /**
     * Page transition out
     */
    async pageTransitionOut() {
        if (!this.isGSAPLoaded) return;

        await gsap.to('main', {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: 'power2.in'
        });
    }

    /**
     * Page transition in
     */
    pageTransitionIn() {
        if (!this.isGSAPLoaded) return;

        gsap.from('main', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        });
    }

    /**
     * Kill all animations
     */
    killAll() {
        if (!this.isGSAPLoaded) return;

        Object.values(this.timelines).forEach(tl => tl.kill());
        gsap.killTweensOf('*');
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.JobsAnimations = JobsAnimations;
}
