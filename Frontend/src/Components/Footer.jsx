import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css'; 

import facebook from '../Assets/facebook.png';
import instagram from '../Assets/instagram.png';
import twitter from '../Assets/twitter.png';
import youtube from '../Assets/youtube.png';

const Footer = () => {

  const handleScroll = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className='footer-section-name'>DynamicFit</h2>
          <p>Your ultimate fitness companion. Join us in our mission to help you achieve your health and fitness goals.</p>
          <div className="footer-social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i>
                <img src={facebook} alt="" className='footer-icons'/>
              </i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab-fa-twitter">
                <img src={twitter} alt="" className='footer-icons'/>
              </i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab-fa-instagram">
                <img src={instagram} alt="" className='footer-icons'/>
              </i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab-fa-youtube">
                <img src={youtube} alt="" className='footer-icons'/>
              </i>
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/" onClick={handleScroll}>Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <p>Get the latest fitness tips and updates delivered to your inbox.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DynamicFit. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
