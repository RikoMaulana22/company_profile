// backend/src/controllers/serviceController.ts (PERBAIKAN FINAL)

import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).json({ message: 'Gagal mengambil data layanan.' });
    }
};

export const createService = async (req: AuthRequest, res: Response) => {
    const { title, description, icon, order } = req.body;

    if (!title || !description || !icon) {
        return res.status(400).json({ message: 'Judul, deskripsi, dan ikon harus diisi.' });
    }

    try {
        const newService = await prisma.service.create({
            data: {
                title,
                description,
                icon,
                order: order !== undefined ? parseInt(order as string) || 0 : 0, 
            },
        });
        res.status(201).json({ message: 'Layanan berhasil ditambahkan.', data: newService });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Gagal membuat layanan baru.' });
    }
};

export const updateService = async (req: AuthRequest, res: Response) => {
    // PERBAIKAN: Menggunakan Non-null Assertion Operator (!)
    const id = req.params.id!;
    const serviceId = parseInt(id);

    if (isNaN(serviceId)) {
         return res.status(400).json({ message: 'ID layanan tidak valid.' });
    }

    const { title, description, icon, order } = req.body;

    try {
        const updatedService = await prisma.service.update({
            where: { id: serviceId },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(icon && { icon }),
                ...(order !== undefined && { order: parseInt(order as string) || 0 }),
            },
        });
        res.status(200).json({ message: 'Layanan berhasil diperbarui.', data: updatedService });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ message: 'Layanan tidak ditemukan.' });
        }
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Gagal memperbarui layanan.' });
    }
};

export const deleteService = async (req: AuthRequest, res: Response) => {
    // PERBAIKAN: Menggunakan Non-null Assertion Operator (!)
    const id = req.params.id!;
    const serviceId = parseInt(id);

    if (isNaN(serviceId)) {
         return res.status(400).json({ message: 'ID layanan tidak valid.' });
    }

    try {
        await prisma.service.delete({
            where: { id: serviceId },
        });
        res.status(200).json({ message: 'Layanan berhasil dihapus.' });
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ message: 'Layanan tidak ditemukan.' });
        }
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Gagal menghapus layanan.' });
    }
};