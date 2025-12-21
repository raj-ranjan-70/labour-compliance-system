import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee record?')) {
      try {
        await employeeAPI.delete(id);
        fetchEmployees();
      } catch (err) {
        console.error('Failed to delete employee:', err);
      }
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
        <h2>Employees</h2>
        {user?.role !== 'viewer' && (
          <button className="btn btn-primary" onClick={() => navigate('/employees/new')}>
            + Add Employee
          </button>
        )}
      </div>

      <div className="alert alert-info">
        <strong>Privacy Note:</strong> Only minimal employee information is displayed in the list view.
        Full details are accessible only when viewing individual records.
      </div>

      <div className="card">
        {employees.length === 0 ? (
          <p>No employees found. Click "Add Employee" to create a record.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Contract Type</th>
                {user?.role !== 'viewer' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className="badge badge-info">{employee.contractType}</span>
                  </td>
                  {user?.role !== 'viewer' && (
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/employees/edit/${employee.id}`)}
                        >
                          View/Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(employee.id)}
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

export default EmployeeList;
