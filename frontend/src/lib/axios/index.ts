import axios from "axios";

const chatHubApi = axios.create({
    withCredentials: true,
    baseURL: "https://api.senin-domainin.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default chatHubApi;