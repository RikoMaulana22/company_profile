// backend/src/routes/authRoutes.ts

import { Router } from 'express';
import { login, register, getAdminProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register); 

router.get('/profile', protect, getAdminProfile); 

export default router;