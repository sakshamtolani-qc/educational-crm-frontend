import React, { useState } from 'react';
import { GraduationCap, Users, BarChart3, BookOpen, Eye, EyeOff } from 'lucide-react';
import './SignupPage.css';


interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeToTerms: boolean;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const checked = e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
      ? e.target.checked
      : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      console.log('Form submitted:', formData);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-left-section">
          <div className="signup-brand">
            <div className="brand-logo">
                <img src="./logo.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain'}} />
              </div>

            <h1 className="signup-brand-title">Educational CRM</h1>
          </div>

          <div className="signup-hero-content">
            <h2 className="signup-hero-title">Join Thousands of Educators Worldwide</h2>
            <p className="signup-hero-description">
              Experience the future of education management with our comprehensive platform
              designed to streamline operations and enhance learning outcomes.
            </p>

            <div className="signup-features">
              <div className="signup-feature-item">
                <div className="signup-feature-icon">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="signup-feature-title">Student Management</h3>
                  <p className="signup-feature-text">Complete lifecycle tracking from enrollment to graduation</p>
                </div>
              </div>

              <div className="signup-feature-item">
                <div className="signup-feature-icon">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="signup-feature-title">Analytics & Insights</h3>
                  <p className="signup-feature-text">Real-time performance metrics and actionable data</p>
                </div>
              </div>

              <div className="signup-feature-item">
                <div className="signup-feature-icon">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="signup-feature-title">Course Management</h3>
                  <p className="signup-feature-text">Organize and deliver content with ease</p>
                </div>
              </div>
            </div>

            <div className="signup-stats-section">
              <div className="signup-stat-item">
                <div className="signup-stat-value">10K+</div>
                <div className="signup-stat-label">Active Users</div>
              </div>
              <div className="signup-stat-divider"></div>
              <div className="signup-stat-item">
                <div className="signup-stat-value">500+</div>
                <div className="signup-stat-label">Institutions</div>
              </div>
              <div className="signup-stat-divider"></div>
              <div className="signup-stat-item">
                <div className="signup-stat-value">98%</div>
                <div className="signup-stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <div className="signup-right-section">
          <div className="signup-form-container">
            <div className="signup-form-header">
              <h2 className="signup-form-title">Create Your Account</h2>
              <p className="signup-form-subtitle">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="fullName" className="signup-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`signup-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="signup-form-group">
                <label htmlFor="email" className="signup-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`signup-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="signup-form-group">
                <label htmlFor="role" className="signup-label">
                  Role <span className="required">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`signup-input ${errors.role ? 'input-error' : ''}`}
                >
                  <option value="">Select your role</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Administrator</option>
                </select>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>

              <div className="signup-form-group">
                <label htmlFor="password" className="signup-label">
                  Password <span className="required">*</span>
                </label>
                <div className="signup-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`signup-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="signup-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="signup-form-group">
                <label htmlFor="confirmPassword" className="signup-label">
                  Confirm Password <span className="required">*</span>
                </label>
                <div className="signup-password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`signup-input ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="signup-toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="signup-form-group checkbox-group">
                <label className="signup-checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="signup-checkbox-input"
                  />
                  <span className="signup-checkbox-text">
                    I agree to the <a href="/terms" className="signup-link">Terms & Conditions</a> and{' '}
                    <a href="/privacy" className="signup-link">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button type="submit" className="signup-submit-button" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="signup-footer-text">
                Already have an account?{' '}
                <a href="/login" className="signup-link">
                  Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
