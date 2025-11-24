import React from 'react';
import '../styles/Footer.css'

const Footer = () => {
    const handleMapClick = () => {
        // Open Google Maps in a new tab with the coordinates
        window.open('https://maps.google.com/?q=18.8759292,81.9123589', '_blank');
    };

    const handleItmClick = () => {
        // Open ITM University website in a new tab
        window.open('https://www.itmuniversity.org/', '_blank');
    };

    return (
        <footer 
            className="professional-footer scroll-fade initial-hidden delay-2"
            style={{
                background: `
                    linear-gradient(135deg, rgba(26, 65, 11, 0.29), rgba(45, 80, 22, 0.23)),
                    url('/footer1.jpg') center/cover
                `,
                color: '#1a2d0b',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '80px',
                marginTop: '0',
                width: '100%'
            }}
        >
            {/* Animated Wave Section */}
            <div className="footer-wave"></div>
            
            {/* Creative Background Elements */}
            <div className="creative-elements">
                <div className="creative-element">🌿</div>
                <div className="creative-element">🍃</div>
            </div>
            
            {/* HUD Elements */}
            <div className="hud-elements">
                <div className="hud-element"></div>
                <div className="hud-element"></div>
                <div className="hud-element"></div>
                <div className="hud-element"></div>
            </div>
            
            {/* Footer Content */}
            <div className="footer-container">
                {/* Main Content - Dhurwa Dera and Map Side by Side */}
                <div className="footer-main-content">
                    {/* Brand & Map Combined Section */}
                    <div className="brand-map-section scroll-fade initial-hidden delay-1">
                        <div className="brand-map-wrapper">
                            {/* Dhurwa Dera Content */}
                            <div className="brand-content">
                                <h3 className="footer-logo">Dhurwa Dera</h3>
                                <p className="footer-description">
                                    Experience the perfect blend of traditional village life and modern comfort 
                                    surrounded by nature's serene beauty.
                                </p>
                            </div>
                            
                            {/* Map Content */}
                            <div className="map-content">
                                <h4 className="map-section-title">Find Us</h4>
                                <div className="map-preview">
                                    <div className="mini-map" onClick={handleMapClick}>
                                        {/* Google Maps Style Thumbnail */}
                                        <div className="google-map-thumbnail">
                                            <div className="map-container">
                                                <div className="map-background">
                                                    <div className="map-grid"></div>
                                                    <div className="map-areas">
                                                        <div className="area area-1"></div>
                                                        <div className="area area-2"></div>
                                                        <div className="area area-3"></div>
                                                        <div className="area area-4"></div>
                                                    </div>
                                                </div>
                                                <div className="map-roads">
                                                    <div className="road horizontal main-road"></div>
                                                    <div className="road vertical main-road"></div>
                                                    <div className="road horizontal secondary-road"></div>
                                                    <div className="road vertical secondary-road"></div>
                                                    <div className="road horizontal tertiary-road"></div>
                                                    <div className="road vertical tertiary-road"></div>
                                                </div>
                                                <div className="map-buildings">
                                                    <div className="building building-1"></div>
                                                    <div className="building building-2"></div>
                                                    <div className="building building-3"></div>
                                                    <div className="building building-4"></div>
                                                    <div className="building building-5"></div>
                                                </div>
                                                <div className="map-marker">
                                                    <div className="marker-pin"></div>
                                                    <div className="marker-pulse"></div>
                                                </div>
                                                <div className="map-labels">
                                                    <div className="location-label">Pedawada</div>
                                                    <div className="location-subtitle">Dhurwa Dera Location</div>
                                                </div>
                                                <div className="google-watermark">
                                                    <span className="google-logo">G</span>
                                                    <div className="watermark-text">
                                                        <span className="google-text">Google</span>
                                                        <span className="maps-text">Maps</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="map-overlay">
                                            <div className="map-overlay-content">
                                                <span className="map-icon">📍</span>
                                                <span className="map-click-text">Click to open in Google Maps</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Follow Us Section */}
                        <div className="social-follow-section">
                            <h4 className="social-title">Follow Us</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="WhatsApp">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.189-3.553-8.449"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Links Section - Below All Sections */}
                <div className="quick-links-horizontal-section scroll-fade initial-hidden delay-4">
                    <h4 className="quick-links-title">Quick Links</h4>
                    <div className="quick-links-container">
                        <a href="#home" className="quick-link-horizontal">Home</a>
                        <a href="#rooms" className="quick-link-horizontal">Rooms</a>
                        <a href="#gallery" className="quick-link-horizontal">Gallery</a>
                        <a href="#tariff" className="quick-link-horizontal">Tariff</a>
                        <a href="#services" className="quick-link-horizontal">Services</a>
                        <a href="#booking" className="quick-link-horizontal">Book Now</a>
                        <a href="#contact" className="quick-link-horizontal">Reach Us</a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom scroll-fade initial-hidden delay-5">
                    <div className="footer-divider"></div>
                    <p className="copyright-text">
                        © 2025 Dhurwa Dera.<br /> 
                        <span className="crafted-by-container">
                            Crafted by{' '}
                            <span 
                                className="itm-link" 
                                onClick={handleItmClick}
                                style={{cursor: 'pointer', textDecoration: 'underline'}}
                            >
                                Students of ITM University, Raipur
                            </span>
                            <img 
                                src="/ITM logo.png" 
                                alt="ITM University Logo" 
                                className="itm-logo"
                                onClick={handleItmClick}
                            />
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;