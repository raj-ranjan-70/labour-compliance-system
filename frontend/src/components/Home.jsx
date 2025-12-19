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

      <div id="product" className="features-section">
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
        <div className="footer-links" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <Link to="/faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQ</Link>
          <Link to="/labour-laws" style={{ color: '#94a3b8', textDecoration: 'none' }}>Labour Laws</Link>
          <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login</Link>
        </div>
        <p>&copy; 2025 Labour Compliance Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
