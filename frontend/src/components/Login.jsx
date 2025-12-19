import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('admin'); // admin or labour
  const { login } = useAuth();
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
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-split-screen">
      <div className="auth-intro-side">
        <div className="intro-content">
          <div className="intro-brand">
            <div className="logo-box">LC</div>
            <h3>Labour Compliance</h3>
          </div>
          <h1>Manage Compliance with Confidence.</h1>
          <p>Streamline your organization's labour law obligations, reduce risk, and ensuring 100% compliance with our advanced tracking system.</p>

          <div className="intro-features">
            <div className="intro-feature-item">
              <span className="feature-icon">🛡️</span>
              <span>Enterprise-grade Security</span>
            </div>
            <div className="intro-feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-time Updates</span>
            </div>
            <div className="intro-feature-item">
              <span className="feature-icon">📊</span>
              <span>Audit-ready Reports</span>
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
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <div className="login-type-toggle">
            <button
              className={`toggle-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => setLoginType('admin')}
              type="button"
            >
              Admin / Manager
            </button>
            <button
              className={`toggle-btn ${loginType === 'labour' ? 'active' : ''}`}
              onClick={() => setLoginType('labour')}
              type="button"
            >
              Labour / Employee
            </button>
          </div>

          <form onSubmit={handleSubmit} className="professional-form">
            {error && <div className="form-error">{error}</div>}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="form-extras">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="pro-btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Create free account</Link>
          </p>

          <div className="demo-credentials-box">
            <p className="demo-label">Demo Credentials:</p>
            {loginType === 'admin' ? (
              <code className="demo-code">admin@example.com / admin123</code>
            ) : (
              <code className="demo-code">employee@example.com / employee123</code>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
