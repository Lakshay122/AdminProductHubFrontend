import axios from "axios";

//Base Url
const api = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: "https://adminproducthub.onrender.com/api/",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
