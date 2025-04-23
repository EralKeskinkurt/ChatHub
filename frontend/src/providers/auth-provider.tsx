"use client";

import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import Loading from "@/components/Loading";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ["/auth/me"],
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (error) {
      setUser(null);
    }
  }, [data, error, setUser]);

  if (isLoading) return <Loading />;
  return <>{children}</>;
}
