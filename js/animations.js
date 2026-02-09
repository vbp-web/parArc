// Scroll-based animation controller
class ScrollAnimations {
    constructor(scene3D) {
        this.scene3D = scene3D;
        this.scrollProgress = 0;
        this.targetScrollProgress = 0;
        this.sections = [];
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupIntersectionObserver();
        this.animate();
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.targetScrollProgress = window.scrollY / scrollHeight;
        
        // Update 3D scene based on scroll
        if (this.scene3D) {
            this.scene3D.updateScroll(this.targetScrollProgress);
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-up, .project-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }
    }

    animateProjectCard(card) {
        const delay = parseFloat(card.dataset.delay || 0);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, delay * 1000);
    }

    animate() {
        // Smooth lerp for scroll progress
        this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.05;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Text animation utilities
class TextAnimations {
    static splitText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s`;
            element.appendChild(span);
        });

        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    static fadeInWords(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            span.style.marginRight = '0.3em';
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            element.appendChild(span);
        });

        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 200);
    }
}

// Parallax effect for mouse movement
class ParallaxController {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        this.animate();
    }

    animate() {
        // Smooth lerp
        this.currentX += (this.mouseX - this.currentX) * 0.05;
        this.currentY += (this.mouseY - this.currentY) * 0.05;

        // Apply to parallax elements
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax || 1);
            const x = this.currentX * speed * 20;
            const y = this.currentY * speed * 20;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Smooth scroll
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, TextAnimations, ParallaxController, SmoothScroll };
}
