const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const { department, contractType } = req.query;
    let filter = {};
    
    if (department) filter.department = department;
    if (contractType) filter.contractType = contractType;
    
    const employees = await Employee.find(filter).sort({ name: 1 });
    
    // Minimize data exposure - only return necessary fields
    const sanitizedEmployees = employees.map(emp => ({
      id: emp._id,
      employeeId: emp.employeeId,
      name: emp.name,
      department: emp.department,
      position: emp.position,
      contractType: emp.contractType,
    }));
    
    res.json(sanitizedEmployees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee (full details)
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create employee
router.post('/', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update consent records
router.post('/:id/consent', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    
    employee.consentRecords.push(req.body);
    await employee.save();
    
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
