import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Compliance API
export const complianceAPI = {
  getAll: (params) => api.get('/compliance', { params }),
  getById: (id) => api.get(`/compliance/${id}`),
  create: (data) => api.post('/compliance', data),
  update: (id, data) => api.put(`/compliance/${id}`, data),
  delete: (id) => api.delete(`/compliance/${id}`),
  getStats: () => api.get('/compliance/stats/overview'),
};

// Employee API
export const employeeAPI = {
  getAll: (params) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
  updateConsent: (id, data) => api.post(`/employees/${id}/consent`, data),
};

// Audit API
export const auditAPI = {
  getAll: (params) => api.get('/audits', { params }),
  getById: (id) => api.get(`/audits/${id}`),
  create: (data) => api.post('/audits', data),
  update: (id, data) => api.put(`/audits/${id}`, data),
  delete: (id) => api.delete(`/audits/${id}`),
};

// Report API
export const reportAPI = {
  getComprehensive: () => api.get('/reports/comprehensive'),
  getPrivacyImpact: () => api.get('/reports/privacy-impact'),
  getDeadlines: () => api.get('/reports/deadlines'),
};

export default api;
