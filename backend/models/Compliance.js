const mongoose = require('mongoose');

const complianceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Working Hours', 'Wages', 'Safety', 'Leave Policy', 'Contract Terms', 'Health', 'Other'],
    required: true,
  },
  regulationReference: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Compliant', 'Non-Compliant', 'In Progress', 'Pending Review'],
    default: 'Pending Review',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: String,
  },
  notes: {
    type: String,
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date,
  }],
  privacyImpact: {
    type: {
      type: String,
      enum: ['None', 'Low', 'Medium', 'High'],
      default: 'Low',
    },
    description: {
      type: String,
      default: ''
    }
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

complianceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Compliance', complianceSchema);
