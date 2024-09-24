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
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();  // Prevent the default anchor click behavior
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });  // Smooth scroll
    }
  };

useEffect(() => {
    const activeLink = document.querySelector(`.navbar ul li.${activeSection}`);
    const dot = dotRef.current;
    if (justToggled && dot && menuVisible && activeLink) {
        dot.classList.remove('to-section');
        dot.classList.remove('to-cactus');
        dot.classList.add('off-cactus');


        const handleAnimationEnd = () => {
            dot.style.transform = `translate(0px, 12px)`;
            setJustToggled(false);  
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
        dot.style.transform = `translateX(${-travelDistance}px) translateY(12px)`; 
        dot.classList.remove('to-section');
      };
  
      dot.addEventListener('animationend', handleAnimationEnd, { once: true });
  
  
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
          <a href="#home" onClick={(e) => scrollToSection('home', e)}>Home</a>
        </li>
        <li className={`about ${activeSection === 'about' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-185px'}} 
        >
          <a href="#about" onClick={(e) => scrollToSection('about', e)}>About</a>
        </li>
        <li className={`projects ${activeSection === 'projects' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-300px'}} 
        >
          <a href="#projects" onClick={(e) => scrollToSection('projects', e)}>Projects</a>
        </li>
        <img src={PricklyPear} alt="prickly pear" ref={dotRef} className="red-dot"></img>
      </ul>
    </div>
  );
};

export default Navbar;
