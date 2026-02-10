// Comprehensive Project Page Script
// Handles Navigation, Cursor, Modals, and Responsiveness

class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        if (this.dot && this.outline) this.init();
    }

    init() {
        this.dot.style.opacity = 0;
        this.outline.style.opacity = 0;
        document.addEventListener('mousemove', (e) => {
            this.dot.style.opacity = 1;
            this.outline.style.opacity = 1;
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';
            this.outline.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 500, fill: 'forwards' });
        });
        const interactive = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Force body loaded class (for site-wide transitions)
    document.body.classList.add('loaded');

    // 1. Navbar and Mobile Menu
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        // Use a single unified handler
        const handleToggle = (e) => {
            if (e) e.preventDefault();
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                if (nav) nav.style.zIndex = '10001';
            } else {
                document.body.style.overflow = '';
                if (nav) nav.style.zIndex = '10000';
            }
        };

        // Click is most reliable across all devices
        menuToggle.addEventListener('click', handleToggle);

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (nav) nav.style.zIndex = '1000';
            });
        });
    }

    // 2. Navbar Scroll Effect
    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 100) {
                nav.style.background = 'rgba(18, 18, 18, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'transparent';
                nav.style.backdropFilter = 'none';
            }
            if (currentScroll > lastScroll && currentScroll > 500) {
                nav.style.transform = 'translateY(-102%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // 3. Project Card Tilt (Desktop Only for better mobile perf)
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) - rect.width / 2;
                const y = (e.clientY - rect.top) - rect.height / 2;
                card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg)`;
            });
            card.addEventListener('mouseleave', () => card.style.transform = '');
        });
    }

    // 4. Modal Setup
    const modal = document.getElementById('megaModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDetails();
        });
        setupSwipeSupport();
    }

    // 5. Initialize Cursor
    try { new CustomCursor(); } catch (e) { }
});

// Modal Logic
let currentImgIndex = 0;
let projectImages = [];

function openDetails(title, desc, year, loc, area, images) {
    document.getElementById('mTitle').innerText = title;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mYear').innerText = year;
    document.getElementById('mLoc').innerText = loc;
    document.getElementById('mArea').innerText = area;
    projectImages = images;
    currentImgIndex = 0;

    renderSlider();
    const modal = document.getElementById('megaModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function renderSlider() {
    const container = document.getElementById('sliderContainer');
    if (!container) return;
    container.innerHTML = '';
    projectImages.forEach((src, idx) => {
        const img = document.createElement('img');
        img.className = `slider-img ${idx === 0 ? 'active' : ''}`;
        img.src = src;
        container.appendChild(img);
    });
    updateCounter();
}

function changeImage(step) {
    const imgs = document.querySelectorAll('.slider-img');
    if (imgs.length <= 1) return;
    imgs[currentImgIndex].classList.remove('active');
    currentImgIndex = (currentImgIndex + step + projectImages.length) % projectImages.length;
    imgs[currentImgIndex].classList.add('active');
    updateCounter();
}

function updateCounter() {
    const counter = document.getElementById('imgCounter');
    if (counter) counter.innerText = `${String(currentImgIndex + 1).padStart(2, '0')} / ${String(projectImages.length).padStart(2, '0')}`;
}

function closeDetails() {
    const modal = document.getElementById('megaModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
    document.body.style.overflow = '';
}

function setupSwipeSupport() {
    const slider = document.getElementById('modalSlider');
    if (!slider) return;
    let startX = 0;
    slider.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
    slider.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) changeImage(diff > 0 ? -1 : 1);
    }, { passive: true });
}
