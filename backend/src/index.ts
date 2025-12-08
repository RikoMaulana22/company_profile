// backend/src/index.ts (Perubahan)

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config'; // ✅ PENTING: Untuk memuat variabel lingkungan (.env)
import prisma from './lib/prisma.js';

// Import Router yang baru dibuat
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js'; // Rute akan dibuat di langkah selanjutnya

let server: any = null;

const PORT = process.env.PORT || 5000;
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// -------------------------------
// Fungsi Utama
// -------------------------------
async function main() {
    try {
        // Connect to database
        await prisma.$connect();
        console.log('💾 Database connected successfully.');

        // -------------------------------
        // ROUTES INTEGRATION
        // -------------------------------

        // Root Endpoint
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({
                message: 'Welcome to Company Profile API!',
                databaseStatus: 'Connected',
            });
        });

        // ✅ Integrasi Rute Modul
        app.use('/api/auth', authRoutes);
        app.use('/api', companyRoutes); // Menggunakan /api sebagai prefix

        // -------------------------------\r\n
        // STARTING SERVER
        // -------------------------------\r\n
        server = app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        // ... (Error handling tetap sama) ...
        console.error('❌ Failed to start server or connect DB:', error);
        process.exit(1);
    }
}

// ... (Proses shutdown tetap sama) ...
main();