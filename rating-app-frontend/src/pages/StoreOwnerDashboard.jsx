// src/pages/StoreOwnerDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadRatings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/owner/ratings");
      if (res.data && res.data.ratings) {
        setRatings(res.data.ratings);
        setAvg(res.data.average ?? (res.data.ratings.reduce((s, r) => s + (r.score || 0), 0) / Math.max(1, res.data.ratings.length)));
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.warn("Using mock ratings (no backend endpoint found).");
      const mock = [
        { id: 1, user: "Aisha", score: 5, comment: "Excellent service!" },
        { id: 2, user: "Bilal", score: 4, comment: "Good experience overall." },
      ];
      setRatings(mock);
      setAvg(mock.reduce((s, r) => s + r.score, 0) / mock.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRatings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <p>Loading owner ratings...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ margin: 0 }}>Store Owner Dashboard</h2>
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

      <div style={{ padding: 14, border: "1px solid #dcdcdc", borderRadius: 8, background: "#fff", color: "#111" }}>
        <h3>Average Rating</h3>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{avg ? Number(avg).toFixed(2) : "-"}</div>
      </div>

      <h3 style={{ marginTop: 18 }}>Ratings</h3>
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
          {ratings.map((r) => (
            <div key={r.id} style={{ padding: 12, border: "1px solid #dcdcdc", borderRadius: 8, background: "#fff", color: "#111" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{r.user}</strong>
                  <div style={{ color: "#555", fontSize: 13 }}>{r.comment}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{r.score}/5</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p style={{ marginTop: 16, color: "#666", fontSize: 13 }}>
        Note: If no backend endpoint exists for owner ratings, mock data is shown for demo purposes.
      </p>
    </div>
  );
}
