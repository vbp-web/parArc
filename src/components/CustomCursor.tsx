import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const cursorCoords = useRef({ x: 0, y: 0 });
  const dotCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable custom cursor on desktop screens
    if (window.innerWidth <= 768) return;

    // Hide system cursor globally on desktop
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Use event delegation for dynamic hovers
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.service-card') ||
        target.closest('.nav-link') ||
        target.closest('.slider-arrow') ||
        target.closest('.sound-toggle') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.service-card') ||
        target.closest('.nav-link') ||
        target.closest('.slider-arrow') ||
        target.closest('.sound-toggle') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let animationFrameId: number;

    const render = () => {
      // Linear Interpolation (LERP)
      // Outer circle (slower for surfing feel)
      cursorCoords.current.x += (mouseCoords.current.x - cursorCoords.current.x) * 0.1;
      cursorCoords.current.y += (mouseCoords.current.y - cursorCoords.current.y) * 0.1;

      // Inner dot (faster for responsiveness)
      dotCoords.current.x += (mouseCoords.current.x - dotCoords.current.x) * 0.35;
      dotCoords.current.y += (mouseCoords.current.y - dotCoords.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorCoords.current.x}px, ${cursorCoords.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x}px, ${dotCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.cursor = '';
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [isVisible]);

  if (window.innerWidth <= 768 || !isVisible) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`}
      />
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovered ? 'cursor-hover' : ''}`}
      />
    </>
  );
};
