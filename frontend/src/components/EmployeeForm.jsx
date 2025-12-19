import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: '',
    contractType: 'Full-time',
    workingHours: {
      hoursPerWeek: 40,
      overtimeHours: 0,
    },
    salary: {
      amount: 0,
      currency: 'USD',
    },
    leaveBalance: {
      annual: 0,
      sick: 0,
      other: 0,
    },
  });

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getById(id);
      setFormData(response.data);
    } catch (err) {
      console.error('Failed to fetch employee:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
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
        await employeeAPI.update(id, formData);
      } else {
        await employeeAPI.create(formData);
      }
      navigate('/employees');
    } catch (err) {
      console.error('Failed to save employee:', err);
      alert('Failed to save employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>{id ? 'Edit' : 'New'} Employee</h2>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Employee ID *</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              disabled={!!id}
            />
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Join Date *</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate ? formData.joinDate.split('T')[0] : ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contract Type</label>
            <select name="contractType" value={formData.contractType} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>

          <h3 style={{ marginTop: '30px' }}>Working Hours</h3>
          
          <div className="form-group">
            <label>Hours Per Week</label>
            <input
              type="number"
              name="workingHours.hoursPerWeek"
              value={formData.workingHours?.hoursPerWeek || 40}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Overtime Hours (Monthly Average)</label>
            <input
              type="number"
              name="workingHours.overtimeHours"
              value={formData.workingHours?.overtimeHours || 0}
              onChange={handleChange}
            />
          </div>

          <h3 style={{ marginTop: '30px' }}>Leave Balance</h3>
          
          <div className="form-group">
            <label>Annual Leave Days</label>
            <input
              type="number"
              name="leaveBalance.annual"
              value={formData.leaveBalance?.annual || 0}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Sick Leave Days</label>
            <input
              type="number"
              name="leaveBalance.sick"
              value={formData.leaveBalance?.sick || 0}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Other Leave Days</label>
            <input
              type="number"
              name="leaveBalance.other"
              value={formData.leaveBalance?.other || 0}
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
              onClick={() => navigate('/employees')}
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

export default EmployeeForm;
