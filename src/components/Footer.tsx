import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logoImage from '../assets/logo.png';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo">
            <div className="logo">
              <img src={logoImage} alt="parArc Logo" className="logo-image" />
              <div className="logo-text-container">
                <span className="logo-text">
                  par<span className="logo-accent">A</span>rc
                </span>
                <span className="logo-subtitle">design studio</span>
              </div>
            </div>
            <p>
              Creating timeless architectural experiences through precision,
              creativity, and an unwavering commitment to excellence.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">Studio</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Services</h4>
            <div className="footer-links">
              <span>Architectural Design</span>
              <span>Interior Design</span>
              <span>Commercial</span>
              <span>Landscape</span>
              <span>Consultation</span>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="footer-links">
              <a href="mailto:pararc2000@gmail.com">pararc2000@gmail.com</a>
              <a href="tel:+916355994947">+91 6355994947</a>
              <span>
                <p>
                  16, Pushpratna Shopping, <br />
                  Near Ambica Bus Stand, Kalol<br />
                  Gandhinagar, Gujarat, India<br />
                </p>
              </span>
            </div>
            <div className="footer-social">
              <a href="https://www.instagram.com/pararc_design_studio/" target="_blank" rel="noopener noreferrer">
                Instagram
                <ArrowUpRight size={12} />
              </a>
              <a href="#">
                LinkedIn
                <ArrowUpRight size={12} />
              </a>
              <a href="#">
                Pinterest
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} parArc Design Studio. All rights reserved.</p>
          {isHome && (
            <p style={{ opacity: 0.6, fontSize: '11px', maxWidth: '500px', lineHeight: 1.4, margin: '0 auto' }}>
              Music Credit: "Warm Memories – Emotional Inspiring Piano" by Keys of Moon <br />
              Licensed under CC BY 4.0 | Source: https://soundcloud.com/keysofmoon
            </p>
          )}
          <p>Developed by Oneverce Solutions</p>
        </div>
      </div>
    </footer>
  );
};
