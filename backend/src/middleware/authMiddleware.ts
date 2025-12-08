// backend/src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tambahkan definisi interface untuk Request agar dapat menyimpan userId
interface AuthRequest extends Request {
    adminId?: number;
    user?: { id: number; email: string; iat: number; exp: number };

}

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_UNSAFE_DEFAULT_SECRET';

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
}

try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as { id: number; email: string; iat: number; exp: number };
    req.user = decoded;
    next();
} catch (error) {
    res.status(401).json({ message: 'Token tidak valid.' });
}

    if (!token) {
        res.status(401).json({ message: 'Tidak diotorisasi, token tidak ditemukan.' });
    }
};