import React, { useEffect, useState, useRef, useContext } from 'react';
import '../styles/Home.css';
import '../styles/BambooTimeline.css';
import '../styles/Newspaper.css';
import BackToTop from './BackToTop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageContext } from '../App';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLatched, setIsLatched] = useState(true);
  const [latchVisible, setLatchVisible] = useState(true);

  // Timeline refs
  const timelineItemRefs = useRef([]);

  // Newspaper state
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Language translations
  const translations = {
    english: {
      timelineHeading: "Dhurwa Dera: A Success Story",
      welcomeTo: "WELCOME TO",
      dhurwaDera: "DHURWA DERA",
      newspaperTitle: "The Dhurwa Dera Voice",
      newspaperSubtitle: "DHURWA DERA'S JOURNEY OF EXCELLENCE",
      newspaperSubhead: "Celebrating Our Community's Achievements",
      newspaperEdition: "Morning Edition",
      newspaperDate: "January XX, 2025",
      newspaperPrice: "PRICE 50¢",
      continued: "CONTINUED ON PAGE A12",
      pageNumber: "PAGE A1",
      copyright: "© 2023 The Dhurwa Dera Voice. ALL RIGHTS RESERVED.",
      clickToEnlarge: "Click image to enlarge",
      close: "×",
      zoomIn: "+",
      zoomOut: "−",
      
      // Timeline data
      timelineItems: [
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
            "A new addition ares kayaking & bamboo rafting for immersive experiences."
          ],
          date: "HOME STAY"
        },
      ],

      // Newspaper content
      newspaperContent: [
        {
          type: "headline",
          id: 1,
          src: "./news1.jpg",
          title: "Man Singh, Who Gave Dhudmaras Its Identity, Honored with a Doctorate",
          subtitle: "A life's dedication to community and conservation earns the highest academic honor.",
          date: "September 12, 2025",
          author: "By Navbharat Reporter – Jagdalpur",
          section: "NAVBHARAT NEWS",
          layout: "primary",
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
          layout: "featured",
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
          layout: "tech",
          caption: "Tourists kayaking through the lush green waters of Dhudmaras, Bastar."
        }
      ]
    },
    hindi: {
      timelineHeading: "धुरवा डेरा: एक सफलता की कहानी",
      welcomeTo: "आपका स्वागत है",
      dhurwaDera: "धुरवा डेरा में",
      newspaperTitle: "धुरवा डेरा की आवाज़",
      newspaperSubtitle: "धुरवा डेरा की उत्कृष्टता की यात्रा",
      newspaperSubhead: "हमारे समुदाय की उपलब्धियों का उत्सव",
      newspaperEdition: "सुबह का संस्करण",
      newspaperDate: "जनवरी XX, 2025",
      newspaperPrice: "मूल्य 50¢",
      continued: "पृष्ठ A12 पर जारी",
      pageNumber: "पृष्ठ A1",
      copyright: "© 2023 धुरवा डेरा की आवाज़। सर्वाधिकार सुरक्षित।",
      clickToEnlarge: "बड़ा करने के लिए छवि पर क्लिक करें",
      close: "×",
      zoomIn: "+",
      zoomOut: "−",
      
      // Timeline data in Hindi
      timelineItems: [
        {
          id: 1,
          image: "./MSB.jpg",
          description: [
            "श्री मनीष को मानसिंह बघेल के नाम से जाना जाता है",
            "यूएन वर्ल्ड टूरिज्म ऑर्गनाइजेशन द्वारा मान्यता के लिए सुर्खियों में आए",
            "विश्व के शीर्ष 10 संभावित पर्यटन विकास स्थल के रूप में मान्यता प्राप्त"
          ],
          date: "मनीष बघेल"
        },
        {
          id: 2,
          image: "./Timeline2.png",
          description: [
            "40 आदिवासी परिवार एक तरफ कांकेर नदी और दूसरी तरफ ढूंढमरास गांव के साथ रहते हैं",
            "साहसिक श्रेणी में सर्वश्रेष्ठ ग्रामीण पर्यटन गांव का पुरस्कार प्राप्त",
          ],
          date: "ढूंढमरास गांव"
        },
        {
          id: 3,
          image: "./room2.JPG",
          description: [
            "श्री मानसिंह ने इंटरनेट पर अपने गांव आने वाले पर्यटकों के लिए होम स्टे की अवधारणा पढ़ी।",
            "40 परिवारों के सभी युवाओं को इस उद्यम में रोजगार मिला और स्थायी मौसमी आय प्राप्त हुई",
            "इमर्सिव अनुभवों के लिए केयाकिंग और बांस की नौका विहार एक नया जोड़ है"
          ],
          date: "होम स्टे"
        },
      ],

      // Newspaper content in Hindi
      newspaperContent: [
        {
          type: "headline",
          id: 1,
          src: "./news1.jpg",
          title: "मान सिंह, जिन्होंने ढूंढमरास को पहचान दी, डॉक्टरेट से सम्मानित",
          subtitle: "समुदाय और संरक्षण के प्रति जीवन भर की समर्पण ने उच्चतम शैक्षणिक सम्मान अर्जित किया।",
          date: "12 सितंबर, 2025",
          author: "नवभारत रिपोर्टर – जगदलपुर",
          section: "नवभारत समाचार",
          layout: "primary",
          caption: "मान सिंह को इको-टूरिज्म के लिए अंतरराष्ट्रीय पुरस्कार मिल रहा है — ढूंढमरास (धुरवा डेरा) गांव को बढ़ावा देने में अंतरराष्ट्रीय स्तर के योगदान के लिए सम्मानित।"
        },
        {
          type: "feature",
          id: 2,
          src: "./news2.jpg",
          title: "प्रकृति को पर्यटन से जोड़कर, मनी सिंह समृद्धि के पथप्रदर्शक बने",
          subtitle: "प्रकृति को पर्यटन से जोड़कर यह गांव विश्वविख्यात हुआ",
          date: "22 अप्रैल, 1975",
          author: "विनोद सिंह – नई दुनिया",
          section: "नई दुनिया समाचार",
          layout: "featured",
          caption: "मान सिंह बघेल — ढूंढमरास गांव के एक युवक जिन्होंने प्रकृति को पर्यटन से जोड़कर आत्मनिर्भरता का उदाहरण प्रस्तुत किया।"
        },
        {
          type: "sports",
          id: 3,
          src: "./news3.png",
          title: "CG का ढूंढमरास अब UNWTO के 'बेस्ट टूरिज्म विलेजेस' में शामिल",
          subtitle: "अंतरराष्ट्रीय मान्यता प्राप्त",
          date: "18 नवंबर, 2024",
          author: "स्रोत / प्रकाशन: द टाइम्स ऑफ इंडिया (TOI)",
          section: "टाइम्स ऑफ इंडिया",
          layout: "sports",
          caption: "बस्तर के ढूंढमरास को शीर्ष स्थायी पर्यटन स्थल के रूप में वैश्विक प्रशंसा।"
        },
        {
          type: "political",
          id: 4,
          src: "./news4.png",
          title: "प्रकृति को पर्यटन से जोड़कर, मान सिंह समृद्धि के अग्रदूत बने।",
          subtitle: "पद्म पुरस्कार के लिए छत्तीसगढ़ी प्रतियोगी बने",
          date: "14 अगस्त, 2025",
          author: "विनोद सिंह – नई दुनिया",
          section: "नई दुनिया समाचार",
          layout: "political",
          caption: "यह साबित करते हुए कि जब प्रकृति फलती-फूलती है, तो समुदाय समृद्ध होता है। एक सच्चे परिवर्तनकर्ता के लिए योग्य नामांकन।"
        },
        {
          type: "science",
          id: 5,
          src: "./news5.png",
          title: "बस्तर का ढूंढमरास गांव UN के वैश्विक पर्यटन मानचित्र पर दिखाई दिया",
          subtitle: "संयुक्त राष्ट्र विश्व पर्यटन संगठन (UNWTO) गांव के विकास में सहायता करेगा।",
          date: "17 नवंबर, 2024",
          author: "पत्रिका से समाचार रिपोर्टर",
          section: "पत्रिका समाचार",
          layout: "tech",
          caption: "बस्तर के ढूंढमरास की हरी-भरी जलधाराओं में पर्यटक कयाकिंग करते हुए।"
        }
      ]
    }
  };

  const t = translations[language];

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

  // Newspaper article renderer with updated classnames
  const renderArticle = (article, index) => {
    switch (article.layout) {
      case 'primary':
        return (
          <article key={article.id} className="primary-article scroll-reveal" id={`primary-story-${article.id}`}>
            <span className="topic-badge topic-global" id={`section-badge-${article.id}`}>{article.section}</span>
            <div className="primary-layout" id={`layout-${article.id}`}>
              <div className="primary-textblock" id={`text-block-${article.id}`}>
                <h2 className="heading-xl" id={`title-${article.id}`}>{article.title}</h2>
                <h3 className="article-summary" id={`summary-${article.id}`}>{article.subtitle}</h3>
                <div className="article-details" id={`meta-${article.id}`}>
                  <span className="article-date" id={`date-${article.id}`}>{article.date}</span>
                  <span className="article-author" id={`author-${article.id}`}>{article.author}</span>
                </div>
              </div>
              <div className="story-image-container" id={`image-container-${article.id}`}>
                <div className="image-tip" id={`tip-${article.id}`}>{t.clickToEnlarge}</div>
                <img 
                  src={article.src} 
                  alt={article.title} 
                  className="story-image" 
                  id={`image-${article.id}`}
                  onClick={() => openImageModal(article)}
                />
                <div className="image-description" id={`caption-${article.id}`}>{article.caption}</div>
              </div>
            </div>
          </article>
        );

      case 'featured':
        return (
          <article key={article.id} className="featured-story scroll-reveal" id={`feature-story-${article.id}`}>
            <span className="topic-badge topic-regional" id={`section-feature-${article.id}`}>{article.section}</span>
            <div className="featured-layout" id={`feature-layout-${article.id}`}>
              <div className="story-image-container" id={`feature-image-container-${article.id}`}>
                <div className="image-tip" id={`feature-tip-${article.id}`}>{t.clickToEnlarge}</div>
                <img 
                  src={article.src} 
                  alt={article.title} 
                  className="story-image" 
                  id={`feature-image-${article.id}`}
                  onClick={() => openImageModal(article)}
                />
                <div className="image-description" id={`feature-caption-${article.id}`}>{article.caption}</div>
              </div>
              <div className="featured-textblock" id={`feature-text-${article.id}`}>
                <h2 className="story-heading" id={`feature-title-${article.id}`}>{article.title}</h2>
                <h3 className="article-summary" id={`feature-summary-${article.id}`}>{article.subtitle}</h3>
                <div className="article-details" id={`feature-meta-${article.id}`}>
                  <span className="article-date" id={`feature-date-${article.id}`}>{article.date}</span>
                  <span className="article-author" id={`feature-author-${article.id}`}>{article.author}</span>
                </div>
              </div>
            </div>
          </article>
        );

      case 'sports':
        return (
          <article key={article.id} className="sports-story scroll-reveal" id={`sports-story-${article.id}`}>
            <div className="sports-layout" id={`sports-layout-${article.id}`}>
              <div className="sports-headerblock" id={`sports-header-${article.id}`}>
                <span className="topic-badge topic-athletics" id={`sports-badge-${article.id}`}>{article.section}</span>
                <h2 className="heading-sports" id={`sports-title-${article.id}`}>{article.title}</h2>
                <h3 className="article-summary" id={`sports-subtitle-${article.id}`}>{article.subtitle}</h3>
              </div>
              <div className="sports-body" id={`sports-content-${article.id}`}>
                <div className="story-image-container" id={`sports-image-container-${article.id}`}>
                  <div className="image-tip" id={`sports-tip-${article.id}`}>{t.clickToEnlarge}</div>
                  <img 
                    src={article.src} 
                    alt={article.title} 
                    className="story-image" 
                    id={`sports-image-${article.id}`}
                    onClick={() => openImageModal(article)}
                  />
                  <div className="image-description" id={`sports-caption-${article.id}`}>{article.caption}</div>
                </div>
                <div className="sports-meta-info" id={`sports-details-${article.id}`}>
                  <div className="article-details" id={`sports-meta-${article.id}`}>
                    <span className="article-date" id={`sports-date-${article.id}`}>{article.date}</span>
                    <span className="article-author" id={`sports-author-${article.id}`}>{article.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );

      case 'political':
        return (
          <article key={article.id} className="political-story scroll-reveal" id={`political-story-${article.id}`}>
            <span className="topic-badge topic-governance" id={`political-badge-${article.id}`}>{article.section}</span>
            <div className="political-layout" id={`political-layout-${article.id}`}>
              <div className="political-textblock" id={`political-text-${article.id}`}>
                <h2 className="story-heading" id={`political-title-${article.id}`}>{article.title}</h2>
                <h3 className="article-summary" id={`political-summary-${article.id}`}>{article.subtitle}</h3>
                <div className="article-details" id={`political-meta-${article.id}`}>
                  <span className="article-date" id={`political-date-${article.id}`}>{article.date}</span>
                  <span className="article-author" id={`political-author-${article.id}`}>{article.author}</span>
                </div>
              </div>
              <div className="story-image-container" id={`political-image-container-${article.id}`}>
                <div className="image-tip" id={`political-tip-${article.id}`}>{t.clickToEnlarge}</div>
                <img 
                  src={article.src} 
                  alt={article.title} 
                  className="story-image" 
                  id={`political-image-${article.id}`}
                  onClick={() => openImageModal(article)}
                />
                <div className="image-description" id={`political-caption-${article.id}`}>{article.caption}</div>
              </div>
            </div>
          </article>
        );

      case 'tech':
        return (
          <article key={article.id} className="tech-story scroll-reveal" id={`tech-story-${article.id}`}>
            <span className="topic-badge topic-technology" id={`tech-badge-${article.id}`}>{article.section}</span>
            <div className="tech-layout" id={`tech-layout-${article.id}`}>
              <div className="tech-textblock" id={`tech-text-${article.id}`}>
                <h2 className="story-heading" id={`tech-title-${article.id}`}>{article.title}</h2>
                <h3 className="article-summary" id={`tech-summary-${article.id}`}>{article.subtitle}</h3>
                <div className="article-details" id={`tech-meta-${article.id}`}>
                  <span className="article-date" id={`tech-date-${article.id}`}>{article.date}</span>
                  <span className="article-author" id={`tech-author-${article.id}`}>{article.author}</span>
                </div>
              </div>
              <div className="story-image-container" id={`tech-image-container-${article.id}`}>
                <div className="image-tip" id={`tech-tip-${article.id}`}>{t.clickToEnlarge}</div>
                <img 
                  src={article.src} 
                  alt={article.title} 
                  className="story-image" 
                  id={`tech-image-${article.id}`}
                  onClick={() => openImageModal(article)}
                />
                <div className="image-description" id={`tech-caption-${article.id}`}>{article.caption}</div>
              </div>
            </div>
          </article>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-content" id="home-main-content">
      {/* Gate Section */}
      <div className="gate-container" id="gate-section">
        {/* Background with sky and ground */}
        <div className="background" id="gate-background">
          <div className="sky" id="gate-sky"></div>
          <div className="ground" id="gate-ground"></div>
        </div>

        {/* Bamboo Sides with direct img tags */}
        <div className="bamboo-side left-bamboo" id="left-bamboo-side">
          <img 
            src="/bamboostick.png" 
            alt="Left Bamboo" 
            className="bamboo-image"
            id="left-bamboo-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        
        <div className="bamboo-side right-bamboo" id="right-bamboo-side">
          <img 
            src="/bamboostickR.png" 
            alt="Right Bamboo" 
            className="bamboo-image"
            id="right-bamboo-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>

        {/* Main Structure */}
        <div className="gate-structure" id="main-gate-structure">
          {/* Wooden Poles - Now part of the gate structure */}
          <div className="wooden-pole left-pole" id="left-gate-pole">
            <div className="pole-texture" id="left-pole-texture"></div>
            <div className="gate-attachment left-attachment" id="left-attachment"></div>
          </div>
          <div className="wooden-pole right-pole" id="right-gate-pole">
            <div className="pole-texture" id="right-pole-texture"></div>
            <div className="gate-attachment right-attachment" id="right-attachment"></div>
          </div>

          {/* Gate Wrapper */}
          <div className="gate-wrapper" id="gate-wrapper-container">
            {/* Left Gate */}
            <div className={`gate left-gate ${isOpen ? 'open' : ''}`} id="left-gate-door">
              <div className="gate-texture" id="left-gate-texture">
                <div className="wood-grain" id="left-wood-grain"></div>
                <div className="gate-panels" id="left-gate-panels">
                  <div className="panel" id="left-panel-1"></div>
                  <div className="panel" id="left-panel-2"></div>
                </div>
                <div className="gate-bars" id="left-gate-bars">
                  <div className="horizontal-bar top-bar" id="left-top-bar"></div>
                  <div className="horizontal-bar middle-bar" id="left-middle-bar"></div>
                  <div className="horizontal-bar bottom-bar" id="left-bottom-bar"></div>
                  <div className="vertical-bar" id="left-vertical-bar"></div>
                </div>
              </div>
              <div className="hinge top-hinge" id="left-top-hinge"></div>
              <div className="hinge middle-hinge" id="left-middle-hinge"></div>
              <div className="hinge bottom-hinge" id="left-bottom-hinge"></div>
            </div>
            
            {/* Right Gate */}
            <div className={`gate right-gate ${isOpen ? 'open' : ''}`} id="right-gate-door">
              <div className="gate-texture" id="right-gate-texture">
                <div className="wood-grain" id="right-wood-grain"></div>
                <div className="gate-panels" id="right-gate-panels">
                  <div className="panel" id="right-panel-1"></div>
                  <div className="panel" id="right-panel-2"></div>
                </div>
                <div className="gate-bars" id="right-gate-bars">
                  <div className="horizontal-bar top-bar" id="right-top-bar"></div>
                  <div className="horizontal-bar middle-bar" id="right-middle-bar"></div>
                  <div className="horizontal-bar bottom-bar" id="right-bottom-bar"></div>
                  <div className="vertical-bar" id="right-vertical-bar"></div>
                </div>
              </div>
              <div className="hinge top-hinge" id="right-top-hinge"></div>
              <div className="hinge middle-hinge" id="right-middle-hinge"></div>
              <div className="hinge bottom-hinge" id="right-bottom-hinge"></div>
            </div>

            {/* Center Latch System - Only show when visible */}
            {latchVisible && (
              <div className="gate-latch-container" id="gate-latch-system">
                {/* Latch base split between both doors */}
                <div className={`latch-base latch-base-left ${isLatched ? '' : 'unlatched'}`} id="left-latch-base"></div>
                <div className={`latch-base latch-base-right ${isLatched ? '' : 'unlatched'}`} id="right-latch-base"></div>
                
                {/* Socket on right door */}
                <div className="latch-socket" id="latch-socket-hole"></div>
                
                {/* Latch mechanism attached to left door */}
                <div className={`latch-mechanism ${isLatched ? 'latched' : 'unlatched'}`} id="latch-mechanism-handle"></div>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Text */}
        {showWelcome && (
          <div className="welcome-container" id="welcome-message-container">
            <div className="welcome-text" id="welcome-text-content">
              <span className="text-line line-1" id="welcome-line-1">{t.welcomeTo}</span>
              {/* Replaced "PEACEFUL HAVEN" with the sign board */}
              <div className="sign-board welcome-sign" id="dhurwa-dera-sign">
                <div className="sign-content" id="sign-content-wrapper">
                  <img 
                    src="/woodH.png" 
                    alt="Wooden Sign" 
                    className="sign-image"
                    id="wooden-sign-image"
                  />
                  <div className="sign-text-overlay" id="sign-text-layer">
                    <span className="sign-title" id="dhurwa-dera-title">{t.dhurwaDera}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bamboo Timeline Section */}
      <section className="bamboo-timeline-section" id="timeline-section">
        <h2 className="timeline-heading" id="timeline-main-heading">{t.timelineHeading}</h2>
        <div className="timeline-container" id="timeline-main-container">
          {/* Enhanced Realistic Bamboo Center Line */}
          <div className="bamboo-center-line" id="center-bamboo-line">
            <div className="bamboo-top-cut" id="bamboo-top-cut">
              <div className="bamboo-inner-tube" id="bamboo-inner-tube"></div>
              <div className="cut-line" id="bamboo-cut-line"></div>
            </div>
            <div className="bamboo-node" id="bamboo-node-1"></div>
            <div className="bamboo-node" id="bamboo-node-2"></div>
            <div className="bamboo-node" id="bamboo-node-3"></div>
            <div className="bamboo-node" id="bamboo-node-4"></div>
            <div className="bamboo-wood-grain" id="bamboo-wood-grain"></div>
            <div className="bamboo-shine" id="bamboo-shine-effect"></div>
            <div className="bamboo-texture-overlay" id="bamboo-texture-layer"></div>
          </div>
          
          <div className="timeline-content" id="timeline-content-area">
            {t.timelineItems.map((item, index) => (
              <div 
                key={item.id} 
                ref={el => addToTimelineItems(el, index)}
                className="timeline-item"
                id={`timeline-item-${item.id}`}
              >
                {/* Image on LEFT side */}
                <div className="timeline-image-card left-side" id={`timeline-image-${item.id}`}>
                  <div className="image-container" id={`image-container-tl-${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.date}
                      className="timeline-image"
                      id={`timeline-img-${item.id}`}
                    />
                    <div className="image-overlay" id={`image-overlay-${item.id}`}></div>
                  </div>
                  <div className="connector-line left-connector" id={`left-connector-${item.id}`}></div>
                </div>

                {/* Content on RIGHT side */}
                <div className="timeline-content-card right-side" id={`timeline-content-${item.id}`}>
                  <div className="content-container" id={`content-wrapper-${item.id}`}>
                    <div className="date-badge" id={`date-badge-${item.id}`}>{item.date}</div>
                    <h3 className="item-title" id={`item-title-${item.id}`}>{item.date}</h3>
                    <div className="bamboo-points-container" id={`points-container-${item.id}`}>
                      {Array.isArray(item.description) ? (
                        item.description.map((point, pointIndex) => (
                          <div key={pointIndex} className="bamboo-point" id={`point-${item.id}-${pointIndex}`}>
                            <div className="bamboo-leaf-icon" id={`leaf-icon-${item.id}-${pointIndex}`}></div>
                            <span className="bamboo-point-text" id={`point-text-${item.id}-${pointIndex}`}>{point}</span>
                          </div>
                        ))
                      ) : (
                        <p className="item-description" id={`description-${item.id}`}>{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="connector-line right-connector" id={`right-connector-${item.id}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newspaper Section */}
      <section className="newspaper-section" id="newspaper-main-section">
        <div className="newspaper-wrapper" id="newspaper-paper-wrapper">
          {/* Newspaper Header */}
          <header className="newspaper-top" id="newspaper-header-top">
            <div className="newspaper-banner" id="newspaper-banner-head">
              <h1 className="newspaper-heading" id="newspaper-main-heading">{t.newspaperTitle}</h1>
              <div className="paper-info" id="newspaper-info-bar">
                <span className="edition" id="paper-edition">{t.newspaperEdition}</span>
                <span className="date" id="paper-date">{t.newspaperDate}</span>
                <span className="price" id="paper-price">{t.newspaperPrice}</span>
              </div>
            </div>
            <div className="top-divider" id="header-divider-line"></div>
          </header>

          {/* Main Content */}
          <div className="newspaper-content" id="newspaper-main-content">
            {/* Lead Story */}
            <div className="premium-story" id="lead-premium-story">
              <h2 className="premium-headline" id="premium-story-headline">{t.newspaperSubtitle}</h2>
              <p className="premium-subhead" id="premium-story-subhead">{t.newspaperSubhead}</p>
            </div>

            {/* Articles Grid */}
            <div className="stories-grid" id="articles-main-grid">
              {t.newspaperContent.map((article, index) => renderArticle(article, index))}
            </div>

            {/* Newspaper Footer */}
            <footer className="newspaper-end" id="newspaper-bottom-footer">
              <div className="bottom-divider" id="footer-divider-line"></div>
              <div className="paper-footer" id="paper-footer-content">
                <span className="continued" id="footer-continued">{t.continued}</span>
                <span className="page-number" id="footer-page-number">{t.pageNumber}</span>
                <span className="copyright" id="footer-copyright">{t.copyright}</span>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Image Modal for Zoom */}
      {selectedImage && (
        <div className="preview-modal" id="newspaper-image-modal" onClick={closeImageModal}>
          <div className="modal-container" id="modal-container-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" id="modal-close-button" onClick={closeImageModal}>{t.close}</button>
            <div className="zoom-controls" id="image-zoom-controls">
              <button onClick={handleZoomOut} disabled={zoomLevel <= 0.5} id="zoom-out-btn">{t.zoomOut}</button>
              <span id="zoom-level-display">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={handleZoomIn} disabled={zoomLevel >= 3} id="zoom-in-btn">{t.zoomIn}</button>
            </div>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="zoomed-preview"
              id="modal-preview-image"
              style={{ transform: `scale(${zoomLevel})` }}
              onWheel={handleWheel}
            />
            <div className="modal-info" id="modal-caption-area">
              <h3 id="modal-image-title">{selectedImage.title}</h3>
              <p id="modal-image-description">{selectedImage.date} - {selectedImage.section}</p>
            </div>
          </div>
        </div>
      )}
      <BackToTop />
    </div>
  );
};

export default Home;