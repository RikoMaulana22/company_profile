// company-profile-app/backend/src/index.ts

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import prisma from './lib/prisma'; // Menggunakan lib/prisma yang sudah dibuat (aman hot-reload)
import mainRouter from './routes'; // Router pusat

let server: any = null;

const PORT = process.env.PORT || 5000;
const app = express();

// --- Middleware ---
app.use(express.json());

// Konfigurasi CORS
const allowedOrigins = [
    'http://localhost:3000', 
    process.env.FRONTEND_URL || '', // Tambahkan fallback string kosong
];

app.use(cors({
    origin: (origin, callback) => {
        // Izinkan request tanpa origin (misal Postman/cURL)
        if (!origin) return callback(null, true);
        
        // Cek apakah origin termasuk yang diizinkan
        if (allowedOrigins.includes(origin)) { 
            return callback(null, true);
        }
        return callback(new Error('Kebijakan CORS melarang akses dari Origin ini.'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// -------------------------------
// Fungsi Utama (main)
// -------------------------------
async function main() {
    try {
        // Cek koneksi database
        await prisma.$connect();
        console.log('💾 Database connected successfully.');

        // --- ROUTES INTEGRATION ---
        
        // Root Endpoint untuk pengecekan server
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Welcome to Company Profile API!',
                databaseStatus: 'Connected',
                version: '1.0.1',
                serverTime: new Date().toISOString()
            });
        });

        // Register Main Router
        app.use('/api', mainRouter); // Semua rute API di bawah prefix /api

        // --- STARTING SERVER ---
        server = app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server or connect DB:', error);
        await prisma.$disconnect(); 
        process.exit(1);
    }
}

// -------------------------------
// Graceful Shutdown
// -------------------------------
const gracefulShutdown = async () => {
    console.log('\n🚪 Menerima sinyal penutupan. Mematikan server...');
    if (server) {
        server.close(async () => {
            console.log('🛑 Server dihentikan.');
            await prisma.$disconnect();
            console.log('👋 Koneksi database diputus.');
            process.exit(0);
        });
    } else {
        await prisma.$disconnect();
        process.exit(0);
    }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);    


main(); // Jalankan aplikasi