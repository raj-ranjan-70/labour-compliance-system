import React, { useState, useEffect } from 'react';
import { complianceAPI } from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await complianceAPI.getStats();
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // Theme-aware colors
  const colors = {
    compliant: '#10b981',
    nonCompliant: '#ef4444',
    inProgress: '#f59e0b',
    pending: darkMode ? '#94a3b8' : '#64748b',
    bar: '#6366f1',
    text: darkMode ? '#f1f5f9' : '#1e293b',
    grid: darkMode ? '#334155' : '#e2e8f0'
  };

  const statusData = [
    { name: 'Compliant', value: stats?.compliant || 0, color: colors.compliant },
    { name: 'Non-Compliant', value: stats?.nonCompliant || 0, color: colors.nonCompliant },
    { name: 'In Progress', value: stats?.inProgress || 0, color: colors.inProgress },
    { name: 'Pending', value: stats?.pending || 0, color: colors.pending },
  ];

  const categoryData = stats?.byCategory.map(cat => ({
    name: cat._id,
    count: cat.count
  })) || [];

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Compliance Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Overview of your organization's compliance status</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card info">
          <h3>Total Items</h3>
          <div className="stat-value">{stats?.total || 0}</div>
          <div className="stat-label">Compliance tracking items</div>
        </div>

        <div className="stat-card success">
          <h3>Compliant</h3>
          <div className="stat-value">{stats?.compliant || 0}</div>
          <div className="stat-label">{stats?.complianceRate}% compliance rate</div>
        </div>

        <div className="stat-card danger">
          <h3>Non-Compliant</h3>
          <div className="stat-value">{stats?.nonCompliant || 0}</div>
          <div className="stat-label">Requires immediate attention</div>
        </div>

        <div className="stat-card warning">
          <h3>In Progress</h3>
          <div className="stat-value">{stats?.inProgress || 0}</div>
          <div className="stat-label">Currently being addressed</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="chart-container">
          <h3>Compliance Status Distribution</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {categoryData.length > 0 && (
          <div className="chart-container">
            <h3>Compliance by Category</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke={colors.text}
                    tick={{ fill: colors.text }}
                    axisLine={{ stroke: colors.grid }}
                    tickLine={{ stroke: colors.grid }}
                  />
                  <YAxis
                    stroke={colors.text}
                    tick={{ fill: colors.text }}
                    axisLine={{ stroke: colors.grid }}
                    tickLine={{ stroke: colors.grid }}
                  />
                  <Tooltip
                    cursor={{ fill: userOpacity(colors.text, 0.1) }}
                    contentStyle={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill={colors.bar}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to add opacity to hex color (approximation for tooltip cursor)
function userOpacity(hex, alpha) {
  return 'var(--bg-secondary)'; // Fallback to simpler implementation
}

export default Dashboard;
