import React, { useEffect, useRef, useState, useCallback } from "react";
import Footer from './Footer';
import BackToTop from './BackToTop';
import "../styles/Gallery.css";

// Import all images dynamically from /assets/gallery
const images = Array.from({ length: 46 }, (_, i) => 
  new URL(`../assets/gallery/G${i + 1}.JPG`, import.meta.url).href
);

function Gallery() {
  const hexRefs = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const observerRef = useRef(null);

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
      <div className="gallery-header-section">
        <div className="gallery-header-content">
          <h1>Dhurwa Dera Gallery</h1>
          <div className="divider"></div>
          <p className="gallery-subtitle">Immerse yourself in the visual journey of our peaceful haven</p>
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

      {/* Full-screen image viewer */}
      {selectedImage && (
        <div className="image-modal" onClick={handleBackdropClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseImage}>×</button>
            <div className="zoom-controls">
              <button onClick={handleZoomOut}>-</button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn}>+</button>
            </div>
            <img 
              src={selectedImage} 
              alt="Full screen" 
              style={{ transform: `scale(${zoomLevel})` }}
              onWheel={handleWheel}
            />
          </div>
        </div>
      )}

      {/* Imported Back to Top Button */}
      <BackToTop />
      <Footer />
    </div>
  );
}

export default Gallery;