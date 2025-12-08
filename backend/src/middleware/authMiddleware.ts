// backend/src/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken'; 

interface AdminPayload extends JwtPayload {
    id: number;
    email: string;
}

export interface AuthRequest extends Request {
    user?: AdminPayload; 
}

const JWT_SECRET = process.env.JWT_SECRET; 

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    if (!JWT_SECRET) {
        return res.status(500).json({ 
            message: 'Kesalahan server. JWT secret tidak dikonfigurasi.' 
        });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Tidak diotorisasi: Token tidak ditemukan atau format salah.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET!) as unknown as AdminPayload;
        
        if (!decoded.id || !decoded.email) {
            return res.status(401).json({ message: 'Token tidak valid: Payload admin tidak lengkap.' });
        }

        req.user = { id: decoded.id, email: decoded.email };
        
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid atau kedaluwarsa.' });
    }
};