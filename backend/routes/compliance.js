const express = require('express');
const router = express.Router();
const Compliance = require('../models/Compliance');

// Get all compliance items
router.get('/', async (req, res) => {
  try {
    const { status, category, priority } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    
    const items = await Compliance.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single compliance item
router.get('/:id', async (req, res) => {
  try {
    const item = await Compliance.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create compliance item
router.post('/', async (req, res) => {
  const item = new Compliance(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update compliance item
router.put('/:id', async (req, res) => {
  try {
    const item = await Compliance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete compliance item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Compliance.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Compliance item not found' });
    res.json({ message: 'Compliance item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get compliance statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await Compliance.countDocuments();
    const compliant = await Compliance.countDocuments({ status: 'Compliant' });
    const nonCompliant = await Compliance.countDocuments({ status: 'Non-Compliant' });
    const inProgress = await Compliance.countDocuments({ status: 'In Progress' });
    const pending = await Compliance.countDocuments({ status: 'Pending Review' });
    
    const byCategory = await Compliance.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({
      total,
      compliant,
      nonCompliant,
      inProgress,
      pending,
      byCategory,
      complianceRate: total > 0 ? ((compliant / total) * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
