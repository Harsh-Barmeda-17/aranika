import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import '../styles/AuthPages.css';

const SignUp = ({ onNavigate }) => {
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Language translations
  const translations = {
    english: {
      title: "Create Account",
      subtitle: "Fill in your details to create your account",
      nameLabel: "Full Name *",
      namePlaceholder: "Enter your full name",
      phoneLabel: "Phone Number *",
      phonePlaceholder: "10-digit mobile number",
      passwordLabel: "Password *",
      passwordPlaceholder: "Create a password (min. 6 characters)",
      confirmPasswordLabel: "Confirm Password *",
      confirmPasswordPlaceholder: "Re-enter your password",
      submitButton: "Create Account",
      submitting: "Creating Account...",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      required: "is required",
      phoneDigits: "Phone number must be exactly 10 digits",
      passwordMinLength: "Password must be at least 6 characters",
      passwordMismatch: "Passwords do not match"
    },
    hindi: {
      title: "खाता बनाएं",
      subtitle: "अपना खाता बनाने के लिए अपना विवरण भरें",
      nameLabel: "पूरा नाम *",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      phoneLabel: "फोन नंबर *",
      phonePlaceholder: "10-अंकीय मोबाइल नंबर",
      passwordLabel: "पासवर्ड *",
      passwordPlaceholder: "पासवर्ड बनाएं (न्यूनतम 6 अक्षर)",
      confirmPasswordLabel: "पासवर्ड की पुष्टि करें *",
      confirmPasswordPlaceholder: "पासवर्ड दोबारा दर्ज करें",
      submitButton: "खाता बनाएं",
      submitting: "खाता बन रहा है...",
      alreadyHaveAccount: "पहले से ही एक खाता है?",
      login: "लॉगिन",
      required: "आवश्यक है",
      phoneDigits: "फोन नंबर ठीक 10 अंकों का होना चाहिए",
      passwordMinLength: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
      passwordMismatch: "पासवर्ड मेल नहीं खाते"
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

    if (!formData.name.trim()) {
      newErrors.name = `${t.nameLabel} ${t.required}`;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = `${t.confirmPasswordLabel} ${t.required}`;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
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
      
      console.log('Sign Up Data:', formData);
      setIsSubmitting(false);
      
      // Redirect to login after successful registration
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
              <p className="subtitle">{t.subtitle}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">{t.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder={t.namePlaceholder}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

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

              <div className="form-group">
                <label htmlFor="confirmPassword">{t.confirmPasswordLabel}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder={t.confirmPasswordPlaceholder}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
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
                  {t.alreadyHaveAccount}{' '}
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

export default SignUp;