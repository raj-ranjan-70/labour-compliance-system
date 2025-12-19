import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auditAPI } from '../services/api';

function AuditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    auditDate: '',
    auditor: '',
    category: '',
    status: 'Scheduled',
    overallScore: '',
    nextAuditDate: '',
    privacyCompliance: {
      dataMinimization: false,
      consentObtained: false,
      transparencyScore: 5,
    },
    findings: [],
  });

  useEffect(() => {
    if (id) {
      fetchAudit();
    }
  }, [id]);

  const fetchAudit = async () => {
    try {
      setLoading(true);
      const response = await auditAPI.getById(id);
      setFormData(response.data);
    } catch (err) {
      console.error('Failed to fetch audit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await auditAPI.update(id, formData);
      } else {
        await auditAPI.create(formData);
      }
      navigate('/audits');
    } catch (err) {
      console.error('Failed to save audit:', err);
      alert('Failed to save audit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>{id ? 'Edit' : 'New'} Audit</h2>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Audit Date *</label>
            <input
              type="date"
              name="auditDate"
              value={formData.auditDate ? formData.auditDate.split('T')[0] : ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Auditor *</label>
            <input
              type="text"
              name="auditor"
              value={formData.auditor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Working Hours, Safety, etc."
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Follow-up Required">Follow-up Required</option>
            </select>
          </div>

          <div className="form-group">
            <label>Overall Score (0-100)</label>
            <input
              type="number"
              name="overallScore"
              min="0"
              max="100"
              value={formData.overallScore}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Next Audit Date</label>
            <input
              type="date"
              name="nextAuditDate"
              value={formData.nextAuditDate ? formData.nextAuditDate.split('T')[0] : ''}
              onChange={handleChange}
            />
          </div>

          <h3 style={{ marginTop: '30px' }}>Privacy Compliance</h3>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="privacyCompliance.dataMinimization"
                checked={formData.privacyCompliance?.dataMinimization || false}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '10px' }}
              />
              Data Minimization Principles Applied
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="privacyCompliance.consentObtained"
                checked={formData.privacyCompliance?.consentObtained || false}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '10px' }}
              />
              Proper Consent Obtained
            </label>
          </div>

          <div className="form-group">
            <label>Transparency Score (1-10)</label>
            <input
              type="number"
              name="privacyCompliance.transparencyScore"
              min="1"
              max="10"
              value={formData.privacyCompliance?.transparencyScore || 5}
              onChange={handleChange}
            />
          </div>

          <div className="action-buttons" style={{ marginTop: '30px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/audits')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuditForm;
