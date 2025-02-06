import axios from "axios";

const baseUrl = process.env.VITE_BASE_URL

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("authToken")

    if (['post', 'put', 'delete'].includes(config.method) && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
})

export default axiosInstance