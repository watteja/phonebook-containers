import axios from "axios";

const apiClient = axios.create({
  // if VITE_BACKEND_URL is not defined, assume that you're running backend locally
  // (instead of from a container)
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
});

export default apiClient;
