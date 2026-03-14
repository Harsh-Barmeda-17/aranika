import React, { useContext } from 'react';
import BackToTop from './BackToTop';
import '../styles/ReachUs.css';
import { LanguageContext } from '../App';

const ReachUs = ({ onNavigate }) => {
  const { language } = useContext(LanguageContext);

  // Language translations
  const translations = {
    english: {
      headerTitle: "Dhurwa Dera",
      headerSubtitle: "Your Gateway to Village Serenity Awaits",
      pageTitle: "Reach Us",
      pageSubtitle: "Find Your Way to Dhurwa Dera - Your Peaceful Retreat",
      homestayTitle: "Dhurwa Dera Homestay",
      addressTitle: "Address",
      addressDetails: `Dhurwa Dera, Dhudmaras Village
Near Kanker River, Bastar District
Chhattisgarh, India
Pin Code: 494223`,
      locationTitle: "Location Highlights",
      locationHighlights: `• Nestled by the Kanker River
• Surrounded by lush forests
• Peaceful and serene environment
• Perfect for nature lovers`,
      contactTitle: "Contact Information",
      phoneTitle: "Phone & WhatsApp",
      phoneNumber: "+91 79993 76721",
      whatsappNote: "Available on WhatsApp for quick responses",
      emailTitle: "Email",
      emailAddress: "info@dhurwadera.com",
      emailNote: "For inquiries and reservations",
      operatingTitle: "Operating Hours",
      dailyTimings: "Daily Timings",
      openLabel: "Open:",
      openTime: "8:00 AM",
      closeLabel: "Close:",
      closeTime: "8:00 PM",
      hoursNote: "Check-in and check-out available within these hours",
      mapTitle: "Find Us on Map",
      mapLocation: "Dhurwa Dera Location",
      mapDescription: "Dhudmaras Village, Bastar, Chhattisgarh",
      coordinatesLabel: "Coordinates:",
      coordinatesValue: "18.8759292, 81.9123589",
      getDirections: "Get Directions on Google Maps",
      ctaTitle: "Ready to Experience Dhurwa Dera?",
      ctaDescription: "Book your stay now and immerse yourself in nature's embrace at our award-winning eco-retreat",
      ctaFeature1: "UNWTO Award Winner",
      ctaFeature2: "Best Rural Tourism Village",
      ctaFeature3: "Sustainable Eco-Tourism",
      // bookNow: "Book Your Peaceful Getaway" // HIDDEN - Commented out
    },
    hindi: {
      headerTitle: "धुरवा डेरा",
      headerSubtitle: "गांव की शांति का आपका द्वार प्रतीक्षा कर रहा है",
      pageTitle: "हमसे संपर्क करें",
      pageSubtitle: "धुरवा डेरा का रास्ता खोजें - आपका शांतिपूर्ण आश्रय स्थल",
      homestayTitle: "धुरवा डेरा होम स्टे",
      addressTitle: "पता",
      addressDetails: `धुरवा डेरा, ढूंढमरास गांव
कांकेर नदी के पास, बस्तर जिला
छत्तीसगढ़, भारत
पिन कोड: 494223`,
      locationTitle: "स्थान की विशेषताएं",
      locationHighlights: `• कांकेर नदी के किनारे बसा हुआ
• हरे-भरे जंगलों से घिरा हुआ
• शांत और शांतिपूर्ण वातावरण
• प्रकृति प्रेमियों के लिए आदर्श`,
      contactTitle: "संपर्क जानकारी",
      phoneTitle: "फोन और व्हाट्सएप",
      phoneNumber: "+91 98765 43210",
      whatsappNote: "त्वरित प्रतिक्रिया के लिए व्हाट्सएप पर उपलब्ध",
      emailTitle: "ईमेल",
      emailAddress: "info@dhurwadera.com",
      emailNote: "जांच और आरक्षण के लिए",
      operatingTitle: "कार्य समय",
      dailyTimings: "दैनिक समय",
      openLabel: "खुलता है:",
      openTime: "सुबह 8:00 बजे",
      closeLabel: "बंद होता है:",
      closeTime: "रात 8:00 बजे",
      hoursNote: "इन घंटों के भीतर चेक-इन और चेक-आउट उपलब्ध",
      mapTitle: "मानचित्र पर हमें ढूंढें",
      mapLocation: "धुरवा डेरा स्थान",
      mapDescription: "ढूंढमरास गांव, बस्तर, छत्तीसगढ़",
      coordinatesLabel: "निर्देशांक:",
      coordinatesValue: "18.8759292, 81.9123589",
      getDirections: "गूगल मैप्स पर दिशा-निर्देश प्राप्त करें",
      ctaTitle: "धुरवा डेरा का अनुभव करने के लिए तैयार हैं?",
      ctaDescription: "अपना स्टे अभी बुक करें और हमारे पुरस्कार विजेता इको-रिट्रीट में प्रकृति की गोद में खो जाएं",
      ctaFeature1: "यूएनडब्ल्यूटीओ पुरस्कार विजेता",
      ctaFeature2: "सर्वश्रेष्ठ ग्रामीण पर्यटन गांव",
      ctaFeature3: "स्थायी इको-टूरिज्म",
      // bookNow: "अपनी शांतिपूर्ण छुट्टी बुक करें" // HIDDEN - Commented out
    }
  };

  const t = translations[language];

  // const handleQuickBooking = () => {
  //   if (onNavigate) {
  //     onNavigate('booking');
  //   }
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  const handleGetDirections = () => {
    // Open Google Maps with Dhurwa Dera location
    const latitude = 18.8759292;
    const longitude = 81.9123589;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="reachus-page">
      {/* NEW: Same header as Gallery page with new text */}
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

      <main className="reachus-main">
        <div className="reachus-container">
          <div className="reachus-card">
            <div className="card-header">
              <h2>{t.pageTitle}</h2>
              <p className="subtitle">{t.pageSubtitle}</p>
            </div>
            
            <div className="reachus-content">
              {/* Homestay Information */}
              <section className="info-section">
                <div className="section-header">
                  <h3>{t.homestayTitle}</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="info-content">
                      <h4>{t.addressTitle}</h4>
                      <p>{t.addressDetails}</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-compass"></i>
                    </div>
                    <div className="info-content">
                      <h4>{t.locationTitle}</h4>
                      <p>{t.locationHighlights}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="info-section">
                <div className="section-header">
                  <h3>{t.contactTitle}</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info-content">
                      <h4>{t.phoneTitle}</h4>
                      <p className="contact-number">{t.phoneNumber}</p>
                      <p className="contact-note">
                        <i className="fab fa-whatsapp"></i>
                        {t.whatsappNote}
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-content">
                      <h4>{t.emailTitle}</h4>
                      <p className="contact-email">{t.emailAddress}</p>
                      <p className="contact-note">
                        {t.emailNote}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Operating Hours */}
              <section className="info-section">
                <div className="section-header">
                  <h3>{t.operatingTitle}</h3>
                </div>
                <div className="operating-hours">
                  <div className="hours-card">
                    <div className="hours-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="hours-content">
                      <h4>{t.dailyTimings}</h4>
                      <div className="hours-schedule">
                        <div className="time-slot">
                          <span className="time-label">{t.openLabel}</span>
                          <span className="time-value">{t.openTime}</span>
                        </div>
                        <div className="time-slot">
                          <span className="time-label">{t.closeLabel}</span>
                          <span className="time-value">{t.closeTime}</span>
                        </div>
                      </div>
                      <p className="hours-note">
                        {t.hoursNote}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Google Map Section */}
              <section className="info-section">
                <div className="section-header">
                  <h3>{t.mapTitle}</h3>
                </div>
                <div className="map-container">
                  <div className="map-placeholder">
                    <div className="map-icon">
                      <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <h4>{t.mapLocation}</h4>
                    <p>{t.mapDescription}</p>
                    <div className="coordinates">
                      <span className="coordinate-label">{t.coordinatesLabel}</span>
                      <span className="coordinate-value">{t.coordinatesValue}</span>
                    </div>
                    <div className="map-actions">
                      <button className="map-btn" onClick={handleGetDirections}>
                        <i className="fas fa-directions"></i>
                        {t.getDirections}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enhanced Quick Booking CTA - HIDDEN
              <section className="booking-cta-section">
                <div className="cta-background"></div>
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h3>{t.ctaTitle}</h3>
                  <p>{t.ctaDescription}</p>
                  <div className="cta-features">
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      {t.ctaFeature1}
                    </span>
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      {t.ctaFeature2}
                    </span>
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      {t.ctaFeature3}
                    </span>
                  </div>
                  <button 
                    className="quick-booking-btn"
                    onClick={handleQuickBooking}
                  >
                    <i className="fas fa-calendar-check"></i>
                    {t.bookNow}
                  </button>
                </div>
              </section>
              */}
            </div>
          </div>
        </div>
      </main>

      {/* Imported Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default ReachUs;