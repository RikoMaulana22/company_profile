// backend/src/index.ts

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import prisma from './lib/prisma.js';

import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js'; 

let server: any = null;

const PORT = process.env.PORT || 5000;
const app = express();

// --- Middleware ---
app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000', 
    process.env.FRONTEND_URL 
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) { 
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
        await prisma.$connect();
        console.log('💾 Database connected successfully.');

        // ROUTES INTEGRATION
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Welcome to Company Profile API!',
                databaseStatus: 'Connected',
                version: '1.0.1' 
            });
        });

        app.use('/api/auth', authRoutes);
        app.use('/api', companyRoutes);

        // STARTING SERVER
        server = app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server or connect DB:', error);
        await prisma.$disconnect(); 
        process.exit(1);
    }
}

// Handler untuk mematikan server secara graceful (Graceful Shutdown)
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

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

main();