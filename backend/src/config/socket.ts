import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`🔌 New client connected: ${socket.id}`);

        socket.on("message", (data) => {
            console.log("Received message:", data);
            io.emit("message", data); // Broadcast to all clients
        });

        socket.on("disconnect", () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
};
