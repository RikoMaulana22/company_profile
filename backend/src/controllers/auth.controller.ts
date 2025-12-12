// backend/src/controllers/auth.controller.ts
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia-default-dev';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Login berhasil!',
            token,
            admin: { id: admin.id, email: admin.email }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    }

    try {
        // Cek apakah sudah ada admin (Hanya boleh 1 admin utama untuk kasus ini)
        const adminCount = await prisma.admin.count();
        if (adminCount > 0) {
            return res.status(403).json({ message: 'Pendaftaran ditutup. Admin sudah terdaftar.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: { email, password: hashedPassword },
            select: { id: true, email: true }
        });

        return res.status(201).json({
            message: 'Admin berhasil didaftarkan.',
            admin: newAdmin
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Email sudah terdaftar.' });
            }
        }
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Gagal mendaftar admin.' });
    }
};

export const getAdminProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Tidak terautentikasi." });
    }

    try {
        const admin = await prisma.admin.findUnique({
            where: { id: userId },
            select: { id: true, email: true, createdAt: true, updatedAt: true }
        });

        if (!admin) return res.status(404).json({ message: 'Profil tidak ditemukan.' });

        return res.status(200).json(admin);
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ message: 'Gagal memuat profil.' });
    }
};
