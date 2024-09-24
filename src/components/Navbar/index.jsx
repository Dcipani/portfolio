import React, { useState, useEffect, useRef } from "react";
import Cactus from '../../images/cactus.png';
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
    if (justToggled && dot && menuVisible) {
        dot.classList.add('off-cactus');
        dot.classList.remove('to-section');
        dot.classList.remove('to-cactus');
        setJustToggled(false);
    } else if (justToggled && dot && !menuVisible) {
        dot.classList.remove('to-section');
        dot.classList.remove('off-cactus');
        dot.classList.add('to-cactus');

        setJustToggled(false);
      }
    if (activeLink && dot && menuVisible) {
      dot.classList.remove('to-cactus');
      dot.classList.remove('off-cactus');
      dot.classList.add('to-section');
    
      // Get the travel distance from the CSS variable
      const computedStyle = window.getComputedStyle(activeLink);
      const travelDistance = parseFloat(computedStyle.getPropertyValue('--travel-distance'));
      dot.style.setProperty('--target-x', `${-travelDistance}px`);
  
      // Update CSS variable for X translation
  
    } 
  }, [activeSection, menuVisible]);
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
            style={{ '--travel-distance': '-80px'}} 
        >
          <a href="#home">Home</a>
        </li>
        <li className={`about ${activeSection === 'about' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-190px'}} 
        >
          <a href="#about">About</a>
        </li>
        <li className={`projects ${activeSection === 'projects' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-305px'}} 
        >
          <a href="#projects">Projects</a>
        </li>
        <div ref={dotRef} className="red-dot"></div>
      </ul>
    </div>
  );
};

export default Navbar;
