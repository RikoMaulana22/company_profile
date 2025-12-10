// company-profile-app/backend/src/routes/index.ts

import { Router } from 'express';
import authRoutes from './auth.routes';
import companyRoutes from './company.routes'; 
import userRoutes from './user.routes'; 
// import { authenticate } from '../middlewares/auth.middleware'; // Diimpor di router spesifik jika perlu

const mainRouter = Router();

// Rute Publik (Autentikasi)
mainRouter.use('/auth', authRoutes);

// Rute Perusahaan (Beberapa publik, beberapa perlu autentikasi)
// Catatan: companyRoutes sudah menerapkan autentikasi di dalamnya
mainRouter.use('/company', companyRoutes);

// Rute Manajemen Pengguna (Dilindungi)
// Catatan: userRoutes sudah menerapkan autentikasi/role di dalamnya
mainRouter.use('/users', userRoutes); 

// Endpoint untuk pengecekan root API (opsional, bisa juga di index.ts)
mainRouter.get('/', (req, res) => res.status(200).json({ message: 'API aktif. Gunakan /company, /auth, /users.' }));


export default mainRouter;