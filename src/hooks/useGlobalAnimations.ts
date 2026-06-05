import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useGlobalAnimations = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. SCROLL PROGRESS & BACK TO TOP & PARALLAX EFFECT
    const handleScroll = () => {
      const scrolled = window.scrollY;

      // Scroll Progress Bar
      const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
      if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
      }

      // Back to Top Button visibility
      const backToTopBtn = document.querySelector('.back-to-top') as HTMLElement;
      if (backToTopBtn) {
        if (scrolled > 500) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }

      // Sound Toggle visibility — hide when scrolled, show at top
      const soundToggle = document.querySelector('.sound-toggle') as HTMLElement;
      if (soundToggle) {
        if (scrolled > 100) {
          soundToggle.classList.add('hidden');
        } else {
          soundToggle.classList.remove('hidden');
        }
      }

      // Hero Parallax (Slider background and hero text content)
      const heroBg = document.querySelector('.hero-slider-container') as HTMLElement;
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      if (scrolled < window.innerHeight) {
        if (heroBg) {
          heroBg.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0) scale(1.1)`;
        }
        if (heroContent) {
          heroContent.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
          heroContent.style.opacity = (1 - scrolled / (window.innerHeight * 0.6)).toString();
        }
      }

      // Project Cards Image Scroll Parallax
      const projectImages = document.querySelectorAll('.project-image-container img');
      projectImages.forEach((img) => {
        const htmlImg = img as HTMLElement;
        const rect = htmlImg.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.1;
          const yPos = -(rect.top * speed);
          // Apply translate to achieve 3D parallax scrolling
          htmlImg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    };

    // 2. MAGNETIC BUTTON HOVER EFFECTS (Event delegation)
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.btn, .project-card, .sound-toggle') as HTMLElement;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.btn, .project-card, .sound-toggle') as HTMLElement;
      if (button) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget || !button.contains(relatedTarget)) {
          button.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    };

    // 3. CONTENT PROTECTION (Right-click, Keyboard shortcuts, Image drag)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        // Block Copy (C), Save (S), View Source (U), Print (P)
        if (key === 'c' || key === 's' || key === 'u' || key === 'p') {
          e.preventDefault();
        }
      }
      // Block Dev Tools (Ctrl+Shift+I/J/C)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        const key = e.key.toLowerCase();
        if (key === 'i' || key === 'j' || key === 'c') {
          e.preventDefault();
        }
      }
      // Block F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    // Attach all event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    // Initial triggers
    handleScroll();

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]); // Re-run to query new DOM elements on page changes
};

export default useGlobalAnimations;
