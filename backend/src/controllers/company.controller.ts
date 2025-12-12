// backend/src/controllers/company.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getCompanyProfile = async (req: Request, res: Response) => {
    try {
        // Asumsi kita hanya punya 1 row profil perusahaan, kita ambil yang pertama
        const company = await prisma.companyProfile.findFirst();
        
        if (!company) {
            // Jika belum ada data sama sekali
            return res.status(200).json({ 
                name: 'Nama Perusahaan', 
                description: '',
                vision: '', 
                mission: '', 
                email: '', 
                phone: '', 
                address: '' 
            });
        }
        return res.status(200).json(company);
    } catch (error) {
        console.error('Get Company Profile Error:', error);
        return res.status(500).json({ message: 'Gagal memuat profil perusahaan.' });
    }
};

export const updateCompanyProfile = async (req: AuthRequest, res: Response) => {
    const { name, description, vision, mission, email, phone, address } = req.body;

    try {
        // Cek apakah data sudah ada
        const existingProfile = await prisma.companyProfile.findFirst();

        let result;
        if (existingProfile) {
            // Update jika ada
            result = await prisma.companyProfile.update({
                where: { id: existingProfile.id },
                data: { name, vision, mission, email, phone, address }
            });
        } else {
            // Create baru jika belum ada
            result = await prisma.companyProfile.create({
                data: { name, description, vision, mission, email, phone, address }
            });
        }

        return res.status(200).json({ message: 'Profil perusahaan berhasil disimpan.', data: result });
    } catch (error) {
        console.error('Update Company Profile Error:', error);
        return res.status(500).json({ message: 'Gagal menyimpan profil perusahaan.' });
    }
};
