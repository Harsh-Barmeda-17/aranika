import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import '../styles/ServicesPage.css';

const ServicesPage = () => {
    const [activeCategory, setActiveCategory] = useState('accommodation');
    const [showBackToTop, setShowBackToTop] = useState(false);

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

    const serviceCategories = {
        accommodation: {
            name: "Accommodation",
            services: [
                "Traditional Bastar-style rooms with authentic tribal architecture",
                "Comfortable bedding with clean linens and basic furnishings",
                "Attached bathrooms with 24/7 hot water supply",
                "Daily housekeeping and maintenance services",
                "Safe and secure environment with basic amenities"
            ]
        },
        dining: {
            name: "Dining & Food",
            services: [
                "Authentic tribal cuisine prepared with local ingredients",
                "Traditional breakfast included with stay",
                "Local delicacies and seasonal specialities",
                "Vegetarian and non-vegetarian options available",
                "Freshly prepared meals with hygienic kitchen practices"
            ]
        },
        facilities: {
            name: "Basic Facilities",
            services: [
                "Clean drinking water available throughout",
                "Basic first-aid and medical assistance",
                "Local guide services for village visits",
                "Cultural information and tribal heritage guidance",
                "Peaceful natural surroundings for relaxation"
            ]
        }
    };

    return (
        <div className="services-page">
            <main className="services-main">
                <div className="services-container">
                    <div className="services-card">
                        <div className="card-header">
                            <h1>Our Services</h1>
                            <p className="subtitle">Experience authentic Bastar tribal hospitality with basic, comfortable facilities</p>
                        </div>

                        {/* Welcome Section */}
                        <section className="form-section">
                            <div className="section-header">
                                <h2>Welcome to Dhurwa Dera</h2>
                            </div>
                            <div className="welcome-content">
                                <p>Dhurwa Dera offers genuine Bastar tribal hospitality in its purest form. We provide basic, comfortable accommodation and authentic local experiences that let you connect with the rich cultural heritage of Chhattisgarh.</p>
                                <p>Our focus is on preserving traditional ways while offering clean, comfortable facilities for travelers seeking an authentic tribal experience.</p>
                            </div>
                        </section>

                        {/* Service Categories */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>Our Services</h3>
                            </div>
                            <div className="categories-grid">
                                {Object.keys(serviceCategories).map((categoryKey) => (
                                    <button
                                        key={categoryKey}
                                        className={`category-card ${activeCategory === categoryKey ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(categoryKey)}
                                    >
                                        <span className="category-name">{serviceCategories[categoryKey].name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Active Category Services */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>{serviceCategories[activeCategory].name}</h3>
                            </div>
                            <div className="services-list">
                                {serviceCategories[activeCategory].services.map((service, index) => (
                                    <div key={index} className="service-item">
                                        <span className="service-bullet">•</span>
                                        <span>{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Basic Information */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>What to Expect</h3>
                            </div>
                            <div className="info-grid">
                                <div className="info-item">
                                    <h4>Traditional Experience</h4>
                                    <p>Authentic tribal lifestyle and cultural immersion in basic, traditional setting</p>
                                </div>
                                <div className="info-item">
                                    <h4>Local Cuisine</h4>
                                    <p>Simple, traditional meals prepared with local ingredients and recipes</p>
                                </div>
                                <div className="info-item">
                                    <h4>Basic Comfort</h4>
                                    <p>Clean, comfortable accommodation with essential facilities</p>
                                </div>
                                <div className="info-item">
                                    <h4>Cultural Access</h4>
                                    <p>Opportunities to experience and learn about tribal traditions</p>
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

            <Footer />
        </div>
    );
};

export default ServicesPage;