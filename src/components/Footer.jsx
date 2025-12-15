import React, { useContext } from "react";
import { LanguageContext } from '../App';
import "../styles/Footer.css";

const Footer = ({ onNavigate }) => {
    const { language } = useContext(LanguageContext);
    
    const handleMapClick = () => {
        window.open(
            "https://maps.google.com/?q=18.8759292,81.9123589",
            "_blank"
        );
    };

    const handleItmClick = () => {
        window.open("https://www.itmuniversity.org/", "_blank");
    };

    // Handle navigation from footer quick links
    const handleQuickLinkClick = (page) => {
        if (onNavigate) {
            onNavigate(page);
        }
        // Scroll to top when navigating
        window.scrollTo(0, 0);
    };

    // Language translations
    const translations = {
        english: {
            findUs: "Find Us",
            clickToOpenMap: "Click to open in Google Maps",
            followUs: "Follow Us",
            quickLinks: "Quick Links",
            home: "Home",
            tariff: "Tariff",
            gallery: "Gallery",
            services: "Services",
            bookNow: "Book Now",
            reachUs: "Reach Us",
            establishmentSignature: "Dhurwa Dera",
            establishmentDescription: "A tribal homestay nestled in the forests of Bastar, offering an eco-friendly stay with authentic culture, food, and nature.",
            localityLabel: "Pedawada",
            localitySubtitle: "Dhurwa Dera Location",
            platformName: "Google",
            serviceName: "Maps",
            copyright: "© 2025 Dhurwa Dera",
            craftedBy: "Crafted by",
            studentsOf: "Students of ITM University, Raipur"
        },
        hindi: {
            findUs: "हमें खोजें",
            clickToOpenMap: "Google Maps में खोलने के लिए क्लिक करें",
            followUs: "हमें फॉलो करें",
            quickLinks: "त्वरित लिंक",
            home: "होम",
            tariff: "टैरिफ",
            gallery: "गैलरी",
            services: "सेवाएं",
            bookNow: "बुक करें",
            reachUs: "हमसे संपर्क करें",
            establishmentSignature: "धुरवा डेरा",
            establishmentDescription: "बस्तर के जंगलों में स्थित एक आदिवासी होमस्टे, जो प्रामाणिक संस्कृति, भोजन और प्रकृति के साथ एक पर्यावरण-अनुकूल प्रवास प्रदान करता है।",
            localityLabel: "पेदावाड़ा",
            localitySubtitle: "धुरवा डेरा स्थान",
            platformName: "गूगल",
            serviceName: "मैप्स",
            copyright: "© 2025 धुरवा डेरा",
            craftedBy: "बनाया गया",
            studentsOf: "आईटीएम विश्वविद्यालय, रायपुर के छात्रों द्वारा"
        }
    };

    const t = translations[language];

    return (
        <footer
            className="terrain-base"
            style={{
                background: `
                    linear-gradient(
                        135deg,
                        rgba(26, 65, 11, 0.29),
                        rgba(45, 80, 22, 0.23)
                    ),
                    url('/footer1.jpg') center / cover no-repeat
                `,
            }}
        >
            {/* ===== TOP WAVE ===== */}
            <div className="topography-ripple" />

            {/* ===== DECOR ELEMENTS ===== */}
            <div className="organic-embellishments">
                <div className="flora-motif">🌿</div>
                <div className="flora-motif">🍃</div>
            </div>

            <div className="geometric-overlay">
                <div className="hologram-node" />
                <div className="hologram-node" />
                <div className="hologram-node" />
                <div className="hologram-node" />
            </div>

            {/* ===== CONTENT ===== */}
            <div className="terrain-content-wrapper">
                <div className="primary-content-grid">
                    <div className="dual-panel-layout">

                        {/* ===== BRAND ===== */}
                        <div className="brand-identity-panel">
                            <h3 className="establishment-signature">
                                {t.establishmentSignature}
                            </h3>
                            <p className="establishment-description">
                                {t.establishmentDescription}
                            </p>
                        </div>

                        {/* ===== FIND US – GOOGLE MAP STYLE ===== */}
                        <div className="geospatial-panel">
                            <h4 className="geolocation-header">{t.findUs}</h4>

                            <div className="cartographic-preview">
                                <div
                                    className="interactive-minimap"
                                    onClick={handleMapClick}
                                >
                                    <div className="map-simulator">
                                        <div className="cartographic-container">

                                            {/* Grid */}
                                            <div className="map-base-layer">
                                                <div className="coordinate-grid" />

                                                <div className="territory-zones">
                                                    <div className="zone sector-alpha" />
                                                    <div className="zone sector-beta" />
                                                    <div className="zone sector-gamma" />
                                                    <div className="zone sector-delta" />
                                                </div>
                                            </div>

                                            {/* Roads */}
                                            <div className="transportation-network">
                                                <div className="route horizontal arterial" />
                                                <div className="route vertical arterial" />
                                                <div className="route horizontal collector" />
                                                <div className="route vertical collector" />
                                                <div className="route horizontal local" />
                                                <div className="route vertical local" />
                                            </div>

                                            {/* Buildings */}
                                            <div className="urban-structures">
                                                <div className="edifice structure-one" />
                                                <div className="edifice structure-two" />
                                                <div className="edifice structure-three" />
                                                <div className="edifice structure-four" />
                                                <div className="edifice structure-five" />
                                            </div>

                                            {/* Location Pin */}
                                            <div className="position-indicator">
                                                <div className="pin-marker" />
                                                <div className="signal-pulse" />
                                            </div>

                                            {/* Label */}
                                            <div className="location-annotations">
                                                <div className="locality-label">
                                                    {t.localityLabel}
                                                </div>
                                                <div className="locality-subtitle">
                                                    {t.localitySubtitle}
                                                </div>
                                            </div>

                                            {/* Google Credit */}
                                            <div className="platform-credits">
                                                <span className="platform-logo">
                                                    G
                                                </span>
                                                <div className="credits-text">
                                                    <span className="platform-name">
                                                        {t.platformName}
                                                    </span>
                                                    <span className="service-name">
                                                        {t.serviceName}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="cartographic-overlay">
                                        <div className="overlay-content">
                                            <span className="cartographic-icon">
                                                📍
                                            </span>
                                            <span className="interaction-prompt">
                                                {t.clickToOpenMap}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== SOCIAL MEDIA ===== */}
                    <div className="social-engagement-section">
                        <h4 className="social-connect-header">{t.followUs}</h4>

                        <div className="social-platform-icons">
                            {/* Instagram */}
                            <a
                                href="#"
                                className="social-channel"
                                aria-label="Instagram"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="#"
                                className="social-channel"
                                aria-label="Facebook"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="#"
                                className="social-channel"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12.04 0C5.41 0 .07 5.34.07 11.93c0 2.11.55 4.17 1.59 6.01L0 24l6.22-1.63a11.87 11.87 0 005.82 1.49h.01c6.63 0 11.97-5.34 11.97-11.93C24.01 5.34 18.67 0 12.04 0zm0 21.8a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.69.97.98-3.6-.24-.38a9.9 9.9 0 01-1.52-5.25c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.9 6.99c0 5.45-4.44 9.89-9.89 9.89z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ===== QUICK LINKS ===== */}
                <div className="navigation-ribbon">
                    <h4 className="rapid-access-header">{t.quickLinks}</h4>
                    <div className="access-links-container">
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('home')}
                        >
                            {t.home}
                        </button>
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('dhurwadera')}
                        >
                            {t.tariff}
                        </button>
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('gallery')}
                        >
                            {t.gallery}
                        </button>
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('services')}
                        >
                            {t.services}
                        </button>
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('booking')}
                        >
                            {t.bookNow}
                        </button>
                        <button 
                            className="rapid-access-link" 
                            onClick={() => handleQuickLinkClick('contact')}
                        >
                            {t.reachUs}
                        </button>
                    </div>
                </div>

                {/* ===== FOOTER BOTTOM ===== */}
                <div className="footer-foundation">
                    <div className="foundation-divider" />
                    <p className="copyright-notice">
                        {t.copyright}
                        <br />
                        <span className="creator-attribution">
                            {t.craftedBy}{" "}
                            <span
                                className="academic-link"
                                onClick={handleItmClick}
                            >
                                {t.studentsOf}
                            </span>
                            <img
                                src="/ITM logo.png"
                                alt="ITM University Logo"
                                className="academic-logo"
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