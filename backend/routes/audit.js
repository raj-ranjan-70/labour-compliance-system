const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');

// Get all audits
router.get('/', async (req, res) => {
  try {
    const { status, category } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    const audits = await Audit.find(filter).sort({ auditDate: -1 });
    res.json(audits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single audit
router.get('/:id', async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);
    if (!audit) return res.status(404).json({ message: 'Audit not found' });
    res.json(audit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create audit
router.post('/', async (req, res) => {
  const audit = new Audit(req.body);
  try {
    const newAudit = await audit.save();
    res.status(201).json(newAudit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update audit
router.put('/:id', async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!audit) return res.status(404).json({ message: 'Audit not found' });
    res.json(audit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete audit
router.delete('/:id', async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    if (!audit) return res.status(404).json({ message: 'Audit not found' });
    res.json({ message: 'Audit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
