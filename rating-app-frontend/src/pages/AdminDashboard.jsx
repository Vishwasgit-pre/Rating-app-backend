// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.warn("Using mock stats (no backend admin stats endpoint found).");
      setStats({
        totalUsers: 12,
        totalStores: 5,
        totalRatings: 48,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <p>Loading admin stats...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <div style={{ padding: 14, border: "1px solid #dcdcdc", borderRadius: 8, background: "#fff", color: "#111" }}>
          <h3>Total Users</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.totalUsers}</div>
        </div>

        <div style={{ padding: 14, border: "1px solid #dcdcdc", borderRadius: 8, background: "#fff", color: "#111" }}>
          <h3>Total Stores</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.totalStores}</div>
        </div>

        <div style={{ padding: 14, border: "1px solid #dcdcdc", borderRadius: 8, background: "#fff", color: "#111" }}>
          <h3>Total Ratings</h3>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.totalRatings}</div>
        </div>
      </div>

      <p style={{ marginTop: 20, fontSize: 13, color: "#666" }}>
        Note: If the backend `/admin/stats` endpoint is not available, mock values are shown for demo purposes.
      </p>
    </div>
  );
}
