import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

// .env dosyasındaki ortam değişkenlerini yükle
dotenv.config();

const app = express();
const server = http.createServer(app);  // Express'i HTTP sunucusuna sarıyoruz
const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:3000",  // Next.js frontend'inizin adresi
        methods: ["GET", "POST"],
    },
});  // Socket.IO sunucusunu başlatıyoruz
const PORT: number = Number(process.env.PORT) || 5000;

// Middleware'ler
app.use(express.json());  // JSON veri desteği
app.use(cors());  // CORS desteği
app.use(morgan('dev'));  // Loglama

// Socket.IO bağlantıları
io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı!');

    // Mesaj alındığında
    socket.on('message', (msg: string) => {
        console.log('Mesaj alındı:', msg);
        socket.emit('message', 'Sunucudan gelen cevap: ' + msg);  // Kullanıcıya cevap gönder
    });

    // Bağlantı kapatıldığında
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı bağlantıyı kesti!');
    });
});

// Örnek Ana Route
app.get('/', (req: Request, res: Response): void => {
    res.send('Express.js Sunucusu Çalışıyor 🚀');
});

// Sunucuyu Başlat
server.listen(PORT, (): void => {
    console.log(`✅ Sunucu ${PORT} portunda çalışıyor...`);
});
