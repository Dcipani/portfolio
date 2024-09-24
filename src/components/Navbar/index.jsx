import React, { useState, useEffect, useRef } from "react";
import Cactus from '../../images/cactus.png';
import PricklyPear from '../../images/prickly-pear.png';
import './style.scss';

const Navbar = ({ activeSection }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [justToggled, setJustToggled] = useState(false);
  const dotRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    setJustToggled(true);
  };

//   useEffect(() => {
//     const activeLink = document.querySelector(`.navbar ul li.${activeSection}`);
//     const dot = dotRef.current;
  
//     if (activeLink && dot && menuVisible) {
  
//       // Get the travel distance from the CSS variable
//       const computedStyle = window.getComputedStyle(activeLink);
//       const travelDistance = parseFloat(computedStyle.getPropertyValue('--travel-distance')) || 0;
  
//       // Calculate dot position and add travelDistance
//       const dotPosition = -travelDistance;
  
//       // Apply the transform with updated dot position
//       dot.style.transform = `translateX(${dotPosition}px)`;
//     } else if (dot && !menuVisible) {
//         dot.style.transform = `translateX(-45px) translateY(-45px)`;
//     }
//   }, [activeSection, menuVisible]);
  
  
useEffect(() => {
    const activeLink = document.querySelector(`.navbar ul li.${activeSection}`);
    const dot = dotRef.current;
    if (justToggled && dot && menuVisible && activeLink) {
        dot.classList.remove('to-section');
        dot.classList.remove('to-cactus');
        dot.classList.add('off-cactus');


        // Pass a function reference to setJustToggled
        const handleAnimationEnd = () => {
            dot.style.transform = `translate(0px, 12px)`;  // Lock the dot's final position
            setJustToggled(false);  // This will now be called after the animation ends
        };

        dot.addEventListener('animationend', handleAnimationEnd, { once: true });
    } else if (justToggled && dot && !menuVisible) {
        dot.classList.remove('to-section');
        dot.classList.remove('off-cactus');
        dot.classList.add('to-cactus');

        setJustToggled(false);
    }
    else if (activeLink && dot && menuVisible && !justToggled) {
      dot.classList.remove('to-cactus');
      dot.classList.remove('off-cactus');
      dot.classList.add('to-section');
    
      const computedStyle = window.getComputedStyle(activeLink);
      const travelDistance = parseFloat(computedStyle.getPropertyValue('--travel-distance'));
      dot.style.setProperty('--target-x', `${-travelDistance}px`);

      const handleAnimationEnd = () => {
        dot.style.transform = `translateX(${-travelDistance}px) translateY(12px)`;  // Lock the dot's final position
        dot.classList.remove('to-section');
      };
  
      // Attach listener for animation end
      dot.addEventListener('animationend', handleAnimationEnd, { once: true });
  
      // Update CSS variable for X translation
  
    } 
  }, [activeSection, justToggled, menuVisible]);
  return (
    <div className="navbar">
      <img
        className="menu-toggle"
        src={Cactus}
        alt="cactus"
        onClick={toggleMenu}
      />
      <ul>
        <li className={`home ${activeSection === 'home' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}         
            style={{ '--travel-distance': '-75px'}} 
        >
          <a href="#home">Home</a>
        </li>
        <li className={`about ${activeSection === 'about' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-185px'}} 
        >
          <a href="#about">About</a>
        </li>
        <li className={`projects ${activeSection === 'projects' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-300px'}} 
        >
          <a href="#projects">Projects</a>
        </li>
        <img src={PricklyPear} ref={dotRef} className="red-dot"></img>
      </ul>
    </div>
  );
};

export default Navbar;
