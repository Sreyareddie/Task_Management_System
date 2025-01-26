import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-system-7xhm.vercel.app/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
