import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin-dashboard" element={role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={role === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/owner-dashboard" element={role === "owner" ? <StoreOwnerDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
