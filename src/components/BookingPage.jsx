import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { LanguageContext } from '../App';
import '../styles/BookingPage.css';

const BookingPage = ({ onSubmit }) => {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    numRooms: 1,
    adults: 1,
    children: 0,
    childAges: [],
    extraBeds: 0,
    checkIn: '',
    checkOut: '',
    paymentMethod: 'payOnVisit',
    guests: [
      {
        fullName: '',
        age: '',
        gender: '',
        mobile: '',
        email: '',
        address: '',
        idType: 'Aadhaar',
        idNumber: '',
        idImage: null
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [numNights, setNumNights] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ROOM_PRICE = 2500;
  const EXTRA_BED_PRICE = 500;
  const MAX_GUESTS_PER_ROOM = 3;
  const MAX_GUESTS_WITH_EXTRA_BED = 4;
  const MAX_ROOMS = 3;
  const CHILD_AGE_LIMIT = 4;
  const MAX_STAY_NIGHTS = 3; // Maximum 3 nights stay

  // Language translations
  const translations = {
    english: {
      bookYourStay: "Book Your Stay",
      subtitle: "Fill in your details to reserve your peaceful getaway",
      roomGuestsInfo: "Room & Guests Information",
      payingGuests: "Paying Guests",
      totalRooms: "Total Rooms",
      extraBeds: "Extra Beds",
      childrenFree: "Children (Free)",
      numberRooms: "Number of Rooms",
      maxRooms: "Max {max} rooms",
      adults: "Adults (12+ years)",
      maxAdults: "Max {max} adults",
      children: "Children (0-12 years)",
      ageBelowFree: "Age 4 & below: Free",
      extraBedsLabel: "Extra Beds",
      perNightMax: "₹500 per night, max 1 per room",
      childrenAges: "Children Ages",
      childAge: "Child {index} Age",
      capacityInfo: "Standard: {maxPerRoom} guests per room • With Extra Bed: {maxWithExtra} guests per room • Children {ageLimit} & below stay free",
      primaryGuestInfo: "Primary Guest Information",
      primary: "Primary",
      fullName: "Full Name *",
      enterFullName: "Enter full name",
      age: "Age *",
      enterAge: "Enter age",
      gender: "Gender *",
      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      mobile: "Mobile Number *",
      mobilePlaceholder: "10-digit mobile number",
      email: "Email (Optional)",
      emailPlaceholder: "your.email@example.com",
      idType: "Identity Proof Type (Optional)",
      idNumber: "{type} Number (Optional)",
      aadhaarPlaceholder: "Enter 12-digit Aadhaar",
      drivingLicensePlaceholder: "Enter 16-digit Driving License",
      passportPlaceholder: "Enter 8-character Passport",
      voterIdPlaceholder: "Enter 10-character Voter ID",
      idImage: "Identity Proof Image (Optional)",
      chooseIdImage: "Choose ID Proof Image (Optional)",
      idNote: "Note: Carrying original identity proof is compulsory for verification at check-in. You can also upload it here for advance verification.",
      address: "Address *",
      addressPlaceholder: "Enter your complete address",
      bookingDates: "Booking Dates",
      checkIn: "Check-in Date *",
      checkOut: "Check-out Date *",
      nightStay: "{nights} night{s} stay",
      priceDetails: "Price Details",
      roomPrice: "Room Price (per night):",
      extraBedsPrice: "Extra Beds (per night):",
      numberOfNights: "Number of Nights:",
      childrenFreePrice: "Children (Free):",
      totalAmount: "Total Amount:",
      paymentOptions: "Payment Options",
      payOnVisit: "Pay on Visit",
      payOnVisitDesc: "Pay when you check in",
      scanToPay: "Scan to Pay",
      scanToPayDesc: "UPI QR Code payment",
      qrPlaceholder: "QR Code Placeholder",
      qrInstruction: "Scan this QR code to make payment via UPI",
      qrNote: "Important: Save and carry screenshot of payment confirmation. You will need to show it during arrival.",
      confirmBooking: "Confirm Booking",
      processing: "Processing...",
      capacityError: "Maximum {capacity} paying guests allowed for {rooms} room(s) with {beds} extra bed(s)",
      required: "is required",
      mobileDigits: "Mobile number must be exactly 10 digits",
      validEmail: "Please enter a valid email address",
      validAge: "Age must be between 1 and 120",
      aadhaarDigits: "Aadhaar number must be exactly 12 digits",
      drivingLicenseDigits: "Driving License number must be exactly 16 digits",
      passportFormat: "Passport number must be 8 alphanumeric characters",
      voterIdFormat: "Voter ID must be 10 alphanumeric characters",
      checkInRequired: "Check-in date is required",
      checkOutRequired: "Check-out date is required",
      checkOutAfter: "Check-out date must be after check-in date",
      childAgeRequired: "Age required for child {index}",
      childAgeRange: "Child age must be between 1-12 years",
      maxStayError: "Maximum stay allowed is {maxNights} nights"
    },
    hindi: {
      bookYourStay: "अपना स्टे बुक करें",
      subtitle: "अपनी शांतिपूर्ण छुट्टी आरक्षित करने के लिए अपने विवरण भरें",
      roomGuestsInfo: "कमरा और अतिथि जानकारी",
      payingGuests: "भुगतान करने वाले अतिथि",
      totalRooms: "कुल कमरे",
      extraBeds: "अतिरिक्त बेड",
      childrenFree: "बच्चे (मुफ्त)",
      numberRooms: "कमरों की संख्या",
      maxRooms: "अधिकतम {max} कमरे",
      adults: "वयस्क (12+ वर्ष)",
      maxAdults: "अधिकतम {max} वयस्क",
      children: "बच्चे (0-12 वर्ष)",
      ageBelowFree: "4 वर्ष और नीचे: मुफ्त",
      extraBedsLabel: "अतिरिक्त बेड",
      perNightMax: "₹500 प्रति रात, अधिकतम 1 प्रति कमरा",
      childrenAges: "बच्चों की उम्र",
      childAge: "बच्चा {index} उम्र",
      capacityInfo: "मानक: {maxPerRoom} अतिथि प्रति कमरा • अतिरिक्त बेड के साथ: {maxWithExtra} अतिथि प्रति कमरा • {ageLimit} वर्ष और नीचे के बच्चे मुफ्त",
      primaryGuestInfo: "प्राथमिक अतिथि जानकारी",
      primary: "प्राथमिक",
      fullName: "पूरा नाम *",
      enterFullName: "पूरा नाम दर्ज करें",
      age: "उम्र *",
      enterAge: "उम्र दर्ज करें",
      gender: "लिंग *",
      selectGender: "लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      mobile: "मोबाइल नंबर *",
      mobilePlaceholder: "10-अंकीय मोबाइल नंबर",
      email: "ईमेल (वैकल्पिक)",
      emailPlaceholder: "your.email@example.com",
      idType: "पहचान प्रमाण प्रकार (वैकल्पिक)",
      idNumber: "{type} नंबर (वैकल्पिक)",
      aadhaarPlaceholder: "12-अंकीय आधार दर्ज करें",
      drivingLicensePlaceholder: "16-अंकीय ड्राइविंग लाइसेंस दर्ज करें",
      passportPlaceholder: "8-वर्ण पासपोर्ट दर्ज करें",
      voterIdPlaceholder: "10-वर्ण वोटर आईडी दर्ज करें",
      idImage: "पहचान प्रमाण छवि (वैकल्पिक)",
      chooseIdImage: "पहचान प्रमाण छवि चुनें (वैकल्पिक)",
      idNote: "नोट: चेक-इन पर सत्यापन के लिए मूल पहचान प्रमाण ले जाना अनिवार्य है। आप इसे अग्रिम सत्यापन के लिए यहां अपलोड भी कर सकते हैं।",
      address: "पता *",
      addressPlaceholder: "अपना पूरा पता दर्ज करें",
      bookingDates: "बुकिंग तिथियां",
      checkIn: "चेक-इन तिथि *",
      checkOut: "चेक-आउट तिथि *",
      nightStay: "{nights} रात{s} का स्टे",
      priceDetails: "मूल्य विवरण",
      roomPrice: "कमरे का मूल्य (प्रति रात):",
      extraBedsPrice: "अतिरिक्त बेड (प्रति रात):",
      numberOfNights: "रातों की संख्या:",
      childrenFreePrice: "बच्चे (मुफ्त):",
      totalAmount: "कुल राशि:",
      paymentOptions: "भुगतान विकल्प",
      payOnVisit: "विजिट पर भुगतान करें",
      payOnVisitDesc: "चेक-इन के समय भुगतान करें",
      scanToPay: "स्कैन करके भुगतान करें",
      scanToPayDesc: "यूपीआई क्यूआर कोड भुगतान",
      qrPlaceholder: "क्यूआर कोड प्लेसहोल्डर",
      qrInstruction: "यूपीआई के माध्यम से भुगतान करने के लिए इस क्यूआर कोड को स्कैन करें",
      qrNote: "महत्वपूर्ण: भुगतान पुष्टि का स्क्रीनशॉट सहेजें और ले जाएं। आपको आगमन के दौरान इसे दिखाने की आवश्यकता होगी।",
      confirmBooking: "बुकिंग की पुष्टि करें",
      processing: "प्रोसेसिंग...",
      capacityError: "{rooms} कमरे और {beds} अतिरिक्त बेड के लिए अधिकतम {capacity} भुगतान करने वाले अतिथि अनुमत हैं",
      required: "आवश्यक है",
      mobileDigits: "मोबाइल नंबर ठीक 10 अंकों का होना चाहिए",
      validEmail: "कृपया एक वैध ईमेल पता दर्ज करें",
      validAge: "उम्र 1 और 120 के बीच होनी चाहिए",
      aadhaarDigits: "आधार नंबर ठीक 12 अंकों का होना चाहिए",
      drivingLicenseDigits: "ड्राइविंग लाइसेंस नंबर ठीक 16 अंकों का होना चाहिए",
      passportFormat: "पासपोर्ट नंबर 8 अल्फ़ान्यूमेरिक वर्णों का होना चाहिए",
      voterIdFormat: "वोटर आईडी 10 अल्फ़ान्यूमेरिक वर्णों की होनी चाहिए",
      checkInRequired: "चेक-इन तिथि आवश्यक है",
      checkOutRequired: "चेक-आउट तिथि आवश्यक है",
      checkOutAfter: "चेक-आउट तिथि चेक-इन तिथि के बाद होनी चाहिए",
      childAgeRequired: "बच्चे {index} के लिए उम्र आवश्यक है",
      childAgeRange: "बच्चे की उम्र 1-12 वर्ष के बीच होनी चाहिए",
      maxStayError: "अधिकतम {maxNights} रातों का स्टे अनुमत है"
    }
  };

  const t = translations[language];

  // Calculate total paying guests (children above 4 count, below 4 don't count)
  const calculatePayingGuests = () => {
    const payingChildren = formData.childAges.filter(age => age > CHILD_AGE_LIMIT).length;
    return formData.adults + payingChildren;
  };

  // Calculate maximum guests allowed based on rooms and extra beds
  const calculateMaxGuests = () => {
    const standardCapacity = formData.numRooms * MAX_GUESTS_PER_ROOM;
    const extraBedCapacity = formData.extraBeds; // Each extra bed adds 1 capacity
    return standardCapacity + extraBedCapacity;
  };

  // Calculate total guests and validate room capacity
  useEffect(() => {
    const payingGuests = calculatePayingGuests();
    const maxCapacity = calculateMaxGuests();
    
    if (payingGuests > maxCapacity) {
      setErrors(prev => ({
        ...prev,
        capacity: t.capacityError
          .replace('{capacity}', maxCapacity)
          .replace('{rooms}', formData.numRooms)
          .replace('{beds}', formData.extraBeds)
      }));
    } else if (errors.capacity) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.capacity;
        return newErrors;
      });
    }
  }, [formData.adults, formData.children, formData.numRooms, formData.childAges, formData.extraBeds, t]);

  // Price calculation
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate - checkInDate;
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      if (nights > 0) {
        // Validate maximum stay
        if (nights > MAX_STAY_NIGHTS) {
          setErrors(prev => ({
            ...prev,
            maxStay: t.maxStayError.replace('{maxNights}', MAX_STAY_NIGHTS)
          }));
          setNumNights(0);
          setTotalPrice(0);
          return;
        } else if (errors.maxStay) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.maxStay;
            return newErrors;
          });
        }
        
        setNumNights(nights);
        const roomCost = ROOM_PRICE * formData.numRooms * nights;
        const extraBedCost = EXTRA_BED_PRICE * formData.extraBeds * nights;
        setTotalPrice(roomCost + extraBedCost);
      } else {
        setNumNights(0);
        setTotalPrice(0);
      }
    } else {
      setNumNights(0);
      setTotalPrice(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.numRooms, formData.extraBeds, t]);

  // Initialize child ages when children count changes
  useEffect(() => {
    if (formData.children > formData.childAges.length) {
      const newChildAges = [...formData.childAges];
      while (newChildAges.length < formData.children) {
        newChildAges.push('');
      }
      setFormData(prev => ({ ...prev, childAges: newChildAges }));
    } else if (formData.children < formData.childAges.length) {
      const newChildAges = formData.childAges.slice(0, formData.children);
      setFormData(prev => ({ ...prev, childAges: newChildAges }));
    }
  }, [formData.children]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('guest-')) {
      const [_, index, field] = name.split('-');
      const newGuests = [...formData.guests];
      
      if (field === 'idNumber') {
        // Different validation based on ID type
        const currentIdType = newGuests[index].idType;
        
        if (currentIdType === 'Aadhaar' || currentIdType === 'Driving License') {
          // Only allow numbers for Aadhaar and Driving License
          const numbersOnly = value.replace(/\D/g, '');
          let maxLength = currentIdType === 'Aadhaar' ? 12 : 16;
          
          if (numbersOnly.length <= maxLength) {
            newGuests[index][field] = numbersOnly;
          }
        } else {
          // Allow alphanumeric for Passport and Voter ID
          const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, '');
          let maxLength = currentIdType === 'Passport' ? 8 : 10;
          
          if (alphanumeric.length <= maxLength) {
            newGuests[index][field] = alphanumeric.toUpperCase();
          }
        }
      } else {
        newGuests[index][field] = value;
      }
      
      setFormData(prev => ({ ...prev, guests: newGuests }));
    } else if (name.startsWith('childAge-')) {
      const index = parseInt(name.split('-')[1]);
      const newChildAges = [...formData.childAges];
      newChildAges[index] = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        childAges: newChildAges
      }));
    } else if (name === 'mobile') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numbersOnly
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newGuests = [...formData.guests];
      newGuests[index].idImage = file;
      setFormData(prev => ({ ...prev, guests: newGuests }));
    }
  };

  const handleNumberChange = (name, value) => {
    const numValue = parseInt(value) || 0;
    const payingGuests = calculatePayingGuests();
    const maxCapacity = calculateMaxGuests();
    
    if (name === 'numRooms') {
      if (numValue >= 1 && numValue <= MAX_ROOMS) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
        
        // Adjust extra beds if they exceed maximum possible
        const maxExtraBeds = numValue; // Max 1 extra bed per room
        if (formData.extraBeds > maxExtraBeds) {
          setFormData(prev => ({ ...prev, extraBeds: maxExtraBeds }));
        }

        // Adjust adults if they exceed new capacity
        const newMaxAdults = (numValue * MAX_GUESTS_PER_ROOM) + formData.extraBeds;
        if (formData.adults > newMaxAdults) {
          setFormData(prev => ({ ...prev, adults: newMaxAdults }));
        }
      }
    } else if (name === 'adults') {
      const maxAdults = (formData.numRooms * MAX_GUESTS_PER_ROOM) + formData.extraBeds;
      if (numValue >= 1 && numValue <= maxAdults) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    } else if (name === 'children') {
      if (numValue >= 0 && numValue <= 5) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    } else if (name === 'extraBeds') {
      const maxExtraBeds = formData.numRooms; // Max 1 extra bed per room
      const maxAdults = (formData.numRooms * MAX_GUESTS_PER_ROOM) + numValue;
      
      if (numValue >= 0 && numValue <= maxExtraBeds) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
        
        // Adjust adults if they exceed new capacity
        if (formData.adults > maxAdults) {
          setFormData(prev => ({ ...prev, adults: maxAdults }));
        }
      }
    }
  };

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -100; // Adjust for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      element.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const payingGuests = calculatePayingGuests();
    const maxCapacity = calculateMaxGuests();

    // Validate primary guest information only
    const primaryGuest = formData.guests[0];
    if (!primaryGuest.fullName.trim()) newErrors[`guest-0-fullName`] = `${t.fullName} ${t.required}`;
    if (!primaryGuest.age) newErrors[`guest-0-age`] = `${t.age} ${t.required}`;
    if (!primaryGuest.gender) newErrors[`guest-0-gender`] = `${t.gender} ${t.required}`;
    if (!primaryGuest.mobile.trim()) newErrors[`guest-0-mobile`] = `${t.mobile} ${t.required}`;
    if (!primaryGuest.address.trim()) newErrors[`guest-0-address`] = `${t.address} ${t.required}`;

    if (primaryGuest.mobile && !/^\d{10}$/.test(primaryGuest.mobile)) {
      newErrors[`guest-0-mobile`] = t.mobileDigits;
    }

    if (primaryGuest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(primaryGuest.email)) {
      newErrors[`guest-0-email`] = t.validEmail;
    }

    if (primaryGuest.age && (primaryGuest.age < 1 || primaryGuest.age > 120)) {
      newErrors[`guest-0-age`] = t.validAge;
    }

    // ID validation is now optional, but if provided, validate format
    if (primaryGuest.idNumber.trim()) {
      if (primaryGuest.idType === 'Aadhaar' && !/^\d{12}$/.test(primaryGuest.idNumber)) {
        newErrors[`guest-0-idNumber`] = t.aadhaarDigits;
      } else if (primaryGuest.idType === 'Driving License' && !/^\d{16}$/.test(primaryGuest.idNumber)) {
        newErrors[`guest-0-idNumber`] = t.drivingLicenseDigits;
      } else if (primaryGuest.idType === 'Passport' && !/^[A-Z0-9]{8}$/.test(primaryGuest.idNumber)) {
        newErrors[`guest-0-idNumber`] = t.passportFormat;
      } else if (primaryGuest.idType === 'Voter ID' && !/^[A-Z0-9]{10}$/.test(primaryGuest.idNumber)) {
        newErrors[`guest-0-idNumber`] = t.voterIdFormat;
      }
    }

    if (!formData.checkIn) newErrors.checkIn = t.checkInRequired;
    if (!formData.checkOut) newErrors.checkOut = t.checkOutRequired;

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = t.checkOutAfter;
      }
      
      // Validate maximum stay
      const timeDiff = checkOutDate - checkInDate;
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (nights > MAX_STAY_NIGHTS) {
        newErrors.maxStay = t.maxStayError.replace('{maxNights}', MAX_STAY_NIGHTS);
      }
    }

    if (payingGuests > maxCapacity) {
      newErrors.capacity = t.capacityError
        .replace('{capacity}', maxCapacity)
        .replace('{rooms}', formData.numRooms)
        .replace('{beds}', formData.extraBeds);
    }

    formData.childAges.forEach((age, index) => {
      if (!age) {
        newErrors[`childAge-${index}`] = t.childAgeRequired.replace('{index}', index + 1);
      } else if (age < 1 || age > 12) {
        newErrors[`childAge-${index}`] = t.childAgeRange;
      }
    });

    setErrors(newErrors);
    
    // Scroll to first error if any
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      let elementId = '';
      
      if (firstErrorKey.startsWith('guest-')) {
        const [_, index, field] = firstErrorKey.split('-');
        elementId = `guest-${index}-${field}`;
      } else if (firstErrorKey.startsWith('childAge-')) {
        elementId = firstErrorKey;
      } else {
        elementId = firstErrorKey;
      }
      
      setTimeout(() => scrollToElement(elementId), 100);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const payingGuests = calculatePayingGuests();
      onSubmit({
        ...formData,
        totalPrice,
        numNights,
        bookingId: 'DERA-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        totalGuests: payingGuests,
        payingGuests: payingGuests,
        childAges: formData.childAges
      });
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxCheckOutDate = () => {
    if (!formData.checkIn) return '';
    const maxDate = new Date(formData.checkIn);
    maxDate.setDate(maxDate.getDate() + MAX_STAY_NIGHTS);
    return maxDate.toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    return formData.checkIn ? new Date(new Date(formData.checkIn).getTime() + 86400000).toISOString().split('T')[0] : getTomorrowDate();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const payingGuests = calculatePayingGuests();
  const childrenBelow4 = formData.childAges.filter(age => age <= CHILD_AGE_LIMIT).length;
  const maxExtraBeds = formData.numRooms; // Max 1 extra bed per room
  const maxAdults = (formData.numRooms * MAX_GUESTS_PER_ROOM) + formData.extraBeds;

  return (
    <div className="booking-page">
      <Header />
      
      <main className="booking-main">
        <div className="booking-container">
          <div className="booking-card">
            <div className="card-header">
              <h2>{t.bookYourStay}</h2>
              <p className="subtitle">{t.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="booking-form">
              {/* Room & Guests Information */}
              <section className="form-section" id="room-guests-section">
                <div className="section-header">
                  <h3>{t.roomGuestsInfo}</h3>
                </div>
                
                <div className="guest-summary">
                  <div className="summary-item">
                    <span className="summary-label">{t.payingGuests}:</span>
                    <span className="summary-value">{payingGuests}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">{t.totalRooms}:</span>
                    <span className="summary-value">{formData.numRooms}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">{t.extraBeds}:</span>
                    <span className="summary-value-extra">{formData.extraBeds}</span>
                  </div>
                  {childrenBelow4 > 0 && (
                    <div className="summary-item">
                      <span className="summary-label">{t.childrenFree}:</span>
                      <span className="summary-value-free">{childrenBelow4}</span>
                    </div>
                  )}
                </div>

                {errors.capacity && (
                  <div className="error-message-full">
                    {errors.capacity}
                  </div>
                )}

                {errors.maxStay && (
                  <div className="error-message-full">
                    {errors.maxStay}
                  </div>
                )}

                <div className="form-grid compact">
                  <div className="form-group">
                    <label htmlFor="numRooms">{t.numberRooms}</label>
                    <div className="number-input-wrapper">
                      <button 
                        type="button" 
                        className="number-btn minus"
                        onClick={() => handleNumberChange('numRooms', formData.numRooms - 1)}
                        disabled={formData.numRooms <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="numRooms"
                        name="numRooms"
                        value={formData.numRooms}
                        onChange={(e) => handleNumberChange('numRooms', e.target.value)}
                        min="1"
                        max={MAX_ROOMS}
                        className="number-input"
                        readOnly
                      />
                      <button 
                        type="button" 
                        className="number-btn plus"
                        onClick={() => handleNumberChange('numRooms', formData.numRooms + 1)}
                        disabled={formData.numRooms >= MAX_ROOMS}
                      >
                        +
                      </button>
                    </div>
                    <div className="input-hint">{t.maxRooms.replace('{max}', MAX_ROOMS)}</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="adults">{t.adults}</label>
                    <div className="number-input-wrapper">
                      <button 
                        type="button" 
                        className="number-btn minus"
                        onClick={() => handleNumberChange('adults', formData.adults - 1)}
                        disabled={formData.adults <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="adults"
                        name="adults"
                        value={formData.adults}
                        onChange={(e) => handleNumberChange('adults', e.target.value)}
                        min="1"
                        max={maxAdults}
                        className="number-input"
                        readOnly
                      />
                      <button 
                        type="button" 
                        className="number-btn plus"
                        onClick={() => handleNumberChange('adults', formData.adults + 1)}
                        disabled={formData.adults >= maxAdults}
                      >
                        +
                      </button>
                    </div>
                    <div className="input-hint">{t.maxAdults.replace('{max}', maxAdults)}</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="children">{t.children}</label>
                    <div className="number-input-wrapper">
                      <button 
                        type="button" 
                        className="number-btn minus"
                        onClick={() => handleNumberChange('children', formData.children - 1)}
                        disabled={formData.children <= 0}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="children"
                        name="children"
                        value={formData.children}
                        onChange={(e) => handleNumberChange('children', e.target.value)}
                        min="0"
                        max="5"
                        className="number-input"
                        readOnly
                      />
                      <button 
                        type="button" 
                        className="number-btn plus"
                        onClick={() => handleNumberChange('children', formData.children + 1)}
                        disabled={formData.children >= 5}
                      >
                        +
                      </button>
                    </div>
                    <div className="input-hint">{t.ageBelowFree}</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="extraBeds">{t.extraBedsLabel}</label>
                    <div className="number-input-wrapper">
                      <button 
                        type="button" 
                        className="number-btn minus"
                        onClick={() => handleNumberChange('extraBeds', formData.extraBeds - 1)}
                        disabled={formData.extraBeds <= 0}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="extraBeds"
                        name="extraBeds"
                        value={formData.extraBeds}
                        onChange={(e) => handleNumberChange('extraBeds', e.target.value)}
                        min="0"
                        max={maxExtraBeds}
                        className="number-input"
                        readOnly
                      />
                      <button 
                        type="button" 
                        className="number-btn plus"
                        onClick={() => handleNumberChange('extraBeds', formData.extraBeds + 1)}
                        disabled={formData.extraBeds >= maxExtraBeds}
                      >
                        +
                      </button>
                    </div>
                    <div className="input-hint">{t.perNightMax}</div>
                  </div>
                </div>

                {/* Child Age Inputs */}
                {formData.children > 0 && (
                  <div className="child-ages-section">
                    <h4>{t.childrenAges}</h4>
                    <div className="child-ages-grid">
                      {formData.childAges.map((age, index) => (
                        <div key={index} className="form-group">
                          <label htmlFor={`childAge-${index}`}>
                            {t.childAge.replace('{index}', index + 1)}
                            {age <= CHILD_AGE_LIMIT && <span className="free-badge">{language === 'english' ? 'Free' : 'मुफ्त'}</span>}
                          </label>
                          <input
                            type="number"
                            id={`childAge-${index}`}
                            name={`childAge-${index}`}
                            value={age}
                            onChange={handleInputChange}
                            className={errors[`childAge-${index}`] ? 'error' : ''}
                            placeholder={language === 'english' ? 'Age' : 'उम्र'}
                            min="1"
                            max="12"
                          />
                          {errors[`childAge-${index}`] && (
                            <span className="error-text">{errors[`childAge-${index}`]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="capacity-info">
                  {t.capacityInfo
                    .replace('{maxPerRoom}', MAX_GUESTS_PER_ROOM)
                    .replace('{maxWithExtra}', MAX_GUESTS_WITH_EXTRA_BED)
                    .replace('{ageLimit}', CHILD_AGE_LIMIT)
                  }
                </div>
              </section>

              {/* Primary Guest Information Only */}
              <section className="form-section guest-section" id="guest-section-0">
                <div className="section-header">
                  <h3>
                    {t.primaryGuestInfo}
                    <span className="primary-badge">{t.primary}</span>
                  </h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="guest-0-fullName">{t.fullName}</label>
                    <input
                      type="text"
                      id="guest-0-fullName"
                      name="guest-0-fullName"
                      value={formData.guests[0].fullName}
                      onChange={handleInputChange}
                      className={errors[`guest-0-fullName`] ? 'error' : ''}
                      placeholder={t.enterFullName}
                    />
                    {errors[`guest-0-fullName`] && <span className="error-text">{errors[`guest-0-fullName`]}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-age">{t.age}</label>
                    <input
                      type="number"
                      id="guest-0-age"
                      name="guest-0-age"
                      value={formData.guests[0].age}
                      onChange={handleInputChange}
                      className={errors[`guest-0-age`] ? 'error' : ''}
                      placeholder={t.enterAge}
                      min="1"
                      max="120"
                    />
                    {errors[`guest-0-age`] && <span className="error-text">{errors[`guest-0-age`]}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-gender">{t.gender}</label>
                    <div className="custom-select">
                      <select
                        id="guest-0-gender"
                        name="guest-0-gender"
                        value={formData.guests[0].gender}
                        onChange={handleInputChange}
                        className={errors[`guest-0-gender`] ? 'error' : ''}
                      >
                        <option value="">{t.selectGender}</option>
                        <option value="Male">{t.male}</option>
                        <option value="Female">{t.female}</option>
                        <option value="Other">{t.other}</option>
                      </select>
                      <span className="select-arrow">▼</span>
                    </div>
                    {errors[`guest-0-gender`] && <span className="error-text">{errors[`guest-0-gender`]}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-mobile">{t.mobile}</label>
                    <div className="input-with-prefix">
                      <span className="prefix">+91</span>
                      <input
                        type="tel"
                        id="guest-0-mobile"
                        name="guest-0-mobile"
                        value={formData.guests[0].mobile}
                        onChange={handleInputChange}
                        className={errors[`guest-0-mobile`] ? 'error' : ''}
                        placeholder={t.mobilePlaceholder}
                        maxLength="10"
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                    </div>
                    {errors[`guest-0-mobile`] && <span className="error-text">{errors[`guest-0-mobile`]}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-email">{t.email}</label>
                    <input
                      type="email"
                      id="guest-0-email"
                      name="guest-0-email"
                      value={formData.guests[0].email}
                      onChange={handleInputChange}
                      className={errors[`guest-0-email`] ? 'error' : ''}
                      placeholder={t.emailPlaceholder}
                    />
                    {errors[`guest-0-email`] && <span className="error-text">{errors[`guest-0-email`]}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-idType">{t.idType}</label>
                    <div className="custom-select">
                      <select
                        id="guest-0-idType"
                        name="guest-0-idType"
                        value={formData.guests[0].idType}
                        onChange={handleInputChange}
                      >
                        <option value="Aadhaar">{language === 'english' ? 'Aadhaar Card' : 'आधार कार्ड'}</option>
                        <option value="Driving License">{language === 'english' ? 'Driving License' : 'ड्राइविंग लाइसेंस'}</option>
                        <option value="Passport">{language === 'english' ? 'Passport' : 'पासपोर्ट'}</option>
                        <option value="Voter ID">{language === 'english' ? 'Voter ID' : 'वोटर आईडी'}</option>
                      </select>
                      <span className="select-arrow">▼</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="guest-0-idNumber">
                      {t.idNumber.replace('{type}', formData.guests[0].idType)}
                    </label>
                    <input
                      type="text"
                      id="guest-0-idNumber"
                      name="guest-0-idNumber"
                      value={formData.guests[0].idNumber}
                      onChange={handleInputChange}
                      className={errors[`guest-0-idNumber`] ? 'error' : ''}
                      placeholder={
                        formData.guests[0].idType === 'Aadhaar' ? t.aadhaarPlaceholder :
                        formData.guests[0].idType === 'Driving License' ? t.drivingLicensePlaceholder :
                        formData.guests[0].idType === 'Passport' ? t.passportPlaceholder :
                        t.voterIdPlaceholder
                      }
                      maxLength={
                        formData.guests[0].idType === 'Aadhaar' ? 12 :
                        formData.guests[0].idType === 'Driving License' ? 16 :
                        formData.guests[0].idType === 'Passport' ? 8 : 10
                      }
                      pattern={
                        formData.guests[0].idType === 'Aadhaar' || formData.guests[0].idType === 'Driving License' 
                          ? "[0-9]*" 
                          : "[A-Z0-9]*"
                      }
                      inputMode={
                        formData.guests[0].idType === 'Aadhaar' || formData.guests[0].idType === 'Driving License' 
                          ? "numeric" 
                          : "text"
                      }
                    />
                    {errors[`guest-0-idNumber`] && <span className="error-text">{errors[`guest-0-idNumber`]}</span>}
                  </div>

                  {/* ID Image Upload - Optional for primary guest */}
                  <div className="form-group full-width">
                    <label htmlFor="guest-0-idImage">
                      {t.idImage}
                    </label>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="guest-0-idImage"
                        name="guest-0-idImage"
                        onChange={(e) => handleFileChange(e, 0)}
                        accept="image/*"
                        className={errors[`guest-0-idImage`] ? 'error' : ''}
                      />
                      <label htmlFor="guest-0-idImage" className="file-upload-label">
                        {formData.guests[0].idImage ? formData.guests[0].idImage.name : t.chooseIdImage}
                      </label>
                    </div>
                    {errors[`guest-0-idImage`] && (
                      <span className="error-text">{errors[`guest-0-idImage`]}</span>
                    )}
                    <div className="file-hint">
                      <strong>{language === 'english' ? 'Note:' : 'नोट:'}</strong> {t.idNote}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="guest-0-address">{t.address}</label>
                    <textarea
                      id="guest-0-address"
                      name="guest-0-address"
                      value={formData.guests[0].address}
                      onChange={handleInputChange}
                      className={errors[`guest-0-address`] ? 'error' : ''}
                      placeholder={t.addressPlaceholder}
                      rows="3"
                    />
                    {errors[`guest-0-address`] && <span className="error-text">{errors[`guest-0-address`]}</span>}
                  </div>
                </div>
              </section>

              {/* Booking Dates */}
              <section className="form-section" id="booking-dates-section">
                <div className="section-header">
                  <h3>{t.bookingDates}</h3>
                </div>
                
                <div className="date-inputs-modern">
                  <div className="date-input-group">
                    <label htmlFor="checkIn">{t.checkIn}</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className={errors.checkIn ? 'error' : ''}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {formData.checkIn && (
                        <span className="selected-date">{formatDate(formData.checkIn)}</span>
                      )}
                    </div>
                    {errors.checkIn && <span className="error-text">{errors.checkIn}</span>}
                  </div>

                  <div className="date-input-group">
                    <label htmlFor="checkOut">{t.checkOut}</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className={errors.checkOut ? 'error' : ''}
                        min={getMinCheckOutDate()}
                        max={getMaxCheckOutDate()}
                      />
                      {formData.checkOut && (
                        <span className="selected-date">{formatDate(formData.checkOut)}</span>
                      )}
                    </div>
                    {errors.checkOut && <span className="error-text">{errors.checkOut}</span>}
                  </div>
                </div>

                {formData.checkIn && formData.checkOut && numNights > 0 && (
                  <div className="stay-duration">
                    <span>
                      {t.nightStay
                        .replace('{nights}', numNights)
                        .replace('{s}', numNights > 1 ? (language === 'english' ? 's' : 'ें') : '')
                      }
                    </span>
                  </div>
                )}
              </section>

              {/* Price Calculation */}
              <section className="form-section price-section" id="price-section">
                <div className="section-header">
                  <h3>{t.priceDetails}</h3>
                </div>
                <div className="price-details">
                  <div className="price-row">
                    <span>{t.roomPrice}</span>
                    <span>₹{ROOM_PRICE} × {formData.numRooms} {language === 'english' ? 'room(s)' : 'कमरे'}</span>
                  </div>
                  {formData.extraBeds > 0 && (
                    <div className="price-row">
                      <span>{t.extraBedsPrice}</span>
                      <span>₹{EXTRA_BED_PRICE} × {formData.extraBeds}</span>
                    </div>
                  )}
                  <div className="price-row">
                    <span>{t.numberOfNights}</span>
                    <span>{numNights}</span>
                  </div>
                  {childrenBelow4 > 0 && (
                    <div className="price-row discount">
                      <span>{t.childrenFreePrice}</span>
                      <span>{childrenBelow4} {language === 'english' ? 'child' : 'बच्चा'}{childrenBelow4 > 1 ? (language === 'english' ? 'ren' : 'े') : ''}</span>
                    </div>
                  )}
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span>{t.totalAmount}</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </section>

              {/* Payment Options */}
              <section className="form-section" id="payment-section">
                <div className="section-header">
                  <h3>{t.paymentOptions}</h3>
                </div>
                <div className="payment-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="payOnVisit"
                      checked={formData.paymentMethod === 'payOnVisit'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    <div className="radio-content">
                      <span className="radio-title">{t.payOnVisit}</span>
                      <span className="radio-description">{t.payOnVisitDesc}</span>
                    </div>
                  </label>
                  
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="scanToPay"
                      checked={formData.paymentMethod === 'scanToPay'}
                      onChange={handleInputChange}
                    />
                    <span className="radio-custom"></span>
                    <div className="radio-content">
                      <span className="radio-title">{t.scanToPay}</span>
                      <span className="radio-description">{t.scanToPayDesc}</span>
                    </div>
                  </label>

                  {formData.paymentMethod === 'scanToPay' && (
                    <div className="qr-code-section">
                      <div className="qr-placeholder">
                        <div className="qr-text">{t.qrPlaceholder}</div>
                        <p>{t.qrInstruction}</p>
                        <p className="qr-note">
                          <strong>{language === 'english' ? 'Important:' : 'महत्वपूर्ण:'}</strong> {t.qrNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Submit Button */}
              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      {t.processing}
                    </>
                  ) : (
                    t.confirmBooking
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default BookingPage;