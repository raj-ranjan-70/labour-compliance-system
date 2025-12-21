import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complianceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function ComplianceList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await complianceAPI.getAll(filters);
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch compliance items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await complianceAPI.delete(id);
        fetchItems();
      } catch (err) {
        console.error('Failed to delete item:', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Compliant': 'badge-success',
      'Non-Compliant': 'badge-danger',
      'In Progress': 'badge-warning',
      'Pending Review': 'badge-secondary',
    };
    return badges[status] || 'badge-secondary';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'Critical': 'badge-danger',
      'High': 'badge-warning',
      'Medium': 'badge-info',
      'Low': 'badge-secondary',
    };
    return badges[priority] || 'badge-secondary';
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
        <h2>Compliance Items</h2>
        {user?.role !== 'viewer' && (
          <button className="btn btn-primary" onClick={() => navigate('/compliance/new')}>
            + Add New Item
          </button>
        )}
      </div>

      <div className="filters">
        <div className="filters-row">
          <div className="form-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All</option>
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
            <label>Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        {items.length === 0 ? (
          <p>No compliance items found. Click "Add New Item" to create one.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Privacy Impact</th>
                <th>Due Date</th>
                {user?.role !== 'viewer' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(item.privacyImpact?.type || 'Low')}`}>
                      {item.privacyImpact?.type || 'Low'}
                    </span>
                  </td>
                  <td>{item.dueDate ? new Date(item.dueDate).toLocaleDateString() : '-'}</td>
                  {user?.role !== 'viewer' && (
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/compliance/edit/${item._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
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

export default ComplianceList;
