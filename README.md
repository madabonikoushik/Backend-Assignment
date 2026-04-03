# Finance Backend API

## 📌 Overview
This project is a backend REST API for managing financial records such as income and expenses.  
It includes secure authentication, role-based access control, and summary reporting.

The application is built **without a frontend** and is tested using **Postman**.

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **JWT (JSON Web Tokens)**
- **Database**: MongoDB / SQL (based on implementation)
- **Postman** (for API testing)

---

## ✨ Features
- User authentication using JWT
- Role-based access control (Admin / User)
- Create and view financial records
- Dashboard summary with total income, expense, and balance
- Clean and modular project structure

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
