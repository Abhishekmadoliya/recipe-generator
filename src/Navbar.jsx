// import React from 'react'

import { useState } from 'react';
import Searchbox from "./body/Searchbox";
import "./Navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
    <div className="navbar" >
      <nav>
        <div className="nav-left">
          <a 
            href="#home" 
            className={activeLink === 'home' ? 'active' : ''}
            onClick={() => handleLinkClick('home')}
          >
            Home
          </a>
          <a 
            href="#projects" 
            className={activeLink === 'projects' ? 'active' : ''}
            onClick={() => handleLinkClick('projects')}
          >
            Projects
          </a>
          <a 
            href="#about" 
            className={activeLink === 'about' ? 'active' : ''}
            onClick={() => handleLinkClick('about')}
          >
            About me
          </a>
          <a 
            href="#contact" 
            className={activeLink === 'contact' ? 'active' : ''}
            onClick={() => handleLinkClick('contact')}
          >
            Contact me
          </a>
        </div>
        {/* <div className="nav-right"></div> */}
      </nav>
    </div>

    <Searchbox/>
    
    {/* <button ></button> */}
    </>
  );
}

export default Navbar;
