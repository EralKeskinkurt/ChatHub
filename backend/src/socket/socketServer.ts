import { Server, Socket } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middlewares/socketAuth";

interface CustomSocket extends Socket {
    user?: any;
}

const activeSockets = new Map<string, string>();

let io: Server;

export function startSocketServer(server: http.Server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        },
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket: CustomSocket) => {
        console.log("User connected:", socket.user);

        const userId = socket.user.userId;

        activeSockets.set(userId, socket.id);

        socket.on("send_message", (message: string) => {
            console.log("Message from user:", socket.user, message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.user);
            activeSockets.delete(userId);
        });
    });

    return io;
}


export function getSocketId(userId: string): string | undefined {
    return activeSockets.get(userId);
}

export { io }; 
