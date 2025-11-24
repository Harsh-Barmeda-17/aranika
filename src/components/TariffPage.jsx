import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import '../styles/TariffPage.css';

const TariffPage = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeSeason, setActiveSeason] = useState('peak');
    const containerRef = useRef(null);

    useEffect(() => {
        // Force scroll to top on page load
        window.scrollTo(0, 0);
        
        // Scroll event listener for back to top button
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Initialize animations
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

            const elements = document.querySelectorAll('.initial-hidden');
            elements.forEach(el => {
                observer.observe(el);
            });
        };

        const timer = setTimeout(initAnimations, 300);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleBookNow = () => {
        alert("🌿 Welcome to Dhurwa Dera! Redirecting to booking page...");
        // You can add navigation to booking page here
    };

    const seasons = {
        peak: {
            name: "Peak Season",
            period: "October - March",
            description: "Perfect weather for exploring Bastar's natural beauty",
            rooms: [
                {
                    type: "Standard Room",
                    price: 3000,
                    originalPrice: 3500,
                    features: ["3 guests included", "Complimentary breakfast", "Free WiFi", "Hot water"]
                },
                {
                    type: "Room with Extra Bed",
                    price: 3500,
                    originalPrice: 4000,
                    features: ["4 guests maximum", "Extra bed included", "All standard amenities", "Priority service"]
                }
            ]
        },
        offPeak: {
            name: "Off-Peak Season",
            period: "April - September",
            description: "Quiet and peaceful stay with special discounts",
            rooms: [
                {
                    type: "Standard Room",
                    price: 2500,
                    originalPrice: 3000,
                    features: ["3 guests included", "Complimentary breakfast", "Free WiFi", "Hot water"]
                },
                {
                    type: "Room with Extra Bed",
                    price: 3000,
                    originalPrice: 3500,
                    features: ["4 guests maximum", "Extra bed included", "All standard amenities", "Priority service"]
                }
            ]
        }
    };

    const additionalCharges = [
        { item: "Extra Bed", price: 500, period: "per night" },
        { item: "Additional Person", price: 800, period: "per night" },
        { item: "Early Check-in", price: 500, period: "before 12 PM" },
        { item: "Late Check-out", price: 500, period: "after 11 AM" }
    ];

    const inclusions = [
        "Complimentary breakfast for all guests",
        "Free WiFi access throughout property",
        "Hot water supply 24/7",
        "Housekeeping services",
        "Parking facility",
        "Tourist information assistance",
        "Cultural experience sessions"
    ];

    const policies = [
        "Check-in: 12:00 PM | Check-out: 11:00 AM",
        "Children below 4 years stay free",
        "Extra beds available on request",
        "50% advance required for booking confirmation",
        "Cancellation 7 days prior for full refund",
        "Valid ID proof required at check-in"
    ];

    return (
        <div className="tariff-page-container" ref={containerRef}>
            {/* Left Branch Decoration */}
            <div className="left-branch scroll-animate initial-hidden">
                <img src="./branch4.png" alt="Branch Left" />
            </div>

            {/* Main Content */}
            <div className="main-content-wrapper">
                {/* Header Section */}
                <div className="header-section scroll-fade initial-hidden">
                    <h1>Tariff & Pricing</h1>
                    <div className="tagline">
                        Transparent pricing for your perfect stay in the heart of Bastar
                    </div>
                </div>

                {/* Season Selector */}
                <div className="season-selector scroll-animate initial-hidden delay-1">
                    <div className="selector-tabs">
                        <button 
                            className={`season-tab ${activeSeason === 'peak' ? 'active' : ''}`}
                            onClick={() => setActiveSeason('peak')}
                        >
                            <span className="season-name">Peak Season</span>
                            <span className="season-period">Oct - Mar</span>
                        </button>
                        <button 
                            className={`season-tab ${activeSeason === 'offPeak' ? 'active' : ''}`}
                            onClick={() => setActiveSeason('offPeak')}
                        >
                            <span className="season-name">Off-Peak</span>
                            <span className="season-period">Apr - Sep</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-section-main">
                    <div className="season-info scroll-animate initial-hidden delay-2">
                        <h3>{seasons[activeSeason].name}</h3>
                        <p className="season-period">{seasons[activeSeason].period}</p>
                        <p className="season-description">{seasons[activeSeason].description}</p>
                    </div>

                    <div className="pricing-cards-grid">
                        {seasons[activeSeason].rooms.map((room, index) => (
                            <div key={index} className={`pricing-card scroll-animate initial-hidden delay-${index + 3}`}>
                                <div className="card-header">
                                    <h4>{room.type}</h4>
                                    <div className="price-tag">
                                        <span className="current-price">₹{room.price}</span>
                                        <span className="original-price">₹{room.originalPrice}</span>
                                        <span className="price-period">/ night</span>
                                    </div>
                                    {room.originalPrice > room.price && (
                                        <div className="discount-badge">
                                            Save ₹{room.originalPrice - room.price}
                                        </div>
                                    )}
                                </div>
                                <div className="features-list">
                                    {room.features.map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <span className="check-icon">✓</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="book-now-btn" onClick={handleBookNow}>
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Charges */}
                <div className="additional-charges-section scroll-animate initial-hidden delay-5">
                    <h3>Additional Charges</h3>
                    <div className="charges-grid">
                        {additionalCharges.map((charge, index) => (
                            <div key={index} className="charge-item scroll-animate initial-hidden delay-6">
                                <div className="charge-info">
                                    <span className="charge-name">{charge.item}</span>
                                    <span className="charge-period">{charge.period}</span>
                                </div>
                                <div className="charge-price">₹{charge.price}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inclusions & Policies Grid */}
                <div className="info-grid-section">
                    <div className="inclusions-section scroll-animate initial-hidden delay-7">
                        <h3>What's Included</h3>
                        <div className="inclusions-list">
                            {inclusions.map((inclusion, index) => (
                                <div key={index} className="inclusion-item">
                                    <span className="inclusion-icon">🌿</span>
                                    <span>{inclusion}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="policies-section scroll-animate initial-hidden delay-8">
                        <h3>Booking Policies</h3>
                        <div className="policies-list">
                            {policies.map((policy, index) => (
                                <div key={index} className="policy-item">
                                    <span className="policy-bullet">•</span>
                                    <span>{policy}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="tariff-cta-section scroll-fade initial-hidden delay-9">
                    <div className="cta-content">
                        <h3>Ready to Book Your Stay?</h3>
                        <p>Experience the authentic Bastar hospitality at Dhurwa Dera</p>
                        <div className="cta-features">
                            <span>✓ Best Price Guarantee</span>
                            <span>✓ Easy Cancellation</span>
                            <span>✓ Instant Confirmation</span>
                        </div>
                        <button className="premium-book-btn" onClick={handleBookNow}>
                            <span className="btn-sparkle">🌿</span>
                            Book Your Stay Now
                            <span className="btn-arrow">→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <div className="peaceful-quote-section scroll-fade initial-hidden delay-10">
                <div className="quote-container">
                    <div className="quote-icon">💰</div>
                    <blockquote className="peaceful-quote">
                        Experience luxury that doesn't cost the earth, but brings you closer to it.
                    </blockquote>
                    <div className="quote-author">- Dhurwa Dera Value Promise</div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button 
                className={`back-to-top ${showBackToTop ? 'show' : ''}`} 
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-8 8h6v8h4v-8h6z"/>
                </svg>
            </button>

            <Footer />
        </div>
    );
};

export default TariffPage;