"use client";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import UseNotificationListener from "@/hooks/useNotificationListener";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ["/auth/me"],
  });

  const isAuthenticated = !!data;

  useSocket(isAuthenticated);
  UseNotificationListener();
  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (error) {
      setUser(null);
    }
  }, [data, error, setUser]);

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center fixed z-30 dark:bg-theme-dark bg-theme-light">
        <Loading />
      </div>
    );
  return <>{children}</>;
}
