const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const complianceRoutes = require('./routes/compliance');
const employeeRoutes = require('./routes/employee');
const auditRoutes = require('./routes/audit');
const reportRoutes = require('./routes/report');

app.use('/api/auth', authRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/reports', reportRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Labour Compliance API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
