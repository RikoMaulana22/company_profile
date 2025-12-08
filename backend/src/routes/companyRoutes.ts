// backend/src/routes/companyRoutes.ts

import { Router } from 'express';
import * as companyController from '../controllers/companyController.js';
import * as serviceController from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware otorisasi

const router = Router();

// ===================================
// Rute Company Profile
// ===================================

// GET /api/profile : Mendapatkan data profil perusahaan (Akses Publik)
router.get('/profile', companyController.getCompanyProfile);

// PUT /api/profile : Memperbarui data profil (Akses Admin)
router.put('/profile', protect, companyController.updateCompanyProfile);


// ===================================
// Rute Services (Layanan)
// ===================================

// GET /api/services : Mendapatkan semua layanan (Akses Publik)
router.get('/services', serviceController.getAllServices);

// POST /api/services : Menambah layanan baru (Akses Admin)
router.post('/services', protect, serviceController.createService);

// PUT /api/services/:id : Memperbarui layanan (Akses Admin)
router.put('/services/:id', protect, serviceController.updateService);

// DELETE /api/services/:id : Menghapus layanan (Akses Admin)
router.delete('/services/:id', protect, serviceController.deleteService);


export default router;