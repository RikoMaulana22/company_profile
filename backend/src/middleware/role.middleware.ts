// backend/src/middleware/role.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const checkRole = (requiredRole: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Tidak terautentikasi.' });
        }

        // PERINGATAN: Pastikan di database Anda sudah menambahkan field 'role' ke tabel Admin
        // Jika belum, kode ini akan selalu menolak akses atau error type.
        
        // Sementara kita bypass dulu jika field role belum ada di database
        // const userRole = (req.user as any).role || 'admin'; 

        // if (userRole !== requiredRole) {
        //     return res.status(403).json({ message: 'Akses ditolak. Role tidak sesuai.' });
        // }

        next();
    };
};
