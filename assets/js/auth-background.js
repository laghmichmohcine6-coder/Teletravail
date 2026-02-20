/**
 * ============================================
 * AUTHENTICATION PAGE PARTICLE ANIMATION
 * Production-ready | Pure JavaScript
 * High performance with RequestAnimationFrame
 * Tiny gold particles floating upward
 * ============================================
 */

(function () {
    'use strict';

    // Configuration - Optimized for performance
    const CONFIG = {
        particleCount: 100,              // Number of particles
        minSize: 0.8,                    // Minimum particle size (tiny)
        maxSize: 2.5,                    // Maximum particle size (tiny)
        minSpeed: 0.4,                   // Minimum upward speed
        maxSpeed: 1.5,                   // Maximum upward speed
        glowRadius: 6,                   // Soft glow radius
        baseOpacity: 0.4,                // Base opacity
        maxOpacity: 0.8,                 // Maximum opacity
        driftAmount: 0.4,                // Horizontal drift amount
        goldColor: [255, 215, 0]         // RGB for gold
    };

    // Canvas setup
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) {
        console.error('Particle canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true  // Performance optimization
    });

    let particles = [];
    let animationId;
    let lastTime = 0;

    // Particle class - Optimized for performance
    class Particle {
        constructor() {
            this.reset();
            // Initial random Y position for first render
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
            this.speed = CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);
            this.opacity = CONFIG.baseOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.baseOpacity);
            this.drift = (Math.random() - 0.5) * CONFIG.driftAmount;
            // Slight pulsing effect
            this.pulseSpeed = 0.02 + Math.random() * 0.03;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }

        update(deltaTime) {
            // Normalize movement by deltaTime for consistent speed across frame rates
            const normalizedDelta = deltaTime / 16.67; // 60fps baseline

            this.y -= this.speed * normalizedDelta;
            this.x += this.drift * normalizedDelta;

            // Subtle pulsing opacity
            this.pulseOffset += this.pulseSpeed * normalizedDelta;
            const pulse = Math.sin(this.pulseOffset) * 0.1;

            // Reset particle when it goes off screen (top)
            if (this.y < -10) {
                this.reset();
            }

            // Wrap horizontally
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;

            return pulse;
        }

        draw(pulse) {
            const currentOpacity = Math.max(0, Math.min(1, this.opacity + pulse));

            // Soft glow effect
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, CONFIG.glowRadius
            );

            gradient.addColorStop(0, `rgba(${CONFIG.goldColor[0]}, ${CONFIG.goldColor[1]}, ${CONFIG.goldColor[2]}, ${currentOpacity * 0.5})`);
            gradient.addColorStop(0.4, `rgba(${CONFIG.goldColor[0]}, ${CONFIG.goldColor[1]}, ${CONFIG.goldColor[2]}, ${currentOpacity * 0.25})`);
            gradient.addColorStop(1, `rgba(${CONFIG.goldColor[0]}, ${CONFIG.goldColor[1]}, ${CONFIG.goldColor[2]}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, CONFIG.glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Core particle (tiny and bright)
            ctx.fillStyle = `rgba(${CONFIG.goldColor[0]}, ${CONFIG.goldColor[1]}, ${CONFIG.goldColor[2]}, ${currentOpacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Resize canvas to fill window
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(dpr, dpr);
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop - Optimized with deltaTime
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Draw dark matte background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0d0d0d');
        gradient.addColorStop(0.5, '#1a1a1a');
        gradient.addColorStop(1, '#121212');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const pulse = particles[i].update(deltaTime);
            particles[i].draw(pulse);
        }

        animationId = requestAnimationFrame(animate);
    }

    // Initialize
    function init() {
        resizeCanvas();
        initParticles();
        lastTime = performance.now();
        animate(lastTime);
    }

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 200);
    });

    // Pause animation when tab is hidden (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            lastTime = performance.now();
            animate(lastTime);
        }
    });

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
