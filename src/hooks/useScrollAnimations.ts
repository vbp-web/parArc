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

    // Short timeout to guarantee the DOM has completed rendering
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]); // Re-run on navigation to set up new elements
};
export default useScrollAnimations;
