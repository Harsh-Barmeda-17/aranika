import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import '../styles/ReachUs.css';

const ReachUs = ({ onNavigate }) => {
  const handleQuickBooking = () => {
    if (onNavigate) {
      onNavigate('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetDirections = () => {
    // Open Google Maps with Dhurwa Dera location
    const latitude = 18.8759292;
    const longitude = 81.9123589;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="reachus-page">
      <Header />
      
      <main className="reachus-main">
        <div className="reachus-container">
          <div className="reachus-card">
            <div className="card-header">
              <h2>Reach Us</h2>
              <p className="subtitle">Find Your Way to Dhurwa Dera - Your Peaceful Retreat</p>
            </div>
            
            <div className="reachus-content">
              {/* Homestay Information */}
              <section className="info-section">
                <div className="section-header">
                  <h3>Dhurwa Dera Homestay</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="info-content">
                      <h4>Address</h4>
                      <p>
                        Dhurwa Dera, Dhudmaras Village<br />
                        Near Kanker River, Bastar District<br />
                        Chhattisgarh, India<br />
                        Pin Code: 494223
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-compass"></i>
                    </div>
                    <div className="info-content">
                      <h4>Location Highlights</h4>
                      <p>
                        • Nestled by the Kanker River<br />
                        • Surrounded by lush forests<br />
                        • Peaceful and serene environment<br />
                        • Perfect for nature lovers
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="info-section">
                <div className="section-header">
                  <h3>Contact Information</h3>
                </div>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info-content">
                      <h4>Phone & WhatsApp</h4>
                      <p className="contact-number">+91 98765 43210</p>
                      <p className="contact-note">
                        <i className="fab fa-whatsapp"></i>
                        Available on WhatsApp for quick responses
                      </p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-content">
                      <h4>Email</h4>
                      <p className="contact-email">info@dhurwadera.com</p>
                      <p className="contact-note">
                        For inquiries and reservations
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Operating Hours */}
              <section className="info-section">
                <div className="section-header">
                  <h3>Operating Hours</h3>
                </div>
                <div className="operating-hours">
                  <div className="hours-card">
                    <div className="hours-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="hours-content">
                      <h4>Daily Timings</h4>
                      <div className="hours-schedule">
                        <div className="time-slot">
                          <span className="time-label">Open:</span>
                          <span className="time-value">8:00 AM</span>
                        </div>
                        <div className="time-slot">
                          <span className="time-label">Close:</span>
                          <span className="time-value">8:00 PM</span>
                        </div>
                      </div>
                      <p className="hours-note">
                        Check-in and check-out available within these hours
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Google Map Section */}
              <section className="info-section">
                <div className="section-header">
                  <h3>Find Us on Map</h3>
                </div>
                <div className="map-container">
                  <div className="map-placeholder">
                    <div className="map-icon">
                      <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <h4>Dhurwa Dera Location</h4>
                    <p>Dhudmaras Village, Bastar, Chhattisgarh</p>
                    <div className="coordinates">
                      <span className="coordinate-label">Coordinates:</span>
                      <span className="coordinate-value">18.8759292, 81.9123589</span>
                    </div>
                    <div className="map-actions">
                      <button className="map-btn" onClick={handleGetDirections}>
                        <i className="fas fa-directions"></i>
                        Get Directions on Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enhanced Quick Booking CTA */}
              <section className="booking-cta-section">
                <div className="cta-background"></div>
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h3>Ready to Experience Dhurwa Dera?</h3>
                  <p>Book your stay now and immerse yourself in nature's embrace at our award-winning eco-retreat</p>
                  <div className="cta-features">
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      UNWTO Award Winner
                    </span>
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      Best Rural Tourism Village
                    </span>
                    <span className="feature">
                      <i className="fas fa-check"></i>
                      Sustainable Eco-Tourism
                    </span>
                  </div>
                  <button 
                    className="quick-booking-btn"
                    onClick={handleQuickBooking}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Book Your Peaceful Getaway
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Imported Back to Top Button */}
      <BackToTop />
      <Footer />
    </div>
  );
};

export default ReachUs;