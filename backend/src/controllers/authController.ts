// backend/src/controllers/authController.ts

import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
const JWT_SECRET = process.env.JWT_SECRET || 'MASUKKAN_KEY_RAHASIA_YANG_SANGAT_PANJANG_DAN_KOMPLEKS_DI_SINI'; // Ganti dengan nilai dari .env nanti!

// =======================================================
// Fungsi Login: POST /api/auth/login
// =======================================================
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    try {
        // 1. Cari user berdasarkan email
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        // 2. Bandingkan password yang di-hash
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Kredensial tidak valid.' });
        }

        // 3. Buat JSON Web Token (JWT)
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            JWT_SECRET,
            { expiresIn: '7d' } // Token berlaku 7 hari
        );

        // 4. Kirim token kembali ke frontend
        res.status(200).json({ 
            token, 
            message: 'Login berhasil!' 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Gagal melakukan login.', error: (error as Error).message });
    }
};

// =======================================================
// Fungsi Register: POST /api/auth/register (Hanya untuk inisialisasi awal)
// =======================================================
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Cek apakah sudah ada admin yang terdaftar
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
        return res.status(403).json({ message: 'Pendaftaran admin sudah ditutup.' });
    }

    try {
        // 1. Hash password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

        // 2. Buat admin baru
        const newAdmin = await prisma.admin.create({
            data: { email, password: hashedPassword },
            select: { id: true, email: true }, // Jangan kirim password kembali
        });

        res.status(201).json({ 
            message: 'Admin berhasil didaftarkan.', 
            admin: newAdmin 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Gagal melakukan pendaftaran.', error: (error as Error).message });
    }
};