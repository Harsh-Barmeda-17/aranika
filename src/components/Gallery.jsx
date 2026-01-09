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
  const [selectedIndex, setSelectedIndex] = useState(null);
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
      galleryTitle: "धुरवा डेरा चित्रकला",
      gallerySubtitle: "हमारे शांतिपूर्ण आश्रय स्थल की दृश्य यात्रा में खुद को डुबोएं",
      fullScreen: "पूर्ण स्क्रीन",
      close: "×",
      zoomIn: "+",
      zoomOut: "−"
    }
  };

  const t = translations[language];

  // Open image
  const handleImageClick = useCallback((index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close image
  const handleCloseImage = useCallback(() => {
    setSelectedIndex(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  }, []);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCloseImage();
    }
  }, [handleCloseImage]);

  // Intersection Observer
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hex-visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px 100px 0px'
    });

    hexRefs.current.forEach(hex => {
      if (hex) observerRef.current.observe(hex);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const addToRefs = useCallback((el) => {
    if (el && !hexRefs.current.includes(el)) {
      hexRefs.current.push(el);
    }
  }, []);

  // Escape + Arrow Navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseImage();
      }

      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev =>
          prev < images.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : prev
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleCloseImage]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.deltaY < 0 ? handleZoomIn() : handleZoomOut();
  };

  return (
    <div className="gallery-page">
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
              onClick={() => handleImageClick(index)}
            >
              <div className="hex-inner">
                <div
                  className="hex-img"
                  style={{ backgroundImage: `url(${src})` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="image-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseImage}>
              {t.close}
            </button>

            <div className="zoom-controls">
              <button onClick={handleZoomOut}>{t.zoomOut}</button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn}>{t.zoomIn}</button>
            </div>

            <img
              src={images[selectedIndex]}
              alt={t.fullScreen}
              style={{ transform: `scale(${zoomLevel})` }}
              onWheel={handleWheel}
            />
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}

export default Gallery;
