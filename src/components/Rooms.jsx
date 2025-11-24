import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';
import '../styles/Rooms.css';

const DhurwaDera = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [activeFeature, setActiveFeature] = useState(0);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const containerRef = useRef(null);
    const detailsRef = useRef(null);

    // Scroll detection for the scroll indicator
    useEffect(() => {
        const handleDetailsScroll = () => {
            if (detailsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = detailsRef.current;
                const scrollPosition = scrollTop + clientHeight;
                
                // Hide scroll indicator when user starts scrolling
                if (scrollTop > 50) {
                    setShowScrollIndicator(false);
                } else {
                    setShowScrollIndicator(true);
                }
            }
        };

        const detailsElement = detailsRef.current;
        if (detailsElement) {
            detailsElement.addEventListener('scroll', handleDetailsScroll);
        }

        return () => {
            if (detailsElement) {
                detailsElement.removeEventListener('scroll', handleDetailsScroll);
            }
        };
    }, []);

    const handleScrollClick = () => {
        if (detailsRef.current) {
            detailsRef.current.scrollBy({ 
                top: 300, 
                behavior: 'smooth' 
            });
        }
    };

    useEffect(() => {
        // Force scroll to top on page load
        window.scrollTo(0, 0);
        
        // Set a small timeout to ensure DOM is ready
        const timer = setTimeout(() => {
            // Initialize scroll animations
            const initAnimations = () => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.classList.add('animated');
                            }, 100);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Observe all animation elements
                const elements = document.querySelectorAll('.initial-hidden');
                elements.forEach(el => {
                    observer.observe(el);
                });

                return () => {
                    elements.forEach(el => observer.unobserve(el));
                };
            };

            // Initialize animations
            initAnimations();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleBookNow = () => {
        alert("🌿 Welcome to Dhurwa Dera! Our team will contact you shortly to confirm your booking.");
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setZoomLevel(1);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setZoomLevel(1);
    };

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

    // Features based on original homestay details
    const features = [
        {
            title: "Room Capacity",
            description: "Optimized room configurations for maximum comfort",
            details: ["3 people per room standard", "4 people with extra bed", "3 beds included", "Extra bed available"]
        },
        {
            title: "Guest Experience", 
            description: "Designed for comfort and authentic Bastar experience",
            details: ["Traditional aesthetics", "Modern amenities", "Nature integration", "Cultural elements"]
        },
        {
            title: "Facilities",
            description: "All essential facilities for a comfortable stay",
            details: ["Attached bathrooms", "Hot water", "Housekeeping", "Local cuisine"]
        }
    ];

    return (
        <div className="dhurwa-dera-container" ref={containerRef}>
            {/* Left Branch Decoration */}
            <div className="left-branch scroll-animate initial-hidden">
                <img src="./branch4.png" alt="Branch Left" />
            </div>

            {/* Main Content Wrapper - Grid for rooms and hut details */}
            <div className="main-content-wrapper">
                {/* Main Content Section - Left Side */}
                <div className="main-content-section scroll-animate initial-hidden">
                    {/* Header Section */}
                    <div className="header-section scroll-fade initial-hidden">
                        <h1>Dhurva Dera Rooms</h1>
                        <div className="tagline">
                            Experience the perfect blend of traditional life and comfort surrounded by nature's serenity
                        </div>
                    </div>

                    <div className="images-section">
                        <div className="collage-container scroll-animate initial-hidden delay-1">
                            {/* Image 1 - Top Left */}
                            <div className="collage-item top-left scroll-animate initial-hidden delay-2" onClick={() => handleImageClick("./room2.JPG")}>
                                <img src="./room2.JPG" alt="Room 1" />
                                <div className="image-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>

                            {/* Image 2 - Top Right */}
                            <div className="collage-item top-right scroll-animate initial-hidden delay-3" onClick={() => handleImageClick("./room3.JPG")}>
                                <img src="./room3.JPG" alt="Room 2" />
                                <div className="image-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>

                            {/* Image 3 - Bottom Left */}
                            <div className="collage-item bottom-left scroll-animate initial-hidden delay-4" onClick={() => handleImageClick("./room4.jpg")}>
                                <img src="./room4.jpg" alt="Room 3" />
                                <div className="image-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>

                            {/* Image 4 - Bottom Right */}
                            <div className="collage-item bottom-right scroll-animate initial-hidden delay-5" onClick={() => handleImageClick("./room6.jpg")}>
                                <img src="./room6.jpg" alt="Room 4" />
                                <div className="image-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>

                            {/* Center Circular Image */}
                            <div className="center-circle scroll-animate initial-hidden delay-6" onClick={() => handleImageClick("./room5.jpg")}>
                                <img src="./room5.jpg" alt="Center Room" />
                                <div className="image-overlay">
                                    <span className="view-text">View</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Homestay Details Section with Separate Scrolling */}
                <div className="hut-details-section scroll-animate initial-hidden delay-1" ref={detailsRef}>
                    <div className="branch-overlay">
                        <img src="./branch112.png" alt="Branch Overlay" />
                    </div>
                    
                    <div className="hut-details-content">
                        {/* Premium Header */}
                        <div className="premium-header scroll-fade initial-hidden">
                            <div className="header-badge">Homestay</div>
                            <h2>Dhurwa Dera Details</h2>
                            <p>Traditional comfort in the heart of Bastar</p>
                        </div>

                        {/* Stats Overview - Using original data */}
                        <div className="stats-overview">
                            <div className="stat-card scroll-animate initial-hidden delay-1">
                                <div className="stat-number">3</div>
                                <div className="stat-label">Total Rooms</div>
                                <div className="stat-description">Available for booking</div>
                            </div>
                            <div className="stat-card scroll-animate initial-hidden delay-2">
                                <div className="stat-number">12</div>
                                <div className="stat-label">Max Guests</div>
                                <div className="stat-description">All rooms occupied</div>
                            </div>
                            <div className="stat-card scroll-animate initial-hidden delay-3">
                                <div className="stat-number">4</div>
                                <div className="stat-label">Per Room Max</div>
                                <div className="stat-description">With extra bed</div>
                            </div>
                        </div>

                        {/* Interactive Features */}
                        <div className="features-section">
                            <h3 className="features-title">Stay Features</h3>
                            <div className="features-tabs">
                                {features.map((feature, index) => (
                                    <button
                                        key={index}
                                        className={`feature-tab ${activeFeature === index ? 'active' : ''}`}
                                        onClick={() => setActiveFeature(index)}
                                    >
                                        {feature.title}
                                    </button>
                                ))}
                            </div>
                            <div className="feature-content">
                                <h4>{features[activeFeature].title}</h4>
                                <p>{features[activeFeature].description}</p>
                                <div className="feature-details">
                                    {features[activeFeature].details.map((detail, idx) => (
                                        <span key={idx} className="detail-tag">{detail}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Room Specifications - Original data */}
                        <div className="specs-section">
                            <h3 className="specs-title">Room Specifications</h3>
                            <div className="specs-grid">
                                <div className="spec-item enhanced">
                                    <div className="spec-icon">🛏️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Standard Capacity</div>
                                        <div className="spec-value">3 people per room</div>
                                        <div className="spec-note">3 beds included</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item enhanced">
                                    <div className="spec-icon">➕</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Extra Bed Option</div>
                                        <div className="spec-value">1 additional bed</div>
                                        <div className="spec-note">Extra charge applicable</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item enhanced">
                                    <div className="spec-icon">🚶‍♂️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Max Occupancy</div>
                                        <div className="spec-value">4 people per room</div>
                                        <div className="spec-note">With extra bed</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item enhanced">
                                    <div className="spec-icon">🏨</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Total Capacity</div>
                                        <div className="spec-value">12 guests maximum</div>
                                        <div className="spec-note">All rooms occupied</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Information - Vertical Layout */}
                        <div className="pricing-section">
                            <h3 className="pricing-title">Pricing Details</h3>
                            <div className="pricing-cards-vertical">
                                <div className="pricing-card-vertical">
                                    <div className="pricing-header-vertical">
                                        <h4>Room Rate</h4>
                                        <div className="price-vertical">₹2,500<span>/night</span></div>
                                    </div>
                                    <div className="pricing-features-vertical">
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>Standard room for 3 guests</span>
                                        </div>
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>All basic amenities included</span>
                                        </div>
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>Complimentary breakfast</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="pricing-card-vertical">
                                    <div className="pricing-header-vertical">
                                        <h4>Extra Bed</h4>
                                        <div className="price-vertical">₹500<span>/night</span></div>
                                    </div>
                                    <div className="pricing-features-vertical">
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>Additional bed per room</span>
                                        </div>
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>Max 1 extra bed per room</span>
                                        </div>
                                        <div className="pricing-feature-vertical">
                                            <span className="check">✓</span>
                                            <span>Extra bedding provided</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="notes-section">
                            <h3 className="notes-title">Important Information</h3>
                            <div className="notes-list">
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Children 4 years & below stay free</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Extra bed available at ₹500 per night</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Maximum 1 extra bed per room</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Total property capacity: 12 guests</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Check-in: 12 PM, Check-out: 11 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="premium-cta-section">
                            <div className="cta-content">
                                <h3>Ready to Experience?</h3>
                                <p>Book your peaceful getaway at Dhurwa Dera</p>
                                <div className="cta-features">
                                    <span>✓ Best Price Guarantee</span>
                                    <span>✓ Easy Booking Process</span>
                                    <span>✓ Instant Confirmation</span>
                                </div>
                                <button className="premium-book-btn" onClick={handleBookNow}>
                                    <span className="btn-sparkle">🌿</span>
                                    Book Your Stay
                                    <span className="btn-arrow">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`scroll-indicator ${!showScrollIndicator ? 'hidden' : ''}`}>
                        <div className="scroll-arrow" onClick={handleScrollClick}></div>
                        <div className="scroll-text">Scroll for more</div>
                    </div>
                </div>
            </div>

            {/* Full Width Quote Section - Now separate above footer */}
            <div className="peaceful-quote-section scroll-fade initial-hidden delay-7">
                <div className="quote-container">
                    <div className="quote-icon">🌿</div>
                    <blockquote className="peaceful-quote">
                        In the heart of nature, discover rooms that comfort your soul and peace that stays with you.
                    </blockquote>
                    <div className="quote-author">- Dhurwa Dera Experience</div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="image-modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                        <div className="zoom-controls">
                            <button onClick={handleZoomOut}>-</button>
                            <span>{Math.round(zoomLevel * 100)}%</span>
                            <button onClick={handleZoomIn}>+</button>
                        </div>
                        <img 
                            src={selectedImage} 
                            alt="Enlarged view" 
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
};

export default DhurwaDera;