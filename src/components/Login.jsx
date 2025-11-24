import React, { useState } from 'react';
import '../styles/AuthPages.css';

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
              <h2>Login</h2>
              <p className="subtitle">Enter your phone number and password to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
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

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-options">
                <button 
                  type="button" 
                  className="text-button"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
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
                      Logging In...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    className="text-button"
                    onClick={handleSignUp}
                  >
                    Sign Up
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