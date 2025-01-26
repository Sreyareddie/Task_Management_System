import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL ? "https://task-management-system-backend-19oc.onrender.com/api":"http://localhost:4000/api";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
