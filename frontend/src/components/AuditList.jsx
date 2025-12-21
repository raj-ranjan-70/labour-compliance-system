import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auditAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function AuditList() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      setLoading(true);
      const response = await auditAPI.getAll();
      setAudits(response.data);
    } catch (err) {
      console.error('Failed to fetch audits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this audit?')) {
      try {
        await auditAPI.delete(id);
        fetchAudits();
      } catch (err) {
        console.error('Failed to delete audit:', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Completed': 'badge-success',
      'In Progress': 'badge-warning',
      'Scheduled': 'badge-info',
      'Follow-up Required': 'badge-danger',
    };
    return badges[status] || 'badge-secondary';
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
        <h2>Compliance Audits</h2>
        {user?.role !== 'viewer' && (
          <button className="btn btn-primary" onClick={() => navigate('/audits/new')}>
            + Schedule Audit
          </button>
        )}
      </div>

      <div className="card">
        {audits.length === 0 ? (
          <p>No audits found. Click "Schedule Audit" to create one.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Audit Date</th>
                <th>Auditor</th>
                <th>Category</th>
                <th>Status</th>
                <th>Score</th>
                <th>Privacy Compliance</th>
                {user?.role !== 'viewer' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {audits.map((audit) => (
                <tr key={audit._id}>
                  <td>{new Date(audit.auditDate).toLocaleDateString()}</td>
                  <td>{audit.auditor}</td>
                  <td>{audit.category}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(audit.status)}`}>
                      {audit.status}
                    </span>
                  </td>
                  <td>{audit.overallScore ? `${audit.overallScore}/100` : '-'}</td>
                  <td>
                    {audit.privacyCompliance?.transparencyScore
                      ? `${audit.privacyCompliance.transparencyScore}/10`
                      : '-'}
                  </td>
                  {user?.role !== 'viewer' && (
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/audits/edit/${audit._id}`)}
                        >
                          View/Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(audit._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AuditList;
