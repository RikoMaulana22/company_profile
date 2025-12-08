// backend/src/controllers/companyController.ts

import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const getCompanyProfile = async (req: Request, res: Response) => {
    try {
        const profile = await prisma.companyProfile.findFirst();

        if (!profile) {
            return res.status(200).json({
                message: 'Data profil perusahaan belum diinisialisasi.',
                id: 0, 
                name: 'Nama Perusahaan', tagline: 'Tagline Perusahaan', 
                description: 'Deskripsi singkat...', address: '', phone: '', 
                email: '', vision: '', mission: [], 
                createdAt: new Date().toISOString(), 
                updatedAt: new Date().toISOString()
            });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error retrieving profile:', error);
        res.status(500).json({ message: 'Gagal mengambil data profil.' });
    }
};

export const updateCompanyProfile = async (req: AuthRequest, res: Response) => {
    const { name, tagline, description, address, phone, email, vision, mission } = req.body;
    
    if (!name || !description) {
         return res.status(400).json({ message: 'Nama dan Deskripsi perusahaan harus diisi.' });
    }

    try {
        let profile = await prisma.companyProfile.findFirst();
        
        const formatMission = (m: any) => {
            if (Array.isArray(m)) return m;
            if (typeof m === 'string' && m.trim() !== '') return m.split('\n').map(item => item.trim()).filter(item => item.length > 0);
            return [];
        };

        const dataToUpdate = {
            name,
            tagline: tagline || null,
            description,
            address: address || null,
            phone: phone || null,
            email: email || null,
            vision: vision || null,
            mission: formatMission(mission),
        };


        if (!profile) {
            profile = await prisma.companyProfile.create({ data: dataToUpdate });
            return res.status(201).json({ message: 'Profil berhasil diinisialisasi.', data: profile });
        }

        const updatedProfile = await prisma.companyProfile.update({
            where: { id: profile.id }, 
            data: dataToUpdate,
        });

        res.status(200).json({ message: 'Profil berhasil diperbarui.', data: updatedProfile });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Gagal memperbarui data profil.' });
    }
};