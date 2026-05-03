import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BASEURL || 'http://localhost:8080/api/',
    withCredentials: true,
});

export default api;