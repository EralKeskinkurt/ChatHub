"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import chatHubApi from "@/lib/axios"; // axios instance'ını burada tuttuğunu varsayıyorum
import { refreshAccessToken } from "@/utils/auth"; // token yenileme fonksiyonun

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          queryFn: async ({ queryKey }) => {
            const [url] = queryKey;
            try {
              const res = await chatHubApi.get(url as string);
              return res.data;
            } catch (err: any) {
              if (err.response?.status === 401) {
                try {
                  await refreshAccessToken();
                  const retryRes = await chatHubApi.get(url as string);
                  return retryRes.data;
                } catch (_refreshErr) {
                  throw new Error("Unauthorized and refresh failed");
                }
              }

              throw err;
            }
          },
        },
      },
    });
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
