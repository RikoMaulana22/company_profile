import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

// Mendapatkan detail admin
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id); // ubah string → number
  const currentUserId = req.user?.id;
  const currentUserRole = req.user?.role; // jika tidak ada role, hapus akses role

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: userId },   // id harus number
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true
        // name: false (tidak ada di schema)
        // role: false (tidak ada di schema)
      },
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin tidak ditemukan.' });
    }

    // Kalau tidak ada role, gunakan logika yang aman:
    if (currentUserId !== userId) {
      return res.status(403).json({ message: 'Akses ditolak.' });
    }

    return res.status(200).json(admin);

  } catch (error) {
    next(error);
  }
};
