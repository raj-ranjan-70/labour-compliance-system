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
  // const [loginType, setLoginType] = useState('admin'); // Removed toggle
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
          <Link to="/" className="intro-brand" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div className="logo-box">LC</div>
            <h3>Labour Compliance</h3>
          </Link>
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
          <Link to="/" className="auth-header-mobile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="logo-box-mobile">LC</div>
            <h2>Labour Compliance</h2>
          </Link>

          <div className="form-header">
            <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span style={{ fontSize: '1.2em' }}>←</span> Back to Home
            </Link>
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {/* Login Type Toggle Removed as all users use same form */}

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



            <button type="submit" className="pro-btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Create free account</Link>
          </p>


        </div>
      </div>
    </div>
  );
}

export default Login;
