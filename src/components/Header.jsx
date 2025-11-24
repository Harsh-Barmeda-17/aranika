import React, { useEffect, useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div 
        className="header-background"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div className="nature-overlay"></div>
      </div>
      <div className="header-content">
        <h1 className="homestay-name">Dhurwa Dera</h1>
        <div className="divider"></div>
        <p className="tagline">Experience a peaceful stay in the heart of Bastar</p>
      </div>
    </header>
  );
};

export default Header;