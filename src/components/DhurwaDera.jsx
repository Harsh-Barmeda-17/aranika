import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';
import '../styles/DhurwaDera.css';

const DhurwaDera = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const containerRef = useRef(null);

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
        window.location.href = '#BOOKNOW';
        // You can also use your navigation system here
        // if (onNavigate) onNavigate('booking');
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

    // Only 2 adventure activities
    const adventures = [
        {
            name: "River Rafting",
            price: 100,
            description: "Exciting river rafting experience in pristine waters",
            duration: "2 hours",
            includes: ["Safety equipment", "Expert guide", "Basic training"]
        },
        {
            name: "Bamboo Rafting",
            price: 200,
            description: "Traditional bamboo rafting for a serene water experience",
            duration: "1.5 hours",
            includes: ["Traditional bamboo raft", "Local guide", "Safety briefing"]
        }
    ];

    return (
        <div className="dhurwa-dera-page" ref={containerRef}>
            {/* Main Content */}
            <main className="dhurwa-main">
                <div className="dhurwa-container">
                    <div className="dhurwa-card">
                        <div className="card-header">
                            <h2>Dhurwa Dera Experience</h2>
                            <p className="subtitle">Traditional comfort meets authentic Bastar adventures</p>
                        </div>

                        {/* Room & Accommodation Section */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>Our Rooms & Accommodation</h3>
                            </div>
                            
                            <div className="images-section">
                                <div className="collage-container">
                                    {/* Image 1 - Top Left */}
                                    <div className="collage-item top-left" onClick={() => handleImageClick("./room2.JPG")}>
                                        <img src="./room2.JPG" alt="Room 1" />
                                        <div className="image-overlay">
                                            <span className="view-text">View</span>
                                        </div>
                                    </div>

                                    {/* Image 2 - Top Right */}
                                    <div className="collage-item top-right" onClick={() => handleImageClick("./room3.JPG")}>
                                        <img src="./room3.JPG" alt="Room 2" />
                                        <div className="image-overlay">
                                            <span className="view-text">View</span>
                                        </div>
                                    </div>

                                    {/* Image 3 - Bottom Left */}
                                    <div className="collage-item bottom-left" onClick={() => handleImageClick("./room4.jpg")}>
                                        <img src="./room4.jpg" alt="Room 3" />
                                        <div className="image-overlay">
                                            <span className="view-text">View</span>
                                        </div>
                                    </div>

                                    {/* Image 4 - Bottom Right */}
                                    <div className="collage-item bottom-right" onClick={() => handleImageClick("./room6.jpg")}>
                                        <img src="./room6.jpg" alt="Room 4" />
                                        <div className="image-overlay">
                                            <span className="view-text">View</span>
                                        </div>
                                    </div>

                                    {/* Center Circular Image - Fixed to fill properly */}
                                    <div className="center-circle" onClick={() => handleImageClick("./room5.jpg")}>
                                        <img src="./room5.jpg" alt="Center Room" className="center-image" />
                                        <div className="image-overlay">
                                            <span className="view-text">View</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="room-stats">
                                <div className="stat-item">
                                    <div className="stat-number">3</div>
                                    <div className="stat-label">Total Rooms</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">12</div>
                                    <div className="stat-label">Max Guests</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">4</div>
                                    <div className="stat-label">Per Room Max</div>
                                </div>
                            </div>
                        </section>

                        {/* Pricing Information - Moved after image grid */}
                        <section className="form-section price-section">
                            <div className="section-header">
                                <h3>Pricing Details</h3>
                            </div>
                            <div className="price-details">
                                <div className="price-row">
                                    <span>Room Rate (per night):</span>
                                    <span>₹2,500</span>
                                </div>
                                <div className="price-row">
                                    <span>Extra Bed (per night):</span>
                                    <span>₹500</span>
                                </div>
                                <div className="price-row discount">
                                    <span>Children Free:</span>
                                    <span>4 years & below</span>
                                </div>
                                <div className="price-divider"></div>
                                <div className="price-row total">
                                    <span>Starting from:</span>
                                    <span>₹2,500/night</span>
                                </div>
                            </div>
                        </section>

                        {/* Adventure Activities Section */}
                        <section className="form-section adventure-section">
                            <div className="section-header">
                                <h3>Adventure Activities</h3>
                                <p>Experience the thrill of Bastar with our exciting adventure packages</p>
                            </div>

                            <div className="adventure-grid">
                                {adventures.map((adventure, index) => (
                                    <div key={index} className="adventure-card">
                                        <div className="adventure-header">
                                            <h4>{adventure.name}</h4>
                                            <div className="adventure-price">
                                                ₹{adventure.price}<span>/person</span>
                                            </div>
                                        </div>
                                        <p className="adventure-description">{adventure.description}</p>
                                        <div className="adventure-duration">
                                            <span>Duration: {adventure.duration}</span>
                                        </div>
                                        <div className="adventure-includes">
                                            <h5>Includes:</h5>
                                            <ul>
                                                {adventure.includes.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="highlight-badge">
                                            Popular Choice
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="adventure-notes">
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>All adventure activities include safety equipment and expert guides</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Advance booking recommended for adventure activities</span>
                                </div>
                                <div className="note-item">
                                    <span className="note-bullet">•</span>
                                    <span>Children below 12 must be accompanied by adults</span>
                                </div>
                            </div>
                        </section>

                        {/* Room Details Section */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>Room Specifications</h3>
                            </div>
                            
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <div className="spec-icon">🛏️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Standard Capacity</div>
                                        <div className="spec-value">3 people per room</div>
                                        <div className="spec-note">3 beds included</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">➕</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Extra Bed Option</div>
                                        <div className="spec-value">1 additional bed</div>
                                        <div className="spec-note">₹500 per night</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">🚶‍♂️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Max Occupancy</div>
                                        <div className="spec-value">4 people per room</div>
                                        <div className="spec-note">With extra bed</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">🏨</div>
                                    <div className="spec-content">
                                        <div className="spec-title">Total Capacity</div>
                                        <div className="spec-value">12 guests maximum</div>
                                        <div className="spec-note">All rooms occupied</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action - Updated for better visibility */}
                        <section className="form-section cta-section">
                            <div className="cta-content">
                                <h3>Ready to Experience Dhurwa Dera?</h3>
                                <p>Book your stay and adventure package today!</p>
                                <div className="cta-features">
                                    <span>✓ Best Price Guarantee</span>
                                    <span>✓ Easy Booking Process</span>
                                    <span>✓ Adventure Packages Available</span>
                                </div>
                                <button className="submit-btn" onClick={handleBookNow}>
                                    Book Your Experience
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Quote Section */}
            <div className="peaceful-quote-section">
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

            <BackToTop />
            <Footer />
        </div>
    );
};

export default DhurwaDera;