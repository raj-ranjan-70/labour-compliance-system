const express = require('express');
const router = express.Router();
const Compliance = require('../models/Compliance');
const Employee = require('../models/Employee');
const Audit = require('../models/Audit');

// Generate comprehensive compliance report
router.get('/comprehensive', async (req, res) => {
  try {
    const complianceStats = await Compliance.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const categoryStats = await Compliance.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          compliant: {
            $sum: { $cond: [{ $eq: ['$status', 'Compliant'] }, 1, 0] }
          }
        }
      }
    ]);
    
    const criticalItems = await Compliance.find({ 
      priority: 'Critical',
      status: { $ne: 'Compliant' }
    }).limit(10);
    
    const recentAudits = await Audit.find()
      .sort({ auditDate: -1 })
      .limit(5);
    
    const totalEmployees = await Employee.countDocuments();
    
    res.json({
      complianceStats,
      categoryStats,
      criticalItems,
      recentAudits,
      totalEmployees,
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Privacy impact report
router.get('/privacy-impact', async (req, res) => {
  try {
    const privacyImpactStats = await Compliance.aggregate([
      {
        $group: {
          _id: '$privacyImpact.type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const highPrivacyImpact = await Compliance.find({
      'privacyImpact.type': { $in: ['High', 'Medium'] }
    });
    
    const employeesWithConsent = await Employee.find({
      'consentRecords.0': { $exists: true }
    }).countDocuments();
    
    const totalEmployees = await Employee.countDocuments();
    
    res.json({
      privacyImpactStats,
      highPrivacyImpact,
      consentCoverage: {
        withConsent: employeesWithConsent,
        total: totalEmployees,
        percentage: totalEmployees > 0 ? ((employeesWithConsent / totalEmployees) * 100).toFixed(2) : 0
      },
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upcoming deadlines report
router.get('/deadlines', async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const upcomingDeadlines = await Compliance.find({
      dueDate: {
        $gte: now,
        $lte: thirtyDaysFromNow
      },
      status: { $ne: 'Compliant' }
    }).sort({ dueDate: 1 });
    
    const overdueItems = await Compliance.find({
      dueDate: { $lt: now },
      status: { $ne: 'Compliant' }
    }).sort({ dueDate: 1 });
    
    res.json({
      upcomingDeadlines,
      overdueItems,
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
