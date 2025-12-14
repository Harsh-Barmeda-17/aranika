import React, { useState, useEffect, useContext, useRef } from 'react';
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
      night: "night",
      note: "Note:",
      important: "Important:",
      checkInTime: "Check-in Time: 2:00 PM",
      checkOutTime: "Check-out Time: 11:00 AM",
      originalIdProof: "Carry original identity proof for verification",
      contactBeforeTravel: "Guest must call +91 9876543210 before travel",
      presentBookingId: "Booking ID must be presented at check-in",
      importantInformation: "Important Information",
      termsAndConditions: "Terms & Conditions",
      maxStay: "Maximum stay allowed is 3 nights",
      guestCapacity: "Standard: 3 guests per room • With Extra Bed: 4 guests per room",
      childPolicy: "Children 4 years & below stay free",
      extraBedPolicy: "Extra bed: ₹500 per night, max 1 per room",
      cancellationPolicy: "Contact us 24 hours in advance for changes",
      thankYouMessage: "Thank you for choosing Dhurwa Dera!",
      experienceMessage: "Experience the perfect blend of traditional life and comfort"
    },
    hindi: {
      bookingConfirmed: "बुकिंग की पुष्टि हो गई!",
      successMessage: "धुरवा डेरा चुनने के लिए धन्यवाद। बस्तर में आपकी शांतिपूर्ण छुट्टी की पुष्टि हो गई है।",
      bookingId: "बुकिंग आईडी",
      primaryGuestInfo: "मुख्य अतिथि जानकारी",
      primary: "मुख्य",
      fullName: "पूरा नाम:",
      age: "आयु:",
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
      scanToPay: "स्कैन कर भुगतान करें",
      payOnVisitDesc: "कृपया चेक-इन के समय {amount} का भुगतान करें। हम नकद और यूपीआई स्वीकार करते हैं।",
      scanToPayDesc: "कुल राशि: {amount}। आगमन के दौरान दिखाने के लिए भुगतान स्क्रीनशॉट सहेजें।",
      paymentNote: "महत्वपूर्ण: भुगतान पुष्टि का स्क्रीनशॉट सहेजें और ले जाएं। आपको आगमन के दौरान इसे दिखाने की आवश्यकता होगी।",
      downloadPDF: "बुकिंग PDF डाउनलोड करें",
      generatingPDF: "PDF जेनरेट हो रहा है...",
      makeAnotherBooking: "एक और बुकिंग करें",
      needHelp: "मदद चाहिए?",
      uploaded: "अपलोड किया गया ✓",
      nights: "रातें",
      night: "रात",
      note: "नोट:",
      important: "महत्वपूर्ण:",
      checkInTime: "चेक-इन समय: दोपहर 2:00 बजे",
      checkOutTime: "चेक-आउट समय: सुबह 11:00 बजे",
      originalIdProof: "सत्यापन के लिए मूल पहचान प्रमाण ले जाएं",
      contactBeforeTravel: "अतिथि को यात्रा से पहले +91 9876543210 पर कॉल करना होगा",
      presentBookingId: "चेक-इन पर बुकिंग आईडी प्रस्तुत करनी होगी",
      importantInformation: "महत्वपूर्ण जानकारी",
      termsAndConditions: "नियम और शर्तें",
      maxStay: "अधिकतम स्टे: 3 रातें",
      guestCapacity: "मानक: 3 अतिथि प्रति कमरा • अतिरिक्त बेड के साथ: 4 अतिथि प्रति कमरा",
      childPolicy: "4 वर्ष और नीचे के बच्चे मुफ्त",
      extraBedPolicy: "अतिरिक्त बेड: ₹500 प्रति रात, अधिकतम 1 प्रति कमरा",
      cancellationPolicy: "परिवर्तनों के लिए 24 घंटे पहले संपर्क करें",
      thankYouMessage: "धुरवा डेरा चुनने के लिए धन्यवाद!",
      experienceMessage: "पारंपरिक जीवन और आराम का आदर्श मिश्रण अनुभव करें"
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    
    if (language === 'hindi') {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const weekday = date.getDay();
      
      const weekdays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
      
      return `${weekdays[weekday]}, ${day} ${months[month]} ${year}`;
    }
    
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

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // For Hindi: Use html2canvas to capture the exact rendered content
      if (language === 'hindi') {
        await generateHindiPDF();
      } else {
        // For English: Use jsPDF with text (faster and cleaner)
        await generateEnglishPDF();
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(language === 'english' 
        ? 'Error generating PDF. Please try again.' 
        : 'PDF जेनरेट करने में त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generateEnglishPDF = async () => {
    const { jsPDF } = await import('jspdf');
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Colors
    const primaryColor = [53, 97, 25]; // #356119
    const secondaryColor = [74, 124, 58]; // #4a7c3a
    const accentColor = [139, 90, 43]; // #8b5a2b
    const textColor = [0, 0, 0]; // #000000
    
    let yPos = 20;
    
    // Function to add new page if needed
    const checkNewPage = (requiredHeight) => {
      if (yPos + requiredHeight > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };
    
    // Add border to all pages
    const addPageBorder = () => {
      pdf.setDrawColor(...accentColor);
      pdf.setLineWidth(0.5);
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
    };
    
    // Add logo/header section
    addPageBorder();
    
    pdf.setFontSize(28);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Dhurwa Dera', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    
    pdf.setFontSize(22);
    pdf.setTextColor(...secondaryColor);
    pdf.text(t.bookingConfirmed, pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.bookingId + ': ' + bookingData.bookingId, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    pdf.setFontSize(12);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text(t.successMessage, pageWidth / 2, yPos, { align: 'center', maxWidth: pageWidth - 40 });
    yPos += 20;
    
    // Guest Information Section
    checkNewPage(40);
    pdf.setFontSize(16);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.primaryGuestInfo, 20, yPos);
    yPos += 8;
    
    // Draw line under heading
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    
    // Guest details
    const guest = bookingData.guests[0];
    const guestDetails = [
      [t.fullName, guest.fullName || '-'],
      [t.age, guest.age ? `${guest.age} years` : '-'],
      [t.gender, guest.gender || '-'],
      [t.mobile, guest.mobile ? `+91 ${guest.mobile}` : '-'],
      [t.email, guest.email || '-'],
      [t.idType, guest.idType || '-'],
      [t.idNumber, guest.idNumber || '-']
    ];
    
    guestDetails.forEach(([label, value]) => {
      if (checkNewPage(8)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.primaryGuestInfo + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 20, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, 60, yPos);
      yPos += 6;
    });
    
    // Address (can be multiple lines)
    checkNewPage(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.address, 20, yPos);
    yPos += 6;
    pdf.setFont('helvetica', 'normal');
    
    const address = guest.address || '-';
    const addressLines = pdf.splitTextToSize(address, pageWidth - 40);
    addressLines.forEach(line => {
      if (checkNewPage(6)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.primaryGuestInfo + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text(line, 20, yPos);
      yPos += 5;
    });
    
    yPos += 10;
    
    // Booking Details Section
    checkNewPage(40);
    pdf.setFontSize(16);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.bookingDetails, 20, yPos);
    yPos += 8;
    
    // Draw line under heading
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    
    const stayDuration = getStayDuration();
    const bookingDetails = [
      [t.payingGuests, bookingData.payingGuests?.toString() || '-'],
      [t.totalRooms, bookingData.numRooms?.toString() || '-'],
      [t.adults, bookingData.adults?.toString() || '-'],
      [t.children, bookingData.children?.toString() || '-'],
      [t.extraBeds, bookingData.extraBeds?.toString() || '-'],
      [t.checkIn, formatDate(bookingData.checkIn)],
      [t.checkOut, formatDate(bookingData.checkOut)],
      [t.duration, stayDuration > 0 ? `${stayDuration} ${stayDuration > 1 ? t.nights : t.night}` : '-']
    ];
    
    bookingDetails.forEach(([label, value]) => {
      if (checkNewPage(8)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.bookingDetails + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 20, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, 60, yPos);
      yPos += 6;
    });
    
    // Add time notes
    checkNewPage(10);
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.checkInTime, 25, yPos);
    yPos += 5;
    pdf.text(t.checkOutTime, 25, yPos);
    yPos += 10;
    
    // Price Details Section
    checkNewPage(50);
    pdf.setFontSize(16);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.priceDetails, 20, yPos);
    yPos += 8;
    
    // Draw line under heading
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(10);
    
    const roomCost = 2500 * (bookingData.numRooms || 0) * (bookingData.numNights || 0);
    const extraBedCost = 500 * (bookingData.extraBeds || 0) * (bookingData.numNights || 0);
    const childrenBelow4 = bookingData.childAges ? bookingData.childAges.filter(age => age <= 4).length : 0;
    
    const priceDetails = [
      [t.roomPrice, `₹${roomCost}`],
      bookingData.extraBeds > 0 ? [t.extraBedsPrice, `₹${extraBedCost}`] : null,
      [t.numberOfNights, (bookingData.numNights || 0).toString()],
      childrenBelow4 > 0 ? [t.childrenFree, `${childrenBelow4} child${childrenBelow4 > 1 ? 'ren' : ''}`] : null
    ].filter(item => item !== null);
    
    priceDetails.forEach(([label, value]) => {
      if (checkNewPage(8)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.priceDetails + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, 20, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, pageWidth - 30, yPos, { align: 'right' });
      yPos += 6;
    });
    
    // Total Amount
    checkNewPage(15);
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 8;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text(t.totalAmount, 20, yPos);
    pdf.text(`₹${bookingData.totalPrice || 0}`, pageWidth - 20, yPos, { align: 'right' });
    yPos += 10;
    
    // Payment Instructions Section
    checkNewPage(40);
    pdf.setFontSize(16);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.paymentInstructions, 20, yPos);
    yPos += 8;
    
    // Draw line under heading
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'normal');
    
    const paymentMethod = bookingData.paymentMethod === 'payOnVisit' ? t.payOnVisit : t.scanToPay;
    const paymentDescription = bookingData.paymentMethod === 'payOnVisit' 
      ? t.payOnVisitDesc.replace('{amount}', `₹${bookingData.totalPrice || 0}`)
      : t.scanToPayDesc.replace('{amount}', `₹${bookingData.totalPrice || 0}`);
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(paymentMethod, 20, yPos);
    yPos += 6;
    pdf.setFont('helvetica', 'normal');
    
    const descLines = pdf.splitTextToSize(paymentDescription, pageWidth - 40);
    descLines.forEach(line => {
      if (checkNewPage(6)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.paymentInstructions + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text(line, 20, yPos);
      yPos += 5;
    });
    
    if (bookingData.paymentMethod === 'scanToPay') {
      checkNewPage(10);
      yPos += 2;
      pdf.setFontSize(9);
      pdf.setTextColor(139, 69, 19); // Clay red color
      pdf.setFont('helvetica', 'bold');
      const noteLines = pdf.splitTextToSize(t.paymentNote, pageWidth - 40);
      noteLines.forEach(line => {
        if (checkNewPage(6)) {
          addPageBorder();
          pdf.setFontSize(16);
          pdf.setTextColor(...primaryColor);
          pdf.setFont('helvetica', 'bold');
          pdf.text(t.paymentInstructions + ' (Continued)', 20, yPos);
          yPos += 15;
          pdf.setFontSize(9);
          pdf.setTextColor(139, 69, 19);
          pdf.setFont('helvetica', 'bold');
        }
        pdf.text(line, 20, yPos);
        yPos += 5;
      });
      pdf.setTextColor(...textColor);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
    }
    
    yPos += 10;
    
    // Important Information Section
    checkNewPage(60);
    pdf.setFontSize(16);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.importantInformation, 20, yPos);
    yPos += 8;
    
    // Draw line under heading
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(9);
    pdf.setTextColor(...textColor);
    
    const importantNotes = [
      '• Check-in Time: 2:00 PM | Check-out Time: 11:00 AM',
      '• Carry original identity proof for verification',
      '• Standard: 3 guests per room',
      '• With Extra Bed: 4 guests per room',
      '• Extra bed: ₹500 per night, max 1 per room',
      '• Children 4 years & below stay free',
      '• Maximum stay allowed: 3 nights',
      '• Contact us 24 hours in advance for changes',
      '• Guest must call +91 9876543210 before travel',
      '• Booking ID must be presented at check-in'
    ];
    
    importantNotes.forEach(note => {
      if (checkNewPage(6)) {
        addPageBorder();
        pdf.setFontSize(16);
        pdf.setTextColor(...primaryColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t.importantInformation + ' (Continued)', 20, yPos);
        yPos += 15;
        pdf.setFontSize(9);
        pdf.setTextColor(...textColor);
      }
      
      const noteLines = pdf.splitTextToSize(note, pageWidth - 40);
      noteLines.forEach(line => {
        if (checkNewPage(5)) {
          addPageBorder();
          pdf.setFontSize(16);
          pdf.setTextColor(...primaryColor);
          pdf.setFont('helvetica', 'bold');
          pdf.text(t.importantInformation + ' (Continued)', 20, yPos);
          yPos += 15;
          pdf.setFontSize(9);
          pdf.setTextColor(...textColor);
        }
        pdf.text(line, 20, yPos);
        yPos += 4.5;
      });
    });
    
    yPos += 10;
    
    // Footer
    checkNewPage(20);
    pdf.setDrawColor(...accentColor);
    pdf.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(11);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(t.thankYouMessage, pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.text(t.experienceMessage, pageWidth / 2, yPos, { align: 'center' });
    
    // Add border to last page
    addPageBorder();
    
    // Save the PDF
    pdf.save(`Dhurwa-Dera-Booking-${bookingData.bookingId}.pdf`);
  };

  const generateHindiPDF = async () => {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    // Capture the content as an image
    const content = document.querySelector('.confirmation-content');
    const header = document.querySelector('.confirmation-header');
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = '#f9f5f0';
    tempContainer.style.padding = '20px';
    tempContainer.style.boxSizing = 'border-box';
    
    // Clone header and content
    const headerClone = header.cloneNode(true);
    const contentClone = content.cloneNode(true);
    
    // Add Hindi font to ensure proper rendering
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
    
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Noto Sans Devanagari', sans-serif !important;
      }
      .confirmation-content * {
        direction: ltr !important;
        text-align: left !important;
      }
      .info-item span, .price-amount, .booking-id span {
        font-feature-settings: "lnum" !important;
        font-variant-numeric: lining-nums !important;
      }
    `;
    
    tempContainer.appendChild(fontLink);
    tempContainer.appendChild(style);
    tempContainer.appendChild(headerClone);
    tempContainer.appendChild(contentClone);
    
    document.body.appendChild(tempContainer);
    
    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Capture as image
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f9f5f0',
      logging: false,
      windowWidth: 800,
      onclone: (clonedDoc) => {
        // Ensure all styles are applied
        clonedDoc.querySelectorAll('*').forEach(el => {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });
      }
    });
    
    // Clean up
    document.body.removeChild(tempContainer);
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 10;
    
    // Add first page
    pdf.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save PDF
    pdf.save(`धुरवा-डेरा-बुकिंग-${bookingData.bookingId}.pdf`);
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

  const childrenBelow4 = bookingData.childAges ? bookingData.childAges.filter(age => age <= 4).length : 0;
  const stayDuration = getStayDuration();

  return (
    <div className="confirmation-page">
      <Header />
      
      <div className="container">
        <div className="confirmation-card" ref={pdfRef}>
          <div className="confirmation-header">
            <div className="success-animation">
              <div className="success-icon">✓</div>
            </div>
            <h2>{t.bookingConfirmed}</h2>
            <p className="success-message">
              {t.successMessage}
            </p>
            <div className="booking-id">
              {t.bookingId}: <span className="booking-id-value">{bookingData.bookingId}</span>
            </div>
          </div>

          <div className="confirmation-content">
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
                  <span className="guest-info-value">{bookingData.guests[0].fullName || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.age}</label>
                  <span className="guest-info-value">{bookingData.guests[0].age ? `${bookingData.guests[0].age} ${language === 'english' ? 'years' : 'वर्ष'}` : '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.gender}</label>
                  <span className="guest-info-value">{bookingData.guests[0].gender || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.mobile}</label>
                  <span className="guest-info-value contact-info">{bookingData.guests[0].mobile ? `+91 ${bookingData.guests[0].mobile}` : '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.email}</label>
                  <span className={`guest-info-value ${bookingData.guests[0].email ? 'contact-info' : 'not-provided'}`}>
                    {bookingData.guests[0].email || '-'}
                  </span>
                </div>
                <div className="info-item">
                  <label>{t.idType}</label>
                  <span className="guest-info-value id-type">{bookingData.guests[0].idType || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.idNumber}</label>
                  <span className="guest-info-value id-number">{bookingData.guests[0].idNumber || '-'}</span>
                </div>
                {bookingData.guests[0].idImage && (
                  <div className="info-item">
                    <label>{t.idProofImage}</label>
                    <span className="guest-info-value id-image-status">{t.uploaded}</span>
                  </div>
                )}
                <div className="info-item full-width">
                  <label>{t.address}</label>
                  <span className="guest-info-value address-text">{bookingData.guests[0].address || '-'}</span>
                </div>
              </div>
            </section>

            <section className="info-section">
              <div className="section-header">
                <h3>{t.bookingDetails}</h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>{t.payingGuests}</label>
                  <span className="booking-info-value">{bookingData.payingGuests || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.totalRooms}</label>
                  <span className="booking-info-value">{bookingData.numRooms || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.adults}</label>
                  <span className="booking-info-value">{bookingData.adults || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.children}</label>
                  <span className="booking-info-value">{bookingData.children || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.extraBeds}</label>
                  <span className="booking-info-value">{bookingData.extraBeds || '-'}</span>
                </div>
                <div className="info-item">
                  <label>{t.checkIn}</label>
                  <span className="booking-info-value date-highlight">{formatDate(bookingData.checkIn)}</span>
                  <div className="time-note">{t.checkInTime}</div>
                </div>
                <div className="info-item">
                  <label>{t.checkOut}</label>
                  <span className="booking-info-value date-highlight">{formatDate(bookingData.checkOut)}</span>
                  <div className="time-note">{t.checkOutTime}</div>
                </div>
                <div className="info-item">
                  <label>{t.duration}</label>
                  <span className="booking-info-value duration-badge">
                    {stayDuration > 0 ? `${stayDuration} ${stayDuration > 1 ? t.nights : t.night}` : '-'}
                  </span>
                </div>
              </div>
            </section>

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

            <section className="info-section">
              <div className="section-header">
                <h3>{t.importantInformation}</h3>
              </div>
              <div className="notes-grid">
                <div className="note-item">
                  <div className="note-content">
                    <strong>{t.checkInTime}</strong>
                    <p>{t.checkOutTime}</p>
                  </div>
                </div>
                <div className="note-item">
                  <div className="note-content">
                    <strong>{t.originalIdProof}</strong>
                    <p>{t.guestCapacity}</p>
                  </div>
                </div>
                <div className="note-item">
                  <div className="note-content">
                    <strong>{t.childPolicy}</strong>
                    <p>{t.extraBedPolicy}</p>
                  </div>
                </div>
                <div className="note-item">
                  <div className="note-content">
                    <strong>{t.maxStay}</strong>
                    <p>{t.cancellationPolicy}</p>
                  </div>
                </div>
                <div className="note-item">
                  <div className="note-content">
                    <strong>{t.contactBeforeTravel}</strong>
                    <p>{t.presentBookingId}</p>
                  </div>
                </div>
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

      <BackToTop />

      <Footer />
    </div>
  );
};

export default BookingConfirmation;