// src/api.js
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { "Content-Type": "application/json" },
});

// リクエスト前に JWT をセット
api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
