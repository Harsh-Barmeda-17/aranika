import React, { useState, useEffect, useRef, useContext } from 'react';
import BackToTop from './BackToTop';
import '../styles/DhurwaDera.css';
import { LanguageContext } from '../App';

const DhurwaDera = ({ onNavigate }) => {
    const { language } = useContext(LanguageContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const containerRef = useRef(null);

    // Language translations
    const translations = {
        english: {
            pageTitle: "Dhurwa Dera Experience",
            subtitle: "Traditional comfort meets authentic Bastar adventures",
            roomsAccommodation: "Our Rooms & Accommodation",
            view: "View",
            pricingDetails: "Pricing Details",
            roomRate: "Room Rate (per night):",
            extraBed: "Extra Bed (per night):",
            childrenFree: "Children Free:",
            yearsBelow: "years & below",
            startingFrom: "Starting from:",
            adventureActivities: "Adventure Activities",
            adventureSubtitle: "Experience the thrill of Bastar with our exciting adventure packages",
            adventureNotes: [
                "All adventure activities include safety equipment and expert guides",
                "Advance booking recommended for adventure activities",
                "Children below 12 must be accompanied by adults"
            ],
            popularChoice: "Popular Choice",
            roomSpecifications: "Room Specifications",
            standardCapacity: "Standard Capacity",
            peoplePerRoom: "people per room",
            bedsIncluded: "beds included",
            extraBedOption: "Extra Bed Option",
            additionalBed: "additional bed",
            perNight: "per night",
            maxOccupancy: "Max Occupancy",
            withExtraBed: "With extra bed",
            totalCapacity: "Total Capacity",
            guestsMaximum: "guests maximum",
            allRoomsOccupied: "All rooms occupied",
            readyToExperience: "Ready to Experience Dhurwa Dera?",
            bookToday: "Book your stay and adventure package today!",
            bestPriceGuarantee: "✓ Best Price Guarantee",
            easyBookingProcess: "✓ Easy Booking Process",
            adventurePackagesAvailable: "✓ Adventure Packages Available",
            bookYourExperience: "Book Your Experience",
            quote: "In the heart of nature, discover rooms that comfort your soul and peace that stays with you.",
            quoteAuthor: "- Dhurwa Dera Experience",
            close: "×",
            zoomIn: "+",
            zoomOut: "−",
            
            // Room stats
            totalRooms: "Total Rooms",
            maxGuests: "Max Guests",
            perRoomMax: "Per Room Max",
            
            // Adventure activities
            adventures: [
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
            ]
        },
        hindi: {
            pageTitle: "धुरवा डेरा अनुभव",
            subtitle: "पारंपरिक आराम वास्तविक बस्तार साहसिक कार्यों से मिलता है",
            roomsAccommodation: "हमारे कमरे और आवास",
            view: "देखें",
            pricingDetails: "मूल्य विवरण",
            roomRate: "कमरे की दर (प्रति रात):",
            extraBed: "अतिरिक्त बेड (प्रति रात):",
            childrenFree: "बच्चे मुफ्त:",
            yearsBelow: "वर्ष और नीचे",
            startingFrom: "शुरू होता है:",
            adventureActivities: "साहसिक गतिविधियाँ",
            adventureSubtitle: "हमारे रोमांचक साहसिक पैकेजों के साथ बस्तार का रोमांच अनुभव करें",
            adventureNotes: [
                "सभी साहसिक गतिविधियों में सुरक्षा उपकरण और विशेषज्ञ गाइड शामिल हैं",
                "साहसिक गतिविधियों के लिए अग्रिम बुकिंग की सिफारिश की जाती है",
                "12 वर्ष से कम उम्र के बच्चों के साथ वयस्कों का होना आवश्यक है"
            ],
            popularChoice: "लोकप्रिय पसंद",
            roomSpecifications: "कमरे की विशिष्टताएँ",
            standardCapacity: "मानक क्षमता",
            peoplePerRoom: "लोग प्रति कमरा",
            bedsIncluded: "बेड शामिल",
            extraBedOption: "अतिरिक्त बेड विकल्प",
            additionalBed: "अतिरिक्त बेड",
            perNight: "प्रति रात",
            maxOccupancy: "अधिकतम अधिभोग",
            withExtraBed: "अतिरिक्त बेड के साथ",
            totalCapacity: "कुल क्षमता",
            guestsMaximum: "अधिकतम अतिथि",
            allRoomsOccupied: "सभी कमरे भरे हुए",
            readyToExperience: "धुरवा डेरा का अनुभव करने के लिए तैयार हैं?",
            bookToday: "अपना स्टे और साहसिक पैकेज आज ही बुक करें!",
            bestPriceGuarantee: "✓ सर्वोत्तम मूल्य गारंटी",
            easyBookingProcess: "✓ आसान बुकिंग प्रक्रिया",
            adventurePackagesAvailable: "✓ साहसिक पैकेज उपलब्ध",
            bookYourExperience: "अपना अनुभव बुक करें",
            quote: "प्रकृति की गोद में, ऐसे कमरे खोजें जो आपकी आत्मा को सुकून दें और ऐसी शांति जो आपके साथ रहती है।",
            quoteAuthor: "- धुरवा डेरा अनुभव",
            close: "×",
            zoomIn: "+",
            zoomOut: "−",
            
            // Room stats
            totalRooms: "कुल कमरे",
            maxGuests: "अधिकतम अतिथि",
            perRoomMax: "प्रति कमरा अधिकतम",
            
            // Adventure activities
            adventures: [
                {
                    name: "रिवर राफ्टिंग",
                    price: 100,
                    description: "प्राचीन जल में रोमांचक रिवर राफ्टिंग अनुभव",
                    duration: "2 घंटे",
                    includes: ["सुरक्षा उपकरण", "विशेषज्ञ गाइड", "बेसिक प्रशिक्षण"]
                },
                {
                    name: "बांस राफ्टिंग",
                    price: 200,
                    description: "शांत जल अनुभव के लिए पारंपरिक बांस राफ्टिंग",
                    duration: "1.5 घंटे",
                    includes: ["पारंपरिक बांस का बेड़ा", "स्थानीय गाइड", "सुरक्षा ब्रीफिंग"]
                }
            ]
        }
    };

    const t = translations[language];

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
        // Navigate to booking page using the prop from App.js
        if (onNavigate) {
            onNavigate('booking');
        }
        // Scroll to top of the booking page (handled in App.js)
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

    return (
        <div className="dhurwa-dera-page" ref={containerRef}>
            {/* Main Content */}
            <main className="dhurwa-main">
                <div className="dhurwa-container">
                    <div className="dhurwa-card">
                        <div className="card-header">
                            <h2>{t.pageTitle}</h2>
                            <p className="subtitle">{t.subtitle}</p>
                        </div>

                        {/* Room & Accommodation Section */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>{t.roomsAccommodation}</h3>
                            </div>
                            
                            <div className="images-section">
                                <div className="collage-container">
                                    {/* Image 1 - Top Left */}
                                    <div className="collage-item top-left" onClick={() => handleImageClick("./room2.JPG")}>
                                        <img src="./room2.JPG" alt="Room 1" />
                                        <div className="image-overlay">
                                            <span className="view-text">{t.view}</span>
                                        </div>
                                    </div>

                                    {/* Image 2 - Top Right */}
                                    <div className="collage-item top-right" onClick={() => handleImageClick("./room3.JPG")}>
                                        <img src="./room3.JPG" alt="Room 2" />
                                        <div className="image-overlay">
                                            <span className="view-text">{t.view}</span>
                                        </div>
                                    </div>

                                    {/* Image 3 - Bottom Left */}
                                    <div className="collage-item bottom-left" onClick={() => handleImageClick("./room4.jpg")}>
                                        <img src="./room4.jpg" alt="Room 3" />
                                        <div className="image-overlay">
                                            <span className="view-text">{t.view}</span>
                                        </div>
                                    </div>

                                    {/* Image 4 - Bottom Right */}
                                    <div className="collage-item bottom-right" onClick={() => handleImageClick("./room6.jpg")}>
                                        <img src="./room6.jpg" alt="Room 4" />
                                        <div className="image-overlay">
                                            <span className="view-text">{t.view}</span>
                                        </div>
                                    </div>

                                    {/* Center Circular Image - Fixed to fill properly */}
                                    <div className="center-circle" onClick={() => handleImageClick("./room5.jpg")}>
                                        <img src="./room5.jpg" alt="Center Room" className="center-image" />
                                        <div className="image-overlay">
                                            <span className="view-text">{t.view}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="room-stats">
                                <div className="stat-item">
                                    <div className="stat-number">3</div>
                                    <div className="stat-label">{t.totalRooms}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">12</div>
                                    <div className="stat-label">{t.maxGuests}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">4</div>
                                    <div className="stat-label">{t.perRoomMax}</div>
                                </div>
                            </div>
                        </section>

                        {/* Pricing Information - Moved after image grid */}
                        <section className="form-section price-section">
                            <div className="section-header">
                                <h3>{t.pricingDetails}</h3>
                            </div>
                            <div className="price-details">
                                <div className="price-row">
                                    <span>{t.roomRate}</span>
                                    <span>₹2,500</span>
                                </div>
                                <div className="price-row">
                                    <span>{t.extraBed}</span>
                                    <span>₹500</span>
                                </div>
                                <div className="price-row discount">
                                    <span>{t.childrenFree}</span>
                                    <span>4 {language === 'english' ? 'years & below' : 'वर्ष और नीचे'}</span>
                                </div>
                                <div className="price-divider"></div>
                                <div className="price-row total">
                                    <span>{t.startingFrom}</span>
                                    <span>₹2,500/{language === 'english' ? 'night' : 'रात'}</span>
                                </div>
                            </div>
                        </section>

                        {/* Adventure Activities Section */}
                        <section className="form-section adventure-section">
                            <div className="section-header">
                                <h3>{t.adventureActivities}</h3>
                                <p>{t.adventureSubtitle}</p>
                            </div>

                            <div className="adventure-grid">
                                {t.adventures.map((adventure, index) => (
                                    <div key={index} className="adventure-card">
                                        <div className="adventure-header">
                                            <h4>{adventure.name}</h4>
                                            <div className="adventure-price">
                                                ₹{adventure.price}<span>/{language === 'english' ? 'person' : 'व्यक्ति'}</span>
                                            </div>
                                        </div>
                                        <p className="adventure-description">{adventure.description}</p>
                                        <div className="adventure-duration">
                                            <span>{language === 'english' ? 'Duration:' : 'अवधि:'} {adventure.duration}</span>
                                        </div>
                                        <div className="adventure-includes">
                                            <h5>{language === 'english' ? 'Includes:' : 'शामिल हैं:'}</h5>
                                            <ul>
                                                {adventure.includes.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="highlight-badge">
                                            {t.popularChoice}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="adventure-notes">
                                {t.adventureNotes.map((note, index) => (
                                    <div key={index} className="note-item">
                                        <span className="note-bullet">•</span>
                                        <span>{note}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Room Details Section */}
                        <section className="form-section">
                            <div className="section-header">
                                <h3>{t.roomSpecifications}</h3>
                            </div>
                            
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <div className="spec-icon">🛏️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">{t.standardCapacity}</div>
                                        <div className="spec-value">3 {t.peoplePerRoom}</div>
                                        <div className="spec-note">3 {t.bedsIncluded}</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">➕</div>
                                    <div className="spec-content">
                                        <div className="spec-title">{t.extraBedOption}</div>
                                        <div className="spec-value">1 {t.additionalBed}</div>
                                        <div className="spec-note">₹500 {t.perNight}</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">🚶‍♂️</div>
                                    <div className="spec-content">
                                        <div className="spec-title">{t.maxOccupancy}</div>
                                        <div className="spec-value">4 {t.peoplePerRoom}</div>
                                        <div className="spec-note">{t.withExtraBed}</div>
                                    </div>
                                </div>
                                
                                <div className="spec-item">
                                    <div className="spec-icon">🏨</div>
                                    <div className="spec-content">
                                        <div className="spec-title">{t.totalCapacity}</div>
                                        <div className="spec-value">12 {t.guestsMaximum}</div>
                                        <div className="spec-note">{t.allRoomsOccupied}</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action - Updated for better visibility */}
                        <section className="form-section cta-section">
                            <div className="cta-content">
                                <h3>{t.readyToExperience}</h3>
                                <p>{t.bookToday}</p>
                                <div className="cta-features">
                                    <span>{t.bestPriceGuarantee}</span>
                                    <span>{t.easyBookingProcess}</span>
                                    <span>{t.adventurePackagesAvailable}</span>
                                </div>
                                <button className="submit-btn" onClick={handleBookNow}>
                                    {t.bookYourExperience}
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
                        {t.quote}
                    </blockquote>
                    <div className="quote-author">{t.quoteAuthor}</div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="image-modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseModal}>{t.close}</button>
                        <div className="zoom-controls">
                            <button onClick={handleZoomOut}>{t.zoomOut}</button>
                            <span>{Math.round(zoomLevel * 100)}%</span>
                            <button onClick={handleZoomIn}>{t.zoomIn}</button>
                        </div>
                        <img 
                            src={selectedImage} 
                            alt={language === 'english' ? "Enlarged view" : "बड़ा दृश्य"} 
                            style={{ transform: `scale(${zoomLevel})` }}
                            onWheel={handleWheel}
                        />
                    </div>
                </div>
            )}

            <BackToTop />
        </div>
    );
};

export default DhurwaDera;