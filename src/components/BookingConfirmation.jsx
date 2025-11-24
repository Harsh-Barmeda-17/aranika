import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { LanguageContext } from '../App';
import '../styles/BookingConfirmation.css';

const BookingConfirmation = ({ bookingData, onNewBooking }) => {
  const { language } = useContext(LanguageContext);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfRef = useRef();

  // Language translations
  const translations = {
    english: {
      bookingConfirmed: "Booking Confirmed!",
      successMessage: "Thank you for choosing Dhurwa Dera. Your peaceful getaway in Bastar is confirmed.",
      bookingId: "Booking ID",
      primaryGuestInfo: "Primary Guest Information",
      primary: "Primary",
      fullName: "Full Name:",
      age: "Age:",
      gender: "Gender:",
      mobile: "Mobile:",
      email: "Email:",
      idType: "ID Type:",
      idNumber: "ID Number:",
      idProofImage: "ID Proof Image:",
      address: "Address:",
      bookingDetails: "Booking Details",
      payingGuests: "Paying Guests:",
      totalRooms: "Total Rooms:",
      adults: "Adults:",
      children: "Children:",
      extraBeds: "Extra Beds:",
      checkIn: "Check-in:",
      checkOut: "Check-out:",
      duration: "Duration:",
      priceDetails: "Price Details",
      roomPrice: "Room Price:",
      extraBedsPrice: "Extra Beds:",
      numberOfNights: "Number of Nights:",
      childrenFree: "Children (Free):",
      totalAmount: "Total Amount:",
      paymentInstructions: "Payment Instructions",
      payOnVisit: "Pay on Visit",
      scanToPay: "Scan to Pay",
      payOnVisitDesc: "Please pay {amount} when you check in. We accept Cash & UPI.",
      scanToPayDesc: "Total Amount: {amount}. Save payment screenshot to show during arrival.",
      paymentNote: "Important: Save and carry screenshot of payment confirmation. You will need to show it during arrival.",
      downloadPDF: "Download Booking PDF",
      generatingPDF: "Generating PDF...",
      makeAnotherBooking: "Make Another Booking",
      needHelp: "Need Help?",
      uploaded: "Uploaded ✓",
      nights: "nights",
      night: "night"
    },
    hindi: {
      bookingConfirmed: "बुकिंग की पुष्टि हो गई!",
      successMessage: "धुरवा डेरा चुनने के लिए धन्यवाद। बस्तर में आपकी शांतिपूर्ण छुट्टी की पुष्टि हो गई है।",
      bookingId: "बुकिंग आईडी",
      primaryGuestInfo: "प्राथमिक अतिथि जानकारी",
      primary: "प्राथमिक",
      fullName: "पूरा नाम:",
      age: "उम्र:",
      gender: "लिंग:",
      mobile: "मोबाइल:",
      email: "ईमेल:",
      idType: "आईडी प्रकार:",
      idNumber: "आईडी नंबर:",
      idProofImage: "आईडी प्रमाण छवि:",
      address: "पता:",
      bookingDetails: "बुकिंग विवरण",
      payingGuests: "भुगतान करने वाले अतिथि:",
      totalRooms: "कुल कमरे:",
      adults: "वयस्क:",
      children: "बच्चे:",
      extraBeds: "अतिरिक्त बेड:",
      checkIn: "चेक-इन:",
      checkOut: "चेक-आउट:",
      duration: "अवधि:",
      priceDetails: "मूल्य विवरण",
      roomPrice: "कमरे का मूल्य:",
      extraBedsPrice: "अतिरिक्त बेड:",
      numberOfNights: "रातों की संख्या:",
      childrenFree: "बच्चे (मुफ्त):",
      totalAmount: "कुल राशि:",
      paymentInstructions: "भुगतान निर्देश",
      payOnVisit: "विजिट पर भुगतान करें",
      scanToPay: "स्कैन करके भुगतान करें",
      payOnVisitDesc: "कृपया चेक-इन के समय {amount} का भुगतान करें। हम नकद और यूपीआई स्वीकार करते हैं।",
      scanToPayDesc: "कुल राशि: {amount}. आगमन के दौरान दिखाने के लिए भुगतान स्क्रीनशॉट सहेजें।",
      paymentNote: "महत्वपूर्ण: भुगतान पुष्टि का स्क्रीनशॉट सहेजें और ले जाएं। आपको आगमन के दौरान इसे दिखाने की आवश्यकता होगी।",
      downloadPDF: "बुकिंग PDF डाउनलोड करें",
      generatingPDF: "PDF जेनरेट हो रहा है...",
      makeAnotherBooking: "एक और बुकिंग करें",
      needHelp: "मदद चाहिए?",
      uploaded: "अपलोड किया गया ✓",
      nights: "रातें",
      night: "रात"
    }
  };

  const t = translations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Create PDF with proper dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      let yPosition = 20;

      // Function to add new page if needed
      const checkNewPage = (requiredSpace) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
          return true;
        }
        return false;
      };

      // Header Section
      pdf.setFontSize(24);
      pdf.setTextColor(74, 124, 58);
      pdf.text('Dhurwa Dera', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      pdf.setFontSize(18);
      pdf.setTextColor(53, 97, 25);
      pdf.text(language === 'english' ? 'Booking Confirmation' : 'बुकिंग पुष्टि', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${language === 'english' ? 'Booking ID' : 'बुकिंग आईडी'}: ${bookingData.bookingId}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Guest Information Section
      checkNewPage(40);
      pdf.setFontSize(14);
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Guest Information' : 'अतिथि जानकारी', 20, yPosition);
      yPosition += 8;
      
      // Draw line
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      const guestInfo = [
        [language === 'english' ? 'Full Name:' : 'पूरा नाम:', bookingData.guests[0].fullName || '-'],
        [language === 'english' ? 'Age:' : 'उम्र:', bookingData.guests[0].age ? `${bookingData.guests[0].age} ${language === 'english' ? 'years' : 'वर्ष'}` : '-'],
        [language === 'english' ? 'Gender:' : 'लिंग:', bookingData.guests[0].gender || '-'],
        [language === 'english' ? 'Mobile:' : 'मोबाइल:', bookingData.guests[0].mobile ? `+91 ${bookingData.guests[0].mobile}` : '-'],
        [language === 'english' ? 'Email:' : 'ईमेल:', bookingData.guests[0].email || '-'],
        [language === 'english' ? 'ID Type:' : 'आईडी प्रकार:', bookingData.guests[0].idType || '-'],
        [language === 'english' ? 'ID Number:' : 'आईडी नंबर:', bookingData.guests[0].idNumber || '-']
      ];

      guestInfo.forEach(([label, value]) => {
        if (checkNewPage(8)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Guest Information (Continued)' : 'अतिथि जानकारी (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
        }
        
        pdf.setFont(undefined, 'bold');
        pdf.text(label, 20, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, 60, yPosition);
        yPosition += 6;
      });

      // Address
      if (checkNewPage(20)) {
        pdf.setFontSize(14);
        pdf.setTextColor(74, 124, 58);
        pdf.text(language === 'english' ? 'Guest Information (Continued)' : 'अतिथि जानकारी (जारी)', 20, yPosition);
        yPosition += 15;
      }
      
      pdf.setFont(undefined, 'bold');
      pdf.text(language === 'english' ? 'Address:' : 'पता:', 20, yPosition);
      yPosition += 6;
      pdf.setFont(undefined, 'normal');
      
      const address = bookingData.guests[0].address || '-';
      const addressLines = pdf.splitTextToSize(address, pageWidth - 40);
      addressLines.forEach(line => {
        if (checkNewPage(6)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Guest Information (Continued)' : 'अतिथि जानकारी (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
        }
        pdf.text(line, 20, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Booking Details Section
      checkNewPage(30);
      pdf.setFontSize(14);
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Booking Details' : 'बुकिंग विवरण', 20, yPosition);
      yPosition += 8;
      
      // Draw line
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const bookingInfo = [
        [language === 'english' ? 'Paying Guests:' : 'भुगतान करने वाले अतिथि:', bookingData.payingGuests?.toString() || '-'],
        [language === 'english' ? 'Total Rooms:' : 'कुल कमरे:', bookingData.numRooms?.toString() || '-'],
        [language === 'english' ? 'Adults:' : 'वयस्क:', bookingData.adults?.toString() || '-'],
        [language === 'english' ? 'Children:' : 'बच्चे:', bookingData.children?.toString() || '-'],
        [language === 'english' ? 'Extra Beds:' : 'अतिरिक्त बेड:', bookingData.extraBeds?.toString() || '-'],
        [language === 'english' ? 'Check-in:' : 'चेक-इन:', formatDate(bookingData.checkIn) || '-'],
        [language === 'english' ? 'Check-out:' : 'चेक-आउट:', formatDate(bookingData.checkOut) || '-'],
        [language === 'english' ? 'Duration:' : 'अवधि:', getStayDuration() ? `${getStayDuration()} ${getStayDuration() > 1 ? (language === 'english' ? 'nights' : 'रातें') : (language === 'english' ? 'night' : 'रात')}` : '-']
      ];

      bookingInfo.forEach(([label, value]) => {
        if (checkNewPage(8)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Booking Details (Continued)' : 'बुकिंग विवरण (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
        }
        
        pdf.setFont(undefined, 'bold');
        pdf.text(label, 20, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, 60, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Price Details Section
      checkNewPage(40);
      pdf.setFontSize(14);
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Price Details' : 'मूल्य विवरण', 20, yPosition);
      yPosition += 8;
      
      // Draw line
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      
      const roomCost = 2500 * (bookingData.numRooms || 0) * (bookingData.numNights || 0);
      const extraBedCost = 500 * (bookingData.extraBeds || 0) * (bookingData.numNights || 0);
      const childrenBelow4 = bookingData.childAges ? bookingData.childAges.filter(age => age <= 4).length : 0;

      const priceDetails = [
        [language === 'english' ? 'Room Price:' : 'कमरे का मूल्य:', `₹${roomCost}`],
        [language === 'english' ? 'Extra Beds:' : 'अतिरिक्त बेड:', `₹${extraBedCost}`],
        [language === 'english' ? 'Number of Nights:' : 'रातों की संख्या:', (bookingData.numNights || 0).toString()],
        [language === 'english' ? 'Children (Free):' : 'बच्चे (मुफ्त):', childrenBelow4 > 0 ? `${childrenBelow4} ${language === 'english' ? 'child' : 'बच्चा'}${childrenBelow4 > 1 ? (language === 'english' ? 'ren' : 'े') : ''}` : '-']
      ];

      priceDetails.forEach(([label, value]) => {
        if (checkNewPage(8)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Price Details (Continued)' : 'मूल्य विवरण (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
        }
        
        pdf.setFont(undefined, 'bold');
        pdf.text(label, 20, yPosition);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, pageWidth - 30, yPosition, { align: 'right' });
        yPosition += 6;
      });

      // Total Amount
      if (checkNewPage(15)) {
        pdf.setFontSize(14);
        pdf.setTextColor(74, 124, 58);
        pdf.text(language === 'english' ? 'Price Details (Continued)' : 'मूल्य विवरण (जारी)', 20, yPosition);
        yPosition += 15;
      }
      
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 8;
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Total Amount:' : 'कुल राशि:', 20, yPosition);
      pdf.text(`₹${bookingData.totalPrice || 0}`, pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 10;

      // Payment Instructions Section
      checkNewPage(30);
      pdf.setFontSize(14);
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Payment Instructions' : 'भुगतान निर्देश', 20, yPosition);
      yPosition += 8;
      
      // Draw line
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const paymentText = bookingData.paymentMethod === 'payOnVisit' 
        ? [
            `${language === 'english' ? 'Payment Method: Pay on Visit' : 'भुगतान विधि: विजिट पर भुगतान करें'}`,
            `${language === 'english' ? 'Please pay' : 'कृपया भुगतान करें'} ₹${bookingData.totalPrice || 0} ${language === 'english' ? 'when you check in.' : 'चेक-इन के समय।'}`,
            `${language === 'english' ? 'We accept: Cash & UPI' : 'हम स्वीकार करते हैं: नकद और यूपीआई'}`
          ]
        : [
            `${language === 'english' ? 'Payment Method: Scan to Pay' : 'भुगतान विधि: स्कैन करके भुगतान करें'}`,
            `${language === 'english' ? 'Total Amount:' : 'कुल राशि:'} ₹${bookingData.totalPrice || 0}`,
            `${language === 'english' ? 'Important: Save payment screenshot to show during arrival.' : 'महत्वपूर्ण: आगमन के दौरान दिखाने के लिए भुगतान स्क्रीनशॉट सहेजें।'}`
          ];

      paymentText.forEach(line => {
        if (checkNewPage(8)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Payment Instructions (Continued)' : 'भुगतान निर्देश (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
        }
        
        if (line.includes('Important:') || line.includes('महत्वपूर्ण:')) {
          pdf.setTextColor(139, 69, 19);
          pdf.setFont(undefined, 'bold');
        }
        
        const lines = pdf.splitTextToSize(line, pageWidth - 40);
        lines.forEach(textLine => {
          pdf.text(textLine, 20, yPosition);
          yPosition += 6;
        });
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFont(undefined, 'normal');
      });

      yPosition += 10;

      // Important Information Section
      checkNewPage(50);
      pdf.setFontSize(14);
      pdf.setTextColor(74, 124, 58);
      pdf.text(language === 'english' ? 'Important Information' : 'महत्वपूर्ण जानकारी', 20, yPosition);
      yPosition += 8;
      
      // Draw line
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);

      const importantNotes = language === 'english' ? [
        '• Check-in: 2:00 PM | Check-out: 11:00 AM',
        '• Carry original identity proof for verification',
        '• Standard: 3 guests per room',
        '• With Extra Bed: 4 guests per room',
        '• Extra bed: ₹500 per night, max 1 per room',
        '• Children 4 years & below stay free',
        '• Maximum stay: 3 nights',
        '• Contact us 24 hours in advance for changes',
        '• Guest must call +91 9876543210 before travel',
        '• Booking ID must be presented at check-in'
      ] : [
        '• चेक-इन: दोपहर 2:00 बजे | चेक-आउट: सुबह 11:00 बजे',
        '• सत्यापन के लिए मूल पहचान प्रमाण ले जाएं',
        '• मानक: 3 अतिथि प्रति कमरा',
        '• अतिरिक्त बेड के साथ: 4 अतिथि प्रति कमरा',
        '• अतिरिक्त बेड: ₹500 प्रति रात, अधिकतम 1 प्रति कमरा',
        '• 4 वर्ष और नीचे के बच्चे मुफ्त',
        '• अधिकतम स्टे: 3 रातें',
        '• परिवर्तनों के लिए 24 घंटे पहले संपर्क करें',
        '• अतिथि को यात्रा से पहले +91 9876543210 पर कॉल करना होगा',
        '• चेक-इन पर बुकिंग आईडी प्रस्तुत करनी होगी'
      ];

      importantNotes.forEach(note => {
        if (checkNewPage(6)) {
          pdf.setFontSize(14);
          pdf.setTextColor(74, 124, 58);
          pdf.text(language === 'english' ? 'Important Information (Continued)' : 'महत्वपूर्ण जानकारी (जारी)', 20, yPosition);
          yPosition += 15;
          pdf.setFontSize(9);
          pdf.setTextColor(0, 0, 0);
        }
        
        pdf.text(note, 20, yPosition);
        yPosition += 5;
      });

      // Footer
      checkNewPage(20);
      pdf.setDrawColor(139, 90, 43);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(74, 124, 58);
      pdf.setFont(undefined, 'bold');
      pdf.text(language === 'english' ? 'Thank you for choosing Dhurwa Dera!' : 'धुरवा डेरा चुनने के लिए धन्यवाद!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;

      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont(undefined, 'normal');
      pdf.text(language === 'english' ? 'Experience the perfect blend of traditional life and comfort' : 'पारंपरिक जीवन और आराम का आदर्श मिश्रण अनुभव करें', pageWidth / 2, yPosition, { align: 'center' });

      pdf.save(`Dhurwa-Dera-Booking-${bookingData.bookingId}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(language === 'english' ? 'Error generating PDF. Please try again.' : 'PDF जेनरेट करने में त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="confirmation-page">
        <Header />
        <div className="container">
          <div className="error-message">
            <h2>{language === 'english' ? 'No Booking Found' : 'कोई बुकिंग नहीं मिली'}</h2>
            <p>{language === 'english' ? 'Please make a new booking.' : 'कृपया एक नई बुकिंग करें।'}</p>
            <button onClick={onNewBooking} className="action-btn">
              {language === 'english' ? 'Make New Booking' : 'नई बुकिंग करें'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStayDuration = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const timeDiff = checkOut - checkIn;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const childrenBelow4 = bookingData.childAges ? bookingData.childAges.filter(age => age <= 4).length : 0;

  return (
    <div className="confirmation-page">
      <Header />
      
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="success-animation">
              <div className="success-icon">✓</div>
            </div>
            <h2>{t.bookingConfirmed}</h2>
            <p className="success-message">
              {t.successMessage}
            </p>
            <div className="booking-id">
              {t.bookingId}: <span>{bookingData.bookingId}</span>
            </div>
          </div>

          {/* Visible content for users */}
          <div className="confirmation-content">
            {/* Guest Information */}
            <section className="info-section guest-section">
              <div className="section-header">
                <h3>
                  {t.primaryGuestInfo}
                  <span className="primary-badge">{t.primary}</span>
                </h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>{t.fullName}</label>
                  <span>{bookingData.guests[0].fullName || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.age}</label>
                  <span>{bookingData.guests[0].age ? `${bookingData.guests[0].age} ${language === 'english' ? 'years' : 'वर्ष'}` : '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.gender}</label>
                  <span>{bookingData.guests[0].gender || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.mobile}</label>
                  <span className="contact-info">{bookingData.guests[0].mobile ? `+91 ${bookingData.guests[0].mobile}` : '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.email}</label>
                  <span className={bookingData.guests[0].email ? 'contact-info' : 'not-provided'}>
                    {bookingData.guests[0].email || '-'}
                  </span>
                </div>
                <div className="info-item">
                  <label>{t.idType}</label>
                  <span className="id-type">{bookingData.guests[0].idType || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.idNumber}</label>
                  <span className="id-number">{bookingData.guests[0].idNumber || '-'}</span>
                </div>
                {bookingData.guests[0].idImage && (
                  <div className="info-item">
                    <label>{t.idProofImage}</label>
                    <span className="id-image-status">{t.uploaded}</span>
                  </div>
                )}
                <div className="info-item full-width">
                  <label>{t.address}</label>
                  <span className="address-text">{bookingData.guests[0].address || '-'}</span>
                </div>
              </div>
            </section>

            {/* Booking Details */}
            <section className="info-section">
              <div className="section-header">
                <h3>{t.bookingDetails}</h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>{t.payingGuests}</label>
                  <span>{bookingData.payingGuests || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.totalRooms}</label>
                  <span>{bookingData.numRooms || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.adults}</label>
                  <span>{bookingData.adults || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.children}</label>
                  <span>{bookingData.children || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.extraBeds}</label>
                  <span>{bookingData.extraBeds || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.checkIn}</label>
                  <span className="date-highlight">{formatDate(bookingData.checkIn)}</span>
                </div>
                <div className="info-item">
                  <label>{t.checkOut}</label>
                  <span className="date-highlight">{formatDate(bookingData.checkOut)}</span>
                </div>
                <div className="info-item">
                  <label>{t.duration}</label>
                  <span className="duration-badge">
                    {getStayDuration() ? `${getStayDuration()} ${getStayDuration() > 1 ? t.nights : t.night}` : '-'}
                  </span>
                </div>
              </div>
            </section>

            {/* Price Details */}
            <section className="info-section price-section-confirm">
              <div className="section-header">
                <h3>{t.priceDetails}</h3>
              </div>
              <div className="price-breakdown">
                <div className="price-item">
                  <span className="price-label">{t.roomPrice}</span>
                  <span className="price-amount">₹{2500 * (bookingData.numRooms || 0) * (bookingData.numNights || 0)}</span>
                </div>
                {bookingData.extraBeds > 0 && (
                  <div className="price-item">
                    <span className="price-label">{t.extraBedsPrice}</span>
                    <span className="price-amount">₹{500 * (bookingData.extraBeds || 0) * (bookingData.numNights || 0)}</span>
                  </div>
                )}
                <div className="price-item">
                  <span className="price-label">{t.numberOfNights}</span>
                  <span className="price-amount">{bookingData.numNights || 0}</span>
                </div>
                {childrenBelow4 > 0 && (
                  <div className="price-item discount">
                    <span className="price-label">{t.childrenFree}</span>
                    <span className="price-amount">
                      {childrenBelow4} {language === 'english' ? 'child' : 'बच्चा'}{childrenBelow4 > 1 ? (language === 'english' ? 'ren' : 'े') : ''}
                    </span>
                  </div>
                )}
                <div className="price-divider"></div>
                <div className="price-item total">
                  <span className="price-label">{t.totalAmount}</span>
                  <span className="price-amount">₹{bookingData.totalPrice || 0}</span>
                </div>
              </div>
            </section>

            {/* Payment Instructions */}
            <section className="info-section">
              <div className="section-header">
                <h3>{t.paymentInstructions}</h3>
              </div>
              <div className="instruction">
                <h4>
                  {bookingData.paymentMethod === 'payOnVisit' ? t.payOnVisit : t.scanToPay}
                </h4>
                <p>
                  {bookingData.paymentMethod === 'payOnVisit' 
                    ? t.payOnVisitDesc.replace('{amount}', `₹${bookingData.totalPrice || 0}`)
                    : t.scanToPayDesc.replace('{amount}', `₹${bookingData.totalPrice || 0}`)
                  }
                </p>
                {bookingData.paymentMethod === 'scanToPay' && (
                  <div className="payment-note">
                    {t.paymentNote}
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="confirmation-actions">
            <button 
              onClick={handleDownloadPDF} 
              className="download-btn"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <div className="spinner"></div>
                  {t.generatingPDF}
                </>
              ) : (
                t.downloadPDF
              )}
            </button>
            <button onClick={onNewBooking} className="new-booking-btn">
              {t.makeAnotherBooking}
            </button>
          </div>

          <div className="contact-quick-access">
            <h4>{t.needHelp}</h4>
            <div className="contact-methods">
              <div className="contact-method">
                <span>+91 9876543210</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />

      <Footer />
    </div>
  );
};

export default BookingConfirmation;