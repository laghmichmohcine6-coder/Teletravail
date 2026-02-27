/**
 * Télétravail - Advanced Animations
 * Particle effects and advanced visual interactions
 */

// ========================================
// PARTICLE SYSTEM
// ========================================
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.particleCount = 10;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle(i);
        }
    }

    createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${index * 0.8}s`;
        particle.style.animationDuration = `${8 + Math.random() * 4}s`;
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// Initialize particles on hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        new ParticleSystem(particlesContainer);
    }
});

// ========================================
// TYPING EFFECT
// ========================================
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ========================================
// TILT EFFECT
// ========================================
class TiltEffect {
    constructor(element, maxTilt = 10) {
        this.element = element;
        this.maxTilt = maxTilt;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * this.maxTilt;
        const tiltY = ((centerX - x) / centerX) * this.maxTilt;

        this.element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    handleMouseLeave() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Apply tilt effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const tiltCards = document.querySelectorAll('.tilt-effect');
    tiltCards.forEach(card => new TiltEffect(card));
});

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================
class MagneticButton {
    constructor(element, strength = 0.3) {
        this.element = element;
        this.strength = strength;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.element.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
    }

    handleMouseLeave() {
        this.element.style.transform = 'translate(0, 0)';
    }
}

// Apply magnetic effect to primary buttons (skip Apply Now — inline transform bypasses !important)
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn-primary');
    magneticButtons.forEach(btn => {
        if (btn.id === 'applyBtn' || btn.classList.contains('btn-apply-large')) return;
        new MagneticButton(btn);
    });
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gold-gradient);
    z-index: 10000;
    transition: width 0.1s ease;
  `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

document.addEventListener('DOMContentLoaded', initScrollProgress);

// ========================================
// RIPPLE EFFECT ON CLICK
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple-effect');

    const rippleEffect = button.getElementsByClassName('ripple-effect')[0];
    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);
}

// Add ripple to all buttons (skip Apply Now — child span expansion causes layout bump)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.id === 'applyBtn' || button.classList.contains('btn-apply-large')) return;
        button.addEventListener('click', createRipple);
    });
});

// ========================================
// PARALLAX SCROLL
// ========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', initParallax);

// ========================================
// STAGGER ANIMATION
// ========================================
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
        element.classList.add('stagger-item');
    });
}

// ========================================
// EXPORT
// ========================================
window.TeletravailAnimations = {
    ParticleSystem,
    TypingEffect,
    TiltEffect,
    MagneticButton,
    staggerAnimation
};
