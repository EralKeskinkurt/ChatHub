import axios from "axios";

const chatHubApi = axios.create({
    baseURL: "https://api.senin-domainin.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default chatHubApi;