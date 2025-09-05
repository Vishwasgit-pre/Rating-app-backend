// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#f4f4f9"}}>
      <form onSubmit={handleSignup} style={{width:320, background:"#fff", padding:20, borderRadius:8, boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>
        <h2 style={{textAlign:"center", marginBottom:16}}>Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{width:"100%", padding:10, marginBottom:10, border:"1px solid #ccc", borderRadius:4}}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{width:"100%", padding:10, marginBottom:10, border:"1px solid #ccc", borderRadius:4}}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={{width:"100%", padding:10, marginBottom:10, border:"1px solid #ccc", borderRadius:4}}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{width:"100%", padding:10, marginBottom:12, border:"1px solid #ccc", borderRadius:4}}
          required
        />
        <button type="submit" style={{width:"100%", padding:10, background:"#28a745", color:"#fff", border:"none", borderRadius:4, cursor:"pointer"}}>
          Create account
        </button>
        <p style={{marginTop:10, fontSize:14, textAlign:"center"}}>
          Already registered? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
