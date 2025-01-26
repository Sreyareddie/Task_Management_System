import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-system-two-beta.vercel.app/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
