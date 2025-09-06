# Rating App

A full-stack rating application built as part of the internship coding challenge.

---

## 🚀 Features
- **User Authentication**: Signup and login using email & password.
- **Role-Based Dashboards**:
  - **User** → View list of stores, see ratings, and rate stores.
  - **Store Owner** → View ratings and feedback given to their store.
  - **Admin** → View overall statistics: total users, stores, and ratings.
- **JWT Authentication**: Secure login using tokens stored in localStorage.
- **Responsive UI** with a clean, simple design.

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express + SQLite
- **Authentication**: JWT (JSON Web Token)

---

## 📂 Project Structure
```
Rating-app-backend/
│
├── rating-app-frontend/    # React frontend (Vite)
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── StoreOwnerDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server.js               # Express backend server
├── database.sqlite         # SQLite database
├── package.json
└── README.md
```

---

## ▶️ Running the Project

### 1. Start Backend
```bash
cd Rating-app-backend
node server.js
```
Backend runs at **http://localhost:5000**

### 2. Start Frontend
```bash
cd rating-app-frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 🧪 Test Accounts
Sample accounts for quick testing:
- **Admin**: `Testadmin123@example.com`
- **Owner**: `Testowner123@example.com`
- **User**: `Testuser123@example.com`

(Passwords can be set during signup.)

---

## ✅ Status
- Backend API setup with authentication.  
- Frontend with role-based dashboards.  
- Integrated JWT login & routing.  
- Project complete and ready for review.  

---
