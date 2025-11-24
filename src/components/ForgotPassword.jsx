import React, { useState } from 'react';
import '../styles/AuthPages.css';

const ForgotPassword = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

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
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must be exactly 6 digits';
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
              <h2>Reset Password</h2>
              <p className="subtitle">
                {otpSent 
                  ? 'Enter the OTP sent to your phone' 
                  : 'Enter your phone number to reset your password'
                }
              </p>
            </div>
            
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="auth-form">
              {!otpSent ? (
                <>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <div className="input-with-prefix">
                      <span className="prefix">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="10-digit mobile number"
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
                          Sending OTP...
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="otp">Enter OTP *</label>
                    <input
                      type="tel"
                      id="otp"
                      name="otp"
                      value={otp}
                      onChange={handleInputChange}
                      className={errors.otp ? 'error' : ''}
                      placeholder="6-digit OTP"
                      maxLength="6"
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                    {errors.otp && <span className="error-text">{errors.otp}</span>}
                    <div className="otp-hint">
                      OTP sent to +91 {formData.phone}
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
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                  </div>
                </>
              )}

              <div className="auth-footer">
                <p>
                  Remember your password?{' '}
                  <button 
                    type="button" 
                    className="text-button"
                    onClick={handleLogin}
                  >
                    Login
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