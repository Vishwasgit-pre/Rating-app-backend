// src/pages/StoreOwnerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MOCK_RATINGS = [
  { id: "r1", user: "Aisha", rating: 5, comment: "Excellent service!" },
  { id: "r2", user: "Bilal", rating: 4, comment: "Good experience overall." },
];

export default function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState(MOCK_RATINGS);
  const [avg, setAvg] = useState(
    (MOCK_RATINGS.reduce((s, r) => s + r.rating, 0) / MOCK_RATINGS.length).toFixed(2)
  );
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
      const endpoints = [
        "/owner/ratings",
        "/api/owner/ratings",
        "/stores/ratings",
        "/api/stores/ratings",
      ];
      for (const ep of endpoints) {
        try {
          const res = await api.get(ep);
          if (!mounted) return;
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.ratings ?? res.data?.data ?? [];

          if (data.length > 0) {
            setRatings(data);
            setAvg(
              (
                data.reduce((s, r) => s + (r.rating || 0), 0) / data.length
              ).toFixed(2)
            );
            setEndpointUsed(ep);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("StoreOwner endpoint failed:", ep, err?.response?.status ?? err.message);
        }
      }

      // fallback mock data
      if (mounted) {
        setRatings(MOCK_RATINGS);
        setAvg(
          (MOCK_RATINGS.reduce((s, r) => s + r.rating, 0) / MOCK_RATINGS.length).toFixed(2)
        );
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
        <h2>Store Owner Dashboard</h2>
        <div>
          <button onClick={logout} style={{ padding: "6px 10px" }}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading ? (
          <div>Loading ratings…</div>
        ) : endpointUsed ? (
          <div>Loaded from endpoint: <strong>{endpointUsed}</strong></div>
        ) : (
          <div style={{ color: "#666" }}>Using mock ratings (no backend endpoint found).</div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 600 }}>Average Rating: {avg}</div>
        <div style={{ marginTop: 12 }}>
          {ratings.length === 0 ? (
            <div>No ratings yet.</div>
          ) : (
            ratings.map((r) => (
              <div
                key={r.id}
                style={{
                  border: "1px solid #ddd",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                }}
              >
                <div>
                  <strong>{r.user}</strong> — {r.rating}/5
                </div>
                <div style={{ color: "#555", marginTop: 6 }}>{r.comment}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
