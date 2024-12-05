import React from 'react';
import './Footer.css'; // Assuming you will create a separate CSS file for styles

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2023 Mumbai University. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;