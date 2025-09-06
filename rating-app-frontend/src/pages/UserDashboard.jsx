// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const loadStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.warn("Could not find backend /stores endpoint. Using mock data.");
      setStores([
        { id: 1, name: "Demo Coffee", address: "123 Demo St", averageRating: 4.2 },
        { id: 2, name: "Sample Bakery", address: "45 Sample Ave", averageRating: 3.9 },
      ]);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleRate = (storeId, rating) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              averageRating: ((s.averageRating + rating) / 2).toFixed(1),
            }
          : s
      )
    );
  };

  let filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "high") {
    filteredStores = [...filteredStores].sort((a, b) => b.averageRating - a.averageRating);
  } else if (sort === "low") {
    filteredStores = [...filteredStores].sort((a, b) => a.averageRating - b.averageRating);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2>User Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          marginBottom: 20,
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

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            width: "60%",
            marginRight: 10,
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        >
          <option value="">Sort by...</option>
          <option value="high">Rating High → Low</option>
          <option value="low">Rating Low → High</option>
        </select>
      </div>

      {filteredStores.map((store) => (
        <div
          key={store.id}
          style={{
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 8,
            marginBottom: 12,
            background: "#f9f9f9", // ✅ fixed background
            color: "#222",         // ✅ dark text
          }}
        >
          <h3 style={{ margin: "4px 0", fontWeight: "600" }}>{store.name}</h3>
          <p style={{ margin: "2px 0" }}>{store.address}</p>
          <p style={{ margin: "2px 0" }}>
            <strong>Overall Rating:</strong> {store.averageRating}
          </p>

          <label style={{ display: "block", marginTop: 8 }}>
            Rate this store:{" "}
            <select
              onChange={(e) => handleRate(store.id, parseFloat(e.target.value))}
              defaultValue=""
              style={{ marginLeft: 8, padding: 4 }}
            >
              <option value="" disabled>
                Select rating
              </option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}
