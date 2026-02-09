// Main application initialization
let scene3D;
let scrollAnimations;
let parallaxController;

console.log('🎬 ARCH STUDIO - Initializing...');

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded');
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Starting app initialization...');

    // 1. Initialize custom cursor FIRST (Mission critical for branding)
    console.log('👆 Initializing custom cursor...');
    try {
        if (typeof CustomCursor !== 'undefined') {
            new CustomCursor();
            console.log('✅ Custom cursor initialized');
        } else {
            console.warn('⚠️ CustomCursor class not found');
        }
    } catch (e) {
        console.error('❌ Cursor error:', e);
    }

    // 2. Initialize 3D and Scroll (Non-critical, may fail if canvas missing)
    try {
        console.log('📦 Initializing 3D scene...');
        scene3D = new Scene3D();

        console.log('📜 Initializing scroll animations...');
        scrollAnimations = new ScrollAnimations(scene3D);

        console.log('🎯 Initializing parallax...');
        parallaxController = new ParallaxController();

        console.log('🔄 Initializing smooth scroll...');
        new SmoothScroll();
    } catch (error) {
        console.warn('⚠️ Non-critical initialization warning:', error.message);
    }

    // 3. Setup other interactions
    try {
        animateHeroText();
        setupProjectCards();
        setupNavigation();
        handlePageLoad();
    } catch (e) {
        console.error('❌ Interaction setup error:', e);
    }

    console.log('🎉 App initialization cycle complete!');
}

function animateHeroText() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle) {
        setTimeout(() => {
            TextAnimations.fadeInWords(heroTitle);
        }, 500);
    }

    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 1500);
    }
}

function setupProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    // Define unique animation styles for each card
    const cardAnimations = [
        // Card 1: Elegant lift with rotation
        {
            enter: (card, image) => {
                card.style.transform = 'translateY(-20px) rotateZ(-2deg) scale(1.05)';
                card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6)';
                if (image) image.style.transform = 'scale(1.15) rotate(2deg)';
            },
            leave: (card, image) => {
                card.style.transform = 'translateY(0) rotateZ(0) scale(1)';
                card.style.boxShadow = '';
                if (image) image.style.transform = 'scale(1) rotate(0)';
            },
            move: (card, image, rotateX, rotateY) => {
                card.style.transform = `translateY(-20px) rotateX(${rotateX * 0.8}deg) rotateY(${rotateY * 0.8}deg) rotateZ(-2deg) scale(1.05)`;
            }
        },
        // Card 2: Deep perspective tilt
        {
            enter: (card, image) => {
                card.style.transform = 'translateY(-15px) perspective(1000px) rotateY(5deg) scale(1.03)';
                card.style.boxShadow = '-10px 20px 50px rgba(0,0,0,0.5)';
                if (image) image.style.transform = 'scale(1.2) translateX(-5px)';
            },
            leave: (card, image) => {
                card.style.transform = 'translateY(0) perspective(1000px) rotateY(0) scale(1)';
                card.style.boxShadow = '';
                if (image) image.style.transform = 'scale(1) translateX(0)';
            },
            move: (card, image, rotateX, rotateY) => {
                card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY * 1.5}deg) scale(1.03)`;
            }
        },
        // Card 3: Floating with subtle bounce
        {
            enter: (card, image) => {
                card.style.transform = 'translateY(-25px) scale(1.04)';
                card.style.boxShadow = '0 25px 70px rgba(0,0,0,0.7)';
                card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bounce effect
                if (image) image.style.transform = 'scale(1.12) translateY(-5px)';
            },
            leave: (card, image) => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                if (image) image.style.transform = 'scale(1) translateY(0)';
            },
            move: (card, image, rotateX, rotateY) => {
                card.style.transform = `translateY(-25px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg) scale(1.04)`;
            }
        },
        // Card 4: Dramatic slide and rotate
        {
            enter: (card, image) => {
                card.style.transform = 'translateY(-18px) translateX(10px) rotateZ(3deg) scale(1.06)';
                card.style.boxShadow = '15px 25px 65px rgba(0,0,0,0.65)';
                if (image) image.style.transform = 'scale(1.18) rotate(-3deg)';
            },
            leave: (card, image) => {
                card.style.transform = 'translateY(0) translateX(0) rotateZ(0) scale(1)';
                card.style.boxShadow = '';
                if (image) image.style.transform = 'scale(1) rotate(0)';
            },
            move: (card, image, rotateX, rotateY) => {
                card.style.transform = `translateY(-18px) translateX(10px) rotateX(${rotateX * 1.2}deg) rotateY(${rotateY * 1.2}deg) rotateZ(3deg) scale(1.06)`;
            }
        }
    ];

    cards.forEach((card, index) => {
        card.dataset.delay = index * 0.15;

        // Get the animation style for this card (cycle through if more than 4 cards)
        const animation = cardAnimations[index % cardAnimations.length];

        // Hover enter effect
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image');
            animation.enter(card, image);
        });

        // Hover leave effect
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            animation.leave(card, image);
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            const image = card.querySelector('.project-image');
            animation.move(card, image, rotateX, rotateY);
        });

        // Add unique idle animation for each card
        addIdleAnimation(card, index);
    });
}

// Add subtle idle animations to cards when not hovering
function addIdleAnimation(card, index) {
    const animationDuration = 5 + (index * 1.5); // Slow, different duration for each
    const delay = index * 0.5; // Stagger the animations

    // We'll define these keyframes in style.css or inject them
    // For now, let's inject them via JS to keep it self-contained
    card.style.animation = `cardFloat${index % 4} ${animationDuration}s ease-in-out ${delay}s infinite`;
}

// Inject keyframes for idle animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes cardFloat0 {
        0%, 100% { transform: translateY(0) rotateZ(0deg); }
        50% { transform: translateY(-5px) rotateZ(0.5deg); }
    }
    
    @keyframes cardFloat1 {
        0%, 100% { transform: translateY(0) rotateZ(0deg); }
        50% { transform: translateY(-8px) rotateZ(-0.5deg); }
    }
    
    @keyframes cardFloat2 {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.01); }
    }
        0%, 100% { transform: translateY(0) rotateZ(0deg); }
        50% { transform: translateY(-7px) rotateZ(0.8deg); }
    }
`;
document.head.appendChild(styleSheet);

