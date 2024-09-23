import React, { useState } from "react";
import Cactus from '../../images/cactus.png';
import './style.scss';

const Navbar = ({ activeSection }) => {
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navbar">
      <img
        className="menu-toggle"
        src={Cactus}
        alt="cactus"
        onClick={toggleMenu}
      />
      <ul>
        <li className={`${activeSection === 'home' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-70px'}} // Furthest from cactus
        >
          <a href="#home"> Home </a>
        </li>
        <li className={`${activeSection === 'about' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`}
        style={{ '--travel-distance': '-150px'}} // Furthest from cactus
        >
          <a href="#about"> About </a>
        </li>
        <li className={`${activeSection === 'projects' ? 'active' : ''} ${menuVisible ? 'visible' : 'hidden'}`} 
        style={{ '--travel-distance': '-230px'}} // Furthest from cactus
        >
          <a href="#projects"> Projects </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;



