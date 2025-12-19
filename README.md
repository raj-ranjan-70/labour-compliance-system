# Labour Laws Compliance Management System

A comprehensive web application for managing labour law compliance while minimizing data intrusion and protecting employee privacy.

## 🎯 Features

### Privacy-First Design
- **Data Minimization**: Only collects essential employee information
- **Consent Tracking**: Manages employee consent for all data processing activities
- **Privacy Impact Assessments**: Tracks privacy implications of each compliance requirement
- **Transparent Reporting**: Clear visibility into data usage and privacy metrics

### Compliance Management
- Track labour law compliance items across multiple categories
- Monitor compliance status (Compliant, Non-Compliant, In Progress, Pending Review)
- Set priorities and deadlines for compliance tasks
- Generate comprehensive compliance reports

### Employee Records
- Minimal employee data collection
- Working hours and overtime tracking
- Leave balance management
- Consent record tracking

### Audit System
- Schedule and track compliance audits
- Record findings and recommendations
- Privacy compliance scoring
- Automated audit reminders

### Reports & Analytics
- Comprehensive compliance overview
- Privacy impact analysis
- Deadline tracking and overdue alerts
- Category-wise compliance statistics

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- RESTful API architecture

### Frontend
- **React** 18 (Built with **Vite**)
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API communication

## 📁 Project Structure

```
Raj Project/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Audit.js
│   │   ├── Compliance.js
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── audit.js
│   │   ├── auth.js
│   │   ├── compliance.js
│   │   ├── employee.js
│   │   └── report.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ComplianceList.jsx
    │   │   ├── EmployeeList.jsx
    │   │   ├── Reports.jsx
    │   │   └── ...
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```bash
# Windows users can use type NUL > .env
# Mac/Linux users can use touch .env
```

4. Edit `.env` and configure your MongoDB connection:
```
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=development
```

5. Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `GET /api/auth/users` - Get all users (Admin only)
- `PUT /api/auth/users/:id/role` - Update user role (Admin only)

### Compliance
- `GET /api/compliance` - Get all compliance items
- `GET /api/compliance/:id` - Get single compliance item
- `POST /api/compliance` - Create compliance item
- `PUT /api/compliance/:id` - Update compliance item
- `DELETE /api/compliance/:id` - Delete compliance item
- `GET /api/compliance/stats/overview` - Get compliance statistics

### Employees
- `GET /api/employees` - Get all employees (minimal data)
- `GET /api/employees/:id` - Get single employee (full details)
- `POST /api/employees` - Create employee record
- `PUT /api/employees/:id` - Update employee record
- `DELETE /api/employees/:id` - Delete employee record
- `POST /api/employees/:id/consent` - Update consent records

### Audits
- `GET /api/audits` - Get all audits
- `GET /api/audits/:id` - Get single audit
- `POST /api/audits` - Create audit
- `PUT /api/audits/:id` - Update audit
- `DELETE /api/audits/:id` - Delete audit

### Reports
- `GET /api/reports/comprehensive` - Get comprehensive compliance report
- `GET /api/reports/privacy-impact` - Get privacy impact report
- `GET /api/reports/deadlines` - Get upcoming deadlines and overdue items

## 🔒 Privacy Features

### Data Minimization
- Employee list view shows only essential information
- Full details accessible only when specifically requested
- No unnecessary data collection

### Consent Management
- Track consent for different data processing activities
- Record consent dates and expiry
- Easy consent audit trail

### Privacy Impact Assessment
- Each compliance item can be tagged with privacy impact level
- Detailed privacy impact descriptions
- Privacy metrics in reporting dashboard

### Transparency
- Clear labeling of privacy-focused features
- Privacy compliance scoring in audits
- Dedicated privacy impact reports

## 🎨 Usage

### Adding a Compliance Item
1. Navigate to "Compliance" section
2. Click "+ Add New Item"
3. Fill in required fields:
   - Title and description
   - Category (Working Hours, Wages, Safety, etc.)
   - Regulation reference
   - Priority and status
   - Privacy impact assessment
4. Save the item

### Managing Employees
1. Navigate to "Employees" section
2. Click "+ Add Employee"
3. Enter minimal required information
4. Full details can be viewed/edited later

### Scheduling Audits
1. Navigate to "Audits" section
2. Click "+ Schedule Audit"
3. Set audit date, auditor, and category
4. Record privacy compliance metrics
5. Add findings as needed

### Viewing Reports
1. Navigate to "Reports" section
2. Choose from:
   - Comprehensive Report (overall compliance status)
   - Privacy Impact (consent coverage, privacy metrics)
   - Deadlines (upcoming and overdue items)

## 📝 License

This project is created for labour law compliance management with a focus on privacy protection.

## 👥 Support

For questions or support, please contact your system administrator.

---

**Note**: This system is designed to help organizations maintain labour law compliance while respecting employee privacy and minimizing data intrusion.
