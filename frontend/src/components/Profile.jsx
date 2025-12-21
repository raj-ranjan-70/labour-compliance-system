import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        department: user?.department || '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        const result = await updateUser({
            name: formData.name,
            department: formData.department
        });

        if (result.success) {
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            // Clear success message after 3 seconds
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } else {
            setStatus({ type: 'error', message: result.message || 'Failed to update profile' });
        }
    };

    return (
        <div className="container">
            <div className="page-header">
                <h2>My Profile</h2>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {status.message && (
                    <div className={`alert alert-${status.type === 'error' ? 'danger' : 'success'}`} style={{ marginBottom: '20px' }}>
                        {status.message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="professional-form">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="input-field disabled-input"
                        />
                        <small className="input-helper">Email cannot be changed.</small>
                    </div>

                    <div className="input-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label>Role</label>
                        <div className="role-badge-container">
                            <span className="badge badge-info" style={{ fontSize: '14px' }}>
                                {user?.role ? user.role.toUpperCase() : 'USER'}
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="pro-btn-primary" style={{ width: 'auto', padding: '10px 25px' }}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
