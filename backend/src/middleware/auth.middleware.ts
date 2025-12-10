// company-profile-app/backend/src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';

// Definisi Interface untuk Request yang sudah diautentikasi (opsional)
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'user'; // Asumsi role pengguna
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // 1. Dapatkan token dari header (Bearer Token)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // PURELY A PLACEHOLDER: Ganti dengan logika verifikasi JWT yang sesungguhnya (misalnya menggunakan jsonwebtoken)
    const mockUserPayload = { id: 'user-123', role: 'user' }as const;; 
    
    // Simpan payload pengguna ke objek request
    req.user = mockUserPayload;
    
    next(); // Lanjut ke controller/middleware berikutnya

  } catch (error) {
    // Jika token tidak valid
    res.status(401).json({ message: 'Token tidak valid atau kadaluarsa.' });
  }
};