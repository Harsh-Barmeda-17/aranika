import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import '../styles/AuthPages.css';

const Login = ({ onNavigate }) => {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Language translations
  const translations = {
    english: {
      title: "Login",
      subtitle: "Enter your phone number and password to access your account",
      phoneLabel: "Phone Number *",
      phonePlaceholder: "10-digit mobile number",
      passwordLabel: "Password *",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot Password?",
      submitButton: "Login",
      submitting: "Logging In...",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      required: "is required",
      phoneDigits: "Phone number must be exactly 10 digits",
      passwordMinLength: "Password must be at least 6 characters"
    },
    hindi: {
      title: "लॉगिन",
      subtitle: "अपने खाते तक पहुंचने के लिए अपना फोन नंबर और पासवर्ड दर्ज करें",
      phoneLabel: "फोन नंबर *",
      phonePlaceholder: "10-अंकीय मोबाइल नंबर",
      passwordLabel: "पासवर्ड *",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      forgotPassword: "पासवर्ड भूल गए?",
      submitButton: "लॉगिन",
      submitting: "लॉगिन हो रहा है...",
      noAccount: "खाता नहीं है?",
      signUp: "साइन अप",
      required: "आवश्यक है",
      phoneDigits: "फोन नंबर ठीक 10 अंकों का होना चाहिए",
      passwordMinLength: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए"
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = `${t.phoneLabel} ${t.required}`;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = t.phoneDigits;
    }

    if (!formData.password) {
      newErrors.password = `${t.passwordLabel} ${t.required}`;
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login Data:', formData);
      setIsSubmitting(false);
      
      // Redirect to home or dashboard after successful login
      if (onNavigate) {
        onNavigate('home');
      }
    }
  };

  const handleForgotPassword = () => {
    if (onNavigate) {
      onNavigate('forgotpassword');
    }
  };

  const handleSignUp = () => {
    if (onNavigate) {
      onNavigate('signup');
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="card-header">
              <h2>{t.title}</h2>
              <p className="subtitle">{t.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
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

              <div className="form-group">
                <label htmlFor="password">{t.passwordLabel}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder={t.passwordPlaceholder}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-options">
                <button 
                  type="button" 
                  className="text-button"
                  onClick={handleForgotPassword}
                >
                  {t.forgotPassword}
                </button>
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
                      {t.submitting}
                    </>
                  ) : (
                    t.submitButton
                  )}
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  {t.noAccount}{' '}
                  <button 
                    type="button" 
                    className="text-button"
                    onClick={handleSignUp}
                  >
                    {t.signUp}
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

export default Login;