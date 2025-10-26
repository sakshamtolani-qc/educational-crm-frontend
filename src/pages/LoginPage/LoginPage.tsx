import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { toast } from "@/utils/sonner";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    return !!localStorage.getItem("rememberedEmail");
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (rememberMe) {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  }, [rememberMe]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (data.role === "ADMIN") {
        toast.success("Login successful! Welcome Admin.");
        navigate("/dashboard");
      } else {
        toast.error("You are not an admin!");
        localStorage.clear();
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left-section">
          <div className="login-brand">
            <img src="/logo.png" alt="Logo" className="login-logo" />
            <h1 className="login-brand-title">Educational CRM</h1>
          </div>

          <div className="login-hero-content">
            <h2 className="login-hero-title">
              Manage Your Educational Journey
            </h2>
            <p className="login-hero-description">
              Streamline student management, track progress, and enhance
              learning outcomes with our comprehensive CRM solution designed
              specifically for educational institutions.
            </p>

            <div className="login-features">
              <div className="login-feature-item">
                <div className="login-feature-icon">📚</div>
                <div>
                  <h3 className="login-feature-title">Student Management</h3>
                  <p className="login-feature-text">
                    Complete student lifecycle tracking
                  </p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">📊</div>
                <div>
                  <h3 className="login-feature-title">Analytics & Insights</h3>
                  <p className="login-feature-text">
                    Real-time performance metrics
                  </p>
                </div>
              </div>

              <div className="login-feature-item">
                <div className="login-feature-icon">🎓</div>
                <div>
                  <h3 className="login-feature-title">Course Management</h3>
                  <p className="login-feature-text">
                    Organize and deliver content effectively
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right-section">
          <div className="login-form-container">
            <div className="login-form-header">
              <h2 className="login-form-title">Welcome Back</h2>
              <p className="login-form-subtitle">
                Sign in to your account to continue
              </p>
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
                    type={showPassword ? "text" : "password"}
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
                    {showPassword ? (
                      <EyeOff className="login-toggle-icon" />
                    ) : (
                      <Eye className="login-toggle-icon" />
                    )}
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
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <p className="login-signup-text">
                Don't have an account?{" "}
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