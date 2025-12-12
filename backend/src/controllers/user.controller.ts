// backend/src/controllers/user.controller.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware'; // Gunakan AuthRequest yg benar
import prisma from '../lib/prisma';

export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const currentUserId = req.user?.id;

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID user tidak valid.' });
    }

    try {
        // Pastikan user hanya bisa melihat profilnya sendiri (Kecuali Anda implementasi Role Admin)
        if (currentUserId !== userId) {
            return res.status(403).json({ message: 'Akses ditolak.' });
        }

        const admin = await prisma.admin.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin tidak ditemukan.' });
        }

        return res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};
