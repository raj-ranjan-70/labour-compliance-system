# 🚀 Quick Start Guide

Welcome to the **Labour Laws Compliance Management System**! This guide will help you set up the project locally on your machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download Here](https://nodejs.org/)
- **Git** - [Download Here](https://git-scm.com/)
- A **MongoDB Atlas** account (Free Tier is fine) - [Sign Up Here](https://www.mongodb.com/cloud/atlas)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
Open your terminal and clone the project:
```bash
git clone <repository_url>
cd "Raj Project"
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

#### Database Configuration
1.  Log in to **MongoDB Atlas**.
2.  Create a new Cluster (the free shared tier works great).
3.  In "Database Access", create a database user (e.g., `adminUser` / `password123`).
4.  In "Network Access", allow access from anywhere (`0.0.0.0/0`) or your specific IP.
5.  Go to "Database" -> "Connect" -> "Drivers" and copy the **Connection String**.

#### Environment Variables
Create a `.env` file in the `backend` folder.

Open `.env` and paste your connection string:
```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=development
```
*(Replace `<username>` and `<password>` with your Atlas credentials)*

#### Seed the Database
Populate your database with demo data:
```bash
node seed.js
```
*You should see a success message and a list of created users.*

#### Start the Backend
```bash
node server.js
```
*Server running on: http://localhost:5001*

---

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend folder, and install dependencies:
```bash
cd ../frontend
npm install
```

#### Start the Frontend
```bash
npm run dev
```
*Application running on: http://localhost:5173 (or similar)*

---

## 🔑 Demo Credentials

Once the application is running, use these credentials to log in:

### 3. Log In
Use the following credentials:

- **Admin**: `admin@example.com` / `Password@123`
- **Manager**: `manager@example.com` / `Password@123`
- **Auditor**: `auditor@example.com` / `Password@123`
- **Viewer**: `viewer@example.com` / `Password@123`

---

## 🐞 Troubleshooting

- **MongoDB Connection Error?**
  - Check if your IP is whitelisted in MongoDB Atlas.
  - Ensure your username/password in `.env` are correct (special characters might need encoding).

- **Frontend can't connect to Backend?**
  - Ensure the backend is running on `PORT=5001`.
  - Check the browser console for CORS errors.

- **Dark Mode not working?**
  - Try clearing your browser's Local Storage or cache.

---

**Happy Coding! 🎉**
