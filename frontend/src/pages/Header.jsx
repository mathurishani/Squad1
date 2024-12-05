import React from 'react';
import './Header.css'; // Assuming you will create a separate CSS file for styles
import logo from '../assets/AS_267466486288392@1440780388344_l.png'; // Replace with the path to your logo image

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <img src={logo} alt="Mumbai University Logo" className="logo" />
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Academics</a>
          <a href="#">Admissions</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;