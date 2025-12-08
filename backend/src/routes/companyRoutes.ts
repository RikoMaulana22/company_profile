// backend/src/routes/companyRoutes.ts

import { Router } from 'express';
import { getCompanyProfile, updateCompanyProfile } from '../controllers/companyController.js';
import { createService, getAllServices, updateService, deleteService } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Rute Profil Perusahaan
router.get('/profile', getCompanyProfile);
router.put('/profile', protect, updateCompanyProfile);

// Rute Layanan (Services)
router.get('/services', getAllServices);
router.post('/services', protect, createService);
router.put('/services/:id', protect, updateService);
router.delete('/services/:id', protect, deleteService);

export default router;