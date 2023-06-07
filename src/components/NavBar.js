import React, { useState } from 'react';
import './NavBar.css';
import SignInForm from './SignInForm';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="toggle-icon"></span>Menu Bar
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
            <SignInForm />
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/Account">Account</a>
            </li>
            
            
                
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;