function setupNavigation() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let lastScroll = 0;

    // Mobile Menu Toggle logic
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(18, 18, 18, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }

        // Hide/show nav on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

function handlePageLoad() {
    const loader = document.querySelector('.loader');

    // Reduced loading time for faster display
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }

        // Start animations
        document.body.classList.add('loaded');
        console.log('✨ Page loaded and visible!');
    }, 1000); // Increased to 1000ms to appreciate the 3D look
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (scene3D) {
            scene3D.handleResize();
        }
    }, 250);
});

// Smooth scroll reveal for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSections);
revealSections(); // Initial check

// Performance optimization: Pause 3D rendering when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (scene3D) {
        if (document.hidden) {
            scene3D.pause();
        } else {
            scene3D.resume();
        }
    }
});

// Easter egg: Press 'D' for debug mode
let debugMode = false;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        debugMode = !debugMode;
        if (scene3D) {
            scene3D.toggleDebug(debugMode);
        }
        console.log(`Debug mode: ${debugMode ? 'ON' : 'OFF'}`);
    }
});

// Custom Cursor Controller
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');

        if (this.dot && this.outline) {
            this.init();
        }
    }

    init() {
        // Initial position off-screen
        this.dot.style.opacity = 0;
        this.outline.style.opacity = 0;

        document.addEventListener('mousemove', (e) => {
            this.dot.style.opacity = 1;
            this.outline.style.opacity = 1;

            // Dot follows instantly
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';

            // Outline follows with delay (handled by CSS transition usually, or we can use JS for more smoothness)
            this.outline.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });

            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseout', () => {
            this.dot.style.opacity = 0;
            this.outline.style.opacity = 0;
        });
    }
}
