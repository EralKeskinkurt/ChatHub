import chatHubApi from "@/lib/axios";

export const refreshAccessToken = async () => {
    const res = await chatHubApi.post("/auth/refresh");
    return res.data;
};