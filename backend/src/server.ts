import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import { startSocketServer } from './socket/socketServer';

dotenv.config();

const server = http.createServer(app);

startSocketServer(server)

const PORT: number = Number(process.env.PORT) || 5000;

server.listen(PORT, (): void => {
    console.log(`✅ Sunucu ${PORT} portunda çalışıyor...`);
});
