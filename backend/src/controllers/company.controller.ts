// company-profile-app/backend/src/controllers/company.controller.ts

import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// Mendapatkan data profil perusahaan (Publik)
export const getCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Logika Placeholder: Asumsi hanya ada satu row profil perusahaan (ID: 1)
    const company = await prisma.companyProfile.findUnique({
      where: { id: 1 },
    });

    if (!company) {
      return res.status(404).json({ message: 'Data profil perusahaan belum diatur.' });
    }

    return res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

// Memperbarui data profil perusahaan (Hanya Admin)
export const updateCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, phone, mission } = req.body;

  try {
    const updatedCompany = await prisma.companyProfile.update({
      where: { id: 1 },
      data: { name, address, phone, mission }, // Data yang bisa diperbarui
    });

    return res.status(200).json({ 
        message: 'Profil perusahaan berhasil diperbarui.',
        data: updatedCompany 
    });
  } catch (error) {
    if (
        error && // Cek apakah error bukan null/undefined
        typeof error === 'object' && // Cek apakah error adalah objek
        'code' in error && // Cek apakah properti 'code' ada di objek error
        typeof (error as { code: unknown }).code === 'string' // Cek apakah 'code' bertipe string
    ) {
    // Cek apakah error karena ID 1 belum ada (jika demikian, lakukan CREATE)
    if (error.code === 'P2025') { 
        return res.status(404).json({ message: 'Data profil perusahaan tidak ditemukan. Coba CREATE pertama.' });
    }
    next(error);
  }
}
};