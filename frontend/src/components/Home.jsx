import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-nav">
        <div className="nav-left">
          <div className="brand-mark">LC</div>
          <div className="brand-text">
            <p className="brand-kicker">Labour Compliance</p>
            <h2>Compliance Manager</h2>
          </div>
        </div>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#features">Features</a>
          <a href="#workflow">How it works</a>
          <Link to="/login" className="nav-cta">Login</Link>
        </div>
      </header>

      <div className="home-hero">
        <div className="hero-shell">
          <div className="hero-brand">
            <div className="brand-logo">LC</div>
            <div>
              <p className="brand-kicker">Compliance. Privacy. Clarity.</p>
              <h1 className="hero-title">Labour Compliance Manager</h1>
              <p className="hero-subtitle">Modern platform to track, audit, and prove compliance without intrusive data collection.</p>
            </div>
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-bullets">
                <p>• Smart dashboards for Admin, HR, and Labour teams</p>
                <p>• Audit-ready evidence with consent-first employee records</p>
                <p>• Automated reminders for filings, inspections, and renewals</p>
              </div>
              <div className="hero-buttons">
                <Link to="/login" className="btn-primary">Login</Link>
                <Link to="/register" className="btn-secondary">Create Account</Link>
              </div>
            </div>
            <div className="hero-right">
              <div className="metric-card">
                <p className="metric-label">Active obligations tracked</p>
                <p className="metric-value">120+</p>
              </div>
              <div className="metric-card">
                <p className="metric-label">On-time filings</p>
                <p className="metric-value">98%</p>
              </div>
              <div className="metric-card">
                <p className="metric-label">Employee consent coverage</p>
                <p className="metric-value">100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="product" className="product-section">
        <div className="product-container">
          <div className="product-text">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Comprehensive Compliance Management</h2>
            <p className="product-description">
              Labour Compliance Manager is an all-in-one platform designed to simplify the complex landscape of Indian labour laws.
              We replace chaotic spreadsheets and scattered emails with a unified, digital system of record.
            </p>
            <ul className="product-bullets">
              <li className="product-feature-item">
                <span className="feature-icon">🚀</span>
                <div className="feature-content">
                  <span className="feature-title">Zero-Touch Updates</span>
                  <span className="feature-desc">Laws change, we update. You stay compliant automatically.</span>
                </div>
              </li>
              <li className="product-feature-item">
                <span className="feature-icon">🔒</span>
                <div className="feature-content">
                  <span className="feature-title">Privacy First</span>
                  <span className="feature-desc">We collect only what's necessary. Your data stays yours.</span>
                </div>
              </li>
              <li className="product-feature-item">
                <span className="feature-icon">📊</span>
                <div className="feature-content">
                  <span className="feature-title">Real-Time Visibility</span>
                  <span className="feature-desc">From site-level tasks to board-level reporting in one click.</span>
                </div>
              </li>
              <li className="product-feature-item">
                <span className="feature-icon">🤝</span>
                <div className="feature-content">
                  <span className="feature-title">Collaborative</span>
                  <span className="feature-desc">Connect HR, Legal, and Finance teams in a single workflow.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="product-visual">
            <div className="visual-card">
              <div className="visual-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="visual-content">
                <div className="visual-row">
                  <span className="visual-label">Compliance Score</span>
                  <span className="visual-bar" style={{ width: '92%' }}></span>
                  <span className="visual-value">92%</span>
                </div>
                <div className="visual-row">
                  <span className="visual-label">Pending Acts</span>
                  <span className="visual-bar warning" style={{ width: '30%' }}></span>
                  <span className="visual-value">3</span>
                </div>
                <div className="visual-row">
                  <span className="visual-label">Critical Alerts</span>
                  <span className="visual-bar success" style={{ width: '0%' }}></span>
                  <span className="visual-value">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="features-section">
        <h2 className="section-title">Built for real-world compliance</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Obligation Library</h3>
            <p>State-wise and central obligations with filing dates, forms, and escalation paths.</p>
          </div>
          <div className="feature-card">
            <h3>Task Automation</h3>
            <p>Auto-create tasks for renewals, inspections, ESI/EPF, and contractor compliance.</p>
          </div>
          <div className="feature-card">
            <h3>Evidence Locker</h3>
            <p>Store challans, registers, notices, PoAs with versioning and role-based access.</p>
          </div>
          <div className="feature-card">
            <h3>Risk & SLA Tracking</h3>
            <p>Flag breaches, SLA slippages, and overdue filings with severity scoring.</p>
          </div>
          <div className="feature-card">
            <h3>Contractor Governance</h3>
            <p>Collect contractor documents, validate labour counts, and monitor dues.</p>
          </div>
          <div className="feature-card">
            <h3>Reports & Exports</h3>
            <p>Board-ready summaries, audit packs, and CSV/PDF exports with filters.</p>
          </div>
        </div>
      </div>

      <div id="workflow" className="workflow-section">
        <div className="workflow-card">
          <h2>How teams use it</h2>
          <div className="workflow-steps">
            <div className="step">
              <p className="step-label">1. Capture</p>
              <p>Map locations, registrations, contractors, and obligations.</p>
            </div>
            <div className="step">
              <p className="step-label">2. Act</p>
              <p>Assign tasks, set due dates, attach proofs, and capture approvals.</p>
            </div>
            <div className="step">
              <p className="step-label">3. Prove</p>
              <p>Generate audit packs, download evidence, and share status with stakeholders.</p>
            </div>
          </div>
          <div className="workflow-cta">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join us in making compliance management easier and more privacy-focused</p>
        <Link to="/login" className="btn-cta">
          Get Started Now
        </Link>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-column branding-column">
            <h3>Labour Compliance Manager</h3>
            <p className="footer-desc">
              Simplifying compliance management with privacy-focused tracking, real-time audits, and automated reporting.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <div className="footer-links">
              <Link to="/developers">Meet the Developers</Link>
              <Link to="/labour-laws">Labour Laws</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Help and Support</h4>
            <div className="footer-links">
              <Link to="/report-issue">Report Issue</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Labour Compliance Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
