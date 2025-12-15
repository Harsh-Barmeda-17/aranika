import React, { useEffect, useRef, useState, useCallback, useContext } from "react";
import BackToTop from './BackToTop';
import "../styles/Gallery.css";
import { LanguageContext } from '../App';

// Import all images dynamically from /assets/gallery
const images = Array.from({ length: 46 }, (_, i) => 
  new URL(`../assets/gallery/G${i + 1}.JPG`, import.meta.url).href
);

function Gallery() {
  const { language } = useContext(LanguageContext);
  const hexRefs = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const observerRef = useRef(null);

  // Language translations
  const translations = {
    english: {
      galleryTitle: "Dhurwa Dera Gallery",
      gallerySubtitle: "Immerse yourself in the visual journey of our peaceful haven",
      fullScreen: "Full screen",
      close: "×",
      zoomIn: "+",
      zoomOut: "−"
    },
    hindi: {
      galleryTitle: "धुरवा डेरा गैलरी",
      gallerySubtitle: "हमारे शांतिपूर्ण आश्रय स्थल की दृश्य यात्रा में खुद को डुबोएं",
      fullScreen: "पूर्ण स्क्रीन",
      close: "×",
      zoomIn: "+",
      zoomOut: "−"
    }
  };

  const t = translations[language];

  // Memoized functions for better performance
  const handleImageClick = useCallback((src) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseImage = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCloseImage();
    }
  }, [handleCloseImage]);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hex-visible');
          // Unobserve after animation to improve performance
          observerRef.current?.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px 100px 0px'
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observe only visible elements
    hexRefs.current.forEach(hex => {
      if (hex) {
        observerRef.current.observe(hex);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Function to add ref to each hex element
  const addToRefs = useCallback((el) => {
    if (el && !hexRefs.current.includes(el)) {
      hexRefs.current.push(el);
    }
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseImage();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage, handleCloseImage]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <div className="gallery-page">
      {/* Updated Header with wave pattern from Header component */}
      <div className="gallery-header-section">
        <div className="gallery-header-background">
          <div className="gallery-nature-overlay"></div>
        </div>
        <div className="gallery-header-content">
          <h1>{t.galleryTitle}</h1>
          <div className="gallery-divider"></div>
          <p className="gallery-subtitle">{t.gallerySubtitle}</p>
        </div>
      </div>

      <div className="gallery-main-content">
        <div className="hex-gallery">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="hex" 
              ref={addToRefs}
              onClick={() => handleImageClick(src)}
            >
              <div className="hex-inner">
                <div
                  className="hex-img"
                  style={{ backgroundImage: `url(${src})` }}
                  loading="lazy"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Original Full-screen image viewer */}
      {selectedImage && (
        <div className="image-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseImage}>{t.close}</button>
            <div className="zoom-controls">
              <button onClick={handleZoomOut}>{t.zoomOut}</button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn}>{t.zoomIn}</button>
            </div>
            <img 
              src={selectedImage} 
              alt={t.fullScreen} 
              style={{ transform: `scale(${zoomLevel})` }}
              onWheel={handleWheel}
            />
          </div>
        </div>
      )}

      {/* Imported Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default Gallery;