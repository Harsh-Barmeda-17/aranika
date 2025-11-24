import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import '../styles/Navbar.css';

const Navbar = ({ currentPage, onNavigate, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#HOME");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, setLanguage } = useContext(LanguageContext);

  // Set active link based on current page
  useEffect(() => {
    if (currentPage === 'rooms') {
      setActiveLink("#ROOMS");
    } else if (currentPage === 'booking' || currentPage === 'confirmation') {
      setActiveLink("#BOOKNOW");
    } else if (currentPage === 'gallery') {
      setActiveLink("#GALLERY");
    } else if (currentPage === 'home') {
      setActiveLink("#HOME");
    } else if (currentPage === 'signup') {
      setActiveLink("#SIGNUP");
    } else if (currentPage === 'login') {
      setActiveLink("#LOGIN");
    } else if (currentPage === 'forgotpassword') {
      setActiveLink("#FORGOTPASSWORD");
    } else if (currentPage === 'contact') {
      setActiveLink("#REACHUS");
    } else if (currentPage === 'tariff') {
      setActiveLink("#TARIFF");
    } else if (currentPage === 'services') {
      setActiveLink("#SERVICES");
    }
  }, [currentPage]);

  // Scroll handling - DISABLED ON MOBILE
  const handleScroll = () => {
    if (window.innerWidth <= 767) {
      setIsVisible(true);
      return;
    }

    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const links = [
    { name: "HOME", href: "#HOME", page: 'home' },
    { name: "ROOMS", href: "#ROOMS", page: 'rooms' },
    { name: "GALLERY", href: "#GALLERY", page: 'gallery' },
    { name: "SERVICES", href: "#SERVICES", page: 'services' },
    { name: "BOOK NOW", href: "#BOOKNOW", page: 'booking' },
    { name: "REACH US", href: "#REACHUS", page: 'contact' },
  ];

  const handleLinkClick = (href, page) => {
    setActiveLink(href);
    setIsOpen(false);
    
    // Handle navigation based on page
    if (page && onNavigate) {
      onNavigate(page);
    }
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'english' ? 'hindi' : 'english';
    setLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const handleSignUp = () => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate('signup');
    }
  };

  // Close nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.side-nav') && !event.target.closest('.hamburger')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close nav on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="nav-container">
          {/* Hamburger Menu */}
          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className='span1'></span>
            <span className='span2'></span>
            <span className='span1'></span>
          </button>
          
          {/* Navigation Controls - Aligned to Left */}
          <div className="nav-controls">
            {/* Language Toggle */}
            <button 
              className="language-toggle"
              onClick={handleLanguageToggle}
              aria-label="Toggle language"
            >
              <i className="fas fa-language"></i>
              <span className="language-text">
                {language === 'english' ? 'हिंदी' : 'English'}
              </span>
            </button>

            {/* Sign Up Button - ONLY THIS BUTTON */}
            <button 
              className="sign-up-btn"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Side Navigation */}
      <div className={`side-nav ${isOpen ? "open" : ""}`}>
        <div className="side-nav-header">
          <button
            className={`hamburger side-nav-hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Close navigation menu"
          >
            <span className='span1'></span>
            <span className='span2'></span>
            <span className='span1'></span>
          </button>
        </div>

        <div className="bamboo">
          <img className="bamboo-stalk" src="./bamboo.png" alt="bamboo" />
          <img className="L-1" src="./L-1.png" alt="leaf" />
          <img className="L-2" src="./L-2.png" alt="leaf" />
        </div>

        <div className="nav-links">
          {links.map((link, index) => (
            <a 
              key={index} 
              href="#" 
              className={`wood-link ${activeLink === link.href ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href, link.page);
              }}
            >
              <img 
                className="wood" 
                src={activeLink === link.href ? "./wood1.png" : "./wood.png"} 
                alt={link.name} 
              />
              <span className="link-text">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;