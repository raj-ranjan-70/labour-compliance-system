import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.department
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-split-screen">
      <div className="auth-intro-side register-mode">
        <div className="intro-content">
          <div className="intro-brand">
            <div className="logo-box">LC</div>
            <h3>Labour Compliance</h3>
          </div>
          <h1>Join the Future of Compliance.</h1>
          <p>Create your account to start automating your labour tracking and ensure seamless legal adherence.</p>

          <div className="intro-features">
            <div className="intro-feature-item">
              <span className="feature-icon">🚀</span>
              <span>Quick Onboarding</span>
            </div>
            <div className="intro-feature-item">
              <span className="feature-icon">🌍</span>
              <span>Multi-Location Support</span>
            </div>
            <div className="intro-feature-item">
              <span className="feature-icon">⚖️</span>
              <span>Latest Legal Acts</span>
            </div>
          </div>
        </div>
        <div className="intro-footer">
          <p>&copy; 2025 Labour Compliance Manager</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="form-wrapper">
          <div className="auth-header-mobile">
            <div className="logo-box-mobile">LC</div>
            <h2>Labour Compliance</h2>
          </div>

          <div className="form-header">
            <h2>Create an Account</h2>
            <p>Enter your details below to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="professional-form">
            {error && <div className="form-error">{error}</div>}

            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="department">Department (Optional)</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. HR, Operations"
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="pro-btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-redirect">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
