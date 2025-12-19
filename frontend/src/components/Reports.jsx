import React, { useState, useEffect } from 'react';
import { reportAPI } from '../services/api';

function Reports() {
  const [comprehensiveReport, setComprehensiveReport] = useState(null);
  const [privacyReport, setPrivacyReport] = useState(null);
  const [deadlinesReport, setDeadlinesReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('comprehensive');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [comprehensive, privacy, deadlines] = await Promise.all([
        reportAPI.getComprehensive(),
        reportAPI.getPrivacyImpact(),
        reportAPI.getDeadlines(),
      ]);
      
      setComprehensiveReport(comprehensive.data);
      setPrivacyReport(privacy.data);
      setDeadlinesReport(deadlines.data);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Reports & Analytics</h2>
        <button className="btn btn-primary" onClick={fetchReports}>
          Refresh Reports
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            className={`btn ${activeTab === 'comprehensive' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('comprehensive')}
          >
            Comprehensive Report
          </button>
          <button
            className={`btn ${activeTab === 'privacy' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Impact
          </button>
          <button
            className={`btn ${activeTab === 'deadlines' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('deadlines')}
          >
            Deadlines
          </button>
        </div>

        {activeTab === 'comprehensive' && comprehensiveReport && (
          <div>
            <h3>Comprehensive Compliance Report</h3>
            <p><strong>Generated:</strong> {new Date(comprehensiveReport.generatedAt).toLocaleString()}</p>
            
            <h4 style={{ marginTop: '20px' }}>Total Employees</h4>
            <p className="stat-value">{comprehensiveReport.totalEmployees}</p>

            <h4 style={{ marginTop: '20px' }}>Compliance Status Distribution</h4>
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {comprehensiveReport.complianceStats?.map((stat) => (
                  <tr key={stat._id}>
                    <td>{stat._id}</td>
                    <td>{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 style={{ marginTop: '20px' }}>By Category</h4>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Items</th>
                  <th>Compliant</th>
                  <th>Compliance Rate</th>
                </tr>
              </thead>
              <tbody>
                {comprehensiveReport.categoryStats?.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat._id}</td>
                    <td>{cat.count}</td>
                    <td>{cat.compliant}</td>
                    <td>
                      {cat.count > 0 
                        ? `${((cat.compliant / cat.count) * 100).toFixed(1)}%` 
                        : '0%'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {comprehensiveReport.criticalItems?.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Critical Non-Compliant Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comprehensiveReport.criticalItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>
                          <span className="badge badge-danger">{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {activeTab === 'privacy' && privacyReport && (
          <div>
            <h3>Privacy Impact Report</h3>
            <p><strong>Generated:</strong> {new Date(privacyReport.generatedAt).toLocaleString()}</p>

            <h4 style={{ marginTop: '20px' }}>Employee Consent Coverage</h4>
            <div className="stats-grid">
              <div className="stat-card success">
                <h3>With Consent</h3>
                <div className="stat-value">{privacyReport.consentCoverage?.withConsent || 0}</div>
              </div>
              <div className="stat-card info">
                <h3>Total Employees</h3>
                <div className="stat-value">{privacyReport.consentCoverage?.total || 0}</div>
              </div>
              <div className="stat-card warning">
                <h3>Coverage Rate</h3>
                <div className="stat-value">{privacyReport.consentCoverage?.percentage || 0}%</div>
              </div>
            </div>

            <h4 style={{ marginTop: '20px' }}>Privacy Impact Distribution</h4>
            <table>
              <thead>
                <tr>
                  <th>Impact Level</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {privacyReport.privacyImpactStats?.map((stat) => (
                  <tr key={stat._id || 'null'}>
                    <td>{stat._id || 'Not Set'}</td>
                    <td>{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {privacyReport.highPrivacyImpact?.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>High/Medium Privacy Impact Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Impact Level</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacyReport.highPrivacyImpact.map((item) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>
                          <span className="badge badge-warning">
                            {item.privacyImpact?.type || 'N/A'}
                          </span>
                        </td>
                        <td>{item.privacyImpact?.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {activeTab === 'deadlines' && deadlinesReport && (
          <div>
            <h3>Compliance Deadlines Report</h3>
            <p><strong>Generated:</strong> {new Date(deadlinesReport.generatedAt).toLocaleString()}</p>

            {deadlinesReport.overdueItems?.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Overdue Items</h4>
                <div className="alert alert-danger">
                  <strong>{deadlinesReport.overdueItems.length}</strong> items are overdue!
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlinesReport.overdueItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge badge-${item.priority === 'Critical' ? 'danger' : 'warning'}`}>
                            {item.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {deadlinesReport.upcomingDeadlines?.length > 0 && (
              <>
                <h4 style={{ marginTop: '20px' }}>Upcoming Deadlines (Next 30 Days)</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlinesReport.upcomingDeadlines.map((item) => (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge badge-warning`}>
                            {item.priority}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-info">{item.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {!deadlinesReport.overdueItems?.length && !deadlinesReport.upcomingDeadlines?.length && (
              <div className="alert alert-success">
                No upcoming deadlines or overdue items. Great job!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
