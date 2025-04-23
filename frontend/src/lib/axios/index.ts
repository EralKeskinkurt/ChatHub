import axios from "axios";

const chatHubApi = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

export default chatHubApi;