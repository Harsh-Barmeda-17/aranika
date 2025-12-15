import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import '../styles/AuthPages.css';

const ForgotPassword = ({ onNavigate }) => {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Language translations
  const translations = {
    english: {
      title: "Reset Password",
      phoneSubtitle: "Enter your phone number to reset your password",
      otpSubtitle: "Enter the OTP sent to your phone",
      phoneLabel: "Phone Number *",
      phonePlaceholder: "10-digit mobile number",
      otpLabel: "Enter OTP *",
      otpPlaceholder: "6-digit OTP",
      otpHint: "OTP sent to +91 ",
      sendOtpButton: "Send OTP",
      verifyOtpButton: "Verify OTP",
      sendingOtp: "Sending OTP...",
      verifying: "Verifying...",
      rememberPassword: "Remember your password?",
      login: "Login",
      required: "is required",
      phoneDigits: "Phone number must be exactly 10 digits",
      otpDigits: "OTP must be exactly 6 digits"
    },
    hindi: {
      title: "पासवर्ड रीसेट करें",
      phoneSubtitle: "अपना पासवर्ड रीसेट करने के लिए अपना फोन नंबर दर्ज करें",
      otpSubtitle: "आपके फोन पर भेजे गए ओटीपी को दर्ज करें",
      phoneLabel: "फोन नंबर *",
      phonePlaceholder: "10-अंकीय मोबाइल नंबर",
      otpLabel: "ओटीपी दर्ज करें *",
      otpPlaceholder: "6-अंकीय ओटीपी",
      otpHint: "ओटीपी भेजा गया +91 ",
      sendOtpButton: "ओटीपी भेजें",
      verifyOtpButton: "ओटीपी सत्यापित करें",
      sendingOtp: "ओटीपी भेजा जा रहा है...",
      verifying: "सत्यापित किया जा रहा है...",
      rememberPassword: "पासवर्ड याद आ गया?",
      login: "लॉगिन",
      required: "आवश्यक है",
      phoneDigits: "फोन नंबर ठीक 10 अंकों का होना चाहिए",
      otpDigits: "ओटीपी ठीक 6 अंकों का होना चाहिए"
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numbersOnly
        }));
      }
    } else if (name === 'otp') {
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 6) {
        setOtp(numbersOnly);
      }
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePhone = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = `${t.phoneLabel} ${t.required}`;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = t.phoneDigits;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = `${t.otpLabel} ${t.required}`;
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = t.otpDigits;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (validatePhone()) {
      setIsSubmitting(true);
      
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOtpSent(true);
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (validateOtp()) {
      setIsSubmitting(true);
      
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('OTP Verified:', otp);
      setIsSubmitting(false);
      
      // Redirect to login after successful password reset
      if (onNavigate) {
        onNavigate('login');
      }
    }
  };

  const handleLogin = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="card-header">
              <h2>{t.title}</h2>
              <p className="subtitle">
                {otpSent ? t.otpSubtitle : t.phoneSubtitle}
              </p>
            </div>
            
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="auth-form">
              {!otpSent ? (
                <>
                  <div className="form-group">
                    <label htmlFor="phone">{t.phoneLabel}</label>
                    <div className="input-with-prefix">
                      <span className="prefix">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder={t.phonePlaceholder}
                        maxLength="10"
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          {t.sendingOtp}
                        </>
                      ) : (
                        t.sendOtpButton
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="otp">{t.otpLabel}</label>
                    <input
                      type="tel"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleInputChange}
                      className={errors.otp ? 'error' : ''}
                      placeholder={t.otpPlaceholder}
                      maxLength="6"
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                    {errors.otp && <span className="error-text">{errors.otp}</span>}
                    <div className="otp-hint">
                      {t.otpHint}{formData.phone}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          {t.verifying}
                        </>
                      ) : (
                        t.verifyOtpButton
                      )}
                    </button>
                  </div>
                </>
              )}

              <div className="auth-footer">
                <p>
                  {t.rememberPassword}{' '}
                  <button 
                    type="button" 
                    className="text-button"
                    onClick={handleLogin}
                  >
                    {t.login}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;