import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api"
});


//Attach token automatically

api.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
},(error) => Promise.reject(error));

