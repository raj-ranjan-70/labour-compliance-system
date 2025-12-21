import React from "react";
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
import { FaLinkedin, FaGithub, FaCheckCircle } from "react-icons/fa";
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


function NavBar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>Labour Compliance Manager</h1>
          <p className="privacy-note">Privacy-Focused Compliance Tracking</p>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/compliance">Compliance</Link></li>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/audits">Audits</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
        <div className="nav-user">
          <button onClick={toggleDarkMode} className="btn-theme" title="Toggle Dark Mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
          <button onClick={logout} className="btn-logout">Logout</button>
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

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/compliance" element={<PrivateRoute><ComplianceList /></PrivateRoute>} />
          <Route path="/compliance/new" element={<PrivateRoute><ComplianceForm /></PrivateRoute>} />
          <Route path="/compliance/edit/:id" element={<PrivateRoute><ComplianceForm /></PrivateRoute>} />
          <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
          <Route path="/employees/new" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
          <Route path="/employees/edit/:id" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
          <Route path="/audits" element={<PrivateRoute><AuditList /></PrivateRoute>} />
          <Route path="/audits/new" element={<PrivateRoute><AuditForm /></PrivateRoute>} />
          <Route path="/audits/edit/:id" element={<PrivateRoute><AuditForm /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
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
