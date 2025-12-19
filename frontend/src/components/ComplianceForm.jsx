import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { complianceAPI } from '../services/api';

function ComplianceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Working Hours',
    regulationReference: '',
    status: 'Pending Review',
    priority: 'Medium',
    dueDate: '',
    assignedTo: '',
    notes: '',
    privacyImpact: {
      type: 'Low',
      description: '',
    },
  });

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await complianceAPI.getById(id);
      setFormData(response.data);
    } catch (err) {
      console.error('Failed to fetch compliance item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('privacyImpact.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        privacyImpact: {
          ...formData.privacyImpact,
          [field]: value,
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
        await complianceAPI.update(id, formData);
      } else {
        await complianceAPI.create(formData);
      }
      navigate('/compliance');
    } catch (err) {
      console.error('Failed to save compliance item:', err);
      // Improved error handling to show specific message
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save item';
      alert(`Error: ${errorMessage}. Please check form fields.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>{id ? 'Edit' : 'New'} Compliance Item</h2>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="Working Hours">Working Hours</option>
              <option value="Wages">Wages</option>
              <option value="Safety">Safety</option>
              <option value="Leave Policy">Leave Policy</option>
              <option value="Contract Terms">Contract Terms</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Regulation Reference *</label>
            <input
              type="text"
              name="regulationReference"
              value={formData.regulationReference}
              onChange={handleChange}
              placeholder="e.g., Labour Act 2020, Section 45"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate ? formData.dueDate.split('T')[0] : ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Person or team responsible"
            />
          </div>

          <div className="form-group">
            <label>Privacy Impact Level</label>
            <select
              name="privacyImpact.type"
              value={formData.privacyImpact?.type || 'Low'}
              onChange={handleChange}
            >
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Privacy Impact Description</label>
            <textarea
              name="privacyImpact.description"
              value={formData.privacyImpact?.description || ''}
              onChange={handleChange}
              placeholder="Describe how this compliance item affects employee privacy"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes or comments"
            />
          </div>

          <div className="action-buttons" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/compliance')}
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

export default ComplianceForm;
