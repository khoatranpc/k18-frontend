import axios from "axios";
import { Obj } from "@/global/interface";

const httpClient = axios.create({
    baseURL: 'https://k18-backend.vercel.app',
});
httpClient.interceptors.request.use(function (config) {
    (config.headers as Obj).Authorization = localStorage.getItem('access_token') as string;
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default httpClient;
