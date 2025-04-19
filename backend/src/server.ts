import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';

dotenv.config();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const PORT: number = Number(process.env.PORT) || 5000;

server.listen(PORT, (): void => {
    console.log(`✅ Sunucu ${PORT} portunda çalışıyor...`);
});
