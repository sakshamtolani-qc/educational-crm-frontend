import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './LoginPage.css';
import { PageLoader } from '@/components/Loader/Loader';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      {/* Full-page loader */}
      
      <div className="login-wrapper">
        <div className="login-left-section">
          <div className="login-brand">
            <img src="/logo.png" alt="Logo" className="login-logo" />
            <h1 className="login-brand-title">Educational CRM</h1>
          </div>

          <div className="login-hero-content">
            <h2 className="login-hero-title">Manage Your Educational Journey</h2>
            <p className="login-hero-description">
              Streamline student management, track progress, and enhance learning outcomes
              with our comprehensive CRM solution designed specifically for educational institutions.
            </p>

            <div className="login-features">
              <div className="login-feature-item">
                <div className="login-feature-icon">📚</div>
                <div>
                  <h3 className="login-feature-title">Student Management</h3>
                  <p className="login-feature-text">Complete student lifecycle tracking</p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">📊</div>
                <div>
                  <h3 className="login-feature-title">Analytics & Insights</h3>
                  <p className="login-feature-text">Real-time performance metrics</p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">🎓</div>
                <div>
                  <h3 className="login-feature-title">Course Management</h3>
                  <p className="login-feature-text">Organize and deliver content effectively</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right-section">
          <div className="login-form-container">
            <div className="login-form-header">
              <h2 className="login-form-title">Welcome Back</h2>
              <p className="login-form-subtitle">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email Address
                </label>
                <div className="login-input-wrapper">
                  <Mail className="login-input-icon" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-password-toggle"
                  >
                    {showPassword ? <EyeOff className="login-toggle-icon" /> : <Eye className="login-toggle-icon" />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="login-checkbox"
                  />
                  <span className="login-checkbox-label">Remember me</span>
                </label>

                <a href="#" className="login-forgot-link">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="login-submit-btn"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="login-divider">
                <span className="login-divider-text">or continue with</span>
              </div>

              <div className="login-social-buttons">
                <button type="button" className="login-social-btn">
                  <img src="/google-icon.png" alt="Google" className="login-social-icon google" />
                  Google
                </button>
                <button type="button" className="login-social-btn">
                  <img src="/microsoft-icon.png" alt="Microsoft" className="login-social-icon" />
                  Microsoft
                </button>
              </div>

              <p className="login-signup-text">
                Don't have an account?{' '}
                <Link to="/signup" className="login-signup-link">
                  Sign up now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
