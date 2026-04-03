# Finance Backend API

## 📌 Overview
This project is a backend REST API for managing financial records such as income and expenses.  
It includes secure authentication, role-based access control, and summary reporting.

The application is built without a frontend and is tested using Postman.

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **JWT (JSON Web Tokens)**
- **MongoDB / SQL (based on implementation)**
- **Postman** (for API testing)

---

## ✨ Features
- User authentication using JWT
- Role-based access control (Admin / User)
- Create and view financial records
- Dashboard summary with total income, expense, and balance
- Clean project structure with separation of concerns

---

## 📂 Project Structure
```text
finance-backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   └── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

---

## 🔐 Authentication
Protected routes require a JWT token.
Authorization: Bearer <JWT_TOKEN>

---
⚙️ How to Run Locally
Clone the repository
git clone https://github.com//finance-backend-api.git
Navigate to the project folder
cd finance-backend-api
Install dependencies
npm install
Create a .env file
PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
Start the server
npm start

Server will run on:

http://localhost:3000
