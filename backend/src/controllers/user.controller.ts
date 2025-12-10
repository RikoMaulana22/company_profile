// company-profile-app/backend/src/controllers/user.controller.ts

import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

// Mendapatkan detail pengguna (Hanya admin atau pengguna itu sendiri)
export const getUserProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.params.id; // ID pengguna yang diminta
  const currentUserId = req.user?.id; // ID pengguna yang sedang login
  const currentUserRole = req.user?.role;

  // Logika Placeholder: Mengambil data pengguna dari database
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    // Hanya izinkan jika Admin atau ID cocok
    if (currentUserRole !== 'admin' && currentUserId !== userId) {
        return res.status(403).json({ message: 'Akses terlarang.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    next(error);
  }
};

// ... Tambahkan fungsi lain seperti updateUserProfile, deleteUser, dll.