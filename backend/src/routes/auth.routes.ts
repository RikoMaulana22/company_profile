// backend/src/routes/auth.routes.ts
import { Router } from 'express';
import { login, register, getAdminProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get('/me', authenticate, getAdminProfile); // Route untuk cek user yang sedang login

export default authRoutes;
