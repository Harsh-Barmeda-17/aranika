import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import BackToTop from './BackToTop';
import '../styles/ServicesPage.css';

const ServicesPage = () => {
    const [activeService, setActiveService] = useState('homestay');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const activeServiceRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleScroll = () => {
            setShowBackToTop(window.pageYOffset > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleServiceClick = (serviceKey) => {
        setActiveService(serviceKey);
        
        // Scroll to active service section after a small delay to ensure DOM update
        setTimeout(() => {
            if (activeServiceRef.current) {
                activeServiceRef.current.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };

    const services = {
        homestay: {
            name: "Bamboo Homestay",
            icon: "🏡",
            description: "Immerse yourself in authentic tribal living with our traditional bamboo cottages",
            features: [
                "Traditional bamboo cottages with authentic tribal architecture",
                "Handcrafted wooden furniture and local tribal artwork",
                "Private verandas overlooking lush natural greenery"
            ],
            highlight: "Sleep surrounded by the natural beauty of Bastar"
        },
        food: {
            name: "Tribal Cuisine",
            icon: "🍲",
            description: "Savor authentic tribal flavors with recipes passed down through generations",
            features: [
                "Traditional tribal meals cooked over wood fire",
                "Locally sourced organic ingredients from village farms",
                "Cooking demonstrations and tribal recipe sharing"
            ],
            highlight: "Taste the real flavors of Chhattisgarh"
        },
        rafting: {
            name: "River Rafting",
            icon: "🛶",
            description: "Experience thrilling river adventures through pristine forest landscapes",
            features: [
                "Guided rafting trips on Indravati River",
                "Safety equipment and experienced local guides",
                "Scenic routes through dense forests and gorges"
            ],
            highlight: "Ride the rapids through untouched wilderness"
        }
    };

    return (
        <div className="services-page">
            <main className="services-main">
                <div className="services-container">
                    {/* Hero Section */}
                    <section className="hero-section">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                <span className="title-line-2">Dhurwa Dera Services</span>
                            </h1>
                        </div>
                    </section>

                    <div className="services-content">
                        {/* Welcome Section */}
                        <section className="welcome-section">
                            <div className="section-container">
                                <div className="welcome-card">
                                    <div className="card-header">
                                        <h2>Welcome to Our Tribal Haven</h2>
                                    </div>
                                    <div className="card-body">
                                        <p>At Dhurwa Dera, we blend ancient tribal traditions with unforgettable experiences. Our bamboo cottages, traditional cuisine, and river adventures offer a complete immersion into the rich cultural tapestry of Chhattisgarh.</p>
                                        <div className="features-row">
                                            <div className="feature-pill">
                                                <span className="pill-icon">🌱</span>
                                                <span className="pill-text">Eco-Friendly</span>
                                            </div>
                                            <div className="feature-pill">
                                                <span className="pill-icon">✨</span>
                                                <span className="pill-text">Memorable</span>
                                            </div>
                                            <div className="feature-pill">
                                                <span className="pill-icon">🏆</span>
                                                <span className="pill-text">Award-Winning</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Service Navigation */}
                        <section className="services-navigation">
                            <div className="section-container">
                                <div className="navigation-card">
                                    <h3 className="section-title">Choose Your Experience</h3>
                                    <div className="services-tabs">
                                        {Object.keys(services).map((serviceKey) => (
                                            <button
                                                key={serviceKey}
                                                className={`service-tab ${activeService === serviceKey ? 'active' : ''}`}
                                                onClick={() => handleServiceClick(serviceKey)}
                                            >
                                                <div className="tab-content">
                                                    <span className="tab-icon">{services[serviceKey].icon}</span>
                                                    <span className="tab-name">{services[serviceKey].name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Active Service Display */}
                        <section className="active-service" ref={activeServiceRef}>
                            <div className="section-container">
                                <div className="service-detail-card">
                                    <div className="service-header">
                                        <div className="service-hero">
                                            <div className="service-icon-wrapper">
                                                <div className="service-icon-large">
                                                    {services[activeService].icon}
                                                </div>
                                            </div>
                                            <div className="service-info">
                                                <h3>{services[activeService].name}</h3>
                                                <p className="service-description">
                                                    {services[activeService].description}
                                                </p>
                                                <div className="service-highlight">
                                                    <span className="highlight-icon">⭐</span>
                                                    {services[activeService].highlight}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="service-features">
                                        <div className="features-header">
                                            <h4>What's Included</h4>
                                        </div>
                                        <div className="features-grid">
                                            {services[activeService].features.map((feature, index) => (
                                                <div key={index} className="feature-card">
                                                    <div className="feature-decoration">
                                                        <div className="feature-icon">✓</div>
                                                        <div className="feature-number">0{index + 1}</div>
                                                    </div>
                                                    <div className="feature-content">
                                                        <span className="feature-text">{feature}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Combined Experience */}
                        <section className="combined-experience">
                            <div className="section-container">
                                <div className="journey-card">
                                    <div className="journey-header">
                                        <h3>The Complete Tribal Journey</h3>
                                        <p>Combine all three experiences for an unforgettable stay</p>
                                    </div>
                                    <div className="journey-steps">
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>1</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>Arrive & Settle In</h4>
                                                <p>Check into your bamboo cottage and immerse in tribal architecture</p>
                                            </div>
                                        </div>
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>2</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>Traditional Dining Experience</h4>
                                                <p>Experience authentic tribal cuisine with locally sourced ingredients</p>
                                            </div>
                                        </div>
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>3</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>River Adventure</h4>
                                                <p>Embark on thrilling rafting through pristine forest landscapes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button className="back-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
            <BackToTop />
            <Footer />
        </div>
    );
};

export default ServicesPage;