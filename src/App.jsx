import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import BookingPage from './components/BookingPage';
import BookingConfirmation from './components/BookingConfirmation';
import Navbar from './components/Navbar';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ReachUs from './components/ReachUs';
import Tariff from './components/TariffPage';
import Services from './components/ServicesPage';
import './App.css';

// Create Language Context
export const LanguageContext = createContext();

function App() {
  const [bookingData, setBookingData] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('english');
  const ballRef = useRef(null);
  const trailRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const handleBookingSubmit = (data) => {
    setBookingData(data);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewBooking = () => {
    setBookingData(null);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRooms = () => {
    setCurrentPage('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBooking = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle navigation from navbar
  const handleNavbarNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle language change from navbar
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Floating ball animation effect - ONLY for gallery page
  useEffect(() => {
    if (currentPage !== 'gallery') {
      if (trailRef.current) {
        trailRef.current.innerHTML = '';
      }
      return;
    }

    const ball = ballRef.current;
    const trailContainer = trailRef.current;
    let animationFrameId;

    const updateBallPosition = () => {
      if (!ball) return;
      
      const rect = ball.getBoundingClientRect();
      positionRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    };

    const createTrail = () => {
      if (!trailContainer) return;

      const trailDot = document.createElement('div');
      trailDot.className = 'trail-dot';
      
      trailDot.style.left = `${positionRef.current.x}px`;
      trailDot.style.top = `${positionRef.current.y}px`;
      
      trailContainer.appendChild(trailDot);

      setTimeout(() => {
        if (trailDot.parentNode === trailContainer) {
          trailContainer.removeChild(trailDot);
        }
      }, 600);
    };

    const updateTrail = () => {
      updateBallPosition();
      createTrail();
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    updateTrail();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (trailRef.current) {
        trailRef.current.innerHTML = '';
      }
    };
  }, [currentPage]);

  // Language context value
  const languageContextValue = {
    language,
    setLanguage: handleLanguageChange
  };

  // Render current page component
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'rooms':
        return <Rooms onBookNow={navigateToBooking} />;
      case 'booking':
        return <BookingPage onSubmit={handleBookingSubmit} />;
      case 'confirmation':
        return (
          <BookingConfirmation 
            bookingData={bookingData} 
            onNewBooking={handleNewBooking}
          />
        );
      case 'gallery':
        return <Gallery />;
      case 'signup':
        return <SignUp onNavigate={handleNavbarNavigation} />;
      case 'login':
        return <Login onNavigate={handleNavbarNavigation} />;
      case 'forgotpassword':
        return <ForgotPassword onNavigate={handleNavbarNavigation} />;
      case 'contact':
        return <ReachUs onNavigate={handleNavbarNavigation} />;
      case 'tariff':
        return <Tariff onNavigate={handleNavbarNavigation} />;
      case 'services':
        return <Services onNavigate={handleNavbarNavigation} />;
      default:
        return <Home />;
    }
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="App">
        {/* Floating ball and trail effects - only show on gallery page */}
        {currentPage === 'gallery' && (
          <>
            <div className="floating-ball" ref={ballRef}></div>
            <div className="trail" ref={trailRef}></div>
          </>
        )}
        
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavbarNavigation}
          onLanguageChange={handleLanguageChange}
        />
        {renderCurrentPage()}
      </div>
    </LanguageContext.Provider>
  );
}

export default App;