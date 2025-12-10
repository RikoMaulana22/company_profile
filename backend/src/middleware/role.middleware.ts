// company-profile-app/backend/src/middlewares/role.middleware.ts

import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

// Fungsi currying untuk membuat middleware role checker
export const checkRole = (requiredRole: 'admin' | 'user') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    if (!req.user) {
        // Ini seharusnya sudah ditangani oleh auth.middleware, 
        // tapi ini adalah fallback jika lupa menggunakan authenticate
        return res.status(403).json({ message: 'Otorisasi gagal: Pengguna tidak terautentikasi.' });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Akses ditolak. Diperlukan role: ${requiredRole}.` });
    }

    next(); // Role sesuai, lanjutkan
  };
};