import axios from "axios";

const api = axios.create({
    // servidor aws
    //baseURL: "http://3.140.193.152:3300"
    // vercel
    baseURL: "https://odapp-challenge-backend.vercel.app"
});

export default api;