// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Map test accounts to roles for frontend-only testing
  const TEST_ROLE_MAP = {
    "Testadmin123@example.com": "admin",
    "Testowner123@example.com": "owner",
    "Testuser123@example.com": "user",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("LOGIN SUCCESS RESPONSE:", res.data);

      if (res.data && res.data.token) {
        const decoded = jwtDecode(res.data.token);
        console.log("Decoded JWT payload:", decoded);

        let role = decoded.role;

        // Frontend-only override for known test accounts
        if (TEST_ROLE_MAP[email]) {
          role = TEST_ROLE_MAP[email];
        }

        console.log("Final role resolved:", role);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "owner") {
          navigate("/owner");
        } else {
          navigate("/user");
        }
      } else {
        setError("Login response missing token/role.");
        console.error("Login response missing token/role — check payload", res.data);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 320,
          background: "#fff",
          padding: 20,
          border: "1px solid #dcdcdc",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            border: "none",
            background: "#3498db",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p style={{ fontSize: 14 }}>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
