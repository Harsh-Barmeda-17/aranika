import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../App';
import '../styles/Header.css';

const Header = () => {
  const [offset, setOffset] = useState(0);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language translations
  const translations = {
    english: {
      homestayName: "Dhurwa Dera",
      tagline: "Experience a peaceful stay in the heart of Bastar"
    },
    hindi: {
      homestayName: "धुरवा डेरा",
      tagline: "बस्तर के हृदय में एक शांतिपूर्ण प्रवास का अनुभव करें"
    }
  };

  const t = translations[language];

  return (
    <header className="header">
      <div 
        className="header-background"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <div className="nature-overlay"></div>
      </div>
      <div className="header-content">
        <h1 className="homestay-name">{t.homestayName}</h1>
        <div className="divider"></div>
        <p className="tagline">{t.tagline}</p>
      </div>
    </header>
  );
};

export default Header;