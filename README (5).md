# Rating App – Full Stack Project

This project includes both **backend** and **frontend** inside a single repository.

---

## 🚀 Backend (Express + MySQL)

### Setup
1. Go to the backend folder (root of repo):
   ```bash
   cd Rating-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with database details:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=rating_app
   JWT_SECRET=yourjwtsecret
   ```
4. Run the backend:
   ```bash
   node server.js
   ```
5. Backend runs at: **http://localhost:5000**

---

## 💻 Frontend (React + Vite)

### Setup
1. Go to the frontend folder:
   ```bash
   cd rating-app-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```
4. Frontend runs at: **http://localhost:5173**

---

## 👥 Test Accounts (for demo)

Use these emails with password `Pass@1234`:

- **Admin:** `Testadmin123@example.com` → Admin Dashboard  
- **Owner:** `Testowner123@example.com` → Store Owner Dashboard  
- **User:** `Testuser123@example.com` → User Dashboard  

👉 Roles are mapped in frontend for demo purposes.  
👉 Dashboards show **mock fallback data** if backend endpoints are not found.

---

## ✅ Features Implemented

- User authentication (signup & login with JWT).  
- Role-based dashboards:
  - **User Dashboard** → list of stores.  
  - **Admin Dashboard** → platform statistics.  
  - **Store Owner Dashboard** → ratings and average score.  
- Mock fallback data ensures dashboards are never empty.  
- Logout functionality.  
