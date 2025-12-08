// backend/src/routes/authRoutes.ts

import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

// Rute POST /api/auth/login
// Akan digunakan oleh frontend untuk mengirim email dan password
router.post('/login', authController.login);

// Rute POST /api/auth/register
// Digunakan hanya sekali untuk membuat user admin pertama
router.post('/register', authController.register); 

export default router;