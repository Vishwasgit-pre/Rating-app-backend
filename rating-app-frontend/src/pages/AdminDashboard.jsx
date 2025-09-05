// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MOCK_STATS = { users: 12, stores: 5, ratings: 48 };

export default function AdminDashboard() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [endpointUsed, setEndpointUsed] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    let mounted = true;

    const tryFetch = async () => {
      setLoading(true);
      const endpoints = ["/admin/stats", "/api/admin/stats", "/stats", "/api/stats"];
      for (const ep of endpoints) {
        try {
          const res = await api.get(ep);
          if (!mounted) return;
          const data = res.data ?? {};
          if (data.users || data.stores || data.ratings) {
            setStats({
              users: data.users ?? MOCK_STATS.users,
              stores: data.stores ?? MOCK_STATS.stores,
              ratings: data.ratings ?? MOCK_STATS.ratings,
            });
            setEndpointUsed(ep);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Admin endpoint failed:", ep, err?.response?.status);
        }
      }
      if (mounted) {
        setStats(MOCK_STATS);
        setEndpointUsed(null);
        setLoading(false);
      }
    };

    tryFetch();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Dashboard</h2>
        <div>
          <button onClick={logout} style={{ padding: "6px 10px" }}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading admin stats…</div>
        ) : endpointUsed ? (
          <div>Loaded from endpoint: <strong>{endpointUsed}</strong></div>
        ) : (
          <div style={{ color: "#666" }}>
            Using mock stats (no backend admin stats endpoint found).
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{stats.users}</div>
          <div style={{ color: "#666" }}>Total Users</div>
        </div>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{stats.stores}</div>
          <div style={{ color: "#666" }}>Total Stores</div>
        </div>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{stats.ratings}</div>
          <div style={{ color: "#666" }}>Total Ratings</div>
        </div>
      </div>
    </div>
  );
}
