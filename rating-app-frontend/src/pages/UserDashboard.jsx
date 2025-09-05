// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const LIKELY_ENDPOINTS = [
  "/stores",
  "/api/stores",
  "/stores/all",
  "/store",
  "/api/store",
  "/stores/list",
];

const MOCK_STORES = [
  { id: "m1", name: "Demo Coffee", address: "123 Demo St", avgRating: 4.2 },
  { id: "m2", name: "Sample Bakery", address: "45 Sample Ave", avgRating: 3.9 },
];

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [endpointUsed, setEndpointUsed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    let mounted = true;

    const tryEndpoints = async () => {
      setLoading(true);
      setErrorMsg(null);
      for (const ep of LIKELY_ENDPOINTS) {
        try {
          const res = await api.get(ep);
          const data = Array.isArray(res.data) ? res.data : res.data?.stores ?? res.data?.data ?? res.data;
          if (mounted && data) {
            setStores(data);
            setEndpointUsed(ep);
            setLoading(false);
            console.log("Stores loaded from", ep, res.data);
            return;
          }
        } catch (err) {
          console.warn(`Endpoint ${ep} failed:`, err?.response?.status, err?.response?.data ?? err.message);
          continue;
        }
      }

      // fallback to mock data
      if (mounted) {
        setStores(MOCK_STORES);
        setErrorMsg("Could not find backend /stores endpoint. Using mock data.");
        setLoading(false);
        setEndpointUsed(null);
      }
    };

    tryEndpoints();

    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>User Dashboard</h2>
        <div><button onClick={logout}>Logout</button></div>
      </div>

      <div style={{ marginTop: 8, color: "#666" }}>
        {loading ? <div>Loading stores…</div> : endpointUsed ? <div>Loaded from endpoint: <strong>{endpointUsed}</strong></div> : <div style={{ color: "#a00" }}>{errorMsg}</div>}
      </div>

      <div style={{ marginTop: 16 }}>
        {stores.length === 0 && !loading && <div>No stores available.</div>}
        {stores.map((s) => (
          <div key={s.id ?? s.name} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 600 }}>{s.name}</div>
            <div style={{ color: "#555" }}>{s.address}</div>
            <div>Overall Rating: {s.avgRating ?? s.average ?? "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
