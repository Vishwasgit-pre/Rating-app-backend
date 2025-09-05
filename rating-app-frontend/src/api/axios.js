import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // or "http://localhost:5000/api" if backend uses /api prefix
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
