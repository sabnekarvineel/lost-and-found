import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css';
import img1 from '../images/img1.jpg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={img1} alt="Logo" className="logo" />
      </div>
      <div className="nav-right">
        <button
          type="button"
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
          <div className={`line ${isOpen ? 'open' : ''}`}></div>
        </button>
        <ul className={`menu ${isOpen ? 'open' : ''}`}>
          <li><Link to="/lost" onClick={() => setIsOpen(false)}>Lost</Link></li>
          <li><Link to="/found" onClick={() => setIsOpen(false)}>Found</Link></li>
          <li><Link to="/search" onClick={() => setIsOpen(false)}>Search</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
