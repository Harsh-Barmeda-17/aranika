import React, { useEffect, useState, useRef } from 'react';
import '../styles/Home.css';
import '../styles/BambooTimeline.css';
import '../styles/Newspaper.css';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLatched, setIsLatched] = useState(true);
  const [latchVisible, setLatchVisible] = useState(true);

  // Timeline refs
  const timelineItemRefs = useRef([]);

  // Newspaper state
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Gate animation useEffect
  useEffect(() => {
    // Unlatch after 0.9 seconds
    const unlatchTimer = setTimeout(() => {
      setIsLatched(false);
    }, 900);

    // Hide latch completely after rotation
    const hideLatchTimer = setTimeout(() => {
      setLatchVisible(false);
    }, 1700);

    // Open gates after unlatch animation (2 seconds total)
    const gateTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2100);

    // Show welcome text after gates are fully open
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 3500);

    return () => {
      clearTimeout(unlatchTimer);
      clearTimeout(hideLatchTimer);
      clearTimeout(gateTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Timeline animation useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // Newspaper scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      scrollRevealElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Add timeline items to ref array
  const addToTimelineItems = (el, index) => {
    if (el && !timelineItemRefs.current[index]) {
      timelineItemRefs.current[index] = el;
    }
  };

  // Timeline data
  const timelineData = [
    {
      id: 1,
      image: "./MSB.jpg",
      description: [
        "Mr Manish is known as Mansingh Baghel",
        "Came into limelight for recognition by UN World Tourism Organisation",
        "Recognised as world's top 10 potential tourism development destination"
      ],
      date: "Manish Baghel"
    },
    {
      id: 2,
      image: "./Timeline2.png",
      description: [
        "40 tribal families living with Kanker river on one side and Dhudmaras village on the other side",
        "Awarded Best Rural Tourism Village under Adventure category",
      ],
      date: "Dhudmaras Village"
    },
    {
    id: 3,
    image: "./room2.JPG",
    description: [
      "Mr Mansingh read on the internet the concept of homestay for tourist visiting their village.",
      "All the youth of the 40 families got employed in this venture and with sustainable seasonal income",
      "A new addition ares kayaking & bamboo rafting for immersive experiences. "
    ],
    date: "HOME STAY"
  },
  ];

  // Newspaper content
  const newspaperContent = [
    {
      type: "headline",
      id: 1,
      src: "./news1.jpg",
      title: "Man Singh, Who Gave Dhudmaras Its Identity, Honored with a Doctorate",
      subtitle: "A life's dedication to community and conservation earns the highest academic honor.",
      date: "September 12, 2025",
      author: "By Navbharat Reporter – Jagdalpur",
      section: "NAVBHARAT NEWS",
      layout: "headline",
      caption: "Man Singh receiving an international award for eco-tourism — honored for his international-level contribution to promoting Dhudmaras (Dhurva Dera) village."
    },
    {
      type: "feature",
      id: 2,
      src: "./news2.jpg",
      title: "By Connecting Nature with Tourism, Mani Singh Became a Pathfinder of Prosperity",
      subtitle: "Connecting Nature with Tourism, This Village Became Famous Worldwide",
      date: "April 22, 1975",
      author: "Vinod Singh – Nayi Duniya",
      section: "NAYI DUNIYA NEWS",
      layout: "feature",
      caption: "Man Singh Baghel — a young man from Dhudmaras village who set an example of self-reliance by linking nature with tourism."
    },
    {
      type: "sports",
      id: 3,
      src: "./news3.png",
      title: "CG's Dhudmaras now among UNWTO's 'Best Tourism Villages'",
      subtitle: "Gained International Recognition",
      date: "Nov 18, 2024",
      author: "Source / Publication:The Times of India (TOI)",
      section: "TIMES OF INDIA",
      layout: "sports",
      caption: "Global acclaim for Bastar's Dhudmaras as a top sustainable destination."
    },
    {
      type: "political",
      id: 4,
      src: "./news4.png",
      title: "By connecting nature with tourism, Man Singh became a pioneer of prosperity.",
      subtitle: "Became Chhattisgarhi contender for Padma award",
      date: "August 14, 2025",
      author: "Vinod Singh – Nayi Duniya",
      section: "NAYI DUNIYA NEWS",
      layout: "political",
      caption: "Proving that when nature thrives, the community prospers. A well-deserved nomination for a true changemaker."
    },
    {
      type: "science",
      id: 5,
      src: "./news5.png",
      title: "Bastar's Dhudmaras Village Featured on the UN's Global Tourism Map",
      subtitle: "United Nations World Tourism Organization (UNWTO) will aid the village's development.",
      date: "November 17, 2024",
      author: "By News Reporter from Patrika",
      section: "PATRIKA NEWS",
      layout: "science",
      caption: "Tourists kayaking through the lush green waters of Dhudmaras, Bastar."
    }
  ];

  // Newspaper modal functions
  const openImageModal = (image) => {
    setSelectedImage(image);
    setZoomLevel(1);
  };

  const closeImageModal = () => {
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
    if (e.ctrlKey) {
      e.preventDefault();
      setZoomLevel(prev => Math.max(0.5, Math.min(prev - e.deltaY * 0.01, 3)));
    }
  };

  // Newspaper article renderer
const renderArticle = (article, index) => {
  switch (article.layout) {
    case 'headline':
      return (
        <article key={article.id} className="article-headline scroll-reveal">
          <div className="section-label world-news">{article.section}</div>
          <div className="headline-content">
            <div className="headline-image" onClick={() => openImageModal(article)}>
              <div className="image-click-instruction">Click the image to see the full news</div>
              <img src={article.src} alt={article.title} className="article-image full-visible" />
              <div className="image-caption">{article.caption}</div>
            </div>
            <div className="headline-text">
              <h2 className="article-title-large">{article.title}</h2>
              <h3 className="article-subtitle">{article.subtitle}</h3>
              <div className="article-meta">
                <span className="article-date">{article.date}</span>
                <span className="article-author">{article.author}</span>
              </div>
            </div>
          </div>
        </article>
      );

    case 'feature':
      return (
        <article key={article.id} className="article-feature scroll-reveal">
          <div className="section-label local-news">{article.section}</div>
          <div className="feature-content">
            <div className="feature-image" onClick={() => openImageModal(article)}>
              <div className="image-click-instruction">Click the image to see the full news</div>
              <img src={article.src} alt={article.title} className="article-image full-visible" />
              <div className="image-caption">{article.caption}</div>
            </div>
            <div className="feature-text">
              <h2 className="article-title">{article.title}</h2>
              <h3 className="article-subtitle">{article.subtitle}</h3>
              <div className="article-meta">
                <span className="article-date">{article.date}</span>
                <span className="article-author">{article.author}</span>
              </div>
            </div>
          </div>
        </article>
      );

    case 'sports':
      return (
        <article key={article.id} className="article-sports scroll-reveal">
          <div className="section-label sports">{article.section}</div>
          <div className="sports-content">
            <div className="sports-header">
              <h2 className="article-title-sports">{article.title}</h2>
              <h3 className="article-subtitle">{article.subtitle}</h3>
            </div>
            <div className="sports-body">
              <div className="sports-image" onClick={() => openImageModal(article)}>
                <div className="image-click-instruction">Click the image to see the full news</div>
                <img src={article.src} alt={article.title} className="article-image full-visible" />
                <div className="image-caption">{article.caption}</div>
              </div>
              <div className="sports-meta">
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-author">{article.author}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      );

    case 'political':
      return (
        <article key={article.id} className="article-political scroll-reveal">
          <div className="section-label politics">{article.section}</div>
          <div className="political-content">
            <div className="political-image" onClick={() => openImageModal(article)}>
              <div className="image-click-instruction">Click the image to see the full news</div>
              <img src={article.src} alt={article.title} className="article-image full-visible" />
              <div className="image-caption">{article.caption}</div>
            </div>
            <div className="political-text">
              <h2 className="article-title">{article.title}</h2>
              <h3 className="article-subtitle">{article.subtitle}</h3>
              <div className="article-meta">
                <span className="article-date">{article.date}</span>
                <span className="article-author">{article.author}</span>
              </div>
            </div>
          </div>
        </article>
      );

    case 'science':
      return (
        <article key={article.id} className="article-science scroll-reveal">
          <div className="section-label science">{article.section}</div>
          <div className="science-content">
            <div className="science-text">
              <h2 className="article-title">{article.title}</h2>
              <h3 className="article-subtitle">{article.subtitle}</h3>
              <div className="article-meta">
                <span className="article-date">{article.date}</span>
                <span className="article-author">{article.author}</span>
              </div>
            </div>
            <div className="science-image" onClick={() => openImageModal(article)}>
              <div className="image-click-instruction">Click the image to see the full news</div>
              <img src={article.src} alt={article.title} className="article-image full-visible" />
              <div className="image-caption">{article.caption}</div>
            </div>
          </div>
        </article>
      );

    default:
      return null;
  }
};

  return (
    <div className="main-content">
      {/* Gate Section */}
      <div className="gate-container">
        {/* Background with sky and ground */}
        <div className="background">
          <div className="sky"></div>
          <div className="ground"></div>
        </div>

        {/* Bamboo Sides with direct img tags */}
        <div className="bamboo-side left-bamboo">
          <img 
            src="/bamboostick.png" 
            alt="Left Bamboo" 
            className="bamboo-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        
        <div className="bamboo-side right-bamboo">
          <img 
            src="/bamboostickR.png" 
            alt="Right Bamboo" 
            className="bamboo-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>

        {/* Main Structure */}
        <div className="gate-structure">
          {/* Wooden Poles - Now part of the gate structure */}
          <div className="wooden-pole left-pole">
            <div className="pole-texture"></div>
            <div className="gate-attachment left-attachment"></div>
          </div>
          <div className="wooden-pole right-pole">
            <div className="pole-texture"></div>
            <div className="gate-attachment right-attachment"></div>
          </div>

          {/* Gate Wrapper */}
          <div className="gate-wrapper">
            {/* Left Gate */}
            <div className={`gate left-gate ${isOpen ? 'open' : ''}`}>
              <div className="gate-texture">
                <div className="wood-grain"></div>
                <div className="gate-panels">
                  <div className="panel"></div>
                  <div className="panel"></div>
                </div>
                <div className="gate-bars">
                  <div className="horizontal-bar top-bar"></div>
                  <div className="horizontal-bar middle-bar"></div>
                  <div className="horizontal-bar bottom-bar"></div>
                  <div className="vertical-bar"></div>
                </div>
              </div>
              <div className="hinge top-hinge"></div>
              <div className="hinge middle-hinge"></div>
              <div className="hinge bottom-hinge"></div>
            </div>
            
            {/* Right Gate */}
            <div className={`gate right-gate ${isOpen ? 'open' : ''}`}>
              <div className="gate-texture">
                <div className="wood-grain"></div>
                <div className="gate-panels">
                  <div className="panel"></div>
                  <div className="panel"></div>
                </div>
                <div className="gate-bars">
                  <div className="horizontal-bar top-bar"></div>
                  <div className="horizontal-bar middle-bar"></div>
                  <div className="horizontal-bar bottom-bar"></div>
                  <div className="vertical-bar"></div>
                </div>
              </div>
              <div className="hinge top-hinge"></div>
              <div className="hinge middle-hinge"></div>
              <div className="hinge bottom-hinge"></div>
            </div>

            {/* Center Latch System - Only show when visible */}
            {latchVisible && (
              <div className="gate-latch-container">
                {/* Latch base split between both doors */}
                <div className={`latch-base latch-base-left ${isLatched ? '' : 'unlatched'}`}></div>
                <div className={`latch-base latch-base-right ${isLatched ? '' : 'unlatched'}`}></div>
                
                {/* Socket on right door */}
                <div className="latch-socket"></div>
                
                {/* Latch mechanism attached to left door */}
                <div className={`latch-mechanism ${isLatched ? 'latched' : 'unlatched'}`}></div>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Text */}
        {showWelcome && (
          <div className="welcome-container">
            <div className="welcome-text">
              <span className="text-line line-1">WELCOME TO</span>
              {/* Replaced "PEACEFUL HAVEN" with the sign board */}
              <div className="sign-board welcome-sign">
                <div className="sign-content">
                  <img 
                    src="/woodH.png" 
                    alt="Wooden Sign" 
                    className="sign-image"
                  />
                  <div className="sign-text-overlay">
                    <span className="sign-title">DHURWA DERA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bamboo Timeline Section */}
      <section className="bamboo-timeline-section">
        <h2 className="timeline-heading">Dhurwa Dera: A Success Story</h2>
        <div className="timeline-container">
          {/* Enhanced Realistic Bamboo Center Line */}
          <div className="bamboo-center-line">
            <div className="bamboo-top-cut">
              <div className="bamboo-inner-tube"></div>
              <div className="cut-line"></div>
            </div>
            <div className="bamboo-node"></div>
            <div className="bamboo-node"></div>
            <div className="bamboo-node"></div>
            <div className="bamboo-node"></div>
            <div className="bamboo-wood-grain"></div>
            <div className="bamboo-shine"></div>
            <div className="bamboo-texture-overlay"></div>
          </div>
          
          <div className="timeline-content">
            {timelineData.map((item, index) => (
              <div 
                key={item.id} 
                ref={el => addToTimelineItems(el, index)}
                className="timeline-item"
              >
                {/* Image on LEFT side */}
                <div className="timeline-image-card left-side">
                  <div className="image-container">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="timeline-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="connector-line left-connector"></div>
                </div>

                {/* Content on RIGHT side */}
                <div className="timeline-content-card right-side">
                  <div className="content-container">
                    <div className="date-badge">{item.date}</div>
                    <h3 className="item-title">{item.title}</h3>
                    <div className="bamboo-points-container">
                      {Array.isArray(item.description) ? (
                        item.description.map((point, pointIndex) => (
                          <div key={pointIndex} className="bamboo-point">
                            <div className="bamboo-leaf-icon"></div>
                            <span className="bamboo-point-text">{point}</span>
                          </div>
                        ))
                      ) : (
                        <p className="item-description">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="connector-line right-connector"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newspaper Section */}
      <section className="newspaper-section">
        <div className="newspaper-container">
          {/* Newspaper Header */}
          <header className="newspaper-header">
            <div className="newspaper-masthead">
              <h1 className="newspaper-title">The Dhurwa Dera Voice</h1>
              <div className="newspaper-info">
                <span className="edition">Morning Edition</span>
                <span className="date">January XX, 2025</span>
                <span className="price">PRICE 50¢</span>
              </div>
            </div>
            <div className="header-divider"></div>
          </header>

          {/* Main Content */}
          <div className="newspaper-content">
            {/* Lead Story */}
            <div className="lead-story">
              <h2 className="main-headline">DHURWA DERA'S JOURNEY OF EXCELLENCE</h2>
              <p className="lead-subtitle">Celebrating Our Community's Achievements</p>
            </div>

            {/* Articles Grid */}
            <div className="articles-grid">
              {newspaperContent.map((article, index) => renderArticle(article, index))}
            </div>

            {/* Newspaper Footer */}
            <footer className="newspaper-footer">
              <div className="footer-divider"></div>
              <div className="footer-content">
                <span className="continued">CONTINUED ON PAGE A12</span>
                <span className="page-number">PAGE A1</span>
                <span className="copyright">© 2023 The Dhurwa Dera Voice. ALL RIGHTS RESERVED.</span>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Image Modal for Zoom */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImageModal}>×</button>
            <div className="zoom-controls">
              <button onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>−</button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn} disabled={zoomLevel >= 3}>+</button>
            </div>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="zoomed-image"
              style={{ transform: `scale(${zoomLevel})` }}
              onWheel={handleWheel}
            />
            <div className="modal-caption">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.date} - {selectedImage.section}</p>
            </div>
          </div>
        </div>
      )}
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Home;