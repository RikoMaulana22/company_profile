// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia-default-dev';

// Pastikan di-EXPORT agar bisa dipakai di controller
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    // Hapus 'role' jika di schema Admin Anda tidak ada kolom role
    // role: string; 
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa.' });
  }
};

// Ekspor alias agar kompatibel dengan file lain yang mungkin mengimport dengan nama berbeda
export type AuthenticatedRequest = AuthRequest; 
export const authenticate = authenticateToken; 
