// backend/src/controllers/service.controller.ts
import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth.middleware';

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });
        return res.status(200).json(services);
    } catch (error) {
        console.error('Get Services Error:', error);
        return res.status(500).json({ message: 'Gagal mengambil data layanan.' });
    }
};

export const createService = async (req: AuthRequest, res: Response) => {
    const { title, description, icon, order } = req.body;

    if (!title || !description || !icon) {
        return res.status(400).json({ message: 'Field title, description, dan icon wajib diisi.' });
    }

    // Konversi order ke integer aman
    const orderInt = order ? parseInt(String(order), 10) : 0;

    try {
        const newService = await prisma.service.create({
            data: {
                title,
                description,
                icon,
                order: isNaN(orderInt) ? 0 : orderInt,
            },
        });
        return res.status(201).json({ message: 'Layanan berhasil dibuat.', data: newService });
    } catch (error) {
        console.error('Create Service Error:', error);
        return res.status(500).json({ message: 'Gagal membuat layanan baru.' });
    }
};

export const updateService = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const serviceId = parseInt(id || '', 10);

    if (isNaN(serviceId)) {
        return res.status(400).json({ message: 'ID layanan tidak valid.' });
    }

    const { title, description, icon, order } = req.body;
    
    // Bangun objek data update secara dinamis
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (order !== undefined) {
        const parsedOrder = parseInt(String(order), 10);
        updateData.order = isNaN(parsedOrder) ? 0 : parsedOrder;
    }

    try {
        const updatedService = await prisma.service.update({
            where: { id: serviceId },
            data: updateData,
        });
        return res.status(200).json({ message: 'Layanan diperbarui.', data: updatedService });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ message: 'Layanan tidak ditemukan.' });
        }
        console.error('Update Service Error:', error);
        return res.status(500).json({ message: 'Gagal memperbarui layanan.' });
    }
};

export const deleteService = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const serviceId = parseInt(id || '', 10);

    if (isNaN(serviceId)) return res.status(400).json({ message: 'ID tidak valid.' });

    try {
        await prisma.service.delete({ where: { id: serviceId } });
        return res.status(200).json({ message: 'Layanan berhasil dihapus.' });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ message: 'Layanan tidak ditemukan.' });
        }
        console.error('Delete Service Error:', error);
        return res.status(500).json({ message: 'Gagal menghapus layanan.' });
    }
};
