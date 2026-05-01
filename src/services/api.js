import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://backend-nprs.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
});

// token auto add
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const login = (data) => API.post("/auth/login", data);

export const signup = (data) => API.post("/auth/signup", data);

// UPLOAD
export const uploadImage = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// HISTORY
export const getHistory = () => API.get("/history");

export default API;