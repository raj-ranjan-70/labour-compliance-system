const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  contractType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
    default: 'Full-time',
  },
  workingHours: {
    hoursPerWeek: Number,
    overtimeHours: Number,
  },
  salary: {
    amount: Number,
    currency: { type: String, default: 'USD' },
  },
  leaveBalance: {
    annual: { type: Number, default: 0 },
    sick: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
  consentRecords: [{
    type: {
      type: String,
      enum: ['Data Processing', 'Background Check', 'Health Screening', 'Other'],
    },
    granted: Boolean,
    date: Date,
    expiryDate: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
