const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Compliance = require('./models/Compliance');
const Audit = require('./models/Audit');

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Compliance.deleteMany({});
    await Audit.deleteMany({});
    console.log('Old data cleared...');

    // Users to seed
    const usersRaw = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        department: 'Management'
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: 'password123',
        role: 'manager',
        department: 'HR'
      },
      {
        name: 'Auditor User',
        email: 'auditor@example.com',
        password: 'password123',
        role: 'auditor',
        department: 'Compliance'
      },
      {
        name: 'Viewer User',
        email: 'viewer@example.com',
        password: 'password123',
        role: 'viewer',
        department: 'General'
      },
      {
        name: 'Employee User',
        email: 'employee@example.com', // User account for an employee
        password: 'password123',
        role: 'viewer', // Typically employees might have limited access, assigning viewer for now
        department: 'Operations'
      }
    ];

    // Create Users
    for (const user of usersRaw) {
      await User.create(user);
    }
    console.log('Users imported...');

    // Create Employees
    const employees = [
      {
        employeeId: 'EMP001',
        name: 'John Smith',
        email: 'john.smith@company.com',
        department: 'Engineering',
        position: 'Senior Developer',
        joinDate: new Date('2022-01-15'),
        contractType: 'Full-time',
        workingHours: { hoursPerWeek: 40, overtimeHours: 0 },
        salary: { amount: 85000, currency: 'USD' },
        leaveBalance: { annual: 20, sick: 10, other: 2 },
        consentRecords: [
          { type: 'Data Processing', granted: true, date: new Date(), expiryDate: new Date('2025-01-01') }
        ]
      },
      {
        employeeId: 'EMP002',
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        department: 'Marketing',
        position: 'Marketing Specialist',
        joinDate: new Date('2023-03-10'),
        contractType: 'Full-time',
        workingHours: { hoursPerWeek: 40, overtimeHours: 2 },
        salary: { amount: 65000, currency: 'USD' },
        leaveBalance: { annual: 18, sick: 8, other: 0 },
        consentRecords: [
          { type: 'Data Processing', granted: true, date: new Date(), expiryDate: new Date('2025-01-01') }
        ]
      },
      {
        employeeId: 'EMP003',
        name: 'Mike Brown',
        email: 'mike.b@company.com',
        department: 'Sales',
        position: 'Sales Representative',
        joinDate: new Date('2023-06-01'),
        contractType: 'Contract',
        workingHours: { hoursPerWeek: 20, overtimeHours: 0 },
        salary: { amount: 30000, currency: 'USD' },
        leaveBalance: { annual: 0, sick: 0, other: 0 },
        consentRecords: [
          { type: 'Data Processing', granted: true, date: new Date(), expiryDate: new Date('2024-06-01') }
        ]
      }
    ];

    await Employee.insertMany(employees);
    console.log('Employees imported...');

    // Create Compliance Items
    const compliances = [
      {
        title: 'Minimum Wage Policy',
        description: 'Ensure all employees are paid above the federal minimum wage.',
        category: 'Wages',
        regulationReference: 'FLSA Section 6',
        status: 'Compliant',
        priority: 'Critical',
        dueDate: new Date('2024-12-31'),
        privacyImpact: 'Low',
        assignedTo: 'Manager User'
      },
      {
        title: 'Weekly Working Hours Limit',
        description: 'Monitor working hours to ensure no one exceeds 48 hours without consent.',
        category: 'Working Hours',
        regulationReference: 'Labor Code 101',
        status: 'In Progress',
        priority: 'High',
        dueDate: new Date('2024-06-30'),
        privacyImpact: 'Medium',
        assignedTo: 'Manager User'
      },
      {
        title: 'Fire Safety Inspection',
        description: 'Annual fire safety inspection of the premises.',
        category: 'Safety',
        regulationReference: 'OSHA 1910',
        status: 'Pending Review',
        priority: 'High',
        dueDate: new Date('2024-09-15'),
        privacyImpact: 'None',
        assignedTo: 'Admin User'
      }
    ];

    await Compliance.insertMany(compliances);
    console.log('Compliance items imported...');

    // Create Audits
    const audits = [
      {
        auditDate: new Date('2023-11-15'),
        auditor: 'External Agency',
        category: 'Safety',
        findings: [
          { issue: 'Blocked Exit', severity: 'High', description: 'Rear exit blocked by boxes.', recommendation: 'Clear immediately.' }
        ],
        overallScore: 85,
        status: 'Completed',
        privacyCompliance: { dataMinimization: true, consentObtained: true, transparencyScore: 90 }
      },
      {
        auditDate: new Date('2024-05-20'),
        auditor: 'Jane Doe',
        category: 'Wages',
        findings: [],
        overallScore: 98,
        status: 'Scheduled',
        nextAuditDate: new Date('2024-11-20'),
        privacyCompliance: { dataMinimization: true, consentObtained: true, transparencyScore: 95 }
      }
    ];

    await Audit.insertMany(audits);
    console.log('Audits imported...');

    console.log('\n=======================================');
    console.log('🎉 Data Imported Successfully from Seed!');
    console.log('=======================================');
    console.log('Demo Credentials (password: password123 for all):');
    usersRaw.forEach(u => {
      console.log(`- ${u.role.padEnd(10)} : ${u.email}`);
    });
    console.log('=======================================');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
