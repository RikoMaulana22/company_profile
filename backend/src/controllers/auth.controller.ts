// backend/src/controllers/authController.ts

import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js'; 

const JWT_SECRET = process.env.JWT_SECRET; 

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi.' });
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
        
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'Kesalahan server. Konfigurasi kunci rahasia hilang.' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            JWT_SECRET!, 
            { expiresIn: '7d' } 
        );

        res.status(200).json({ 
            token, 
            message: 'Login berhasil!',
            admin: { id: admin.id, email: admin.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Gagal melakukan login.', error: (error as Error).message });
    }
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }
    
    try {
        const adminCount = await prisma.admin.count();
        if (adminCount > 0) {
            return res.status(403).json({ message: 'Pendaftaran admin sudah ditutup. Hanya satu admin yang diizinkan.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: { email, password: hashedPassword },
            select: { id: true, email: true },
        });

        res.status(201).json({ 
            message: 'Admin berhasil didaftarkan.', 
            admin: newAdmin 
        });
    } catch (error) {
        if ((error as any).code === 'P2002') { 
             return res.status(409).json({ message: 'Email sudah terdaftar.' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Gagal melakukan pendaftaran.', error: (error as Error).message });
    }
};

export const getAdminProfile = async (req: AuthRequest, res: Response) => {
    const { id } = req.user!; 

    try {
        const admin = await prisma.admin.findUnique({
            where: { id },
            select: { id: true, email: true, createdAt: true, updatedAt: true },
        });

        if (!admin) {
             return res.status(404).json({ message: 'Profil admin tidak ditemukan.' });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error('Get Admin Profile error:', error);
        res.status(500).json({ message: 'Gagal mengambil data profil admin.' });
    }
};