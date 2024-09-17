"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "../provider/AuthProvider";

const queryClient = new QueryClient();

export default function ClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
