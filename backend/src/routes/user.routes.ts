// company-profile-app/backend/src/routes/user.routes.ts

import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';
import { getUserProfile } from '../controllers/user.controller';

const userRoutes = Router();

// Admin: Mendapatkan semua pengguna (Placeholder)
userRoutes.get('/', authenticate, checkRole('admin'), (req, res) => res.json({ message: 'Get all users placeholder' }));

// Umum: Mendapatkan profil pengguna spesifik (Membutuhkan autentikasi)
userRoutes.get('/:id', authenticate, getUserProfile); 

// ... Tambahkan rute untuk PUT, DELETE, dll.

export default userRoutes;