// backend/src/controllers/companyController.ts

import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// =======================================================
// GET /api/profile
// Mengambil data profil perusahaan (untuk halaman publik)
// =======================================================
export const getCompanyProfile = async (req: Request, res: Response) => {
    try {
        // Ambil data profil pertama (karena hanya ada satu baris data profil)
        const profile = await prisma.companyProfile.findFirst();

        if (!profile) {
            // Jika belum ada data, kembalikan 404 atau data default kosong
            return res.status(404).json({ message: 'Data profil perusahaan belum diinisialisasi.' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Gagal mengambil data profil.' });
    }
};

// =======================================================
// PUT /api/profile (Dilindungi oleh protect middleware)
// Memperbarui data profil perusahaan
// =======================================================
export const updateCompanyProfile = async (req: Request, res: Response) => {
    // Ambil semua data yang diizinkan untuk diperbarui dari body request
    const { name, tagline, description, address, phone, email, vision, mission } = req.body;
    
    // Asumsi: Kita mencari atau membuat baris data profil pertama
    let profile = await prisma.companyProfile.findFirst();

    try {
        if (!profile) {
            // Jika tidak ada data, buat baru (Inisialisasi)
            profile = await prisma.companyProfile.create({
                data: {
                    name, tagline, description, address, phone, email, vision,
                    // Pastikan mission adalah array, walaupun dari form mungkin string
                    mission: Array.isArray(mission) ? mission : (mission ? mission.split('\n') : [])
                },
            });
            return res.status(201).json({ message: 'Profil berhasil diinisialisasi.', data: profile });
        }

        // Jika sudah ada, lakukan update
        const updatedProfile = await prisma.companyProfile.update({
            where: { id: profile.id },
            data: {
                name,
                tagline,
                description,
                address,
                phone,
                email,
                vision,
                // Pastikan mission adalah array, atau split jika berupa string
                mission: Array.isArray(mission) ? mission : (mission ? mission.split('\n') : [])
            },
        });

        res.status(200).json({ message: 'Profil berhasil diperbarui.', data: updatedProfile });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Gagal memperbarui data profil.' });
    }
};