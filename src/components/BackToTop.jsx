import React, { useState, useEffect } from 'react';
import '../styles/BackToTop.css';

const BackToTop = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button 
            className={`back-to-top ${showBackToTop ? 'show' : ''}`} 
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <div className="arrow-up">↑</div>
        </button>
    );
};

export default BackToTop;