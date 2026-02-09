// Projects page initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('📁 Projects page loaded');

    // Initialize navigation
    setupNavigation();

    // Initialize project card interactions
    setupProjectCards();

    // Handle initial state of modal if it was open (though usually it's not)
    const modal = document.getElementById('megaModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDetails();
        });
    }

    // Setup swipe for modal slider
    setupSwipeSupport();
});

let currentImgIndex = 0;
let projectImages = [];

function openDetails(title, desc, year, loc, area, images) {
    const mTitle = document.getElementById('mTitle');
    const mDesc = document.getElementById('mDesc');
    const mYear = document.getElementById('mYear');
    const mLoc = document.getElementById('mLoc');
    const mArea = document.getElementById('mArea');
    const modal = document.getElementById('megaModal');

    if (mTitle) mTitle.innerText = title;
    if (mDesc) mDesc.innerText = desc;
    if (mYear) mYear.innerText = year;
    if (mLoc) mLoc.innerText = loc;
    if (mArea) mArea.innerText = area;

    // Set up images
    projectImages = images;
    currentImgIndex = 0;
    renderSlider();

    if (modal) {
        modal.style.display = 'flex';
        // Force reflow for animations if needed
        modal.offsetHeight;
        modal.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function renderSlider() {
    const container = document.getElementById('sliderContainer');
    if (!container) return;

    container.innerHTML = '';

    projectImages.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.className = `slider-img ${index === 0 ? 'active' : ''}`;

        // Handle placeholders (hex colors) if present
        if (imageUrl.startsWith('#')) {
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent gif
            img.style.backgroundColor = imageUrl;
        } else {
            img.src = imageUrl;
        }

        img.alt = `Project image ${index + 1}`;
        container.appendChild(img);
    });

    updateCounter();
}

function changeImage(step) {
    const images = document.querySelectorAll('.slider-img');
    if (images.length <= 1) return;

    images[currentImgIndex].classList.remove('active');
    currentImgIndex = (currentImgIndex + step + projectImages.length) % projectImages.length;
    images[currentImgIndex].classList.add('active');

    updateCounter();
}

function updateCounter() {
    const counter = document.getElementById('imgCounter');
    if (counter && projectImages.length > 0) {
        counter.innerText = `${String(currentImgIndex + 1).padStart(2, '0')} / ${String(projectImages.length).padStart(2, '0')}`;
    }
}

function closeDetails() {
    const modal = document.getElementById('megaModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    document.body.style.overflow = '';
}

function setupSwipeSupport() {
    const slider = document.getElementById('modalSlider');
    if (!slider) return;

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe Left -> Next
            changeImage(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe Right -> Prev
            changeImage(-1);
        }
    }
}

function setupNavigation() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let lastScroll = 0;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

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
            nav.classList.add('glass');
        } else {
            nav.classList.remove('glass');
        }

        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

function setupProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
