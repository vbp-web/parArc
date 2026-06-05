import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollAnimations = () => {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Apply animation class with stagger delay
          setTimeout(() => {
            element.classList.add('visible');
            
            // Also animate any word-inner components inside this element for typewriter/text reveals
            const words = element.querySelectorAll('.word-inner');
            words.forEach((word) => word.classList.add('animate'));
          }, index * 100);
          
          // Unobserve once animated to free up system resources
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Helper to find and register fade-in elements that are not yet animated
    const registerFadeInElements = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    // Initial check
    registerFadeInElements();

    // Set up a MutationObserver to listen for dynamically loaded lazy components
    const mutationObserver = new MutationObserver(() => {
      registerFadeInElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Backup timer in case rendering wraps up slightly later
    const timer = setTimeout(registerFadeInElements, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]); // Re-run on navigation to set up new elements
};
export default useScrollAnimations;
