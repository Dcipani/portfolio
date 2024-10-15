// ThreadComponent.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './style.scss'; // Import your SCSS file

const Yarn = () => {
  const threadRef = useRef(null);
  const scrollHeight = useRef(0);
  const scrollMultiplier = 0.5; // Adjust this multiplier for the scroll ratio

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = scrollHeight.current - window.innerHeight;

      // Adjust thread length based on scroll and multiplier
      const length = Math.min(scrollPosition * scrollMultiplier, maxScroll * scrollMultiplier);

      gsap.to(threadRef.current, {
        attr: { y2: length + 20 }, // Adjust y2 based on the multiplier
        duration: 0.2,
        ease: 'power1.out',
      });
    };

    // Get the total scrollable height
    scrollHeight.current = document.body.scrollHeight;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <svg className="thread-svg" width="100%" height="100vh">
      <line
        ref={threadRef}
        x1="85%"
        y1="20" // Starting y position of the thread
        x2="85%"
        y2="20" // Initial y2 position, this will change based on scroll
        strokeWidth="2"
      />
    </svg>
  );
};

export default Yarn;
