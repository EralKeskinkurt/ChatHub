"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState<QueryClient>(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
