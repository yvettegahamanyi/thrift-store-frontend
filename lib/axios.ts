import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "https://thrift-store-backend.onrender.com/",
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Get token from Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
