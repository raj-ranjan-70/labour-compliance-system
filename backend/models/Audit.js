const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  auditDate: {
    type: Date,
    required: true,
  },
  auditor: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  findings: [{
    issue: String,
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    description: String,
    recommendation: String,
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Follow-up Required'],
    default: 'Scheduled',
  },
  nextAuditDate: {
    type: Date,
  },
  privacyCompliance: {
    dataMinimization: Boolean,
    consentObtained: Boolean,
    transparencyScore: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

auditSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Audit', auditSchema);
