# Rating App

A full-stack rating application built as part of the internship coding challenge.

---

## 🚀 Features
- **User Authentication**: Signup and login using email & password.
- **Role-Based Dashboards**:
  - **User** → View list of stores, see ratings, and rate stores.
  - **Store Owner** → View ratings given to their store (mock fallback data).
  - **Admin** → View overall statistics: total users, stores, and ratings (mock fallback data).
- **JWT Authentication**: Secure login using tokens stored in localStorage.
- **Mock Fallbacks**:  
  If a backend endpoint does not exist (e.g., `/stores`, `/owner/ratings`, `/admin/stats`), the frontend automatically displays mock data so dashboards always remain functional.
- **Clean UI** with styled components for readability.

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express + SQLite
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Inline React styles (lightweight, no CSS framework)

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
Server runs at **http://localhost:5000**

### 2. Start Frontend
```bash
cd rating-app-frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 🧪 Test Accounts
For testing roles in the frontend:
- **Admin**: `Testadmin123@example.com`
- **Owner**: `Testowner123@example.com`
- **User**: `Testuser123@example.com`

⚠️ Note: Passwords can be set at signup. Backend always encodes `role: user`, so the frontend maps these test accounts to their intended roles.

---

## 📌 Notes
- Some backend routes (`/stores`, `/owner/ratings`, `/admin/stats`) are not implemented.  
- The frontend **gracefully falls back to mock data** so dashboards still work.  
- This ensures smooth demonstration of all features even without a fully developed backend.

---

## ✅ Status
Day 1 → Backend setup, JWT login.  
Day 2 → Frontend setup, dashboards, role integration.  
Day 3 → Signup flow, styling fixes, mock fallbacks.  
Day 4 → Final polish, README, and submission.  

---
