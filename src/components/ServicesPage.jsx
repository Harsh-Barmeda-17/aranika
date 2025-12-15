import React, { useState, useEffect, useRef, useContext } from 'react';
import BackToTop from './BackToTop';
import '../styles/ServicesPage.css';
import { LanguageContext } from '../App';

const ServicesPage = () => {
    const { language } = useContext(LanguageContext);
    const [activeService, setActiveService] = useState('homestay');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const activeServiceRef = useRef(null);

    // Language translations
    const translations = {
        english: {
            headerTitle: "Dhurwa Dera",
            headerSubtitle: "Where Every Service is a Step Closer to Nature",
            welcomeTitle: "Welcome to Our Tribal Haven",
            welcomeDescription: "At Dhurwa Dera, we blend ancient tribal traditions with unforgettable experiences. Our bamboo cottages, traditional cuisine, and river adventures offer a complete immersion into the rich cultural tapestry of Chhattisgarh.",
            ecoFriendly: "Eco-Friendly",
            memorable: "Memorable",
            awardWinning: "Award-Winning",
            chooseExperience: "Choose Your Experience",
            whatsIncluded: "What's Included",
            completeTribalJourney: "The Complete Tribal Journey",
            combineAll: "Combine all three experiences for an unforgettable stay",
            arriveSettle: "Arrive & Settle In",
            arriveDescription: "Check into your bamboo cottage and immerse in tribal architecture",
            traditionalDining: "Traditional Dining Experience",
            diningDescription: "Experience authentic tribal cuisine with locally sourced ingredients",
            riverAdventure: "River Adventure",
            riverDescription: "Embark on thrilling rafting through pristine forest landscapes",
            
            // Services data
            services: {
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
            }
        },
        hindi: {
            headerTitle: "धुरवा डेरा",
            headerSubtitle: "जहां हर सेवा प्रकृति के करीब एक कदम है",
            welcomeTitle: "हमारे आदिवासी आश्रय स्थल में आपका स्वागत है",
            welcomeDescription: "धुरवा डेरा में, हम प्राचीन आदिवासी परंपराओं को अविस्मरणीय अनुभवों के साथ मिलाते हैं। हमारे बांस के कॉटेज, पारंपरिक व्यंजन और नदी के साहसिक कार्य छत्तीसगढ़ की समृद्ध सांस्कृतिक चित्रपट में पूर्ण विसर्जन प्रदान करते हैं।",
            ecoFriendly: "पर्यावरण-अनुकूल",
            memorable: "यादगार",
            awardWinning: "पुरस्कार विजेता",
            chooseExperience: "अपना अनुभव चुनें",
            whatsIncluded: "क्या शामिल है",
            completeTribalJourney: "संपूर्ण आदिवासी यात्रा",
            combineAll: "अविस्मरणीय प्रवास के लिए तीनों अनुभवों को संयोजित करें",
            arriveSettle: "आगमन और बसना",
            arriveDescription: "अपने बांस के कॉटेज में चेक-इन करें और आदिवासी वास्तुकला में खो जाएं",
            traditionalDining: "पारंपरिक भोजन अनुभव",
            diningDescription: "स्थानीय रूप से प्राप्त सामग्रियों के साथ प्रामाणिक आदिवासी व्यंजनों का अनुभव करें",
            riverAdventure: "नदी साहसिक",
            riverDescription: "प्राचीन वन परिदृश्यों के माध्यम से रोमांचकारी राफ्टिंग शुरू करें",
            
            // Services data in Hindi
            services: {
                homestay: {
                    name: "बांस होम स्टे",
                    icon: "🏡",
                    description: "हमारे पारंपरिक बांस के कॉटेजों के साथ प्रामाणिक आदिवासी जीवन में खो जाएं",
                    features: [
                        "प्रामाणिक आदिवासी वास्तुकला के साथ पारंपरिक बांस के कॉटेज",
                        "हस्तनिर्मित लकड़ी के फर्नीचर और स्थानीय आदिवासी कला",
                        "हरे-भरे प्राकृतिक हरियाली के सामने निजी बरामदे"
                    ],
                    highlight: "बस्तार की प्राकृतिक सुंदरता से घिरे हुए सोएं"
                },
                food: {
                    name: "आदिवासी व्यंजन",
                    icon: "🍲",
                    description: "पीढ़ियों से चली आ रही पारंपरिक आदिवासी व्यंजनों का स्वाद लें",
                    features: [
                        "लकड़ी की आग पर पकाए गए पारंपरिक आदिवासी भोजन",
                        "गांव के खेतों से स्थानीय रूप से प्राप्त जैविक सामग्री",
                        "खाना पकाने के प्रदर्शन और आदिवासी रेसिपी साझा करना"
                    ],
                    highlight: "छत्तीसगढ़ के असली स्वादों का स्वाद लें"
                },
                rafting: {
                    name: "रिवर राफ्टिंग",
                    icon: "🛶",
                    description: "प्राचीन वन परिदृश्यों के माध्यम से रोमांचकारी नदी साहसिक अनुभव करें",
                    features: [
                        "इंद्रावती नदी पर मार्गदर्शित राफ्टिंग यात्राएं",
                        "सुरक्षा उपकरण और अनुभवी स्थानीय गाइड",
                        "घने जंगलों और घाटियों के माध्यम से सुंदर मार्ग"
                    ],
                    highlight: "अछूते जंगलों के माध्यम से रैपिड्स की सवारी करें"
                }
            }
        }
    };

    const t = translations[language];

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

    return (
        <div className="services-page">
            {/* UPDATED: Same header as Gallery page with new text */}
            <div className="gallery-header-section">
                <div className="gallery-header-background">
                    <div className="gallery-nature-overlay"></div>
                </div>
                <div className="gallery-header-content">
                    <h1>{t.headerTitle}</h1>
                    <div className="gallery-divider"></div>
                    <p className="gallery-subtitle">{t.headerSubtitle}</p>
                </div>
            </div>

            <main className="services-main">
                <div className="services-container">
                    <div className="services-content">
                        {/* Welcome Section */}
                        <section className="welcome-section">
                            <div className="section-container">
                                <div className="welcome-card">
                                    <div className="card-header">
                                        <h2>{t.welcomeTitle}</h2>
                                    </div>
                                    <div className="card-body">
                                        <p>{t.welcomeDescription}</p>
                                        <div className="features-row">
                                            <div className="feature-pill">
                                                <span className="pill-icon">🌱</span>
                                                <span className="pill-text">{t.ecoFriendly}</span>
                                            </div>
                                            <div className="feature-pill">
                                                <span className="pill-icon">✨</span>
                                                <span className="pill-text">{t.memorable}</span>
                                            </div>
                                            <div className="feature-pill">
                                                <span className="pill-icon">🏆</span>
                                                <span className="pill-text">{t.awardWinning}</span>
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
                                    <h3 className="section-title">{t.chooseExperience}</h3>
                                    <div className="services-tabs">
                                        {Object.keys(t.services).map((serviceKey) => (
                                            <button
                                                key={serviceKey}
                                                className={`service-tab ${activeService === serviceKey ? 'active' : ''}`}
                                                onClick={() => handleServiceClick(serviceKey)}
                                            >
                                                <div className="tab-content">
                                                    <span className="tab-icon">{t.services[serviceKey].icon}</span>
                                                    <span className="tab-name">{t.services[serviceKey].name}</span>
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
                                                    {t.services[activeService].icon}
                                                </div>
                                            </div>
                                            <div className="service-info">
                                                <h3>{t.services[activeService].name}</h3>
                                                <p className="service-description">
                                                    {t.services[activeService].description}
                                                </p>
                                                <div className="service-highlight">
                                                    <span className="highlight-icon">⭐</span>
                                                    {t.services[activeService].highlight}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="service-features">
                                        <div className="features-header">
                                            <h4>{t.whatsIncluded}</h4>
                                        </div>
                                        <div className="features-grid">
                                            {t.services[activeService].features.map((feature, index) => (
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
                                        <h3>{t.completeTribalJourney}</h3>
                                        <p>{t.combineAll}</p>
                                    </div>
                                    <div className="journey-steps">
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>1</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>{t.arriveSettle}</h4>
                                                <p>{t.arriveDescription}</p>
                                            </div>
                                        </div>
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>2</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>{t.traditionalDining}</h4>
                                                <p>{t.diningDescription}</p>
                                            </div>
                                        </div>
                                        <div className="journey-step">
                                            <div className="step-marker">
                                                <span>3</span>
                                                <div className="marker-line"></div>
                                            </div>
                                            <div className="step-content">
                                                <h4>{t.riverAdventure}</h4>
                                                <p>{t.riverDescription}</p>
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
        </div>
    );
};

export default ServicesPage;