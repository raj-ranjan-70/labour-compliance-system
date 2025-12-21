import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import "./App.css";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { FaLinkedin, FaGithub, FaCheckCircle, FaCaretDown, FaUser, FaSignOutAlt } from "react-icons/fa"; // Import FaCaretDown, FaUser, FaSignOutAlt
import { SiLeetcode } from "react-icons/si";

import Home from "./components/Home.jsx";
import FAQ from "./components/FAQ.jsx";
import LabourLaws from "./components/LabourLaws.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ComplianceList from "./components/ComplianceList.jsx";
import ComplianceForm from "./components/ComplianceForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import AuditList from "./components/AuditList.jsx";
import AuditForm from "./components/AuditForm.jsx";
import Reports from "./components/Reports.jsx";
import Developers from "./components/Developers.jsx"; // Import Developers
import Profile from "./components/Profile.jsx"; // Import Profile




const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  AUDITOR: 'auditor',
  VIEWER: 'viewer'
};

function NavBar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  let dropdownTimeout;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setShowDropdown(false);
    }, 250); // 0.25 second delay
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case ROLES.ADMIN: return 'Compliance Officer';
      default: return role;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Labour Compliance Manager</h1>
          <p className="privacy-note">Privacy-Focused Compliance Tracking</p>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Dashboard</Link></li>

          {(user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER || user?.role === ROLES.VIEWER) && (
            <>
              <li><Link to="/compliance">Compliance</Link></li>
              <li><Link to="/employees">Employees</Link></li>
            </>
          )}

          {(user?.role === ROLES.ADMIN || user?.role === ROLES.AUDITOR || user?.role === ROLES.VIEWER) && (
            <>
              <li><Link to="/audits">Audits</Link></li>
              <li><Link to="/reports">Reports</Link></li>
            </>
          )}
        </ul>
        <div className="nav-user">
          <button onClick={toggleDarkMode} className="btn-theme" title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="user-dropdown" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
            <div
              className="user-info-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{getRoleLabel(user?.role)}</span>
              </div>
              <FaCaretDown />
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="dropdown-user-name">{user?.name}</span>
                  <span className="dropdown-user-email">{user?.email}</span>
                  <span className="dropdown-user-role">{getRoleLabel(user?.role)}</span>
                </div>
                <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                  <FaUser style={{ marginRight: '8px' }} /> Edit Profile
                </Link>
                <button onClick={logout} className="dropdown-item logout">
                  <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const publicPaths = ['/', '/faq', '/labour-laws', '/login', '/register'];
  const isPublicPage = publicPaths.includes(location.pathname) && !isAuthenticated;

  return (
    <div className="App">
      {isAuthenticated && <NavBar />}

      <div className={isPublicPage ? "landing-content" : "main-content"}>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/labour-laws" element={<LabourLaws />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/developers" element={<Developers />} />

          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          <Route path="/compliance" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER]}>
              <ComplianceList />
            </PrivateRoute>
          } />
          <Route path="/compliance/new" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <ComplianceForm />
            </PrivateRoute>
          } />
          <Route path="/compliance/edit/:id" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <ComplianceForm />
            </PrivateRoute>
          } />

          <Route path="/employees" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER]}>
              <EmployeeList />
            </PrivateRoute>
          } />
          <Route path="/employees/new" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <EmployeeForm />
            </PrivateRoute>
          } />
          <Route path="/employees/edit/:id" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <EmployeeForm />
            </PrivateRoute>
          } />

          <Route path="/audits" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.AUDITOR, ROLES.VIEWER]}>
              <AuditList />
            </PrivateRoute>
          } />
          <Route path="/audits/new" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.AUDITOR]}>
              <AuditForm />
            </PrivateRoute>
          } />
          <Route path="/audits/edit/:id" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.AUDITOR]}>
              <AuditForm />
            </PrivateRoute>
          } />

          <Route path="/reports" element={
            <PrivateRoute roles={[ROLES.ADMIN, ROLES.AUDITOR, ROLES.VIEWER]}>
              <Reports />
            </PrivateRoute>
          } />
        </Routes>
      </div>

      {isAuthenticated && (
        <footer className="footer">
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/rajranjan70" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/raj-ranjan-70" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://leetcode.com/u/rajranjan70/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <SiLeetcode size={24} />
            </a>
          </div>

          <div className="privacy-footer-section" style={{ margin: '15px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>Privacy & Intrusion Minimization</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCheckCircle size={12} color="var(--success-color)" /> Data Minimization</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCheckCircle size={12} color="var(--success-color)" /> Consent Tracking</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FaCheckCircle size={12} color="var(--success-color)" /> Transparent Reporting</span>
            </div>
          </div>

          <p>&copy; 2025 Labour Compliance Manager. Designed for minimal data intrusion.</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
