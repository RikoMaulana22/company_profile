// backend/src/controllers/serviceController.ts

import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// =======================================================
// GET /api/services
// Mengambil semua layanan (Akses Publik)
// =======================================================
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' }, // Urutkan berdasarkan kolom 'order'
        });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).json({ message: 'Gagal mengambil data layanan.' });
    }
};

// =======================================================
// POST /api/services (Dilindungi)
// Membuat layanan baru
// =======================================================
export const createService = async (req: Request, res: Response) => {
    const { title, description, icon } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Judul dan deskripsi layanan wajib diisi.' });
    }

    try {
        const newService = await prisma.service.create({
            data: { title, description, icon: icon || 'CodeBracketIcon' },
        });
        res.status(201).json({ message: 'Layanan berhasil ditambahkan.', data: newService });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Gagal menambahkan layanan.' });
    }
};

// =======================================================
// PUT /api/services/:id (Dilindungi)
// Memperbarui layanan
// =======================================================
export const updateService = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description, icon } = req.body;
    
    // Validate parameter exists first
    if (!id) {
        return res.status(400).json({ message: 'ID layanan tidak valid.' });
    }

    // Then convert to number
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
        return res.status(400).json({ message: 'ID layanan harus berupa angka.' });
    }

    try {
        const data: { title?: string; description?: string; icon?: string } = {};
        if (title !== undefined) data.title = title;
        if (description !== undefined) data.description = description;
        if (icon !== undefined) data.icon = icon;

        const updatedService = await prisma.service.update({
            where: { id: numId },
            data,
        });
        res.status(200).json({ message: 'Layanan berhasil diperbarui.', data: updatedService });
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: `Layanan dengan ID ${numId} tidak ditemukan.` });
        }
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Gagal memperbarui layanan.' });
    }
};
// =======================================================
// DELETE /api/services/:id (Dilindungi)
// Menghapus layanan
// =======================================================
export const deleteService = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'ID layanan diperlukan.' });
    }

    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
        return res.status(400).json({ message: 'ID layanan tidak valid.' });
    }

    try {
        await prisma.service.delete({
            where: { id: numId },
        });
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: `Layanan dengan ID ${numId} tidak ditemukan.` });
        }
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Gagal menghapus layanan.' });
    }
};