import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  withCredentials: true,
  autoConnect: false,
});

export function useSocket(shouldConnect: boolean) {
  useEffect(() => {
    if (shouldConnect) {
      socket.connect();

      socket.on("connect", () => {
        console.log("✅ Connected to server with socket id:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connection error:", err.message);
      });

      socket.on("message", (msg) => {
        console.log("📩 Message from server:", msg);
      });
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("🔌 Disconnected from socket server.");
      }
    };
  }, [shouldConnect]);
}
