// company-profile-app/backend/src/routes/company.routes.ts

import { Router } from 'express';
import { getCompanyProfile, updateCompanyProfile } from '../controllers/company.controller';
import { authenticate } from '../middleware/auth.middleware';
import { checkRole } from '../middleware/role.middleware';

const companyRoutes = Router();

// Publik: Siapapun bisa melihat profil perusahaan
companyRoutes.get('/profile', getCompanyProfile);

// Terlindungi: Hanya admin yang bisa mengedit/memperbarui
companyRoutes.put('/profile', authenticate, checkRole('admin'), updateCompanyProfile);

export default companyRoutes;