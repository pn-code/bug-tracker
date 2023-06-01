import axios from "axios";

const serverAPI = axios.create({
    baseURL: process.env.BASE_URL,
})

export default serverAPI;