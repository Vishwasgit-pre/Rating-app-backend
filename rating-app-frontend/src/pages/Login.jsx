// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Force roles based on your actual emails
  const TEST_ROLE_MAP = {
    "Testadmin123@example.com": "admin",
    "Testowner123@example.com": "owner",
    "Testuser123@example.com": "user",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("LOGIN SUCCESS RESPONSE:", res.data);

      const payload = res.data ?? {};
      const token =
        payload.token ??
        payload.accessToken ??
        payload.access_token ??
        null;

      if (!token) {
        alert("Login succeeded but no token found.");
        return;
      }

      // 🔹 Always prefer forced mapping
      let role = TEST_ROLE_MAP[email];

      if (!role) {
        alert(
          `This account (${email}) is not in TEST_ROLE_MAP. Please add it in Login.jsx if you want to test more roles.`
        );
        return;
      }

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "owner") navigate("/owner-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      const serverMsg =
        err.response?.data?.message ??
        err.response?.data ??
        err.message;
      alert("Login failed: " + JSON.stringify(serverMsg));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f4f9",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 320,
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <p style={{ marginTop: 10, fontSize: 14, textAlign: "center" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}
